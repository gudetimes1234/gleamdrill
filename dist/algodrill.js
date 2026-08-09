class F{withFields(I){let J=Object.keys(this).map((Z)=>(Z in I)?I[Z]:this[Z]);return new this.constructor(...J)}}class HI{static fromArray(I,J){return S(I,J)}[Symbol.iterator](){return new Y9(this)}toArray(){return[...this]}atLeastLength(I){let J=this;while(I-- >0&&J)J=J.tail;return J!==void 0}hasLength(I){let J=this;while(I-- >0&&J)J=J.tail;return I===-1&&J instanceof U}countLength(){let I=this,J=0;while(I)I=I.tail,J++;return J-1}}function M(I,J){return new T6(I,J)}function S(I,J){let Z=J||w;for(let Y=I.length-1;Y>=0;--Y)Z=new T6(I[Y],Z);return Z}class Y9{#I;constructor(I){this.#I=I}next(){if(this.#I instanceof U)return{done:!0};else{let{head:I,tail:J}=this.#I;return this.#I=J,{value:I,done:!1}}}}class U extends HI{}var w=new U,Q9=()=>w,SI=(I)=>I instanceof U;class T6 extends HI{constructor(I,J){super();this.head=I,this.tail=J}}var J6=(I,J)=>new T6(I,J),V1=(I)=>I instanceof T6,Z6=(I)=>I.head,J1=(I)=>I.tail;class P6{bitSize;byteSize;bitOffset;rawBuffer;constructor(I,J,Z){if(!(I instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=J??I.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=Z??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(I.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=I}byteAt(I){if(I<0||I>=this.byteSize)return;return A6(this.rawBuffer,this.bitOffset,I)}equals(I){if(this.bitSize!==I.bitSize)return!1;let J=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&I.bitOffset===0){for(let Y=0;Y<J;Y++)if(this.rawBuffer[Y]!==I.rawBuffer[Y])return!1;let Z=this.bitSize%8;if(Z){let Y=8-Z;if(this.rawBuffer[J]>>Y!==I.rawBuffer[J]>>Y)return!1}}else{for(let Y=0;Y<J;Y++){let Q=A6(this.rawBuffer,this.bitOffset,Y),W=A6(I.rawBuffer,I.bitOffset,Y);if(Q!==W)return!1}let Z=this.bitSize%8;if(Z){let Y=A6(this.rawBuffer,this.bitOffset,J),Q=A6(I.rawBuffer,I.bitOffset,J),W=8-Z;if(Y>>W!==Q>>W)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function A6(I,J,Z){if(J===0)return I[Z]??0;else{let Y=I[Z]<<J&255,Q=I[Z+1]>>8-J;return Y|Q}}class qI{constructor(I){this.value=I}}class S8 extends F{static isResult(I){return I instanceof S8}}class E extends S8{constructor(I){super();this[0]=I}isOk(){return!0}}var I0=(I)=>new E(I),N0=(I)=>I instanceof E,B0=(I)=>I[0];class W0 extends S8{constructor(I){super();this[0]=I}isOk(){return!1}}var V0=(I)=>new W0(I),W9=(I)=>I instanceof W0;function Z0(I,J){let Z=[I,J];while(Z.length){let Y=Z.pop(),Q=Z.pop();if(Y===Q)continue;if(!Z9(Y)||!Z9(Q))return!1;if(!OY(Y,Q)||zY(Y,Q)||RY(Y,Q)||LY(Y,Q)||NY(Y,Q)||UY(Y,Q)||DY(Y,Q))return!1;let X=Object.getPrototypeOf(Y);if(X!==null&&typeof X.equals==="function")try{if(Y.equals(Q))continue;else return!1}catch{}let[G,K]=MY(Y),V=G(Y),H=G(Q);if(V.length!==H.length)return!1;for(let q of V)Z.push(K(Y,q),K(Q,q))}return!0}function MY(I){if(I instanceof Map)return[(J)=>J.keys(),(J,Z)=>J.get(Z)];else{let J=I instanceof globalThis.Error?["message"]:[];return[(Z)=>[...J,...Object.keys(Z)],(Z,Y)=>Z[Y]]}}function zY(I,J){return I instanceof Date&&(I>J||I<J)}function RY(I,J){return!(I instanceof P6)&&I.buffer instanceof ArrayBuffer&&I.BYTES_PER_ELEMENT&&!(I.byteLength===J.byteLength&&I.every((Z,Y)=>Z===J[Y]))}function LY(I,J){return Array.isArray(I)&&I.length!==J.length}function NY(I,J){return I instanceof Map&&I.size!==J.size}function UY(I,J){return I instanceof Set&&(I.size!=J.size||[...I].some((Z)=>!J.has(Z)))}function DY(I,J){return I instanceof RegExp&&(I.source!==J.source||I.flags!==J.flags)}function Z9(I){return typeof I==="object"&&I!==null}function OY(I,J){if(typeof I!=="object"&&typeof J!=="object"&&(!I||!J))return!1;if([Promise,WeakSet,WeakMap,Function].some((Y)=>I instanceof Y))return!1;return I.constructor===J.constructor}function b1(I,J,Z,Y,Q,W,X){let G=new globalThis.Error(W);G.gleam_error=I,G.file=J,G.module=Z,G.line=Y,G.function=Q,G.fn=Q;for(let K in X)G[K]=X[K];return G}class E0 extends F{}var C6=new E0,X9=()=>C6;class x0 extends F{}var w6=new x0,G9=()=>w6;class MI extends F{}var E6=new MI,K9=()=>E6;class y extends F{constructor(I){super();this[0]=I}}var q8=(I)=>I instanceof y,M8=(I)=>I[0];class F1 extends F{}var P=new F1;function BY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else{let Q=Z.head;I=Z.tail,J=M(Q,Y)}}}function jY(I){return BY(I,w)}function AY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return jY(Y);else{let Q=Z.head;if(Q instanceof y){let W=Z.tail,X=Q[0];I=W,J=M(X,Y)}else I=Z.tail,J=Y}}}function zI(I){return AY(I,w)}var V9=new WeakMap,RI=new DataView(new ArrayBuffer(8)),LI=0;function NI(I){let J=V9.get(I);if(J!==void 0)return J;let Z=LI++;if(LI===2147483647)LI=0;return V9.set(I,Z),Z}function UI(I,J){return I^J+2654435769+(I<<6)+(I>>2)|0}function DI(I){let J=0,Z=I.length;for(let Y=0;Y<Z;Y++)J=Math.imul(31,J)+I.charCodeAt(Y)|0;return J}function S9(I){RI.setFloat64(0,I);let J=RI.getInt32(0),Z=RI.getInt32(4);return Math.imul(73244475,J>>16^J)^Z}function TY(I){return DI(I.toString())}function PY(I){let J=Object.getPrototypeOf(I);if(J!==null&&typeof J.hashCode==="function")try{let Y=I.hashCode(I);if(typeof Y==="number")return Y}catch{}if(I instanceof Promise||I instanceof WeakSet||I instanceof WeakMap)return NI(I);if(I instanceof Date)return S9(I.getTime());let Z=0;if(I instanceof ArrayBuffer)I=new Uint8Array(I);if(Array.isArray(I)||I instanceof Uint8Array)for(let Y=0;Y<I.length;Y++)Z=Math.imul(31,Z)+r0(I[Y])|0;else if(I instanceof Set)I.forEach((Y)=>{Z=Z+r0(Y)|0});else if(I instanceof Map)I.forEach((Y,Q)=>{Z=Z+UI(r0(Y),r0(Q))|0});else{let Y=Object.keys(I);for(let Q=0;Q<Y.length;Q++){let W=Y[Q],X=I[W];Z=Z+UI(r0(X),DI(W))|0}}return Z}function r0(I){if(I===null)return 1108378658;if(I===void 0)return 1108378659;if(I===!0)return 1108378657;if(I===!1)return 1108378656;switch(typeof I){case"number":return S9(I);case"string":return DI(I);case"bigint":return TY(I);case"object":return PY(I);case"symbol":return NI(I);case"function":return NI(I);default:return 0}}class H1{constructor(I,J){this.size=I,this.root=J}}var x6=5,CY=(1<<x6)-1,R8=Symbol();class h1{constructor(I,J,Z,Y){this.datamap=J,this.nodemap=Z,this.data=Y,this.generation=I}equals(I){if(this===I)return!0;if(!(I instanceof h1))return!1;if(this.datamap!==I.datamap||this.nodemap!==I.nodemap)return!1;let J=this.data,Z=I.data;if(J.length!==Z.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#I(Z);let Y=J.length-k6(this.nodemap);for(let Q=0;Q<Y;Q+=2)if(!Z0(J[Q],Z[Q])||!Z0(J[Q+1],Z[Q+1]))return!1;for(let Q=Y;Q<J.length;++Q)if(!J[Q].equals(Z[Q]))return!1;return!0}#I(I){let J=this.data;I:for(let Z=0;Z<J.length;Z+=2){for(let Y=0;Y<I.length;Y+=2)if(Z0(J[Z],I[Y])){if(!Z0(J[Z+1],I[Y+1]))return!1;continue I}return!1}return!0}hashCode(){let I=this.data,J=I.length-k6(this.nodemap),Z=0;for(let Y=0;Y<J;Y+=2)Z=Z+UI(r0(I[Y+1]),r0(I[Y]))|0;for(let Y=J;Y<I.length;++Y)Z=Z+I[Y].hashCode()|0;return Z}}var q9=EY(0),M9=new H1(0,q9),wY=V0(void 0);function EY(I){return new h1(I,0,0,[])}function z9(I,J){if(I.generation===J)return I;let Z=I.data.slice(0);return new h1(J,I.datamap,I.nodemap,Z)}function L8(I,J,Z,Y){if(I.data[Z]===Y)return I;return I=z9(I,J),I.data[Z]=Y,I}function F9(I,J,Z,Y,Q,W){let X=I.data,G=X.length,K=Array(G+2),V=0,H=0;while(V<Y)K[H++]=X[V++];K[H++]=Q,K[H++]=W;while(V<G)K[H++]=X[V++];return new h1(J,I.datamap|Z,I.nodemap,K)}function H9(I,J,Z,Y){I=z9(I,J);let Q=I.data,W=Q.length;for(let X=Y,G=Y+2;G<W;++G,++X)Q[X]=Q[G];return Q.pop(),Q.pop(),I.datamap^=Z,I}function Y6(){return M9}function S1(I,J){let Z=xY(I.root,J,r0(J));return Z!==R8?I0(Z):wY}function xY(I,J,Z){for(let Q=0;Q<32;Q+=x6){let W=I.data,X=BI(Z,Q);if(I.nodemap&X)I=W[W.length-1-_1(I.nodemap,X)];else if(I.datamap&X){let G=Math.imul(_1(I.datamap,X),2);return Z0(J,W[G])?W[G+1]:R8}else return R8}let Y=I.data;for(let Q=0;Q<Y.length;Q+=2)if(Z0(J,Y[Q]))return Y[Q+1];return R8}function OI(I){return{generation:L9(I),root:I.root,size:I.size,dict:I}}function R9(I){if(I.root===I.dict.root)return I.dict;return new H1(I.size,I.root)}function L9(I){let J=I.root;if(J.generation<Number.MAX_SAFE_INTEGER)return J.generation+1;let Z=[J];while(Z.length){let Y=Z.pop();Y.generation=0;let Q=Y.data.length-k6(Y.nodemap);for(let W=Q;W<Y.data.length;++W)Z.push(Y.data[W])}return 1}var z8=OI(M9);function v1(I,J,Z){z8.generation=L9(I),z8.size=I.size;let Y=r0(J),Q=N8(z8,I.root,J,Z,Y,0);if(Q===I.root)return I;return new H1(z8.size,Q)}function N8(I,J,Z,Y,Q,W){let X=J.data,G=I.generation;if(W>32){for(let B=0;B<X.length;B+=2)if(Z0(Z,X[B]))return L8(J,G,B+1,Y);return I.size+=1,F9(J,G,0,X.length,Z,Y)}let K=BI(Q,W);if(J.nodemap&K){let B=X.length-1-_1(J.nodemap,K),j=X[B];return j=N8(I,j,Z,Y,Q,W+x6),L8(J,G,B,j)}let V=Math.imul(_1(J.datamap,K),2);if((J.datamap&K)===0)return I.size+=1,F9(J,G,K,V,Z,Y);if(Z0(Z,X[V]))return L8(J,G,V+1,Y);let H=W+x6,q=q9;q=N8(I,q,Z,Y,Q,H);let N=X[V],L=X[V+1],z=r0(N);q=N8(I,q,N,L,z,H),I.size-=1;let O=X.length,R=O-1-_1(J.nodemap,K),A=Array(O-1),T=0,D=0;while(T<V)A[D++]=X[T++];T+=2;while(T<=R)A[D++]=X[T++];A[D++]=q;while(T<O)A[D++]=X[T++];return new h1(G,J.datamap^K,J.nodemap|K,A)}function N9(I,J){let Z=r0(I);return J.root=U9(J,J.root,I,Z,0),J}function U9(I,J,Z,Y,Q){let W=J.data,X=I.generation;if(Q>32){for(let V=0;V<W.length;V+=2)if(Z0(Z,W[V]))return I.size-=1,H9(J,X,0,V);return J}let G=BI(Y,Q),K=Math.imul(_1(J.datamap,G),2);if((J.nodemap&G)!==0){let V=W.length-1-_1(J.nodemap,G),H=W[V];if(H=U9(I,H,Z,Y,Q+x6),H.nodemap!==0||H.data.length>2)return L8(J,X,V,H);let q=W.length,N=Array(q+1),L=0,z=0;while(L<K)N[z++]=W[L++];N[z++]=H.data[0],N[z++]=H.data[1];while(L<V)N[z++]=W[L++];L++;while(L<q)N[z++]=W[L++];return new h1(X,J.datamap|G,J.nodemap^G,N)}if((J.datamap&G)===0||!Z0(Z,W[K]))return J;return I.size-=1,H9(J,X,G,K)}function m1(I,J,Z){let Y=[I.root];while(Y.length){let Q=Y.pop(),W=Q.data,X=W.length-k6(Q.nodemap);for(let G=0;G<X;G+=2)J=Z(J,W[G],W[G+1]);for(let G=X;G<W.length;++G)Y.push(W[G])}return J}function k6(I){return I-=I>>>1&1431655765,I=(I&858993459)+(I>>>2&858993459),Math.imul(I+(I>>>4)&252645135,16843009)>>>24}function _1(I,J){return k6(I&J-1)}function BI(I,J){return 1<<(I>>>J&CY)}function g6(I){return m1(I,w,(J,Z,Y)=>{return M(Z,J)})}function jI(I,J){let Z=OI(I),Y=((Q)=>{return N9(J,Q)})(Z);return R9(Y)}class O1 extends F{}var Z1=new O1;class O9 extends F{}var f6=new O9;function fY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else I=Z.tail,J=Y+1}}function M1(I){return fY(I,0)}function Q6(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else{let Q=Z.head;I=Z.tail,J=M(Q,Y)}}}function e(I){return Q6(I,w)}function b6(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return!1;else{let Q=Z.head;if(Z0(Q,Y))return!0;else I=Z.tail,J=Y}}}function B9(I){if(I instanceof U)return new W0(void 0);else{let J=I.head;return new E(J)}}function bY(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return e(W);else{let{head:X,tail:G}=Y,K;if(Q(X))K=M(X,W);else K=W;let H=K;I=G,J=Q,Z=H}}}function W6(I,J){return bY(I,J,w)}function yY(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return e(W);else{let X=Y.head;I=Y.tail,J=Q,Z=M(Q(X),W)}}}function M0(I,J){return yY(I,J,w)}function _Y(I,J,Z,Y){while(!0){let Q=I,W=J,X=Z,G=Y;if(Q instanceof U)return e(G);else{let{head:K,tail:V}=Q,H=M(W(K,X),G);I=V,J=W,Z=X+1,Y=H}}}function j9(I,J){return _Y(I,J,0,w)}function A9(I,J){while(!0){let Z=I,Y=J;if(Y<=0)return Z;else if(Z instanceof U)return Z;else I=Z.tail,J=Y-1}}function hY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else{let Q=Z.head;I=Z.tail,J=M(Q,Y)}}}function _0(I,J){return hY(e(I),J)}function U8(I,J){return M(J,I)}function vY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return e(Y);else{let Q=Z.head;I=Z.tail,J=Q6(Q,Y)}}}function T9(I){return vY(I,w)}function k0(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return Q;else{let X=Y.head;I=Y.tail,J=W(Q,X),Z=W}}}function X6(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return new W0(void 0);else{let{head:Q,tail:W}=Z;if(Y(Q))return new E(Q);else I=W,J=Y}}}function mY(I,J,Z,Y){while(!0){let Q=I,W=J,X=Z,G=Y;if(Q instanceof U)return Q6(W,G);else if(W instanceof U)return Q6(Q,G);else{let{head:K,tail:V}=Q,H=W.head,q=W.tail,N=X(K,H);if(N instanceof E0)I=Q,J=q,Z=X,Y=M(H,G);else if(N instanceof x0)I=V,J=W,Z=X,Y=M(K,G);else I=V,J=W,Z=X,Y=M(K,G)}}}function uY(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return e(W);else{let X=Y.tail;if(X instanceof U){let G=Y.head;return e(M(e(G),W))}else{let G=Y.head,K=X.head,V=X.tail,H=mY(G,K,Q,w);I=V,J=Q,Z=M(H,W)}}}}function cY(I,J,Z,Y){while(!0){let Q=I,W=J,X=Z,G=Y;if(Q instanceof U)return Q6(W,G);else if(W instanceof U)return Q6(Q,G);else{let{head:K,tail:V}=Q,H=W.head,q=W.tail,N=X(K,H);if(N instanceof E0)I=V,J=W,Z=X,Y=M(K,G);else if(N instanceof x0)I=Q,J=q,Z=X,Y=M(H,G);else I=Q,J=q,Z=X,Y=M(H,G)}}}function $Y(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return e(W);else{let X=Y.tail;if(X instanceof U){let G=Y.head;return e(M(e(G),W))}else{let G=Y.head,K=X.head,V=X.tail,H=cY(G,K,Q,w);I=V,J=Q,Z=M(H,W)}}}}function pY(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return Y;else if(Q instanceof O1)if(Y.tail instanceof U)return Y.head;else I=$Y(Y,W,w),J=f6,Z=W;else if(Y.tail instanceof U){let G=Y.head;return e(G)}else I=uY(Y,W,w),J=Z1,Z=W}}function nY(I,J,Z,Y,Q,W){while(!0){let X=I,G=J,K=Z,V=Y,H=Q,q=W,N=M(H,K);if(X instanceof U)if(V instanceof O1)return M(e(N),q);else return M(N,q);else{let{head:L,tail:z}=X,O=G(H,L);if(V instanceof O1)if(O instanceof E0)I=z,J=G,Z=N,Y=V,Q=L,W=q;else if(O instanceof x0)I=z,J=G,Z=N,Y=V,Q=L,W=q;else{let R;if(V instanceof O1)R=M(e(N),q);else R=M(N,q);let A=R;if(z instanceof U)return M(S([L]),A);else{let{head:T,tail:D}=z,B,j=G(L,T);if(j instanceof E0)B=Z1;else if(j instanceof x0)B=Z1;else B=f6;let x=B;I=D,J=G,Z=S([L]),Y=x,Q=T,W=A}}else if(O instanceof E0){let R;if(V instanceof O1)R=M(e(N),q);else R=M(N,q);let A=R;if(z instanceof U)return M(S([L]),A);else{let{head:T,tail:D}=z,B,j=G(L,T);if(j instanceof E0)B=Z1;else if(j instanceof x0)B=Z1;else B=f6;let x=B;I=D,J=G,Z=S([L]),Y=x,Q=T,W=A}}else if(O instanceof x0){let R;if(V instanceof O1)R=M(e(N),q);else R=M(N,q);let A=R;if(z instanceof U)return M(S([L]),A);else{let{head:T,tail:D}=z,B,j=G(L,T);if(j instanceof E0)B=Z1;else if(j instanceof x0)B=Z1;else B=f6;let x=B;I=D,J=G,Z=S([L]),Y=x,Q=T,W=A}}else I=z,J=G,Z=N,Y=V,Q=L,W=q}}}function P9(I,J){if(I instanceof U)return I;else{let Z=I.tail;if(Z instanceof U)return I;else{let Y=I.head,Q=Z.head,W=Z.tail,X,G=J(Y,Q);if(G instanceof E0)X=Z1;else if(G instanceof x0)X=Z1;else X=f6;let K=X,V=nY(W,J,S([Y]),K,Q,w);return pY(V,Z1,J)}}}function C9(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return;else{let{head:Q,tail:W}=Z;Y(Q),I=W,J=Y}}}class x9 extends F{}var hX=new x9;class f9 extends F{}var pX=new f9;class b9 extends F{}var nX=new b9;function y9(I,J){if(J==="")return TI(I);else{let Y=Y0(I),Q=PI(Y,J);return M0(Q,Y0)}}function oY(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else{let Q=Z.head;I=Z.tail,J=Y+Q}}}function _9(I){return oY(I,"")}class j1 extends F{constructor(I,J,Z){super();this.expected=I,this.found=J,this.path=Z}}var u9=(I,J,Z)=>new j1(I,J,Z);class g0 extends F{constructor(I){super();this.function=I}}var ZQ=new g0(YQ),v0=new g0(QQ);var U0=new g0(WQ);function Y1(I,J){let Z=J.function(I),Y=Z[0],Q=Z[1];if(Q instanceof U)return new E(Y);else return new W0(Q)}function wI(I,J,Z){let Y=Z(I);if(Y instanceof E)return[Y[0],w];else return[Y[0],S([new j1(J,R1(I),w)])]}function YQ(I){return wI(I,"Float",r9)}function u1(I,J){return new g0((Z)=>{let Y=I.function(Z),Q=Y[0],W=Y[1];return[J(Q),W]})}function QQ(I){return wI(I,"Int",i9)}function WQ(I){return wI(I,"String",d9)}function XQ(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(W instanceof U)return Q;else{let{head:X,tail:G}=W,K=X.function(Y),V=K;if(K[1]instanceof U)return V;else I=Y,J=Q,Z=G}}}function c9(I,J){return new g0((Z)=>{let Y=I.function(Z),Q=Y;if(Y[1]instanceof U)return Q;else return XQ(Z,Q,J)})}function GQ(I){let J=c9(U0,S([(()=>{return u1(v0,z0)})(),(()=>{return u1(ZQ,D8)})()])),Z=Y1(I,J);if(Z instanceof E)return Z[0];else return"<"+R1(I)+">"}function _6(I,J){let Z=M0(J,(Q)=>{let X=Y0(Q);return GQ(X)}),Y=M0(I[1],(Q)=>{return new j1(Q.expected,Q.found,_0(Z,Q.path))});return[I[0],Y]}function h6(I){return new g0((J)=>{return s9(J,I.function,(Z,Y)=>{return _6(Z,S([Y]))},0,w)})}function KQ(I,J,Z,Y,Q){while(!0){let W=I,X=J,G=Z,K=Y,V=Q;if(W instanceof U){let q=G(K);return _6(q,e(X))}else{let{head:H,tail:q}=W,N=EI(K,H);if(N instanceof E){let L=N[0];if(L instanceof y){let z=L[0];I=q,J=M(H,X),Z=G,Y=z,Q=V}else return V(K,M(H,X))}else{let L=N[0],R=[G(K)[0],S([new j1(L,R1(K),w)])];return _6(R,e(X))}}}}function A1(I,J,Z){return new g0((Y)=>{let Q=KQ(I,w,J.function,Y,(H,q)=>{let z=[J.function(H)[0],S([new j1("Field","Nothing",w)])];return _6(z,e(q))}),W=Q[0],X=Q[1],G=Z(W).function(Y),K=G[0],V=G[1];return[K,_0(X,V)]})}function D0(I){return new g0((J)=>{return[I,w]})}function VQ(I,J){return S([new j1(I,R1(J),w)])}function H0(I,J,Z){return A1(S([I]),J,Z)}function $9(I,J,Z,Y){return new g0((Q)=>{let W,X,G=EI(Q,I);if(G instanceof E){let O=G[0];if(O instanceof y){let R=O[0];X=Z.function(R)}else X=[J,w]}else{let O=G[0];X=[J,S([new j1(O,R1(Q),w)])]}W=_6(X,S([I]));let V=W,H=V[0],q=V[1],N=Y(H).function(Q),L=N[0],z=N[1];return[L,_0(q,z)]})}function p9(I){return new g0((J)=>{if(l9(J))return[P,w];else{let Y=I.function(J),Q=Y[0],W=Y[1];return[new y(Q),W]}})}function n9(I,J){return new g0((Z)=>{let Y=I.function(Z),Q=Y[0],W=Y[1],G=J(Q).function(Z),K=G,V=G[0];if(W instanceof U)return K;else return[V,W]})}function v6(I,J){return new g0((Z)=>{return[I,VQ(J,Z)]})}var HQ=void 0;function Y0(I){return I}function xI(I){if(/^[-+]?(\d+)$/.test(I))return I0(parseInt(I));else return V0(HQ)}function z0(I){return I.toString()}function TI(I){let J=SQ(I);if(J)return m6(Array.from(J).map((Z)=>Z.segment));else return m6(I.match(/./gsu))}var a9=void 0;function SQ(I){if(globalThis.Intl&&Intl.Segmenter)return a9||=new Intl.Segmenter,a9.segment(I)[Symbol.iterator]()}function PI(I,J){return m6(I.split(J))}function CI(I,J){return I.startsWith(J)}var t9=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),$G=new RegExp(`^[${t9}]*`),pG=new RegExp(`[${t9}]*$`);function R1(I){if(typeof I==="string")return"String";else if(typeof I==="boolean")return"Bool";else if(MQ(I))return"Result";else if(O8(I))return"List";else if(I instanceof P6)return"BitArray";else if(I instanceof H1)return"Dict";else if(Number.isInteger(I))return"Int";else if(Array.isArray(I))return"Array";else if(typeof I==="number")return"Float";else if(I===null)return"Nil";else if(I===void 0)return"Nil";else{let J=typeof I;return J.charAt(0).toUpperCase()+J.slice(1)}}var{MAX_SAFE_INTEGER:nG,MIN_SAFE_INTEGER:sG}=Number;function D8(I){let J=I.toString().replace("+","");if(J.indexOf(".")>=0)return J;else{let Z=J.indexOf("e");if(Z>=0)return J.slice(0,Z)+".0"+J.slice(Z);else return J+".0"}}class qQ{#I=new Set;inspect(I){let J=typeof I;if(I===!0)return"True";if(I===!1)return"False";if(I===null)return"//js(null)";if(I===void 0)return"Nil";if(J==="string")return this.#Y(I);if(J==="bigint"||Number.isInteger(I))return I.toString();if(J==="number")return D8(I);if(I instanceof qI)return this.#X(I);if(I instanceof P6)return this.#W(I);if(I instanceof RegExp)return`//js(${I})`;if(I instanceof Date)return`//js(Date("${I.toISOString()}"))`;if(I instanceof globalThis.Error)return`//js(${I.toString()})`;if(I instanceof Function){let Y=[];for(let Q of Array(I.length).keys())Y.push(String.fromCharCode(Q+97));return`//fn(${Y.join(", ")}) { ... }`}if(this.#I.size===this.#I.add(I).size)return"//js(circular reference)";let Z;if(Array.isArray(I))Z=`#(${I.map((Y)=>this.inspect(Y)).join(", ")})`;else if(O8(I))Z=this.#Z(I);else if(I instanceof F)Z=this.#J(I);else if(I instanceof H1)Z=this.#Q(I);else if(I instanceof Set)return`//js(Set(${[...I].map((Y)=>this.inspect(Y)).join(", ")}))`;else Z=this.#G(I);return this.#I.delete(I),Z}#G(I){let J=Object.getPrototypeOf(I)?.constructor?.name||"Object",Z=[];for(let W of Object.keys(I))Z.push(`${this.inspect(W)}: ${this.inspect(I[W])}`);let Y=Z.length?" "+Z.join(", ")+" ":"";return`//js(${J==="Object"?"":J+" "}{${Y}})`}#Q(I){let J="dict.from_list([",Z=!0;return J=m1(I,J,(Y,Q,W)=>{if(!Z)Y=Y+", ";return Z=!1,Y+"#("+this.inspect(Q)+", "+this.inspect(W)+")"}),J+"])"}#J(I){let J=Object.keys(I).map((Z)=>{let Y=this.inspect(I[Z]);return isNaN(parseInt(Z))?`${Z}: ${Y}`:Y}).join(", ");return J?`${I.constructor.name}(${J})`:I.constructor.name}#Z(I){if(SI(I))return"[]";let J='charlist.from_string("',Z="[",Y=I;while(V1(Y)){let Q=Y.head;if(Y=Y.tail,Z!=="[")Z+=", ";if(Z+=this.inspect(Q),J)if(Number.isInteger(Q)&&Q>=32&&Q<=126)J+=String.fromCharCode(Q);else J=null}if(J)return J+'")';else return Z+"]"}#Y(I){let J='"';for(let Z=0;Z<I.length;Z++){let Y=I[Z];switch(Y){case`
`:J+="\\n";break;case"\r":J+="\\r";break;case"\t":J+="\\t";break;case"\f":J+="\\f";break;case"\\":J+="\\\\";break;case'"':J+="\\\"";break;default:if(Y<" "||Y>"~"&&Y<" ")J+="\\u{"+Y.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else J+=Y}}return J+='"',J}#X(I){return`//utfcodepoint(${String.fromCodePoint(I.value)})`}#W(I){if(I.bitSize===0)return"<<>>";let J="<<";for(let Z=0;Z<I.byteSize-1;Z++)J+=I.byteAt(Z).toString(),J+=", ";if(I.byteSize*8===I.bitSize)J+=I.byteAt(I.byteSize-1).toString();else{let Z=I.bitSize%8;J+=I.byteAt(I.byteSize-1)>>8-Z,J+=`:size(${Z})`}return J+=">>",J}}function EI(I,J){if(I instanceof H1){let Y=S1(I,J);return I0(Y.isOk()?new y(Y[0]):new F1)}if(I instanceof WeakMap||I instanceof Map){let Y={},Q=I.get(J,Y);if(Q===Y)return I0(new F1);return I0(new y(Q))}let Z=Number.isInteger(J);if(Z&&J>=0&&J<8&&O8(I)){let Y=0;for(let Q of I){if(Y===J)return I0(new y(Q));Y++}return V0("Indexable")}if(Z&&Array.isArray(I)||I&&typeof I==="object"||I&&Object.getPrototypeOf(I)===Object.prototype){if(J in I)return I0(new y(I[J]));return I0(new F1)}return V0(Z?"Indexable":"Dict")}function s9(I,J,Z,Y,Q){if(!(O8(I)||Array.isArray(I))){let X=u9("List",R1(I),Q);return[Q,m6([X])]}let W=[];for(let X of I){let G=J(X),[K,V]=G;if(V1(V)){let[H,q]=Z(G,Y.toString());return[Q,q]}W.push(K),Y++}return[m6(W),Q]}function r9(I){if(typeof I==="number")return I0(I);return V0(0)}function i9(I){if(Number.isInteger(I))return I0(I);return V0(0)}function d9(I){if(typeof I==="string")return I0(I);return V0("")}function l9(I){return I===null||I===void 0}function m6(I){let J=Q9(),Z=I.length;while(Z--)J=J6(I[Z],J);return J}function O8(I){return SI(I)||V1(I)}function MQ(I){return N0(I)||W9(I)}class o9 extends F{}var zQ=new o9;class gI extends F{}var NK=new gI;class e9 extends F{}var UK=new e9;class I5 extends F{}var DK=new I5;class J5 extends F{}var OK=new J5;class Z5 extends F{}var BK=new Z5;function B8(I,J){if(I instanceof E){let Z=I[0];return new E(J(Z))}else return I}function Y5(I,J){if(I instanceof E)return I;else{let Z=I[0];return new W0(J(Z))}}function u6(I,J){if(I instanceof E){let Z=I[0];return J(Z)}else return I}function fI(I,J){if(I instanceof E)return I[0];else return J}class bI extends F{}var EK=new bI;class yI extends F{}var xK=new yI;class Q5 extends F{}var kK=new Q5;class W5 extends F{}var $K=new W5;class X5 extends F{}var rK=new X5;class G5 extends F{}var UQ=new G5;class K5 extends F{}var iK=new K5;class V5 extends F{}var DQ=new V5;class H5 extends F{}var oK=new H5;function S5(I,J,Z){if(I)return J;else return Z()}function P0(I){return I}function _I(I){return JSON.stringify(I)}function M5(I){return Object.fromEntries(I)}function $1(I){return I}function z5(I){let J=[];while(V1(I))J.push(Z6(I)),I=J1(I);return J}function R5(){return null}function L5(I){try{let J=JSON.parse(I);return I0(J)}catch(J){return V0(jQ(J,I))}}function jQ(I,J){if(AQ(I))return N5();return TQ(I,J)}function AQ(I){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(I.message)}function TQ(I,J){let Z=[PQ,CQ,EQ,wQ];for(let Y of Z){let Q=Y(I,J);if(Q)return Q}return K6("")}function PQ(I){let Z=/unexpected token '(.)', ".+" is not valid JSON/i.exec(I.message);if(!Z)return null;let Y=A8(Z[1]);return K6(Y)}function CQ(I){let Z=/unexpected token (.) in JSON at position (\d+)/i.exec(I.message);if(!Z)return null;let Y=A8(Z[1]);return K6(Y)}function wQ(I,J){let Y=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(I.message);if(!Y)return null;let Q=Number(Y[2]),W=Number(Y[3]),X=xQ(Q,W,J),G=A8(J[X]);return K6(G)}function EQ(I){let Z=/unexpected (identifier|token) "(.)"/i.exec(I.message);if(!Z)return null;let Y=A8(Z[2]);return K6(Y)}function A8(I){return"0x"+I.charCodeAt(0).toString(16).toUpperCase()}function xQ(I,J,Z){if(I===1)return J-1;let Y=1,Q=0;return Z.split("").find((W,X)=>{if(W===`
`)Y+=1;if(Y===I)return Q=X+J,!0;return!1}),Q}class U5 extends F{}var kQ=new U5,N5=()=>kQ;class D5 extends F{constructor(I){super();this[0]=I}}var K6=(I)=>new D5(I);class O5 extends F{constructor(I){super();this[0]=I}}function gQ(I,J){return u6(L5(I),(Z)=>{let Y=Y1(Z,J);return Y5(Y,(Q)=>{return new O5(Q)})})}function hI(I,J){return gQ(I,J)}function B5(I){return _I(I)}function m0(I){return $1(I)}function vI(I){return $1(I)}function p1(I){return $1(I)}function fQ(){return R5()}function mI(I,J){if(I instanceof y){let Z=I[0];return J(Z)}else return fQ()}function c6(I){return M5(I)}function bQ(I){return z5(I)}function T8(I,J){let Y=M0(I,J);return bQ(Y)}function $6(I){return I.replaceAll(/[><&"']/g,(J)=>{switch(J){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return J}})}var C=w,V6=new W0(void 0);function O0(I){return M(I,C)}var yQ=K9(),_Q=X9(),hQ=G9();function P8(I,J){if(I.name===J.name)return hQ;else if(I.name<J.name)return _Q;else return yQ}class d0 extends F{constructor(I,J,Z){super();this.kind=I,this.name=J,this.value=Z}}class F6 extends F{constructor(I,J,Z){super();this.kind=I,this.name=J,this.value=Z}}class A0 extends F{constructor(I,J,Z,Y,Q,W,X,G){super();this.kind=I,this.name=J,this.handler=Z,this.include=Y,this.prevent_default=Q,this.stop_propagation=W,this.debounce=X,this.throttle=G}}class H6 extends F{constructor(I,J,Z){super();this.prevent_default=I,this.stop_propagation=J,this.message=Z}}class E5 extends F{constructor(I){super();this.kind=I}}class x5 extends F{constructor(I){super();this.kind=I}}var cI=0,$I=1,pI=2,nI=0,sI=new E5(nI),cQ=1,rI=new x5(cQ),iI=2;function k5(I,J){return new d0(cI,I,J)}function g5(I,J){return new F6($I,I,J)}function dI(I,J,Z,Y,Q,W,X){return new A0(pI,I,J,Z,Y,Q,W,X)}function $Q(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else{let Q=Z.head;if(Q instanceof d0){let W=Q.name;if(W==="")I=Z.tail,J=Y;else if(W==="class"){let X=Q.value;if(X==="")I=Z.tail,J=Y;else{let G=Z.tail;if(G instanceof U){let K=Q;I=G,J=M(K,Y)}else{let K=G.head;if(K instanceof d0)if(K.name==="class"){let H=Q.kind,q=X,N=G.tail,L=K.value,z=q+" "+L,O=new d0(H,"class",z);I=M(O,N),J=Y}else{let H=Q;I=G,J=M(H,Y)}else{let V=Q;I=G,J=M(V,Y)}}}}else if(W==="style"){let X=Q.value;if(X==="")I=Z.tail,J=Y;else{let G=Z.tail;if(G instanceof U){let K=Q;I=G,J=M(K,Y)}else{let K=G.head;if(K instanceof d0)if(K.name==="style"){let H=Q.kind,q=X,N=G.tail,L=K.value,z=q+";"+L,O=new d0(H,"style",z);I=M(O,N),J=Y}else{let H=Q;I=G,J=M(H,Y)}else{let V=Q;I=G,J=M(V,Y)}}}}else{let X=Q;I=Z.tail,J=M(X,Y)}}else{let W=Q;I=Z.tail,J=M(W,Y)}}}}function f5(I){if(I instanceof U)return I;else if(I.tail instanceof U)return I;else{let Y=P9(I,(Q,W)=>{return P8(W,Q)});return $Q(Y,C)}}function C0(I,J){return k5(I,J)}function lI(I,J){return g5(I,J)}function sQ(I,J){if(J)return C0(I,"");else return lI(I,vI(!1))}function $(I){return C0("class",I)}function b5(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)return Y;else if(Z.head[1]){let W=Z.tail,X=Z.head[0];return Y+X+" "+b5(W,Y)}else I=Z.tail,J=Y}}function C8(I){return $(b5(I,""))}function l0(I){return C0("id",I)}function y5(I){return C0("spellcheck",(()=>{if(I)return"true";else return"false"})())}function _5(I){return C0("tabindex",z0(I))}function aI(I){return sQ("disabled",I)}function h5(I){return C0("for",I)}function v5(I){return C0("max",I)}function m5(I){return C0("min",I)}function u5(I){return C0("placeholder",I)}function c5(I){return C0("type",I)}function w8(I){return C0("value",I)}class p6 extends F{constructor(I,J,Z){super();this.synchronous=I,this.before_paint=J,this.after_paint=Z}}class $5 extends F{constructor(I,J,Z,Y,Q,W,X){super();this.dispatch=I,this.emit=J,this.select=Z,this.root=Y,this.provide=Q,this.subscribe=W,this.unsubscribe=X}}var S6=new p6(C,C,C);function X0(){return S6}function n6(I){return new p6(O0((Z)=>{let Y=Z.dispatch;return I(Y)}),S6.before_paint,S6.after_paint)}function tI(I){let J=(Z)=>{let Y=Z.root(),Q=Z.dispatch;return I(Q,Y)};return new p6(S6.synchronous,O0(J),S6.after_paint)}function E8(I){return k0(I,S6,(J,Z)=>{return new p6(k0(Z.synchronous,J.synchronous,U8),k0(Z.before_paint,J.before_paint,U8),k0(Z.after_paint,J.after_paint,U8))})}function p5(I,J,Z,Y,Q,W,X,G){let K=new $5(J,Z,Y,Q,W,X,G);return C9(I.synchronous,(V)=>{return V(K)})}function J0(){return null}function r1(I,J){return I?.get(J)}function q6(I,J,Z){return I?.get(J)??Z()}function Q1(I,J){return I&&I.has(J)}function c0(I,J,Z){return I??=new Map,I.set(J,Z),I}function x8(I,J){return I?.delete(J),I}function n5(I,J){if(typeof I==="number"&&typeof J==="number")return I===J||I!==I&&J!==J;return I===J}function s5(I,J){while(!0){let Z=I,Y=J;if(Z instanceof U)if(Y instanceof U)return!0;else return!1;else if(Y instanceof U)return!1;else{let{head:Q,tail:W}=Z,X=Y.head,G=Y.tail,K=n5(Q,X);if(K)I=W,J=G;else return K}}}class a0 extends F{constructor(I,J,Z,Y){super();this.kind=I,this.key=J,this.children=Z,this.keyed_children=Y}}class t0 extends F{constructor(I,J,Z,Y,Q,W,X,G,K){super();this.kind=I,this.key=J,this.namespace=Z,this.tag=Y,this.attributes=Q,this.children=W,this.keyed_children=X,this.self_closing=G,this.void=K}}class W1 extends F{constructor(I,J,Z){super();this.kind=I,this.key=J,this.content=Z}}class X1 extends F{constructor(I,J,Z,Y,Q,W){super();this.kind=I,this.key=J,this.namespace=Z,this.tag=Y,this.attributes=Q,this.inner_html=W}}class f0 extends F{constructor(I,J,Z,Y){super();this.kind=I,this.key=J,this.mapper=Z,this.child=Y}}class i1 extends F{constructor(I,J,Z,Y){super();this.kind=I,this.key=J,this.dependencies=Z,this.view=Y}}var d1=0,C1=1,M6=2,r5=3,P1=4,eI=5;function g8(I,J,Z){return new a0(d1,I,J,Z)}function r6(I,J,Z,Y,Q,W,X,G){return new t0(C1,I,J,Z,f5(Y),Q,W,X,G)}function i6(I,J){if(J==="")if(I==="area")return!0;else if(I==="base")return!0;else if(I==="br")return!0;else if(I==="col")return!0;else if(I==="embed")return!0;else if(I==="hr")return!0;else if(I==="img")return!0;else if(I==="input")return!0;else if(I==="link")return!0;else if(I==="meta")return!0;else if(I==="param")return!0;else if(I==="source")return!0;else if(I==="track")return!0;else if(I==="wbr")return!0;else return!1;else return!1}function I7(I,J){return new W1(M6,I,J)}function i5(I,J){if(I instanceof f0){let Z=I.mapper;return new f0(P1,I.key,(Y)=>{return P0(J)(Z(Y))},P0(I.child))}else return new f0(P1,I.key,P0(J),P0(I))}function d5(I,J,Z){return new i1(eI,I,J,Z)}function k8(I,J){if(J instanceof a0)return new a0(J.kind,I,J.children,J.keyed_children);else if(J instanceof t0)return new t0(J.kind,I,J.namespace,J.tag,J.attributes,J.children,J.keyed_children,J.self_closing,J.void);else if(J instanceof W1)return new W1(J.kind,I,J.content);else if(J instanceof X1)return new X1(J.kind,I,J.namespace,J.tag,J.attributes,J.inner_html);else if(J instanceof f0){let Z=J.child;return new f0(J.kind,I,J.mapper,k8(I,Z))}else{let Z=J.view;return new i1(J.kind,I,J.dependencies,()=>{return k8(I,Z())})}}class l5 extends F{}var $V=new l5;class a5 extends F{}var pV=new a5;class t5 extends F{}var nV=new t5;class o5 extends F{}var sV=new o5;class e5 extends F{}var rV=new e5;function b0(I,J,Z){return r6("","",I,J,Z,J0(),!1,i6(I,""))}function d6(I){return I7("",I)}function I4(){return I7("","")}function J4(I){return g8("",I,J0())}function Z4(I,J){return d5("",I,J)}function Y4(I){return P0(I)}function Q4(I,J){return i5(I,J)}function t(I){return d6(I)}function W4(I,J){return b0("h2",I,J)}function X4(I,J){return b0("h3",I,J)}function G0(I,J){return b0("div",I,J)}function G4(I,J){return b0("pre",I,J)}function K4(I,J){return b0("code",I,J)}function l6(I,J){return b0("span",I,J)}function E1(I,J){return b0("button",I,J)}function V4(I){return b0("input",I,C)}function F4(I,J){return b0("label",I,J)}function H4(I,J){return b0("textarea",M(lI("value",m0(J)),I),S([d6(J)]))}class f8 extends F{constructor(I,J,Z,Y,Q){super();this.index=I,this.path=J,this.removed=Z,this.changes=Y,this.children=Q}}class S4 extends F{constructor(I,J){super();this.kind=I,this.content=J}}class q4 extends F{constructor(I,J){super();this.kind=I,this.inner_html=J}}class M4 extends F{constructor(I,J,Z){super();this.kind=I,this.added=J,this.removed=Z}}class z4 extends F{constructor(I,J,Z){super();this.kind=I,this.key=J,this.before=Z}}class R4 extends F{constructor(I,J,Z){super();this.kind=I,this.index=J,this.with=Z}}class L4 extends F{constructor(I,J){super();this.kind=I,this.index=J}}class N4 extends F{constructor(I,J,Z){super();this.kind=I,this.children=J,this.before=Z}}var Z7=0,Y7=1,Q7=2,W7=3,X7=4,G7=5,K7=6;function x1(I,J,Z,Y){return new f8(I,C,J,Z,Y)}function U4(I){return new S4(Z7,I)}function D4(I){return new q4(Y7,I)}function V7(I,J){return new M4(Q7,I,J)}function O4(I,J){return new z4(W7,I,J)}function B4(I){return new L4(X7,I)}function L1(I,J){return new R4(G7,I,J)}function F7(I,J){return new N4(K7,I,J)}function j4(I,J){return new f8(J,M(I.index,I.path),I.removed,I.changes,I.children)}class T4 extends F{constructor(I,J,Z,Y,Q,W,X,G,K){super();this.kind=I,this.open_shadow_root=J,this.will_adopt_styles=Z,this.observed_attributes=Y,this.observed_properties=Q,this.requested_contexts=W,this.provided_contexts=X,this.vdom=G,this.memos=K}}class P4 extends F{constructor(I,J,Z){super();this.kind=I,this.patch=J,this.memos=Z}}class C4 extends F{constructor(I,J,Z){super();this.kind=I,this.name=J,this.data=Z}}class w4 extends F{constructor(I,J,Z){super();this.kind=I,this.key=J,this.value=Z}}class E4 extends F{constructor(I,J){super();this.kind=I,this.key=J}}class x4 extends F{constructor(I,J){super();this.kind=I,this.key=J}}class k4 extends F{constructor(I,J){super();this.kind=I,this.messages=J}}var g4=(I)=>I instanceof k4;class f4 extends F{constructor(I,J,Z){super();this.kind=I,this.name=J,this.value=Z}}var b4=(I)=>I instanceof f4;class y4 extends F{constructor(I,J,Z){super();this.kind=I,this.name=J,this.value=Z}}var _4=(I)=>I instanceof y4;class h4 extends F{constructor(I,J,Z,Y){super();this.kind=I,this.path=J,this.name=Z,this.event=Y}}var v4=(I)=>I instanceof h4;class m4 extends F{constructor(I,J,Z){super();this.kind=I,this.key=J,this.value=Z}}var u4=(I)=>I instanceof m4;var lQ=0,aQ=1,tQ=2,oQ=3,eQ=4,IW=5;function c4(I,J,Z,Y,Q,W,X,G){return new T4(lQ,I,J,Z,Y,Q,W,X,G)}function H7(I,J){return new P4(aQ,I,J)}function $4(I,J){return new C4(tQ,I,J)}function p4(I,J){return new w4(oQ,I,J)}function n4(I){return new E4(eQ,I)}function s4(I){return new x4(IW,I)}class S7 extends F{}var JW=new S7;class q7 extends F{constructor(I,J){super();this.key=I,this.parent=J}}class M7 extends F{constructor(I,J){super();this.index=I,this.parent=J}}class d4 extends F{constructor(I){super();this.parent=I}}var y8="\r",b8="\t",z7=`
`,_8=JW;function i4(I){if(I instanceof U)return"";else{let J=I.tail;return _9(J)}}function R7(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Q instanceof S7)return i4(W);else if(Q instanceof q7){let{key:X,parent:G}=Q;I=Y,J=G,Z=M(b8,M(X,W))}else if(Q instanceof M7){let{index:X,parent:G}=Q,K=M(b8,M(z0(X),W));I=Y,J=G,Z=K}else if(!Y)return i4(W);else{let X=Q.parent;if(W instanceof U)I=Y,J=X,Z=W;else{let G=W.tail;I=Y,J=X,Z=M(y8,G)}}}}function ZW(I){return R7(!0,I,C)}function YW(I,J){while(!0){let Z=I,Y=J;if(Y instanceof U)return!1;else{let{head:Q,tail:W}=Y,X=CI(Z,Q);if(X)return X;else I=Z,J=W}}}function l4(I,J){if(J instanceof U)return!1;else return YW(ZW(I),J)}function a4(I){return y9(I,y8)}function w0(I,J,Z){if(Z==="")return new M7(J,I);else return new q7(Z,I)}function h8(I){return new d4(I)}function L7(I,J){return R7(!1,I,M(z7,M(J,C)))}function a6(I){return R7(!1,I,C)}class N1 extends F{constructor(I,J,Z,Y,Q){super();this.events=I,this.vdoms=J,this.old_vdoms=Z,this.dispatched_paths=Y,this.next_dispatched_paths=Q}}class k1 extends F{constructor(I,J){super();this.handlers=I,this.children=J}}class m8 extends F{constructor(I,J){super();this.mapper=I,this.events=J}}class IJ extends F{constructor(I,J,Z){super();this.handlers=I,this.children=J,this.vdoms=Z}}class D7 extends F{constructor(I,J){super();this.path=I,this.handler=J}}class N7 extends F{constructor(I){super();this.path=I}}function QW(I,J){return(Z)=>{return I(J(Z))}}function JJ(){return new k1(J0(),J0())}function O7(){return new N1(JJ(),J0(),J0(),C,C)}function ZJ(I,J,Z,Y){return c0(I,L7(J,Z),Y)}function o4(I,J,Z){return k0(Z,I,(Y,Q)=>{if(Q instanceof A0){let{name:W,handler:X}=Q;return ZJ(Y,J,W,X)}else return Y})}function v8(I,J,Z,Y,Q,W){while(!0){let X=I,G=J,K=Z,V=Y,H=Q,q=W,N=H+1;if(q instanceof U)return new IJ(X,G,K);else{let L=q.head;if(L instanceof a0){let z=q.tail,O=L.key,R=L.children,A=w0(V,H,O),T=v8(X,G,K,A,0,R),D=T.handlers,B=T.children,j=T.vdoms;I=D,J=B,Z=j,Y=V,Q=N,W=z}else if(L instanceof t0){let z=q.tail,O=L.key,R=L.attributes,A=L.children,T=w0(V,H,O),D=o4(X,T,R),B=v8(D,G,K,T,0,A),j=B.handlers,x=B.children,_=B.vdoms;I=j,J=x,Z=_,Y=V,Q=N,W=z}else if(L instanceof W1){let z=q.tail;I=X,J=G,Z=K,Y=V,Q=N,W=z}else if(L instanceof X1){let z=q.tail,O=L.key,R=L.attributes,A=w0(V,H,O);I=o4(X,A,R),J=G,Z=K,Y=V,Q=N,W=z}else if(L instanceof f0){let z=q.tail,O=L.key,R=L.mapper,A=L.child,T=w0(V,H,O),D=v8(J0(),J0(),K,h8(T),0,O0(A)),B=D.vdoms,j=new k1(D.handlers,D.children),x=new m8(R,j),_=c0(G,a6(T),x);I=X,J=_,Z=B,Y=V,Q=N,W=z}else{let z=q.tail,O=L.view,R=O(),A=c0(K,O,R),T=H,D=M(R,z);I=X,J=G,Z=A,Y=V,Q=T,W=D}}}}function B7(I,J,Z,Y,Q){let W=I.vdoms,X=J.handlers,G=J.children,K=v8(X,G,W,Z,Y,Q),V=K.handlers,H=K.children,q=K.vdoms;return[new N1(I.events,q,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths),new k1(V,H)]}function u8(I,J,Z,Y,Q){let W=O0(Q);return B7(I,J,Z,Y,W)}function YJ(I){let J=O7(),Z=u8(J,J.events,_8,0,I),Y=Z[0],Q=Z[1];return new N1(Q,Y.vdoms,Y.old_vdoms,Y.dispatched_paths,Y.next_dispatched_paths)}function QJ(I){return new N1(I.events,J0(),I.vdoms,I.next_dispatched_paths,C)}function WJ(I){return I.events}function XJ(I,J){return new N1(J,I.vdoms,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function z6(I){return I.vdoms}function GJ(I,J,Z){return q6(I.old_vdoms,J,Z)}function KJ(I,J,Z){let Y=q6(I.old_vdoms,J,Z),Q=c0(I.vdoms,Z,Y);return new N1(I.events,Q,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function VJ(I,J,Z){let Y=c0(I.vdoms,J,Z);return new N1(I.events,Y,I.old_vdoms,I.dispatched_paths,I.next_dispatched_paths)}function FJ(I,J,Z){return q6(I.children,J,()=>{return new m8(Z,JJ())}).events}function HJ(I,J,Z,Y){let Q=new m8(Z,Y),W=c0(I.children,J,Q);return new k1(I.handlers,W)}function R6(I,J,Z,Y){let Q=ZJ(I.handlers,J,Z,Y);return new k1(Q,I.children)}function SJ(I,J,Z){return x8(I,L7(J,Z))}function c8(I,J,Z){let Y=SJ(I.handlers,J,Z);return new k1(Y,I.children)}function e4(I,J,Z){return k0(Z,I,(Y,Q)=>{if(Q instanceof A0){let W=Q.name;return SJ(Y,J,W)}else return Y})}function U7(I,J,Z,Y,Q,W){while(!0){let X=I,G=J,K=Z,V=Y,H=Q,q=W,N=H+1;if(q instanceof U)return new k1(X,G);else{let L=q.head;if(L instanceof a0){let z=q.tail,O=L.key,R=L.children,A=w0(V,H,O),T=U7(X,G,K,A,0,R),D=T.handlers,B=T.children;I=D,J=B,Z=K,Y=V,Q=N,W=z}else if(L instanceof t0){let z=q.tail,O=L.key,R=L.attributes,A=L.children,T=w0(V,H,O),D=e4(X,T,R),B=U7(D,G,K,T,0,A),j=B.handlers,x=B.children;I=j,J=x,Z=K,Y=V,Q=N,W=z}else if(L instanceof W1){let z=q.tail;I=X,J=G,Z=K,Y=V,Q=N,W=z}else if(L instanceof X1){let z=q.tail,O=L.key,R=L.attributes,A=w0(V,H,O);I=e4(X,A,R),J=G,Z=K,Y=V,Q=N,W=z}else if(L instanceof f0){let z=q.tail,O=L.key,R=w0(V,H,O),A=x8(G,a6(R));I=X,J=A,Z=K,Y=V,Q=N,W=z}else{let z=q.tail,O=L.view;if(Q1(K,O)){let A=r1(K,O),T=M(A,z);I=X,J=G,Z=K,Y=V,Q=H,W=T}else I=X,J=G,Z=K,Y=V,Q=N,W=z}}}}function $8(I,J,Z,Y,Q){return U7(J.handlers,J.children,I.old_vdoms,Z,Y,O0(Q))}function U1(I,J,Z,Y,Q,W){let X=$8(I,J,Z,Y,Q);return u8(I,X,Z,Y,W)}function WW(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Q instanceof U)return V6;else{let X=Q.tail;if(X instanceof U){let G=Q.head;if(Q1(Y.handlers,G)){let V=r1(Y.handlers,G);return new E(u1(V,(H)=>{return new H6(H.prevent_default,H.stop_propagation,P0(W)(H.message))}))}else return V6}else{let G=Q.head,K=X;if(Q1(Y.children,G)){let H=r1(Y.children,G),q=QW(W,H.mapper);I=H.events,J=K,Z=q}else return V6}}}}function j7(I,J,Z,Y){let Q=a4(J+z7+Z),W=WW(I.events,Q,P0);if(W instanceof E){let X=W[0],G=Y1(Y,X);if(G instanceof E){let K=G[0];return new D7(J,K)}else return new N7(J)}else return new N7(J)}function A7(I,J){let Z=M(J.path,I.next_dispatched_paths),Y=new N1(I.events,I.vdoms,I.old_vdoms,I.dispatched_paths,Z);if(J instanceof D7){let Q=J.handler;return[Y,new E(Q)]}else return[Y,V6]}function qJ(I,J,Z,Y){let Q=j7(I,J,Z,Y);return((W)=>{return A7(I,W)})(Q)}function p8(I,J){return l4(J,I.dispatched_paths)}class MJ extends F{constructor(I){super();this.message=I}}var zJ=(I)=>I instanceof MJ;class RJ extends F{constructor(I){super();this.callback=I}}var LJ=(I)=>I instanceof RJ;class NJ extends F{constructor(I){super();this.callback=I}}var UJ=(I)=>I instanceof NJ;class s8 extends F{constructor(I){super();this.message=I}}var DJ=(I)=>new s8(I),t6=(I)=>I instanceof s8;class T7 extends F{constructor(I,J){super();this.name=I,this.data=J}}var OJ=(I,J)=>new T7(I,J),o6=(I)=>I instanceof T7;class P7 extends F{constructor(I,J){super();this.key=I,this.value=J}}var BJ=(I,J)=>new P7(I,J),jJ=(I)=>I instanceof P7;class C7 extends F{constructor(I,J){super();this.key=I,this.decoder=J}}var AJ=(I,J)=>new C7(I,J),TJ=(I)=>I instanceof C7;class w7 extends F{constructor(I){super();this.key=I}}var PJ=(I)=>new w7(I),CJ=(I)=>I instanceof w7;class E7 extends F{}var XW=new E7;var e6=(I)=>I instanceof E7;class x7 extends F{constructor(I,J,Z,Y,Q){super();this.name=I,this.init=J,this.update=Z,this.view=Y,this.config=Q}}class k7 extends F{constructor(I,J,Z,Y,Q,W,X,G,K,V,H,q,N,L){super();this.open_shadow_root=I,this.adopt_styles=J,this.delegates_focus=Z,this.attributes=Y,this.properties=Q,this.contexts=W,this.is_form_associated=X,this.on_form_autofill=G,this.on_form_reset=K,this.on_form_restore=V,this.on_form_disabled=H,this.on_connect=q,this.on_adopt=N,this.on_disconnect=L}}var EJ=new k7(!0,!0,!1,C,C,C,!1,P,P,P,P,P,P,P);var o0=(I,J)=>{if(I===J)return!0;if(I==null||J==null)return!1;let Z=typeof I;if(Z!==typeof J)return!1;if(Z!=="object")return!1;if(I.constructor!==J.constructor)return!1;if(Array.isArray(I))return GW(I,J);return KW(I,J)},GW=(I,J)=>{let Z=I.length;if(Z!==J.length)return!1;while(Z--)if(!o0(I[Z],J[Z]))return!1;return!0},KW=(I,J)=>{let Z=Object.keys(I),Y=Z.length;if(Object.keys(J).length!==Y)return!1;while(Y--){let Q=Z[Y];if(!Object.hasOwn(J,Q))return!1;if(!o0(I[Q],J[Q]))return!1}return!0};class kJ extends F{constructor(I,J){super();this.patch=I,this.cache=J}}class f7 extends F{constructor(I,J,Z){super();this.patch=I,this.cache=J,this.events=Z}}class gJ extends F{constructor(I,J,Z){super();this.added=I,this.removed=J,this.events=Z}}function xJ(I,J,Z,Y,Q,W,X){while(!0){let G=I,K=J,V=Z,H=Y,q=Q,N=W,L=X;if(H instanceof U)if(q instanceof U)return new gJ(N,L,V);else{let z=q.head;if(z instanceof A0){let O=z,R=q.tail,A=z.name,T=z.handler,D=R6(V,K,A,T),B=M(O,N);I=G,J=K,Z=D,Y=H,Q=R,W=B,X=L}else{let O=z,R=q.tail,A=M(O,N);I=G,J=K,Z=V,Y=H,Q=R,W=A,X=L}}else if(q instanceof U){let z=H.head;if(z instanceof A0){let O=z,R=H.tail,A=z.name,T=c8(V,K,A),D=M(O,L);I=G,J=K,Z=T,Y=R,Q=q,W=N,X=D}else{let O=z,R=H.tail,A=M(O,L);I=G,J=K,Z=V,Y=R,Q=q,W=N,X=A}}else{let{head:z,tail:O}=H,R=q.head,A=q.tail,T=P8(z,R);if(T instanceof E0)if(z instanceof A0){let D=z.name;I=G,J=K,Z=c8(V,K,D),Y=O,Q=q,W=N,X=M(z,L)}else I=G,J=K,Z=V,Y=O,Q=q,W=N,X=M(z,L);else if(T instanceof x0)if(z instanceof d0)if(R instanceof d0){let D,B=R.name;if(B==="value")D=G||z.value!==R.value;else if(B==="checked")D=G||z.value!==R.value;else if(B==="selected")D=G||z.value!==R.value;else D=z.value!==R.value;let j=D,x;if(j)x=M(R,N);else x=N;let _=x;I=G,J=K,Z=V,Y=O,Q=A,W=_,X=L}else if(R instanceof A0){let{name:D,handler:B}=R;I=G,J=K,Z=R6(V,K,D,B),Y=O,Q=A,W=M(R,N),X=M(z,L)}else I=G,J=K,Z=V,Y=O,Q=A,W=M(R,N),X=M(z,L);else if(z instanceof F6)if(R instanceof F6){let D,B=R.name;if(B==="scrollLeft")D=!0;else if(B==="scrollRight")D=!0;else if(B==="value")D=G||!o0(z.value,R.value);else if(B==="checked")D=G||!o0(z.value,R.value);else if(B==="selected")D=G||!o0(z.value,R.value);else D=!o0(z.value,R.value);let j=D,x;if(j)x=M(R,N);else x=N;let _=x;I=G,J=K,Z=V,Y=O,Q=A,W=_,X=L}else if(R instanceof A0){let{name:D,handler:B}=R;I=G,J=K,Z=R6(V,K,D,B),Y=O,Q=A,W=M(R,N),X=M(z,L)}else I=G,J=K,Z=V,Y=O,Q=A,W=M(R,N),X=M(z,L);else if(R instanceof A0){let{name:D,handler:B}=R,j=z.prevent_default.kind!==R.prevent_default.kind||z.stop_propagation.kind!==R.stop_propagation.kind||z.debounce!==R.debounce||z.throttle!==R.throttle,x;if(j)x=M(R,N);else x=N;let _=x;I=G,J=K,Z=R6(V,K,D,B),Y=O,Q=A,W=_,X=L}else{let D=z.name;I=G,J=K,Z=c8(V,K,D),Y=O,Q=A,W=M(R,N),X=M(z,L)}else if(R instanceof A0){let{name:D,handler:B}=R;I=G,J=K,Z=R6(V,K,D,B),Y=H,Q=A,W=M(R,N),X=L}else I=G,J=K,Z=V,Y=H,Q=A,W=M(R,N),X=L}}}function VW(I,J,Z,Y){if(Z==="input"&&J==="")return p8(I,Y);else if(Z==="select"&&J==="")return p8(I,Y);else if(Z==="textarea"&&J==="")return p8(I,Y);else return!1}function r8(I,J,Z,Y,Q,W,X,G,K,V,H,q,N,L){while(!0){let z=I,O=J,R=Z,A=Y,T=Q,D=W,B=X,j=G,x=K,_=V,f=H,h=q,l=N,o=L;if(z instanceof U)if(R instanceof U){let S0,L0=a1();if(_ instanceof U)if(f instanceof U)S0=x1(x,B,_,f);else if(!L0)if(f.tail instanceof U&&B===0){let b=f.head;S0=j4(b,x)}else S0=x1(x,B,_,f);else S0=x1(x,B,_,f);else S0=x1(x,B,_,f);return new f7(S0,l,o)}else{let S0=B7(l,o,h,j,R),L0=S0[0],a=S0[1],p=F7(R,j-D),b=M(p,_),c=x1(x,B,b,f);return new f7(c,L0,a)}else if(R instanceof U){let{head:S0,tail:L0}=z;if(S0.key===""||!Q1(T,S0.key)){let p=$8(l,o,h,j,S0);I=L0,J=O,Z=R,Y=A,Q=T,W=D,X=B+1,G=j,K=x,V=_,H=f,q=h,N=l,L=p}else I=L0,J=O,Z=R,Y=A,Q=T,W=D,X=B,G=j,K=x,V=_,H=f,q=h,N=l,L=o}else{let S0=z.head,L0=R.head;if(S0.key!==L0.key){let a=z.tail,p=R.tail,b=Q1(O,L0.key);if(Q1(A,S0.key))if(b)if(Q1(T,S0.key))I=a,J=O,Z=R,Y=A,Q=T,W=D-1,X=B,G=j,K=x,V=_,H=f,q=h,N=l,L=o;else{let v=r1(O,L0.key),m=j-D,g=M(O4(L0.key,m),_),n=c0(T,L0.key,void 0);I=M(v,z),J=O,Z=R,Y=A,Q=n,W=D+1,X=B,G=j,K=x,V=g,H=f,q=h,N=l,L=o}else{let k=j-D,v=u8(l,o,h,j,L0),m=v[0],g=v[1],n=F7(O0(L0),k),s=M(n,_);I=z,J=O,Z=p,Y=A,Q=T,W=D+1,X=B,G=j+1,K=x,V=s,H=f,q=h,N=m,L=g}else if(b){let k=j-D,v=M(B4(k),_),m=$8(l,o,h,j,S0);I=a,J=O,Z=R,Y=A,Q=T,W=D-1,X=B,G=j,K=x,V=v,H=f,q=h,N=l,L=m}else{let k=L1(j-D,L0),v=U1(l,o,h,j,S0,L0),m=v[0],g=v[1];I=a,J=O,Z=p,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(k,_),H=f,q=h,N=m,L=g}}else{let a=z.head;if(a instanceof a0){let p=R.head;if(p instanceof a0){let b=a,c=z.tail,k=p,v=R.tail,m=r8(b.children,b.keyed_children,k.children,k.keyed_children,J0(),0,0,0,j,C,C,w0(h,j,k.key),l,o),g=m.patch,n=m.cache,s=m.events,T0;if(g.changes instanceof U)if(g.children instanceof U)if(g.removed===0)T0=f;else T0=M(g,f);else T0=M(g,f);else T0=M(g,f);let I1=T0;I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=I1,q=h,N=n,L=s}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}else if(a instanceof t0){let p=R.head;if(p instanceof t0){let b=a,c=p;if(b.namespace===c.namespace&&b.tag===c.tag){let k=z.tail,v=R.tail,m=w0(h,j,c.key),g=VW(l,c.namespace,c.tag,m),n=xJ(g,m,o,b.attributes,c.attributes,C,C),s=n.added,T0=n.removed,e0=n.events,I1;if(s instanceof U&&T0 instanceof U)I1=C;else I1=O0(V7(s,T0));let y0=I1,e1=r8(b.children,b.keyed_children,c.children,c.keyed_children,J0(),0,0,0,j,y0,C,m,l,e0),s0=e1.patch,I6=e1.cache,H8=e1.events,j6;if(s0.changes instanceof U)if(s0.children instanceof U)if(s0.removed===0)j6=f;else j6=M(s0,f);else j6=M(s0,f);else j6=M(s0,f);let qY=j6;I=k,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=qY,q=h,N=I6,L=H8}else{let k=a,v=z.tail,m=p,g=R.tail,n=L1(j-D,m),s=U1(l,o,h,j,k,m),T0=s[0],e0=s[1];I=v,J=O,Z=g,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(n,_),H=f,q=h,N=T0,L=e0}}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}else if(a instanceof W1){let p=R.head;if(p instanceof W1){let b=a,c=p;if(b.content===c.content){let k=z.tail,v=R.tail;I=k,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=f,q=h,N=l,L=o}else{let k=z.tail,v=p,m=R.tail,g=x1(j,0,O0(U4(v.content)),C);I=k,J=O,Z=m,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=M(g,f),q=h,N=l,L=o}}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}else if(a instanceof X1){let p=R.head;if(p instanceof X1){let b=a,c=z.tail,k=p,v=R.tail,m=w0(h,j,k.key),g=xJ(!1,m,o,b.attributes,k.attributes,C,C),n=g.added,s=g.removed,T0=g.events,e0;if(n instanceof U&&s instanceof U)e0=C;else e0=O0(V7(n,s));let I1=e0,y0;if(b.inner_html===k.inner_html)y0=I1;else y0=M(D4(k.inner_html),I1);let s0=y0,I6;if(s0 instanceof U)I6=f;else I6=M(x1(j,0,s0,C),f);let H8=I6;I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=H8,q=h,N=l,L=T0}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}else if(a instanceof f0){let p=R.head;if(p instanceof f0){let b=a,c=z.tail,k=p,v=R.tail,m=w0(h,j,k.key),g=a6(m),n=r8(O0(b.child),J0(),O0(k.child),J0(),J0(),0,0,0,j,C,C,h8(m),l,FJ(o,g,b.mapper)),s=n.patch,T0=n.cache,e0=n.events,I1=HJ(o,g,k.mapper,e0),y0;if(s.changes instanceof U)if(s.children instanceof U)if(s.removed===0)y0=f;else y0=M(s,f);else y0=M(s,f);else y0=M(s,f);let s0=y0;I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=s0,q=h,N=T0,L=I1}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}else{let p=R.head;if(p instanceof i1){let b=a,c=z.tail,k=p,v=R.tail;if(s5(b.dependencies,k.dependencies)){let g=KJ(l,b.view,k.view);I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=_,H=f,q=h,N=g,L=o}else{let g=GJ(l,b.view,b.view),n=k.view(),s=VJ(l,k.view,n);I=M(g,c),J=O,Z=M(n,v),Y=A,Q=T,W=D,X=B,G=j,K=x,V=_,H=f,q=h,N=s,L=o}}else{let b=a,c=z.tail,k=p,v=R.tail,m=L1(j-D,k),g=U1(l,o,h,j,b,k),n=g[0],s=g[1];I=c,J=O,Z=v,Y=A,Q=T,W=D,X=B,G=j+1,K=x,V=M(m,_),H=f,q=h,N=n,L=s}}}}}}function I8(I,J,Z){let Y=QJ(I),Q=r8(O0(J),J0(),O0(Z),J0(),J0(),0,0,0,0,C,C,_8,Y,WJ(Y)),W=Q.patch,X=Q.cache,G=Q.events;return new kJ(W,XJ(X,G))}var fJ=(I)=>I.reduceRight((J,Z)=>J6(Z,J),C),$0=(I,J)=>{if(Array.isArray(I))for(let Z=0;Z<I.length;Z++)J(I[Z]);else if(I)for(I;J1(I);I=J1(I))J(Z6(I))},b7=(I,J)=>{if(!J1(I))return J;else if(!J1(J))return I;else return _0(I,J)};var i8="http://www.w3.org/1999/xhtml",bJ=1,yJ=3,y7=8;var _J=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:HW,clearTimeout:_7}=globalThis,SW=(I,J)=>globalThis.document.createElementNS(I,J),hJ=(I)=>globalThis.document.createTextNode(I),vJ=(I)=>globalThis.document.createComment(I),qW=()=>globalThis.document.createDocumentFragment(),g1=(I,J,Z)=>I.insertBefore(J,Z),mJ=_J?(I,J,Z)=>I.moveBefore(J,Z):g1,uJ=(I,J)=>I.removeChild(J),MW=(I,J)=>I.getAttribute(J),cJ=(I,J,Z)=>I.setAttribute(J,Z),zW=(I,J)=>I.removeAttribute(J),RW=(I,J,Z,Y)=>I.addEventListener(J,Z,Y),$J=(I,J,Z)=>I.removeEventListener(J,Z),LW=(I,J)=>I.innerHTML=J,NW=(I,J)=>I.data=J,p0=Symbol("lustre");class sJ{constructor(I,J,Z,Y){this.kind=I,this.key=Y,this.parent=J,this.children=[],this.node=Z,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===d1||this.kind===P1}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var n0=(I,J,Z,Y,Q)=>{let W=new sJ(I,J,Z,Q);return Z[p0]=W,J?.children.splice(Y,0,W),W},UW=(I)=>{let J="";for(let Z=I[p0];Z.parent;Z=Z.parent){let Y=Z.parent&&Z.parent.kind===P1?y8:b8;if(Z.key)J=`${Y}${Z.key}${J}`;else{let Q=Z.parent.children.indexOf(Z);J=`${Y}${Q}${J}`}}return J.slice(1)};class v7{#I=null;#G;#Q;#J=!1;constructor(I,J,Z,{debug:Y=!1}={}){this.#I=I,this.#G=J,this.#Q=Z,this.#J=Y}mount(I){n0(C1,null,this.#I,0,null),this.#R(this.#I,null,this.#I[p0],0,I)}push(I,J=null){this.#Z=J,this.#Y.push({node:this.#I[p0],patch:I}),this.#X()}#Z;#Y=[];#X(){let I=this.#Y;while(I.length){let{node:J,patch:Z}=I.pop(),{path:Y,changes:Q,removed:W,children:X}=Z;$0(Y,(K)=>{J=J.children[K]});let{children:G}=J;if($0(Q,(K)=>this.#W(J,K)),W)this.#q(J,G.length-W,W);$0(X,(K)=>{let V=G[K.index|0];this.#Y.push({node:V,patch:K})})}}#W(I,J){switch(J.kind){case Z7:this.#T(I,J);break;case Y7:this.#O(I,J);break;case Q7:this.#z(I,J);break;case W7:this.#H(I,J);break;case X7:this.#N(I,J);break;case G7:this.#K(I,J);break;case K7:this.#S(I,J);break}}#S(I,{children:J,before:Z}){let Y=qW(),Q=this.#F(I,Z);this.#D(Y,null,I,Z|0,J),g1(I.parentNode,Y,Q)}#K(I,{index:J,with:Z}){this.#q(I,J|0,1);let Y=this.#F(I,J);this.#R(I.parentNode,Y,I,J|0,Z)}#F(I,J){J=J|0;let{children:Z}=I,Y=Z.length;if(J<Y)return Z[J].node;if(I.endNode)return I.endNode;if(!I.isVirtual)return null;while(I.isVirtual&&I.children.length){if(I.endNode)return I.endNode.nextSibling;I=I.children[I.children.length-1]}return I.node.nextSibling}#H(I,{key:J,before:Z}){Z=Z|0;let{children:Y,parentNode:Q}=I,W=Y[Z].node,X=Y[Z];for(let G=Z+1;G<Y.length;++G){let K=Y[G];if(Y[G]=X,X=K,K.key===J){Y[Z]=K;break}}this.#L(Q,X,W)}#V(I,J,Z){for(let Y=0;Y<J.length;++Y)this.#L(I,J[Y],Z)}#L(I,J,Z){if(mJ(I,J.node,Z),J.isVirtual)this.#V(I,J.children,Z);if(J.endNode)mJ(I,J.endNode,Z)}#N(I,{index:J}){this.#q(I,J,1)}#q(I,J,Z){let{children:Y,parentNode:Q}=I,W=Y.splice(J,Z);for(let X=0;X<W.length;++X){let G=W[X],{node:K,endNode:V,isVirtual:H,children:q}=G;if(uJ(Q,K),V)uJ(Q,V);if(this.#M(G),H)W.push(...q)}}#M(I){let{debouncers:J,children:Z}=I;for(let{timeout:Y}of J.values())if(Y)_7(Y);J.clear(),$0(Z,(Y)=>this.#M(Y))}#z({node:I,handlers:J,throttles:Z,debouncers:Y},{added:Q,removed:W}){$0(W,({name:X})=>{if(J.delete(X))$J(I,X,h7),this.#U(Z,X,0),this.#U(Y,X,0);else zW(I,X),nJ[X]?.removed?.(I,X)}),$0(Q,(X)=>this.#A(I,X))}#T({node:I},{content:J}){NW(I,J??"")}#O({node:I},{inner_html:J}){LW(I,J??"")}#D(I,J,Z,Y,Q){$0(Q,(W)=>this.#R(I,J,Z,Y++,W))}#R(I,J,Z,Y,Q){switch(Q.kind){case C1:{let W=this.#B(Z,Y,Q);this.#D(W,null,W[p0],0,Q.children),g1(I,W,J);break}case M6:{let W=this.#P(Z,Y,Q);g1(I,W,J);break}case d1:{let X=this.#j("lustre:fragment",Z,Y,Q);if(g1(I,X,J),this.#D(I,J,X[p0],0,Q.children),this.#J)X[p0].endNode=vJ(" /lustre:fragment "),g1(I,X[p0].endNode,J);break}case r5:{let W=this.#B(Z,Y,Q);this.#O({node:W},Q),g1(I,W,J);break}case P1:{let W=this.#j("lustre:map",Z,Y,Q);g1(I,W,J),this.#R(I,J,W[p0],0,Q.child);break}case eI:{let W=this.#Z?.get(Q.view)??Q.view();this.#R(I,J,Z,Y,W);break}}}#B(I,J,{kind:Z,key:Y,tag:Q,namespace:W,attributes:X}){let G=SW(W||i8,Q);if(n0(Z,I,G,J,Y),this.#J&&Y)cJ(G,"data-lustre-key",Y);return $0(X,(K)=>this.#A(G,K)),G}#P(I,J,{kind:Z,key:Y,content:Q}){let W=hJ(Q??"");return n0(Z,I,W,J,Y),W}#j(I,J,Z,{kind:Y,key:Q}){let W=this.#J?vJ(DW(I,Q)):hJ("");return n0(Y,J,W,Z,Q),W}#A(I,J){let{debouncers:Z,handlers:Y,throttles:Q}=I[p0],{kind:W,name:X,value:G,prevent_default:K,debounce:V,throttle:H}=J;switch(W){case cI:{let q=G??"";if(X==="virtual:defaultValue"){I.defaultValue=q;return}else if(X==="virtual:defaultChecked"){I.defaultChecked=!0;return}else if(X==="virtual:defaultSelected"){I.defaultSelected=!0;return}if(q!==MW(I,X))cJ(I,X,q);nJ[X]?.added?.(I,q);break}case $I:I[X]=G;break;case pI:{if(Y.has(X))$J(I,X,h7);let q=K.kind===nI;RW(I,X,h7,{passive:q}),this.#U(Q,X,H),this.#U(Z,X,V),Y.set(X,(N)=>this.#C(J,N));break}}}#U(I,J,Z){let Y=I.get(J);if(Z>0)if(Y)Y.delay=Z;else I.set(J,{delay:Z});else if(Y){let{timeout:Q}=Y;if(Q)_7(Q);I.delete(J)}}#C(I,J){let{currentTarget:Z,type:Y}=J,{debouncers:Q,throttles:W}=Z[p0],X=UW(Z),{prevent_default:G,stop_propagation:K,include:V}=I;if(G.kind===iI)J.preventDefault();if(K.kind===iI)J.stopPropagation();if(Y==="submit")J.detail??={},J.detail.formData=[...new FormData(J.target,J.submitter).entries()];let H=this.#G(J,X,Y,V),q=W.get(Y);if(q){let L=Date.now(),z=q.last||0;if(L>z+q.delay)q.last=L,q.lastEvent=J,this.#Q(J,H)}let N=Q.get(Y);if(N)_7(N.timeout),N.timeout=HW(()=>{if(J===W.get(Y)?.lastEvent)return;this.#Q(J,H)},N.delay);if(!q&&!N)this.#Q(J,H)}}var DW=(I,J)=>{if(J)return` ${I} key="${$6(J)}" `;else return` ${I} `},h7=(I)=>{let{currentTarget:J,type:Z}=I;J[p0].handlers.get(Z)(I)},pJ=(I)=>{return{added(J){J[I]=!0},removed(J){J[I]=!1}}},OW=(I)=>{return{added(J,Z){J[I]=Z}}},nJ={checked:pJ("checked"),selected:pJ("selected"),value:OW("value"),autofocus:{added(I){queueMicrotask(()=>{I.focus?.()})}},autoplay:{added(I){try{I.play?.()}catch(J){console.error(J)}}}};function BW(I,J,Z){while(!0){let Y=I,Q=J,W=Z;if(Y instanceof U)return[Q,e(W)];else{let X=Y.tail,G=Y.head[0],K=Y.head[1],V=k8(G,K),H;if(G==="")H=Q;else H=c0(Q,G,V);let q=H,N=M(V,W);I=X,J=q,Z=N}}}function m7(I){return BW(I,J0(),C)}function u7(I,J,Z){let Y=m7(Z),Q=Y[0],W=Y[1];return r6("","",I,J,W,Q,!1,i6(I,""))}function rJ(I,J,Z,Y){let Q=m7(Y),W=Q[0],X=Q[1];return r6("",I,J,Z,X,W,!1,i6(J,I))}function c7(I){let J=m7(I),Z=J[0],Y=J[1];return g8("",Y,Z)}function L6(I,J){return u7("div",I,J)}var dJ=(I)=>{let J=n0(C1,null,I,0,null),{children:Z}=$7(J,I,I.firstChild);if(Z.length>1){let Q=n0(C1,null,I,0,null);return J.kind=d1,J.node=globalThis.document.createTextNode(""),J.parent=Q,Q.children.push(J),I.insertBefore(J.node,I.firstChild),c7(N6(Z))}if(Z.length===1)return Z[0][1];let Y=globalThis.document.createTextNode("");return n0(M6,J,Y,0,null),I.insertBefore(Y,I.firstChild),I4()},lJ=(I,J,Z,Y)=>{if(Z.nodeType===y7){let Q=Z.data.trim();if(Q.startsWith("lustre:fragment"))return TW(I,J,Z,Y);if(Q.startsWith("lustre:map"))return PW(I,J,Z,Y);if(Q.startsWith("lustre:memo"))return CW(I,J,Z,Y);return null}if(Z.nodeType===bJ)return jW(I,Z,Y);if(Z.nodeType===yJ)return AW(I,Z,Y);return null},jW=(I,J,Z)=>{let Y=J.getAttribute("data-lustre-key")??"";if(Y)J.removeAttribute("data-lustre-key");let Q=n0(C1,I,J,Z,Y),W=J.localName,X=J.namespaceURI,G=!X||X===i8;if(G&&EW.includes(W))xW(W,J);let K=wW(J),{children:V}=$7(Q,J,J.firstChild),H=G?u7(W,K,N6(V)):rJ(X,W,K,N6(V));return J8(Y,H,J.nextSibling)},$7=(I,J,Z)=>{let Y=[];while(Z&&(Z.nodeType!==y7||Z.data.trim()!=="/lustre:fragment")){let Q=lJ(I,J,Z,Y.length);if(Q)Y.push([Q.key,Q.vnode]),Z=Q.next;else Z=Z.nextSibling}return{children:Y,end:Z}},AW=(I,J,Z)=>{return n0(M6,I,J,Z,null),J8("",d6(J.data),J.nextSibling)},TW=(I,J,Z,Y)=>{let Q=p7(Z.data),W=n0(d1,I,Z,Y,Q),{children:X,end:G}=$7(W,J,Z.nextSibling);W.endNode=G;let K=c7(N6(X));return J8(Q,K,G?.nextSibling)},PW=(I,J,Z,Y)=>{let Q=p7(Z.data),W=n0(P1,I,Z,Y,Q),X=aJ(W,J,Z,0);if(!X)return null;let G=Q4(X.vnode,(K)=>K);return J8(Q,G,X.next)},CW=(I,J,Z,Y)=>{let Q=p7(Z.data),W=aJ(I,J,Z,Y);if(!W)return null;J.removeChild(Z);let X=Z4(N6([Y4({})]),()=>W.vnode);return J8(Q,X,W.next)},aJ=(I,J,Z,Y)=>{while(!0){if(Z=Z.nextSibling,!Z)return null;let Q=lJ(I,J,Z,Y);if(Q)return Q}},J8=(I,J,Z)=>{return{key:I,vnode:J,next:Z}},wW=(I)=>{let J=[];for(let Z=0;Z<I.attributes.length;Z++){let Y=I.attributes[Z];if(Y.name!=="xmlns")J.push(C0(Y.localName,Y.value))}return N6(J)},EW=["input","select","textarea"],xW=(I,J)=>{let{value:Z,checked:Y}=J;if(I==="input"&&J.type==="checkbox"&&!Y)return;if(I==="input"&&J.type==="radio"&&!Y)return;if(J.type!=="checkbox"&&J.type!=="radio"&&!Z)return;queueMicrotask(()=>{if(J.value=Z,J.checked=Y,J.dispatchEvent(new Event("input",{bubbles:!0})),J.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==J)J.dispatchEvent(new Event("blur",{bubbles:!0}))})},p7=(I)=>{let J=I.match(/key="([^"]*)"/);if(!J)return"";return kW(J[1])},kW=(I)=>{return I.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},N6=(I)=>I.reduceRight((J,Z)=>J6(Z,J),C);var a1=()=>!!globalThis.document;class d8{constructor(I,[J,Z],Y,Q,W){this.root=I,this.#I=J,this.#G=Y,this.#Q=Q,this.root.addEventListener("context-request",(K)=>{if(!(K.context&&K.callback))return;if(!this.#X.has(K.context))return;K.stopImmediatePropagation();let V=this.#X.get(K.context);if(K.subscribe){let H=()=>{V.subscribers=V.subscribers.filter((q)=>q!==K.callback)};V.subscribers.push([K.callback,H]),K.callback(V.value,H)}else K.callback(V.value)});let X=(K,V,H)=>j7(this.#Z,V,H,K),G=(K,V)=>{let[H,q]=A7(this.#Z,V);if(this.#Z=H,N0(q)){let N=B0(q);if(N.stop_propagation)K.stopPropagation();if(N.prevent_default)K.preventDefault();this.dispatch(N.message,!1)}};this.#Y=new v7(this.root,X,G,W),this.#J=dJ(this.root),this.#Z=O7(),this.#q(Z),this.#z()}root=null;dispatch(I,J=!1){if(this.#S)this.#K.push(I);else{let[Z,Y]=this.#Q(this.#I,I);this.#I=Z,this.#N(J),this.#q(Y)}}emit(I,J){(this.root.host??this.root).dispatchEvent(new oJ(I,J))}provide(I,J){if(!this.#X.has(I))this.#X.set(I,{value:J,subscribers:[]});else{let Z=this.#X.get(I);if(o0(Z.value,J))return;Z.value=J;for(let Y=Z.subscribers.length-1;Y>=0;Y--){let[Q,W]=Z.subscribers[Y];if(!Q){Z.subscribers.splice(Y,1);continue}Q(J,W)}}}subscribe(I,J){if(!I)return;this.#W.get(I)?.(),(this.root.host??this.root).dispatchEvent(new n7(I,(Y,Q)=>{let W=this.#W.get(I);if(W!==Q)W?.();let X=Y1(Y,J);if(this.#W.set(I,Q),N0(X))this.dispatch(B0(X),!0)},!0))}unsubscribe(I){let J=this.#W.get(I);if(J)J(),this.#W.delete(I)}unsubscribeAll(){for(let[I,J]of this.#W)J?.();this.#W.clear()}#I;#G;#Q;#J;#Z;#Y;#X=new Map;#W=new Map;#S=!1;#K=[];#F=C;#H=C;#V=null;#L={dispatch:(I)=>this.dispatch(I),emit:(I,J)=>this.emit(I,J),select:()=>{},root:()=>this.root,provide:(I,J)=>this.provide(I,J),subscribe:(I,J)=>this.subscribe(I,J),unsubscribe:(I)=>this.unsubscribe(I)};#N(I=!1){if(this.#V)return;if(I)this.#V="sync",queueMicrotask(()=>this.#z());else this.#V=window.requestAnimationFrame(()=>this.#z())}#q(I){this.#S=!0;let J=!1;while(!0){if($0(I.synchronous,(Y)=>Y(this.#L)),this.#F=b7(this.#F,I.before_paint),this.#H=b7(this.#H,I.after_paint),!this.#K.length)break;let Z=this.#K.shift();[this.#I,I]=this.#Q(this.#I,Z),J=!0}return this.#S=!1,J}#M(I){if(this.#q(I))this.#N(!0)}#z(){this.#V=null;let I=this.#G(this.#I),{patch:J,cache:Z}=I8(this.#Z,this.#J,I);if(this.#Z=Z,this.#J=I,this.#Y.push(J,z6(Z)),V1(this.#F)){let Y=tJ(this.#F);this.#F=C,queueMicrotask(()=>this.#M(Y))}if(V1(this.#H)){let Y=tJ(this.#H);this.#H=C,window.requestAnimationFrame(()=>this.#M(Y))}}}function tJ(I){return{synchronous:I,after_paint:C,before_paint:C}}class n7 extends Event{constructor(I,J,Z){super("context-request",{bubbles:!0,composed:!0});this.context=I,this.callback=J,this.subscribe=Z}}class oJ extends CustomEvent{isLustreEvent=!0;constructor(I,J){super(I,{detail:J,bubbles:!0,composed:!0})}}class eJ{#I;constructor(I,[J,Z],Y,Q){this.#I=new d8(I,[J,Z],Q,Y)}send(I){if(t6(I))this.dispatch(I.message,!1);else if(o6(I))this.emit(I.name,I.data);else if(e6(I));}dispatch(I){this.#I.dispatch(I)}emit(I,J){this.#I.emit(I,J)}}var IZ=({init:I,update:J,view:Z},Y,Q)=>{if(!a1())return V0(s7());let W=Y instanceof HTMLElement?Y:globalThis.document.querySelector(Y);if(!W)return V0(JZ(Y));return I0(new eJ(W,I(Q),J,Z))};class bW{#I;#G;#Q;#J;#Z;#Y;#X=Y6();#W=new Set;constructor(I,J,Z,Y,Q,W){let[X,G]=J(W);this.#I=X,this.#G=Z,this.#Q=Y,this.#J=Q,this.#Z=this.#Q(this.#I),this.#Y=YJ(this.#Z),this.#V(G)}send(I){if(zJ(I)){let{message:J}=J,Z=this.#S(J),Y=I8(this.#Y,this.#Z,Z);this.#Z=Z,this.#Y=Y.cache,this.broadcast(H7(Y.patch,z6(Y.cache)))}else if(LJ(I)){let{callback:J}=I;if(this.#W.add(J),J(c4(this.#J.open_shadow_root,this.#J.adopt_styles,g6(this.#J.attributes),g6(this.#J.properties),g6(this.#J.contexts),this.#X,this.#Z,z6(this.#Y))),q8(this.#J.on_connect))this.#K(M8(this.#J.on_connect))}else if(UJ(I)){let{callback:J}=I;if(this.#W.delete(J),q8(this.#J.on_disconnect))this.#K(M8(this.#J.on_disconnect))}else if(t6(I)){let{message:J}=J,[Z,Y]=this.#G(this.#I,J),Q=this.#Q(Z),W=I8(this.#Y,this.#Z,Q);this.#V(Y),this.#I=Z,this.#Z=Q,this.#Y=W.cache,this.broadcast(H7(W.patch,z6(W.cache)))}else if(o6(I)){let{name:J,data:Z}=I;this.broadcast($4(J,Z))}else if(jJ(I)){let{key:J,value:Z}=I,Y=S1(this.#X,J);if(N0(Y)&&o0(B0(Y),Z))return;this.#X=v1(this.#X,J,Z),this.broadcast(p4(J,Z))}else if(TJ(I)){let{key:J,decoder:Z}=I;this.broadcast(n4(J)),this.#J.contexts=v1(this.#J.contexts,J,Z)}else if(CJ(I)){let{key:J}=I;this.broadcast(s4(J)),this.#J.contexts=jI(this.#J.contexts,J)}else if(e6(I))this.#I=null,this.#G=null,this.#Q=null,this.#J=null,this.#Z=null,this.#Y=null,this.#X=null,this.#W.clear()}broadcast(I){for(let J of this.#W)J(I)}#S(I){if(g4(I)){let{messages:J}=I,Z=this.#I,Y=X0();for(let Q=J;J1(Q);Q=J1(Q)){let W=this.#S(Z6(Q));if(N0(W)){Z=B0(W)[0],Y=E8(fJ([Y,B0(W)[1]]));break}}return this.#V(Y),this.#I=Z,this.#Q(Z)}else if(b4(I)){let{name:J,value:Z}=I,Y=this.#F(J,Z);if(!N0(Y))return this.#Z;return this.#K(B0(Y))}else if(_4(I)){let{name:J,value:Z}=I,Y=this.#H(J,Z);if(!N0(Y))return this.#Z;return this.#K(B0(Y))}else if(v4(I)){let{path:J,name:Z,event:Y}=X,[Q,W]=qJ(this.#Y,J,Z,Y);if(this.#Y=Q,!N0(W))return this.#Z;let{message:X}=B0(W);return this.#K(X)}else if(u4(I)){let{key:J,value:Z}=I,Y=S1(this.#J.contexts,J);if(!N0(Y))return this.#Z;if(Y=Y1(Z,B0(Y)),!N0(Y))return this.#Z;return this.#K(B0(Y))}}#K(I){let[J,Z]=this.#G(this.#I,I);return this.#V(Z),this.#I=J,this.#Q(this.#I)}#F(I,J){let Z=S1(this.#J.attributes,I);if(!N0(Z))return Z;return B0(Z)(J)}#H(I,J){let Z=S1(this.#J.properties,I);if(!N0(Z))return Z;return B0(Z)(J)}#V(I){let J=(K)=>this.send(DJ(K)),Z=(K,V)=>this.send(OJ(K,V)),Y=()=>{return},Q=()=>{return},W=(K,V)=>this.send(BJ(K,V)),X=(K,V)=>this.send(AJ(K,V)),G=(K)=>this.send(PJ(K));globalThis.queueMicrotask(()=>{p5(I,J,Z,Y,Q,W,X,G)})}}class ZZ extends F{constructor(I){super();this.selector=I}}var JZ=(I)=>new ZZ(I);class YZ extends F{}var QZ=new YZ,s7=()=>QZ;function WZ(I,J,Z){return new x7(P,I,J,Z,EJ)}function XZ(I,J,Z){return S5(!a1(),new W0(QZ),()=>{return IZ(I,J,Z)})}function r7(I,J,Z){return I.slice(0,J)+"    "+I.slice(Z)}function i7(I,J){let Z=document.getElementById(I);if(Z)Z.selectionStart=Z.selectionEnd=J,Z.focus()}function d7(I){return confirm(I)}function l7(I){alert(I)}class U6 extends F{}var D6=new U6;class l8 extends F{}var a8=new l8;class t1 extends F{constructor(I,J,Z){super();this.category=I,this.subcategory=J,this.title=Z}}class Q0 extends F{constructor(I,J,Z,Y,Q,W,X,G,K){super();this.route=I,this.selected_category=J,this.selected_subcategory=Z,this.selected=Y,this.problem_index=Q,this.iteration_count=W,this.current_iteration=X,this.draft=G,this.answer_revealed=K}}class Z8 extends F{constructor(I){super();this[0]=I}}class Y8 extends F{constructor(I){super();this[0]=I}}class Q8 extends F{constructor(I){super();this[0]=I}}class W8 extends F{constructor(I){super();this[0]=I}}class t8 extends F{}var GZ=new t8;class o8 extends F{}var KZ=new o8;class X8 extends F{constructor(I){super();this[0]=I}}class e8 extends F{}var VZ=new e8;class G8 extends F{}var FZ=new G8;class K8 extends F{constructor(I){super();this[0]=I}}class V8 extends F{}var HZ=new V8;class II extends F{}var SZ=new II;class O6 extends F{constructor(I){super();this[0]=I}}class B6 extends F{constructor(I,J,Z){super();this.value=I,this.start=J,this.end=Z}}function F8(){return new Q0(D6,P,P,w,0,3,1,"",!1)}class a7 extends F{}var d=new a7;class qZ extends F{}var ZI=new qZ;class r extends F{constructor(I,J,Z){super();this.signature=I,this.starter=J,this.harness=Z}}class u extends F{constructor(I,J,Z,Y,Q){super();this.title=I,this.prompt=J,this.solution=Z,this.language=Y,this.check=Q}}class R0 extends F{constructor(I,J){super();this.name=I,this.problems=J}}class D1 extends F{constructor(I,J){super();this.name=I,this.subcategories=J}}function MZ(I){if(I instanceof a7)return"Python";else return"Gleam"}class i extends F{constructor(I,J){super();this.solution=I,this.check=J}}function zZ(){return new i(`import gleam/set

pub fn contains_duplicate(nums: List(Int)) -> Bool {
  check(nums, set.new())
}

fn check(nums: List(Int), seen: set.Set(Int)) -> Bool {
  case nums {
    [] -> False
    [n, ..rest] ->
      case set.contains(seen, n) {
        True -> True
        False -> check(rest, set.insert(seen, n))
      }
  }
}`,new r("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "contains_duplicate([1, 2, 3, 1])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([1, 2, 3, 1])),
    ),
    #(
      "contains_duplicate([1, 2, 3, 4])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([1, 2, 3, 4])),
    ),
    #(
      "contains_duplicate([])",
      string.inspect(False),
      string.inspect(solution.contains_duplicate([])),
    ),
    #(
      "contains_duplicate([7, 7])",
      string.inspect(True),
      string.inspect(solution.contains_duplicate([7, 7])),
    ),
  ]
}`))}function RZ(){return new i(`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  counts(s) == counts(t)
}

fn counts(word: String) -> dict.Dict(String, Int) {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`,new r("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_anagram(\\"anagram\\", \\"nagaram\\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("anagram", "nagaram")),
    ),
    #(
      "is_anagram(\\"rat\\", \\"car\\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("rat", "car")),
    ),
    #(
      "is_anagram(\\"\\", \\"\\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("", "")),
    ),
    #(
      "is_anagram(\\"a\\", \\"ab\\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("a", "ab")),
    ),
  ]
}`))}function LZ(){return new i(`import gleam/dict

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  find_pair(nums, target, 0, dict.new())
}

