
**March 23, 2018**

Egads, it's been awhile.  Been busy with the Let's Encrypt project.

Anyway, it's Pro-D.  This morning I add a generator to SI to create a stack
with a lambda and an API gateway. It's using the idea from the TAMs NOT 
deploy code with CFN, but to instead use the Lambda SDK to upload new code,
that way you never fuss with S3 yourself. 

I borrowed from Scott's example:  https://github.com/scottbrown/lambda-py2go-flip

Now, to get a Node app up there...
 
..........

Getting a Node app up there wasn't so hard. Even avoiding zipping node-modules afresh every time
 (though the deploy script would be better a Makefile).
 
But trying to get pdfkit to generate to something other than a file??  I tried a number of `stream`
 packages... `memorystream`, `memory-streams`, `bufferstream`... none seemed to work.  Then finally
 I happened on an example that didn't need a library:  https://stackoverflow.com/questions/23686843/how-to-convert-pdfkit-object-into-buffer-using-nodejs

There the key was the callback... maybe that's what happened to the others?

Anyway the next problem was returning it and... #$%@#$%@.  Return it unchanged, it comes up blank.  Turn it to
 base64 and it comes up invalid.  
 
I *think* it's an issue with API Gateway, and that it's not quite returning things right, so the browser doesn't
 know to decode the response.  And because I'm using "Lambda Proxy" I have less control.  
 
I don't understand the difference, need to read this when my head is clearer: https://medium.com/@lakshmanLD/lambda-proxy-vs-lambda-integration-in-aws-api-gateway-3a9397af0e6d

Anyway, good progress, learned a bunch, and I've got a new generator.



**February 24, 2018**

I just measured the real board.  From the left edge of left tile
to right edge of the right tile it's 10.2cm.  Between tiles is 2mm.
 
I wonder how to about scaling.  Postscript lets you apply a scale
factor, but I've not found anything for PDFs per se.

I could extract the rendering code and make it on a [0,1] range (or
use ints up to 1000 to make testing viable),
 then for the PDF just say how many "pixels" to use.

...

Not too hard: the "board" now has absolute coordinates in millimetres,
 and the PDF rendering code just scales them.
 
The thick rounded lines screwed up the gaps, turns out.  But Pdfkit
has a rounded rectangle, so turns out lines aren't needed.

Now to compare a printed PDF with the real board, to figure out the 
actual size.
 

**February 23, 2018**

Pro-D day, why not see if this can be run in a browser?

"Webpack" is one tool we use, so let's give it a go. Do some reading, some tinkering.

Ultimately this was the most helpful:  https://webpack.js.org/guides/getting-started/

Got 'hello world' going easily enough, but some hoog-jiggery was needed to get 'pdfkit'
to work.  This helped https://github.com/devongovett/pdfkit/issues/659#issuecomment-321452649, and
needed `transform-loader` to be installed.

All of which is suggesting _two_ repos, one for the generation, and one for the webapp.

Anyway, right now the PDF is rather crudely displayed in an iframe, but it does display
a different board on every page reload.

Rather oddly... the very first one displayed?  Was the default board.  Sus. Spish. Us.

Anyway, I decided to put this in a separate branch, and did some of the same refactoring in master.


**February 20, 2018**

Cobbled together automatic selection on the bus home last night,
and was moderately surprised to see it fail on the first try:

```bash
$ node build/matrix-manual.js
123 21- 3-1
``` 

Hrm?  I was simply picking the "first" available one, and, well, 
yes, swapping 1 and 2 in the two rows left 3 stuck.

Hmmm.

Well, try randomly picking...
```
$ node build/matrix-manual.js
231 123 312

$ node build/matrix-manual.js
123 231 312

$ node build/matrix-manual.js
312 231 123

$ node build/matrix-manual.js
213 12- 3-2

$ node build/matrix-manual.js
312 13- 2-3
```

Well, it worked for a bit. Making the set bigger than the
size helped, but still no guarantee.

Hmm.

Well, for now, retry until it works?

```

$ node build/index.js
KYRTB YBKRT BKY-R RTBKY TR-BK
TRYBK YTKRB BYRKT RBTY- K-BTR
RYBKT KRTYB YBKR- BKYTR T-RBK
YRBTK BYRKT KBTYR TKYB- RTK-B
YBRTK KTBYR RYKBT BKYR- TR-KY
RTBKY BKTYR YBKT- TYRBK KRY-B
RTBYK KYTBR TRYKB BKRTY YBKRT

$ node build/index.js
BRYTK KBTYR TKRBY YTKRB RYBKT

$ node build/index.js
BRKYT RKYTB YTBKR TBR-K KYTR-
TBRKY YTBRK KRYTB BKTYR RYKBT

$ node build/index.js
RBKTY KTBYR TKRB- YRTKB BY-RT
TRKBY KTBYR YKRTB RBYKT BYTRK

$ node build/index.js
RBKYT YTRBK TYBKR KRYTB BKTRY

$ node build/index.js
KRTBY BTRYK YBKRT TYBKR RKYTB

$ node build/index.js
RYTBK KRBYT TBRKY BKYTR YTKRB

$ node build/index.js
RYTKB KTBRY TBRYK BRKT- YK-BT
RBKTY KTRYB YRTBK TKBR- BY-KT
BYKTR TBYRK YTRB- RKBYT KRT-B
YKBTR RYTKB BTKY- KRYBT TBR-K
YTKBR BYRKT TRY-B KBTRY RKBT-
YBRTK KTYRB RYTB- BRKYT TKB-R
TRKBY RYTKB BTRYK KBYTR YKBRT

$ node build/index.js
BKRYT RTBKY KRTB- YBKR- TY--B
BYKRT YKTBR KBYT- RTBYK TR-KB
TYBKR BTRYK RKTBY YBKT- KRY-T
YTRBK TRKYB RBYKT BYTR- K-BTY
TYRKB KTBYR RKYT- YRTBK B-KRY
YRKBT RTYKB BKRY- KBTRY TYB-K
TYBRK BTRKY YKTBR RBYT- KR-YT
KYBTR YKRBT RTYKB BRTYK TBKRY

$ node build/index.js
KRTYB TKYBR BYRKT RBKTY YTBRK
```

Seems viable, I've maxed out at 10 tries, and haven't
needed them all, yet.

Oh BTW, did you see that? It was pretty easy to tie
the matrix code into the PDF code, so... yes, running the above does generate the PDF. :-)


So now...

- compare with the real board
  - size
  - colours
- think about generation...
  - I could go look up how to solve Sudoku, but I should think about it myself first 
- should `DistinctMatrix` be a class instead?


