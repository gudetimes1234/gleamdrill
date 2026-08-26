class P{withFields(Z){let J=Object.keys(this).map((Q)=>(Q in Z)?Z[Q]:this[Q]);return new this.constructor(...J)}}class tJ{static fromArray(Z,J){return V(Z,J)}[Symbol.iterator](){return new gI(this)}toArray(){return[...this]}atLeastLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return J!==void 0}hasLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return Z===-1&&J instanceof k}countLength(){let Z=this,J=0;while(Z)Z=Z.tail,J++;return J-1}}function w(Z,J){return new M9(Z,J)}function V(Z,J){let Q=J||$;for(let X=Z.length-1;X>=0;--X)Q=new M9(Z[X],Q);return Q}class gI{#Z;constructor(Z){this.#Z=Z}next(){if(this.#Z instanceof k)return{done:!0};else{let{head:Z,tail:J}=this.#Z;return this.#Z=J,{value:Z,done:!1}}}}class k extends tJ{}var $=new k,fI=()=>$,eJ=(Z)=>Z instanceof k;class M9 extends tJ{constructor(Z,J){super();this.head=Z,this.tail=J}}var I7=(Z,J)=>new M9(Z,J),Y4=(Z)=>Z instanceof M9,q7=(Z)=>Z.head,$6=(Z)=>Z.tail;class A9{bitSize;byteSize;bitOffset;rawBuffer;constructor(Z,J,Q){if(!(Z instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=J??Z.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=Q??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(Z.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=Z}byteAt(Z){if(Z<0||Z>=this.byteSize)return;return R9(this.rawBuffer,this.bitOffset,Z)}equals(Z){if(this.bitSize!==Z.bitSize)return!1;let J=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&Z.bitOffset===0){for(let X=0;X<J;X++)if(this.rawBuffer[X]!==Z.rawBuffer[X])return!1;let Q=this.bitSize%8;if(Q){let X=8-Q;if(this.rawBuffer[J]>>X!==Z.rawBuffer[J]>>X)return!1}}else{for(let X=0;X<J;X++){let Y=R9(this.rawBuffer,this.bitOffset,X),K=R9(Z.rawBuffer,Z.bitOffset,X);if(Y!==K)return!1}let Q=this.bitSize%8;if(Q){let X=R9(this.rawBuffer,this.bitOffset,J),Y=R9(Z.rawBuffer,Z.bitOffset,J),K=8-Q;if(X>>K!==Y>>K)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function R9(Z,J,Q){if(J===0)return Z[Q]??0;else{let X=Z[Q]<<J&255,Y=Z[Q+1]>>8-J;return X|Y}}class ZQ{constructor(Z){this.value=Z}}class W3 extends P{static isResult(Z){return Z instanceof W3}}class D extends W3{constructor(Z){super();this[0]=Z}isOk(){return!0}}var v1=(Z)=>new D(Z),O0=(Z)=>Z instanceof D,D0=(Z)=>Z[0];class V1 extends W3{constructor(Z){super();this[0]=Z}isOk(){return!1}}var t1=(Z)=>new V1(Z),$I=(Z)=>Z instanceof V1;function S1(Z,J){let Q=[Z,J];while(Q.length){let X=Q.pop(),Y=Q.pop();if(X===Y)continue;if(!yI(X)||!yI(Y))return!1;if(!pF(X,Y)||fF(X,Y)||$F(X,Y)||uF(X,Y)||nF(X,Y)||vF(X,Y)||mF(X,Y))return!1;let I=Object.getPrototypeOf(X);if(I!==null&&typeof I.equals==="function")try{if(X.equals(Y))continue;else return!1}catch{}let[q,W]=gF(X),G=q(X),U=q(Y);if(G.length!==U.length)return!1;for(let z of G)Q.push(W(X,z),W(Y,z))}return!0}function gF(Z){if(Z instanceof Map)return[(J)=>J.keys(),(J,Q)=>J.get(Q)];else{let J=Z instanceof globalThis.Error?["message"]:[];return[(Q)=>[...J,...Object.keys(Q)],(Q,X)=>Q[X]]}}function fF(Z,J){return Z instanceof Date&&(Z>J||Z<J)}function $F(Z,J){return!(Z instanceof A9)&&Z.buffer instanceof ArrayBuffer&&Z.BYTES_PER_ELEMENT&&!(Z.byteLength===J.byteLength&&Z.every((Q,X)=>Q===J[X]))}function uF(Z,J){return Array.isArray(Z)&&Z.length!==J.length}function nF(Z,J){return Z instanceof Map&&Z.size!==J.size}function vF(Z,J){return Z instanceof Set&&(Z.size!=J.size||[...Z].some((Q)=>!J.has(Q)))}function mF(Z,J){return Z instanceof RegExp&&(Z.source!==J.source||Z.flags!==J.flags)}function yI(Z){return typeof Z==="object"&&Z!==null}function pF(Z,J){if(typeof Z!=="object"&&typeof J!=="object"&&(!Z||!J))return!1;if([Promise,WeakSet,WeakMap,Function].some((X)=>Z instanceof X))return!1;return Z.constructor===J.constructor}function x4(Z,J){return Math.trunc(JQ(Z,J))}function JQ(Z,J){if(J===0)return 0;else return Z/J}function R8(Z,J,Q,X,Y,K,I){let q=new globalThis.Error(K);q.gleam_error=Z,q.file=J,q.module=Q,q.line=X,q.function=Y,q.fn=Y;for(let W in I)q[W]=I[W];return q}class v0 extends P{}var M8=new v0,uI=()=>M8;class L0 extends P{}var A8=new L0,nI=()=>A8;class QQ extends P{}var D8=new QQ,vI=()=>D8;class a extends P{constructor(Z){super();this[0]=Z}}var G3=(Z)=>Z instanceof a,U3=(Z)=>Z[0];class U6 extends P{}var U1=new U6;function cF(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function dF(Z){return cF(Z,$)}function sF(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return dF(X);else{let Y=Q.head;if(Y instanceof a){let K=Q.tail,I=Y[0];Z=K,J=w(I,X)}else Z=Q.tail,J=X}}}function XQ(Z){return sF(Z,$)}var mI=new WeakMap,YQ=new DataView(new ArrayBuffer(8)),KQ=0;function IQ(Z){let J=mI.get(Z);if(J!==void 0)return J;let Q=KQ++;if(KQ===2147483647)KQ=0;return mI.set(Z,Q),Q}function qQ(Z,J){return Z^J+2654435769+(Z<<6)+(Z>>2)|0}function WQ(Z){let J=0,Q=Z.length;for(let X=0;X<Q;X++)J=Math.imul(31,J)+Z.charCodeAt(X)|0;return J}function dI(Z){YQ.setFloat64(0,Z);let J=YQ.getInt32(0),Q=YQ.getInt32(4);return Math.imul(73244475,J>>16^J)^Q}function lF(Z){return WQ(Z.toString())}function iF(Z){let J=Object.getPrototypeOf(Z);if(J!==null&&typeof J.hashCode==="function")try{let X=Z.hashCode(Z);if(typeof X==="number")return X}catch{}if(Z instanceof Promise||Z instanceof WeakSet||Z instanceof WeakMap)return IQ(Z);if(Z instanceof Date)return dI(Z.getTime());let Q=0;if(Z instanceof ArrayBuffer)Z=new Uint8Array(Z);if(Array.isArray(Z)||Z instanceof Uint8Array)for(let X=0;X<Z.length;X++)Q=Math.imul(31,Q)+z6(Z[X])|0;else if(Z instanceof Set)Z.forEach((X)=>{Q=Q+z6(X)|0});else if(Z instanceof Map)Z.forEach((X,Y)=>{Q=Q+qQ(z6(X),z6(Y))|0});else{let X=Object.keys(Z);for(let Y=0;Y<X.length;Y++){let K=X[Y],I=Z[K];Q=Q+qQ(z6(I),WQ(K))|0}}return Q}function z6(Z){if(Z===null)return 1108378658;if(Z===void 0)return 1108378659;if(Z===!0)return 1108378657;if(Z===!1)return 1108378656;switch(typeof Z){case"number":return dI(Z);case"string":return WQ(Z);case"bigint":return lF(Z);case"object":return iF(Z);case"symbol":return IQ(Z);case"function":return IQ(Z);default:return 0}}class K4{constructor(Z,J){this.size=Z,this.root=J}}var D9=5,rF=(1<<D9)-1,V3=Symbol();class B8{constructor(Z,J,Q,X){this.datamap=J,this.nodemap=Q,this.data=X,this.generation=Z}equals(Z){if(this===Z)return!0;if(!(Z instanceof B8))return!1;if(this.datamap!==Z.datamap||this.nodemap!==Z.nodemap)return!1;let J=this.data,Q=Z.data;if(J.length!==Q.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#Z(Q);let X=J.length-L9(this.nodemap);for(let Y=0;Y<X;Y+=2)if(!S1(J[Y],Q[Y])||!S1(J[Y+1],Q[Y+1]))return!1;for(let Y=X;Y<J.length;++Y)if(!J[Y].equals(Q[Y]))return!1;return!0}#Z(Z){let J=this.data;Z:for(let Q=0;Q<J.length;Q+=2){for(let X=0;X<Z.length;X+=2)if(S1(J[Q],Z[X])){if(!S1(J[Q+1],Z[X+1]))return!1;continue Z}return!1}return!0}hashCode(){let Z=this.data,J=Z.length-L9(this.nodemap),Q=0;for(let X=0;X<J;X+=2)Q=Q+qQ(z6(Z[X+1]),z6(Z[X]))|0;for(let X=J;X<Z.length;++X)Q=Q+Z[X].hashCode()|0;return Q}}var sI=oF(0),lI=new K4(0,sI),aF=t1(void 0);function oF(Z){return new B8(Z,0,0,[])}function iI(Z,J){if(Z.generation===J)return Z;let Q=Z.data.slice(0);return new B8(J,Z.datamap,Z.nodemap,Q)}function j3(Z,J,Q,X){if(Z.data[Q]===X)return Z;return Z=iI(Z,J),Z.data[Q]=X,Z}function pI(Z,J,Q,X,Y,K){let I=Z.data,q=I.length,W=Array(q+2),G=0,U=0;while(G<X)W[U++]=I[G++];W[U++]=Y,W[U++]=K;while(G<q)W[U++]=I[G++];return new B8(J,Z.datamap|Q,Z.nodemap,W)}function cI(Z,J,Q,X){Z=iI(Z,J);let Y=Z.data,K=Y.length;for(let I=X,q=X+2;q<K;++q,++I)Y[I]=Y[q];return Y.pop(),Y.pop(),Z.datamap^=Q,Z}function W7(){return lI}function I4(Z,J){let Q=tF(Z.root,J,z6(J));return Q!==V3?v1(Q):aF}function tF(Z,J,Q){for(let Y=0;Y<32;Y+=D9){let K=Z.data,I=UQ(Q,Y);if(Z.nodemap&I)Z=K[K.length-1-L8(Z.nodemap,I)];else if(Z.datamap&I){let q=Math.imul(L8(Z.datamap,I),2);return S1(J,K[q])?K[q+1]:V3}else return V3}let X=Z.data;for(let Y=0;Y<X.length;Y+=2)if(S1(J,X[Y]))return X[Y+1];return V3}function GQ(Z){return{generation:aI(Z),root:Z.root,size:Z.size,dict:Z}}function rI(Z){if(Z.root===Z.dict.root)return Z.dict;return new K4(Z.size,Z.root)}function aI(Z){let J=Z.root;if(J.generation<Number.MAX_SAFE_INTEGER)return J.generation+1;let Q=[J];while(Q.length){let X=Q.pop();X.generation=0;let Y=X.data.length-L9(X.nodemap);for(let K=Y;K<X.data.length;++K)Q.push(X.data[K])}return 1}var z3=GQ(lI);function P8(Z,J,Q){z3.generation=aI(Z),z3.size=Z.size;let X=z6(J),Y=O3(z3,Z.root,J,Q,X,0);if(Y===Z.root)return Z;return new K4(z3.size,Y)}function O3(Z,J,Q,X,Y,K){let I=J.data,q=Z.generation;if(K>32){for(let h=0;h<I.length;h+=2)if(S1(Q,I[h]))return j3(J,q,h+1,X);return Z.size+=1,pI(J,q,0,I.length,Q,X)}let W=UQ(Y,K);if(J.nodemap&W){let h=I.length-1-L8(J.nodemap,W),L=I[h];return L=O3(Z,L,Q,X,Y,K+D9),j3(J,q,h,L)}let G=Math.imul(L8(J.datamap,W),2);if((J.datamap&W)===0)return Z.size+=1,pI(J,q,W,G,Q,X);if(S1(Q,I[G]))return j3(J,q,G+1,X);let U=K+D9,z=sI;z=O3(Z,z,Q,X,Y,U);let j=I[G],O=I[G+1],H=z6(j);z=O3(Z,z,j,O,H,U),Z.size-=1;let N=I.length,R=N-1-L8(J.nodemap,W),T=Array(N-1),_=0,C=0;while(_<G)T[C++]=I[_++];_+=2;while(_<=R)T[C++]=I[_++];T[C++]=z;while(_<N)T[C++]=I[_++];return new B8(q,J.datamap^W,J.nodemap|W,T)}function oI(Z,J){let Q=z6(Z);return J.root=tI(J,J.root,Z,Q,0),J}function tI(Z,J,Q,X,Y){let K=J.data,I=Z.generation;if(Y>32){for(let G=0;G<K.length;G+=2)if(S1(Q,K[G]))return Z.size-=1,cI(J,I,0,G);return J}let q=UQ(X,Y),W=Math.imul(L8(J.datamap,q),2);if((J.nodemap&q)!==0){let G=K.length-1-L8(J.nodemap,q),U=K[G];if(U=tI(Z,U,Q,X,Y+D9),U.nodemap!==0||U.data.length>2)return j3(J,I,G,U);let z=K.length,j=Array(z+1),O=0,H=0;while(O<W)j[H++]=K[O++];j[H++]=U.data[0],j[H++]=U.data[1];while(O<G)j[H++]=K[O++];O++;while(O<z)j[H++]=K[O++];return new B8(I,J.datamap|q,J.nodemap^q,j)}if((J.datamap&q)===0||!S1(Q,K[W]))return J;return Z.size-=1,cI(J,I,q,W)}function S8(Z,J,Q){let X=[Z.root];while(X.length){let Y=X.pop(),K=Y.data,I=K.length-L9(Y.nodemap);for(let q=0;q<I;q+=2)J=Q(J,K[q],K[q+1]);for(let q=I;q<K.length;++q)X.push(K[q])}return J}function L9(Z){return Z-=Z>>>1&1431655765,Z=(Z&858993459)+(Z>>>2&858993459),Math.imul(Z+(Z>>>4)&252645135,16843009)>>>24}function L8(Z,J){return L9(Z&J-1)}function UQ(Z,J){return 1<<(Z>>>J&rF)}function B9(Z){return S8(Z,$,(J,Q,X)=>{return w(Q,J)})}function zQ(Z,J){let Q=GQ(Z),X=((Y)=>{return oI(J,Y)})(Q);return rI(X)}class g4 extends P{}var u6=new g4;class Zq extends P{}var P9=new Zq;function ZH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else Z=Q.tail,J=X+1}}function G0(Z){return ZH(Z,0)}function JH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return K;else{let{head:I,tail:q}=X;if(Y(I))Z=q,J=Y,Q=K+1;else Z=q,J=Y,Q=K}}}function U7(Z,J){return JH(Z,J,0)}function G7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function _1(Z){return G7(Z,$)}function z7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return!1;else{let Y=Q.head;if(S1(Y,X))return!0;else Z=Q.tail,J=X}}}function F3(Z){if(Z instanceof k)return new V1(void 0);else{let J=Z.head;return new D(J)}}function QH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return _1(K);else{let{head:I,tail:q}=X,W;if(Y(I))W=w(I,K);else W=K;let U=W;Z=q,J=Y,Q=U}}}function Q0(Z,J){return QH(Z,J,$)}function XH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return _1(K);else{let{head:I,tail:q}=X,W,G=Y(I);if(G instanceof D){let z=G[0];W=w(z,K)}else W=K;let U=W;Z=q,J=Y,Q=U}}}function V7(Z,J){return XH(Z,J,$)}function YH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return _1(K);else{let I=X.head;Z=X.tail,J=Y,Q=w(Y(I),K)}}}function H1(Z,J){return YH(Z,J,$)}function KH(Z,J,Q,X){while(!0){let Y=Z,K=J,I=Q,q=X;if(Y instanceof k)return _1(q);else{let{head:W,tail:G}=Y,U=w(K(W,I),q);Z=G,J=K,Q=I+1,X=U}}}function S9(Z,J){return KH(Z,J,0,$)}function H3(Z,J){while(!0){let Q=Z,X=J;if(X<=0)return Q;else if(Q instanceof k)return Q;else Z=Q.tail,J=X-1}}function IH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return _1(K);else if(X instanceof k)return _1(K);else{let q=X.head;Z=X.tail,J=Y-1,Q=w(q,K)}}}function N3(Z,J){return IH(Z,J,$)}function qH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function X0(Z,J){return qH(_1(Z),J)}function R3(Z,J){return w(J,Z)}function WH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return _1(X);else{let Y=Q.head;Z=Q.tail,J=G7(Y,X)}}}function j7(Z){return WH(Z,$)}function T9(Z,J){return j7(H1(Z,J))}function B0(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return Y;else{let I=X.head;Z=X.tail,J=K(Y,I),Q=K}}}function O7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return new V1(void 0);else{let{head:Y,tail:K}=Q;if(X(Y))return new D(Y);else Z=K,J=X}}}function Jq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return new V1(void 0);else{let{head:Y,tail:K}=Q,I=X(Y);if(I instanceof D)return I;else Z=K,J=X}}}function Qq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return!0;else{let{head:Y,tail:K}=Q,I=X(Y);if(I)Z=K,J=X;else return I}}}function GH(Z,J,Q,X){while(!0){let Y=Z,K=J,I=Q,q=X;if(Y instanceof k)return G7(K,q);else if(K instanceof k)return G7(Y,q);else{let{head:W,tail:G}=Y,U=K.head,z=K.tail,j=I(W,U);if(j instanceof v0)Z=Y,J=z,Q=I,X=w(U,q);else if(j instanceof L0)Z=G,J=K,Q=I,X=w(W,q);else Z=G,J=K,Q=I,X=w(W,q)}}}function UH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return _1(K);else{let I=X.tail;if(I instanceof k){let q=X.head;return _1(w(_1(q),K))}else{let q=X.head,W=I.head,G=I.tail,U=GH(q,W,Y,$);Z=G,J=Y,Q=w(U,K)}}}}function zH(Z,J,Q,X){while(!0){let Y=Z,K=J,I=Q,q=X;if(Y instanceof k)return G7(K,q);else if(K instanceof k)return G7(Y,q);else{let{head:W,tail:G}=Y,U=K.head,z=K.tail,j=I(W,U);if(j instanceof v0)Z=G,J=K,Q=I,X=w(W,q);else if(j instanceof L0)Z=Y,J=z,Q=I,X=w(U,q);else Z=Y,J=z,Q=I,X=w(U,q)}}}function VH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return _1(K);else{let I=X.tail;if(I instanceof k){let q=X.head;return _1(w(_1(q),K))}else{let q=X.head,W=I.head,G=I.tail,U=zH(q,W,Y,$);Z=G,J=Y,Q=w(U,K)}}}}function jH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return X;else if(Y instanceof g4)if(X.tail instanceof k)return X.head;else Z=VH(X,K,$),J=P9,Q=K;else if(X.tail instanceof k){let q=X.head;return _1(q)}else Z=UH(X,K,$),J=u6,Q=K}}function OH(Z,J,Q,X,Y,K){while(!0){let I=Z,q=J,W=Q,G=X,U=Y,z=K,j=w(U,W);if(I instanceof k)if(G instanceof g4)return w(_1(j),z);else return w(j,z);else{let{head:O,tail:H}=I,N=q(U,O);if(G instanceof g4)if(N instanceof v0)Z=H,J=q,Q=j,X=G,Y=O,K=z;else if(N instanceof L0)Z=H,J=q,Q=j,X=G,Y=O,K=z;else{let R;if(G instanceof g4)R=w(_1(j),z);else R=w(j,z);let T=R;if(H instanceof k)return w(V([O]),T);else{let{head:_,tail:C}=H,h,L=q(O,_);if(L instanceof v0)h=u6;else if(L instanceof L0)h=u6;else h=P9;let S=h;Z=C,J=q,Q=V([O]),X=S,Y=_,K=T}}else if(N instanceof v0){let R;if(G instanceof g4)R=w(_1(j),z);else R=w(j,z);let T=R;if(H instanceof k)return w(V([O]),T);else{let{head:_,tail:C}=H,h,L=q(O,_);if(L instanceof v0)h=u6;else if(L instanceof L0)h=u6;else h=P9;let S=h;Z=C,J=q,Q=V([O]),X=S,Y=_,K=T}}else if(N instanceof L0){let R;if(G instanceof g4)R=w(_1(j),z);else R=w(j,z);let T=R;if(H instanceof k)return w(V([O]),T);else{let{head:_,tail:C}=H,h,L=q(O,_);if(L instanceof v0)h=u6;else if(L instanceof L0)h=u6;else h=P9;let S=h;Z=C,J=q,Q=V([O]),X=S,Y=_,K=T}}else Z=H,J=q,Q=j,X=G,Y=O,K=z}}}function M3(Z,J){if(Z instanceof k)return Z;else{let Q=Z.tail;if(Q instanceof k)return Z;else{let X=Z.head,Y=Q.head,K=Q.tail,I,q=J(X,Y);if(q instanceof v0)I=u6;else if(q instanceof L0)I=u6;else I=P9;let W=I,G=OH(K,J,V([X]),W,Y,$);return jH(G,u6,J)}}}function FH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return[_1(K),X];else if(X instanceof k)return[_1(K),$];else{let q=X.head;Z=X.tail,J=Y-1,Q=w(q,K)}}}function Xq(Z,J){return FH(Z,J,$)}function Yq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return;else{let{head:Y,tail:K}=Q;X(Y),Z=K,J=X}}}class qq extends P{}var U_=new qq;class Uq extends P{}var H_=new Uq;class zq extends P{}var N_=new zq;function Vq(Z,J){if(Z===J)return A8;else if(Oq(Z,J))return M8;else return D8}function A3(Z,J){if(J==="")return jQ(Z);else{let X=n1(Z),Y=OQ(X,J);return H1(Y,n1)}}function DH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else{let Y=Q.head;Z=Q.tail,J=X+Y}}}function jq(Z){return DH(Z,"")}function LH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return K;else{let I=X.head;Z=X.tail,J=Y,Q=K+Y+I}}}function D3(Z,J){if(Z instanceof k)return"";else{let{head:Q,tail:X}=Z;return LH(X,J,Q)}}function L3(Z){let Q=Fq(Z);return Hq(Q)}class f4 extends P{constructor(Z,J,Q){super();this.expected=Z,this.found=J,this.path=Q}}var Aq=(Z,J,Q)=>new f4(Z,J,Q);class b0 extends P{constructor(Z){super();this.function=Z}}var TH=new b0(_H),a0=new b0(EH);var w1=new b0(CH),h9=new b0(bH);function n6(Z,J){let Q=J.function(Z),X=Q[0],Y=Q[1];if(Y instanceof k)return new D(X);else return new V1(Y)}function HQ(Z,J,Q){let X=Q(Z);if(X instanceof D)return[X[0],$];else return[X[0],V([new f4(J,W4(Z),$)])]}function _H(Z){return HQ(Z,"Float",Pq)}function T8(Z,J){return new b0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1];return[J(Y),K]})}function EH(Z){return HQ(Z,"Int",Sq)}function CH(Z){return HQ(Z,"String",Tq)}function wH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(K instanceof k)return Y;else{let{head:I,tail:q}=K,W=I.function(X),G=W;if(W[1]instanceof k)return G;else Z=X,J=Y,Q=q}}}function Dq(Z,J){return new b0((Q)=>{let X=Z.function(Q),Y=X;if(X[1]instanceof k)return Y;else return wH(Q,Y,J)})}function hH(Z){let J=Dq(w1,V([(()=>{return T8(a0,D1)})(),(()=>{return T8(TH,P3)})()])),Q=n6(Z,J);if(Q instanceof D)return Q[0];else return"<"+W4(Z)+">"}function w9(Z,J){let Q=H1(J,(Y)=>{let I=n1(Y);return hH(I)}),X=H1(Z[1],(Y)=>{return new f4(Y.expected,Y.found,X0(Q,Y.path))});return[Z[0],X]}function G4(Z){return new b0((J)=>{return Bq(J,Z.function,(Q,X)=>{return w9(Q,V([X]))},0,$)})}function kH(Z,J,Q,X,Y){while(!0){let K=Z,I=J,q=Q,W=X,G=Y;if(K instanceof k){let z=q(W);return w9(z,_1(I))}else{let{head:U,tail:z}=K,j=NQ(W,U);if(j instanceof D){let O=j[0];if(O instanceof a){let H=O[0];Z=z,J=w(U,I),Q=q,X=H,Y=G}else return G(W,w(U,I))}else{let O=j[0],R=[q(W)[0],V([new f4(O,W4(W),$)])];return w9(R,_1(I))}}}}function F7(Z,J,Q){return new b0((X)=>{let Y=kH(Z,$,J.function,X,(U,z)=>{let H=[J.function(U)[0],V([new f4("Field","Nothing",$)])];return w9(H,_1(z))}),K=Y[0],I=Y[1],q=Q(K).function(X),W=q[0],G=q[1];return[W,X0(I,G)]})}function k1(Z){return new b0((J)=>{return[Z,$]})}function Lq(Z,J){return V([new f4(Z,W4(J),$)])}function y1(Z,J,Q){return F7(V([Z]),J,Q)}function v6(Z,J,Q,X){return new b0((Y)=>{let K,I,q=NQ(Y,Z);if(q instanceof D){let N=q[0];if(N instanceof a){let R=N[0];I=Q.function(R)}else I=[J,$]}else{let N=q[0];I=[J,V([new f4(N,W4(Y),$)])]}K=w9(I,V([Z]));let G=K,U=G[0],z=G[1],j=X(U).function(Y),O=j[0],H=j[1];return[O,X0(z,H)]})}function bH(Z){if(S1(n1(!0),Z))return[!0,$];else if(S1(n1(!1),Z))return[!1,$];else return[!1,Lq("Bool",Z)]}function B3(Z){return new b0((J)=>{if(_q(J))return[U1,$];else{let X=Z.function(J),Y=X[0],K=X[1];return[new a(Y),K]}})}function k9(Z,J){return new b0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1],q=J(Y).function(Q),W=q,G=q[0];if(K instanceof k)return W;else return[G,K]})}function b9(Z,J){return new b0((Q)=>{return[Z,Lq(J,Q)]})}var yH=void 0;function n1(Z){return Z}function RQ(Z){if(/^[-+]?(\d+)$/.test(Z))return v1(parseInt(Z));else return t1(yH)}function D1(Z){return Z.toString()}function jQ(Z){let J=gH(Z);if(J)return x9(Array.from(J).map((Q)=>Q.segment));else return x9(Z.match(/./gsu))}var Eq=void 0;function gH(Z){if(globalThis.Intl&&Intl.Segmenter)return Eq||=new Intl.Segmenter,Eq.segment(Z)[Symbol.iterator]()}function E9(Z){return Z.toLowerCase()}function Oq(Z,J){return Z<J}function OQ(Z,J){return x9(Z.split(J))}function FQ(Z,J){return Z.indexOf(J)>=0}function C9(Z,J){return Z.startsWith(J)}var Cq=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),fH=new RegExp(`^[${Cq}]*`),$H=new RegExp(`[${Cq}]*$`);function Fq(Z){return Z.replace(fH,"")}function Hq(Z){return Z.replace($H,"")}function W4(Z){if(typeof Z==="string")return"String";else if(typeof Z==="boolean")return"Bool";else if(nH(Z))return"Result";else if(S3(Z))return"List";else if(Z instanceof A9)return"BitArray";else if(Z instanceof K4)return"Dict";else if(Number.isInteger(Z))return"Int";else if(Array.isArray(Z))return"Array";else if(typeof Z==="number")return"Float";else if(Z===null)return"Nil";else if(Z===void 0)return"Nil";else{let J=typeof Z;return J.charAt(0).toUpperCase()+J.slice(1)}}var{MAX_SAFE_INTEGER:zE,MIN_SAFE_INTEGER:VE}=Number;function P3(Z){let J=Z.toString().replace("+","");if(J.indexOf(".")>=0)return J;else{let Q=J.indexOf("e");if(Q>=0)return J.slice(0,Q)+".0"+J.slice(Q);else return J+".0"}}class uH{#Z=new Set;inspect(Z){let J=typeof Z;if(Z===!0)return"True";if(Z===!1)return"False";if(Z===null)return"//js(null)";if(Z===void 0)return"Nil";if(J==="string")return this.#Y(Z);if(J==="bigint"||Number.isInteger(Z))return Z.toString();if(J==="number")return P3(Z);if(Z instanceof ZQ)return this.#q(Z);if(Z instanceof A9)return this.#K(Z);if(Z instanceof RegExp)return`//js(${Z})`;if(Z instanceof Date)return`//js(Date("${Z.toISOString()}"))`;if(Z instanceof globalThis.Error)return`//js(${Z.toString()})`;if(Z instanceof Function){let X=[];for(let Y of Array(Z.length).keys())X.push(String.fromCharCode(Y+97));return`//fn(${X.join(", ")}) { ... }`}if(this.#Z.size===this.#Z.add(Z).size)return"//js(circular reference)";let Q;if(Array.isArray(Z))Q=`#(${Z.map((X)=>this.inspect(X)).join(", ")})`;else if(S3(Z))Q=this.#Q(Z);else if(Z instanceof P)Q=this.#J(Z);else if(Z instanceof K4)Q=this.#X(Z);else if(Z instanceof Set)return`//js(Set(${[...Z].map((X)=>this.inspect(X)).join(", ")}))`;else Q=this.#I(Z);return this.#Z.delete(Z),Q}#I(Z){let J=Object.getPrototypeOf(Z)?.constructor?.name||"Object",Q=[];for(let K of Object.keys(Z))Q.push(`${this.inspect(K)}: ${this.inspect(Z[K])}`);let X=Q.length?" "+Q.join(", ")+" ":"";return`//js(${J==="Object"?"":J+" "}{${X}})`}#X(Z){let J="dict.from_list([",Q=!0;return J=S8(Z,J,(X,Y,K)=>{if(!Q)X=X+", ";return Q=!1,X+"#("+this.inspect(Y)+", "+this.inspect(K)+")"}),J+"])"}#J(Z){let J=Object.keys(Z).map((Q)=>{let X=this.inspect(Z[Q]);return isNaN(parseInt(Q))?`${Q}: ${X}`:X}).join(", ");return J?`${Z.constructor.name}(${J})`:Z.constructor.name}#Q(Z){if(eJ(Z))return"[]";let J='charlist.from_string("',Q="[",X=Z;while(Y4(X)){let Y=X.head;if(X=X.tail,Q!=="[")Q+=", ";if(Q+=this.inspect(Y),J)if(Number.isInteger(Y)&&Y>=32&&Y<=126)J+=String.fromCharCode(Y);else J=null}if(J)return J+'")';else return Q+"]"}#Y(Z){let J='"';for(let Q=0;Q<Z.length;Q++){let X=Z[Q];switch(X){case`
`:J+="\\n";break;case"\r":J+="\\r";break;case"\t":J+="\\t";break;case"\f":J+="\\f";break;case"\\":J+="\\\\";break;case'"':J+="\\\"";break;default:if(X<" "||X>"~"&&X<" ")J+="\\u{"+X.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else J+=X}}return J+='"',J}#q(Z){return`//utfcodepoint(${String.fromCodePoint(Z.value)})`}#K(Z){if(Z.bitSize===0)return"<<>>";let J="<<";for(let Q=0;Q<Z.byteSize-1;Q++)J+=Z.byteAt(Q).toString(),J+=", ";if(Z.byteSize*8===Z.bitSize)J+=Z.byteAt(Z.byteSize-1).toString();else{let Q=Z.bitSize%8;J+=Z.byteAt(Z.byteSize-1)>>8-Q,J+=`:size(${Q})`}return J+=">>",J}}function NQ(Z,J){if(Z instanceof K4){let X=I4(Z,J);return v1(X.isOk()?new a(X[0]):new U6)}if(Z instanceof WeakMap||Z instanceof Map){let X={},Y=Z.get(J,X);if(Y===X)return v1(new U6);return v1(new a(Y))}let Q=Number.isInteger(J);if(Q&&J>=0&&J<8&&S3(Z)){let X=0;for(let Y of Z){if(X===J)return v1(new a(Y));X++}return t1("Indexable")}if(Q&&Array.isArray(Z)||Z&&typeof Z==="object"||Z&&Object.getPrototypeOf(Z)===Object.prototype){if(J in Z)return v1(new a(Z[J]));return v1(new U6)}return t1(Q?"Indexable":"Dict")}function Bq(Z,J,Q,X,Y){if(!(S3(Z)||Array.isArray(Z))){let I=Aq("List",W4(Z),Y);return[Y,x9([I])]}let K=[];for(let I of Z){let q=J(I),[W,G]=q;if(Y4(G)){let[U,z]=Q(q,X.toString());return[Y,z]}K.push(W),X++}return[x9(K),Y]}function Pq(Z){if(typeof Z==="number")return v1(Z);return t1(0)}function Sq(Z){if(Number.isInteger(Z))return v1(Z);return t1(0)}function Tq(Z){if(typeof Z==="string")return v1(Z);return t1("")}function _q(Z){return Z===null||Z===void 0}function x9(Z){let J=fI(),Q=Z.length;while(Q--)J=I7(Z[Q],J);return J}function S3(Z){return eJ(Z)||Y4(Z)}function nH(Z){return O0(Z)||$I(Z)}function T3(Z,J){if(Z>J)return Z;else return J}function wq(Z,J){if(Z===J)return A8;else if(Z<J)return M8;else return D8}class hq extends P{}var vH=new hq;class AQ extends P{}var uE=new AQ;class kq extends P{}var nE=new kq;class bq extends P{}var vE=new bq;class xq extends P{}var mE=new xq;class yq extends P{}var pE=new yq;function H0(Z,J){if(Z instanceof D){let Q=Z[0];return new D(J(Q))}else return Z}function gq(Z,J){if(Z instanceof D)return Z;else{let Q=Z[0];return new V1(J(Q))}}function y9(Z,J){if(Z instanceof D){let Q=Z[0];return J(Q)}else return Z}function g9(Z,J){if(Z instanceof D)return Z[0];else return J}class DQ extends P{}var rE=new DQ;class LQ extends P{}var aE=new LQ;class fq extends P{}var oE=new fq;class $q extends P{}var WC=new $q;class uq extends P{}var VC=new uq;class nq extends P{}var dH=new nq;class vq extends P{}var jC=new vq;class mq extends P{}var sH=new mq;class cq extends P{}var RC=new cq;function dq(Z,J,Q){if(Z)return J;else return Q()}function x0(Z){return Z}function BQ(Z){return JSON.stringify(Z)}function lq(Z){return Object.fromEntries(Z)}function E8(Z){return Z}function iq(Z){let J=[];while(Y4(Z))J.push(q7(Z)),Z=$6(Z);return J}function rq(){return null}function aq(Z){try{let J=JSON.parse(Z);return v1(J)}catch(J){return t1(rH(J,Z))}}function rH(Z,J){if(aH(Z))return oq();return oH(Z,J)}function aH(Z){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(Z.message)}function oH(Z,J){let Q=[tH,eH,JN,ZN];for(let X of Q){let Y=X(Z,J);if(Y)return Y}return H7("")}function tH(Z){let Q=/unexpected token '(.)', ".+" is not valid JSON/i.exec(Z.message);if(!Q)return null;let X=E3(Q[1]);return H7(X)}function eH(Z){let Q=/unexpected token (.) in JSON at position (\d+)/i.exec(Z.message);if(!Q)return null;let X=E3(Q[1]);return H7(X)}function ZN(Z,J){let X=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(Z.message);if(!X)return null;let Y=Number(X[2]),K=Number(X[3]),I=QN(Y,K,J),q=E3(J[I]);return H7(q)}function JN(Z){let Q=/unexpected (identifier|token) "(.)"/i.exec(Z.message);if(!Q)return null;let X=E3(Q[2]);return H7(X)}function E3(Z){return"0x"+Z.charCodeAt(0).toString(16).toUpperCase()}function QN(Z,J,Q){if(Z===1)return J-1;let X=1,Y=0;return Q.split("").find((K,I)=>{if(K===`
`)X+=1;if(X===Z)return Y=I+J,!0;return!1}),Y}class tq extends P{}var XN=new tq,oq=()=>XN;class eq extends P{constructor(Z){super();this[0]=Z}}var H7=(Z)=>new eq(Z);class ZW extends P{constructor(Z){super();this[0]=Z}}function YN(Z,J){return y9(aq(Z),(Q)=>{let X=n6(Q,J);return gq(X,(Y)=>{return new ZW(Y)})})}function C8(Z,J){return YN(Z,J)}function JW(Z){return BQ(Z)}function K0(Z){return E8(Z)}function f9(Z){return E8(Z)}function m6(Z){return E8(Z)}function KN(){return rq()}function PQ(Z,J){if(Z instanceof a){let Q=Z[0];return J(Q)}else return KN()}function w8(Z){return lq(Z)}function IN(Z){return iq(Z)}function U4(Z,J){let X=H1(Z,J);return IN(X)}function $9(Z){return Z.replaceAll(/[><&"']/g,(J)=>{switch(J){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return J}})}var G1=$,N7=new V1(void 0);function P0(Z){return w(Z,G1)}var qN=vI(),WN=uI(),GN=nI();function C3(Z,J){if(Z.name===J.name)return GN;else if(Z.name<J.name)return WN;else return qN}class H6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class R7 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class S0 extends P{constructor(Z,J,Q,X,Y,K,I,q){super();this.kind=Z,this.name=J,this.handler=Q,this.include=X,this.prevent_default=Y,this.stop_propagation=K,this.debounce=I,this.throttle=q}}class M7 extends P{constructor(Z,J,Q){super();this.prevent_default=Z,this.stop_propagation=J,this.message=Q}}class WW extends P{constructor(Z){super();this.kind=Z}}class GW extends P{constructor(Z){super();this.kind=Z}}var TQ=0,_Q=1,EQ=2,CQ=0,wQ=new WW(CQ),jN=1,hQ=new GW(jN),kQ=2;function UW(Z,J){return new H6(TQ,Z,J)}function zW(Z,J){return new R7(_Q,Z,J)}function bQ(Z,J,Q,X,Y,K,I){return new S0(EQ,Z,J,Q,X,Y,K,I)}function ON(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else{let Y=Q.head;if(Y instanceof H6){let K=Y.name;if(K==="")Z=Q.tail,J=X;else if(K==="class"){let I=Y.value;if(I==="")Z=Q.tail,J=X;else{let q=Q.tail;if(q instanceof k){let W=Y;Z=q,J=w(W,X)}else{let W=q.head;if(W instanceof H6)if(W.name==="class"){let U=Y.kind,z=I,j=q.tail,O=W.value,H=z+" "+O,N=new H6(U,"class",H);Z=w(N,j),J=X}else{let U=Y;Z=q,J=w(U,X)}else{let G=Y;Z=q,J=w(G,X)}}}}else if(K==="style"){let I=Y.value;if(I==="")Z=Q.tail,J=X;else{let q=Q.tail;if(q instanceof k){let W=Y;Z=q,J=w(W,X)}else{let W=q.head;if(W instanceof H6)if(W.name==="style"){let U=Y.kind,z=I,j=q.tail,O=W.value,H=z+";"+O,N=new H6(U,"style",H);Z=w(N,j),J=X}else{let U=Y;Z=q,J=w(U,X)}else{let G=Y;Z=q,J=w(G,X)}}}}else{let I=Y;Z=Q.tail,J=w(I,X)}}else{let K=Y;Z=Q.tail,J=w(K,X)}}}}function VW(Z){if(Z instanceof k)return Z;else if(Z.tail instanceof k)return Z;else{let X=M3(Z,(Y,K)=>{return C3(K,Y)});return ON(X,G1)}}function l1(Z,J){return UW(Z,J)}function u9(Z,J){return zW(Z,J)}function FN(Z,J){if(J)return l1(Z,"");else return u9(Z,f9(!1))}function g(Z){return l1("class",Z)}function jW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)return X;else if(Q.head[1]){let K=Q.tail,I=Q.head[0];return X+I+" "+jW(K,X)}else Z=Q.tail,J=X}}function m0(Z){return g(jW(Z,""))}function A7(Z){return l1("id",Z)}function w3(Z,J){if(Z==="")return g("");else if(J==="")return g("");else return l1("style",Z+":"+J+";")}function h3(Z){return l1("tabindex",D1(Z))}function $4(Z){return FN("disabled",Z)}function OW(Z){return l1("for",Z)}function FW(Z){return l1("max",Z)}function HW(Z){return l1("min",Z)}function NW(Z){return l1("placeholder",Z)}function xQ(Z){return l1("type",Z)}function yQ(Z){return l1("value",Z)}class b3 extends P{constructor(Z,J,Q){super();this.synchronous=Z,this.before_paint=J,this.after_paint=Q}}class RW extends P{constructor(Z,J,Q,X,Y,K,I){super();this.dispatch=Z,this.emit=J,this.select=Q,this.root=X,this.provide=Y,this.subscribe=K,this.unsubscribe=I}}var k3=new b3(G1,G1,G1);function j1(){return k3}function N6(Z){return new b3(P0((Q)=>{let X=Q.dispatch;return Z(X)}),k3.before_paint,k3.after_paint)}function n9(Z){return B0(Z,k3,(J,Q)=>{return new b3(B0(Q.synchronous,J.synchronous,R3),B0(Q.before_paint,J.before_paint,R3),B0(Q.after_paint,J.after_paint,R3))})}function MW(Z,J,Q,X,Y,K,I,q){let W=new RW(J,Q,X,Y,K,I,q);return Yq(Z.synchronous,(G)=>{return G(W)})}function d1(){return null}function k8(Z,J){return Z?.get(J)}function D7(Z,J,Q){return Z?.get(J)??Q()}function p6(Z,J){return Z&&Z.has(J)}function o0(Z,J,Q){return Z??=new Map,Z.set(J,Q),Z}function x3(Z,J){return Z?.delete(J),Z}function AW(Z,J){if(typeof Z==="number"&&typeof J==="number")return Z===J||Z!==Z&&J!==J;return Z===J}function DW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof k)if(X instanceof k)return!0;else return!1;else if(X instanceof k)return!1;else{let{head:Y,tail:K}=Q,I=X.head,q=X.tail,W=AW(Y,I);if(W)Z=K,J=q;else return W}}}class R6 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.children=Q,this.keyed_children=X}}class M6 extends P{constructor(Z,J,Q,X,Y,K,I,q,W){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.children=K,this.keyed_children=I,this.self_closing=q,this.void=W}}class c6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.content=Q}}class d6 extends P{constructor(Z,J,Q,X,Y,K){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.inner_html=K}}class p0 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.mapper=Q,this.child=X}}class b8 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.dependencies=Q,this.view=X}}var x8=0,n4=1,L7=2,LW=3,u4=4,fQ=5;function $Q(Z,J,Q){return new R6(x8,Z,J,Q)}function m9(Z,J,Q,X,Y,K,I,q){return new M6(n4,Z,J,Q,VW(X),Y,K,I,q)}function p9(Z,J){if(J==="")if(Z==="area")return!0;else if(Z==="base")return!0;else if(Z==="br")return!0;else if(Z==="col")return!0;else if(Z==="embed")return!0;else if(Z==="hr")return!0;else if(Z==="img")return!0;else if(Z==="input")return!0;else if(Z==="link")return!0;else if(Z==="meta")return!0;else if(Z==="param")return!0;else if(Z==="source")return!0;else if(Z==="track")return!0;else if(Z==="wbr")return!0;else return!1;else return!1}function uQ(Z,J){return new c6(L7,Z,J)}function BW(Z,J){if(Z instanceof p0){let Q=Z.mapper;return new p0(u4,Z.key,(X)=>{return x0(J)(Q(X))},x0(Z.child))}else return new p0(u4,Z.key,x0(J),x0(Z))}function PW(Z,J,Q){return new b8(fQ,Z,J,Q)}function y3(Z,J){if(J instanceof R6)return new R6(J.kind,Z,J.children,J.keyed_children);else if(J instanceof M6)return new M6(J.kind,Z,J.namespace,J.tag,J.attributes,J.children,J.keyed_children,J.self_closing,J.void);else if(J instanceof c6)return new c6(J.kind,Z,J.content);else if(J instanceof d6)return new d6(J.kind,Z,J.namespace,J.tag,J.attributes,J.inner_html);else if(J instanceof p0){let Q=J.child;return new p0(J.kind,Z,J.mapper,y3(Z,Q))}else{let Q=J.view;return new b8(J.kind,Z,J.dependencies,()=>{return y3(Z,Q())})}}class SW extends P{}var Ww=new SW;class TW extends P{}var Gw=new TW;class _W extends P{}var Uw=new _W;class EW extends P{}var zw=new EW;class CW extends P{}var Vw=new CW;function e1(Z,J,Q){return m9("","",Z,J,Q,d1(),!1,p9(Z,""))}function g3(Z){return uQ("",Z)}function y8(){return uQ("","")}function wW(Z,J){return PW("",Z,J)}function hW(Z){return x0(Z)}function kW(Z,J){return BW(Z,J)}function d(Z){return g3(Z)}function bW(Z,J){return e1("h1",Z,J)}function f3(Z,J){return e1("h2",Z,J)}function $3(Z,J){return e1("h3",Z,J)}function xW(Z,J){return e1("section",Z,J)}function Y1(Z,J){return e1("div",Z,J)}function c9(Z,J){return e1("li",Z,J)}function g8(Z,J){return e1("pre",Z,J)}function d9(Z,J){return e1("ul",Z,J)}function B7(Z,J){return e1("code",Z,J)}function m1(Z,J){return e1("span",Z,J)}function U0(Z,J){return e1("button",Z,J)}function nQ(Z){return e1("input",Z,G1)}function yW(Z,J){return e1("label",Z,J)}function u3(Z,J){return e1("details",Z,J)}function n3(Z,J){return e1("summary",Z,J)}class m3 extends P{constructor(Z,J,Q,X,Y){super();this.index=Z,this.path=J,this.removed=Q,this.changes=X,this.children=Y}}class gW extends P{constructor(Z,J){super();this.kind=Z,this.content=J}}class fW extends P{constructor(Z,J){super();this.kind=Z,this.inner_html=J}}class $W extends P{constructor(Z,J,Q){super();this.kind=Z,this.added=J,this.removed=Q}}class uW extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.before=Q}}class nW extends P{constructor(Z,J,Q){super();this.kind=Z,this.index=J,this.with=Q}}class vW extends P{constructor(Z,J){super();this.kind=Z,this.index=J}}class mW extends P{constructor(Z,J,Q){super();this.kind=Z,this.children=J,this.before=Q}}var vQ=0,mQ=1,pQ=2,cQ=3,dQ=4,sQ=5,lQ=6;function m4(Z,J,Q,X){return new m3(Z,G1,J,Q,X)}function pW(Z){return new gW(vQ,Z)}function cW(Z){return new fW(mQ,Z)}function iQ(Z,J){return new $W(pQ,Z,J)}function dW(Z,J){return new uW(cQ,Z,J)}function sW(Z){return new vW(dQ,Z)}function O4(Z,J){return new nW(sQ,Z,J)}function rQ(Z,J){return new mW(lQ,Z,J)}function lW(Z,J){return new m3(J,w(Z.index,Z.path),Z.removed,Z.changes,Z.children)}class rW extends P{constructor(Z,J,Q,X,Y,K,I,q,W){super();this.kind=Z,this.open_shadow_root=J,this.will_adopt_styles=Q,this.observed_attributes=X,this.observed_properties=Y,this.requested_contexts=K,this.provided_contexts=I,this.vdom=q,this.memos=W}}class aW extends P{constructor(Z,J,Q){super();this.kind=Z,this.patch=J,this.memos=Q}}class oW extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.data=Q}}class tW extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}class eW extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class ZG extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class JG extends P{constructor(Z,J){super();this.kind=Z,this.messages=J}}var QG=(Z)=>Z instanceof JG;class XG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var YG=(Z)=>Z instanceof XG;class KG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var IG=(Z)=>Z instanceof KG;class qG extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.path=J,this.name=Q,this.event=X}}var WG=(Z)=>Z instanceof qG;class GG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}var UG=(Z)=>Z instanceof GG;var MN=0,AN=1,DN=2,LN=3,BN=4,PN=5;function zG(Z,J,Q,X,Y,K,I,q){return new rW(MN,Z,J,Q,X,Y,K,I,q)}function aQ(Z,J){return new aW(AN,Z,J)}function VG(Z,J){return new oW(DN,Z,J)}function jG(Z,J){return new tW(LN,Z,J)}function OG(Z){return new eW(BN,Z)}function FG(Z){return new ZG(PN,Z)}class oQ extends P{}var SN=new oQ;class tQ extends P{constructor(Z,J){super();this.key=Z,this.parent=J}}class eQ extends P{constructor(Z,J){super();this.index=Z,this.parent=J}}class RG extends P{constructor(Z){super();this.parent=Z}}var c3="\r",p3="\t",ZX=`
`,d3=SN;function NG(Z){if(Z instanceof k)return"";else{let J=Z.tail;return jq(J)}}function JX(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof oQ)return NG(K);else if(Y instanceof tQ){let{key:I,parent:q}=Y;Z=X,J=q,Q=w(p3,w(I,K))}else if(Y instanceof eQ){let{index:I,parent:q}=Y,W=w(p3,w(D1(I),K));Z=X,J=q,Q=W}else if(!X)return NG(K);else{let I=Y.parent;if(K instanceof k)Z=X,J=I,Q=K;else{let q=K.tail;Z=X,J=I,Q=w(c3,q)}}}}function TN(Z){return JX(!0,Z,G1)}function _N(Z,J){while(!0){let Q=Z,X=J;if(X instanceof k)return!1;else{let{head:Y,tail:K}=X,I=C9(Q,Y);if(I)return I;else Z=Q,J=K}}}function MG(Z,J){if(J instanceof k)return!1;else return _N(TN(Z),J)}function AG(Z){return A3(Z,c3)}function g0(Z,J,Q){if(Q==="")return new eQ(J,Z);else return new tQ(Q,Z)}function s3(Z){return new RG(Z)}function QX(Z,J){return JX(!1,Z,w(ZX,w(J,G1)))}function s9(Z){return JX(!1,Z,G1)}class F4 extends P{constructor(Z,J,Q,X,Y){super();this.events=Z,this.vdoms=J,this.old_vdoms=Q,this.dispatched_paths=X,this.next_dispatched_paths=Y}}class p4 extends P{constructor(Z,J){super();this.handlers=Z,this.children=J}}class i3 extends P{constructor(Z,J){super();this.mapper=Z,this.events=J}}class PG extends P{constructor(Z,J,Q){super();this.handlers=Z,this.children=J,this.vdoms=Q}}class KX extends P{constructor(Z,J){super();this.path=Z,this.handler=J}}class XX extends P{constructor(Z){super();this.path=Z}}function EN(Z,J){return(Q)=>{return Z(J(Q))}}function SG(){return new p4(d1(),d1())}function IX(){return new F4(SG(),d1(),d1(),G1,G1)}function TG(Z,J,Q,X){return o0(Z,QX(J,Q),X)}function LG(Z,J,Q){return B0(Q,Z,(X,Y)=>{if(Y instanceof S0){let{name:K,handler:I}=Y;return TG(X,J,K,I)}else return X})}function l3(Z,J,Q,X,Y,K){while(!0){let I=Z,q=J,W=Q,G=X,U=Y,z=K,j=U+1;if(z instanceof k)return new PG(I,q,W);else{let O=z.head;if(O instanceof R6){let H=z.tail,N=O.key,R=O.children,T=g0(G,U,N),_=l3(I,q,W,T,0,R),C=_.handlers,h=_.children,L=_.vdoms;Z=C,J=h,Q=L,X=G,Y=j,K=H}else if(O instanceof M6){let H=z.tail,N=O.key,R=O.attributes,T=O.children,_=g0(G,U,N),C=LG(I,_,R),h=l3(C,q,W,_,0,T),L=h.handlers,S=h.children,B=h.vdoms;Z=L,J=S,Q=B,X=G,Y=j,K=H}else if(O instanceof c6){let H=z.tail;Z=I,J=q,Q=W,X=G,Y=j,K=H}else if(O instanceof d6){let H=z.tail,N=O.key,R=O.attributes,T=g0(G,U,N);Z=LG(I,T,R),J=q,Q=W,X=G,Y=j,K=H}else if(O instanceof p0){let H=z.tail,N=O.key,R=O.mapper,T=O.child,_=g0(G,U,N),C=l3(d1(),d1(),W,s3(_),0,P0(T)),h=C.vdoms,L=new p4(C.handlers,C.children),S=new i3(R,L),B=o0(q,s9(_),S);Z=I,J=B,Q=h,X=G,Y=j,K=H}else{let H=z.tail,N=O.view,R=N(),T=o0(W,N,R),_=U,C=w(R,H);Z=I,J=q,Q=T,X=G,Y=_,K=C}}}}function qX(Z,J,Q,X,Y){let K=Z.vdoms,I=J.handlers,q=J.children,W=l3(I,q,K,Q,X,Y),G=W.handlers,U=W.children,z=W.vdoms;return[new F4(Z.events,z,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths),new p4(G,U)]}function r3(Z,J,Q,X,Y){let K=P0(Y);return qX(Z,J,Q,X,K)}function _G(Z){let J=IX(),Q=r3(J,J.events,d3,0,Z),X=Q[0],Y=Q[1];return new F4(Y,X.vdoms,X.old_vdoms,X.dispatched_paths,X.next_dispatched_paths)}function EG(Z){return new F4(Z.events,d1(),Z.vdoms,Z.next_dispatched_paths,G1)}function CG(Z){return Z.events}function wG(Z,J){return new F4(J,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function P7(Z){return Z.vdoms}function hG(Z,J,Q){return D7(Z.old_vdoms,J,Q)}function kG(Z,J,Q){let X=D7(Z.old_vdoms,J,Q),Y=o0(Z.vdoms,Q,X);return new F4(Z.events,Y,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function bG(Z,J,Q){let X=o0(Z.vdoms,J,Q);return new F4(Z.events,X,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function xG(Z,J,Q){return D7(Z.children,J,()=>{return new i3(Q,SG())}).events}function yG(Z,J,Q,X){let Y=new i3(Q,X),K=o0(Z.children,J,Y);return new p4(Z.handlers,K)}function S7(Z,J,Q,X){let Y=TG(Z.handlers,J,Q,X);return new p4(Y,Z.children)}function gG(Z,J,Q){return x3(Z,QX(J,Q))}function a3(Z,J,Q){let X=gG(Z.handlers,J,Q);return new p4(X,Z.children)}function BG(Z,J,Q){return B0(Q,Z,(X,Y)=>{if(Y instanceof S0){let K=Y.name;return gG(X,J,K)}else return X})}function YX(Z,J,Q,X,Y,K){while(!0){let I=Z,q=J,W=Q,G=X,U=Y,z=K,j=U+1;if(z instanceof k)return new p4(I,q);else{let O=z.head;if(O instanceof R6){let H=z.tail,N=O.key,R=O.children,T=g0(G,U,N),_=YX(I,q,W,T,0,R),C=_.handlers,h=_.children;Z=C,J=h,Q=W,X=G,Y=j,K=H}else if(O instanceof M6){let H=z.tail,N=O.key,R=O.attributes,T=O.children,_=g0(G,U,N),C=BG(I,_,R),h=YX(C,q,W,_,0,T),L=h.handlers,S=h.children;Z=L,J=S,Q=W,X=G,Y=j,K=H}else if(O instanceof c6){let H=z.tail;Z=I,J=q,Q=W,X=G,Y=j,K=H}else if(O instanceof d6){let H=z.tail,N=O.key,R=O.attributes,T=g0(G,U,N);Z=BG(I,T,R),J=q,Q=W,X=G,Y=j,K=H}else if(O instanceof p0){let H=z.tail,N=O.key,R=g0(G,U,N),T=x3(q,s9(R));Z=I,J=T,Q=W,X=G,Y=j,K=H}else{let H=z.tail,N=O.view;if(p6(W,N)){let T=k8(W,N),_=w(T,H);Z=I,J=q,Q=W,X=G,Y=U,K=_}else Z=I,J=q,Q=W,X=G,Y=j,K=H}}}}function o3(Z,J,Q,X,Y){return YX(J.handlers,J.children,Z.old_vdoms,Q,X,P0(Y))}function H4(Z,J,Q,X,Y,K){let I=o3(Z,J,Q,X,Y);return r3(Z,I,Q,X,K)}function CN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof k)return N7;else{let I=Y.tail;if(I instanceof k){let q=Y.head;if(p6(X.handlers,q)){let G=k8(X.handlers,q);return new D(T8(G,(U)=>{return new M7(U.prevent_default,U.stop_propagation,x0(K)(U.message))}))}else return N7}else{let q=Y.head,W=I;if(p6(X.children,q)){let U=k8(X.children,q),z=EN(K,U.mapper);Z=U.events,J=W,Q=z}else return N7}}}}function WX(Z,J,Q,X){let Y=AG(J+ZX+Q),K=CN(Z.events,Y,x0);if(K instanceof D){let I=K[0],q=n6(X,I);if(q instanceof D){let W=q[0];return new KX(J,W)}else return new XX(J)}else return new XX(J)}function GX(Z,J){let Q=w(J.path,Z.next_dispatched_paths),X=new F4(Z.events,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Q);if(J instanceof KX){let Y=J.handler;return[X,new D(Y)]}else return[X,N7]}function fG(Z,J,Q,X){let Y=WX(Z,J,Q,X);return((K)=>{return GX(Z,K)})(Y)}function t3(Z,J){return MG(J,Z.dispatched_paths)}class $G extends P{constructor(Z){super();this.message=Z}}var uG=(Z)=>Z instanceof $G;class nG extends P{constructor(Z){super();this.callback=Z}}var vG=(Z)=>Z instanceof nG;class mG extends P{constructor(Z){super();this.callback=Z}}var pG=(Z)=>Z instanceof mG;class ZZ extends P{constructor(Z){super();this.message=Z}}var cG=(Z)=>new ZZ(Z),l9=(Z)=>Z instanceof ZZ;class UX extends P{constructor(Z,J){super();this.name=Z,this.data=J}}var dG=(Z,J)=>new UX(Z,J),i9=(Z)=>Z instanceof UX;class zX extends P{constructor(Z,J){super();this.key=Z,this.value=J}}var sG=(Z,J)=>new zX(Z,J),lG=(Z)=>Z instanceof zX;class VX extends P{constructor(Z,J){super();this.key=Z,this.decoder=J}}var iG=(Z,J)=>new VX(Z,J),rG=(Z)=>Z instanceof VX;class jX extends P{constructor(Z){super();this.key=Z}}var aG=(Z)=>new jX(Z),oG=(Z)=>Z instanceof jX;class OX extends P{}var wN=new OX;var r9=(Z)=>Z instanceof OX;class FX extends P{constructor(Z,J,Q,X,Y){super();this.name=Z,this.init=J,this.update=Q,this.view=X,this.config=Y}}class HX extends P{constructor(Z,J,Q,X,Y,K,I,q,W,G,U,z,j,O){super();this.open_shadow_root=Z,this.adopt_styles=J,this.delegates_focus=Q,this.attributes=X,this.properties=Y,this.contexts=K,this.is_form_associated=I,this.on_form_autofill=q,this.on_form_reset=W,this.on_form_restore=G,this.on_form_disabled=U,this.on_connect=z,this.on_adopt=j,this.on_disconnect=O}}var eG=new HX(!0,!0,!1,G1,G1,G1,!1,U1,U1,U1,U1,U1,U1,U1);var A6=(Z,J)=>{if(Z===J)return!0;if(Z==null||J==null)return!1;let Q=typeof Z;if(Q!==typeof J)return!1;if(Q!=="object")return!1;if(Z.constructor!==J.constructor)return!1;if(Array.isArray(Z))return hN(Z,J);return kN(Z,J)},hN=(Z,J)=>{let Q=Z.length;if(Q!==J.length)return!1;while(Q--)if(!A6(Z[Q],J[Q]))return!1;return!0},kN=(Z,J)=>{let Q=Object.keys(Z),X=Q.length;if(Object.keys(J).length!==X)return!1;while(X--){let Y=Q[X];if(!Object.hasOwn(J,Y))return!1;if(!A6(Z[Y],J[Y]))return!1}return!0};class JU extends P{constructor(Z,J){super();this.patch=Z,this.cache=J}}class RX extends P{constructor(Z,J,Q){super();this.patch=Z,this.cache=J,this.events=Q}}class QU extends P{constructor(Z,J,Q){super();this.added=Z,this.removed=J,this.events=Q}}function ZU(Z,J,Q,X,Y,K,I){while(!0){let q=Z,W=J,G=Q,U=X,z=Y,j=K,O=I;if(U instanceof k)if(z instanceof k)return new QU(j,O,G);else{let H=z.head;if(H instanceof S0){let N=H,R=z.tail,T=H.name,_=H.handler,C=S7(G,W,T,_),h=w(N,j);Z=q,J=W,Q=C,X=U,Y=R,K=h,I=O}else{let N=H,R=z.tail,T=w(N,j);Z=q,J=W,Q=G,X=U,Y=R,K=T,I=O}}else if(z instanceof k){let H=U.head;if(H instanceof S0){let N=H,R=U.tail,T=H.name,_=a3(G,W,T),C=w(N,O);Z=q,J=W,Q=_,X=R,Y=z,K=j,I=C}else{let N=H,R=U.tail,T=w(N,O);Z=q,J=W,Q=G,X=R,Y=z,K=j,I=T}}else{let{head:H,tail:N}=U,R=z.head,T=z.tail,_=C3(H,R);if(_ instanceof v0)if(H instanceof S0){let C=H.name;Z=q,J=W,Q=a3(G,W,C),X=N,Y=z,K=j,I=w(H,O)}else Z=q,J=W,Q=G,X=N,Y=z,K=j,I=w(H,O);else if(_ instanceof L0)if(H instanceof H6)if(R instanceof H6){let C,h=R.name;if(h==="value")C=q||H.value!==R.value;else if(h==="checked")C=q||H.value!==R.value;else if(h==="selected")C=q||H.value!==R.value;else C=H.value!==R.value;let L=C,S;if(L)S=w(R,j);else S=j;let B=S;Z=q,J=W,Q=G,X=N,Y=T,K=B,I=O}else if(R instanceof S0){let{name:C,handler:h}=R;Z=q,J=W,Q=S7(G,W,C,h),X=N,Y=T,K=w(R,j),I=w(H,O)}else Z=q,J=W,Q=G,X=N,Y=T,K=w(R,j),I=w(H,O);else if(H instanceof R7)if(R instanceof R7){let C,h=R.name;if(h==="scrollLeft")C=!0;else if(h==="scrollRight")C=!0;else if(h==="value")C=q||!A6(H.value,R.value);else if(h==="checked")C=q||!A6(H.value,R.value);else if(h==="selected")C=q||!A6(H.value,R.value);else C=!A6(H.value,R.value);let L=C,S;if(L)S=w(R,j);else S=j;let B=S;Z=q,J=W,Q=G,X=N,Y=T,K=B,I=O}else if(R instanceof S0){let{name:C,handler:h}=R;Z=q,J=W,Q=S7(G,W,C,h),X=N,Y=T,K=w(R,j),I=w(H,O)}else Z=q,J=W,Q=G,X=N,Y=T,K=w(R,j),I=w(H,O);else if(R instanceof S0){let{name:C,handler:h}=R,L=H.prevent_default.kind!==R.prevent_default.kind||H.stop_propagation.kind!==R.stop_propagation.kind||H.debounce!==R.debounce||H.throttle!==R.throttle,S;if(L)S=w(R,j);else S=j;let B=S;Z=q,J=W,Q=S7(G,W,C,h),X=N,Y=T,K=B,I=O}else{let C=H.name;Z=q,J=W,Q=a3(G,W,C),X=N,Y=T,K=w(R,j),I=w(H,O)}else if(R instanceof S0){let{name:C,handler:h}=R;Z=q,J=W,Q=S7(G,W,C,h),X=U,Y=T,K=w(R,j),I=O}else Z=q,J=W,Q=G,X=U,Y=T,K=w(R,j),I=O}}}function bN(Z,J,Q,X){if(Q==="input"&&J==="")return t3(Z,X);else if(Q==="select"&&J==="")return t3(Z,X);else if(Q==="textarea"&&J==="")return t3(Z,X);else return!1}function JZ(Z,J,Q,X,Y,K,I,q,W,G,U,z,j,O){while(!0){let H=Z,N=J,R=Q,T=X,_=Y,C=K,h=I,L=q,S=W,B=G,E=U,M=z,l=j,n=O;if(H instanceof k)if(R instanceof k){let p,q1=f8();if(B instanceof k)if(E instanceof k)p=m4(S,h,B,E);else if(!q1)if(E.tail instanceof k&&h===0){let I1=E.head;p=lW(I1,S)}else p=m4(S,h,B,E);else p=m4(S,h,B,E);else p=m4(S,h,B,E);return new RX(p,l,n)}else{let p=qX(l,n,M,L,R),q1=p[0],e=p[1],Z1=rQ(R,L-C),I1=w(Z1,B),W1=m4(S,h,I1,E);return new RX(W1,q1,e)}else if(R instanceof k){let{head:p,tail:q1}=H;if(p.key===""||!p6(_,p.key)){let Z1=o3(l,n,M,L,p);Z=q1,J=N,Q=R,X=T,Y=_,K=C,I=h+1,q=L,W=S,G=B,U=E,z=M,j=l,O=Z1}else Z=q1,J=N,Q=R,X=T,Y=_,K=C,I=h,q=L,W=S,G=B,U=E,z=M,j=l,O=n}else{let p=H.head,q1=R.head;if(p.key!==q1.key){let e=H.tail,Z1=R.tail,I1=p6(N,q1.key);if(p6(T,p.key))if(I1)if(p6(_,p.key))Z=e,J=N,Q=R,X=T,Y=_,K=C-1,I=h,q=L,W=S,G=B,U=E,z=M,j=l,O=n;else{let t=k8(N,q1.key),v=L-C,f=w(dW(q1.key,v),B),c=o0(_,q1.key,void 0);Z=w(t,H),J=N,Q=R,X=T,Y=c,K=C+1,I=h,q=L,W=S,G=f,U=E,z=M,j=l,O=n}else{let J1=L-C,t=r3(l,n,M,L,q1),v=t[0],f=t[1],c=rQ(P0(q1),J1),Q1=w(c,B);Z=H,J=N,Q=Z1,X=T,Y=_,K=C+1,I=h,q=L+1,W=S,G=Q1,U=E,z=M,j=v,O=f}else if(I1){let J1=L-C,t=w(sW(J1),B),v=o3(l,n,M,L,p);Z=e,J=N,Q=R,X=T,Y=_,K=C-1,I=h,q=L,W=S,G=t,U=E,z=M,j=l,O=v}else{let J1=O4(L-C,q1),t=H4(l,n,M,L,p,q1),v=t[0],f=t[1];Z=e,J=N,Q=Z1,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(J1,B),U=E,z=M,j=v,O=f}}else{let e=H.head;if(e instanceof R6){let Z1=R.head;if(Z1 instanceof R6){let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=JZ(I1.children,I1.keyed_children,J1.children,J1.keyed_children,d1(),0,0,0,L,G1,G1,g0(M,L,J1.key),l,n),f=v.patch,c=v.cache,Q1=v.events,$1;if(f.changes instanceof k)if(f.children instanceof k)if(f.removed===0)$1=E;else $1=w(f,E);else $1=w(f,E);else $1=w(f,E);let T1=$1;Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=T1,z=M,j=c,O=Q1}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}else if(e instanceof M6){let Z1=R.head;if(Z1 instanceof M6){let I1=e,W1=Z1;if(I1.namespace===W1.namespace&&I1.tag===W1.tag){let J1=H.tail,t=R.tail,v=g0(M,L,W1.key),f=bN(l,W1.namespace,W1.tag,v),c=ZU(f,v,n,I1.attributes,W1.attributes,G1,G1),Q1=c.added,$1=c.removed,z1=c.events,T1;if(Q1 instanceof k&&$1 instanceof k)T1=G1;else T1=P0(iQ(Q1,$1));let J0=T1,J4=JZ(I1.children,I1.keyed_children,W1.children,W1.keyed_children,d1(),0,0,0,L,J0,G1,v,l,z1),Y0=J4.patch,k0=J4.cache,W6=J4.events,f6;if(Y0.changes instanceof k)if(Y0.children instanceof k)if(Y0.removed===0)f6=E;else f6=w(Y0,E);else f6=w(Y0,E);else f6=w(Y0,E);let J3=f6;Z=J1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=J3,z=M,j=k0,O=W6}else{let J1=e,t=H.tail,v=Z1,f=R.tail,c=O4(L-C,v),Q1=H4(l,n,M,L,J1,v),$1=Q1[0],z1=Q1[1];Z=t,J=N,Q=f,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(c,B),U=E,z=M,j=$1,O=z1}}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}else if(e instanceof c6){let Z1=R.head;if(Z1 instanceof c6){let I1=e,W1=Z1;if(I1.content===W1.content){let J1=H.tail,t=R.tail;Z=J1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=E,z=M,j=l,O=n}else{let J1=H.tail,t=Z1,v=R.tail,f=m4(L,0,P0(pW(t.content)),G1);Z=J1,J=N,Q=v,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=w(f,E),z=M,j=l,O=n}}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}else if(e instanceof d6){let Z1=R.head;if(Z1 instanceof d6){let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=g0(M,L,J1.key),f=ZU(!1,v,n,I1.attributes,J1.attributes,G1,G1),c=f.added,Q1=f.removed,$1=f.events,z1;if(c instanceof k&&Q1 instanceof k)z1=G1;else z1=P0(iQ(c,Q1));let T1=z1,J0;if(I1.inner_html===J1.inner_html)J0=T1;else J0=w(cW(J1.inner_html),T1);let Y0=J0,k0;if(Y0 instanceof k)k0=E;else k0=w(m4(L,0,Y0,G1),E);let W6=k0;Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=W6,z=M,j=l,O=$1}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}else if(e instanceof p0){let Z1=R.head;if(Z1 instanceof p0){let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=g0(M,L,J1.key),f=s9(v),c=JZ(P0(I1.child),d1(),P0(J1.child),d1(),d1(),0,0,0,L,G1,G1,s3(v),l,xG(n,f,I1.mapper)),Q1=c.patch,$1=c.cache,z1=c.events,T1=yG(n,f,J1.mapper,z1),J0;if(Q1.changes instanceof k)if(Q1.children instanceof k)if(Q1.removed===0)J0=E;else J0=w(Q1,E);else J0=w(Q1,E);else J0=w(Q1,E);let Y0=J0;Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=Y0,z=M,j=$1,O=T1}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}else{let Z1=R.head;if(Z1 instanceof b8){let I1=e,W1=H.tail,J1=Z1,t=R.tail;if(DW(I1.dependencies,J1.dependencies)){let f=kG(l,I1.view,J1.view);Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=B,U=E,z=M,j=f,O=n}else{let f=hG(l,I1.view,I1.view),c=J1.view(),Q1=bG(l,J1.view,c);Z=w(f,W1),J=N,Q=w(c,t),X=T,Y=_,K=C,I=h,q=L,W=S,G=B,U=E,z=M,j=Q1,O=n}}else{let I1=e,W1=H.tail,J1=Z1,t=R.tail,v=O4(L-C,J1),f=H4(l,n,M,L,I1,J1),c=f[0],Q1=f[1];Z=W1,J=N,Q=t,X=T,Y=_,K=C,I=h,q=L+1,W=S,G=w(v,B),U=E,z=M,j=c,O=Q1}}}}}}function a9(Z,J,Q){let X=EG(Z),Y=JZ(P0(J),d1(),P0(Q),d1(),d1(),0,0,0,0,G1,G1,d3,X,CG(X)),K=Y.patch,I=Y.cache,q=Y.events;return new JU(K,wG(I,q))}var XU=(Z)=>Z.reduceRight((J,Q)=>I7(Q,J),G1),t0=(Z,J)=>{if(Array.isArray(Z))for(let Q=0;Q<Z.length;Q++)J(Z[Q]);else if(Z)for(Z;$6(Z);Z=$6(Z))J(q7(Z))},MX=(Z,J)=>{if(!$6(Z))return J;else if(!$6(J))return Z;else return X0(Z,J)};var QZ="http://www.w3.org/1999/xhtml",YU=1,KU=3,AX=8;var IU=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:yN,clearTimeout:DX}=globalThis,gN=(Z,J)=>globalThis.document.createElementNS(Z,J),qU=(Z)=>globalThis.document.createTextNode(Z),WU=(Z)=>globalThis.document.createComment(Z),fN=()=>globalThis.document.createDocumentFragment(),c4=(Z,J,Q)=>Z.insertBefore(J,Q),GU=IU?(Z,J,Q)=>Z.moveBefore(J,Q):c4,UU=(Z,J)=>Z.removeChild(J),$N=(Z,J)=>Z.getAttribute(J),zU=(Z,J,Q)=>Z.setAttribute(J,Q),uN=(Z,J)=>Z.removeAttribute(J),nN=(Z,J,Q,X)=>Z.addEventListener(J,Q,X),VU=(Z,J,Q)=>Z.removeEventListener(J,Q),vN=(Z,J)=>Z.innerHTML=J,mN=(Z,J)=>Z.data=J,e0=Symbol("lustre");class FU{constructor(Z,J,Q,X){this.kind=Z,this.key=X,this.parent=J,this.children=[],this.node=Q,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===x8||this.kind===u4}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var Z6=(Z,J,Q,X,Y)=>{let K=new FU(Z,J,Q,Y);return Q[e0]=K,J?.children.splice(X,0,K),K},pN=(Z)=>{let J="";for(let Q=Z[e0];Q.parent;Q=Q.parent){let X=Q.parent&&Q.parent.kind===u4?c3:p3;if(Q.key)J=`${X}${Q.key}${J}`;else{let Y=Q.parent.children.indexOf(Q);J=`${X}${Y}${J}`}}return J.slice(1)};class BX{#Z=null;#I;#X;#J=!1;constructor(Z,J,Q,{debug:X=!1}={}){this.#Z=Z,this.#I=J,this.#X=Q,this.#J=X}mount(Z){Z6(n4,null,this.#Z,0,null),this.#H(this.#Z,null,this.#Z[e0],0,Z)}push(Z,J=null){this.#Q=J,this.#Y.push({node:this.#Z[e0],patch:Z}),this.#q()}#Q;#Y=[];#q(){let Z=this.#Y;while(Z.length){let{node:J,patch:Q}=Z.pop(),{path:X,changes:Y,removed:K,children:I}=Q;t0(X,(W)=>{J=J.children[W]});let{children:q}=J;if(t0(Y,(W)=>this.#K(J,W)),K)this.#j(J,q.length-K,K);t0(I,(W)=>{let G=q[W.index|0];this.#Y.push({node:G,patch:W})})}}#K(Z,J){switch(J.kind){case vQ:this.#S(Z,J);break;case mQ:this.#D(Z,J);break;case pQ:this.#F(Z,J);break;case cQ:this.#z(Z,J);break;case dQ:this.#R(Z,J);break;case sQ:this.#W(Z,J);break;case lQ:this.#V(Z,J);break}}#V(Z,{children:J,before:Q}){let X=fN(),Y=this.#U(Z,Q);this.#A(X,null,Z,Q|0,J),c4(Z.parentNode,X,Y)}#W(Z,{index:J,with:Q}){this.#j(Z,J|0,1);let X=this.#U(Z,J);this.#H(Z.parentNode,X,Z,J|0,Q)}#U(Z,J){J=J|0;let{children:Q}=Z,X=Q.length;if(J<X)return Q[J].node;if(Z.endNode)return Z.endNode;if(!Z.isVirtual)return null;while(Z.isVirtual&&Z.children.length){if(Z.endNode)return Z.endNode.nextSibling;Z=Z.children[Z.children.length-1]}return Z.node.nextSibling}#z(Z,{key:J,before:Q}){Q=Q|0;let{children:X,parentNode:Y}=Z,K=X[Q].node,I=X[Q];for(let q=Q+1;q<X.length;++q){let W=X[q];if(X[q]=I,I=W,W.key===J){X[Q]=W;break}}this.#N(Y,I,K)}#G(Z,J,Q){for(let X=0;X<J.length;++X)this.#N(Z,J[X],Q)}#N(Z,J,Q){if(GU(Z,J.node,Q),J.isVirtual)this.#G(Z,J.children,Q);if(J.endNode)GU(Z,J.endNode,Q)}#R(Z,{index:J}){this.#j(Z,J,1)}#j(Z,J,Q){let{children:X,parentNode:Y}=Z,K=X.splice(J,Q);for(let I=0;I<K.length;++I){let q=K[I],{node:W,endNode:G,isVirtual:U,children:z}=q;if(UU(Y,W),G)UU(Y,G);if(this.#O(q),U)K.push(...z)}}#O(Z){let{debouncers:J,children:Q}=Z;for(let{timeout:X}of J.values())if(X)DX(X);J.clear(),t0(Q,(X)=>this.#O(X))}#F({node:Z,handlers:J,throttles:Q,debouncers:X},{added:Y,removed:K}){t0(K,({name:I})=>{if(J.delete(I))VU(Z,I,LX),this.#M(Q,I,0),this.#M(X,I,0);else uN(Z,I),OU[I]?.removed?.(Z,I)}),t0(Y,(I)=>this.#P(Z,I))}#S({node:Z},{content:J}){mN(Z,J??"")}#D({node:Z},{inner_html:J}){vN(Z,J??"")}#A(Z,J,Q,X,Y){t0(Y,(K)=>this.#H(Z,J,Q,X++,K))}#H(Z,J,Q,X,Y){switch(Y.kind){case n4:{let K=this.#L(Q,X,Y);this.#A(K,null,K[e0],0,Y.children),c4(Z,K,J);break}case L7:{let K=this.#T(Q,X,Y);c4(Z,K,J);break}case x8:{let I=this.#B("lustre:fragment",Q,X,Y);if(c4(Z,I,J),this.#A(Z,J,I[e0],0,Y.children),this.#J)I[e0].endNode=WU(" /lustre:fragment "),c4(Z,I[e0].endNode,J);break}case LW:{let K=this.#L(Q,X,Y);this.#D({node:K},Y),c4(Z,K,J);break}case u4:{let K=this.#B("lustre:map",Q,X,Y);c4(Z,K,J),this.#H(Z,J,K[e0],0,Y.child);break}case fQ:{let K=this.#Q?.get(Y.view)??Y.view();this.#H(Z,J,Q,X,K);break}}}#L(Z,J,{kind:Q,key:X,tag:Y,namespace:K,attributes:I}){let q=gN(K||QZ,Y);if(Z6(Q,Z,q,J,X),this.#J&&X)zU(q,"data-lustre-key",X);return t0(I,(W)=>this.#P(q,W)),q}#T(Z,J,{kind:Q,key:X,content:Y}){let K=qU(Y??"");return Z6(Q,Z,K,J,X),K}#B(Z,J,Q,{kind:X,key:Y}){let K=this.#J?WU(cN(Z,Y)):qU("");return Z6(X,J,K,Q,Y),K}#P(Z,J){let{debouncers:Q,handlers:X,throttles:Y}=Z[e0],{kind:K,name:I,value:q,prevent_default:W,debounce:G,throttle:U}=J;switch(K){case TQ:{let z=q??"";if(I==="virtual:defaultValue"){Z.defaultValue=z;return}else if(I==="virtual:defaultChecked"){Z.defaultChecked=!0;return}else if(I==="virtual:defaultSelected"){Z.defaultSelected=!0;return}if(z!==$N(Z,I))zU(Z,I,z);OU[I]?.added?.(Z,z);break}case _Q:Z[I]=q;break;case EQ:{if(X.has(I))VU(Z,I,LX);let z=W.kind===CQ;nN(Z,I,LX,{passive:z}),this.#M(Y,I,U),this.#M(Q,I,G),X.set(I,(j)=>this.#_(J,j));break}}}#M(Z,J,Q){let X=Z.get(J);if(Q>0)if(X)X.delay=Q;else Z.set(J,{delay:Q});else if(X){let{timeout:Y}=X;if(Y)DX(Y);Z.delete(J)}}#_(Z,J){let{currentTarget:Q,type:X}=J,{debouncers:Y,throttles:K}=Q[e0],I=pN(Q),{prevent_default:q,stop_propagation:W,include:G}=Z;if(q.kind===kQ)J.preventDefault();if(W.kind===kQ)J.stopPropagation();if(X==="submit")J.detail??={},J.detail.formData=[...new FormData(J.target,J.submitter).entries()];let U=this.#I(J,I,X,G),z=K.get(X);if(z){let O=Date.now(),H=z.last||0;if(O>H+z.delay)z.last=O,z.lastEvent=J,this.#X(J,U)}let j=Y.get(X);if(j)DX(j.timeout),j.timeout=yN(()=>{if(J===K.get(X)?.lastEvent)return;this.#X(J,U)},j.delay);if(!z&&!j)this.#X(J,U)}}var cN=(Z,J)=>{if(J)return` ${Z} key="${$9(J)}" `;else return` ${Z} `},LX=(Z)=>{let{currentTarget:J,type:Q}=Z;J[e0].handlers.get(Q)(Z)},jU=(Z)=>{return{added(J){J[Z]=!0},removed(J){J[Z]=!1}}},dN=(Z)=>{return{added(J,Q){J[Z]=Q}}},OU={checked:jU("checked"),selected:jU("selected"),value:dN("value"),autofocus:{added(Z){queueMicrotask(()=>{Z.focus?.()})}},autoplay:{added(Z){try{Z.play?.()}catch(J){console.error(J)}}}};function sN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof k)return[Y,_1(K)];else{let I=X.tail,q=X.head[0],W=X.head[1],G=y3(q,W),U;if(q==="")U=Y;else U=o0(Y,q,G);let z=U,j=w(G,K);Z=I,J=z,Q=j}}}function PX(Z){return sN(Z,d1(),G1)}function SX(Z,J,Q){let X=PX(Q),Y=X[0],K=X[1];return m9("","",Z,J,K,Y,!1,p9(Z,""))}function HU(Z,J,Q,X){let Y=PX(X),K=Y[0],I=Y[1];return m9("",Z,J,Q,I,K,!1,p9(J,Z))}function TX(Z){let J=PX(Z),Q=J[0],X=J[1];return $Q("",X,Q)}function d4(Z,J){return SX("div",Z,J)}var RU=(Z)=>{let J=Z6(n4,null,Z,0,null),{children:Q}=_X(J,Z,Z.firstChild);if(Q.length>1){let Y=Z6(n4,null,Z,0,null);return J.kind=x8,J.node=globalThis.document.createTextNode(""),J.parent=Y,Y.children.push(J),Z.insertBefore(J.node,Z.firstChild),TX(T7(Q))}if(Q.length===1)return Q[0][1];let X=globalThis.document.createTextNode("");return Z6(L7,J,X,0,null),Z.insertBefore(X,Z.firstChild),y8()},MU=(Z,J,Q,X)=>{if(Q.nodeType===AX){let Y=Q.data.trim();if(Y.startsWith("lustre:fragment"))return rN(Z,J,Q,X);if(Y.startsWith("lustre:map"))return aN(Z,J,Q,X);if(Y.startsWith("lustre:memo"))return oN(Z,J,Q,X);return null}if(Q.nodeType===YU)return lN(Z,Q,X);if(Q.nodeType===KU)return iN(Z,Q,X);return null},lN=(Z,J,Q)=>{let X=J.getAttribute("data-lustre-key")??"";if(X)J.removeAttribute("data-lustre-key");let Y=Z6(n4,Z,J,Q,X),K=J.localName,I=J.namespaceURI,q=!I||I===QZ;if(q&&eN.includes(K))ZR(K,J);let W=tN(J),{children:G}=_X(Y,J,J.firstChild),U=q?SX(K,W,T7(G)):HU(I,K,W,T7(G));return o9(X,U,J.nextSibling)},_X=(Z,J,Q)=>{let X=[];while(Q&&(Q.nodeType!==AX||Q.data.trim()!=="/lustre:fragment")){let Y=MU(Z,J,Q,X.length);if(Y)X.push([Y.key,Y.vnode]),Q=Y.next;else Q=Q.nextSibling}return{children:X,end:Q}},iN=(Z,J,Q)=>{return Z6(L7,Z,J,Q,null),o9("",g3(J.data),J.nextSibling)},rN=(Z,J,Q,X)=>{let Y=EX(Q.data),K=Z6(x8,Z,Q,X,Y),{children:I,end:q}=_X(K,J,Q.nextSibling);K.endNode=q;let W=TX(T7(I));return o9(Y,W,q?.nextSibling)},aN=(Z,J,Q,X)=>{let Y=EX(Q.data),K=Z6(u4,Z,Q,X,Y),I=AU(K,J,Q,0);if(!I)return null;let q=kW(I.vnode,(W)=>W);return o9(Y,q,I.next)},oN=(Z,J,Q,X)=>{let Y=EX(Q.data),K=AU(Z,J,Q,X);if(!K)return null;J.removeChild(Q);let I=wW(T7([hW({})]),()=>K.vnode);return o9(Y,I,K.next)},AU=(Z,J,Q,X)=>{while(!0){if(Q=Q.nextSibling,!Q)return null;let Y=MU(Z,J,Q,X);if(Y)return Y}},o9=(Z,J,Q)=>{return{key:Z,vnode:J,next:Q}},tN=(Z)=>{let J=[];for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];if(X.name!=="xmlns")J.push(l1(X.localName,X.value))}return T7(J)},eN=["input","select","textarea"],ZR=(Z,J)=>{let{value:Q,checked:X}=J;if(Z==="input"&&J.type==="checkbox"&&!X)return;if(Z==="input"&&J.type==="radio"&&!X)return;if(J.type!=="checkbox"&&J.type!=="radio"&&!Q)return;queueMicrotask(()=>{if(J.value=Q,J.checked=X,J.dispatchEvent(new Event("input",{bubbles:!0})),J.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==J)J.dispatchEvent(new Event("blur",{bubbles:!0}))})},EX=(Z)=>{let J=Z.match(/key="([^"]*)"/);if(!J)return"";return JR(J[1])},JR=(Z)=>{return Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},T7=(Z)=>Z.reduceRight((J,Q)=>I7(Q,J),G1);var f8=()=>!!globalThis.document;class XZ{constructor(Z,[J,Q],X,Y,K){this.root=Z,this.#Z=J,this.#I=X,this.#X=Y,this.root.addEventListener("context-request",(W)=>{if(!(W.context&&W.callback))return;if(!this.#q.has(W.context))return;W.stopImmediatePropagation();let G=this.#q.get(W.context);if(W.subscribe){let U=()=>{G.subscribers=G.subscribers.filter((z)=>z!==W.callback)};G.subscribers.push([W.callback,U]),W.callback(G.value,U)}else W.callback(G.value)});let I=(W,G,U)=>WX(this.#Q,G,U,W),q=(W,G)=>{let[U,z]=GX(this.#Q,G);if(this.#Q=U,O0(z)){let j=D0(z);if(j.stop_propagation)W.stopPropagation();if(j.prevent_default)W.preventDefault();this.dispatch(j.message,!1)}};this.#Y=new BX(this.root,I,q,K),this.#J=RU(this.root),this.#Q=IX(),this.#j(Q),this.#F()}root=null;dispatch(Z,J=!1){if(this.#V)this.#W.push(Z);else{let[Q,X]=this.#X(this.#Z,Z);this.#Z=Q,this.#R(J),this.#j(X)}}emit(Z,J){(this.root.host??this.root).dispatchEvent(new LU(Z,J))}provide(Z,J){if(!this.#q.has(Z))this.#q.set(Z,{value:J,subscribers:[]});else{let Q=this.#q.get(Z);if(A6(Q.value,J))return;Q.value=J;for(let X=Q.subscribers.length-1;X>=0;X--){let[Y,K]=Q.subscribers[X];if(!Y){Q.subscribers.splice(X,1);continue}Y(J,K)}}}subscribe(Z,J){if(!Z)return;this.#K.get(Z)?.(),(this.root.host??this.root).dispatchEvent(new CX(Z,(X,Y)=>{let K=this.#K.get(Z);if(K!==Y)K?.();let I=n6(X,J);if(this.#K.set(Z,Y),O0(I))this.dispatch(D0(I),!0)},!0))}unsubscribe(Z){let J=this.#K.get(Z);if(J)J(),this.#K.delete(Z)}unsubscribeAll(){for(let[Z,J]of this.#K)J?.();this.#K.clear()}#Z;#I;#X;#J;#Q;#Y;#q=new Map;#K=new Map;#V=!1;#W=[];#U=G1;#z=G1;#G=null;#N={dispatch:(Z)=>this.dispatch(Z),emit:(Z,J)=>this.emit(Z,J),select:()=>{},root:()=>this.root,provide:(Z,J)=>this.provide(Z,J),subscribe:(Z,J)=>this.subscribe(Z,J),unsubscribe:(Z)=>this.unsubscribe(Z)};#R(Z=!1){if(this.#G)return;if(Z)this.#G="sync",queueMicrotask(()=>this.#F());else this.#G=window.requestAnimationFrame(()=>this.#F())}#j(Z){this.#V=!0;let J=!1;while(!0){if(t0(Z.synchronous,(X)=>X(this.#N)),this.#U=MX(this.#U,Z.before_paint),this.#z=MX(this.#z,Z.after_paint),!this.#W.length)break;let Q=this.#W.shift();[this.#Z,Z]=this.#X(this.#Z,Q),J=!0}return this.#V=!1,J}#O(Z){if(this.#j(Z))this.#R(!0)}#F(){this.#G=null;let Z=this.#I(this.#Z),{patch:J,cache:Q}=a9(this.#Q,this.#J,Z);if(this.#Q=Q,this.#J=Z,this.#Y.push(J,P7(Q)),Y4(this.#U)){let X=DU(this.#U);this.#U=G1,queueMicrotask(()=>this.#O(X))}if(Y4(this.#z)){let X=DU(this.#z);this.#z=G1,window.requestAnimationFrame(()=>this.#O(X))}}}function DU(Z){return{synchronous:Z,after_paint:G1,before_paint:G1}}class CX extends Event{constructor(Z,J,Q){super("context-request",{bubbles:!0,composed:!0});this.context=Z,this.callback=J,this.subscribe=Q}}class LU extends CustomEvent{isLustreEvent=!0;constructor(Z,J){super(Z,{detail:J,bubbles:!0,composed:!0})}}class BU{#Z;constructor(Z,[J,Q],X,Y){this.#Z=new XZ(Z,[J,Q],Y,X)}send(Z){if(l9(Z))this.dispatch(Z.message,!1);else if(i9(Z))this.emit(Z.name,Z.data);else if(r9(Z));}dispatch(Z){this.#Z.dispatch(Z)}emit(Z,J){this.#Z.emit(Z,J)}}var PU=({init:Z,update:J,view:Q},X,Y)=>{if(!f8())return t1(wX());let K=X instanceof HTMLElement?X:globalThis.document.querySelector(X);if(!K)return t1(SU(X));return v1(new BU(K,Z(Y),J,Q))};class YR{#Z;#I;#X;#J;#Q;#Y;#q=W7();#K=new Set;constructor(Z,J,Q,X,Y,K){let[I,q]=J(K);this.#Z=I,this.#I=Q,this.#X=X,this.#J=Y,this.#Q=this.#X(this.#Z),this.#Y=_G(this.#Q),this.#G(q)}send(Z){if(uG(Z)){let{message:J}=J,Q=this.#V(J),X=a9(this.#Y,this.#Q,Q);this.#Q=Q,this.#Y=X.cache,this.broadcast(aQ(X.patch,P7(X.cache)))}else if(vG(Z)){let{callback:J}=Z;if(this.#K.add(J),J(zG(this.#J.open_shadow_root,this.#J.adopt_styles,B9(this.#J.attributes),B9(this.#J.properties),B9(this.#J.contexts),this.#q,this.#Q,P7(this.#Y))),G3(this.#J.on_connect))this.#W(U3(this.#J.on_connect))}else if(pG(Z)){let{callback:J}=Z;if(this.#K.delete(J),G3(this.#J.on_disconnect))this.#W(U3(this.#J.on_disconnect))}else if(l9(Z)){let{message:J}=J,[Q,X]=this.#I(this.#Z,J),Y=this.#X(Q),K=a9(this.#Y,this.#Q,Y);this.#G(X),this.#Z=Q,this.#Q=Y,this.#Y=K.cache,this.broadcast(aQ(K.patch,P7(K.cache)))}else if(i9(Z)){let{name:J,data:Q}=Z;this.broadcast(VG(J,Q))}else if(lG(Z)){let{key:J,value:Q}=Z,X=I4(this.#q,J);if(O0(X)&&A6(D0(X),Q))return;this.#q=P8(this.#q,J,Q),this.broadcast(jG(J,Q))}else if(rG(Z)){let{key:J,decoder:Q}=Z;this.broadcast(OG(J)),this.#J.contexts=P8(this.#J.contexts,J,Q)}else if(oG(Z)){let{key:J}=Z;this.broadcast(FG(J)),this.#J.contexts=zQ(this.#J.contexts,J)}else if(r9(Z))this.#Z=null,this.#I=null,this.#X=null,this.#J=null,this.#Q=null,this.#Y=null,this.#q=null,this.#K.clear()}broadcast(Z){for(let J of this.#K)J(Z)}#V(Z){if(QG(Z)){let{messages:J}=Z,Q=this.#Z,X=j1();for(let Y=J;$6(Y);Y=$6(Y)){let K=this.#V(q7(Y));if(O0(K)){Q=D0(K)[0],X=n9(XU([X,D0(K)[1]]));break}}return this.#G(X),this.#Z=Q,this.#X(Q)}else if(YG(Z)){let{name:J,value:Q}=Z,X=this.#U(J,Q);if(!O0(X))return this.#Q;return this.#W(D0(X))}else if(IG(Z)){let{name:J,value:Q}=Z,X=this.#z(J,Q);if(!O0(X))return this.#Q;return this.#W(D0(X))}else if(WG(Z)){let{path:J,name:Q,event:X}=I,[Y,K]=fG(this.#Y,J,Q,X);if(this.#Y=Y,!O0(K))return this.#Q;let{message:I}=D0(K);return this.#W(I)}else if(UG(Z)){let{key:J,value:Q}=Z,X=I4(this.#J.contexts,J);if(!O0(X))return this.#Q;if(X=n6(Q,D0(X)),!O0(X))return this.#Q;return this.#W(D0(X))}}#W(Z){let[J,Q]=this.#I(this.#Z,Z);return this.#G(Q),this.#Z=J,this.#X(this.#Z)}#U(Z,J){let Q=I4(this.#J.attributes,Z);if(!O0(Q))return Q;return D0(Q)(J)}#z(Z,J){let Q=I4(this.#J.properties,Z);if(!O0(Q))return Q;return D0(Q)(J)}#G(Z){let J=(W)=>this.send(cG(W)),Q=(W,G)=>this.send(dG(W,G)),X=()=>{return},Y=()=>{return},K=(W,G)=>this.send(sG(W,G)),I=(W,G)=>this.send(iG(W,G)),q=(W)=>this.send(aG(W));globalThis.queueMicrotask(()=>{MW(Z,J,Q,X,Y,K,I,q)})}}class TU extends P{constructor(Z){super();this.selector=Z}}var SU=(Z)=>new TU(Z);class _U extends P{}var EU=new _U,wX=()=>EU;function CU(Z,J,Q){return new FX(U1,Z,J,Q,eG)}function wU(Z,J,Q){return dq(!f8(),new V1(EU),()=>{return PU(Z,J,Q)})}var hU=new Map;function hX(Z,J,Q){clearTimeout(hU.get(Z)),hU.set(Z,setTimeout(Q,J))}function kX(Z){return confirm(Z)}function bX(Z){alert(Z)}function xX(Z){return Z<=0?0:Math.floor(Math.random()*Z)}function t9(Z,J){return bQ(Z,T8(J,(Q)=>{return new M7(!1,!1,Q)}),G1,wQ,wQ,0,0)}function kU(Z,J){return bQ(Z,J,G1,hQ,hQ,0,0)}function YZ(Z,J,Q){return new M7(J,Q,Z)}function i1(Z){return t9("click",k1(Z))}function bU(Z){return t9("input",F7(V(["target","value"]),w1,(J)=>{return k1(Z(J))}))}function xU(Z){return t9("change",F7(V(["target","value"]),w1,(J)=>{return k1(Z(J))}))}var gX=[],$U=[];(()=>{let Z="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((J)=>J?parseInt(J,36):1);for(let J=0,Q=0;J<Z.length;J++)(J%2?$U:gX).push(Q=Q+Z[J])})();function WR(Z){if(Z<768)return!1;for(let J=0,Q=gX.length;;){let X=J+Q>>1;if(Z<gX[X])Q=X;else if(Z>=$U[X])J=X+1;else return!0;if(J==Q)return!1}}function yU(Z){return Z>=127462&&Z<=127487}var gU=8205;function uU(Z,J,Q=!0,X=!0){return(Q?nU:GR)(Z,J,X)}function nU(Z,J,Q){if(J==Z.length)return J;if(J&&vU(Z.charCodeAt(J))&&mU(Z.charCodeAt(J-1)))J--;let X=yX(Z,J);J+=fU(X);while(J<Z.length){let Y=yX(Z,J);if(X==gU||Y==gU||Q&&WR(Y))J+=fU(Y),X=Y;else if(yU(Y)){let K=0,I=J-2;while(I>=0&&yU(yX(Z,I)))K++,I-=2;if(K%2==0)break;else J+=2}else break}return J}function GR(Z,J,Q){while(J>1){let X=nU(Z,J-2,Q);if(X<J)return X;J--}return 0}function yX(Z,J){let Q=Z.charCodeAt(J);if(!mU(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!vU(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function vU(Z){return Z>=56320&&Z<57344}function mU(Z){return Z>=55296&&Z<56320}function fU(Z){return Z<65536?1:2}class R1{lineAt(Z){if(Z<0||Z>this.length)throw RangeError(`Invalid position ${Z} in document of length ${this.length}`);return this.lineInner(Z,!1,1,0)}line(Z){if(Z<1||Z>this.lines)throw RangeError(`Invalid line number ${Z} in ${this.lines}-line document`);return this.lineInner(Z,!0,1,0)}replace(Z,J,Q){[Z,J]=w7(this,Z,J);let X=[];if(this.decompose(0,Z,X,2),Q.length)Q.decompose(0,Q.length,X,3);return this.decompose(J,this.length,X,1),s6.from(X,this.length-(J-Z)+Q.length)}append(Z){return this.replace(this.length,this.length,Z)}slice(Z,J=this.length){[Z,J]=w7(this,Z,J);let Q=[];return this.decompose(Z,J,Q,0),s6.from(Q,J-Z)}eq(Z){if(Z==this)return!0;if(Z.length!=this.length||Z.lines!=this.lines)return!1;let J=this.scanIdentical(Z,1),Q=this.length-this.scanIdentical(Z,-1),X=new E7(this),Y=new E7(Z);for(let K=J,I=J;;){if(X.next(K),Y.next(K),K=0,X.lineBreak!=Y.lineBreak||X.done!=Y.done||X.value!=Y.value)return!1;if(I+=X.value.length,X.done||I>=Q)return!0}}iter(Z=1){return new E7(this,Z)}iterRange(Z,J=this.length){return new lX(this,Z,J)}iterLines(Z,J){let Q;if(Z==null)Q=this.iter();else{if(J==null)J=this.lines+1;let X=this.line(Z).from;Q=this.iterRange(X,Math.max(X,J==this.lines+1?this.length:J<=1?0:this.line(J-1).to))}return new iX(Q)}toString(){return this.sliceString(0)}toJSON(){let Z=[];return this.flatten(Z),Z}constructor(){}static of(Z){if(Z.length==0)throw RangeError("A document must have at least one line");if(Z.length==1&&!Z[0])return R1.empty;return Z.length<=32?new r1(Z):s6.from(r1.split(Z,[]))}}class r1 extends R1{constructor(Z,J=UR(Z)){super();this.text=Z,this.length=J}get lines(){return this.text.length}get children(){return null}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.text[Y],I=X+K.length;if((J?Q:I)>=Z)return new iU(X,I,Q,K);X=I+1,Q++}}decompose(Z,J,Q,X){let Y=Z<=0&&J>=this.length?this:new r1(pU(this.text,Z,J),Math.min(J,this.length)-Math.max(0,Z));if(X&1){let K=Q.pop(),I=GZ(Y.text,K.text.slice(),0,Y.length);if(I.length<=32)Q.push(new r1(I,K.length+Y.length));else{let q=I.length>>1;Q.push(new r1(I.slice(0,q)),new r1(I.slice(q)))}}else Q.push(Y)}replace(Z,J,Q){if(!(Q instanceof r1))return super.replace(Z,J,Q);[Z,J]=w7(this,Z,J);let X=GZ(this.text,GZ(Q.text,pU(this.text,0,Z)),J),Y=this.length+Q.length-(J-Z);if(X.length<=32)return new r1(X,Y);return s6.from(r1.split(X,[]),Y)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=w7(this,Z,J);let X="";for(let Y=0,K=0;Y<=J&&K<this.text.length;K++){let I=this.text[K],q=Y+I.length;if(Y>Z&&K)X+=Q;if(Z<q&&J>Y)X+=I.slice(Math.max(0,Z-Y),J-Y);Y=q+1}return X}flatten(Z){for(let J of this.text)Z.push(J)}scanIdentical(){return 0}static split(Z,J){let Q=[],X=-1;for(let Y of Z)if(Q.push(Y),X+=Y.length+1,Q.length==32)J.push(new r1(Q,X)),Q=[],X=-1;if(X>-1)J.push(new r1(Q,X));return J}}class s6 extends R1{constructor(Z,J){super();this.children=Z,this.length=J,this.lines=0;for(let Q of Z)this.lines+=Q.lines}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.children[Y],I=X+K.length,q=Q+K.lines-1;if((J?q:I)>=Z)return K.lineInner(Z,J,Q,X);X=I+1,Q=q+1}}decompose(Z,J,Q,X){for(let Y=0,K=0;K<=J&&Y<this.children.length;Y++){let I=this.children[Y],q=K+I.length;if(Z<=q&&J>=K){let W=X&((K<=Z?1:0)|(q>=J?2:0));if(K>=Z&&q<=J&&!W)Q.push(I);else I.decompose(Z-K,J-K,Q,W)}K=q+1}}replace(Z,J,Q){if([Z,J]=w7(this,Z,J),Q.lines<this.lines)for(let X=0,Y=0;X<this.children.length;X++){let K=this.children[X],I=Y+K.length;if(Z>=Y&&J<=I){let q=K.replace(Z-Y,J-Y,Q),W=this.lines-K.lines+q.lines;if(q.lines<W>>4&&q.lines>W>>6){let G=this.children.slice();return G[X]=q,new s6(G,this.length-(J-Z)+Q.length)}return super.replace(Y,I,q)}Y=I+1}return super.replace(Z,J,Q)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=w7(this,Z,J);let X="";for(let Y=0,K=0;Y<this.children.length&&K<=J;Y++){let I=this.children[Y],q=K+I.length;if(K>Z&&Y)X+=Q;if(Z<q&&J>K)X+=I.sliceString(Z-K,J-K,Q);K=q+1}return X}flatten(Z){for(let J of this.children)J.flatten(Z)}scanIdentical(Z,J){if(!(Z instanceof s6))return 0;let Q=0,[X,Y,K,I]=J>0?[0,0,this.children.length,Z.children.length]:[this.children.length-1,Z.children.length-1,-1,-1];for(;;X+=J,Y+=J){if(X==K||Y==I)return Q;let q=this.children[X],W=Z.children[Y];if(q!=W)return Q+q.scanIdentical(W,J);Q+=q.length+1}}static from(Z,J=Z.reduce((Q,X)=>Q+X.length+1,-1)){let Q=0;for(let j of Z)Q+=j.lines;if(Q<32){let j=[];for(let O of Z)O.flatten(j);return new r1(j,J)}let X=Math.max(32,Q>>5),Y=X<<1,K=X>>1,I=[],q=0,W=-1,G=[];function U(j){let O;if(j.lines>Y&&j instanceof s6)for(let H of j.children)U(H);else if(j.lines>K&&(q>K||!q))z(),I.push(j);else if(j instanceof r1&&q&&(O=G[G.length-1])instanceof r1&&j.lines+O.lines<=32)q+=j.lines,W+=j.length+1,G[G.length-1]=new r1(O.text.concat(j.text),O.length+1+j.length);else{if(q+j.lines>X)z();q+=j.lines,W+=j.length+1,G.push(j)}}function z(){if(q==0)return;I.push(G.length==1?G[0]:s6.from(G,W)),W=-1,q=G.length=0}for(let j of Z)U(j);return z(),I.length==1?I[0]:new s6(I,J)}}R1.empty=new r1([""],0);function UR(Z){let J=-1;for(let Q of Z)J+=Q.length+1;return J}function GZ(Z,J,Q=0,X=1e9){for(let Y=0,K=0,I=!0;K<Z.length&&Y<=X;K++){let q=Z[K],W=Y+q.length;if(W>=Q){if(W>X)q=q.slice(0,X-Y);if(Y<Q)q=q.slice(Q-Y);if(I)J[J.length-1]+=q,I=!1;else J.push(q)}Y=W+1}return J}function pU(Z,J,Q){return GZ(Z,[""],J,Q)}class E7{constructor(Z,J=1){this.dir=J,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[Z],this.offsets=[J>0?1:(Z instanceof r1?Z.text.length:Z.children.length)<<1]}nextInner(Z,J){this.done=this.lineBreak=!1;for(;;){let Q=this.nodes.length-1,X=this.nodes[Q],Y=this.offsets[Q],K=Y>>1,I=X instanceof r1?X.text.length:X.children.length;if(K==(J>0?I:0)){if(Q==0)return this.done=!0,this.value="",this;if(J>0)this.offsets[Q-1]++;this.nodes.pop(),this.offsets.pop()}else if((Y&1)==(J>0?0:1)){if(this.offsets[Q]+=J,Z==0)return this.lineBreak=!0,this.value=`
`,this;Z--}else if(X instanceof r1){let q=X.text[K+(J<0?-1:0)];if(this.offsets[Q]+=J,q.length>Math.max(0,Z))return this.value=Z==0?q:J>0?q.slice(Z):q.slice(0,q.length-Z),this;Z-=q.length}else{let q=X.children[K+(J<0?-1:0)];if(Z>q.length)Z-=q.length,this.offsets[Q]+=J;else{if(J<0)this.offsets[Q]--;this.nodes.push(q),this.offsets.push(J>0?1:(q instanceof r1?q.text.length:q.children.length)<<1)}}}}next(Z=0){if(Z<0)this.nextInner(-Z,-this.dir),Z=this.value.length;return this.nextInner(Z,this.dir)}}class lX{constructor(Z,J,Q){this.value="",this.done=!1,this.cursor=new E7(Z,J>Q?-1:1),this.pos=J>Q?Z.length:0,this.from=Math.min(J,Q),this.to=Math.max(J,Q)}nextInner(Z,J){if(J<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;Z+=Math.max(0,J<0?this.pos-this.to:this.from-this.pos);let Q=J<0?this.pos-this.from:this.to-this.pos;if(Z>Q)Z=Q;Q-=Z;let{value:X}=this.cursor.next(Z);return this.pos+=(X.length+Z)*J,this.value=X.length<=Q?X:J<0?X.slice(X.length-Q):X.slice(0,Q),this.done=!this.value,this}next(Z=0){if(Z<0)Z=Math.max(Z,this.from-this.pos);else if(Z>0)Z=Math.min(Z,this.to-this.pos);return this.nextInner(Z,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class iX{constructor(Z){this.inner=Z,this.afterBreak=!0,this.value="",this.done=!1}next(Z=0){let{done:J,lineBreak:Q,value:X}=this.inner.next(Z);if(J&&this.afterBreak)this.value="",this.afterBreak=!1;else if(J)this.done=!0,this.value="";else if(Q)if(this.afterBreak)this.value="";else this.afterBreak=!0,this.next();else this.value=X,this.afterBreak=!1;return this}get lineBreak(){return!1}}if(typeof Symbol<"u")R1.prototype[Symbol.iterator]=function(){return this.iter()},E7.prototype[Symbol.iterator]=lX.prototype[Symbol.iterator]=iX.prototype[Symbol.iterator]=function(){return this};class iU{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.number=Q,this.text=X}get length(){return this.to-this.from}}function w7(Z,J,Q){return J=Math.max(0,Math.min(Z.length,J)),[J,Math.max(J,Math.min(Z.length,Q))]}function I0(Z,J,Q=!0,X=!0){return uU(Z,J,Q,X)}function zR(Z){return Z>=56320&&Z<57344}function VR(Z){return Z>=55296&&Z<56320}function rU(Z,J){let Q=Z.charCodeAt(J);if(!VR(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!zR(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function aU(Z){return Z<65536?1:2}var $X=/\r\n?|\n/,T0=function(Z){return Z[Z.Simple=0]="Simple",Z[Z.TrackDel=1]="TrackDel",Z[Z.TrackBefore=2]="TrackBefore",Z[Z.TrackAfter=3]="TrackAfter",Z}(T0||(T0={}));class L6{constructor(Z){this.sections=Z}get length(){let Z=0;for(let J=0;J<this.sections.length;J+=2)Z+=this.sections[J];return Z}get newLength(){let Z=0;for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J+1];Z+=Q<0?this.sections[J]:Q}return Z}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(Z){for(let J=0,Q=0,X=0;J<this.sections.length;){let Y=this.sections[J++],K=this.sections[J++];if(K<0)Z(Q,X,Y),X+=Y;else X+=K;Q+=Y}}iterChangedRanges(Z,J=!1){uX(this,Z,J)}get invertedDesc(){let Z=[];for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];if(X<0)Z.push(Q,X);else Z.push(X,Q)}return new L6(Z)}composeDesc(Z){return this.empty?Z:Z.empty?this:oU(this,Z)}mapDesc(Z,J=!1){return Z.empty?this:nX(this,Z,J)}mapPos(Z,J=-1,Q=T0.Simple){let X=0,Y=0;for(let K=0;K<this.sections.length;){let I=this.sections[K++],q=this.sections[K++],W=X+I;if(q<0){if(W>Z)return Y+(Z-X);Y+=I}else{if(Q!=T0.Simple&&W>=Z&&(Q==T0.TrackDel&&X<Z&&W>Z||Q==T0.TrackBefore&&X<Z||Q==T0.TrackAfter&&W>Z))return null;if(W>Z||W==Z&&J<0&&!I)return Z==X||J<0?Y:Y+q;Y+=q}X=W}if(Z>X)throw RangeError(`Position ${Z} is out of range for changeset of length ${X}`);return Y}touchesRange(Z,J=Z){for(let Q=0,X=0;Q<this.sections.length&&X<=J;){let Y=this.sections[Q++],K=this.sections[Q++],I=X+Y;if(K>=0&&X<=J&&I>=Z)return X<Z&&I>J?"cover":!0;X=I}return!1}toString(){let Z="";for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];Z+=(Z?" ":"")+Q+(X>=0?":"+X:"")}return Z}toJSON(){return this.sections}static fromJSON(Z){if(!Array.isArray(Z)||Z.length%2||Z.some((J)=>typeof J!="number"))throw RangeError("Invalid JSON representation of ChangeDesc");return new L6(Z)}static create(Z){return new L6(Z)}}class a1 extends L6{constructor(Z,J){super(Z);this.inserted=J}apply(Z){if(this.length!=Z.length)throw RangeError("Applying change set to a document with the wrong length");return uX(this,(J,Q,X,Y,K)=>Z=Z.replace(X,X+(Q-J),K),!1),Z}mapDesc(Z,J=!1){return nX(this,Z,J,!0)}invert(Z){let J=this.sections.slice(),Q=[];for(let X=0,Y=0;X<J.length;X+=2){let K=J[X],I=J[X+1];if(I>=0){J[X]=I,J[X+1]=K;let q=X>>1;while(Q.length<q)Q.push(R1.empty);Q.push(K?Z.slice(Y,Y+K):R1.empty)}Y+=K}return new a1(J,Q)}compose(Z){return this.empty?Z:Z.empty?this:oU(this,Z,!0)}map(Z,J=!1){return Z.empty?this:nX(this,Z,J,!0)}iterChanges(Z,J=!1){uX(this,Z,J)}get desc(){return L6.create(this.sections)}filter(Z){let J=[],Q=[],X=[],Y=new h7(this);Z:for(let K=0,I=0;;){let q=K==Z.length?1e9:Z[K++];while(I<q||I==q&&Y.len==0){if(Y.done)break Z;let G=Math.min(Y.len,q-I);N0(X,G,-1);let U=Y.ins==-1?-1:Y.off==0?Y.ins:0;if(N0(J,G,U),U>0)l4(Q,J,Y.text);Y.forward(G),I+=G}let W=Z[K++];while(I<W){if(Y.done)break Z;let G=Math.min(Y.len,W-I);N0(J,G,-1),N0(X,G,Y.ins==-1?-1:Y.off==0?Y.ins:0),Y.forward(G),I+=G}}return{changes:new a1(J,Q),filtered:L6.create(X)}}toJSON(){let Z=[];for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J],X=this.sections[J+1];if(X<0)Z.push(Q);else if(X==0)Z.push([Q]);else Z.push([Q].concat(this.inserted[J>>1].toJSON()))}return Z}static of(Z,J,Q){let X=[],Y=[],K=0,I=null;function q(G=!1){if(!G&&!X.length)return;if(K<J)N0(X,J-K,-1);let U=new a1(X,Y);I=I?I.compose(U.map(I)):U,X=[],Y=[],K=0}function W(G){if(Array.isArray(G))for(let U of G)W(U);else if(G instanceof a1){if(G.length!=J)throw RangeError(`Mismatched change set length (got ${G.length}, expected ${J})`);q(),I=I?I.compose(G.map(I)):G}else{let{from:U,to:z=U,insert:j}=G;if(U>z||U<0||z>J)throw RangeError(`Invalid change range ${U} to ${z} (in doc of length ${J})`);let O=!j?R1.empty:typeof j=="string"?R1.of(j.split(Q||$X)):j,H=O.length;if(U==z&&H==0)return;if(U<K)q();if(U>K)N0(X,U-K,-1);N0(X,z-U,H),l4(Y,X,O),K=z}}return W(Z),q(!I),I}static empty(Z){return new a1(Z?[Z,-1]:[],[])}static fromJSON(Z){if(!Array.isArray(Z))throw RangeError("Invalid JSON representation of ChangeSet");let J=[],Q=[];for(let X=0;X<Z.length;X++){let Y=Z[X];if(typeof Y=="number")J.push(Y,-1);else if(!Array.isArray(Y)||typeof Y[0]!="number"||Y.some((K,I)=>I&&typeof K!="string"))throw RangeError("Invalid JSON representation of ChangeSet");else if(Y.length==1)J.push(Y[0],0);else{while(Q.length<X)Q.push(R1.empty);Q[X]=R1.of(Y.slice(1)),J.push(Y[0],Q[X].length)}}return new a1(J,Q)}static createSet(Z,J){return new a1(Z,J)}}function N0(Z,J,Q,X=!1){if(J==0&&Q<=0)return;let Y=Z.length-2;if(Y>=0&&Q<=0&&Q==Z[Y+1])Z[Y]+=J;else if(Y>=0&&J==0&&Z[Y]==0)Z[Y+1]+=Q;else if(X)Z[Y]+=J,Z[Y+1]+=Q;else Z.push(J,Q)}function l4(Z,J,Q){if(Q.length==0)return;let X=J.length-2>>1;if(X<Z.length)Z[Z.length-1]=Z[Z.length-1].append(Q);else{while(Z.length<X)Z.push(R1.empty);Z.push(Q)}}function uX(Z,J,Q){let X=Z.inserted;for(let Y=0,K=0,I=0;I<Z.sections.length;){let q=Z.sections[I++],W=Z.sections[I++];if(W<0)Y+=q,K+=q;else{let G=Y,U=K,z=R1.empty;for(;;){if(G+=q,U+=W,W&&X)z=z.append(X[I-2>>1]);if(Q||I==Z.sections.length||Z.sections[I+1]<0)break;q=Z.sections[I++],W=Z.sections[I++]}J(Y,G,K,U,z),Y=G,K=U}}}function nX(Z,J,Q,X=!1){let Y=[],K=X?[]:null,I=new h7(Z),q=new h7(J);for(let W=-1;;)if(I.done&&q.len||q.done&&I.len)throw Error("Mismatched change set lengths");else if(I.ins==-1&&q.ins==-1){let G=Math.min(I.len,q.len);N0(Y,G,-1),I.forward(G),q.forward(G)}else if(q.ins>=0&&(I.ins<0||W==I.i||I.off==0&&(q.len<I.len||q.len==I.len&&!Q))){let G=q.len;N0(Y,q.ins,-1);while(G){let U=Math.min(I.len,G);if(I.ins>=0&&W<I.i&&I.len<=U){if(N0(Y,0,I.ins),K)l4(K,Y,I.text);W=I.i}I.forward(U),G-=U}q.next()}else if(I.ins>=0){let G=0,U=I.len;while(U)if(q.ins==-1){let z=Math.min(U,q.len);G+=z,U-=z,q.forward(z)}else if(q.ins==0&&q.len<U)U-=q.len,q.next();else break;if(N0(Y,G,W<I.i?I.ins:0),K&&W<I.i)l4(K,Y,I.text);W=I.i,I.forward(I.len-U)}else if(I.done&&q.done)return K?a1.createSet(Y,K):L6.create(Y);else throw Error("Mismatched change set lengths")}function oU(Z,J,Q=!1){let X=[],Y=Q?[]:null,K=new h7(Z),I=new h7(J);for(let q=!1;;)if(K.done&&I.done)return Y?a1.createSet(X,Y):L6.create(X);else if(K.ins==0)N0(X,K.len,0,q),K.next();else if(I.len==0&&!I.done){if(N0(X,0,I.ins,q),Y)l4(Y,X,I.text);I.next()}else if(K.done||I.done)throw Error("Mismatched change set lengths");else{let W=Math.min(K.len2,I.len),G=X.length;if(K.ins==-1){let U=I.ins==-1?-1:I.off?0:I.ins;if(N0(X,W,U,q),Y&&U)l4(Y,X,I.text)}else if(I.ins==-1){if(N0(X,K.off?0:K.len,W,q),Y)l4(Y,X,K.textBit(W))}else if(N0(X,K.off?0:K.len,I.off?0:I.ins,q),Y&&!I.off)l4(Y,X,I.text);q=(K.ins>W||I.ins>=0&&I.len>W)&&(q||X.length>G),K.forward2(W),I.forward(W)}}class h7{constructor(Z){this.set=Z,this.i=0,this.next()}next(){let{sections:Z}=this.set;if(this.i<Z.length)this.len=Z[this.i++],this.ins=Z[this.i++];else this.len=0,this.ins=-2;this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:Z}=this.set,J=this.i-2>>1;return J>=Z.length?R1.empty:Z[J]}textBit(Z){let{inserted:J}=this.set,Q=this.i-2>>1;return Q>=J.length&&!Z?R1.empty:J[Q].slice(this.off,Z==null?void 0:this.off+Z)}forward(Z){if(Z==this.len)this.next();else this.len-=Z,this.off+=Z}forward2(Z){if(this.ins==-1)this.forward(Z);else if(Z==this.ins)this.next();else this.ins-=Z,this.off+=Z}}class s4{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.flags=Q,this.goalColumn=X}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let Z=this.flags&7;return Z==7?null:Z}map(Z,J=-1){let Q,X;if(this.empty)Q=X=Z.mapPos(this.from,J);else Q=Z.mapPos(this.from,1),X=Z.mapPos(this.to,-1);return Q==this.from&&X==this.to?this:new s4(Q,X,this.flags,this.goalColumn)}extend(Z,J=Z,Q=0){if(Z<=this.anchor&&J>=this.anchor)return u.range(Z,J,void 0,void 0,Q);let X=Math.abs(Z-this.anchor)>Math.abs(J-this.anchor)?Z:J;return u.range(this.anchor,X,void 0,void 0,Q)}eq(Z,J=!1){return this.anchor==Z.anchor&&this.head==Z.head&&this.goalColumn==Z.goalColumn&&(!J||!this.empty||this.assoc==Z.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(Z){if(!Z||typeof Z.anchor!="number"||typeof Z.head!="number")throw RangeError("Invalid JSON representation for SelectionRange");return u.range(Z.anchor,Z.head)}static create(Z,J,Q,X){return new s4(Z,J,Q,X)}}class u{constructor(Z,J){this.ranges=Z,this.mainIndex=J}map(Z,J=-1){if(Z.empty)return this;return u.create(this.ranges.map((Q)=>Q.map(Z,J)),this.mainIndex)}eq(Z,J=!1){if(this.ranges.length!=Z.ranges.length||this.mainIndex!=Z.mainIndex)return!1;for(let Q=0;Q<this.ranges.length;Q++)if(!this.ranges[Q].eq(Z.ranges[Q],J))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new u([this.main],0)}addRange(Z,J=!0){return u.create([Z].concat(this.ranges),J?0:this.mainIndex+1)}replaceRange(Z,J=this.mainIndex){let Q=this.ranges.slice();return Q[J]=Z,u.create(Q,this.mainIndex)}toJSON(){return{ranges:this.ranges.map((Z)=>Z.toJSON()),main:this.mainIndex}}static fromJSON(Z){if(!Z||!Array.isArray(Z.ranges)||typeof Z.main!="number"||Z.main>=Z.ranges.length)throw RangeError("Invalid JSON representation for EditorSelection");return new u(Z.ranges.map((J)=>s4.fromJSON(J)),Z.main)}static single(Z,J=Z){return new u([u.range(Z,J)],0)}static create(Z,J=0){if(Z.length==0)throw RangeError("A selection needs at least one range");for(let Q=0,X=0;X<Z.length;X++){let Y=Z[X];if(Y.empty?Y.from<=Q:Y.from<Q)return u.normalized(Z.slice(),J);Q=Y.to}return new u(Z,J)}static cursor(Z,J=0,Q,X){return s4.create(Z,Z,(J==0?0:J<0?8:16)|(Q==null?7:Math.min(6,Q)),X)}static range(Z,J,Q,X,Y){let K=X==null?7:Math.min(6,X);if(!Y&&Z!=J)Y=J<Z?1:-1;if(Y)K|=Y<0?8:16;return J<Z?s4.create(J,Z,K|32,Q):s4.create(Z,J,K,Q)}static undirectionalRange(Z,J){return s4.create(Z,J,64,void 0)}static normalized(Z,J=0){let Q=Z[J];Z.sort((X,Y)=>X.from-Y.from),J=Z.indexOf(Q);for(let X=1;X<Z.length;X++){let Y=Z[X],K=Z[X-1];if(Y.empty?Y.from<=K.to:Y.from<K.to){let I=K.from,q=Math.max(Y.to,K.to);if(X<=J)J--;Z.splice(--X,2,Y.anchor>Y.head?u.range(q,I):u.range(I,q))}}return new u(Z,J)}}function tU(Z,J){for(let Q of Z.ranges)if(Q.to>J)throw RangeError("Selection points outside of document")}var rX=0;class o{constructor(Z,J,Q,X,Y){this.combine=Z,this.compareInput=J,this.compare=Q,this.isStatic=X,this.id=rX++,this.default=Z([]),this.extensions=typeof Y=="function"?Y(this):Y}get reader(){return this}static define(Z={}){return new o(Z.combine||((J)=>J),Z.compareInput||((J,Q)=>J===Q),Z.compare||(!Z.combine?aX:(J,Q)=>J===Q),!!Z.static,Z.enables)}of(Z){return new Z5([],this,0,Z)}compute(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new Z5(Z,this,1,J)}computeN(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new Z5(Z,this,2,J)}from(Z,J){if(!J)J=(Q)=>Q;return this.compute([Z],(Q)=>J(Q.field(Z)))}}function aX(Z,J){return Z==J||Z.length==J.length&&Z.every((Q,X)=>Q===J[X])}class Z5{constructor(Z,J,Q,X){this.dependencies=Z,this.facet=J,this.type=Q,this.value=X,this.id=rX++}dynamicSlot(Z){var J;let Q=this.value,X=this.facet.compareInput,Y=this.id,K=Z[Y]>>1,I=this.type==2,q=!1,W=!1,G=[];for(let U of this.dependencies)if(U=="doc")q=!0;else if(U=="selection")W=!0;else if((((J=Z[U.id])!==null&&J!==void 0?J:1)&1)==0)G.push(Z[U.id]);return{create(U){return U.values[K]=Q(U),1},update(U,z){if(q&&z.docChanged||W&&(z.docChanged||z.selection)||vX(U,G)){let j=Q(U);if(I?!cU(j,U.values[K],X):!X(j,U.values[K]))return U.values[K]=j,1}return 0},reconfigure:(U,z)=>{let j,O=z.config.address[Y];if(O!=null){let H=VZ(z,O);if(this.dependencies.every((N)=>{return N instanceof o?z.facet(N)===U.facet(N):N instanceof R0?z.field(N,!1)==U.field(N,!1):!0})||(I?cU(j=Q(U),H,X):X(j=Q(U),H)))return U.values[K]=H,0}else j=Q(U);return U.values[K]=j,1}}}get extension(){return this}}function cU(Z,J,Q){if(Z.length!=J.length)return!1;for(let X=0;X<Z.length;X++)if(!Q(Z[X],J[X]))return!1;return!0}function vX(Z,J){let Q=!1;for(let X of J)if(J5(Z,X)&1)Q=!0;return Q}function jR(Z,J,Q){let X=Q.map((W)=>Z[W.id]),Y=Q.map((W)=>W.type),K=X.filter((W)=>!(W&1)),I=Z[J.id]>>1;function q(W){let G=[];for(let U=0;U<X.length;U++){let z=VZ(W,X[U]);if(Y[U]==2)for(let j of z)G.push(j);else G.push(z)}return J.combine(G)}return{create(W){for(let G of X)J5(W,G);return W.values[I]=q(W),1},update(W,G){if(!vX(W,K))return 0;let U=q(W);if(J.compare(U,W.values[I]))return 0;return W.values[I]=U,1},reconfigure(W,G){let U=vX(W,X),z=G.config.facets[J.id],j=G.facet(J);if(z&&!U&&aX(Q,z))return W.values[I]=j,0;let O=q(W);if(J.compare(O,j))return W.values[I]=j,0;return W.values[I]=O,1}}}var IZ=o.define({static:!0});class R0{constructor(Z,J,Q,X,Y){this.id=Z,this.createF=J,this.updateF=Q,this.compareF=X,this.spec=Y,this.provides=void 0}static define(Z){let J=new R0(rX++,Z.create,Z.update,Z.compare||((Q,X)=>Q===X),Z);if(Z.provide)J.provides=Z.provide(J);return J}create(Z){let J=Z.facet(IZ).find((Q)=>Q.field==this);return((J===null||J===void 0?void 0:J.create)||this.createF)(Z)}slot(Z){let J=Z[this.id]>>1;return{create:(Q)=>{return Q.values[J]=this.create(Q),1},update:(Q,X)=>{let Y=Q.values[J],K=this.updateF(Y,X);if(this.compareF(Y,K))return 0;return Q.values[J]=K,1},reconfigure:(Q,X)=>{let Y=Q.facet(IZ),K=X.facet(IZ),I;if((I=Y.find((q)=>q.field==this))&&I!=K.find((q)=>q.field==this))return Q.values[J]=I.create(Q),1;if(X.config.address[this.id]!=null)return Q.values[J]=X.field(this),0;return Q.values[J]=this.create(Q),1}}}init(Z){return[this,IZ.of({field:this,create:Z})]}get extension(){return this}}var $8={lowest:4,low:3,default:2,high:1,highest:0};function e9(Z){return(J)=>new oX(J,Z)}var M4={highest:e9($8.highest),high:e9($8.high),default:e9($8.default),low:e9($8.low),lowest:e9($8.lowest)};class oX{constructor(Z,J){this.inner=Z,this.prec=J}get extension(){return this}}class u8{of(Z){return new UZ(this,Z)}reconfigure(Z){return u8.reconfigure.of({compartment:this,extension:Z})}get(Z){return Z.config.compartments.get(this)}}class UZ{constructor(Z,J){this.compartment=Z,this.inner=J}get extension(){return this}}class zZ{constructor(Z,J,Q,X,Y,K){this.base=Z,this.compartments=J,this.dynamicSlots=Q,this.address=X,this.staticValues=Y,this.facets=K,this.statusTemplate=[];while(this.statusTemplate.length<Q.length)this.statusTemplate.push(0)}staticFacet(Z){let J=this.address[Z.id];return J==null?Z.default:this.staticValues[J>>1]}static resolve(Z,J,Q){let X=[],Y=Object.create(null),K=new Map;for(let z of OR(Z,J,K))if(z instanceof R0)X.push(z);else(Y[z.facet.id]||(Y[z.facet.id]=[])).push(z);let I=Object.create(null),q=[],W=[];for(let z of X)I[z.id]=W.length<<1,W.push((j)=>z.slot(j));let G=Q===null||Q===void 0?void 0:Q.config.facets;for(let z in Y){let j=Y[z],O=j[0].facet,H=G&&G[z]||[];if(j.every((N)=>N.type==0))if(I[O.id]=q.length<<1|1,aX(H,j))q.push(Q.facet(O));else{let N=O.combine(j.map((R)=>R.value));q.push(Q&&O.compare(N,Q.facet(O))?Q.facet(O):N)}else{for(let N of j)if(N.type==0)I[N.id]=q.length<<1|1,q.push(N.value);else I[N.id]=W.length<<1,W.push((R)=>N.dynamicSlot(R));I[O.id]=W.length<<1,W.push((N)=>jR(N,O,j))}}let U=W.map((z)=>z(I));return new zZ(Z,K,U,I,q,Y)}}function OR(Z,J,Q){let X=[[],[],[],[],[]],Y=new Map;function K(I,q){let W=Y.get(I);if(W!=null){if(W<=q)return;let G=X[W].indexOf(I);if(G>-1)X[W].splice(G,1);if(I instanceof UZ)Q.delete(I.compartment)}if(Y.set(I,q),Array.isArray(I))for(let G of I)K(G,q);else if(I instanceof UZ){if(Q.has(I.compartment))throw RangeError("Duplicate use of compartment in extensions");let G=J.get(I.compartment)||I.inner;Q.set(I.compartment,G),K(G,q)}else if(I instanceof oX)K(I.inner,I.prec);else if(I instanceof R0){if(X[q].push(I),I.provides)K(I.provides,q)}else if(I instanceof Z5){if(X[q].push(I),I.facet.extensions)K(I.facet.extensions,$8.default)}else{let G=I.extension;if(!G)throw Error(`Unrecognized extension value in extension set (${I}).`);if(G==I)throw Error(`Unrecognized extension value in extension set (${I}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);K(G,q)}}return K(Z,$8.default),X.reduce((I,q)=>I.concat(q))}function J5(Z,J){if(J&1)return 2;let Q=J>>1,X=Z.status[Q];if(X==4)throw Error("Cyclic dependency between fields and/or facets");if(X&2)return X;Z.status[Q]=4;let Y=Z.computeSlot(Z,Z.config.dynamicSlots[Q]);return Z.status[Q]=2|Y}function VZ(Z,J){return J&1?Z.config.staticValues[J>>1]:Z.values[J>>1]}var eU=o.define(),mX=o.define({combine:(Z)=>Z.some((J)=>J),static:!0}),Zz=o.define({combine:(Z)=>Z.length?Z[0]:void 0,static:!0}),Jz=o.define(),Qz=o.define(),Xz=o.define(),Yz=o.define({combine:(Z)=>Z.length?Z[0]:!1});class B6{constructor(Z,J){this.type=Z,this.value=J}static define(){return new Kz}}class Kz{of(Z){return new B6(this,Z)}}class Iz{constructor(Z){this.map=Z}of(Z){return new B1(this,Z)}}class B1{constructor(Z,J){this.type=Z,this.value=J}map(Z){let J=this.type.map(this.value,Z);return J===void 0?void 0:J==this.value?this:new B1(this.type,J)}is(Z){return this.type==Z}static define(Z={}){return new Iz(Z.map||((J)=>J))}static mapEffects(Z,J){if(!Z.length)return Z;let Q=[];for(let X of Z){let Y=X.map(J);if(Y)Q.push(Y)}return Q}}B1.reconfigure=B1.define();B1.appendConfig=B1.define();class o1{constructor(Z,J,Q,X,Y,K){if(this.startState=Z,this.changes=J,this.selection=Q,this.effects=X,this.annotations=Y,this.scrollIntoView=K,this._doc=null,this._state=null,Q)tU(Q,J.newLength);if(!Y.some((I)=>I.type==o1.time))this.annotations=Y.concat(o1.time.of(Date.now()))}static create(Z,J,Q,X,Y,K){return new o1(Z,J,Q,X,Y,K)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){if(!this._state)this.startState.applyTransaction(this);return this._state}annotation(Z){for(let J of this.annotations)if(J.type==Z)return J.value;return}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(Z){let J=this.annotation(o1.userEvent);return!!(J&&(J==Z||J.length>Z.length&&J.slice(0,Z.length)==Z&&J[Z.length]=="."))}}o1.time=B6.define();o1.userEvent=B6.define();o1.addToHistory=B6.define();o1.remote=B6.define();function FR(Z,J){let Q=[];for(let X=0,Y=0;;){let K,I;if(X<Z.length&&(Y==J.length||J[Y]>=Z[X]))K=Z[X++],I=Z[X++];else if(Y<J.length)K=J[Y++],I=J[Y++];else return Q;if(!Q.length||Q[Q.length-1]<K)Q.push(K,I);else if(Q[Q.length-1]<I)Q[Q.length-1]=I}}function qz(Z,J,Q){var X;let Y,K,I;if(Q)Y=J.changes,K=a1.empty(J.changes.length),I=Z.changes.compose(J.changes);else Y=J.changes.map(Z.changes),K=Z.changes.mapDesc(J.changes,!0),I=Z.changes.compose(Y);return{changes:I,selection:J.selection?J.selection.map(K):(X=Z.selection)===null||X===void 0?void 0:X.map(Y),effects:B1.mapEffects(Z.effects,Y).concat(B1.mapEffects(J.effects,K)),annotations:Z.annotations.length?Z.annotations.concat(J.annotations):J.annotations,scrollIntoView:Z.scrollIntoView||J.scrollIntoView}}function pX(Z,J,Q){let X=J.selection,Y=C7(J.annotations);if(J.userEvent)Y=Y.concat(o1.userEvent.of(J.userEvent));return{changes:J.changes instanceof a1?J.changes:a1.of(J.changes||[],Q,Z.facet(Zz)),selection:X&&(X instanceof u?X:u.single(X.anchor,X.head)),effects:C7(J.effects),annotations:Y,scrollIntoView:!!J.scrollIntoView}}function Wz(Z,J,Q){let X=pX(Z,J.length?J[0]:{},Z.doc.length);if(J.length&&J[0].filter===!1)Q=!1;for(let K=1;K<J.length;K++){if(J[K].filter===!1)Q=!1;let I=!!J[K].sequential;X=qz(X,pX(Z,J[K],I?X.changes.newLength:Z.doc.length),I)}let Y=o1.create(Z,X.changes,X.selection,X.effects,X.annotations,X.scrollIntoView);return NR(Q?HR(Y):Y)}function HR(Z){let J=Z.startState,Q=!0;for(let Y of J.facet(Jz)){let K=Y(Z);if(K===!1){Q=!1;break}if(Array.isArray(K))Q=Q===!0?K:FR(Q,K)}if(Q!==!0){let Y,K;if(Q===!1)K=Z.changes.invertedDesc,Y=a1.empty(J.doc.length);else{let I=Z.changes.filter(Q);Y=I.changes,K=I.filtered.mapDesc(I.changes).invertedDesc}Z=o1.create(J,Y,Z.selection&&Z.selection.map(K),B1.mapEffects(Z.effects,K),Z.annotations,Z.scrollIntoView)}let X=J.facet(Qz);for(let Y=X.length-1;Y>=0;Y--){let K=X[Y](Z);if(K instanceof o1)Z=K;else if(Array.isArray(K)&&K.length==1&&K[0]instanceof o1)Z=K[0];else Z=Wz(J,C7(K),!1)}return Z}function NR(Z){let J=Z.startState,Q=J.facet(Xz),X=Z;for(let Y=Q.length-1;Y>=0;Y--){let K=Q[Y](Z);if(K&&Object.keys(K).length)X=qz(X,pX(J,K,Z.changes.newLength),!0)}return X==Z?Z:o1.create(J,Z.changes,Z.selection,X.effects,X.annotations,X.scrollIntoView)}var RR=[];function C7(Z){return Z==null?RR:Array.isArray(Z)?Z:[Z]}var D6=function(Z){return Z[Z.Word=0]="Word",Z[Z.Space=1]="Space",Z[Z.Other=2]="Other",Z}(D6||(D6={})),MR=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,cX;try{cX=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch(Z){}function AR(Z){if(cX)return cX.test(Z);for(let J=0;J<Z.length;J++){let Q=Z[J];if(/\w/.test(Q)||Q>""&&(Q.toUpperCase()!=Q.toLowerCase()||MR.test(Q)))return!0}return!1}function DR(Z){return(J)=>{if(!/\S/.test(J))return D6.Space;if(AR(J))return D6.Word;for(let Q=0;Q<Z.length;Q++)if(J.indexOf(Z[Q])>-1)return D6.Word;return D6.Other}}class L1{constructor(Z,J,Q,X,Y,K){if(this.config=Z,this.doc=J,this.selection=Q,this.values=X,this.status=Z.statusTemplate.slice(),this.computeSlot=Y,K)K._state=this;for(let I=0;I<this.config.dynamicSlots.length;I++)J5(this,I<<1);this.computeSlot=null}field(Z,J=!0){let Q=this.config.address[Z.id];if(Q==null){if(J)throw RangeError("Field is not present in this state");return}return J5(this,Q),VZ(this,Q)}update(...Z){return Wz(this,Z,!0)}applyTransaction(Z){let J=this.config,{base:Q,compartments:X}=J;for(let I of Z.effects)if(I.is(u8.reconfigure)){if(J)X=new Map,J.compartments.forEach((q,W)=>X.set(W,q)),J=null;X.set(I.value.compartment,I.value.extension)}else if(I.is(B1.reconfigure))J=null,Q=I.value;else if(I.is(B1.appendConfig))J=null,Q=C7(Q).concat(I.value);let Y;if(!J)J=zZ.resolve(Q,X,this),Y=new L1(J,this.doc,this.selection,J.dynamicSlots.map(()=>null),(q,W)=>W.reconfigure(q,this),null).values;else Y=Z.startState.values.slice();let K=Z.startState.facet(mX)?Z.newSelection:Z.newSelection.asSingle();new L1(J,Z.newDoc,K,Y,(I,q)=>q.update(I,Z),Z)}replaceSelection(Z){if(typeof Z=="string")Z=this.toText(Z);return this.changeByRange((J)=>({changes:{from:J.from,to:J.to,insert:Z},range:u.cursor(J.from+Z.length)}))}changeByRange(Z){let J=this.selection,Q=Z(J.ranges[0]),X=this.changes(Q.changes),Y=[Q.range],K=C7(Q.effects);for(let I=1;I<J.ranges.length;I++){let q=Z(J.ranges[I]),W=this.changes(q.changes),G=W.map(X);for(let z=0;z<I;z++)Y[z]=Y[z].map(G);let U=X.mapDesc(W,!0);Y.push(q.range.map(U)),X=X.compose(G),K=B1.mapEffects(K,G).concat(B1.mapEffects(C7(q.effects),U))}return{changes:X,selection:u.create(Y,J.mainIndex),effects:K}}changes(Z=[]){if(Z instanceof a1)return Z;return a1.of(Z,this.doc.length,this.facet(L1.lineSeparator))}toText(Z){return R1.of(Z.split(this.facet(L1.lineSeparator)||$X))}sliceDoc(Z=0,J=this.doc.length){return this.doc.sliceString(Z,J,this.lineBreak)}facet(Z){let J=this.config.address[Z.id];if(J==null)return Z.default;return J5(this,J),VZ(this,J)}toJSON(Z){let J={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(Z)for(let Q in Z){let X=Z[Q];if(X instanceof R0&&this.config.address[X.id]!=null)J[Q]=X.spec.toJSON(this.field(Z[Q]),this)}return J}static fromJSON(Z,J={},Q){if(!Z||typeof Z.doc!="string")throw RangeError("Invalid JSON representation for EditorState");let X=[];if(Q){for(let Y in Q)if(Object.prototype.hasOwnProperty.call(Z,Y)){let K=Q[Y],I=Z[Y];X.push(K.init((q)=>K.spec.fromJSON(I,q)))}}return L1.create({doc:Z.doc,selection:u.fromJSON(Z.selection),extensions:J.extensions?X.concat([J.extensions]):X})}static create(Z={}){let J=zZ.resolve(Z.extensions||[],new Map),Q=Z.doc instanceof R1?Z.doc:R1.of((Z.doc||"").split(J.staticFacet(L1.lineSeparator)||$X)),X=!Z.selection?u.single(0):Z.selection instanceof u?Z.selection:u.single(Z.selection.anchor,Z.selection.head);if(tU(X,Q.length),!J.staticFacet(mX))X=X.asSingle();return new L1(J,Q,X,J.dynamicSlots.map(()=>null),(Y,K)=>K.create(Y),null)}get tabSize(){return this.facet(L1.tabSize)}get lineBreak(){return this.facet(L1.lineSeparator)||`
`}get readOnly(){return this.facet(Yz)}phrase(Z,...J){for(let Q of this.facet(L1.phrases))if(Object.prototype.hasOwnProperty.call(Q,Z)){Z=Q[Z];break}if(J.length)Z=Z.replace(/\$(\$|\d*)/g,(Q,X)=>{if(X=="$")return"$";let Y=+(X||1);return!Y||Y>J.length?Q:J[Y-1]});return Z}languageDataAt(Z,J,Q=-1){let X=[];for(let Y of this.facet(eU))for(let K of Y(this,J,Q))if(Object.prototype.hasOwnProperty.call(K,Z))X.push(K[Z]);return X}charCategorizer(Z){let J=this.languageDataAt("wordChars",Z);return DR(J.length?J[0]:"")}wordAt(Z){let{text:J,from:Q,length:X}=this.doc.lineAt(Z),Y=this.charCategorizer(Z),K=Z-Q,I=Z-Q;while(K>0){let q=I0(J,K,!1);if(Y(J.slice(q,K))!=D6.Word)break;K=q}while(I<X){let q=I0(J,I);if(Y(J.slice(I,q))!=D6.Word)break;I=q}return K==I?null:u.range(K+Q,I+Q)}}L1.allowMultipleSelections=mX;L1.tabSize=o.define({combine:(Z)=>Z.length?Z[0]:4});L1.lineSeparator=Zz;L1.readOnly=Yz;L1.phrases=o.define({compare(Z,J){let Q=Object.keys(Z),X=Object.keys(J);return Q.length==X.length&&Q.every((Y)=>Z[Y]==J[Y])}});L1.languageData=eU;L1.changeFilter=Jz;L1.transactionFilter=Qz;L1.transactionExtender=Xz;u8.reconfigure=B1.define();function A4(Z,J,Q={}){let X={};for(let Y of Z)for(let K of Object.keys(Y)){let I=Y[K],q=X[K];if(q===void 0)X[K]=I;else if(q===I||I===void 0);else if(Object.hasOwnProperty.call(Q,K))X[K]=Q[K](q,I);else throw Error("Config merge conflict for field "+K)}for(let Y in J)if(X[Y]===void 0)X[Y]=J[Y];return X}class N4{eq(Z){return this==Z}range(Z,J=Z){return Q5.create(Z,J,this)}}N4.prototype.startSide=N4.prototype.endSide=0;N4.prototype.point=!1;N4.prototype.mapMode=T0.TrackDel;function tX(Z,J){return Z==J||Z.constructor==J.constructor&&Z.eq(J)}class Q5{constructor(Z,J,Q){this.from=Z,this.to=J,this.value=Q}static create(Z,J,Q){return new Q5(Z,J,Q)}}function dX(Z,J){return Z.from-J.from||Z.value.startSide-J.value.startSide}class eX{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.value=Q,this.maxPoint=X}get length(){return this.to[this.to.length-1]}findIndex(Z,J,Q,X=0){let Y=Q?this.to:this.from;for(let K=X,I=Y.length;;){if(K==I)return K;let q=K+I>>1,W=Y[q]-Z||(Q?this.value[q].endSide:this.value[q].startSide)-J;if(q==K)return W>=0?K:I;if(W>=0)I=q;else K=q+1}}between(Z,J,Q,X){for(let Y=this.findIndex(J,-1e9,!0),K=this.findIndex(Q,1e9,!1,Y);Y<K;Y++)if(X(this.from[Y]+Z,this.to[Y]+Z,this.value[Y])===!1)return!1}map(Z,J){let Q=[],X=[],Y=[],K=-1,I=-1;for(let q=0;q<this.value.length;q++){let W=this.value[q],G=this.from[q]+Z,U=this.to[q]+Z,z,j;if(G==U){let O=J.mapPos(G,W.startSide,W.mapMode);if(O==null)continue;if(z=j=O,W.startSide!=W.endSide){if(j=J.mapPos(G,W.endSide),j<z)continue}}else if(z=J.mapPos(G,W.startSide),j=J.mapPos(U,W.endSide),z>j||z==j&&W.startSide>0&&W.endSide<=0)continue;if((j-z||W.endSide-W.startSide)<0)continue;if(K<0)K=z;if(W.point)I=Math.max(I,j-z);Q.push(W),X.push(z-K),Y.push(j-K)}return{mapped:Q.length?new eX(X,Y,Q,I):null,pos:K}}}class N1{constructor(Z,J,Q,X){this.chunkPos=Z,this.chunk=J,this.nextLayer=Q,this.maxPoint=X}static create(Z,J,Q,X){return new N1(Z,J,Q,X)}get length(){let Z=this.chunk.length-1;return Z<0?0:Math.max(this.chunkEnd(Z),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let Z=this.nextLayer.size;for(let J of this.chunk)Z+=J.value.length;return Z}chunkEnd(Z){return this.chunkPos[Z]+this.chunk[Z].length}update(Z){let{add:J=[],sort:Q=!1,filterFrom:X=0,filterTo:Y=this.length}=Z,K=Z.filter;if(J.length==0&&!K)return this;if(Q)J=J.slice().sort(dX);if(this.isEmpty)return J.length?N1.of(J):this;let I=new ZY(this,null,-1).goto(0),q=0,W=[],G=new R4;while(I.value||q<J.length)if(q<J.length&&(I.from-J[q].from||I.startSide-J[q].value.startSide)>=0){let U=J[q++];if(!G.addInner(U.from,U.to,U.value))W.push(U)}else if(I.rangeIndex==1&&I.chunkIndex<this.chunk.length&&(q==J.length||this.chunkEnd(I.chunkIndex)<J[q].from)&&(!K||X>this.chunkEnd(I.chunkIndex)||Y<this.chunkPos[I.chunkIndex])&&G.addChunk(this.chunkPos[I.chunkIndex],this.chunk[I.chunkIndex]))I.nextChunk();else{if(!K||X>I.to||Y<I.from||K(I.from,I.to,I.value)){if(!G.addInner(I.from,I.to,I.value))W.push(Q5.create(I.from,I.to,I.value))}I.next()}return G.finishInner(this.nextLayer.isEmpty&&!W.length?N1.empty:this.nextLayer.update({add:W,filter:K,filterFrom:X,filterTo:Y}))}map(Z){if(Z.empty||this.isEmpty)return this;let J=[],Q=[],X=-1;for(let K=0;K<this.chunk.length;K++){let I=this.chunkPos[K],q=this.chunk[K],W=Z.touchesRange(I,I+q.length);if(W===!1)X=Math.max(X,q.maxPoint),J.push(q),Q.push(Z.mapPos(I));else if(W===!0){let{mapped:G,pos:U}=q.map(I,Z);if(G)X=Math.max(X,G.maxPoint),J.push(G),Q.push(U)}}let Y=this.nextLayer.map(Z);return J.length==0?Y:new N1(Q,J,Y||N1.empty,X)}between(Z,J,Q){if(this.isEmpty)return;for(let X=0;X<this.chunk.length;X++){let Y=this.chunkPos[X],K=this.chunk[X];if(J>=Y&&Z<=Y+K.length&&K.between(Y,Z-Y,J-Y,Q)===!1)return}this.nextLayer.between(Z,J,Q)}iter(Z=0){return X5.from([this]).goto(Z)}get isEmpty(){return this.nextLayer==this}static iter(Z,J=0){return X5.from(Z).goto(J)}static compare(Z,J,Q,X,Y=-1){let K=Z.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=Y),I=J.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=Y),q=dU(K,I,Q),W=new _7(K,q,Y),G=new _7(I,q,Y);if(Q.iterGaps((U,z,j)=>sU(W,U,G,z,j,X)),Q.empty&&Q.length==0)sU(W,0,G,0,0,X)}static eq(Z,J,Q=0,X){if(X==null)X=999999999;let Y=Z.filter((G)=>!G.isEmpty&&J.indexOf(G)<0),K=J.filter((G)=>!G.isEmpty&&Z.indexOf(G)<0);if(Y.length!=K.length)return!1;if(!Y.length)return!0;let I=dU(Y,K),q=new _7(Y,I,0).goto(Q),W=new _7(K,I,0).goto(Q);for(;;){if(q.to!=W.to||!sX(q.active,W.active)||q.point&&(!W.point||!tX(q.point,W.point)))return!1;if(q.to>X)return!0;q.next(),W.next()}}static spans(Z,J,Q,X,Y=-1){let K=new _7(Z,null,Y).goto(J),I=J,q=K.openStart;for(;;){let W=Math.min(K.to,Q);if(K.point){let G=K.activeForPoint(K.to),U=K.pointFrom<J?G.length+1:K.point.startSide<0?G.length:Math.min(G.length,q);X.point(I,W,K.point,G,U,K.pointRank),q=Math.min(K.openEnd(W),G.length)}else if(W>I)X.span(I,W,K.active,q),q=K.openEnd(W);if(K.to>Q)return q+(K.point&&K.to>Q?1:0);I=K.to,K.next()}}static of(Z,J=!1){let Q=new R4;for(let X of Z instanceof Q5?[Z]:J?LR(Z):Z)Q.add(X.from,X.to,X.value);return Q.finish()}static join(Z){if(!Z.length)return N1.empty;let J=Z[Z.length-1];for(let Q=Z.length-2;Q>=0;Q--)for(let X=Z[Q];X!=N1.empty;X=X.nextLayer)J=new N1(X.chunkPos,X.chunk,J,Math.max(X.maxPoint,J.maxPoint));return J}}N1.empty=new N1([],[],null,-1);function LR(Z){if(Z.length>1)for(let J=Z[0],Q=1;Q<Z.length;Q++){let X=Z[Q];if(dX(J,X)>0)return Z.slice().sort(dX);J=X}return Z}N1.empty.nextLayer=N1.empty;class R4{finishChunk(Z){if(this.chunks.push(new eX(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,Z)this.from=[],this.to=[],this.value=[]}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(Z,J,Q){if(!this.addInner(Z,J,Q))(this.nextLayer||(this.nextLayer=new R4)).add(Z,J,Q)}addInner(Z,J,Q){let X=Z-this.lastTo||Q.startSide-this.last.endSide;if(X<=0&&(Z-this.lastFrom||Q.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");if(X<0)return!1;if(this.from.length==250)this.finishChunk(!0);if(this.chunkStart<0)this.chunkStart=Z;if(this.from.push(Z-this.chunkStart),this.to.push(J-this.chunkStart),this.last=Q,this.lastFrom=Z,this.lastTo=J,this.value.push(Q),Q.point)this.maxPoint=Math.max(this.maxPoint,J-Z);return!0}addChunk(Z,J){if((Z-this.lastTo||J.value[0].startSide-this.last.endSide)<0)return!1;if(this.from.length)this.finishChunk(!0);this.setMaxPoint=Math.max(this.setMaxPoint,J.maxPoint),this.chunks.push(J),this.chunkPos.push(Z);let Q=J.value.length-1;return this.last=J.value[Q],this.lastFrom=J.from[Q]+Z,this.lastTo=J.to[Q]+Z,!0}finish(){return this.finishInner(N1.empty)}finishInner(Z){if(this.from.length)this.finishChunk(!1);if(this.chunks.length==0)return Z;let J=N1.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(Z):Z,this.setMaxPoint);return this.from=null,J}}function dU(Z,J,Q){let X=new Map;for(let K of Z)for(let I=0;I<K.chunk.length;I++)if(K.chunk[I].maxPoint<=0)X.set(K.chunk[I],K.chunkPos[I]);let Y=new Set;for(let K of J)for(let I=0;I<K.chunk.length;I++){let q=X.get(K.chunk[I]);if(q!=null&&(Q?Q.mapPos(q):q)==K.chunkPos[I]&&!(Q===null||Q===void 0?void 0:Q.touchesRange(q,q+K.chunk[I].length)))Y.add(K.chunk[I])}return Y}class ZY{constructor(Z,J,Q,X=0){this.layer=Z,this.skip=J,this.minPoint=Q,this.rank=X}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(Z,J=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(Z,J,!1),this}gotoInner(Z,J,Q){while(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(X)||this.layer.chunkEnd(this.chunkIndex)<Z||X.maxPoint<this.minPoint))break;this.chunkIndex++,Q=!1}if(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex].findIndex(Z-this.layer.chunkPos[this.chunkIndex],J,!0);if(!Q||this.rangeIndex<X)this.setRangeIndex(X)}this.next()}forward(Z,J){if((this.to-Z||this.endSide-J)<0)this.gotoInner(Z,J,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let Z=this.layer.chunkPos[this.chunkIndex],J=this.layer.chunk[this.chunkIndex],Q=Z+J.from[this.rangeIndex];if(this.from=Q,this.to=Z+J.to[this.rangeIndex],this.value=J.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(Z){if(Z==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)while(this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]))this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=Z}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(Z){return this.from-Z.from||this.startSide-Z.startSide||this.rank-Z.rank||this.to-Z.to||this.endSide-Z.endSide}}class X5{constructor(Z){this.heap=Z}static from(Z,J=null,Q=-1){let X=[];for(let Y=0;Y<Z.length;Y++)for(let K=Z[Y];!K.isEmpty;K=K.nextLayer)if(K.maxPoint>=Q)X.push(new ZY(K,J,Q,Y));return X.length==1?X[0]:new X5(X)}get startSide(){return this.value?this.value.startSide:0}goto(Z,J=-1e9){for(let Q of this.heap)Q.goto(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)fX(this.heap,Q);return this.next(),this}forward(Z,J){for(let Q of this.heap)Q.forward(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)fX(this.heap,Q);if((this.to-Z||this.value.endSide-J)<0)this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let Z=this.heap[0];if(this.from=Z.from,this.to=Z.to,this.value=Z.value,this.rank=Z.rank,Z.value)Z.next();fX(this.heap,0)}}}function fX(Z,J){for(let Q=Z[J];;){let X=(J<<1)+1;if(X>=Z.length)break;let Y=Z[X];if(X+1<Z.length&&Y.compare(Z[X+1])>=0)Y=Z[X+1],X++;if(Q.compare(Y)<0)break;Z[X]=Q,Z[J]=Y,J=X}}class _7{constructor(Z,J,Q){this.minPoint=Q,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=X5.from(Z,J,Q)}goto(Z,J=-1e9){return this.cursor.goto(Z,J),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=Z,this.endSide=J,this.openStart=-1,this.next(),this}forward(Z,J){while(this.minActive>-1&&(this.activeTo[this.minActive]-Z||this.active[this.minActive].endSide-J)<0)this.removeActive(this.minActive);this.cursor.forward(Z,J)}removeActive(Z){qZ(this.active,Z),qZ(this.activeTo,Z),qZ(this.activeRank,Z),this.minActive=lU(this.active,this.activeTo)}addActive(Z){let J=0,{value:Q,to:X,rank:Y}=this.cursor;while(J<this.activeRank.length&&(Y-this.activeRank[J]||X-this.activeTo[J])>0)J++;if(WZ(this.active,J,Q),WZ(this.activeTo,J,X),WZ(this.activeRank,J,Y),Z)WZ(Z,J,this.cursor.from);this.minActive=lU(this.active,this.activeTo)}next(){let Z=this.to,J=this.point;this.point=null;let Q=this.openStart<0?[]:null;for(;;){let X=this.minActive;if(X>-1&&(this.activeTo[X]-this.cursor.from||this.active[X].endSide-this.cursor.startSide)<0){if(this.activeTo[X]>Z){this.to=this.activeTo[X],this.endSide=this.active[X].endSide;break}if(this.removeActive(X),Q)qZ(Q,X)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>Z){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let Y=this.cursor.value;if(!Y.point)this.addActive(Q),this.cursor.next();else if(J&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=Y,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=Y.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(Q){this.openStart=0;for(let X=Q.length-1;X>=0&&Q[X]<Z;X--)this.openStart++}}activeForPoint(Z){if(!this.active.length)return this.active;let J=[];for(let Q=this.active.length-1;Q>=0;Q--){if(this.activeRank[Q]<this.pointRank)break;if(this.activeTo[Q]>Z||this.activeTo[Q]==Z&&this.active[Q].endSide>=this.point.endSide)J.push(this.active[Q])}return J.reverse()}openEnd(Z){let J=0;for(let Q=this.activeTo.length-1;Q>=0&&this.activeTo[Q]>Z;Q--)J++;return J}}function sU(Z,J,Q,X,Y,K){Z.goto(J),Q.goto(X);let I=X+Y,q=X,W=X-J,G=!!K.boundChange;for(let U=!1;;){let z=Z.to+W-Q.to,j=z||Z.endSide-Q.endSide,O=j<0?Z.to+W:Q.to,H=Math.min(O,I);if(Z.point||Q.point){if(!(Z.point&&Q.point&&tX(Z.point,Q.point)&&sX(Z.activeForPoint(Z.to),Q.activeForPoint(Q.to))))K.comparePoint(q,H,Z.point,Q.point);U=!1}else{if(U)K.boundChange(q);if(H>q&&!sX(Z.active,Q.active))K.compareRange(q,H,Z.active,Q.active);if(G&&H<I&&(z||Z.openEnd(O)!=Q.openEnd(O)))U=!0}if(O>I)break;if(q=O,j<=0)Z.next();if(j>=0)Q.next()}}function sX(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(Z[Q]!=J[Q]&&!tX(Z[Q],J[Q]))return!1;return!0}function qZ(Z,J){for(let Q=J,X=Z.length-1;Q<X;Q++)Z[Q]=Z[Q+1];Z.pop()}function WZ(Z,J,Q){for(let X=Z.length-1;X>=J;X--)Z[X+1]=Z[X];Z[J]=Q}function lU(Z,J){let Q=-1,X=1e9;for(let Y=0;Y<J.length;Y++)if((J[Y]-X||Z[Y].endSide-Z[Q].endSide)<0)Q=Y,X=J[Y];return Q}function n8(Z,J,Q=Z.length){let X=0;for(let Y=0;Y<Q&&Y<Z.length;)if(Z.charCodeAt(Y)==9)X+=J-X%J,Y++;else X++,Y=I0(Z,Y);return X}function Gz(Z,J,Q,X){for(let Y=0,K=0;;){if(K>=J)return Y;if(Y==Z.length)break;K+=Z.charCodeAt(Y)==9?Q-K%Q:1,Y=I0(Z,Y)}return X===!0?-1:Z.length}var Uz=typeof Symbol>"u"?"__"+"ͼ":Symbol.for("ͼ"),JY=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),zz=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class P6{constructor(Z,J){this.rules=[];let{finish:Q}=J||{};function X(K){return/^@/.test(K)?[K]:K.split(/,\s*/)}function Y(K,I,q,W){let G=[],U=/^@(\w+)\b/.exec(K[0]),z=U&&U[1]=="keyframes";if(U&&I==null)return q.push(K[0]+";");for(let j in I){let O=I[j];if(/&/.test(j))Y(j.split(/,\s*/).map((H)=>K.map((N)=>H.replace(/&/,N))).reduce((H,N)=>H.concat(N)),O,q);else if(O&&typeof O=="object"){if(!U)throw RangeError("The value of a property ("+j+") should be a primitive value.");Y(X(j),O,G,z)}else if(O!=null)G.push(j.replace(/_.*/,"").replace(/[A-Z]/g,(H)=>"-"+H.toLowerCase())+": "+O+";")}if(G.length||z)q.push((Q&&!U&&!W?K.map(Q):K).join(", ")+" {"+G.join(" ")+"}")}for(let K in Z)Y(X(K),Z[K],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let Z=zz[Uz]||1;return zz[Uz]=Z+1,"ͼ"+Z.toString(36)}static mount(Z,J,Q){let X=Z[JY],Y=Q&&Q.nonce;if(!X)X=new jz(Z,Y);else if(Y)X.setNonce(Y);X.mount(Array.isArray(J)?J:[J],Z)}}var Vz=new Map;class jz{constructor(Z,J){let Q=Z.ownerDocument||Z,X=Q.defaultView;if(!Z.head&&Z.adoptedStyleSheets&&X.CSSStyleSheet){let Y=Vz.get(Q);if(Y)return Z[JY]=Y;this.sheet=new X.CSSStyleSheet,Vz.set(Q,this)}else if(this.styleTag=Q.createElement("style"),J)this.styleTag.setAttribute("nonce",J);this.modules=[],Z[JY]=this}mount(Z,J){let Q=this.sheet,X=0,Y=0;for(let K=0;K<Z.length;K++){let I=Z[K],q=this.modules.indexOf(I);if(q<Y&&q>-1)this.modules.splice(q,1),Y--,q=-1;if(q==-1){if(this.modules.splice(Y++,0,I),Q)for(let W=0;W<I.rules.length;W++)Q.insertRule(I.rules[W],X++)}else{while(Y<q)X+=this.modules[Y++].rules.length;X+=I.rules.length,Y++}}if(Q){if(J.adoptedStyleSheets.indexOf(this.sheet)<0)J.adoptedStyleSheets=[this.sheet,...J.adoptedStyleSheets]}else{let K="";for(let q=0;q<this.modules.length;q++)K+=this.modules[q].getRules()+`
`;this.styleTag.textContent=K;let I=J.head||J;if(this.styleTag.parentNode!=I)I.insertBefore(this.styleTag,I.firstChild)}}setNonce(Z){if(this.styleTag&&this.styleTag.getAttribute("nonce")!=Z)this.styleTag.setAttribute("nonce",Z)}}var D4={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},k7={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},BR=typeof navigator<"u"&&/Mac/.test(navigator.platform),PR=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(p1=0;p1<10;p1++)D4[48+p1]=D4[96+p1]=String(p1);var p1;for(p1=1;p1<=24;p1++)D4[p1+111]="F"+p1;var p1;for(p1=65;p1<=90;p1++)D4[p1]=String.fromCharCode(p1+32),k7[p1]=String.fromCharCode(p1);var p1;for(Y5 in D4)if(!k7.hasOwnProperty(Y5))k7[Y5]=D4[Y5];var Y5;function Oz(Z){var J=BR&&Z.metaKey&&Z.shiftKey&&!Z.ctrlKey&&!Z.altKey||PR&&Z.shiftKey&&Z.key&&Z.key.length==1||Z.key=="Unidentified",Q=!J&&Z.key||(Z.shiftKey?k7:D4)[Z.keyCode]||Z.key||"Unidentified";if(Q=="Esc")Q="Escape";if(Q=="Del")Q="Delete";if(Q=="Left")Q="ArrowLeft";if(Q=="Up")Q="ArrowUp";if(Q=="Right")Q="ArrowRight";if(Q=="Down")Q="ArrowDown";return Q}function c0(){var Z=arguments[0];if(typeof Z=="string")Z=document.createElement(Z);var J=1,Q=arguments[1];if(Q&&typeof Q=="object"&&Q.nodeType==null&&!Array.isArray(Q)){for(var X in Q)if(Object.prototype.hasOwnProperty.call(Q,X)){var Y=Q[X];if(typeof Y=="string")Z.setAttribute(X,Y);else if(Y!=null)Z[X]=Y}J++}for(;J<arguments.length;J++)Fz(Z,arguments[J]);return Z}function Fz(Z,J){if(typeof J=="string")Z.appendChild(document.createTextNode(J));else if(J==null);else if(J.nodeType!=null)Z.appendChild(J);else if(Array.isArray(J))for(var Q=0;Q<J.length;Q++)Fz(Z,J[Q]);else throw RangeError("Unsupported child node: "+J)}var _0=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},UY=typeof document<"u"?document:{documentElement:{style:{}}},zY=/Edge\/(\d+)/.exec(_0.userAgent),oz=/MSIE \d/.test(_0.userAgent),VY=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(_0.userAgent),uZ=!!(oz||VY||zY),Hz=!uZ&&/gecko\/(\d+)/i.test(_0.userAgent),QY=!uZ&&/Chrome\/(\d+)/.exec(_0.userAgent),Nz="webkitFontSmoothing"in UY.documentElement.style,jY=!uZ&&/Apple Computer/.test(_0.vendor),Rz=jY&&(/Mobile\/\w+/.test(_0.userAgent)||_0.maxTouchPoints>2),r={mac:Rz||/Mac/.test(_0.platform),windows:/Win/.test(_0.platform),linux:/Linux|X11/.test(_0.platform),ie:uZ,ie_version:oz?UY.documentMode||6:VY?+VY[1]:zY?+zY[1]:0,gecko:Hz,gecko_version:Hz?+(/Firefox\/(\d+)/.exec(_0.userAgent)||[0,0])[1]:0,chrome:!!QY,chrome_version:QY?+QY[1]:0,ios:Rz,android:/Android\b/.test(_0.userAgent),webkit:Nz,webkit_version:Nz?+(/\bAppleWebKit\/(\d+)/.exec(_0.userAgent)||[0,0])[1]:0,safari:jY,safari_version:jY?+(/\bVersion\/(\d+(\.\d+)?)/.exec(_0.userAgent)||[0,0])[1]:0,tabSize:UY.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function bY(Z,J){for(let Q in Z)if(Q=="class"&&J.class)J.class+=" "+Z.class;else if(Q=="style"&&J.style)J.style+=";"+Z.style;else J[Q]=Z[Q];return J}var wZ=Object.create(null);function xY(Z,J,Q){if(Z==J)return!0;if(!Z)Z=wZ;if(!J)J=wZ;let X=Object.keys(Z),Y=Object.keys(J);if(X.length-(Q&&X.indexOf(Q)>-1?1:0)!=Y.length-(Q&&Y.indexOf(Q)>-1?1:0))return!1;for(let K of X)if(K!=Q&&(Y.indexOf(K)==-1||Z[K]!==J[K]))return!1;return!0}function SR(Z,J){for(let Q=Z.attributes.length-1;Q>=0;Q--){let X=Z.attributes[Q].name;if(J[X]==null)Z.removeAttribute(X)}for(let Q in J){let X=J[Q];if(Q=="style")Z.style.cssText=X;else if(Z.getAttribute(Q)!=X)Z.setAttribute(Q,X)}}function Mz(Z,J,Q){let X=!1;if(J){for(let Y in J)if(!(Q&&(Y in Q)))if(X=!0,Y=="style")Z.style.cssText="";else Z.removeAttribute(Y)}if(Q){for(let Y in Q)if(!(J&&J[Y]==Q[Y]))if(X=!0,Y=="style")Z.style.cssText=Q[Y];else Z.setAttribute(Y,Q[Y])}return X}function TR(Z){let J=Object.create(null);for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];J[X.name]=X.value}return J}class a4{eq(Z){return!1}updateDOM(Z,J,Q){return!1}compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(Z){return!0}coordsAt(Z,J,Q){return null}get isHidden(){return!1}get editable(){return!1}destroy(Z){}}var V0=function(Z){return Z[Z.Text=0]="Text",Z[Z.WidgetBefore=1]="WidgetBefore",Z[Z.WidgetAfter=2]="WidgetAfter",Z[Z.WidgetRange=3]="WidgetRange",Z}(V0||(V0={}));class P1 extends N4{constructor(Z,J,Q,X){super();this.startSide=Z,this.endSide=J,this.widget=Q,this.spec=X}get heightRelevant(){return!1}static mark(Z){return new H5(Z)}static widget(Z){let J=Math.max(-1e4,Math.min(1e4,Z.side||0)),Q=!!Z.block;return J+=Q&&!Z.inlineOrder?J>0?300000000:-400000000:J>0?1e8:-1e8,new c8(Z,J,J,Q,Z.widget||null,!1)}static replace(Z){let J=!!Z.block,Q,X;if(Z.isBlockGap)Q=-500000000,X=400000000;else{let{start:Y,end:K}=tz(Z,J);Q=(Y?J?-300000000:-1:500000000)-1,X=(K?J?200000000:1:-600000000)+1}return new c8(Z,Q,X,J,Z.widget||null,!0)}static line(Z){return new N5(Z)}static set(Z,J=!1){return N1.of(Z,J)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}P1.none=N1.empty;class H5 extends P1{constructor(Z){let{start:J,end:Q}=tz(Z);super(J?-1:500000000,Q?1:-600000000,null,Z);this.tagName=Z.tagName||"span",this.attrs=Z.class&&Z.attributes?bY(Z.attributes,{class:Z.class}):Z.class?{class:Z.class}:Z.attributes||wZ}eq(Z){return this==Z||Z instanceof H5&&this.tagName==Z.tagName&&xY(this.attrs,Z.attrs)}range(Z,J=Z){if(Z>=J)throw RangeError("Mark decorations may not be empty");return super.range(Z,J)}}H5.prototype.point=!1;class N5 extends P1{constructor(Z){super(-200000000,-200000000,null,Z)}eq(Z){return Z instanceof N5&&this.spec.class==Z.spec.class&&xY(this.spec.attributes,Z.spec.attributes)}range(Z,J=Z){if(J!=Z)throw RangeError("Line decoration ranges must be zero-length");return super.range(Z,J)}}N5.prototype.mapMode=T0.TrackBefore;N5.prototype.point=!0;class c8 extends P1{constructor(Z,J,Q,X,Y,K){super(J,Q,Y,Z);this.block=X,this.isReplace=K,this.mapMode=!X?T0.TrackDel:J<=0?T0.TrackBefore:T0.TrackAfter}get type(){return this.startSide!=this.endSide?V0.WidgetRange:this.startSide<=0?V0.WidgetBefore:V0.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(Z){return Z instanceof c8&&_R(this.widget,Z.widget)&&this.block==Z.block&&this.startSide==Z.startSide&&this.endSide==Z.endSide}range(Z,J=Z){if(this.isReplace&&(Z>J||Z==J&&this.startSide>0&&this.endSide<=0))throw RangeError("Invalid range for replacement decoration");if(!this.isReplace&&J!=Z)throw RangeError("Widget decorations can only have zero-length ranges");return super.range(Z,J)}}c8.prototype.point=!0;function tz(Z,J=!1){let{inclusiveStart:Q,inclusiveEnd:X}=Z;if(Q==null)Q=Z.inclusive;if(X==null)X=Z.inclusive;return{start:Q!==null&&Q!==void 0?Q:J,end:X!==null&&X!==void 0?X:J}}function _R(Z,J){return Z==J||!!(Z&&J&&Z.compare(J))}function g7(Z,J,Q,X=0){let Y=Q.length-1;if(Y>=0&&Q[Y]+X>=Z)Q[Y]=Math.max(Q[Y],J);else Q.push(Z,J)}class V5 extends N4{constructor(Z,J,Q){super();this.tagName=Z,this.attributes=J,this.rank=Q}eq(Z){return Z==this||Z instanceof V5&&this.tagName==Z.tagName&&xY(this.attributes,Z.attributes)}static create(Z){return new V5(Z.tagName,Z.attributes||wZ,Z.rank==null?50:Math.max(0,Math.min(Z.rank,100)))}static set(Z,J=!1){return N1.of(Z,J)}}V5.prototype.startSide=V5.prototype.endSide=-1;function j5(Z){let J;if(Z.nodeType==11)J=Z.getSelection?Z:Z.ownerDocument;else J=Z;return J.getSelection()}function OY(Z,J){return J?Z==J||Z.contains(J.nodeType!=1?J.parentNode:J):!1}function G5(Z,J){if(!J.anchorNode)return!1;try{return OY(Z,J.anchorNode)}catch(Q){return!1}}function LZ(Z){if(Z.nodeType==3)return O5(Z,0,Z.nodeValue.length).getClientRects();else if(Z.nodeType==1)return Z.getClientRects();else return[]}function U5(Z,J,Q,X){return Q?Az(Z,J,Q,X,-1)||Az(Z,J,Q,X,1):!1}function r4(Z){for(var J=0;;J++)if(Z=Z.previousSibling,!Z)return J}function hZ(Z){return Z.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(Z.nodeName)}function Az(Z,J,Q,X,Y){for(;;){if(Z==Q&&J==X)return!0;if(J==(Y<0?0:P4(Z))){if(Z.nodeName=="DIV")return!1;let K=Z.parentNode;if(!K||K.nodeType!=1)return!1;J=r4(Z)+(Y<0?0:1),Z=K}else if(Z.nodeType==1){if(Z=Z.childNodes[J+(Y<0?-1:0)],Z.nodeType==1&&Z.contentEditable=="false")return!1;J=Y<0?P4(Z):0}else return!1}}function P4(Z){return Z.nodeType==3?Z.nodeValue.length:Z.childNodes.length}function kZ(Z,J){let{left:Q,right:X}=Z;if(Q==X)return Z;let Y=J?Q:X;return{left:Y,right:Y,top:Z.top,bottom:Z.bottom}}function ER(Z){let J=Z.visualViewport;if(J)return{left:0,right:J.width,top:0,bottom:J.height};return{left:0,right:Z.innerWidth,top:0,bottom:Z.innerHeight}}function ez(Z,J){let Q=J.width/Z.offsetWidth,X=J.height/Z.offsetHeight;if(Q>0.995&&Q<1.005||!isFinite(Q)||Math.abs(J.width-Z.offsetWidth)<1)Q=1;if(X>0.995&&X<1.005||!isFinite(X)||Math.abs(J.height-Z.offsetHeight)<1)X=1;return{scaleX:Q,scaleY:X}}function CR(Z,J,Q,X,Y,K,I,q){let W=Z.ownerDocument,G=W.defaultView||window;for(let U=Z,z=!1;U&&!z;)if(U.nodeType==1){let j,O=U==W.body,H=1,N=1;if(O)j=ER(G);else{if(/^(fixed|sticky)$/.test(getComputedStyle(U).position))z=!0;if(U.scrollHeight<=U.clientHeight&&U.scrollWidth<=U.clientWidth){U=U.assignedSlot||U.parentNode;continue}let _=U.getBoundingClientRect();({scaleX:H,scaleY:N}=ez(U,_)),j={left:_.left,right:_.left+U.clientWidth*H,top:_.top,bottom:_.top+U.clientHeight*N}}let R=0,T=0;if(Y=="nearest"){if(J.top<j.top+I){if(T=J.top-(j.top+I),Q>0&&J.bottom>j.bottom+T)T=J.bottom-j.bottom+I}else if(J.bottom>j.bottom-I){if(T=J.bottom-j.bottom+I,Q<0&&J.top-T<j.top)T=J.top-(j.top+I)}}else{let _=J.bottom-J.top,C=j.bottom-j.top;T=(Y=="center"&&_<=C?J.top+_/2-C/2:Y=="start"||Y=="center"&&Q<0?J.top-I:J.bottom-C+I)-j.top}if(X=="nearest"){if(J.left<j.left+K){if(R=J.left-(j.left+K),Q>0&&J.right>j.right+R)R=J.right-j.right+K}else if(J.right>j.right-K){if(R=J.right-j.right+K,Q<0&&J.left<j.left+R)R=J.left-(j.left+K)}}else R=(X=="center"?J.left+(J.right-J.left)/2-(j.right-j.left)/2:X=="start"==q?J.left-K:J.right-(j.right-j.left)+K)-j.left;if(R||T)if(O)G.scrollBy(R,T);else{let _=0,C=0;if(T){let h=U.scrollTop;U.scrollTop+=T/N,C=(U.scrollTop-h)*N}if(R){let h=U.scrollLeft;U.scrollLeft+=R/H,_=(U.scrollLeft-h)*H}if(J={left:J.left-_,top:J.top-C,right:J.right-_,bottom:J.bottom-C},_&&Math.abs(_-R)<1)X="nearest";if(C&&Math.abs(C-T)<1)Y="nearest"}if(O)break;if(J.top<j.top||J.bottom>j.bottom||J.left<j.left||J.right>j.right)J={left:Math.max(J.left,j.left),right:Math.min(J.right,j.right),top:Math.max(J.top,j.top),bottom:Math.min(J.bottom,j.bottom)};U=U.assignedSlot||U.parentNode}else if(U.nodeType==11)U=U.host;else break}function Z2(Z,J=!0){let Q=Z.ownerDocument,X=null,Y=null;for(let K=Z.parentNode;K;)if(K==Q.body||(!J||X)&&Y)break;else if(K.nodeType==1){if(!Y&&K.scrollHeight>K.clientHeight)Y=K;if(J&&!X&&K.scrollWidth>K.clientWidth)X=K;K=K.assignedSlot||K.parentNode}else if(K.nodeType==11)K=K.host;else break;return{x:X,y:Y}}class J2{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(Z){return this.anchorNode==Z.anchorNode&&this.anchorOffset==Z.anchorOffset&&this.focusNode==Z.focusNode&&this.focusOffset==Z.focusOffset}setRange(Z){let{anchorNode:J,focusNode:Q}=Z;this.set(J,Math.min(Z.anchorOffset,J?P4(J):0),Q,Math.min(Z.focusOffset,Q?P4(Q):0))}set(Z,J,Q,X){this.anchorNode=Z,this.anchorOffset=J,this.focusNode=Q,this.focusOffset=X}}function Q2(Z){let J=[];for(let Q=Z;Q;Q=Q.nodeType==11?Q.host:Q.parentNode)if(Q.nodeType==1)J.push({node:Q,left:Q.scrollLeft,top:Q.scrollTop});return J}function X2(Z,J=!0){for(let{node:Q,left:X,top:Y}of Z){if(J&&Q.scrollTop!=Y)Q.scrollTop=Y;if(Q.scrollLeft!=X)Q.scrollLeft=X}}var v8=null;if(r.safari&&r.safari_version>=26)v8=!1;function Y2(Z){if(Z.setActive)return Z.setActive();if(v8)return Z.focus(v8);let J=Q2(Z);if(Z.focus(v8==null?{get preventScroll(){return v8={preventScroll:!0},!0}}:void 0),!v8)v8=!1,X2(J)}var Dz;function O5(Z,J,Q=J){let X=Dz||(Dz=document.createRange());return X.setEnd(Z,Q),X.setStart(Z,J),X}function f7(Z,J,Q,X){let Y={key:J,code:J,keyCode:Q,which:Q,cancelable:!0};if(X)({altKey:Y.altKey,ctrlKey:Y.ctrlKey,shiftKey:Y.shiftKey,metaKey:Y.metaKey}=X);let K=new KeyboardEvent("keydown",Y);K.synthetic=!0,Z.dispatchEvent(K);let I=new KeyboardEvent("keyup",Y);return I.synthetic=!0,Z.dispatchEvent(I),K.defaultPrevented||I.defaultPrevented}function wR(Z){while(Z){if(Z&&(Z.nodeType==9||Z.nodeType==11&&Z.host))return Z;Z=Z.assignedSlot||Z.parentNode}return null}function hR(Z,J){let{focusNode:Q,focusOffset:X}=J;if(!Q||J.anchorNode!=Q||J.anchorOffset!=X)return!1;X=Math.min(X,P4(Q));for(;;)if(X){if(Q.nodeType!=1)return!1;let Y=Q.childNodes[X-1];if(Y.contentEditable=="false")X--;else Q=Y,X=P4(Q)}else if(Q==Z)return!0;else X=r4(Q),Q=Q.parentNode}function K2(Z){if(Z instanceof Window)return Z.pageYOffset>Math.max(0,Z.document.documentElement.scrollHeight-Z.innerHeight-4);return Z.scrollTop>Math.max(1,Z.scrollHeight-Z.clientHeight-4)}function I2(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X>0)return{node:Q,offset:X};else if(Q.nodeType==1&&X>0){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X-1],X=P4(Q)}else if(Q.parentNode&&!hZ(Q))X=r4(Q),Q=Q.parentNode;else return null}function q2(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X<Q.nodeValue.length)return{node:Q,offset:X};else if(Q.nodeType==1&&X<Q.childNodes.length){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X],X=0}else if(Q.parentNode&&!hZ(Q))X=r4(Q)+1,Q=Q.parentNode;else return null}class _6{constructor(Z,J,Q=!0){this.node=Z,this.offset=J,this.precise=Q}static before(Z,J){return new _6(Z.parentNode,r4(Z),J)}static after(Z,J){return new _6(Z.parentNode,r4(Z)+1,J)}}var h1=function(Z){return Z[Z.LTR=0]="LTR",Z[Z.RTL=1]="RTL",Z}(h1||(h1={})),d8=h1.LTR,yY=h1.RTL;function W2(Z){let J=[];for(let Q=0;Q<Z.length;Q++)J.push(1<<+Z[Q]);return J}var kR=W2("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),bR=W2("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),FY=Object.create(null),l6=[];for(let Z of["()","[]","{}"]){let J=Z.charCodeAt(0),Q=Z.charCodeAt(1);FY[J]=Q,FY[Q]=-J}function G2(Z){return Z<=247?kR[Z]:1424<=Z&&Z<=1524?2:1536<=Z&&Z<=1785?bR[Z-1536]:1774<=Z&&Z<=2220?4:8192<=Z&&Z<=8204?256:64336<=Z&&Z<=65023?4:1}var xR=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class E6{get dir(){return this.level%2?yY:d8}constructor(Z,J,Q){this.from=Z,this.to=J,this.level=Q}side(Z,J){return this.dir==J==Z?this.to:this.from}forward(Z,J){return Z==(this.dir==J)}static find(Z,J,Q,X){let Y=-1;for(let K=0;K<Z.length;K++){let I=Z[K];if(I.from<=J&&I.to>=J){if(I.level==Q)return K;if(Y<0||(X!=0?X<0?I.from<J:I.to>J:Z[Y].level>I.level))Y=K}}if(Y<0)throw RangeError("Index out of range");return Y}}function U2(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.direction!=Y.direction||!U2(X.inner,Y.inner))return!1}return!0}var b1=[];function yR(Z,J,Q,X,Y){for(let K=0;K<=X.length;K++){let I=K?X[K-1].to:J,q=K<X.length?X[K].from:Q,W=K?256:Y;for(let G=I,U=W,z=W;G<q;G++){let j=G2(Z.charCodeAt(G));if(j==512)j=U;else if(j==8&&z==4)j=16;if(b1[G]=j==4?2:j,j&7)z=j;U=j}for(let G=I,U=W,z=W;G<q;G++){let j=b1[G];if(j==128)if(G<q-1&&U==b1[G+1]&&U&24)j=b1[G]=U;else b1[G]=256;else if(j==64){let O=G+1;while(O<q&&b1[O]==64)O++;let H=G&&U==8||O<Q&&b1[O]==8?z==1?1:8:256;for(let N=G;N<O;N++)b1[N]=H;G=O-1}else if(j==8&&z==1)b1[G]=1;if(U=j,j&7)z=j}}}function gR(Z,J,Q,X,Y){let K=Y==1?2:1;for(let I=0,q=0,W=0;I<=X.length;I++){let G=I?X[I-1].to:J,U=I<X.length?X[I].from:Q;for(let z=G,j,O,H;z<U;z++)if(O=FY[j=Z.charCodeAt(z)])if(O<0){for(let N=q-3;N>=0;N-=3)if(l6[N+1]==-O){let R=l6[N+2],T=R&2?Y:!(R&4)?0:R&1?K:Y;if(T)b1[z]=b1[l6[N]]=T;q=N;break}}else if(l6.length==189)break;else l6[q++]=z,l6[q++]=j,l6[q++]=W;else if((H=b1[z])==2||H==1){let N=H==Y;W=N?0:1;for(let R=q-3;R>=0;R-=3){let T=l6[R+2];if(T&2)break;if(N)l6[R+2]|=2;else{if(T&4)break;l6[R+2]|=4}}}}}function fR(Z,J,Q,X){for(let Y=0,K=X;Y<=Q.length;Y++){let I=Y?Q[Y-1].to:Z,q=Y<Q.length?Q[Y].from:J;for(let W=I;W<q;){let G=b1[W];if(G==256){let U=W+1;for(;;)if(U==q){if(Y==Q.length)break;U=Q[Y++].to,q=Y<Q.length?Q[Y].from:J}else if(b1[U]==256)U++;else break;let z=K==1,j=(U<J?b1[U]:X)==1,O=z==j?z?1:2:X;for(let H=U,N=Y,R=N?Q[N-1].to:Z;H>W;){if(H==R)H=Q[--N].from,R=N?Q[N-1].to:Z;b1[--H]=O}W=U}else K=G,W++}}}function HY(Z,J,Q,X,Y,K,I){let q=X%2?2:1;if(X%2==Y%2)for(let W=J,G=0;W<Q;){let U=!0,z=!1;if(G==K.length||W<K[G].from){let N=b1[W];if(N!=q)U=!1,z=N==16}let j=!U&&q==1?[]:null,O=U?X:X+1,H=W;Z:for(;;)if(G<K.length&&H==K[G].from){if(z)break Z;let N=K[G];if(!U)for(let R=N.to,T=G+1;;){if(R==Q)break Z;if(T<K.length&&K[T].from==R)R=K[T++].to;else if(b1[R]==q)break Z;else break}if(G++,j)j.push(N);else{if(N.from>W)I.push(new E6(W,N.from,O));let R=N.direction==d8!=!(O%2);NY(Z,R?X+1:X,Y,N.inner,N.from,N.to,I),W=N.to}H=N.to}else if(H==Q||(U?b1[H]!=q:b1[H]==q))break;else H++;if(j)HY(Z,W,H,X+1,Y,j,I);else if(W<H)I.push(new E6(W,H,O));W=H}else for(let W=Q,G=K.length;W>J;){let U=!0,z=!1;if(!G||W>K[G-1].to){let N=b1[W-1];if(N!=q)U=!1,z=N==16}let j=!U&&q==1?[]:null,O=U?X:X+1,H=W;Z:for(;;)if(G&&H==K[G-1].to){if(z)break Z;let N=K[--G];if(!U)for(let R=N.from,T=G;;){if(R==J)break Z;if(T&&K[T-1].to==R)R=K[--T].from;else if(b1[R-1]==q)break Z;else break}if(j)j.push(N);else{if(N.to<W)I.push(new E6(N.to,W,O));let R=N.direction==d8!=!(O%2);NY(Z,R?X+1:X,Y,N.inner,N.from,N.to,I),W=N.from}H=N.from}else if(H==J||(U?b1[H-1]!=q:b1[H-1]==q))break;else H--;if(j)HY(Z,H,W,X+1,Y,j,I);else if(H<W)I.push(new E6(H,W,O));W=H}}function NY(Z,J,Q,X,Y,K,I){let q=J%2?2:1;yR(Z,Y,K,X,q),gR(Z,Y,K,X,q),fR(Y,K,X,q),HY(Z,Y,K,J,Q,X,I)}function $R(Z,J,Q){if(!Z)return[new E6(0,0,J==yY?1:0)];if(J==d8&&!Q.length&&!xR.test(Z))return z2(Z.length);if(Q.length)while(Z.length>b1.length)b1[b1.length]=256;let X=[],Y=J==d8?0:1;return NY(Z,Y,Y,Q,0,Z.length,X),X}function z2(Z){return[new E6(0,Z,0)]}var V2="";function uR(Z,J,Q,X,Y){var K;let I=X.head-Z.from,q=E6.find(J,I,(K=X.bidiLevel)!==null&&K!==void 0?K:-1,X.assoc),W=J[q],G=W.side(Y,Q);if(I==G){let j=q+=Y?1:-1;if(j<0||j>=J.length)return null;W=J[q=j],I=W.side(!Y,Q),G=W.side(Y,Q)}let U=I0(Z.text,I,W.forward(Y,Q));if(U<W.from||U>W.to)U=G;V2=Z.text.slice(Math.min(I,U),Math.max(I,U));let z=q==(Y?J.length-1:0)?null:J[q+(Y?1:-1)];if(z&&U==G&&z.level+(Y?0:1)<W.level)return u.cursor(z.side(!Y,Q)+Z.from,z.forward(Y,Q)?1:-1,z.level);return u.cursor(U+Z.from,W.forward(Y,Q)?-1:1,W.level)}function nR(Z,J,Q){for(let X=J;X<Q;X++){let Y=G2(Z.charCodeAt(X));if(Y==1)return d8;if(Y==2||Y==4)return yY}return d8}var j2=o.define(),O2=o.define(),F2=o.define(),H2=o.define(),RY=o.define(),N2=o.define(),R2=o.define(),gY=o.define(),fY=o.define(),M2=o.define({combine:(Z)=>Z.some((J)=>J)}),A2=o.define({combine:(Z)=>Z.some((J)=>J)}),D2=o.define();class $7{constructor(Z,J,Q,X,Y,K=!1){this.range=Z,this.y=J,this.x=Q,this.yMargin=X,this.xMargin=Y,this.isSnapshot=K}map(Z){return Z.empty?this:new $7(this.range.map(Z),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(Z){return this.range.to<=Z.doc.length?this:new $7(u.cursor(Z.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}var jZ=B1.define({map:(Z,J)=>Z.map(J)}),L2=B1.define();function s0(Z,J,Q){let X=Z.facet(H2);if(X.length)X[0](J);else if(window.onerror&&window.onerror(String(J),Q,void 0,void 0,J));else if(Q)console.error(Q+":",J);else console.error(J)}var L4=o.define({combine:(Z)=>Z.length?Z[0]:!0}),vR=0,x7=o.define({combine(Z){return Z.filter((J,Q)=>{for(let X=0;X<Q;X++)if(Z[X].plugin==J.plugin)return!1;return!0})}});class M0{constructor(Z,J,Q,X,Y){this.id=Z,this.create=J,this.domEventHandlers=Q,this.domEventObservers=X,this.baseExtensions=Y(this),this.extension=this.baseExtensions.concat(x7.of({plugin:this,arg:void 0}))}of(Z){return this.baseExtensions.concat(x7.of({plugin:this,arg:Z}))}static define(Z,J){let{eventHandlers:Q,eventObservers:X,provide:Y,decorations:K}=J||{};return new M0(vR++,Z,Q,X,(I)=>{let q=[];if(K)q.push(nZ.of((W)=>{let G=W.plugin(I);return G?K(G):P1.none}));if(Y)q.push(Y(I));return q})}static fromClass(Z,J){return M0.define((Q,X)=>new Z(Q,X),J)}}class BZ{constructor(Z){this.spec=Z,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(Z){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(Z,this.spec.arg)}catch(J){s0(Z.state,J,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let J=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(J)}catch(Q){if(s0(J.state,Q,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(X){}this.deactivate()}}return this}destroy(Z){var J;if((J=this.value)===null||J===void 0?void 0:J.destroy)try{this.value.destroy()}catch(Q){s0(Z.state,Q,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}var B2=o.define(),$Y=o.define(),nZ=o.define(),P2=o.define(),uY=o.define(),R5=o.define(),S2=o.define();function Lz(Z,J){let Q=Z.state.facet(S2);if(!Q.length)return Q;let X=Q.map((K)=>K instanceof Function?K(Z):K),Y=[];return N1.spans(X,J.from,J.to,{point(){},span(K,I,q,W){let G=K-J.from,U=I-J.from,z=Y;for(let j=q.length-1;j>=0;j--,W--){let O=q[j].spec.bidiIsolate,H;if(O==null)O=nR(J.text,G,U);if(W>0&&z.length&&(H=z[z.length-1]).to==G&&H.direction==O)H.to=U,z=H.inner;else{let N={from:G,to:U,direction:O,inner:[]};z.push(N),z=N.inner}}}}),Y}var T2=o.define();function nY(Z){let J=0,Q=0,X=0,Y=0;for(let K of Z.state.facet(T2)){let I=K(Z);if(I){if(I.left!=null)J=Math.max(J,I.left);if(I.right!=null)Q=Math.max(Q,I.right);if(I.top!=null)X=Math.max(X,I.top);if(I.bottom!=null)Y=Math.max(Y,I.bottom)}}return{left:J,right:Q,top:X,bottom:Y}}var K5=o.define();class J6{constructor(Z,J,Q,X){this.fromA=Z,this.toA=J,this.fromB=Q,this.toB=X}join(Z){return new J6(Math.min(this.fromA,Z.fromA),Math.max(this.toA,Z.toA),Math.min(this.fromB,Z.fromB),Math.max(this.toB,Z.toB))}addToSet(Z){let J=Z.length,Q=this;for(;J>0;J--){let X=Z[J-1];if(X.fromA>Q.toA)continue;if(X.toA<Q.fromA)break;Q=Q.join(X),Z.splice(J-1,1)}return Z.splice(J,0,Q),Z}static extendWithRanges(Z,J){if(J.length==0)return Z;let Q=[];for(let X=0,Y=0,K=0;;){let I=X<Z.length?Z[X].fromB:1e9,q=Y<J.length?J[Y]:1e9,W=Math.min(I,q);if(W==1e9)break;let G=W+K,U=W,z=G;for(;;)if(Y<J.length&&J[Y]<=U){let j=J[Y+1];Y+=2,U=Math.max(U,j);for(let O=X;O<Z.length&&Z[O].fromB<=U;O++)K=Z[O].toA-Z[O].toB;z=Math.max(z,j+K)}else if(X<Z.length&&Z[X].fromB<=U){let j=Z[X++];U=Math.max(U,j.toB),z=Math.max(z,j.toA),K=j.toA-j.toB}else break;Q.push(new J6(G,z,W,U))}return Q}}class bZ{constructor(Z,J,Q){this.view=Z,this.state=J,this.transactions=Q,this.flags=0,this.startState=Z.state,this.changes=a1.empty(this.startState.doc.length);for(let Y of Q)this.changes=this.changes.compose(Y.changes);let X=[];this.changes.iterChangedRanges((Y,K,I,q)=>X.push(new J6(Y,K,I,q))),this.changedRanges=X}static create(Z,J,Q){return new bZ(Z,J,Q)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some((Z)=>Z.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}var mR=[];class c1{constructor(Z,J,Q=0){this.dom=Z,this.length=J,this.flags=Q,this.parent=null,Z.cmTile=this}get breakAfter(){return this.flags&1}get children(){return mR}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(Z){if(this.flags|=2,this.flags&4){this.flags&=-5;let J=this.domAttrs;if(J)SR(this.dom,J)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(Z){this.dom=Z,Z.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(Z,J=this.posAtStart){let Q=J;for(let X of this.children){if(X==Z)return Q;Q+=X.length+X.breakAfter}throw RangeError("Invalid child in posBefore")}posAfter(Z){return this.posBefore(Z)+Z.length}covers(Z){return!0}coordsIn(Z,J,Q){return null}domPosFor(Z,J){let Q=r4(this.dom),X=this.length?Z>0:J>0;return new _6(this.parent.dom,Q+(X?1:0),Z==0||Z==this.length)}markDirty(Z){if(this.flags&=-3,Z)this.flags|=4;if(this.parent&&this.parent.flags&2)this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let Z=this;Z;Z=Z.parent)if(Z instanceof A5)return Z;return null}static get(Z){return Z.cmTile}}class M5 extends c1{constructor(Z){super(Z,0);this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(Z){this.children.push(Z),Z.parent=this}sync(Z){if(this.flags&2)return;super.sync(Z);let J=this.dom,Q=null,X,Y=(Z===null||Z===void 0?void 0:Z.node)==J?Z:null,K=0;for(let I of this.children){if(I.sync(Z),K+=I.length+I.breakAfter,X=Q?Q.nextSibling:J.firstChild,Y&&X!=I.dom)Y.written=!0;if(I.dom.parentNode==J)while(X&&X!=I.dom)X=Bz(X);else J.insertBefore(I.dom,X);Q=I.dom}if(X=Q?Q.nextSibling:J.firstChild,Y&&X)Y.written=!0;while(X)X=Bz(X);this.length=K}}function Bz(Z){let J=Z.nextSibling;return Z.parentNode.removeChild(Z),J}class A5 extends M5{constructor(Z,J){super(J);this.view=Z}owns(Z){for(;Z;Z=Z.parent)if(Z==this)return!0;return!1}isBlock(){return!0}nearest(Z){for(;;){if(!Z)return null;let J=c1.get(Z);if(J&&this.owns(J))return J;Z=Z.parentNode}}blockTiles(Z){for(let J=[],Q=this,X=0,Y=0;;)if(X==Q.children.length){if(!J.length)return;if(Q=Q.parent,Q.breakAfter)Y++;X=J.pop()}else{let K=Q.children[X++];if(K instanceof B4)J.push(X),Q=K,X=0;else{let I=Y+K.length,q=Z(K,Y);if(q!==void 0)return q;Y=I+K.breakAfter}}}resolveBlock(Z,J){let Q,X=-1,Y,K=-1;if(this.blockTiles((I,q)=>{let W=q+I.length;if(Z>=q&&Z<=W){if(I.isWidget()&&J>=-1&&J<=1){if(I.flags&32)return!0;if(I.flags&16)Q=void 0}if((q<Z||Z==W&&(J<-1?I.length:I.covers(1)))&&(!Q||!I.isWidget()&&Q.isWidget()))Q=I,X=Z-q;if((W>Z||Z==q&&(J>1?I.length:I.covers(-1)))&&(!Y||!I.isWidget()&&Y.isWidget()))Y=I,K=Z-q}}),!Q&&!Y)throw Error("No tile at position "+Z);return Q&&J<0||!Y?{tile:Q,offset:X}:{tile:Y,offset:K}}}class B4 extends M5{constructor(Z,J){super(Z);this.wrapper=J}isBlock(){return!0}covers(Z){if(!this.children.length)return!1;return Z<0?this.children[0].covers(-1):this.lastChild.covers(1)}get domAttrs(){return this.wrapper.attributes}static of(Z,J){let Q=new B4(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class u7 extends M5{constructor(Z,J){super(Z);this.attrs=J}isLine(){return!0}static start(Z,J,Q){let X=new u7(J||document.createElement("div"),Z);if(!J||!Q)X.flags|=4;return X}get domAttrs(){return this.attrs}resolveInline(Z,J,Q){let X=null,Y=-1,K=null,I=-1;function q(G,U){for(let z=0,j=0;z<G.children.length&&j<=U;z++){let O=G.children[z],H=j+O.length;if(H>=U){if(O.isComposite())q(O,U-j);else if((!K||K.isHidden&&(J>0&&!(K.flags&32)||Q&&cR(K,O)))&&(H>U||O.flags&32&&J<=1))K=O,I=U-j;else if(j<U||O.flags&16&&!O.isHidden&&J>=-1)X=O,Y=U-j}j=H}}q(this,Z);let W=(J<0?X:K)||X||K;return W?{tile:W,offset:W==X?Y:I}:null}coordsIn(Z,J,Q){let X=this.resolveInline(Z,J,!0);if(!X)return pR(this);return X.tile.coordsIn(Math.max(0,X.offset),J,Q)}domIn(Z,J){let Q=this.resolveInline(Z,J);if(Q){let{tile:X,offset:Y}=Q;if(this.dom.contains(X.dom)){if(X.isText())return new _6(X.dom,Math.min(X.dom.nodeValue.length,Y));return X.domPosFor(Y,X.flags&16?1:X.flags&32?-1:J)}let K=Q.tile.parent,I=!1;for(let q of K.children){if(I)return new _6(q.dom,0);if(q==Q.tile)I=!0}}return new _6(this.dom,0)}}function pR(Z){let J=Z.dom.lastChild;if(!J)return Z.dom.getBoundingClientRect();let Q=LZ(J);return Q[Q.length-1]||null}function cR(Z,J){let Q=Z.coordsIn(0,1),X=J.coordsIn(0,1);return Q&&X&&X.top<Q.bottom}class f0 extends M5{constructor(Z,J){super(Z);this.mark=J}get domAttrs(){return this.mark.attrs}static of(Z,J){let Q=new f0(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class m8 extends c1{constructor(Z,J){super(Z,J.length);this.text=J}sync(Z){if(this.flags&2)return;if(super.sync(Z),this.dom.nodeValue!=this.text){if(Z&&Z.node==this.dom)Z.written=!0;this.dom.nodeValue=this.text}}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(Z,J,Q){let X=this.dom.nodeValue.length;if(Z>X)Z=X;let Y=Z,K=Z,I=0;if(Z==0&&J<0||Z==X&&J>=0){if(!(r.chrome||r.gecko)){if(Z)Y--,I=1;else if(K<X)K++,I=-1}}else if(J<0)Y--;else if(K<X)K++;let q=O5(this.dom,Y,K).getClientRects();if(!q.length)return null;let W=q[(I?I<0:J>=0)?0:q.length-1];if(r.safari&&!I&&W.width==0)W=Array.prototype.find.call(q,(G)=>G.width)||W;return Q==null?W:kZ(W,(I?I>0:J<0)==Q)}static of(Z,J){let Q=new m8(J||document.createTextNode(Z),Z);if(!J)Q.flags|=2;return Q}}class s8 extends c1{constructor(Z,J,Q,X){super(Z,J,X);this.widget=Q}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(Z){if(this.flags&48)return!1;return(this.flags&(Z<0?64:128))>0}coordsIn(Z,J){return this.coordsInWidget(Z,J,!1)}coordsInWidget(Z,J,Q){let X=this.widget.coordsAt(this.dom,Z,J);if(X)return X;if(Q)return kZ(this.dom.getBoundingClientRect(),this.length?Z==0:J<=0);else{let Y=this.dom.getClientRects(),K=null;if(!Y.length)return null;let I=this.flags&16?!0:this.flags&32?!1:Z>0;for(let q=I?Y.length-1:0;;q+=I?-1:1)if(K=Y[q],Z>0?q==0:q==Y.length-1||K.top<K.bottom)break;return kZ(K,!I)}}get overrideDOMText(){if(!this.length)return R1.empty;let{root:Z}=this;if(!Z)return R1.empty;let J=this.posAtStart;return Z.view.state.doc.slice(J,J+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(Z,J,Q,X,Y){if(!Y){if(Y=Z.toDOM(J),!Z.editable)Y.contentEditable="false"}return new s8(Y,Q,Z,X)}}class F5 extends c1{constructor(Z){let J=document.createElement("img");J.className="cm-widgetBuffer",J.setAttribute("aria-hidden","true");super(J,0,Z)}get isHidden(){return!0}get overrideDOMText(){return R1.empty}coordsIn(Z,J,Q){let X=this.dom.getBoundingClientRect();return Q==null?X:kZ(X,J>0==Q)}}class _2{constructor(Z){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=Z}advance(Z,J,Q){let{tile:X,index:Y,beforeBreak:K,parents:I}=this;while(Z||J>0)if(!X.isComposite()){let q=X.length;if(Y<q&&Z){let W=Math.min(Z,q-Y);if(Q)Q.skip(X,Y,Y+W);Z-=W,Y+=W}if(Y==q)K=!!X.breakAfter,{tile:X,index:Y}=I.pop(),Y++;else if(!Z)break}else if(K){if(!Z)break;if(Q)Q.break();Z--,K=!1}else if(Y==X.children.length){if(!Z&&!I.length)break;if(Q)Q.leave(X);K=!!X.breakAfter,{tile:X,index:Y}=I.pop(),Y++}else{let q=X.children[Y],W=q.breakAfter;if((J>0?q.length<=Z:q.length<Z)&&(!Q||Q.skip(q,0,q.length)!==!1||!q.isComposite))K=!!W,Y++,Z-=q.length;else if(I.push({tile:X,index:Y}),X=q,Y=0,Q&&q.isComposite())Q.enter(q)}return this.tile=X,this.index=Y,this.beforeBreak=K,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class E2{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.wrapper=Q,this.rank=X}}class C2{constructor(Z,J,Q){this.cache=Z,this.root=J,this.blockWrappers=Q,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(Z,J,Q,X){var Y;this.flushBuffer();let K=this.ensureMarks(J,Q),I=K.lastChild;if(I&&I.isText()&&!(I.flags&8)&&I.length+Z.length<512){this.cache.reused.set(I,2);let q=K.children[K.children.length-1]=new m8(I.dom,I.text+Z);q.parent=K}else K.append(X||m8.of(Z,(Y=this.cache.find(m8))===null||Y===void 0?void 0:Y.dom));this.pos+=Z.length,this.afterWidget=null}addComposition(Z,J){let Q=this.curLine;if(Q.dom!=J.line.dom)Q.setDOM(this.cache.reused.has(J.line)?XY(J.line.dom):J.line.dom),this.cache.reused.set(J.line,2);let X=Q;for(let I=J.marks.length-1;I>=0;I--){let q=J.marks[I],W=X.lastChild;if(W instanceof f0&&W.mark.eq(q.mark)){if(W.dom!=q.dom)W.setDOM(XY(q.dom));X=W}else{if(this.cache.reused.get(q)){let U=c1.get(q.dom);if(U)U.setDOM(XY(q.dom))}let G=f0.of(q.mark,q.dom);X.append(G),X=G}this.cache.reused.set(q,2)}let Y=c1.get(Z.text);if(Y)this.cache.reused.set(Y,2);let K=new m8(Z.text,Z.text.nodeValue);K.flags|=8,this.pos=Z.range.toB,X.append(K)}addInlineWidget(Z,J,Q){let X=this.afterWidget&&Z.flags&48&&(this.afterWidget.flags&48)==(Z.flags&48);if(!X)this.flushBuffer();let Y=this.ensureMarks(J,Q);if(!X&&!(Z.flags&16))Y.append(this.getBuffer(1));Y.append(Z),this.pos+=Z.length,this.afterWidget=Z}addMark(Z,J,Q){this.flushBuffer(),this.ensureMarks(J,Q).append(Z),this.pos+=Z.length,this.afterWidget=null}addBlockWidget(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}continueWidget(Z){let J=this.afterWidget||this.lastBlock;J.length+=Z,this.pos+=Z}addLineStart(Z,J){var Q;if(!Z)Z=b2;let X=u7.start(Z,J||((Q=this.cache.find(u7))===null||Q===void 0?void 0:Q.dom),!!J);this.getBlockPos().append(this.lastBlock=this.curLine=X)}addLine(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(Z){if(!this.blockPosCovered())this.addLineStart(Z)}ensureLine(Z){if(!this.curLine)this.addLineStart(Z)}ensureMarks(Z,J){var Q;let X=this.curLine;for(let Y=Z.length-1;Y>=0;Y--){let K=Z[Y],I;if(J>0&&(I=X.lastChild)&&I instanceof f0&&I.mark.eq(K))X=I,J--;else{let q=f0.of(K,(Q=this.cache.find(f0,(W)=>W.mark.eq(K)))===null||Q===void 0?void 0:Q.dom);X.append(q),X=q,J=0}}return X}endLine(){if(this.curLine){this.flushBuffer();let Z=this.curLine.lastChild;if(!Z||!Pz(this.curLine,!1)||Z.dom.nodeName!="BR"&&Z.isWidget()&&!(r.ios&&Pz(this.curLine,!0)))this.curLine.append(this.cache.findWidget(YY,0,32)||new s8(YY.toDOM(),0,YY,32));this.curLine=this.afterWidget=null}}updateBlockWrappers(){if(this.wrapperPos>this.pos+1e4)this.blockWrappers.goto(this.pos),this.wrappers.length=0;for(let Z=this.wrappers.length-1;Z>=0;Z--)if(this.wrappers[Z].to<this.pos)this.wrappers.splice(Z,1);for(let Z=this.blockWrappers;Z.value&&Z.from<=this.pos;Z.next())if(Z.to>=this.pos){let J=Z.rank*102+Z.value.rank,Q=new E2(Z.from,Z.to,Z.value,J),X=this.wrappers.length;while(X>0&&(this.wrappers[X-1].rank-Q.rank||this.wrappers[X-1].to-Q.to)<0)X--;this.wrappers.splice(X,0,Q)}this.wrapperPos=this.pos}getBlockPos(){var Z;this.updateBlockWrappers();let J=this.root;for(let Q of this.wrappers){let X=J.lastChild;if(Q.from<this.pos&&X instanceof B4&&X.wrapper.eq(Q.wrapper))J=X;else{let Y=B4.of(Q.wrapper,(Z=this.cache.find(B4,(K)=>K.wrapper.eq(Q.wrapper)))===null||Z===void 0?void 0:Z.dom);J.append(Y),J=Y}}return J}blockPosCovered(){let Z=this.lastBlock;return Z!=null&&!Z.breakAfter&&(!Z.isWidget()||(Z.flags&160)>0)}getBuffer(Z){let J=2|(Z<0?16:32),Q=this.cache.find(F5,void 0,1);if(Q)Q.flags=J;return Q||new F5(J)}flushBuffer(){if(this.afterWidget&&!(this.afterWidget.flags&32))this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null}}class w2{constructor(Z){this.skipCount=0,this.text="",this.textOff=0,this.cursor=Z.iter()}skip(Z){if(this.textOff+Z<=this.text.length)this.textOff+=Z;else this.skipCount+=Z-(this.text.length-this.textOff),this.text="",this.textOff=0}next(Z){if(this.textOff==this.text.length){let{value:X,lineBreak:Y,done:K}=this.cursor.next(this.skipCount);if(this.skipCount=0,K)throw Error("Ran out of text content when drawing inline views");this.text=X;let I=this.textOff=Math.min(Z,X.length);return Y?null:X.slice(0,I)}let J=Math.min(this.text.length,this.textOff+Z),Q=this.text.slice(this.textOff,J);return this.textOff=J,Q}}var xZ=[s8,u7,m8,f0,F5,B4,A5];for(let Z=0;Z<xZ.length;Z++)xZ[Z].bucket=Z;class h2{constructor(Z){this.view=Z,this.buckets=xZ.map(()=>[]),this.index=xZ.map(()=>0),this.reused=new Map}add(Z){let J=Z.constructor.bucket,Q=this.buckets[J];if(Q.length<6)Q.push(Z);else Q[this.index[J]=(this.index[J]+1)%6]=Z}find(Z,J,Q=2){let X=Z.bucket,Y=this.buckets[X],K=this.index[X];for(let I=0;I<Y.length;I++){let q=(I+K)%Y.length,W=Y[q];if((!J||J(W))&&!this.reused.has(W)){if(Y.splice(q,1),q<K)this.index[X]--;return this.reused.set(W,Q),W}}return null}findWidget(Z,J,Q){let X=this.buckets[0];if(X.length)for(let Y=0,K=0;;Y++){if(Y==X.length){if(K)return null;K=1,Y=0}let I=X[Y];if(!this.reused.has(I)&&(K==0?I.widget.compare(Z):I.widget.constructor==Z.constructor&&Z.updateDOM(I.dom,this.view,I.widget))){if(X.splice(Y,1),Y<this.index[0])this.index[0]--;if(I.widget==Z&&I.length==J&&(I.flags&497)==Q)return this.reused.set(I,1),I;else return this.reused.set(I,2),new s8(I.dom,J,Z,I.flags&-498|Q)}}}reuse(Z){return this.reused.set(Z,1),Z}maybeReuse(Z,J=2){if(this.reused.has(Z))return;return this.reused.set(Z,J),Z.dom}clear(){for(let Z=0;Z<this.buckets.length;Z++)this.buckets[Z].length=this.index[Z]=0}}class k2{constructor(Z,J,Q,X,Y){this.view=Z,this.decorations=X,this.disallowBlockEffectsFor=Y,this.openWidget=!1,this.openMarks=0,this.cache=new h2(Z),this.text=new w2(Z.state.doc),this.builder=new C2(this.cache,new A5(Z,Z.contentDOM),N1.iter(Q)),this.cache.reused.set(J,2),this.old=new _2(J),this.reuseWalker={skip:(K,I,q)=>{if(this.cache.add(K),K.isComposite())return!1},enter:(K)=>this.cache.add(K),leave:()=>{},break:()=>{}}}run(Z,J){let Q=J&&this.getCompositionContext(J.text);for(let X=0,Y=0,K=0;;){let I=K<Z.length?Z[K++]:null,q=I?I.fromA:this.old.root.length;if(q>X){let W=q-X;this.preserve(W,!K,!I),X=q,Y+=W}if(!I)break;if(J&&I.fromA<=J.range.fromA&&I.toA>=J.range.toA)this.forward(I.fromA,J.range.fromA,J.range.fromA<J.range.toA?1:-1),this.emit(Y,J.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(J,Q),this.text.skip(J.range.toB-J.range.fromB),this.forward(J.range.fromA,I.toA),this.emit(J.range.toB,I.toB);else this.forward(I.fromA,I.toA),this.emit(Y,I.toB);Y=I.toB,X=I.toA}if(this.builder.curLine)this.builder.endLine();return this.builder.root}preserve(Z,J,Q){let X=lR(this.old),Y=this.openMarks;this.old.advance(Z,Q?1:-1,{skip:(K,I,q)=>{if(K.isWidget())if(this.openWidget)this.builder.continueWidget(q-I);else{let W=q>0||I<K.length?s8.of(K.widget,this.view,q-I,K.flags&496,this.cache.maybeReuse(K)):this.cache.reuse(K);if(W.flags&256)W.flags&=-2,this.builder.addBlockWidget(W);else this.builder.ensureLine(null),this.builder.addInlineWidget(W,X,Y),Y=X.length}else if(K.isText()){if(this.builder.ensureLine(null),!I&&q==K.length&&!this.cache.reused.has(K))this.builder.addText(K.text,X,Y,this.cache.reuse(K));else this.cache.add(K),this.builder.addText(K.text.slice(I,q),X,Y);Y=X.length}else if(K.isLine())K.flags&=-2,this.cache.reused.set(K,1),this.builder.addLine(K);else if(K instanceof F5)this.cache.add(K);else if(K instanceof f0)this.builder.ensureLine(null),this.builder.addMark(K,X,Y),this.cache.reused.set(K,1),Y=X.length;else return!1;this.openWidget=!1},enter:(K)=>{if(K.isLine())this.builder.addLineStart(K.attrs,this.cache.maybeReuse(K));else if(this.cache.add(K),K instanceof f0)X.unshift(K.mark);this.openWidget=!1},leave:(K)=>{if(K.isLine()){if(X.length)X.length=Y=0}else if(K instanceof f0)X.shift(),Y=Math.min(Y,X.length)},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(Z)}emit(Z,J){let Q=null,X=this.builder,Y=-1,K=N1.spans(this.decorations,Z,J,{point:(I,q,W,G,U,z)=>{if(W instanceof c8){if(this.disallowBlockEffectsFor[z]){if(W.block)throw RangeError("Block decorations may not be specified via plugins");if(q>this.view.state.doc.lineAt(I).to)throw RangeError("Decorations that replace line breaks may not be specified via plugins")}if(Y=G.length,U>G.length)X.continueWidget(q-I);else{let j=W.widget||(W.block?l8.block:l8.inline),O=dR(W),H=this.cache.findWidget(j,q-I,O)||s8.of(j,this.view,q-I,O);if(W.block){if(W.startSide>0)X.addLineStartIfNotCovered(Q);X.addBlockWidget(H)}else X.ensureLine(Q),X.addInlineWidget(H,G,U)}Q=null}else Q=sR(Q,W);if(q>I)this.text.skip(q-I)},span:(I,q,W,G)=>{for(let U=I;U<q;){let z=this.text.next(Math.min(512,q-U));if(z==null)X.addLineStartIfNotCovered(Q),X.addBreak(),U++;else X.ensureLine(Q),X.addText(z,W,U==I?G:W.length),U+=z.length;Q=null}Y=W.length}});if(Y>-1)this.openWidget=K>Y;if(!this.openWidget)X.addLineStartIfNotCovered(Q);this.openMarks=K}forward(Z,J,Q=1){if(J-Z<=10)this.old.advance(J-Z,Q,this.reuseWalker);else this.old.advance(5,-1,this.reuseWalker),this.old.advance(J-Z-10,-1),this.old.advance(5,Q,this.reuseWalker)}getCompositionContext(Z){let J=[],Q=null;for(let X=Z.parentNode;;X=X.parentNode){let Y=c1.get(X);if(X==this.view.contentDOM)break;if(Y instanceof f0)J.push(Y);else if(Y===null||Y===void 0?void 0:Y.isLine())Q=Y;else if(Y instanceof B4);else if(X.nodeName=="DIV"&&!Q&&X!=this.view.contentDOM)Q=new u7(X,b2);else if(!Q)J.push(f0.of(new H5({tagName:X.nodeName.toLowerCase(),attributes:TR(X)}),X))}return{line:Q,marks:J}}}function Pz(Z,J){let Q=(X)=>{for(let Y of X.children)if((J?Y.isText():Y.length)||Q(Y))return!0;return!1};return Q(Z)}function dR(Z){let J=Z.isReplace?(Z.startSide<0?64:0)|(Z.endSide>0?128:0):Z.startSide>0?32:16;if(Z.block)J|=256;return J}var b2={class:"cm-line"};function sR(Z,J){let Q=J.spec.attributes,X=J.spec.class;if(!Q&&!X)return Z;if(!Z)Z={class:"cm-line"};if(Q)bY(Q,Z);if(X)Z.class+=" "+X;return Z}function lR(Z){let J=[];for(let Q=Z.parents.length;Q>1;Q--){let X=Q==Z.parents.length?Z.tile:Z.parents[Q].tile;if(X instanceof f0)J.push(X.mark)}return J}function XY(Z){let J=c1.get(Z);if(J)J.setDOM(Z.cloneNode());return Z}class l8 extends a4{constructor(Z){super();this.tag=Z}eq(Z){return Z.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(Z){return Z.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}l8.inline=new l8("span");l8.block=new l8("div");var YY=new class extends a4{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class MY{constructor(Z){this.view=Z,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=P1.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new A5(Z,Z.contentDOM),this.updateInner([new J6(0,0,0,Z.state.doc.length)],null)}update(Z){var J;let Q=Z.changedRanges;if(this.minWidth>0&&Q.length)if(!Q.every(({fromA:G,toA:U})=>U<this.minWidthFrom||G>this.minWidthTo))this.minWidth=this.minWidthFrom=this.minWidthTo=0;else this.minWidthFrom=Z.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=Z.changes.mapPos(this.minWidthTo,1);this.updateEditContextFormatting(Z);let X=-1;if(this.view.inputState.composing>=0&&!this.view.observer.editContext){if((J=this.domChanged)===null||J===void 0?void 0:J.newSel)X=this.domChanged.newSel.head;else if(!JM(Z.changes,this.hasComposition)&&!Z.selectionSet)X=Z.state.selection.main.head}let Y=X>-1?rR(this.view,Z.changes,X):null;if(this.domChanged=null,this.hasComposition){let{from:G,to:U}=this.hasComposition;Q=new J6(G,U,Z.changes.mapPos(G,-1),Z.changes.mapPos(U,1)).addToSet(Q.slice())}if(this.hasComposition=Y?{from:Y.range.fromB,to:Y.range.toB}:null,(r.ie||r.chrome)&&!Y&&Z&&Z.state.doc.lines!=Z.startState.doc.lines)this.forceSelection=!0;let K=this.decorations,I=this.blockWrappers;this.updateDeco();let q=tR(K,this.decorations,Z.changes);if(q.length)Q=J6.extendWithRanges(Q,q);let W=eR(I,this.blockWrappers,Z.changes);if(W.length)Q=J6.extendWithRanges(Q,W);if(Y&&!Q.some((G)=>G.fromA<=Y.range.fromA&&G.toA>=Y.range.toA))Q=Y.range.addToSet(Q.slice());if(this.tile.flags&2&&Q.length==0)return!1;else{if(this.updateInner(Q,Y),Z.transactions.length)this.lastUpdate=Date.now();return!0}}updateInner(Z,J){this.view.viewState.mustMeasureContent=!0;let{observer:Q}=this.view;Q.ignore(()=>{if(J||Z.length){let K=this.tile,I=new k2(this.view,K,this.blockWrappers,this.decorations,this.dynamicDecorationMap);if(J&&c1.get(J.text))I.cache.reused.set(c1.get(J.text),2);this.tile=I.run(Z,J),AY(K,I.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let Y=r.chrome||r.ios?{node:Q.selectionRange.focusNode,written:!1}:void 0;if(this.tile.sync(Y),Y&&(Y.written||Q.selectionRange.focusNode!=Y.node||!this.tile.dom.contains(Y.node)))this.forceSelection=!0;this.tile.dom.style.height=""});let X=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length){for(let Y of this.tile.children)if(Y.isWidget()&&Y.widget instanceof PZ)X.push(Y.dom)}Q.updateGaps(X)}updateEditContextFormatting(Z){this.editContextFormatting=this.editContextFormatting.map(Z.changes);for(let J of Z.transactions)for(let Q of J.effects)if(Q.is(L2))this.editContextFormatting=Q.value}updateSelection(Z=!1,J=!1){if(Z||!this.view.observer.selectionRange.focusNode)this.view.observer.readSelectionRange();let{dom:Q}=this.tile,X=this.view.root.activeElement,Y=X==Q,K=!Y&&!(this.view.state.facet(L4)||Q.tabIndex>-1)&&G5(Q,this.view.observer.selectionRange)&&!(X&&Q.contains(X));if(!(Y||J||K))return;let I=this.forceSelection;this.forceSelection=!1;let q=this.view.state.selection.main,W,G;if(q.empty)G=W=this.inlineDOMNearPos(q.anchor,q.assoc||1);else G=this.inlineDOMNearPos(q.head,q.head==q.from?1:-1),W=this.inlineDOMNearPos(q.anchor,q.anchor==q.from?1:-1);if(r.gecko&&q.empty&&!this.hasComposition&&iR(W)){let z=document.createTextNode("");this.view.observer.ignore(()=>W.node.insertBefore(z,W.node.childNodes[W.offset]||null)),W=G=new _6(z,0),I=!0}let U=this.view.observer.selectionRange;if(I||!U.focusNode||(!U5(W.node,W.offset,U.anchorNode,U.anchorOffset)||!U5(G.node,G.offset,U.focusNode,U.focusOffset))&&!this.suppressWidgetCursorChange(U,q))this.view.observer.ignore(()=>{if(r.android&&r.chrome&&Q.contains(U.focusNode)&&ZM(U.focusNode,Q))Q.blur(),Q.focus({preventScroll:!0});let z=j5(this.view.root);if(!z);else if(q.empty){if(r.gecko){let j=aR(W.node,W.offset);if(j&&j!=3){let O=(j==1?I2:q2)(W.node,W.offset);if(O)W=new _6(O.node,O.offset)}}if(z.collapse(W.node,W.offset),q.bidiLevel!=null&&z.caretBidiLevel!==void 0)z.caretBidiLevel=q.bidiLevel}else if(z.extend){z.collapse(W.node,W.offset);try{z.extend(G.node,G.offset)}catch(j){}}else{let j=document.createRange();if(q.anchor>q.head)[W,G]=[G,W];j.setEnd(G.node,G.offset),j.setStart(W.node,W.offset),z.removeAllRanges(),z.addRange(j)}if(K&&this.view.root.activeElement==Q){if(Q.blur(),X)X.focus()}}),this.view.observer.setSelectionRange(W,G);this.impreciseAnchor=W.precise?null:new _6(U.anchorNode,U.anchorOffset),this.impreciseHead=G.precise?null:new _6(U.focusNode,U.focusOffset)}suppressWidgetCursorChange(Z,J){return this.hasComposition&&J.empty&&U5(Z.focusNode,Z.focusOffset,Z.anchorNode,Z.anchorOffset)&&this.posFromDOM(Z.focusNode,Z.focusOffset)==J.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:Z}=this,J=Z.state.selection.main,Q=j5(Z.root),{anchorNode:X,anchorOffset:Y}=Z.observer.selectionRange;if(!Q||!J.empty||!J.assoc||!Q.modify)return;let K=this.lineAt(J.head,J.assoc);if(!K)return;let I=K.posAtStart;if(J.head==I||J.head==I+K.length)return;let q=this.coordsAt(J.head,-1),W=this.coordsAt(J.head,1);if(!q||!W||q.bottom>W.top)return;let G=this.domAtPos(J.head+J.assoc,J.assoc);Q.collapse(G.node,G.offset),Q.modify("move",J.assoc<0?"forward":"backward","lineboundary"),Z.observer.readSelectionRange();let U=Z.observer.selectionRange;if(Z.docView.posFromDOM(U.anchorNode,U.anchorOffset)!=J.from)Q.collapse(X,Y)}posFromDOM(Z,J){let Q=this.tile.nearest(Z);if(!Q)return this.tile.dom.compareDocumentPosition(Z)&2?0:this.view.state.doc.length;let X=Q.posAtStart;if(Q.isComposite()){let Y;if(Z==Q.dom)Y=Q.dom.childNodes[J];else{let K=P4(Z)==0?0:J==0?-1:1;for(;;){let I=Z.parentNode;if(I==Q.dom)break;if(K==0&&I.firstChild!=I.lastChild)if(Z==I.firstChild)K=-1;else K=1;Z=I}if(K<0)Y=Z;else Y=Z.nextSibling}if(Y==Q.dom.firstChild)return X;while(Y&&!c1.get(Y))Y=Y.nextSibling;if(!Y)return X+Q.length;for(let K=0,I=X;;K++){let q=Q.children[K];if(q.dom==Y)return I;I+=q.length+q.breakAfter}}else if(Q.isText())return Z==Q.dom?X+J:X+(J?Q.length:0);else return X}domAtPos(Z,J){let{tile:Q,offset:X}=this.tile.resolveBlock(Z,J);if(Q.isWidget())return Q.domPosFor(X,J);return Q.domIn(X,J)}inlineDOMNearPos(Z,J){let Q,X=-1,Y=!1,K,I=-1,q=!1;if(this.tile.blockTiles((W,G)=>{if(W.isWidget()){if(W.flags&32&&G>=Z)return!0;if(W.flags&16)Y=!0}else{let U=G+W.length;if(G<=Z)Q=W,X=Z-G,Y=U<Z;if(U>=Z&&!K)K=W,I=Z-G,q=G>Z;if(G>Z&&K)return!0}}),!Q&&!K)return this.domAtPos(Z,J);if(Y&&K)Q=null;else if(q&&Q)K=null;return Q&&J<0||!K?Q.domIn(X,J):K.domIn(I,J)}coordsAt(Z,J,Q){let{tile:X,offset:Y}=this.tile.resolveBlock(Z,J);if(X.isWidget()){if(X.widget instanceof PZ)return null;return X.coordsInWidget(Y,J,!0)}return X.coordsIn(Y,J,Q)}lineAt(Z,J){let{tile:Q}=this.tile.resolveBlock(Z,J);return Q.isLine()?Q:null}coordsForChar(Z){let{tile:J,offset:Q}=this.tile.resolveBlock(Z,1);if(!J.isLine())return null;function X(Y,K){if(Y.isComposite())for(let I of Y.children){if(I.length>=K){let q=X(I,K);if(q)return q}if(K-=I.length,K<0)break}else if(Y.isText()&&K<Y.length){let I=I0(Y.text,K);if(I==K)return null;let q=O5(Y.dom,K,I).getClientRects();for(let W=0;W<q.length;W++){let G=q[W];if(W==q.length-1||G.top<G.bottom&&G.left<G.right)return G}}return null}return X(J,Q)}measureVisibleLineHeights(Z){let J=[],{from:Q,to:X}=Z,Y=this.view.contentDOM.clientWidth,K=Y>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,I=-1,q=this.view.textDirection==h1.LTR,W=0,G=(U,z,j)=>{for(let O=0;O<U.children.length;O++){if(z>X)break;let H=U.children[O],N=z+H.length,R=H.dom.getBoundingClientRect(),{height:T}=R;if(j&&!O)W+=R.top-j.top;if(H instanceof B4){if(N>Q)G(H,z,R)}else if(z>=Q){if(W>0)J.push(-W);if(J.push(T+W),W=0,K){let _=H.dom.lastChild,C=_?LZ(_):[];if(C.length){let h=C[C.length-1],L=q?h.right-R.left:R.right-h.left;if(L>I)I=L,this.minWidth=Y,this.minWidthFrom=z,this.minWidthTo=N}}}if(j&&O==U.children.length-1)W+=j.bottom-R.bottom;z=N+H.breakAfter}};return G(this.tile,0,null),J}textDirectionAt(Z){let{tile:J}=this.tile.resolveBlock(Z,1);return getComputedStyle(J.dom).direction=="rtl"?h1.RTL:h1.LTR}measureTextSize(){let Z=this.tile.blockTiles((K)=>{if(K.isLine()&&K.children.length&&K.length<=20){let I=0,q;for(let W of K.children){if(!W.isText()||/[^ -~]/.test(W.text))return;let G=LZ(W.dom);if(G.length!=1)return;I+=G[0].width,q=G[0].height}if(I)return{lineHeight:K.dom.getBoundingClientRect().height,charWidth:I/K.length,textHeight:q}}});if(Z)return Z;let J=document.createElement("div"),Q,X,Y;return J.className="cm-line",J.style.width="99999px",J.style.position="absolute",J.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(J);let K=LZ(J.firstChild)[0];Q=J.getBoundingClientRect().height,X=K&&K.width?K.width/27:7,Y=K&&K.height?K.height:Q,J.remove()}),{lineHeight:Q,charWidth:X,textHeight:Y}}computeBlockGapDeco(){let Z=[],J=this.view.viewState;for(let Q=0,X=0;;X++){let Y=X==J.viewports.length?null:J.viewports[X],K=Y?Y.from-1:this.view.state.doc.length;if(K>Q){let I=(J.lineBlockAt(K).bottom-J.lineBlockAt(Q).top)/this.view.scaleY;Z.push(P1.replace({widget:new PZ(I),block:!0,inclusive:!0,isBlockGap:!0}).range(Q,K))}if(!Y)break;Q=Y.to+1}return P1.set(Z)}updateDeco(){let Z=1,J=this.view.state.facet(nZ).map((Y)=>{return(this.dynamicDecorationMap[Z++]=typeof Y=="function")?Y(this.view):Y}),Q=!1,X=this.view.state.facet(uY).map((Y,K)=>{let I=typeof Y=="function";if(I)Q=!0;return I?Y(this.view):Y});if(X.length)this.dynamicDecorationMap[Z++]=Q,J.push(N1.join(X));this.decorations=[this.editContextFormatting,...J,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];while(Z<this.decorations.length)this.dynamicDecorationMap[Z++]=!1;this.blockWrappers=this.view.state.facet(P2).map((Y)=>typeof Y=="function"?Y(this.view):Y)}scrollIntoView(Z){if(Z.isSnapshot){let W=this.view.viewState.lineBlockAt(Z.range.head);this.view.scrollDOM.scrollTop=W.top-Z.yMargin,this.view.scrollDOM.scrollLeft=Z.xMargin;return}for(let W of this.view.state.facet(D2))try{if(W(this.view,Z.range,Z))return!0}catch(G){s0(this.view.state,G,"scroll handler")}let{range:J}=Z,Q=this.coordsAt(J.head,J.assoc||(J.head>J.anchor?-1:1)),X;if(!Q)return;if(!J.empty&&(X=this.coordsAt(J.anchor,J.anchor>J.head?-1:1)))Q={left:Math.min(Q.left,X.left),top:Math.min(Q.top,X.top),right:Math.max(Q.right,X.right),bottom:Math.max(Q.bottom,X.bottom)};let Y=nY(this.view),K={left:Q.left-Y.left,top:Q.top-Y.top,right:Q.right+Y.right,bottom:Q.bottom+Y.bottom},{offsetWidth:I,offsetHeight:q}=this.view.scrollDOM;if(CR(this.view.scrollDOM,K,J.head<J.anchor?-1:1,Z.x,Z.y,Math.max(Math.min(Z.xMargin,I),-I),Math.max(Math.min(Z.yMargin,q),-q),this.view.textDirection==h1.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(Q.top>window.visualViewport.offsetTop+window.visualViewport.height||Q.bottom<window.visualViewport.offsetTop)){let W=this.view.docView.lineAt(J.head,1);if(W){let G=Q2(W.dom);W.dom.scrollIntoView({block:"nearest"}),X2(G,!1)}}}lineHasWidget(Z){let J=(Q)=>Q.isWidget()||Q.children.some(J);return J(this.tile.resolveBlock(Z,1).tile)}destroy(){AY(this.tile)}}function AY(Z,J){let Q=J===null||J===void 0?void 0:J.get(Z);if(Q!=1){if(Q==null)Z.destroy();for(let X of Z.children)AY(X,J)}}function iR(Z){return Z.node.nodeType==1&&Z.node.firstChild&&(Z.offset==0||Z.node.childNodes[Z.offset-1].contentEditable=="false")&&(Z.offset==Z.node.childNodes.length||Z.node.childNodes[Z.offset].contentEditable=="false")}function x2(Z,J){let Q=Z.observer.selectionRange;if(!Q.focusNode)return null;let X=I2(Q.focusNode,Q.focusOffset),Y=q2(Q.focusNode,Q.focusOffset),K=X||Y;if(Y&&X&&Y.node!=X.node){let q=c1.get(Y.node);if(!q||q.isText()&&q.text!=Y.node.nodeValue)K=Y;else if(Z.docView.lastCompositionAfterCursor){let W=c1.get(X.node);if(!(!W||W.isText()&&W.text!=X.node.nodeValue))K=Y}}if(Z.docView.lastCompositionAfterCursor=K!=X,!K)return null;let I=J-K.offset;return{from:I,to:I+K.node.nodeValue.length,node:K.node}}function rR(Z,J,Q){let X=x2(Z,Q);if(!X)return null;let{node:Y,from:K,to:I}=X,q=Y.nodeValue;if(/[\n\r]/.test(q))return null;if(Z.state.doc.sliceString(X.from,X.to)!=q)return null;let W=J.invertedDesc;return{range:new J6(W.mapPos(K),W.mapPos(I),K,I),text:Y}}function aR(Z,J){if(Z.nodeType!=1)return 0;return(J&&Z.childNodes[J-1].contentEditable=="false"?1:0)|(J<Z.childNodes.length&&Z.childNodes[J].contentEditable=="false"?2:0)}var oR=class{constructor(){this.changes=[]}compareRange(J,Q){g7(J,Q,this.changes)}comparePoint(J,Q){g7(J,Q,this.changes)}boundChange(J){g7(J,J,this.changes)}};function tR(Z,J,Q){let X=new oR;return N1.compare(Z,J,Q,X),X.changes}class y2{constructor(){this.changes=[]}compareRange(Z,J){g7(Z,J,this.changes)}comparePoint(){}boundChange(Z){g7(Z,Z,this.changes)}}function eR(Z,J,Q){let X=new y2;return N1.compare(Z,J,Q,X),X.changes}function ZM(Z,J){for(let Q=Z;Q&&Q!=J;Q=Q.assignedSlot||Q.parentNode)if(Q.nodeType==1&&Q.contentEditable=="false")return!0;return!1}function JM(Z,J){let Q=!1;if(J)Z.iterChangedRanges((X,Y)=>{if(X<J.to&&Y>J.from)Q=!0});return Q}class PZ extends a4{constructor(Z){super();this.height=Z}toDOM(){let Z=document.createElement("div");return Z.className="cm-gap",this.updateDOM(Z),Z}eq(Z){return Z.height==this.height}updateDOM(Z){return Z.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function QM(Z,J,Q=1){let X=Z.charCategorizer(J),Y=Z.doc.lineAt(J),K=J-Y.from;if(Y.length==0)return u.cursor(J);if(K==0)Q=1;else if(K==Y.length)Q=-1;let I=K,q=K;if(Q<0)I=I0(Y.text,K,!1);else q=I0(Y.text,K);let W=X(Y.text.slice(I,q));while(I>0){let G=I0(Y.text,I,!1);if(X(Y.text.slice(G,I))!=W)break;I=G}while(q<Y.length){let G=I0(Y.text,q);if(X(Y.text.slice(q,G))!=W)break;q=G}return u.undirectionalRange(I+Y.from,q+Y.from)}function XM(Z,J,Q,X,Y){let K=Math.round((X-J.left)*Z.defaultCharacterWidth);if(Z.lineWrapping&&Q.height>Z.defaultLineHeight*1.5){let q=Z.viewState.heightOracle.textHeight,W=Math.floor((Y-Q.top-(Z.defaultLineHeight-q)*0.5)/q);K+=W*Z.viewState.heightOracle.lineLength}let I=Z.state.sliceDoc(Q.from,Q.to);return Q.from+Gz(I,K,Z.state.tabSize)}function DY(Z,J,Q){let X=Z.lineBlockAt(J);if(Array.isArray(X.type)){let Y;for(let K of X.type){if(K.from>J)break;if(K.to<J)continue;if(K.from<J&&K.to>J)return K;if(!Y||K.type==V0.Text&&(Y.type!=K.type||(Q<0?K.from<J:K.to>J)))Y=K}return Y||X}return X}function YM(Z,J,Q,X){let Y=DY(Z,J.head,J.assoc||-1),K=!X||Y.type!=V0.Text||!(Z.lineWrapping||Y.widgetLineBreaks)?null:Z.coordsAtPos(J.assoc<0&&J.head>Y.from?J.head-1:J.head);if(K){let I=Z.dom.getBoundingClientRect(),q=Z.textDirectionAt(Y.from),W=Z.posAtCoords({x:Q==(q==h1.LTR)?I.right-1:I.left+1,y:(K.top+K.bottom)/2});if(W!=null)return u.cursor(W,Q?-1:1)}return u.cursor(Q?Y.to:Y.from,Q?-1:1)}function Sz(Z,J,Q,X){let Y=Z.state.doc.lineAt(J.head),K=Z.bidiSpans(Y),I=Z.textDirectionAt(Y.from);for(let q=J,W=null;;){let G=uR(Y,K,I,q,Q),U=V2;if(!G){if(Y.number==(Q?Z.state.doc.lines:1))return q;U=`
`,Y=Z.state.doc.line(Y.number+(Q?1:-1)),K=Z.bidiSpans(Y),G=Z.visualLineSide(Y,!Q)}if(!W){if(!X)return G;W=X(U)}else if(!W(U))return q;q=G}}function KM(Z,J,Q){let X=Z.state.charCategorizer(J),Y=X(Q);return(K)=>{let I=X(K);if(Y==D6.Space)Y=I;return Y==I}}function IM(Z,J,Q,X){let Y=J.head,K=Q?1:-1;if(Y==(Q?Z.state.doc.length:0))return u.cursor(Y,J.assoc);let I=J.goalColumn,q,W=Z.contentDOM.getBoundingClientRect(),G=Z.coordsAtPos(Y,J.assoc||((J.empty?Q:J.head==J.from)?1:-1)),U=Z.documentTop;if(G){if(I==null)I=G.left-W.left;q=K<0?G.top:G.bottom}else{let H=Z.viewState.lineBlockAt(Y);if(I==null)I=Math.min(W.right-W.left,Z.defaultCharacterWidth*(Y-H.from));q=(K<0?H.top:H.bottom)+U}let z=W.left+I,j=Z.viewState.heightOracle.textHeight>>1,O=X!==null&&X!==void 0?X:j;for(let H=0;;H+=j){let N=q+(O+H)*K,R=LY(Z,{x:z,y:N},!1,K);if(Q?N>W.bottom:N<W.top)return u.cursor(R.pos,R.assoc);let T=Z.coordsAtPos(R.pos,R.assoc),_=T?(T.top+T.bottom)/2:0;if(!T||(Q?_>q:_<q))return u.cursor(R.pos,R.assoc,void 0,I)}}function z5(Z,J,Q){for(;;){let X=0;for(let Y of Z)Y.between(J-1,J+1,(K,I,q)=>{if(J>K&&J<I){let W=X||Q||(J-K<I-J?-1:1);J=W<0?K:I,X=W}});if(!X)return J}}function g2(Z,J){let Q=null;for(let X=0;X<J.ranges.length;X++){let Y=J.ranges[X],K=null;if(Y.empty){let I=z5(Z,Y.from,0);if(I!=Y.from)K=u.cursor(I,-1)}else{let I=z5(Z,Y.from,-1),q=z5(Z,Y.to,1);if(I!=Y.from||q!=Y.to)if(Y.undirectional)K=u.undirectionalRange(Y.from,Y.to);else K=u.range(Y.from==Y.anchor?I:q,Y.from==Y.head?I:q)}if(K){if(!Q)Q=J.ranges.slice();Q[X]=K}}return Q?u.create(Q,J.mainIndex):J}function KY(Z,J,Q){let X=z5(Z.state.facet(R5).map((Y)=>Y(Z)),Q.from,J.head>Q.from?-1:1);return X==Q.from?Q:u.cursor(X,X<Q.from?1:-1)}class S6{constructor(Z,J){this.pos=Z,this.assoc=J}}function LY(Z,J,Q,X){let Y=Z.contentDOM.getBoundingClientRect(),K=Y.top+Z.viewState.paddingTop,{x:I,y:q}=J,W=q-K,G;for(;;){if(W<0)return new S6(0,1);if(W>Z.viewState.docHeight)return new S6(Z.state.doc.length,-1);if(G=Z.elementAtHeight(W),X==null)break;if(G.type==V0.Text){if(X<0?G.to<Z.viewport.from:G.from>Z.viewport.to)break;let j=Z.docView.coordsAt(X<0?G.from:G.to,X>0?-1:1);if(j&&(X<0?j.top<=W+K:j.bottom>=W+K))break}let z=Z.viewState.heightOracle.textHeight/2;W=X>0?G.bottom+z:G.top-z}if(Z.viewport.from>=G.to||Z.viewport.to<=G.from){if(Q)return null;if(G.type==V0.Text){let z=XM(Z,Y,G,I,q);return new S6(z,z==G.from?1:-1)}}if(G.type!=V0.Text)return W<(G.top+G.bottom)/2?new S6(G.from,1):new S6(G.to,-1);let U=Z.docView.lineAt(G.from,2);if(!U||U.length!=G.length)U=Z.docView.lineAt(G.from,-2);return new f2(Z,I,q,Z.textDirectionAt(G.from)).scanTile(U,G.from)}class f2{constructor(Z,J,Q,X){this.view=Z,this.x=J,this.y=Q,this.baseDir=X,this.line=null,this.spans=null}bidiSpansAt(Z){if(!this.line||this.line.from>Z||this.line.to<Z)this.line=this.view.state.doc.lineAt(Z),this.spans=this.view.bidiSpans(this.line);return this}baseDirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[E6.find(X,Z-Q.from,-1,J)].level==this.baseDir}dirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[E6.find(X,Z-Q.from,-1,J)].dir}bidiIn(Z,J){let{spans:Q,line:X}=this.bidiSpansAt(Z);return Q.length>1||Q.length&&(Q[0].level!=this.baseDir||Q[0].to+X.from<J)}scan(Z,J,Q=!1){let X=0,Y=Z.length-1,K=new Set,I=this.bidiIn(Z[0],Z[Y]),q,W,G=-1,U=1e9,z;Z:while(X<Y){let O=Y-X,H=X+Y>>1;J:if(K.has(H)){for(let T=1;T<O;T++){let _=H+T;if(_>=Y)_-=O;if(!K.has(_)){H=_;break J}}break Z}K.add(H);let N=J(H),R=0;if(N)for(let T=0;T<N.length;T++){let _=N[T];if(_.width==0&&N.length>1)continue;if(_.bottom<this.y){if(!q||q.bottom<_.bottom)q=_;R=1}else if(_.top>this.y){if(!W||W.top>_.top)W=_;R=-1}else{let C=_.left>this.x?this.x-_.left:_.right<this.x?this.x-_.right:0,h=Math.abs(C);if(h<U)G=H,U=h,z=_;if(C)R=C<0==(this.baseDir==h1.LTR)?-1:1}}if(R==-1&&(!I||this.baseDirAt(Z[H],1)))Y=H;else if(R==1&&(!I||this.baseDirAt(Z[H+1],-1)))X=H+1}if(!z){if(!W&&!q)return{i:Z[0],after:!1};let O=q&&(!W||this.y-q.bottom<W.top-this.y)?q:W;return this.y=(O.top+O.bottom)/2,this.scan(Z,J,!0)}if(U&&!Q){let{top:O,bottom:H}=z;if(q&&q.bottom>(O+O+H)/3)return this.y=q.bottom-1,this.scan(Z,J,!0);if(W&&W.top<(O+H+H)/3)return this.y=W.top+1,this.scan(Z,J,!0)}let j=(I?this.dirAt(Z[G],1):this.baseDir)==h1.LTR;return{i:G,after:this.x>(z.left+z.right)/2==j}}scanText(Z,J){let Q=[];for(let Y=0;Y<Z.length;Y=I0(Z.text,Y))Q.push(J+Y);Q.push(J+Z.length);let X=this.scan(Q,(Y)=>{let K=Q[Y]-J,I=Q[Y+1]-J;return O5(Z.dom,K,I).getClientRects()});return X.after?new S6(Q[X.i+1],-1):new S6(Q[X.i],1)}scanTile(Z,J){if(!Z.length)return new S6(J,1);if(Z.children.length==1){let I=Z.children[0];if(I.isText())return this.scanText(I,J);else if(I.isComposite())return this.scanTile(I,J)}let Q=[J];for(let I=0,q=J;I<Z.children.length;I++)Q.push(q+=Z.children[I].length);let X=this.scan(Q,(I)=>{let q=Z.children[I];if(q.flags&48)return null;return(q.dom.nodeType==1?q.dom:O5(q.dom,0,q.length)).getClientRects()}),Y=Z.children[X.i],K=Q[X.i];if(Y.isText())return this.scanText(Y,K);if(Y.isComposite())return this.scanTile(Y,K);return X.after?new S6(Q[X.i+1],-1):new S6(K,1)}}var b7="￿";class $2{constructor(Z,J){this.points=Z,this.view=J,this.text="",this.lineSeparator=J.state.facet(L1.lineSeparator)}append(Z){this.text+=Z}lineBreak(){this.text+=b7}readRange(Z,J){if(!Z)return this;let Q=Z.parentNode;for(let X=Z;;){this.findPointBefore(Q,X);let Y=this.text.length;this.readNode(X);let K=c1.get(X),I=X.nextSibling;if(I==J){if((K===null||K===void 0?void 0:K.breakAfter)&&!I&&Q!=this.view.contentDOM)this.lineBreak();break}let q=c1.get(I);if((K&&q?K.breakAfter:(K?K.breakAfter:hZ(X))||hZ(I)&&(X.nodeName!="BR"||(K===null||K===void 0?void 0:K.isWidget()))&&this.text.length>Y)&&!WM(I,J))this.lineBreak();X=I}return this.findPointBefore(Q,J),this}readTextNode(Z){let J=Z.nodeValue;for(let Q of this.points)if(Q.node==Z)Q.pos=this.text.length+Math.min(Q.offset,J.length);for(let Q=0,X=this.lineSeparator?null:/\r\n?|\n/g;;){let Y=-1,K=1,I;if(this.lineSeparator)Y=J.indexOf(this.lineSeparator,Q),K=this.lineSeparator.length;else if(I=X.exec(J))Y=I.index,K=I[0].length;if(this.append(J.slice(Q,Y<0?J.length:Y)),Y<0)break;if(this.lineBreak(),K>1){for(let q of this.points)if(q.node==Z&&q.pos>this.text.length)q.pos-=K-1}Q=Y+K}}readNode(Z){let J=c1.get(Z),Q=J&&J.overrideDOMText;if(Q!=null){this.findPointInside(Z,Q.length);for(let X=Q.iter();!X.next().done;)if(X.lineBreak)this.lineBreak();else this.append(X.value)}else if(Z.nodeType==3)this.readTextNode(Z);else if(Z.nodeName=="BR"){if(Z.nextSibling)this.lineBreak()}else if(Z.nodeType==1)this.readRange(Z.firstChild,null)}findPointBefore(Z,J){for(let Q of this.points)if(Q.node==Z&&Z.childNodes[Q.offset]==J)Q.pos=this.text.length}findPointInside(Z,J){for(let Q of this.points)if(Z.nodeType==3?Q.node==Z:Z.contains(Q.node))Q.pos=this.text.length+(qM(Z,Q.node,Q.offset)?J:0)}}function qM(Z,J,Q){for(;;){if(!J||Q<P4(J))return!1;if(J==Z)return!0;Q=r4(J)+1,J=J.parentNode}}function WM(Z,J){let Q;for(;;Z=Z.nextSibling){if(Z==J||!Z)break;let X=c1.get(Z);if(!(X===null||X===void 0?void 0:X.isWidget()))return!1;if(X)(Q||(Q=[])).push(X)}if(Q)for(let X of Q){let Y=X.overrideDOMText;if(Y===null||Y===void 0?void 0:Y.length)return!1}return!0}class BY{constructor(Z,J){this.node=Z,this.offset=J,this.pos=-1}}class u2{constructor(Z,J,Q,X){this.typeOver=X,this.bounds=null,this.text="",this.domChanged=J>-1;let{impreciseHead:Y,impreciseAnchor:K}=Z.docView,I=Z.state.selection;if(Z.state.readOnly&&J>-1)this.newSel=null;else if(J>-1&&(this.bounds=n2(Z.docView.tile,J,Q,0))){let q=Y||K?[]:UM(Z),W=new $2(q,Z);W.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=W.text,this.newSel=zM(q,this.bounds.from)}else{let q=Z.observer.selectionRange,W=Y&&Y.node==q.focusNode&&Y.offset==q.focusOffset||!OY(Z.contentDOM,q.focusNode)?I.main.head:Z.docView.posFromDOM(q.focusNode,q.focusOffset),G=K&&K.node==q.anchorNode&&K.offset==q.anchorOffset||!OY(Z.contentDOM,q.anchorNode)?I.main.anchor:Z.docView.posFromDOM(q.anchorNode,q.anchorOffset),U=Z.viewport;if((r.ios||r.chrome)&&W!=G&&Math.min(W,G)<=I.main.from&&Math.max(W,G)>=I.main.to&&(U.from>0||U.to<Z.state.doc.length)){let z=Math.min(W,G),j=Math.max(W,G),O=U.from-z,H=U.to-j;if((O==0||O==1||z==0)&&(H==0||H==-1||j==Z.state.doc.length))W=0,G=Z.state.doc.length}if(Z.inputState.composing>-1&&I.ranges.length>1)this.newSel=I.replaceRange(u.range(G,W));else if(Z.lineWrapping&&G==W&&!(I.main.empty&&I.main.head==W)&&Z.inputState.lastTouchTime>Date.now()-100){let z=Z.coordsAtPos(W,-1),j=0;if(z)j=Z.inputState.lastTouchY<=z.bottom?-1:1;this.newSel=u.create([u.cursor(W,j)])}else this.newSel=u.single(G,W)}}}function n2(Z,J,Q,X){if(Z.isComposite()){let Y=-1,K=-1,I=-1,q=-1;for(let W=0,G=X,U=X;W<Z.children.length;W++){let z=Z.children[W],j=G+z.length;if(G<J&&j>Q)return n2(z,J,Q,G);if(j>=J&&Y==-1)Y=W,K=G;if(G>Q&&z.dom.parentNode==Z.dom){I=W,q=U;break}U=j,G=j+z.breakAfter}return{from:K,to:q<0?X+Z.length:q,startDOM:(Y?Z.children[Y-1].dom.nextSibling:null)||Z.dom.firstChild,endDOM:I<Z.children.length&&I>=0?Z.children[I].dom:null}}else if(Z.isText())return{from:X,to:X+Z.length,startDOM:Z.dom,endDOM:Z.dom.nextSibling};else return null}function v2(Z,J){let Q,{newSel:X}=J,{state:Y}=Z,K=Y.selection.main,I=Z.inputState.lastKeyTime>Date.now()-100?Z.inputState.lastKeyCode:-1;if(J.bounds){let{from:q,to:W}=J.bounds,G=K.from,U=null;if(I===8||r.android&&J.text.length<W-q)G=K.to,U="end";let z=Y.doc.sliceString(q,W,b7),j,O;if(!K.empty&&K.from>=q&&K.to<=W&&(J.typeOver||z!=J.text)&&z.slice(0,K.from-q)==J.text.slice(0,K.from-q)&&z.slice(K.to-q)==J.text.slice(j=J.text.length-(z.length-(K.to-q))))Q={from:K.from,to:K.to,insert:R1.of(J.text.slice(K.from-q,j).split(b7))};else if(O=m2(z,J.text,G-q,U)){if(r.chrome&&I==13&&O.toB==O.from+2&&J.text.slice(O.from,O.toB)==b7+b7)O.toB--;Q={from:q+O.from,to:q+O.toA,insert:R1.of(J.text.slice(O.from,O.toB).split(b7))}}}else if(X&&(!Z.hasFocus&&Y.facet(L4)||yZ(X,K)))X=null;if(!Q&&!X)return!1;if((r.mac||r.android)&&Q&&Q.from==Q.to&&Q.from==K.head-1&&/^\. ?$/.test(Q.insert.toString())&&Z.contentDOM.getAttribute("autocorrect")=="off"){if(X&&Q.insert.length==2)X=u.single(X.main.anchor-1,X.main.head-1);Q={from:Q.from,to:Q.to,insert:R1.of([Q.insert.toString().replace("."," ")])}}else if(Y.doc.lineAt(K.from).to<K.to&&Z.docView.lineHasWidget(K.to)&&Z.inputState.insertingTextAt>Date.now()-50)Q={from:K.from,to:K.to,insert:Y.toText(Z.inputState.insertingText)};else if(r.chrome&&Q&&Q.from==Q.to&&Q.from==K.head&&Q.insert.toString()==`
 `&&Z.lineWrapping){if(X)X=u.single(X.main.anchor-1,X.main.head-1);Q={from:K.from,to:K.to,insert:R1.of([" "])}}if(Q)return vY(Z,Q,X,I);else if(X&&!yZ(X,K)){let q=!1,W="select";if(Z.inputState.lastSelectionTime>Date.now()-50){if(Z.inputState.lastSelectionOrigin=="select")q=!0;if(W=Z.inputState.lastSelectionOrigin,W=="select.pointer")X=g2(Y.facet(R5).map((G)=>G(Z)),X)}return Z.dispatch({selection:X,scrollIntoView:q,userEvent:W}),!0}else return!1}function vY(Z,J,Q,X=-1){if(r.ios&&Z.inputState.flushIOSKey(J))return!0;let Y=Z.state.selection.main;if(r.android&&(J.to==Y.to&&(J.from==Y.from||J.from==Y.from-1&&Z.state.sliceDoc(J.from,Y.from)==" ")&&J.insert.length==1&&J.insert.lines==2&&f7(Z.contentDOM,"Enter",13)||(J.from==Y.from-1&&J.to==Y.to&&J.insert.length==0||X==8&&J.insert.length<J.to-J.from&&J.to>Y.head)&&f7(Z.contentDOM,"Backspace",8)||J.from==Y.from&&J.to==Y.to+1&&J.insert.length==0&&f7(Z.contentDOM,"Delete",46)))return!0;let K=J.insert.toString();if(Z.inputState.composing>=0)Z.inputState.composing++;let I,q=()=>I||(I=GM(Z,J,Q));if(!Z.state.facet(N2).some((W)=>W(Z,J.from,J.to,K,q)))Z.dispatch(q());return!0}function GM(Z,J,Q){let X,Y=Z.state,K=Y.selection.main,I=-1;if(J.from==J.to&&J.from<K.from||J.from>K.to){let W=J.from<K.from?-1:1,G=W<0?K.from:K.to,U=z5(Y.facet(R5).map((z)=>z(Z)),G,W);if(J.from==U)I=U}if(I>-1)X={changes:J,selection:u.cursor(J.from+J.insert.length,-1)};else if(J.from>=K.from&&J.to<=K.to&&J.to-J.from>=(K.to-K.from)/3&&(!Q||Q.main.empty&&Q.main.from==J.from+J.insert.length)&&Z.inputState.composing<0){let W=K.from<J.from?Y.sliceDoc(K.from,J.from):"",G=K.to>J.to?Y.sliceDoc(J.to,K.to):"";X=Y.replaceSelection(Z.state.toText(W+J.insert.sliceString(0,void 0,Z.state.lineBreak)+G))}else{let W=Y.changes(J),G=Q&&Q.main.to<=W.newLength?Q.main:void 0;if(Y.selection.ranges.length>1&&(Z.inputState.composing>=0||Z.inputState.compositionPendingChange)&&J.to<=K.to+10&&J.to>=K.to-10){let U=Z.state.sliceDoc(J.from,J.to),z,j=Q&&x2(Z,Q.main.head);if(j){let H=J.insert.length-(J.to-J.from);z={from:j.from,to:j.to-H}}else z=Z.state.doc.lineAt(K.head);let O=K.to-J.to;X=Y.changeByRange((H)=>{if(H.from==K.from&&H.to==K.to)return{changes:W,range:G||H.map(W)};let N=H.to-O,R=N-U.length;if(Z.state.sliceDoc(R,N)!=U||N>=z.from&&R<=z.to)return{range:H};let T=Y.changes({from:R,to:N,insert:J.insert}),_=H.to-K.to;return{changes:T,range:!G?H.map(T):u.range(Math.max(0,G.anchor+_),Math.max(0,G.head+_))}})}else X={changes:W,selection:G&&Y.selection.replaceRange(G)}}let q="input.type";if(Z.composing||Z.inputState.compositionPendingChange&&Z.inputState.compositionEndedAt>Date.now()-50){if(Z.inputState.compositionPendingChange=!1,q+=".compose",Z.inputState.compositionFirstChange)q+=".start",Z.inputState.compositionFirstChange=!1}return Y.update(X,{userEvent:q,scrollIntoView:!0})}function m2(Z,J,Q,X){let Y=Math.min(Z.length,J.length),K=0;while(K<Y&&Z.charCodeAt(K)==J.charCodeAt(K))K++;if(K==Y&&Z.length==J.length)return null;let I=Z.length,q=J.length;while(I>0&&q>0&&Z.charCodeAt(I-1)==J.charCodeAt(q-1))I--,q--;if(X=="end"){let W=Math.max(0,K-Math.min(I,q));Q-=I+W-K}if(I<K&&Z.length<J.length){let W=Q<=K&&Q>=I?K-Q:0;K-=W,q=K+(q-I),I=K}else if(q<K){let W=Q<=K&&Q>=q?K-Q:0;K-=W,I=K+(I-q),q=K}return{from:K,toA:I,toB:q}}function UM(Z){let J=[];if(Z.root.activeElement!=Z.contentDOM)return J;let{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}=Z.observer.selectionRange;if(Q){if(J.push(new BY(Q,X)),Y!=Q||K!=X)J.push(new BY(Y,K))}return J}function zM(Z,J){if(Z.length==0)return null;let Q=Z[0].pos,X=Z.length==2?Z[1].pos:Q;return Q>-1&&X>-1?u.single(Q+J,X+J):null}function yZ(Z,J){return J.head==Z.main.head&&J.anchor==Z.main.anchor}class p2{setSelectionOrigin(Z){this.lastSelectionOrigin=Z,this.lastSelectionTime=Date.now()}constructor(Z){if(this.view=Z,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=Z.hasFocus,r.safari)Z.contentDOM.addEventListener("input",()=>null);if(r.gecko)TM(Z.contentDOM.ownerDocument)}handleEvent(Z){if(!MM(this.view,Z)||this.ignoreDuringComposition(Z))return;if(Z.type=="keydown"&&this.keydown(Z))return;if(this.view.updateState!=0)Promise.resolve().then(()=>this.runHandlers(Z.type,Z));else this.runHandlers(Z.type,Z)}runHandlers(Z,J){let Q=this.handlers[Z];if(Q){for(let X of Q.observers)X(this.view,J);for(let X of Q.handlers){if(J.defaultPrevented)break;if(X(this.view,J)){J.preventDefault();break}}}}ensureHandlers(Z){let J=jM(Z),Q=this.handlers,X=this.view.contentDOM;for(let Y in J)if(Y!="scroll"){let K=!J[Y].handlers.length,I=Q[Y];if(I&&K!=!I.handlers.length)X.removeEventListener(Y,this.handleEvent),I=null;if(!I)X.addEventListener(Y,this.handleEvent,{passive:K})}for(let Y in Q)if(Y!="scroll"&&!J[Y])X.removeEventListener(Y,this.handleEvent);this.handlers=J}keydown(Z){if(this.lastKeyCode=Z.keyCode,this.lastKeyTime=Date.now(),Z.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&Z.keyCode!=27&&d2.indexOf(Z.keyCode)<0)this.tabFocusMode=-1;if(r.android&&r.chrome&&!Z.synthetic&&(Z.keyCode==13||Z.keyCode==8))return this.view.observer.delayAndroidKey(Z.key,Z.keyCode),!0;if(r.ios&&!Z.synthetic&&!Z.altKey&&!Z.metaKey&&(c2.some((J)=>J.keyCode==Z.keyCode)&&!Z.ctrlKey||OM.indexOf(Z.key)>-1&&Z.ctrlKey)){let J={ctrlKey:Z.ctrlKey,altKey:Z.altKey,metaKey:Z.metaKey,shiftKey:Z.shiftKey};if(J.shiftKey&&r.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&VM(this.view.win))J.shiftKey=!1;return this.pendingIOSKey={key:Z.key,keyCode:Z.keyCode,mods:J},setTimeout(()=>this.flushIOSKey(),250),!0}if(Z.keyCode!=229)this.view.observer.forceFlush();return!1}flushIOSKey(Z){let J=this.pendingIOSKey;if(!J)return!1;if(J.key=="Enter"&&Z&&Z.from<Z.to&&/^\S+$/.test(Z.insert.toString()))return!1;return this.pendingIOSKey=void 0,f7(this.view.contentDOM,J.key,J.keyCode,J.mods)}ignoreDuringComposition(Z){if(!/^key/.test(Z.type)||Z.synthetic)return!1;if(this.composing>0)return!0;if(r.safari&&!r.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100)return this.compositionPendingKey=!1,!0;return!1}startMouseSelection(Z){if(this.mouseSelection)this.mouseSelection.destroy();this.mouseSelection=Z}update(Z){if(this.view.observer.update(Z),this.mouseSelection)this.mouseSelection.update(Z);if(this.draggedContent&&Z.docChanged)this.draggedContent=this.draggedContent.map(Z.changes);if(Z.transactions.length)this.lastKeyCode=this.lastSelectionTime=0}destroy(){if(this.mouseSelection)this.mouseSelection.destroy()}}function VM(Z){if(!Z.visualViewport)return!1;return Z.visualViewport.height*Z.visualViewport.scale/Z.document.documentElement.clientHeight<0.85}function Tz(Z,J){return(Q,X)=>{try{return J.call(Z,X,Q)}catch(Y){s0(Q.state,Y)}}}function jM(Z){let J=Object.create(null);function Q(X){return J[X]||(J[X]={observers:[],handlers:[]})}for(let X of Z){let Y=X.spec,K=Y&&Y.plugin.domEventHandlers,I=Y&&Y.plugin.domEventObservers;if(K)for(let q in K){let W=K[q];if(W)Q(q).handlers.push(Tz(X.value,W))}if(I)for(let q in I){let W=I[q];if(W)Q(q).observers.push(Tz(X.value,W))}}for(let X in C6)Q(X).handlers.push(C6[X]);for(let X in C0)Q(X).observers.push(C0[X]);return J}var c2=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],OM="dthko",d2=[16,17,18,20,91,92,224,225],OZ=6;function FZ(Z){return Math.max(0,Z)*0.7+8}function FM(Z,J){return Math.max(Math.abs(Z.clientX-J.clientX),Math.abs(Z.clientY-J.clientY))}class s2{constructor(Z,J,Q,X){this.view=Z,this.startEvent=J,this.style=Q,this.mustSelect=X,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=J,this.scrollParents=Z2(Z.contentDOM),this.atoms=Z.state.facet(R5).map((K)=>K(Z));let Y=Z.contentDOM.ownerDocument;Y.addEventListener("mousemove",this.move=this.move.bind(this)),Y.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=J.shiftKey,this.multiple=Z.state.facet(L1.allowMultipleSelections)&&HM(Z,J),this.dragging=RM(Z,J)&&r2(J)==1?null:!1}start(Z){if(this.dragging===!1)this.select(Z)}move(Z){if(Z.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&FM(this.startEvent,Z)<10)return;this.select(this.lastEvent=Z);let J=0,Q=0,X=0,Y=0,K=this.view.win.innerWidth,I=this.view.win.innerHeight;if(this.scrollParents.x)({left:X,right:K}=this.scrollParents.x.getBoundingClientRect());if(this.scrollParents.y)({top:Y,bottom:I}=this.scrollParents.y.getBoundingClientRect());let q=nY(this.view);if(Z.clientX-q.left<=X+OZ)J=-FZ(X-Z.clientX);else if(Z.clientX+q.right>=K-OZ)J=FZ(Z.clientX-K);if(Z.clientY-q.top<=Y+OZ)Q=-FZ(Y-Z.clientY);else if(Z.clientY+q.bottom>=I-OZ)Q=FZ(Z.clientY-I);this.setScrollSpeed(J,Q)}up(Z){if(this.dragging==null)this.select(this.lastEvent);if(!this.dragging)Z.preventDefault();this.destroy()}destroy(){this.setScrollSpeed(0,0);let Z=this.view.contentDOM.ownerDocument;Z.removeEventListener("mousemove",this.move),Z.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(Z,J){if(this.scrollSpeed={x:Z,y:J},Z||J){if(this.scrolling<0)this.scrolling=setInterval(()=>this.scroll(),50)}else if(this.scrolling>-1)clearInterval(this.scrolling),this.scrolling=-1}scroll(){let{x:Z,y:J}=this.scrollSpeed;if(Z&&this.scrollParents.x)this.scrollParents.x.scrollLeft+=Z,Z=0;if(J&&this.scrollParents.y)this.scrollParents.y.scrollTop+=J,J=0;if(Z||J)this.view.win.scrollBy(Z,J);if(this.dragging===!1)this.select(this.lastEvent)}select(Z){let{view:J}=this,Q=g2(this.atoms,this.style.get(Z,this.extend,this.multiple));if(this.mustSelect||!Q.eq(J.state.selection,this.dragging===!1))this.view.dispatch({selection:Q,userEvent:"select.pointer"});this.mustSelect=!1}update(Z){if(Z.transactions.some((J)=>J.isUserEvent("input.type")))this.destroy();else if(this.style.update(Z))setTimeout(()=>this.select(this.lastEvent),20)}}function HM(Z,J){let Q=Z.state.facet(j2);return Q.length?Q[0](J):r.mac?J.metaKey:J.ctrlKey}function NM(Z,J){let Q=Z.state.facet(O2);return Q.length?Q[0](J):r.mac?!J.altKey:!J.ctrlKey}function RM(Z,J){let{main:Q}=Z.state.selection;if(Q.empty)return!1;let X=j5(Z.root);if(!X||X.rangeCount==0)return!0;let Y=X.getRangeAt(0).getClientRects();for(let K=0;K<Y.length;K++){let I=Y[K];if(I.left<=J.clientX&&I.right>=J.clientX&&I.top<=J.clientY&&I.bottom>=J.clientY)return!0}return!1}function MM(Z,J){if(!J.bubbles)return!0;if(J.defaultPrevented)return!1;for(let Q=J.target,X;Q!=Z.contentDOM;Q=Q.parentNode)if(!Q||Q.nodeType==11||(X=c1.get(Q))&&X.isWidget()&&!X.isHidden&&X.widget.ignoreEvent(J))return!1;return!0}var C6=Object.create(null),C0=Object.create(null),l2=r.ie&&r.ie_version<15||r.ios&&r.webkit_version<604;function AM(Z){let J=Z.dom.parentNode;if(!J)return;let Q=J.appendChild(document.createElement("textarea"));Q.style.cssText="position: fixed; left: -10000px; top: 10px",Q.focus(),setTimeout(()=>{Z.focus(),Q.remove(),i2(Z,Q.value)},50)}function vZ(Z,J,Q){for(let X of Z.facet(J))Q=X(Q,Z);return Q}function i2(Z,J){J=vZ(Z.state,gY,J);let{state:Q}=Z,X,Y=1,K=Q.toText(J),I=K.lines==Q.selection.ranges.length;if(PY!=null&&Q.selection.ranges.every((W)=>W.empty)&&PY==K.toString()){let W=-1;X=Q.changeByRange((G)=>{let U=Q.doc.lineAt(G.from);if(U.from==W)return{range:G};W=U.from;let z=Q.toText((I?K.line(Y++).text:J)+Q.lineBreak);return{changes:{from:U.from,insert:z},range:u.cursor(G.from+z.length)}})}else if(I)X=Q.changeByRange((W)=>{let G=K.line(Y++);return{changes:{from:W.from,to:W.to,insert:G.text},range:u.cursor(W.from+G.length)}});else X=Q.replaceSelection(K);Z.dispatch(X,{userEvent:"input.paste",scrollIntoView:!0})}C0.scroll=(Z)=>{let J=Z.inputState;if(J.lastScrollTop=Z.scrollDOM.scrollTop,J.lastScrollLeft=Z.scrollDOM.scrollLeft,r.ios&&!J.touchActive)J.lastIOSMomentumScroll=Date.now()};C0.wheel=C0.mousewheel=(Z)=>{Z.inputState.lastWheelEvent=Date.now()};C6.keydown=(Z,J)=>{if(Z.inputState.setSelectionOrigin("select"),J.keyCode==27&&Z.inputState.tabFocusMode!=0)Z.inputState.tabFocusMode=Date.now()+2000;return!1};C0.touchstart=(Z,J)=>{let Q=Z.inputState,X=J.targetTouches[0];if(Q.touchActive=!0,Q.lastTouchTime=Date.now(),X)Q.lastTouchX=X.clientX,Q.lastTouchY=X.clientY;Q.setSelectionOrigin("select.pointer")};C0.touchmove=(Z)=>{Z.inputState.setSelectionOrigin("select.pointer")};C0.touchend=(Z,J)=>{Z.inputState.touchActive=!1};C6.mousedown=(Z,J)=>{if(Z.observer.flush(),Z.inputState.lastTouchTime>Date.now()-2000)return!1;let Q=null;for(let X of Z.state.facet(F2))if(Q=X(Z,J),Q)break;if(!Q&&J.button==0)Q=LM(Z,J);if(Q){let X=!Z.hasFocus;if(Z.inputState.startMouseSelection(new s2(Z,J,Q,X)),X)Z.observer.ignore(()=>{Y2(Z.contentDOM);let K=Z.root.activeElement;if(K&&!K.contains(Z.contentDOM))K.blur()});let Y=Z.inputState.mouseSelection;if(Y)return Y.start(J),Y.dragging===!1}else Z.inputState.setSelectionOrigin("select.pointer");return!1};function _z(Z,J,Q,X){if(X==1)return u.cursor(J,Q);else if(X==2)return QM(Z.state,J,Q);else{let Y=Z.docView.lineAt(J,Q),K=Z.state.doc.lineAt(Y?Y.posAtEnd:J),I=Y?Y.posAtStart:K.from,q=Y?Y.posAtEnd:K.to;if(q<Z.state.doc.length&&q==K.to)q++;return u.undirectionalRange(I,q)}}var DM=r.ie&&r.ie_version<=11,Ez=null,Cz=0,wz=0;function r2(Z){if(!DM)return Z.detail;let J=Ez,Q=wz;return Ez=Z,wz=Date.now(),Cz=!J||Q>Date.now()-400&&Math.abs(J.clientX-Z.clientX)<2&&Math.abs(J.clientY-Z.clientY)<2?(Cz+1)%3:1}function LM(Z,J){let Q=Z.posAndSideAtCoords({x:J.clientX,y:J.clientY},!1),X=r2(J),Y=Z.state.selection;return{update(K){if(K.docChanged)Q.pos=K.changes.mapPos(Q.pos),Y=Y.map(K.changes)},get(K,I,q){let W=Z.posAndSideAtCoords({x:K.clientX,y:K.clientY},!1),G,U=_z(Z,W.pos,W.assoc,X);if(Q.pos!=W.pos&&!I){let z=_z(Z,Q.pos,Q.assoc,X),j=Math.min(z.from,U.from),O=Math.max(z.to,U.to);U=j<U.from?u.range(j,O,U.assoc):u.range(O,j,U.assoc)}if(I)return Y.replaceRange(Y.main.extend(U.from,U.to,U.assoc));else if(q&&X==1&&Y.ranges.length>1&&(G=BM(Y,W.pos)))return G;else if(q)return Y.addRange(U);else return u.create([U])}}}function BM(Z,J){for(let Q=0;Q<Z.ranges.length;Q++){let{from:X,to:Y}=Z.ranges[Q];if(X<=J&&Y>=J)return u.create(Z.ranges.slice(0,Q).concat(Z.ranges.slice(Q+1)),Z.mainIndex==Q?0:Z.mainIndex-(Z.mainIndex>Q?1:0))}return null}C6.dragstart=(Z,J)=>{let{selection:{main:Q}}=Z.state;if(J.target.draggable){let Y=Z.docView.tile.nearest(J.target);if(Y&&Y.isWidget()){let K=Y.posAtStart,I=K+Y.length;if(K>=Q.to||I<=Q.from)Q=u.undirectionalRange(K,I)}}let{inputState:X}=Z;if(X.mouseSelection)X.mouseSelection.dragging=!0;if(X.draggedContent=Q,J.dataTransfer)J.dataTransfer.setData("Text",vZ(Z.state,fY,Z.state.sliceDoc(Q.from,Q.to))),J.dataTransfer.effectAllowed="copyMove";return!1};C6.dragend=(Z)=>{return Z.inputState.draggedContent=null,!1};function hz(Z,J,Q,X){if(Q=vZ(Z.state,gY,Q),!Q)return;let Y=Z.posAtCoords({x:J.clientX,y:J.clientY},!1),{draggedContent:K}=Z.inputState,I=X&&K&&NM(Z,J)?{from:K.from,to:K.to}:null,q={from:Y,insert:Q},W=Z.state.changes(I?[I,q]:q);Z.focus(),Z.dispatch({changes:W,selection:{anchor:W.mapPos(Y,-1),head:W.mapPos(Y,1)},userEvent:I?"move.drop":"input.drop"}),Z.inputState.draggedContent=null}C6.drop=(Z,J)=>{if(!J.dataTransfer)return!1;if(Z.state.readOnly)return!0;let Q=J.dataTransfer.files;if(Q&&Q.length){let X=Array(Q.length),Y=0,K=()=>{if(++Y==Q.length)hz(Z,J,X.filter((I)=>I!=null).join(Z.state.lineBreak),!1)};for(let I=0;I<Q.length;I++){let q=new FileReader;q.onerror=K,q.onload=()=>{if(!/[\x00-\x08\x0e-\x1f]{2}/.test(q.result))X[I]=q.result;K()},q.readAsText(Q[I])}return!0}else{let X=J.dataTransfer.getData("Text");if(X)return hz(Z,J,X,!0),!0}return!1};C6.paste=(Z,J)=>{if(Z.state.readOnly)return!0;Z.observer.flush();let Q=l2?null:J.clipboardData;if(Q)return i2(Z,Q.getData("text/plain")||Q.getData("text/uri-list")),!0;else return AM(Z),!1};function PM(Z,J){let Q=Z.dom.parentNode;if(!Q)return;let X=Q.appendChild(document.createElement("textarea"));X.style.cssText="position: fixed; left: -10000px; top: 10px",X.value=J,X.focus(),X.selectionEnd=J.length,X.selectionStart=0,setTimeout(()=>{X.remove(),Z.focus()},50)}function SM(Z){let J=[],Q=[],X=!1;for(let Y of Z.selection.ranges)if(!Y.empty)J.push(Z.sliceDoc(Y.from,Y.to)),Q.push(Y);if(!J.length){let Y=-1;for(let{from:K}of Z.selection.ranges){let I=Z.doc.lineAt(K);if(I.number>Y)J.push(I.text),Q.push({from:I.from,to:Math.min(Z.doc.length,I.to+1)});Y=I.number}X=!0}return{text:vZ(Z,fY,J.join(Z.lineBreak)),ranges:Q,linewise:X}}var PY=null;C6.copy=C6.cut=(Z,J)=>{if(!G5(Z.contentDOM,Z.observer.selectionRange))return!1;let{text:Q,ranges:X,linewise:Y}=SM(Z.state);if(!Q&&!Y)return!1;if(PY=Y?Q:null,J.type=="cut"&&!Z.state.readOnly)Z.dispatch({changes:X,scrollIntoView:!0,userEvent:"delete.cut"});let K=l2?null:J.clipboardData;if(K)return K.clearData(),K.setData("text/plain",Q),!0;else return PM(Z,Q),!1};var a2=B6.define();function o2(Z,J){let Q=[];for(let X of Z.facet(R2)){let Y=X(Z,J);if(Y)Q.push(Y)}return Q.length?Z.update({effects:Q,annotations:a2.of(!0)}):null}function t2(Z){setTimeout(()=>{let J=Z.hasFocus;if(J!=Z.inputState.notifiedFocused){let Q=o2(Z.state,J);if(Q)Z.dispatch(Q);else Z.update([])}},10)}C0.focus=(Z)=>{if(Z.inputState.lastFocusTime=Date.now(),!Z.scrollDOM.scrollTop&&(Z.inputState.lastScrollTop||Z.inputState.lastScrollLeft))Z.scrollDOM.scrollTop=Z.inputState.lastScrollTop,Z.scrollDOM.scrollLeft=Z.inputState.lastScrollLeft;t2(Z)};C0.blur=(Z)=>{Z.observer.clearSelectionRange(),t2(Z)};C0.compositionstart=C0.compositionupdate=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.compositionFirstChange==null)Z.inputState.compositionFirstChange=!0;if(Z.inputState.composing<0)Z.inputState.composing=0};C0.compositionend=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.composing=-1,Z.inputState.compositionEndedAt=Date.now(),Z.inputState.compositionPendingKey=!0,Z.inputState.compositionPendingChange=Z.observer.pendingRecords().length>0,Z.inputState.compositionFirstChange=null,r.chrome&&r.android)Z.observer.flushSoon();else if(Z.inputState.compositionPendingChange)Promise.resolve().then(()=>Z.observer.flush());else setTimeout(()=>{if(Z.inputState.composing<0&&Z.docView.hasComposition)Z.update([])},50)};C0.contextmenu=(Z)=>{Z.inputState.lastContextMenu=Date.now()};C6.beforeinput=(Z,J)=>{var Q,X;if(J.inputType=="insertText"||J.inputType=="insertCompositionText")Z.inputState.insertingText=J.data,Z.inputState.insertingTextAt=Date.now();if(J.inputType=="insertReplacementText"&&Z.observer.editContext){let K=(Q=J.dataTransfer)===null||Q===void 0?void 0:Q.getData("text/plain"),I=J.getTargetRanges();if(K&&I.length){let q=I[0],W=Z.posAtDOM(q.startContainer,q.startOffset),G=Z.posAtDOM(q.endContainer,q.endOffset);return vY(Z,{from:W,to:G,insert:Z.state.toText(K)},null),!0}}let Y;if(r.chrome&&r.android&&(Y=c2.find((K)=>K.inputType==J.inputType))){if(Z.observer.delayAndroidKey(Y.key,Y.keyCode),Y.key=="Backspace"||Y.key=="Delete"){let K=((X=window.visualViewport)===null||X===void 0?void 0:X.height)||0;setTimeout(()=>{var I;if((((I=window.visualViewport)===null||I===void 0?void 0:I.height)||0)>K+10&&Z.hasFocus)Z.contentDOM.blur(),Z.focus()},100)}}if(r.ios&&J.inputType=="deleteContentForward")Z.observer.flushSoon();if(r.safari&&J.inputType=="insertText"&&Z.inputState.composing>=0)setTimeout(()=>C0.compositionend(Z,J),20);return!1};var kz=new Set;function TM(Z){if(!kz.has(Z))kz.add(Z),Z.addEventListener("copy",()=>{}),Z.addEventListener("cut",()=>{})}var bz=["pre-wrap","normal","pre-line","break-spaces"],n7=!1;function xz(){n7=!1}class e2{constructor(Z){this.lineWrapping=Z,this.doc=R1.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(Z,J){let Q=this.doc.lineAt(J).number-this.doc.lineAt(Z).number+1;if(this.lineWrapping)Q+=Math.max(0,Math.ceil((J-Z-Q*this.lineLength*0.5)/this.lineLength));return this.lineHeight*Q}heightForLine(Z){if(!this.lineWrapping)return this.lineHeight;return(1+Math.max(0,Math.ceil((Z-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight}setDoc(Z){return this.doc=Z,this}mustRefreshForWrapping(Z){return bz.indexOf(Z)>-1!=this.lineWrapping}mustRefreshForHeights(Z){let J=!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q];if(X<0)Q++;else if(!this.heightSamples[Math.floor(X*10)])J=!0,this.heightSamples[Math.floor(X*10)]=!0}return J}refresh(Z,J,Q,X,Y,K){let I=bz.indexOf(Z)>-1,q=Math.abs(J-this.lineHeight)>0.3||this.lineWrapping!=I;if(this.lineWrapping=I,this.lineHeight=J,this.charWidth=Q,this.textHeight=X,this.lineLength=Y,q){this.heightSamples={};for(let W=0;W<K.length;W++){let G=K[W];if(G<0)W++;else this.heightSamples[Math.floor(G*10)]=!0}}return q}}class ZV{constructor(Z,J){this.from=Z,this.heights=J,this.index=0}get more(){return this.index<this.heights.length}}class T6{constructor(Z,J,Q,X,Y){this.from=Z,this.length=J,this.top=Q,this.height=X,this._content=Y}get type(){return typeof this._content=="number"?V0.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof c8?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(Z){let J=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(Z._content)?Z._content:[Z]);return new T6(this.from,this.length+Z.length,this.top,this.height+Z.height,J)}}var g1=function(Z){return Z[Z.ByPos=0]="ByPos",Z[Z.ByHeight=1]="ByHeight",Z[Z.ByPosNoHeight=2]="ByPosNoHeight",Z}(g1||(g1={})),SZ=0.001;class E0{constructor(Z,J,Q=2){this.length=Z,this.height=J,this.flags=Q}get outdated(){return(this.flags&2)>0}set outdated(Z){this.flags=(Z?2:0)|this.flags&-3}setHeight(Z){if(this.height!=Z){if(Math.abs(this.height-Z)>SZ)n7=!0;this.height=Z}}replace(Z,J,Q){return E0.of(Q)}decomposeLeft(Z,J){J.push(this)}decomposeRight(Z,J){J.push(this)}applyChanges(Z,J,Q,X){let Y=this,K=Q.doc;for(let I=X.length-1;I>=0;I--){let{fromA:q,toA:W,fromB:G,toB:U}=X[I],z=Y.lineAt(q,g1.ByPosNoHeight,Q.setDoc(J),0,0),j=z.to>=W?z:Y.lineAt(W,g1.ByPosNoHeight,Q,0,0);U+=j.to-W,W=j.to;while(I>0&&z.from<=X[I-1].toA)if(q=X[I-1].fromA,G=X[I-1].fromB,I--,q<z.from)z=Y.lineAt(q,g1.ByPosNoHeight,Q,0,0);G+=z.from-q,q=z.from;let O=pY.build(Q.setDoc(K),Z,G,U);Y=gZ(Y,Y.replace(q,W,O))}return Y.updateHeight(Q,0)}static empty(){return new d0(0,0,0)}static of(Z){if(Z.length==1)return Z[0];let J=0,Q=Z.length,X=0,Y=0;for(;;)if(J==Q)if(X>Y*2){let I=Z[J-1];if(I.break)Z.splice(--J,1,I.left,null,I.right);else Z.splice(--J,1,I.left,I.right);Q+=1+I.break,X-=I.size}else if(Y>X*2){let I=Z[Q];if(I.break)Z.splice(Q,1,I.left,null,I.right);else Z.splice(Q,1,I.left,I.right);Q+=2+I.break,Y-=I.size}else break;else if(X<Y){let I=Z[J++];if(I)X+=I.size}else{let I=Z[--Q];if(I)Y+=I.size}let K=0;if(Z[J-1]==null)K=1,J--;else if(Z[J]==null)K=1,Q++;return new JV(E0.of(Z.slice(0,J)),K,E0.of(Z.slice(Q)))}}function gZ(Z,J){if(Z==J)return Z;if(Z.constructor!=J.constructor)n7=!0;return J}E0.prototype.size=1;var _M=P1.replace({});class mY extends E0{constructor(Z,J,Q){super(Z,J);this.deco=Q,this.spaceAbove=0}mainBlock(Z,J){return new T6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(Z,J,Q,X){return this.spaceAbove&&Z<Q+this.spaceAbove?new T6(X,0,Q,this.spaceAbove,_M):this.mainBlock(Q,X)}lineAt(Z,J,Q,X,Y){let K=this.mainBlock(X,Y);return this.spaceAbove?this.blockAt(0,Q,X,Y).join(K):K}forEachLine(Z,J,Q,X,Y,K){if(Z<=Y+this.length&&J>=Y)K(this.lineAt(0,g1.ByPos,Q,X,Y))}setMeasuredHeight(Z){let J=Z.heights[Z.index++];if(J<0)this.spaceAbove=-J,J=Z.heights[Z.index++];else this.spaceAbove=0;this.setHeight(J)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);return this.outdated=!1,this}toString(){return`block(${this.length})`}}class d0 extends mY{constructor(Z,J,Q){super(Z,J,null);this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=Q}mainBlock(Z,J){return new T6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(Z,J,Q){let X=Q[0];if(Q.length==1&&(X instanceof d0||X instanceof z0&&X.flags&4)&&Math.abs(this.length-X.length)<10){if(X instanceof z0)X=new d0(X.length,this.height,this.spaceAbove);else X.height=this.height;if(!this.outdated)X.outdated=!1;return X}else return E0.of(Q)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);else if(Q||this.outdated)this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,Z.heightForLine(this.length-this.collapsed))+this.breaks*Z.lineHeight);return this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class z0 extends E0{constructor(Z){super(Z,0)}heightMetrics(Z,J){let Q=Z.doc.lineAt(J).number,X=Z.doc.lineAt(J+this.length).number,Y=X-Q+1,K,I=0;if(Z.lineWrapping){let q=Math.min(this.height,Z.lineHeight*Y);if(K=q/Y,this.length>Y+1)I=(this.height-q)/(this.length-Y-1)}else K=this.height/Y;return{firstLine:Q,lastLine:X,perLine:K,perChar:I}}blockAt(Z,J,Q,X){let{firstLine:Y,lastLine:K,perLine:I,perChar:q}=this.heightMetrics(J,X);if(J.lineWrapping){let W=X+(Z<J.lineHeight?0:Math.round(Math.max(0,Math.min(1,(Z-Q)/this.height))*this.length)),G=J.doc.lineAt(W),U=I+G.length*q,z=Math.max(Q,Z-U/2);return new T6(G.from,G.length,z,U,0)}else{let W=Math.max(0,Math.min(K-Y,Math.floor((Z-Q)/I))),{from:G,length:U}=J.doc.line(Y+W);return new T6(G,U,Q+I*W,I,0)}}lineAt(Z,J,Q,X,Y){if(J==g1.ByHeight)return this.blockAt(Z,Q,X,Y);if(J==g1.ByPosNoHeight){let{from:j,to:O}=Q.doc.lineAt(Z);return new T6(j,O-j,0,0,0)}let{firstLine:K,perLine:I,perChar:q}=this.heightMetrics(Q,Y),W=Q.doc.lineAt(Z),G=I+W.length*q,U=W.number-K,z=X+I*U+q*(W.from-Y-U);return new T6(W.from,W.length,Math.max(X,Math.min(z,X+this.height-G)),G,0)}forEachLine(Z,J,Q,X,Y,K){Z=Math.max(Z,Y),J=Math.min(J,Y+this.length);let{firstLine:I,perLine:q,perChar:W}=this.heightMetrics(Q,Y);for(let G=Z,U=X;G<=J;){let z=Q.doc.lineAt(G);if(G==Z){let O=z.number-I;U+=q*O+W*(Z-Y-O)}let j=q+W*z.length;K(new T6(z.from,z.length,U,j,0)),U+=j,G=z.to+1}}replace(Z,J,Q){let X=this.length-J;if(X>0){let Y=Q[Q.length-1];if(Y instanceof z0)Q[Q.length-1]=new z0(Y.length+X);else Q.push(null,new z0(X-1))}if(Z>0){let Y=Q[0];if(Y instanceof z0)Q[0]=new z0(Z+Y.length);else Q.unshift(new z0(Z-1),null)}return E0.of(Q)}decomposeLeft(Z,J){J.push(new z0(Z-1),null)}decomposeRight(Z,J){J.push(null,new z0(this.length-Z-1))}updateHeight(Z,J=0,Q=!1,X){let Y=J+this.length;if(X&&X.from<=J+this.length&&X.more){let K=[],I=Math.max(J,X.from),q=-1;if(X.from>J)K.push(new z0(X.from-J-1).updateHeight(Z,J));while(I<=Y&&X.more){let G=Z.doc.lineAt(I).length;if(K.length)K.push(null);let U=X.heights[X.index++],z=0;if(U<0)z=-U,U=X.heights[X.index++];if(q==-1)q=U;else if(Math.abs(U-q)>=SZ)q=-2;let j=new d0(G,U,z);j.outdated=!1,K.push(j),I+=G+1}if(I<=Y)K.push(null,new z0(Y-I).updateHeight(Z,I));let W=E0.of(K);if(q<0||Math.abs(W.height-this.height)>=SZ||Math.abs(q-this.heightMetrics(Z,J).perLine)>=SZ)n7=!0;return gZ(this,W)}else if(Q||this.outdated)this.setHeight(Z.heightForGap(J,J+this.length)),this.outdated=!1;return this}toString(){return`gap(${this.length})`}}class JV extends E0{constructor(Z,J,Q){super(Z.length+J+Q.length,Z.height+Q.height,J|(Z.outdated||Q.outdated?2:0));this.left=Z,this.right=Q,this.size=Z.size+Q.size}get break(){return this.flags&1}blockAt(Z,J,Q,X){let Y=Q+this.left.height;return Z<Y?this.left.blockAt(Z,J,Q,X):this.right.blockAt(Z,J,Y,X+this.left.length+this.break)}lineAt(Z,J,Q,X,Y){let K=X+this.left.height,I=Y+this.left.length+this.break,q=J==g1.ByHeight?Z<K:Z<I,W=q?this.left.lineAt(Z,J,Q,X,Y):this.right.lineAt(Z,J,Q,K,I);if(this.break||(q?W.to<I:W.from>I))return W;let G=J==g1.ByPosNoHeight?g1.ByPosNoHeight:g1.ByPos;if(q)return W.join(this.right.lineAt(I,G,Q,K,I));else return this.left.lineAt(I,G,Q,X,Y).join(W)}forEachLine(Z,J,Q,X,Y,K){let I=X+this.left.height,q=Y+this.left.length+this.break;if(this.break){if(Z<q)this.left.forEachLine(Z,J,Q,X,Y,K);if(J>=q)this.right.forEachLine(Z,J,Q,I,q,K)}else{let W=this.lineAt(q,g1.ByPos,Q,X,Y);if(Z<W.from)this.left.forEachLine(Z,W.from-1,Q,X,Y,K);if(W.to>=Z&&W.from<=J)K(W);if(J>W.to)this.right.forEachLine(W.to+1,J,Q,I,q,K)}}replace(Z,J,Q){let X=this.left.length+this.break;if(J<X)return this.balanced(this.left.replace(Z,J,Q),this.right);if(Z>this.left.length)return this.balanced(this.left,this.right.replace(Z-X,J-X,Q));let Y=[];if(Z>0)this.decomposeLeft(Z,Y);let K=Y.length;for(let I of Q)Y.push(I);if(Z>0)yz(Y,K-1);if(J<this.length){let I=Y.length;this.decomposeRight(J,Y),yz(Y,I)}return E0.of(Y)}decomposeLeft(Z,J){let Q=this.left.length;if(Z<=Q)return this.left.decomposeLeft(Z,J);if(J.push(this.left),this.break){if(Q++,Z>=Q)J.push(null)}if(Z>Q)this.right.decomposeLeft(Z-Q,J)}decomposeRight(Z,J){let Q=this.left.length,X=Q+this.break;if(Z>=X)return this.right.decomposeRight(Z-X,J);if(Z<Q)this.left.decomposeRight(Z,J);if(this.break&&Z<X)J.push(null);J.push(this.right)}balanced(Z,J){if(Z.size>2*J.size||J.size>2*Z.size)return E0.of(this.break?[Z,null,J]:[Z,J]);return this.left=gZ(this.left,Z),this.right=gZ(this.right,J),this.setHeight(Z.height+J.height),this.outdated=Z.outdated||J.outdated,this.size=Z.size+J.size,this.length=Z.length+this.break+J.length,this}updateHeight(Z,J=0,Q=!1,X){let{left:Y,right:K}=this,I=J+Y.length+this.break,q=null;if(X&&X.from<=J+Y.length&&X.more)q=Y=Y.updateHeight(Z,J,Q,X);else Y.updateHeight(Z,J,Q);if(X&&X.from<=I+K.length&&X.more)q=K=K.updateHeight(Z,I,Q,X);else K.updateHeight(Z,I,Q);if(q)return this.balanced(Y,K);return this.height=this.left.height+this.right.height,this.outdated=!1,this}toString(){return this.left+(this.break?" ":"-")+this.right}}function yz(Z,J){let Q,X;if(Z[J]==null&&(Q=Z[J-1])instanceof z0&&(X=Z[J+1])instanceof z0)Z.splice(J-1,3,new z0(Q.length+1+X.length))}var EM=5;class pY{constructor(Z,J){this.pos=Z,this.oracle=J,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=Z}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(Z,J){if(this.lineStart>-1){let Q=Math.min(J,this.lineEnd),X=this.nodes[this.nodes.length-1];if(X instanceof d0)X.length+=Q-this.pos;else if(Q>this.pos||!this.isCovered)this.nodes.push(new d0(Q-this.pos,-1,0));if(this.writtenTo=Q,J>Q)this.nodes.push(null),this.writtenTo++,this.lineStart=-1}this.pos=J}point(Z,J,Q){if(Z<J||Q.heightRelevant){let X=Q.widget?Q.widget.estimatedHeight:0,Y=Q.widget?Q.widget.lineBreaks:0;if(X<0)X=this.oracle.lineHeight;let K=J-Z;if(Q.block)this.addBlock(new mY(K,X,Q));else if(K||Y||X>=EM)this.addLineDeco(X,Y,K)}else if(J>Z)this.span(Z,J);if(this.lineEnd>-1&&this.lineEnd<this.pos)this.lineEnd=this.oracle.doc.lineAt(this.pos).to}enterLine(){if(this.lineStart>-1)return;let{from:Z,to:J}=this.oracle.doc.lineAt(this.pos);if(this.lineStart=Z,this.lineEnd=J,this.writtenTo<Z){if(this.writtenTo<Z-1||this.nodes[this.nodes.length-1]==null)this.nodes.push(this.blankContent(this.writtenTo,Z-1));this.nodes.push(null)}if(this.pos>Z)this.nodes.push(new d0(this.pos-Z,-1,0));this.writtenTo=this.pos}blankContent(Z,J){let Q=new z0(J-Z);if(this.oracle.doc.lineAt(Z).to==J)Q.flags|=4;return Q}ensureLine(){this.enterLine();let Z=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(Z instanceof d0)return Z;let J=new d0(0,-1,0);return this.nodes.push(J),J}addBlock(Z){this.enterLine();let J=Z.deco;if(J&&J.startSide>0&&!this.isCovered)this.ensureLine();if(this.nodes.push(Z),this.writtenTo=this.pos=this.pos+Z.length,J&&J.endSide>0)this.covering=Z}addLineDeco(Z,J,Q){let X=this.ensureLine();X.length+=Q,X.collapsed+=Q,X.widgetHeight=Math.max(X.widgetHeight,Z),X.breaks+=J,this.writtenTo=this.pos=this.pos+Q}finish(Z){let J=this.nodes.length==0?null:this.nodes[this.nodes.length-1];if(this.lineStart>-1&&!(J instanceof d0)&&!this.isCovered)this.nodes.push(new d0(0,-1,0));else if(this.writtenTo<this.pos||J==null)this.nodes.push(this.blankContent(this.writtenTo,this.pos));let Q=Z;for(let X of this.nodes){if(X instanceof d0)X.updateHeight(this.oracle,Q);Q+=X?X.length:1}return this.nodes}static build(Z,J,Q,X){let Y=new pY(Q,Z);return N1.spans(J,Q,X,Y,0),Y.finish(Q)}}function CM(Z,J,Q){let X=new QV;return N1.compare(Z,J,Q,X,0),X.changes}class QV{constructor(){this.changes=[]}compareRange(){}comparePoint(Z,J,Q,X){if(Z<J||Q&&Q.heightRelevant||X&&X.heightRelevant)g7(Z,J,this.changes,5)}}function wM(Z,J){let Q=Z.getBoundingClientRect(),X=Z.ownerDocument,Y=X.defaultView||window,K=Math.max(0,Q.left),I=Math.min(Y.innerWidth,Q.right),q=Math.max(0,Q.top),W=Math.min(Y.innerHeight,Q.bottom);for(let G=Z.parentNode;G&&G!=X.body;)if(G.nodeType==1){let U=G,z=window.getComputedStyle(U);if((U.scrollHeight>U.clientHeight||U.scrollWidth>U.clientWidth)&&z.overflow!="visible"){let j=U.getBoundingClientRect();K=Math.max(K,j.left),I=Math.min(I,j.right),q=Math.max(q,j.top),W=Math.min(G==Z.parentNode?Y.innerHeight:W,j.bottom)}G=z.position=="absolute"||z.position=="fixed"?U.offsetParent:U.parentNode}else if(G.nodeType==11)G=G.host;else break;return{left:K-Q.left,right:Math.max(K,I)-Q.left,top:q-(Q.top+J),bottom:Math.max(q,W)-(Q.top+J)}}function hM(Z){let J=Z.getBoundingClientRect(),Q=Z.ownerDocument.defaultView||window;return J.left<Q.innerWidth&&J.right>0&&J.top<Q.innerHeight&&J.bottom>0}function kM(Z,J){let Q=Z.getBoundingClientRect();return{left:0,right:Q.right-Q.left,top:J,bottom:Q.bottom-(Q.top+J)}}class TZ{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.size=Q,this.displaySize=X}static same(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.size!=Y.size)return!1}return!0}draw(Z,J){return P1.replace({widget:new XV(this.displaySize*(J?Z.scaleY:Z.scaleX),J)}).range(this.from,this.to)}}class XV extends a4{constructor(Z,J){super();this.size=Z,this.vertical=J}eq(Z){return Z.size==this.size&&Z.vertical==this.vertical}toDOM(){let Z=document.createElement("div");if(this.vertical)Z.style.height=this.size+"px";else Z.style.width=this.size+"px",Z.style.height="2px",Z.style.display="inline-block";return Z}get estimatedHeight(){return this.vertical?this.size:-1}}class SY{constructor(Z,J){this.view=Z,this.state=J,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=gz,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=h1.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let Q=J.facet($Y).some((X)=>typeof X!="function"&&X.class=="cm-lineWrapping");this.heightOracle=new e2(Q),this.stateDeco=fz(J),this.heightMap=E0.empty().applyChanges(this.stateDeco,R1.empty,this.heightOracle.setDoc(J.doc),[new J6(0,0,0,J.doc.length)]);for(let X=0;X<2;X++)if(this.viewport=this.getViewport(0,null),!this.updateForViewport())break;this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=P1.set(this.lineGaps.map((X)=>X.draw(this,!1))),this.scrollParent=Z.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let Z=[this.viewport],{main:J}=this.state.selection;for(let Q=0;Q<=1;Q++){let X=Q?J.head:J.anchor;if(!Z.some(({from:Y,to:K})=>X>=Y&&X<=K)){let{from:Y,to:K}=this.lineBlockAt(X);Z.push(new I5(Y,K))}}return this.viewports=Z.sort((Q,X)=>Q.from-X.from),this.updateScaler()}updateScaler(){let Z=this.scaler;return this.scaler=this.heightMap.height<=7000000?gz:new cY(this.heightOracle,this.heightMap,this.viewports),Z.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,(Z)=>{this.viewportLines.push(q5(Z,this.scaler))})}update(Z,J=null){this.state=Z.state;let Q=this.stateDeco;this.stateDeco=fz(this.state);let X=Z.changedRanges,Y=J6.extendWithRanges(X,CM(Q,this.stateDeco,Z?Z.changes:a1.empty(this.state.doc.length))),K=this.heightMap.height,I=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);if(xz(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,Z.startState.doc,this.heightOracle.setDoc(this.state.doc),Y),this.heightMap.height!=K||n7)Z.flags|=2;if(I)this.scrollAnchorPos=Z.changes.mapPos(I.from,-1),this.scrollAnchorHeight=I.top;else this.scrollAnchorPos=-1,this.scrollAnchorHeight=K;let q=Y.length?this.mapViewport(this.viewport,Z.changes):this.viewport;if(J&&(J.range.head<q.from||J.range.head>q.to)||!this.viewportIsAppropriate(q))q=this.getViewport(0,J);let W=q.from!=this.viewport.from||q.to!=this.viewport.to;if(this.viewport=q,Z.flags|=this.updateForViewport(),W||!Z.changes.empty||Z.flags&2)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,Z.changes)));if(Z.flags|=this.computeVisibleRanges(Z.changes),J)this.scrollTarget=J;if(!this.mustEnforceCursorAssoc&&(Z.selectionSet||Z.focusChanged)&&Z.view.lineWrapping&&Z.state.selection.main.empty&&Z.state.selection.main.assoc&&!Z.state.facet(A2))this.mustEnforceCursorAssoc=!0}measure(){let{view:Z}=this,J=Z.contentDOM,Q=window.getComputedStyle(J),X=this.heightOracle,Y=Q.whiteSpace;this.defaultTextDirection=Q.direction=="rtl"?h1.RTL:h1.LTR;let K=this.heightOracle.mustRefreshForWrapping(Y)||this.mustMeasureContent==="refresh",I=J.getBoundingClientRect(),q=K||this.mustMeasureContent||this.contentDOMHeight!=I.height;this.contentDOMHeight=I.height,this.mustMeasureContent=!1;let W=0,G=0;if(I.width&&I.height){let{scaleX:h,scaleY:L}=ez(J,I);if(h>0.005&&Math.abs(this.scaleX-h)>0.005||L>0.005&&Math.abs(this.scaleY-L)>0.005)this.scaleX=h,this.scaleY=L,W|=16,K=q=!0}let U=(parseInt(Q.paddingTop)||0)*this.scaleY,z=(parseInt(Q.paddingBottom)||0)*this.scaleY;if(this.paddingTop!=U||this.paddingBottom!=z)this.paddingTop=U,this.paddingBottom=z,W|=18;if(this.editorWidth!=Z.scrollDOM.clientWidth){if(X.lineWrapping)q=!0;this.editorWidth=Z.scrollDOM.clientWidth,W|=16}let j=Z2(this.view.contentDOM,!1).y;if(j!=this.scrollParent)this.scrollParent=j,this.scrollAnchorHeight=-1,this.scrollOffset=0;let O=this.getScrollOffset();if(this.scrollOffset!=O)this.scrollAnchorHeight=-1,this.scrollOffset=O;this.scrolledToBottom=K2(this.scrollParent||Z.win);let H=(this.printing?kM:wM)(J,this.paddingTop),N=H.top-this.pixelViewport.top,R=H.bottom-this.pixelViewport.bottom;this.pixelViewport=H;let T=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(T!=this.inView){if(this.inView=T,T)q=!0}if(!this.inView&&!this.scrollTarget&&!hM(Z.dom))return 0;let _=I.width;if(this.contentDOMWidth!=_||this.editorHeight!=Z.scrollDOM.clientHeight)this.contentDOMWidth=I.width,this.editorHeight=Z.scrollDOM.clientHeight,W|=16;if(q){let h=Z.docView.measureVisibleLineHeights(this.viewport);if(X.mustRefreshForHeights(h))K=!0;if(K||X.lineWrapping&&Math.abs(_-this.contentDOMWidth)>X.charWidth){let{lineHeight:L,charWidth:S,textHeight:B}=Z.docView.measureTextSize();if(K=L>0&&X.refresh(Y,L,S,B,Math.max(5,_/S),h),K)Z.docView.minWidth=0,W|=16}if(N>0&&R>0)G=Math.max(N,R);else if(N<0&&R<0)G=Math.min(N,R);xz();for(let L of this.viewports){let S=L.from==this.viewport.from?h:Z.docView.measureVisibleLineHeights(L);this.heightMap=(K?E0.empty().applyChanges(this.stateDeco,R1.empty,this.heightOracle,[new J6(0,0,0,Z.state.doc.length)]):this.heightMap).updateHeight(X,0,K,new ZV(L.from,S))}if(n7)W|=2}let C=!this.viewportIsAppropriate(this.viewport,G)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);if(C){if(W&2)W|=this.updateScaler();this.viewport=this.getViewport(G,this.scrollTarget),W|=this.updateForViewport()}if(W&2||C)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(K?[]:this.lineGaps,Z));if(W|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc)this.mustEnforceCursorAssoc=!1,Z.docView.enforceCursorAssoc();return W}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(Z,J){let Q=0.5-Math.max(-0.5,Math.min(0.5,Z/1000/2)),X=this.heightMap,Y=this.heightOracle,{visibleTop:K,visibleBottom:I}=this,q=new I5(X.lineAt(K-Q*1000,g1.ByHeight,Y,0,0).from,X.lineAt(I+(1-Q)*1000,g1.ByHeight,Y,0,0).to);if(J){let{head:W}=J.range;if(W<q.from||W>q.to){let G=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),U=X.lineAt(W,g1.ByPos,Y,0,0),z;if(J.y=="center")z=(U.top+U.bottom)/2-G/2;else if(J.y=="start"||J.y=="nearest"&&W<q.from)z=U.top;else z=U.bottom-G;q=new I5(X.lineAt(z-500,g1.ByHeight,Y,0,0).from,X.lineAt(z+G+500,g1.ByHeight,Y,0,0).to)}}return q}mapViewport(Z,J){let Q=J.mapPos(Z.from,-1),X=J.mapPos(Z.to,1);return new I5(this.heightMap.lineAt(Q,g1.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(X,g1.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:Z,to:J},Q=0){if(!this.inView)return!0;let{top:X}=this.heightMap.lineAt(Z,g1.ByPos,this.heightOracle,0,0),{bottom:Y}=this.heightMap.lineAt(J,g1.ByPos,this.heightOracle,0,0),{visibleTop:K,visibleBottom:I}=this;return(Z==0||X<=K-Math.max(10,Math.min(-Q,250)))&&(J==this.state.doc.length||Y>=I+Math.max(10,Math.min(Q,250)))&&(X>K-2000&&Y<I+2000)}mapLineGaps(Z,J){if(!Z.length||J.empty)return Z;let Q=[];for(let X of Z)if(!J.touchesRange(X.from,X.to))Q.push(new TZ(J.mapPos(X.from),J.mapPos(X.to),X.size,X.displaySize));return Q}ensureLineGaps(Z,J){let Q=this.heightOracle.lineWrapping,X=Q?1e4:2000,Y=X>>1,K=X<<1;if(this.defaultTextDirection!=h1.LTR&&!Q)return[];let I=[],q=(G,U,z,j)=>{if(U-G<Y)return;let O=this.state.selection.main,H=[O.from];if(!O.empty)H.push(O.to);for(let R of H)if(R>G&&R<U){q(G,R-10,z,j),q(R+10,U,z,j);return}let N=xM(Z,(R)=>R.from>=z.from&&R.to<=z.to&&Math.abs(R.from-G)<Y&&Math.abs(R.to-U)<Y&&!H.some((T)=>R.from<T&&R.to>T));if(!N){if(U<z.to&&J&&Q&&J.visibleRanges.some((_)=>_.from<=U&&_.to>=U)){let _=J.moveToLineBoundary(u.cursor(U),!1,!0).head;if(_>G)U=_}let R=this.gapSize(z,G,U,j),T=Q||R<2000000?R:2000000;N=new TZ(G,U,R,T)}I.push(N)},W=(G)=>{if(G.length<K||G.type!=V0.Text)return;let U=bM(G.from,G.to,this.stateDeco);if(U.total<K)return;let z=this.scrollTarget?this.scrollTarget.range.head:null,j,O;if(Q){let H=X/this.heightOracle.lineLength*this.heightOracle.lineHeight,N,R;if(z!=null){let T=NZ(U,z),_=((this.visibleBottom-this.visibleTop)/2+H)/G.height;N=T-_,R=T+_}else N=(this.visibleTop-G.top-H)/G.height,R=(this.visibleBottom-G.top+H)/G.height;j=HZ(U,N),O=HZ(U,R)}else{let H=U.total*this.heightOracle.charWidth,N=X*this.heightOracle.charWidth,R=0;if(H>2000000){for(let L of Z)if(L.from>=G.from&&L.from<G.to&&L.size!=L.displaySize&&L.from*this.heightOracle.charWidth+R<this.pixelViewport.left)R=L.size-L.displaySize}let T=this.pixelViewport.left+R,_=this.pixelViewport.right+R,C,h;if(z!=null){let L=NZ(U,z),S=((_-T)/2+N)/H;C=L-S,h=L+S}else C=(T-N)/H,h=(_+N)/H;j=HZ(U,C),O=HZ(U,h)}if(j>G.from)q(G.from,j,G,U);if(O<G.to)q(O,G.to,G,U)};for(let G of this.viewportLines)if(Array.isArray(G.type))G.type.forEach(W);else W(G);return I}gapSize(Z,J,Q,X){let Y=NZ(X,Q)-NZ(X,J);if(this.heightOracle.lineWrapping)return Z.height*Y;else return X.total*this.heightOracle.charWidth*Y}updateLineGaps(Z){if(!TZ.same(Z,this.lineGaps))this.lineGaps=Z,this.lineGapDeco=P1.set(Z.map((J)=>J.draw(this,this.heightOracle.lineWrapping)))}computeVisibleRanges(Z){let J=this.stateDeco;if(this.lineGaps.length)J=J.concat(this.lineGapDeco);let Q=[];N1.spans(J,this.viewport.from,this.viewport.to,{span(Y,K){Q.push({from:Y,to:K})},point(){}},20);let X=0;if(Q.length!=this.visibleRanges.length)X=12;else for(let Y=0;Y<Q.length&&!(X&8);Y++){let K=this.visibleRanges[Y],I=Q[Y];if(K.from!=I.from||K.to!=I.to){if(X|=4,!(Z&&Z.mapPos(K.from,-1)==I.from&&Z.mapPos(K.to,1)==I.to))X|=8}}return this.visibleRanges=Q,X}lineBlockAt(Z){return Z>=this.viewport.from&&Z<=this.viewport.to&&this.viewportLines.find((J)=>J.from<=Z&&J.to>=Z)||q5(this.heightMap.lineAt(Z,g1.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(Z){return Z>=this.viewportLines[0].top&&Z<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find((J)=>J.top<=Z&&J.bottom>=Z)||q5(this.heightMap.lineAt(this.scaler.fromDOM(Z),g1.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(Z){let J=this.lineBlockAtHeight(Z+8);return J.from>=this.viewport.from||this.viewportLines[0].top-Z>200?J:this.viewportLines[0]}elementAtHeight(Z){return q5(this.heightMap.blockAt(this.scaler.fromDOM(Z),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class I5{constructor(Z,J){this.from=Z,this.to=J}}function bM(Z,J,Q){let X=[],Y=Z,K=0;if(N1.spans(Q,Z,J,{span(){},point(I,q){if(I>Y)X.push({from:Y,to:I}),K+=I-Y;Y=q}},20),Y<J)X.push({from:Y,to:J}),K+=J-Y;return{total:K,ranges:X}}function HZ({total:Z,ranges:J},Q){if(Q<=0)return J[0].from;if(Q>=1)return J[J.length-1].to;let X=Math.floor(Z*Q);for(let Y=0;;Y++){let{from:K,to:I}=J[Y],q=I-K;if(X<=q)return K+X;X-=q}}function NZ(Z,J){let Q=0;for(let{from:X,to:Y}of Z.ranges){if(J<=Y){Q+=J-X;break}Q+=Y-X}return Q/Z.total}function xM(Z,J){for(let Q of Z)if(J(Q))return Q;return}var gz={toDOM(Z){return Z},fromDOM(Z){return Z},scale:1,eq(Z){return Z==this}};function fz(Z){let J=Z.facet(nZ).filter((X)=>typeof X!="function"),Q=Z.facet(uY).filter((X)=>typeof X!="function");if(Q.length)J.push(N1.join(Q));return J}class cY{constructor(Z,J,Q){let X=0,Y=0,K=0;this.viewports=Q.map(({from:I,to:q})=>{let W=J.lineAt(I,g1.ByPos,Z,0,0).top,G=J.lineAt(q,g1.ByPos,Z,0,0).bottom;return X+=G-W,{from:I,to:q,top:W,bottom:G,domTop:0,domBottom:0}}),this.scale=(7000000-X)/(J.height-X);for(let I of this.viewports)I.domTop=K+(I.top-Y)*this.scale,K=I.domBottom=I.domTop+(I.bottom-I.top),Y=I.bottom}toDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.top)return X+(Z-Q)*this.scale;if(Z<=Y.bottom)return Y.domTop+(Z-Y.top);Q=Y.bottom,X=Y.domBottom}}fromDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.domTop)return Q+(Z-X)/this.scale;if(Z<=Y.domBottom)return Y.top+(Z-Y.domTop);Q=Y.bottom,X=Y.domBottom}}eq(Z){if(!(Z instanceof cY))return!1;return this.scale==Z.scale&&this.viewports.length==Z.viewports.length&&this.viewports.every((J,Q)=>J.from==Z.viewports[Q].from&&J.to==Z.viewports[Q].to)}}function q5(Z,J){if(J.scale==1)return Z;let Q=J.toDOM(Z.top),X=J.toDOM(Z.bottom);return new T6(Z.from,Z.length,Q,X-Q,Array.isArray(Z._content)?Z._content.map((Y)=>q5(Y,J)):Z._content)}var RZ=o.define({combine:(Z)=>Z.join(" ")}),TY=o.define({combine:(Z)=>Z.indexOf(!0)>-1}),_Y=P6.newName(),YV=P6.newName(),KV=P6.newName(),IV={"&light":"."+YV,"&dark":"."+KV};function EY(Z,J,Q){return new P6(J,{finish(X){return/&/.test(X)?X.replace(/&\w*/,(Y)=>{if(Y=="&")return Z;if(!Q||!Q[Y])throw RangeError(`Unsupported selector: ${Y}`);return Q[Y]}):Z+" "+X}})}var yM=EY("."+_Y,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{userSelect:"none",position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},".cm-panels-top":{top:"0"},".cm-panels-bottom":{bottom:"0"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},IV),gM={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},IY=r.ie&&r.ie_version<=11;class qV{constructor(Z){if(this.view=Z,this.active=!1,this.editContext=null,this.selectionRange=new J2,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=Z.contentDOM,this.observer=new MutationObserver((J)=>{for(let Q of J)this.queue.push(Q);if((r.ie&&r.ie_version<=11||r.ios&&Z.composing)&&J.some((Q)=>Q.type=="childList"&&Q.removedNodes.length||Q.type=="characterData"&&Q.oldValue.length>Q.target.nodeValue.length))this.flushSoon();else this.flush()}),window.EditContext&&r.android&&Z.constructor.EDIT_CONTEXT!==!1&&!(r.chrome&&r.chrome_version<126)){if(this.editContext=new WV(Z),Z.state.facet(L4))Z.contentDOM.editContext=this.editContext.editContext}if(IY)this.onCharData=(J)=>{this.queue.push({target:J.target,type:"characterData",oldValue:J.prevValue}),this.flushSoon()};if(this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia)this.printQuery=window.matchMedia("print");if(typeof ResizeObserver=="function")this.resizeScroll=new ResizeObserver(()=>{var J;if(((J=this.view.docView)===null||J===void 0?void 0:J.lastUpdate)<Date.now()-75)this.onResize()}),this.resizeScroll.observe(Z.scrollDOM);if(this.addWindowListeners(this.win=Z.win),this.start(),typeof IntersectionObserver=="function")this.intersection=new IntersectionObserver((J)=>{if(this.parentCheck<0)this.parentCheck=setTimeout(this.listenForScroll.bind(this),1000);if(J.length>0&&J[J.length-1].intersectionRatio>0!=this.intersecting){if(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView)this.onScrollChanged(document.createEvent("Event"))}},{threshold:[0,0.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver((J)=>{if(J.length>0&&J[J.length-1].intersectionRatio>0)this.onScrollChanged(document.createEvent("Event"))},{});this.listenForScroll(),this.readSelectionRange()}onScrollChanged(Z){if(this.view.inputState.runHandlers("scroll",Z),this.intersecting)this.view.measure()}onScroll(Z){if(this.intersecting)this.flush(!1);if(this.editContext)this.view.requestMeasure(this.editContext.measureReq);this.onScrollChanged(Z)}onResize(){if(this.resizeTimeout<0)this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50)}onPrint(Z){if((Z.type=="change"||!Z.type)&&!Z.matches)return;this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500)}updateGaps(Z){if(this.gapIntersection&&(Z.length!=this.gaps.length||this.gaps.some((J,Q)=>J!=Z[Q]))){this.gapIntersection.disconnect();for(let J of Z)this.gapIntersection.observe(J);this.gaps=Z}}onSelectionChange(Z){let J=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:Q}=this,X=this.selectionRange;if(Q.state.facet(L4)?Q.root.activeElement!=this.dom:!G5(this.dom,X))return;let Y=X.anchorNode&&Q.docView.tile.nearest(X.anchorNode);if(Y&&Y.isWidget()&&Y.widget.ignoreEvent(Z)){if(!J)this.selectionChanged=!1;return}if((r.ie&&r.ie_version<=11||r.android&&r.chrome)&&!Q.state.selection.main.empty&&X.focusNode&&U5(X.focusNode,X.focusOffset,X.anchorNode,X.anchorOffset))this.flushSoon();else this.flush(!1)}readSelectionRange(){let{view:Z}=this,J=j5(Z.root);if(!J)return!1;let Q=r.safari&&Z.root.nodeType==11&&Z.root.activeElement==this.dom&&fM(this.view,J)||J;if(!Q||this.selectionRange.eq(Q))return!1;let X=G5(this.dom,Q);if(X&&!this.selectionChanged&&Z.inputState.lastFocusTime>Date.now()-200&&Z.inputState.lastTouchTime<Date.now()-300&&hR(this.dom,Q))return this.view.inputState.lastFocusTime=0,Z.docView.updateSelection(),!1;if(this.selectionRange.setRange(Q),X)this.selectionChanged=!0;return!0}setSelectionRange(Z,J){this.selectionRange.set(Z.node,Z.offset,J.node,J.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let Z=0,J=null;for(let Q=this.dom;Q;)if(Q.nodeType==1){if(!J&&Z<this.scrollTargets.length&&this.scrollTargets[Z]==Q)Z++;else if(!J)J=this.scrollTargets.slice(0,Z);if(J)J.push(Q);Q=Q.assignedSlot||Q.parentNode}else if(Q.nodeType==11)Q=Q.host;else break;if(Z<this.scrollTargets.length&&!J)J=this.scrollTargets.slice(0,Z);if(J){for(let Q of this.scrollTargets)Q.removeEventListener("scroll",this.onScroll);for(let Q of this.scrollTargets=J)Q.addEventListener("scroll",this.onScroll)}}ignore(Z){if(!this.active)return Z();try{return this.stop(),Z()}finally{this.start(),this.clear()}}start(){if(this.active)return;if(this.observer.observe(this.dom,gM),IY)this.dom.addEventListener("DOMCharacterDataModified",this.onCharData);this.active=!0}stop(){if(!this.active)return;if(this.active=!1,this.observer.disconnect(),IY)this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(Z,J){var Q;if(!this.delayedAndroidKey){let X=()=>{let Y=this.delayedAndroidKey;if(Y){if(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=Y.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&Y.force)f7(this.dom,Y.key,Y.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(X)}if(!this.delayedAndroidKey||Z=="Enter")this.delayedAndroidKey={key:Z,keyCode:J,force:this.lastChange<Date.now()-50||!!((Q=this.delayedAndroidKey)===null||Q===void 0?void 0:Q.force)}}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){if(this.delayedFlush<0)this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()})}forceFlush(){if(this.delayedFlush>=0)this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1;this.flush()}pendingRecords(){for(let Z of this.observer.takeRecords())this.queue.push(Z);return this.queue}processRecords(){let Z=this.pendingRecords();if(Z.length)this.queue=[];let J=-1,Q=-1,X=!1;for(let Y of Z){let K=this.readMutation(Y);if(!K)continue;if(K.typeOver)X=!0;if(J==-1)({from:J,to:Q}=K);else J=Math.min(K.from,J),Q=Math.max(K.to,Q)}return{from:J,to:Q,typeOver:X}}readChange(){let{from:Z,to:J,typeOver:Q}=this.processRecords(),X=this.selectionChanged&&G5(this.dom,this.selectionRange);if(Z<0&&!X)return null;if(Z>-1)this.lastChange=Date.now();this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let Y=new u2(this.view,Z,J,Q);return this.view.docView.domChanged={newSel:Y.newSel?Y.newSel.main:null},Y}flush(Z=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;if(Z)this.readSelectionRange();let J=this.readChange();if(!J)return this.view.requestMeasure(),!1;let Q=this.view.state,X=v2(this.view,J);if(this.view.state==Q&&(J.domChanged||J.newSel&&!yZ(this.view.state.selection,J.newSel.main)))this.view.update([]);return X}readMutation(Z){let J=this.view.docView.tile.nearest(Z.target);if(!J||J.isWidget())return null;if(J.markDirty(Z.type=="attributes"),Z.type=="childList"){let Q=$z(J,Z.previousSibling||Z.target.previousSibling,-1),X=$z(J,Z.nextSibling||Z.target.nextSibling,1);return{from:Q?J.posAfter(Q):J.posAtStart,to:X?J.posBefore(X):J.posAtEnd,typeOver:!1}}else if(Z.type=="characterData")return{from:J.posAtStart,to:J.posAtEnd,typeOver:Z.target.nodeValue==Z.oldValue};else return null}setWindow(Z){if(Z!=this.win)this.removeWindowListeners(this.win),this.win=Z,this.addWindowListeners(this.win)}addWindowListeners(Z){if(Z.addEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.addEventListener)this.printQuery.addEventListener("change",this.onPrint);else this.printQuery.addListener(this.onPrint);else Z.addEventListener("beforeprint",this.onPrint);Z.addEventListener("scroll",this.onScroll),Z.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(Z){if(Z.removeEventListener("scroll",this.onScroll),Z.removeEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.removeEventListener)this.printQuery.removeEventListener("change",this.onPrint);else this.printQuery.removeListener(this.onPrint);else Z.removeEventListener("beforeprint",this.onPrint);Z.document.removeEventListener("selectionchange",this.onSelectionChange)}update(Z){if(this.editContext){if(this.editContext.update(Z),Z.startState.facet(L4)!=Z.state.facet(L4))Z.view.contentDOM.editContext=Z.state.facet(L4)?this.editContext.editContext:null}}destroy(){var Z,J,Q;this.stop(),(Z=this.intersection)===null||Z===void 0||Z.disconnect(),(J=this.gapIntersection)===null||J===void 0||J.disconnect(),(Q=this.resizeScroll)===null||Q===void 0||Q.disconnect();for(let X of this.scrollTargets)X.removeEventListener("scroll",this.onScroll);if(this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext)this.view.contentDOM.editContext=null,this.editContext.destroy()}}function $z(Z,J,Q){while(J){let X=c1.get(J);if(X&&X.parent==Z)return X;let Y=J.parentNode;J=Y!=Z.dom?Y:Q>0?J.nextSibling:J.previousSibling}return null}function uz(Z,J){let{startContainer:Q,startOffset:X,endContainer:Y,endOffset:K}=J,I=Z.docView.domAtPos(Z.state.selection.main.anchor,1);if(U5(I.node,I.offset,Y,K))[Q,X,Y,K]=[Y,K,Q,X];return{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}}function fM(Z,J){if(J.getComposedRanges){let Y=J.getComposedRanges(Z.root)[0];if(Y)return uz(Z,Y)}let Q=null;function X(Y){Y.preventDefault(),Y.stopImmediatePropagation(),Q=Y.getTargetRanges()[0]}return Z.contentDOM.addEventListener("beforeinput",X,!0),Z.dom.ownerDocument.execCommand("indent"),Z.contentDOM.removeEventListener("beforeinput",X,!0),Q?uz(Z,Q):null}class WV{constructor(Z){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(Z.state);let J=this.editContext=new window.EditContext({text:Z.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,Z.state.selection.main.anchor))),selectionEnd:this.toContextPos(Z.state.selection.main.head)});this.handlers.textupdate=(Q)=>{let X=Z.state.selection.main,{anchor:Y,head:K}=X,I=this.toEditorPos(Q.updateRangeStart),q=this.toEditorPos(Q.updateRangeEnd);if(Z.inputState.composing>=0&&!this.composing)this.composing={contextBase:Q.updateRangeStart,editorBase:I,drifted:!1};let W=q-I>Q.text.length;if(I==this.from&&Y<this.from)I=Y;else if(q==this.to&&Y>this.to)q=Y;let G=m2(Z.state.sliceDoc(I,q),Q.text,(W?X.from:X.to)-I,W?"end":null);if(!G){let z=u.single(this.toEditorPos(Q.selectionStart),this.toEditorPos(Q.selectionEnd));if(!yZ(z,X))Z.dispatch({selection:z,userEvent:"select"});return}let U={from:G.from+I,to:G.toA+I,insert:R1.of(Q.text.slice(G.from,G.toB).split(`
`))};if((r.mac||r.android)&&U.from==K-1&&/^\. ?$/.test(Q.text)&&Z.contentDOM.getAttribute("autocorrect")=="off")U={from:I,to:q,insert:R1.of([Q.text.replace("."," ")])};if(this.pendingContextChange=U,!Z.state.readOnly){let z=this.to-this.from+(U.to-U.from+U.insert.length);vY(Z,U,u.single(this.toEditorPos(Q.selectionStart,z),this.toEditorPos(Q.selectionEnd,z)))}if(this.pendingContextChange)this.revertPending(Z.state),this.setSelection(Z.state);if(U.from<U.to&&!U.insert.length&&Z.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(J.text.slice(Math.max(0,Q.updateRangeStart-1),Math.min(J.text.length,Q.updateRangeStart+1))))this.handlers.compositionend(Q)},this.handlers.characterboundsupdate=(Q)=>{let X=[],Y=null;for(let K=this.toEditorPos(Q.rangeStart),I=this.toEditorPos(Q.rangeEnd);K<I;K++){let q=Z.coordsForChar(K);Y=q&&new DOMRect(q.left,q.top,q.right-q.left,q.bottom-q.top)||Y||new DOMRect,X.push(Y)}J.updateCharacterBounds(Q.rangeStart,X)},this.handlers.textformatupdate=(Q)=>{let X=[];for(let Y of Q.getTextFormats()){let{underlineStyle:K,underlineThickness:I}=Y;if(!/none/i.test(K)&&!/none/i.test(I)){let q=this.toEditorPos(Y.rangeStart),W=this.toEditorPos(Y.rangeEnd);if(q<W){let G=`text-decoration: underline ${/^[a-z]/.test(K)?K+" ":K=="Dashed"?"dashed ":K=="Squiggle"?"wavy ":""}${/thin/i.test(I)?1:2}px`;X.push(P1.mark({attributes:{style:G}}).range(q,W))}}}Z.dispatch({effects:L2.of(P1.set(X))})},this.handlers.compositionstart=()=>{if(Z.inputState.composing<0)Z.inputState.composing=0,Z.inputState.compositionFirstChange=!0},this.handlers.compositionend=()=>{if(Z.inputState.composing=-1,Z.inputState.compositionFirstChange=null,this.composing){let{drifted:Q}=this.composing;if(this.composing=null,Q)this.reset(Z.state)}};for(let Q in this.handlers)J.addEventListener(Q,this.handlers[Q]);this.measureReq={read:(Q)=>{let X=j5(Q.root);if(X&&X.rangeCount)this.editContext.updateSelectionBounds(X.getRangeAt(0).getBoundingClientRect())}}}applyEdits(Z){let J=0,Q=!1,X=this.pendingContextChange;if(Z.changes.iterChanges((Y,K,I,q,W)=>{if(Q)return;let G=W.length-(K-Y);if(X&&K>=X.to)if(X.from==Y&&X.to==K&&X.insert.eq(W)){X=this.pendingContextChange=null,J+=G,this.to+=G;return}else X=null,this.revertPending(Z.state);if(Y+=J,K+=J,K<=this.from)this.from+=G,this.to+=G;else if(Y<this.to){if(Y<this.from||K>this.to||this.to-this.from+W.length>30000){Q=!0;return}this.editContext.updateText(this.toContextPos(Y),this.toContextPos(K),W.toString()),this.to+=G}J+=G}),X&&!Q)this.revertPending(Z.state);return!Q}update(Z){let J=this.pendingContextChange,Q=Z.startState.selection.main;if(this.composing&&(this.composing.drifted||!Z.changes.touchesRange(Q.from,Q.to)&&Z.transactions.some((X)=>!X.isUserEvent("input.type")&&X.changes.touchesRange(this.from,this.to))))this.composing.drifted=!0,this.composing.editorBase=Z.changes.mapPos(this.composing.editorBase);else if(!this.applyEdits(Z)||!this.rangeIsValid(Z.state))this.pendingContextChange=null,this.reset(Z.state);else if(Z.docChanged||Z.selectionSet||J)this.setSelection(Z.state);if(Z.geometryChanged||Z.docChanged||Z.selectionSet)Z.view.requestMeasure(this.measureReq)}resetRange(Z){let{head:J}=Z.selection.main;this.from=Math.max(0,J-1e4),this.to=Math.min(Z.doc.length,J+1e4)}reset(Z){this.resetRange(Z),this.editContext.updateText(0,this.editContext.text.length,Z.doc.sliceString(this.from,this.to)),this.setSelection(Z)}revertPending(Z){let J=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(J.from),this.toContextPos(J.from+J.insert.length),Z.doc.sliceString(J.from,J.to))}setSelection(Z){let{main:J}=Z.selection,Q=this.toContextPos(Math.max(this.from,Math.min(this.to,J.anchor))),X=this.toContextPos(J.head);if(this.editContext.selectionStart!=Q||this.editContext.selectionEnd!=X)this.editContext.updateSelection(Q,X)}rangeIsValid(Z){let{head:J}=Z.selection.main;return!(this.from>0&&J-this.from<500||this.to<Z.doc.length&&this.to-J<500||this.to-this.from>30000)}toEditorPos(Z,J=this.to-this.from){Z=Math.min(Z,J);let Q=this.composing;return Q&&Q.drifted?Q.editorBase+(Z-Q.contextBase):Z+this.from}toContextPos(Z){let J=this.composing;return J&&J.drifted?J.contextBase+(Z-J.editorBase):Z-this.from}destroy(){for(let Z in this.handlers)this.editContext.removeEventListener(Z,this.handlers[Z])}}class K1{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(Z={}){var J;if(this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),Z.parent)Z.parent.appendChild(this.dom);let{dispatch:Q}=Z;if(this.dispatchTransactions=Z.dispatchTransactions||Q&&((X)=>X.forEach((Y)=>Q(Y,this)))||((X)=>this.update(X)),this.dispatch=this.dispatch.bind(this),this._root=Z.root||wR(Z.parent)||document,this.viewState=new SY(this,Z.state||L1.create(Z)),Z.scrollTo&&Z.scrollTo.is(jZ))this.viewState.scrollTarget=Z.scrollTo.value.clip(this.viewState.state);this.plugins=this.state.facet(x7).map((X)=>new BZ(X));for(let X of this.plugins)X.update(this);if(this.observer=new qV(this),this.inputState=new p2(this),this.inputState.ensureHandlers(this.plugins),this.docView=new MY(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),(J=document.fonts)===null||J===void 0?void 0:J.ready)document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...Z){let J=Z.length==1&&Z[0]instanceof o1?Z:Z.length==1&&Array.isArray(Z[0])?Z[0]:[this.state.update(...Z)];this.dispatchTransactions(J,this)}update(Z){if(this.updateState!=0)throw Error("Calls to EditorView.update are not allowed while an update is in progress");let J=!1,Q=!1,X,Y=this.state;for(let z of Z){if(z.startState!=Y)throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");Y=z.state}if(this.destroyed){this.viewState.state=Y;return}let K=this.hasFocus,I=0,q=null;if(Z.some((z)=>z.annotation(a2)))this.inputState.notifiedFocused=K,I=1;else if(K!=this.inputState.notifiedFocused){if(this.inputState.notifiedFocused=K,q=o2(Y,K),!q)I=1}let W=this.observer.delayedAndroidKey,G=null;if(W){if(this.observer.clearDelayedAndroidKey(),G=this.observer.readChange(),G&&!this.state.doc.eq(Y.doc)||!this.state.selection.eq(Y.selection))G=null}else this.observer.clear();if(Y.facet(L1.phrases)!=this.state.facet(L1.phrases))return this.setState(Y);X=bZ.create(this,Y,Z),X.flags|=I;let U=this.viewState.scrollTarget;try{this.updateState=2;for(let z of Z){if(U)U=U.map(z.changes);if(z.scrollIntoView){let{main:j}=z.state.selection,{x:O,y:H}=this.state.facet(K1.cursorScrollMargin);U=new $7(j.empty?j:u.cursor(j.head,j.head>j.anchor?-1:1),"nearest","nearest",H,O)}for(let j of z.effects)if(j.is(jZ))U=j.value.clip(this.state)}if(this.viewState.update(X,U),this.bidiCache=fZ.update(this.bidiCache,X.changes),!X.empty)this.updatePlugins(X),this.inputState.update(X);if(J=this.docView.update(X),this.state.facet(K5)!=this.styleModules)this.mountStyles();Q=this.updateAttrs(),this.showAnnouncements(Z),this.docView.updateSelection(J,Z.some((z)=>z.isUserEvent("select.pointer")))}finally{this.updateState=0}if(X.startState.facet(RZ)!=X.state.facet(RZ))this.viewState.mustMeasureContent=!0;if(J||Q||U||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)this.requestMeasure();if(J)this.docViewUpdate();if(!X.empty)for(let z of this.state.facet(RY))try{z(X)}catch(j){s0(this.state,j,"update listener")}if(q||G)Promise.resolve().then(()=>{if(q&&this.state==q.startState)this.dispatch(q);if(G){if(!v2(this,G)&&W.force)f7(this.contentDOM,W.key,W.keyCode)}})}setState(Z){if(this.updateState!=0)throw Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=Z;return}this.updateState=2;let J=this.hasFocus;try{for(let Q of this.plugins)Q.destroy(this);this.viewState=new SY(this,Z),this.plugins=Z.facet(x7).map((Q)=>new BZ(Q)),this.pluginMap.clear();for(let Q of this.plugins)Q.update(this);this.docView.destroy(),this.docView=new MY(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}if(J)this.focus();this.requestMeasure()}updatePlugins(Z){let J=Z.startState.facet(x7),Q=Z.state.facet(x7);if(J!=Q){let X=[];for(let Y of Q){let K=J.indexOf(Y);if(K<0)X.push(new BZ(Y));else{let I=this.plugins[K];I.mustUpdate=Z,X.push(I)}}for(let Y of this.plugins)if(Y.mustUpdate!=Z)Y.destroy(this);this.plugins=X,this.pluginMap.clear()}else for(let X of this.plugins)X.mustUpdate=Z;for(let X=0;X<this.plugins.length;X++)this.plugins[X].update(this);if(J!=Q)this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let Z of this.plugins){let J=Z.value;if(J&&J.docViewUpdate)try{J.docViewUpdate(this)}catch(Q){s0(this.state,Q,"doc view update listener")}}}measure(Z=!0){if(this.destroyed)return;if(this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);if(this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}if(this.measureScheduled=0,Z)this.observer.forceFlush();let J=null,Q=this.viewState.scrollParent,X=this.viewState.getScrollOffset(),{scrollAnchorPos:Y,scrollAnchorHeight:K}=this.viewState;if(Math.abs(X-this.viewState.scrollOffset)>1)K=-1;this.viewState.scrollAnchorHeight=-1;try{for(let I=0;;I++){if(K<0)if(K2(Q||this.win))Y=-1,K=this.viewState.heightMap.height;else{let j=this.viewState.scrollAnchorAt(X);Y=j.from,K=j.top}this.updateState=1;let q=this.viewState.measure();if(!q&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(I>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let W=[];if(!(q&4))[this.measureRequests,W]=[W,this.measureRequests];let G=W.map((j)=>{try{return j.read(this)}catch(O){return s0(this.state,O),nz}}),U=bZ.create(this,this.state,[]),z=!1;if(U.flags|=q,!J)J=U;else J.flags|=q;if(this.updateState=2,!U.empty){if(this.updatePlugins(U),this.inputState.update(U),this.updateAttrs(),z=this.docView.update(U),z)this.docViewUpdate()}for(let j=0;j<W.length;j++)if(G[j]!=nz)try{let O=W[j];if(O.write)O.write(G[j],this)}catch(O){s0(this.state,O)}if(z)this.docView.updateSelection(!0);if(!U.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,K=-1;continue}else{let O=((Y<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(Y).top)-K)/this.scaleY;if((O>1||O<-1)&&!(r.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(Q==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){if(X=X+O,Q)Q.scrollTop+=O;else this.win.scrollBy(0,O);K=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(J&&!J.empty)for(let I of this.state.facet(RY))I(J)}get themeClasses(){return _Y+" "+(this.state.facet(TY)?KV:YV)+" "+this.state.facet(RZ)}updateAttrs(){let Z=vz(this,B2,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),J={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:!this.state.facet(L4)?"false":"true",class:"cm-content",style:`${r.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};if(this.state.readOnly)J["aria-readonly"]="true";vz(this,$Y,J);let Q=this.observer.ignore(()=>{let X=Mz(this.contentDOM,this.contentAttrs,J),Y=Mz(this.dom,this.editorAttrs,Z);return X||Y});return this.editorAttrs=Z,this.contentAttrs=J,Q}showAnnouncements(Z){let J=!0;for(let Q of Z)for(let X of Q.effects)if(X.is(K1.announce)){if(J)this.announceDOM.textContent="";J=!1;let Y=this.announceDOM.appendChild(document.createElement("div"));Y.textContent=X.value}}mountStyles(){this.styleModules=this.state.facet(K5);let Z=this.state.facet(K1.cspNonce);P6.mount(this.root,this.styleModules.concat(yM).reverse(),Z?{nonce:Z}:void 0)}readMeasured(){if(this.updateState==2)throw Error("Reading the editor layout isn't allowed during an update");if(this.updateState==0&&this.measureScheduled>-1)this.measure(!1)}requestMeasure(Z){if(this.measureScheduled<0)this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure());if(Z){if(this.measureRequests.indexOf(Z)>-1)return;if(Z.key!=null){for(let J=0;J<this.measureRequests.length;J++)if(this.measureRequests[J].key===Z.key){this.measureRequests[J]=Z;return}}this.measureRequests.push(Z)}}plugin(Z){let J=this.pluginMap.get(Z);if(J===void 0||J&&J.plugin!=Z)this.pluginMap.set(Z,J=this.plugins.find((Q)=>Q.plugin==Z)||null);return J&&J.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(Z){return this.readMeasured(),this.viewState.elementAtHeight(Z)}lineBlockAtHeight(Z){return this.readMeasured(),this.viewState.lineBlockAtHeight(Z)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(Z){return this.viewState.lineBlockAt(Z)}get contentHeight(){return this.viewState.contentHeight}moveByChar(Z,J,Q){return KY(this,Z,Sz(this,Z,J,Q))}moveByGroup(Z,J){return KY(this,Z,Sz(this,Z,J,(Q)=>KM(this,Z.head,Q)))}visualLineSide(Z,J){let Q=this.bidiSpans(Z),X=this.textDirectionAt(Z.from),Y=Q[J?Q.length-1:0];return u.cursor(Y.side(J,X)+Z.from,Y.forward(!J,X)?1:-1)}moveToLineBoundary(Z,J,Q=!0){return YM(this,Z,J,Q)}moveVertically(Z,J,Q){return KY(this,Z,IM(this,Z,J,Q))}domAtPos(Z,J=1){return this.docView.domAtPos(Z,J)}posAtDOM(Z,J=0){return this.docView.posFromDOM(Z,J)}posAtCoords(Z,J=!0){this.readMeasured();let Q=LY(this,Z,J);return Q&&Q.pos}posAndSideAtCoords(Z,J=!0){return this.readMeasured(),LY(this,Z,J)}coordsAtPos(Z,J=1){this.readMeasured();let Q=this.state.doc.lineAt(Z),X=this.bidiSpans(Q),Y=X[E6.find(X,Z-Q.from,-1,J)];return this.docView.coordsAt(Z,J,Y.dir==h1.RTL)}coordsForChar(Z){return this.readMeasured(),this.docView.coordsForChar(Z)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(Z){if(!this.state.facet(M2)||Z<this.viewport.from||Z>this.viewport.to)return this.textDirection;return this.readMeasured(),this.docView.textDirectionAt(Z)}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(Z){if(Z.length>$M)return z2(Z.length);let J=this.textDirectionAt(Z.from),Q;for(let Y of this.bidiCache)if(Y.from==Z.from&&Y.dir==J&&(Y.fresh||U2(Y.isolates,Q=Lz(this,Z))))return Y.order;if(!Q)Q=Lz(this,Z);let X=$R(Z.text,J,Q);return this.bidiCache.push(new fZ(Z.from,Z.to,J,Q,!0,X)),X}get hasFocus(){var Z;return(this.dom.ownerDocument.hasFocus()||r.safari&&((Z=this.inputState)===null||Z===void 0?void 0:Z.lastContextMenu)>Date.now()-30000)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{Y2(this.contentDOM),this.docView.updateSelection()})}setRoot(Z){if(this._root!=Z)this._root=Z,this.observer.setWindow((Z.nodeType==9?Z:Z.ownerDocument).defaultView||window),this.mountStyles()}destroy(){if(this.root.activeElement==this.contentDOM)this.contentDOM.blur();for(let Z of this.plugins)Z.destroy(this);if(this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);this.destroyed=!0}static scrollIntoView(Z,J={}){var Q,X,Y,K;return jZ.of(new $7(typeof Z=="number"?u.cursor(Z):Z,(Q=J.y)!==null&&Q!==void 0?Q:"nearest",(X=J.x)!==null&&X!==void 0?X:"nearest",(Y=J.yMargin)!==null&&Y!==void 0?Y:5,(K=J.xMargin)!==null&&K!==void 0?K:5))}scrollSnapshot(){let{scrollTop:Z,scrollLeft:J}=this.scrollDOM,Q=this.viewState.scrollAnchorAt(Z);return jZ.of(new $7(u.cursor(Q.from),"start","start",Q.top-Z,J,!0))}setTabFocusMode(Z){if(Z==null)this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1;else if(typeof Z=="boolean")this.inputState.tabFocusMode=Z?0:-1;else if(this.inputState.tabFocusMode!=0)this.inputState.tabFocusMode=Date.now()+Z}static domEventHandlers(Z){return M0.define(()=>({}),{eventHandlers:Z})}static domEventObservers(Z){return M0.define(()=>({}),{eventObservers:Z})}static theme(Z,J){let Q=P6.newName(),X=[RZ.of(Q),K5.of(EY(`.${Q}`,Z))];if(J&&J.dark)X.push(TY.of(!0));return X}static baseTheme(Z){return M4.lowest(K5.of(EY("."+_Y,Z,IV)))}static findFromDOM(Z){var J;let Q=Z.querySelector(".cm-content"),X=Q&&c1.get(Q)||c1.get(Z);return((J=X===null||X===void 0?void 0:X.root)===null||J===void 0?void 0:J.view)||null}}K1.styleModule=K5;K1.inputHandler=N2;K1.clipboardInputFilter=gY;K1.clipboardOutputFilter=fY;K1.scrollHandler=D2;K1.focusChangeEffect=R2;K1.perLineTextDirection=M2;K1.exceptionSink=H2;K1.updateListener=RY;K1.editable=L4;K1.mouseSelectionStyle=F2;K1.dragMovesSelection=O2;K1.clickAddsSelectionRange=j2;K1.decorations=nZ;K1.blockWrappers=P2;K1.outerDecorations=uY;K1.atomicRanges=R5;K1.bidiIsolatedRanges=S2;K1.cursorScrollMargin=o.define({combine:(Z)=>{let J=5,Q=5;for(let X of Z)if(typeof X=="number")J=Q=X;else({x:J,y:Q}=X);return{x:J,y:Q}}});K1.scrollMargins=T2;K1.darkTheme=TY;K1.cspNonce=o.define({combine:(Z)=>Z.length?Z[0]:""});K1.contentAttributes=$Y;K1.editorAttributes=B2;K1.lineWrapping=K1.contentAttributes.of({class:"cm-lineWrapping"});K1.announce=B1.define();var $M=4096,nz={};class fZ{constructor(Z,J,Q,X,Y,K){this.from=Z,this.to=J,this.dir=Q,this.isolates=X,this.fresh=Y,this.order=K}static update(Z,J){if(J.empty&&!Z.some((Y)=>Y.fresh))return Z;let Q=[],X=Z.length?Z[Z.length-1].dir:h1.LTR;for(let Y=Math.max(0,Z.length-10);Y<Z.length;Y++){let K=Z[Y];if(K.dir==X&&!J.touchesRange(K.from,K.to))Q.push(new fZ(J.mapPos(K.from,1),J.mapPos(K.to,-1),K.dir,K.isolates,!1,K.order))}return Q}}function vz(Z,J,Q){for(let X=Z.state.facet(J),Y=X.length-1;Y>=0;Y--){let K=X[Y],I=typeof K=="function"?K(Z):K;if(I)bY(I,Q)}return Q}var uM=r.mac?"mac":r.windows?"win":r.linux?"linux":"key";function nM(Z,J){let Q=Z.split(/-(?!$)/),X=Q[Q.length-1];if(X=="Space")X=" ";let Y,K,I,q;for(let W=0;W<Q.length-1;++W){let G=Q[W];if(/^(cmd|meta|m)$/i.test(G))q=!0;else if(/^a(lt)?$/i.test(G))Y=!0;else if(/^(c|ctrl|control)$/i.test(G))K=!0;else if(/^s(hift)?$/i.test(G))I=!0;else if(/^mod$/i.test(G))if(J=="mac")q=!0;else K=!0;else throw Error("Unrecognized modifier name: "+G)}if(Y)X="Alt-"+X;if(K)X="Ctrl-"+X;if(q)X="Meta-"+X;if(I)X="Shift-"+X;return X}function MZ(Z,J,Q){if(J.altKey)Z="Alt-"+Z;if(J.ctrlKey)Z="Ctrl-"+Z;if(J.metaKey)Z="Meta-"+Z;if(Q!==!1&&J.shiftKey)Z="Shift-"+Z;return Z}var vM=M4.default(K1.domEventHandlers({keydown(Z,J){return dM(mM(J.state),Z,J,"editor")}})),mZ=o.define({enables:vM}),mz=new WeakMap;function mM(Z){let J=Z.facet(mZ),Q=mz.get(J);if(!Q)mz.set(J,Q=cM(J.reduce((X,Y)=>X.concat(Y),[])));return Q}var i4=null,pM=4000;function cM(Z,J=uM){let Q=Object.create(null),X=Object.create(null),Y=(I,q)=>{let W=X[I];if(W==null)X[I]=q;else if(W!=q)throw Error("Key binding "+I+" is used both as a regular binding and as a multi-stroke prefix")},K=(I,q,W,G,U)=>{var z,j;let O=Q[I]||(Q[I]=Object.create(null)),H=q.split(/ (?!$)/).map((T)=>nM(T,J));for(let T=1;T<H.length;T++){let _=H.slice(0,T).join(" ");if(Y(_,!0),!O[_])O[_]={preventDefault:!0,stopPropagation:!1,run:[(C)=>{let h=i4={view:C,prefix:_,scope:I};return setTimeout(()=>{if(i4==h)i4=null},pM),!0}]}}let N=H.join(" ");Y(N,!1);let R=O[N]||(O[N]={preventDefault:!1,stopPropagation:!1,run:((j=(z=O._any)===null||z===void 0?void 0:z.run)===null||j===void 0?void 0:j.slice())||[]});if(W)R.run.push(W);if(G)R.preventDefault=!0;if(U)R.stopPropagation=!0};for(let I of Z){let q=I.scope?I.scope.split(" "):["editor"];if(I.any)for(let G of q){let U=Q[G]||(Q[G]=Object.create(null));if(!U._any)U._any={preventDefault:!1,stopPropagation:!1,run:[]};let{any:z}=I;for(let j in U)U[j].run.push((O)=>z(O,CY))}let W=I[J]||I.key;if(!W)continue;for(let G of q)if(K(G,W,I.run,I.preventDefault,I.stopPropagation),I.shift)K(G,"Shift-"+W,I.shift,I.preventDefault,I.stopPropagation)}return Q}var CY=null;function dM(Z,J,Q,X){CY=J;let Y=Oz(J),K=rU(Y,0),I=aU(K)==Y.length&&Y!=" ",q="",W=!1,G=!1,U=!1;if(i4&&i4.view==Q&&i4.scope==X){if(q=i4.prefix+" ",d2.indexOf(J.keyCode)<0)G=!0,i4=null}let z=new Set,j=(R)=>{if(R){for(let T of R.run)if(!z.has(T)){if(z.add(T),T(Q)){if(R.stopPropagation)U=!0;return!0}}if(R.preventDefault){if(R.stopPropagation)U=!0;G=!0}}return!1},O=Z[X],H,N;if(O){if(j(O[q+MZ(Y,J,!I)]))W=!0;else if(I&&(J.altKey||J.metaKey||J.ctrlKey)&&!(r.windows&&J.ctrlKey&&J.altKey)&&!(r.mac&&J.altKey&&!(J.ctrlKey||J.metaKey))&&(H=D4[J.keyCode])&&H!=Y){if(j(O[q+MZ(H,J,!0)]))W=!0;else if(J.shiftKey&&(N=k7[J.keyCode])!=Y&&N!=H&&j(O[q+MZ(N,J,!1)]))W=!0}else if(I&&J.shiftKey&&j(O[q+MZ(Y,J,!0)]))W=!0;if(!W&&j(O._any))W=!0}if(G)W=!0;if(W&&U)J.stopPropagation();return CY=null,W}class p8{constructor(Z,J,Q,X,Y){this.className=Z,this.left=J,this.top=Q,this.width=X,this.height=Y}draw(){let Z=document.createElement("div");return Z.className=this.className,this.adjust(Z),Z}update(Z,J){if(J.className!=this.className)return!1;return this.adjust(Z),!0}adjust(Z){if(Z.style.left=this.left+"px",Z.style.top=this.top+"px",this.width!=null)Z.style.width=this.width+"px";Z.style.height=this.height+"px"}eq(Z){return this.left==Z.left&&this.top==Z.top&&this.width==Z.width&&this.height==Z.height&&this.className==Z.className}static forRange(Z,J,Q){if(Q.empty){let X=Z.coordsAtPos(Q.head,Q.assoc||1);if(!X)return[];let Y=GV(Z);return[new p8(J,X.left-Y.left,X.top-Y.top,null,X.bottom-X.top)]}else return sM(Z,J,Q)}}function GV(Z){let J=Z.scrollDOM.getBoundingClientRect();return{left:(Z.textDirection==h1.LTR?J.left:J.right-Z.scrollDOM.clientWidth*Z.scaleX)-Z.scrollDOM.scrollLeft*Z.scaleX,top:J.top-Z.scrollDOM.scrollTop*Z.scaleY}}function pz(Z,J,Q,X){let Y=Z.coordsAtPos(J,Q*2);if(!Y)return X;let K=Z.dom.getBoundingClientRect(),I=(Y.top+Y.bottom)/2,q=Z.posAtCoords({x:K.left+1,y:I}),W=Z.posAtCoords({x:K.right-1,y:I});if(q==null||W==null)return X;return{from:Math.max(X.from,Math.min(q,W)),to:Math.min(X.to,Math.max(q,W))}}function sM(Z,J,Q){if(Q.to<=Z.viewport.from||Q.from>=Z.viewport.to)return[];let X=Math.max(Q.from,Z.viewport.from),Y=Math.min(Q.to,Z.viewport.to),K=Z.textDirection==h1.LTR,I=Z.contentDOM,q=I.getBoundingClientRect(),W=GV(Z),G=I.querySelector(".cm-line"),U=G&&window.getComputedStyle(G),z=q.left+(U?parseInt(U.paddingLeft)+Math.min(0,parseInt(U.textIndent)):0),j=q.right-(U?parseInt(U.paddingRight):0),O=DY(Z,X,1),H=DY(Z,Y,-1),N=O.type==V0.Text?O:null,R=H.type==V0.Text?H:null;if(N&&(Z.lineWrapping||O.widgetLineBreaks))N=pz(Z,X,1,N);if(R&&(Z.lineWrapping||H.widgetLineBreaks))R=pz(Z,Y,-1,R);if(N&&R&&N.from==R.from&&N.to==R.to)return _(C(Q.from,Q.to,N));else{let L=N?C(Q.from,null,N):h(O,!1),S=R?C(null,Q.to,R):h(H,!0),B=[];if((N||O).to<(R||H).from-(N&&R?1:0)||O.widgetLineBreaks>1&&L.bottom+Z.defaultLineHeight/2<S.top)B.push(T(z,L.bottom,j,S.top));else if(L.bottom<S.top&&Z.elementAtHeight((L.bottom+S.top)/2).type==V0.Text)L.bottom=S.top=(L.bottom+S.top)/2;return _(L).concat(B).concat(_(S))}function T(L,S,B,E){return new p8(J,L-W.left,S-W.top,Math.max(0,B-L),E-S)}function _({top:L,bottom:S,horizontal:B}){let E=[];for(let M=0;M<B.length;M+=2)E.push(T(B[M],L,B[M+1],S));return E}function C(L,S,B){let E=1e9,M=-1e9,l=[];function n(e,Z1,I1,W1,J1){let t=Z.coordsAtPos(e,e==B.to?-2:2),v=Z.coordsAtPos(I1,I1==B.from?2:-2);if(!t||!v)return;if(E=Math.min(t.top,v.top,E),M=Math.max(t.bottom,v.bottom,M),J1==h1.LTR)l.push(K&&Z1?z:t.left,K&&W1?j:v.right);else l.push(!K&&W1?z:v.left,!K&&Z1?j:t.right)}let p=L!==null&&L!==void 0?L:B.from,q1=S!==null&&S!==void 0?S:B.to;for(let e of Z.visibleRanges)if(e.to>p&&e.from<q1)for(let Z1=Math.max(e.from,p),I1=Math.min(e.to,q1);;){let W1=Z.state.doc.lineAt(Z1);for(let J1 of Z.bidiSpans(W1)){let t=J1.from+W1.from,v=J1.to+W1.from;if(t>=I1)break;if(v>Z1)n(Math.max(t,Z1),L==null&&t<=p,Math.min(v,I1),S==null&&v>=q1,J1.dir)}if(Z1=W1.to+1,Z1>=I1)break}if(l.length==0)n(p,L==null,q1,S==null,Z.textDirection);return{top:E,bottom:M,horizontal:l}}function h(L,S){let B=q.top+(S?L.top:L.bottom);return{top:B,bottom:B,horizontal:[]}}}function lM(Z,J){return Z.constructor==J.constructor&&Z.eq(J)}class UV{constructor(Z,J){if(this.view=Z,this.layer=J,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=Z.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),J.above)this.dom.classList.add("cm-layer-above");if(J.class)this.dom.classList.add(J.class);if(this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(Z.state),Z.requestMeasure(this.measureReq),J.mount)J.mount(this.dom,Z)}update(Z){if(Z.startState.facet(_Z)!=Z.state.facet(_Z))this.setOrder(Z.state);if(this.layer.update(Z,this.dom)||Z.geometryChanged)this.scale(),Z.view.requestMeasure(this.measureReq)}docViewUpdate(Z){if(this.layer.updateOnDocViewUpdate!==!1)Z.requestMeasure(this.measureReq)}setOrder(Z){let J=0,Q=Z.facet(_Z);while(J<Q.length&&Q[J]!=this.layer)J++;this.dom.style.zIndex=String((this.layer.above?150:-1)-J)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:Z,scaleY:J}=this.view;if(Z!=this.scaleX||J!=this.scaleY)this.scaleX=Z,this.scaleY=J,this.dom.style.transform=`scale(${1/Z}, ${1/J})`}draw(Z){if(Z.length!=this.drawn.length||Z.some((J,Q)=>!lM(J,this.drawn[Q]))){let J=this.dom.firstChild,Q=0;for(let X of Z)if(X.update&&J&&X.constructor&&this.drawn[Q].constructor&&X.update(J,this.drawn[Q]))J=J.nextSibling,Q++;else this.dom.insertBefore(X.draw(),J);while(J){let X=J.nextSibling;J.remove(),J=X}if(this.drawn=Z,r.webkit)this.dom.style.display=this.dom.firstChild?"":"none"}}destroy(){if(this.layer.destroy)this.layer.destroy(this.dom,this.view);this.dom.remove()}}var _Z=o.define();function zV(Z){return[M0.define((J)=>new UV(J,Z)),_Z.of(Z)]}var v7=o.define({combine(Z){return A4(Z,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(J,Q)=>Math.min(J,Q),drawRangeCursor:(J,Q)=>J||Q})}});function VV(Z={}){return[v7.of(Z),iM,rM,oM,A2.of(!0)]}function jV(Z){return Z.startState.facet(v7)!=Z.state.facet(v7)}var iM=zV({above:!0,markers(Z){let{state:J}=Z,Q=J.facet(v7),X=[];for(let Y of J.selection.ranges){let K=Y==J.selection.main;if(Y.empty||Q.drawRangeCursor&&!(K&&r.ios&&Q.iosSelectionHandles)){let I=K?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",q=Y.empty?Y:u.cursor(Y.head,Y.assoc);for(let W of p8.forRange(Z,I,q))X.push(W)}}return X},update(Z,J){if(Z.transactions.some((X)=>X.selection))J.style.animationName=J.style.animationName=="cm-blink"?"cm-blink2":"cm-blink";let Q=jV(Z);if(Q)cz(Z.state,J);return Z.docChanged||Z.selectionSet||Q},mount(Z,J){cz(J.state,Z)},class:"cm-cursorLayer"});function cz(Z,J){J.style.animationDuration=Z.facet(v7).cursorBlinkRate+"ms"}var rM=zV({above:!1,markers(Z){let J=[],{main:Q,ranges:X}=Z.state.selection;for(let Y of X)if(!Y.empty)for(let K of p8.forRange(Z,"cm-selectionBackground",Y))J.push(K);if(r.ios&&!Q.empty&&Z.state.facet(v7).iosSelectionHandles){for(let Y of p8.forRange(Z,"cm-selectionHandle cm-selectionHandle-start",u.cursor(Q.from,1)))J.push(Y);for(let Y of p8.forRange(Z,"cm-selectionHandle cm-selectionHandle-end",u.cursor(Q.to,1)))J.push(Y)}return J},update(Z,J){return Z.docChanged||Z.selectionSet||Z.viewportChanged||jV(Z)},class:"cm-selectionLayer"}),aM=r.gecko&&r.gecko_version==153?"#ffffff01":"transparent",oM=M4.highest(K1.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${aM} !important`},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var pk=/x/.unicode!=null?"gu":"g";function OV(){return eM}var tM=P1.line({class:"cm-activeLine"}),eM=M0.fromClass(class{constructor(Z){this.decorations=this.getDeco(Z)}update(Z){if(Z.docChanged||Z.selectionSet)this.decorations=this.getDeco(Z.view)}getDeco(Z){let J=-1,Q=[];for(let X of Z.state.selection.ranges){let Y=Z.lineBlockAt(X.head);if(Y.from>J)Q.push(tM.range(Y.from)),J=Y.from}return P1.set(Q)}},{decorations:(Z)=>Z.decorations});var AZ="-10000px";class dY{constructor(Z,J,Q,X){this.facet=J,this.createTooltipView=Q,this.removeTooltipView=X,this.input=Z.state.facet(J),this.tooltips=this.input.filter((K)=>K);let Y=null;this.tooltipViews=this.tooltips.map((K)=>Y=Q(K,Y))}update(Z,J){var Q;let X=Z.state.facet(this.facet),Y=X.filter((q)=>q);if(X===this.input){for(let q of this.tooltipViews)if(q.update)q.update(Z);return!1}let K=[],I=J?[]:null;for(let q=0;q<Y.length;q++){let W=Y[q],G=-1;if(!W)continue;for(let U=0;U<this.tooltips.length;U++){let z=this.tooltips[U];if(z&&z.create==W.create)G=U}if(G<0){if(K[q]=this.createTooltipView(W,q?K[q-1]:null),I)I[q]=!!W.above}else{let U=K[q]=this.tooltipViews[G];if(I)I[q]=J[G];if(U.update)U.update(Z)}}for(let q of this.tooltipViews)if(K.indexOf(q)<0)this.removeTooltipView(q),(Q=q.destroy)===null||Q===void 0||Q.call(q);if(J)I.forEach((q,W)=>J[W]=q),J.length=I.length;return this.input=X,this.tooltips=Y,this.tooltipViews=K,!0}}function ZA(Z){let J=Z.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:J.clientHeight,right:J.clientWidth}}var qY=o.define({combine:(Z)=>{var J,Q,X;return{position:r.ios?"absolute":((J=Z.find((Y)=>Y.position))===null||J===void 0?void 0:J.position)||"fixed",parent:((Q=Z.find((Y)=>Y.parent))===null||Q===void 0?void 0:Q.parent)||null,tooltipSpace:((X=Z.find((Y)=>Y.tooltipSpace))===null||X===void 0?void 0:X.tooltipSpace)||ZA}}}),dz=new WeakMap,FV=M0.fromClass(class{constructor(Z){this.view=Z,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let J=Z.state.facet(qY);this.position=J.position,this.parent=J.parent,this.classes=Z.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new dY(Z,sY,(Q,X)=>this.createTooltip(Q,X),(Q)=>{if(this.resizeObserver)this.resizeObserver.unobserve(Q.dom);Q.dom.remove()}),this.above=this.manager.tooltips.map((Q)=>!!Q.above),this.intersectionObserver=typeof IntersectionObserver=="function"?new IntersectionObserver((Q)=>{if(Date.now()>this.lastTransaction-50&&Q.length>0&&Q[Q.length-1].intersectionRatio<1)this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),Z.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){if(this.parent)this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container);else this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let Z of this.manager.tooltipViews)this.intersectionObserver.observe(Z.dom)}}measureSoon(){if(this.measureTimeout<0)this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50)}update(Z){if(Z.transactions.length)this.lastTransaction=Date.now();let J=this.manager.update(Z,this.above);if(J)this.observeIntersection();let Q=J||Z.geometryChanged,X=Z.state.facet(qY);if(X.position!=this.position&&!this.madeAbsolute){this.position=X.position;for(let Y of this.manager.tooltipViews)Y.dom.style.position=this.position;Q=!0}if(X.parent!=this.parent){if(this.parent)this.container.remove();this.parent=X.parent,this.createContainer();for(let Y of this.manager.tooltipViews)this.container.appendChild(Y.dom);Q=!0}else if(this.parent&&this.view.themeClasses!=this.classes)this.classes=this.container.className=this.view.themeClasses;if(Q)this.maybeMeasure()}createTooltip(Z,J){let Q=Z.create(this.view),X=J?J.dom:null;if(Q.dom.classList.add("cm-tooltip"),Z.arrow&&!Q.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let Y=document.createElement("div");Y.className="cm-tooltip-arrow",Q.dom.appendChild(Y)}if(Q.dom.style.position=this.position,Q.dom.style.top=AZ,Q.dom.style.left="0px",this.container.insertBefore(Q.dom,X),Q.mount)Q.mount(this.view);if(this.resizeObserver)this.resizeObserver.observe(Q.dom);return Q}destroy(){var Z,J,Q;this.view.win.removeEventListener("resize",this.measureSoon);for(let X of this.manager.tooltipViews)X.dom.remove(),(Z=X.destroy)===null||Z===void 0||Z.call(X);if(this.parent)this.container.remove();(J=this.resizeObserver)===null||J===void 0||J.disconnect(),(Q=this.intersectionObserver)===null||Q===void 0||Q.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let Z=1,J=1,Q=!1;if(this.position=="fixed"&&this.manager.tooltipViews.length){let{dom:K}=this.manager.tooltipViews[0];if(r.safari){let I=K.getBoundingClientRect();Q=Math.abs(I.top+1e4)>1||Math.abs(I.left)>1}else Q=!!K.offsetParent&&K.offsetParent!=this.container.ownerDocument.body}if(Q||this.position=="absolute")if(this.parent){let K=this.parent.getBoundingClientRect();if(K.width&&K.height)Z=K.width/this.parent.offsetWidth,J=K.height/this.parent.offsetHeight}else({scaleX:Z,scaleY:J}=this.view.viewState);let X=this.view.scrollDOM.getBoundingClientRect(),Y=nY(this.view);return{visible:{left:X.left+Y.left,top:X.top+Y.top,right:X.right-Y.right,bottom:X.bottom-Y.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((K,I)=>{let q=this.manager.tooltipViews[I];return q.getCoords?q.getCoords(K.pos):this.view.coordsAtPos(K.pos)}),size:this.manager.tooltipViews.map(({dom:K})=>K.getBoundingClientRect()),space:this.view.state.facet(qY).tooltipSpace(this.view),scaleX:Z,scaleY:J,makeAbsolute:Q}}writeMeasure(Z){var J;if(Z.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let q of this.manager.tooltipViews)q.dom.style.position="absolute"}let{visible:Q,space:X,scaleX:Y,scaleY:K}=Z,I=[];for(let q=0;q<this.manager.tooltips.length;q++){let W=this.manager.tooltips[q],G=this.manager.tooltipViews[q],{dom:U}=G,z=Z.pos[q],j=Z.size[q];if(!z||W.clip!==!1&&(z.bottom<=Math.max(Q.top,X.top)||z.top>=Math.min(Q.bottom,X.bottom)||z.right<Math.max(Q.left,X.left)-0.1||z.left>Math.min(Q.right,X.right)+0.1)){U.style.top=AZ;continue}let O=W.arrow?G.dom.querySelector(".cm-tooltip-arrow"):null,H=O?7:0,N=j.right-j.left,R=(J=dz.get(G))!==null&&J!==void 0?J:j.bottom-j.top,T=G.offset||QA,_=this.view.textDirection==h1.LTR,C=j.width>X.right-X.left?_?X.left:X.right-j.width:_?Math.max(X.left,Math.min(z.left-(O?14:0)+T.x,X.right-N)):Math.min(Math.max(X.left,z.left-N+(O?14:0)-T.x),X.right-N),h=this.above[q];if(!W.strictSide&&(h?z.top-R-H-T.y<X.top:z.bottom+R+H+T.y>X.bottom)&&h==X.bottom-z.bottom>z.top-X.top)h=this.above[q]=!h;let L=(h?z.top-X.top:X.bottom-z.bottom)-H;if(L<R&&G.resize!==!1){if(L<this.view.defaultLineHeight){U.style.top=AZ;continue}dz.set(G,R),U.style.height=(R=L)/K+"px"}else if(U.style.height)U.style.height="";let S=h?z.top-R-H-T.y:z.bottom+H+T.y,B=C+N;if(G.overlap!==!0){for(let E of I)if(E.left<B&&E.right>C&&E.top<S+R&&E.bottom>S)S=h?E.top-R-2-H:E.bottom+H+2}if(this.position=="absolute")U.style.top=(S-Z.parent.top)/K+"px",sz(U,(C-Z.parent.left)/Y);else U.style.top=S/K+"px",sz(U,C/Y);if(O){let E=z.left+(_?T.x:-T.x)-(C+14-7);O.style.left=E/Y+"px"}if(G.overlap!==!0)I.push({left:C,top:S,right:B,bottom:S+R});if(U.classList.toggle("cm-tooltip-above",h),U.classList.toggle("cm-tooltip-below",!h),G.positioned)G.positioned(Z.space)}}maybeMeasure(){if(this.manager.tooltips.length){if(this.view.inView)this.view.requestMeasure(this.measureReq);if(this.inView!=this.view.inView){if(this.inView=this.view.inView,!this.inView)for(let Z of this.manager.tooltipViews)Z.dom.style.top=AZ}}}},{eventObservers:{scroll(){this.maybeMeasure()}}});function sz(Z,J){let Q=parseInt(Z.style.left,10);if(isNaN(Q)||Math.abs(J-Q)>1)Z.style.left=J+"px"}var JA=K1.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:"7px",width:"14px",position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent"},".cm-tooltip-above &":{bottom:"-7px","&:before":{borderTop:"7px solid #bbb"},"&:after":{borderTop:"7px solid #f5f5f5",bottom:"1px"}},".cm-tooltip-below &":{top:"-7px","&:before":{borderBottom:"7px solid #bbb"},"&:after":{borderBottom:"7px solid #f5f5f5",top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),QA={x:0,y:0},sY=o.define({enables:[FV,JA]}),$Z=o.define({combine:(Z)=>Z.reduce((J,Q)=>J.concat(Q),[])});class pZ{static create(Z){return new pZ(Z)}constructor(Z){this.view=Z,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new dY(Z,$Z,(J,Q)=>this.createHostedView(J,Q),(J)=>J.dom.remove())}createHostedView(Z,J){let Q=Z.create(this.view);if(Q.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(Q.dom,J?J.dom.nextSibling:this.dom.firstChild),this.mounted&&Q.mount)Q.mount(this.view);return Q}mount(Z){for(let J of this.manager.tooltipViews)if(J.mount)J.mount(Z);this.mounted=!0}positioned(Z){for(let J of this.manager.tooltipViews)if(J.positioned)J.positioned(Z)}update(Z){this.manager.update(Z)}destroy(){var Z;for(let J of this.manager.tooltipViews)(Z=J.destroy)===null||Z===void 0||Z.call(J)}passProp(Z){let J=void 0;for(let Q of this.manager.tooltipViews){let X=Q[Z];if(X!==void 0){if(J===void 0)J=X;else if(J!==X)return}}return J}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}var XA=sY.compute([$Z],(Z)=>{let J=Z.facet($Z);if(J.length===0)return null;return{pos:Math.min(...J.map((Q)=>Q.pos)),end:Math.max(...J.map((Q)=>{var X;return(X=Q.end)!==null&&X!==void 0?X:Q.pos})),create:pZ.create,above:J[0].above,arrow:J.some((Q)=>Q.arrow)}}),YA=o.define();class HV{constructor(Z,J,Q,X,Y,K){this.view=Z,this.source=J,this.field=Q,this.locked=X,this.setHover=Y,this.hoverTime=K,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:Z.dom,time:0},this.checkHover=this.checkHover.bind(this),Z.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),Z.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(Z){if(this.pending)this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20)}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let Z=Date.now()-this.lastMove.time;if(Z<this.hoverTime)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-Z);else this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:Z,lastMove:J}=this,Q=Z.docView.tile.nearest(J.target);if(!Q)return;let X,Y=1;if(Q.isWidget())X=Q.posAtStart;else{if(X=Z.posAtCoords(J),X==null)return;let K=Z.coordsAtPos(X);if(!K||J.y<K.top||J.y>K.bottom||J.x<K.left-Z.defaultCharacterWidth||J.x>K.right+Z.defaultCharacterWidth)return;let I=Z.bidiSpans(Z.state.doc.lineAt(X)).find((W)=>W.from<=X&&W.to>=X),q=I&&I.dir==h1.RTL?-1:1;Y=J.x<K.left?-q:q}this.activateHover(Z,X,Y)}activateHover(Z,J,Q,X){let Y=this.source(Z,J,Q),K=(I)=>{if(I&&!(Array.isArray(I)&&!I.length)){let q=Array.isArray(I)?I:[I];if(X)this.locked.set(q,X);Z.dispatch({effects:this.setHover.of(q)})}};if(Y&&"then"in Y){let I=this.pending={pos:J};Y.then((q)=>{if(this.pending==I)this.pending=null,K(q)},(q)=>s0(Z.state,q,"hover tooltip"))}else K(Y)}get tooltip(){let Z=this.view.plugin(FV),J=Z?Z.manager.tooltips.findIndex((Q)=>Q.create==pZ.create):-1;return J>-1?Z.manager.tooltipViews[J]:null}mousemove(Z){var J,Q;if(this.lastMove={x:Z.clientX,y:Z.clientY,target:Z.target,time:Date.now()},this.hoverTimeout<0)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime);let{active:X,tooltip:Y}=this;if(X.length&&!this.locked.has(X)&&Y&&!KA(Y.dom,Z)||this.pending){let{pos:K}=X[0]||this.pending,I=(Q=(J=X[0])===null||J===void 0?void 0:J.end)!==null&&Q!==void 0?Q:K;if(K==I?this.view.posAtCoords(this.lastMove)!=K:!IA(this.view,K,I,Z.clientX,Z.clientY))this.view.dispatch({effects:this.setHover.of([])}),this.pending=null}}mouseleave(Z){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:J}=this;if(J.length&&!this.locked.has(J)){let{tooltip:Q}=this;if(!(Q&&Q.dom.contains(Z.relatedTarget)))this.view.dispatch({effects:this.setHover.of([])});else this.watchTooltipLeave(Q.dom)}}watchTooltipLeave(Z){let J=(Q)=>{Z.removeEventListener("mouseleave",J);let{active:X}=this;if(X.length&&!this.locked.has(X)&&!this.view.dom.contains(Q.relatedTarget))this.view.dispatch({effects:this.setHover.of([])})};Z.addEventListener("mouseleave",J)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}var DZ=4;function KA(Z,J){let{left:Q,right:X,top:Y,bottom:K}=Z.getBoundingClientRect(),I;if(I=Z.querySelector(".cm-tooltip-arrow")){let q=I.getBoundingClientRect();Y=Math.min(q.top,Y),K=Math.max(q.bottom,K)}return J.clientX>=Q-DZ&&J.clientX<=X+DZ&&J.clientY>=Y-DZ&&J.clientY<=K+DZ}function IA(Z,J,Q,X,Y,K){let I=Z.scrollDOM.getBoundingClientRect(),q=Z.documentTop+Z.documentPadding.top+Z.contentHeight;if(I.left>X||I.right<X||I.top>Y||Math.min(I.bottom,q)<Y)return!1;let W=Z.posAtCoords({x:X,y:Y},!1);return W>=J&&W<=Q}function NV(Z,J={}){let Q=B1.define(),X=new WeakMap,Y=R0.define({create(){return[]},update(I,q){let W=X.get(I);if(I.length){if(J.hideOnChange&&(q.docChanged||q.selection))I=[];else if(W&&W(q))I=[];else if(J.hideOn)I=I.filter((G)=>!J.hideOn(q,G))}if(q.docChanged&&I.length){let G=[];for(let U of I){let z=q.changes.mapPos(U.pos,-1,T0.TrackDel);if(z!=null){let j=Object.assign(Object.create(null),U);if(j.pos=z,j.end!=null)j.end=q.changes.mapPos(j.end);G.push(j)}}I=G}for(let G of q.effects){if(G.is(Q))I=G.value,W=void 0;if(G.is(qA)&&!G.value||G.value==Y)I=[]}if(I.length&&W)X.set(I,W);return I},provide:(I)=>$Z.from(I)}),K=M0.define((I)=>new HV(I,Z,Y,X,Q,J.hoverTime||300));return{active:Y,extension:[Y,K,YA.of(K),XA]}}var qA=B1.define();var lz=o.define({combine(Z){let J,Q;for(let X of Z)J=J||X.topContainer,Q=Q||X.bottomContainer;return{topContainer:J,bottomContainer:Q}}});var WA=M0.fromClass(class{constructor(Z){this.input=Z.state.facet(m7),this.specs=this.input.filter((Q)=>Q),this.panels=this.specs.map((Q)=>Q(Z));let J=Z.state.facet(lz);this.top=new W5(Z,!0,J.topContainer),this.bottom=new W5(Z,!1,J.bottomContainer),this.top.sync(this.panels.filter((Q)=>Q.top)),this.bottom.sync(this.panels.filter((Q)=>!Q.top));for(let Q of this.panels)if(Q.dom.classList.add("cm-panel"),Q.mount)Q.mount()}update(Z){let J=Z.state.facet(lz);if(this.top.container!=J.topContainer)this.top.sync([]),this.top=new W5(Z.view,!0,J.topContainer);if(this.bottom.container!=J.bottomContainer)this.bottom.sync([]),this.bottom=new W5(Z.view,!1,J.bottomContainer);this.top.syncClasses(),this.bottom.syncClasses();let Q=Z.state.facet(m7);if(Q!=this.input){let X=Q.filter((W)=>W),Y=[],K=[],I=[],q=[];for(let W of X){let G=this.specs.indexOf(W),U;if(G<0)U=W(Z.view),q.push(U);else if(U=this.panels[G],U.update)U.update(Z);Y.push(U),(U.top?K:I).push(U)}this.specs=X,this.panels=Y,this.top.sync(K),this.bottom.sync(I);for(let W of q)if(W.dom.classList.add("cm-panel"),W.mount)W.mount()}else for(let X of this.panels)if(X.update)X.update(Z)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:(Z)=>K1.scrollMargins.of((J)=>{let Q=J.plugin(Z);return Q&&{top:Q.top.scrollMargin(),bottom:Q.bottom.scrollMargin()}})});class W5{constructor(Z,J,Q){this.view=Z,this.top=J,this.container=Q,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(Z){for(let J of this.panels)if(J.destroy&&Z.indexOf(J)<0)J.destroy();this.panels=Z,this.syncDOM()}syncDOM(){if(this.panels.length==0){if(this.dom)this.dom.remove(),this.dom=void 0;return}if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom";let J=this.container||this.view.dom;J.insertBefore(this.dom,this.top?J.firstChild:null)}let Z=this.dom.firstChild;for(let J of this.panels)if(J.dom.parentNode==this.dom){while(Z!=J.dom)Z=iz(Z);Z=Z.nextSibling}else this.dom.insertBefore(J.dom,Z);while(Z)Z=iz(Z)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(!this.container||this.classes==this.view.themeClasses)return;for(let Z of this.classes.split(" "))if(Z)this.container.classList.remove(Z);for(let Z of(this.classes=this.view.themeClasses).split(" "))if(Z)this.container.classList.add(Z)}}function iz(Z){let J=Z.nextSibling;return Z.remove(),J}var m7=o.define({enables:WA});class i6 extends N4{compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}eq(Z){return!1}destroy(Z){}}i6.prototype.elementClass="";i6.prototype.toDOM=void 0;i6.prototype.mapMode=T0.TrackBefore;i6.prototype.startSide=i6.prototype.endSide=-1;i6.prototype.point=!0;var WY=o.define(),GA=o.define();var EZ=o.define();var wY=o.define({combine:(Z)=>Z.some((J)=>J)});function UA(Z){let J=[zA];if(Z&&Z.fixed===!1)J.push(wY.of(!0));return J}var zA=M0.fromClass(class{constructor(Z){this.view=Z,this.domAfter=null,this.prevViewport=Z.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=Z.state.facet(EZ).map((J)=>new kY(Z,J)),this.fixed=!Z.state.facet(wY);for(let J of this.gutters)if(J.config.side=="after")this.getDOMAfter().appendChild(J.dom);else this.dom.appendChild(J.dom);if(this.fixed)this.dom.style.position="sticky";this.syncGutters(!1),Z.scrollDOM.insertBefore(this.dom,Z.contentDOM)}getDOMAfter(){if(!this.domAfter)this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter);return this.domAfter}update(Z){if(this.updateGutters(Z)){let J=this.prevViewport,Q=Z.view.viewport,X=Math.min(J.to,Q.to)-Math.max(J.from,Q.from);this.syncGutters(X<(Q.to-Q.from)*0.8)}if(Z.geometryChanged){let J=this.view.contentHeight/this.view.scaleY+"px";if(this.dom.style.minHeight=J,this.domAfter)this.domAfter.style.minHeight=J}if(this.view.state.facet(wY)!=!this.fixed){if(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter)this.domAfter.style.position=this.fixed?"sticky":""}this.prevViewport=Z.view.viewport}syncGutters(Z){let J=this.dom.nextSibling;if(Z){if(this.dom.remove(),this.domAfter)this.domAfter.remove()}let Q=N1.iter(this.view.state.facet(WY),this.view.viewport.from),X=[],Y=this.gutters.map((K)=>new RV(K,this.view.viewport,-this.view.documentPadding.top));for(let K of this.view.viewportLineBlocks){if(X.length)X=[];if(Array.isArray(K.type)){let I=!0;for(let q of K.type)if(q.type==V0.Text&&I){hY(Q,X,q.from);for(let W of Y)W.line(this.view,q,X);I=!1}else if(q.widget)for(let W of Y)W.widget(this.view,q)}else if(K.type==V0.Text){hY(Q,X,K.from);for(let I of Y)I.line(this.view,K,X)}else if(K.widget)for(let I of Y)I.widget(this.view,K)}for(let K of Y)K.finish();if(Z){if(this.view.scrollDOM.insertBefore(this.dom,J),this.domAfter)this.view.scrollDOM.appendChild(this.domAfter)}}updateGutters(Z){let J=Z.startState.facet(EZ),Q=Z.state.facet(EZ),X=Z.docChanged||Z.heightChanged||Z.viewportChanged||!N1.eq(Z.startState.facet(WY),Z.state.facet(WY),Z.view.viewport.from,Z.view.viewport.to);if(J==Q){for(let Y of this.gutters)if(Y.update(Z))X=!0}else{X=!0;let Y=[];for(let K of Q){let I=J.indexOf(K);if(I<0)Y.push(new kY(this.view,K));else this.gutters[I].update(Z),Y.push(this.gutters[I])}for(let K of this.gutters)if(K.dom.remove(),Y.indexOf(K)<0)K.destroy();for(let K of Y)if(K.config.side=="after")this.getDOMAfter().appendChild(K.dom);else this.dom.appendChild(K.dom);this.gutters=Y}return X}destroy(){for(let Z of this.gutters)Z.destroy();if(this.dom.remove(),this.domAfter)this.domAfter.remove()}},{provide:(Z)=>K1.scrollMargins.of((J)=>{let Q=J.plugin(Z);if(!Q||Q.gutters.length==0||!Q.fixed)return null;let X=Q.dom.offsetWidth*J.scaleX,Y=Q.domAfter?Q.domAfter.offsetWidth*J.scaleX:0;return J.textDirection==h1.LTR?{left:X,right:Y}:{right:X,left:Y}})});function rz(Z){return Array.isArray(Z)?Z:[Z]}function hY(Z,J,Q){while(Z.value&&Z.from<=Q){if(Z.from==Q)J.push(Z.value);Z.next()}}class RV{constructor(Z,J,Q){this.gutter=Z,this.height=Q,this.i=0,this.cursor=N1.iter(Z.markers,J.from)}addElement(Z,J,Q){let{gutter:X}=this,Y=(J.top-this.height)/Z.scaleY,K=J.height/Z.scaleY;if(this.i==X.elements.length){let I=new lY(Z,K,Y,Q);X.elements.push(I),X.dom.appendChild(I.dom)}else X.elements[this.i].update(Z,K,Y,Q);this.height=J.bottom,this.i++}line(Z,J,Q){let X=[];if(hY(this.cursor,X,J.from),Q.length)X=X.concat(Q);let Y=this.gutter.config.lineMarker(Z,J,X);if(Y)X.unshift(Y);let K=this.gutter;if(X.length==0&&!K.config.renderEmptyElements)return;this.addElement(Z,J,X)}widget(Z,J){let Q=this.gutter.config.widgetMarker(Z,J.widget,J),X=Q?[Q]:null;for(let Y of Z.state.facet(GA)){let K=Y(Z,J.widget,J);if(K)(X||(X=[])).push(K)}if(X)this.addElement(Z,J,X)}finish(){let Z=this.gutter;while(Z.elements.length>this.i){let J=Z.elements.pop();Z.dom.removeChild(J.dom),J.destroy()}}}class kY{constructor(Z,J){this.view=Z,this.config=J,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let Q in J.domEventHandlers)this.dom.addEventListener(Q,(X)=>{let Y=X.target,K;if(Y!=this.dom&&this.dom.contains(Y)){while(Y.parentNode!=this.dom)Y=Y.parentNode;let q=Y.getBoundingClientRect();K=(q.top+q.bottom)/2}else K=X.clientY;let I=Z.lineBlockAtHeight(K-Z.documentTop);if(J.domEventHandlers[Q](Z,I,X))X.preventDefault()});if(this.markers=rz(J.markers(Z)),J.initialSpacer)this.spacer=new lY(Z,0,0,[J.initialSpacer(Z)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none"}update(Z){let J=this.markers;if(this.markers=rz(this.config.markers(Z.view)),this.spacer&&this.config.updateSpacer){let X=this.config.updateSpacer(this.spacer.markers[0],Z);if(X!=this.spacer.markers[0])this.spacer.update(Z.view,0,0,[X])}let Q=Z.view.viewport;return!N1.eq(this.markers,J,Q.from,Q.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(Z):!1)}destroy(){for(let Z of this.elements)Z.destroy()}}class lY{constructor(Z,J,Q,X){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(Z,J,Q,X)}update(Z,J,Q,X){if(this.height!=J)this.height=J,this.dom.style.height=J+"px";if(this.above!=Q)this.dom.style.marginTop=(this.above=Q)?Q+"px":"";if(!VA(this.markers,X))this.setMarkers(Z,X)}setMarkers(Z,J){let Q="cm-gutterElement",X=this.dom.firstChild;for(let Y=0,K=0;;){let I=K,q=Y<J.length?J[Y++]:null,W=!1;if(q){let G=q.elementClass;if(G)Q+=" "+G;for(let U=K;U<this.markers.length;U++)if(this.markers[U].compare(q)){I=U,W=!0;break}}else I=this.markers.length;while(K<I){let G=this.markers[K++];if(G.toDOM){G.destroy(X);let U=X.nextSibling;X.remove(),X=U}}if(!q)break;if(q.toDOM)if(W)X=X.nextSibling;else this.dom.insertBefore(q.toDOM(Z),X);if(W)K++}this.dom.className=Q,this.markers=J}destroy(){this.setMarkers(null,[])}}function VA(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(!Z[Q].compare(J[Q]))return!1;return!0}var jA=o.define(),OA=o.define(),y7=o.define({combine(Z){return A4(Z,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(J,Q){let X=Object.assign({},J);for(let Y in Q){let K=X[Y],I=Q[Y];X[Y]=K?(q,W,G)=>K(q,W,G)||I(q,W,G):I}return X}})}});class CZ extends i6{constructor(Z){super();this.number=Z}eq(Z){return this.number==Z.number}toDOM(){return document.createTextNode(this.number)}}function GY(Z,J){return Z.state.facet(y7).formatNumber(J,Z.state)}var FA=EZ.compute([y7],(Z)=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(J){return J.state.facet(jA)},lineMarker(J,Q,X){if(X.some((Y)=>Y.toDOM))return null;return new CZ(GY(J,J.state.doc.lineAt(Q.from).number))},widgetMarker:(J,Q,X)=>{for(let Y of J.state.facet(OA)){let K=Y(J,Q,X);if(K)return K}return null},lineMarkerChange:(J)=>J.startState.facet(y7)!=J.state.facet(y7),initialSpacer(J){return new CZ(GY(J,az(J.state.doc.lines)))},updateSpacer(J,Q){let X=GY(Q.view,az(Q.view.state.doc.lines));return X==J.number?J:new CZ(X)},domEventHandlers:Z.facet(y7).domEventHandlers,side:"before"}));function MV(Z={}){return[y7.of(Z),UA(),FA]}function az(Z){let J=9;while(J<Z)J=J*10+9;return J}var HA=0;class dZ{constructor(Z,J){this.from=Z,this.to=J}}class F1{constructor(Z={}){this.id=HA++,this.perNode=!!Z.perNode,this.deserialize=Z.deserialize||(()=>{throw Error("This node type doesn't define a deserialize function")}),this.combine=Z.combine||null}add(Z){if(this.perNode)throw RangeError("Can't add per-node props to node types");if(typeof Z!="function")Z=w0.match(Z);return(J)=>{let Q=Z(J);return Q===void 0?null:[this,Q]}}}F1.closedBy=new F1({deserialize:(Z)=>Z.split(" ")});F1.openedBy=new F1({deserialize:(Z)=>Z.split(" ")});F1.group=new F1({deserialize:(Z)=>Z.split(" ")});F1.isolate=new F1({deserialize:(Z)=>{if(Z&&Z!="rtl"&&Z!="ltr"&&Z!="auto")throw RangeError("Invalid value for isolate: "+Z);return Z||"auto"}});F1.contextHash=new F1({perNode:!0});F1.lookAhead=new F1({perNode:!0});F1.mounted=new F1({perNode:!0});class p7{constructor(Z,J,Q,X=!1){this.tree=Z,this.overlay=J,this.parser=Q,this.bracketed=X}static get(Z){return Z&&Z.props&&Z.props[F1.mounted.id]}}var NA=Object.create(null);class w0{constructor(Z,J,Q,X=0){this.name=Z,this.props=J,this.id=Q,this.flags=X}static define(Z){let J=Z.props&&Z.props.length?Object.create(null):NA,Q=(Z.top?1:0)|(Z.skipped?2:0)|(Z.error?4:0)|(Z.name==null?8:0),X=new w0(Z.name||"",J,Z.id,Q);if(Z.props)for(let Y of Z.props){if(!Array.isArray(Y))Y=Y(X);if(Y){if(Y[0].perNode)throw RangeError("Can't store a per-node prop on a node type");J[Y[0].id]=Y[1]}}return X}prop(Z){return this.props[Z.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(Z){if(typeof Z=="string"){if(this.name==Z)return!0;let J=this.prop(F1.group);return J?J.indexOf(Z)>-1:!1}return this.id==Z}static match(Z){let J=Object.create(null);for(let Q in Z)for(let X of Q.split(" "))J[X]=Z[Q];return(Q)=>{for(let X=Q.prop(F1.group),Y=-1;Y<(X?X.length:0);Y++){let K=J[Y<0?Q.name:X[Y]];if(K)return K}}}}w0.none=new w0("",Object.create(null),0,8);class iZ{constructor(Z){this.types=Z;for(let J=0;J<Z.length;J++)if(Z[J].id!=J)throw RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...Z){let J=[];for(let Q of this.types){let X=null;for(let Y of Z){let K=Y(Q);if(K){if(!X)X=Object.assign({},Q.props);let I=K[1],q=K[0];if(q.combine&&q.id in X)I=q.combine(X[q.id],I);X[q.id]=I}}J.push(X?new w0(Q.name,X,Q.id,Q.flags):Q)}return new iZ(J)}}var cZ=new WeakMap,AV=new WeakMap,s1;(function(Z){Z[Z.ExcludeBuffers=1]="ExcludeBuffers",Z[Z.IncludeAnonymous=2]="IncludeAnonymous",Z[Z.IgnoreMounts=4]="IgnoreMounts",Z[Z.IgnoreOverlays=8]="IgnoreOverlays",Z[Z.EnterBracketed=16]="EnterBracketed"})(s1||(s1={}));class f1{constructor(Z,J,Q,X,Y){if(this.type=Z,this.children=J,this.positions=Q,this.length=X,this.props=null,Y&&Y.length){this.props=Object.create(null);for(let[K,I]of Y)this.props[typeof K=="number"?K:K.id]=I}}toString(){let Z=p7.get(this);if(Z&&!Z.overlay)return Z.tree.toString();let J="";for(let Q of this.children){let X=Q.toString();if(X){if(J)J+=",";J+=X}}return!this.type.name?J:(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(J.length?"("+J+")":"")}cursor(Z=0){return new lZ(this.topNode,Z)}cursorAt(Z,J=0,Q=0){let X=cZ.get(this)||this.topNode,Y=new lZ(X);return Y.moveTo(Z,J),cZ.set(this,Y._tree),Y}get topNode(){return new Q6(this,0,0,null)}resolve(Z,J=0){let Q=D5(cZ.get(this)||this.topNode,Z,J,!1);return cZ.set(this,Q),Q}resolveInner(Z,J=0){let Q=D5(AV.get(this)||this.topNode,Z,J,!0);return AV.set(this,Q),Q}resolveStack(Z,J=0){return RA(this,Z,J)}iterate(Z){let{enter:J,leave:Q,from:X=0,to:Y=this.length}=Z,K=Z.mode||0,I=(K&s1.IncludeAnonymous)>0;for(let q=this.cursor(K|s1.IncludeAnonymous);;){let W=!1;if(q.from<=Y&&q.to>=X&&(!I&&q.type.isAnonymous||J(q)!==!1)){if(q.firstChild())continue;W=!0}for(;;){if(W&&Q&&(I||!q.type.isAnonymous))Q(q);if(q.nextSibling())break;if(!q.parent())return;W=!0}}}prop(Z){return!Z.perNode?this.type.prop(Z):this.props?this.props[Z.id]:void 0}get propValues(){let Z=[];if(this.props)for(let J in this.props)Z.push([+J,this.props[J]]);return Z}balance(Z={}){return this.children.length<=8?this:tY(w0.none,this.children,this.positions,0,this.children.length,0,this.length,(J,Q,X)=>new f1(this.type,J,Q,X,this.propValues),Z.makeTree||((J,Q,X)=>new f1(w0.none,J,Q,X)))}static build(Z){return MA(Z)}}f1.empty=new f1(w0.none,[],[],0);class rY{constructor(Z,J){this.buffer=Z,this.index=J}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new rY(this.buffer,this.index)}}class t4{constructor(Z,J,Q){this.buffer=Z,this.length=J,this.set=Q}get type(){return w0.none}toString(){let Z=[];for(let J=0;J<this.buffer.length;)Z.push(this.childString(J)),J=this.buffer[J+3];return Z.join(",")}childString(Z){let J=this.buffer[Z],Q=this.buffer[Z+3],X=this.set.types[J],Y=X.name;if(/\W/.test(Y)&&!X.isError)Y=JSON.stringify(Y);if(Z+=4,Q==Z)return Y;let K=[];while(Z<Q)K.push(this.childString(Z)),Z=this.buffer[Z+3];return Y+"("+K.join(",")+")"}findChild(Z,J,Q,X,Y){let{buffer:K}=this,I=-1;for(let q=Z;q!=J;q=K[q+3])if(BV(Y,X,K[q+1],K[q+2])){if(I=q,Q>0)break}return I}slice(Z,J,Q){let X=this.buffer,Y=new Uint16Array(J-Z),K=0;for(let I=Z,q=0;I<J;){Y[q++]=X[I++],Y[q++]=X[I++]-Q;let W=Y[q++]=X[I++]-Q;Y[q++]=X[I++]-Z,K=Math.max(K,W)}return new t4(Y,K,this.set)}}function BV(Z,J,Q,X){switch(Z){case-2:return Q<J;case-1:return X>=J&&Q<J;case 0:return Q<J&&X>J;case 1:return Q<=J&&X>J;case 2:return X>J;case 4:return!0}}function D5(Z,J,Q,X){var Y;while(Z.from==Z.to||(Q<1?Z.from>=J:Z.from>J)||(Q>-1?Z.to<=J:Z.to<J)){let I=!X&&Z instanceof Q6&&Z.index<0?null:Z.parent;if(!I)return Z;Z=I}let K=X?0:s1.IgnoreOverlays;if(X){for(let I=Z,q=I.parent;q;I=q,q=I.parent)if(I instanceof Q6&&I.index<0&&((Y=q.enter(J,Q,K))===null||Y===void 0?void 0:Y.from)!=I.from)Z=q}for(;;){let I=Z.enter(J,Q,K);if(!I)return Z;Z=I}}class aY{cursor(Z=0){return new lZ(this,Z)}getChild(Z,J=null,Q=null){let X=DV(this,Z,J,Q);return X.length?X[0]:null}getChildren(Z,J=null,Q=null){return DV(this,Z,J,Q)}resolve(Z,J=0){return D5(this,Z,J,!1)}resolveInner(Z,J=0){return D5(this,Z,J,!0)}matchContext(Z){return iY(this.parent,Z)}enterUnfinishedNodesBefore(Z){let J=this.childBefore(Z),Q=this;while(J){let X=J.lastChild;if(!X||X.to!=J.to)break;if(X.type.isError&&X.from==X.to)Q=J,J=X.prevSibling;else J=X}return Q}get node(){return this}get next(){return this.parent}}class Q6 extends aY{constructor(Z,J,Q,X){super();this._tree=Z,this.from=J,this.index=Q,this._parent=X}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(Z,J,Q,X,Y=0){for(let K=this;;){for(let{children:I,positions:q}=K._tree,W=J>0?I.length:-1;Z!=W;Z+=J){let G=I[Z],U=q[Z]+K.from,z;if(!(Y&s1.EnterBracketed&&G instanceof f1&&(z=p7.get(G))&&!z.overlay&&z.bracketed&&Q>=U&&Q<=U+G.length)&&!BV(X,Q,U,U+G.length))continue;if(G instanceof t4){if(Y&s1.ExcludeBuffers)continue;let j=G.findChild(0,G.buffer.length,J,Q-U,X);if(j>-1)return new o4(new PV(K,G,Z,U),null,j)}else if(Y&s1.IncludeAnonymous||(!G.type.isAnonymous||oY(G))){let j;if(!(Y&s1.IgnoreMounts)&&(j=p7.get(G))&&!j.overlay)return new Q6(j.tree,U,Z,K);let O=new Q6(G,U,Z,K);return Y&s1.IncludeAnonymous||!O.type.isAnonymous?O:O.nextChild(J<0?G.children.length-1:0,J,Q,X,Y)}}if(Y&s1.IncludeAnonymous||!K.type.isAnonymous)return null;if(K.index>=0)Z=K.index+J;else Z=J<0?-1:K._parent._tree.children.length;if(K=K._parent,!K)return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(Z){return this.nextChild(0,1,Z,2)}childBefore(Z){return this.nextChild(this._tree.children.length-1,-1,Z,-2)}prop(Z){return this._tree.prop(Z)}enter(Z,J,Q=0){let X;if(!(Q&s1.IgnoreOverlays)&&(X=p7.get(this._tree))&&X.overlay){let Y=Z-this.from,K=Q&s1.EnterBracketed&&X.bracketed;for(let{from:I,to:q}of X.overlay)if((J>0||K?I<=Y:I<Y)&&(J<0||K?q>=Y:q>Y))return new Q6(X.tree,X.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,Z,J,Q)}nextSignificantParent(){let Z=this;while(Z.type.isAnonymous&&Z._parent)Z=Z._parent;return Z}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function DV(Z,J,Q,X){let Y=Z.cursor(),K=[];if(!Y.firstChild())return K;if(Q!=null){for(let I=!1;!I;)if(I=Y.type.is(Q),!Y.nextSibling())return K}for(;;){if(X!=null&&Y.type.is(X))return K;if(Y.type.is(J))K.push(Y.node);if(!Y.nextSibling())return X==null?K:[]}}function iY(Z,J,Q=J.length-1){for(let X=Z;Q>=0;X=X.parent){if(!X)return!1;if(!X.type.isAnonymous){if(J[Q]&&J[Q]!=X.name)return!1;Q--}}return!0}class PV{constructor(Z,J,Q,X){this.parent=Z,this.buffer=J,this.index=Q,this.start=X}}class o4 extends aY{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(Z,J,Q){super();this.context=Z,this._parent=J,this.index=Q,this.type=Z.buffer.set.types[Z.buffer.buffer[Q]]}child(Z,J,Q){let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.context.start,Q);return Y<0?null:new o4(this.context,this,Y)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(Z){return this.child(1,Z,2)}childBefore(Z){return this.child(-1,Z,-2)}prop(Z){return this.type.prop(Z)}enter(Z,J,Q=0){if(Q&s1.ExcludeBuffers)return null;let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],J>0?1:-1,Z-this.context.start,J);return Y<0?null:new o4(this.context,this,Y)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(Z){return this._parent?null:this.context.parent.nextChild(this.context.index+Z,Z,0,4)}get nextSibling(){let{buffer:Z}=this.context,J=Z.buffer[this.index+3];if(J<(this._parent?Z.buffer[this._parent.index+3]:Z.buffer.length))return new o4(this.context,this._parent,J);return this.externalSibling(1)}get prevSibling(){let{buffer:Z}=this.context,J=this._parent?this._parent.index+4:0;if(this.index==J)return this.externalSibling(-1);return new o4(this.context,this._parent,Z.findChild(J,this.index,-1,0,4))}get tree(){return null}toTree(){let Z=[],J=[],{buffer:Q}=this.context,X=this.index+4,Y=Q.buffer[this.index+3];if(Y>X){let K=Q.buffer[this.index+1];Z.push(Q.slice(X,Y,K)),J.push(0)}return new f1(this.type,Z,J,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function SV(Z){if(!Z.length)return null;let J=0,Q=Z[0];for(let K=1;K<Z.length;K++){let I=Z[K];if(I.from>Q.from||I.to<Q.to)Q=I,J=K}let X=Q instanceof Q6&&Q.index<0?null:Q.parent,Y=Z.slice();if(X)Y[J]=X;else Y.splice(J,1);return new TV(Y,Q)}class TV{constructor(Z,J){this.heads=Z,this.node=J}get next(){return SV(this.heads)}}function RA(Z,J,Q){let X=Z.resolveInner(J,Q),Y=null;for(let K=X instanceof Q6?X:X.context.parent;K;K=K.parent)if(K.index<0){let I=K.parent;(Y||(Y=[X])).push(I.resolve(J,Q)),K=I}else{let I=p7.get(K.tree);if(I&&I.overlay&&I.overlay[0].from<=J&&I.overlay[I.overlay.length-1].to>=J){let q=new Q6(I.tree,I.overlay[0].from+K.from,-1,K);(Y||(Y=[X])).push(D5(q,J,Q,!1))}}return Y?SV(Y):X}class lZ{get name(){return this.type.name}constructor(Z,J=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=J&~s1.EnterBracketed,Z instanceof Q6)this.yieldNode(Z);else{this._tree=Z.context.parent,this.buffer=Z.context;for(let Q=Z._parent;Q;Q=Q._parent)this.stack.unshift(Q.index);this.bufferNode=Z,this.yieldBuf(Z.index)}}yieldNode(Z){if(!Z)return!1;return this._tree=Z,this.type=Z.type,this.from=Z.from,this.to=Z.to,!0}yieldBuf(Z,J){this.index=Z;let{start:Q,buffer:X}=this.buffer;return this.type=J||X.set.types[X.buffer[Z]],this.from=Q+X.buffer[Z+1],this.to=Q+X.buffer[Z+2],!0}yield(Z){if(!Z)return!1;if(Z instanceof Q6)return this.buffer=null,this.yieldNode(Z);return this.buffer=Z.context,this.yieldBuf(Z.index,Z.type)}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(Z,J,Q){if(!this.buffer)return this.yield(this._tree.nextChild(Z<0?this._tree._tree.children.length-1:0,Z,J,Q,this.mode));let{buffer:X}=this.buffer,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.buffer.start,Q);if(Y<0)return!1;return this.stack.push(this.index),this.yieldBuf(Y)}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(Z){return this.enterChild(1,Z,2)}childBefore(Z){return this.enterChild(-1,Z,-2)}enter(Z,J,Q=this.mode){if(!this.buffer)return this.yield(this._tree.enter(Z,J,Q));return Q&s1.ExcludeBuffers?!1:this.enterChild(1,Z,J)}parent(){if(!this.buffer)return this.yieldNode(this.mode&s1.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let Z=this.mode&s1.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(Z)}sibling(Z){if(!this.buffer)return!this._tree._parent?!1:this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+Z,Z,0,4,this.mode));let{buffer:J}=this.buffer,Q=this.stack.length-1;if(Z<0){let X=Q<0?0:this.stack[Q]+4;if(this.index!=X)return this.yieldBuf(J.findChild(X,this.index,-1,0,4))}else{let X=J.buffer[this.index+3];if(X<(Q<0?J.buffer.length:J.buffer[this.stack[Q]+3]))return this.yieldBuf(X)}return Q<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+Z,Z,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(Z){let J,Q,{buffer:X}=this;if(X){if(Z>0){if(this.index<X.buffer.buffer.length)return!1}else for(let Y=0;Y<this.index;Y++)if(X.buffer.buffer[Y+3]<this.index)return!1;({index:J,parent:Q}=X)}else({index:J,_parent:Q}=this._tree);for(;Q;{index:J,_parent:Q}=Q)if(J>-1)for(let Y=J+Z,K=Z<0?-1:Q._tree.children.length;Y!=K;Y+=Z){let I=Q._tree.children[Y];if(this.mode&s1.IncludeAnonymous||I instanceof t4||!I.type.isAnonymous||oY(I))return!1}return!0}move(Z,J){if(J&&this.enterChild(Z,0,4))return!0;for(;;){if(this.sibling(Z))return!0;if(this.atLastNode(Z)||!this.parent())return!1}}next(Z=!0){return this.move(1,Z)}prev(Z=!0){return this.move(-1,Z)}moveTo(Z,J=0){while(this.from==this.to||(J<1?this.from>=Z:this.from>Z)||(J>-1?this.to<=Z:this.to<Z))if(!this.parent())break;while(this.enterChild(1,Z,J));return this}get node(){if(!this.buffer)return this._tree;let Z=this.bufferNode,J=null,Q=0;if(Z&&Z.context==this.buffer)Z:for(let X=this.index,Y=this.stack.length;Y>=0;){for(let K=Z;K;K=K._parent)if(K.index==X){if(X==this.index)return K;J=K,Q=Y+1;break Z}X=this.stack[--Y]}for(let X=Q;X<this.stack.length;X++)J=new o4(this.buffer,J,this.stack[X]);return this.bufferNode=new o4(this.buffer,J,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(Z,J){for(let Q=0;;){let X=!1;if(this.type.isAnonymous||Z(this)!==!1){if(this.firstChild()){Q++;continue}if(!this.type.isAnonymous)X=!0}for(;;){if(X&&J)J(this);if(X=this.type.isAnonymous,!Q)return;if(this.nextSibling())break;this.parent(),Q--,X=!0}}}matchContext(Z){if(!this.buffer)return iY(this.node.parent,Z);let{buffer:J}=this.buffer,{types:Q}=J.set;for(let X=Z.length-1,Y=this.stack.length-1;X>=0;Y--){if(Y<0)return iY(this._tree,Z,X);let K=Q[J.buffer[this.stack[Y]]];if(!K.isAnonymous){if(Z[X]&&Z[X]!=K.name)return!1;X--}}return!0}}function oY(Z){return Z.children.some((J)=>J instanceof t4||!J.type.isAnonymous||oY(J))}function MA(Z){var J;let{buffer:Q,nodeSet:X,maxBufferLength:Y=1024,reused:K=[],minRepeatType:I=X.types.length}=Z,q=Array.isArray(Q)?new rY(Q,Q.length):Q,W=X.types,G=0,U=0;function z(L,S,B,E,M,l){let{id:n,start:p,end:q1,size:e}=q,Z1=U,I1=G;if(e<0)if(q.next(),e==-1){let f=K[n];B.push(f),E.push(p-L);return}else if(e==-3){G=n;return}else if(e==-4){U=n;return}else throw RangeError(`Unrecognized record size: ${e}`);let W1=W[n],J1,t,v=p-L;if(q1-p<=Y&&(t=R(q.pos-S,M))){let f=new Uint16Array(t.size-t.skip),c=q.pos-t.size,Q1=f.length;while(q.pos>c)Q1=T(t.start,f,Q1);J1=new t4(f,q1-t.start,X),v=t.start-L}else{let f=q.pos-e;q.next();let c=[],Q1=[],$1=n>=I?n:-1,z1=0,T1=q1;while(q.pos>f)if($1>=0&&q.id==$1&&q.size>=0){if(q.end<=T1-Y)H(c,Q1,p,z1,q.end,T1,$1,Z1,I1),z1=c.length,T1=q.end;q.next()}else if(l>2500)j(p,f,c,Q1);else z(p,f,c,Q1,$1,l+1);if($1>=0&&z1>0&&z1<c.length)H(c,Q1,p,z1,p,T1,$1,Z1,I1);if(c.reverse(),Q1.reverse(),$1>-1&&z1>0){let J0=O(W1,I1);J1=tY(W1,c,Q1,0,c.length,0,q1-p,J0,J0)}else J1=N(W1,c,Q1,q1-p,Z1-q1,I1)}B.push(J1),E.push(v)}function j(L,S,B,E){let M=[],l=0,n=-1;while(q.pos>S){let{id:p,start:q1,end:e,size:Z1}=q;if(Z1>4)q.next();else if(n>-1&&q1<n)break;else{if(n<0)n=e-Y;M.push(p,q1,e),l++,q.next()}}if(l){let p=new Uint16Array(l*4),q1=M[M.length-2];for(let e=M.length-3,Z1=0;e>=0;e-=3)p[Z1++]=M[e],p[Z1++]=M[e+1]-q1,p[Z1++]=M[e+2]-q1,p[Z1++]=Z1;B.push(new t4(p,M[2]-q1,X)),E.push(q1-L)}}function O(L,S){return(B,E,M)=>{let l=0,n=B.length-1,p,q1;if(n>=0&&(p=B[n])instanceof f1){if(!n&&p.type==L&&p.length==M)return p;if(q1=p.prop(F1.lookAhead))l=E[n]+p.length+q1}return N(L,B,E,M,l,S)}}function H(L,S,B,E,M,l,n,p,q1){let e=[],Z1=[];while(L.length>E)e.push(L.pop()),Z1.push(S.pop()+B-M);L.push(N(X.types[n],e,Z1,l-M,p-l,q1)),S.push(M-B)}function N(L,S,B,E,M,l,n){if(l){let p=[F1.contextHash,l];n=n?[p].concat(n):[p]}if(M>25){let p=[F1.lookAhead,M];n=n?[p].concat(n):[p]}return new f1(L,S,B,E,n)}function R(L,S){let B=q.fork(),E=0,M=0,l=0,n=B.end-Y,p={size:0,start:0,skip:0};Z:for(let q1=B.pos-L;B.pos>q1;){let e=B.size;if(B.id==S&&e>=0){p.size=E,p.start=M,p.skip=l,l+=4,E+=4,B.next();continue}let Z1=B.pos-e;if(e<0||Z1<q1||B.start<n)break;let I1=B.id>=I?4:0,W1=B.start;B.next();while(B.pos>Z1){if(B.size<0)if(B.size==-3||B.size==-4)I1+=4;else break Z;else if(B.id>=I)I1+=4;B.next()}M=W1,E+=e,l+=I1}if(S<0||E==L)p.size=E,p.start=M,p.skip=l;return p.size>4?p:void 0}function T(L,S,B){let{id:E,start:M,end:l,size:n}=q;if(q.next(),n>=0&&E<I){let p=B;if(n>4){let q1=q.pos-(n-4);while(q.pos>q1)B=T(L,S,B)}S[--B]=p,S[--B]=l-L,S[--B]=M-L,S[--B]=E}else if(n==-3)G=E;else if(n==-4)U=E;return B}let _=[],C=[];while(q.pos>0)z(Z.start||0,Z.bufferStart||0,_,C,-1,0);let h=(J=Z.length)!==null&&J!==void 0?J:_.length?C[0]+_[0].length:0;return new f1(W[Z.topID],_.reverse(),C.reverse(),h)}var LV=new WeakMap;function sZ(Z,J){if(!Z.isAnonymous||J instanceof t4||J.type!=Z)return 1;let Q=LV.get(J);if(Q==null){Q=1;for(let X of J.children){if(X.type!=Z||!(X instanceof f1)){Q=1;break}Q+=sZ(Z,X)}LV.set(J,Q)}return Q}function tY(Z,J,Q,X,Y,K,I,q,W){let G=0;for(let H=X;H<Y;H++)G+=sZ(Z,J[H]);let U=Math.ceil(G*1.5/8),z=[],j=[];function O(H,N,R,T,_){for(let C=R;C<T;){let h=C,L=N[C],S=sZ(Z,H[C]);C++;for(;C<T;C++){let B=sZ(Z,H[C]);if(S+B>=U)break;S+=B}if(C==h+1){if(S>U){let B=H[h];O(B.children,B.positions,0,B.children.length,N[h]+_);continue}z.push(H[h])}else{let B=N[C-1]+H[C-1].length-L;z.push(tY(Z,H,N,h,C,L,B,null,W))}j.push(L+_-K)}}return O(J,Q,X,Y,0),(q||W)(z,j,I)}class e4{constructor(Z,J,Q,X,Y=!1,K=!1){this.from=Z,this.to=J,this.tree=Q,this.offset=X,this.open=(Y?1:0)|(K?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(Z,J=[],Q=!1){let X=[new e4(0,Z.length,Z,0,!1,Q)];for(let Y of J)if(Y.to>Z.length)X.push(Y);return X}static applyChanges(Z,J,Q=128){if(!J.length)return Z;let X=[],Y=1,K=Z.length?Z[0]:null;for(let I=0,q=0,W=0;;I++){let G=I<J.length?J[I]:null,U=G?G.fromA:1e9;if(U-q>=Q)while(K&&K.from<U){let z=K;if(q>=z.from||U<=z.to||W){let j=Math.max(z.from,q)-W,O=Math.min(z.to,U)-W;z=j>=O?null:new e4(j,O,z.tree,z.offset+W,I>0,!!G)}if(z)X.push(z);if(K.to>U)break;K=Y<Z.length?Z[Y++]:null}if(!G)break;q=G.toA,W=G.toA-G.toB}return X}}class rZ{startParse(Z,J,Q){if(typeof Z=="string")Z=new _V(Z);return Q=!Q?[new dZ(0,Z.length)]:Q.length?Q.map((X)=>new dZ(X.from,X.to)):[new dZ(0,0)],this.createParse(Z,J||[],Q)}parse(Z,J,Q){let X=this.startParse(Z,J,Q);for(;;){let Y=X.advance();if(Y)return Y}}}class _V{constructor(Z){this.string=Z}get length(){return this.string.length}chunk(Z){return this.string.slice(Z)}get lineChunks(){return!1}read(Z,J){return this.string.slice(Z,J)}}var ak=new F1({perNode:!0});var AA=0;class X6{constructor(Z,J,Q,X){this.name=Z,this.set=J,this.base=Q,this.modified=X,this.id=AA++}toString(){let{name:Z}=this;for(let J of this.modified)if(J.name)Z=`${J.name}(${Z})`;return Z}static define(Z,J){let Q=typeof Z=="string"?Z:"?";if(Z instanceof X6)J=Z;if(J===null||J===void 0?void 0:J.base)throw Error("Can not derive from a modified tag");let X=new X6(Q,[],null,[]);if(X.set.push(X),J)for(let Y of J.set)X.set.push(Y);return X}static defineModifier(Z){let J=new eZ(Z);return(Q)=>{if(Q.modified.indexOf(J)>-1)return Q;return eZ.get(Q.base||Q,Q.modified.concat(J).sort((X,Y)=>X.id-Y.id))}}}var DA=0;class eZ{constructor(Z){this.name=Z,this.instances=[],this.id=DA++}static get(Z,J){if(!J.length)return Z;let Q=J[0].instances.find((I)=>I.base==Z&&LA(J,I.modified));if(Q)return Q;let X=[],Y=new X6(Z.name,X,Z,J);for(let I of J)I.instances.push(Y);let K=BA(J);for(let I of Z.set)if(!I.modified.length)for(let q of K)X.push(eZ.get(I,q));return Y}}function LA(Z,J){return Z.length==J.length&&Z.every((Q,X)=>Q==J[X])}function BA(Z){let J=[[]];for(let Q=0;Q<Z.length;Q++)for(let X=0,Y=J.length;X<Y;X++)J.push(J[X].concat(Z[Q]));return J.sort((Q,X)=>X.length-Q.length)}function wV(Z){let J=Object.create(null);for(let Q in Z){let X=Z[Q];if(!Array.isArray(X))X=[X];for(let Y of Q.split(" "))if(Y){let K=[],I=2,q=Y;for(let z=0;;){if(q=="..."&&z>0&&z+3==Y.length){I=1;break}let j=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(q);if(!j)throw RangeError("Invalid path: "+Y);if(K.push(j[0]=="*"?"":j[0][0]=='"'?JSON.parse(j[0]):j[0]),z+=j[0].length,z==Y.length)break;let O=Y[z++];if(z==Y.length&&O=="!"){I=0;break}if(O!="/")throw RangeError("Invalid path: "+Y);q=Y.slice(z)}let W=K.length-1,G=K[W];if(!G)throw RangeError("Invalid path: "+Y);let U=new c7(X,I,W>0?K.slice(0,W):null);J[G]=U.sort(J[G])}}return hV.add(J)}var hV=new F1({combine(Z,J){let Q,X,Y;while(Z||J){if(!Z||J&&Z.depth>=J.depth)Y=J,J=J.next;else Y=Z,Z=Z.next;if(Q&&Q.mode==Y.mode&&!Y.context&&!Q.context)continue;let K=new c7(Y.tags,Y.mode,Y.context);if(Q)Q.next=K;else X=K;Q=K}return X}});class c7{constructor(Z,J,Q,X){this.tags=Z,this.mode=J,this.context=Q,this.next=X}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(Z){if(!Z||Z.depth<this.depth)return this.next=Z,this;return Z.next=this.sort(Z.next),Z}get depth(){return this.context?this.context.length:0}}c7.empty=new c7([],2,null);function JK(Z,J){let Q=Object.create(null);for(let K of Z)if(!Array.isArray(K.tag))Q[K.tag.id]=K.class;else for(let I of K.tag)Q[I.id]=K.class;let{scope:X,all:Y=null}=J||{};return{style:(K)=>{let I=Y;for(let q of K)for(let W of q.set){let G=Q[W.id];if(G){I=I?I+" "+G:G;break}}return I},scope:X}}function PA(Z,J){let Q=null;for(let X of Z){let Y=X.style(J);if(Y)Q=Q?Q+" "+Y:Y}return Q}function kV(Z,J,Q,X=0,Y=Z.length){let K=new bV(X,Array.isArray(J)?J:[J],Q);K.highlightRange(Z.cursor(),X,Y,"",K.highlighters),K.flush(Y)}class bV{constructor(Z,J,Q){this.at=Z,this.highlighters=J,this.span=Q,this.class=""}startSpan(Z,J){if(J!=this.class){if(this.flush(Z),Z>this.at)this.at=Z;this.class=J}}flush(Z){if(Z>this.at&&this.class)this.span(this.at,Z,this.class)}highlightRange(Z,J,Q,X,Y){let{type:K,from:I,to:q}=Z;if(I>=Q||q<=J)return;if(K.isTop)Y=this.highlighters.filter((j)=>!j.scope||j.scope(K));let W=X,G=SA(Z)||c7.empty,U=PA(Y,G.tags);if(U){if(W)W+=" ";if(W+=U,G.mode==1)X+=(X?" ":"")+U}if(this.startSpan(Math.max(J,I),W),G.opaque)return;let z=Z.tree&&Z.tree.prop(F1.mounted);if(z&&z.overlay){let j=Z.node.enter(z.overlay[0].from+I,1),O=this.highlighters.filter((N)=>!N.scope||N.scope(z.tree.type)),H=Z.firstChild();for(let N=0,R=I;;N++){let T=N<z.overlay.length?z.overlay[N]:null,_=T?T.from+I:q,C=Math.max(J,R),h=Math.min(Q,_);if(C<h&&H){while(Z.from<h)if(this.highlightRange(Z,C,h,X,Y),this.startSpan(Math.min(h,Z.to),W),Z.to>=_||!Z.nextSibling())break}if(!T||_>Q)break;if(R=T.to+I,R>J)this.highlightRange(j.cursor(),Math.max(J,T.from+I),Math.min(Q,R),"",O),this.startSpan(Math.min(Q,R),W)}if(H)Z.parent()}else if(Z.firstChild()){if(z)X="";do{if(Z.to<=J)continue;if(Z.from>=Q)break;this.highlightRange(Z,J,Q,X,Y),this.startSpan(Math.min(Q,Z.to),W)}while(Z.nextSibling());Z.parent()}}}function SA(Z){let J=Z.type.prop(hV);while(J&&J.context&&!Z.matchContext(J.context))J=J.next;return J||null}var s=X6.define,aZ=s(),Z8=s(),EV=s(Z8),CV=s(Z8),J8=s(),oZ=s(J8),eY=s(J8),o6=s(),i8=s(o6),r6=s(),a6=s(),ZK=s(),L5=s(ZK),tZ=s(),m={comment:aZ,lineComment:s(aZ),blockComment:s(aZ),docComment:s(aZ),name:Z8,variableName:s(Z8),typeName:EV,tagName:s(EV),propertyName:CV,attributeName:s(CV),className:s(Z8),labelName:s(Z8),namespace:s(Z8),macroName:s(Z8),literal:J8,string:oZ,docString:s(oZ),character:s(oZ),attributeValue:s(oZ),number:eY,integer:s(eY),float:s(eY),bool:s(J8),regexp:s(J8),escape:s(J8),color:s(J8),url:s(J8),keyword:r6,self:s(r6),null:s(r6),atom:s(r6),unit:s(r6),modifier:s(r6),operatorKeyword:s(r6),controlKeyword:s(r6),definitionKeyword:s(r6),moduleKeyword:s(r6),operator:a6,derefOperator:s(a6),arithmeticOperator:s(a6),logicOperator:s(a6),bitwiseOperator:s(a6),compareOperator:s(a6),updateOperator:s(a6),definitionOperator:s(a6),typeOperator:s(a6),controlOperator:s(a6),punctuation:ZK,separator:s(ZK),bracket:L5,angleBracket:s(L5),squareBracket:s(L5),paren:s(L5),brace:s(L5),content:o6,heading:i8,heading1:s(i8),heading2:s(i8),heading3:s(i8),heading4:s(i8),heading5:s(i8),heading6:s(i8),contentSeparator:s(o6),list:s(o6),quote:s(o6),emphasis:s(o6),strong:s(o6),link:s(o6),monospace:s(o6),strikethrough:s(o6),inserted:s(),deleted:s(),changed:s(),invalid:s(),meta:tZ,documentMeta:s(tZ),annotation:s(tZ),processingInstruction:s(tZ),definition:X6.defineModifier("definition"),constant:X6.defineModifier("constant"),function:X6.defineModifier("function"),standard:X6.defineModifier("standard"),local:X6.defineModifier("local"),special:X6.defineModifier("special")};for(let Z in m){let J=m[Z];if(J instanceof X6)J.name=Z}var ek=JK([{tag:m.link,class:"tok-link"},{tag:m.heading,class:"tok-heading"},{tag:m.emphasis,class:"tok-emphasis"},{tag:m.strong,class:"tok-strong"},{tag:m.keyword,class:"tok-keyword"},{tag:m.atom,class:"tok-atom"},{tag:m.bool,class:"tok-bool"},{tag:m.url,class:"tok-url"},{tag:m.labelName,class:"tok-labelName"},{tag:m.inserted,class:"tok-inserted"},{tag:m.deleted,class:"tok-deleted"},{tag:m.literal,class:"tok-literal"},{tag:m.string,class:"tok-string"},{tag:m.number,class:"tok-number"},{tag:[m.regexp,m.escape,m.special(m.string)],class:"tok-string2"},{tag:m.variableName,class:"tok-variableName"},{tag:m.local(m.variableName),class:"tok-variableName tok-local"},{tag:m.definition(m.variableName),class:"tok-variableName tok-definition"},{tag:m.special(m.variableName),class:"tok-variableName2"},{tag:m.definition(m.propertyName),class:"tok-propertyName tok-definition"},{tag:m.typeName,class:"tok-typeName"},{tag:m.namespace,class:"tok-namespace"},{tag:m.className,class:"tok-className"},{tag:m.macroName,class:"tok-macroName"},{tag:m.propertyName,class:"tok-propertyName"},{tag:m.operator,class:"tok-operator"},{tag:m.comment,class:"tok-comment"},{tag:m.meta,class:"tok-meta"},{tag:m.invalid,class:"tok-invalid"},{tag:m.punctuation,class:"tok-punctuation"}]);var QK,d7=new F1;function _A(Z){return o.define({combine:Z?(J)=>J.concat(Z):void 0})}var EA=new F1;class Y6{constructor(Z,J,Q=[],X=""){if(this.data=Z,this.name=X,!L1.prototype.hasOwnProperty("tree"))Object.defineProperty(L1.prototype,"tree",{get(){return h6(this)}});this.parser=J,this.extension=[i7.of(this),L1.languageData.of((Y,K,I)=>{let q=xV(Y,K,I),W=q.type.prop(d7);if(!W)return[];let G=Y.facet(W),U=q.type.prop(EA);if(U){let z=q.resolve(K-q.from,I);for(let j of U)if(j.test(z,Y)){let O=Y.facet(j.facet);return j.type=="replace"?O:O.concat(G)}}return G})].concat(Q)}isActiveAt(Z,J,Q=-1){return xV(Z,J,Q).type.prop(d7)==this.data}findRegions(Z){let J=Z.facet(i7);if((J===null||J===void 0?void 0:J.data)==this.data)return[{from:0,to:Z.doc.length}];if(!J||!J.allowsNesting)return[];let Q=[],X=(Y,K)=>{if(Y.prop(d7)==this.data){Q.push({from:K,to:K+Y.length});return}let I=Y.prop(F1.mounted);if(I){if(I.tree.prop(d7)==this.data){if(I.overlay)for(let q of I.overlay)Q.push({from:q.from+K,to:q.to+K});else Q.push({from:K,to:K+Y.length});return}else if(I.overlay){let q=Q.length;if(X(I.tree,I.overlay[0].from+K),Q.length>q)return}}for(let q=0;q<Y.children.length;q++){let W=Y.children[q];if(W instanceof f1)X(W,Y.positions[q]+K)}};return X(h6(Z),0),Q}get allowsNesting(){return!0}}Y6.setState=B1.define();function xV(Z,J,Q){let X=Z.facet(i7),Y=h6(Z).topNode;if(!X||X.allowsNesting){for(let K=Y;K;K=K.enter(J,Q,s1.ExcludeBuffers|s1.EnterBracketed))if(K.type.isTop)Y=K}return Y}function h6(Z){let J=Z.field(Y6.state,!1);return J?J.tree:f1.empty}class vV{constructor(Z){this.doc=Z,this.cursorPos=0,this.string="",this.cursor=Z.iter()}get length(){return this.doc.length}syncTo(Z){return this.string=this.cursor.next(Z-this.cursorPos).value,this.cursorPos=Z+this.string.length,this.cursorPos-this.string.length}chunk(Z){return this.syncTo(Z),this.string}get lineChunks(){return!0}read(Z,J){let Q=this.cursorPos-this.string.length;if(Z<Q||J>=this.cursorPos)return this.doc.sliceString(Z,J);else return this.string.slice(Z-Q,J-Q)}}var B5=null;class s7{constructor(Z,J,Q=[],X,Y,K,I,q){this.parser=Z,this.state=J,this.fragments=Q,this.tree=X,this.treeLen=Y,this.viewport=K,this.skipped=I,this.scheduleOn=q,this.parse=null,this.tempSkipped=[]}static create(Z,J,Q){return new s7(Z,J,[],f1.empty,0,Q,[],null)}startParse(){return this.parser.startParse(new vV(this.state.doc),this.fragments)}work(Z,J){if(J!=null&&J>=this.state.doc.length)J=void 0;if(this.tree!=f1.empty&&this.isDone(J!==null&&J!==void 0?J:this.state.doc.length))return this.takeTree(),!0;return this.withContext(()=>{var Q;if(typeof Z=="number"){let X=Date.now()+Z;Z=()=>Date.now()>X}if(!this.parse)this.parse=this.startParse();if(J!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>J)&&J<this.state.doc.length)this.parse.stopAt(J);for(;;){let X=this.parse.advance();if(X)if(this.fragments=this.withoutTempSkipped(e4.addTree(X,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(Q=this.parse.stoppedAt)!==null&&Q!==void 0?Q:this.state.doc.length,this.tree=X,this.parse=null,this.treeLen<(J!==null&&J!==void 0?J:this.state.doc.length))this.parse=this.startParse();else return!0;if(Z())return!1}})}takeTree(){let Z,J;if(this.parse&&(Z=this.parse.parsedPos)>=this.treeLen){if(this.parse.stoppedAt==null||this.parse.stoppedAt>Z)this.parse.stopAt(Z);this.withContext(()=>{while(!(J=this.parse.advance()));}),this.treeLen=Z,this.tree=J,this.fragments=this.withoutTempSkipped(e4.addTree(this.tree,this.fragments,!0)),this.parse=null}}withContext(Z){let J=B5;B5=this;try{return Z()}finally{B5=J}}withoutTempSkipped(Z){for(let J;J=this.tempSkipped.pop();)Z=yV(Z,J.from,J.to);return Z}changes(Z,J){let{fragments:Q,tree:X,treeLen:Y,viewport:K,skipped:I}=this;if(this.takeTree(),!Z.empty){let q=[];if(Z.iterChangedRanges((W,G,U,z)=>q.push({fromA:W,toA:G,fromB:U,toB:z})),Q=e4.applyChanges(Q,q),X=f1.empty,Y=0,K={from:Z.mapPos(K.from,-1),to:Z.mapPos(K.to,1)},this.skipped.length){I=[];for(let W of this.skipped){let G=Z.mapPos(W.from,1),U=Z.mapPos(W.to,-1);if(G<U)I.push({from:G,to:U})}}}return new s7(this.parser,J,Q,X,Y,K,I,this.scheduleOn)}updateViewport(Z){if(this.viewport.from==Z.from&&this.viewport.to==Z.to)return!1;this.viewport=Z;let J=this.skipped.length;for(let Q=0;Q<this.skipped.length;Q++){let{from:X,to:Y}=this.skipped[Q];if(X<Z.to&&Y>Z.from)this.fragments=yV(this.fragments,X,Y),this.skipped.splice(Q--,1)}if(this.skipped.length>=J)return!1;return this.reset(),!0}reset(){if(this.parse)this.takeTree(),this.parse=null}skipUntilInView(Z,J){this.skipped.push({from:Z,to:J})}static getSkippingParser(Z){return new class extends rZ{createParse(J,Q,X){let Y=X[0].from,K=X[X.length-1].to;return{parsedPos:Y,advance(){let q=B5;if(q){for(let W of X)q.tempSkipped.push(W);if(Z)q.scheduleOn=q.scheduleOn?Promise.all([q.scheduleOn,Z]):Z}return this.parsedPos=K,new f1(w0.none,[],[],K-Y)},stoppedAt:null,stopAt(){}}}}}isDone(Z){Z=Math.min(Z,this.state.doc.length);let J=this.fragments;return this.treeLen>=Z&&J.length&&J[0].from==0&&J[0].to>=Z}static get(){return B5}}function yV(Z,J,Q){return e4.applyChanges(Z,[{fromA:J,toA:Q,fromB:J,toB:Q}])}class l7{constructor(Z){this.context=Z,this.tree=Z.tree}apply(Z){if(!Z.docChanged&&this.tree==this.context.tree)return this;let J=this.context.changes(Z.changes,Z.state),Q=this.context.treeLen==Z.startState.doc.length?void 0:Math.max(Z.changes.mapPos(this.context.treeLen),J.viewport.to);if(!J.work(20,Q))J.takeTree();return new l7(J)}static init(Z){let J=Math.min(3000,Z.doc.length),Q=s7.create(Z.facet(i7).parser,Z,{from:0,to:J});if(!Q.work(20,J))Q.takeTree();return new l7(Q)}}Y6.state=R0.define({create:l7.init,update(Z,J){for(let Q of J.effects)if(Q.is(Y6.setState))return Q.value;if(J.startState.facet(i7)!=J.state.facet(i7))return l7.init(J.state);return Z.apply(J)}});var mV=(Z)=>{let J=setTimeout(()=>Z(),500);return()=>clearTimeout(J)};if(typeof requestIdleCallback<"u")mV=(Z)=>{let J=-1,Q=setTimeout(()=>{J=requestIdleCallback(Z,{timeout:400})},100);return()=>J<0?clearTimeout(Q):cancelIdleCallback(J)};var XK=typeof navigator<"u"&&((QK=navigator.scheduling)===null||QK===void 0?void 0:QK.isInputPending)?()=>navigator.scheduling.isInputPending():null,CA=M0.fromClass(class{constructor(J){this.view=J,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(J){let Q=this.view.state.field(Y6.state).context;if(Q.updateViewport(J.view.viewport)||this.view.viewport.to>Q.treeLen)this.scheduleWork();if(J.docChanged||J.selectionSet){if(this.view.hasFocus)this.chunkBudget+=50;this.scheduleWork()}this.checkAsyncSchedule(Q)}scheduleWork(){if(this.working)return;let{state:J}=this.view,Q=J.field(Y6.state);if(Q.tree!=Q.context.tree||!Q.context.isDone(J.doc.length))this.working=mV(this.work)}work(J){this.working=null;let Q=Date.now();if(this.chunkEnd<Q&&(this.chunkEnd<0||this.view.hasFocus))this.chunkEnd=Q+30000,this.chunkBudget=3000;if(this.chunkBudget<=0)return;let{state:X,viewport:{to:Y}}=this.view,K=X.field(Y6.state);if(K.tree==K.context.tree&&K.context.isDone(Y+1e5))return;let I=Date.now()+Math.min(this.chunkBudget,100,J&&!XK?Math.max(25,J.timeRemaining()-5):1e9),q=K.context.treeLen<Y&&X.doc.length>Y+1000,W=K.context.work(()=>{return XK&&XK()||Date.now()>I},Y+(q?0:1e5));if(this.chunkBudget-=Date.now()-Q,W||this.chunkBudget<=0)K.context.takeTree(),this.view.dispatch({effects:Y6.setState.of(new l7(K.context))});if(this.chunkBudget>0&&!(W&&!q))this.scheduleWork();this.checkAsyncSchedule(K.context)}checkAsyncSchedule(J){if(J.scheduleOn)this.workScheduled++,J.scheduleOn.then(()=>this.scheduleWork()).catch((Q)=>s0(this.view.state,Q)).then(()=>this.workScheduled--),J.scheduleOn=null}destroy(){if(this.working)this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),i7=o.define({combine(Z){return Z.length?Z[0]:null},enables:(Z)=>[Y6.state,CA,K1.contentAttributes.compute([Z],(J)=>{let Q=J.facet(Z);return Q&&Q.name?{"data-language":Q.name}:{}})]});var wA=o.define(),r7=o.define({combine:(Z)=>{if(!Z.length)return"  ";let J=Z[0];if(!J||/\S/.test(J)||Array.from(J).some((Q)=>Q!=J[0]))throw Error("Invalid indent unit: "+JSON.stringify(Z[0]));return J}});function Q8(Z){let J=Z.facet(r7);return J.charCodeAt(0)==9?Z.tabSize*J.length:J.length}function S5(Z,J){let Q="",X=Z.tabSize,Y=Z.facet(r7)[0];if(Y=="\t"){while(J>=X)Q+="\t",J-=X;Y=" "}for(let K=0;K<J;K++)Q+=Y;return Q}function GK(Z,J){if(Z instanceof L1)Z=new a7(Z);for(let X of Z.state.facet(wA)){let Y=X(Z,J);if(Y!==void 0)return Y}let Q=h6(Z.state);return Q.length>=J?hA(Z,Q,J):null}class a7{constructor(Z,J={}){this.state=Z,this.options=J,this.unit=Q8(Z)}lineAt(Z,J=1){let Q=this.state.doc.lineAt(Z),{simulateBreak:X,simulateDoubleBreak:Y}=this.options;if(X!=null&&X>=Q.from&&X<=Q.to)if(Y&&X==Z)return{text:"",from:Z};else if(J<0?X<Z:X<=Z)return{text:Q.text.slice(X-Q.from),from:X};else return{text:Q.text.slice(0,X-Q.from),from:Q.from};return Q}textAfterPos(Z,J=1){if(this.options.simulateDoubleBreak&&Z==this.options.simulateBreak)return"";let{text:Q,from:X}=this.lineAt(Z,J);return Q.slice(Z-X,Math.min(Q.length,Z+100-X))}column(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.countColumn(Q,Z-X),K=this.options.overrideIndentation?this.options.overrideIndentation(X):-1;if(K>-1)Y+=K-this.countColumn(Q,Q.search(/\S|$/));return Y}countColumn(Z,J=Z.length){return n8(Z,this.state.tabSize,J)}lineIndent(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.options.overrideIndentation;if(Y){let K=Y(X);if(K>-1)return K}return this.countColumn(Q,Q.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}var pV=new F1;function hA(Z,J,Q){let X=J.resolveStack(Q),Y=J.resolveInner(Q,-1).resolve(Q,0).enterUnfinishedNodesBefore(Q);if(Y!=X.node){let K=[];for(let I=Y;I&&!(I.from<X.node.from||I.to>X.node.to||I.from==X.node.from&&I.type==X.node.type);I=I.parent)K.push(I);for(let I=K.length-1;I>=0;I--)X={node:K[I],next:X}}return cV(X,Z,Q)}function cV(Z,J,Q){for(let X=Z;X;X=X.next){let Y=bA(X.node);if(Y)return Y(UK.create(J,Q,X))}return 0}function kA(Z){return Z.pos==Z.options.simulateBreak&&Z.options.simulateDoubleBreak}function bA(Z){let J=Z.type.prop(pV);if(J)return J;let Q=Z.firstChild,X;if(Q&&(X=Q.type.prop(F1.closedBy))){let Y=Z.lastChild,K=Y&&X.indexOf(Y.name)>-1;return(I)=>fA(I,!0,1,void 0,K&&!kA(I)?Y.from:void 0)}return Z.parent==null?xA:null}function xA(){return 0}class UK extends a7{constructor(Z,J,Q){super(Z.state,Z.options);this.base=Z,this.pos=J,this.context=Q}get node(){return this.context.node}static create(Z,J,Q){return new UK(Z,J,Q)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(Z){let J=this.state.doc.lineAt(Z.from);for(;;){let Q=Z.resolve(J.from);while(Q.parent&&Q.parent.from==Q.from)Q=Q.parent;if(yA(Q,Z))break;J=this.state.doc.lineAt(Q.from)}return this.lineIndent(J.from)}continue(){return cV(this.context.next,this.base,this.pos)}}function yA(Z,J){for(let Q=J;Q;Q=Q.parent)if(Z==Q)return!0;return!1}function gA(Z){let J=Z.node,Q=J.childAfter(J.from),X=J.lastChild;if(!Q)return null;let Y=Z.options.simulateBreak,K=Z.state.doc.lineAt(Q.from),I=Y==null||Y<=K.from?K.to:Math.min(K.to,Y);for(let q=Q.to;;){let W=J.childAfter(q);if(!W||W==X)return null;if(!W.type.isSkipped){if(W.from>=I)return null;let G=/^ */.exec(K.text.slice(Q.to-K.from))[0].length;return{from:Q.from,to:Q.to+G}}q=W.to}}function fA(Z,J,Q,X,Y){let K=Z.textAfter,I=K.match(/^\s*/)[0].length,q=X&&K.slice(I,I+X.length)==X||Y==Z.pos+I,W=J?gA(Z):null;if(W)return q?Z.column(W.from):Z.column(W.to);return Z.baseIndent+(q?0:Z.unit*Q)}class o7{constructor(Z,J){this.specs=Z;let Q;function X(I){let q=P6.newName();return(Q||(Q=Object.create(null)))["."+q]=I,q}let Y=typeof J.all=="string"?J.all:J.all?X(J.all):void 0,K=J.scope;this.scope=K instanceof Y6?(I)=>I.prop(d7)==K.data:K?(I)=>I==K:void 0,this.style=JK(Z.map((I)=>({tag:I.tag,class:I.class||X(Object.assign({},I,{tag:null}))})),{all:Y}).style,this.module=Q?new P6(Q):null,this.themeType=J.themeType}static define(Z,J){return new o7(Z,J||{})}}var IK=o.define(),dV=o.define({combine(Z){return Z.length?[Z[0]]:null}});function YK(Z){let J=Z.facet(IK);return J.length?J:Z.facet(dV)}function sV(Z,J){let Q=[$A],X;if(Z instanceof o7){if(Z.module)Q.push(K1.styleModule.of(Z.module));X=Z.themeType}if(J===null||J===void 0?void 0:J.fallback)Q.push(dV.of(Z));else if(X)Q.push(IK.computeN([K1.darkTheme],(Y)=>{return Y.facet(K1.darkTheme)==(X=="dark")?[Z]:[]}));else Q.push(IK.of(Z));return Q}class lV{constructor(Z){this.markCache=Object.create(null),this.tree=h6(Z.state),this.decorations=this.buildDeco(Z,YK(Z.state)),this.decoratedTo=Z.viewport.to}update(Z){let J=h6(Z.state),Q=YK(Z.state),X=Q!=YK(Z.startState),{viewport:Y}=Z.view,K=Z.changes.mapPos(this.decoratedTo,1);if(J.length<Y.to&&!X&&J.type==this.tree.type&&K>=Y.to)this.decorations=this.decorations.map(Z.changes),this.decoratedTo=K;else if(J!=this.tree||Z.viewportChanged||X)this.tree=J,this.decorations=this.buildDeco(Z.view,Q),this.decoratedTo=Y.to}buildDeco(Z,J){if(!J||!this.tree.length)return P1.none;let Q=new R4;for(let{from:X,to:Y}of Z.visibleRanges)kV(this.tree,J,(K,I,q)=>{Q.add(K,I,this.markCache[q]||(this.markCache[q]=P1.mark({class:q})))},X,Y);return Q.finish()}}var $A=M4.high(M0.fromClass(lV,{decorations:(Z)=>Z.decorations})),Ib=o7.define([{tag:m.meta,color:"#404740"},{tag:m.link,textDecoration:"underline"},{tag:m.heading,textDecoration:"underline",fontWeight:"bold"},{tag:m.emphasis,fontStyle:"italic"},{tag:m.strong,fontWeight:"bold"},{tag:m.strikethrough,textDecoration:"line-through"},{tag:m.keyword,color:"#708"},{tag:[m.atom,m.bool,m.url,m.contentSeparator,m.labelName],color:"#219"},{tag:[m.literal,m.inserted],color:"#164"},{tag:[m.string,m.deleted],color:"#a11"},{tag:[m.regexp,m.escape,m.special(m.string)],color:"#e40"},{tag:m.definition(m.variableName),color:"#00f"},{tag:m.local(m.variableName),color:"#30a"},{tag:[m.typeName,m.namespace],color:"#085"},{tag:m.className,color:"#167"},{tag:[m.special(m.variableName),m.macroName],color:"#256"},{tag:m.definition(m.propertyName),color:"#00c"},{tag:m.comment,color:"#940"},{tag:m.invalid,color:"#f00"}]),uA=K1.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),iV=1e4,rV="()[]{}",aV=o.define({combine(Z){return A4(Z,{afterCursor:!0,brackets:rV,maxScanDistance:iV,renderMatch:mA})}}),nA=P1.mark({class:"cm-matchingBracket"}),vA=P1.mark({class:"cm-nonmatchingBracket"});function mA(Z){let J=[],Q=Z.matched?nA:vA;if(J.push(Q.range(Z.start.from,Z.start.to)),Z.end)J.push(Q.range(Z.end.from,Z.end.to));return J}function gV(Z){let J=[],Q=Z.facet(aV);for(let X of Z.selection.ranges){if(!X.empty)continue;let Y=w6(Z,X.head,-1,Q)||X.head>0&&w6(Z,X.head-1,1,Q)||Q.afterCursor&&(w6(Z,X.head,1,Q)||X.head<Z.doc.length&&w6(Z,X.head+1,-1,Q));if(Y)J=J.concat(Q.renderMatch(Y,Z))}return P1.set(J,!0)}var pA=M0.fromClass(class{constructor(Z){this.paused=!1,this.decorations=gV(Z.state)}update(Z){if(Z.docChanged||Z.selectionSet||this.paused)if(Z.view.composing)this.decorations=this.decorations.map(Z.changes),this.paused=!0;else this.decorations=gV(Z.state),this.paused=!1}},{decorations:(Z)=>Z.decorations}),cA=[pA,uA];function oV(Z={}){return[aV.of(Z),cA]}var dA=new F1;function qK(Z,J,Q){let X=Z.prop(J<0?F1.openedBy:F1.closedBy);if(X)return X;if(Z.name.length==1){let Y=Q.indexOf(Z.name);if(Y>-1&&Y%2==(J<0?1:0))return[Q[Y+J]]}return null}function WK(Z){let J=Z.type.prop(dA);return J?J(Z.node):Z}function w6(Z,J,Q,X={}){let Y=X.maxScanDistance||iV,K=X.brackets||rV,I=h6(Z),q=I.resolveInner(J,Q);for(let W=q;W;W=W.parent){let G=qK(W.type,Q,K);if(G&&W.from<W.to){let U=WK(W);if(U&&(Q>0?J>=U.from&&J<U.to:J>U.from&&J<=U.to))return sA(Z,J,Q,W,U,G,K)}}return lA(Z,J,Q,I,q.type,Y,K)}function sA(Z,J,Q,X,Y,K,I){let q=X.parent,W={from:Y.from,to:Y.to},G=0,U=q===null||q===void 0?void 0:q.cursor();if(U&&(Q<0?U.childBefore(X.from):U.childAfter(X.to)))do if(Q<0?U.to<=X.from:U.from>=X.to){if(G==0&&K.indexOf(U.type.name)>-1&&U.from<U.to){let z=WK(U);return{start:W,end:z?{from:z.from,to:z.to}:void 0,matched:!0}}else if(qK(U.type,Q,I))G++;else if(qK(U.type,-Q,I)){if(G==0){let z=WK(U);return{start:W,end:z&&z.from<z.to?{from:z.from,to:z.to}:void 0,matched:!1}}G--}}while(Q<0?U.prevSibling():U.nextSibling());return{start:W,matched:!1}}function lA(Z,J,Q,X,Y,K,I){if(Q<0?!J:J==Z.doc.length)return null;let q=Q<0?Z.sliceDoc(J-1,J):Z.sliceDoc(J,J+1),W=I.indexOf(q);if(W<0||W%2==0!=Q>0)return null;let G={from:Q<0?J-1:J,to:Q>0?J+1:J},U=Z.doc.iterRange(J,Q>0?Z.doc.length:0),z=0;for(let j=0;!U.next().done&&j<=K;){let O=U.value;if(Q<0)j+=O.length;let H=J+j*Q;for(let N=Q>0?0:O.length-1,R=Q>0?O.length:-1;N!=R;N+=Q){let T=I.indexOf(O[N]);if(T<0||X.resolveInner(H+N,1).type!=Y)continue;if(T%2==0==Q>0)z++;else if(z==1)return{start:G,end:{from:H+N,to:H+N+1},matched:T>>1==W>>1};else z--}if(Q>0)j+=O.length}return U.done?{start:G,matched:!1}:null}function fV(Z,J,Q,X=0,Y=0){if(J==null){if(J=Z.search(/[^\s\u00a0]/),J==-1)J=Z.length}let K=Y;for(let I=X;I<J;I++)if(Z.charCodeAt(I)==9)K+=Q-K%Q;else K++;return K}class zK{constructor(Z,J,Q,X){this.string=Z,this.tabSize=J,this.indentUnit=Q,this.overrideIndent=X,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(Z){let J=this.string.charAt(this.pos),Q;if(typeof Z=="string")Q=J==Z;else Q=J&&(Z instanceof RegExp?Z.test(J):Z(J));if(Q)return++this.pos,J}eatWhile(Z){let J=this.pos;while(this.eat(Z));return this.pos>J}eatSpace(){let Z=this.pos;while(/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;return this.pos>Z}skipToEnd(){this.pos=this.string.length}skipTo(Z){let J=this.string.indexOf(Z,this.pos);if(J>-1)return this.pos=J,!0}backUp(Z){this.pos-=Z}column(){if(this.lastColumnPos<this.start)this.lastColumnValue=fV(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start;return this.lastColumnValue}indentation(){var Z;return(Z=this.overrideIndent)!==null&&Z!==void 0?Z:fV(this.string,null,this.tabSize)}match(Z,J,Q){if(typeof Z=="string"){let X=(K)=>Q?K.toLowerCase():K,Y=this.string.substr(this.pos,Z.length);if(X(Y)==X(Z)){if(J!==!1)this.pos+=Z.length;return!0}else return null}else{let X=this.string.slice(this.pos).match(Z);if(X&&X.index>0)return null;if(X&&J!==!1)this.pos+=X[0].length;return X}}current(){return this.string.slice(this.start,this.pos)}}function iA(Z){return{name:Z.name||"",token:Z.token,blankLine:Z.blankLine||(()=>{}),startState:Z.startState||(()=>!0),copyState:Z.copyState||rA,indent:Z.indent||(()=>null),languageData:Z.languageData||{},tokenTable:Z.tokenTable||jK,mergeTokens:Z.mergeTokens!==!1}}function rA(Z){if(typeof Z!="object")return Z;let J={};for(let Q in Z){let X=Z[Q];J[Q]=X instanceof Array?X.slice():X}return J}var $V=new WeakMap;class r8 extends Y6{constructor(Z){let J=_A(Z.languageData),Q=iA(Z),X,Y=new class extends rZ{createParse(K,I,q){return new eV(X,K,I,q)}};super(J,Y,[],Z.name);this.topNode=eA(J,this),X=this,this.streamParser=Q,this.stateAfter=new F1({perNode:!0}),this.tokenTable=Z.tokenTable?new OK(Q.tokenTable):tA}static define(Z){return new r8(Z)}getIndent(Z){let J=void 0,{overrideIndentation:Q}=Z.options;if(Q){if(J=$V.get(Z.state),J!=null&&J<Z.pos-1e4)J=void 0}let X=VK(this,Z.node.tree,Z.node.from,Z.node.from,J!==null&&J!==void 0?J:Z.pos),Y,K;if(X)K=X.state,Y=X.pos+1;else K=this.streamParser.startState(Z.unit),Y=Z.node.from;if(Z.pos-Y>1e4)return null;while(Y<Z.pos){let q=Z.state.doc.lineAt(Y),W=Math.min(Z.pos,q.to);if(q.length){let G=Q?Q(q.from):-1,U=new zK(q.text,Z.state.tabSize,Z.unit,G<0?void 0:G);while(U.pos<W-q.from)Zj(this.streamParser.token,U,K)}else this.streamParser.blankLine(K,Z.unit);if(W==Z.pos)break;Y=q.to+1}let I=Z.lineAt(Z.pos);if(Q&&J==null)$V.set(Z.state,I.from);return this.streamParser.indent(K,/^\s*(.*)/.exec(I.text)[1],Z)}get allowsNesting(){return!1}}function VK(Z,J,Q,X,Y){let K=Q>=X&&Q+J.length<=Y&&J.prop(Z.stateAfter);if(K)return{state:Z.streamParser.copyState(K),pos:Q+J.length};for(let I=J.children.length-1;I>=0;I--){let q=J.children[I],W=Q+J.positions[I],G=q instanceof f1&&W<Y&&VK(Z,q,W,X,Y);if(G)return G}return null}function tV(Z,J,Q,X,Y){if(Y&&Q<=0&&X>=J.length)return J;if(!Y&&Q==0&&J.type==Z.topNode)Y=!0;for(let K=J.children.length-1;K>=0;K--){let I=J.positions[K],q=J.children[K],W;if(I<X&&q instanceof f1){if(!(W=tV(Z,q,Q-I,X-I,Y)))break;return!Y?W:new f1(J.type,J.children.slice(0,K).concat(W),J.positions.slice(0,K+1),I+W.length)}}return null}function aA(Z,J,Q,X,Y){for(let K of J){let I=K.from+(K.openStart?25:0),q=K.to-(K.openEnd?25:0),W=I<=Q&&q>Q&&VK(Z,K.tree,0-K.offset,Q,q),G;if(W&&W.pos<=X&&(G=tV(Z,K.tree,Q+K.offset,W.pos+K.offset,!1)))return{state:W.state,tree:G}}return{state:Z.streamParser.startState(Y?Q8(Y):4),tree:f1.empty}}class eV{constructor(Z,J,Q,X){this.lang=Z,this.input=J,this.fragments=Q,this.ranges=X,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=X[X.length-1].to;let Y=s7.get(),K=X[0].from,{state:I,tree:q}=aA(Z,Q,K,this.to,Y===null||Y===void 0?void 0:Y.state);this.state=I,this.parsedPos=this.chunkStart=K+q.length;for(let W=0;W<q.children.length;W++)this.chunks.push(q.children[W]),this.chunkPos.push(q.positions[W]);if(Y&&this.parsedPos<Y.viewport.from-1e5&&X.some((W)=>W.from<=Y.viewport.from&&W.to>=Y.viewport.from))this.state=this.lang.streamParser.startState(Q8(Y.state)),Y.skipUntilInView(this.parsedPos,Y.viewport.from),this.parsedPos=Y.viewport.from;this.moveRangeIndex()}advance(){let Z=s7.get(),J=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),Q=Math.min(J,this.chunkStart+512);if(Z)Q=Math.min(Q,Z.viewport.to);while(this.parsedPos<Q)this.parseLine(Z);if(this.chunkStart<this.parsedPos)this.finishChunk();if(this.parsedPos>=J)return this.finish();if(Z&&this.parsedPos>=Z.viewport.to)return Z.skipUntilInView(this.parsedPos,J),this.finish();return null}stopAt(Z){this.stoppedAt=Z}lineAfter(Z){let J=this.input.chunk(Z);if(!this.input.lineChunks){let Q=J.indexOf(`
`);if(Q>-1)J=J.slice(0,Q)}else if(J==`
`)J="";return Z+J.length<=this.to?J:J.slice(0,this.to-Z)}nextLine(){let Z=this.parsedPos,J=this.lineAfter(Z),Q=Z+J.length;for(let X=this.rangeIndex;;){let Y=this.ranges[X].to;if(Y>=Q)break;if(J=J.slice(0,Y-(Q-J.length)),X++,X==this.ranges.length)break;let K=this.ranges[X].from,I=this.lineAfter(K);J+=I,Q=K+I.length}return{line:J,end:Q}}skipGapsTo(Z,J,Q){for(;;){let X=this.ranges[this.rangeIndex].to,Y=Z+J;if(Q>0?X>Y:X>=Y)break;let K=this.ranges[++this.rangeIndex].from;J+=K-X}return J}moveRangeIndex(){while(this.ranges[this.rangeIndex].to<this.parsedPos)this.rangeIndex++}emitToken(Z,J,Q,X){let Y=4;if(this.ranges.length>1){X=this.skipGapsTo(J,X,1),J+=X;let I=this.chunk.length;X=this.skipGapsTo(Q,X,-1),Q+=X,Y+=this.chunk.length-I}let K=this.chunk.length-4;if(this.lang.streamParser.mergeTokens&&Y==4&&K>=0&&this.chunk[K]==Z&&this.chunk[K+2]==J)this.chunk[K+2]=Q;else this.chunk.push(Z,J,Q,Y);return X}parseLine(Z){let{line:J,end:Q}=this.nextLine(),X=0,{streamParser:Y}=this.lang,K=new zK(J,Z?Z.state.tabSize:4,Z?Q8(Z.state):2);if(K.eol())Y.blankLine(this.state,K.indentUnit);else while(!K.eol()){let I=Zj(Y.token,K,this.state);if(I)X=this.emitToken(this.lang.tokenTable.resolve(I),this.parsedPos+K.start,this.parsedPos+K.pos,X);if(K.start>1e4)break}if(this.parsedPos=Q,this.moveRangeIndex(),this.parsedPos<this.to)this.parsedPos++}finishChunk(){let Z=f1.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:oA,topID:0,maxBufferLength:512,reused:this.chunkReused});Z=new f1(Z.type,Z.children,Z.positions,Z.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(Z),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new f1(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function Zj(Z,J,Q){J.start=J.pos;for(let X=0;X<10;X++){let Y=Z(J,Q);if(J.pos>J.start)return Y}throw Error("Stream parser failed to advance stream.")}var jK=Object.create(null),P5=[w0.none],oA=new iZ(P5),uV=[],nV=Object.create(null),Jj=Object.create(null);for(let[Z,J]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])Jj[Z]=Qj(jK,J);class OK{constructor(Z){this.extra=Z,this.table=Object.assign(Object.create(null),Jj)}resolve(Z){return!Z?0:this.table[Z]||(this.table[Z]=Qj(this.extra,Z))}}var tA=new OK(jK);function KK(Z,J){if(uV.indexOf(Z)>-1)return;uV.push(Z),console.warn(J)}function Qj(Z,J){let Q=[];for(let q of J.split(" ")){let W=[];for(let G of q.split(".")){let U=Z[G]||m[G];if(!U)KK(G,`Unknown highlighting tag ${G}`);else if(typeof U=="function")if(!W.length)KK(G,`Modifier ${G} used at start of tag`);else W=W.map(U);else if(W.length)KK(G,`Tag ${G} used as modifier`);else W=Array.isArray(U)?U:[U]}for(let G of W)Q.push(G)}if(!Q.length)return 0;let X=J.replace(/ /g,"_"),Y=X+" "+Q.map((q)=>q.id),K=nV[Y];if(K)return K.id;let I=nV[Y]=w0.define({id:P5.length,name:X,props:[wV({[X]:Q})]});return P5.push(I),I.id}function eA(Z,J){let Q=w0.define({id:P5.length,name:"Document",props:[d7.add(()=>Z),pV.add(()=>(X)=>J.getIndent(X))],top:!0});return P5.push(Q),Q}var qb={rtl:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:h1.RTL}),ltr:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:h1.LTR}),auto:P1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var ZD=(Z)=>{let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.from),X=MK(Z.state,Q.from);return X.line?JD(Z):X.block?XD(Z):!1};function RK(Z,J){return({state:Q,dispatch:X})=>{if(Q.readOnly)return!1;let Y=Z(J,Q);if(!Y)return!1;return X(Q.update(Y)),!0}}var JD=RK(ID,0);var QD=RK(Wj,0);var XD=RK((Z,J)=>Wj(Z,J,KD(J)),0);function MK(Z,J){let Q=Z.languageDataAt("commentTokens",J,1);return Q.length?Q[0]:{}}var T5=50;function YD(Z,{open:J,close:Q},X,Y){let K=Z.sliceDoc(X-T5,X),I=Z.sliceDoc(Y,Y+T5),q=/\s*$/.exec(K)[0].length,W=/^\s*/.exec(I)[0].length,G=K.length-q;if(K.slice(G-J.length,G)==J&&I.slice(W,W+Q.length)==Q)return{open:{pos:X-q,margin:q&&1},close:{pos:Y+W,margin:W&&1}};let U,z;if(Y-X<=2*T5)U=z=Z.sliceDoc(X,Y);else U=Z.sliceDoc(X,X+T5),z=Z.sliceDoc(Y-T5,Y);let j=/^\s*/.exec(U)[0].length,O=/\s*$/.exec(z)[0].length,H=z.length-O-Q.length;if(U.slice(j,j+J.length)==J&&z.slice(H,H+Q.length)==Q)return{open:{pos:X+j+J.length,margin:/\s/.test(U.charAt(j+J.length))?1:0},close:{pos:Y-O-Q.length,margin:/\s/.test(z.charAt(H-1))?1:0}};return null}function KD(Z){let J=[];for(let Q of Z.selection.ranges){let X=Z.doc.lineAt(Q.from),Y=Q.to<=X.to?X:Z.doc.lineAt(Q.to);if(Y.from>X.from&&Y.from==Q.to)Y=Q.to==X.to+1?X:Z.doc.lineAt(Q.to-1);let K=J.length-1;if(K>=0&&J[K].to>X.from)J[K].to=Y.to;else J.push({from:X.from+/^\s*/.exec(X.text)[0].length,to:Y.to})}return J}function Wj(Z,J,Q=J.selection.ranges){let X=Q.map((K)=>MK(J,K.from).block);if(!X.every((K)=>K))return null;let Y=Q.map((K,I)=>YD(J,X[I],K.from,K.to));if(Z!=2&&!Y.every((K)=>K))return{changes:J.changes(Q.map((K,I)=>{if(Y[I])return[];return[{from:K.from,insert:X[I].open+" "},{from:K.to,insert:" "+X[I].close}]}))};else if(Z!=1&&Y.some((K)=>K)){let K=[];for(let I=0,q;I<Y.length;I++)if(q=Y[I]){let W=X[I],{open:G,close:U}=q;K.push({from:G.pos-W.open.length,to:G.pos+G.margin},{from:U.pos-U.margin,to:U.pos+W.close.length})}return{changes:K}}return null}function ID(Z,J,Q=J.selection.ranges){let X=[],Y=-1;Z:for(let{from:K,to:I}of Q){let q=X.length,W=1e9,G;for(let U=K;U<=I;){let z=J.doc.lineAt(U);if(G==null){if(G=MK(J,z.from).line,!G)continue Z}if(z.from>Y&&(K==I||I>z.from)){Y=z.from;let j=/^\s*/.exec(z.text)[0].length,O=j==z.length,H=z.text.slice(j,j+G.length)==G?j:-1;if(j<z.text.length&&j<W)W=j;X.push({line:z,comment:H,token:G,indent:j,empty:O,single:!1})}U=z.to+1}if(W<1e9){for(let U=q;U<X.length;U++)if(X[U].indent<X[U].line.text.length)X[U].indent=W}if(X.length==q+1)X[q].single=!0}if(Z!=2&&X.some((K)=>K.comment<0&&(!K.empty||K.single))){let K=[];for(let{line:q,token:W,indent:G,empty:U,single:z}of X)if(z||!U)K.push({from:q.from+G,insert:W+" "});let I=J.changes(K);return{changes:I,selection:J.selection.map(I,1)}}else if(Z!=1&&X.some((K)=>K.comment>=0)){let K=[];for(let{line:I,comment:q,token:W}of X)if(q>=0){let G=I.from+q,U=G+W.length;if(I.text[U-I.from]==" ")U++;K.push({from:G,to:U})}return{changes:K}}return null}var HK=B6.define(),qD=B6.define(),WD=o.define(),Gj=o.define({combine(Z){return A4(Z,{minDepth:100,newGroupDelay:500,joinToEvent:(J,Q)=>Q},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(J,Q)=>(X,Y)=>J(X,Y)||Q(X,Y)})}}),Uj=R0.define({create(){return t6.empty},update(Z,J){let Q=J.state.facet(Gj),X=J.annotation(HK);if(X){let W=$0.fromTransaction(J,X.selection),G=X.side,U=G==0?Z.undone:Z.done;if(W)U=JJ(U,U.length,Q.minDepth,W);else U=jj(U,J.startState.selection);return new t6(G==0?X.rest:U,G==0?U:X.rest)}let Y=J.annotation(qD);if(Y=="full"||Y=="before")Z=Z.isolate();if(J.annotation(o1.addToHistory)===!1)return!J.changes.empty?Z.addMapping(J.changes.desc):Z;let K=$0.fromTransaction(J),I=J.annotation(o1.time),q=J.annotation(o1.userEvent);if(K)Z=Z.addChanges(K,I,q,Q,J);else if(J.selection)Z=Z.addSelection(J.startState.selection,I,q,Q.newGroupDelay);if(Y=="full"||Y=="after")Z=Z.isolate();return Z},toJSON(Z){return{done:Z.done.map((J)=>J.toJSON()),undone:Z.undone.map((J)=>J.toJSON())}},fromJSON(Z){return new t6(Z.done.map($0.fromJSON),Z.undone.map($0.fromJSON))}});function zj(Z={}){return[Uj,Gj.of(Z),K1.domEventHandlers({beforeinput(J,Q){let X=J.inputType=="historyUndo"?KJ:J.inputType=="historyRedo"?_5:null;if(!X)return!1;return J.preventDefault(),X(Q)}})]}function YJ(Z,J){return function({state:Q,dispatch:X}){if(!J&&Q.readOnly)return!1;let Y=Q.field(Uj,!1);if(!Y)return!1;let K=Y.pop(Z,Q,J);if(!K)return!1;return X(K),!0}}var KJ=YJ(0,!1),_5=YJ(1,!1),GD=YJ(0,!0),UD=YJ(1,!0);class $0{constructor(Z,J,Q,X,Y){this.changes=Z,this.effects=J,this.mapped=Q,this.startSelection=X,this.selectionsAfter=Y}setSelAfter(Z){return new $0(this.changes,this.effects,this.mapped,this.startSelection,Z)}toJSON(){var Z,J,Q;return{changes:(Z=this.changes)===null||Z===void 0?void 0:Z.toJSON(),mapped:(J=this.mapped)===null||J===void 0?void 0:J.toJSON(),startSelection:(Q=this.startSelection)===null||Q===void 0?void 0:Q.toJSON(),selectionsAfter:this.selectionsAfter.map((X)=>X.toJSON())}}static fromJSON(Z){return new $0(Z.changes&&a1.fromJSON(Z.changes),[],Z.mapped&&L6.fromJSON(Z.mapped),Z.startSelection&&u.fromJSON(Z.startSelection),Z.selectionsAfter.map(u.fromJSON))}static fromTransaction(Z,J){let Q=K6;for(let X of Z.startState.facet(WD)){let Y=X(Z);if(Y.length)Q=Q.concat(Y)}if(!Q.length&&Z.changes.empty)return null;return new $0(Z.changes.invert(Z.startState.doc),Q,void 0,J||Z.startState.selection,K6)}static selection(Z){return new $0(void 0,K6,void 0,void 0,Z)}}function JJ(Z,J,Q,X){let Y=J+1>Q+20?J-Q-1:0,K=Z.slice(Y,J);return K.push(X),K}function zD(Z,J){let Q=[],X=!1;return Z.iterChangedRanges((Y,K)=>Q.push(Y,K)),J.iterChangedRanges((Y,K,I,q)=>{for(let W=0;W<Q.length;){let G=Q[W++],U=Q[W++];if(q>=G&&I<=U)X=!0}}),X}function VD(Z,J){return Z.ranges.length==J.ranges.length&&Z.ranges.filter((Q,X)=>Q.empty!=J.ranges[X].empty).length===0}function Vj(Z,J){return!Z.length?J:!J.length?Z:Z.concat(J)}var K6=[],jD=200;function jj(Z,J){if(!Z.length)return[$0.selection([J])];else{let Q=Z[Z.length-1],X=Q.selectionsAfter.slice(Math.max(0,Q.selectionsAfter.length-jD));if(X.length&&X[X.length-1].eq(J))return Z;return X.push(J),JJ(Z,Z.length-1,1e9,Q.setSelAfter(X))}}function OD(Z){let J=Z[Z.length-1],Q=Z.slice();return Q[Z.length-1]=J.setSelAfter(J.selectionsAfter.slice(0,J.selectionsAfter.length-1)),Q}function FK(Z,J){if(!Z.length)return Z;let Q=Z.length,X=K6;while(Q){let Y=FD(Z[Q-1],J,X);if(Y.changes&&!Y.changes.empty||Y.effects.length){let K=Z.slice(0,Q);return K[Q-1]=Y,K}else J=Y.mapped,Q--,X=Y.selectionsAfter}return X.length?[$0.selection(X)]:K6}function FD(Z,J,Q){let X=Vj(Z.selectionsAfter.length?Z.selectionsAfter.map((q)=>q.map(J)):K6,Q);if(!Z.changes)return $0.selection(X);let Y=Z.changes.map(J),K=J.mapDesc(Z.changes,!0),I=Z.mapped?Z.mapped.composeDesc(K):K;return new $0(Y,B1.mapEffects(Z.effects,J),I,Z.startSelection.map(K),X)}var HD=/^(input\.type|delete)($|\.)/;class t6{constructor(Z,J,Q=0,X=void 0){this.done=Z,this.undone=J,this.prevTime=Q,this.prevUserEvent=X}isolate(){return this.prevTime?new t6(this.done,this.undone):this}addChanges(Z,J,Q,X,Y){let K=this.done,I=K[K.length-1];if(I&&I.changes&&!I.changes.empty&&Z.changes&&(!Q||HD.test(Q))&&(!I.selectionsAfter.length&&J-this.prevTime<X.newGroupDelay&&X.joinToEvent(Y,zD(I.changes,Z.changes))||Q=="input.type.compose"))K=JJ(K,K.length-1,X.minDepth,new $0(Z.changes.compose(I.changes),Vj(B1.mapEffects(Z.effects,I.changes),I.effects),I.mapped,I.startSelection,K6));else K=JJ(K,K.length,X.minDepth,Z);return new t6(K,K6,J,Q)}addSelection(Z,J,Q,X){let Y=this.done.length?this.done[this.done.length-1].selectionsAfter:K6;if(Y.length>0&&J-this.prevTime<X&&Q==this.prevUserEvent&&Q&&/^select($|\.)/.test(Q)&&VD(Y[Y.length-1],Z))return this;return new t6(jj(this.done,Z),this.undone,J,Q)}addMapping(Z){return new t6(FK(this.done,Z),FK(this.undone,Z),this.prevTime,this.prevUserEvent)}pop(Z,J,Q){let X=Z==0?this.done:this.undone;if(X.length==0)return null;let Y=X[X.length-1],K=Y.selectionsAfter[0]||(Y.startSelection?Y.startSelection.map(Y.changes.invertedDesc,1):J.selection);if(Q&&Y.selectionsAfter.length)return J.update({selection:Y.selectionsAfter[Y.selectionsAfter.length-1],annotations:HK.of({side:Z,rest:OD(X),selection:K}),userEvent:Z==0?"select.undo":"select.redo",scrollIntoView:!0});else if(!Y.changes)return null;else{let I=X.length==1?K6:X.slice(0,X.length-1);if(Y.mapped)I=FK(I,Y.mapped);return J.update({changes:Y.changes,selection:Y.startSelection,effects:Y.effects,annotations:HK.of({side:Z,rest:I,selection:K}),filter:!1,userEvent:Z==0?"undo":"redo",scrollIntoView:!0})}}}t6.empty=new t6(K6,K6);var Oj=[{key:"Mod-z",run:KJ,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:_5,preventDefault:!0},{linux:"Ctrl-Shift-z",run:_5,preventDefault:!0},{key:"Mod-u",run:GD,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:UD,preventDefault:!0}];function e7(Z,J){return u.create(Z.ranges.map(J),Z.mainIndex)}function k6(Z,J){return Z.update({selection:J,scrollIntoView:!0,userEvent:"select"})}function b6({state:Z,dispatch:J},Q){let X=e7(Z.selection,Q);if(X.eq(Z.selection,!0))return!1;return J(k6(Z,X)),!0}function IJ(Z,J){return u.cursor(J?Z.to:Z.from)}function Fj(Z,J){return b6(Z,(Q)=>Q.empty?Z.moveByChar(Q,J):IJ(Q,J))}function A0(Z){return Z.textDirectionAt(Z.state.selection.main.head)==h1.LTR}var qJ=(Z)=>Fj(Z,!A0(Z)),WJ=(Z)=>Fj(Z,A0(Z));function Hj(Z,J){return b6(Z,(Q)=>Q.empty?Z.moveByGroup(Q,J):IJ(Q,J))}var AK=(Z)=>Hj(Z,!A0(Z)),DK=(Z)=>Hj(Z,A0(Z));var Hb=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function ND(Z,J,Q){if(J.type.prop(Q))return!0;let X=J.to-J.from;return X&&(X>2||/[^\s,.;:]/.test(Z.sliceDoc(J.from,J.to)))||J.firstChild}function GJ(Z,J,Q){let X=h6(Z).resolveInner(J.head),Y=Q?F1.closedBy:F1.openedBy;for(let W=J.head;;){let G=Q?X.childAfter(W):X.childBefore(W);if(!G)break;if(ND(Z,G,Y))X=G;else W=Q?G.to:G.from}let K=X.type.prop(Y),I,q;if(K&&(I=Q?w6(Z,X.from,1):w6(Z,X.to,-1))&&I.matched)q=Q?I.end.to:I.end.from;else q=Q?X.to:X.from;return u.cursor(q,Q?-1:1)}var RD=(Z)=>b6(Z,(J)=>GJ(Z.state,J,!A0(Z))),MD=(Z)=>b6(Z,(J)=>GJ(Z.state,J,A0(Z)));function Nj(Z,J){return b6(Z,(Q)=>{if(!Q.empty)return IJ(Q,J);let X=Z.moveVertically(Q,J);return X.head!=Q.head?X:Z.moveToLineBoundary(Q,J)})}var UJ=(Z)=>Nj(Z,!1),zJ=(Z)=>Nj(Z,!0);function Rj(Z){let J=Z.scrollDOM.clientHeight<Z.scrollDOM.scrollHeight-2,Q=0,X=0,Y;if(J){for(let K of Z.state.facet(K1.scrollMargins)){let I=K(Z);if(I===null||I===void 0?void 0:I.top)Q=Math.max(I===null||I===void 0?void 0:I.top,Q);if(I===null||I===void 0?void 0:I.bottom)X=Math.max(I===null||I===void 0?void 0:I.bottom,X)}Y=Z.scrollDOM.clientHeight-Q-X}else Y=(Z.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:Q,marginBottom:X,selfScroll:J,height:Math.max(Z.defaultLineHeight,Y-5)}}function Mj(Z,J){let Q=Rj(Z),{state:X}=Z,Y=e7(X.selection,(I)=>{return I.empty?Z.moveVertically(I,J,Q.height):IJ(I,J)});if(Y.eq(X.selection))return!1;let K;if(Q.selfScroll){let I=Z.coordsAtPos(X.selection.main.head),q=Z.scrollDOM.getBoundingClientRect(),W=q.top+Q.marginTop,G=q.bottom-Q.marginBottom;if(I&&I.top>W&&I.bottom<G)K=K1.scrollIntoView(Y.main.head,{y:"start",yMargin:I.top-W})}return Z.dispatch(k6(X,Y),{effects:K}),!0}var E5=(Z)=>Mj(Z,!1),t7=(Z)=>Mj(Z,!0);function X8(Z,J,Q){let X=Z.lineBlockAt(J.head),Y=Z.moveToLineBoundary(J,Q);if(Y.head==J.head&&Y.head!=(Q?X.to:X.from))Y=Z.moveToLineBoundary(J,Q,!1);if(!Q&&Y.head==X.from&&X.length){let K=/^\s*/.exec(Z.state.sliceDoc(X.from,Math.min(X.from+100,X.to)))[0].length;if(K&&J.head!=X.from+K)Y=u.cursor(X.from+K)}return Y}var AD=(Z)=>b6(Z,(J)=>X8(Z,J,!0)),DD=(Z)=>b6(Z,(J)=>X8(Z,J,!1)),LD=(Z)=>b6(Z,(J)=>X8(Z,J,!A0(Z))),BD=(Z)=>b6(Z,(J)=>X8(Z,J,A0(Z))),LK=(Z)=>b6(Z,(J)=>u.cursor(Z.lineBlockAt(J.head).from,1)),BK=(Z)=>b6(Z,(J)=>u.cursor(Z.lineBlockAt(J.head).to,-1));function PD(Z,J,Q){let X=!1,Y=e7(Z.selection,(K)=>{let I=w6(Z,K.head,-1)||w6(Z,K.head,1)||K.head>0&&w6(Z,K.head-1,1)||K.head<Z.doc.length&&w6(Z,K.head+1,-1);if(!I||!I.end)return K;X=!0;let q=I.start.from==K.head?I.end.to:I.end.from;return Q?u.range(K.anchor,q):u.cursor(q)});if(!X)return!1;return J(k6(Z,Y)),!0}var SD=({state:Z,dispatch:J})=>PD(Z,J,!1);function I6(Z,J,Q){let X=e7(Z.state.selection,(Y)=>{if(Y.undirectional&&Y.head>=Y.anchor!=J)Y=u.range(Y.head,Y.anchor);let K=Q(Y);return u.range(Y.anchor,K.head,K.goalColumn,K.bidiLevel||void 0,K.assoc)});if(X.eq(Z.state.selection))return!1;return Z.dispatch(k6(Z.state,X)),!0}function Aj(Z,J){return I6(Z,J,(Q)=>Z.moveByChar(Q,J))}var Dj=(Z)=>Aj(Z,!A0(Z)),Lj=(Z)=>Aj(Z,A0(Z));function Bj(Z,J){return I6(Z,J,(Q)=>Z.moveByGroup(Q,J))}var TD=(Z)=>Bj(Z,!A0(Z)),_D=(Z)=>Bj(Z,A0(Z));var ED=(Z)=>{let J=!A0(Z);return I6(Z,J,(Q)=>GJ(Z.state,Q,J))},CD=(Z)=>{let J=A0(Z);return I6(Z,J,(Q)=>GJ(Z.state,Q,J))};function Pj(Z,J){return I6(Z,J,(Q)=>Z.moveVertically(Q,J))}var Sj=(Z)=>Pj(Z,!1),Tj=(Z)=>Pj(Z,!0);function _j(Z,J){return I6(Z,J,(Q)=>Z.moveVertically(Q,J,Rj(Z).height))}var Xj=(Z)=>_j(Z,!1),Yj=(Z)=>_j(Z,!0),wD=(Z)=>I6(Z,!0,(J)=>X8(Z,J,!0)),hD=(Z)=>I6(Z,!1,(J)=>X8(Z,J,!1)),kD=(Z)=>{let J=!A0(Z);return I6(Z,J,(Q)=>X8(Z,Q,J))},bD=(Z)=>{let J=A0(Z);return I6(Z,J,(Q)=>X8(Z,Q,J))},xD=(Z)=>I6(Z,!1,(J)=>u.cursor(Z.lineBlockAt(J.head).from)),yD=(Z)=>I6(Z,!0,(J)=>u.cursor(Z.lineBlockAt(J.head).to)),QJ=({state:Z,dispatch:J})=>{return J(k6(Z,{anchor:0})),!0},XJ=({state:Z,dispatch:J})=>{return J(k6(Z,{anchor:Z.doc.length})),!0},Kj=({state:Z,dispatch:J})=>{return J(k6(Z,{anchor:Z.selection.main.anchor,head:0})),!0},Ij=({state:Z,dispatch:J})=>{return J(k6(Z,{anchor:Z.selection.main.anchor,head:Z.doc.length})),!0},gD=({state:Z,dispatch:J})=>{return J(Z.update({selection:{anchor:0,head:Z.doc.length},userEvent:"select"})),!0},fD=({state:Z,dispatch:J})=>{let Q=jJ(Z).map(({from:X,to:Y})=>u.range(X,Math.min(Y+1,Z.doc.length)));return J(Z.update({selection:u.create(Q),userEvent:"select"})),!0},$D=({state:Z,dispatch:J})=>{let Q=e7(Z.selection,(X)=>{let Y=h6(Z),K=Y.resolveStack(X.from,1);if(X.empty){let I=Y.resolveStack(X.from,-1);if(I.node.from>=K.node.from&&I.node.to<=K.node.to)K=I}for(let I=K;I;I=I.next){let{node:q}=I;if((q.from<X.from&&q.to>=X.to||q.to>X.to&&q.from<=X.from)&&I.next)return u.range(q.to,q.from)}return X});if(Q.eq(Z.selection))return!1;return J(k6(Z,Q)),!0};function Ej(Z,J){let{state:Q}=Z,X=Q.selection,Y=Q.selection.ranges.slice();for(let K of Q.selection.ranges){let I=Q.doc.lineAt(K.head);if(J?I.to<Z.state.doc.length:I.from>0)for(let q=K;;){let W=Z.moveVertically(q,J);if(W.head<I.from||W.head>I.to){if(!Y.some((G)=>G.head==W.head))Y.push(W);break}else if(W.head==q.head)break;else q=W}}if(Y.length==X.ranges.length)return!1;return Z.dispatch(k6(Q,u.create(Y,Y.length-1))),!0}var uD=(Z)=>Ej(Z,!1),nD=(Z)=>Ej(Z,!0),vD=({state:Z,dispatch:J})=>{let Q=Z.selection,X=null;if(Q.ranges.length>1)X=u.create([Q.main]);else if(!Q.main.empty)X=u.create([u.cursor(Q.main.head)]);if(!X)return!1;return J(k6(Z,X)),!0};function C5(Z,J){if(Z.state.readOnly)return!1;let Q="delete.selection",{state:X}=Z,Y=X.changeByRange((K)=>{let{from:I,to:q}=K;if(I==q){let W=J(K);if(W<I)Q="delete.backward",W=ZJ(Z,W,!1);else if(W>I)Q="delete.forward",W=ZJ(Z,W,!0);I=Math.min(I,W),q=Math.max(q,W)}else I=ZJ(Z,I,!1),q=ZJ(Z,q,!0);return I==q?{range:K}:{changes:{from:I,to:q},range:u.cursor(I,I<K.head?-1:1)}});if(Y.changes.empty)return!1;return Z.dispatch(X.update(Y,{scrollIntoView:!0,userEvent:Q,effects:Q=="delete.selection"?K1.announce.of(X.phrase("Selection deleted")):void 0})),!0}function ZJ(Z,J,Q){if(Z instanceof K1)for(let X of Z.state.facet(K1.atomicRanges).map((Y)=>Y(Z)))X.between(J,J,(Y,K)=>{if(Y<J&&K>J)J=Q?K:Y});return J}var Cj=(Z,J,Q)=>C5(Z,(X)=>{let Y=X.from,{state:K}=Z,I=K.doc.lineAt(Y),q,W;if(Q&&!J&&Y>I.from&&Y<I.from+200&&!/[^ \t]/.test(q=I.text.slice(0,Y-I.from))){if(q[q.length-1]=="\t")return Y-1;let G=n8(q,K.tabSize),U=G%Q8(K)||Q8(K);for(let z=0;z<U&&q[q.length-1-z]==" ";z++)Y--;W=Y}else if(W=I0(I.text,Y-I.from,J,J)+I.from,W==Y&&I.number!=(J?K.doc.lines:1))W+=J?1:-1;else if(!J&&/[\ufe00-\ufe0f]/.test(I.text.slice(W-I.from,Y-I.from)))W=I0(I.text,W-I.from,!1,!1)+I.from;return W}),NK=(Z)=>Cj(Z,!1,!0);var VJ=(Z)=>Cj(Z,!0,!1),wj=(Z,J)=>C5(Z,(Q)=>{let X=Q.head,{state:Y}=Z,K=Y.doc.lineAt(X),I=Y.charCategorizer(X);for(let q=null;;){if(X==(J?K.to:K.from)){if(X==Q.head&&K.number!=(J?Y.doc.lines:1))X+=J?1:-1;break}let W=I0(K.text,X-K.from,J)+K.from,G=K.text.slice(Math.min(X,W)-K.from,Math.max(X,W)-K.from),U=I(G);if(q!=null&&U!=q)break;if(G!=" "||X!=Q.head)q=U;X=W}return X}),hj=(Z)=>wj(Z,!1),PK=(Z)=>wj(Z,!0);var mD=(Z)=>C5(Z,(J)=>{let Q=Z.lineBlockAt(J.head).to;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var pD=(Z)=>C5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!1).head;return J.head>Q?Q:Math.max(0,J.head-1)}),cD=(Z)=>C5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!0).head;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var dD=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{return{changes:{from:X.from,to:X.to,insert:R1.of(["",""])},range:u.cursor(X.from)}});return J(Z.update(Q,{scrollIntoView:!0,userEvent:"input"})),!0},sD=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{if(!X.empty||X.from==0||X.from==Z.doc.length)return{range:X};let Y=X.from,K=Z.doc.lineAt(Y),I=Y==K.from?Y-1:I0(K.text,Y-K.from,!1)+K.from,q=Y==K.to?Y+1:I0(K.text,Y-K.from,!0)+K.from;return{changes:{from:I,to:q,insert:Z.doc.slice(Y,q).append(Z.doc.slice(I,Y))},range:u.cursor(q)}});if(Q.changes.empty)return!1;return J(Z.update(Q,{scrollIntoView:!0,userEvent:"move.character"})),!0};function jJ(Z){let J=[],Q=-1;for(let X of Z.selection.ranges){let Y=Z.doc.lineAt(X.from),K=Z.doc.lineAt(X.to);if(!X.empty&&X.to==K.from)K=Z.doc.lineAt(X.to-1);if(Q>=Y.number){let I=J[J.length-1];I.to=K.to,I.ranges.push(X)}else J.push({from:Y.from,to:K.to,ranges:[X]});Q=K.number+1}return J}function kj(Z,J,Q){if(Z.readOnly)return!1;let X=[],Y=[];for(let K of jJ(Z)){if(Q?K.to==Z.doc.length:K.from==0)continue;let I=Z.doc.lineAt(Q?K.to+1:K.from-1),q=I.length+1;if(Q){X.push({from:K.to,to:I.to},{from:K.from,insert:I.text+Z.lineBreak});for(let W of K.ranges)Y.push(u.range(Math.min(Z.doc.length,W.anchor+q),Math.min(Z.doc.length,W.head+q)))}else{X.push({from:I.from,to:K.from},{from:K.to,insert:Z.lineBreak+I.text});for(let W of K.ranges)Y.push(u.range(W.anchor-q,W.head-q))}}if(!X.length)return!1;return J(Z.update({changes:X,scrollIntoView:!0,selection:u.create(Y,Z.selection.mainIndex),userEvent:"move.line"})),!0}var lD=({state:Z,dispatch:J})=>kj(Z,J,!1),iD=({state:Z,dispatch:J})=>kj(Z,J,!0);function bj(Z,J,Q){if(Z.readOnly)return!1;let X=[];for(let K of jJ(Z))if(Q)X.push({from:K.from,insert:Z.doc.slice(K.from,K.to)+Z.lineBreak});else X.push({from:K.to,insert:Z.lineBreak+Z.doc.slice(K.from,K.to)});let Y=Z.changes(X);return J(Z.update({changes:Y,selection:Z.selection.map(Y,Q?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}var rD=({state:Z,dispatch:J})=>bj(Z,J,!1),aD=({state:Z,dispatch:J})=>bj(Z,J,!0),oD=(Z)=>{if(Z.state.readOnly)return!1;let{state:J}=Z,Q=J.changes(jJ(J).map(({from:Y,to:K})=>{if(Y>0)Y--;else if(K<J.doc.length)K++;return{from:Y,to:K}})),X=e7(J.selection,(Y)=>{let K=void 0;if(Z.lineWrapping){let I=Z.lineBlockAt(Y.head),q=Z.coordsAtPos(Y.head,Y.assoc||1);if(q)K=I.bottom+Z.documentTop-q.bottom+Z.defaultLineHeight/2}return Z.moveVertically(Y,!0,K)}).map(Q);return Z.dispatch({changes:Q,selection:X,scrollIntoView:!0,userEvent:"delete.line"}),!0};function tD(Z,J){if(/\(\)|\[\]|\{\}/.test(Z.sliceDoc(J-1,J+1)))return{from:J,to:J};let Q=h6(Z).resolveInner(J),X=Q.childBefore(J),Y=Q.childAfter(J),K;if(X&&Y&&X.to<=J&&Y.from>=J&&(K=X.type.prop(F1.closedBy))&&K.indexOf(Y.name)>-1&&Z.doc.lineAt(X.to).from==Z.doc.lineAt(Y.from).from&&!/\S/.test(Z.sliceDoc(X.to,Y.from)))return{from:X.to,to:Y.from};return null}var qj=xj(!1),eD=xj(!0);function xj(Z){return({state:J,dispatch:Q})=>{if(J.readOnly)return!1;let X=J.changeByRange((Y)=>{let{from:K,to:I}=Y,q=J.doc.lineAt(K),W=!Z&&K==I&&tD(J,K);if(Z)K=I=(I<=q.to?q:J.doc.lineAt(I)).to;let G=new a7(J,{simulateBreak:K,simulateDoubleBreak:!!W}),U=GK(G,K);if(U==null)U=n8(/^\s*/.exec(J.doc.lineAt(K).text)[0],J.tabSize);while(I<q.to&&/\s/.test(q.text[I-q.from]))I++;if(W)({from:K,to:I}=W);else if(K>q.from&&K<q.from+100&&!/\S/.test(q.text.slice(0,K)))K=q.from;let z=["",S5(J,U)];if(W)z.push(S5(J,G.lineIndent(q.from,-1)));return{changes:{from:K,to:I,insert:R1.of(z)},range:u.cursor(K+1+z[1].length)}});return Q(J.update(X,{scrollIntoView:!0,userEvent:"input"})),!0}}function SK(Z,J){let Q=-1;return Z.changeByRange((X)=>{let Y=[];for(let I=X.from;I<=X.to;){let q=Z.doc.lineAt(I);if(q.number>Q&&(X.empty||X.to>q.from))J(q,Y,X),Q=q.number;I=q.to+1}let K=Z.changes(Y);return{changes:Y,range:u.range(K.mapPos(X.anchor,1),K.mapPos(X.head,1))}})}var ZL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Object.create(null),X=new a7(Z,{overrideIndentation:(K)=>{let I=Q[K];return I==null?-1:I}}),Y=SK(Z,(K,I,q)=>{let W=GK(X,K.from);if(W==null)return;if(!/\S/.test(K.text))W=0;let G=/^\s*/.exec(K.text)[0],U=S5(Z,W);if(G!=U||q.from<K.from+G.length)Q[K.from]=W,I.push({from:K.from,to:K.from+G.length,insert:U})});if(!Y.changes.empty)J(Z.update(Y,{userEvent:"indent"}));return!0},yj=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(SK(Z,(Q,X)=>{X.push({from:Q.from,insert:Z.facet(r7)})}),{userEvent:"input.indent"})),!0},gj=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(SK(Z,(Q,X)=>{let Y=/^\s*/.exec(Q.text)[0];if(!Y)return;let K=n8(Y,Z.tabSize),I=0,q=S5(Z,Math.max(0,K-Q8(Z)));while(I<Y.length&&I<q.length&&Y.charCodeAt(I)==q.charCodeAt(I))I++;X.push({from:Q.from+I,to:Q.from+Y.length,insert:q.slice(I)})}),{userEvent:"delete.dedent"})),!0},JL=(Z)=>{return Z.setTabFocusMode(),!0};var QL=[{key:"Ctrl-b",run:qJ,shift:Dj,preventDefault:!0},{key:"Ctrl-f",run:WJ,shift:Lj},{key:"Ctrl-p",run:UJ,shift:Sj},{key:"Ctrl-n",run:zJ,shift:Tj},{key:"Ctrl-a",run:LK,shift:xD},{key:"Ctrl-e",run:BK,shift:yD},{key:"Ctrl-d",run:VJ},{key:"Ctrl-h",run:NK},{key:"Ctrl-k",run:mD},{key:"Ctrl-Alt-h",run:hj},{key:"Ctrl-o",run:dD},{key:"Ctrl-t",run:sD},{key:"Ctrl-v",run:t7}],XL=[{key:"ArrowLeft",run:qJ,shift:Dj,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:AK,shift:TD,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:LD,shift:kD,preventDefault:!0},{key:"ArrowRight",run:WJ,shift:Lj,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:DK,shift:_D,preventDefault:!0},{mac:"Cmd-ArrowRight",run:BD,shift:bD,preventDefault:!0},{key:"ArrowUp",run:UJ,shift:Sj,preventDefault:!0},{mac:"Cmd-ArrowUp",run:QJ,shift:Kj},{mac:"Ctrl-ArrowUp",run:E5,shift:Xj},{key:"ArrowDown",run:zJ,shift:Tj,preventDefault:!0},{mac:"Cmd-ArrowDown",run:XJ,shift:Ij},{mac:"Ctrl-ArrowDown",run:t7,shift:Yj},{key:"PageUp",run:E5,shift:Xj},{key:"PageDown",run:t7,shift:Yj},{key:"Home",run:DD,shift:hD,preventDefault:!0},{key:"Mod-Home",run:QJ,shift:Kj},{key:"End",run:AD,shift:wD,preventDefault:!0},{key:"Mod-End",run:XJ,shift:Ij},{key:"Enter",run:qj,shift:qj},{key:"Mod-a",run:gD},{key:"Backspace",run:NK,shift:NK,preventDefault:!0},{key:"Delete",run:VJ,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:hj,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:PK,preventDefault:!0},{mac:"Mod-Backspace",run:pD,preventDefault:!0},{mac:"Mod-Delete",run:cD,preventDefault:!0}].concat(QL.map((Z)=>({mac:Z.key,run:Z.run,shift:Z.shift}))),fj=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:RD,shift:ED},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:MD,shift:CD},{key:"Alt-ArrowUp",run:lD},{key:"Shift-Alt-ArrowUp",run:rD},{key:"Alt-ArrowDown",run:iD},{key:"Shift-Alt-ArrowDown",run:aD},{key:"Mod-Alt-ArrowUp",run:uD},{key:"Mod-Alt-ArrowDown",run:nD},{key:"Escape",run:vD},{key:"Mod-Enter",run:eD},{key:"Alt-l",mac:"Ctrl-l",run:fD},{key:"Mod-i",run:$D,preventDefault:!0},{key:"Mod-[",run:gj},{key:"Mod-]",run:yj},{key:"Mod-Alt-\\",run:ZL},{key:"Shift-Mod-k",run:oD},{key:"Shift-Mod-\\",run:SD},{key:"Mod-/",run:ZD},{key:"Alt-A",run:QD},{key:"Ctrl-m",mac:"Shift-Alt-m",run:JL}].concat(XL),$j={key:"Tab",run:yj,shift:gj};class TK{constructor(Z,J,Q){this.from=Z,this.to=J,this.diagnostic=Q}}class a8{constructor(Z,J,Q){this.diagnostics=Z,this.panel=J,this.selected=Q}static init(Z,J,Q){let X=Q.facet(w5).markerFilter;if(X)Z=X(Z,Q);let Y=Z.slice().sort((j,O)=>j.from-O.from||j.to-O.to),K=new R4,I=[],q=0,W=Q.doc.iter(),G=0,U=Q.doc.length;for(let j=0;;){let O=j==Y.length?null:Y[j];if(!O&&!I.length)break;let H,N;if(I.length)H=q,N=I.reduce((_,C)=>Math.min(_,C.to),O&&O.from>H?O.from:1e8);else{if(H=O.from,H>U)break;N=O.to,I.push(O),j++}while(j<Y.length){let _=Y[j];if(_.from==H&&(_.to>_.from||_.to==H))I.push(_),j++,N=Math.min(_.to,N);else{N=Math.min(_.from,N);break}}N=Math.min(N,U);let R=!1;if(I.some((_)=>_.from==H&&(_.to==N||N==U))){if(R=H==N,!R&&N-H<10){let _=H-(G+W.value.length);if(_>0)W.next(_),G=H;for(let C=H;;){if(C>=N){R=!0;break}if(!W.lineBreak&&G+W.value.length>C)break;C=G+W.value.length,G+=W.value.length,W.next()}}}let T=VL(I);if(R)K.add(H,H,P1.widget({widget:new sj(T),diagnostics:I.slice()}));else{let _=I.reduce((C,h)=>h.markClass?C+" "+h.markClass:C,"");K.add(H,N,P1.mark({class:"cm-lintRange cm-lintRange-"+T+_,diagnostics:I.slice(),inclusiveEnd:I.some((C)=>C.to>N)}))}if(q=N,q==U)break;for(let _=0;_<I.length;_++)if(I[_].to<=q)I.splice(_--,1)}let z=K.finish();return new a8(z,J,Z9(z))}}function Z9(Z,J=null,Q=0){let X=null;return Z.between(Q,1e9,(Y,K,{spec:I})=>{if(J&&I.diagnostics.indexOf(J)<0)return;if(!X)X=new TK(Y,K,J||I.diagnostics[0]);else if(I.diagnostics.indexOf(X.diagnostic)<0)return!1;else X=new TK(X.from,K,X.diagnostic)}),X}function YL(Z,J){let Q=J.pos,X=J.end||Q,Y=Z.state.facet(w5).hideOn(Z,Q,X);if(Y!=null)return Y;let K=Z.startState.doc.lineAt(J.pos);return!!(Z.effects.some((I)=>I.is(EK))||Z.changes.touchesRange(K.from,Math.max(K.to,X)))}function KL(Z,J){return Z.field(x6,!1)?J:J.concat(B1.appendConfig.of(OL))}function vj(Z,J){return{effects:KL(Z,[EK.of(J)])}}var EK=B1.define(),mj=B1.define(),pj=B1.define(),x6=R0.define({create(){return new a8(P1.none,null,null)},update(Z,J){if(J.docChanged&&Z.diagnostics.size){let Q=Z.diagnostics.map(J.changes),X=null,Y=Z.panel;if(Z.selected){let K=J.changes.mapPos(Z.selected.from,1);X=Z9(Q,Z.selected.diagnostic,K)||Z9(Q,null,K)}if(!Q.size&&Y&&J.state.facet(w5).autoPanel)Y=null;Z=new a8(Q,Y,X)}for(let Q of J.effects)if(Q.is(EK)){let X=!J.state.facet(w5).autoPanel?Z.panel:Q.value.length?FJ.open:null;Z=a8.init(Q.value,X,J.state)}else if(Q.is(mj))Z=new a8(Z.diagnostics,Q.value?FJ.open:null,Z.selected);else if(Q.is(pj))Z=new a8(Z.diagnostics,Z.panel,Q.value);return Z},provide:(Z)=>[m7.from(Z,(J)=>J.panel),K1.decorations.from(Z,(J)=>J.diagnostics)]});var IL=P1.mark({class:"cm-lintRange cm-lintRange-active"});function qL(Z,J,Q){let{diagnostics:X}=Z.state.field(x6),Y,K=-1,I=-1;X.between(J-(Q<0?1:0),J+(Q>0?1:0),(W,G,{spec:U})=>{if(J>=W&&J<=G&&(W==G||(J>W||Q>0)&&(J<G||Q<0)))return Y=U.diagnostics,K=W,I=G,!1});let q=Z.state.facet(w5).tooltipFilter;if(Y&&q)Y=q(Y,Z.state);if(!Y)return null;return{pos:K,end:I,above:!0,create(){return{dom:WL(Z,Y)}}}}function WL(Z,J){return c0("ul",{class:"cm-tooltip-lint"},J.map((Q)=>dj(Z,Q,!1)))}var uj=(Z)=>{let J=Z.state.field(x6,!1);if(!J||!J.panel)return!1;return Z.dispatch({effects:mj.of(!1)}),!0};var w5=o.define({combine(Z){return{sources:Z.map((J)=>J.source).filter((J)=>J!=null),...A4(Z.map((J)=>J.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:nj,tooltipFilter:nj,needsRefresh:(J,Q)=>!J?Q:!Q?J:(X)=>J(X)||Q(X),hideOn:(J,Q)=>!J?Q:!Q?J:(X,Y,K)=>J(X,Y,K)||Q(X,Y,K),autoPanel:(J,Q)=>J||Q})}}});function nj(Z,J){return!Z?J:!J?Z:(Q,X)=>J(Z(Q,X),X)}function cj(Z){let J=[];if(Z)Z:for(let{name:Q}of Z){for(let X=0;X<Q.length;X++){let Y=Q[X];if(/[a-zA-Z]/.test(Y)&&!J.some((K)=>K.toLowerCase()==Y.toLowerCase())){J.push(Y);continue Z}}J.push("")}return J}function dj(Z,J,Q){var X;let Y=Q?cj(J.actions):[];return c0("li",{class:"cm-diagnostic cm-diagnostic-"+J.severity},c0("span",{class:"cm-diagnosticText"},J.renderMessage?J.renderMessage(Z):J.message),(X=J.actions)===null||X===void 0?void 0:X.map((K,I)=>{let q=!1,W=(O)=>{if(O.preventDefault(),q)return;q=!0;let H=Z9(Z.state.field(x6).diagnostics,J);if(H)K.apply(Z,H.from,H.to)},{name:G}=K,U=Y[I]?G.indexOf(Y[I]):-1,z=U<0?G:[G.slice(0,U),c0("u",G.slice(U,U+1)),G.slice(U+1)],j=K.markClass?" "+K.markClass:"";return c0("button",{type:"button",class:"cm-diagnosticAction"+j,onclick:W,onmousedown:W,"aria-label":` Action: ${G}${U<0?"":` (access key "${Y[I]})"`}.`},z)}),J.source&&c0("div",{class:"cm-diagnosticSource"},J.source))}class sj extends a4{constructor(Z){super();this.sev=Z}eq(Z){return Z.sev==this.sev}toDOM(){return c0("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class _K{constructor(Z,J){this.diagnostic=J,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=dj(Z,J,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class FJ{constructor(Z){this.view=Z,this.items=[];let J=(X)=>{if(X.ctrlKey||X.altKey||X.metaKey)return;if(X.keyCode==27)uj(this.view),this.view.focus();else if(X.keyCode==38||X.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(X.keyCode==40||X.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(X.keyCode==36)this.moveSelection(0);else if(X.keyCode==35)this.moveSelection(this.items.length-1);else if(X.keyCode==13)this.view.focus();else if(X.keyCode>=65&&X.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:Y}=this.items[this.selectedIndex],K=cj(Y.actions);for(let I=0;I<K.length;I++)if(K[I].toUpperCase().charCodeAt(0)==X.keyCode){let q=Z9(this.view.state.field(x6).diagnostics,Y);if(q)Y.actions[I].apply(Z,q.from,q.to)}}else return;X.preventDefault()},Q=(X)=>{for(let Y=0;Y<this.items.length;Y++)if(this.items[Y].dom.contains(X.target))this.moveSelection(Y)};this.list=c0("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:J,onclick:Q}),this.dom=c0("div",{class:"cm-panel-lint"},this.list,c0("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>uj(this.view)},"×")),this.update()}get selectedIndex(){let Z=this.view.state.field(x6).selected;if(!Z)return-1;for(let J=0;J<this.items.length;J++)if(this.items[J].diagnostic==Z.diagnostic)return J;return-1}update(){let{diagnostics:Z,selected:J}=this.view.state.field(x6),Q=0,X=!1,Y=null,K=new Set;Z.between(0,this.view.state.doc.length,(I,q,{spec:W})=>{for(let G of W.diagnostics){if(K.has(G))continue;K.add(G);let U=-1,z;for(let j=Q;j<this.items.length;j++)if(this.items[j].diagnostic==G){U=j;break}if(U<0)z=new _K(this.view,G),this.items.splice(Q,0,z),X=!0;else if(z=this.items[U],U>Q)this.items.splice(Q,U-Q),X=!0;if(J&&z.diagnostic==J.diagnostic){if(!z.dom.hasAttribute("aria-selected"))z.dom.setAttribute("aria-selected","true"),Y=z}else if(z.dom.hasAttribute("aria-selected"))z.dom.removeAttribute("aria-selected");Q++}});while(Q<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0))X=!0,this.items.pop();if(this.items.length==0)this.items.push(new _K(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),X=!0;if(Y)this.list.setAttribute("aria-activedescendant",Y.id),this.view.requestMeasure({key:this,read:()=>({sel:Y.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:I,panel:q})=>{let W=q.height/this.list.offsetHeight;if(I.top<q.top)this.list.scrollTop-=(q.top-I.top)/W;else if(I.bottom>q.bottom)this.list.scrollTop+=(I.bottom-q.bottom)/W}});else if(this.selectedIndex<0)this.list.removeAttribute("aria-activedescendant");if(X)this.sync()}sync(){let Z=this.list.firstChild;function J(){let Q=Z;Z=Q.nextSibling,Q.remove()}for(let Q of this.items)if(Q.dom.parentNode==this.list){while(Z!=Q.dom)J();Z=Q.dom.nextSibling}else this.list.insertBefore(Q.dom,Z);while(Z)J()}moveSelection(Z){if(this.selectedIndex<0)return;let J=this.view.state.field(x6),Q=Z9(J.diagnostics,this.items[Z].diagnostic);if(!Q)return;this.view.dispatch({selection:{anchor:Q.from,head:Q.to},scrollIntoView:!0,effects:pj.of(Q)})}static open(Z){return new FJ(Z)}}function GL(Z,J='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${J}>${encodeURIComponent(Z)}</svg>')`}function OJ(Z){return GL(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${Z}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}var UL=K1.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:0.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:OJ("#f11")},".cm-lintRange-warning":{backgroundImage:OJ("orange")},".cm-lintRange-info":{backgroundImage:OJ("#999")},".cm-lintRange-hint":{backgroundImage:OJ("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});function zL(Z){return Z=="error"?4:Z=="warning"?3:Z=="info"?2:1}function VL(Z){let J="hint",Q=1;for(let X of Z){let Y=zL(X.severity);if(Y>Q)Q=Y,J=X.severity}return J}var jL=NV(qL,{hideOn:YL}),OL=[x6,K1.decorations.compute([x6],(Z)=>{let{selected:J,panel:Q}=Z.field(x6);return!J||!Q||J.from==J.to?P1.none:P1.set([IL.range(J.from,J.to)])}),jL,UL];function CK(Z){return new RegExp("^(("+Z.join(")|(")+"))\\b")}var FL=CK(["and","or","not","is"]),lj=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],ij=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function y6(Z){return Z.scopes[Z.scopes.length-1]}function rj(Z){var J="error",Q=Z.delimiters||Z.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,X=[Z.singleOperators,Z.doubleOperators,Z.doubleDelimiters,Z.tripleDelimiters,Z.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/];for(var Y=0;Y<X.length;Y++)if(!X[Y])X.splice(Y--,1);var K=Z.hangingIndent,I=lj,q=ij;if(Z.extra_keywords!=null)I=I.concat(Z.extra_keywords);if(Z.extra_builtins!=null)q=q.concat(Z.extra_builtins);var W=!(Z.version&&Number(Z.version)<3);if(W){var G=Z.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;I=I.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),q=q.concat(["ascii","bytes","exec","print"]);var U=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var G=Z.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;I=I.concat(["exec","print"]),q=q.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var U=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var z=CK(I),j=CK(q);function O(L,S){var B=L.sol()&&S.lastToken!="\\";if(B)S.indent=L.indentation();if(B&&y6(S).type=="py"){var E=y6(S).offset;if(L.eatSpace()){var M=L.indentation();if(M>E)T(L,S);else if(M<E&&C(L,S)&&L.peek()!="#")S.errorToken=!0;return null}else{var l=H(L,S);if(E>0&&C(L,S))l+=" "+J;return l}}return H(L,S)}function H(L,S,B){if(L.eatSpace())return null;if(!B&&L.match(/^#.*/))return"comment";if(L.match(/^[0-9\.]/,!1)){var E=!1;if(L.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i))E=!0;if(L.match(/^[\d_]+\.\d*/))E=!0;if(L.match(/^\.\d+/))E=!0;if(E)return L.eat(/J/i),"number";var M=!1;if(L.match(/^0x[0-9a-f_]+/i))M=!0;if(L.match(/^0b[01_]+/i))M=!0;if(L.match(/^0o[0-7_]+/i))M=!0;if(L.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/))L.eat(/J/i),M=!0;if(L.match(/^0(?![\dx])/i))M=!0;if(M)return L.eat(/L/i),"number"}if(L.match(U)){var l=L.current().toLowerCase().indexOf("f")!==-1;if(!l)return S.tokenize=R(L.current(),S.tokenize),S.tokenize(L,S);else return S.tokenize=N(L.current(),S.tokenize),S.tokenize(L,S)}for(var n=0;n<X.length;n++)if(L.match(X[n]))return"operator";if(L.match(Q))return"punctuation";if(S.lastToken=="."&&L.match(G))return"property";if(L.match(z)||L.match(FL))return"keyword";if(L.match(j))return"builtin";if(L.match(/^(self|cls)\b/))return"self";if(L.match(G)){if(S.lastToken=="def"||S.lastToken=="class")return"def";return"variable"}return L.next(),B?null:J}function N(L,S){while("rubf".indexOf(L.charAt(0).toLowerCase())>=0)L=L.substr(1);var B=L.length==1,E="string";function M(n){return function(p,q1){var e=H(p,q1,!0);if(e=="punctuation"){if(p.current()=="{")q1.tokenize=M(n+1);else if(p.current()=="}")if(n>1)q1.tokenize=M(n-1);else q1.tokenize=l}return e}}function l(n,p){while(!n.eol())if(n.eatWhile(/[^'"\{\}\\]/),n.eat("\\")){if(n.next(),B&&n.eol())return E}else if(n.match(L))return p.tokenize=S,E;else if(n.match("{{"))return E;else if(n.match("{",!1))if(p.tokenize=M(0),n.current())return E;else return p.tokenize(n,p);else if(n.match("}}"))return E;else if(n.match("}"))return J;else n.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else p.tokenize=S;return E}return l.isString=!0,l}function R(L,S){while("rubf".indexOf(L.charAt(0).toLowerCase())>=0)L=L.substr(1);var B=L.length==1,E="string";function M(l,n){while(!l.eol())if(l.eatWhile(/[^'"\\]/),l.eat("\\")){if(l.next(),B&&l.eol())return E}else if(l.match(L))return n.tokenize=S,E;else l.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else n.tokenize=S;return E}return M.isString=!0,M}function T(L,S){while(y6(S).type!="py")S.scopes.pop();S.scopes.push({offset:y6(S).offset+L.indentUnit,type:"py",align:null})}function _(L,S,B){var E=L.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:L.column()+1;S.scopes.push({offset:S.indent+(K||L.indentUnit),type:B,align:E})}function C(L,S){var B=L.indentation();while(S.scopes.length>1&&y6(S).offset>B){if(y6(S).type!="py")return!0;S.scopes.pop()}return y6(S).offset!=B}function h(L,S){if(L.sol())S.beginningOfLine=!0,S.dedent=!1;var B=S.tokenize(L,S),E=L.current();if(S.beginningOfLine&&E=="@")return L.match(G,!1)?"meta":W?"operator":J;if(/\S/.test(E))S.beginningOfLine=!1;if((B=="variable"||B=="builtin")&&S.lastToken=="meta")B="meta";if(E=="pass"||E=="return")S.dedent=!0;if(E=="lambda")S.lambda=!0;if(E==":"&&!S.lambda&&y6(S).type=="py"&&L.match(/^\s*(?:#|$)/,!1))T(L,S);if(E.length==1&&!/string|comment/.test(B)){var M="[({".indexOf(E);if(M!=-1)_(L,S,"])}".slice(M,M+1));if(M="])}".indexOf(E),M!=-1)if(y6(S).type==E)S.indent=S.scopes.pop().offset-(K||L.indentUnit);else return J}if(S.dedent&&L.eol()&&y6(S).type=="py"&&S.scopes.length>1)S.scopes.pop();return B}return{name:"python",startState:function(){return{tokenize:O,scopes:[{offset:0,type:"py",align:null}],indent:0,lastToken:null,lambda:!1,dedent:0}},token:function(L,S){var B=S.errorToken;if(B)S.errorToken=!1;var E=h(L,S);if(E&&E!="comment")S.lastToken=E=="keyword"||E=="punctuation"?L.current():E;if(E=="punctuation")E=null;if(L.eol()&&S.lambda)S.lambda=!1;return B?J:E},indent:function(L,S,B){if(L.tokenize!=O)return L.tokenize.isString?null:0;var E=y6(L),M=E.type==S.charAt(0)||E.type=="py"&&!L.dedent&&/^(else:|elif |except |finally:)/.test(S);if(E.align!=null)return E.align-(M?1:0);else return E.offset-(M?K||B.unit:0)},languageData:{autocomplete:lj.concat(ij).concat(["exec","print"]),indentOnInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}}}var HL=function(Z){return Z.split(" ")},aj=rj({}),Pb=rj({extra_keywords:HL("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")});function HJ(Z){var{statementIndent:J,jsonld:Q}=Z,X=Z.json||Q,Y=Z.typescript,K=Z.wordCharacters||/[\w$\xa1-\uffff]/,I=function(){function F(n0){return{type:n0,style:"keyword"}}var A=F("keyword a"),b=F("keyword b"),i=F("keyword c"),X1=F("keyword d"),A1=F("operator"),C1={type:"atom",style:"atom"};return{if:F("if"),while:A,with:A,else:b,do:b,try:b,finally:b,return:X1,break:X1,continue:X1,new:F("new"),delete:i,void:i,throw:i,debugger:F("debugger"),var:F("var"),const:F("var"),let:F("var"),function:F("function"),catch:F("catch"),for:F("for"),switch:F("switch"),case:F("case"),default:F("default"),in:A1,typeof:A1,instanceof:A1,true:C1,false:C1,null:C1,undefined:C1,NaN:C1,Infinity:C1,this:F("this"),class:F("class"),super:F("atom"),yield:i,export:F("export"),import:F("import"),extends:i,await:i}}(),q=/[+\-*&%=<>!?|~^@]/,W=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function G(F){var A=!1,b,i=!1;while((b=F.next())!=null){if(!A){if(b=="/"&&!i)return;if(b=="[")i=!0;else if(i&&b=="]")i=!1}A=!A&&b=="\\"}}var U,z;function j(F,A,b){return U=F,z=b,A}function O(F,A){var b=F.next();if(b=='"'||b=="'")return A.tokenize=H(b),A.tokenize(F,A);else if(b=="."&&F.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return j("number","number");else if(b=="."&&F.match(".."))return j("spread","meta");else if(/[\[\]{}\(\),;\:\.]/.test(b))return j(b);else if(b=="="&&F.eat(">"))return j("=>","operator");else if(b=="0"&&F.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return j("number","number");else if(/\d/.test(b))return F.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),j("number","number");else if(b=="/")if(F.eat("*"))return A.tokenize=N,N(F,A);else if(F.eat("/"))return F.skipToEnd(),j("comment","comment");else if(yF(F,A,1))return G(F),F.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),j("regexp","string.special");else return F.eat("="),j("operator","operator",F.current());else if(b=="`")return A.tokenize=R,R(F,A);else if(b=="#"&&F.peek()=="!")return F.skipToEnd(),j("meta","meta");else if(b=="#"&&F.eatWhile(K))return j("variable","property");else if(b=="<"&&F.match("!--")||b=="-"&&F.match("->")&&!/\S/.test(F.string.slice(0,F.start)))return F.skipToEnd(),j("comment","comment");else if(q.test(b)){if(b!=">"||!A.lexical||A.lexical.type!=">"){if(F.eat("=")){if(b=="!"||b=="=")F.eat("=")}else if(/[<>*+\-|&?]/.test(b)){if(F.eat(b),b==">")F.eat(b)}}if(b=="?"&&F.eat("."))return j(".");return j("operator","operator",F.current())}else if(K.test(b)){F.eatWhile(K);var i=F.current();if(A.lastType!="."){if(I.propertyIsEnumerable(i)){var X1=I[i];return j(X1.type,X1.style,i)}if(i=="async"&&F.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return j("async","keyword",i)}return j("variable","variable",i)}}function H(F){return function(A,b){var i=!1,X1;if(Q&&A.peek()=="@"&&A.match(W))return b.tokenize=O,j("jsonld-keyword","meta");while((X1=A.next())!=null){if(X1==F&&!i)break;i=!i&&X1=="\\"}if(!i)b.tokenize=O;return j("string","string")}}function N(F,A){var b=!1,i;while(i=F.next()){if(i=="/"&&b){A.tokenize=O;break}b=i=="*"}return j("comment","comment")}function R(F,A){var b=!1,i;while((i=F.next())!=null){if(!b&&(i=="`"||i=="$"&&F.eat("{"))){A.tokenize=O;break}b=!b&&i=="\\"}return j("quasi","string.special",F.current())}var T="([{}])";function _(F,A){if(A.fatArrowAt)A.fatArrowAt=null;var b=F.string.indexOf("=>",F.start);if(b<0)return;if(Y){var i=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(F.string.slice(F.start,b));if(i)b=i.index}var X1=0,A1=!1;for(var C1=b-1;C1>=0;--C1){var n0=F.string.charAt(C1),i0=T.indexOf(n0);if(i0>=0&&i0<3){if(!X1){++C1;break}if(--X1==0){if(n0=="(")A1=!0;break}}else if(i0>=3&&i0<6)++X1;else if(K.test(n0))A1=!0;else if(/["'\/`]/.test(n0))for(;;--C1){if(C1==0)return;var N9=F.string.charAt(C1-1);if(N9==n0&&F.string.charAt(C1-2)!="\\"){C1--;break}}else if(A1&&!X1){++C1;break}}if(A1&&!X1)A.fatArrowAt=C1}var C={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function h(F,A,b,i,X1,A1){if(this.indented=F,this.column=A,this.type=b,this.prev=X1,this.info=A1,i!=null)this.align=i}function L(F,A){for(var b=F.localVars;b;b=b.next)if(b.name==A)return!0;for(var i=F.context;i;i=i.prev)for(var b=i.vars;b;b=b.next)if(b.name==A)return!0}function S(F,A,b,i,X1){var A1=F.cc;if(B.state=F,B.stream=X1,B.marked=null,B.cc=A1,B.style=A,!F.lexical.hasOwnProperty("align"))F.lexical.align=!0;while(!0){var C1=A1.length?A1.pop():X?z1:Q1;if(C1(b,i)){while(A1.length&&A1[A1.length-1].lex)A1.pop()();if(B.marked)return B.marked;if(b=="variable"&&L(F,i))return"variableName.local";return A}}}var B={state:null,column:null,marked:null,cc:null};function E(){for(var F=arguments.length-1;F>=0;F--)B.cc.push(arguments[F])}function M(){return E.apply(null,arguments),!0}function l(F,A){for(var b=A;b;b=b.next)if(b.name==F)return!0;return!1}function n(F){var A=B.state;if(B.marked="def",A.context){if(A.lexical.info=="var"&&A.context&&A.context.block){var b=p(F,A.context);if(b!=null){A.context=b;return}}else if(!l(F,A.localVars)){A.localVars=new Z1(F,A.localVars);return}}if(Z.globalVars&&!l(F,A.globalVars))A.globalVars=new Z1(F,A.globalVars)}function p(F,A){if(!A)return null;else if(A.block){var b=p(F,A.prev);if(!b)return null;if(b==A.prev)return A;return new e(b,A.vars,!0)}else if(l(F,A.vars))return A;else return new e(A.prev,new Z1(F,A.vars),!1)}function q1(F){return F=="public"||F=="private"||F=="protected"||F=="abstract"||F=="readonly"}function e(F,A,b){this.prev=F,this.vars=A,this.block=b}function Z1(F,A){this.name=F,this.next=A}var I1=new Z1("this",new Z1("arguments",null));function W1(){B.state.context=new e(B.state.context,B.state.localVars,!1),B.state.localVars=I1}function J1(){B.state.context=new e(B.state.context,B.state.localVars,!0),B.state.localVars=null}W1.lex=J1.lex=!0;function t(){B.state.localVars=B.state.context.vars,B.state.context=B.state.context.prev}t.lex=!0;function v(F,A){var b=function(){var i=B.state,X1=i.indented;if(i.lexical.type=="stat")X1=i.lexical.indented;else for(var A1=i.lexical;A1&&A1.type==")"&&A1.align;A1=A1.prev)X1=A1.indented;i.lexical=new h(X1,B.stream.column(),F,null,i.lexical,A)};return b.lex=!0,b}function f(){var F=B.state;if(F.lexical.prev){if(F.lexical.type==")")F.indented=F.lexical.indented;F.lexical=F.lexical.prev}}f.lex=!0;function c(F){function A(b){if(b==F)return M();else if(F==";"||b=="}"||b==")"||b=="]")return E();else return M(A)}return A}function Q1(F,A){if(F=="var")return M(v("vardef",A),aJ,c(";"),f);if(F=="keyword a")return M(v("form"),J0,Q1,f);if(F=="keyword b")return M(v("form"),Q1,f);if(F=="keyword d")return B.stream.match(/^\s*$/,!1)?M():M(v("stat"),Y0,c(";"),f);if(F=="debugger")return M(c(";"));if(F=="{")return M(v("}"),J1,X3,f,t);if(F==";")return M();if(F=="if"){if(B.state.lexical.info=="else"&&B.state.cc[B.state.cc.length-1]==f)B.state.cc.pop()();return M(v("form"),J0,Q1,f,EI)}if(F=="function")return M(b4);if(F=="for")return M(v("form"),J1,CI,Q1,t,f);if(F=="class"||Y&&A=="interface")return B.marked="keyword",M(v("form",F=="class"?F:A),hI,f);if(F=="variable")if(Y&&A=="declare")return B.marked="keyword",M(Q1);else if(Y&&(A=="module"||A=="enum"||A=="type")&&B.stream.match(/^\s*\w/,!1))if(B.marked="keyword",A=="enum")return M(xI);else if(A=="type")return M(wI,c("operator"),E1,c(";"));else return M(v("form"),G6,c("{"),v("}"),X3,f,f);else if(Y&&A=="namespace")return B.marked="keyword",M(v("form"),z1,Q1,f);else if(Y&&A=="abstract")return B.marked="keyword",M(Q1);else return M(v("stat"),HF);if(F=="switch")return M(v("form"),J0,c("{"),v("}","switch"),J1,X3,f,f,t);if(F=="case")return M(z1,c(":"));if(F=="default")return M(c(":"));if(F=="catch")return M(v("form"),W1,$1,Q1,f,t);if(F=="export")return M(v("stat"),CF,f);if(F=="import")return M(v("stat"),wF,f);if(F=="async")return M(Q1);if(A=="@")return M(z1,Q1);return E(v("stat"),z1,c(";"),f)}function $1(F){if(F=="(")return M(N8,c(")"))}function z1(F,A){return J4(F,A,!1)}function T1(F,A){return J4(F,A,!0)}function J0(F){if(F!="(")return E();return M(v(")"),Y0,c(")"),f)}function J4(F,A,b){if(B.state.fatArrowAt==B.stream.start){var i=b?sJ:J3;if(F=="(")return M(W1,v(")"),W0(N8,")"),f,c("=>"),i,t);else if(F=="variable")return E(W1,G6,c("=>"),i,t)}var X1=b?W6:k0;if(C.hasOwnProperty(F))return M(X1);if(F=="function")return M(b4,X1);if(F=="class"||Y&&A=="interface")return B.marked="keyword",M(v("form"),EF,f);if(F=="keyword c"||F=="async")return M(b?T1:z1);if(F=="(")return M(v(")"),Y0,c(")"),f,X1);if(F=="operator"||F=="spread")return M(b?T1:z1);if(F=="[")return M(v("]"),kF,f,X1);if(F=="{")return F9(Q3,"}",null,X1);if(F=="quasi")return E(f6,X1);if(F=="new")return M(SI(b));return M()}function Y0(F){if(F.match(/[;\}\)\],]/))return E();return E(z1)}function k0(F,A){if(F==",")return M(Y0);return W6(F,A,!1)}function W6(F,A,b){var i=b==!1?k0:W6,X1=b==!1?z1:T1;if(F=="=>")return M(W1,b?sJ:J3,t);if(F=="operator"){if(/\+\+|--/.test(A)||Y&&A=="!")return M(i);if(Y&&A=="<"&&B.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1))return M(v(">"),W0(E1,">"),f,i);if(A=="?")return M(z1,c(":"),X1);return M(X1)}if(F=="quasi")return E(f6,i);if(F==";")return;if(F=="(")return F9(T1,")","call",i);if(F==".")return M(NF,i);if(F=="[")return M(v("]"),Y0,c("]"),f,i);if(Y&&A=="as")return B.marked="keyword",M(E1,i);if(F=="regexp")return B.state.lastType=B.marked="operator",B.stream.backUp(B.stream.pos-B.stream.start-1),M(X1)}function f6(F,A){if(F!="quasi")return E();if(A.slice(A.length-2)!="${")return M(f6);return M(Y0,PI)}function PI(F){if(F=="}")return B.marked="string.special",B.state.tokenize=R,M(f6)}function J3(F){return _(B.stream,B.state),E(F=="{"?Q1:z1)}function sJ(F){return _(B.stream,B.state),E(F=="{"?Q1:T1)}function SI(F){return function(A){if(A==".")return M(F?FF:OF);else if(A=="variable"&&Y)return M(BF,F?W6:k0);else return E(F?T1:z1)}}function OF(F,A){if(A=="target")return B.marked="keyword",M(k0)}function FF(F,A){if(A=="target")return B.marked="keyword",M(W6)}function HF(F){if(F==":")return M(f,Q1);return E(k0,c(";"),f)}function NF(F){if(F=="variable")return B.marked="property",M()}function Q3(F,A){if(F=="async")return B.marked="property",M(Q3);else if(F=="variable"||B.style=="keyword"){if(B.marked="property",A=="get"||A=="set")return M(RF);var b;if(Y&&B.state.fatArrowAt==B.stream.start&&(b=B.stream.match(/^\s*:\s*/,!1)))B.state.fatArrowAt=B.stream.pos+b[0].length;return M(H8)}else if(F=="number"||F=="string")return B.marked=Q?"property":B.style+" property",M(H8);else if(F=="jsonld-keyword")return M(H8);else if(Y&&q1(A))return B.marked="keyword",M(Q3);else if(F=="[")return M(z1,X7,c("]"),H8);else if(F=="spread")return M(T1,H8);else if(A=="*")return B.marked="keyword",M(Q3);else if(F==":")return E(H8)}function RF(F){if(F!="variable")return E(H8);return B.marked="property",M(b4)}function H8(F){if(F==":")return M(T1);if(F=="(")return E(b4)}function W0(F,A,b){function i(X1,A1){if(b?b.indexOf(X1)>-1:X1==","){var C1=B.state.lexical;if(C1.info=="call")C1.pos=(C1.pos||0)+1;return M(function(n0,i0){if(n0==A||i0==A)return E();return E(F)},i)}if(X1==A||A1==A)return M();if(b&&b.indexOf(";")>-1)return E(F);return M(c(A))}return function(X1,A1){if(X1==A||A1==A)return M();return E(F,i)}}function F9(F,A,b){for(var i=3;i<arguments.length;i++)B.cc.push(arguments[i]);return M(v(A,b),W0(F,A),f)}function X3(F){if(F=="}")return M();return E(Q1,X3)}function X7(F,A){if(Y){if(F==":")return M(E1);if(A=="?")return M(X7)}}function MF(F,A){if(Y&&(F==":"||A=="in"))return M(E1)}function TI(F){if(Y&&F==":")if(B.stream.match(/^\s*\w+\s+is\b/,!1))return M(z1,AF,E1);else return M(E1)}function AF(F,A){if(A=="is")return B.marked="keyword",M()}function E1(F,A){if(A=="keyof"||A=="typeof"||A=="infer"||A=="readonly")return B.marked="keyword",M(A=="typeof"?T1:E1);if(F=="variable"||A=="void")return B.marked="type",M(Q4);if(A=="|"||A=="&")return M(E1);if(F=="string"||F=="number"||F=="atom")return M(Q4);if(F=="[")return M(v("]"),W0(E1,"]",","),f,Q4);if(F=="{")return M(v("}"),lJ,f,Q4);if(F=="(")return M(W0(rJ,")"),DF,Q4);if(F=="<")return M(W0(E1,">"),E1);if(F=="quasi")return E(iJ,Q4)}function DF(F){if(F=="=>")return M(E1)}function lJ(F){if(F.match(/[\}\)\]]/))return M();if(F==","||F==";")return M(lJ);return E(H9,lJ)}function H9(F,A){if(F=="variable"||B.style=="keyword")return B.marked="property",M(H9);else if(A=="?"||F=="number"||F=="string")return M(H9);else if(F==":")return M(E1);else if(F=="[")return M(c("variable"),MF,c("]"),H9);else if(F=="(")return E(K7,H9);else if(!F.match(/[;\}\)\],]/))return M()}function iJ(F,A){if(F!="quasi")return E();if(A.slice(A.length-2)!="${")return M(iJ);return M(E1,LF)}function LF(F){if(F=="}")return B.marked="string.special",B.state.tokenize=R,M(iJ)}function rJ(F,A){if(F=="variable"&&B.stream.match(/^\s*[?:]/,!1)||A=="?")return M(rJ);if(F==":")return M(E1);if(F=="spread")return M(rJ);return E(E1)}function Q4(F,A){if(A=="<")return M(v(">"),W0(E1,">"),f,Q4);if(A=="|"||F=="."||A=="&")return M(E1);if(F=="[")return M(E1,c("]"),Q4);if(A=="extends"||A=="implements")return B.marked="keyword",M(E1);if(A=="?")return M(E1,c(":"),E1)}function BF(F,A){if(A=="<")return M(v(">"),W0(E1,">"),f,Q4)}function Y3(){return E(E1,PF)}function PF(F,A){if(A=="=")return M(E1)}function aJ(F,A){if(A=="enum")return B.marked="keyword",M(xI);return E(G6,X7,k4,TF)}function G6(F,A){if(Y&&q1(A))return B.marked="keyword",M(G6);if(F=="variable")return n(A),M();if(F=="spread")return M(G6);if(F=="[")return F9(SF,"]");if(F=="{")return F9(_I,"}")}function _I(F,A){if(F=="variable"&&!B.stream.match(/^\s*:/,!1))return n(A),M(k4);if(F=="variable")B.marked="property";if(F=="spread")return M(G6);if(F=="}")return E();if(F=="[")return M(z1,c("]"),c(":"),_I);return M(c(":"),G6,k4)}function SF(){return E(G6,k4)}function k4(F,A){if(A=="=")return M(T1)}function TF(F){if(F==",")return M(aJ)}function EI(F,A){if(F=="keyword b"&&A=="else")return M(v("form","else"),Q1,f)}function CI(F,A){if(A=="await")return M(CI);if(F=="(")return M(v(")"),_F,f)}function _F(F){if(F=="var")return M(aJ,Y7);if(F=="variable")return M(Y7);return E(Y7)}function Y7(F,A){if(F==")")return M();if(F==";")return M(Y7);if(A=="in"||A=="of")return B.marked="keyword",M(z1,Y7);return E(z1,Y7)}function b4(F,A){if(A=="*")return B.marked="keyword",M(b4);if(F=="variable")return n(A),M(b4);if(F=="(")return M(W1,v(")"),W0(N8,")"),f,TI,Q1,t);if(Y&&A=="<")return M(v(">"),W0(Y3,">"),f,b4)}function K7(F,A){if(A=="*")return B.marked="keyword",M(K7);if(F=="variable")return n(A),M(K7);if(F=="(")return M(W1,v(")"),W0(N8,")"),f,TI,t);if(Y&&A=="<")return M(v(">"),W0(Y3,">"),f,K7)}function wI(F,A){if(F=="keyword"||F=="variable")return B.marked="type",M(wI);else if(A=="<")return M(v(">"),W0(Y3,">"),f)}function N8(F,A){if(A=="@")M(z1,N8);if(F=="spread")return M(N8);if(Y&&q1(A))return B.marked="keyword",M(N8);if(Y&&F=="this")return M(X7,k4);return E(G6,X7,k4)}function EF(F,A){if(F=="variable")return hI(F,A);return K3(F,A)}function hI(F,A){if(F=="variable")return n(A),M(K3)}function K3(F,A){if(A=="<")return M(v(">"),W0(Y3,">"),f,K3);if(A=="extends"||A=="implements"||Y&&F==","){if(A=="implements")B.marked="keyword";return M(Y?E1:z1,K3)}if(F=="{")return M(v("}"),X4,f)}function X4(F,A){if(F=="async"||F=="variable"&&(A=="static"||A=="get"||A=="set"||Y&&q1(A))&&B.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1))return B.marked="keyword",M(X4);if(F=="variable"||B.style=="keyword")return B.marked="property",M(I3,X4);if(F=="number"||F=="string")return M(I3,X4);if(F=="[")return M(z1,X7,c("]"),I3,X4);if(A=="*")return B.marked="keyword",M(X4);if(Y&&F=="(")return E(K7,X4);if(F==";"||F==",")return M(X4);if(F=="}")return M();if(A=="@")return M(z1,X4)}function I3(F,A){if(A=="!"||A=="?")return M(I3);if(F==":")return M(E1,k4);if(A=="=")return M(T1);var b=B.state.lexical.prev,i=b&&b.info=="interface";return E(i?K7:b4)}function CF(F,A){if(A=="*")return B.marked="keyword",M(oJ,c(";"));if(A=="default")return B.marked="keyword",M(z1,c(";"));if(F=="{")return M(W0(kI,"}"),oJ,c(";"));return E(Q1)}function kI(F,A){if(A=="as")return B.marked="keyword",M(c("variable"));if(F=="variable")return E(T1,kI)}function wF(F){if(F=="string")return M();if(F=="(")return E(z1);if(F==".")return E(k0);return E(q3,bI,oJ)}function q3(F,A){if(F=="{")return F9(q3,"}");if(F=="variable")n(A);if(A=="*")B.marked="keyword";return M(hF)}function bI(F){if(F==",")return M(q3,bI)}function hF(F,A){if(A=="as")return B.marked="keyword",M(q3)}function oJ(F,A){if(A=="from")return B.marked="keyword",M(z1)}function kF(F){if(F=="]")return M();return E(W0(T1,"]"))}function xI(){return E(v("form"),G6,c("{"),v("}"),W0(bF,"}"),f,f)}function bF(){return E(G6,k4)}function xF(F,A){return F.lastType=="operator"||F.lastType==","||q.test(A.charAt(0))||/[,.]/.test(A.charAt(0))}function yF(F,A,b){return A.tokenize==O&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(A.lastType)||A.lastType=="quasi"&&/\{\s*$/.test(F.string.slice(0,F.pos-(b||0)))}return{name:Z.name,startState:function(F){var A={tokenize:O,lastType:"sof",cc:[],lexical:new h(-F,0,"block",!1),localVars:Z.localVars,context:Z.localVars&&new e(null,null,!1),indented:0};if(Z.globalVars&&typeof Z.globalVars=="object")A.globalVars=Z.globalVars;return A},token:function(F,A){if(F.sol()){if(!A.lexical.hasOwnProperty("align"))A.lexical.align=!1;A.indented=F.indentation(),_(F,A)}if(A.tokenize!=N&&F.eatSpace())return null;var b=A.tokenize(F,A);if(U=="comment")return b;return A.lastType=U=="operator"&&(z=="++"||z=="--")?"incdec":U,S(A,b,U,z,F)},indent:function(F,A,b){if(F.tokenize==N||F.tokenize==R)return null;if(F.tokenize!=O)return 0;var i=A&&A.charAt(0),X1=F.lexical,A1;if(!/^\s*else\b/.test(A))for(var C1=F.cc.length-1;C1>=0;--C1){var n0=F.cc[C1];if(n0==f)X1=X1.prev;else if(n0!=EI&&n0!=t)break}while((X1.type=="stat"||X1.type=="form")&&(i=="}"||(A1=F.cc[F.cc.length-1])&&(A1==k0||A1==W6)&&!/^[,\.=+\-*:?[\(]/.test(A)))X1=X1.prev;if(J&&X1.type==")"&&X1.prev.type=="stat")X1=X1.prev;var i0=X1.type,N9=i==i0;if(i0=="vardef")return X1.indented+(F.lastType=="operator"||F.lastType==","?X1.info.length+1:0);else if(i0=="form"&&i=="{")return X1.indented;else if(i0=="form")return X1.indented+b.unit;else if(i0=="stat")return X1.indented+(xF(F,A)?J||b.unit:0);else if(X1.info=="switch"&&!N9&&Z.doubleIndentSwitch!=!1)return X1.indented+(/^(?:case|default)\b/.test(A)?b.unit:2*b.unit);else if(X1.align)return X1.column+(N9?0:1);else return X1.indented+(N9?0:b.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:X?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}var Tb=HJ({name:"javascript"}),_b=HJ({name:"json",json:!0}),Eb=HJ({name:"json",jsonld:!0}),oj=HJ({name:"typescript",typescript:!0});var RJ="";function NL(Z){let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.head),X=J.selection.main.head,Y=X===Q.to?Math.min(Q.to+1,J.doc.length):Q.to;if(X===Y)return!1;return RJ=J.sliceDoc(X,Y),Z.dispatch({changes:{from:X,to:Y},userEvent:"delete"}),!0}function RL(Z){if(!RJ)return!1;let{from:J,to:Q}=Z.state.selection.main;return Z.dispatch({changes:{from:J,to:Q,insert:RJ},selection:{anchor:J+RJ.length},userEvent:"input"}),!0}var ML=mZ.of([{key:"Ctrl-f",run:WJ},{key:"Ctrl-b",run:qJ},{key:"Ctrl-n",run:zJ},{key:"Ctrl-p",run:UJ},{key:"Ctrl-a",run:LK},{key:"Ctrl-e",run:BK},{key:"Alt-f",run:DK},{key:"Alt-b",run:AK},{key:"Ctrl-d",run:VJ},{key:"Alt-d",run:PK},{key:"Ctrl-k",run:NL},{key:"Ctrl-y",run:RL},{key:"Ctrl-v",run:t7},{key:"Alt-v",run:E5},{key:"Alt-Shift-,",run:QJ},{key:"Alt-Shift-.",run:XJ}]),Y8=B1.define(),q0={count:"",operator:null,pending:""},J9=R0.define({create:()=>({mode:"normal",...q0}),update(Z,J){for(let Q of J.effects)if(Q.is(Y8))Z={...Z,...Q.value};return Z}}),o8={text:"",linewise:!1};function u0(Z,J){Z.dispatch({effects:Y8.of(J)})}function S4(Z,J){return J>=0&&J<Z.length?Z.sliceString(J,J+1):""}function T4(Z){if(!Z||/\s/.test(Z))return"space";return/[A-Za-z0-9_]/.test(Z)?"word":"punct"}function AL(Z,J){let Q=J,X=T4(S4(Z,Q));if(X!=="space")while(Q<Z.length&&T4(S4(Z,Q))===X)Q++;while(Q<Z.length&&T4(S4(Z,Q))==="space")Q++;return Q}function DL(Z,J){let Q=J-1;while(Q>=0&&T4(S4(Z,Q))==="space")Q--;if(Q<0)return 0;let X=T4(S4(Z,Q));while(Q>=0&&T4(S4(Z,Q))===X)Q--;return Q+1}function LL(Z,J){let Q=J+1;while(Q<Z.length&&T4(S4(Z,Q))==="space")Q++;if(Q>=Z.length)return Math.max(0,Z.length-1);let X=T4(S4(Z,Q));while(Q+1<Z.length&&T4(S4(Z,Q+1))===X)Q++;return Q}function t8(Z){return Z.from+/^\s*/.exec(Z.text)[0].length}function h5(Z,J,Q,X){let{doc:Y,selection:K}=Z.state,I=K.main.head,q=Y.lineAt(I),W=Q||1;switch(J){case"h":return{pos:Math.max(q.from,I-W)};case"l":return{pos:Math.min(X?q.to:Math.max(q.from,q.to-1),I+W)};case"j":case"k":{let G=K.main;for(let U=0;U<W;U++)G=Z.moveVertically(G,J==="j");return{pos:G.head,linewise:!0}}case"w":{let G=I;for(let U=0;U<W;U++)G=AL(Y,G);return{pos:G}}case"b":{let G=I;for(let U=0;U<W;U++)G=DL(Y,G);return{pos:G}}case"e":{let G=I;for(let U=0;U<W;U++)G=LL(Y,G);return{pos:G,inclusive:!0}}case"0":return{pos:q.from};case"^":return{pos:t8(q)};case"$":return{pos:X?q.to:Math.max(q.from,q.to-1)};case"gg":case"G":{let G=Q?Math.min(Math.max(Q,1),Y.lines):J==="gg"?1:Y.lines;return{pos:t8(Y.line(G)),linewise:!0}}default:return null}}function l0(Z,J){let{doc:Q}=Z.state,X=Math.max(0,Math.min(J,Q.length)),Y=Q.lineAt(X);Z.dispatch({selection:{anchor:Math.min(X,Math.max(Y.from,Y.to-1))},scrollIntoView:!0})}function NJ(Z,J){let Q=Y8.of({mode:"insert",...q0});if(J===void 0)Z.dispatch({effects:Q});else Z.dispatch({selection:{anchor:J},effects:Q,scrollIntoView:!0})}function BL(Z){let{head:J}=Z.state.selection.main,Q=Z.state.doc.lineAt(J);Z.dispatch({selection:{anchor:J>Q.from?J-1:J},effects:Y8.of({mode:"normal",...q0})})}function PL(Z,J,Q){let X=Z.lineAt(J),Y=Z.line(Math.min(X.number+Math.max(Q,1)-1,Z.lines)),K=Z.sliceString(X.from,Y.to)+`
`;if(Y.to<Z.length)return{from:X.from,to:Y.to+1,text:K};return{from:Math.max(0,X.from-1),to:Y.to,text:K}}function hK(Z,J,Q,X){let Y=Math.min(Q,X),K=Math.max(Q,X);if(o8={text:Z.state.sliceDoc(Y,K),linewise:!1},J==="y"){l0(Z,Y);return}if(J==="d"){Z.dispatch({changes:{from:Y,to:K},userEvent:"delete"}),l0(Z,Y);return}Z.dispatch({changes:{from:Y,to:K},selection:{anchor:Y},effects:Y8.of({mode:"insert",...q0}),userEvent:"delete",scrollIntoView:!0})}function MJ(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head;if(J==="c"){let q=X.lineAt(Y),W=X.line(Math.min(q.number+Math.max(Q,1)-1,X.lines)),G=t8(q);o8={text:X.sliceString(G,W.to)+`
`,linewise:!0},Z.dispatch({changes:{from:G,to:W.to},selection:{anchor:G},effects:Y8.of({mode:"insert",...q0}),userEvent:"delete",scrollIntoView:!0});return}let K=PL(X,Y,Q);if(o8={text:K.text,linewise:!0},J==="y"){l0(Z,X.lineAt(Y).from);return}Z.dispatch({changes:{from:K.from,to:K.to},userEvent:"delete"});let I=Math.min(K.from,Z.state.doc.length);l0(Z,t8(Z.state.doc.lineAt(I)))}function tj(Z,J,Q){if(!o8.text)return;let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=o8.text.repeat(Math.max(Q,1)),I=X.lineAt(Y);if(o8.linewise){let W=K.endsWith(`
`)?K.slice(0,-1):K,G=J?I.to:I.from,U=J?`
`+W:W+`
`;Z.dispatch({changes:{from:G,insert:U},userEvent:"input.paste"});let z=J?I.to+1:I.from;l0(Z,t8(Z.state.doc.lineAt(z)));return}let q=J?Math.min(Y+1,I.to):Y;Z.dispatch({changes:{from:q,insert:K},userEvent:"input.paste"}),l0(Z,q+K.length-1)}function ej(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=/^\s*/.exec(X.text)[0],K=J?X.to:X.from,I=J?`
`+Y:Y+`
`;Z.dispatch({changes:{from:K,insert:I},selection:{anchor:K+I.length-(J?0:1)},effects:Y8.of({mode:"insert",...q0}),userEvent:"input",scrollIntoView:!0})}function SL(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=X.to,K=0;for(let q=Math.max(J-1,1);q>0;q--){let W=Q.lineAt(Y).number+1;if(W>Q.lines)break;Y=Q.line(W).to,K++}if(!K)return;let I=Q.sliceString(X.from,Y).replace(/\n\s*/g," ");Z.dispatch({changes:{from:X.from,to:Y,insert:I},userEvent:"input"}),l0(Z,X.from+X.text.replace(/\s+$/,"").length)}function wK(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=X.lineAt(Y),I=Math.min(K.to,Y+Math.max(J,1));if(I===Y)return;if(o8={text:X.sliceString(Y,I),linewise:!1},Q){Z.dispatch({changes:{from:Y,to:I},selection:{anchor:Y},effects:Y8.of({mode:"insert",...q0}),userEvent:"delete"});return}Z.dispatch({changes:{from:Y,to:I},userEvent:"delete"}),l0(Z,Y)}function ZO(Z,J,Q,X){let Y=Z.state.selection.main.head,K=h5(Z,Q,X,!0);if(!K){u0(Z,q0);return}if(K.linewise){let{doc:q}=Z.state,W=q.lineAt(Y).number,G=q.lineAt(Math.max(0,Math.min(K.pos,q.length))).number,U=q.line(Math.min(W,G));if(l0(Z,U.from),MJ(Z,J,Math.abs(G-W)+1),J!=="c")u0(Z,q0);return}let I=K.inclusive?K.pos+1:K.pos;if(hK(Z,J,Y,I),J!=="c")u0(Z,q0)}var TL=new Set(["Enter","Backspace","Delete","Tab"]);function _L(Z,J,Q){let X=J.key,Y=Q.count?parseInt(Q.count,10):0;if(J.ctrlKey){if(X==="r")return _5(Z)||!0;if(X==="d")return t7(Z)||!0;if(X==="u")return E5(Z)||!0;if(X==="[")return u0(Z,q0),!0;return!1}if(X==="Escape")return u0(Z,q0),!0;if(TL.has(X)){if(X==="Enter"){let G=h5(Z,"j",Y,!1);if(G)l0(Z,t8(Z.state.doc.lineAt(G.pos)))}else if(X==="Backspace"){let G=h5(Z,"h",Y,!1);if(G)l0(Z,G.pos)}else if(X==="Delete")wK(Z,Y||1,!1);return u0(Z,q0),!0}if(X.length!==1)return!1;if(/[1-9]/.test(X)||X==="0"&&Q.count)return u0(Z,{count:Q.count+X}),!0;if(Q.pending==="g"){if(X==="g")if(Q.operator)ZO(Z,Q.operator,"gg",Y);else{let G=h5(Z,"gg",Y,!1);l0(Z,G.pos),u0(Z,q0)}else u0(Z,q0);return!0}if(X==="g")return u0(Z,{pending:"g"}),!0;if(Q.operator){if(X===Q.operator){if(MJ(Z,Q.operator,Y||1),Q.operator!=="c")u0(Z,q0)}else ZO(Z,Q.operator,X,Y);return!0}if(X==="d"||X==="c"||X==="y")return u0(Z,{operator:X}),!0;let K=h5(Z,X,Y,!1);if(K)return l0(Z,K.pos),u0(Z,q0),!0;let{doc:I}=Z.state,q=Z.state.selection.main.head,W=I.lineAt(q);switch(X){case"i":NJ(Z,q);break;case"a":NJ(Z,Math.min(q+1,W.to));break;case"I":NJ(Z,t8(W));break;case"A":NJ(Z,W.to);break;case"o":ej(Z,!0);break;case"O":ej(Z,!1);break;case"x":wK(Z,Y||1,!1);break;case"s":wK(Z,Y||1,!0);break;case"S":MJ(Z,"c",Y||1);break;case"D":hK(Z,"d",q,W.to);break;case"C":hK(Z,"c",q,W.to);break;case"Y":MJ(Z,"y",Y||1);break;case"p":tj(Z,!0,Y||1);break;case"P":tj(Z,!1,Y||1);break;case"J":SL(Z,Y||1);break;case"u":KJ(Z);break;default:break}return u0(Z,q0),!0}function EL(Z,J){let Q=J.state.field(J9,!1);if(!Q)return!1;if(Z.metaKey||Z.altKey)return!1;if(Z.key==="Shift"||Z.key==="Control")return!1;if(Z.key==="Alt"||Z.key==="Meta")return!1;if(Q.mode==="insert"){if(Z.key==="Escape"||Z.ctrlKey&&Z.key==="[")return BL(J),Z.preventDefault(),!0;return!1}if(!_L(J,Z,Q))return!1;return Z.preventDefault(),Z.stopPropagation(),!0}function CL(Z){let J=document.createElement("div");J.className="cm-vim-panel";let Q=(X)=>{let Y=X.field(J9,!1);if(!Y)return;let K=Y.count+(Y.operator??"")+Y.pending;J.textContent=(Y.mode==="insert"?"-- INSERT --":"-- NORMAL --")+(K?"  "+K:"")};return Q(Z.state),{dom:J,bottom:!0,update:(X)=>Q(X.state)}}var wL=[J9,K1.domEventHandlers({keydown:EL}),K1.inputHandler.of((Z)=>{let J=Z.state.field(J9,!1);return!!J&&J.mode!=="insert"}),K1.editorAttributes.compute([J9],(Z)=>{let J=Z.field(J9,!1);return J&&J.mode!=="insert"?{class:"cm-vim-normal"}:{}}),m7.of(CL)],hL=new Set(["as","assert","auto","case","const","delegate","derive","echo","else","fn","if","implement","import","let","macro","opaque","panic","pub","test","todo","type","use"]),kL=r8.define({name:"gleam",token(Z){if(Z.eatSpace())return null;if(Z.match("//"))return Z.skipToEnd(),"comment";if(Z.peek()==='"'){Z.next();let Q=!1;while(!Z.eol()){let X=Z.next();if(Q)Q=!1;else if(X==="\\")Q=!0;else if(X==='"')break}return"string"}if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9]*/))return"typeName";if(Z.match(/^[a-z_][a-z0-9_]*/))return hL.has(Z.current())?"keyword":"variableName";if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}#".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"//"},closeBrackets:{brackets:["(","[","{",'"']}}}),bL=new Set(["after","and","case","catch","cond","def","defdelegate","defexception","defguard","defimpl","defmacro","defmodule","defp","defprotocol","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","rescue","try","unless","unquote","use","when","with"]),xL=new Set(["true","false","nil"]),yL=r8.define({name:"elixir",token(Z){if(Z.eatSpace())return null;if(Z.match("#"))return Z.skipToEnd(),"comment";if(Z.match('"""')||Z.match("'''"))return Z.skipToEnd(),"string";if(Z.peek()==='"'||Z.peek()==="'"){let Q=Z.next(),X=!1;while(!Z.eol()){let Y=Z.next();if(X)X=!1;else if(Y==="\\")X=!0;else if(Y===Q)break}return"string"}if(Z.match(/^~[a-zA-Z]/)){let Q=Z.next(),X={"(":")","[":"]","{":"}","<":">"}[Q]??Q;while(!Z.eol()&&Z.next()!==X);return Z.match(/^[a-z]*/),"string"}if(Z.match(/^[@^][a-z_][A-Za-z0-9_]*/))return"variableName";if(Z.match(/^:"[^"]*"/)||Z.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/))return"atom";if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9_]*/))return"typeName";if(Z.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)){let Q=Z.current();if(bL.has(Q))return"keyword";if(xL.has(Q))return"atom";return"variableName"}if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("=>")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("===")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{",'"']}}}),gL=o7.define([{tag:m.keyword,color:"#bb9af7"},{tag:m.string,color:"#9ece6a"},{tag:m.comment,color:"#565f89",fontStyle:"italic"},{tag:m.number,color:"#ff9e64"},{tag:m.typeName,color:"#2ac3de"},{tag:m.variableName,color:"#c0caf5"},{tag:m.operator,color:"#89ddff"},{tag:m.bracket,color:"#a9b1d6"}]),fL=K1.theme({"&":{backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"var(--editor-font-size, 14px)",height:"100%"},".cm-content":{caretColor:"var(--accent)",fontFamily:"inherit",padding:"12px 0"},".cm-gutters":{backgroundColor:"var(--bg-secondary)",color:"var(--text-secondary)",border:"none",opacity:"0.7"},".cm-activeLine":{backgroundColor:"rgba(65, 72, 104, 0.3)"},".cm-activeLineGutter":{backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--bg-hover)"},".cm-cursor":{borderLeftColor:"var(--accent)"}},{dark:!0});function JO(Z){switch(Z){case"vim":return M4.highest(wL);case"emacs":return M4.highest(ML);default:return[]}}function QO(Z){switch(Z){case"python":return r8.define(aj);case"typescript":return r8.define(oj);case"elixir":return yL;default:return kL}}class XO extends HTMLElement{static observedAttributes=["keymap","language"];#Z=null;#I="";#X=[];#J=new u8;#Q=new u8;set doc(Z){if(this.#I=Z??"",this.#Z&&this.#Z.state.doc.toString()!==this.#I)this.#Z.dispatch({changes:{from:0,to:this.#Z.state.doc.length,insert:this.#I}})}get doc(){return this.#Z?this.#Z.state.doc.toString():this.#I}set diagnostics(Z){if(this.#X=Array.isArray(Z)?Z:[],this.#Z)this.#K()}get#Y(){return this.getAttribute("keymap")??"default"}get#q(){return this.getAttribute("language")??"gleam"}attributeChangedCallback(Z,J,Q){if(!this.#Z)return;switch(Z){case"keymap":this.#Z.dispatch({effects:this.#J.reconfigure(JO(this.#Y))});break;case"language":this.#Z.dispatch({effects:this.#Q.reconfigure(QO(this.#q))});break}}connectedCallback(){if(this.#Z)return;let Z=K1.updateListener.of((J)=>{if(J.docChanged)this.dispatchEvent(new CustomEvent("editor-change",{detail:{value:J.state.doc.toString()},bubbles:!0}))});if(this.#Z=new K1({state:L1.create({doc:this.#I,extensions:[this.#J.of(JO(this.#Y)),MV(),zj(),VV(),oV(),OV(),r7.of("  "),this.#Q.of(QO(this.#q)),sV(gL),fL,mZ.of([$j,...fj,...Oj]),Z]}),parent:this}),this.#X.length>0)this.#K()}disconnectedCallback(){this.#Z?.destroy(),this.#Z=null}#K(){let Z=this.#Z.state.doc,J=this.#X.flatMap((Q)=>{if(!Q||typeof Q.line!=="number")return[];let X=Z.line(Math.min(Math.max(Q.line,1),Z.lines)),Y=Math.min(X.from+Math.max((Q.column??1)-1,0),X.to),I=X.text.slice(Y-X.from).match(/^\S+/),q=Math.min(Y+(I?I[0].length:1),Z.length);return[{from:Y,to:Math.max(q,Math.min(Y+1,Z.length)),severity:"error",message:String(Q.message??"")}]});this.#Z.dispatch(vj(this.#Z.state,J))}}function kK(){if(!customElements.get("gleam-editor"))customElements.define("gleam-editor",XO)}class k5 extends P{constructor(Z,J,Q){super();this.line=Z,this.column=J,this.message=Q}}function YO(Z){return e1("gleam-editor",Z,$)}function KO(Z){return u9("doc",K0(Z))}function IO(Z){return l1("keymap",Z)}function qO(Z){return l1("language",Z)}function WO(Z){return u9("diagnostics",U4(Z,(J)=>{return w8(V([["line",m6(J.line)],["column",m6(J.column)],["message",K0(J.message)]]))}))}function GO(Z){return t9("editor-change",F7(V(["detail","value"]),w1,(J)=>{return k1(Z(J))}))}class Q9 extends P{}var K8=new Q9;class _4 extends P{}var b5=new _4;class AJ extends P{}var DJ=new AJ;class e6 extends P{constructor(Z,J,Q){super();this.category=Z,this.subcategory=J,this.title=Q}}class X9 extends P{}var $L=new X9;class LJ extends P{}var bK=new LJ;class Y9 extends P{}var zO=new Y9;class BJ extends P{constructor(Z){super();this[0]=Z}}class xK extends P{constructor(Z,J,Q,X){super();this.label=Z,this.expected=J,this.actual=Q,this.passed=X}}class yK extends P{constructor(Z,J,Q,X,Y){super();this.phase=Z,this.file=J,this.line=Q,this.column=X,this.message=Y}}class I8 extends P{constructor(Z){super();this[0]=Z}}class q8 extends P{constructor(Z){super();this[0]=Z}}class gK extends P{}var fK=new gK;class PJ extends P{}var K9=new PJ;class W8 extends P{constructor(Z){super();this.id=Z}}class G8 extends P{constructor(Z,J){super();this.outcome=Z,this.stdout=J}}class U8 extends P{}var SJ=new U8;class $K extends P{}var x5=new $K;class O1 extends P{constructor(Z,J,Q,X,Y,K,I,q,W,G,U,z,j,O,H,N,R,T,_){super();this.route=Z,this.selected_category=J,this.selected_subcategory=Q,this.selected=X,this.problem_index=Y,this.iteration_count=K,this.current_iteration=I,this.draft=q,this.revealed_solution=W,this.runtimes=G,this.run=U,this.drafts=z,this.attempts=j,this.search=O,this.next_run_id=H,this.editor_keymap=N,this.choice=R,this.graded=T,this.exam_answers=_}}class y5 extends P{constructor(Z){super();this[0]=Z}}class g5 extends P{constructor(Z){super();this[0]=Z}}class f5 extends P{constructor(Z){super();this[0]=Z}}class E4 extends P{constructor(Z){super();this[0]=Z}}class TJ extends P{}var VO=new TJ;class _J extends P{}var jO=new _J;class $5 extends P{constructor(Z){super();this[0]=Z}}class EJ extends P{}var OO=new EJ;class u5 extends P{}var FO=new u5;class n5 extends P{constructor(Z){super();this[0]=Z}}class I9 extends P{constructor(Z){super();this[0]=Z}}class CJ extends P{}var uK=new CJ;class v5 extends P{constructor(Z){super();this[0]=Z}}class m5 extends P{constructor(Z){super();this[0]=Z}}class q9 extends P{constructor(Z){super();this[0]=Z}}class wJ extends P{}var HO=new wJ;class p5 extends P{}var NO=new p5;class Z7 extends P{constructor(Z){super();this.language=Z}}class z8 extends P{constructor(Z,J){super();this.language=Z,this.message=J}}class W9 extends P{constructor(Z,J,Q){super();this.id=Z,this.outcome=J,this.stdout=Q}}class c5 extends P{constructor(Z){super();this.id=Z}}class d5 extends P{constructor(Z){super();this[0]=Z}}class hJ extends P{}var RO=new hJ;class kJ extends P{}var MO=new kJ;class bJ extends P{constructor(Z){super();this[0]=Z}}class nK extends P{}var AO=new nK;class DO extends P{constructor(Z,J,Q){super();this.section=Z,this.correct=J,this.total=Q}}var xJ=70;function V8(){return new O1(K8,U1,U1,$,0,3,1,"",U1,$,K9,$,$,"",1,"default",U1,!1,$)}function G9(Z,J){return Jq(Z,(Q)=>{if(S1(Q[0],J))return new D(Q[1]);else return new V1(void 0)})}function s5(Z,J){let Q=G9(Z.runtimes,J);if(Q instanceof D)return Q[0];else return $L}function g6(Z,J,Q){return w([J,Q],Q0(Z,(X)=>{return!S1(X[0],J)}))}function q6(Z){let J=Z.selected,Q=H3(J,Z.problem_index);return F3(Q)}function e8(Z,J){if(J===0)return J;else return x4(Z*100,J)}function LO(Z,J){let X=H1(J,(K)=>{let I=Q0(Z,(q)=>{return q[0].subcategory===K});return new DO(K,U7(I,(q)=>{return q[1]}),G0(I))}),Y=Q0(X,(K)=>{return K.total>0});return M3(Y,(K,I)=>{let q=wq(e8(K.correct,K.total),e8(I.correct,I.total));if(q instanceof L0)return Vq(K.section,I.section);else return q})}class yJ extends P{}var gJ=new yJ;class fJ extends P{}var $J=new fJ;class uJ extends P{}var BO=new uJ;class nJ extends P{}var PO=new nJ;class SO extends P{}var TO=new SO;class x extends P{constructor(Z,J,Q){super();this.signature=Z,this.starter=J,this.harness=Q}}class Q7 extends P{constructor(Z,J,Q){super();this.label=Z,this.note=J,this.code=Q}}class vK extends P{constructor(Z,J,Q,X){super();this.choices=Z,this.correct=J,this.explanation=Q,this.page=X}}class C4 extends P{constructor(Z,J,Q,X,Y,K,I){super();this.title=Z,this.prompt=J,this.approach=Q,this.solutions=X,this.language=Y,this.check=K,this.quiz=I}}class j0 extends P{constructor(Z,J){super();this.name=Z,this.problems=J}}class w4 extends P{constructor(Z,J){super();this.name=Z,this.subcategories=J}}function _O(Z){if(Z instanceof yJ)return"Python";else if(Z instanceof fJ)return"Gleam";else if(Z instanceof uJ)return"TypeScript";else if(Z instanceof nJ)return"Elixir";else return"Concept"}function l5(Z){if(Z instanceof yJ)return"python";else if(Z instanceof fJ)return"gleam";else if(Z instanceof uJ)return"typescript";else if(Z instanceof nJ)return"elixir";else return"concept"}function U9(Z){if(Z==="Contains Duplicate")return"A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n).";else if(Z==="Valid Anagram")return"A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative.";else if(Z==="Two Sum")return"A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n²).";else if(Z==="Group Anagrams")return"A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups.";else if(Z==="Top K Frequent Elements")return"Count, then select. Build a value-to-frequency map first; then pick the k largest counts — sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n.";else if(Z==="Encode and Decode Strings")return"A framing problem rather than a string problem. Any encoding is legal so long as decode undoes it, so the only real question is how the decoder knows where each string ends. Length-prefixing answers it outright — read a number, take that many characters — and needs no assumption about what the strings contain. A separator works too, but only with escaping. Either way the encoding has to tell an empty list apart from a list holding one empty string.";else if(Z==="Product of Array Except Self")return"A prefix/suffix problem. The answer at position i is (product of everything before i) × (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise — no division needed.";else if(Z==="Valid Sudoku")return"Three constraints, checked together. A digit is illegal if it repeats within its row, its column, or its 3×3 box, so either carry one set of (value, unit) signatures and test all three as you walk, or gather the 27 units and check each for a repeat. Only filled cells matter: the board does not have to be solvable, only consistent.";else if(Z==="Longest Consecutive Sequence")return"A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk.";else if(Z==="Valid Palindrome")return"Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse — same complexity, pick whichever reads better in your language.";else if(Z==="Two Sum II - Input Array Is Sorted")return"A two-pointer convergence problem — the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory.";else if(Z==="3Sum")return"Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip.";else if(Z==="Container With Most Water")return"Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help — always move the shorter one inwards and track the best area seen.";else if(Z==="Trapping Rain Water")return"Ask what sits above one position, not how the pools are shaped. The water at index i is min(tallest to the left, tallest to the right) minus height[i]. Computing both running maxima and summing is the direct reading; the two-pointer version gets there in one pass by always advancing the shorter side, where the near maximum alone already fixes the water level.";else if(Z==="Best Time to Buy and Sell Stock")return"A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables.";else if(Z==="Longest Substring Without Repeating Characters")return"A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen.";else if(Z==="Longest Repeating Character Replacement")return"A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window.";else if(Z==="Permutation in String")return"A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies — slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps.";else if(Z==="Minimum Window Substring")return'A sliding window that grows until it is valid and shrinks while it stays valid. The whole trick is making "valid" a single integer test rather than a map comparison: count how many needed characters are still missing, decrement only when a character that was genuinely still needed arrives, and the window is valid exactly when that count hits zero. Then pull the left edge in as far as it will go before growing again.';else if(Z==="Sliding Window Maximum")return"The maximum is not something you can maintain by adding and removing — dropping the current maximum leaves you with no idea what the next one is. Two ways out: keep a queue of the indices that could still win, values decreasing, so the front is always the answer; or pre-compute running maxima within blocks of k, since every window straddles at most one block boundary. Both are O(n).";else if(Z==="Valid Parentheses")return"A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack.";else if(Z==="Min Stack")return"Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1).";else if(Z==="Daily Temperatures")return"A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry — the popped days just found their warmer day — then pushes itself.";else if(Z==="Evaluate Reverse Polish Notation")return"Postfix notation exists so that a stack can evaluate it without any parsing. Push numbers; on an operator, pop two, apply, push the result. Two things to get right: the value popped first is the *right* operand, and the division truncates towards zero rather than flooring, which matters as soon as a negative appears.";else if(Z==="Generate Parentheses")return'Build only what is valid rather than filtering afterwards. Backtracking with two counters gets there — an opener is legal while any are left, a closer only while more are outstanding than openers — and so does composition: every balanced string is "(" A ")" B for one split, so enumerating splits enumerates the answers. The count is the nth Catalan number.';else if(Z==="Car Fleet")return"Order by position, then think about time. A car catches the one ahead exactly when it would arrive no later, and a fleet moves at the speed of its slowest member, so walking from the front and carrying the arrival time of the fleet ahead is enough: anything slower to arrive starts a new fleet. Compare times cross-multiplied to stay in integers.";else if(Z==="Largest Rectangle in Histogram")return"Every rectangle is some bar taken as far left and right as it will go, so the question is where each bar stops fitting. A monotonic stack answers both boundaries in one pass: a shorter bar arriving closes off every taller entry — that is its right edge — and the position the closed entries reached back to becomes the new bar's left edge.";else if(Z==="Binary Search")return"The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step.";else if(Z==="Search a 2D Matrix")return"The rows are sorted and do not overlap, so the whole matrix is one sorted sequence wearing a grid costume — halve to the row a value could be in, then halve within it, or index the grid as if it were flat. The staircase walk from the top-right is the other answer: every step rules out a whole row or a whole column, and it does not need the non-overlap.";else if(Z==="Koko Eating Bananas")return'Binary search on the answer rather than on the input. The speeds run from 1 to the largest pile, and "can she finish in h hours at this speed?" is monotone — true for a speed means true for every faster one — so the smallest speed that works is a boundary you can halve towards. The check itself is a sum of ceil(pile / speed), because piles are never combined within an hour.';else if(Z==="Time Based Key-Value Store")return`A map from key to that key's history, and a binary search inside it. Timestamps only ever increase, so appending keeps each history sorted without any sorting; the lookup is then "the newest entry at or before this time", which is the standard predecessor search — keep the candidate and keep looking on the newer side for a better one.`;else if(Z==="Median of Two Sorted Arrays")return"The O(log) answer does not look for the median at all: it looks for a cut through both arrays with exactly half the elements to its left, which is correct when both left-hand values are no bigger than both right-hand values. That condition is monotone in where you cut the shorter array, so halve on the cut position. Merging until the middle is the O(m + n) version, and worth writing first.";else if(Z==="Find Minimum in Rotated Sorted Array")return"Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point — and the minimum — hides in the unsorted half.";else if(Z==="Search in Rotated Sorted Array")return"Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it — recurse into that half or the other.";else if(Z==="Pattern matching on lists")return"In Gleam a list is either [] or [head, ..tail] — every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail.";else if(Z==="Tail recursion with accumulators")return"The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop — no stack growth.";else if(Z==="fold is the loop")return"Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values.";else if(Z==="Frequency maps with dict.upsert")return"dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside.";else if(Z==="Result chains with use")return"use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results.";else if(Z==="Option ergonomics")return"Chains of option.map / option.unwrap / option.from_result express “use it if present, fall back if not” without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value.";else if(Z==="String prefix patterns and graphemes")return'Gleam can pattern-match string prefixes directly: "# " <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions.';else if(Z==="Pipelines")return"The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline.";else if(Z==="Records: labelled args and update syntax")return"Records are immutable: construction uses labelled arguments, and “modifying” one is Record(..old, field: new) — a copy with some fields swapped. Updates return the new record; nothing changes in place.";else if(Z==="gleam/set for membership and dedupe")return"Membership questions want a set, not a list — contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new.";else if(Z==="Counter for frequency maps")return"collections.Counter is the counting idiom: feed it any iterable and it's a dict of value → count, with missing keys reading as 0 and most_common(k) giving the top k — no manual dict bookkeeping.";else if(Z==="defaultdict for grouping")return"collections.defaultdict removes the “is the key there yet?” dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership.";else if(Z==="deque for O(1) popleft")return"Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm — breadth-first search above all — wants a deque: append to the right, popleft from the left.";else if(Z==="heapq for min/max heaps")return"heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap — negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection.";else if(Z==="Enumerate, zip, and unpacking")return"enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly — between them, almost no loop needs range(len(...)).";else if(Z==="Slicing and reversal")return"Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate — every slice is a new sequence.";else if(Z==="Sorting with a key")return"sort/sorted take a key function that maps each element to what it should be compared by — len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list.";else if(Z==="Building strings efficiently")return"Strings are immutable, so building one with += in a loop re-copies everything each time — O(n²). Collect the pieces in a list and ''.join(parts) once at the end for O(n).";else return""}class y extends P{constructor(Z,J){super();this.solutions=Z,this.check=J}}function uL(){return new y(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`import gleam/set

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
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`import gleam/int
import gleam/list

pub fn contains_duplicate(nums: List(Int)) -> Bool {
  nums
  |> list.sort(int.compare)
  |> has_adjacent_pair
}

fn has_adjacent_pair(sorted: List(Int)) -> Bool {
  case sorted {
    [a, b, ..] if a == b -> True
    [_, ..rest] -> has_adjacent_pair(rest)
    [] -> False
  }
}`]]),new x("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
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
}`))}function nL(){return new y(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`import gleam/dict
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
}`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`import gleam/list
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  sorted(s) == sorted(t)
}

/// Two words are anagrams exactly when their sorted letters match — no counts,
/// no dictionary, at the cost of O(n log n) instead of O(n).
fn sorted(word: String) -> List(String) {
  word
  |> string.to_graphemes
  |> list.sort(string.compare)
}`]]),new x("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
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
}`))}function vL(){return new y(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`import gleam/dict

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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`import gleam/list

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  outer(nums, target, 0)
}

fn outer(nums: List(Int), target: Int, i: Int) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case inner(rest, target - n, i + 1) {
        Ok(j) -> Ok(#(i, j))
        Error(Nil) -> outer(rest, target, i + 1)
      }
  }
}

fn inner(nums: List(Int), needed: Int, j: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, offset) {
    case found, n == needed {
      Error(Nil), True -> Ok(j + offset)
      _, _ -> found
    }
  })
}`],["Solution 3 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  // Sorting loses the original positions, so carry them along.
  let sorted =
    nums
    |> list.index_map(fn(n, i) { #(n, i) })
    |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  converge(sorted, list.reverse(sorted), list.length(sorted), target)
}

/// Walk one pointer in from each end: too small means the low end must rise,
/// too large means the high end must fall.
fn converge(
  from_left: List(#(Int, Int)),
  from_right: List(#(Int, Int)),
  remaining: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case remaining < 2 {
    True -> Error(Nil)
    False ->
      case from_left, from_right {
        [#(low, i), ..left_rest], [#(high, j), ..right_rest] ->
          case int.compare(low + high, target) {
            order.Eq -> Ok(#(int.min(i, j), int.max(i, j)))
            order.Lt -> converge(left_rest, from_right, remaining - 1, target)
            order.Gt -> converge(from_left, right_rest, remaining - 1, target)
          }
        _, _ -> Error(Nil)
      }
  }
}`]]),new x("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
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
}`))}function mL(){return new y(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`import gleam/dict
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
}`],["Solution 2 · Count key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

A letter tally is anagram-invariant too, and costs O(len) to build rather than O(len log len).`,`import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    dict.upsert(acc, signature(s), fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}

/// An "a1c2t1" tally rather than a sorted copy of the word. Same grouping, but
/// the cost is proportional to the alphabet used instead of the word length.
fn signature(word: String) -> String {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
  |> list.map(fn(entry) { entry.0 <> int.to_string(entry.1) })
  |> string.concat
}`]]),new x("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
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
}`))}function pL(){return new y(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`import gleam/dict
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
}`],["Solution 2 · Bucket sort","A count can never exceed the input length, so one bucket per frequency covers every possibility. Reading the buckets downwards gives the answer in O(n) and replaces the comparison sort entirely.",`import gleam/dict
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  let counts =
    list.fold(nums, dict.new(), fn(acc, n) {
      dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
    })

  // A count can never exceed the input length, so one bucket per possible
  // frequency covers everything. Reading the buckets from the top down gives
  // the answer without ever comparison-sorting the counts.
  let buckets =
    dict.fold(counts, dict.new(), fn(acc, n, count) {
      dict.upsert(acc, count, fn(members) {
        case members {
          option.Some(existing) -> [n, ..existing]
          option.None -> [n]
        }
      })
    })

  countdown(list.length(nums), [])
  |> list.flat_map(fn(frequency) {
    case dict.get(buckets, frequency) {
      Ok(members) -> list.reverse(members)
      Error(Nil) -> []
    }
  })
  |> list.take(k)
}

/// [highest, highest - 1, ..., 1] — the bucket indices, read most frequent
/// first.
fn countdown(highest: Int, acc: List(Int)) -> List(Int) {
  case highest < 1 {
    True -> list.reverse(acc)
    False -> countdown(highest - 1, [highest, ..acc])
  }
}`]]),new x("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
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
}`))}function cL(){return new y(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`import gleam/list

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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`import gleam/list

pub fn product_except_self(nums: List(Int)) -> List(Int) {
  list.index_map(nums, fn(_, i) {
    list.index_fold(nums, 1, fn(product, n, j) {
      case i == j {
        True -> product
        False -> product * n
      }
    })
  })
}`]]),new x("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
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
}`))}function dL(){return new y(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`import gleam/int
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
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`import gleam/int
import gleam/list

pub fn longest_consecutive(nums: List(Int)) -> Int {
  case list.sort(nums, int.compare) {
    [] -> 0
    [first, ..rest] -> scan(rest, first, 1, 1)
  }
}

fn scan(nums: List(Int), previous: Int, run: Int, best: Int) -> Int {
  case nums {
    [] -> best
    [n, ..rest] ->
      case n - previous {
        // Duplicates neither extend nor break a run.
        0 -> scan(rest, previous, run, best)
        1 -> scan(rest, n, run + 1, int.max(best, run + 1))
        _ -> scan(rest, n, 1, best)
      }
  }
}`]]),new x("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
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
}`))}function sL(){return new y(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`import gleam/list
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
}`],["Solution 2 · Two pointers","Compare inwards from both ends, skipping anything that is not alphanumeric as you go. No second string is built.",`import gleam/list
import gleam/string

pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  converge(cleaned, list.reverse(cleaned), list.length(cleaned) / 2)
}

/// Walks the sequence and its reverse together — the closest a linked list
/// gets to converging index pointers.
fn converge(
  from_front: List(String),
  from_back: List(String),
  remaining: Int,
) -> Bool {
  case remaining <= 0 {
    True -> True
    False ->
      case from_front, from_back {
        [a, ..front], [b, ..back] ->
          a == b && converge(front, back, remaining - 1)
        _, _ -> True
      }
  }
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
}`]]),new x("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
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
}`))}function lL(){return new y(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`import gleam/int
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
}`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`import gleam/int
import gleam/list
import gleam/order

pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  walk(numbers, 1, target)
}

fn walk(numbers: List(Int), index: Int, target: Int) -> Result(#(Int, Int), Nil) {
  case numbers {
    [] -> Error(Nil)
    [n, ..rest] ->
      case binary_search(rest, target - n, index + 1) {
        Ok(partner) -> Ok(#(index, partner))
        Error(Nil) -> walk(rest, index + 1, target)
      }
  }
}

/// Positions are 1-based, and the tail starts at \`offset\`.
fn binary_search(
  numbers: List(Int),
  wanted: Int,
  offset: Int,
) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(numbers) / 2
      let #(left, right) = list.split(numbers, half)
      case right {
        [mid, ..after] ->
          case int.compare(wanted, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> binary_search(left, wanted, offset)
            order.Gt -> binary_search(after, wanted, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`]]),new x(`pub fn two_sum_sorted(
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
}`))}function iL(){return new y(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`import gleam/int
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`import gleam/int
import gleam/list

pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  list.sort(nums, int.compare)
  |> triples([])
  |> list.reverse
  |> list.unique
}

fn triples(
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [a, ..rest] -> triples(rest, with_first(a, rest, acc))
  }
}

fn with_first(
  a: Int,
  nums: List(Int),
  acc: List(#(Int, Int, Int)),
) -> List(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [b, ..rest] ->
      with_first(
        a,
        rest,
        list.fold(rest, acc, fn(found, c) {
          case a + b + c == 0 {
            True -> [#(a, b, c), ..found]
            False -> found
          }
        }),
      )
  }
}`]]),new x("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
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
}`))}function rL(){return new y(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`import gleam/int
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(height, i) { #(i, height) })
  list.fold(indexed, 0, fn(best, left) {
    list.fold(indexed, best, fn(best, right) {
      case right.0 > left.0 {
        True -> int.max(best, int.min(left.1, right.1) * { right.0 - left.0 })
        False -> best
      }
    })
  })
}`]]),new x("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
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
}`))}function aL(){return new y(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`import gleam/int
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [buy, ..later] -> int.max(best_sale(buy, later), max_profit(later))
  }
}

fn best_sale(buy: Int, later: List(Int)) -> Int {
  list.fold(later, 0, fn(best, sell) { int.max(best, sell - buy) })
}`]]),new x("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
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
}`))}function oL(){return new y(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`import gleam/dict
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
}`],["Solution 2 · Shrinking window","The window itself is the bookkeeping: on a repeat, drop everything up to and including the earlier copy. No last-seen map at all, at the cost of scanning the window on each repeat.",`import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
  string.to_graphemes(s)
  |> list.fold(#([], 0), fn(acc, g) {
    let #(window, best) = acc
    let window = case list.contains(window, g) {
      True -> drop_through(window, g)
      False -> window
    }
    let window = list.append(window, [g])
    #(window, int.max(best, list.length(window)))
  })
  |> fn(state) { state.1 }
}

fn drop_through(window: List(String), g: String) -> List(String) {
  case window {
    [] -> []
    [first, ..rest] ->
      case first == g {
        True -> rest
        False -> drop_through(rest, g)
      }
  }
}`]]),new x("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
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
}`))}function tL(){return new y(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`import gleam/dict
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
}`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`import gleam/int
import gleam/list
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
  let graphemes = string.to_graphemes(s)
  graphemes
  |> list.unique
  |> list.fold(0, fn(best, target) {
    int.max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k))
  })
}

/// \`from_left\` is the window's left edge, \`upcoming\` its right; \`others\` counts
/// the characters inside it that are not \`target\` and would need replacing.
fn sweep(
  from_left: List(String),
  upcoming: List(String),
  size: Int,
  others: Int,
  best: Int,
  target: String,
  k: Int,
) -> Int {
  case upcoming {
    [] -> best
    [g, ..rest] -> {
      let others = case g == target {
        True -> others
        False -> others + 1
      }
      let #(from_left, size, others) =
        shrink(from_left, size + 1, others, target, k)
      sweep(from_left, rest, size, others, int.max(best, size), target, k)
    }
  }
}

fn shrink(
  from_left: List(String),
  size: Int,
  others: Int,
  target: String,
  k: Int,
) -> #(List(String), Int, Int) {
  case others > k, from_left {
    True, [oldest, ..rest] ->
      shrink(
        rest,
        size - 1,
        case oldest == target {
          True -> others
          False -> others - 1
        },
        target,
        k,
      )
    _, _ -> #(from_left, size, others)
  }
}`]]),new x("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
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
}`))}function eL(){return new y(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`import gleam/dict
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
}`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`import gleam/list
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle =
    string.to_graphemes(s1)
    |> list.sort(string.compare)
  case needle {
    [] -> True
    _ -> windows(string.to_graphemes(s2), list.length(needle), needle)
  }
}

fn windows(haystack: List(String), size: Int, needle: List(String)) -> Bool {
  case list.length(haystack) < size {
    True -> False
    False ->
      case list.sort(list.take(haystack, size), string.compare) == needle {
        True -> True
        False -> windows(list.drop(haystack, 1), size, needle)
      }
  }
}`]]),new x("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
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
}`))}function ZB(){return new y(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`import gleam/string

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
}`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`import gleam/string

pub fn is_valid(s: String) -> Bool {
  reduce(s) == ""
}

fn reduce(s: String) -> String {
  let smaller =
    s
    |> string.replace("()", "")
    |> string.replace("[]", "")
    |> string.replace("{}", "")
  case smaller == s {
    True -> s
    False -> reduce(smaller)
  }
}`]]),new x("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
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
}`))}function JB(){return new y(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`import gleam/int

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
}`],["Solution 2 · Two stacks","Values in one stack, running minimums in a parallel one. The two concerns stay separate, which is what makes adding a max stack a copy-paste.",`import gleam/int

/// Values in one stack, the running minimum in a parallel one. Same O(1)
/// get_min as pairing each value with its minimum, but the two concerns stay
/// separate — which is easier to extend to a max stack, a sum stack, and so on.
pub type MinStack {
  MinStack(values: List(Int), minimums: List(Int))
}

pub fn new() -> MinStack {
  MinStack([], [])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let minimums = case stack.minimums {
    [current, ..] -> [int.min(value, current), ..stack.minimums]
    [] -> [value]
  }
  MinStack([value, ..stack.values], minimums)
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.values, stack.minimums {
    [_, ..values], [_, ..minimums] -> MinStack(values, minimums)
    _, _ -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.values {
    [value, ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.minimums {
    [minimum, ..] -> Ok(minimum)
    [] -> Error(Nil)
  }
}`]]),new x(`pub type MinStack {
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
}`))}function QB(){return new y(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`import gleam/dict
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
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`import gleam/list

pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  list.index_map(temps, fn(temp, i) {
    days_until_warmer(list.drop(temps, i + 1), temp, 1)
  })
}

fn days_until_warmer(later: List(Int), temp: Int, days: Int) -> Int {
  case later {
    [] -> 0
    [next, ..rest] ->
      case next > temp {
        True -> days
        False -> days_until_warmer(rest, temp, days + 1)
      }
  }
}`]]),new x("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
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
}`))}function XB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`import gleam/int
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
}`],["Solution 2 · First match scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A plain indexed scan. O(n), so it fails the stated requirement — but it is what the halving has to beat, and it shows exactly what the sortedness buys.`,`import gleam/list

pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}`]]),new x("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function YB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`import gleam/int
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
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(scan(rest, first, first))
  }
}

fn scan(nums: List(Int), previous: Int, head: Int) -> Int {
  case nums {
    [] -> head
    [n, ..rest] ->
      case n < previous {
        True -> n
        False -> scan(rest, n, head)
      }
  }
}`]]),new x("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`))}function KB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`import gleam/list
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
}`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`import gleam/int
import gleam/list
import gleam/order

pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  let pivot = rotation_point(nums)
  let #(left, right) = list.split(nums, pivot)
  case binary_search(left, target, 0) {
    Ok(index) -> Ok(index)
    Error(Nil) -> binary_search(right, target, pivot)
  }
}

/// Index of the smallest element — 0 when the array was never rotated.
fn rotation_point(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    [first, ..rest] -> walk(rest, first, 1)
  }
}

fn walk(nums: List(Int), previous: Int, index: Int) -> Int {
  case nums {
    [] -> 0
    [n, ..rest] ->
      case n < previous {
        True -> index
        False -> walk(rest, n, index + 1)
      }
  }
}

fn binary_search(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> binary_search(left, target, offset)
            order.Gt -> binary_search(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}`]]),new x("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function IB(){return new y(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`import gleam/int
import gleam/list
import gleam/string

pub fn encode(strs: List(String)) -> String {
  strs
  |> list.map(fn(s) { int.to_string(string.length(s)) <> "#" <> s })
  |> string.concat
}

pub fn decode(s: String) -> List(String) {
  read(s, [])
}

fn read(rest: String, acc: List(String)) -> List(String) {
  case string.split_once(rest, "#") {
    Error(Nil) -> list.reverse(acc)
    Ok(#(digits, tail)) ->
      case int.parse(digits) {
        Error(Nil) -> list.reverse(acc)
        Ok(length) ->
          read(string.drop_start(tail, length), [
            string.slice(tail, 0, length),
            ..acc
          ])
      }
  }
}`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`import gleam/list
import gleam/string

const separator = "|"

const escape = "\\\\"

pub fn encode(strs: List(String)) -> String {
  strs
  |> list.map(fn(s) {
    separator
    <> s
    |> string.replace(escape, escape <> escape)
    |> string.replace(separator, escape <> separator)
  })
  |> string.concat
}

pub fn decode(s: String) -> List(String) {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  case string.to_graphemes(s) {
    [] -> []
    [first, ..rest] if first == separator -> unescape(rest, "", [])
    _ -> []
  }
}

fn unescape(
  graphemes: List(String),
  current: String,
  acc: List(String),
) -> List(String) {
  case graphemes {
    [] -> list.reverse([current, ..acc])
    [first, escaped, ..rest] if first == escape ->
      unescape(rest, current <> escaped, acc)
    [first, ..rest] if first == separator -> unescape(rest, "", [current, ..acc])
    [g, ..rest] -> unescape(rest, current <> g, acc)
  }
}`]]),new x(`pub fn encode(strs: List(String)) -> String

pub fn decode(s: String) -> List(String)`,`pub fn encode(strs: List(String)) -> String {
  todo
}

pub fn decode(s: String) -> List(String) {
  todo
}`,`import gleam/string
import solution

/// Only the round trip is specified: any encoding is fine as long as decode
/// undoes it, so every case runs both directions.
fn round_trip(strs: List(String)) -> List(String) {
  solution.decode(solution.encode(strs))
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "decode(encode([\\"neet\\", \\"code\\", \\"love\\", \\"you\\"]))",
      string.inspect(["neet", "code", "love", "you"]),
      string.inspect(round_trip(["neet", "code", "love", "you"])),
    ),
    #("decode(encode([]))", string.inspect([]), string.inspect(round_trip([]))),
    #(
      "decode(encode([\\"\\", \\"\\"]))",
      string.inspect(["", ""]),
      string.inspect(round_trip(["", ""])),
    ),
    #(
      "decode(encode([\\"3#x\\", \\"a|b\\"]))",
      string.inspect(["3#x", "a|b"]),
      string.inspect(round_trip(["3#x", "a|b"])),
    ),
    #(
      "decode(encode([\\"\\\\\\\\\\", \\"|\\", \\"#\\"]))",
      string.inspect(["\\\\", "|", "#"]),
      string.inspect(round_trip(["\\\\", "|", "#"])),
    ),
  ]
}`))}function qB(){return new y(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`import gleam/int
import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> filled_cells
  |> walk(set.new())
}

fn filled_cells(board: List(List(String))) -> List(#(Int, Int, String)) {
  board
  |> list.index_map(fn(row, r) {
    row
    |> list.index_map(fn(value, c) { #(r, c, value) })
    |> list.filter(fn(cell) { cell.2 != "." })
  })
  |> list.flatten
}

fn walk(cells: List(#(Int, Int, String)), seen: set.Set(String)) -> Bool {
  case cells {
    [] -> True
    [#(r, c, value), ..rest] -> {
      let keys = [
        value <> " row " <> int.to_string(r),
        value <> " col " <> int.to_string(c),
        value <> " box " <> int.to_string(r / 3 * 3 + c / 3),
      ]
      case list.any(keys, set.contains(seen, _)) {
        True -> False
        False -> walk(rest, list.fold(keys, seen, set.insert))
      }
    }
  }
}`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`import gleam/list
import gleam/set

pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  board
  |> units
  |> list.all(no_duplicates)
}

fn units(board: List(List(String))) -> List(List(String)) {
  list.flatten([board, list.transpose(board), boxes(board)])
}

fn boxes(board: List(List(String))) -> List(List(String)) {
  board
  |> list.sized_chunk(3)
  |> list.flat_map(fn(band) {
    band
    |> list.map(list.sized_chunk(_, 3))
    |> list.transpose
    |> list.map(list.flatten)
  })
}

fn no_duplicates(unit: List(String)) -> Bool {
  let filled = list.filter(unit, fn(value) { value != "." })
  list.length(filled) == set.size(set.from_list(filled))
}`]]),new x("pub fn is_valid_sudoku(board: List(List(String))) -> Bool",`pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Nine row strings rather than a 9x9 literal: the board stays readable, and a
/// single changed cell is what each invalid case is.
const rows = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79",
]

fn board() -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

fn with_cell(r: Int, c: Int, value: String) -> List(List(String)) {
  board()
  |> list.index_map(fn(row, i) {
    case i == r {
      False -> row
      True ->
        list.index_map(row, fn(cell, j) {
          case j == c {
            True -> value
            False -> cell
          }
        })
    }
  })
}

fn empty() -> List(List(String)) {
  list.repeat(list.repeat(".", 9), 9)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_valid_sudoku(valid board)",
      string.inspect(True),
      string.inspect(solution.is_valid_sudoku(board())),
    ),
    #(
      "is_valid_sudoku(5 twice in row 0)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(0, 2, "5"))),
    ),
    #(
      "is_valid_sudoku(5 twice in column 0, different boxes)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(3, 0, "5"))),
    ),
    #(
      "is_valid_sudoku(3 twice in the top-left box only)",
      string.inspect(False),
      string.inspect(solution.is_valid_sudoku(with_cell(2, 0, "3"))),
    ),
    #(
      "is_valid_sudoku(empty board)",
      string.inspect(True),
      string.inspect(solution.is_valid_sudoku(empty())),
    ),
  ]
}`))}function WB(){return new y(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`import gleam/int
import gleam/list

pub fn trap(height: List(Int)) -> Int {
  walk(height, list.reverse(height), list.length(height) - 1, 0, 0, 0)
}

/// The two pointers are the list read from the front and the list read from the
/// back; \`remaining\` stands in for "left < right", since neither end knows
/// where the other has got to.
fn walk(
  front: List(Int),
  back: List(Int),
  remaining: Int,
  left_max: Int,
  right_max: Int,
  total: Int,
) -> Int {
  case remaining <= 0, front, back {
    False, [l, ..front_rest], [r, ..back_rest] ->
      case l < r {
        True -> {
          let left_max = int.max(left_max, l)
          walk(
            front_rest,
            back,
            remaining - 1,
            left_max,
            right_max,
            total + left_max - l,
          )
        }
        False -> {
          let right_max = int.max(right_max, r)
          walk(
            front,
            back_rest,
            remaining - 1,
            left_max,
            right_max,
            total + right_max - r,
          )
        }
      }
    _, _, _ -> total
  }
}`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`import gleam/int
import gleam/list

pub fn trap(height: List(Int)) -> Int {
  let left = running_max(height)
  let right =
    height
    |> list.reverse
    |> running_max
    |> list.reverse

  list.zip(list.zip(left, right), height)
  |> list.map(fn(cell) {
    let #(#(l, r), h) = cell
    int.min(l, r) - h
  })
  |> int.sum
}

fn running_max(values: List(Int)) -> List(Int) {
  list.scan(values, 0, int.max)
}`]]),new x("pub fn trap(height: List(Int)) -> Int",`pub fn trap(height: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])",
      string.inspect(6),
      string.inspect(solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])),
    ),
    #(
      "trap([4, 2, 0, 3, 2, 5])",
      string.inspect(9),
      string.inspect(solution.trap([4, 2, 0, 3, 2, 5])),
    ),
    #("trap([])", string.inspect(0), string.inspect(solution.trap([]))),
    #("trap([3])", string.inspect(0), string.inspect(solution.trap([3]))),
    #(
      "trap([2, 0, 2])",
      string.inspect(2),
      string.inspect(solution.trap([2, 0, 2])),
    ),
    #(
      "trap([5, 4, 3, 2, 1])",
      string.inspect(0),
      string.inspect(solution.trap([5, 4, 3, 2, 1])),
    ),
  ]
}`))}function GB(){return new y(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let graphemes = string.to_graphemes(s)
      let need =
        list.fold(string.to_graphemes(t), dict.new(), fn(counts, c) {
          dict.insert(counts, c, count(counts, c) + 1)
        })
      let #(start, length) =
        scan(graphemes, 0, graphemes, 0, need, string.length(t), #(0, 0))
      string.slice(s, start, length)
    }
  }
}

/// The window is the gap between two views of the same list: \`right\` is what
/// has not been taken in yet, \`left\` is everything from the window's start
/// onwards. Advancing either end is one list head, and the indices are carried
/// alongside because the answer is a slice.
fn scan(
  right: List(String),
  right_index: Int,
  left: List(String),
  left_index: Int,
  counts: Dict(String, Int),
  missing: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case missing == 0 {
    True ->
      case left {
        [] -> best
        [c, ..left_rest] -> {
          let length = right_index - left_index
          let best = case best.1 == 0 || length < best.1 {
            True -> #(left_index, length)
            False -> best
          }
          let raised = count(counts, c) + 1
          scan(
            right,
            right_index,
            left_rest,
            left_index + 1,
            dict.insert(counts, c, raised),
            case raised > 0 {
              True -> missing + 1
              False -> missing
            },
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [c, ..right_rest] -> {
          let current = count(counts, c)
          scan(
            right_rest,
            right_index + 1,
            left,
            left_index,
            dict.insert(counts, c, current - 1),
            case current > 0 {
              True -> missing - 1
              False -> missing
            },
            best,
          )
        }
      }
  }
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`import gleam/dict.{type Dict}
import gleam/list
import gleam/string

pub fn min_window(s: String, t: String) -> String {
  case t == "" || s == "" {
    True -> ""
    False -> {
      let need = tally(string.to_graphemes(t))
      // Only the positions that could possibly matter. For a long haystack and
      // a short needle this is a far shorter walk than the whole string.
      let positions =
        string.to_graphemes(s)
        |> list.index_map(fn(c, i) { #(i, c) })
        |> list.filter(fn(entry) { dict.has_key(need, entry.1) })

      case
        scan(positions, positions, need, dict.new(), 0, dict.size(need), -1, #(
          0,
          0,
        ))
      {
        #(_, 0) -> ""
        #(start, length) -> string.slice(s, start, length)
      }
    }
  }
}

/// Counts how many of the needle's distinct characters are fully covered,
/// rather than how many characters are still missing. Same window, different
/// bookkeeping: \`satisfied\` only moves when a count crosses its requirement.
fn scan(
  right: List(#(Int, String)),
  left: List(#(Int, String)),
  need: Dict(String, Int),
  window: Dict(String, Int),
  satisfied: Int,
  distinct: Int,
  last_index: Int,
  best: #(Int, Int),
) -> #(Int, Int) {
  case satisfied == distinct {
    True ->
      case left {
        [] -> best
        [#(start, c), ..left_rest] -> {
          let length = last_index - start + 1
          let best = case best.1 == 0 || length < best.1 {
            True -> #(start, length)
            False -> best
          }
          let lowered = count(window, c) - 1
          scan(
            right,
            left_rest,
            need,
            dict.insert(window, c, lowered),
            case lowered < count(need, c) {
              True -> satisfied - 1
              False -> satisfied
            },
            distinct,
            last_index,
            best,
          )
        }
      }
    False ->
      case right {
        [] -> best
        [#(index, c), ..right_rest] -> {
          let raised = count(window, c) + 1
          scan(
            right_rest,
            left,
            need,
            dict.insert(window, c, raised),
            case raised == count(need, c) {
              True -> satisfied + 1
              False -> satisfied
            },
            distinct,
            index,
            best,
          )
        }
      }
  }
}

fn tally(graphemes: List(String)) -> Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(counts, c) {
    dict.insert(counts, c, count(counts, c) + 1)
  })
}

fn count(counts: Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}`]]),new x("pub fn min_window(s: String, t: String) -> String",`pub fn min_window(s: String, t: String) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_window(\\"ADOBECODEBANC\\", \\"ABC\\")",
      string.inspect("BANC"),
      string.inspect(solution.min_window("ADOBECODEBANC", "ABC")),
    ),
    #(
      "min_window(\\"a\\", \\"a\\")",
      string.inspect("a"),
      string.inspect(solution.min_window("a", "a")),
    ),
    #(
      "min_window(\\"a\\", \\"aa\\")",
      string.inspect(""),
      string.inspect(solution.min_window("a", "aa")),
    ),
    #(
      "min_window(\\"\\", \\"a\\")",
      string.inspect(""),
      string.inspect(solution.min_window("", "a")),
    ),
    #(
      "min_window(\\"ab\\", \\"\\")",
      string.inspect(""),
      string.inspect(solution.min_window("ab", "")),
    ),
    #(
      "min_window(\\"aaflslflsldkalskaaa\\", \\"aaa\\")",
      string.inspect("aaa"),
      string.inspect(solution.min_window("aaflslflsldkalskaaa", "aaa")),
    ),
  ]
}`))}function UB(){return new y(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> {
      let blocks = list.sized_chunk(nums, k)
      let left = list.flat_map(blocks, running_max)
      let right =
        list.flat_map(blocks, fn(block) {
          block
          |> list.reverse
          |> running_max
          |> list.reverse
        })

      // Every window of width k straddles at most one block boundary, so it is
      // covered by a suffix of one block and a prefix of the next.
      list.zip(right, list.drop(left, k - 1))
      |> list.map(fn(pair) { int.max(pair.0, pair.1) })
    }
  }
}

/// Seeded with the first element rather than zero: the values can be negative.
fn running_max(values: List(Int)) -> List(Int) {
  case values {
    [] -> []
    [first, ..rest] -> [first, ..list.scan(rest, first, int.max)]
  }
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> windows(nums, k, [])
  }
}

/// Every window, maximised, by walking the list one start at a time. There is
/// no random access to slice with, so the tail is re-taken each step \\u{2014} which is
/// the O(n\\u{b7}k) the other variants exist to avoid.
fn windows(nums: List(Int), k: Int, acc: List(Int)) -> List(Int) {
  let window = list.take(nums, k)
  case list.length(window) < k, nums {
    True, _ -> list.reverse(acc)
    False, [] -> list.reverse(acc)
    False, [_, ..rest] ->
      case list.reduce(window, int.max) {
        Ok(best) -> windows(rest, k, [best, ..acc])
        Error(Nil) -> list.reverse(acc)
      }
  }
}`]]),new x("pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int)",`pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)",
      string.inspect([3, 3, 5, 5, 6, 7]),
      string.inspect(solution.max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)),
    ),
    #(
      "max_sliding_window([1], 1)",
      string.inspect([1]),
      string.inspect(solution.max_sliding_window([1], 1)),
    ),
    #(
      "max_sliding_window([], 3)",
      string.inspect([]),
      string.inspect(solution.max_sliding_window([], 3)),
    ),
    #(
      "max_sliding_window([9, 8, 7, 6], 2)",
      string.inspect([9, 8, 7]),
      string.inspect(solution.max_sliding_window([9, 8, 7, 6], 2)),
    ),
    #(
      "max_sliding_window([1, -1], 1)",
      string.inspect([1, -1]),
      string.inspect(solution.max_sliding_window([1, -1], 1)),
    ),
    #(
      "max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)",
      string.inspect([7, 7, 7, 7, 7]),
      string.inspect(solution.max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)),
    ),
  ]
}`))}function zB(){return new y(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`import gleam/int
import gleam/list

pub fn eval_rpn(tokens: List(String)) -> Int {
  case list.fold(tokens, [], step) {
    [answer, ..] -> answer
    [] -> 0
  }
}

/// Gleam's integer division already truncates towards zero, which is what the
/// problem asks for and what most languages' \`//\` does not do for negatives.
fn step(stack: List(Int), token: String) -> List(Int) {
  case token, stack {
    "+", [b, a, ..rest] -> [a + b, ..rest]
    "-", [b, a, ..rest] -> [a - b, ..rest]
    "*", [b, a, ..rest] -> [a * b, ..rest]
    "/", [b, a, ..rest] -> [a / b, ..rest]
    _, _ ->
      case int.parse(token) {
        Ok(n) -> [n, ..stack]
        Error(Nil) -> stack
      }
  }
}`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`import gleam/int
import gleam/list
import gleam/result

pub fn eval_rpn(tokens: List(String)) -> Int {
  let #(value, _) = take(list.reverse(tokens))
  value
}

/// Read right to left: the last token is the outermost operator, and each
/// operator takes its right operand first because that is what sits nearer the
/// end. Returns the value and whatever is left to read.
fn take(rest: List(String)) -> #(Int, List(String)) {
  case rest {
    [] -> #(0, [])
    [token, ..tail] ->
      case token {
        "+" | "-" | "*" | "/" -> {
          let #(right, tail) = take(tail)
          let #(left, tail) = take(tail)
          #(apply(token, left, right), tail)
        }
        _ -> #(result.unwrap(int.parse(token), 0), tail)
      }
  }
}

fn apply(operator: String, left: Int, right: Int) -> Int {
  case operator {
    "+" -> left + right
    "-" -> left - right
    "*" -> left * right
    _ -> left / right
  }
}`]]),new x("pub fn eval_rpn(tokens: List(String)) -> Int",`pub fn eval_rpn(tokens: List(String)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "eval_rpn([\\"2\\", \\"1\\", \\"+\\", \\"3\\", \\"*\\"])",
      string.inspect(9),
      string.inspect(solution.eval_rpn(["2", "1", "+", "3", "*"])),
    ),
    #(
      "eval_rpn([\\"4\\", \\"13\\", \\"5\\", \\"/\\", \\"+\\"])",
      string.inspect(6),
      string.inspect(solution.eval_rpn(["4", "13", "5", "/", "+"])),
    ),
    #(
      "eval_rpn([\\"-3\\", \\"2\\", \\"/\\"])",
      string.inspect(-1),
      string.inspect(solution.eval_rpn(["-3", "2", "/"])),
    ),
    #(
      "eval_rpn([\\"5\\"])",
      string.inspect(5),
      string.inspect(solution.eval_rpn(["5"])),
    ),
    #(
      "eval_rpn(the long one)",
      string.inspect(22),
      string.inspect(
        solution.eval_rpn([
          "10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+",
        ]),
      ),
    ),
  ]
}`))}function VB(){return new y(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  list.reverse(build(n, n, "", []))
}

/// Two counters, one rule each: an opener is legal while any are left, and a
/// closer is legal only while more are outstanding than openers. Every string
/// reached with both counters at zero is valid by construction, so nothing is
/// ever generated and then thrown away.
fn build(
  open: Int,
  close: Int,
  current: String,
  acc: List(String),
) -> List(String) {
  case open, close {
    0, 0 -> [current, ..acc]
    _, _ -> {
      let acc = case open > 0 {
        True -> build(open - 1, close, current <> "(", acc)
        False -> acc
      }
      case close > open {
        True -> build(open, close - 1, current <> ")", acc)
        False -> acc
      }
    }
  }
}`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  compose(n)
}

/// Every non-empty balanced string is "(" <> A <> ")" <> B for exactly one
/// split: A is whatever the first bracket encloses, B is whatever follows it.
/// Enumerating the splits enumerates the strings, with no validity rule to
/// check at all \\u{2014} the shape of the recursion is the rule.
fn compose(n: Int) -> List(String) {
  case n <= 0 {
    True -> [""]
    False ->
      indices(n)
      |> list.flat_map(fn(inner_pairs) {
        let inner = compose(inner_pairs)
        let rest = compose(n - 1 - inner_pairs)
        list.flat_map(inner, fn(a) {
          list.map(rest, fn(b) { "(" <> a <> ")" <> b })
        })
      })
  }
}

fn indices(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}`]]),new x("pub fn generate_parenthesis(n: Int) -> List(String)",`pub fn generate_parenthesis(n: Int) -> List(String) {
  todo
}`,`import gleam/list
import gleam/string
import solution

/// Any order is acceptable, so every case compares sorted.
fn sorted(n: Int) -> List(String) {
  list.sort(solution.generate_parenthesis(n), string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "generate_parenthesis(1)",
      string.inspect(["()"]),
      string.inspect(sorted(1)),
    ),
    #(
      "generate_parenthesis(2)",
      string.inspect(["(())", "()()"]),
      string.inspect(sorted(2)),
    ),
    #(
      "generate_parenthesis(3)",
      string.inspect(["((()))", "(()())", "(())()", "()(())", "()()()"]),
      string.inspect(sorted(3)),
    ),
    #(
      "generate_parenthesis(4) count",
      string.inspect(14),
      string.inspect(list.length(sorted(4))),
    ),
  ]
}`))}function jB(){return new y(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`import gleam/int
import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  list.zip(position, speed)
  |> list.sort(fn(a, b) { int.compare(b.0, a.0) })
  |> list.fold(#(0, 0, 1), fn(state, car) {
    let #(fleets, lead_distance, lead_speed) = state
    let distance = target - car.0
    // distance/speed > lead_distance/lead_speed, cross-multiplied so the
    // arrival times never have to become fractions.
    case distance * lead_speed > lead_distance * car.1 {
      True -> #(fleets + 1, distance, car.1)
      False -> #(fleets, lead_distance, lead_speed)
    }
  })
  |> fn(state) { state.0 }
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`import gleam/list

pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  let cars = list.zip(position, speed)
  list.count(cars, fn(car) { leads(car, cars, target) })
}

/// A car leads a fleet exactly when it arrives strictly later than every car
/// ahead of it; anything else means it catches one of them and merges. No
/// sorting, no running state \\u{2014} O(n\\u{b2}), and the definition rather than a
/// consequence of it.
fn leads(car: #(Int, Int), cars: List(#(Int, Int)), target: Int) -> Bool {
  cars
  |> list.filter(fn(other) { other.0 > car.0 })
  |> list.all(fn(other) {
    { target - car.0 } * other.1 > { target - other.0 } * car.1
  })
}`]]),new x("pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int",`pub fn car_fleet(target: Int, position: List(Int), speed: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])",
      string.inspect(3),
      string.inspect(solution.car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])),
    ),
    #(
      "car_fleet(10, [3], [3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [3], [3])),
    ),
    #(
      "car_fleet(100, [0, 2, 4], [4, 2, 1])",
      string.inspect(1),
      string.inspect(solution.car_fleet(100, [0, 2, 4], [4, 2, 1])),
    ),
    #(
      "car_fleet(10, [6, 8], [3, 2])",
      string.inspect(2),
      string.inspect(solution.car_fleet(10, [6, 8], [3, 2])),
    ),
    #(
      "car_fleet(10, [], [])",
      string.inspect(0),
      string.inspect(solution.car_fleet(10, [], [])),
    ),
    #(
      "car_fleet(10, [0, 4, 2], [2, 1, 3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [0, 4, 2], [2, 1, 3])),
    ),
  ]
}`))}function OB(){return new y(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let n = list.length(heights)
  let #(stack, best) =
    heights
    |> list.index_map(fn(h, i) { #(i, h) })
    |> list.fold(#([], 0), fn(state, cell) {
      let #(stack, best) = state
      let #(i, h) = cell
      // Anything taller than the new bar can never extend past it, so its
      // rectangle is finished here. Whatever it reached back to becomes this
      // bar's own starting point.
      let #(stack, best, start) = close_taller(stack, h, i, best, i)
      #([#(start, h), ..stack], best)
    })

  // Whatever survives was never cut off, so it runs to the far end.
  list.fold(stack, best, fn(best, entry) {
    int.max(best, entry.1 * { n - entry.0 })
  })
}

fn close_taller(
  stack: List(#(Int, Int)),
  height: Int,
  index: Int,
  best: Int,
  start: Int,
) -> #(List(#(Int, Int)), Int, Int) {
  case stack {
    [#(from, tall), ..rest] if tall > height ->
      close_taller(
        rest,
        height,
        index,
        int.max(best, tall * { index - from }),
        from,
      )
    _ -> #(stack, best, start)
  }
}`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(h, i) { #(i, h) })

  list.fold(indexed, 0, fn(best, cell) {
    let #(i, h) = cell
    // How far this bar's own height can spread in each direction. O(n\\u{b2}), and
    // the definition of the answer: every rectangle is some bar taken as far
    // as it will go.
    let left =
      indexed
      |> list.take(i)
      |> list.reverse
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    let right =
      indexed
      |> list.drop(i + 1)
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    int.max(best, h * { left + right + 1 })
  })
}`]]),new x("pub fn largest_rectangle_area(heights: List(Int)) -> Int",`pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "largest_rectangle_area([2, 1, 5, 6, 2, 3])",
      string.inspect(10),
      string.inspect(solution.largest_rectangle_area([2, 1, 5, 6, 2, 3])),
    ),
    #(
      "largest_rectangle_area([2, 4])",
      string.inspect(4),
      string.inspect(solution.largest_rectangle_area([2, 4])),
    ),
    #(
      "largest_rectangle_area([])",
      string.inspect(0),
      string.inspect(solution.largest_rectangle_area([])),
    ),
    #(
      "largest_rectangle_area([1, 1, 1])",
      string.inspect(3),
      string.inspect(solution.largest_rectangle_area([1, 1, 1])),
    ),
    #(
      "largest_rectangle_area([5])",
      string.inspect(5),
      string.inspect(solution.largest_rectangle_area([5])),
    ),
    #(
      "largest_rectangle_area([4, 2, 0, 3, 2, 5])",
      string.inspect(6),
      string.inspect(solution.largest_rectangle_area([4, 2, 0, 3, 2, 5])),
    ),
  ]
}`))}function FB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  case find_row(matrix, target) {
    Ok(row) -> contains(row, target)
    Error(Nil) -> False
  }
}

/// The rows are sorted and do not overlap, so the row a value could live in is
/// itself found by halving: compare the target against a row's ends.
fn find_row(rows: List(List(Int)), target: Int) -> Result(List(Int), Nil) {
  case rows {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(rows) / 2
      let #(before, rest) = list.split(rows, half)
      case rest {
        [] -> Error(Nil)
        [row, ..after] ->
          case list.last(row), list.first(row) {
            Ok(last), _ if last < target -> find_row(after, target)
            _, Ok(first) if first > target -> find_row(before, target)
            Ok(_), Ok(_) -> Ok(row)
            _, _ -> Error(Nil)
          }
      }
    }
  }
}

fn contains(row: List(Int), target: Int) -> Bool {
  case row {
    [] -> False
    _ -> {
      let half = list.length(row) / 2
      let #(before, rest) = list.split(row, half)
      case rest {
        [] -> False
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> True
            order.Lt -> contains(before, target)
            order.Gt -> contains(after, target)
          }
      }
    }
  }
}`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`import gleam/int
import gleam/list
import gleam/order

pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  let width = case matrix {
    [row, ..] -> list.length(row)
    [] -> 0
  }
  walk(matrix, width, target)
}

/// From the top-right corner every step is forced: too big and the whole column
/// is too big, so drop it; too small and the whole row is too small, so drop
/// that. O(m + n), and it never uses the fact that rows do not overlap \\u{2014} it
/// works on any matrix sorted along both axes.
fn walk(rows: List(List(Int)), column: Int, target: Int) -> Bool {
  case rows, column <= 0 {
    [], _ -> False
    _, True -> False
    [row, ..below], False ->
      case row |> list.drop(column - 1) |> list.first {
        Error(Nil) -> False
        Ok(value) ->
          case int.compare(value, target) {
            order.Eq -> True
            order.Gt -> walk(rows, column - 1, target)
            order.Lt -> walk(below, column, target)
          }
      }
  }
}`]]),new x("pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool",`pub fn search_matrix(matrix: List(List(Int)), target: Int) -> Bool {
  todo
}`,`import gleam/string
import solution

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "search_matrix(matrix, 3)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 3)),
    ),
    #(
      "search_matrix(matrix, 13)",
      string.inspect(False),
      string.inspect(solution.search_matrix(matrix, 13)),
    ),
    #(
      "search_matrix(matrix, 60)",
      string.inspect(True),
      string.inspect(solution.search_matrix(matrix, 60)),
    ),
    #(
      "search_matrix([[1]], 1)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1]], 1)),
    ),
    #(
      "search_matrix([], 1)",
      string.inspect(False),
      string.inspect(solution.search_matrix([], 1)),
    ),
    #(
      "search_matrix([[1], [3], [5]], 5)",
      string.inspect(True),
      string.inspect(solution.search_matrix([[1], [3], [5]], 5)),
    ),
  ]
}`))}function HB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  search(piles, h, 1, list.fold(piles, 1, int.max))
}

/// The search space is the answer, not the input. Feasibility is monotone \\u{2014}
/// if a speed finishes in time then so does every faster one \\u{2014} which is
/// exactly the property halving needs.
fn search(piles: List(Int), h: Int, low: Int, high: Int) -> Int {
  case low >= high {
    True -> low
    False -> {
      let mid = { low + high } / 2
      case hours(piles, mid) <= h {
        True -> search(piles, h, low, mid)
        False -> search(piles, h, mid + 1, high)
      }
    }
  }
}

/// A pile never shares an hour with another, so each costs ceil(pile / speed).
fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  climb(piles, h, 1, list.fold(piles, 1, int.max))
}

fn climb(piles: List(Int), h: Int, speed: Int, highest: Int) -> Int {
  case speed >= highest || hours(piles, speed) <= h {
    True -> speed
    False -> climb(piles, h, speed + 1, highest)
  }
}

fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}`]]),new x("pub fn min_eating_speed(piles: List(Int), h: Int) -> Int",`pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_eating_speed([3, 6, 7, 11], 8)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([3, 6, 7, 11], 8)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 5)",
      string.inspect(30),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 5)),
    ),
    #(
      "min_eating_speed([30, 11, 23, 4, 20], 6)",
      string.inspect(23),
      string.inspect(solution.min_eating_speed([30, 11, 23, 4, 20], 6)),
    ),
    #(
      "min_eating_speed([1], 1)",
      string.inspect(1),
      string.inspect(solution.min_eating_speed([1], 1)),
    ),
    #(
      "min_eating_speed([4, 4, 4, 4], 4)",
      string.inspect(4),
      string.inspect(solution.min_eating_speed([4, 4, 4, 4], 4)),
    ),
    #(
      "min_eating_speed([1, 1, 1, 10], 4)",
      string.inspect(10),
      string.inspect(solution.min_eating_speed([1, 1, 1, 10], 4)),
    ),
  ]
}`))}function NB(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

/// Timestamps only ever increase, so prepending keeps each key's history sorted
/// newest first for free.
pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  let history = case dict.get(store.entries, key) {
    Ok(history) -> history
    Error(Nil) -> []
  }
  TimeMap(dict.insert(store.entries, key, [#(timestamp, value), ..history]))
}

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Ok(history) -> newest_at_most(history, timestamp)
    Error(Nil) -> ""
  }
}

/// The history is sorted, so the newest entry at or before a timestamp is a
/// halving question, not a walk. Everything before the split point is newer.
fn newest_at_most(history: List(#(Int, String)), timestamp: Int) -> String {
  case history {
    [] -> ""
    _ -> {
      let half = list.length(history) / 2
      let #(newer, rest) = list.split(history, half)
      case rest {
        [] -> ""
        [#(stamp, value), ..older] ->
          case stamp <= timestamp {
            True ->
              case newest_at_most(newer, timestamp) {
                "" -> value
                found -> found
              }
            False -> newest_at_most(older, timestamp)
          }
      }
    }
  }
}`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  let history = case dict.get(store.entries, key) {
    Ok(history) -> history
    Error(Nil) -> []
  }
  TimeMap(dict.insert(store.entries, key, [#(timestamp, value), ..history]))
}

/// Newest first, so the first entry old enough is the answer. O(n) per lookup
/// against the halving version's O(log n), but there is no split arithmetic to
/// get wrong, and for a key with a handful of versions it wins on constants.
pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Error(Nil) -> ""
    Ok(history) ->
      case list.find(history, fn(entry) { entry.0 <= timestamp }) {
        Ok(#(_, value)) -> value
        Error(Nil) -> ""
      }
  }
}`]]),new x(`pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String`,`pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  todo
}

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  todo
}

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let store =
    solution.new()
    |> solution.set("foo", "bar", 1)

  let later = solution.set(store, "foo", "bar2", 4)

  [
    #(
      "get(\\"foo\\", 1) after set at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 1)),
    ),
    #(
      "get(\\"foo\\", 3) with only the value at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 3)),
    ),
    #(
      "get(\\"foo\\", 4) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 4)),
    ),
    #(
      "get(\\"foo\\", 5) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 5)),
    ),
    #(
      "get(\\"foo\\", 3) still sees the older value",
      string.inspect("bar"),
      string.inspect(solution.get(later, "foo", 3)),
    ),
    #(
      "get(\\"foo\\", 0) before anything was set",
      string.inspect(""),
      string.inspect(solution.get(later, "foo", 0)),
    ),
    #(
      "get(\\"missing\\", 1)",
      string.inspect(""),
      string.inspect(solution.get(later, "missing", 1)),
    ),
  ]
}`))}function RB(){return new y(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let total = list.length(nums1) + list.length(nums2)
  case total {
    0 -> 0.0
    _ -> {
      let #(previous, current) = advance(nums1, nums2, total / 2 + 1, 0, 0)
      case total % 2 {
        1 -> int.to_float(current)
        _ -> int.to_float(previous + current) /. 2.0
      }
    }
  }
}

/// Merge, but stop at the middle and keep only the last two values seen: the
/// merged list is never built, so this is O(m + n) time and no extra space.
fn advance(
  a: List(Int),
  b: List(Int),
  steps: Int,
  previous: Int,
  current: Int,
) -> #(Int, Int) {
  case steps <= 0 {
    True -> #(previous, current)
    False ->
      case a, b {
        [x, ..rest], [y, ..] if x <= y -> advance(rest, b, steps - 1, current, x)
        [x, ..rest], [] -> advance(rest, b, steps - 1, current, x)
        _, [y, ..rest] -> advance(a, rest, steps - 1, current, y)
        [], [] -> #(previous, current)
      }
  }
}`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let merged =
    nums1
    |> list.append(nums2)
    |> list.sort(int.compare)
  let total = list.length(merged)

  case total, at(merged, total / 2), at(merged, { total - 1 } / 2) {
    0, _, _ -> 0.0
    _, upper, lower -> int.to_float(lower + upper) /. 2.0
  }
}

fn at(values: List(Int), index: Int) -> Int {
  case values |> list.drop(index) |> list.first {
    Ok(value) -> value
    Error(Nil) -> 0
  }
}`]]),new x("pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float",`pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  todo
}`,`import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_median_sorted_arrays([1, 3], [2])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([1, 3], [2])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [3, 4])",
      string.inspect(2.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [3, 4])),
    ),
    #(
      "find_median_sorted_arrays([], [1])",
      string.inspect(1.0),
      string.inspect(solution.find_median_sorted_arrays([], [1])),
    ),
    #(
      "find_median_sorted_arrays([2], [])",
      string.inspect(2.0),
      string.inspect(solution.find_median_sorted_arrays([2], [])),
    ),
    #(
      "find_median_sorted_arrays([], [])",
      string.inspect(0.0),
      string.inspect(solution.find_median_sorted_arrays([], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 2], [])",
      string.inspect(1.5),
      string.inspect(solution.find_median_sorted_arrays([1, 2], [])),
    ),
    #(
      "find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6])",
      string.inspect(4.0),
      string.inspect(
        solution.find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6]),
      ),
    ),
  ]
}`))}function pK(){return new y(V([["Solution 1","",`pub fn length(items: List(a)) -> Int {
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
}`],["Solution 2 · Stdlib","The same two answers straight from the standard library. Writing the recursion by hand is how you learn the shape; reaching for these is what you actually do afterwards.",`import gleam/list

pub fn length(items: List(a)) -> Int {
  list.length(items)
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  list.last(items)
}`]]),new x(`pub fn length(items: List(a)) -> Int

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
}`))}function cK(){return new y(V([["Solution 1","",`pub fn reverse(items: List(a)) -> List(a) {
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
}`],["Solution 2 · Fold","A fold *is* a tail-recursive loop with a name: the accumulator is the second argument, the step function is the body. Once you see that, most hand-written `*_loop` helpers turn into one line.",`import gleam/list

pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}`]]),new x(`pub fn reverse(items: List(a)) -> List(a)

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
}`))}function dK(){return new y(V([["Solution 1","",`import gleam/int
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
}`],["Solution 2 · Explicit recursion","What each fold expands to. Useful to write once so the folded version stops looking like magic — and to notice that `count_if` here is not tail recursive, while the fold always is.",`import gleam/int
import gleam/list

pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(max_loop(rest, first))
  }
}

fn max_loop(numbers: List(Int), best: Int) -> Int {
  case numbers {
    [] -> best
    [n, ..rest] -> max_loop(rest, int.max(best, n))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  case items {
    [] -> 0
    [first, ..rest] ->
      case predicate(first) {
        True -> 1 + count_if(rest, predicate)
        False -> count_if(rest, predicate)
      }
  }
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  running_loop(numbers, 0, [])
}

fn running_loop(numbers: List(Int), total: Int, acc: List(Int)) -> List(Int) {
  case numbers {
    [] -> list.reverse(acc)
    [n, ..rest] -> running_loop(rest, total + n, [total + n, ..acc])
  }
}`]]),new x(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

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
}`))}function sK(){return new y(V([["Solution 1","",`import gleam/dict
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
}`],["Solution 2 · Sorted runs","Group by sorting instead of by lookup: once the words are in order, equal ones are adjacent, so counting is a single pass that never searches for anything. The dictionary is built at the end, from finished pairs.",`import gleam/dict
import gleam/list
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.sort(string.compare)
  |> runs([])
  |> dict.from_list
}

fn runs(
  words: List(String),
  acc: List(#(String, Int)),
) -> List(#(String, Int)) {
  case words, acc {
    [], _ -> acc
    [word, ..rest], [#(current, count), ..tail] if word == current ->
      runs(rest, [#(current, count + 1), ..tail])
    [word, ..rest], _ -> runs(rest, [#(word, 1), ..acc])
  }
}`]]),new x("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
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
}`))}function lK(){return new y(V([["Solution 1","",`import gleam/int
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
}`],["Solution 2 · Nested case","What `use <- result.try` desugars to. Same behaviour, one level of nesting per fallible step — which is exactly the staircase `use` exists to flatten.",`import gleam/int

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  case int.parse(port) {
    Error(Nil) -> Error(Nil)
    Ok(port) ->
      case int.parse(timeout) {
        Error(Nil) -> Error(Nil)
        Ok(timeout) ->
          case host {
            "" -> Error(Nil)
            _ -> Ok(Config(host, port, timeout))
          }
      }
  }
}`]]),new x(`pub type Config {
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
}`))}function iK(){return new y(V([["Solution 1","",`import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`],["Solution 2 · Case on result","Skipping Option entirely: `dict.get` already returns a Result, so one `case` covers both branches. Converting to Option earns its keep when the value is passed on, not when it is consumed immediately like this.",`import gleam/dict

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}`]]),new x("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
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
}`))}function rK(){return new y(V([["Solution 1","",`import gleam/list
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
}`],["Solution 2 · Prefix functions","The same work with functions rather than string patterns. Patterns bind the remainder for free, which is why they win for prefixes; these read better when the test and the surgery are separate ideas.",`import gleam/list
import gleam/string

pub fn strip_comment(line: String) -> String {
  case string.starts_with(line, "#") {
    True -> line |> string.drop_start(1) |> string.trim_start
    False -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(" ")
  |> list.map(fn(word) { string.slice(word, 0, 1) })
  |> string.concat
  |> string.uppercase
}`]]),new x(`pub fn strip_comment(line: String) -> String

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
}`))}function aK(){return new y(V([["Solution 1","",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`],["Solution 2 · Nested calls","The same steps without the pipe, and therefore inside out: to read the order of operations you start at `title` in the middle and work outwards. Identical output — the pipe only changes which end you read from.",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}`]]),new x("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
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
}`))}function oK(){return new y(V([["Solution 1","",`pub type Player {
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
}`],["Solution 2 · Explicit fields","",`pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

/// Every field spelled out instead of \`..player\`. More to type, and it stops
/// compiling the moment a field is added — which is occasionally exactly what
/// you want, and usually not.
pub fn add_points(player: Player, points: Int) -> Player {
  Player(name: player.name, score: player.score + points, level: player.level)
}

pub fn level_up(player: Player) -> Player {
  Player(name: player.name, score: 0, level: player.level + 1)
}`]]),new x(`pub type Player {
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
}`))}function tK(){return new y(V([["Solution 1","",`import gleam/list
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
}`],["Solution 2 · List contains","No set: keep what has been accepted and ask that list directly. O(n^2) instead of O(n), but it needs nothing of the element type — and for a handful of items it is the shorter, plainer code.",`import gleam/list

pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}`]]),new x("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
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
}`))}function EO(Z){if(Z==="nc01_contains_duplicate")return new D(uL());else if(Z==="nc02_valid_anagram")return new D(nL());else if(Z==="nc03_two_sum")return new D(vL());else if(Z==="nc04_group_anagrams")return new D(mL());else if(Z==="nc05_top_k_frequent")return new D(pL());else if(Z==="nc06_product_except_self")return new D(cL());else if(Z==="nc07_longest_consecutive")return new D(dL());else if(Z==="nc08_valid_palindrome")return new D(sL());else if(Z==="nc09_two_sum_sorted")return new D(lL());else if(Z==="nc10_three_sum")return new D(iL());else if(Z==="nc11_container_water")return new D(rL());else if(Z==="nc12_best_time_stock")return new D(aL());else if(Z==="nc13_longest_substring")return new D(oL());else if(Z==="nc14_character_replacement")return new D(tL());else if(Z==="nc15_permutation_in_string")return new D(eL());else if(Z==="nc16_valid_parentheses")return new D(ZB());else if(Z==="nc17_min_stack")return new D(JB());else if(Z==="nc18_daily_temperatures")return new D(QB());else if(Z==="nc19_binary_search")return new D(XB());else if(Z==="nc20_find_min_rotated")return new D(YB());else if(Z==="nc21_search_rotated")return new D(KB());else if(Z==="nc22_encode_decode")return new D(IB());else if(Z==="nc23_valid_sudoku")return new D(qB());else if(Z==="nc24_trapping_rain_water")return new D(WB());else if(Z==="nc25_min_window_substring")return new D(GB());else if(Z==="nc26_sliding_window_maximum")return new D(UB());else if(Z==="nc27_eval_rpn")return new D(zB());else if(Z==="nc28_generate_parentheses")return new D(VB());else if(Z==="nc29_car_fleet")return new D(jB());else if(Z==="nc30_largest_rectangle")return new D(OB());else if(Z==="nc31_search_2d_matrix")return new D(FB());else if(Z==="nc32_koko_bananas")return new D(HB());else if(Z==="nc33_time_map")return new D(NB());else if(Z==="nc34_median_two_sorted")return new D(RB());else if(Z==="tip01_list_patterns")return new D(pK());else if(Z==="tip02_tail_recursion")return new D(cK());else if(Z==="tip03_fold")return new D(dK());else if(Z==="tip04_frequency_maps")return new D(sK());else if(Z==="tip05_result_chains")return new D(lK());else if(Z==="tip06_option")return new D(iK());else if(Z==="tip07_string_patterns")return new D(rK());else if(Z==="tip08_pipelines")return new D(aK());else if(Z==="tip09_records")return new D(oK());else if(Z==="tip10_set_dedupe")return new D(tK());else return new V1(void 0)}function Z4(Z,J,Q){return new C4(Z,J,U9(Z),H1(Q.solutions,(X)=>{return new Q7(X[0],X[1],X[2])}),$J,new a(Q.check),U1)}function CO(){return new w4("Gleam Tips",V([new j0("Idioms",V([Z4("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",pK()),Z4("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",cK()),Z4("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",dK()),Z4("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",sK()),Z4("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",lK()),Z4("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',iK()),Z4("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',rK()),Z4("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",aK()),Z4("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",oK()),Z4("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",tK())]))]))}class M1 extends P{constructor(Z,J,Q){super();this.title=Z,this.prompt=J,this.stem=Q}}class z9 extends P{constructor(Z,J){super();this.subcategory=Z,this.drills=J}}var j8="NeetCode 150";function AB(){return V([new z9("Arrays & Hashing",V([new M1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.","nc01_contains_duplicate"),new M1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.","nc02_valid_anagram"),new M1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.","nc03_two_sum"),new M1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.","nc04_group_anagrams"),new M1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.","nc05_top_k_frequent"),new M1("Encode and Decode Strings","Design an algorithm to encode a list of strings to a single string, and another to decode that string back to the original list. The strings may contain any characters.","nc22_encode_decode"),new M1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.","nc06_product_except_self"),new M1("Valid Sudoku",'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated: each row, each column and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are written ".".',"nc23_valid_sudoku"),new M1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.","nc07_longest_consecutive")])),new z9("Two Pointers",V([new M1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.","nc08_valid_palindrome"),new M1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.","nc09_two_sum_sorted"),new M1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.","nc10_three_sum"),new M1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.","nc11_container_water"),new M1("Trapping Rain Water","Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.","nc24_trapping_rain_water")])),new z9("Sliding Window",V([new M1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.","nc12_best_time_stock"),new M1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.","nc13_longest_substring"),new M1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.","nc14_character_replacement"),new M1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.","nc15_permutation_in_string"),new M1("Minimum Window Substring","Given two strings s and t, return the minimum window substring of s that contains every character of t, including duplicates. If there is no such substring, return the empty string.","nc25_min_window_substring"),new M1("Sliding Window Maximum","You are given an array of integers nums and a window of size k sliding from the very left to the very right, one position at a time. Return the maximum in the window at each position.","nc26_sliding_window_maximum")])),new z9("Stack",V([new M1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.","nc16_valid_parentheses"),new M1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.","nc17_min_stack"),new M1("Evaluate Reverse Polish Notation","You are given an array of strings tokens representing an arithmetic expression in Reverse Polish Notation. Evaluate it and return an integer. Division between two integers truncates towards zero.","nc27_eval_rpn"),new M1("Generate Parentheses","Given n pairs of parentheses, generate all combinations of well-formed parentheses. The answer may be returned in any order.","nc28_generate_parentheses"),new M1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.","nc18_daily_temperatures"),new M1("Car Fleet","Cars head to the same destination at target. Car i starts at position[i] with speed[i], and a faster car catching a slower one joins it, moving at the slower speed. Return the number of fleets that arrive.","nc29_car_fleet"),new M1("Largest Rectangle in Histogram","Given an array of integers heights representing a histogram's bar heights, where each bar has width 1, return the area of the largest rectangle in the histogram.","nc30_largest_rectangle")])),new z9("Binary Search",V([new M1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.","nc19_binary_search"),new M1("Search a 2D Matrix","You are given an m x n integer matrix where each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the row before. Return true if target is in the matrix.","nc31_search_2d_matrix"),new M1("Koko Eating Bananas","Koko has piles of bananas and h hours before the guards return. At a speed of k bananas per hour she eats k from one pile, and if the pile is smaller she eats it and stops for that hour. Return the smallest k that lets her finish in time.","nc32_koko_bananas"),new M1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.","nc20_find_min_rotated"),new M1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.","nc21_search_rotated"),new M1("Time Based Key-Value Store","Design a key-value store that keeps multiple values per key, each stamped with a time. set(key, value, timestamp) stores a value; get(key, timestamp) returns the value set at the largest time no later than timestamp, or the empty string if there is none.","nc33_time_map"),new M1("Median of Two Sorted Arrays","Given two sorted arrays nums1 and nums2, return the median of the two arrays combined.","nc34_median_two_sorted")]))])}function DB(Z,J,Q){return H0(Q(Z.stem),(X)=>{let Y=X[0],K=X[1];return new C4(Z.title,Z.prompt,U9(Z.title),H1(Y,(I)=>{return new Q7(I[0],I[1],I[2])}),J,K,U1)})}function O8(Z,J,Q){return new w4(Z,(()=>{let X=AB();return V7(X,(Y)=>{let K=V7(Y.drills,(I)=>{return DB(I,J,Q)});if(K instanceof k)return new V1(void 0);else{let I=K;return new D(new j0(Y.subcategory,I))}})})())}function LB(){return V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`defmodule Solution do
  def contains_duplicate?(nums) do
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`defmodule Solution do
  def contains_duplicate?(nums) do
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end`]])}function BB(){return V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`defmodule Solution do
  def anagram?(s, t) do
    frequencies(s) == frequencies(t)
  end

  defp frequencies(word) do
    word |> String.graphemes() |> Enum.frequencies()
  end
end`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`defmodule Solution do
  def anagram?(s, t) do
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end`]])}function PB(){return V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`defmodule Solution do
  def two_sum(nums, target) do
    find_pair(Enum.with_index(nums), target, %{})
  end

  defp find_pair([], _target, _seen), do: nil

  defp find_pair([{n, i} | rest], target, seen) do
    # Every earlier number is in \`seen\`, so the complement is one lookup away.
    case Map.fetch(seen, target - n) do
      {:ok, j} -> {j, i}
      :error -> find_pair(rest, target, Map.put(seen, n, i))
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`defmodule Solution do
  def two_sum(nums, target) do
    indexed = Enum.with_index(nums)

    # A comprehension over every ordered pair, stopping at the first hit.
    Enum.find_value(indexed, fn {a, i} ->
      Enum.find_value(indexed, fn {b, j} ->
        if j > i and a + b == target, do: {i, j}
      end)
    end)
  end
end`]])}function SB(){return V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.sort() end)
    |> Map.values()
  end
end`],["Solution 2 · Count key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

A letter tally is anagram-invariant too, and costs O(len) to build rather than O(len log len).`,`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.frequencies() end)
    |> Map.values()
  end
end`]])}function TB(){return V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`defmodule Solution do
  def top_k_frequent(nums, k) do
    nums
    |> Enum.frequencies()
    |> Enum.sort_by(fn {_num, count} -> count end, :desc)
    |> Enum.take(k)
    |> Enum.map(fn {num, _count} -> num end)
  end
end`],["Solution 2 · Bucket sort","A count can never exceed the input length, so one bucket per frequency covers every possibility. Reading the buckets downwards gives the answer in O(n) and replaces the comparison sort entirely.",`defmodule Solution do
  def top_k_frequent(nums, k) do
    buckets =
      nums
      |> Enum.frequencies()
      |> Enum.group_by(fn {_num, count} -> count end, fn {num, _count} -> num end)

    length(nums)..1//-1
    |> Enum.flat_map(fn count -> Map.get(buckets, count, []) end)
    |> Enum.take(k)
  end
end`]])}function _B(){return V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`defmodule Solution do
  def product_except_self(nums) do
    prefixes = nums |> Enum.scan(1, &(&1 * &2)) |> then(&[1 | Enum.drop(&1, -1)])

    suffixes =
      nums
      |> Enum.reverse()
      |> Enum.scan(1, &(&1 * &2))
      |> then(&[1 | Enum.drop(&1, -1)])
      |> Enum.reverse()

    Enum.zip_with(prefixes, suffixes, &(&1 * &2))
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`defmodule Solution do
  def product_except_self(nums) do
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end`]])}function EB(){return V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`defmodule Solution do
  def longest_consecutive(nums) do
    all = MapSet.new(nums)

    all
    |> Enum.reject(fn n -> MapSet.member?(all, n - 1) end)
    |> Enum.map(fn start -> run_length(all, start, 0) end)
    |> Enum.max(fn -> 0 end)
  end

  # Only runs counted from their first element, so each run is walked once.
  defp run_length(all, n, count) do
    if MapSet.member?(all, n), do: run_length(all, n + 1, count + 1), else: count
  end
end`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`defmodule Solution do
  def longest_consecutive(nums) do
    case Enum.sort(nums) do
      [] ->
        0

      [first | rest] ->
        {_previous, _run, best} =
          Enum.reduce(rest, {first, 1, 1}, fn n, {previous, run, best} ->
            case n - previous do
              0 -> {previous, run, best}
              1 -> {n, run + 1, max(best, run + 1)}
              _ -> {n, 1, best}
            end
          end)

        best
    end
  end
end`]])}function CB(){return V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`defmodule Solution do
  def palindrome?(s) do
    cleaned = clean(s)
    cleaned == Enum.reverse(cleaned)
  end

  defp clean(s) do
    s
    |> String.downcase()
    |> String.graphemes()
    |> Enum.filter(&(&1 =~ ~r/^[a-z0-9]$/))
  end
end`],["Solution 2 · Two pointers","Compare inwards from both ends, skipping anything that is not alphanumeric as you go. No second string is built.",`defmodule Solution do
  def palindrome?(s) do
    cleaned =
      s
      |> String.downcase()
      |> String.replace(~r/[^a-z0-9]/, "")
      |> String.graphemes()

    converge(cleaned, Enum.reverse(cleaned), div(length(cleaned), 2))
  end

  defp converge(_forward, _backward, 0), do: true

  defp converge([a | forward], [b | backward], remaining) do
    a == b and converge(forward, backward, remaining - 1)
  end
end`]])}function wB(){return V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    converge(numbers, Enum.reverse(numbers), 1, length(numbers), target)
  end

  defp converge(_left, _right, low, high, _target) when low >= high, do: nil

  defp converge([a | left], [b | right], low, high, target) do
    case a + b do
      ^target -> {low, high}
      sum when sum < target -> converge(left, [b | right], low + 1, high, target)
      _ -> converge([a | left], right, low, high - 1, target)
    end
  end
end`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    tuple = List.to_tuple(numbers)

    Enum.find_value(0..(tuple_size(tuple) - 1)//1, fn i ->
      case search(tuple, target - elem(tuple, i), i + 1, tuple_size(tuple) - 1) do
        nil -> nil
        j -> {i + 1, j + 1}
      end
    end)
  end

  defp search(_tuple, _wanted, low, high) when low > high, do: nil

  defp search(tuple, wanted, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^wanted -> mid
      value when value < wanted -> search(tuple, wanted, mid + 1, high)
      _ -> search(tuple, wanted, low, mid - 1)
    end
  end
end`]])}function hB(){return V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`defmodule Solution do
  def three_sum(nums) do
    sorted = Enum.sort(nums)

    sorted
    |> Enum.with_index()
    |> Enum.flat_map(fn {a, i} ->
      rest = Enum.drop(sorted, i + 1)
      Enum.map(pairs_summing_to(rest, Enum.reverse(rest), length(rest), -a), fn {b, c} ->
        {a, b, c}
      end)
    end)
    |> Enum.uniq()
  end

  defp pairs_summing_to(_left, _right, remaining, _target) when remaining < 2, do: []

  defp pairs_summing_to([a | left], [b | right], remaining, target) do
    case a + b do
      ^target ->
        [{a, b} | pairs_summing_to(left, [b | right], remaining - 1, target)]

      sum when sum < target ->
        pairs_summing_to(left, [b | right], remaining - 1, target)

      _ ->
        pairs_summing_to([a | left], right, remaining - 1, target)
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`defmodule Solution do
  def three_sum(nums) do
    indexed = nums |> Enum.sort() |> Enum.with_index()

    triples =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          {c, k} <- indexed,
          i < j and j < k,
          a + b + c == 0,
          do: {a, b, c}

    Enum.uniq(triples)
  end
end`]])}function kB(){return V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`defmodule Solution do
  def max_area(heights) do
    converge(heights, Enum.reverse(heights), length(heights) - 1, 0)
  end

  defp converge(_left, _right, width, best) when width <= 0, do: best

  defp converge([a | left], [b | right], width, best) do
    # Moving the taller line in can never help: the shorter one caps the area.
    best = max(best, min(a, b) * width)

    if a < b do
      converge(left, [b | right], width - 1, best)
    else
      converge([a | left], right, width - 1, best)
    end
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`defmodule Solution do
  def max_area(heights) do
    indexed = Enum.with_index(heights)

    areas =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          j > i,
          do: min(a, b) * (j - i)

    Enum.max([0 | areas])
  end
end`]])}function bB(){return V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`defmodule Solution do
  def max_profit(prices) do
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`defmodule Solution do
  def max_profit(prices) do
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end`]])}function xB(){return V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`defmodule Solution do
  def length_of_longest_substring(s) do
    {_last_seen, _start, best} =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.reduce({%{}, 0, 0}, fn {g, i}, {last_seen, start, best} ->
        # A repeat inside the window moves the window past the earlier copy.
        start =
          case Map.fetch(last_seen, g) do
            {:ok, j} when j >= start -> j + 1
            _ -> start
          end

        {Map.put(last_seen, g, i), start, max(best, i - start + 1)}
      end)

    best
  end
end`],["Solution 2 · Shrinking window","The window itself is the bookkeeping: on a repeat, drop everything up to and including the earlier copy. No last-seen map at all, at the cost of scanning the window on each repeat.",`defmodule Solution do
  def length_of_longest_substring(s) do
    {_window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({[], 0}, fn g, {window, best} ->
        window = if g in window, do: drop_through(window, g), else: window
        window = window ++ [g]
        {window, max(best, length(window))}
      end)

    best
  end

  defp drop_through([g | rest], g), do: rest
  defp drop_through([_other | rest], g), do: drop_through(rest, g)
  defp drop_through([], _g), do: []
end`]])}function yB(){return V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`defmodule Solution do
  def character_replacement(s, k) do
    {_counts, _window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({%{}, [], 0}, fn g, {counts, window, best} ->
        counts = Map.update(counts, g, 1, &(&1 + 1))
        {counts, window} = shrink(counts, window ++ [g], k)
        {counts, window, max(best, length(window))}
      end)

    best
  end

  # The window is legal while everything that is not the commonest character
  # fits inside the k replacements.
  defp shrink(counts, window, k) do
    commonest = counts |> Map.values() |> Enum.max(fn -> 0 end)

    if length(window) - commonest > k do
      [oldest | rest] = window
      shrink(Map.update!(counts, oldest, &(&1 - 1)), rest, k)
    else
      {counts, window}
    end
  end
end`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`defmodule Solution do
  @alphabet String.graphemes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def character_replacement(s, k) do
    graphemes = String.graphemes(s)
    Enum.reduce(@alphabet, 0, fn target, best -> max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k)) end)
  end

  defp sweep(_left, [], _size, _others, best, _target, _k), do: best

  defp sweep(left, [g | rest], size, others, best, target, k) do
    others = if g == target, do: others, else: others + 1
    {left, size, others} = shrink(left, size + 1, others, target, k)
    sweep(left, rest, size, others, max(best, size), target, k)
  end

  defp shrink([oldest | rest], size, others, target, k) when others > k do
    others = if oldest == target, do: others, else: others - 1
    shrink(rest, size - 1, others, target, k)
  end

  defp shrink(left, size, others, _target, _k), do: {left, size, others}
end`]])}function gB(){return V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`defmodule Solution do
  def inclusion?(s1, s2) do
    need = s1 |> String.graphemes() |> Enum.frequencies()
    size = String.length(s1)
    graphemes = String.graphemes(s2)

    if size > length(graphemes) do
      false
    else
      slide(graphemes, Enum.drop(graphemes, size),
            graphemes |> Enum.take(size) |> Enum.frequencies(), need)
    end
  end

  defp slide(_oldest, _upcoming, window, need) when window == need, do: true
  defp slide(_oldest, [], _window, _need), do: false

  defp slide([out | oldest], [into | upcoming], window, need) do
    window =
      window
      |> Map.update!(out, &(&1 - 1))
      |> then(fn counts -> if counts[out] == 0, do: Map.delete(counts, out), else: counts end)
      |> Map.update(into, 1, &(&1 + 1))

    slide(oldest, upcoming, window, need)
  end
end`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`defmodule Solution do
  def inclusion?(s1, s2) do
    needle = s1 |> String.graphemes() |> Enum.sort()
    size = length(needle)
    graphemes = String.graphemes(s2)

    cond do
      size == 0 -> true
      size > length(graphemes) -> false
      true -> graphemes |> Enum.chunk_every(size, 1, :discard) |> Enum.any?(&(Enum.sort(&1) == needle))
    end
  end
end`]])}function fB(){return V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`defmodule Solution do
  @closers %{"(" => ")", "[" => "]", "{" => "}"}

  def valid?(s) do
    s |> String.graphemes() |> check([])
  end

  defp check([], stack), do: stack == []

  defp check([g | rest], stack) do
    case {Map.fetch(@closers, g), stack} do
      {{:ok, closer}, _} -> check(rest, [closer | stack])
      {:error, [^g | tail]} -> check(rest, tail)
      _ -> false
    end
  end
end`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`defmodule Solution do
  def valid?(s) do
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end`]])}function $B(){return V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`defmodule Solution do
  # Immutable, so the "stack" is a value that each operation returns a new
  # version of. Each entry carries the minimum of everything at or below it.
  def new, do: []

  def push(stack, value) do
    smallest =
      case stack do
        [{_value, current} | _] -> min(value, current)
        [] -> value
      end

    [{value, smallest} | stack]
  end

  def pop([_top | rest]), do: rest
  def pop([]), do: []

  def top([{value, _min} | _]), do: value
  def top([]), do: nil

  def get_min([{_value, minimum} | _]), do: minimum
  def get_min([]), do: nil
end`],["Solution 2 · Two stacks","Values in one stack, running minimums in a parallel one. The two concerns stay separate, which is what makes adding a max stack a copy-paste.",`defmodule Solution do
  # Values in one list, running minimums in a parallel one. The two concerns
  # stay separate, which is what makes adding a max stack a copy-paste.
  def new, do: {[], []}

  def push({values, minimums}, value) do
    smallest =
      case minimums do
        [current | _] -> min(value, current)
        [] -> value
      end

    {[value | values], [smallest | minimums]}
  end

  def pop({[_v | values], [_m | minimums]}), do: {values, minimums}
  def pop(empty), do: empty

  def top({[value | _], _minimums}), do: value
  def top({[], _minimums}), do: nil

  def get_min({_values, [minimum | _]}), do: minimum
  def get_min({_values, []}), do: nil
end`]])}function uB(){return V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`defmodule Solution do
  def daily_temperatures(temps) do
    {answers, _stack} =
      temps
      |> Enum.with_index()
      |> Enum.reduce({%{}, []}, fn {temp, i}, {answers, stack} ->
        {answers, stack} = resolve(answers, stack, temp, i)
        {answers, [{i, temp} | stack]}
      end)

    Enum.map(0..(length(temps) - 1)//1, fn i -> Map.get(answers, i, 0) end)
  end

  defp resolve(answers, [{j, colder} | rest], temp, i) when colder < temp do
    resolve(Map.put(answers, j, i - j), rest, temp, i)
  end

  defp resolve(answers, stack, _temp, _i), do: {answers, stack}
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`defmodule Solution do
  def daily_temperatures(temps) do
    temps
    |> Enum.with_index()
    |> Enum.map(fn {temp, i} ->
      case Enum.find_index(Enum.drop(temps, i + 1), &(&1 > temp)) do
        nil -> 0
        offset -> offset + 1
      end
    end)
  end
end`]])}function nB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`defmodule Solution do
  def search(nums, target) do
    halve(List.to_tuple(nums), target, 0, length(nums) - 1)
  end

  defp halve(_tuple, _target, low, high) when low > high, do: nil

  defp halve(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> halve(tuple, target, mid + 1, high)
      _ -> halve(tuple, target, low, mid - 1)
    end
  end
end`],["Solution 2 · First match scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A plain indexed scan. O(n), so it fails the stated requirement — but it is what the halving has to beat, and it shows exactly what the sortedness buys.`,`defmodule Solution do
  def search(nums, target) do
    Enum.find_index(nums, &(&1 == target))
  end
end`]])}function vB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`defmodule Solution do
  def find_min([]), do: nil

  def find_min(nums) do
    tuple = List.to_tuple(nums)
    narrow(tuple, 0, tuple_size(tuple) - 1)
  end

  defp narrow(tuple, low, high) when low >= high, do: elem(tuple, low)

  defp narrow(tuple, low, high) do
    mid = div(low + high, 2)

    # Anything past a value larger than the last element is still on the high
    # side of the rotation.
    if elem(tuple, mid) > elem(tuple, high) do
      narrow(tuple, mid + 1, high)
    else
      narrow(tuple, low, mid)
    end
  end
end`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`defmodule Solution do
  def find_min([]), do: nil

  def find_min([head | rest]) do
    # O(n), but it makes the shape obvious: a rotated sorted list drops exactly
    # once, and that drop is the minimum. No drop means it was never rotated.
    scan(rest, head, head)
  end

  defp scan([], _previous, head), do: head

  defp scan([n | rest], previous, head) do
    if n < previous, do: n, else: scan(rest, n, head)
  end
end`]])}function mB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`defmodule Solution do
  def search_rotated(nums, target) do
    halve(List.to_tuple(nums), target, 0, length(nums) - 1)
  end

  defp halve(_tuple, _target, low, high) when low > high, do: nil

  defp halve(tuple, target, low, high) do
    mid = div(low + high, 2)
    value = elem(tuple, mid)

    cond do
      value == target ->
        mid

      elem(tuple, low) <= value ->
        # Left half is sorted, so the target's membership in it is a range test.
        if elem(tuple, low) <= target and target < value,
          do: halve(tuple, target, low, mid - 1),
          else: halve(tuple, target, mid + 1, high)

      true ->
        if value < target and target <= elem(tuple, high),
          do: halve(tuple, target, mid + 1, high),
          else: halve(tuple, target, low, mid - 1)
    end
  end
end`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`defmodule Solution do
  def search_rotated(nums, target) do
    tuple = List.to_tuple(nums)
    pivot = rotation_point(nums)
    size = tuple_size(tuple)

    case search(tuple, target, 0, pivot - 1) do
      nil -> search(tuple, target, pivot, size - 1)
      index -> index
    end
  end

  defp rotation_point([]), do: 0

  defp rotation_point([head | rest]) do
    rest
    |> Enum.with_index(1)
    |> Enum.reduce_while({head, 0}, fn {n, i}, {previous, _pivot} ->
      if n < previous, do: {:halt, {n, i}}, else: {:cont, {n, 0}}
    end)
    |> elem(1)
  end

  defp search(_tuple, _target, low, high) when low > high, do: nil

  defp search(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> search(tuple, target, mid + 1, high)
      _ -> search(tuple, target, low, mid - 1)
    end
  end
end`]])}function pB(){return V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
defmodule Solution do
  def encode(strs) do
    Enum.map_join(strs, fn s -> "#{String.length(s)}##{s}" end)
  end

  def decode(s), do: read(s, [])

  defp read("", acc), do: Enum.reverse(acc)

  defp read(rest, acc) do
    [digits, tail] = String.split(rest, "#", parts: 2)
    length = String.to_integer(digits)
    read(String.slice(tail, length..-1//1), [String.slice(tail, 0, length) | acc])
  end
end`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
defmodule Solution do
  @separator "|"
  @escape "\\\\"

  def encode(strs) do
    Enum.map_join(strs, fn s ->
      @separator <>
        (s
         |> String.replace(@escape, @escape <> @escape)
         |> String.replace(@separator, @escape <> @separator))
    end)
  end

  # The leading separator is what tells [] and [""] apart: one encodes to the
  # empty string, the other to a lone separator.
  def decode(""), do: []

  def decode(@separator <> rest), do: unescape(String.graphemes(rest), "", [])

  def decode(_), do: []

  defp unescape([], current, acc), do: Enum.reverse([current | acc])

  defp unescape([@escape, escaped | rest], current, acc),
    do: unescape(rest, current <> escaped, acc)

  defp unescape([@separator | rest], current, acc),
    do: unescape(rest, "", [current | acc])

  defp unescape([g | rest], current, acc), do: unescape(rest, current <> g, acc)
end`]])}function cB(){return V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`defmodule Solution do
  def valid_sudoku?(board) do
    board
    |> filled_cells()
    |> Enum.reduce_while(MapSet.new(), fn {r, c, value}, seen ->
      keys = [
        "#{value} row #{r}",
        "#{value} col #{c}",
        "#{value} box #{div(r, 3) * 3 + div(c, 3)}"
      ]

      if Enum.any?(keys, &MapSet.member?(seen, &1)) do
        {:halt, false}
      else
        {:cont, Enum.into(keys, seen)}
      end
    end)
    |> then(fn result -> result != false end)
  end

  defp filled_cells(board) do
    board
    |> Enum.with_index()
    |> Enum.flat_map(fn {row, r} ->
      row
      |> Enum.with_index()
      |> Enum.reject(fn {value, _c} -> value == "." end)
      |> Enum.map(fn {value, c} -> {r, c, value} end)
    end)
  end
end`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`defmodule Solution do
  def valid_sudoku?(board), do: Enum.all?(units(board), &no_duplicates?/1)

  defp units(board), do: board ++ transpose(board) ++ boxes(board)

  defp transpose(rows), do: Enum.zip_with(rows, & &1)

  defp boxes(board) do
    board
    |> Enum.chunk_every(3)
    |> Enum.flat_map(fn band ->
      band
      |> Enum.map(&Enum.chunk_every(&1, 3))
      |> transpose()
      |> Enum.map(&List.flatten/1)
    end)
  end

  defp no_duplicates?(unit) do
    filled = Enum.reject(unit, &(&1 == "."))
    length(filled) == MapSet.size(MapSet.new(filled))
  end
end`]])}function dB(){return V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`defmodule Solution do
  def trap(height) do
    walk(height, Enum.reverse(height), length(height) - 1, 0, 0, 0)
  end

  # The two pointers are the list read from the front and the list read from the
  # back; \`remaining\` stands in for "left < right", since neither end knows
  # where the other has got to.
  defp walk(_front, _back, remaining, _left_max, _right_max, total)
       when remaining <= 0,
       do: total

  defp walk([l | front_rest] = front, [r | back_rest] = back, remaining, left_max, right_max, total) do
    if l < r do
      left_max = max(left_max, l)
      walk(front_rest, back, remaining - 1, left_max, right_max, total + left_max - l)
    else
      right_max = max(right_max, r)
      walk(front, back_rest, remaining - 1, left_max, right_max, total + right_max - r)
    end
  end
end`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`defmodule Solution do
  def trap(height) do
    left = running_max(height)
    right = height |> Enum.reverse() |> running_max() |> Enum.reverse()

    [left, right, height]
    |> Enum.zip_with(fn [l, r, h] -> min(l, r) - h end)
    |> Enum.sum()
  end

  defp running_max(values), do: Enum.scan(values, 0, &max/2)
end`]])}function sB(){return V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    graphemes = String.graphemes(s)
    need = Enum.frequencies(String.graphemes(t))

    case scan(graphemes, 0, graphemes, 0, need, String.length(t), {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # The window is the gap between two views of the same list: \`right\` is what
  # has not been taken in yet, \`left\` is everything from the window's start
  # onwards. Advancing either end is one list head.
  #
  # This clause matches only while nothing is missing, so the window is valid:
  # record it, then give a character back from the left.
  defp scan(right, right_index, [c | left_rest], left_index, counts, 0, best) do
    length = right_index - left_index

    best =
      if elem(best, 1) == 0 or length < elem(best, 1),
        do: {left_index, length},
        else: best

    raised = Map.get(counts, c, 0) + 1

    scan(
      right,
      right_index,
      left_rest,
      left_index + 1,
      Map.put(counts, c, raised),
      if(raised > 0, do: 1, else: 0),
      best
    )
  end

  defp scan([], _right_index, _left, _left_index, _counts, _missing, best), do: best

  defp scan([c | right_rest], right_index, left, left_index, counts, missing, best) do
    current = Map.get(counts, c, 0)

    scan(
      right_rest,
      right_index + 1,
      left,
      left_index,
      Map.put(counts, c, current - 1),
      if(current > 0, do: missing - 1, else: missing),
      best
    )
  end
end`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    need = Enum.frequencies(String.graphemes(t))

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.filter(fn {c, _i} -> Map.has_key?(need, c) end)
      |> Enum.map(fn {c, i} -> {i, c} end)

    case scan(positions, positions, need, %{}, 0, map_size(need), -1, {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # Counts how many of the needle's distinct characters are fully covered,
  # rather than how many characters are still missing. Same window, different
  # bookkeeping: \`satisfied\` only moves when a count crosses its requirement.
  defp scan(right, left, need, window, satisfied, distinct, last_index, best)

  defp scan(right, [{start, c} | left_rest], need, window, satisfied, distinct, last_index, best)
       when satisfied == distinct do
    length = last_index - start + 1

    best =
      if elem(best, 1) == 0 or length < elem(best, 1), do: {start, length}, else: best

    lowered = Map.get(window, c, 0) - 1

    scan(
      right,
      left_rest,
      need,
      Map.put(window, c, lowered),
      if(lowered < Map.get(need, c, 0), do: satisfied - 1, else: satisfied),
      distinct,
      last_index,
      best
    )
  end

  defp scan([], _left, _need, _window, _satisfied, _distinct, _last_index, best), do: best

  defp scan([{index, c} | right_rest], left, need, window, satisfied, distinct, _last, best) do
    raised = Map.get(window, c, 0) + 1

    scan(
      right_rest,
      left,
      need,
      Map.put(window, c, raised),
      if(raised == Map.get(need, c, 0), do: satisfied + 1, else: satisfied),
      distinct,
      index,
      best
    )
  end
end`]])}function lB(){return V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    blocks = Enum.chunk_every(nums, k)
    left = Enum.flat_map(blocks, &running_max/1)

    right =
      Enum.flat_map(blocks, fn block ->
        block |> Enum.reverse() |> running_max() |> Enum.reverse()
      end)

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    [right, Enum.drop(left, k - 1)]
    |> Enum.zip_with(fn [r, l] -> max(r, l) end)
  end

  # Seeded with the first element rather than zero: the values can be negative.
  defp running_max([]), do: []
  defp running_max([first | rest]), do: [first | Enum.scan(rest, first, &max/2)]
end`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    nums
    |> Enum.chunk_every(k, 1, :discard)
    |> Enum.map(&Enum.max/1)
  end
end`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    values = List.to_tuple(nums)

    {_window, out} =
      nums
      |> Enum.with_index()
      |> Enum.reduce({:queue.new(), []}, fn {num, i}, {window, out} ->
        window =
          window
          |> drop_smaller(num, values)
          |> then(&:queue.in(i, &1))
          |> drop_expired(i - k)

        {window, if(i >= k - 1, do: [elem(values, front(window)) | out], else: out)}
      end)

    Enum.reverse(out)
  end

  # Erlang's :queue rather than a list: this needs both ends, and a list only
  # gives one of them cheaply.
  defp drop_smaller(window, num, values) do
    case :queue.out_r(window) do
      {{:value, index}, rest} ->
        if elem(values, index) <= num, do: drop_smaller(rest, num, values), else: window

      {:empty, _} ->
        window
    end
  end

  defp drop_expired(window, limit) do
    case :queue.peek(window) do
      {:value, index} when index <= limit -> :queue.drop(window)
      _ -> window
    end
  end

  defp front(window) do
    {:value, index} = :queue.peek(window)
    index
  end
end`]])}function iB(){return V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`defmodule Solution do
  def eval_rpn(tokens) do
    case Enum.reduce(tokens, [], &step/2) do
      [answer | _] -> answer
      [] -> 0
    end
  end

  # Erlang's div already truncates towards zero, which is what the problem asks
  # for and what a flooring division does not do for negatives.
  defp step("+", [b, a | rest]), do: [a + b | rest]
  defp step("-", [b, a | rest]), do: [a - b | rest]
  defp step("*", [b, a | rest]), do: [a * b | rest]
  defp step("/", [b, a | rest]), do: [div(a, b) | rest]
  defp step(token, stack), do: [String.to_integer(token) | stack]
end`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`defmodule Solution do
  def eval_rpn(tokens) do
    {value, _rest} = take(Enum.reverse(tokens))
    value
  end

  # Read right to left: the last token is the outermost operator, and each
  # operator takes its right operand first because that is what sits nearer the
  # end. Returns the value and whatever is left to read.
  defp take([token | tail]) when token in ["+", "-", "*", "/"] do
    {right, tail} = take(tail)
    {left, tail} = take(tail)
    {apply_operator(token, left, right), tail}
  end

  defp take([token | tail]), do: {String.to_integer(token), tail}

  defp take([]), do: {0, []}

  defp apply_operator("+", a, b), do: a + b
  defp apply_operator("-", a, b), do: a - b
  defp apply_operator("*", a, b), do: a * b
  defp apply_operator("/", a, b), do: div(a, b)
end`]])}function rB(){return V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`defmodule Solution do
  def generate_parenthesis(n), do: Enum.reverse(build(n, n, "", []))

  # Two counters, one rule each: an opener is legal while any are left, and a
  # closer is legal only while more are outstanding than openers. Everything
  # reached with both at zero is valid by construction.
  defp build(0, 0, current, acc), do: [current | acc]

  defp build(open, close, current, acc) do
    acc = if open > 0, do: build(open - 1, close, current <> "(", acc), else: acc
    if close > open, do: build(open, close - 1, current <> ")", acc), else: acc
  end
end`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`defmodule Solution do
  def generate_parenthesis(n), do: compose(n)

  # Every non-empty balanced string is "(" <> a <> ")" <> b for exactly one
  # split: a is whatever the first bracket encloses, b is whatever follows it.
  # Enumerating the splits enumerates the strings, with no validity rule to
  # check at all.
  defp compose(n) when n <= 0, do: [""]

  defp compose(n) do
    for inner <- 0..(n - 1),
        a <- compose(inner),
        b <- compose(n - 1 - inner),
        do: "(" <> a <> ")" <> b
  end
end`]])}function aB(){return V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`defmodule Solution do
  def car_fleet(target, position, speed) do
    {fleets, _lead_distance, _lead_speed} =
      position
      |> Enum.zip(speed)
      |> Enum.sort_by(fn {pos, _spd} -> pos end, :desc)
      |> Enum.reduce({0, 0, 1}, fn {pos, spd}, {fleets, lead_distance, lead_speed} ->
        distance = target - pos

        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd do
          {fleets + 1, distance, spd}
        else
          {fleets, lead_distance, lead_speed}
        end
      end)

    fleets
  end
end`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`defmodule Solution do
  def car_fleet(target, position, speed) do
    cars = Enum.zip(position, speed)
    Enum.count(cars, &leads?(&1, cars, target))
  end

  # A car leads a fleet exactly when it arrives strictly later than every car
  # ahead of it; anything else means it catches one of them and merges. No
  # sorting, no running state -- O(n^2), and the definition rather than a
  # consequence of it.
  defp leads?({pos, spd}, cars, target) do
    cars
    |> Enum.filter(fn {other_pos, _} -> other_pos > pos end)
    |> Enum.all?(fn {other_pos, other_speed} ->
      (target - pos) * other_speed > (target - other_pos) * spd
    end)
  end
end`]])}function oB(){return V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`defmodule Solution do
  def largest_rectangle_area(heights) do
    n = length(heights)

    {stack, best} =
      heights
      |> Enum.with_index()
      |> Enum.reduce({[], 0}, fn {h, i}, {stack, best} ->
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        {stack, best, start} = close_taller(stack, h, i, best, i)
        {[{start, h} | stack], best}
      end)

    # Whatever survives was never cut off, so it runs to the far end.
    Enum.reduce(stack, best, fn {from, tall}, best -> max(best, tall * (n - from)) end)
  end

  defp close_taller([{from, tall} | rest], height, index, best, _start) when tall > height do
    close_taller(rest, height, index, max(best, tall * (index - from)), from)
  end

  defp close_taller(stack, _height, _index, best, start), do: {stack, best, start}
end`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`defmodule Solution do
  def largest_rectangle_area(heights) do
    indexed = Enum.with_index(heights)

    Enum.reduce(indexed, 0, fn {h, i}, best ->
      # How far this bar's own height can spread in each direction. O(n^2), and
      # the definition of the answer: every rectangle is some bar taken as far
      # as it will go.
      left =
        indexed
        |> Enum.take(i)
        |> Enum.reverse()
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      right =
        indexed
        |> Enum.drop(i + 1)
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      max(best, h * (left + right + 1))
    end)
  end
end`]])}function tB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`defmodule Solution do
  def search_matrix(matrix, target) do
    case find_row(List.to_tuple(matrix), target, 0, length(matrix) - 1) do
      nil -> false
      row -> contains?(List.to_tuple(row), target, 0, length(row) - 1)
    end
  end

  # The rows are sorted and do not overlap, so the row a value could live in is
  # itself found by halving: compare the target against a row's ends.
  defp find_row(_rows, _target, low, high) when low > high, do: nil

  defp find_row(rows, target, low, high) do
    mid = div(low + high, 2)
    row = elem(rows, mid)

    cond do
      List.last(row) < target -> find_row(rows, target, mid + 1, high)
      hd(row) > target -> find_row(rows, target, low, mid - 1)
      true -> row
    end
  end

  defp contains?(_row, _target, low, high) when low > high, do: false

  defp contains?(row, target, low, high) do
    mid = div(low + high, 2)

    cond do
      elem(row, mid) == target -> true
      elem(row, mid) < target -> contains?(row, target, mid + 1, high)
      true -> contains?(row, target, low, mid - 1)
    end
  end
end`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`defmodule Solution do
  def search_matrix([], _target), do: false
  def search_matrix([[] | _], _target), do: false

  def search_matrix(matrix, target) do
    width = length(hd(matrix))
    walk(matrix, width, target)
  end

  # From the top-right corner every step is forced: too big and the whole column
  # is too big, so drop it; too small and the whole row is too small, so drop
  # that. O(m + n), and it never uses the fact that rows do not overlap -- it
  # works on any matrix sorted along both axes.
  defp walk([], _column, _target), do: false
  defp walk(_rows, column, _target) when column <= 0, do: false

  defp walk([row | below] = rows, column, target) do
    value = Enum.at(row, column - 1)

    cond do
      value == target -> true
      value > target -> walk(rows, column - 1, target)
      true -> walk(below, column, target)
    end
  end
end`]])}function eB(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`defmodule Solution do
  def min_eating_speed(piles, h), do: search(piles, h, 1, Enum.max(piles))

  # The search space is the answer, not the input. Feasibility is monotone -- if
  # a speed finishes in time then so does every faster one -- which is exactly
  # the property halving needs.
  defp search(_piles, _h, low, high) when low >= high, do: low

  defp search(piles, h, low, high) do
    mid = div(low + high, 2)

    if hours(piles, mid) <= h,
      do: search(piles, h, low, mid),
      else: search(piles, h, mid + 1, high)
  end

  # A pile never shares an hour with another, so each costs ceil(pile / speed).
  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`defmodule Solution do
  def min_eating_speed(piles, h), do: climb(piles, h, 1, Enum.max(piles))

  defp climb(piles, h, speed, highest) do
    if speed >= highest or hours(piles, speed) <= h,
      do: speed,
      else: climb(piles, h, speed + 1, highest)
  end

  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end`]])}function ZP(){return V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`defmodule Solution do
  # Immutable, so the store is a value that set returns a new version of.
  def new, do: %{}

  # Timestamps only ever increase, so prepending keeps each key's history sorted
  # newest first for free.
  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  def get(store, key, timestamp) do
    case Map.get(store, key) do
      nil -> ""
      history -> newest_at_most(List.to_tuple(history), timestamp, 0, length(history) - 1)
    end
  end

  # The history is sorted newest first, so the newest entry at or before a
  # timestamp is a halving question, not a walk.
  defp newest_at_most(_history, _timestamp, low, high) when low > high, do: ""

  defp newest_at_most(history, timestamp, low, high) do
    mid = div(low + high, 2)
    {stamp, value} = elem(history, mid)

    if stamp <= timestamp do
      case newest_at_most(history, timestamp, low, mid - 1) do
        "" -> value
        newer -> newer
      end
    else
      newest_at_most(history, timestamp, mid + 1, high)
    end
  end
end`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`defmodule Solution do
  def new, do: %{}

  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  # Newest first, so the first entry old enough is the answer. O(n) per lookup
  # against the halving version's O(log n), but there is no split arithmetic to
  # get wrong.
  def get(store, key, timestamp) do
    store
    |> Map.get(key, [])
    |> Enum.find_value("", fn {stamp, value} -> if stamp <= timestamp, do: value end)
  end
end`]])}function JP(){return V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    total = length(nums1) + length(nums2)
    {previous, current} = advance(nums1, nums2, div(total, 2) + 1, 0, 0)

    if rem(total, 2) == 1, do: current / 1, else: (previous + current) / 2
  end

  # Merge, but stop at the middle and keep only the last two values seen: the
  # merged list is never built, so this is O(m + n) time and no extra space.
  defp advance(_a, _b, steps, previous, current) when steps <= 0, do: {previous, current}
  defp advance([], [], _steps, previous, current), do: {previous, current}

  defp advance([x | rest], [y | _] = b, steps, _previous, current) when x <= y,
    do: advance(rest, b, steps - 1, current, x)

  defp advance([x | rest], [], steps, _previous, current),
    do: advance(rest, [], steps - 1, current, x)

  defp advance(a, [y | rest], steps, _previous, current),
    do: advance(a, rest, steps - 1, current, y)
end`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    merged = Enum.sort(nums1 ++ nums2)
    total = length(merged)

    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    (Enum.at(merged, div(total, 2)) + Enum.at(merged, div(total - 1, 2))) / 2
  end
end`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    # Always halve the shorter side, so the search is O(log min(m, n)).
    {a, b} =
      if length(nums1) > length(nums2), do: {nums2, nums1}, else: {nums1, nums2}

    m = length(a)
    total = m + length(b)
    search(List.to_tuple(a), List.to_tuple(b), m, length(b), total, div(total + 1, 2), 0, m)
  end

  defp search(a, b, m, n, total, half, low, high) do
    cut1 = div(low + high, 2)
    cut2 = half - cut1

    left1 = if cut1 > 0, do: elem(a, cut1 - 1), else: :negative
    right1 = if cut1 < m, do: elem(a, cut1), else: :positive
    left2 = if cut2 > 0, do: elem(b, cut2 - 1), else: :negative
    right2 = if cut2 < n, do: elem(b, cut2), else: :positive

    # A correct cut is one where everything left of it is <= everything right of
    # it, across both arrays.
    cond do
      le(left1, right2) and le(left2, right1) ->
        if rem(total, 2) == 1 do
          bigger(left1, left2) / 1
        else
          (bigger(left1, left2) + smaller(right1, right2)) / 2
        end

      not le(left1, right2) ->
        search(a, b, m, n, total, half, low, cut1 - 1)

      true ->
        search(a, b, m, n, total, half, cut1 + 1, high)
    end
  end

  # :negative and :positive stand in for the infinities at the array edges.
  defp le(:negative, _), do: true
  defp le(_, :positive), do: true
  defp le(:positive, _), do: false
  defp le(_, :negative), do: false
  defp le(x, y), do: x <= y

  defp bigger(:negative, y), do: y
  defp bigger(x, :negative), do: x
  defp bigger(x, y), do: max(x, y)

  defp smaller(:positive, y), do: y
  defp smaller(x, :positive), do: x
  defp smaller(x, y), do: min(x, y)
end`]])}function wO(Z){if(Z==="nc01_contains_duplicate")return new D(LB());else if(Z==="nc02_valid_anagram")return new D(BB());else if(Z==="nc03_two_sum")return new D(PB());else if(Z==="nc04_group_anagrams")return new D(SB());else if(Z==="nc05_top_k_frequent")return new D(TB());else if(Z==="nc06_product_except_self")return new D(_B());else if(Z==="nc07_longest_consecutive")return new D(EB());else if(Z==="nc08_valid_palindrome")return new D(CB());else if(Z==="nc09_two_sum_sorted")return new D(wB());else if(Z==="nc10_three_sum")return new D(hB());else if(Z==="nc11_container_water")return new D(kB());else if(Z==="nc12_best_time_stock")return new D(bB());else if(Z==="nc13_longest_substring")return new D(xB());else if(Z==="nc14_character_replacement")return new D(yB());else if(Z==="nc15_permutation_in_string")return new D(gB());else if(Z==="nc16_valid_parentheses")return new D(fB());else if(Z==="nc17_min_stack")return new D($B());else if(Z==="nc18_daily_temperatures")return new D(uB());else if(Z==="nc19_binary_search")return new D(nB());else if(Z==="nc20_find_min_rotated")return new D(vB());else if(Z==="nc21_search_rotated")return new D(mB());else if(Z==="nc22_encode_decode")return new D(pB());else if(Z==="nc23_valid_sudoku")return new D(cB());else if(Z==="nc24_trapping_rain_water")return new D(dB());else if(Z==="nc25_min_window_substring")return new D(sB());else if(Z==="nc26_sliding_window_maximum")return new D(lB());else if(Z==="nc27_eval_rpn")return new D(iB());else if(Z==="nc28_generate_parentheses")return new D(rB());else if(Z==="nc29_car_fleet")return new D(aB());else if(Z==="nc30_largest_rectangle")return new D(oB());else if(Z==="nc31_search_2d_matrix")return new D(tB());else if(Z==="nc32_koko_bananas")return new D(eB());else if(Z==="nc33_time_map")return new D(ZP());else if(Z==="nc34_median_two_sorted")return new D(JP());else return new V1(void 0)}function hO(){return O8(j8+" (Elixir)",PO,(Z)=>{return H0(wO(Z),(J)=>{return[J,U1]})})}function kO(){return O8(j8+" (Gleam)",$J,(Z)=>{return H0(EO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function KP(){return new y(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`def containsDuplicate(nums):
    ordered = sorted(nums)
    for i in range(1, len(ordered)):
        if ordered[i] == ordered[i - 1]:
            return True
    return False`]]),new x("def containsDuplicate(nums):",`def containsDuplicate(nums):
    pass`,`try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))`))}function IP(){return new y(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`def isAnagram(s, t):
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

    return True`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`def isAnagram(s, t):
    return sorted(s) == sorted(t)`]]),new x("def isAnagram(s, t):",`def isAnagram(s, t):
    pass`,`try:
    (isAnagram)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isAnagram('anagram', 'nagaram')", True, isAnagram("anagram", "nagaram"))
__case__("isAnagram('rat', 'car')", False, isAnagram("rat", "car"))
__case__("isAnagram('', '')", True, isAnagram("", ""))
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))`))}function qP(){return new y(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every ordered pair, checked, stopping at the first hit.`,`def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`],["Solution 3 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`def twoSum(nums, target):
    ordered = sorted((num, i) for i, num in enumerate(nums))
    left, right = 0, len(ordered) - 1

    while left < right:
        total = ordered[left][0] + ordered[right][0]
        if total == target:
            return sorted([ordered[left][1], ordered[right][1]])
        if total < target:
            left += 1
        else:
            right -= 1

    return []`]]),new x("def twoSum(nums, target):",`def twoSum(nums, target):
    pass`,`try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [0, 1], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([3, 2, 4], 6)", [1, 2], twoSum([3, 2, 4], 6))
__case__("twoSum([3, 3], 6)", [0, 1], twoSum([3, 3], 6))
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))`))}function WP(){return new y(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`],["Solution 2 · Sorted key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

The sorted word itself is the key. Shorter than tallying letters, and it works for any alphabet rather than just a-z.`,`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups["".join(sorted(s))].append(s)
    return list(groups.values())`]]),new x("def groupAnagrams(strs):",`def groupAnagrams(strs):
    pass`,`try:
    (groupAnagrams)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__normalised__ = sorted(sorted(group) for group in groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
__case__("groupAnagrams(['eat','tea','tan','ate','nat','bat'])", [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]], __normalised__)
__case__("groupAnagrams([])", [], sorted(groupAnagrams([])))
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))`))}function GP(){return new y(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`from collections import Counter

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
    return result`],["Solution 2 · Heapq","A heap of size k keeps only the candidates that can still win: O(n + k log n), and the win is largest when k is much smaller than n.",`import heapq
from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)`],["Solution 3 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Straight sort by frequency: O(n log n) rather than the bucket version's O(n), but it is the version you can write without thinking.`,`def topKFrequent(nums, k):
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]`]]),new x("def topKFrequent(nums, k):",`def topKFrequent(nums, k):
    pass`,`try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))`))}function UP(){return new y(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`def productExceptSelf(nums):
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

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`def productExceptSelf(nums):
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result`]]),new x("def productExceptSelf(nums):",`def productExceptSelf(nums):
    pass`,`try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))`))}function zP(){return new y(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`def longestConsecutive(nums):
    if not nums:
        return 0

    ordered = sorted(nums)
    longest = 1
    run = 1

    for i in range(1, len(ordered)):
        step = ordered[i] - ordered[i - 1]
        if step == 0:
            continue  # duplicates neither extend nor break a run
        if step == 1:
            run += 1
            longest = max(longest, run)
        else:
            run = 1

    return longest`]]),new x("def longestConsecutive(nums):",`def longestConsecutive(nums):
    pass`,`try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))`))}function VP(){return new y(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`def isPalindrome(s):
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

    return True`],["Solution 2 · Cleaned reverse","Strip, then compare against the reverse. Allocates a second string instead of converging two pointers, but it is one line of intent.",`def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`]]),new x("def isPalindrome(s):",`def isPalindrome(s):
    pass`,`try:
    (isPalindrome)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isPalindrome('A man, a plan, a canal: Panama')", True, isPalindrome("A man, a plan, a canal: Panama"))
__case__("isPalindrome('race a car')", False, isPalindrome("race a car"))
__case__("isPalindrome(' ')", True, isPalindrome(" "))
__case__("isPalindrome('0P')", False, isPalindrome("0P"))`))}function jP(){return new y(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`def twoSum(numbers, target):
    for i, number in enumerate(numbers):
        wanted = target - number
        lo, hi = i + 1, len(numbers) - 1
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if numbers[mid] == wanted:
                return [i + 1, mid + 1]
            if numbers[mid] < wanted:
                lo = mid + 1
            else:
                hi = mid - 1
    return []`]]),new x("def twoSum(numbers, target):",`def twoSum(numbers, target):
    pass`,`try:
    (twoSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("twoSum([2, 7, 11, 15], 9)", [1, 2], twoSum([2, 7, 11, 15], 9))
__case__("twoSum([2, 3, 4], 6)", [1, 3], twoSum([2, 3, 4], 6))
__case__("twoSum([-1, 0], -1)", [1, 2], twoSum([-1, 0], -1))
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))`))}function OP(){return new y(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`def threeSum(nums):
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

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`def threeSum(nums):
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            for k in range(j + 1, len(ordered)):
                triple = [ordered[i], ordered[j], ordered[k]]
                if sum(triple) == 0 and triple not in result:
                    result.append(triple)

    return result`]]),new x("def threeSum(nums):",`def threeSum(nums):
    pass`,`try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))`))}function FP(){return new y(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`def maxArea(height):
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best`]]),new x("def maxArea(height):",`def maxArea(height):
    pass`,`try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))`))}function HP(){return new y(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`def maxProfit(prices):
    profit = 0
    for buy in range(len(prices)):
        for sell in range(buy + 1, len(prices)):
            profit = max(profit, prices[sell] - prices[buy])
    return profit`]]),new x("def maxProfit(prices):",`def maxProfit(prices):
    pass`,`try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))`))}function NP(){return new y(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`],["Solution 2 · Index scan","No set and no map: ask the string itself whether this character already appeared inside the current window, and if so restart just past it.",`def lengthOfLongestSubstring(s):
    longest = 0
    start = 0

    for right, char in enumerate(s):
        found = s.find(char, start, right)
        if found != -1:
            start = found + 1
        longest = max(longest, right - start + 1)

    return longest`]]),new x("def lengthOfLongestSubstring(s):",`def lengthOfLongestSubstring(s):
    pass`,`try:
    (lengthOfLongestSubstring)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("lengthOfLongestSubstring('abcabcbb')", 3, lengthOfLongestSubstring("abcabcbb"))
__case__("lengthOfLongestSubstring('bbbbb')", 1, lengthOfLongestSubstring("bbbbb"))
__case__("lengthOfLongestSubstring('pwwkew')", 3, lengthOfLongestSubstring("pwwkew"))
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))`))}function RP(){return new y(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`def characterReplacement(s, k):
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

    return longest`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
    longest = 0

    for target in ALPHABET:
        left = 0
        others = 0
        for right, char in enumerate(s):
            if char != target:
                others += 1
            while others > k:
                if s[left] != target:
                    others -= 1
                left += 1
            longest = max(longest, right - left + 1)

    return longest`]]),new x("def characterReplacement(s, k):",`def characterReplacement(s, k):
    pass`,`try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))`))}function MP(){return new y(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`from collections import Counter

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

    return False`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    needle = sorted(s1)
    size = len(s1)

    for start in range(len(s2) - size + 1):
        if sorted(s2[start:start + size]) == needle:
            return True

    return False`]]),new x("def checkInclusion(s1, s2):",`def checkInclusion(s1, s2):
    pass`,`try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))`))}function AP(){return new y(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`def isValid(s):
    previous = None
    while previous != s:
        previous = s
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return s == ""`]]),new x("def isValid(s):",`def isValid(s):
    pass`,`try:
    (isValid)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isValid('()[]{}')", True, isValid("()[]{}"))
__case__("isValid('(]')", False, isValid("(]"))
__case__("isValid('([)]')", False, isValid("([)]"))
__case__("isValid('{[]}')", True, isValid("{[]}"))
__case__("isValid('(')", False, isValid("("))`))}function DP(){return new y(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`class MinStack:
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
        return self.mins[-1]`],["Solution 2 · Pair stack","Each entry carries the minimum of everything at or below it, so getMin is a peek. One structure instead of two, at the cost of a second number per value.",`class MinStack:
    # Each entry carries the minimum of everything at or below it, so getMin is
    # a peek. One list instead of two, at the cost of storing a second int per
    # value.

    def __init__(self):
        self.entries = []

    def push(self, val):
        current_min = val if not self.entries else min(val, self.entries[-1][1])
        self.entries.append((val, current_min))

    def pop(self):
        self.entries.pop()

    def top(self):
        return self.entries[-1][0]

    def getMin(self):
        return self.entries[-1][1]`]]),new x(`class MinStack:
    def __init__(self):
    def push(self, val):
    def pop(self):
    def top(self):
    def getMin(self):`,`class MinStack:
    def __init__(self):
        pass
    def push(self, val):
        pass
    def pop(self):
        pass
    def top(self):
        pass
    def getMin(self):
        pass`,`try:
    (MinStack)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__stack__ = MinStack()
__stack__.push(-2)
__stack__.push(0)
__stack__.push(-3)
__case__("getMin() after push -2, 0, -3", -3, __stack__.getMin())
__stack__.pop()
__case__("top() after pop()", 0, __stack__.top())
__case__("getMin() after pop()", -2, __stack__.getMin())`))}function LP(){return new y(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`def dailyTemperatures(temperatures):
    result = []
    for i, temp in enumerate(temperatures):
        days = 0
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temp:
                days = j - i
                break
        result.append(days)
    return result`]]),new x("def dailyTemperatures(temperatures):",`def dailyTemperatures(temperatures):
    pass`,`try:
    (dailyTemperatures)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
__case__("dailyTemperatures([30, 40, 50, 60])", [1, 1, 1, 0], dailyTemperatures([30, 40, 50, 60]))
__case__("dailyTemperatures([30, 30, 30])", [0, 0, 0], dailyTemperatures([30, 30, 30]))`))}function BP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`],["Solution 2 · Recursive",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The same halving as recursion. The bounds are arguments rather than mutated locals, which makes each step's invariant easier to see.`,`def search(nums, target):
    return halve(nums, target, 0, len(nums) - 1)

def halve(nums, target, lo, hi):
    if lo > hi:
        return -1

    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return halve(nums, target, mid + 1, hi)
    return halve(nums, target, lo, mid - 1)`]]),new x("def search(nums, target):",`def search(nums, target):
    pass`,`try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([-1, 0, 3, 5, 9, 12], 9)", 4, search([-1, 0, 3, 5, 9, 12], 9))
__case__("search([-1, 0, 3, 5, 9, 12], 2)", -1, search([-1, 0, 3, 5, 9, 12], 2))
__case__("search([5], 5)", 0, search([5], 5))
__case__("search([], 1)", -1, search([], 1))`))}function PP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`def findMin(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return nums[i]
    return nums[0]`]]),new x("def findMin(nums):",`def findMin(nums):
    pass`,`try:
    (findMin)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMin([3, 4, 5, 1, 2])", 1, findMin([3, 4, 5, 1, 2]))
__case__("findMin([4, 5, 6, 7, 0, 1, 2])", 0, findMin([4, 5, 6, 7, 0, 1, 2]))
__case__("findMin([11, 13, 15, 17])", 11, findMin([11, 13, 15, 17]))
__case__("findMin([2, 1])", 1, findMin([2, 1]))`))}function SP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`def search(nums, target):
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

    return -1`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`def search(nums, target):
    pivot = rotationPoint(nums)
    found = binarySearch(nums, target, 0, pivot - 1)
    if found != -1:
        return found
    return binarySearch(nums, target, pivot, len(nums) - 1)

def rotationPoint(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return i
    return 0

def binarySearch(nums, target, lo, hi):
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`]]),new x("def search(nums, target):",`def search(nums, target):
    pass`,`try:
    (search)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("search([4, 5, 6, 7, 0, 1, 2], 0)", 4, search([4, 5, 6, 7, 0, 1, 2], 0))
__case__("search([4, 5, 6, 7, 0, 1, 2], 3)", -1, search([4, 5, 6, 7, 0, 1, 2], 3))
__case__("search([1], 1)", 0, search([1], 1))
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))`))}function TP(){return new y(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
def encode(strs):
    return "".join("%d#%s" % (len(s), s) for s in strs)


def decode(s):
    out = []
    i = 0
    while i < len(s):
        hash_at = s.index("#", i)
        length = int(s[i:hash_at])
        start = hash_at + 1
        out.append(s[start:start + length])
        i = start + length
    return out`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
SEPARATOR = "|"
ESCAPE = "\\\\"


def encode(strs):
    return "".join(
        SEPARATOR + s.replace(ESCAPE, ESCAPE * 2).replace(SEPARATOR, ESCAPE + SEPARATOR)
        for s in strs
    )


def decode(s):
    # The leading separator is what tells [] and [""] apart: one encodes to the
    # empty string, the other to a lone separator.
    if not s:
        return []
    out = []
    current = []
    i = 1
    while i < len(s):
        if s[i] == ESCAPE:
            current.append(s[i + 1])
            i += 2
        elif s[i] == SEPARATOR:
            out.append("".join(current))
            current = []
            i += 1
        else:
            current.append(s[i])
            i += 1
    out.append("".join(current))
    return out`]]),new x(`def encode(strs):

def decode(s):`,`def encode(strs):
    pass

def decode(s):
    pass`,`
try:
    (encode, decode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __round_trip__(strs):
    return decode(encode(strs))

__case__("decode(encode(['neet', 'code', 'love', 'you']))", ["neet", "code", "love", "you"], __round_trip__(["neet", "code", "love", "you"]))
__case__("decode(encode([]))", [], __round_trip__([]))
__case__("decode(encode(['', '']))", ["", ""], __round_trip__(["", ""]))
__case__("decode(encode(['3#x', 'a|b']))", ["3#x", "a|b"], __round_trip__(["3#x", "a|b"]))
__case__("decode(encode(['\\\\\\\\', '|', '#']))", ["\\\\", "|", "#"], __round_trip__(["\\\\", "|", "#"]))`))}function _P(){return new y(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`def isValidSudoku(board):
    seen = set()
    for r, row in enumerate(board):
        for c, value in enumerate(row):
            if value == ".":
                continue
            keys = (
                (value, "row", r),
                (value, "col", c),
                (value, "box", r // 3, c // 3),
            )
            if any(key in seen for key in keys):
                return False
            seen.update(keys)
    return True`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`def isValidSudoku(board):
    return all(noDuplicates(unit) for unit in units(board))


def units(board):
    rows = [list(row) for row in board]
    columns = [list(column) for column in zip(*board)]
    boxes = [
        [board[r][c] for r in range(br, br + 3) for c in range(bc, bc + 3)]
        for br in range(0, 9, 3)
        for bc in range(0, 9, 3)
    ]
    return rows + columns + boxes


def noDuplicates(unit):
    filled = [value for value in unit if value != "."]
    return len(filled) == len(set(filled))`]]),new x("def isValidSudoku(board):",`def isValidSudoku(board):
    pass`,`try:
    (isValidSudoku)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Nine row strings rather than a 9x9 literal: the board stays readable, and a
# single changed cell is what each invalid case is.
__rows__ = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]

def __board__():
    return [list(row) for row in __rows__]

def __with_cell__(r, c, value):
    board = __board__()
    board[r][c] = value
    return board

__case__("isValidSudoku(valid board)", True, isValidSudoku(__board__()))
__case__("isValidSudoku(5 twice in row 0)", False, isValidSudoku(__with_cell__(0, 2, "5")))
__case__("isValidSudoku(5 twice in column 0, different boxes)", False, isValidSudoku(__with_cell__(3, 0, "5")))
__case__("isValidSudoku(3 twice in the top-left box only)", False, isValidSudoku(__with_cell__(2, 0, "3")))
__case__("isValidSudoku(empty board)", True, isValidSudoku([["."] * 9 for _ in range(9)]))`))}function EP(){return new y(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = total = 0

    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            total += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            total += right_max - height[right]
            right -= 1

    return total`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`def trap(height):
    left = []
    best = 0
    for h in height:
        best = max(best, h)
        left.append(best)

    right = [0] * len(height)
    best = 0
    for i in range(len(height) - 1, -1, -1):
        best = max(best, height[i])
        right[i] = best

    return sum(min(left[i], right[i]) - height[i] for i in range(len(height)))`]]),new x("def trap(height):",`def trap(height):
    pass`,`try:
    (trap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", 6, trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
__case__("trap([4, 2, 0, 3, 2, 5])", 9, trap([4, 2, 0, 3, 2, 5]))
__case__("trap([])", 0, trap([]))
__case__("trap([3])", 0, trap([3]))
__case__("trap([2, 0, 2])", 2, trap([2, 0, 2]))
__case__("trap([5, 4, 3, 2, 1])", 0, trap([5, 4, 3, 2, 1]))`))}function CP(){return new y(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    missing = len(t)
    left = 0
    best_start, best_length = 0, 0

    for right, c in enumerate(s):
        if need.get(c, 0) > 0:
            missing -= 1
        need[c] = need.get(c, 0) - 1

        while missing == 0:
            if best_length == 0 or right - left + 1 < best_length:
                best_start, best_length = left, right - left + 1
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1

    return s[best_start:best_start + best_length]`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions = [(i, c) for i, c in enumerate(s) if c in need]

    window = {}
    satisfied = 0
    left = 0
    best_start, best_length = 0, 0

    for right, (index, c) in enumerate(positions):
        window[c] = window.get(c, 0) + 1
        if window[c] == need[c]:
            satisfied += 1

        while satisfied == len(need):
            start = positions[left][0]
            length = index - start + 1
            if best_length == 0 or length < best_length:
                best_start, best_length = start, length
            leaving = positions[left][1]
            window[leaving] -= 1
            if window[leaving] < need[leaving]:
                satisfied -= 1
            left += 1

    return s[best_start:best_start + best_length]`]]),new x("def minWindow(s, t):",`def minWindow(s, t):
    pass`,`try:
    (minWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minWindow('ADOBECODEBANC', 'ABC')", "BANC", minWindow("ADOBECODEBANC", "ABC"))
__case__("minWindow('a', 'a')", "a", minWindow("a", "a"))
__case__("minWindow('a', 'aa')", "", minWindow("a", "aa"))
__case__("minWindow('', 'a')", "", minWindow("", "a"))
__case__("minWindow('ab', '')", "", minWindow("ab", ""))
__case__("minWindow('aaflslflsldkalskaaa', 'aaa')", "aaa", minWindow("aaflslflsldkalskaaa", "aaa"))`))}function wP(){return new y(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []

    n = len(nums)
    left = [0] * n
    right = [0] * n

    for i in range(n):
        left[i] = nums[i] if i % k == 0 else max(left[i - 1], nums[i])
    for i in range(n - 1, -1, -1):
        right[i] = nums[i] if i == n - 1 or (i + 1) % k == 0 else max(right[i + 1], nums[i])

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    return [max(right[i], left[i + k - 1]) for i in range(n - k + 1)]`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`from collections import deque


def maxSlidingWindow(nums, k):
    if k <= 0:
        return []

    window = deque()
    out = []

    for i, num in enumerate(nums):
        while window and nums[window[-1]] <= num:
            window.pop()
        window.append(i)
        if window[0] <= i - k:
            window.popleft()
        if i >= k - 1:
            out.append(nums[window[0]])

    return out`]]),new x("def maxSlidingWindow(nums, k):",`def maxSlidingWindow(nums, k):
    pass`,`try:
    (maxSlidingWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", [3, 3, 5, 5, 6, 7], maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
__case__("maxSlidingWindow([1], 1)", [1], maxSlidingWindow([1], 1))
__case__("maxSlidingWindow([], 3)", [], maxSlidingWindow([], 3))
__case__("maxSlidingWindow([9, 8, 7, 6], 2)", [9, 8, 7], maxSlidingWindow([9, 8, 7, 6], 2))
__case__("maxSlidingWindow([1, -1], 1)", [1, -1], maxSlidingWindow([1, -1], 1))
__case__("maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", [7, 7, 7, 7, 7], maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))`))}function hP(){return new y(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`OPERATORS = "+-*/"


def evalRPN(tokens):
    stack = []
    for token in tokens:
        if token in OPERATORS and len(stack) >= 2:
            b = stack.pop()
            a = stack.pop()
            stack.append(apply(token, a, b))
        else:
            stack.append(int(token))
    return stack[-1] if stack else 0


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    # // floors, so -3 // 2 is -2; the problem wants truncation towards zero.
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`OPERATORS = "+-*/"


def evalRPN(tokens):
    value, _ = take(tokens, len(tokens) - 1)
    return value


# Read right to left: the last token is the outermost operator, and each
# operator takes its right operand first because that is what sits nearer the
# end. Returns the value and the index still to be read.
def take(tokens, i):
    token = tokens[i]
    if token not in OPERATORS:
        return int(token), i - 1
    right, i = take(tokens, i - 1)
    left, i = take(tokens, i)
    return apply(token, left, right), i


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient`]]),new x(`def evalRPN(tokens):

def apply(operator, a, b):`,`def evalRPN(tokens):
    pass

def apply(operator, a, b):
    pass`,`try:
    (evalRPN)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("evalRPN(['2', '1', '+', '3', '*'])", 9, evalRPN(["2", "1", "+", "3", "*"]))
__case__("evalRPN(['4', '13', '5', '/', '+'])", 6, evalRPN(["4", "13", "5", "/", "+"]))
__case__("evalRPN(['-3', '2', '/'])", -1, evalRPN(["-3", "2", "/"]))
__case__("evalRPN(['5'])", 5, evalRPN(["5"]))
__case__("evalRPN(the long one)", 22, evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))`))}function kP(){return new y(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`def generateParenthesis(n):
    out = []

    # Two counters, one rule each: an opener is legal while any are left, and a
    # closer is legal only while more are outstanding than openers. Everything
    # reached with both at zero is valid by construction.
    def build(open_left, close_left, current):
        if open_left == 0 and close_left == 0:
            out.append("".join(current))
            return
        if open_left > 0:
            current.append("(")
            build(open_left - 1, close_left, current)
            current.pop()
        if close_left > open_left:
            current.append(")")
            build(open_left, close_left - 1, current)
            current.pop()

    build(n, n, [])
    return out`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`def generateParenthesis(n):
    return compose(n)


# Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
# is whatever the first bracket encloses, B is whatever follows it. Enumerating
# the splits enumerates the strings, with no validity rule to check at all.
def compose(n):
    if n <= 0:
        return [""]
    return [
        "(" + a + ")" + b
        for inner in range(n)
        for a in compose(inner)
        for b in compose(n - 1 - inner)
    ]`]]),new x("def generateParenthesis(n):",`def generateParenthesis(n):
    pass`,`try:
    (generateParenthesis)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Any order is acceptable, so every case compares sorted.
def __sorted__(n):
    return sorted(generateParenthesis(n))

__case__("generateParenthesis(1)", ["()"], __sorted__(1))
__case__("generateParenthesis(2)", ["(())", "()()"], __sorted__(2))
__case__("generateParenthesis(3)", ["((()))", "(()())", "(())()", "()(())", "()()()"], __sorted__(3))
__case__("generateParenthesis(4) count", 14, len(__sorted__(4)))`))}function bP(){return new y(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)

    fleets = 0
    lead_distance, lead_speed = 0, 1

    for pos, spd in cars:
        distance = target - pos
        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd:
            fleets += 1
            lead_distance, lead_speed = distance, spd

    return fleets`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`def carFleet(target, position, speed):
    cars = list(zip(position, speed))
    return sum(1 for car in cars if leads(car, cars, target))


# A car leads a fleet exactly when it arrives strictly later than every car
# ahead of it; anything else means it catches one of them and merges. No
# sorting, no running state -- O(n^2), and the definition rather than a
# consequence of it.
def leads(car, cars, target):
    pos, spd = car
    return all(
        (target - pos) * other_speed > (target - other_pos) * spd
        for other_pos, other_speed in cars
        if other_pos > pos
    )`]]),new x("def carFleet(target, position, speed):",`def carFleet(target, position, speed):
    pass`,`try:
    (carFleet)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", 3, carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
__case__("carFleet(10, [3], [3])", 1, carFleet(10, [3], [3]))
__case__("carFleet(100, [0, 2, 4], [4, 2, 1])", 1, carFleet(100, [0, 2, 4], [4, 2, 1]))
__case__("carFleet(10, [6, 8], [3, 2])", 2, carFleet(10, [6, 8], [3, 2]))
__case__("carFleet(10, [], [])", 0, carFleet(10, [], []))
__case__("carFleet(10, [0, 4, 2], [2, 1, 3])", 1, carFleet(10, [0, 4, 2], [2, 1, 3]))`))}function xP(){return new y(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`def largestRectangleArea(heights):
    stack = []
    best = 0

    for i, h in enumerate(heights):
        start = i
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        while stack and stack[-1][1] > h:
            from_index, tall = stack.pop()
            best = max(best, tall * (i - from_index))
            start = from_index
        stack.append((start, h))

    # Whatever survives was never cut off, so it runs to the far end.
    for from_index, tall in stack:
        best = max(best, tall * (len(heights) - from_index))

    return best`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`def largestRectangleArea(heights):
    best = 0

    for i, h in enumerate(heights):
        # How far this bar's own height can spread in each direction. O(n^2),
        # and the definition of the answer: every rectangle is some bar taken
        # as far as it will go.
        left = i
        while left > 0 and heights[left - 1] >= h:
            left -= 1
        right = i
        while right + 1 < len(heights) and heights[right + 1] >= h:
            right += 1
        best = max(best, h * (right - left + 1))

    return best`]]),new x("def largestRectangleArea(heights):",`def largestRectangleArea(heights):
    pass`,`try:
    (largestRectangleArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("largestRectangleArea([2, 1, 5, 6, 2, 3])", 10, largestRectangleArea([2, 1, 5, 6, 2, 3]))
__case__("largestRectangleArea([2, 4])", 4, largestRectangleArea([2, 4]))
__case__("largestRectangleArea([])", 0, largestRectangleArea([]))
__case__("largestRectangleArea([1, 1, 1])", 3, largestRectangleArea([1, 1, 1]))
__case__("largestRectangleArea([5])", 5, largestRectangleArea([5]))
__case__("largestRectangleArea([4, 2, 0, 3, 2, 5])", 6, largestRectangleArea([4, 2, 0, 3, 2, 5]))`))}function yP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`def searchMatrix(matrix, target):
    # The rows are sorted and do not overlap, so the row a value could live in
    # is itself found by halving: compare the target against a row's ends.
    low, high = 0, len(matrix) - 1
    while low <= high:
        mid = (low + high) // 2
        if matrix[mid][-1] < target:
            low = mid + 1
        elif matrix[mid][0] > target:
            high = mid - 1
        else:
            return contains(matrix[mid], target)
    return False


def contains(row, target):
    low, high = 0, len(row) - 1
    while low <= high:
        mid = (low + high) // 2
        if row[mid] == target:
            return True
        if row[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return False`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    # From the top-right corner every step is forced: too big and the whole
    # column is too big, so drop it; too small and the whole row is too small,
    # so drop that. O(m + n), and it never uses the fact that rows do not
    # overlap -- it works on any matrix sorted along both axes.
    row, column = 0, len(matrix[0]) - 1
    while row < len(matrix) and column >= 0:
        value = matrix[row][column]
        if value == target:
            return True
        if value > target:
            column -= 1
        else:
            row += 1
    return False`]]),new x(`def searchMatrix(matrix, target):

def contains(row, target):`,`def searchMatrix(matrix, target):
    pass

def contains(row, target):
    pass`,`try:
    (searchMatrix)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__matrix__ = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

__case__("searchMatrix(matrix, 3)", True, searchMatrix(__matrix__, 3))
__case__("searchMatrix(matrix, 13)", False, searchMatrix(__matrix__, 13))
__case__("searchMatrix(matrix, 60)", True, searchMatrix(__matrix__, 60))
__case__("searchMatrix([[1]], 1)", True, searchMatrix([[1]], 1))
__case__("searchMatrix([], 1)", False, searchMatrix([], 1))
__case__("searchMatrix([[1], [3], [5]], 5)", True, searchMatrix([[1], [3], [5]], 5))`))}function gP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`def minEatingSpeed(piles, h):
    # The search space is the answer, not the input. Feasibility is monotone --
    # if a speed finishes in time then so does every faster one -- which is
    # exactly the property halving needs.
    low, high = 1, max(piles)
    while low < high:
        mid = (low + high) // 2
        if hours(piles, mid) <= h:
            high = mid
        else:
            low = mid + 1
    return low


# A pile never shares an hour with another, so each costs ceil(pile / speed).
def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`def minEatingSpeed(piles, h):
    highest = max(piles)
    speed = 1
    while speed < highest and hours(piles, speed) > h:
        speed += 1
    return speed


def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)`]]),new x(`def minEatingSpeed(piles, h):

def hours(piles, speed):`,`def minEatingSpeed(piles, h):
    pass

def hours(piles, speed):
    pass`,`try:
    (minEatingSpeed)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minEatingSpeed([3, 6, 7, 11], 8)", 4, minEatingSpeed([3, 6, 7, 11], 8))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 5)", 30, minEatingSpeed([30, 11, 23, 4, 20], 5))
__case__("minEatingSpeed([30, 11, 23, 4, 20], 6)", 23, minEatingSpeed([30, 11, 23, 4, 20], 6))
__case__("minEatingSpeed([1], 1)", 1, minEatingSpeed([1], 1))
__case__("minEatingSpeed([4, 4, 4, 4], 4)", 4, minEatingSpeed([4, 4, 4, 4], 4))
__case__("minEatingSpeed([1, 1, 1, 10], 4)", 10, minEatingSpeed([1, 1, 1, 10], 4))`))}function fP(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        # Timestamps only ever increase, so appending keeps each key's history
        # sorted for free.
        self.store.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        # The history is sorted, so the newest entry at or before a timestamp is
        # a halving question, not a walk.
        history = self.store.get(key, [])
        low, high = 0, len(history) - 1
        best = ""
        while low <= high:
            mid = (low + high) // 2
            if history[mid][0] <= timestamp:
                best = history[mid][1]
                low = mid + 1
            else:
                high = mid - 1
        return best`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).insert(0, (timestamp, value))

    def get(self, key, timestamp):
        # Newest first, so the first entry old enough is the answer. O(n) per
        # lookup against the halving version's O(log n), but there is no split
        # arithmetic to get wrong.
        for stamp, value in self.store.get(key, []):
            if stamp <= timestamp:
                return value
        return ""`]]),new x(`class TimeMap:
    def __init__(self):
    def set(self, key, value, timestamp):
    def get(self, key, timestamp):`,`class TimeMap:
    def __init__(self):
        pass
    def set(self, key, value, timestamp):
        pass
    def get(self, key, timestamp):
        pass`,`try:
    (TimeMap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__store__ = TimeMap()
__store__.set("foo", "bar", 1)

__case__("get('foo', 1) after set at 1", "bar", __store__.get("foo", 1))
__case__("get('foo', 3) with only the value at 1", "bar", __store__.get("foo", 3))

__store__.set("foo", "bar2", 4)

__case__("get('foo', 4) after set at 4", "bar2", __store__.get("foo", 4))
__case__("get('foo', 5) after set at 4", "bar2", __store__.get("foo", 5))
__case__("get('foo', 3) still sees the older value", "bar", __store__.get("foo", 3))
__case__("get('foo', 0) before anything was set", "", __store__.get("foo", 0))
__case__("get('missing', 1)", "", __store__.get("missing", 1))`))}function $P(){return new y(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`def findMedianSortedArrays(nums1, nums2):
    total = len(nums1) + len(nums2)
    if total == 0:
        return 0.0

    # Merge, but stop at the middle and keep only the last two values seen: the
    # merged array is never built, so this is O(m + n) time and no extra space.
    i = j = 0
    previous = current = 0
    for _ in range(total // 2 + 1):
        previous = current
        if i < len(nums1) and (j >= len(nums2) or nums1[i] <= nums2[j]):
            current = nums1[i]
            i += 1
        else:
            current = nums2[j]
            j += 1

    if total % 2 == 1:
        return float(current)
    return (previous + current) / 2`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`def findMedianSortedArrays(nums1, nums2):
    merged = sorted(nums1 + nums2)
    if not merged:
        return 0.0
    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    return (merged[len(merged) // 2] + merged[(len(merged) - 1) // 2]) / 2`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`def findMedianSortedArrays(nums1, nums2):
    # Always halve the shorter side, so the search is O(log min(m, n)).
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    total = m + n
    if total == 0:
        return 0.0
    half = (total + 1) // 2

    low, high = 0, m
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = half - cut1

        left1 = nums1[cut1 - 1] if cut1 > 0 else float("-inf")
        right1 = nums1[cut1] if cut1 < m else float("inf")
        left2 = nums2[cut2 - 1] if cut2 > 0 else float("-inf")
        right2 = nums2[cut2] if cut2 < n else float("inf")

        # A correct cut is one where everything left of it is <= everything
        # right of it, across both arrays.
        if left1 <= right2 and left2 <= right1:
            if total % 2 == 1:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        if left1 > right2:
            high = cut1 - 1
        else:
            low = cut1 + 1

    return 0.0`]]),new x("def findMedianSortedArrays(nums1, nums2):",`def findMedianSortedArrays(nums1, nums2):
    pass`,`try:
    (findMedianSortedArrays)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMedianSortedArrays([1, 3], [2])", 2.0, findMedianSortedArrays([1, 3], [2]))
__case__("findMedianSortedArrays([1, 2], [3, 4])", 2.5, findMedianSortedArrays([1, 2], [3, 4]))
__case__("findMedianSortedArrays([], [1])", 1.0, findMedianSortedArrays([], [1]))
__case__("findMedianSortedArrays([2], [])", 2.0, findMedianSortedArrays([2], []))
__case__("findMedianSortedArrays([], [])", 0.0, findMedianSortedArrays([], []))
__case__("findMedianSortedArrays([1, 2], [])", 1.5, findMedianSortedArrays([1, 2], []))
__case__("findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", 4.0, findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))`))}function eK(){return new y(V([["Solution 1","",`from collections import Counter

def topTwo(nums):
    return Counter(nums).most_common(2)

def countOf(nums, value):
    return Counter(nums)[value]`],["Solution 2 · Plain dict","What Counter does underneath: a dict of counts, then a sort. Worth writing once so most_common stops being a black box.",`def topTwo(nums):
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return ordered[:2]

def countOf(nums, value):
    return sum(1 for num in nums if num == value)`]]),new x(`def topTwo(nums):

def countOf(nums, value):`,`def topTwo(nums):
    pass

def countOf(nums, value):
    pass`,`try:
    (topTwo, countOf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topTwo([1, 1, 1, 2, 2, 3])", [(1, 3), (2, 2)], topTwo([1, 1, 1, 2, 2, 3]))
__case__("countOf([1, 1, 2], 1)", 2, countOf([1, 1, 2], 1))
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))`))}function ZI(){return new y(V([["Solution 1","",`from collections import defaultdict

def groupByLength(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)`],["Solution 2 · Setdefault","setdefault does the same job as defaultdict without changing the type of the dictionary — handy when the result is returned or serialised, since there is no default factory left attached to it.",`def groupByLength(words):
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups`]]),new x("def groupByLength(words):",`def groupByLength(words):
    pass`,`try:
    (groupByLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("groupByLength(['a', 'bc', 'de', 'f'])", {1: ["a", "f"], 2: ["bc", "de"]}, groupByLength(["a", "bc", "de", "f"]))
__case__("groupByLength([])", {}, groupByLength([]))`))}function JI(){return new y(V([["Solution 1","",`from collections import deque

def bfsOrder(graph, start):
    queue = deque([start])
    seen = {start}
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return order`],["Solution 2 · List queue","A list plus a read cursor. The cursor is the point: list.pop(0) is O(n), so a plain list only stays a good queue if you never shift it.",`def bfsOrder(graph, start):
    queue = [start]
    head = 0
    seen = {start}
    order = []

    while head < len(queue):
        node = queue[head]
        head += 1
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return order`]]),new x("def bfsOrder(graph, start):",`def bfsOrder(graph, start):
    pass`,`try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))`))}function QI(){return new y(V([["Solution 1","",`import heapq

def kSmallest(nums, k):
    heap = list(nums)
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(min(k, len(heap)))]

def kLargest(nums, k):
    heap = [-n for n in nums]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(min(k, len(heap)))]`],["Solution 2 · Sorting","Sorting is O(n log n) against the heap's O(n + k log n). For small k the heap wins; for k near n they are the same, and this is far shorter.",`def kSmallest(nums, k):
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]`]]),new x(`def kSmallest(nums, k):

def kLargest(nums, k):`,`def kSmallest(nums, k):
    pass

def kLargest(nums, k):
    pass`,`try:
    (kSmallest, kLargest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("kSmallest([5, 1, 4, 2], 2)", [1, 2], kSmallest([5, 1, 4, 2], 2))
__case__("kLargest([5, 1, 4, 2], 2)", [5, 4], kLargest([5, 1, 4, 2], 2))
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))`))}function XI(){return new y(V([["Solution 1","",`def firstIndexOf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1

def dotProduct(a, b):
    return sum(x * y for x, y in zip(a, b))`],["Solution 2 · Index loop","Indexing by hand. It works, and it is exactly what enumerate and zip save you from: the off-by-one risk and the second subscript in dotProduct.",`def firstIndexOf(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

def dotProduct(a, b):
    total = 0
    for i in range(min(len(a), len(b))):
        total += a[i] * b[i]
    return total`]]),new x(`def firstIndexOf(nums, target):

def dotProduct(a, b):`,`def firstIndexOf(nums, target):
    pass

def dotProduct(a, b):
    pass`,`try:
    (firstIndexOf, dotProduct)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("firstIndexOf([9, 8, 7], 8)", 1, firstIndexOf([9, 8, 7], 8))
__case__("firstIndexOf([9, 8, 7], 5)", -1, firstIndexOf([9, 8, 7], 5))
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))`))}function YI(){return new y(V([["Solution 1","",`def reversedString(s):
    return s[::-1]

def everySecond(s):
    return s[::2]

def lastN(s, n):
    return s[-n:] if n > 0 else ""

def trimEnds(s):
    return s[1:-1]`],["Solution 2 · Explicit loops","Every slice spelled out as a loop. The slices are better in real code; writing them this way once makes the step and the negative bounds obvious.",`def reversedString(s):
    out = ""
    for char in s:
        out = char + out
    return out

def everySecond(s):
    out = ""
    for i in range(0, len(s), 2):
        out += s[i]
    return out

def lastN(s, n):
    if n <= 0:
        return ""
    return "".join(s[i] for i in range(max(len(s) - n, 0), len(s)))

def trimEnds(s):
    return "".join(s[i] for i in range(1, len(s) - 1))`]]),new x(`def reversedString(s):

def everySecond(s):

def lastN(s, n):

def trimEnds(s):`,`def reversedString(s):
    pass

def everySecond(s):
    pass

def lastN(s, n):
    pass

def trimEnds(s):
    pass`,`try:
    (reversedString, everySecond, lastN, trimEnds)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("reversedString('gleam')", "maelg", reversedString("gleam"))
__case__("everySecond('abcdef')", "ace", everySecond("abcdef"))
__case__("lastN('drill', 3)", "ill", lastN("drill", 3))
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))`))}function KI(){return new y(V([["Solution 1","",`def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))`],["Solution 2 · Decorate sort undecorate","Decorate, sort, undecorate: attach the sort key to each item, sort the pairs, then strip it. `key=` is this pattern built into sorted().",`def sortByLength(words):
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]`]]),new x(`def sortByLength(words):

def sortPairs(pairs):`,`def sortByLength(words):
    pass

def sortPairs(pairs):
    pass`,`try:
    (sortByLength, sortPairs)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("sortByLength(['ccc', 'a', 'bb'])", ["a", "bb", "ccc"], sortByLength(["ccc", "a", "bb"]))
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))`))}function II(){return new y(V([["Solution 1","",`def joinUpper(chars):
    parts = []
    for c in chars:
        parts.append(c.upper())
    return "".join(parts)`],["Solution 2 · Concatenation","The version join exists to replace. Each `+=` builds a whole new string, so this is quadratic in the output length — fine for two characters, painful for a megabyte.",`def joinUpper(chars):
    out = ""
    for c in chars:
        out += c.upper()
    return out`]]),new x("def joinUpper(chars):",`def joinUpper(chars):
    pass`,`try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))`))}function bO(Z){if(Z==="nc01_contains_duplicate")return new D(KP());else if(Z==="nc02_valid_anagram")return new D(IP());else if(Z==="nc03_two_sum")return new D(qP());else if(Z==="nc04_group_anagrams")return new D(WP());else if(Z==="nc05_top_k_frequent")return new D(GP());else if(Z==="nc06_product_except_self")return new D(UP());else if(Z==="nc07_longest_consecutive")return new D(zP());else if(Z==="nc08_valid_palindrome")return new D(VP());else if(Z==="nc09_two_sum_sorted")return new D(jP());else if(Z==="nc10_three_sum")return new D(OP());else if(Z==="nc11_container_water")return new D(FP());else if(Z==="nc12_best_time_stock")return new D(HP());else if(Z==="nc13_longest_substring")return new D(NP());else if(Z==="nc14_character_replacement")return new D(RP());else if(Z==="nc15_permutation_in_string")return new D(MP());else if(Z==="nc16_valid_parentheses")return new D(AP());else if(Z==="nc17_min_stack")return new D(DP());else if(Z==="nc18_daily_temperatures")return new D(LP());else if(Z==="nc19_binary_search")return new D(BP());else if(Z==="nc20_find_min_rotated")return new D(PP());else if(Z==="nc21_search_rotated")return new D(SP());else if(Z==="nc22_encode_decode")return new D(TP());else if(Z==="nc23_valid_sudoku")return new D(_P());else if(Z==="nc24_trapping_rain_water")return new D(EP());else if(Z==="nc25_min_window_substring")return new D(CP());else if(Z==="nc26_sliding_window_maximum")return new D(wP());else if(Z==="nc27_eval_rpn")return new D(hP());else if(Z==="nc28_generate_parentheses")return new D(kP());else if(Z==="nc29_car_fleet")return new D(bP());else if(Z==="nc30_largest_rectangle")return new D(xP());else if(Z==="nc31_search_2d_matrix")return new D(yP());else if(Z==="nc32_koko_bananas")return new D(gP());else if(Z==="nc33_time_map")return new D(fP());else if(Z==="nc34_median_two_sorted")return new D($P());else if(Z==="tip01_counter")return new D(eK());else if(Z==="tip02_defaultdict")return new D(ZI());else if(Z==="tip03_deque")return new D(JI());else if(Z==="tip04_heapq")return new D(QI());else if(Z==="tip05_enumerate_zip")return new D(XI());else if(Z==="tip06_slicing")return new D(YI());else if(Z==="tip07_sort_key")return new D(KI());else if(Z==="tip08_join")return new D(II());else return new V1(void 0)}function yO(){return O8(j8,gJ,(Z)=>{return H0(bO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function nP(){return new y(V([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`export function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Duplicates land next to each other, so comparing neighbouring pairs is enough.`,`export function containsDuplicate(nums: number[]): boolean {
  const ordered = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] === ordered[i - 1]) return true;
  }
  return false;
}`]]),new x("export function containsDuplicate(nums: number[]): boolean",`export function containsDuplicate(nums: number[]): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.containsDuplicate !== "function") throw new Error("__signature_mismatch__");
  return [
    ["containsDuplicate([1, 2, 3, 1])", show(true), show(solution.containsDuplicate([1, 2, 3, 1]))],
    ["containsDuplicate([1, 2, 3, 4])", show(false), show(solution.containsDuplicate([1, 2, 3, 4]))],
    ["containsDuplicate([])", show(false), show(solution.containsDuplicate([]))],
  ];
}`))}function vP(){return new y(V([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();
  for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

  for (const char of t) {
    const remaining = counts.get(char);
    if (remaining === undefined || remaining === 0) return false;
    counts.set(char, remaining - 1);
  }

  return true;
}`],["Solution 2 · Sorting",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Sorted letters are the canonical form, so the whole check is one equality. No counting to get wrong.`,`export function isAnagram(s: string, t: string): boolean {
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}`]]),new x("export function isAnagram(s: string, t: string): boolean",`export function isAnagram(s: string, t: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isAnagram !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isAnagram('anagram', 'nagaram')", show(true), show(solution.isAnagram("anagram", "nagaram"))],
    ["isAnagram('rat', 'car')", show(false), show(solution.isAnagram("rat", "car"))],
    ["isAnagram('', '')", show(true), show(solution.isAnagram("", ""))],
    ["isAnagram('a', 'ab')", show(false), show(solution.isAnagram("a", "ab"))],
  ];
}`))}function mP(){return new y(V([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`],["Solution 2 · Sorted two pointer",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Sorting loses the original positions, which is the whole difficulty here: carry each number's index alongside it and report those at the end.`,`export function twoSum(nums: number[], target: number): number[] {
  const ordered = nums
    .map((num, index) => [num, index] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  let left = 0;
  let right = ordered.length - 1;
  while (left < right) {
    const total = ordered[left][0] + ordered[right][0];
    if (total === target) {
      return [ordered[left][1], ordered[right][1]].sort((a, b) => a - b);
    }
    if (total < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`]]),new x("export function twoSum(nums: number[], target: number): number[]",`export function twoSum(nums: number[], target: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.twoSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["twoSum([2, 7, 11, 15], 9)", show([0, 1]), show(solution.twoSum([2, 7, 11, 15], 9))],
    ["twoSum([3, 2, 4], 6)", show([1, 2]), show(solution.twoSum([3, 2, 4], 6))],
    ["twoSum([3, 3], 6)", show([0, 1]), show(solution.twoSum([3, 3], 6))],
    ["twoSum([1, 2], 7)", show([]), show(solution.twoSum([1, 2], 7))],
  ];
}`))}function pP(){return new y(V([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

Either key works: the sorted word, or a 26-slot letter tally. The tally is O(len) to build against sorting's O(len log len); the sorted word needs no assumption about the alphabet.`,`export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const s of strs) {
    // A 26-slot tally is an anagram-invariant key that costs O(len) rather
    // than O(len log len) to build.
    const tally = new Array(26).fill(0);
    for (const char of s) tally[char.charCodeAt(0) - 97]++;
    const key = tally.join(",");

    const group = groups.get(key);
    if (group) {
      group.push(s);
    } else {
      groups.set(key, [s]);
    }
  }

  return [...groups.values()];
}`],["Solution 2 · Sorted key",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

The sorted word itself is the key. Shorter than tallying letters, and it works for any alphabet rather than just a-z.`,`export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const s of strs) {
    const key = [...s].sort().join("");
    const group = groups.get(key);
    if (group) {
      group.push(s);
    } else {
      groups.set(key, [s]);
    }
  }

  return [...groups.values()];
}`]]),new x("export function groupAnagrams(strs: string[]): string[][]",`export function groupAnagrams(strs: string[]): string[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

/** Groups may come back in any order, and so may their members. */
const normalise = (groups: string[][]) =>
  groups.map((group) => [...group].sort()).sort((a, b) => (a[0] < b[0] ? -1 : 1));

export function run(): [string, string, string][] {
  if (typeof solution.groupAnagrams !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "groupAnagrams(['eat','tea','tan','ate','nat','bat'])",
      show([["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]),
      show(normalise(solution.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))),
    ],
    ["groupAnagrams([])", show([]), show(normalise(solution.groupAnagrams([])))],
    ["groupAnagrams(['a'])", show([["a"]]), show(normalise(solution.groupAnagrams(["a"])))],
  ];
}`))}function cP(){return new y(V([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  // A count can never exceed the input length, so one bucket per frequency
  // covers everything and the answer falls out of a single downward walk.
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, frequency] of counts) buckets[frequency].push(num);

  const result: number[] = [];
  for (let frequency = buckets.length - 1; frequency > 0; frequency--) {
    for (const num of buckets[frequency]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Straight sort by frequency: O(n log n) rather than the bucket version's O(n), but it is the version you can write without thinking.`,`export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`]]),new x("export function topKFrequent(nums: number[], k: number): number[]",`export function topKFrequent(nums: number[], k: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.topKFrequent !== "function") throw new Error("__signature_mismatch__");
  return [
    ["topKFrequent([1, 1, 1, 2, 2, 3], 2)", show([1, 2]), show(solution.topKFrequent([1, 1, 1, 2, 2, 3], 2))],
    ["topKFrequent([1], 1)", show([1]), show(solution.topKFrequent([1], 1))],
    ["topKFrequent([5, 5, 4, 4, 4, 3], 1)", show([4]), show(solution.topKFrequent([5, 5, 4, 4, 4, 3], 1))],
  ];
}`))}function dP(){return new y(V([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`export function productExceptSelf(nums: number[]): number[] {
  const result = new Array(nums.length).fill(1);

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each slot, multiply everything that is not in it. O(n^2), and exactly what the prefix/suffix pass replaces.`,`export function productExceptSelf(nums: number[]): number[] {
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}`]]),new x("export function productExceptSelf(nums: number[]): number[]",`export function productExceptSelf(nums: number[]): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.productExceptSelf !== "function") throw new Error("__signature_mismatch__");
  return [
    ["productExceptSelf([1, 2, 3, 4])", show([24, 12, 8, 6]), show(solution.productExceptSelf([1, 2, 3, 4]))],
    ["productExceptSelf([-1, 1, 0, -3, 3])", show([0, 0, 9, 0, 0]), show(solution.productExceptSelf([-1, 1, 0, -3, 3]))],
    ["productExceptSelf([2, 3])", show([3, 2]), show(solution.productExceptSelf([2, 3]))],
  ];
}`))}function sP(){return new y(V([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`export function longestConsecutive(nums: number[]): number {
  const all = new Set(nums);
  let longest = 0;

  for (const num of all) {
    // Only count from the start of a run, so each run is walked once.
    if (all.has(num - 1)) continue;
    let length = 1;
    while (all.has(num + length)) length++;
    longest = Math.max(longest, length);
  }

  return longest;
}`],["Solution 2 · Sorting",`Sorting first buys order instead of O(1) lookup: what you want to compare ends up adjacent, so one linear pass finishes the job. O(n log n) rather than O(n), but nothing has to hold every value at once and there is no hash structure to reason about.

Runs are contiguous once sorted, so one pass counting steps of exactly one finds the longest. Duplicates neither extend a run nor break it, which is the only case worth care.`,`export function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const ordered = [...nums].sort((a, b) => a - b);
  let longest = 1;
  let run = 1;

  for (let i = 1; i < ordered.length; i++) {
    const step = ordered[i] - ordered[i - 1];
    if (step === 0) continue; // duplicates neither extend nor break a run
    if (step === 1) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  return longest;
}`]]),new x("export function longestConsecutive(nums: number[]): number",`export function longestConsecutive(nums: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.longestConsecutive !== "function") throw new Error("__signature_mismatch__");
  return [
    ["longestConsecutive([100, 4, 200, 1, 3, 2])", show(4), show(solution.longestConsecutive([100, 4, 200, 1, 3, 2]))],
    ["longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", show(9), show(solution.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))],
    ["longestConsecutive([])", show(0), show(solution.longestConsecutive([]))],
  ];
}`))}function lP(){return new y(V([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`],["Solution 2 · Cleaned reverse","Strip, then compare against the reverse. Allocates a second string instead of converging two pointers, but it is one line of intent.",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}`]]),new x("export function isPalindrome(s: string): boolean",`export function isPalindrome(s: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isPalindrome !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isPalindrome('A man, a plan, a canal: Panama')", show(true), show(solution.isPalindrome("A man, a plan, a canal: Panama"))],
    ["isPalindrome('race a car')", show(false), show(solution.isPalindrome("race a car"))],
    ["isPalindrome(' ')", show(true), show(solution.isPalindrome(" "))],
    ["isPalindrome('0P')", show(false), show(solution.isPalindrome("0P"))],
  ];
}`))}function iP(){return new y(V([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

Positions are 1-based here, which is the only trap.`,`export function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`],["Solution 2 · Binary search",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Fix each number in turn and search the tail for its complement, rather than converging two pointers. O(n log n), and it reuses a search you already know instead of a second pointer discipline.`,`export function twoSum(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const wanted = target - numbers[i];
    let lo = i + 1;
    let hi = numbers.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (numbers[mid] === wanted) return [i + 1, mid + 1];
      if (numbers[mid] < wanted) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return [];
}`]]),new x("export function twoSum(numbers: number[], target: number): number[]",`export function twoSum(numbers: number[], target: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.twoSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["twoSum([2, 7, 11, 15], 9)", show([1, 2]), show(solution.twoSum([2, 7, 11, 15], 9))],
    ["twoSum([2, 3, 4], 6)", show([1, 3]), show(solution.twoSum([2, 3, 4], 6))],
    ["twoSum([-1, 0], -1)", show([1, 2]), show(solution.twoSum([-1, 0], -1))],
    ["twoSum([1, 2, 3], 100)", show([]), show(solution.twoSum([1, 2, 3], 100))],
  ];
}`))}function rP(){return new y(V([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`export function threeSum(nums: number[]): number[][] {
  const ordered = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < ordered.length; i++) {
    if (i > 0 && ordered[i] === ordered[i - 1]) continue;

    let left = i + 1;
    let right = ordered.length - 1;
    while (left < right) {
      const total = ordered[i] + ordered[left] + ordered[right];
      if (total < 0) {
        left++;
      } else if (total > 0) {
        right--;
      } else {
        result.push([ordered[i], ordered[left], ordered[right]]);
        left++;
        while (left < right && ordered[left] === ordered[left - 1]) left++;
      }
    }
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every triple, checked. Sorting first means each triple comes out in ascending order, so collapsing the duplicates that repeated values produce is plain equality — no set needed.`,`export function threeSum(nums: number[]): number[][] {
  const ordered = [...nums].sort((a, b) => a - b);
  const seen = new Set<string>();
  const result: number[][] = [];

  for (let i = 0; i < ordered.length; i++) {
    for (let j = i + 1; j < ordered.length; j++) {
      for (let k = j + 1; k < ordered.length; k++) {
        if (ordered[i] + ordered[j] + ordered[k] !== 0) continue;
        const triple = [ordered[i], ordered[j], ordered[k]];
        const key = triple.join(",");
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(triple);
      }
    }
  }

  return result;
}`]]),new x("export function threeSum(nums: number[]): number[][]",`export function threeSum(nums: number[]): number[][] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

/** Triples are compared as a set: only their contents are meaningful. */
const normalise = (triples: number[][]) => triples.map((t) => show(t)).sort();

export function run(): [string, string, string][] {
  if (typeof solution.threeSum !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "threeSum([-1, 0, 1, 2, -1, -4])",
      show(["[-1,-1,2]", "[-1,0,1]"]),
      show(normalise(solution.threeSum([-1, 0, 1, 2, -1, -4]))),
    ],
    ["threeSum([0, 1, 1])", show([]), show(normalise(solution.threeSum([0, 1, 1])))],
    ["threeSum([0, 0, 0])", show(["[0,0,0]"]), show(normalise(solution.threeSum([0, 0, 0])))],
  ];
}`))}function aP(){return new y(V([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    // Moving the taller line in can never help: the shorter one caps the area.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every pair of lines, measured. O(n^2), but it makes what the two-pointer sweep is maximising explicit: shorter line times distance.`,`export function maxArea(height: number[]): number {
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}`]]),new x("export function maxArea(height: number[]): number",`export function maxArea(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}`))}function oP(){return new y(V([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`export function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let profit = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    profit = Math.max(profit, price - lowest);
  }
  return profit;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every buy day against every later sell day. O(n^2), and the problem statement written out.`,`export function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      profit = Math.max(profit, prices[sell] - prices[buy]);
    }
  }
  return profit;
}`]]),new x("export function maxProfit(prices: number[]): number",`export function maxProfit(prices: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxProfit !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxProfit([7, 1, 5, 3, 6, 4])", show(5), show(solution.maxProfit([7, 1, 5, 3, 6, 4]))],
    ["maxProfit([7, 6, 4, 3, 1])", show(0), show(solution.maxProfit([7, 6, 4, 3, 1]))],
    ["maxProfit([])", show(0), show(solution.maxProfit([]))],
  ];
}`))}function tP(){return new y(V([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`export function lengthOfLongestSubstring(s: string): number {
  const window = new Set<string>();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }
    window.add(s[right]);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}`],["Solution 2 · Index scan","No set and no map: ask the string itself whether this character already appeared inside the current window, and if so restart just past it.",`export function lengthOfLongestSubstring(s: string): number {
  let longest = 0;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const found = s.slice(start, right).indexOf(s[right]);
    if (found !== -1) start = start + found + 1;
    longest = Math.max(longest, right - start + 1);
  }

  return longest;
}`]]),new x("export function lengthOfLongestSubstring(s: string): number",`export function lengthOfLongestSubstring(s: string): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.lengthOfLongestSubstring !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lengthOfLongestSubstring('abcabcbb')", show(3), show(solution.lengthOfLongestSubstring("abcabcbb"))],
    ["lengthOfLongestSubstring('bbbbb')", show(1), show(solution.lengthOfLongestSubstring("bbbbb"))],
    ["lengthOfLongestSubstring('pwwkew')", show(3), show(solution.lengthOfLongestSubstring("pwwkew"))],
    ["lengthOfLongestSubstring('')", show(0), show(solution.lengthOfLongestSubstring(""))],
  ];
}`))}function eP(){return new y(V([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`export function characterReplacement(s: string, k: number): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxCount = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    const count = (counts.get(s[right]) ?? 0) + 1;
    counts.set(s[right], count);
    maxCount = Math.max(maxCount, count);

    while (right - left + 1 - maxCount > k) {
      counts.set(s[left], (counts.get(s[left]) ?? 1) - 1);
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}`],["Solution 2 · Per character","One sweep per letter, asking a much simpler question each time: how long a window can I hold if *this* is the letter I keep? No running frequency map and no max-count bookkeeping — 26 easy passes instead of one subtle one.",`const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function characterReplacement(s: string, k: number): number {
  let longest = 0;

  for (const target of ALPHABET) {
    let left = 0;
    let others = 0;
    for (let right = 0; right < s.length; right++) {
      if (s[right] !== target) others++;
      while (others > k) {
        if (s[left] !== target) others--;
        left++;
      }
      longest = Math.max(longest, right - left + 1);
    }
  }

  return longest;
}`]]),new x("export function characterReplacement(s: string, k: number): number",`export function characterReplacement(s: string, k: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.characterReplacement !== "function") throw new Error("__signature_mismatch__");
  return [
    ["characterReplacement('ABAB', 2)", show(4), show(solution.characterReplacement("ABAB", 2))],
    ["characterReplacement('AABABBA', 1)", show(4), show(solution.characterReplacement("AABABBA", 1))],
    ["characterReplacement('AAAA', 0)", show(4), show(solution.characterReplacement("AAAA", 0))],
  ];
}`))}function ZS(){return new y(V([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  // Fixed 26-slot tallies, compared slot by slot as the window slides.
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const slot = (char: string) => char.charCodeAt(0) - 97;

  for (let i = 0; i < s1.length; i++) {
    need[slot(s1[i])]++;
    window[slot(s2[i])]++;
  }

  const matches = () => need.every((count, i) => count === window[i]);
  if (matches()) return true;

  for (let i = s1.length; i < s2.length; i++) {
    window[slot(s2[i])]++;
    window[slot(s2[i - s1.length])]--;
    if (matches()) return true;
  }

  return false;
}`],["Solution 2 · Sorted windows",'Every window of the right length, sorted and compared against the sorted needle. Slower than sliding counts, but there is no incremental state to get wrong: the whole method is "is this window an anagram?".',`export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const needle = [...s1].sort().join("");
  for (let start = 0; start + s1.length <= s2.length; start++) {
    if ([...s2.slice(start, start + s1.length)].sort().join("") === needle) {
      return true;
    }
  }

  return false;
}`]]),new x("export function checkInclusion(s1: string, s2: string): boolean",`export function checkInclusion(s1: string, s2: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.checkInclusion !== "function") throw new Error("__signature_mismatch__");
  return [
    ["checkInclusion('ab', 'eidbaooo')", show(true), show(solution.checkInclusion("ab", "eidbaooo"))],
    ["checkInclusion('ab', 'eidboaoo')", show(false), show(solution.checkInclusion("ab", "eidboaoo"))],
    ["checkInclusion('adc', 'dcda')", show(true), show(solution.checkInclusion("adc", "dcda"))],
  ];
}`))}function JS(){return new y(V([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`export function isValid(s: string): boolean {
  const closerFor: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  for (const char of s) {
    if (closerFor[char]) {
      stack.push(closerFor[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}`],["Solution 2 · Reduction",'No stack: strip every matched pair, over and over, until nothing more can go. Whatever survives is unmatched. It is also why "([)]" fails — neither pair is ever adjacent.',`export function isValid(s: string): boolean {
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}`]]),new x("export function isValid(s: string): boolean",`export function isValid(s: string): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isValid !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValid('()[]{}')", show(true), show(solution.isValid("()[]{}"))],
    ["isValid('(]')", show(false), show(solution.isValid("(]"))],
    ["isValid('([)]')", show(false), show(solution.isValid("([)]"))],
    ["isValid('{[]}')", show(true), show(solution.isValid("{[]}"))],
    ["isValid('(')", show(false), show(solution.isValid("("))],
  ];
}`))}function QS(){return new y(V([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`export class MinStack {
  private values: number[] = [];
  private minimums: number[] = [];

  push(val: number): void {
    this.values.push(val);
    const smallest = this.minimums.length === 0
      ? val
      : Math.min(val, this.minimums[this.minimums.length - 1]);
    this.minimums.push(smallest);
  }

  pop(): void {
    this.values.pop();
    this.minimums.pop();
  }

  top(): number {
    return this.values[this.values.length - 1];
  }

  getMin(): number {
    return this.minimums[this.minimums.length - 1];
  }
}`],["Solution 2 · Pair stack","Each entry carries the minimum of everything at or below it, so getMin is a peek. One structure instead of two, at the cost of a second number per value.",`export class MinStack {
  private entries: [number, number][] = [];

  push(val: number): void {
    const smallest = this.entries.length === 0
      ? val
      : Math.min(val, this.entries[this.entries.length - 1][1]);
    this.entries.push([val, smallest]);
  }

  pop(): void {
    this.entries.pop();
  }

  top(): number {
    return this.entries[this.entries.length - 1][0];
  }

  getMin(): number {
    return this.entries[this.entries.length - 1][1];
  }
}`]]),new x(`export class MinStack
  push(val: number): void
  pop(): void
  top(): number
  getMin(): number`,`export class MinStack {
  push(val: number): void {
    // todo
  }
  pop(): void {
    // todo
  }
  top(): number {
    // todo
  }
  getMin(): number {
    // todo
  }
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.MinStack !== "function") throw new Error("__signature_mismatch__");
  const stack = new solution.MinStack();
  stack.push(-2);
  stack.push(0);
  stack.push(-3);
  const minAfterPushes = stack.getMin();
  stack.pop();
  return [
    ["getMin() after push -2, 0, -3", show(-3), show(minAfterPushes)],
    ["top() after pop()", show(0), show(stack.top())],
    ["getMin() after pop()", show(-2), show(stack.getMin())],
  ];
}`))}function XS(){return new y(V([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`export function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // indices, temperatures decreasing

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const earlier = stack.pop()!;
      result[earlier] = i - earlier;
    }
    stack.push(i);
  }

  return result;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

For each day, scan forward until it gets warmer. O(n^2) — the monotonic stack exists only to avoid rescanning the same cold stretch once per day.`,`export function dailyTemperatures(temperatures: number[]): number[] {
  return temperatures.map((temp, i) => {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temp) return j - i;
    }
    return 0;
  });
}`]]),new x("export function dailyTemperatures(temperatures: number[]): number[]",`export function dailyTemperatures(temperatures: number[]): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.dailyTemperatures !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])",
      show([1, 1, 4, 2, 1, 1, 0, 0]),
      show(solution.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])),
    ],
    ["dailyTemperatures([30, 40, 50, 60])", show([1, 1, 1, 0]), show(solution.dailyTemperatures([30, 40, 50, 60]))],
    ["dailyTemperatures([30, 30, 30])", show([0, 0, 0]), show(solution.dailyTemperatures([30, 30, 30]))],
  ];
}`))}function YS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Worth writing until the bounds are automatic: this is the search every rotated-array problem is built on top of.`,`export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`],["Solution 2 · Recursive",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The same halving as recursion. The bounds are arguments rather than mutated locals, which makes each step's invariant easier to see.`,`export function search(nums: number[], target: number): number {
  return halve(nums, target, 0, nums.length - 1);
}

function halve(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return halve(nums, target, mid + 1, hi);
  return halve(nums, target, lo, mid - 1);
}`]]),new x("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([-1, 0, 3, 5, 9, 12], 9)", show(4), show(solution.search([-1, 0, 3, 5, 9, 12], 9))],
    ["search([-1, 0, 3, 5, 9, 12], 2)", show(-1), show(solution.search([-1, 0, 3, 5, 9, 12], 2))],
    ["search([5], 5)", show(0), show(solution.search([5], 5))],
    ["search([], 1)", show(-1), show(solution.search([], 1))],
  ];
}`))}function KS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The minimum is the one place order breaks. Compare the midpoint against a boundary: a segment that still looks sorted cannot hold the break, so the answer is in the other half.`,`export function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = (left + right) >> 1;
    // Anything past a value larger than the last element is still on the high
    // side of the rotation.
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

O(n) rather than O(log n), but it makes the shape obvious: a rotated sorted array drops in value exactly once, and that drop is the minimum. No drop means it was never rotated, so the head wins.`,`export function findMin(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return nums[i];
  }
  return nums[0];
}`]]),new x("export function findMin(nums: number[]): number",`export function findMin(nums: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMin !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMin([3, 4, 5, 1, 2])", show(1), show(solution.findMin([3, 4, 5, 1, 2]))],
    ["findMin([4, 5, 6, 7, 0, 1, 2])", show(0), show(solution.findMin([4, 5, 6, 7, 0, 1, 2]))],
    ["findMin([11, 13, 15, 17])", show(11), show(solution.findMin([11, 13, 15, 17]))],
    ["findMin([2, 1])", show(1), show(solution.findMin([2, 1]))],
  ];
}`))}function IS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The twist: after a rotation, one half around the midpoint is always sorted. Work out which, then use its endpoints to decide whether the target lies inside it.`,`export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // Left half is sorted.
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted.
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`],["Solution 2 · Find pivot",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Two plain steps instead of one clever one: find where the rotation wrapped, which leaves two ordinary sorted runs, then search each. Nothing has to reason mid-search about which half is sorted.`,`export function search(nums: number[], target: number): number {
  const pivot = rotationPoint(nums);
  const found = binarySearch(nums, target, 0, pivot - 1);
  if (found !== -1) return found;
  return binarySearch(nums, target, pivot, nums.length - 1);
}

function rotationPoint(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return i;
  }
  return 0;
}

function binarySearch(nums: number[], target: number, lo: number, hi: number): number {
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}`]]),new x("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([4, 5, 6, 7, 0, 1, 2], 0)", show(4), show(solution.search([4, 5, 6, 7, 0, 1, 2], 0))],
    ["search([4, 5, 6, 7, 0, 1, 2], 3)", show(-1), show(solution.search([4, 5, 6, 7, 0, 1, 2], 3))],
    ["search([1], 1)", show(0), show(solution.search([1], 1))],
    ["search([4, 5, 6, 7, 0, 1, 2], 6)", show(2), show(solution.search([4, 5, 6, 7, 0, 1, 2], 6))],
  ];
}`))}function qS(){return new y(V([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
export function encode(strs: string[]): string {
  return strs.map((s) => \`\${s.length}#\${s}\`).join("");
}

export function decode(s: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const hashAt = s.indexOf("#", i);
    const length = Number(s.slice(i, hashAt));
    const start = hashAt + 1;
    out.push(s.slice(start, start + length));
    i = start + length;
  }
  return out;
}`],["Solution 2 · Escaping",'The other honest answer: pick a separator and make it safe by escaping it, and escaping the escape. Note the leading separator rather than a join — without it, [] and [""] both encode to the empty string, which is the case that catches most first attempts.',`
const SEPARATOR = "|";
const ESCAPE = "\\\\";

export function encode(strs: string[]): string {
  return strs
    .map(
      (s) =>
        SEPARATOR +
        s.split(ESCAPE).join(ESCAPE + ESCAPE).split(SEPARATOR).join(ESCAPE + SEPARATOR),
    )
    .join("");
}

export function decode(s: string): string[] {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  if (s === "") return [];
  const out: string[] = [];
  let current = "";
  let i = 1;
  while (i < s.length) {
    if (s[i] === ESCAPE) {
      current += s[i + 1];
      i += 2;
    } else if (s[i] === SEPARATOR) {
      out.push(current);
      current = "";
      i += 1;
    } else {
      current += s[i];
      i += 1;
    }
  }
  out.push(current);
  return out;
}`]]),new x(`export function encode(strs: string[]): string

export function decode(s: string): string[]`,`export function encode(strs: string[]): string {
  // todo
}

export function decode(s: string): string[] {
  // todo
}`,`
import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Only the round trip is specified: any encoding is fine as long as decode
// undoes it, so every case runs both directions.
const roundTrip = (strs: string[]) => solution.decode(solution.encode(strs));

export function run(): [string, string, string][] {
  if (typeof solution.encode !== "function" || typeof solution.decode !== "function") {
    throw new Error("__signature_mismatch__");
  }
  return [
    ["decode(encode(['neet', 'code', 'love', 'you']))", show(["neet", "code", "love", "you"]), show(roundTrip(["neet", "code", "love", "you"]))],
    ["decode(encode([]))", show([]), show(roundTrip([]))],
    ["decode(encode(['', '']))", show(["", ""]), show(roundTrip(["", ""]))],
    ["decode(encode(['3#x', 'a|b']))", show(["3#x", "a|b"]), show(roundTrip(["3#x", "a|b"]))],
    ["decode(encode(['\\\\\\\\', '|', '#']))", show(["\\\\", "|", "#"]), show(roundTrip(["\\\\", "|", "#"]))],
  ];
}`))}function WS(){return new y(V([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`export function isValidSudoku(board: string[][]): boolean {
  const seen = new Set<string>();
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const value = board[r][c];
      if (value === ".") continue;
      const keys = [
        \`\${value} row \${r}\`,
        \`\${value} col \${c}\`,
        \`\${value} box \${Math.floor(r / 3) * 3 + Math.floor(c / 3)}\`,
      ];
      if (keys.some((key) => seen.has(key))) return false;
      for (const key of keys) seen.add(key);
    }
  }
  return true;
}`],["Solution 2 · By unit",'Turn the board into the 27 things being constrained — nine rows, nine columns, nine boxes — and the problem collapses to "does any of these contain a repeat?". More passes than the signature set, but the constraint is stated once and the box arithmetic is confined to building the units.',`export function isValidSudoku(board: string[][]): boolean {
  return units(board).every(noDuplicates);
}

function units(board: string[][]): string[][] {
  const columns = board[0].map((_, c) => board.map((row) => row[c]));
  const boxes: string[][] = [];
  for (let br = 0; br < 9; br += 3) {
    for (let bc = 0; bc < 9; bc += 3) {
      const box: string[] = [];
      for (let r = br; r < br + 3; r++) {
        for (let c = bc; c < bc + 3; c++) box.push(board[r][c]);
      }
      boxes.push(box);
    }
  }
  return [...board, ...columns, ...boxes];
}

function noDuplicates(unit: string[]): boolean {
  const filled = unit.filter((value) => value !== ".");
  return filled.length === new Set(filled).size;
}`]]),new x("export function isValidSudoku(board: string[][]): boolean",`export function isValidSudoku(board: string[][]): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Nine row strings rather than a 9x9 literal: the board stays readable, and a
// single changed cell is what each invalid case is.
const ROWS = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79",
];

const board = () => ROWS.map((row) => row.split(""));

const withCell = (r: number, c: number, value: string) => {
  const grid = board();
  grid[r][c] = value;
  return grid;
};

export function run(): [string, string, string][] {
  if (typeof solution.isValidSudoku !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValidSudoku(valid board)", show(true), show(solution.isValidSudoku(board()))],
    ["isValidSudoku(5 twice in row 0)", show(false), show(solution.isValidSudoku(withCell(0, 2, "5")))],
    ["isValidSudoku(5 twice in column 0, different boxes)", show(false), show(solution.isValidSudoku(withCell(3, 0, "5")))],
    ["isValidSudoku(3 twice in the top-left box only)", show(false), show(solution.isValidSudoku(withCell(2, 0, "3")))],
    ["isValidSudoku(empty board)", show(true), show(solution.isValidSudoku(Array.from({ length: 9 }, () => Array(9).fill("."))))],
  ];
}`))}function GS(){return new y(V([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`export function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      total += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      total += rightMax - height[right];
      right--;
    }
  }

  return total;
}`],["Solution 2 · Prefix maxima","State the definition and compute it. Water above a position is min(tallest to its left, tallest to its right) minus its own height, so build both running maxima and sum the differences. Two extra arrays against the two-pointer version's none, but the formula is right there in the code.",`export function trap(height: number[]): number {
  const left: number[] = [];
  let best = 0;
  for (const h of height) {
    best = Math.max(best, h);
    left.push(best);
  }

  const right = new Array<number>(height.length);
  best = 0;
  for (let i = height.length - 1; i >= 0; i--) {
    best = Math.max(best, height[i]);
    right[i] = best;
  }

  return height.reduce((total, h, i) => total + Math.min(left[i], right[i]) - h, 0);
}`]]),new x("export function trap(height: number[]): number",`export function trap(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.trap !== "function") throw new Error("__signature_mismatch__");
  return [
    ["trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", show(6), show(solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))],
    ["trap([4, 2, 0, 3, 2, 5])", show(9), show(solution.trap([4, 2, 0, 3, 2, 5]))],
    ["trap([])", show(0), show(solution.trap([]))],
    ["trap([3])", show(0), show(solution.trap([3]))],
    ["trap([2, 0, 2])", show(2), show(solution.trap([2, 0, 2]))],
    ["trap([5, 4, 3, 2, 1])", show(0), show(solution.trap([5, 4, 3, 2, 1]))],
  ];
}`))}function US(){return new y(V([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if ((need.get(c) ?? 0) > 0) missing--;
    need.set(c, (need.get(c) ?? 0) - 1);

    while (missing === 0) {
      if (bestLength === 0 || right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      const leaving = s[left];
      need.set(leaving, (need.get(leaving) ?? 0) + 1);
      if ((need.get(leaving) ?? 0) > 0) missing++;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}`],["Solution 2 · Filtered positions","Two changes from the counting version, both worth knowing. First, throw away every position whose character is not in the needle: for a long haystack and a short needle, that is nearly the whole walk gone. Second, track how many distinct requirements are fully covered rather than how many characters remain — the counter only moves when a count crosses its requirement.",`export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  // Only the positions that could possibly matter. For a long haystack and a
  // short needle this is a far shorter walk than the whole string.
  const positions: [number, string][] = [];
  for (let i = 0; i < s.length; i++) {
    if (need.has(s[i])) positions.push([i, s[i]]);
  }

  const window = new Map<string, number>();
  let satisfied = 0;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (const [index, c] of positions) {
    window.set(c, (window.get(c) ?? 0) + 1);
    if (window.get(c) === need.get(c)) satisfied++;

    while (satisfied === need.size) {
      const [start, leaving] = positions[left];
      const length = index - start + 1;
      if (bestLength === 0 || length < bestLength) {
        bestStart = start;
        bestLength = length;
      }
      window.set(leaving, (window.get(leaving) ?? 0) - 1);
      if ((window.get(leaving) ?? 0) < (need.get(leaving) ?? 0)) satisfied--;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}`]]),new x("export function minWindow(s: string, t: string): string",`export function minWindow(s: string, t: string): string {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minWindow('ADOBECODEBANC', 'ABC')", show("BANC"), show(solution.minWindow("ADOBECODEBANC", "ABC"))],
    ["minWindow('a', 'a')", show("a"), show(solution.minWindow("a", "a"))],
    ["minWindow('a', 'aa')", show(""), show(solution.minWindow("a", "aa"))],
    ["minWindow('', 'a')", show(""), show(solution.minWindow("", "a"))],
    ["minWindow('ab', '')", show(""), show(solution.minWindow("ab", ""))],
    ["minWindow('aaflslflsldkalskaaa', 'aaa')", show("aaa"), show(solution.minWindow("aaflslflsldkalskaaa", "aaa"))],
  ];
}`))}function zS(){return new y(V([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];

  const n = nums.length;
  const left = new Array<number>(n);
  const right = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    left[i] = i % k === 0 ? nums[i] : Math.max(left[i - 1], nums[i]);
  }
  for (let i = n - 1; i >= 0; i--) {
    right[i] = i === n - 1 || (i + 1) % k === 0 ? nums[i] : Math.max(right[i + 1], nums[i]);
  }

  // Every window of width k straddles at most one block boundary, so it is
  // covered by a suffix of one block and a prefix of the next.
  const out: number[] = [];
  for (let i = 0; i + k <= n; i++) out.push(Math.max(right[i], left[i + k - 1]));
  return out;
}`],["Solution 2 · Brute force",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every window, maximised. O(n·k) rather than O(n), which is exactly the rescanning the other two variants exist to avoid.`,`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];
  const out: number[] = [];
  for (let i = 0; i + k <= nums.length; i++) out.push(Math.max(...nums.slice(i, i + k)));
  return out;
}`],["Solution 3 · Monotonic deque","The classic answer. Hold the indices whose value could still be the maximum, kept in decreasing order: a new value pops every smaller one off the back, because they can never win again while it is in the window. The front is always the answer, and the front leaves once it falls out of range. Each index is pushed and popped once.",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0) return [];

  // Indices, their values decreasing. \`head\` rather than shift(), which would
  // make every expiry O(n) and quietly undo the point of the deque.
  const window: number[] = [];
  let head = 0;
  const out: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (window.length > head && nums[window[window.length - 1]] <= nums[i]) window.pop();
    window.push(i);
    if (window[head] <= i - k) head++;
    if (i >= k - 1) out.push(nums[window[head]]);
  }

  return out;
}`]]),new x("export function maxSlidingWindow(nums: number[], k: number): number[]",`export function maxSlidingWindow(nums: number[], k: number): number[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxSlidingWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", show([3, 3, 5, 5, 6, 7]), show(solution.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))],
    ["maxSlidingWindow([1], 1)", show([1]), show(solution.maxSlidingWindow([1], 1))],
    ["maxSlidingWindow([], 3)", show([]), show(solution.maxSlidingWindow([], 3))],
    ["maxSlidingWindow([9, 8, 7, 6], 2)", show([9, 8, 7]), show(solution.maxSlidingWindow([9, 8, 7, 6], 2))],
    ["maxSlidingWindow([1, -1], 1)", show([1, -1]), show(solution.maxSlidingWindow([1, -1], 1))],
    ["maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", show([7, 7, 7, 7, 7]), show(solution.maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))],
  ];
}`))}function VS(){return new y(V([["Solution 1","A stack is the whole evaluator. Numbers go on; an operator takes the top two off and puts its result back. The one detail worth remembering is the order — the value popped first is the right operand — and that the division truncates towards zero, which is not what a flooring division does for negatives.",`const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (OPERATORS.has(token) && stack.length >= 2) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(apply(token, a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.length ? stack[stack.length - 1] : 0;
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  // trunc, not floor: the problem wants -3 / 2 to be -1.
  return Math.trunc(a / b);
}`],["Solution 2 · Recursive","The same grammar, read as a recursive descent instead of a loop. The last token is the outermost operator; each operator asks for its right operand first, because that is what sits nearer the end. What the stack version stores in a list, this one stores in the call stack.",`const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  return take(tokens, tokens.length - 1)[0];
}

// Read right to left: the last token is the outermost operator, and each
// operator takes its right operand first because that is what sits nearer the
// end. Returns the value and the index still to be read.
function take(tokens: string[], i: number): [number, number] {
  const token = tokens[i];
  if (!OPERATORS.has(token)) return [Number(token), i - 1];
  const [right, afterRight] = take(tokens, i - 1);
  const [left, afterLeft] = take(tokens, afterRight);
  return [apply(token, left, right), afterLeft];
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  return Math.trunc(a / b);
}`]]),new x("export function evalRPN(tokens: string[]): number",`export function evalRPN(tokens: string[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.evalRPN !== "function") throw new Error("__signature_mismatch__");
  return [
    ["evalRPN(['2', '1', '+', '3', '*'])", show(9), show(solution.evalRPN(["2", "1", "+", "3", "*"]))],
    ["evalRPN(['4', '13', '5', '/', '+'])", show(6), show(solution.evalRPN(["4", "13", "5", "/", "+"]))],
    ["evalRPN(['-3', '2', '/'])", show(-1), show(solution.evalRPN(["-3", "2", "/"]))],
    ["evalRPN(['5'])", show(5), show(solution.evalRPN(["5"]))],
    ["evalRPN(the long one)", show(22), show(solution.evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))],
  ];
}`))}function jS(){return new y(V([["Solution 1","Backtracking with two counters and one rule each: an opener is legal while any are left, a closer only while more are outstanding than openers. Nothing invalid is ever built, so there is no filtering step — every leaf reached with both counters at zero is an answer.",`export function generateParenthesis(n: number): string[] {
  const out: string[] = [];

  // Two counters, one rule each: an opener is legal while any are left, and a
  // closer is legal only while more are outstanding than openers. Everything
  // reached with both at zero is valid by construction.
  const build = (openLeft: number, closeLeft: number, current: string) => {
    if (openLeft === 0 && closeLeft === 0) {
      out.push(current);
      return;
    }
    if (openLeft > 0) build(openLeft - 1, closeLeft, current + "(");
    if (closeLeft > openLeft) build(openLeft, closeLeft - 1, current + ")");
  };

  build(n, n, "");
  return out;
}`],["Solution 2 · By composition",'Structure instead of search. Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A is what the first bracket encloses, B is what follows it. Enumerating the splits enumerates the strings, and there is no validity rule anywhere — the shape of the recursion is the rule.',`export function generateParenthesis(n: number): string[] {
  return compose(n);
}

// Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
// is whatever the first bracket encloses, B is whatever follows it. Enumerating
// the splits enumerates the strings, with no validity rule to check at all.
function compose(n: number): string[] {
  if (n <= 0) return [""];
  const out: string[] = [];
  for (let inner = 0; inner < n; inner++) {
    for (const a of compose(inner)) {
      for (const b of compose(n - 1 - inner)) out.push(\`(\${a})\${b}\`);
    }
  }
  return out;
}`]]),new x("export function generateParenthesis(n: number): string[]",`export function generateParenthesis(n: number): string[] {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Any order is acceptable, so every case compares sorted.
const sorted = (n: number) => [...solution.generateParenthesis(n)].sort();

export function run(): [string, string, string][] {
  if (typeof solution.generateParenthesis !== "function") throw new Error("__signature_mismatch__");
  return [
    ["generateParenthesis(1)", show(["()"]), show(sorted(1))],
    ["generateParenthesis(2)", show(["(())", "()()"]), show(sorted(2))],
    ["generateParenthesis(3)", show(["((()))", "(()())", "(())()", "()(())", "()()()"]), show(sorted(3))],
    ["generateParenthesis(4) count", show(14), show(sorted(4).length)],
  ];
}`))}function OS(){return new y(V([["Solution 1","Sort from the front backwards and carry the arrival time of the fleet ahead. A car that would arrive later than that fleet can never catch it, so it starts a new one and becomes the time to beat; anything else merges. Comparing times as distance × speed cross-multiplied keeps the whole thing in integers.",`export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  cars.sort((a, b) => b[0] - a[0]);

  let fleets = 0;
  let leadDistance = 0;
  let leadSpeed = 1;

  for (const [pos, spd] of cars) {
    const distance = target - pos;
    // distance/spd > leadDistance/leadSpeed, cross-multiplied so the arrival
    // times never have to become fractions.
    if (distance * leadSpeed > leadDistance * spd) {
      fleets++;
      leadDistance = distance;
      leadSpeed = spd;
    }
  }

  return fleets;
}`],["Solution 2 · Pairwise",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

A car leads a fleet exactly when it arrives strictly later than every car ahead of it. Checking that directly needs no sort and no running state — O(n²), and it is the definition the sorted scan is a consequence of.`,`export function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position.map((pos, i) => [pos, speed[i]] as [number, number]);
  return cars.filter((car) => leads(car, cars, target)).length;
}

// A car leads a fleet exactly when it arrives strictly later than every car
// ahead of it; anything else means it catches one of them and merges. No
// sorting, no running state -- O(n^2), and the definition rather than a
// consequence of it.
function leads(car: [number, number], cars: [number, number][], target: number): boolean {
  const [pos, spd] = car;
  return cars
    .filter(([otherPos]) => otherPos > pos)
    .every(([otherPos, otherSpeed]) => (target - pos) * otherSpeed > (target - otherPos) * spd);
}`]]),new x("export function carFleet(target: number, position: number[], speed: number[]): number",`export function carFleet(target: number, position: number[], speed: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.carFleet !== "function") throw new Error("__signature_mismatch__");
  return [
    ["carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", show(3), show(solution.carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))],
    ["carFleet(10, [3], [3])", show(1), show(solution.carFleet(10, [3], [3]))],
    ["carFleet(100, [0, 2, 4], [4, 2, 1])", show(1), show(solution.carFleet(100, [0, 2, 4], [4, 2, 1]))],
    ["carFleet(10, [6, 8], [3, 2])", show(2), show(solution.carFleet(10, [6, 8], [3, 2]))],
    ["carFleet(10, [], [])", show(0), show(solution.carFleet(10, [], []))],
    ["carFleet(10, [0, 4, 2], [2, 1, 3])", show(1), show(solution.carFleet(10, [0, 4, 2], [2, 1, 3]))],
  ];
}`))}function FS(){return new y(V([["Solution 1","A monotonic stack of (starting index, height), heights increasing. A shorter bar arriving means every taller entry can never extend further, so each is closed off and measured — and the earliest position they reached back to becomes the new bar's own start, because it can extend back over all of them. Whatever is left at the end was never cut off, so it runs to the far edge.",`export function largestRectangleArea(heights: number[]): number {
  const stack: [number, number][] = [];
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    // Anything taller than the new bar can never extend past it, so its
    // rectangle is finished here. Whatever it reached back to becomes this
    // bar's own starting point.
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [from, tall] = stack.pop()!;
      best = Math.max(best, tall * (i - from));
      start = from;
    }
    stack.push([start, heights[i]]);
  }

  // Whatever survives was never cut off, so it runs to the far end.
  for (const [from, tall] of stack) {
    best = Math.max(best, tall * (heights.length - from));
  }

  return best;
}`],["Solution 2 · Expand from each bar",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Every rectangle is some bar taken as far as it will go, so take each bar and walk outwards while the neighbours are at least as tall. O(n²), and it makes plain what the stack is actually computing: the two boundaries where a bar stops fitting.`,`export function largestRectangleArea(heights: number[]): number {
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    // How far this bar's own height can spread in each direction. O(n^2), and
    // the definition of the answer: every rectangle is some bar taken as far as
    // it will go.
    let left = i;
    while (left > 0 && heights[left - 1] >= heights[i]) left--;
    let right = i;
    while (right + 1 < heights.length && heights[right + 1] >= heights[i]) right++;
    best = Math.max(best, heights[i] * (right - left + 1));
  }

  return best;
}`]]),new x("export function largestRectangleArea(heights: number[]): number",`export function largestRectangleArea(heights: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.largestRectangleArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["largestRectangleArea([2, 1, 5, 6, 2, 3])", show(10), show(solution.largestRectangleArea([2, 1, 5, 6, 2, 3]))],
    ["largestRectangleArea([2, 4])", show(4), show(solution.largestRectangleArea([2, 4]))],
    ["largestRectangleArea([])", show(0), show(solution.largestRectangleArea([]))],
    ["largestRectangleArea([1, 1, 1])", show(3), show(solution.largestRectangleArea([1, 1, 1]))],
    ["largestRectangleArea([5])", show(5), show(solution.largestRectangleArea([5]))],
    ["largestRectangleArea([4, 2, 0, 3, 2, 5])", show(6), show(solution.largestRectangleArea([4, 2, 0, 3, 2, 5]))],
  ];
}`))}function HS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Twice: the rows do not overlap, so which row a value could be in is itself a halving question — compare the target against a row's first and last entries — and then the row is an ordinary sorted array.`,`export function searchMatrix(matrix: number[][], target: number): boolean {
  // The rows are sorted and do not overlap, so the row a value could live in is
  // itself found by halving: compare the target against a row's ends.
  let low = 0;
  let high = matrix.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const row = matrix[mid];
    if (row[row.length - 1] < target) low = mid + 1;
    else if (row[0] > target) high = mid - 1;
    else return contains(row, target);
  }
  return false;
}

function contains(row: number[], target: number): boolean {
  let low = 0;
  let high = row.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (row[mid] === target) return true;
    if (row[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}`],["Solution 2 · Staircase","Start at the top-right corner and every step is forced: a value too big rules out its whole column, a value too small rules out its whole row. O(m + n) rather than O(log mn), but it never uses the fact that the rows do not overlap, so it still works on a matrix that is merely sorted along both axes.",`export function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  // From the top-right corner every step is forced: too big and the whole
  // column is too big, so drop it; too small and the whole row is too small, so
  // drop that. O(m + n), and it never uses the fact that rows do not overlap --
  // it works on any matrix sorted along both axes.
  let row = 0;
  let column = matrix[0].length - 1;
  while (row < matrix.length && column >= 0) {
    const value = matrix[row][column];
    if (value === target) return true;
    if (value > target) column--;
    else row++;
  }
  return false;
}`]]),new x("export function searchMatrix(matrix: number[][], target: number): boolean",`export function searchMatrix(matrix: number[][], target: number): boolean {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const MATRIX = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];

export function run(): [string, string, string][] {
  if (typeof solution.searchMatrix !== "function") throw new Error("__signature_mismatch__");
  return [
    ["searchMatrix(matrix, 3)", show(true), show(solution.searchMatrix(MATRIX, 3))],
    ["searchMatrix(matrix, 13)", show(false), show(solution.searchMatrix(MATRIX, 13))],
    ["searchMatrix(matrix, 60)", show(true), show(solution.searchMatrix(MATRIX, 60))],
    ["searchMatrix([[1]], 1)", show(true), show(solution.searchMatrix([[1]], 1))],
    ["searchMatrix([], 1)", show(false), show(solution.searchMatrix([], 1))],
    ["searchMatrix([[1], [3], [5]], 5)", show(true), show(solution.searchMatrix([[1], [3], [5]], 5))],
  ];
}`))}function NS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

The search space is the answer, not the input. What makes it work is that feasibility is monotone: if a speed finishes in time then so does every faster one, so "the smallest speed that works" is a boundary to halve towards.`,`export function minEatingSpeed(piles: number[], h: number): number {
  // The search space is the answer, not the input. Feasibility is monotone --
  // if a speed finishes in time then so does every faster one -- which is
  // exactly the property halving needs.
  let low = 1;
  let high = Math.max(...piles);
  while (low < high) {
    const mid = (low + high) >> 1;
    if (hours(piles, mid) <= h) high = mid;
    else low = mid + 1;
  }
  return low;
}

// A pile never shares an hour with another, so each costs ceil(pile / speed).
function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}`],["Solution 2 · Linear scan",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Try 1, then 2, then 3, and stop at the first speed that fits. O(max pile) calls to the same feasibility check the halving version makes O(log max pile) of — worth writing once, because getting the check right is most of the problem.`,`export function minEatingSpeed(piles: number[], h: number): number {
  const highest = Math.max(...piles);
  let speed = 1;
  while (speed < highest && hours(piles, speed) > h) speed++;
  return speed;
}

function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}`]]),new x("export function minEatingSpeed(piles: number[], h: number): number",`export function minEatingSpeed(piles: number[], h: number): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minEatingSpeed !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minEatingSpeed([3, 6, 7, 11], 8)", show(4), show(solution.minEatingSpeed([3, 6, 7, 11], 8))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 5)", show(30), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 5))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 6)", show(23), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 6))],
    ["minEatingSpeed([1], 1)", show(1), show(solution.minEatingSpeed([1], 1))],
    ["minEatingSpeed([4, 4, 4, 4], 4)", show(4), show(solution.minEatingSpeed([4, 4, 4, 4], 4))],
    ["minEatingSpeed([1, 1, 1, 10], 4)", show(10), show(solution.minEatingSpeed([1, 1, 1, 10], 4))],
  ];
}`))}function RS(){return new y(V([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

Timestamps only ever increase, so each key's history is already sorted and needs no sorting on write. The lookup is "newest entry at or before this time", which is a halving question: keep the candidate, then keep looking on the newer side for a better one.`,`export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    // Timestamps only ever increase, so appending keeps each key's history
    // sorted for free.
    const history = this.store.get(key);
    if (history) history.push([timestamp, value]);
    else this.store.set(key, [[timestamp, value]]);
  }

  get(key: string, timestamp: number): string {
    // The history is sorted, so the newest entry at or before a timestamp is a
    // halving question, not a walk.
    const history = this.store.get(key) ?? [];
    let low = 0;
    let high = history.length - 1;
    let best = "";
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (history[mid][0] <= timestamp) {
        best = history[mid][1];
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return best;
  }
}`],["Solution 2 · Linear scan","Store newest first and the lookup is the first entry old enough — one `find`, no split arithmetic. O(n) per lookup against the halving version's O(log n), which for a key with a handful of versions is the faster of the two in practice.",`export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    this.store.set(key, [[timestamp, value], ...(this.store.get(key) ?? [])]);
  }

  get(key: string, timestamp: number): string {
    // Newest first, so the first entry old enough is the answer. O(n) per
    // lookup against the halving version's O(log n), but there is no split
    // arithmetic to get wrong.
    for (const [stamp, value] of this.store.get(key) ?? []) {
      if (stamp <= timestamp) return value;
    }
    return "";
  }
}`]]),new x(`export class TimeMap
  set(key: string, value: string, timestamp: number): void
  get(key: string, timestamp: number): string`,`export class TimeMap {
  set(key: string, value: string, timestamp: number): void {
    // todo
  }
  get(key: string, timestamp: number): string {
    // todo
  }
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.TimeMap !== "function") throw new Error("__signature_mismatch__");

  const store = new solution.TimeMap();
  store.set("foo", "bar", 1);

  const cases: [string, string, string][] = [
    ["get('foo', 1) after set at 1", show("bar"), show(store.get("foo", 1))],
    ["get('foo', 3) with only the value at 1", show("bar"), show(store.get("foo", 3))],
  ];

  store.set("foo", "bar2", 4);

  cases.push(["get('foo', 4) after set at 4", show("bar2"), show(store.get("foo", 4))]);
  cases.push(["get('foo', 5) after set at 4", show("bar2"), show(store.get("foo", 5))]);
  cases.push(["get('foo', 3) still sees the older value", show("bar"), show(store.get("foo", 3))]);
  cases.push(["get('foo', 0) before anything was set", show(""), show(store.get("foo", 0))]);
  cases.push(["get('missing', 1)", show(""), show(store.get("missing", 1))]);

  return cases;
}`))}function MS(){return new y(V([["Solution 1","Merging, but stopping at the middle and keeping only the last two values seen. The merged array is never built, so it is O(m + n) time and O(1) space. The two values are what makes the even case work: the median is then the average of the middle pair.",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  if (total === 0) return 0;

  // Merge, but stop at the middle and keep only the last two values seen: the
  // merged array is never built, so this is O(m + n) time and no extra space.
  let i = 0;
  let j = 0;
  let previous = 0;
  let current = 0;
  for (let step = 0; step <= Math.floor(total / 2); step++) {
    previous = current;
    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  return total % 2 === 1 ? current : (previous + current) / 2;
}`],["Solution 2 · Concat sort",`The honest baseline the clever version has to beat. It is the problem statement written out, so it is the one you can always reach for when the optimisation will not come — and having it next to the fast version makes clear exactly what the fast version buys.

Concatenate, sort, take the middle. O((m+n) log(m+n)) and it throws away the fact that both inputs were already sorted — but the indexing is worth seeing once, because averaging positions n/2 and (n-1)/2 handles both parities in one expression.`,`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  if (merged.length === 0) return 0;
  // One expression for both parities: for an odd length the two indices are the
  // same element, so the average of it with itself is itself.
  return (merged[Math.floor(merged.length / 2)] + merged[Math.floor((merged.length - 1) / 2)]) / 2;
}`],["Solution 3 · Partition search","The O(log min(m, n)) answer, and the reason the problem is rated hard. Do not look for the median: look for a cut through both arrays with exactly half the elements to its left. Such a cut is correct when both left-hand values are no bigger than both right-hand values, and that condition is monotone in where you cut the shorter array — so halve on the cut position.",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Always halve the shorter side, so the search is O(log min(m, n)).
  let a = nums1;
  let b = nums2;
  if (a.length > b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;
  const total = m + n;
  if (total === 0) return 0;
  const half = Math.floor((total + 1) / 2);

  let low = 0;
  let high = m;
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = half - cut1;

    const left1 = cut1 > 0 ? a[cut1 - 1] : -Infinity;
    const right1 = cut1 < m ? a[cut1] : Infinity;
    const left2 = cut2 > 0 ? b[cut2 - 1] : -Infinity;
    const right2 = cut2 < n ? b[cut2] : Infinity;

    // A correct cut is one where everything left of it is <= everything right
    // of it, across both arrays.
    if (left1 <= right2 && left2 <= right1) {
      if (total % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }
    if (left1 > right2) high = cut1 - 1;
    else low = cut1 + 1;
  }

  return 0;
}`]]),new x("export function findMedianSortedArrays(nums1: number[], nums2: number[]): number",`export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMedianSortedArrays !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMedianSortedArrays([1, 3], [2])", show(2), show(solution.findMedianSortedArrays([1, 3], [2]))],
    ["findMedianSortedArrays([1, 2], [3, 4])", show(2.5), show(solution.findMedianSortedArrays([1, 2], [3, 4]))],
    ["findMedianSortedArrays([], [1])", show(1), show(solution.findMedianSortedArrays([], [1]))],
    ["findMedianSortedArrays([2], [])", show(2), show(solution.findMedianSortedArrays([2], []))],
    ["findMedianSortedArrays([], [])", show(0), show(solution.findMedianSortedArrays([], []))],
    ["findMedianSortedArrays([1, 2], [])", show(1.5), show(solution.findMedianSortedArrays([1, 2], []))],
    ["findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", show(4), show(solution.findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))],
  ];
}`))}function gO(Z){if(Z==="nc01_contains_duplicate")return new D(nP());else if(Z==="nc02_valid_anagram")return new D(vP());else if(Z==="nc03_two_sum")return new D(mP());else if(Z==="nc04_group_anagrams")return new D(pP());else if(Z==="nc05_top_k_frequent")return new D(cP());else if(Z==="nc06_product_except_self")return new D(dP());else if(Z==="nc07_longest_consecutive")return new D(sP());else if(Z==="nc08_valid_palindrome")return new D(lP());else if(Z==="nc09_two_sum_sorted")return new D(iP());else if(Z==="nc10_three_sum")return new D(rP());else if(Z==="nc11_container_water")return new D(aP());else if(Z==="nc12_best_time_stock")return new D(oP());else if(Z==="nc13_longest_substring")return new D(tP());else if(Z==="nc14_character_replacement")return new D(eP());else if(Z==="nc15_permutation_in_string")return new D(ZS());else if(Z==="nc16_valid_parentheses")return new D(JS());else if(Z==="nc17_min_stack")return new D(QS());else if(Z==="nc18_daily_temperatures")return new D(XS());else if(Z==="nc19_binary_search")return new D(YS());else if(Z==="nc20_find_min_rotated")return new D(KS());else if(Z==="nc21_search_rotated")return new D(IS());else if(Z==="nc22_encode_decode")return new D(qS());else if(Z==="nc23_valid_sudoku")return new D(WS());else if(Z==="nc24_trapping_rain_water")return new D(GS());else if(Z==="nc25_min_window_substring")return new D(US());else if(Z==="nc26_sliding_window_maximum")return new D(zS());else if(Z==="nc27_eval_rpn")return new D(VS());else if(Z==="nc28_generate_parentheses")return new D(jS());else if(Z==="nc29_car_fleet")return new D(OS());else if(Z==="nc30_largest_rectangle")return new D(FS());else if(Z==="nc31_search_2d_matrix")return new D(HS());else if(Z==="nc32_koko_bananas")return new D(NS());else if(Z==="nc33_time_map")return new D(RS());else if(Z==="nc34_median_two_sorted")return new D(MS());else return new V1(void 0)}function fO(){return O8(j8+" (TypeScript)",BO,(Z)=>{return H0(gO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function F8(Z,J,Q){return new C4(Z,J,U9(Z),H1(Q.solutions,(X)=>{return new Q7(X[0],X[1],X[2])}),gJ,new a(Q.check),U1)}function $O(){return new w4("Python Tips",V([new j0("Idioms",V([F8("Counter for frequency maps","Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",eK()),F8("defaultdict for grouping","Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",ZI()),F8("deque for O(1) popleft","Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",JI()),F8("heapq for min/max heaps","Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",QI()),F8("Enumerate, zip, and unpacking","Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",XI()),F8("Slicing and reversal","Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",YI()),F8("Sorting with a key","Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",KI()),F8("Building strings efficiently","Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",II())]))]))}var V9="System Design";function BS(){return $}function PS(){return $}function SS(){return $}function TS(){return $}function _S(){return $}function Z0(Z,J,Q,X,Y,K){return new C4(Z,J,"",$,TO,U1,new a(new vK(Q,X,Y,K)))}function ES(){return V([Z0("Partitioning, sharding and replication","You have used all three words in one sentence and the interviewer asks you to be precise. Which statement is right?",V(["Replication and sharding both divide a data set into subsets; partitioning is the term for copying those subsets to other nodes","Replication makes copies of data on different nodes; partitioning and sharding both divide a data set into subsets, but sharding implies those subsets are distributed across multiple nodes and partitioning does not","Sharding makes copies of data across nodes; partitioning divides a data set into subsets on one node; replication is the general term for both","Partitioning is a physical layout on disk; sharding is the logical division above it; replication is orthogonal to both"]),1,"Replication makes copies of data - replicas - stored on different nodes. Partitioning and sharding both divide a data set into subsets; sharding implies the subsets are distributed across multiple nodes, partitioning does not.","p111"),Z0("Where three-megabyte objects belong","Your service stores user-uploaded objects averaging 3 MB, read far more often than written, streamed to clients on request. Database or filesystem, and on what grounds?",V(["Database, as a BLOB column, so the object stays transactionally consistent with its metadata row","Either - below about 10 MB the choice makes no measurable difference to read latency","Database, sharded by object ID, so reads spread evenly across the cluster","Filesystem - objects larger than 1 MB belong there; database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow"]),3,"The 2006 Microsoft rule of thumb: objects smaller than 256 KB are best stored in a database; objects larger than 1 MB are best on the filesystem. Between 256 KB and 1 MB, the read:write ratio and the rate of overwrite decide. Also: database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow.","p111"),Z0("Read replicas for a write-heavy load","Your single-leader database is saturating on writes. A teammate proposes adding four read replicas. Does that solve the problem?",V(["No - single-leader replication scales reads, not writes, and the entire database must still fit on the single leader host","Yes - once provisioned, replicas can accept writes and forward them to the leader asynchronously","Yes, provided the replicas are synchronous, which lets the leader acknowledge writes without waiting for disk","Yes - adding a second tier of replicas below the first spreads write load across both tiers"]),0,"Single-leader replication scales reads, not writes. Its limits: the entire database must fit on a single host, and followers are eventually consistent because write replication takes time.","p112-115"),Z0("Sizing a quorum","You have 7 nodes and want quorum reads and writes that guarantee consistency. Which pair of quorum sizes does the rule give you?",V(["Read 3, write 3","Read 2, write 5","Read 4, write 4","Read 3, write 4"]),2,"A quorum is the minimum number of nodes that must agree for consensus. With n nodes, read and write quorums of n/2 + 1 guarantee consistency - here 7/2 + 1 = 4 for both. Every other pair listed sums to 7 or fewer, so a read quorum and a write quorum can miss each other entirely.","p117"),Z0("Last write wins by timestamp","Two leaders in different data centers accept conflicting updates to the same row. A teammate proposes resolving it with last-write-wins on a timestamp column. Why does that not work?",V(["It works, but only when both leaders sit in the same data center and share a clock signal","Clocks on different nodes cannot be perfectly synchronized - even periodically synced servers differ by milliseconds or more, so writes made inside that window cannot be ordered","Timestamps require a coordination service to issue them, which reintroduces the single leader you were trying to avoid","Timestamps are not monotonic while NTP is slewing, but the drift is bounded, so the scheme is safe at one-second granularity"]),1,"Clocks on different nodes cannot be perfectly synchronized, and sharing one clock fails because each node receives its signal at a different time - clock skew. Even periodically synced servers differ by milliseconds or more, so queries made within that window cannot be ordered.","p116"),Z0("Tuning quorums for a read-heavy load","A 5-node cluster serves ten reads for every write, and you need consistency rather than eventual consistency. How do you set the quorums, and what does it cost?",V(["Low write quorum, high read quorum - fast reads, paid for with slower writes","Read and write quorums both set to 5, so every operation sees every node","Read and write quorums both set to 1, accepting eventual consistency for speed on both sides","Low read quorum, high write quorum - fast reads, paid for with slower writes"]),3,"If you want consistency you must choose: a low write quorum and high read quorum gives fast writes; the reverse - a low read quorum and high write quorum - gives fast reads. Otherwise only eventual consistency is possible, and UPDATE and DELETE cannot be consistent.","p117"),Z0("Seeing your own increment","A user taps like and must immediately see the count include their own tap. Other users continuing to see the old count for a few seconds is fine. Name the guarantee, and the general lesson.",V(["Read-after-write consistency - and the lesson is to look for ways to relax consistency, minimizing the amount of data that must be consistent for all users","Linearizability - and the lesson is that any user-visible counter must be linearizable or users will report it as a bug","Monotonic reads - and the lesson is that a client must be pinned to one replica for the duration of a session","Strong eventual consistency - and the lesson is that conflict-free replicated data types remove the need to choose"]),0,"Read-after-write consistency: a user who increments a counter and then reads it sees their own increment, while other users may still be served the pre-increment value. The general lesson: look for ways to relax consistency, and minimize the amount of data that must be consistent for all users.","p117"),Z0("The JOIN that got slower after sharding","After sharding two large tables, a JOIN between them became dramatically slower. What is happening, and what is the suggested remedy?",V(["Replication lag means followers hold different snapshots of each table; directing the JOIN at the leader restores speed","The query planner lost its statistics at shard time; a covering index on each shard restores the original plan","Each shard of one table must compare its rows against every row of the other across the network - unless the JOIN is on the shard key, so you may constrain JOINs to those columns","The shard key was hashed rather than ranged, so matching rows are scattered; switching to range sharding colocates them"]),2,"Sharding imposes two limits on an RDBMS. JOINs get far slower - each shard of one table must compare its rows against every row of the other across the network, unless the JOIN is on the shard key, so you may constrain JOINs to those columns. And aggregation splits between database and application.","p120"),Z0("The aggregate that survived sharding worst","Your reporting queries run sum, count, mean and median over a sharded table. Which one becomes disproportionately harder and slower, and why?",V(["Mean - it needs the full row set in one place before a divisor can be computed","Median - sum and mean are easy because each node returns partial results, but median and percentile are much harder and slower","Sum - each node's partial must be locked across shards to avoid double counting","Count - it requires a distinct pass over every shard before the totals can be added"]),1,"Aggregation splits between database and application: sum and mean are easy (each node returns partials), median and percentile are much harder and slower.","p120"),Z0("Replication lag across thirty followers","Your leader replicates to thirty followers and the tail of them is falling steadily behind. What is the explanation, and the remedy?",V(["A leader's throughput caps the number of followers it can serve, so multi-level replication adds tiers to scale reads further - at the cost of further-delayed consistency","Followers compete with clients for the leader's read capacity, so moving client reads onto the followers lets the leader catch up","The write quorum has been set too high, so each write waits on too many acknowledgements before the next can start","Eventual consistency means replication lag is unbounded by design, so the only remedy is to make reads tolerate any staleness"]),0,"A leader's throughput caps the number of followers, so multi-level replication adds tiers to scale reads further, at the cost of further-delayed consistency.","p112-115")])}function CS(){return V([Z0("Buying a bigger host","Your service is saturating its single host. Finance has approved a mainframe-class replacement with four times the cores and eight times the RAM, and a migration window is agreed. Setting the invoice aside, what is the strongest argument against making this your scaling strategy?",V(["You lose the ability to do gradual rollouts, because there is no second host to shift a fraction of traffic onto","It trades higher latency for lower cost, because one host cannot be placed close to every region of users","Past a point, monetary cost rises faster than the hardware's performance; current technology imposes hard limits on processing power, RAM and storage per host; and the swap may require downtime unless the service's state lives elsewhere","A single host cannot implement the bulkhead pattern, so one saturated endpoint will starve all the others"]),2,"Three disadvantages of vertical scaling. Past a point, monetary cost rises faster than the hardware's performance - a multi-processor mainframe costs more than the same number of commodity single-processor machines. Current technology imposes hard limits on processing power, RAM and storage per host. And it may require downtime, unless you provision a new host, which is only possible if the service's state lives elsewhere.","p88"),Z0("Choosing the load balancer layer","You need the load balancer to reject requests missing an authorization header with a 401, terminate TLS, and forward events by key range based on a field in the request body. Which balancer do you specify, and why?",V(["Level 7 - it works at the application layer, so it can route on packet contents, authenticate, and terminate TLS","Level 4 - it works at the transport layer, which is faster and sufficient for header inspection","Level 4 with TLS passthrough, delegating authentication to an API gateway behind it","Either - the layers differ only in throughput, not in what they can inspect"]),0,"A level 4 balancer works at the transport layer (TCP), makes routing decisions from address information in the first few packets of the stream, and can only forward. A level 7 balancer works at the application layer (HTTP), so it can route on packet contents, authenticate (returning 401 when a header is absent), and terminate TLS.","p89-90"),Z0("Reading an availability SLA","A contract permits roughly five minutes of unplanned downtime per year. Which availability target are you being asked to hit?",V(["99.99% - 52.6 minutes per year, 8.64 seconds per day","99.9% - 8.77 hours per year, 1.44 minutes per day","99.95% - 4.38 hours per year, 43 seconds per day","99.999% - 5.26 minutes per year, 864 milliseconds per day"]),3,"99.9% is 8.77 hours per year (1.44 minutes per day). 99.99% is 52.6 minutes per year (8.64 seconds per day). 99.999% is 5.26 minutes per year (864 milliseconds per day).","p91"),Z0("The circuit breaker that hid the limit","Your team wraps every downstream call in a circuit breaker. A load test that previously overwhelmed the payment service now passes cleanly, so you ship. Real customer traffic then causes an outage in that same service. What went wrong?",V(["The breaker's failure counter reset between test runs, so the threshold was never actually reached","The breaker makes the system harder to test - it opened under the test load and masked the downstream limit the test existed to find","The breaker's probe requests counted against the payment service's rate limit and exhausted it","Retries without jitter arrived in unison and caused a retry storm against the recovering service"]),1,"A circuit breaker counts failures in a recent interval and stops calling downstream past a threshold, later probing with a limited number of requests. Its hidden cost: the breaker makes the system harder to test - a load test that should have overwhelmed downstream now passes, and real customer load causes the outage.","p93-94"),Z0("What per-endpoint thread pools cost","You adopt the bulkhead pattern, giving each endpoint its own thread pool so an exhausted pool cannot starve the others. What have you given up in exchange?",V(["Requests can no longer be traced across services, because each pool logs under its own identifier","You can no longer terminate TLS at the load balancer, since pools are selected after decryption","Thread pools force synchronous I/O, so a long downstream call blocks a whole pool","Pools cannot support each other during a spike - an idle pool's capacity is unavailable to a saturated one"]),3,"Divide the system into isolated pools so a fault in one cannot affect the whole. Per-endpoint thread pools mean an exhausted pool does not starve other endpoints. Host pools per requestor stop a crash-inducing request from taking down every host, and stop one noisy requestor consuming all capacity. The tradeoff: pools cannot support each other during a spike.","p95-96"),Z0("Which consistency are you talking about",'You have said "consistency" four times and the interviewer stops you: which consistency do you mean? What is the distinction they are fishing for?',V(["ACID consistency means synchronous replication; CAP consistency means asynchronous replication with a bounded lag","CAP consistency is read-after-write for the writing client; ACID consistency is the durability guarantee that survives a crash","ACID consistency is about data relationships - foreign keys, uniqueness, the invariants a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time and begin serving a change at the same time","ACID consistency applies within a single node; CAP consistency applies across the cluster, but both mean reads never return stale data"]),2,"ACID consistency is about data relationships - foreign keys, uniqueness, and the invariants that a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time, and when data changes all nodes start serving the change at the same time. Emphasize the distinction out loud in the interview.","p98"),Z0("Accepting writes during a partition","A hard requirement: the store must keep accepting writes during a network partition between data centers. Stale reads for a few seconds are acceptable. Which of these do you pick, and what rules the others out?",V(["Redis - being in-memory, it is unaffected by partitions between data centers","Cassandra - an ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did","MongoDB - it favors availability, and its replica sets elect a new primary on either side of the partition","HBase - its write-ahead log lets it accept writes and reconcile them once the partition heals"]),1,"Databases favoring linearizability: HBase, MongoDB, Redis. Databases favoring availability: Cassandra, CouchDB, Dynamo, Hadoop, Riak. An ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did.","p98"),Z0("Propagating state across a small cluster","Eight hosts need to share a small amount of mutable state. You want low latency, simple operations and independent scaling of the state store, and you accept that nothing will validate the shape of what gets written. Which technique fits?",V(["A full mesh, where every host broadcasts state changes to every other host","A coordination service such as ZooKeeper, using Paxos, Raft or Zab","A gossip protocol with random leader selection","A distributed cache such as Redis - simple, low latency and independently scalable, at the cost of no schema validation, so bad data goes undetected until it is read, and no encryption"]),3,"Full mesh - every host broadcasts to every other; simplest, but message count grows quadratically, so small clusters only. Coordination service - Paxos, Raft, Zab; ZooKeeper gives access control, in-memory speed, horizontal scaling and ordered reads, but is complex and must guarantee exactly one leader or you get split brain. Distributed cache - Redis; simple, low latency, independently scalable, but no schema validation, so bad data goes undetected until read, and no encryption. Gossip protocol and random leader selection trade consistency and accuracy for lower cost.","p99-103"),Z0("Approximating a distinct count","A dashboard needs the number of unique visitors over a huge event stream. An exact COUNT DISTINCT is too expensive, and a few percent of error is fine. Which algorithm?",V(["HyperLogLog, which estimates cardinality - it is what Presto uses for this","Count-min sketch, which is the standard structure for estimating distinct values in a stream","A bloom filter, testing each visitor for membership and counting the misses","A quorum read across the aggregation tier, summing each node's local count"]),0,"HyperLogLog for cardinality - COUNT DISTINCT, as used in Presto. Count-min sketch for estimating the frequency of events in a data stream. Estimation algorithms trade accuracy for lower complexity.","p103-104"),Z0("What PACELC adds to CAP","The interviewer asks whether CAP is the whole story. What does PACELC add to it?",V(["It adds durability as a fourth property, alongside consistency, availability and partition tolerance","It formalizes eventual consistency as a fourth choice available during a partition","Else - during normal operation with no partition, you must still choose between latency and consistency","Else - during normal operation, you must still choose between availability and partition tolerance"]),2,"PACELC is an extension of CAP: when a network Partition occurs you must choose between Availability and Consistency; Else, during normal operation, you must choose between Latency and Consistency. The book flags it as further reading rather than covering it in depth.","p107")])}function wS(){return $}function hS(){return $}function uO(){return new w4("System Design",(()=>{let Z=V([new j0("Interview flow & requirements",hS()),new j0("Observability & search",wS()),new j0("Non-functional requirements",CS()),new j0("Storage, replication & sharding",ES()),new j0("ETL, denormalization & caching",_S()),new j0("Events & distributed transactions",TS()),new j0("Services & API paradigms",SS()),new j0("Case studies",PS()),new j0("Terminology",BS())]);return Q0(Z,(J)=>{return!(J.problems instanceof k)})})())}var qI;function vO(Z){if(qI===void 0)qI=Z();return qI}function kS(){return V([yO(),kO(),fO(),hO(),$O(),CO(),uO()])}function j9(){return vO(kS)}function r5(Z,J){let Q=O7(j9(),(X)=>{return X.name===Z});if(Q instanceof D){let X=Q[0],Y=O7(X.subcategories,(K)=>{return K.name===J});if(Y instanceof D)return Y[0].problems;else return $}else return $}function a5(Z){let J=O7(j9(),(Q)=>{return Q.name===Z});if(J instanceof D){let Q=J[0];return H1(Q.subcategories,(X)=>{return X.name})}else return $}function mJ(){let Z=a5(V9);return H1(Z,(J)=>{return[J,(()=>{let Q=r5(V9,J);return H1(Q,(X)=>{return new e6(V9,J,X.title)})})()]})}function pO(){return H1(j9(),(Z)=>{return Z.name})}function mO(Z,J,Q){let X=O7(Z,J);if(X instanceof D){let Y=X[0];return Q(Y)}else return X}function h4(Z,J,Q){return mO(j9(),(X)=>{return X.name===Z},(X)=>{return mO(X.subcategories,(Y)=>{return Y.name===J},(Y)=>{return O7(Y.problems,(K)=>{return K.title===Q})})})}var t5=new Map;function WI(Z,J,Q,X,Y){if(t5.has(Z))return;let K=new Worker(J,Q?{type:"module"}:void 0);K.onmessage=(I)=>X(JSON.stringify(I.data)),K.onerror=(I)=>Y(String(I.message??"The runtime failed to load.")),t5.set(Z,K)}function cO(Z,J,Q,X,Y){t5.get(Z)?.terminate(),t5.delete(Z),WI(Z,J,Q,X,Y)}function dO(Z,J,Q,X){t5.get(Z)?.postMessage({type:"run",id:J,solution:Q,harness:X})}function sO(Z,J){setTimeout(J,Z)}var bS="1.18.1",xS="3.14.3",yS=8000;function iO(Z){if(Z==="python")return["/python-worker.js?v="+xS,!1];else if(Z==="typescript")return["/ts-worker.js",!0];else return["/gleam-worker.js?v="+bS,!0]}function GI(Z,J,Q){return v6(Z,U1,B3(J),Q)}function gS(Z){return y1("phase",w1,(J)=>{return GI("file",w1,(Q)=>{return GI("line",a0,(X)=>{return GI("column",a0,(Y)=>{return y1("message",w1,(K)=>{return Z(new q8(new yK(J,Q,X,Y,K)))})})})})})}function lO(Z){return v6("stdout","",w1,Z)}function fS(Z){let J=y1("label",w1,(Q)=>{return y1("expected",w1,(X)=>{return y1("actual",w1,(Y)=>{return y1("passed",h9,(K)=>{return k1(new xK(Q,X,Y,K))})})})});return y1("cases",G4(J),(Q)=>{return Z(new I8(Q))})}function $S(Z){return y1("type",w1,(J)=>{if(J==="ready")return k1(new Z7(Z));else if(J==="result")return y1("id",a0,(Q)=>{return lO((X)=>{return fS((Y)=>{return k1(new W9(Q,Y,X))})})});else if(J==="error")return y1("id",a0,(Q)=>{return lO((X)=>{return gS((Y)=>{return k1(new W9(Q,Y,X))})})});else return b9(new Z7(Z),"Msg")})}function rO(Z,J){let Q=C8(J,$S(Z));if(Q instanceof D)return Q[0];else return new z8(Z,"The runtime sent an unreadable message.")}function aO(Z){return N6((J)=>{let Q=iO(Z),X=Q[0],Y=Q[1];return WI(Z,X,Y,(K)=>{return J(rO(Z,K))},(K)=>{return J(new z8(Z,K))})})}function oO(Z){return N6((J)=>{let Q=iO(Z),X=Q[0],Y=Q[1];return cO(Z,X,Y,(K)=>{return J(rO(Z,K))},(K)=>{return J(new z8(Z,K))})})}function tO(Z,J,Q,X){return N6((Y)=>{return dO(Z,J,Q,X),sO(yS,()=>{return Y(new c5(J))})})}function pJ(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return v1(globalThis.localStorage);else return t1(null)}catch{return t1(null)}}function O9(Z,J){return nS(Z.getItem(J))}function UI(Z,J,Q){try{return Z.setItem(J,Q),v1(null)}catch{return t1(null)}}function nS(Z){if(Z!==null)return v1(Z);else return t1(null)}var mS="algoDrillState",pS="algoDrillState.v2",cS="algoDrillState.v3",ZF="algoDrillState.v4";function dJ(Z){let J=(K)=>{if(h4(K.category,K.subcategory,K.title)instanceof D)return!0;else return!1},Q=Q0(Z.selected,J),X=new O1(Z.route,Z.selected_category,Z.selected_subcategory,Q,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Q0(Z.drafts,(K)=>{return J(K[0])}),Q0(Z.attempts,(K)=>{return J(K[0])}),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Q0(Z.exam_answers,(K)=>{return J(K[0])}));if(X.route instanceof _4&&X.problem_index>=G0(Q))return new O1(K8,X.selected_category,X.selected_subcategory,X.selected,0,X.iteration_count,1,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else if(X.route instanceof AJ&&X.exam_answers instanceof k)return new O1(K8,X.selected_category,X.selected_subcategory,X.selected,X.problem_index,X.iteration_count,X.current_iteration,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else return X}function dS(Z,J){if(Z==="currentView")return y1("currentProblemIndex",a0,J);else return y1("problemIndex",a0,J)}function JF(){return y1("category",w1,(Z)=>{return y1("subcategory",w1,(J)=>{return y1("title",w1,(Q)=>{return k1(new e6(Z,J,Q))})})})}function eO(Z,J){return v6(Z,U1,B3(w1),J)}function sS(){return k9(w1,(Z)=>{if(Z==="drill")return k1(b5);else if(Z==="report")return k1(DJ);else return k1(K8)})}function VI(Z,J,Q){return y1(Z,sS(),(X)=>{return eO("selectedCategory",(Y)=>{return eO("selectedSubcategory",(K)=>{return y1(J,G4(JF()),(I)=>{return dS(Z,(q)=>{return y1("iterationCount",a0,(W)=>{return y1("currentIteration",a0,(G)=>{return Q((()=>{let U=V8();return new O1(X,Y,K,I,q,W,G,U.draft,U.revealed_solution,U.runtimes,U.run,U.drafts,U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers)})())})})})})})})})}function lS(){return VI("currentView","selectedProblems",(Z)=>{return k1(Z)})}function iS(Z){let J=O9(Z,mS);if(J instanceof D){let Q=J[0],X=C8(Q,lS()),Y=H0(X,dJ);return g9(Y,V8())}else return V8()}function rS(){return VI("route","selected",(Z)=>{return k1(Z)})}function aS(Z){let J=O9(Z,pS);if(J instanceof D){let Q=J[0],X=C8(Q,rS()),Y=H0(X,dJ);return g9(Y,V8())}else return iS(Z)}function oS(){return k9(w1,(Z)=>{if(Z==="passed")return k1(SJ);else return k1(x5)})}function zI(Z,J){return k9(JF(),(Q)=>{return y1(Z,J,(X)=>{return k1([Q,X])})})}function QF(){return VI("route","selected",(Z)=>{return v6("drafts",$,G4(zI("draft",w1)),(J)=>{return v6("attempts",$,G4(zI("result",oS())),(Q)=>{return v6("search","",w1,(X)=>{return v6("editorKeymap","default",w1,(Y)=>{return k1(new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,J,Q,X,Z.next_run_id,Y,Z.choice,Z.graded,Z.exam_answers))})})})})})}function tS(Z){let J=O9(Z,cS);if(J instanceof D){let Q=J[0],X=C8(Q,QF()),Y=H0(X,dJ);return g9(Y,V8())}else return aS(Z)}function eS(){return k9(QF(),(Z)=>{return v6("examAnswers",$,G4(zI("correct",h9)),(J)=>{return k1(new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,J))})})}function XF(){let Z=pJ();if(Z instanceof D){let J=Z[0],Q=O9(J,ZF);if(Q instanceof D){let X=Q[0],Y=C8(X,eS()),K=H0(Y,dJ);return g9(K,V8())}else return tS(J)}else return V8()}function cJ(Z,J){return w8(w(["category",K0(Z.category)],w(["subcategory",K0(Z.subcategory)],w(["title",K0(Z.title)],J))))}function ZT(Z){return cJ(Z,$)}function JT(Z){let J=w8(V([["route",K0((()=>{let Q=Z.route;if(Q instanceof Q9)return"menu";else if(Q instanceof _4)return"drill";else return"report"})())],["selectedCategory",PQ(Z.selected_category,K0)],["selectedSubcategory",PQ(Z.selected_subcategory,K0)],["selected",U4(Z.selected,ZT)],["problemIndex",m6(Z.problem_index)],["iterationCount",m6(Z.iteration_count)],["currentIteration",m6(Z.current_iteration)],["drafts",U4(Z.drafts,(Q)=>{return cJ(Q[0],V([["draft",K0(Q[1])]]))})],["attempts",U4(Z.attempts,(Q)=>{return cJ(Q[0],V([["result",K0((()=>{if(Q[1]instanceof U8)return"passed";else return"failed"})())]]))})],["examAnswers",U4(Z.exam_answers,(Q)=>{return cJ(Q[0],V([["correct",f9(Q[1])]]))})],["search",K0(Z.search)],["editorKeymap",K0(Z.editor_keymap)]]));return JW(J)}function YF(Z){return N6((J)=>{let Q=pJ();if(Q instanceof D){let X=Q[0],Y=UI(X,ZF,JT(Z));return}else return})}function XT(Z,J){let Q=Z.revealed_solution;if(Q instanceof a){let X=Q[0],Y=J.solutions,K=H3(Y,X);return F3(K)}else return new V1(void 0)}function FI(Z){let J=L3(Z);if(J==="")return $;else{let Q=J;return V([u3(V([g("results-details")]),V([n3($,V([d("Output")])),g8(V([g("results-stdout")]),V([d(Q)]))]))])}}function YT(Z,J,Q){let X,Y=Z.file;if(Y instanceof a){let q=Y[0];X=C9(q,"check")}else X=!1;let K=X,I=J.check;if(K&&I instanceof a){let q=I[0];return Y1(V([g("results")]),w(Y1(V([g("results-summary fail")]),V([d("Your solution doesn't match the required signature.")])),w(g8(V([g("signature")]),V([B7($,V([d(q.signature)]))])),w(u3(V([g("results-details")]),V([n3($,V([d("Details")])),g8(V([g("results-message")]),V([d(Z.message)]))])),FI(Q)))))}else return Y1(V([g("results")]),w(Y1(V([g("results-summary fail")]),V([d((()=>{if(Z.phase==="compile")return"Your code doesn't compile.";else return"Your code crashed while running."})())])),w(g8(V([g("results-message")]),V([d(Z.message)])),FI(Q))))}function KT(Z,J){let Q=G0(Z),X=U7(Z,(U)=>{return U.passed}),Y=X===Q&&Q>0,K=Y1(V([m0(V([["results-summary",!0],["pass",Y],["fail",!Y]]))]),V([d((()=>{if(Y)return"✓ ";else return"✗ "})()+D1(X)+"/"+D1(Q)+" passed")])),I,W=Q0(Z,(U)=>{return!U.passed});I=H1(W,(U)=>{return Y1(V([g("case fail")]),V([Y1(V([g("case-label")]),V([d("✗ "+U.label)])),Y1(V([g("case-diff")]),V([Y1($,V([m1(V([g("case-diff-tag")]),V([d("expected ")])),B7($,V([d(U.expected)]))])),Y1($,V([m1(V([g("case-diff-tag")]),V([d("got ")])),B7($,V([d(U.actual)]))]))]))]))});let G=I;return Y1(V([g("results")]),w(K,X0(FI(J),G)))}function IT(Z,J){let Q,X=Z.run;if(X instanceof PJ)Q=$;else if(X instanceof W8)Q=V([Y1(V([g("results")]),V([Y1(V([g("results-summary")]),V([d("Compiling and running…")]))]))]);else{let W=X.outcome;if(W instanceof I8){let G=X.stdout,U=W[0];Q=V([KT(U,G)])}else if(W instanceof q8){let G=X.stdout,U=W[0];Q=V([YT(U,J,G)])}else Q=V([Y1(V([g("results")]),V([Y1(V([g("results-summary fail")]),V([d("Your solution didn't finish — likely an infinite loop. The runtime was restarted.")]))]))])}let Y=Q,K,I=XT(Z,J);if(I instanceof D){let W=I[0];K=V([Y1(V([g("answer-content")]),j7(V([V([Y1(V([g("answer-label")]),V([d(W.label)]))]),(()=>{let G=W.note;if(G==="")return $;else{let U=G;return V([Y1(V([g("answer-note")]),V([d(U)]))])}})(),V([g8($,V([B7($,V([d(W.code)]))]))])])))])}else K=$;return X0(Y,K)}function qT(Z,J){return S9(J.solutions,(Q,X)=>{return U0(V([m0(V([["btn-secondary",!0],["solution-button",!0],["revealed",S1(Z.revealed_solution,new a(X))]])),i1(new I9(X))]),V([d(Q.label)]))})}function e5(Z,J){return U0(V([g("btn-primary run-button"),$4(J),i1(NO)]),V([d(Z)]))}function WT(Z,J){let Q;if(J.check instanceof a)Q=V([(()=>{let K=s5(Z,l5(J.language));if(Z.run instanceof W8)return e5("Running…",!0);else if(K instanceof X9)return e5("Loading runtime…",!0);else if(K instanceof LJ)return e5("Loading runtime…",!0);else if(K instanceof Y9)return e5("▶ Run tests",!1);else return e5("Runtime unavailable",!0)})()]);else Q=V([m1(V([g("run-unavailable")]),V([d("Checking isn't available for this drill — compare with a solution.")]))]);let Y=Q;return Y1(V([g("run-bar")]),j7(V([Y,qT(Z,J),V([U0(V([g("btn-primary next-button"),i1(uK)]),V([d("Next")]))])])))}function jI(Z){let Q=A3(Z,`
`),X=N3(Q,3);return D3(X,`
`)}function GT(Z){let J=Z.run;if(J instanceof G8){let Q=J.outcome;if(Q instanceof q8){let X=Q[0],Y=X.file,K=X.line,I=X.column;if(Y instanceof a&&K instanceof a&&I instanceof a){let q=Y[0];if(q==="solution.gleam"){let W=K[0],G=I[0];return V([new k5(W,G,jI(X.message))])}else if(q==="solution.py"){let W=K[0],G=I[0];return V([new k5(W,G,jI(X.message))])}else if(q==="solution.ts"){let W=K[0],G=I[0];return V([new k5(W,G,jI(X.message))])}else return $}else return $}else return $}else return $}function UT(Z,J){if(Z.graded){let X=S1(Z.choice,new a(J.correct));return V([Y1(V([g("results")]),V([Y1(V([m0(V([["results-summary",!0],["pass",X],["fail",!X]]))]),V([d((()=>{if(X)return"✓ Correct";else return"✗ Not quite"})())])),Y1(V([g("quiz-explanation")]),V([d(J.explanation)])),Y1(V([g("quiz-page")]),V([d("Book reference: "+J.page)]))]))])}else return $}function zT(Z){if(Z===0)return"A";else if(Z===1)return"B";else if(Z===2)return"C";else if(Z===3)return"D";else return D1(Z+1)}function VT(Z,J){let Q=Y1(V([g("quiz-choices")]),S9(J.choices,(Y,K)=>{let I=S1(Z.choice,new a(K)),q=K===J.correct;return U0(V([m0(V([["quiz-choice",!0],["picked",I],["correct",Z.graded&&q],["wrong",Z.graded&&I&&!q]])),$4(Z.graded),i1(new d5(K))]),V([m1(V([g("quiz-marker")]),V([d(zT(K))])),m1(V([g("quiz-choice-text")]),V([d(Y)]))]))})),X=Y1(V([g("run-bar")]),(()=>{if(Z.graded)return V([U0(V([g("btn-primary next-button"),i1(uK)]),V([d("Next")]))]);else return V([U0(V([g("btn-primary"),$4(Z.choice instanceof U6),i1(RO)]),V([d("Submit answer")]))])})());return w(Q,w(X,UT(Z,J)))}function jT(Z){let J=Z.run;if(J instanceof G8){let Q=J.outcome;if(Q instanceof I8){let X=Q[0];return d9(V([g("case-list")]),H1(X,(Y)=>{return c9(V([m0(V([["case",!0],["pass",Y.passed],["fail",!Y.passed]]))]),V([m1(V([g("case-icon")]),V([d((()=>{if(Y.passed)return"✓";else return"✗"})())])),d(" "+Y.label)]))}))}else return Y1(V([g("pane-empty")]),V([d("Run the tests to see the cases.")]))}else return Y1(V([g("pane-empty")]),V([d("Run the tests to see the cases.")]))}function OI(Z,J){return xW(V([g("panel")]),w($3(V([g("panel-title")]),V([d(Z)])),J))}function OT(Z,J,Q){let X=OI("Prompt",V([Y1(V([g("problem-category")]),V([d(J.category+" › "+J.subcategory+" · "+_O(Q.language))])),Y1(V([g("problem-prompt")]),V([d(Q.prompt)]))])),Y,K=Q.approach;if(K==="")Y=$;else{let U=K;Y=V([u3(V([g("panel approach")]),V([n3(V([g("panel-title")]),V([d("Approach")])),Y1(V([g("approach-text")]),V([d(U)]))]))])}let I=Y,q,W=Q.check;if(W instanceof a){let U=W[0];q=V([OI("Signature",V([g8(V([g("signature")]),V([B7($,V([d(U.signature)]))]))])),OI("Tests",V([jT(Z)]))])}else q=$;return w(X,X0(I,q))}function FT(Z){return Y1(V([g("keymap-picker")]),H1(V([["default","Std"],["vim","Vim"],["emacs","Emacs"]]),(J)=>{return U0(V([m0(V([["keymap-option",!0],["active",Z.editor_keymap===J[0]]])),l1("title",J[1]+" keybindings"),i1(new m5(J[0]))]),V([d(J[1])]))}))}function HT(Z,J,Q){let X=G0(Z.selected),Y;if(Q.quiz instanceof a)Y="Question "+D1(Z.problem_index+1)+"/"+D1(X);else Y="Pass "+D1(Z.current_iteration)+"/"+D1(Z.iteration_count)+" · Problem "+D1(Z.problem_index+1)+"/"+D1(X);let I=Y,q=X*Z.iteration_count,W=(Z.current_iteration-1)*X+Z.problem_index,G;if(q===0)G=q;else G=x4(W*100,q);let U=G,z=J.category+"|"+J.subcategory+"|"+J.title+"|"+D1(Z.current_iteration);return Y1(V([g("drill-container")]),V([Y1(V([g("drill-header")]),V([U0(V([g("btn-secondary"),i1(FO)]),V([d("← Exit")])),f3(V([g("drill-title")]),V([d(Q.title)])),(()=>{if(Q.quiz instanceof a)return y8();else return FT(Z)})(),Y1(V([g("progress-text"),w3("--progress",D1(U)+"%")]),V([d(I)]))])),Y1(V([g("drill-grid")]),V([Y1(V([g("drill-side")]),OT(Z,J,Q)),Y1(V([g("drill-main")]),(()=>{let j=Q.quiz;if(j instanceof a){let O=j[0];return VT(Z,O)}else return w(d4(V([g("editor-frame")]),V([[z,YO(V([KO(Z.draft),qO(l5(Q.language)),IO(Z.editor_keymap),GO((O)=>{return new q9(O)}),WO(GT(Z))]))]])),w(WT(Z,Q),IT(Z,Q)))})())]))]))}function KF(Z){return y9(q6(Z),(J)=>{return y9(h4(J.category,J.subcategory,J.title),(Q)=>{return new D(HT(Z,J,Q))})})}var IF="src/algodrill/view/menu.gleam";function RT(){let Z=mJ();return B0(Z,0,(J,Q)=>{return J+G0(Q[1])})}function MT(Z){let J=Z.selected;if(J instanceof k)return y8();else{let Q=J;return d4(V([g("chips")]),H1(Q,(X)=>{return[X.category+"|"+X.subcategory+"|"+X.title,m1(V([g("chip")]),V([d(X.title+" "),U0(V([g("chip-remove"),l1("aria-label","Remove "+X.title),i1(new E4(X))]),V([d("×")]))]))]}))}}function qF(Z,J){let Q=G9(Z.attempts,J);if(Q instanceof D){let X=Q[0],Y;if(X instanceof U8)Y=["badge badge-passed","✓"];else Y=["badge badge-failed","✗"];let K=Y,I=K[0],q=K[1];return m1(V([g(I)]),V([d(q)]))}else return y8()}function HI(Z){return kU("keydown",y1("key",w1,(J)=>{if(J==="Enter")return k1(YZ(Z,!0,!1));else if(J===" ")return k1(YZ(Z,!0,!1));else return b9(YZ(Z,!1,!1),"key")}))}function AT(Z,J){let Q=E9(J),X,Y=j9();X=T9(Y,(I)=>{let q=I.subcategories;return T9(q,(W)=>{let G=W.problems;return V7(G,(U)=>{if(FQ(E9(U.title),Q))return new D([new e6(I.name,W.name,U.title),U]);else return new V1(void 0)})})});let K=X;if(K instanceof k)return Y1(V([g("search-results")]),V([Y1(V([g("pane-empty")]),V([d("No problems match “"+J+"”")]))]));else return d4(V([g("search-results")]),H1(K,(I)=>{let q=I[0];return[q.category+"|"+q.subcategory+"|"+q.title,(()=>{let W=z7(Z.selected,q);return Y1(V([m0(V([["search-hit",!0],["selected",W]])),h3(0),i1(new E4(q)),HI(new E4(q))]),V([m1(V([g("search-hit-title")]),V([d(q.title)])),qF(Z,q),m1(V([g("search-hit-context")]),V([d(q.category+" › "+q.subcategory)]))]))})()]}))}function DT(Z,J){return Y1(V([m0(V([["pane-item",!0],["selected",z7(Z.selected,J)]])),h3(0),i1(new E4(J)),HI(new E4(J))]),V([d(J.title),qF(Z,J)]))}function NI(Z,J){return Y1(V([g("pane")]),V([$3($,V([d(Z)])),J]))}function LT(Z,J){return NI("Problems",(()=>{if(J instanceof k)return Y1(V([g("pane-list")]),V([Y1(V([g("pane-empty")]),V([d("Pick a subcategory first")]))]));else{let Q=Z.selected_category,X;if(Q instanceof a)X=Q[0];else throw R8("let_assert",IF,"algodrill/view/menu",288,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Q,start:8541,end:8583,pattern_start:8552,pattern_end:8561});let Y=Z.selected_subcategory,K;if(Y instanceof a)K=Y[0];else throw R8("let_assert",IF,"algodrill/view/menu",289,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Y,start:8590,end:8635,pattern_start:8601,pattern_end:8610});return d4(V([g("pane-list")]),H1(J,(I)=>{let q=new e6(X,K,I.title);return[I.title,DT(Z,q)]}))}})())}function WF(Z,J,Q){return Y1(V([m0(V([["pane-item",!0],["current",J]])),h3(0),i1(Q),HI(Q)]),V([d(Z)]))}function BT(Z){let J,Q=Z.selected_category;if(Q instanceof a){let Y=Q[0];J=a5(Y)}else J=$;let X=J;return NI("Subcategory",(()=>{if(X instanceof k)return Y1(V([g("pane-list")]),V([Y1(V([g("pane-empty")]),V([d("Pick a category first")]))]));else return d4(V([g("pane-list")]),H1(X,(Y)=>{return[Y,WF(Y,S1(Z.selected_subcategory,new a(Y)),new g5(Y))]}))})())}function PT(Z){return NI("Category",d4(V([g("pane-list")]),H1(pO(),(J)=>{return[J,WF(J,S1(Z.selected_category,new a(J)),new y5(J))]})))}function ST(Z){let J,Q=V(["Categories"]),X=X0(Q,XQ(V([Z.selected_category])));J=X0(X,XQ(V([Z.selected_subcategory])));let Y=J,K=G0(Y)-1;return Y1(V([g("breadcrumbs")]),(()=>{let q=S9(Y,(W,G)=>{if(G===K)return V([m1(V([g("breadcrumb")]),V([d(W)]))]);else return V([m1(V([g("breadcrumb clickable"),i1(new f5(G))]),V([d(W)])),d(" "),m1(V([g("breadcrumb")]),V([d("/")])),d(" ")])});return j7(q)})())}function RI(Z){let J,Q=Z.selected_category,X=Z.selected_subcategory;if(Q instanceof a&&X instanceof a){let K=Q[0],I=X[0];J=r5(K,I)}else J=$;let Y=J;return Y1(V([g("menu-container")]),w(Y1(V([g("menu-top")]),V([bW(V([g("menu-title")]),V([d("Algo Drill")])),nQ(V([xQ("search"),g("search"),NW("Search problems…"),yQ(Z.search),bU((K)=>{return new v5(K)})]))])),(()=>{let K,I=L3(Z.search);if(I==="")K=V([ST(Z),Y1(V([g("panes-container")]),V([PT(Z),BT(Z),LT(Z,Y)]))]);else K=V([AT(Z,I)]);return X0(K,V([MT(Z),Y1(V([g("iteration-control")]),V([yW(V([OW("iterations")]),V([d("Repetitions per problem")])),nQ(V([xQ("number"),A7("iterations"),HW("1"),FW("20"),yQ(D1(Z.iteration_count)),xU((W)=>{return new $5(W)})])),m1(V([g("progress-text")]),V([d(D1(G0(Z.selected))+" selected")]))])),Y1(V([g("menu-actions")]),V([U0(V([A7("startDrill"),g("btn-primary"),$4(Z.selected instanceof k),i1(OO)]),V([d("Start drill")])),U0(V([A7("selectAll"),g("btn-secondary"),$4(Y instanceof k),i1(VO)]),V([d("Select all in subcategory")])),U0(V([A7("clearSelection"),g("btn-secondary"),i1(jO)]),V([d("Clear selection")])),U0(V([A7("startExam"),g("btn-secondary"),$4(RT()===0),i1(MO)]),V([d("System design exam")]))]))]))})()))}function MI(Z,J){return Y1(V([g("panel")]),w(Y1(V([g("panel-title")]),V([d(Z)])),J))}function _T(Z){if(Z instanceof k)return V([MI("Where to study",V([Y1(V([g("pane-empty")]),V([d("Nothing under "+D1(xJ)+"%. Widen the pool or raise the bar.")]))]))]);else return V([MI("Where to study",V([d9(V([g("report-advice")]),H1(Z,(J)=>{return c9($,V([d(J.section+" — "+D1(e8(J.correct,J.total))+"%")]))}))]))])}function ET(Z){let J=e8(Z.correct,Z.total),Q=J<xJ;return c9(V([m0(V([["report-section",!0],["weak",Q]]))]),V([m1(V([g("report-section-name")]),V([d(Z.section)])),m1(V([g("report-bar"),w3("--score",D1(J)+"%")]),$),m1(V([g("report-section-score")]),V([d(D1(Z.correct)+"/"+D1(Z.total))])),m1(V([g("report-section-percent")]),V([d(D1(J)+"%")]))]))}function GF(Z){let J=LO(Z.exam_answers,a5(V9)),Q=G0(Z.exam_answers),X=U7(Z.exam_answers,(K)=>{return K[1]}),Y=Q0(J,(K)=>{return e8(K.correct,K.total)<xJ});return Y1(V([g("report-container")]),V([Y1(V([g("drill-header")]),V([U0(V([g("btn-secondary"),i1(AO)]),V([d("← Menu")])),f3(V([g("drill-title")]),V([d("Exam result")]))])),Y1(V([g("report-body")]),w(Y1(V([g("report-total")]),V([m1(V([g("report-total-score")]),V([d(D1(X)+"/"+D1(Q))])),m1(V([g("report-total-percent")]),V([d(D1(e8(X,Q))+"%")]))])),w(MI("By section — weakest first",V([d9(V([g("report-sections")]),H1(J,ET))])),_T(Y))))]))}var wT="src/algodrill.gleam",hT=40;function kT(Z){let J=Z.route;if(J instanceof Q9)return RI(Z);else if(J instanceof _4){let Q=KF(Z);if(Q instanceof D)return Q[0];else return RI(Z)}else return GF(Z)}function bT(Z){if(Z instanceof u5)return!1;else if(Z instanceof n5)if(!Z[0])return!1;else return!0;else if(Z instanceof I9)return!1;else if(Z instanceof q9)return!1;else if(Z instanceof p5)return!1;else if(Z instanceof Z7)return!1;else if(Z instanceof z8)return!1;else return!0}function LI(Z){let J=q6(Z);if(J instanceof D){let Q=J[0],X=h4(Q.category,Q.subcategory,Q.title);if(X instanceof D){let Y=X[0];return new D(l5(Y.language))}else return X}else return J}function AI(Z,J,Q){let X=G9(Z,J);if(Q)return g6(Z,J,SJ);else if(X instanceof D)if(X[0]instanceof U8)return Z;else return g6(Z,J,x5);else return g6(Z,J,x5)}function VF(Z){let J=q6(Z);if(J instanceof D){let Q=J[0],X=h4(Q.category,Q.subcategory,Q.title);if(X instanceof D){let K=X[0].check;if(K instanceof a){let I=K[0];return new D(I)}else return new V1(void 0)}else return X}else return J}function xT(){return N6((Z)=>{return hX("draft-save",400,()=>{return Z(HO)})})}function BI(Z){let J=Z[0],Q=Z[1],X=J.route instanceof _4&&!S1(VF(J),new V1(void 0)),Y=LI(J);if(X&&Y instanceof D){let K=Y[0];if(s5(J,K)instanceof X9)return[new O1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,J.draft,J.revealed_solution,g6(J.runtimes,K,bK),J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers),n9(V([Q,aO(K)]))];else return Z}else return Z}function Z3(Z){let J=h4(Z.category,Z.subcategory,Z.title);if(J instanceof D){let X=J[0].check;if(X instanceof a)return X[0].starter;else return""}else return""}function DI(Z){return new O1(K8,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,"",U1,Z.runtimes,K9,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U1,!1,Z.exam_answers)}function UF(Z){let J=q6(Z);if(J instanceof D){let Q=J[0],X=h4(Q.category,Q.subcategory,Q.title);if(X instanceof D){let K=X[0].quiz;if(K instanceof a){let I=K[0];return new D(I)}else return new V1(void 0)}else return X}else return J}function yT(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return K;else{let q=Xq(X,xX(Y)),W=q[0],G=q[1];if(G instanceof k)return X0(K,X);else{let{head:U,tail:z}=G;Z=X0(W,z),J=Y-1,Q=w(U,K)}}}}function zF(Z){return yT(Z,G0(Z),$)}function gT(){let Z=mJ(),J,Q=G0(Z);if(Q===0)J=Q;else J=T3(1,x4(hT,Q));let X=J,K=T9(Z,(I)=>{return N3(zF(I[1]),X)});return zF(K)}function fT(Z,J){if(z7(Z,J))return Q0(Z,(X)=>{return!S1(X,J)});else return X0(Z,V([J]))}function $T(Z,J){if(J instanceof y5){let Q=J[0];return[new O1(Z.route,new a(Q),U1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof g5){let Q=J[0];return[new O1(Z.route,Z.selected_category,new a(Q),Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof f5)if(J[0]===0)return[new O1(Z.route,U1,U1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else return[new O1(Z.route,Z.selected_category,U1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else if(J instanceof E4){let Q=J[0];return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,fT(Z.selected,Q),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof TJ){let{selected_category:Q,selected_subcategory:X}=Z;if(Q instanceof a&&X instanceof a){let Y=Q[0],K=X[0],I,q=r5(Y,K),W=H1(q,(U)=>{return new e6(Y,K,U.title)});I=Q0(W,(U)=>{return!z7(Z.selected,U)});let G=I;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,X0(Z.selected,G),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()]}else if(J instanceof _J)return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,$,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()];else if(J instanceof $5){let Q=J[0],X,Y=RQ(Q);if(Y instanceof D){let I=Y[0];if(I>0)X=I;else X=1}else X=1;let K=X;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,K,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof EJ){let Q=Z.selected;if(Q instanceof k)return[Z,j1()];else{let X=Q.head;return BI([new O1(b5,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,Z3(X),U1,Z.runtimes,K9,g6(Z.drafts,X,Z3(X)),Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U1,!1,$),j1()])}}else if(J instanceof u5)return[Z,N6((Q)=>{return Q(new n5(kX((()=>{if(UF(Z)instanceof D)return"Exit the exam? You will not get a score for it.";else return"Exit the drill? Your typed code will be lost."})())))})];else if(J instanceof n5)if(J[0])return[DI(Z),j1()];else return[Z,j1()];else if(J instanceof I9){let Q=J[0],X,Y=Z.revealed_solution;if(Y instanceof a)if(Y[0]===Q)X=U1;else X=new a(Q);else X=new a(Q);let K=X;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,K,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof CJ){let Q;if(Z.problem_index+1<G0(Z.selected))Q=[Z.problem_index+1,Z.current_iteration];else Q=[0,Z.current_iteration+1];let Y=Q,K=Y[0],I=Y[1],q=I>Z.iteration_count,W=Z.exam_answers;if(q)if(W instanceof k)return[DI(Z),N6((G)=>{return bX("Drill complete.")})];else return[(()=>{let G=DI(Z);return new O1(DJ,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,G.draft,G.revealed_solution,G.runtimes,G.run,G.drafts,G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers)})(),j1()];else{let G=new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,K,Z.iteration_count,I,Z.draft,U1,Z.runtimes,K9,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U1,!1,Z.exam_answers),U,z=q6(G);if(z instanceof D){let O=z[0];U=new O1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,Z3(O),G.revealed_solution,G.runtimes,G.run,g6(G.drafts,O,Z3(O)),G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers)}else U=new O1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,"",G.revealed_solution,G.runtimes,G.run,G.drafts,G.attempts,G.search,G.next_run_id,G.editor_keymap,G.choice,G.graded,G.exam_answers);return BI([U,j1()])}}else if(J instanceof v5){let Q=J[0];return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Q,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof m5){let Q=J[0];return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Q,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof q9){let Q=J[0],X,Y=q6(Z);if(Y instanceof D){let I=Y[0];X=g6(Z.drafts,I,Q)}else X=Z.drafts;let K=X;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Q,Z.revealed_solution,Z.runtimes,Z.run,K,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),xT()]}else if(J instanceof wJ)return[Z,j1()];else if(J instanceof p5){let Q=LI(Z),X=VF(Z);if(Q instanceof D&&X instanceof D){let Y=Q[0],K=X[0];if(s5(Z,Y)instanceof Y9){let q=Z.next_run_id;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new W8(q),Z.drafts,Z.attempts,Z.search,q+1,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),tO(Y,q,Z.draft,K.harness)]}else return[Z,j1()]}else return[Z,j1()]}else if(J instanceof Z7){let Q=J.language;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,g6(Z.runtimes,Q,zO),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof z8){let{language:Q,message:X}=J;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,g6(Z.runtimes,Q,new BJ(X)),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else if(J instanceof W9){let{id:Q,outcome:X,stdout:Y}=J,K=Z.run;if(K instanceof W8)if(K.id===Q){let q;if(X instanceof I8){let j=X[0];q=!(j instanceof k)&&Qq(j,(O)=>{return O.passed})}else if(X instanceof q8)q=!1;else q=!1;let W=q,G,U=q6(Z);if(U instanceof D){let j=U[0];G=AI(Z.attempts,j,W)}else G=Z.attempts;let z=G;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new G8(X,Y),Z.drafts,z,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()];else return[Z,j1()]}else if(J instanceof c5){let Q=J.id,X=Z.run;if(X instanceof W8)if(X.id===Q){let K,I=q6(Z);if(I instanceof D){let G=I[0];K=AI(Z.attempts,G,!1)}else K=Z.attempts;let q=K,W=LI(Z);if(W instanceof D){let G=W[0];return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,g6(Z.runtimes,G,bK),new G8(fK,""),Z.drafts,q,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),oO(G)]}else return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new G8(fK,""),Z.drafts,q,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}else return[Z,j1()];else return[Z,j1()]}else if(J instanceof d5){let Q=J[0];if(Z.graded)return[Z,j1()];else return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,new a(Q),Z.graded,Z.exam_answers),j1()]}else if(J instanceof hJ){let{graded:Q,choice:X}=Z,Y=UF(Z),K=q6(Z);if(!Q&&X instanceof a&&Y instanceof D&&K instanceof D){let I=X[0],q=Y[0],W=K[0],G=I===q.correct;return[new O1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,AI(Z.attempts,W,G),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,!0,w([W,G],Z.exam_answers)),j1()]}else return[Z,j1()]}else if(J instanceof kJ)return[Z,N6((Q)=>{return Q(new bJ(gT()))})];else if(J instanceof bJ){let Q=J[0];if(Q instanceof k)return[Z,j1()];else return[new O1(b5,Z.selected_category,Z.selected_subcategory,Q,0,1,1,"",U1,Z.runtimes,K9,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U1,!1,$),j1()]}else return[new O1(K8,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j1()]}function uT(Z,J){let Q=$T(Z,J),X=Q[0],Y=Q[1];if(bT(J))return[X,n9(V([YF(X),Y]))];else return[X,Y]}function nT(Z,J){let Q=G9(Z.drafts,J);if(Q instanceof D)return Q[0];else return Z3(J)}function vT(Z){let J=XF(),Q,X=J.route,Y=q6(J);if(Y instanceof D&&X instanceof _4){let I=Y[0];Q=new O1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,nT(J,I),J.revealed_solution,J.runtimes,J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers)}else Q=J;return BI([Q,j1()])}function jF(){kK();let Z=CU(vT,uT,kT),J=wU(Z,"#app",void 0);if(!(J instanceof D))throw R8("let_assert",wT,"algodrill",32,"main","Pattern match failed, no pattern matched the value.",{value:J,start:1219,end:1268,pattern_start:1230,pattern_end:1235});return}jF();