fn find_pair(
  nums: List(Int),
  target: Int,
  i: Int,
  seen: dict.Dict(Int, Int),
) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case dict.get(seen, target - n) {
        Ok(j) -> Ok(#(j, i))
        Error(Nil) -> find_pair(rest, target, i + 1, dict.insert(seen, n, i))
      }
  }
}`,new r("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "two_sum([2, 7, 11, 15], 9)",
      string.inspect(Ok(#(0, 1))),
      string.inspect(solution.two_sum([2, 7, 11, 15], 9)),
    ),
    #(
      "two_sum([3, 2, 4], 6)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum([3, 2, 4], 6)),
    ),
    #(
      "two_sum([3, 3], 6)",
      string.inspect(Ok(#(0, 1))),
      string.inspect(solution.two_sum([3, 3], 6)),
    ),
    #(
      "two_sum([1, 2], 7)",
      string.inspect(Error(Nil)),
      string.inspect(solution.two_sum([1, 2], 7)),
    ),
  ]
}`))}function NZ(){return new i(`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    let key =
      string.to_graphemes(s)
      |> list.sort(string.compare)
      |> string.concat
    dict.upsert(acc, key, fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}`,new r("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Groups may come back in any order, and so may their members.
fn normalise(groups: List(List(String))) -> List(String) {
  groups
  |> list.map(fn(group) {
    group |> list.sort(string.compare) |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "group_anagrams([\\"eat\\", \\"tea\\", \\"tan\\", \\"ate\\", \\"nat\\", \\"bat\\"])",
      string.inspect(["ate,eat,tea", "bat", "nat,tan"]),
      string.inspect(
        normalise(solution.group_anagrams([
          "eat", "tea", "tan", "ate", "nat", "bat",
        ])),
      ),
    ),
    #(
      "group_anagrams([])",
      string.inspect([]),
      string.inspect(normalise(solution.group_anagrams([]))),
    ),
    #(
      "group_anagrams([\\"a\\"])",
      string.inspect(["a"]),
      string.inspect(normalise(solution.group_anagrams(["a"]))),
    ),
  ]
}`))}function UZ(){return new i(`import gleam/dict
import gleam/int
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  nums
  |> list.fold(dict.new(), fn(acc, n) {
    dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { int.compare(b.1, a.1) })
  |> list.take(k)
  |> list.map(fn(pair) { pair.0 })
}`,new r("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "top_k_frequent([1, 1, 1, 2, 2, 3], 2)",
      string.inspect([1, 2]),
      string.inspect(solution.top_k_frequent([1, 1, 1, 2, 2, 3], 2)),
    ),
    #(
      "top_k_frequent([1], 1)",
      string.inspect([1]),
      string.inspect(solution.top_k_frequent([1], 1)),
    ),
    #(
      "top_k_frequent([5, 5, 4, 4, 4, 3], 1)",
      string.inspect([4]),
      string.inspect(solution.top_k_frequent([5, 5, 4, 4, 4, 3], 1)),
    ),
  ]
}`))}function DZ(){return new i(`import gleam/list

pub fn product_except_self(nums: List(Int)) -> List(Int) {
  let n = list.length(nums)
  let prefixes = [
    1,
    ..list.take(list.scan(nums, 1, fn(acc, x) { acc * x }), n - 1)
  ]
  let suffixes =
    list.reverse(nums)
    |> list.scan(1, fn(acc, x) { acc * x })
    |> list.take(n - 1)
    |> fn(scanned) { [1, ..scanned] }
    |> list.reverse
  list.map2(prefixes, suffixes, fn(prefix, suffix) { prefix * suffix })
}`,new r("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "product_except_self([1, 2, 3, 4])",
      string.inspect([24, 12, 8, 6]),
      string.inspect(solution.product_except_self([1, 2, 3, 4])),
    ),
    #(
      "product_except_self([-1, 1, 0, -3, 3])",
      string.inspect([0, 0, 9, 0, 0]),
      string.inspect(solution.product_except_self([-1, 1, 0, -3, 3])),
    ),
    #(
      "product_except_self([2, 3])",
      string.inspect([3, 2]),
      string.inspect(solution.product_except_self([2, 3])),
    ),
  ]
}`))}function OZ(){return new i(`import gleam/int
import gleam/list
import gleam/set

