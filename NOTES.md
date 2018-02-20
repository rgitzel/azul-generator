
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