pub fn longest_consecutive(nums: List(Int)) -> Int {
  let all = set.from_list(nums)
  all
  |> set.to_list
  |> list.fold(0, fn(best, n) {
    case set.contains(all, n - 1) {
      True -> best
      False -> int.max(best, run_length(all, n, 0))
    }
  })
}

fn run_length(all: set.Set(Int), n: Int, count: Int) -> Int {
  case set.contains(all, n) {
    True -> run_length(all, n + 1, count + 1)
    False -> count
  }
}`,new r("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "longest_consecutive([100, 4, 200, 1, 3, 2])",
      string.inspect(4),
      string.inspect(solution.longest_consecutive([100, 4, 200, 1, 3, 2])),
    ),
    #(
      "longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])",
      string.inspect(9),
      string.inspect(
        solution.longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]),
      ),
    ),
    #(
      "longest_consecutive([])",
      string.inspect(0),
      string.inspect(solution.longest_consecutive([])),
    ),
  ]
}`))}function BZ(){return new i(`import gleam/list
import gleam/string

pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  cleaned == list.reverse(cleaned)
}

fn is_alphanumeric(g: String) -> Bool {
  case string.to_utf_codepoints(g) {
    [c] -> {
      let n = string.utf_codepoint_to_int(c)
      is_digit(n) || is_lowercase_letter(n)
    }
    _ -> False
  }
}

fn is_digit(n: Int) -> Bool {
  n >= 48 && n <= 57
}

fn is_lowercase_letter(n: Int) -> Bool {
  n >= 97 && n <= 122
}`,new r("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_palindrome(\\"A man, a plan, a canal: Panama\\")",
      string.inspect(True),
      string.inspect(solution.is_palindrome("A man, a plan, a canal: Panama")),
    ),
    #(
      "is_palindrome(\\"race a car\\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("race a car")),
    ),
    #(
      "is_palindrome(\\" \\")",
      string.inspect(True),
      string.inspect(solution.is_palindrome(" ")),
    ),
    #(
      "is_palindrome(\\"0P\\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("0P")),
    ),
  ]
}`))}function jZ(){return new i(`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  search(numbers, list.reverse(numbers), 1, list.length(numbers), target)
}

fn search(
  from_left: List(Int),
  from_right: List(Int),
  lo: Int,
  hi: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case from_left, from_right {
    [left, ..left_rest], [right, ..right_rest] ->
      case lo >= hi {
        True -> Error(Nil)
        False ->
          case int.compare(left + right, target) {
            order.Eq -> Ok(#(lo, hi))
            order.Lt -> search(left_rest, from_right, lo + 1, hi, target)
            order.Gt -> search(from_left, right_rest, lo, hi - 1, target)
          }
      }
    _, _ -> Error(Nil)
  }
}`,new r(`pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil)`,`pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "two_sum_sorted([2, 7, 11, 15], 9)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([2, 7, 11, 15], 9)),
    ),
    #(
      "two_sum_sorted([2, 3, 4], 6)",
      string.inspect(Ok(#(1, 3))),
      string.inspect(solution.two_sum_sorted([2, 3, 4], 6)),
    ),
    #(
      "two_sum_sorted([-1, 0], -1)",
      string.inspect(Ok(#(1, 2))),
      string.inspect(solution.two_sum_sorted([-1, 0], -1)),
    ),
    #(
      "two_sum_sorted([1, 2, 3], 100)",
      string.inspect(Error(Nil)),
      string.inspect(solution.two_sum_sorted([1, 2, 3], 100)),
    ),
  ]
}`))}function AZ(){return new i(`import gleam/int
import gleam/list
import gleam/order
import gleam/set

pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  let sorted = list.sort(nums, int.compare)
  outer(sorted, set.new())
  |> set.to_list
}

fn outer(
  nums: List(Int),
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [first, ..rest] ->
      outer(
        rest,
        inner(first, rest, list.reverse(rest), list.length(rest), acc),
      )
  }
}

fn inner(
  first: Int,
  from_left: List(Int),
  from_right: List(Int),
  remaining: Int,
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case remaining < 2 {
    True -> acc
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] ->
          case int.compare(first + left + right, 0) {
            order.Eq ->
              inner(
                first,
                left_rest,
                from_right,
                remaining - 1,
                set.insert(acc, #(first, left, right)),
              )
            order.Lt -> inner(first, left_rest, from_right, remaining - 1, acc)
            order.Gt -> inner(first, from_left, right_rest, remaining - 1, acc)
          }
        _, _ -> acc
      }
  }
}`,new r("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Triples come back in set order, which is not meaningful.
fn normalise(triples: List(#(Int, Int, Int))) -> List(String) {
  triples |> list.map(string.inspect) |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "three_sum([-1, 0, 1, 2, -1, -4])",
      string.inspect(["#(-1, -1, 2)", "#(-1, 0, 1)"]),
      string.inspect(normalise(solution.three_sum([-1, 0, 1, 2, -1, -4]))),
    ),
    #(
      "three_sum([0, 1, 1])",
      string.inspect([]),
      string.inspect(normalise(solution.three_sum([0, 1, 1]))),
    ),
    #(
      "three_sum([0, 0, 0])",
      string.inspect(["#(0, 0, 0)"]),
      string.inspect(normalise(solution.three_sum([0, 0, 0]))),
    ),
  ]
}`))}function TZ(){return new i(`import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
  converge(heights, list.reverse(heights), list.length(heights) - 1, 0)
}

fn converge(
  from_left: List(Int),
  from_right: List(Int),
  width: Int,
  best: Int,
) -> Int {
  case width <= 0 {
    True -> best
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] -> {
          let area = int.min(left, right) * width
          let best = int.max(best, area)
          case left < right {
            True -> converge(left_rest, from_right, width - 1, best)
            False -> converge(from_left, right_rest, width - 1, best)
          }
        }
        _, _ -> best
      }
  }
}`,new r("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])",
      string.inspect(49),
      string.inspect(solution.max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])),
    ),
    #(
      "max_area([1, 1])",
      string.inspect(1),
      string.inspect(solution.max_area([1, 1])),
    ),
    #(
      "max_area([])",
      string.inspect(0),
      string.inspect(solution.max_area([])),
    ),
  ]
}`))}function PZ(){return new i(`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [first, ..rest] -> {
      let #(_, best) =
        list.fold(rest, #(first, 0), fn(acc, price) {
          let #(min_price, best) = acc
          #(int.min(min_price, price), int.max(best, price - min_price))
        })
      best
    }
  }
}`,new r("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_profit([7, 1, 5, 3, 6, 4])",
      string.inspect(5),
      string.inspect(solution.max_profit([7, 1, 5, 3, 6, 4])),
    ),
    #(
      "max_profit([7, 6, 4, 3, 1])",
      string.inspect(0),
      string.inspect(solution.max_profit([7, 6, 4, 3, 1])),
    ),
    #(
      "max_profit([])",
      string.inspect(0),
      string.inspect(solution.max_profit([])),
    ),
  ]
}`))}function CZ(){return new i(`import gleam/dict
import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.index_fold(#(dict.new(), 0, 0), fn(acc, g, i) {
      let #(last_seen, start, best) = acc
      let start = case dict.get(last_seen, g) {
        Ok(j) if j >= start -> j + 1
        _ -> start
      }
      #(dict.insert(last_seen, g, i), start, int.max(best, i - start + 1))
    })
  best
}`,new r("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "length_of_longest_substring(\\"abcabcbb\\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("abcabcbb")),
    ),
    #(
      "length_of_longest_substring(\\"bbbbb\\")",
      string.inspect(1),
      string.inspect(solution.length_of_longest_substring("bbbbb")),
    ),
    #(
      "length_of_longest_substring(\\"pwwkew\\")",
      string.inspect(3),
      string.inspect(solution.length_of_longest_substring("pwwkew")),
    ),
    #(
      "length_of_longest_substring(\\"\\")",
      string.inspect(0),
      string.inspect(solution.length_of_longest_substring("")),
    ),
  ]
}`))}function wZ(){return new i(`import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.fold(#(dict.new(), [], 0), fn(acc, g) {
      let #(counts, window, best) = acc
      let counts = dict.upsert(counts, g, fn(n) { option.unwrap(n, 0) + 1 })
      let window = list.append(window, [g])
      let #(counts, window) = shrink(counts, window, k)
      #(counts, window, int.max(best, list.length(window)))
    })
  best
}

fn shrink(
  counts: dict.Dict(String, Int),
  window: List(String),
  k: Int,
) -> #(dict.Dict(String, Int), List(String)) {
  let size = list.length(window)
  let max_count =
    dict.fold(counts, 0, fn(top, _, count) { int.max(top, count) })
  case size - max_count > k, window {
    True, [oldest, ..rest] ->
      shrink(
        dict.upsert(counts, oldest, fn(n) { option.unwrap(n, 1) - 1 }),
        rest,
        k,
      )
    _, _ -> #(counts, window)
  }
}`,new r("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "character_replacement(\\"ABAB\\", 2)",
      string.inspect(4),
      string.inspect(solution.character_replacement("ABAB", 2)),
    ),
    #(
      "character_replacement(\\"AABABBA\\", 1)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AABABBA", 1)),
    ),
    #(
      "character_replacement(\\"AAAA\\", 0)",
      string.inspect(4),
      string.inspect(solution.character_replacement("AAAA", 0)),
    ),
  ]
}`))}function EZ(){return new i(`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle = counts(string.to_graphemes(s1))
  let size = string.length(s1)
  let graphemes = string.to_graphemes(s2)
  slide(
    graphemes,
    list.drop(graphemes, size),
    counts(list.take(graphemes, size)),
    needle,
  )
}

fn counts(graphemes: List(String)) -> dict.Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

fn slide(
  window_start: List(String),
  upcoming: List(String),
  window: dict.Dict(String, Int),
  needle: dict.Dict(String, Int),
) -> Bool {
  case window == needle {
    True -> True
    False ->
      case window_start, upcoming {
        [oldest, ..rest_start], [next, ..rest_upcoming] ->
          slide(
            rest_start,
            rest_upcoming,
            window
              |> remove_one(oldest)
              |> dict.upsert(next, fn(n) { option.unwrap(n, 0) + 1 }),
            needle,
          )
        _, _ -> False
      }
  }
}

fn remove_one(
  window: dict.Dict(String, Int),
  g: String,
) -> dict.Dict(String, Int) {
  case dict.get(window, g) {
    Ok(1) -> dict.delete(window, g)
    Ok(n) -> dict.insert(window, g, n - 1)
    Error(Nil) -> window
  }
}`,new r("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "check_inclusion(\\"ab\\", \\"eidbaooo\\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("ab", "eidbaooo")),
    ),
    #(
      "check_inclusion(\\"ab\\", \\"eidboaoo\\")",
      string.inspect(False),
      string.inspect(solution.check_inclusion("ab", "eidboaoo")),
    ),
    #(
      "check_inclusion(\\"adc\\", \\"dcda\\")",
      string.inspect(True),
      string.inspect(solution.check_inclusion("adc", "dcda")),
    ),
  ]
}`))}function xZ(){return new i(`import gleam/string

pub fn is_valid(s: String) -> Bool {
  check(string.to_graphemes(s), [])
}

fn check(graphemes: List(String), stack: List(String)) -> Bool {
  case graphemes, stack {
    [], [] -> True
    [], _ -> False
    ["(", ..rest], _ -> check(rest, [")", ..stack])
    ["[", ..rest], _ -> check(rest, ["]", ..stack])
    ["{", ..rest], _ -> check(rest, ["}", ..stack])
    [close, ..rest], [expected, ..stack_rest] ->
      close == expected && check(rest, stack_rest)
    _, _ -> False
  }
}`,new r("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid(\\"()[]{}\\")",
      string.inspect(True),
      string.inspect(solution.is_valid("()[]{}")),
    ),
    #(
      "is_valid(\\"(]\\")",
      string.inspect(False),
      string.inspect(solution.is_valid("(]")),
    ),
    #(
      "is_valid(\\"([)]\\")",
      string.inspect(False),
      string.inspect(solution.is_valid("([)]")),
    ),
    #(
      "is_valid(\\"{[]}\\")",
      string.inspect(True),
      string.inspect(solution.is_valid("{[]}")),
    ),
    #("is_valid(\\"(\\")", string.inspect(False), string.inspect(solution.is_valid("("))),
  ]
}`))}function kZ(){return new i(`import gleam/int

pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  MinStack([])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let min = case stack.entries {
    [#(_, current_min), ..] -> int.min(value, current_min)
    [] -> value
  }
  MinStack([#(value, min), ..stack.entries])
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.entries {
    [_, ..rest] -> MinStack(rest)
    [] -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(value, _), ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(_, min), ..] -> Ok(min)
    [] -> Error(Nil)
  }
}`,new r(`pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack

pub fn push(stack: MinStack, value: Int) -> MinStack

pub fn pop(stack: MinStack) -> MinStack

pub fn top(stack: MinStack) -> Result(Int, Nil)

pub fn get_min(stack: MinStack) -> Result(Int, Nil)`,`pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  todo
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  todo
}

pub fn pop(stack: MinStack) -> MinStack {
  todo
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  todo
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let stack =
    solution.new()
    |> solution.push(-2)
    |> solution.push(0)
    |> solution.push(-3)
  let popped = solution.pop(stack)

  [
    #(
      "get_min() after push -2, 0, -3",
      string.inspect(Ok(-3)),
      string.inspect(solution.get_min(stack)),
    ),
    #("top() after pop()", string.inspect(Ok(0)), string.inspect(solution.top(popped))),
    #(
      "get_min() after pop()",
      string.inspect(Ok(-2)),
      string.inspect(solution.get_min(popped)),
    ),
    #(
      "top() on an empty stack",
      string.inspect(Error(Nil)),
      string.inspect(solution.top(solution.new())),
    ),
  ]
}`))}function gZ(){return new i(`import gleam/dict
import gleam/list

pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  let #(answers, _) =
    temps
    |> list.index_fold(#(dict.new(), []), fn(acc, temp, i) {
      let #(answers, stack) = acc
      let #(answers, stack) = pop_colder(answers, stack, temp, i)
      #(answers, [#(i, temp), ..stack])
    })
  list.index_map(temps, fn(_, i) {
    case dict.get(answers, i) {
      Ok(days) -> days
      Error(Nil) -> 0
    }
  })
}

fn pop_colder(
  answers: dict.Dict(Int, Int),
  stack: List(#(Int, Int)),
  temp: Int,
  i: Int,
) -> #(dict.Dict(Int, Int), List(#(Int, Int))) {
  case stack {
    [#(j, colder), ..rest] if colder < temp ->
      pop_colder(dict.insert(answers, j, i - j), rest, temp, i)
    _ -> #(answers, stack)
  }
}`,new r("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])",
      string.inspect([1, 1, 4, 2, 1, 1, 0, 0]),
      string.inspect(
        solution.daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]),
      ),
    ),
    #(
      "daily_temperatures([30, 40, 50, 60])",
      string.inspect([1, 1, 1, 0]),
      string.inspect(solution.daily_temperatures([30, 40, 50, 60])),
    ),
    #(
      "daily_temperatures([30, 30, 30])",
      string.inspect([0, 0, 0]),
      string.inspect(solution.daily_temperatures([30, 30, 30])),
    ),
  ]
}`))}function fZ(){return new i(`import gleam/int
import gleam/list
import gleam/order

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> halve(left, target, offset)
            order.Gt -> halve(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`,new r("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search([-1, 0, 3, 5, 9, 12], 9)",
      string.inspect(Ok(4)),
      string.inspect(solution.search([-1, 0, 3, 5, 9, 12], 9)),
    ),
    #(
      "search([-1, 0, 3, 5, 9, 12], 2)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search([-1, 0, 3, 5, 9, 12], 2)),
    ),
    #("search([5], 5)", string.inspect(Ok(0)), string.inspect(solution.search([5], 5))),
    #(
      "search([], 1)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search(no_ints, 1)),
    ),
  ]
}`))}function bZ(){return new i(`import gleam/int
import gleam/list
import gleam/result

pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [a, b] -> Ok(int.min(a, b))
    _ -> {
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case first <= last {
        // This segment is fully sorted: the rotation point is not inside it.
        True -> Ok(first)
        False -> {
          let half = list.length(nums) / 2
          let #(left, right) = list.split(nums, half)
          case right {
            [mid, ..after] ->
              case mid >= first {
                // Left half sorted: the minimum is past the midpoint.
                True -> find_min(after)
                // Rotation point is in the left half, up to and including mid.
                False -> find_min(list.append(left, [mid]))
              }
            [] -> Error(Nil)
          }
        }
      }
    }
  }
}`,new r("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_min([3, 4, 5, 1, 2])",
      string.inspect(Ok(1)),
      string.inspect(solution.find_min([3, 4, 5, 1, 2])),
    ),
    #(
      "find_min([4, 5, 6, 7, 0, 1, 2])",
      string.inspect(Ok(0)),
      string.inspect(solution.find_min([4, 5, 6, 7, 0, 1, 2])),
    ),
    #(
      "find_min([11, 13, 15, 17])",
      string.inspect(Ok(11)),
      string.inspect(solution.find_min([11, 13, 15, 17])),
    ),
    #("find_min([2, 1])", string.inspect(Ok(1)), string.inspect(solution.find_min([2, 1]))),
  ]
}`))}function yZ(){return new i(`import gleam/list
import gleam/result

pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] ->
      case only == target {
        True -> Ok(offset)
        False -> Error(Nil)
      }
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case right {
        [mid, ..after] ->
          case mid == target {
            True -> Ok(offset + half)
            False ->
              case first <= mid {
                // Left half is sorted.
                True ->
                  case first <= target && target < mid {
                    True -> halve(left, target, offset)
                    False -> halve(after, target, offset + half + 1)
                  }
                // Right half is sorted.
                False ->
                  case mid < target && target <= last {
                    True -> halve(after, target, offset + half + 1)
                    False -> halve(left, target, offset)
                  }
              }
          }
        [] -> Error(Nil)
      }
    }
  }
}`,new r("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 0)",
      string.inspect(Ok(4)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 0)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 3)",
      string.inspect(Error(Nil)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 3)),
    ),
    #(
      "search_rotated([1], 1)",
      string.inspect(Ok(0)),
      string.inspect(solution.search_rotated([1], 1)),
    ),
    #(
      "search_rotated([4, 5, 6, 7, 0, 1, 2], 6)",
      string.inspect(Ok(2)),
      string.inspect(solution.search_rotated([4, 5, 6, 7, 0, 1, 2], 6)),
    ),
  ]
}`))}function _Z(){return new i(`pub fn length(items: List(a)) -> Int {
  case items {
    [] -> 0
    [_, ..rest] -> 1 + length(rest)
  }
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  case items {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [_, ..rest] -> last(rest)
  }
}`,new r(`pub fn length(items: List(a)) -> Int

pub fn last(items: List(a)) -> Result(a, Nil)`,`pub fn length(items: List(a)) -> Int {
  todo
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #("length([1, 2, 3])", string.inspect(3), string.inspect(solution.length([1, 2, 3]))),
    #("length([])", string.inspect(0), string.inspect(solution.length(no_ints))),
    #("last([1, 2, 3])", string.inspect(Ok(3)), string.inspect(solution.last([1, 2, 3]))),
    #(
      "last([])",
      string.inspect(Error(Nil)),
      string.inspect(solution.last(no_ints)),
    ),
  ]
}`))}function hZ(){return new i(`pub fn reverse(items: List(a)) -> List(a) {
  reverse_loop(items, [])
}

fn reverse_loop(items: List(a), acc: List(a)) -> List(a) {
  case items {
    [] -> acc
    [first, ..rest] -> reverse_loop(rest, [first, ..acc])
  }
}

pub fn sum(numbers: List(Int)) -> Int {
  sum_loop(numbers, 0)
}

fn sum_loop(numbers: List(Int), acc: Int) -> Int {
  case numbers {
    [] -> acc
    [first, ..rest] -> sum_loop(rest, acc + first)
  }
}`,new r(`pub fn reverse(items: List(a)) -> List(a)

pub fn sum(numbers: List(Int)) -> Int`,`pub fn reverse(items: List(a)) -> List(a) {
  todo
}

pub fn sum(numbers: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse([1, 2, 3])",
      string.inspect([3, 2, 1]),
      string.inspect(solution.reverse([1, 2, 3])),
    ),
    #(
      "reverse([])",
      string.inspect(no_ints),
      string.inspect(solution.reverse(no_ints)),
    ),
    #("sum([1, 2, 3])", string.inspect(6), string.inspect(solution.sum([1, 2, 3]))),
    #("sum([])", string.inspect(0), string.inspect(solution.sum([]))),
  ]
}`))}function vZ(){return new i(`import gleam/int
import gleam/list

pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(list.fold(rest, first, int.max))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  list.fold(items, 0, fn(count, item) {
    case predicate(item) {
      True -> count + 1
      False -> count
    }
  })
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  list.scan(numbers, 0, fn(acc, n) { acc + n })
}`,new r(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int

pub fn running_total(numbers: List(Int)) -> List(Int)`,`pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  todo
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  todo
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #("max([3, 1, 2])", string.inspect(Ok(3)), string.inspect(solution.max([3, 1, 2]))),
    #("max([])", string.inspect(Error(Nil)), string.inspect(solution.max(no_ints))),
    #(
      "count_if([1, 2, 3, 4], is_even)",
      string.inspect(2),
      string.inspect(solution.count_if([1, 2, 3, 4], fn(n) { n % 2 == 0 })),
    ),
    #(
      "running_total([1, 2, 3])",
      string.inspect([1, 3, 6]),
      string.inspect(solution.running_total([1, 2, 3])),
    ),
  ]
}`))}function mZ(){return new i(`import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.fold(dict.new(), fn(counts, word) {
    dict.upsert(counts, word, fn(n) { option.unwrap(n, 0) + 1 })
  })
}`,new r("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  todo
}`,`import gleam/dict
import gleam/list
import gleam/string
import solution

/// Dicts have no meaningful order, so compare a sorted association list.
fn normalise(counts: dict.Dict(String, Int)) -> List(#(String, Int)) {
  counts
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "word_frequencies(\\"the cat and the hat\\")",
      string.inspect([#("and", 1), #("cat", 1), #("hat", 1), #("the", 2)]),
      string.inspect(normalise(solution.word_frequencies("the cat and the hat"))),
    ),
    #(
      "word_frequencies(\\"\\")",
      string.inspect([]),
      string.inspect(normalise(solution.word_frequencies(""))),
    ),
    #(
      "word_frequencies(\\"Go go GO\\")",
      string.inspect([#("go", 3)]),
      string.inspect(normalise(solution.word_frequencies("Go go GO"))),
    ),
  ]
}`))}function uZ(){return new i(`import gleam/int
import gleam/result

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  use port <- result.try(int.parse(port))
  use timeout <- result.try(int.parse(timeout))
  case host {
    "" -> Error(Nil)
    _ -> Ok(Config(host, port, timeout))
  }
}`,new r(`pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil)`,`pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  todo
}`,`import gleam/result
import gleam/string
import solution

/// Compared field-by-field rather than by inspecting the record, so the check does
/// not depend on how the constructor renders. The annotation is required: Gleam
/// cannot infer a record type from field access alone.
fn fields(
  parsed: Result(solution.Config, Nil),
) -> Result(#(String, Int, Int), Nil) {
  result.map(parsed, fn(config) {
    #(config.host, config.port, config.timeout)
  })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "parse_config(\\"localhost\\", \\"8080\\", \\"30\\")",
      string.inspect(Ok(#("localhost", 8080, 30))),
      string.inspect(fields(solution.parse_config("localhost", "8080", "30"))),
    ),
    #(
      "parse_config(\\"localhost\\", \\"oops\\", \\"30\\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("localhost", "oops", "30"))),
    ),
    #(
      "parse_config(\\"\\", \\"8080\\", \\"30\\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("", "8080", "30"))),
    ),
  ]
}`))}function cZ(){return new i(`import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`,new r("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
  todo
}`,`import gleam/dict
import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "port_description(dict with port 9000",
      string.inspect("port: 9000 (configured)"),
      string.inspect(
        solution.port_description(dict.from_list([#("port", "9000")])),
      ),
    ),
    #(
      "port_description(empty dict)",
      string.inspect("port: 8080 (default)"),
      string.inspect(solution.port_description(dict.new())),
    ),
  ]
}`))}function $Z(){return new i(`import gleam/list
import gleam/string

pub fn strip_comment(line: String) -> String {
  case line {
    "# " <> rest -> rest
    "#" <> rest -> rest
    _ -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.filter_map(fn(word) { list.first(string.to_graphemes(word)) })
  |> string.concat
  |> string.uppercase
}`,new r(`pub fn strip_comment(line: String) -> String

pub fn initials(name: String) -> String`,`pub fn strip_comment(line: String) -> String {
  todo
}

pub fn initials(name: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "strip_comment(\\"# hello\\")",
      string.inspect("hello"),
      string.inspect(solution.strip_comment("# hello")),
    ),
    #(
      "strip_comment(\\"code\\")",
      string.inspect("code"),
      string.inspect(solution.strip_comment("code")),
    ),
    #(
      "initials(\\"ada lovelace\\")",
      string.inspect("AL"),
      string.inspect(solution.initials("ada lovelace")),
    ),
    #(
      "initials(\\"grace brewster murray hopper\\")",
      string.inspect("GBMH"),
      string.inspect(solution.initials("grace brewster murray hopper")),
    ),
  ]
}`))}function pZ(){return new i(`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`,new r("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "slug(\\"  Hello   Brave World \\")",
      string.inspect("hello-brave-world"),
      string.inspect(solution.slug("  Hello   Brave World ")),
    ),
    #("slug(\\"Gleam\\")", string.inspect("gleam"), string.inspect(solution.slug("Gleam"))),
    #("slug(\\"\\")", string.inspect(""), string.inspect(solution.slug(""))),
  ]
}`))}function nZ(){return new i(`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

pub fn add_points(player: Player, points: Int) -> Player {
  Player(..player, score: player.score + points)
}

pub fn level_up(player: Player) -> Player {
  Player(..player, level: player.level + 1, score: 0)
}`,new r(`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player

pub fn add_points(player: Player, points: Int) -> Player

pub fn level_up(player: Player) -> Player`,`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  todo
}

pub fn add_points(player: Player, points: Int) -> Player {
  todo
}

pub fn level_up(player: Player) -> Player {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let player = solution.new_player("lucy") |> solution.add_points(10)
  let levelled = solution.level_up(player)

  [
    #(
      "new_player(\\"lucy\\") fields",
      string.inspect(#("lucy", 0, 1)),
      string.inspect({
        let fresh = solution.new_player("lucy")
        #(fresh.name, fresh.score, fresh.level)
      }),
    ),
    #(
      "add_points(player, 10) score",
      string.inspect(10),
      string.inspect(player.score),
    ),
    #(
      "level_up(player) level and score",
      string.inspect(#(2, 0)),
      string.inspect(#(levelled.level, levelled.score)),
    ),
    #("level_up keeps the name", string.inspect("lucy"), string.inspect(levelled.name)),
  ]
}`))}function sZ(){return new i(`import gleam/list
import gleam/set

pub fn dedupe(items: List(a)) -> List(a) {
  let #(kept, _) =
    list.fold(items, #([], set.new()), fn(acc, item) {
      let #(kept, seen) = acc
      case set.contains(seen, item) {
        True -> #(kept, seen)
        False -> #([item, ..kept], set.insert(seen, item))
      }
    })
  list.reverse(kept)
}`,new r("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
  todo
}`,`import gleam/string
import solution

const no_ints: List(Int) = []

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "dedupe([1, 2, 1, 3, 2])",
      string.inspect([1, 2, 3]),
      string.inspect(solution.dedupe([1, 2, 1, 3, 2])),
    ),
    #(
      "dedupe([]) ",
      string.inspect(no_ints),
      string.inspect(solution.dedupe(no_ints)),
    ),
    #(
      "dedupe([\\"b\\", \\"a\\", \\"b\\"])",
      string.inspect(["b", "a"]),
      string.inspect(solution.dedupe(["b", "a", "b"])),
    ),
  ]
}`))}function G1(I,J,Z){return new u(I,J,Z.solution,ZI,new y(Z.check))}function iZ(){return new D1("Gleam Tips",S([new R0("Idioms",S([G1("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",_Z()),G1("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",hZ()),G1("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",vZ()),G1("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",mZ()),G1("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",uZ()),G1("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',cZ()),G1("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',$Z()),G1("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",pZ()),G1("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",nZ()),G1("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",sZ())]))]))}function K0(I,J,Z){return new u(I,J,Z.solution,ZI,new y(Z.check))}function dZ(){return new D1("NeetCode 150 (Gleam)",S([new R0("Arrays & Hashing",S([K0("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Solve it in Gleam.",zZ()),K0("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise. Solve it in Gleam.",RZ()),K0("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Solve it in Gleam.",LZ()),K0("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve it in Gleam.",NZ()),K0("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Note: Gleam's stdlib has no heap - counting then sorting by frequency is the idiomatic approach. Solve it in Gleam.",UZ()),K0("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time. Solve it in Gleam.",DZ()),K0("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time. Solve it in Gleam.",OZ())])),new R0("Two Pointers",S([K0("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Note: in Gleam, comparing the cleaned graphemes with their reverse is the idiomatic answer. Solve it in Gleam.",BZ()),K0("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",jZ()),K0("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",AZ()),K0("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",TZ())])),new R0("Sliding Window",S([K0("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell. Solve it in Gleam.",PZ()),K0("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters. Solve it in Gleam.",CZ()),K0("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get. Solve it in Gleam.",wZ()),K0("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2. Solve it in Gleam.",EZ())])),new R0("Stack",S([K0("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Solve it in Gleam.",xZ()),K0("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Note: model the stack as a list of #(value, min_so_far) tuples returned from each operation. Solve it in Gleam.",kZ()),K0("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. Solve it in Gleam.",gZ())])),new R0("Binary Search",S([K0("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",fZ()),K0("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",bZ()),K0("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",yZ())]))]))}function lZ(){return new D1("NeetCode 150",S([new R0("Arrays & Hashing",S([new u("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,d,P),new u("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",`def isAnagram(s, t):
    if len(s) != len(t):
        return False

    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] < 0:
            return False

    return True`,d,P),new u("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,d,P),new u("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`,d,P),new u("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",`from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,d,P),new u("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",`def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    return result`,d,P),new u("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`,d,P)])),new R0("Two Pointers",S([new u("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",`def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`,d,P),new u("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`,d,P),new u("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",`def threeSum(nums):
    nums.sort()
    result = []

    for i, a in enumerate(nums):
        if i > 0 and a == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1
        while left < right:
            total = a + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([a, nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

    return result`,d,P),new u("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`,d,P)])),new R0("Sliding Window",S([new u("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`,d,P),new u("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`,d,P),new u("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",`def characterReplacement(s, k):
    count = {}
    left = 0
    max_count = 0
    longest = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_count = max(max_count, count[s[right]])

        while (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1

        longest = max(longest, right - left + 1)

    return longest`,d,P),new u("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",`from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    need = Counter(s1)
    window = Counter(s2[:len(s1)])

    if window == need:
        return True

    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left_char = s2[i - len(s1)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]
        if window == need:
            return True

    return False`,d,P)])),new R0("Stack",S([new u("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`,d,P),new u("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",`class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        current_min = val if not self.mins else min(val, self.mins[-1])
        self.mins.append(current_min)

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]`,d,P),new u("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`,d,P)])),new R0("Binary Search",S([new u("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,d,P),new u("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`,d,P),new u("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,d,P)]))]))}function aZ(){return new D1("Python Tips",S([new R0("Idioms",S([new u("Counter for frequency maps","Write the idiomatic way to count element frequencies and get the n most common items.",`from collections import Counter

counts = Counter(nums)
counts.most_common(2)   # [(val, freq), (val, freq)]
counts[some_key]        # 0 for missing keys, no KeyError`,d,P),new u("defaultdict for grouping","Write the idiomatic way to group items into lists by a computed key, without checking whether the key exists.",`from collections import defaultdict

groups = defaultdict(list)
for word in words:
    groups[sorted(word)].append(word)

# defaultdict(int) for counters
# defaultdict(set) for unique membership`,d,P),new u("deque for O(1) popleft","Write a BFS skeleton using the right data structure for a queue.",`from collections import deque

queue = deque([start])
while queue:
    node = queue.popleft()   # O(1); list.pop(0) is O(n)
    for neighbor in graph[node]:
        queue.append(neighbor)`,d,P),new u("heapq for min/max heaps","Write how to build a min heap, push and pop, and how to fake a max heap.",`import heapq

heap = [3, 1, 4]
heapq.heapify(heap)      # O(n)
heapq.heappush(heap, 2)
smallest = heapq.heappop(heap)

# max heap: negate the values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)`,d,P),new u("Enumerate, zip, and unpacking","Write the idiomatic ways to iterate with an index, iterate two sequences in parallel, and swap two variables.",`for i, val in enumerate(nums):
    ...

for a, b in zip(list_a, list_b):
    ...

for i, val in enumerate(nums, start=1):  # 1-indexed
    ...

left, right = right, left`,d,P),new u("Slicing and reversal","Write how to reverse a sequence, take every nth element, and copy a list with slicing.",`s[::-1]      # reversed
s[::2]       # every 2nd element
s[:]         # shallow copy
s[-3:]       # last 3 elements
s[1:-1]      # drop first and last`,d,P),new u("Sorting with a key","Write how to sort by a custom key, sort descending, and sort by multiple fields.",`nums.sort()                          # in place
sorted_nums = sorted(nums)           # new list

words.sort(key=len)
words.sort(key=len, reverse=True)

# multiple fields: ascending name, descending age
people.sort(key=lambda p: (p.name, -p.age))`,d,P),new u("Building strings efficiently","Write the O(n) way to build a string from many pieces, and explain what to avoid.",`# Good: O(n)
parts = []
for c in chars:
    parts.append(c)
result = ''.join(parts)

# Bad: O(n^2) — strings are immutable,
# every += allocates a new string
result = ''
for c in chars:
    result += c`,d,P)]))]))}function YI(){return S([lZ(),dZ(),aZ(),iZ()])}function oZ(){return M0(YI(),(I)=>{return I.name})}function eZ(I){let J=X6(YI(),(Z)=>{return Z.name===I});if(J instanceof E){let Z=J[0];return M0(Z.subcategories,(Y)=>{return Y.name})}else return w}function QI(I,J){let Z=X6(YI(),(Y)=>{return Y.name===I});if(Z instanceof E){let Y=Z[0],Q=X6(Y.subcategories,(W)=>{return W.name===J});if(Q instanceof E)return Q[0].problems;else return w}else return w}function tZ(I,J,Z){let Y=X6(I,J);if(Y instanceof E){let Q=Y[0];return Z(Q)}else return Y}function WI(I,J,Z){return tZ(YI(),(Y)=>{return Y.name===I},(Y)=>{return tZ(Y.subcategories,(Q)=>{return Q.name===J},(Q)=>{return X6(Q.problems,(W)=>{return W.title===Z})})})}function GI(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return I0(globalThis.localStorage);else return V0(null)}catch{return V0(null)}}function KI(I,J){return cW(I.getItem(J))}function t7(I,J,Z){try{return I.setItem(J,Z),I0(null)}catch{return V0(null)}}function cW(I){if(I!==null)return I0(I);else return V0(null)}var pW="algoDrillState",IY="algoDrillState.v2";function JY(I){let J=W6(I.selected,(Q)=>{if(WI(Q.category,Q.subcategory,Q.title)instanceof E)return!0;else return!1}),Z=new Q0(I.route,I.selected_category,I.selected_subcategory,J,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed);if(Z.route instanceof l8&&Z.problem_index>=M1(J))return new Q0(D6,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,Z.draft,Z.answer_revealed);else return Z}function ZY(){return H0("category",U0,(I)=>{return H0("subcategory",U0,(J)=>{return H0("title",U0,(Z)=>{return D0(new t1(I,J,Z))})})})}function VI(I,J){return $9(I,P,p9(U0),J)}function YY(){return n9(U0,(I)=>{if(I==="drill")return D0(a8);else return D0(D6)})}function nW(){return H0("currentView",YY(),(I)=>{return VI("selectedCategory",(J)=>{return VI("selectedSubcategory",(Z)=>{return H0("selectedProblems",h6(ZY()),(Y)=>{return H0("currentProblemIndex",v0,(Q)=>{return H0("iterationCount",v0,(W)=>{return H0("currentIteration",v0,(X)=>{return D0(new Q0(I,J,Z,Y,Q,W,X,"",!1))})})})})})})})}function sW(I){let J=KI(I,pW);if(J instanceof E){let Z=J[0],Y=hI(Z,nW()),Q=B8(Y,JY);return fI(Q,F8())}else return F8()}function rW(){return H0("route",YY(),(I)=>{return VI("selectedCategory",(J)=>{return VI("selectedSubcategory",(Z)=>{return H0("selected",h6(ZY()),(Y)=>{return H0("problemIndex",v0,(Q)=>{return H0("iterationCount",v0,(W)=>{return H0("currentIteration",v0,(X)=>{return D0(new Q0(I,J,Z,Y,Q,W,X,"",!1))})})})})})})})}function QY(){let I=GI();if(I instanceof E){let J=I[0],Z=KI(J,IY);if(Z instanceof E){let Y=Z[0],Q=hI(Y,rW()),W=B8(Q,JY);return fI(W,F8())}else return sW(J)}else return F8()}function iW(I){let J=c6(S([["route",m0((()=>{if(I.route instanceof U6)return"menu";else return"drill"})())],["selectedCategory",mI(I.selected_category,m0)],["selectedSubcategory",mI(I.selected_subcategory,m0)],["selected",T8(I.selected,(Z)=>{return c6(S([["category",m0(Z.category)],["subcategory",m0(Z.subcategory)],["title",m0(Z.title)]]))})],["problemIndex",p1(I.problem_index)],["iterationCount",p1(I.iteration_count)],["currentIteration",p1(I.current_iteration)]]));return B5(J)}function WY(I){return n6((J)=>{let Z=GI();if(Z instanceof E){let Y=Z[0],Q=t7(Y,IY,iW(I));return}else return})}function o7(I,J){return dI(I,u1(J,(Z)=>{return new H6(!1,!1,Z)}),C,sI,sI,0,0)}function FI(I,J){return dI(I,J,C,rI,rI,0,0)}function o1(I,J,Z){return new H6(J,Z,I)}function K1(I){return o7("click",D0(I))}function XY(I){return o7("input",A1(S(["target","value"]),U0,(J)=>{return D0(I(J))}))}function GY(I){return o7("change",A1(S(["target","value"]),U0,(J)=>{return D0(I(J))}))}function aW(){return FI("keydown",H0("key",U0,(I)=>{return A1(S(["target","value"]),U0,(J)=>{return A1(S(["target","selectionStart"]),v0,(Z)=>{return A1(S(["target","selectionEnd"]),v0,(Y)=>{if(I==="Tab")return D0(o1(new B6(J,Z,Y),!0,!1));else return v6(o1(new B6("",0,0),!1,!1),"key")})})})}))}function tW(I,J,Z){let Y="Problem "+z0(I.problem_index+1)+"/"+z0(M1(I.selected))+" | Iteration "+z0(I.current_iteration)+"/"+z0(I.iteration_count),Q=J.category+"|"+J.subcategory+"|"+J.title+"|"+z0(I.current_iteration);return L6(S([$("drill-container")]),S([["header",G0(S([$("drill-header")]),S([E1(S([l0("exitDrill"),$("btn-secondary"),K1(FZ)]),S([t("Exit drill")])),G0(S([$("progress-text")]),S([t(Y)]))]))],[Q,J4(S([G0(S([$("problem-section")]),S([W4(w,S([t(Z.title)])),G0(S([$("problem-category")]),S([t(J.category+" › "+J.subcategory+" · "+MZ(Z.language))])),G0(S([$("problem-prompt")]),S([t(Z.prompt)]))])),G0(S([$("code-section")]),S([H4(S([l0("codeEditor"),u5("Write your solution here..."),y5(!1),w8(I.draft),XY((W)=>{return new O6(W)}),aW()]),I.draft)])),G0(S([$("answer-section")]),S([E1(S([l0("toggleAnswer"),$("btn-secondary"),K1(HZ)]),S([t((()=>{if(I.answer_revealed)return"Hide answer";else return"Show answer"})())])),G0(S([l0("answerContent"),C8(S([["answer-content",!0],["hidden",!I.answer_revealed]]))]),S([G4(w,S([K4(w,S([t(Z.solution)]))]))]))])),G0(S([$("drill-footer")]),S([E1(S([l0("nextProblem"),$("btn-primary"),K1(SZ)]),S([t("Next")]))]))]))]]))}function VY(I){return u6((()=>{let J=I.selected,Z=A9(J,I.problem_index);return B9(Z)})(),(J)=>{return u6(WI(J.category,J.subcategory,J.title),(Z)=>{return new E(tW(I,J,Z))})})}var FY="src/algodrill/view/menu.gleam";function eW(I){return FI("keydown",H0("key",U0,(J)=>{if(J==="Enter")return D0(o1(I,!0,!1));else if(J===" ")return D0(o1(I,!0,!1));else return v6(o1(I,!1,!1),"key")}))}function e7(I,J,Z){return G0(S([C8(S([["pane-item",!0],["selected",J]])),_5(0),K1(Z),eW(Z)]),S([t(I)]))}function I9(I,J){return G0(S([$("pane")]),S([X4(w,S([t(I)])),J]))}function IX(I,J){return I9("Problems",(()=>{if(J instanceof U)return G0(S([$("pane-list")]),S([G0(S([$("pane-empty")]),S([t("Pick a subcategory first")]))]));else{let Z=I.selected_category,Y;if(Z instanceof y)Y=Z[0];else throw b1("let_assert",FY,"algodrill/view/menu",171,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Z,start:4696,end:4742,pattern_start:4707,pattern_end:4716});let Q=I.selected_subcategory,W;if(Q instanceof y)W=Q[0];else throw b1("let_assert",FY,"algodrill/view/menu",172,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Q,start:4749,end:4798,pattern_start:4760,pattern_end:4769});return L6(S([$("pane-list")]),M0(J,(X)=>{let G=new t1(Y,W,X.title);return[X.title,e7(X.title,b6(I.selected,G),new W8(G))]}))}})())}function JX(I){let J,Z=I.selected_category;if(Z instanceof y){let Q=Z[0];J=eZ(Q)}else J=w;let Y=J;return I9("Subcategory",(()=>{if(Y instanceof U)return G0(S([$("pane-list")]),S([G0(S([$("pane-empty")]),S([t("Pick a category first")]))]));else return L6(S([$("pane-list")]),M0(Y,(Q)=>{return[Q,e7(Q,Z0(I.selected_subcategory,new y(Q)),new Y8(Q))]}))})())}function ZX(I){return I9("Category",L6(S([$("pane-list")]),M0(oZ(),(J)=>{return[J,e7(J,Z0(I.selected_category,new y(J)),new Z8(J))]})))}function YX(I){let J,Z=S(["Categories"]),Y=_0(Z,zI(S([I.selected_category])));J=_0(Y,zI(S([I.selected_subcategory])));let Q=J,W=M1(Q)-1;return G0(S([$("breadcrumbs")]),(()=>{let G=j9(Q,(K,V)=>{if(V===W)return S([l6(S([$("breadcrumb")]),S([t(K)]))]);else return S([l6(S([$("breadcrumb clickable"),K1(new Q8(V))]),S([t(K)])),t(" "),l6(S([$("breadcrumb")]),S([t("/")])),t(" ")])});return T9(G)})())}function J9(I){let J,Z=I.selected_category,Y=I.selected_subcategory;if(Z instanceof y&&Y instanceof y){let W=Z[0],X=Y[0];J=QI(W,X)}else J=w;let Q=J;return G0(S([$("menu-container")]),S([YX(I),G0(S([$("panes-container")]),S([ZX(I),JX(I),IX(I,Q)])),G0(S([$("iteration-control")]),S([F4(S([h5("iterations")]),S([t("Repetitions per problem")])),V4(S([c5("number"),l0("iterations"),m5("1"),v5("20"),w8(z0(I.iteration_count)),GY((W)=>{return new X8(W)})])),l6(S([$("progress-text")]),S([t(z0(M1(I.selected))+" selected")]))])),E1(S([l0("startDrill"),$("btn-primary"),aI(I.selected instanceof U),K1(VZ)]),S([t("Start drill")])),t(" "),E1(S([l0("selectAll"),$("btn-secondary"),aI(Q instanceof U),K1(GZ)]),S([t("Select all in subcategory")])),t(" "),E1(S([l0("clearSelection"),$("btn-secondary"),K1(KZ)]),S([t("Clear selection")]))]))}var WX="src/algodrill.gleam";function XX(I){if(I.route instanceof U6)return J9(I);else{let Z=VY(I);if(Z instanceof E)return Z[0];else return J9(I)}}function GX(I){if(I instanceof G8)return!1;else if(I instanceof K8)if(!I[0])return!1;else return!0;else if(I instanceof V8)return!1;else if(I instanceof O6)return!1;else if(I instanceof B6)return!1;else return!0}function HY(I){return new Q0(D6,I.selected_category,I.selected_subcategory,I.selected,0,I.iteration_count,1,"",!1)}function KX(I,J){if(b6(I,J))return W6(I,(Y)=>{return!Z0(Y,J)});else return _0(I,S([J]))}function VX(I,J){if(J instanceof Z8){let Z=J[0];return[new Q0(I.route,new y(Z),P,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()]}else if(J instanceof Y8){let Z=J[0];return[new Q0(I.route,I.selected_category,new y(Z),I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()]}else if(J instanceof Q8)if(J[0]===0)return[new Q0(I.route,P,P,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()];else return[new Q0(I.route,I.selected_category,P,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()];else if(J instanceof W8){let Z=J[0];return[new Q0(I.route,I.selected_category,I.selected_subcategory,KX(I.selected,Z),I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()]}else if(J instanceof t8){let{selected_category:Z,selected_subcategory:Y}=I;if(Z instanceof y&&Y instanceof y){let Q=Z[0],W=Y[0],X,G=QI(Q,W),K=M0(G,(H)=>{return new t1(Q,W,H.title)});X=W6(K,(H)=>{return!b6(I.selected,H)});let V=X;return[new Q0(I.route,I.selected_category,I.selected_subcategory,_0(I.selected,V),I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()]}else return[I,X0()]}else if(J instanceof o8)return[new Q0(I.route,I.selected_category,I.selected_subcategory,w,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.answer_revealed),X0()];else if(J instanceof X8){let Z=J[0],Y,Q=xI(Z);if(Q instanceof E){let X=Q[0];if(X>0)Y=X;else Y=1}else Y=1;let W=Y;return[new Q0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,W,I.current_iteration,I.draft,I.answer_revealed),X0()]}else if(J instanceof e8)if(I.selected instanceof U)return[I,X0()];else return[new Q0(a8,I.selected_category,I.selected_subcategory,I.selected,0,I.iteration_count,1,"",!1),X0()];else if(J instanceof G8)return[I,n6((Z)=>{return Z(new K8(d7("Exit the drill? Your typed code will be lost.")))})];else if(J instanceof K8)if(J[0])return[HY(I),X0()];else return[I,X0()];else if(J instanceof V8)return[new Q0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,!I.answer_revealed),X0()];else if(J instanceof II){let Z;if(I.current_iteration<I.iteration_count)Z=[I.current_iteration+1,I.problem_index];else Z=[1,I.problem_index+1];let Q=Z,W=Q[0],X=Q[1];if(X>=M1(I.selected))return[HY(I),n6((K)=>{return l7("Drill complete.")})];else return[new Q0(I.route,I.selected_category,I.selected_subcategory,I.selected,X,I.iteration_count,W,"",!1),X0()]}else if(J instanceof O6){let Z=J[0];return[new Q0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,Z,I.answer_revealed),X0()]}else{let{value:Z,start:Y,end:Q}=J;return[new Q0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,r7(Z,Y,Q),I.answer_revealed),tI((W,X)=>{return i7("codeEditor",Y+4)})]}}function FX(I,J){let Z=VX(I,J),Y=Z[0],Q=Z[1];if(GX(J))return[Y,E8(S([WY(Y),Q]))];else return[Y,Q]}function HX(I){return[QY(),X0()]}function SY(){let I=WZ(HX,FX,XX),J=XZ(I,"#app",void 0);if(!(J instanceof E))throw b1("let_assert",WX,"algodrill",23,"main","Pattern match failed, no pattern matched the value.",{value:J,start:763,end:812,pattern_start:774,pattern_end:779});return}SY();
