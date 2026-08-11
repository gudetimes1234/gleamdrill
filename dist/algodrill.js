class S{withFields(Z){let J=Object.keys(this).map((Q)=>(Q in Z)?Z[Q]:this[Q]);return new this.constructor(...J)}}class DQ{static fromArray(Z,J){return j(Z,J)}[Symbol.iterator](){return new fK(this)}toArray(){return[...this]}atLeastLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return J!==void 0}hasLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return Z===-1&&J instanceof w}countLength(){let Z=this,J=0;while(Z)Z=Z.tail,J++;return J-1}}function k(Z,J){return new Y4(Z,J)}function j(Z,J){let Q=J||d;for(let X=Z.length-1;X>=0;--X)Q=new Y4(Z[X],Q);return Q}class fK{#Z;constructor(Z){this.#Z=Z}next(){if(this.#Z instanceof w)return{done:!0};else{let{head:Z,tail:J}=this.#Z;return this.#Z=J,{value:Z,done:!1}}}}class w extends DQ{}var d=new w,gK=()=>d,MQ=(Z)=>Z instanceof w;class Y4 extends DQ{constructor(Z,J){super();this.head=Z,this.tail=J}}var r9=(Z,J)=>new Y4(Z,J),Y8=(Z)=>Z instanceof Y4,a9=(Z)=>Z.head,$6=(Z)=>Z.tail;class K4{bitSize;byteSize;bitOffset;rawBuffer;constructor(Z,J,Q){if(!(Z instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=J??Z.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=Q??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(Z.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=Z}byteAt(Z){if(Z<0||Z>=this.byteSize)return;return X4(this.rawBuffer,this.bitOffset,Z)}equals(Z){if(this.bitSize!==Z.bitSize)return!1;let J=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&Z.bitOffset===0){for(let X=0;X<J;X++)if(this.rawBuffer[X]!==Z.rawBuffer[X])return!1;let Q=this.bitSize%8;if(Q){let X=8-Q;if(this.rawBuffer[J]>>X!==Z.rawBuffer[J]>>X)return!1}}else{for(let X=0;X<J;X++){let Y=X4(this.rawBuffer,this.bitOffset,X),K=X4(Z.rawBuffer,Z.bitOffset,X);if(Y!==K)return!1}let Q=this.bitSize%8;if(Q){let X=X4(this.rawBuffer,this.bitOffset,J),Y=X4(Z.rawBuffer,Z.bitOffset,J),K=8-Q;if(X>>K!==Y>>K)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function X4(Z,J,Q){if(J===0)return Z[Q]??0;else{let X=Z[Q]<<J&255,Y=Z[Q+1]>>8-J;return X|Y}}class AQ{constructor(Z){this.value=Z}}class c5 extends S{static isResult(Z){return Z instanceof c5}}class v extends c5{constructor(Z){super();this[0]=Z}isOk(){return!0}}var v1=(Z)=>new v(Z),z0=(Z)=>Z instanceof v,N0=(Z)=>Z[0];class L1 extends c5{constructor(Z){super();this[0]=Z}isOk(){return!1}}var t1=(Z)=>new L1(Z),uK=(Z)=>Z instanceof L1;function B1(Z,J){let Q=[Z,J];while(Q.length){let X=Q.pop(),Y=Q.pop();if(X===Y)continue;if(!hK(X)||!hK(Y))return!1;if(!CN(X,Y)||LN(X,Y)||BN(X,Y)||PN(X,Y)||TN(X,Y)||SN(X,Y)||EN(X,Y))return!1;let q=Object.getPrototypeOf(X);if(q!==null&&typeof q.equals==="function")try{if(X.equals(Y))continue;else return!1}catch{}let[W,G]=AN(X),U=W(X),z=W(Y);if(U.length!==z.length)return!1;for(let I of U)Q.push(G(X,I),G(Y,I))}return!0}function AN(Z){if(Z instanceof Map)return[(J)=>J.keys(),(J,Q)=>J.get(Q)];else{let J=Z instanceof globalThis.Error?["message"]:[];return[(Q)=>[...J,...Object.keys(Q)],(Q,X)=>Q[X]]}}function LN(Z,J){return Z instanceof Date&&(Z>J||Z<J)}function BN(Z,J){return!(Z instanceof K4)&&Z.buffer instanceof ArrayBuffer&&Z.BYTES_PER_ELEMENT&&!(Z.byteLength===J.byteLength&&Z.every((Q,X)=>Q===J[X]))}function PN(Z,J){return Array.isArray(Z)&&Z.length!==J.length}function TN(Z,J){return Z instanceof Map&&Z.size!==J.size}function SN(Z,J){return Z instanceof Set&&(Z.size!=J.size||[...Z].some((Q)=>!J.has(Q)))}function EN(Z,J){return Z instanceof RegExp&&(Z.source!==J.source||Z.flags!==J.flags)}function hK(Z){return typeof Z==="object"&&Z!==null}function CN(Z,J){if(typeof Z!=="object"&&typeof J!=="object"&&(!Z||!J))return!1;if([Promise,WeakSet,WeakMap,Function].some((X)=>Z instanceof X))return!1;return Z.constructor===J.constructor}function V9(Z,J,Q,X,Y,K,q){let W=new globalThis.Error(K);W.gleam_error=Z,W.file=J,W.module=Q,W.line=X,W.function=Y,W.fn=Y;for(let G in q)W[G]=q[G];return W}class h0 extends S{}var q4=new h0,vK=()=>q4;class f0 extends S{}var W4=new f0,mK=()=>W4;class LQ extends S{}var G4=new LQ,pK=()=>G4;class Q1 extends S{constructor(Z){super();this[0]=Z}}var d5=(Z)=>Z instanceof Q1,n5=(Z)=>Z[0];class h6 extends S{}var V1=new h6;function _N(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else{let Y=Q.head;Z=Q.tail,J=k(Y,X)}}}function kN(Z){return _N(Z,d)}function xN(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return kN(X);else{let Y=Q.head;if(Y instanceof Q1){let K=Q.tail,q=Y[0];Z=K,J=k(q,X)}else Z=Q.tail,J=X}}}function BQ(Z){return xN(Z,d)}var cK=new WeakMap,PQ=new DataView(new ArrayBuffer(8)),TQ=0;function SQ(Z){let J=cK.get(Z);if(J!==void 0)return J;let Q=TQ++;if(TQ===2147483647)TQ=0;return cK.set(Z,Q),Q}function EQ(Z,J){return Z^J+2654435769+(Z<<6)+(Z>>2)|0}function CQ(Z){let J=0,Q=Z.length;for(let X=0;X<Q;X++)J=Math.imul(31,J)+Z.charCodeAt(X)|0;return J}function lK(Z){PQ.setFloat64(0,Z);let J=PQ.getInt32(0),Q=PQ.getInt32(4);return Math.imul(73244475,J>>16^J)^Q}function wN(Z){return CQ(Z.toString())}function bN(Z){let J=Object.getPrototypeOf(Z);if(J!==null&&typeof J.hashCode==="function")try{let X=Z.hashCode(Z);if(typeof X==="number")return X}catch{}if(Z instanceof Promise||Z instanceof WeakSet||Z instanceof WeakMap)return SQ(Z);if(Z instanceof Date)return lK(Z.getTime());let Q=0;if(Z instanceof ArrayBuffer)Z=new Uint8Array(Z);if(Array.isArray(Z)||Z instanceof Uint8Array)for(let X=0;X<Z.length;X++)Q=Math.imul(31,Q)+I6(Z[X])|0;else if(Z instanceof Set)Z.forEach((X)=>{Q=Q+I6(X)|0});else if(Z instanceof Map)Z.forEach((X,Y)=>{Q=Q+EQ(I6(X),I6(Y))|0});else{let X=Object.keys(Z);for(let Y=0;Y<X.length;Y++){let K=X[Y],q=Z[K];Q=Q+EQ(I6(q),CQ(K))|0}}return Q}function I6(Z){if(Z===null)return 1108378658;if(Z===void 0)return 1108378659;if(Z===!0)return 1108378657;if(Z===!1)return 1108378656;switch(typeof Z){case"number":return lK(Z);case"string":return CQ(Z);case"bigint":return wN(Z);case"object":return bN(Z);case"symbol":return SQ(Z);case"function":return SQ(Z);default:return 0}}class K8{constructor(Z,J){this.size=Z,this.root=J}}var U4=5,yN=(1<<U4)-1,s5=Symbol();class O9{constructor(Z,J,Q,X){this.datamap=J,this.nodemap=Q,this.data=X,this.generation=Z}equals(Z){if(this===Z)return!0;if(!(Z instanceof O9))return!1;if(this.datamap!==Z.datamap||this.nodemap!==Z.nodemap)return!1;let J=this.data,Q=Z.data;if(J.length!==Q.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#Z(Q);let X=J.length-z4(this.nodemap);for(let Y=0;Y<X;Y+=2)if(!B1(J[Y],Q[Y])||!B1(J[Y+1],Q[Y+1]))return!1;for(let Y=X;Y<J.length;++Y)if(!J[Y].equals(Q[Y]))return!1;return!0}#Z(Z){let J=this.data;Z:for(let Q=0;Q<J.length;Q+=2){for(let X=0;X<Z.length;X+=2)if(B1(J[Q],Z[X])){if(!B1(J[Q+1],Z[X+1]))return!1;continue Z}return!1}return!0}hashCode(){let Z=this.data,J=Z.length-z4(this.nodemap),Q=0;for(let X=0;X<J;X+=2)Q=Q+EQ(I6(Z[X+1]),I6(Z[X]))|0;for(let X=J;X<Z.length;++X)Q=Q+Z[X].hashCode()|0;return Q}}var sK=hN(0),iK=new K8(0,sK),$N=t1(void 0);function hN(Z){return new O9(Z,0,0,[])}function rK(Z,J){if(Z.generation===J)return Z;let Q=Z.data.slice(0);return new O9(J,Z.datamap,Z.nodemap,Q)}function i5(Z,J,Q,X){if(Z.data[Q]===X)return Z;return Z=rK(Z,J),Z.data[Q]=X,Z}function dK(Z,J,Q,X,Y,K){let q=Z.data,W=q.length,G=Array(W+2),U=0,z=0;while(U<X)G[z++]=q[U++];G[z++]=Y,G[z++]=K;while(U<W)G[z++]=q[U++];return new O9(J,Z.datamap|Q,Z.nodemap,G)}function nK(Z,J,Q,X){Z=rK(Z,J);let Y=Z.data,K=Y.length;for(let q=X,W=X+2;W<K;++W,++q)Y[q]=Y[W];return Y.pop(),Y.pop(),Z.datamap^=Q,Z}function o9(){return iK}function q8(Z,J){let Q=fN(Z.root,J,I6(J));return Q!==s5?v1(Q):$N}function fN(Z,J,Q){for(let Y=0;Y<32;Y+=U4){let K=Z.data,q=kQ(Q,Y);if(Z.nodemap&q)Z=K[K.length-1-H9(Z.nodemap,q)];else if(Z.datamap&q){let W=Math.imul(H9(Z.datamap,q),2);return B1(J,K[W])?K[W+1]:s5}else return s5}let X=Z.data;for(let Y=0;Y<X.length;Y+=2)if(B1(J,X[Y]))return X[Y+1];return s5}function _Q(Z){return{generation:oK(Z),root:Z.root,size:Z.size,dict:Z}}function aK(Z){if(Z.root===Z.dict.root)return Z.dict;return new K8(Z.size,Z.root)}function oK(Z){let J=Z.root;if(J.generation<Number.MAX_SAFE_INTEGER)return J.generation+1;let Q=[J];while(Q.length){let X=Q.pop();X.generation=0;let Y=X.data.length-z4(X.nodemap);for(let K=Y;K<X.data.length;++K)Q.push(X.data[K])}return 1}var l5=_Q(iK);function F9(Z,J,Q){l5.generation=oK(Z),l5.size=Z.size;let X=I6(J),Y=r5(l5,Z.root,J,Q,X,0);if(Y===Z.root)return Z;return new K8(l5.size,Y)}function r5(Z,J,Q,X,Y,K){let q=J.data,W=Z.generation;if(K>32){for(let _=0;_<q.length;_+=2)if(B1(Q,q[_]))return i5(J,W,_+1,X);return Z.size+=1,dK(J,W,0,q.length,Q,X)}let G=kQ(Y,K);if(J.nodemap&G){let _=q.length-1-H9(J.nodemap,G),A=q[_];return A=r5(Z,A,Q,X,Y,K+U4),i5(J,W,_,A)}let U=Math.imul(H9(J.datamap,G),2);if((J.datamap&G)===0)return Z.size+=1,dK(J,W,G,U,Q,X);if(B1(Q,q[U]))return i5(J,W,U+1,X);let z=K+U4,I=sK;I=r5(Z,I,Q,X,Y,z);let V=q[U],O=q[U+1],F=I6(V);I=r5(Z,I,V,O,F,z),Z.size-=1;let N=q.length,R=N-1-H9(J.nodemap,G),P=Array(N-1),T=0,C=0;while(T<U)P[C++]=q[T++];T+=2;while(T<=R)P[C++]=q[T++];P[C++]=I;while(T<N)P[C++]=q[T++];return new O9(W,J.datamap^G,J.nodemap|G,P)}function tK(Z,J){let Q=I6(Z);return J.root=eK(J,J.root,Z,Q,0),J}function eK(Z,J,Q,X,Y){let K=J.data,q=Z.generation;if(Y>32){for(let U=0;U<K.length;U+=2)if(B1(Q,K[U]))return Z.size-=1,nK(J,q,0,U);return J}let W=kQ(X,Y),G=Math.imul(H9(J.datamap,W),2);if((J.nodemap&W)!==0){let U=K.length-1-H9(J.nodemap,W),z=K[U];if(z=eK(Z,z,Q,X,Y+U4),z.nodemap!==0||z.data.length>2)return i5(J,q,U,z);let I=K.length,V=Array(I+1),O=0,F=0;while(O<G)V[F++]=K[O++];V[F++]=z.data[0],V[F++]=z.data[1];while(O<U)V[F++]=K[O++];O++;while(O<I)V[F++]=K[O++];return new O9(q,J.datamap|W,J.nodemap^W,V)}if((J.datamap&W)===0||!B1(Q,K[G]))return J;return Z.size-=1,nK(J,q,W,G)}function N9(Z,J,Q){let X=[Z.root];while(X.length){let Y=X.pop(),K=Y.data,q=K.length-z4(Y.nodemap);for(let W=0;W<q;W+=2)J=Q(J,K[W],K[W+1]);for(let W=q;W<K.length;++W)X.push(K[W])}return J}function z4(Z){return Z-=Z>>>1&1431655765,Z=(Z&858993459)+(Z>>>2&858993459),Math.imul(Z+(Z>>>4)&252645135,16843009)>>>24}function H9(Z,J){return z4(Z&J-1)}function kQ(Z,J){return 1<<(Z>>>J&yN)}function I4(Z){return N9(Z,d,(J,Q,X)=>{return k(Q,J)})}function xQ(Z,J){let Q=_Q(Z),X=((Y)=>{return tK(J,Y)})(Q);return aK(X)}class C8 extends S{}var f6=new C8;class Jq extends S{}var V4=new Jq;function vN(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else Z=Q.tail,J=X+1}}function g6(Z){return vN(Z,0)}function mN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return K;else{let{head:q,tail:W}=X;if(Y(q))Z=W,J=Y,Q=K+1;else Z=W,J=Y,Q=K}}}function Qq(Z,J){return mN(Z,J,0)}function t9(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else{let Y=Q.head;Z=Q.tail,J=k(Y,X)}}}function _1(Z){return t9(Z,d)}function e9(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return!1;else{let Y=Q.head;if(B1(Y,X))return!0;else Z=Q.tail,J=X}}}function a5(Z){if(Z instanceof w)return new L1(void 0);else{let J=Z.head;return new v(J)}}function pN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return _1(K);else{let{head:q,tail:W}=X,G;if(Y(q))G=k(q,K);else G=K;let z=G;Z=W,J=Y,Q=z}}}function r0(Z,J){return pN(Z,J,d)}function cN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return _1(K);else{let{head:q,tail:W}=X,G,U=Y(q);if(U instanceof v){let I=U[0];G=k(I,K)}else G=K;let z=G;Z=W,J=Y,Q=z}}}function wQ(Z,J){return cN(Z,J,d)}function dN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return _1(K);else{let q=X.head;Z=X.tail,J=Y,Q=k(Y(q),K)}}}function j1(Z,J){return dN(Z,J,d)}function nN(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof w)return _1(W);else{let{head:G,tail:U}=Y,z=k(K(G,q),W);Z=U,J=K,Q=q+1,X=z}}}function o5(Z,J){return nN(Z,J,0,d)}function t5(Z,J){while(!0){let Q=Z,X=J;if(X<=0)return Q;else if(Q instanceof w)return Q;else Z=Q.tail,J=X-1}}function lN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return _1(K);else if(X instanceof w)return _1(K);else{let W=X.head;Z=X.tail,J=Y-1,Q=k(W,K)}}}function Xq(Z,J){return lN(Z,J,d)}function sN(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else{let Y=Q.head;Z=Q.tail,J=k(Y,X)}}}function I0(Z,J){return sN(_1(Z),J)}function e5(Z,J){return k(J,Z)}function iN(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return _1(X);else{let Y=Q.head;Z=Q.tail,J=t9(Y,X)}}}function j4(Z){return iN(Z,d)}function bQ(Z,J){return j4(j1(Z,J))}function g0(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return Y;else{let q=X.head;Z=X.tail,J=K(Y,q),Q=K}}}function Z7(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return new L1(void 0);else{let{head:Y,tail:K}=Q;if(X(Y))return new v(Y);else Z=K,J=X}}}function Yq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return new L1(void 0);else{let{head:Y,tail:K}=Q,q=X(Y);if(q instanceof v)return q;else Z=K,J=X}}}function Kq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return!0;else{let{head:Y,tail:K}=Q,q=X(Y);if(q)Z=K,J=X;else return q}}}function rN(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof w)return t9(K,W);else if(K instanceof w)return t9(Y,W);else{let{head:G,tail:U}=Y,z=K.head,I=K.tail,V=q(G,z);if(V instanceof h0)Z=Y,J=I,Q=q,X=k(z,W);else if(V instanceof f0)Z=U,J=K,Q=q,X=k(G,W);else Z=U,J=K,Q=q,X=k(G,W)}}}function aN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return _1(K);else{let q=X.tail;if(q instanceof w){let W=X.head;return _1(k(_1(W),K))}else{let W=X.head,G=q.head,U=q.tail,z=rN(W,G,Y,d);Z=U,J=Y,Q=k(z,K)}}}}function oN(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof w)return t9(K,W);else if(K instanceof w)return t9(Y,W);else{let{head:G,tail:U}=Y,z=K.head,I=K.tail,V=q(G,z);if(V instanceof h0)Z=U,J=K,Q=q,X=k(G,W);else if(V instanceof f0)Z=Y,J=I,Q=q,X=k(z,W);else Z=Y,J=I,Q=q,X=k(z,W)}}}function tN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return _1(K);else{let q=X.tail;if(q instanceof w){let W=X.head;return _1(k(_1(W),K))}else{let W=X.head,G=q.head,U=q.tail,z=oN(W,G,Y,d);Z=U,J=Y,Q=k(z,K)}}}}function eN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return X;else if(Y instanceof C8)if(X.tail instanceof w)return X.head;else Z=tN(X,K,d),J=V4,Q=K;else if(X.tail instanceof w){let W=X.head;return _1(W)}else Z=aN(X,K,d),J=f6,Q=K}}function Z2(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,U=X,z=Y,I=K,V=k(z,G);if(q instanceof w)if(U instanceof C8)return k(_1(V),I);else return k(V,I);else{let{head:O,tail:F}=q,N=W(z,O);if(U instanceof C8)if(N instanceof h0)Z=F,J=W,Q=V,X=U,Y=O,K=I;else if(N instanceof f0)Z=F,J=W,Q=V,X=U,Y=O,K=I;else{let R;if(U instanceof C8)R=k(_1(V),I);else R=k(V,I);let P=R;if(F instanceof w)return k(j([O]),P);else{let{head:T,tail:C}=F,_,A=W(O,T);if(A instanceof h0)_=f6;else if(A instanceof f0)_=f6;else _=V4;let B=_;Z=C,J=W,Q=j([O]),X=B,Y=T,K=P}}else if(N instanceof h0){let R;if(U instanceof C8)R=k(_1(V),I);else R=k(V,I);let P=R;if(F instanceof w)return k(j([O]),P);else{let{head:T,tail:C}=F,_,A=W(O,T);if(A instanceof h0)_=f6;else if(A instanceof f0)_=f6;else _=V4;let B=_;Z=C,J=W,Q=j([O]),X=B,Y=T,K=P}}else if(N instanceof f0){let R;if(U instanceof C8)R=k(_1(V),I);else R=k(V,I);let P=R;if(F instanceof w)return k(j([O]),P);else{let{head:T,tail:C}=F,_,A=W(O,T);if(A instanceof h0)_=f6;else if(A instanceof f0)_=f6;else _=V4;let B=_;Z=C,J=W,Q=j([O]),X=B,Y=T,K=P}}else Z=F,J=W,Q=V,X=U,Y=O,K=I}}}function qq(Z,J){if(Z instanceof w)return Z;else{let Q=Z.tail;if(Q instanceof w)return Z;else{let X=Z.head,Y=Q.head,K=Q.tail,q,W=J(X,Y);if(W instanceof h0)q=f6;else if(W instanceof f0)q=f6;else q=V4;let G=q,U=Z2(K,J,j([X]),G,Y,d);return eN(U,f6,J)}}}function Wq(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return;else{let{head:Y,tail:K}=Q;X(Y),Z=K,J=X}}}class zq extends S{}var eP=new zq;class jq extends S{}var KT=new jq;class Hq extends S{}var qT=new Hq;function ZZ(Z,J){if(J==="")return $Q(Z);else{let X=u1(Z),Y=hQ(X,J);return j1(Y,u1)}}function W2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else{let Y=Q.head;Z=Q.tail,J=X+Y}}}function Oq(Z){return W2(Z,"")}function G2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return K;else{let q=X.head;Z=X.tail,J=Y,Q=K+Y+q}}}function JZ(Z,J){if(Z instanceof w)return"";else{let{head:Q,tail:X}=Z;return G2(X,J,Q)}}function Fq(Z){let Q=Nq(Z);return Rq(Q)}class _8 extends S{constructor(Z,J,Q){super();this.expected=Z,this.found=J,this.path=Q}}var Lq=(Z,J,Q)=>new _8(Z,J,Q);class E0 extends S{constructor(Z){super();this.function=Z}}var V2=new E0(j2),o0=new E0(H2);var k1=new E0(O2),gQ=new E0(D2);function v6(Z,J){let Q=J.function(Z),X=Q[0],Y=Q[1];if(Y instanceof w)return new v(X);else return new L1(Y)}function uQ(Z,J,Q){let X=Q(Z);if(X instanceof v)return[X[0],d];else return[X[0],j([new _8(J,U8(Z),d)])]}function j2(Z){return uQ(Z,"Float",Sq)}function R9(Z,J){return new E0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1];return[J(Y),K]})}function H2(Z){return uQ(Z,"Int",Eq)}function O2(Z){return uQ(Z,"String",Cq)}function F2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(K instanceof w)return Y;else{let{head:q,tail:W}=K,G=q.function(X),U=G;if(G[1]instanceof w)return U;else Z=X,J=Y,Q=W}}}function Bq(Z,J){return new E0((Q)=>{let X=Z.function(Q),Y=X;if(X[1]instanceof w)return Y;else return F2(Q,Y,J)})}function N2(Z){let J=Bq(k1,j([(()=>{return R9(o0,Q0)})(),(()=>{return R9(V2,YZ)})()])),Q=v6(Z,J);if(Q instanceof v)return Q[0];else return"<"+U8(Z)+">"}function N4(Z,J){let Q=j1(J,(Y)=>{let q=u1(Y);return N2(q)}),X=j1(Z[1],(Y)=>{return new _8(Y.expected,Y.found,I0(Q,Y.path))});return[Z[0],X]}function k8(Z){return new E0((J)=>{return Tq(J,Z.function,(Q,X)=>{return N4(Q,j([X]))},0,d)})}function R2(Z,J,Q,X,Y){while(!0){let K=Z,q=J,W=Q,G=X,U=Y;if(K instanceof w){let I=W(G);return N4(I,_1(q))}else{let{head:z,tail:I}=K,V=vQ(G,z);if(V instanceof v){let O=V[0];if(O instanceof Q1){let F=O[0];Z=I,J=k(z,q),Q=W,X=F,Y=U}else return U(G,k(z,q))}else{let O=V[0],R=[W(G)[0],j([new _8(O,U8(G),d)])];return N4(R,_1(q))}}}}function J7(Z,J,Q){return new E0((X)=>{let Y=R2(Z,d,J.function,X,(z,I)=>{let F=[J.function(z)[0],j([new _8("Field","Nothing",d)])];return N4(F,_1(I))}),K=Y[0],q=Y[1],W=Q(K).function(X),G=W[0],U=W[1];return[G,I0(q,U)]})}function $1(Z){return new E0((J)=>{return[Z,d]})}function Pq(Z,J){return j([new _8(Z,U8(J),d)])}function w1(Z,J,Q){return J7(j([Z]),J,Q)}function x8(Z,J,Q,X){return new E0((Y)=>{let K,q,W=vQ(Y,Z);if(W instanceof v){let N=W[0];if(N instanceof Q1){let R=N[0];q=Q.function(R)}else q=[J,d]}else{let N=W[0];q=[J,j([new _8(N,U8(Y),d)])]}K=N4(q,j([Z]));let U=K,z=U[0],I=U[1],V=X(z).function(Y),O=V[0],F=V[1];return[O,I0(I,F)]})}function D2(Z){if(B1(u1(!0),Z))return[!0,d];else if(B1(u1(!1),Z))return[!1,d];else return[!1,Pq("Bool",Z)]}function QZ(Z){return new E0((J)=>{if(_q(J))return[V1,d];else{let X=Z.function(J),Y=X[0],K=X[1];return[new Q1(Y),K]}})}function XZ(Z,J){return new E0((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1],W=J(Y).function(Q),G=W,U=W[0];if(K instanceof w)return G;else return[U,K]})}function R4(Z,J){return new E0((Q)=>{return[Z,Pq(J,Q)]})}var A2=void 0;function u1(Z){return Z}function mQ(Z){if(/^[-+]?(\d+)$/.test(Z))return v1(parseInt(Z));else return t1(A2)}function Q0(Z){return Z.toString()}function $Q(Z){let J=L2(Z);if(J)return D4(Array.from(J).map((Q)=>Q.segment));else return D4(Z.match(/./gsu))}var kq=void 0;function L2(Z){if(globalThis.Intl&&Intl.Segmenter)return kq||=new Intl.Segmenter,kq.segment(Z)[Symbol.iterator]()}function O4(Z){return Z.toLowerCase()}function hQ(Z,J){return D4(Z.split(J))}function fQ(Z,J){return Z.indexOf(J)>=0}function F4(Z,J){return Z.startsWith(J)}var xq=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),B2=new RegExp(`^[${xq}]*`),P2=new RegExp(`[${xq}]*$`);function Nq(Z){return Z.replace(B2,"")}function Rq(Z){return Z.replace(P2,"")}function U8(Z){if(typeof Z==="string")return"String";else if(typeof Z==="boolean")return"Bool";else if(S2(Z))return"Result";else if(KZ(Z))return"List";else if(Z instanceof K4)return"BitArray";else if(Z instanceof K8)return"Dict";else if(Number.isInteger(Z))return"Int";else if(Array.isArray(Z))return"Array";else if(typeof Z==="number")return"Float";else if(Z===null)return"Nil";else if(Z===void 0)return"Nil";else{let J=typeof Z;return J.charAt(0).toUpperCase()+J.slice(1)}}var{MAX_SAFE_INTEGER:JS,MIN_SAFE_INTEGER:QS}=Number;function YZ(Z){let J=Z.toString().replace("+","");if(J.indexOf(".")>=0)return J;else{let Q=J.indexOf("e");if(Q>=0)return J.slice(0,Q)+".0"+J.slice(Q);else return J+".0"}}class T2{#Z=new Set;inspect(Z){let J=typeof Z;if(Z===!0)return"True";if(Z===!1)return"False";if(Z===null)return"//js(null)";if(Z===void 0)return"Nil";if(J==="string")return this.#Y(Z);if(J==="bigint"||Number.isInteger(Z))return Z.toString();if(J==="number")return YZ(Z);if(Z instanceof AQ)return this.#W(Z);if(Z instanceof K4)return this.#K(Z);if(Z instanceof RegExp)return`//js(${Z})`;if(Z instanceof Date)return`//js(Date("${Z.toISOString()}"))`;if(Z instanceof globalThis.Error)return`//js(${Z.toString()})`;if(Z instanceof Function){let X=[];for(let Y of Array(Z.length).keys())X.push(String.fromCharCode(Y+97));return`//fn(${X.join(", ")}) { ... }`}if(this.#Z.size===this.#Z.add(Z).size)return"//js(circular reference)";let Q;if(Array.isArray(Z))Q=`#(${Z.map((X)=>this.inspect(X)).join(", ")})`;else if(KZ(Z))Q=this.#Q(Z);else if(Z instanceof S)Q=this.#J(Z);else if(Z instanceof K8)Q=this.#X(Z);else if(Z instanceof Set)return`//js(Set(${[...Z].map((X)=>this.inspect(X)).join(", ")}))`;else Q=this.#q(Z);return this.#Z.delete(Z),Q}#q(Z){let J=Object.getPrototypeOf(Z)?.constructor?.name||"Object",Q=[];for(let K of Object.keys(Z))Q.push(`${this.inspect(K)}: ${this.inspect(Z[K])}`);let X=Q.length?" "+Q.join(", ")+" ":"";return`//js(${J==="Object"?"":J+" "}{${X}})`}#X(Z){let J="dict.from_list([",Q=!0;return J=N9(Z,J,(X,Y,K)=>{if(!Q)X=X+", ";return Q=!1,X+"#("+this.inspect(Y)+", "+this.inspect(K)+")"}),J+"])"}#J(Z){let J=Object.keys(Z).map((Q)=>{let X=this.inspect(Z[Q]);return isNaN(parseInt(Q))?`${Q}: ${X}`:X}).join(", ");return J?`${Z.constructor.name}(${J})`:Z.constructor.name}#Q(Z){if(MQ(Z))return"[]";let J='charlist.from_string("',Q="[",X=Z;while(Y8(X)){let Y=X.head;if(X=X.tail,Q!=="[")Q+=", ";if(Q+=this.inspect(Y),J)if(Number.isInteger(Y)&&Y>=32&&Y<=126)J+=String.fromCharCode(Y);else J=null}if(J)return J+'")';else return Q+"]"}#Y(Z){let J='"';for(let Q=0;Q<Z.length;Q++){let X=Z[Q];switch(X){case`
`:J+="\\n";break;case"\r":J+="\\r";break;case"\t":J+="\\t";break;case"\f":J+="\\f";break;case"\\":J+="\\\\";break;case'"':J+="\\\"";break;default:if(X<" "||X>"~"&&X<" ")J+="\\u{"+X.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else J+=X}}return J+='"',J}#W(Z){return`//utfcodepoint(${String.fromCodePoint(Z.value)})`}#K(Z){if(Z.bitSize===0)return"<<>>";let J="<<";for(let Q=0;Q<Z.byteSize-1;Q++)J+=Z.byteAt(Q).toString(),J+=", ";if(Z.byteSize*8===Z.bitSize)J+=Z.byteAt(Z.byteSize-1).toString();else{let Q=Z.bitSize%8;J+=Z.byteAt(Z.byteSize-1)>>8-Q,J+=`:size(${Q})`}return J+=">>",J}}function vQ(Z,J){if(Z instanceof K8){let X=q8(Z,J);return v1(X.isOk()?new Q1(X[0]):new h6)}if(Z instanceof WeakMap||Z instanceof Map){let X={},Y=Z.get(J,X);if(Y===X)return v1(new h6);return v1(new Q1(Y))}let Q=Number.isInteger(J);if(Q&&J>=0&&J<8&&KZ(Z)){let X=0;for(let Y of Z){if(X===J)return v1(new Q1(Y));X++}return t1("Indexable")}if(Q&&Array.isArray(Z)||Z&&typeof Z==="object"||Z&&Object.getPrototypeOf(Z)===Object.prototype){if(J in Z)return v1(new Q1(Z[J]));return v1(new h6)}return t1(Q?"Indexable":"Dict")}function Tq(Z,J,Q,X,Y){if(!(KZ(Z)||Array.isArray(Z))){let q=Lq("List",U8(Z),Y);return[Y,D4([q])]}let K=[];for(let q of Z){let W=J(q),[G,U]=W;if(Y8(U)){let[z,I]=Q(W,X.toString());return[Y,I]}K.push(G),X++}return[D4(K),Y]}function Sq(Z){if(typeof Z==="number")return v1(Z);return t1(0)}function Eq(Z){if(Number.isInteger(Z))return v1(Z);return t1(0)}function Cq(Z){if(typeof Z==="string")return v1(Z);return t1("")}function _q(Z){return Z===null||Z===void 0}function D4(Z){let J=gK(),Q=Z.length;while(Q--)J=r9(Z[Q],J);return J}function KZ(Z){return MQ(Z)||Y8(Z)}function S2(Z){return z0(Z)||uK(Z)}class wq extends S{}var E2=new wq;class cQ extends S{}var _S=new cQ;class bq extends S{}var kS=new bq;class yq extends S{}var xS=new yq;class $q extends S{}var wS=new $q;class hq extends S{}var bS=new hq;function M4(Z,J){if(Z instanceof v){let Q=Z[0];return new v(J(Q))}else return Z}function fq(Z,J){if(Z instanceof v)return Z;else{let Q=Z[0];return new L1(J(Q))}}function A4(Z,J){if(Z instanceof v){let Q=Z[0];return J(Q)}else return Z}function qZ(Z,J){if(Z instanceof v)return Z[0];else return J}class dQ extends S{}var uS=new dQ;class nQ extends S{}var vS=new nQ;class gq extends S{}var mS=new gq;class uq extends S{}var tS=new uq;class vq extends S{}var QE=new vq;class mq extends S{}var x2=new mq;class pq extends S{}var XE=new pq;class cq extends S{}var w2=new cq;class nq extends S{}var GE=new nq;function lq(Z,J,Q){if(Z)return J;else return Q()}function C0(Z){return Z}function lQ(Z){return JSON.stringify(Z)}function iq(Z){return Object.fromEntries(Z)}function M9(Z){return Z}function rq(Z){let J=[];while(Y8(Z))J.push(a9(Z)),Z=$6(Z);return J}function aq(){return null}function oq(Z){try{let J=JSON.parse(Z);return v1(J)}catch(J){return t1($2(J,Z))}}function $2(Z,J){if(h2(Z))return tq();return f2(Z,J)}function h2(Z){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(Z.message)}function f2(Z,J){let Q=[g2,u2,m2,v2];for(let X of Q){let Y=X(Z,J);if(Y)return Y}return X7("")}function g2(Z){let Q=/unexpected token '(.)', ".+" is not valid JSON/i.exec(Z.message);if(!Q)return null;let X=GZ(Q[1]);return X7(X)}function u2(Z){let Q=/unexpected token (.) in JSON at position (\d+)/i.exec(Z.message);if(!Q)return null;let X=GZ(Q[1]);return X7(X)}function v2(Z,J){let X=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(Z.message);if(!X)return null;let Y=Number(X[2]),K=Number(X[3]),q=p2(Y,K,J),W=GZ(J[q]);return X7(W)}function m2(Z){let Q=/unexpected (identifier|token) "(.)"/i.exec(Z.message);if(!Q)return null;let X=GZ(Q[2]);return X7(X)}function GZ(Z){return"0x"+Z.charCodeAt(0).toString(16).toUpperCase()}function p2(Z,J,Q){if(Z===1)return J-1;let X=1,Y=0;return Q.split("").find((K,q)=>{if(K===`
`)X+=1;if(X===Z)return Y=q+J,!0;return!1}),Y}class eq extends S{}var c2=new eq,tq=()=>c2;class ZW extends S{constructor(Z){super();this[0]=Z}}var X7=(Z)=>new ZW(Z);class JW extends S{constructor(Z){super();this[0]=Z}}function d2(Z,J){return A4(oq(Z),(Q)=>{let X=v6(Q,J);return fq(X,(Y)=>{return new JW(Y)})})}function Y7(Z,J){return d2(Z,J)}function QW(Z){return lQ(Z)}function Y0(Z){return M9(Z)}function sQ(Z){return M9(Z)}function m6(Z){return M9(Z)}function n2(){return aq()}function iQ(Z,J){if(Z instanceof Q1){let Q=Z[0];return J(Q)}else return n2()}function A9(Z){return iq(Z)}function l2(Z){return rq(Z)}function w8(Z,J){let X=j1(Z,J);return l2(X)}function L4(Z){return Z.replaceAll(/[><&"']/g,(J)=>{switch(J){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return J}})}var G1=d,K7=new L1(void 0);function R0(Z){return k(Z,G1)}var s2=pK(),i2=vK(),r2=mK();function UZ(Z,J){if(Z.name===J.name)return r2;else if(Z.name<J.name)return i2;else return s2}class j6 extends S{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class q7 extends S{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class D0 extends S{constructor(Z,J,Q,X,Y,K,q,W){super();this.kind=Z,this.name=J,this.handler=Q,this.include=X,this.prevent_default=Y,this.stop_propagation=K,this.debounce=q,this.throttle=W}}class W7 extends S{constructor(Z,J,Q){super();this.prevent_default=Z,this.stop_propagation=J,this.message=Q}}class UW extends S{constructor(Z){super();this.kind=Z}}class zW extends S{constructor(Z){super();this.kind=Z}}var aQ=0,oQ=1,tQ=2,eQ=0,ZX=new UW(eQ),e2=1,JX=new zW(e2),QX=2;function IW(Z,J){return new j6(aQ,Z,J)}function VW(Z,J){return new q7(oQ,Z,J)}function XX(Z,J,Q,X,Y,K,q){return new D0(tQ,Z,J,Q,X,Y,K,q)}function ZR(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else{let Y=Q.head;if(Y instanceof j6){let K=Y.name;if(K==="")Z=Q.tail,J=X;else if(K==="class"){let q=Y.value;if(q==="")Z=Q.tail,J=X;else{let W=Q.tail;if(W instanceof w){let G=Y;Z=W,J=k(G,X)}else{let G=W.head;if(G instanceof j6)if(G.name==="class"){let z=Y.kind,I=q,V=W.tail,O=G.value,F=I+" "+O,N=new j6(z,"class",F);Z=k(N,V),J=X}else{let z=Y;Z=W,J=k(z,X)}else{let U=Y;Z=W,J=k(U,X)}}}}else if(K==="style"){let q=Y.value;if(q==="")Z=Q.tail,J=X;else{let W=Q.tail;if(W instanceof w){let G=Y;Z=W,J=k(G,X)}else{let G=W.head;if(G instanceof j6)if(G.name==="style"){let z=Y.kind,I=q,V=W.tail,O=G.value,F=I+";"+O,N=new j6(z,"style",F);Z=k(N,V),J=X}else{let z=Y;Z=W,J=k(z,X)}else{let U=Y;Z=W,J=k(U,X)}}}}else{let q=Y;Z=Q.tail,J=k(q,X)}}else{let K=Y;Z=Q.tail,J=k(K,X)}}}}function jW(Z){if(Z instanceof w)return Z;else if(Z.tail instanceof w)return Z;else{let X=qq(Z,(Y,K)=>{return UZ(K,Y)});return ZR(X,G1)}}function e1(Z,J){return IW(Z,J)}function B4(Z,J){return VW(Z,J)}function QR(Z,J){if(J)return e1(Z,"");else return B4(Z,sQ(!1))}function p(Z){return e1("class",Z)}function HW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)return X;else if(Q.head[1]){let K=Q.tail,q=Q.head[0];return X+q+" "+HW(K,X)}else Z=Q.tail,J=X}}function z8(Z){return p(HW(Z,""))}function P4(Z){return e1("id",Z)}function zZ(Z){return e1("tabindex",Q0(Z))}function T4(Z){return QR("disabled",Z)}function OW(Z){return e1("for",Z)}function FW(Z){return e1("max",Z)}function NW(Z){return e1("min",Z)}function RW(Z){return e1("placeholder",Z)}function YX(Z){return e1("type",Z)}function KX(Z){return e1("value",Z)}class VZ extends S{constructor(Z,J,Q){super();this.synchronous=Z,this.before_paint=J,this.after_paint=Q}}class DW extends S{constructor(Z,J,Q,X,Y,K,q){super();this.dispatch=Z,this.emit=J,this.select=Q,this.root=X,this.provide=Y,this.subscribe=K,this.unsubscribe=q}}var IZ=new VZ(G1,G1,G1);function N1(){return IZ}function p6(Z){return new VZ(R0((Q)=>{let X=Q.dispatch;return Z(X)}),IZ.before_paint,IZ.after_paint)}function S4(Z){return g0(Z,IZ,(J,Q)=>{return new VZ(g0(Q.synchronous,J.synchronous,e5),g0(Q.before_paint,J.before_paint,e5),g0(Q.after_paint,J.after_paint,e5))})}function MW(Z,J,Q,X,Y,K,q,W){let G=new DW(J,Q,X,Y,K,q,W);return Wq(Z.synchronous,(U)=>{return U(G)})}function c1(){return null}function B9(Z,J){return Z?.get(J)}function G7(Z,J,Q){return Z?.get(J)??Q()}function c6(Z,J){return Z&&Z.has(J)}function t0(Z,J,Q){return Z??=new Map,Z.set(J,Q),Z}function jZ(Z,J){return Z?.delete(J),Z}function AW(Z,J){if(typeof Z==="number"&&typeof J==="number")return Z===J||Z!==Z&&J!==J;return Z===J}function LW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof w)if(X instanceof w)return!0;else return!1;else if(X instanceof w)return!1;else{let{head:Y,tail:K}=Q,q=X.head,W=X.tail,G=AW(Y,q);if(G)Z=K,J=W;else return G}}}class H6 extends S{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.children=Q,this.keyed_children=X}}class O6 extends S{constructor(Z,J,Q,X,Y,K,q,W,G){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.children=K,this.keyed_children=q,this.self_closing=W,this.void=G}}class d6 extends S{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.content=Q}}class n6 extends S{constructor(Z,J,Q,X,Y,K){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.inner_html=K}}class u0 extends S{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.mapper=Q,this.child=X}}class P9 extends S{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.dependencies=Q,this.view=X}}var T9=0,$8=1,U7=2,BW=3,y8=4,WX=5;function GX(Z,J,Q){return new H6(T9,Z,J,Q)}function C4(Z,J,Q,X,Y,K,q,W){return new O6($8,Z,J,Q,jW(X),Y,K,q,W)}function _4(Z,J){if(J==="")if(Z==="area")return!0;else if(Z==="base")return!0;else if(Z==="br")return!0;else if(Z==="col")return!0;else if(Z==="embed")return!0;else if(Z==="hr")return!0;else if(Z==="img")return!0;else if(Z==="input")return!0;else if(Z==="link")return!0;else if(Z==="meta")return!0;else if(Z==="param")return!0;else if(Z==="source")return!0;else if(Z==="track")return!0;else if(Z==="wbr")return!0;else return!1;else return!1}function UX(Z,J){return new d6(U7,Z,J)}function PW(Z,J){if(Z instanceof u0){let Q=Z.mapper;return new u0(y8,Z.key,(X)=>{return C0(J)(Q(X))},C0(Z.child))}else return new u0(y8,Z.key,C0(J),C0(Z))}function TW(Z,J,Q){return new P9(WX,Z,J,Q)}function HZ(Z,J){if(J instanceof H6)return new H6(J.kind,Z,J.children,J.keyed_children);else if(J instanceof O6)return new O6(J.kind,Z,J.namespace,J.tag,J.attributes,J.children,J.keyed_children,J.self_closing,J.void);else if(J instanceof d6)return new d6(J.kind,Z,J.content);else if(J instanceof n6)return new n6(J.kind,Z,J.namespace,J.tag,J.attributes,J.inner_html);else if(J instanceof u0){let Q=J.child;return new u0(J.kind,Z,J.mapper,HZ(Z,Q))}else{let Q=J.view;return new P9(J.kind,Z,J.dependencies,()=>{return HZ(Z,Q())})}}class SW extends S{}var tE=new SW;class EW extends S{}var eE=new EW;class CW extends S{}var ZC=new CW;class _W extends S{}var JC=new _W;class kW extends S{}var QC=new kW;function Z0(Z,J,Q){return C4("","",Z,J,Q,c1(),!1,_4(Z,""))}function OZ(Z){return UX("",Z)}function k4(){return UX("","")}function xW(Z,J){return TW("",Z,J)}function wW(Z){return C0(Z)}function bW(Z,J){return PW(Z,J)}function K1(Z){return OZ(Z)}function yW(Z,J){return Z0("h1",Z,J)}function $W(Z,J){return Z0("h2",Z,J)}function FZ(Z,J){return Z0("h3",Z,J)}function hW(Z,J){return Z0("section",Z,J)}function U1(Z,J){return Z0("div",Z,J)}function fW(Z,J){return Z0("li",Z,J)}function z7(Z,J){return Z0("pre",Z,J)}function gW(Z,J){return Z0("ul",Z,J)}function I7(Z,J){return Z0("code",Z,J)}function k0(Z,J){return Z0("span",Z,J)}function F6(Z,J){return Z0("button",Z,J)}function zX(Z){return Z0("input",Z,G1)}function uW(Z,J){return Z0("label",Z,J)}function IX(Z,J){return Z0("details",Z,J)}function VX(Z,J){return Z0("summary",Z,J)}class NZ extends S{constructor(Z,J,Q,X,Y){super();this.index=Z,this.path=J,this.removed=Q,this.changes=X,this.children=Y}}class vW extends S{constructor(Z,J){super();this.kind=Z,this.content=J}}class mW extends S{constructor(Z,J){super();this.kind=Z,this.inner_html=J}}class pW extends S{constructor(Z,J,Q){super();this.kind=Z,this.added=J,this.removed=Q}}class cW extends S{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.before=Q}}class dW extends S{constructor(Z,J,Q){super();this.kind=Z,this.index=J,this.with=Q}}class nW extends S{constructor(Z,J){super();this.kind=Z,this.index=J}}class lW extends S{constructor(Z,J,Q){super();this.kind=Z,this.children=J,this.before=Q}}var HX=0,OX=1,FX=2,NX=3,RX=4,DX=5,MX=6;function g8(Z,J,Q,X){return new NZ(Z,G1,J,Q,X)}function sW(Z){return new vW(HX,Z)}function iW(Z){return new mW(OX,Z)}function AX(Z,J){return new pW(FX,Z,J)}function rW(Z,J){return new cW(NX,Z,J)}function aW(Z){return new nW(RX,Z)}function V8(Z,J){return new dW(DX,Z,J)}function LX(Z,J){return new lW(MX,Z,J)}function oW(Z,J){return new NZ(J,k(Z.index,Z.path),Z.removed,Z.changes,Z.children)}class eW extends S{constructor(Z,J,Q,X,Y,K,q,W,G){super();this.kind=Z,this.open_shadow_root=J,this.will_adopt_styles=Q,this.observed_attributes=X,this.observed_properties=Y,this.requested_contexts=K,this.provided_contexts=q,this.vdom=W,this.memos=G}}class ZG extends S{constructor(Z,J,Q){super();this.kind=Z,this.patch=J,this.memos=Q}}class JG extends S{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.data=Q}}class QG extends S{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}class XG extends S{constructor(Z,J){super();this.kind=Z,this.key=J}}class YG extends S{constructor(Z,J){super();this.kind=Z,this.key=J}}class KG extends S{constructor(Z,J){super();this.kind=Z,this.messages=J}}var qG=(Z)=>Z instanceof KG;class WG extends S{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var GG=(Z)=>Z instanceof WG;class UG extends S{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var zG=(Z)=>Z instanceof UG;class IG extends S{constructor(Z,J,Q,X){super();this.kind=Z,this.path=J,this.name=Q,this.event=X}}var VG=(Z)=>Z instanceof IG;class jG extends S{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}var HG=(Z)=>Z instanceof jG;var qR=0,WR=1,GR=2,UR=3,zR=4,IR=5;function OG(Z,J,Q,X,Y,K,q,W){return new eW(qR,Z,J,Q,X,Y,K,q,W)}function BX(Z,J){return new ZG(WR,Z,J)}function FG(Z,J){return new JG(GR,Z,J)}function NG(Z,J){return new QG(UR,Z,J)}function RG(Z){return new XG(zR,Z)}function DG(Z){return new YG(IR,Z)}class PX extends S{}var VR=new PX;class TX extends S{constructor(Z,J){super();this.key=Z,this.parent=J}}class SX extends S{constructor(Z,J){super();this.index=Z,this.parent=J}}class LG extends S{constructor(Z){super();this.parent=Z}}var DZ="\r",RZ="\t",EX=`
`,MZ=VR;function AG(Z){if(Z instanceof w)return"";else{let J=Z.tail;return Oq(J)}}function CX(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof PX)return AG(K);else if(Y instanceof TX){let{key:q,parent:W}=Y;Z=X,J=W,Q=k(RZ,k(q,K))}else if(Y instanceof SX){let{index:q,parent:W}=Y,G=k(RZ,k(Q0(q),K));Z=X,J=W,Q=G}else if(!X)return AG(K);else{let q=Y.parent;if(K instanceof w)Z=X,J=q,Q=K;else{let W=K.tail;Z=X,J=q,Q=k(DZ,W)}}}}function jR(Z){return CX(!0,Z,G1)}function HR(Z,J){while(!0){let Q=Z,X=J;if(X instanceof w)return!1;else{let{head:Y,tail:K}=X,q=F4(Q,Y);if(q)return q;else Z=Q,J=K}}}function BG(Z,J){if(J instanceof w)return!1;else return HR(jR(Z),J)}function PG(Z){return ZZ(Z,DZ)}function x0(Z,J,Q){if(Q==="")return new SX(J,Z);else return new TX(Q,Z)}function AZ(Z){return new LG(Z)}function _X(Z,J){return CX(!1,Z,k(EX,k(J,G1)))}function x4(Z){return CX(!1,Z,G1)}class j8 extends S{constructor(Z,J,Q,X,Y){super();this.events=Z,this.vdoms=J,this.old_vdoms=Q,this.dispatched_paths=X,this.next_dispatched_paths=Y}}class u8 extends S{constructor(Z,J){super();this.handlers=Z,this.children=J}}class BZ extends S{constructor(Z,J){super();this.mapper=Z,this.events=J}}class CG extends S{constructor(Z,J,Q){super();this.handlers=Z,this.children=J,this.vdoms=Q}}class wX extends S{constructor(Z,J){super();this.path=Z,this.handler=J}}class kX extends S{constructor(Z){super();this.path=Z}}function OR(Z,J){return(Q)=>{return Z(J(Q))}}function _G(){return new u8(c1(),c1())}function bX(){return new j8(_G(),c1(),c1(),G1,G1)}function kG(Z,J,Q,X){return t0(Z,_X(J,Q),X)}function SG(Z,J,Q){return g0(Q,Z,(X,Y)=>{if(Y instanceof D0){let{name:K,handler:q}=Y;return kG(X,J,K,q)}else return X})}function LZ(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,U=X,z=Y,I=K,V=z+1;if(I instanceof w)return new CG(q,W,G);else{let O=I.head;if(O instanceof H6){let F=I.tail,N=O.key,R=O.children,P=x0(U,z,N),T=LZ(q,W,G,P,0,R),C=T.handlers,_=T.children,A=T.vdoms;Z=C,J=_,Q=A,X=U,Y=V,K=F}else if(O instanceof O6){let F=I.tail,N=O.key,R=O.attributes,P=O.children,T=x0(U,z,N),C=SG(q,T,R),_=LZ(C,W,G,T,0,P),A=_.handlers,B=_.children,L=_.vdoms;Z=A,J=B,Q=L,X=U,Y=V,K=F}else if(O instanceof d6){let F=I.tail;Z=q,J=W,Q=G,X=U,Y=V,K=F}else if(O instanceof n6){let F=I.tail,N=O.key,R=O.attributes,P=x0(U,z,N);Z=SG(q,P,R),J=W,Q=G,X=U,Y=V,K=F}else if(O instanceof u0){let F=I.tail,N=O.key,R=O.mapper,P=O.child,T=x0(U,z,N),C=LZ(c1(),c1(),G,AZ(T),0,R0(P)),_=C.vdoms,A=new u8(C.handlers,C.children),B=new BZ(R,A),L=t0(W,x4(T),B);Z=q,J=L,Q=_,X=U,Y=V,K=F}else{let F=I.tail,N=O.view,R=N(),P=t0(G,N,R),T=z,C=k(R,F);Z=q,J=W,Q=P,X=U,Y=T,K=C}}}}function yX(Z,J,Q,X,Y){let K=Z.vdoms,q=J.handlers,W=J.children,G=LZ(q,W,K,Q,X,Y),U=G.handlers,z=G.children,I=G.vdoms;return[new j8(Z.events,I,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths),new u8(U,z)]}function PZ(Z,J,Q,X,Y){let K=R0(Y);return yX(Z,J,Q,X,K)}function xG(Z){let J=bX(),Q=PZ(J,J.events,MZ,0,Z),X=Q[0],Y=Q[1];return new j8(Y,X.vdoms,X.old_vdoms,X.dispatched_paths,X.next_dispatched_paths)}function wG(Z){return new j8(Z.events,c1(),Z.vdoms,Z.next_dispatched_paths,G1)}function bG(Z){return Z.events}function yG(Z,J){return new j8(J,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function V7(Z){return Z.vdoms}function $G(Z,J,Q){return G7(Z.old_vdoms,J,Q)}function hG(Z,J,Q){let X=G7(Z.old_vdoms,J,Q),Y=t0(Z.vdoms,Q,X);return new j8(Z.events,Y,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function fG(Z,J,Q){let X=t0(Z.vdoms,J,Q);return new j8(Z.events,X,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function gG(Z,J,Q){return G7(Z.children,J,()=>{return new BZ(Q,_G())}).events}function uG(Z,J,Q,X){let Y=new BZ(Q,X),K=t0(Z.children,J,Y);return new u8(Z.handlers,K)}function j7(Z,J,Q,X){let Y=kG(Z.handlers,J,Q,X);return new u8(Y,Z.children)}function vG(Z,J,Q){return jZ(Z,_X(J,Q))}function TZ(Z,J,Q){let X=vG(Z.handlers,J,Q);return new u8(X,Z.children)}function EG(Z,J,Q){return g0(Q,Z,(X,Y)=>{if(Y instanceof D0){let K=Y.name;return vG(X,J,K)}else return X})}function xX(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,U=X,z=Y,I=K,V=z+1;if(I instanceof w)return new u8(q,W);else{let O=I.head;if(O instanceof H6){let F=I.tail,N=O.key,R=O.children,P=x0(U,z,N),T=xX(q,W,G,P,0,R),C=T.handlers,_=T.children;Z=C,J=_,Q=G,X=U,Y=V,K=F}else if(O instanceof O6){let F=I.tail,N=O.key,R=O.attributes,P=O.children,T=x0(U,z,N),C=EG(q,T,R),_=xX(C,W,G,T,0,P),A=_.handlers,B=_.children;Z=A,J=B,Q=G,X=U,Y=V,K=F}else if(O instanceof d6){let F=I.tail;Z=q,J=W,Q=G,X=U,Y=V,K=F}else if(O instanceof n6){let F=I.tail,N=O.key,R=O.attributes,P=x0(U,z,N);Z=EG(q,P,R),J=W,Q=G,X=U,Y=V,K=F}else if(O instanceof u0){let F=I.tail,N=O.key,R=x0(U,z,N),P=jZ(W,x4(R));Z=q,J=P,Q=G,X=U,Y=V,K=F}else{let F=I.tail,N=O.view;if(c6(G,N)){let P=B9(G,N),T=k(P,F);Z=q,J=W,Q=G,X=U,Y=z,K=T}else Z=q,J=W,Q=G,X=U,Y=V,K=F}}}}function SZ(Z,J,Q,X,Y){return xX(J.handlers,J.children,Z.old_vdoms,Q,X,R0(Y))}function H8(Z,J,Q,X,Y,K){let q=SZ(Z,J,Q,X,Y);return PZ(Z,q,Q,X,K)}function FR(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof w)return K7;else{let q=Y.tail;if(q instanceof w){let W=Y.head;if(c6(X.handlers,W)){let U=B9(X.handlers,W);return new v(R9(U,(z)=>{return new W7(z.prevent_default,z.stop_propagation,C0(K)(z.message))}))}else return K7}else{let W=Y.head,G=q;if(c6(X.children,W)){let z=B9(X.children,W),I=OR(K,z.mapper);Z=z.events,J=G,Q=I}else return K7}}}}function $X(Z,J,Q,X){let Y=PG(J+EX+Q),K=FR(Z.events,Y,C0);if(K instanceof v){let q=K[0],W=v6(X,q);if(W instanceof v){let G=W[0];return new wX(J,G)}else return new kX(J)}else return new kX(J)}function hX(Z,J){let Q=k(J.path,Z.next_dispatched_paths),X=new j8(Z.events,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Q);if(J instanceof wX){let Y=J.handler;return[X,new v(Y)]}else return[X,K7]}function mG(Z,J,Q,X){let Y=$X(Z,J,Q,X);return((K)=>{return hX(Z,K)})(Y)}function EZ(Z,J){return BG(J,Z.dispatched_paths)}class pG extends S{constructor(Z){super();this.message=Z}}var cG=(Z)=>Z instanceof pG;class dG extends S{constructor(Z){super();this.callback=Z}}var nG=(Z)=>Z instanceof dG;class lG extends S{constructor(Z){super();this.callback=Z}}var sG=(Z)=>Z instanceof lG;class _Z extends S{constructor(Z){super();this.message=Z}}var iG=(Z)=>new _Z(Z),w4=(Z)=>Z instanceof _Z;class fX extends S{constructor(Z,J){super();this.name=Z,this.data=J}}var rG=(Z,J)=>new fX(Z,J),b4=(Z)=>Z instanceof fX;class gX extends S{constructor(Z,J){super();this.key=Z,this.value=J}}var aG=(Z,J)=>new gX(Z,J),oG=(Z)=>Z instanceof gX;class uX extends S{constructor(Z,J){super();this.key=Z,this.decoder=J}}var tG=(Z,J)=>new uX(Z,J),eG=(Z)=>Z instanceof uX;class vX extends S{constructor(Z){super();this.key=Z}}var ZU=(Z)=>new vX(Z),JU=(Z)=>Z instanceof vX;class mX extends S{}var NR=new mX;var y4=(Z)=>Z instanceof mX;class pX extends S{constructor(Z,J,Q,X,Y){super();this.name=Z,this.init=J,this.update=Q,this.view=X,this.config=Y}}class cX extends S{constructor(Z,J,Q,X,Y,K,q,W,G,U,z,I,V,O){super();this.open_shadow_root=Z,this.adopt_styles=J,this.delegates_focus=Q,this.attributes=X,this.properties=Y,this.contexts=K,this.is_form_associated=q,this.on_form_autofill=W,this.on_form_reset=G,this.on_form_restore=U,this.on_form_disabled=z,this.on_connect=I,this.on_adopt=V,this.on_disconnect=O}}var XU=new cX(!0,!0,!1,G1,G1,G1,!1,V1,V1,V1,V1,V1,V1,V1);var N6=(Z,J)=>{if(Z===J)return!0;if(Z==null||J==null)return!1;let Q=typeof Z;if(Q!==typeof J)return!1;if(Q!=="object")return!1;if(Z.constructor!==J.constructor)return!1;if(Array.isArray(Z))return RR(Z,J);return DR(Z,J)},RR=(Z,J)=>{let Q=Z.length;if(Q!==J.length)return!1;while(Q--)if(!N6(Z[Q],J[Q]))return!1;return!0},DR=(Z,J)=>{let Q=Object.keys(Z),X=Q.length;if(Object.keys(J).length!==X)return!1;while(X--){let Y=Q[X];if(!Object.hasOwn(J,Y))return!1;if(!N6(Z[Y],J[Y]))return!1}return!0};class KU extends S{constructor(Z,J){super();this.patch=Z,this.cache=J}}class nX extends S{constructor(Z,J,Q){super();this.patch=Z,this.cache=J,this.events=Q}}class qU extends S{constructor(Z,J,Q){super();this.added=Z,this.removed=J,this.events=Q}}function YU(Z,J,Q,X,Y,K,q){while(!0){let W=Z,G=J,U=Q,z=X,I=Y,V=K,O=q;if(z instanceof w)if(I instanceof w)return new qU(V,O,U);else{let F=I.head;if(F instanceof D0){let N=F,R=I.tail,P=F.name,T=F.handler,C=j7(U,G,P,T),_=k(N,V);Z=W,J=G,Q=C,X=z,Y=R,K=_,q=O}else{let N=F,R=I.tail,P=k(N,V);Z=W,J=G,Q=U,X=z,Y=R,K=P,q=O}}else if(I instanceof w){let F=z.head;if(F instanceof D0){let N=F,R=z.tail,P=F.name,T=TZ(U,G,P),C=k(N,O);Z=W,J=G,Q=T,X=R,Y=I,K=V,q=C}else{let N=F,R=z.tail,P=k(N,O);Z=W,J=G,Q=U,X=R,Y=I,K=V,q=P}}else{let{head:F,tail:N}=z,R=I.head,P=I.tail,T=UZ(F,R);if(T instanceof h0)if(F instanceof D0){let C=F.name;Z=W,J=G,Q=TZ(U,G,C),X=N,Y=I,K=V,q=k(F,O)}else Z=W,J=G,Q=U,X=N,Y=I,K=V,q=k(F,O);else if(T instanceof f0)if(F instanceof j6)if(R instanceof j6){let C,_=R.name;if(_==="value")C=W||F.value!==R.value;else if(_==="checked")C=W||F.value!==R.value;else if(_==="selected")C=W||F.value!==R.value;else C=F.value!==R.value;let A=C,B;if(A)B=k(R,V);else B=V;let L=B;Z=W,J=G,Q=U,X=N,Y=P,K=L,q=O}else if(R instanceof D0){let{name:C,handler:_}=R;Z=W,J=G,Q=j7(U,G,C,_),X=N,Y=P,K=k(R,V),q=k(F,O)}else Z=W,J=G,Q=U,X=N,Y=P,K=k(R,V),q=k(F,O);else if(F instanceof q7)if(R instanceof q7){let C,_=R.name;if(_==="scrollLeft")C=!0;else if(_==="scrollRight")C=!0;else if(_==="value")C=W||!N6(F.value,R.value);else if(_==="checked")C=W||!N6(F.value,R.value);else if(_==="selected")C=W||!N6(F.value,R.value);else C=!N6(F.value,R.value);let A=C,B;if(A)B=k(R,V);else B=V;let L=B;Z=W,J=G,Q=U,X=N,Y=P,K=L,q=O}else if(R instanceof D0){let{name:C,handler:_}=R;Z=W,J=G,Q=j7(U,G,C,_),X=N,Y=P,K=k(R,V),q=k(F,O)}else Z=W,J=G,Q=U,X=N,Y=P,K=k(R,V),q=k(F,O);else if(R instanceof D0){let{name:C,handler:_}=R,A=F.prevent_default.kind!==R.prevent_default.kind||F.stop_propagation.kind!==R.stop_propagation.kind||F.debounce!==R.debounce||F.throttle!==R.throttle,B;if(A)B=k(R,V);else B=V;let L=B;Z=W,J=G,Q=j7(U,G,C,_),X=N,Y=P,K=L,q=O}else{let C=F.name;Z=W,J=G,Q=TZ(U,G,C),X=N,Y=P,K=k(R,V),q=k(F,O)}else if(R instanceof D0){let{name:C,handler:_}=R;Z=W,J=G,Q=j7(U,G,C,_),X=z,Y=P,K=k(R,V),q=O}else Z=W,J=G,Q=U,X=z,Y=P,K=k(R,V),q=O}}}function MR(Z,J,Q,X){if(Q==="input"&&J==="")return EZ(Z,X);else if(Q==="select"&&J==="")return EZ(Z,X);else if(Q==="textarea"&&J==="")return EZ(Z,X);else return!1}function kZ(Z,J,Q,X,Y,K,q,W,G,U,z,I,V,O){while(!0){let F=Z,N=J,R=Q,P=X,T=Y,C=K,_=q,A=W,B=G,L=U,E=z,D=I,l=V,$=O;if(F instanceof w)if(R instanceof w){let m,q1=S9();if(L instanceof w)if(E instanceof w)m=g8(B,_,L,E);else if(!q1)if(E.tail instanceof w&&_===0){let Y1=E.head;m=oW(Y1,B)}else m=g8(B,_,L,E);else m=g8(B,_,L,E);else m=g8(B,_,L,E);return new nX(m,l,$)}else{let m=yX(l,$,D,A,R),q1=m[0],o=m[1],t=LX(R,A-C),Y1=k(t,L),W1=g8(B,_,Y1,E);return new nX(W1,q1,o)}else if(R instanceof w){let{head:m,tail:q1}=F;if(m.key===""||!c6(T,m.key)){let t=SZ(l,$,D,A,m);Z=q1,J=N,Q=R,X=P,Y=T,K=C,q=_+1,W=A,G=B,U=L,z=E,I=D,V=l,O=t}else Z=q1,J=N,Q=R,X=P,Y=T,K=C,q=_,W=A,G=B,U=L,z=E,I=D,V=l,O=$}else{let m=F.head,q1=R.head;if(m.key!==q1.key){let o=F.tail,t=R.tail,Y1=c6(N,q1.key);if(c6(P,m.key))if(Y1)if(c6(T,m.key))Z=o,J=N,Q=R,X=P,Y=T,K=C-1,q=_,W=A,G=B,U=L,z=E,I=D,V=l,O=$;else{let a=B9(N,q1.key),h=A-C,b=k(rW(q1.key,h),L),c=t0(T,q1.key,void 0);Z=k(a,F),J=N,Q=R,X=P,Y=c,K=C+1,q=_,W=A,G=B,U=b,z=E,I=D,V=l,O=$}else{let e=A-C,a=PZ(l,$,D,A,q1),h=a[0],b=a[1],c=LX(R0(q1),e),Z1=k(c,L);Z=F,J=N,Q=t,X=P,Y=T,K=C+1,q=_,W=A+1,G=B,U=Z1,z=E,I=D,V=h,O=b}else if(Y1){let e=A-C,a=k(aW(e),L),h=SZ(l,$,D,A,m);Z=o,J=N,Q=R,X=P,Y=T,K=C-1,q=_,W=A,G=B,U=a,z=E,I=D,V=l,O=h}else{let e=V8(A-C,q1),a=H8(l,$,D,A,m,q1),h=a[0],b=a[1];Z=o,J=N,Q=t,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(e,L),z=E,I=D,V=h,O=b}}else{let o=F.head;if(o instanceof H6){let t=R.head;if(t instanceof H6){let Y1=o,W1=F.tail,e=t,a=R.tail,h=kZ(Y1.children,Y1.keyed_children,e.children,e.keyed_children,c1(),0,0,0,A,G1,G1,x0(D,A,e.key),l,$),b=h.patch,c=h.cache,Z1=h.events,f1;if(b.changes instanceof w)if(b.children instanceof w)if(b.removed===0)f1=E;else f1=k(b,E);else f1=k(b,E);else f1=k(b,E);let P1=f1;Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=P1,I=D,V=c,O=Z1}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}else if(o instanceof O6){let t=R.head;if(t instanceof O6){let Y1=o,W1=t;if(Y1.namespace===W1.namespace&&Y1.tag===W1.tag){let e=F.tail,a=R.tail,h=x0(D,A,W1.key),b=MR(l,W1.namespace,W1.tag,h),c=YU(b,h,$,Y1.attributes,W1.attributes,G1,G1),Z1=c.added,f1=c.removed,z1=c.events,P1;if(Z1 instanceof w&&f1 instanceof w)P1=G1;else P1=R0(AX(Z1,f1));let J0=P1,J8=kZ(Y1.children,Y1.keyed_children,W1.children,W1.keyed_children,c1(),0,0,0,A,J0,G1,h,l,z1),X0=J8.patch,S0=J8.cache,U6=J8.events,y6;if(X0.changes instanceof w)if(X0.children instanceof w)if(X0.removed===0)y6=E;else y6=k(X0,E);else y6=k(X0,E);else y6=k(X0,E);let h5=y6;Z=e,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=h5,I=D,V=S0,O=U6}else{let e=o,a=F.tail,h=t,b=R.tail,c=V8(A-C,h),Z1=H8(l,$,D,A,e,h),f1=Z1[0],z1=Z1[1];Z=a,J=N,Q=b,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(c,L),z=E,I=D,V=f1,O=z1}}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}else if(o instanceof d6){let t=R.head;if(t instanceof d6){let Y1=o,W1=t;if(Y1.content===W1.content){let e=F.tail,a=R.tail;Z=e,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=E,I=D,V=l,O=$}else{let e=F.tail,a=t,h=R.tail,b=g8(A,0,R0(sW(a.content)),G1);Z=e,J=N,Q=h,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=k(b,E),I=D,V=l,O=$}}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}else if(o instanceof n6){let t=R.head;if(t instanceof n6){let Y1=o,W1=F.tail,e=t,a=R.tail,h=x0(D,A,e.key),b=YU(!1,h,$,Y1.attributes,e.attributes,G1,G1),c=b.added,Z1=b.removed,f1=b.events,z1;if(c instanceof w&&Z1 instanceof w)z1=G1;else z1=R0(AX(c,Z1));let P1=z1,J0;if(Y1.inner_html===e.inner_html)J0=P1;else J0=k(iW(e.inner_html),P1);let X0=J0,S0;if(X0 instanceof w)S0=E;else S0=k(g8(A,0,X0,G1),E);let U6=S0;Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=U6,I=D,V=l,O=f1}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}else if(o instanceof u0){let t=R.head;if(t instanceof u0){let Y1=o,W1=F.tail,e=t,a=R.tail,h=x0(D,A,e.key),b=x4(h),c=kZ(R0(Y1.child),c1(),R0(e.child),c1(),c1(),0,0,0,A,G1,G1,AZ(h),l,gG($,b,Y1.mapper)),Z1=c.patch,f1=c.cache,z1=c.events,P1=uG($,b,e.mapper,z1),J0;if(Z1.changes instanceof w)if(Z1.children instanceof w)if(Z1.removed===0)J0=E;else J0=k(Z1,E);else J0=k(Z1,E);else J0=k(Z1,E);let X0=J0;Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=X0,I=D,V=f1,O=P1}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}else{let t=R.head;if(t instanceof P9){let Y1=o,W1=F.tail,e=t,a=R.tail;if(LW(Y1.dependencies,e.dependencies)){let b=hG(l,Y1.view,e.view);Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=L,z=E,I=D,V=b,O=$}else{let b=$G(l,Y1.view,Y1.view),c=e.view(),Z1=fG(l,e.view,c);Z=k(b,W1),J=N,Q=k(c,a),X=P,Y=T,K=C,q=_,W=A,G=B,U=L,z=E,I=D,V=Z1,O=$}}else{let Y1=o,W1=F.tail,e=t,a=R.tail,h=V8(A-C,e),b=H8(l,$,D,A,Y1,e),c=b[0],Z1=b[1];Z=W1,J=N,Q=a,X=P,Y=T,K=C,q=_,W=A+1,G=B,U=k(h,L),z=E,I=D,V=c,O=Z1}}}}}}function $4(Z,J,Q){let X=wG(Z),Y=kZ(R0(J),c1(),R0(Q),c1(),c1(),0,0,0,0,G1,G1,MZ,X,bG(X)),K=Y.patch,q=Y.cache,W=Y.events;return new KU(K,yG(q,W))}var WU=(Z)=>Z.reduceRight((J,Q)=>r9(Q,J),G1),e0=(Z,J)=>{if(Array.isArray(Z))for(let Q=0;Q<Z.length;Q++)J(Z[Q]);else if(Z)for(Z;$6(Z);Z=$6(Z))J(a9(Z))},lX=(Z,J)=>{if(!$6(Z))return J;else if(!$6(J))return Z;else return I0(Z,J)};var xZ="http://www.w3.org/1999/xhtml",GU=1,UU=3,sX=8;var zU=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:LR,clearTimeout:iX}=globalThis,BR=(Z,J)=>globalThis.document.createElementNS(Z,J),IU=(Z)=>globalThis.document.createTextNode(Z),VU=(Z)=>globalThis.document.createComment(Z),PR=()=>globalThis.document.createDocumentFragment(),v8=(Z,J,Q)=>Z.insertBefore(J,Q),jU=zU?(Z,J,Q)=>Z.moveBefore(J,Q):v8,HU=(Z,J)=>Z.removeChild(J),TR=(Z,J)=>Z.getAttribute(J),OU=(Z,J,Q)=>Z.setAttribute(J,Q),SR=(Z,J)=>Z.removeAttribute(J),ER=(Z,J,Q,X)=>Z.addEventListener(J,Q,X),FU=(Z,J,Q)=>Z.removeEventListener(J,Q),CR=(Z,J)=>Z.innerHTML=J,_R=(Z,J)=>Z.data=J,Z6=Symbol("lustre");class DU{constructor(Z,J,Q,X){this.kind=Z,this.key=X,this.parent=J,this.children=[],this.node=Q,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===T9||this.kind===y8}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var J6=(Z,J,Q,X,Y)=>{let K=new DU(Z,J,Q,Y);return Q[Z6]=K,J?.children.splice(X,0,K),K},kR=(Z)=>{let J="";for(let Q=Z[Z6];Q.parent;Q=Q.parent){let X=Q.parent&&Q.parent.kind===y8?DZ:RZ;if(Q.key)J=`${X}${Q.key}${J}`;else{let Y=Q.parent.children.indexOf(Q);J=`${X}${Y}${J}`}}return J.slice(1)};class aX{#Z=null;#q;#X;#J=!1;constructor(Z,J,Q,{debug:X=!1}={}){this.#Z=Z,this.#q=J,this.#X=Q,this.#J=X}mount(Z){J6($8,null,this.#Z,0,null),this.#F(this.#Z,null,this.#Z[Z6],0,Z)}push(Z,J=null){this.#Q=J,this.#Y.push({node:this.#Z[Z6],patch:Z}),this.#W()}#Q;#Y=[];#W(){let Z=this.#Y;while(Z.length){let{node:J,patch:Q}=Z.pop(),{path:X,changes:Y,removed:K,children:q}=Q;e0(X,(G)=>{J=J.children[G]});let{children:W}=J;if(e0(Y,(G)=>this.#K(J,G)),K)this.#j(J,W.length-K,K);e0(q,(G)=>{let U=W[G.index|0];this.#Y.push({node:U,patch:G})})}}#K(Z,J){switch(J.kind){case HX:this.#T(Z,J);break;case OX:this.#A(Z,J);break;case FX:this.#O(Z,J);break;case NX:this.#I(Z,J);break;case RX:this.#R(Z,J);break;case DX:this.#G(Z,J);break;case MX:this.#V(Z,J);break}}#V(Z,{children:J,before:Q}){let X=PR(),Y=this.#z(Z,Q);this.#M(X,null,Z,Q|0,J),v8(Z.parentNode,X,Y)}#G(Z,{index:J,with:Q}){this.#j(Z,J|0,1);let X=this.#z(Z,J);this.#F(Z.parentNode,X,Z,J|0,Q)}#z(Z,J){J=J|0;let{children:Q}=Z,X=Q.length;if(J<X)return Q[J].node;if(Z.endNode)return Z.endNode;if(!Z.isVirtual)return null;while(Z.isVirtual&&Z.children.length){if(Z.endNode)return Z.endNode.nextSibling;Z=Z.children[Z.children.length-1]}return Z.node.nextSibling}#I(Z,{key:J,before:Q}){Q=Q|0;let{children:X,parentNode:Y}=Z,K=X[Q].node,q=X[Q];for(let W=Q+1;W<X.length;++W){let G=X[W];if(X[W]=q,q=G,G.key===J){X[Q]=G;break}}this.#N(Y,q,K)}#U(Z,J,Q){for(let X=0;X<J.length;++X)this.#N(Z,J[X],Q)}#N(Z,J,Q){if(jU(Z,J.node,Q),J.isVirtual)this.#U(Z,J.children,Q);if(J.endNode)jU(Z,J.endNode,Q)}#R(Z,{index:J}){this.#j(Z,J,1)}#j(Z,J,Q){let{children:X,parentNode:Y}=Z,K=X.splice(J,Q);for(let q=0;q<K.length;++q){let W=K[q],{node:G,endNode:U,isVirtual:z,children:I}=W;if(HU(Y,G),U)HU(Y,U);if(this.#H(W),z)K.push(...I)}}#H(Z){let{debouncers:J,children:Q}=Z;for(let{timeout:X}of J.values())if(X)iX(X);J.clear(),e0(Q,(X)=>this.#H(X))}#O({node:Z,handlers:J,throttles:Q,debouncers:X},{added:Y,removed:K}){e0(K,({name:q})=>{if(J.delete(q))FU(Z,q,rX),this.#D(Q,q,0),this.#D(X,q,0);else SR(Z,q),RU[q]?.removed?.(Z,q)}),e0(Y,(q)=>this.#P(Z,q))}#T({node:Z},{content:J}){_R(Z,J??"")}#A({node:Z},{inner_html:J}){CR(Z,J??"")}#M(Z,J,Q,X,Y){e0(Y,(K)=>this.#F(Z,J,Q,X++,K))}#F(Z,J,Q,X,Y){switch(Y.kind){case $8:{let K=this.#L(Q,X,Y);this.#M(K,null,K[Z6],0,Y.children),v8(Z,K,J);break}case U7:{let K=this.#S(Q,X,Y);v8(Z,K,J);break}case T9:{let q=this.#B("lustre:fragment",Q,X,Y);if(v8(Z,q,J),this.#M(Z,J,q[Z6],0,Y.children),this.#J)q[Z6].endNode=VU(" /lustre:fragment "),v8(Z,q[Z6].endNode,J);break}case BW:{let K=this.#L(Q,X,Y);this.#A({node:K},Y),v8(Z,K,J);break}case y8:{let K=this.#B("lustre:map",Q,X,Y);v8(Z,K,J),this.#F(Z,J,K[Z6],0,Y.child);break}case WX:{let K=this.#Q?.get(Y.view)??Y.view();this.#F(Z,J,Q,X,K);break}}}#L(Z,J,{kind:Q,key:X,tag:Y,namespace:K,attributes:q}){let W=BR(K||xZ,Y);if(J6(Q,Z,W,J,X),this.#J&&X)OU(W,"data-lustre-key",X);return e0(q,(G)=>this.#P(W,G)),W}#S(Z,J,{kind:Q,key:X,content:Y}){let K=IU(Y??"");return J6(Q,Z,K,J,X),K}#B(Z,J,Q,{kind:X,key:Y}){let K=this.#J?VU(xR(Z,Y)):IU("");return J6(X,J,K,Q,Y),K}#P(Z,J){let{debouncers:Q,handlers:X,throttles:Y}=Z[Z6],{kind:K,name:q,value:W,prevent_default:G,debounce:U,throttle:z}=J;switch(K){case aQ:{let I=W??"";if(q==="virtual:defaultValue"){Z.defaultValue=I;return}else if(q==="virtual:defaultChecked"){Z.defaultChecked=!0;return}else if(q==="virtual:defaultSelected"){Z.defaultSelected=!0;return}if(I!==TR(Z,q))OU(Z,q,I);RU[q]?.added?.(Z,I);break}case oQ:Z[q]=W;break;case tQ:{if(X.has(q))FU(Z,q,rX);let I=G.kind===eQ;ER(Z,q,rX,{passive:I}),this.#D(Y,q,z),this.#D(Q,q,U),X.set(q,(V)=>this.#E(J,V));break}}}#D(Z,J,Q){let X=Z.get(J);if(Q>0)if(X)X.delay=Q;else Z.set(J,{delay:Q});else if(X){let{timeout:Y}=X;if(Y)iX(Y);Z.delete(J)}}#E(Z,J){let{currentTarget:Q,type:X}=J,{debouncers:Y,throttles:K}=Q[Z6],q=kR(Q),{prevent_default:W,stop_propagation:G,include:U}=Z;if(W.kind===QX)J.preventDefault();if(G.kind===QX)J.stopPropagation();if(X==="submit")J.detail??={},J.detail.formData=[...new FormData(J.target,J.submitter).entries()];let z=this.#q(J,q,X,U),I=K.get(X);if(I){let O=Date.now(),F=I.last||0;if(O>F+I.delay)I.last=O,I.lastEvent=J,this.#X(J,z)}let V=Y.get(X);if(V)iX(V.timeout),V.timeout=LR(()=>{if(J===K.get(X)?.lastEvent)return;this.#X(J,z)},V.delay);if(!I&&!V)this.#X(J,z)}}var xR=(Z,J)=>{if(J)return` ${Z} key="${L4(J)}" `;else return` ${Z} `},rX=(Z)=>{let{currentTarget:J,type:Q}=Z;J[Z6].handlers.get(Q)(Z)},NU=(Z)=>{return{added(J){J[Z]=!0},removed(J){J[Z]=!1}}},wR=(Z)=>{return{added(J,Q){J[Z]=Q}}},RU={checked:NU("checked"),selected:NU("selected"),value:wR("value"),autofocus:{added(Z){queueMicrotask(()=>{Z.focus?.()})}},autoplay:{added(Z){try{Z.play?.()}catch(J){console.error(J)}}}};function bR(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof w)return[Y,_1(K)];else{let q=X.tail,W=X.head[0],G=X.head[1],U=HZ(W,G),z;if(W==="")z=Y;else z=t0(Y,W,U);let I=z,V=k(U,K);Z=q,J=I,Q=V}}}function oX(Z){return bR(Z,c1(),G1)}function tX(Z,J,Q){let X=oX(Q),Y=X[0],K=X[1];return C4("","",Z,J,K,Y,!1,_4(Z,""))}function MU(Z,J,Q,X){let Y=oX(X),K=Y[0],q=Y[1];return C4("",Z,J,Q,q,K,!1,_4(J,Z))}function eX(Z){let J=oX(Z),Q=J[0],X=J[1];return GX("",X,Q)}function m8(Z,J){return tX("div",Z,J)}var LU=(Z)=>{let J=J6($8,null,Z,0,null),{children:Q}=ZY(J,Z,Z.firstChild);if(Q.length>1){let Y=J6($8,null,Z,0,null);return J.kind=T9,J.node=globalThis.document.createTextNode(""),J.parent=Y,Y.children.push(J),Z.insertBefore(J.node,Z.firstChild),eX(H7(Q))}if(Q.length===1)return Q[0][1];let X=globalThis.document.createTextNode("");return J6(U7,J,X,0,null),Z.insertBefore(X,Z.firstChild),k4()},BU=(Z,J,Q,X)=>{if(Q.nodeType===sX){let Y=Q.data.trim();if(Y.startsWith("lustre:fragment"))return hR(Z,J,Q,X);if(Y.startsWith("lustre:map"))return fR(Z,J,Q,X);if(Y.startsWith("lustre:memo"))return gR(Z,J,Q,X);return null}if(Q.nodeType===GU)return yR(Z,Q,X);if(Q.nodeType===UU)return $R(Z,Q,X);return null},yR=(Z,J,Q)=>{let X=J.getAttribute("data-lustre-key")??"";if(X)J.removeAttribute("data-lustre-key");let Y=J6($8,Z,J,Q,X),K=J.localName,q=J.namespaceURI,W=!q||q===xZ;if(W&&vR.includes(K))mR(K,J);let G=uR(J),{children:U}=ZY(Y,J,J.firstChild),z=W?tX(K,G,H7(U)):MU(q,K,G,H7(U));return h4(X,z,J.nextSibling)},ZY=(Z,J,Q)=>{let X=[];while(Q&&(Q.nodeType!==sX||Q.data.trim()!=="/lustre:fragment")){let Y=BU(Z,J,Q,X.length);if(Y)X.push([Y.key,Y.vnode]),Q=Y.next;else Q=Q.nextSibling}return{children:X,end:Q}},$R=(Z,J,Q)=>{return J6(U7,Z,J,Q,null),h4("",OZ(J.data),J.nextSibling)},hR=(Z,J,Q,X)=>{let Y=JY(Q.data),K=J6(T9,Z,Q,X,Y),{children:q,end:W}=ZY(K,J,Q.nextSibling);K.endNode=W;let G=eX(H7(q));return h4(Y,G,W?.nextSibling)},fR=(Z,J,Q,X)=>{let Y=JY(Q.data),K=J6(y8,Z,Q,X,Y),q=PU(K,J,Q,0);if(!q)return null;let W=bW(q.vnode,(G)=>G);return h4(Y,W,q.next)},gR=(Z,J,Q,X)=>{let Y=JY(Q.data),K=PU(Z,J,Q,X);if(!K)return null;J.removeChild(Q);let q=xW(H7([wW({})]),()=>K.vnode);return h4(Y,q,K.next)},PU=(Z,J,Q,X)=>{while(!0){if(Q=Q.nextSibling,!Q)return null;let Y=BU(Z,J,Q,X);if(Y)return Y}},h4=(Z,J,Q)=>{return{key:Z,vnode:J,next:Q}},uR=(Z)=>{let J=[];for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];if(X.name!=="xmlns")J.push(e1(X.localName,X.value))}return H7(J)},vR=["input","select","textarea"],mR=(Z,J)=>{let{value:Q,checked:X}=J;if(Z==="input"&&J.type==="checkbox"&&!X)return;if(Z==="input"&&J.type==="radio"&&!X)return;if(J.type!=="checkbox"&&J.type!=="radio"&&!Q)return;queueMicrotask(()=>{if(J.value=Q,J.checked=X,J.dispatchEvent(new Event("input",{bubbles:!0})),J.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==J)J.dispatchEvent(new Event("blur",{bubbles:!0}))})},JY=(Z)=>{let J=Z.match(/key="([^"]*)"/);if(!J)return"";return pR(J[1])},pR=(Z)=>{return Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},H7=(Z)=>Z.reduceRight((J,Q)=>r9(Q,J),G1);var S9=()=>!!globalThis.document;class wZ{constructor(Z,[J,Q],X,Y,K){this.root=Z,this.#Z=J,this.#q=X,this.#X=Y,this.root.addEventListener("context-request",(G)=>{if(!(G.context&&G.callback))return;if(!this.#W.has(G.context))return;G.stopImmediatePropagation();let U=this.#W.get(G.context);if(G.subscribe){let z=()=>{U.subscribers=U.subscribers.filter((I)=>I!==G.callback)};U.subscribers.push([G.callback,z]),G.callback(U.value,z)}else G.callback(U.value)});let q=(G,U,z)=>$X(this.#Q,U,z,G),W=(G,U)=>{let[z,I]=hX(this.#Q,U);if(this.#Q=z,z0(I)){let V=N0(I);if(V.stop_propagation)G.stopPropagation();if(V.prevent_default)G.preventDefault();this.dispatch(V.message,!1)}};this.#Y=new aX(this.root,q,W,K),this.#J=LU(this.root),this.#Q=bX(),this.#j(Q),this.#O()}root=null;dispatch(Z,J=!1){if(this.#V)this.#G.push(Z);else{let[Q,X]=this.#X(this.#Z,Z);this.#Z=Q,this.#R(J),this.#j(X)}}emit(Z,J){(this.root.host??this.root).dispatchEvent(new SU(Z,J))}provide(Z,J){if(!this.#W.has(Z))this.#W.set(Z,{value:J,subscribers:[]});else{let Q=this.#W.get(Z);if(N6(Q.value,J))return;Q.value=J;for(let X=Q.subscribers.length-1;X>=0;X--){let[Y,K]=Q.subscribers[X];if(!Y){Q.subscribers.splice(X,1);continue}Y(J,K)}}}subscribe(Z,J){if(!Z)return;this.#K.get(Z)?.(),(this.root.host??this.root).dispatchEvent(new QY(Z,(X,Y)=>{let K=this.#K.get(Z);if(K!==Y)K?.();let q=v6(X,J);if(this.#K.set(Z,Y),z0(q))this.dispatch(N0(q),!0)},!0))}unsubscribe(Z){let J=this.#K.get(Z);if(J)J(),this.#K.delete(Z)}unsubscribeAll(){for(let[Z,J]of this.#K)J?.();this.#K.clear()}#Z;#q;#X;#J;#Q;#Y;#W=new Map;#K=new Map;#V=!1;#G=[];#z=G1;#I=G1;#U=null;#N={dispatch:(Z)=>this.dispatch(Z),emit:(Z,J)=>this.emit(Z,J),select:()=>{},root:()=>this.root,provide:(Z,J)=>this.provide(Z,J),subscribe:(Z,J)=>this.subscribe(Z,J),unsubscribe:(Z)=>this.unsubscribe(Z)};#R(Z=!1){if(this.#U)return;if(Z)this.#U="sync",queueMicrotask(()=>this.#O());else this.#U=window.requestAnimationFrame(()=>this.#O())}#j(Z){this.#V=!0;let J=!1;while(!0){if(e0(Z.synchronous,(X)=>X(this.#N)),this.#z=lX(this.#z,Z.before_paint),this.#I=lX(this.#I,Z.after_paint),!this.#G.length)break;let Q=this.#G.shift();[this.#Z,Z]=this.#X(this.#Z,Q),J=!0}return this.#V=!1,J}#H(Z){if(this.#j(Z))this.#R(!0)}#O(){this.#U=null;let Z=this.#q(this.#Z),{patch:J,cache:Q}=$4(this.#Q,this.#J,Z);if(this.#Q=Q,this.#J=Z,this.#Y.push(J,V7(Q)),Y8(this.#z)){let X=TU(this.#z);this.#z=G1,queueMicrotask(()=>this.#H(X))}if(Y8(this.#I)){let X=TU(this.#I);this.#I=G1,window.requestAnimationFrame(()=>this.#H(X))}}}function TU(Z){return{synchronous:Z,after_paint:G1,before_paint:G1}}class QY extends Event{constructor(Z,J,Q){super("context-request",{bubbles:!0,composed:!0});this.context=Z,this.callback=J,this.subscribe=Q}}class SU extends CustomEvent{isLustreEvent=!0;constructor(Z,J){super(Z,{detail:J,bubbles:!0,composed:!0})}}class EU{#Z;constructor(Z,[J,Q],X,Y){this.#Z=new wZ(Z,[J,Q],Y,X)}send(Z){if(w4(Z))this.dispatch(Z.message,!1);else if(b4(Z))this.emit(Z.name,Z.data);else if(y4(Z));}dispatch(Z){this.#Z.dispatch(Z)}emit(Z,J){this.#Z.emit(Z,J)}}var CU=({init:Z,update:J,view:Q},X,Y)=>{if(!S9())return t1(XY());let K=X instanceof HTMLElement?X:globalThis.document.querySelector(X);if(!K)return t1(_U(X));return v1(new EU(K,Z(Y),J,Q))};class nR{#Z;#q;#X;#J;#Q;#Y;#W=o9();#K=new Set;constructor(Z,J,Q,X,Y,K){let[q,W]=J(K);this.#Z=q,this.#q=Q,this.#X=X,this.#J=Y,this.#Q=this.#X(this.#Z),this.#Y=xG(this.#Q),this.#U(W)}send(Z){if(cG(Z)){let{message:J}=J,Q=this.#V(J),X=$4(this.#Y,this.#Q,Q);this.#Q=Q,this.#Y=X.cache,this.broadcast(BX(X.patch,V7(X.cache)))}else if(nG(Z)){let{callback:J}=Z;if(this.#K.add(J),J(OG(this.#J.open_shadow_root,this.#J.adopt_styles,I4(this.#J.attributes),I4(this.#J.properties),I4(this.#J.contexts),this.#W,this.#Q,V7(this.#Y))),d5(this.#J.on_connect))this.#G(n5(this.#J.on_connect))}else if(sG(Z)){let{callback:J}=Z;if(this.#K.delete(J),d5(this.#J.on_disconnect))this.#G(n5(this.#J.on_disconnect))}else if(w4(Z)){let{message:J}=J,[Q,X]=this.#q(this.#Z,J),Y=this.#X(Q),K=$4(this.#Y,this.#Q,Y);this.#U(X),this.#Z=Q,this.#Q=Y,this.#Y=K.cache,this.broadcast(BX(K.patch,V7(K.cache)))}else if(b4(Z)){let{name:J,data:Q}=Z;this.broadcast(FG(J,Q))}else if(oG(Z)){let{key:J,value:Q}=Z,X=q8(this.#W,J);if(z0(X)&&N6(N0(X),Q))return;this.#W=F9(this.#W,J,Q),this.broadcast(NG(J,Q))}else if(eG(Z)){let{key:J,decoder:Q}=Z;this.broadcast(RG(J)),this.#J.contexts=F9(this.#J.contexts,J,Q)}else if(JU(Z)){let{key:J}=Z;this.broadcast(DG(J)),this.#J.contexts=xQ(this.#J.contexts,J)}else if(y4(Z))this.#Z=null,this.#q=null,this.#X=null,this.#J=null,this.#Q=null,this.#Y=null,this.#W=null,this.#K.clear()}broadcast(Z){for(let J of this.#K)J(Z)}#V(Z){if(qG(Z)){let{messages:J}=Z,Q=this.#Z,X=N1();for(let Y=J;$6(Y);Y=$6(Y)){let K=this.#V(a9(Y));if(z0(K)){Q=N0(K)[0],X=S4(WU([X,N0(K)[1]]));break}}return this.#U(X),this.#Z=Q,this.#X(Q)}else if(GG(Z)){let{name:J,value:Q}=Z,X=this.#z(J,Q);if(!z0(X))return this.#Q;return this.#G(N0(X))}else if(zG(Z)){let{name:J,value:Q}=Z,X=this.#I(J,Q);if(!z0(X))return this.#Q;return this.#G(N0(X))}else if(VG(Z)){let{path:J,name:Q,event:X}=q,[Y,K]=mG(this.#Y,J,Q,X);if(this.#Y=Y,!z0(K))return this.#Q;let{message:q}=N0(K);return this.#G(q)}else if(HG(Z)){let{key:J,value:Q}=Z,X=q8(this.#J.contexts,J);if(!z0(X))return this.#Q;if(X=v6(Q,N0(X)),!z0(X))return this.#Q;return this.#G(N0(X))}}#G(Z){let[J,Q]=this.#q(this.#Z,Z);return this.#U(Q),this.#Z=J,this.#X(this.#Z)}#z(Z,J){let Q=q8(this.#J.attributes,Z);if(!z0(Q))return Q;return N0(Q)(J)}#I(Z,J){let Q=q8(this.#J.properties,Z);if(!z0(Q))return Q;return N0(Q)(J)}#U(Z){let J=(G)=>this.send(iG(G)),Q=(G,U)=>this.send(rG(G,U)),X=()=>{return},Y=()=>{return},K=(G,U)=>this.send(aG(G,U)),q=(G,U)=>this.send(tG(G,U)),W=(G)=>this.send(ZU(G));globalThis.queueMicrotask(()=>{MW(Z,J,Q,X,Y,K,q,W)})}}class kU extends S{constructor(Z){super();this.selector=Z}}var _U=(Z)=>new kU(Z);class xU extends S{}var wU=new xU,XY=()=>wU;function bU(Z,J,Q){return new pX(V1,Z,J,Q,XU)}function yU(Z,J,Q){return lq(!S9(),new L1(wU),()=>{return CU(Z,J,Q)})}var $U=new Map;function YY(Z,J,Q){clearTimeout($U.get(Z)),$U.set(Z,setTimeout(Q,J))}function KY(Z){return confirm(Z)}function qY(Z){alert(Z)}function f4(Z,J){return XX(Z,R9(J,(Q)=>{return new W7(!1,!1,Q)}),G1,ZX,ZX,0,0)}function hU(Z,J){return XX(Z,J,G1,JX,JX,0,0)}function bZ(Z,J,Q){return new W7(J,Q,Z)}function M0(Z){return f4("click",$1(Z))}function fU(Z){return f4("input",J7(j(["target","value"]),k1,(J)=>{return $1(Z(J))}))}function gU(Z){return f4("change",J7(j(["target","value"]),k1,(J)=>{return $1(Z(J))}))}var UY=[],pU=[];(()=>{let Z="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((J)=>J?parseInt(J,36):1);for(let J=0,Q=0;J<Z.length;J++)(J%2?pU:UY).push(Q=Q+Z[J])})();function rR(Z){if(Z<768)return!1;for(let J=0,Q=UY.length;;){let X=J+Q>>1;if(Z<UY[X])Q=X;else if(Z>=pU[X])J=X+1;else return!0;if(J==Q)return!1}}function uU(Z){return Z>=127462&&Z<=127487}var vU=8205;function cU(Z,J,Q=!0,X=!0){return(Q?dU:aR)(Z,J,X)}function dU(Z,J,Q){if(J==Z.length)return J;if(J&&nU(Z.charCodeAt(J))&&lU(Z.charCodeAt(J-1)))J--;let X=GY(Z,J);J+=mU(X);while(J<Z.length){let Y=GY(Z,J);if(X==vU||Y==vU||Q&&rR(Y))J+=mU(Y),X=Y;else if(uU(Y)){let K=0,q=J-2;while(q>=0&&uU(GY(Z,q)))K++,q-=2;if(K%2==0)break;else J+=2}else break}return J}function aR(Z,J,Q){while(J>1){let X=dU(Z,J-2,Q);if(X<J)return X;J--}return 0}function GY(Z,J){let Q=Z.charCodeAt(J);if(!lU(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!nU(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function nU(Z){return Z>=56320&&Z<57344}function lU(Z){return Z>=55296&&Z<56320}function mU(Z){return Z<65536?1:2}class O1{lineAt(Z){if(Z<0||Z>this.length)throw RangeError(`Invalid position ${Z} in document of length ${this.length}`);return this.lineInner(Z,!1,1,0)}line(Z){if(Z<1||Z>this.lines)throw RangeError(`Invalid line number ${Z} in ${this.lines}-line document`);return this.lineInner(Z,!0,1,0)}replace(Z,J,Q){[Z,J]=R7(this,Z,J);let X=[];if(this.decompose(0,Z,X,2),Q.length)Q.decompose(0,Q.length,X,3);return this.decompose(J,this.length,X,1),l6.from(X,this.length-(J-Z)+Q.length)}append(Z){return this.replace(this.length,this.length,Z)}slice(Z,J=this.length){[Z,J]=R7(this,Z,J);let Q=[];return this.decompose(Z,J,Q,0),l6.from(Q,J-Z)}eq(Z){if(Z==this)return!0;if(Z.length!=this.length||Z.lines!=this.lines)return!1;let J=this.scanIdentical(Z,1),Q=this.length-this.scanIdentical(Z,-1),X=new F7(this),Y=new F7(Z);for(let K=J,q=J;;){if(X.next(K),Y.next(K),K=0,X.lineBreak!=Y.lineBreak||X.done!=Y.done||X.value!=Y.value)return!1;if(q+=X.value.length,X.done||q>=Q)return!0}}iter(Z=1){return new F7(this,Z)}iterRange(Z,J=this.length){return new MY(this,Z,J)}iterLines(Z,J){let Q;if(Z==null)Q=this.iter();else{if(J==null)J=this.lines+1;let X=this.line(Z).from;Q=this.iterRange(X,Math.max(X,J==this.lines+1?this.length:J<=1?0:this.line(J-1).to))}return new AY(Q)}toString(){return this.sliceString(0)}toJSON(){let Z=[];return this.flatten(Z),Z}constructor(){}static of(Z){if(Z.length==0)throw RangeError("A document must have at least one line");if(Z.length==1&&!Z[0])return O1.empty;return Z.length<=32?new n1(Z):l6.from(n1.split(Z,[]))}}class n1 extends O1{constructor(Z,J=oR(Z)){super();this.text=Z,this.length=J}get lines(){return this.text.length}get children(){return null}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.text[Y],q=X+K.length;if((J?Q:q)>=Z)return new tU(X,q,Q,K);X=q+1,Q++}}decompose(Z,J,Q,X){let Y=Z<=0&&J>=this.length?this:new n1(sU(this.text,Z,J),Math.min(J,this.length)-Math.max(0,Z));if(X&1){let K=Q.pop(),q=fZ(Y.text,K.text.slice(),0,Y.length);if(q.length<=32)Q.push(new n1(q,K.length+Y.length));else{let W=q.length>>1;Q.push(new n1(q.slice(0,W)),new n1(q.slice(W)))}}else Q.push(Y)}replace(Z,J,Q){if(!(Q instanceof n1))return super.replace(Z,J,Q);[Z,J]=R7(this,Z,J);let X=fZ(this.text,fZ(Q.text,sU(this.text,0,Z)),J),Y=this.length+Q.length-(J-Z);if(X.length<=32)return new n1(X,Y);return l6.from(n1.split(X,[]),Y)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=R7(this,Z,J);let X="";for(let Y=0,K=0;Y<=J&&K<this.text.length;K++){let q=this.text[K],W=Y+q.length;if(Y>Z&&K)X+=Q;if(Z<W&&J>Y)X+=q.slice(Math.max(0,Z-Y),J-Y);Y=W+1}return X}flatten(Z){for(let J of this.text)Z.push(J)}scanIdentical(){return 0}static split(Z,J){let Q=[],X=-1;for(let Y of Z)if(Q.push(Y),X+=Y.length+1,Q.length==32)J.push(new n1(Q,X)),Q=[],X=-1;if(X>-1)J.push(new n1(Q,X));return J}}class l6 extends O1{constructor(Z,J){super();this.children=Z,this.length=J,this.lines=0;for(let Q of Z)this.lines+=Q.lines}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.children[Y],q=X+K.length,W=Q+K.lines-1;if((J?W:q)>=Z)return K.lineInner(Z,J,Q,X);X=q+1,Q=W+1}}decompose(Z,J,Q,X){for(let Y=0,K=0;K<=J&&Y<this.children.length;Y++){let q=this.children[Y],W=K+q.length;if(Z<=W&&J>=K){let G=X&((K<=Z?1:0)|(W>=J?2:0));if(K>=Z&&W<=J&&!G)Q.push(q);else q.decompose(Z-K,J-K,Q,G)}K=W+1}}replace(Z,J,Q){if([Z,J]=R7(this,Z,J),Q.lines<this.lines)for(let X=0,Y=0;X<this.children.length;X++){let K=this.children[X],q=Y+K.length;if(Z>=Y&&J<=q){let W=K.replace(Z-Y,J-Y,Q),G=this.lines-K.lines+W.lines;if(W.lines<G>>4&&W.lines>G>>6){let U=this.children.slice();return U[X]=W,new l6(U,this.length-(J-Z)+Q.length)}return super.replace(Y,q,W)}Y=q+1}return super.replace(Z,J,Q)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=R7(this,Z,J);let X="";for(let Y=0,K=0;Y<this.children.length&&K<=J;Y++){let q=this.children[Y],W=K+q.length;if(K>Z&&Y)X+=Q;if(Z<W&&J>K)X+=q.sliceString(Z-K,J-K,Q);K=W+1}return X}flatten(Z){for(let J of this.children)J.flatten(Z)}scanIdentical(Z,J){if(!(Z instanceof l6))return 0;let Q=0,[X,Y,K,q]=J>0?[0,0,this.children.length,Z.children.length]:[this.children.length-1,Z.children.length-1,-1,-1];for(;;X+=J,Y+=J){if(X==K||Y==q)return Q;let W=this.children[X],G=Z.children[Y];if(W!=G)return Q+W.scanIdentical(G,J);Q+=W.length+1}}static from(Z,J=Z.reduce((Q,X)=>Q+X.length+1,-1)){let Q=0;for(let V of Z)Q+=V.lines;if(Q<32){let V=[];for(let O of Z)O.flatten(V);return new n1(V,J)}let X=Math.max(32,Q>>5),Y=X<<1,K=X>>1,q=[],W=0,G=-1,U=[];function z(V){let O;if(V.lines>Y&&V instanceof l6)for(let F of V.children)z(F);else if(V.lines>K&&(W>K||!W))I(),q.push(V);else if(V instanceof n1&&W&&(O=U[U.length-1])instanceof n1&&V.lines+O.lines<=32)W+=V.lines,G+=V.length+1,U[U.length-1]=new n1(O.text.concat(V.text),O.length+1+V.length);else{if(W+V.lines>X)I();W+=V.lines,G+=V.length+1,U.push(V)}}function I(){if(W==0)return;q.push(U.length==1?U[0]:l6.from(U,G)),G=-1,W=U.length=0}for(let V of Z)z(V);return I(),q.length==1?q[0]:new l6(q,J)}}O1.empty=new n1([""],0);function oR(Z){let J=-1;for(let Q of Z)J+=Q.length+1;return J}function fZ(Z,J,Q=0,X=1e9){for(let Y=0,K=0,q=!0;K<Z.length&&Y<=X;K++){let W=Z[K],G=Y+W.length;if(G>=Q){if(G>X)W=W.slice(0,X-Y);if(Y<Q)W=W.slice(Q-Y);if(q)J[J.length-1]+=W,q=!1;else J.push(W)}Y=G+1}return J}function sU(Z,J,Q){return fZ(Z,[""],J,Q)}class F7{constructor(Z,J=1){this.dir=J,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[Z],this.offsets=[J>0?1:(Z instanceof n1?Z.text.length:Z.children.length)<<1]}nextInner(Z,J){this.done=this.lineBreak=!1;for(;;){let Q=this.nodes.length-1,X=this.nodes[Q],Y=this.offsets[Q],K=Y>>1,q=X instanceof n1?X.text.length:X.children.length;if(K==(J>0?q:0)){if(Q==0)return this.done=!0,this.value="",this;if(J>0)this.offsets[Q-1]++;this.nodes.pop(),this.offsets.pop()}else if((Y&1)==(J>0?0:1)){if(this.offsets[Q]+=J,Z==0)return this.lineBreak=!0,this.value=`
`,this;Z--}else if(X instanceof n1){let W=X.text[K+(J<0?-1:0)];if(this.offsets[Q]+=J,W.length>Math.max(0,Z))return this.value=Z==0?W:J>0?W.slice(Z):W.slice(0,W.length-Z),this;Z-=W.length}else{let W=X.children[K+(J<0?-1:0)];if(Z>W.length)Z-=W.length,this.offsets[Q]+=J;else{if(J<0)this.offsets[Q]--;this.nodes.push(W),this.offsets.push(J>0?1:(W instanceof n1?W.text.length:W.children.length)<<1)}}}}next(Z=0){if(Z<0)this.nextInner(-Z,-this.dir),Z=this.value.length;return this.nextInner(Z,this.dir)}}class MY{constructor(Z,J,Q){this.value="",this.done=!1,this.cursor=new F7(Z,J>Q?-1:1),this.pos=J>Q?Z.length:0,this.from=Math.min(J,Q),this.to=Math.max(J,Q)}nextInner(Z,J){if(J<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;Z+=Math.max(0,J<0?this.pos-this.to:this.from-this.pos);let Q=J<0?this.pos-this.from:this.to-this.pos;if(Z>Q)Z=Q;Q-=Z;let{value:X}=this.cursor.next(Z);return this.pos+=(X.length+Z)*J,this.value=X.length<=Q?X:J<0?X.slice(X.length-Q):X.slice(0,Q),this.done=!this.value,this}next(Z=0){if(Z<0)Z=Math.max(Z,this.from-this.pos);else if(Z>0)Z=Math.min(Z,this.to-this.pos);return this.nextInner(Z,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class AY{constructor(Z){this.inner=Z,this.afterBreak=!0,this.value="",this.done=!1}next(Z=0){let{done:J,lineBreak:Q,value:X}=this.inner.next(Z);if(J&&this.afterBreak)this.value="",this.afterBreak=!1;else if(J)this.done=!0,this.value="";else if(Q)if(this.afterBreak)this.value="";else this.afterBreak=!0,this.next();else this.value=X,this.afterBreak=!1;return this}get lineBreak(){return!1}}if(typeof Symbol<"u")O1.prototype[Symbol.iterator]=function(){return this.iter()},F7.prototype[Symbol.iterator]=MY.prototype[Symbol.iterator]=AY.prototype[Symbol.iterator]=function(){return this};class tU{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.number=Q,this.text=X}get length(){return this.to-this.from}}function R7(Z,J,Q){return J=Math.max(0,Math.min(Z.length,J)),[J,Math.max(J,Math.min(Z.length,Q))]}function K0(Z,J,Q=!0,X=!0){return cU(Z,J,Q,X)}function tR(Z){return Z>=56320&&Z<57344}function eR(Z){return Z>=55296&&Z<56320}function eU(Z,J){let Q=Z.charCodeAt(J);if(!eR(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!tR(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function Zz(Z){return Z<65536?1:2}var IY=/\r\n?|\n/,A0=function(Z){return Z[Z.Simple=0]="Simple",Z[Z.TrackDel=1]="TrackDel",Z[Z.TrackBefore=2]="TrackBefore",Z[Z.TrackAfter=3]="TrackAfter",Z}(A0||(A0={}));class D6{constructor(Z){this.sections=Z}get length(){let Z=0;for(let J=0;J<this.sections.length;J+=2)Z+=this.sections[J];return Z}get newLength(){let Z=0;for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J+1];Z+=Q<0?this.sections[J]:Q}return Z}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(Z){for(let J=0,Q=0,X=0;J<this.sections.length;){let Y=this.sections[J++],K=this.sections[J++];if(K<0)Z(Q,X,Y),X+=Y;else X+=K;Q+=Y}}iterChangedRanges(Z,J=!1){VY(this,Z,J)}get invertedDesc(){let Z=[];for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];if(X<0)Z.push(Q,X);else Z.push(X,Q)}return new D6(Z)}composeDesc(Z){return this.empty?Z:Z.empty?this:Jz(this,Z)}mapDesc(Z,J=!1){return Z.empty?this:jY(this,Z,J)}mapPos(Z,J=-1,Q=A0.Simple){let X=0,Y=0;for(let K=0;K<this.sections.length;){let q=this.sections[K++],W=this.sections[K++],G=X+q;if(W<0){if(G>Z)return Y+(Z-X);Y+=q}else{if(Q!=A0.Simple&&G>=Z&&(Q==A0.TrackDel&&X<Z&&G>Z||Q==A0.TrackBefore&&X<Z||Q==A0.TrackAfter&&G>Z))return null;if(G>Z||G==Z&&J<0&&!q)return Z==X||J<0?Y:Y+W;Y+=W}X=G}if(Z>X)throw RangeError(`Position ${Z} is out of range for changeset of length ${X}`);return Y}touchesRange(Z,J=Z){for(let Q=0,X=0;Q<this.sections.length&&X<=J;){let Y=this.sections[Q++],K=this.sections[Q++],q=X+Y;if(K>=0&&X<=J&&q>=Z)return X<Z&&q>J?"cover":!0;X=q}return!1}toString(){let Z="";for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];Z+=(Z?" ":"")+Q+(X>=0?":"+X:"")}return Z}toJSON(){return this.sections}static fromJSON(Z){if(!Array.isArray(Z)||Z.length%2||Z.some((J)=>typeof J!="number"))throw RangeError("Invalid JSON representation of ChangeDesc");return new D6(Z)}static create(Z){return new D6(Z)}}class l1 extends D6{constructor(Z,J){super(Z);this.inserted=J}apply(Z){if(this.length!=Z.length)throw RangeError("Applying change set to a document with the wrong length");return VY(this,(J,Q,X,Y,K)=>Z=Z.replace(X,X+(Q-J),K),!1),Z}mapDesc(Z,J=!1){return jY(this,Z,J,!0)}invert(Z){let J=this.sections.slice(),Q=[];for(let X=0,Y=0;X<J.length;X+=2){let K=J[X],q=J[X+1];if(q>=0){J[X]=q,J[X+1]=K;let W=X>>1;while(Q.length<W)Q.push(O1.empty);Q.push(K?Z.slice(Y,Y+K):O1.empty)}Y+=K}return new l1(J,Q)}compose(Z){return this.empty?Z:Z.empty?this:Jz(this,Z,!0)}map(Z,J=!1){return Z.empty?this:jY(this,Z,J,!0)}iterChanges(Z,J=!1){VY(this,Z,J)}get desc(){return D6.create(this.sections)}filter(Z){let J=[],Q=[],X=[],Y=new D7(this);Z:for(let K=0,q=0;;){let W=K==Z.length?1e9:Z[K++];while(q<W||q==W&&Y.len==0){if(Y.done)break Z;let U=Math.min(Y.len,W-q);j0(X,U,-1);let z=Y.ins==-1?-1:Y.off==0?Y.ins:0;if(j0(J,U,z),z>0)c8(Q,J,Y.text);Y.forward(U),q+=U}let G=Z[K++];while(q<G){if(Y.done)break Z;let U=Math.min(Y.len,G-q);j0(J,U,-1),j0(X,U,Y.ins==-1?-1:Y.off==0?Y.ins:0),Y.forward(U),q+=U}}return{changes:new l1(J,Q),filtered:D6.create(X)}}toJSON(){let Z=[];for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J],X=this.sections[J+1];if(X<0)Z.push(Q);else if(X==0)Z.push([Q]);else Z.push([Q].concat(this.inserted[J>>1].toJSON()))}return Z}static of(Z,J,Q){let X=[],Y=[],K=0,q=null;function W(U=!1){if(!U&&!X.length)return;if(K<J)j0(X,J-K,-1);let z=new l1(X,Y);q=q?q.compose(z.map(q)):z,X=[],Y=[],K=0}function G(U){if(Array.isArray(U))for(let z of U)G(z);else if(U instanceof l1){if(U.length!=J)throw RangeError(`Mismatched change set length (got ${U.length}, expected ${J})`);W(),q=q?q.compose(U.map(q)):U}else{let{from:z,to:I=z,insert:V}=U;if(z>I||z<0||I>J)throw RangeError(`Invalid change range ${z} to ${I} (in doc of length ${J})`);let O=!V?O1.empty:typeof V=="string"?O1.of(V.split(Q||IY)):V,F=O.length;if(z==I&&F==0)return;if(z<K)W();if(z>K)j0(X,z-K,-1);j0(X,I-z,F),c8(Y,X,O),K=I}}return G(Z),W(!q),q}static empty(Z){return new l1(Z?[Z,-1]:[],[])}static fromJSON(Z){if(!Array.isArray(Z))throw RangeError("Invalid JSON representation of ChangeSet");let J=[],Q=[];for(let X=0;X<Z.length;X++){let Y=Z[X];if(typeof Y=="number")J.push(Y,-1);else if(!Array.isArray(Y)||typeof Y[0]!="number"||Y.some((K,q)=>q&&typeof K!="string"))throw RangeError("Invalid JSON representation of ChangeSet");else if(Y.length==1)J.push(Y[0],0);else{while(Q.length<X)Q.push(O1.empty);Q[X]=O1.of(Y.slice(1)),J.push(Y[0],Q[X].length)}}return new l1(J,Q)}static createSet(Z,J){return new l1(Z,J)}}function j0(Z,J,Q,X=!1){if(J==0&&Q<=0)return;let Y=Z.length-2;if(Y>=0&&Q<=0&&Q==Z[Y+1])Z[Y]+=J;else if(Y>=0&&J==0&&Z[Y]==0)Z[Y+1]+=Q;else if(X)Z[Y]+=J,Z[Y+1]+=Q;else Z.push(J,Q)}function c8(Z,J,Q){if(Q.length==0)return;let X=J.length-2>>1;if(X<Z.length)Z[Z.length-1]=Z[Z.length-1].append(Q);else{while(Z.length<X)Z.push(O1.empty);Z.push(Q)}}function VY(Z,J,Q){let X=Z.inserted;for(let Y=0,K=0,q=0;q<Z.sections.length;){let W=Z.sections[q++],G=Z.sections[q++];if(G<0)Y+=W,K+=W;else{let U=Y,z=K,I=O1.empty;for(;;){if(U+=W,z+=G,G&&X)I=I.append(X[q-2>>1]);if(Q||q==Z.sections.length||Z.sections[q+1]<0)break;W=Z.sections[q++],G=Z.sections[q++]}J(Y,U,K,z,I),Y=U,K=z}}}function jY(Z,J,Q,X=!1){let Y=[],K=X?[]:null,q=new D7(Z),W=new D7(J);for(let G=-1;;)if(q.done&&W.len||W.done&&q.len)throw Error("Mismatched change set lengths");else if(q.ins==-1&&W.ins==-1){let U=Math.min(q.len,W.len);j0(Y,U,-1),q.forward(U),W.forward(U)}else if(W.ins>=0&&(q.ins<0||G==q.i||q.off==0&&(W.len<q.len||W.len==q.len&&!Q))){let U=W.len;j0(Y,W.ins,-1);while(U){let z=Math.min(q.len,U);if(q.ins>=0&&G<q.i&&q.len<=z){if(j0(Y,0,q.ins),K)c8(K,Y,q.text);G=q.i}q.forward(z),U-=z}W.next()}else if(q.ins>=0){let U=0,z=q.len;while(z)if(W.ins==-1){let I=Math.min(z,W.len);U+=I,z-=I,W.forward(I)}else if(W.ins==0&&W.len<z)z-=W.len,W.next();else break;if(j0(Y,U,G<q.i?q.ins:0),K&&G<q.i)c8(K,Y,q.text);G=q.i,q.forward(q.len-z)}else if(q.done&&W.done)return K?l1.createSet(Y,K):D6.create(Y);else throw Error("Mismatched change set lengths")}function Jz(Z,J,Q=!1){let X=[],Y=Q?[]:null,K=new D7(Z),q=new D7(J);for(let W=!1;;)if(K.done&&q.done)return Y?l1.createSet(X,Y):D6.create(X);else if(K.ins==0)j0(X,K.len,0,W),K.next();else if(q.len==0&&!q.done){if(j0(X,0,q.ins,W),Y)c8(Y,X,q.text);q.next()}else if(K.done||q.done)throw Error("Mismatched change set lengths");else{let G=Math.min(K.len2,q.len),U=X.length;if(K.ins==-1){let z=q.ins==-1?-1:q.off?0:q.ins;if(j0(X,G,z,W),Y&&z)c8(Y,X,q.text)}else if(q.ins==-1){if(j0(X,K.off?0:K.len,G,W),Y)c8(Y,X,K.textBit(G))}else if(j0(X,K.off?0:K.len,q.off?0:q.ins,W),Y&&!q.off)c8(Y,X,q.text);W=(K.ins>G||q.ins>=0&&q.len>G)&&(W||X.length>U),K.forward2(G),q.forward(G)}}class D7{constructor(Z){this.set=Z,this.i=0,this.next()}next(){let{sections:Z}=this.set;if(this.i<Z.length)this.len=Z[this.i++],this.ins=Z[this.i++];else this.len=0,this.ins=-2;this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:Z}=this.set,J=this.i-2>>1;return J>=Z.length?O1.empty:Z[J]}textBit(Z){let{inserted:J}=this.set,Q=this.i-2>>1;return Q>=J.length&&!Z?O1.empty:J[Q].slice(this.off,Z==null?void 0:this.off+Z)}forward(Z){if(Z==this.len)this.next();else this.len-=Z,this.off+=Z}forward2(Z){if(this.ins==-1)this.forward(Z);else if(Z==this.ins)this.next();else this.ins-=Z,this.off+=Z}}class p8{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.flags=Q,this.goalColumn=X}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let Z=this.flags&7;return Z==7?null:Z}map(Z,J=-1){let Q,X;if(this.empty)Q=X=Z.mapPos(this.from,J);else Q=Z.mapPos(this.from,1),X=Z.mapPos(this.to,-1);return Q==this.from&&X==this.to?this:new p8(Q,X,this.flags,this.goalColumn)}extend(Z,J=Z,Q=0){if(Z<=this.anchor&&J>=this.anchor)return y.range(Z,J,void 0,void 0,Q);let X=Math.abs(Z-this.anchor)>Math.abs(J-this.anchor)?Z:J;return y.range(this.anchor,X,void 0,void 0,Q)}eq(Z,J=!1){return this.anchor==Z.anchor&&this.head==Z.head&&this.goalColumn==Z.goalColumn&&(!J||!this.empty||this.assoc==Z.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(Z){if(!Z||typeof Z.anchor!="number"||typeof Z.head!="number")throw RangeError("Invalid JSON representation for SelectionRange");return y.range(Z.anchor,Z.head)}static create(Z,J,Q,X){return new p8(Z,J,Q,X)}}class y{constructor(Z,J){this.ranges=Z,this.mainIndex=J}map(Z,J=-1){if(Z.empty)return this;return y.create(this.ranges.map((Q)=>Q.map(Z,J)),this.mainIndex)}eq(Z,J=!1){if(this.ranges.length!=Z.ranges.length||this.mainIndex!=Z.mainIndex)return!1;for(let Q=0;Q<this.ranges.length;Q++)if(!this.ranges[Q].eq(Z.ranges[Q],J))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new y([this.main],0)}addRange(Z,J=!0){return y.create([Z].concat(this.ranges),J?0:this.mainIndex+1)}replaceRange(Z,J=this.mainIndex){let Q=this.ranges.slice();return Q[J]=Z,y.create(Q,this.mainIndex)}toJSON(){return{ranges:this.ranges.map((Z)=>Z.toJSON()),main:this.mainIndex}}static fromJSON(Z){if(!Z||!Array.isArray(Z.ranges)||typeof Z.main!="number"||Z.main>=Z.ranges.length)throw RangeError("Invalid JSON representation for EditorSelection");return new y(Z.ranges.map((J)=>p8.fromJSON(J)),Z.main)}static single(Z,J=Z){return new y([y.range(Z,J)],0)}static create(Z,J=0){if(Z.length==0)throw RangeError("A selection needs at least one range");for(let Q=0,X=0;X<Z.length;X++){let Y=Z[X];if(Y.empty?Y.from<=Q:Y.from<Q)return y.normalized(Z.slice(),J);Q=Y.to}return new y(Z,J)}static cursor(Z,J=0,Q,X){return p8.create(Z,Z,(J==0?0:J<0?8:16)|(Q==null?7:Math.min(6,Q)),X)}static range(Z,J,Q,X,Y){let K=X==null?7:Math.min(6,X);if(!Y&&Z!=J)Y=J<Z?1:-1;if(Y)K|=Y<0?8:16;return J<Z?p8.create(J,Z,K|32,Q):p8.create(Z,J,K,Q)}static undirectionalRange(Z,J){return p8.create(Z,J,64,void 0)}static normalized(Z,J=0){let Q=Z[J];Z.sort((X,Y)=>X.from-Y.from),J=Z.indexOf(Q);for(let X=1;X<Z.length;X++){let Y=Z[X],K=Z[X-1];if(Y.empty?Y.from<=K.to:Y.from<K.to){let q=K.from,W=Math.max(Y.to,K.to);if(X<=J)J--;Z.splice(--X,2,Y.anchor>Y.head?y.range(W,q):y.range(q,W))}}return new y(Z,J)}}function Qz(Z,J){for(let Q of Z.ranges)if(Q.to>J)throw RangeError("Selection points outside of document")}var LY=0;class r{constructor(Z,J,Q,X,Y){this.combine=Z,this.compareInput=J,this.compare=Q,this.isStatic=X,this.id=LY++,this.default=Z([]),this.extensions=typeof Y=="function"?Y(this):Y}get reader(){return this}static define(Z={}){return new r(Z.combine||((J)=>J),Z.compareInput||((J,Q)=>J===Q),Z.compare||(!Z.combine?BY:(J,Q)=>J===Q),!!Z.static,Z.enables)}of(Z){return new u4([],this,0,Z)}compute(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new u4(Z,this,1,J)}computeN(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new u4(Z,this,2,J)}from(Z,J){if(!J)J=(Q)=>Q;return this.compute([Z],(Q)=>J(Q.field(Z)))}}function BY(Z,J){return Z==J||Z.length==J.length&&Z.every((Q,X)=>Q===J[X])}class u4{constructor(Z,J,Q,X){this.dependencies=Z,this.facet=J,this.type=Q,this.value=X,this.id=LY++}dynamicSlot(Z){var J;let Q=this.value,X=this.facet.compareInput,Y=this.id,K=Z[Y]>>1,q=this.type==2,W=!1,G=!1,U=[];for(let z of this.dependencies)if(z=="doc")W=!0;else if(z=="selection")G=!0;else if((((J=Z[z.id])!==null&&J!==void 0?J:1)&1)==0)U.push(Z[z.id]);return{create(z){return z.values[K]=Q(z),1},update(z,I){if(W&&I.docChanged||G&&(I.docChanged||I.selection)||HY(z,U)){let V=Q(z);if(q?!iU(V,z.values[K],X):!X(V,z.values[K]))return z.values[K]=V,1}return 0},reconfigure:(z,I)=>{let V,O=I.config.address[Y];if(O!=null){let F=vZ(I,O);if(this.dependencies.every((N)=>{return N instanceof r?I.facet(N)===z.facet(N):N instanceof H0?I.field(N,!1)==z.field(N,!1):!0})||(q?iU(V=Q(z),F,X):X(V=Q(z),F)))return z.values[K]=F,0}else V=Q(z);return z.values[K]=V,1}}}get extension(){return this}}function iU(Z,J,Q){if(Z.length!=J.length)return!1;for(let X=0;X<Z.length;X++)if(!Q(Z[X],J[X]))return!1;return!0}function HY(Z,J){let Q=!1;for(let X of J)if(v4(Z,X)&1)Q=!0;return Q}function ZD(Z,J,Q){let X=Q.map((G)=>Z[G.id]),Y=Q.map((G)=>G.type),K=X.filter((G)=>!(G&1)),q=Z[J.id]>>1;function W(G){let U=[];for(let z=0;z<X.length;z++){let I=vZ(G,X[z]);if(Y[z]==2)for(let V of I)U.push(V);else U.push(I)}return J.combine(U)}return{create(G){for(let U of X)v4(G,U);return G.values[q]=W(G),1},update(G,U){if(!HY(G,K))return 0;let z=W(G);if(J.compare(z,G.values[q]))return 0;return G.values[q]=z,1},reconfigure(G,U){let z=HY(G,X),I=U.config.facets[J.id],V=U.facet(J);if(I&&!z&&BY(Q,I))return G.values[q]=V,0;let O=W(G);if(J.compare(O,V))return G.values[q]=V,0;return G.values[q]=O,1}}}var yZ=r.define({static:!0});class H0{constructor(Z,J,Q,X,Y){this.id=Z,this.createF=J,this.updateF=Q,this.compareF=X,this.spec=Y,this.provides=void 0}static define(Z){let J=new H0(LY++,Z.create,Z.update,Z.compare||((Q,X)=>Q===X),Z);if(Z.provide)J.provides=Z.provide(J);return J}create(Z){let J=Z.facet(yZ).find((Q)=>Q.field==this);return((J===null||J===void 0?void 0:J.create)||this.createF)(Z)}slot(Z){let J=Z[this.id]>>1;return{create:(Q)=>{return Q.values[J]=this.create(Q),1},update:(Q,X)=>{let Y=Q.values[J],K=this.updateF(Y,X);if(this.compareF(Y,K))return 0;return Q.values[J]=K,1},reconfigure:(Q,X)=>{let Y=Q.facet(yZ),K=X.facet(yZ),q;if((q=Y.find((W)=>W.field==this))&&q!=K.find((W)=>W.field==this))return Q.values[J]=q.create(Q),1;if(X.config.address[this.id]!=null)return Q.values[J]=X.field(this),0;return Q.values[J]=this.create(Q),1}}}init(Z){return[this,yZ.of({field:this,create:Z})]}get extension(){return this}}var E9={lowest:4,low:3,default:2,high:1,highest:0};function g4(Z){return(J)=>new PY(J,Z)}var N8={highest:g4(E9.highest),high:g4(E9.high),default:g4(E9.default),low:g4(E9.low),lowest:g4(E9.lowest)};class PY{constructor(Z,J){this.inner=Z,this.prec=J}get extension(){return this}}class C9{of(Z){return new gZ(this,Z)}reconfigure(Z){return C9.reconfigure.of({compartment:this,extension:Z})}get(Z){return Z.config.compartments.get(this)}}class gZ{constructor(Z,J){this.compartment=Z,this.inner=J}get extension(){return this}}class uZ{constructor(Z,J,Q,X,Y,K){this.base=Z,this.compartments=J,this.dynamicSlots=Q,this.address=X,this.staticValues=Y,this.facets=K,this.statusTemplate=[];while(this.statusTemplate.length<Q.length)this.statusTemplate.push(0)}staticFacet(Z){let J=this.address[Z.id];return J==null?Z.default:this.staticValues[J>>1]}static resolve(Z,J,Q){let X=[],Y=Object.create(null),K=new Map;for(let I of JD(Z,J,K))if(I instanceof H0)X.push(I);else(Y[I.facet.id]||(Y[I.facet.id]=[])).push(I);let q=Object.create(null),W=[],G=[];for(let I of X)q[I.id]=G.length<<1,G.push((V)=>I.slot(V));let U=Q===null||Q===void 0?void 0:Q.config.facets;for(let I in Y){let V=Y[I],O=V[0].facet,F=U&&U[I]||[];if(V.every((N)=>N.type==0))if(q[O.id]=W.length<<1|1,BY(F,V))W.push(Q.facet(O));else{let N=O.combine(V.map((R)=>R.value));W.push(Q&&O.compare(N,Q.facet(O))?Q.facet(O):N)}else{for(let N of V)if(N.type==0)q[N.id]=W.length<<1|1,W.push(N.value);else q[N.id]=G.length<<1,G.push((R)=>N.dynamicSlot(R));q[O.id]=G.length<<1,G.push((N)=>ZD(N,O,V))}}let z=G.map((I)=>I(q));return new uZ(Z,K,z,q,W,Y)}}function JD(Z,J,Q){let X=[[],[],[],[],[]],Y=new Map;function K(q,W){let G=Y.get(q);if(G!=null){if(G<=W)return;let U=X[G].indexOf(q);if(U>-1)X[G].splice(U,1);if(q instanceof gZ)Q.delete(q.compartment)}if(Y.set(q,W),Array.isArray(q))for(let U of q)K(U,W);else if(q instanceof gZ){if(Q.has(q.compartment))throw RangeError("Duplicate use of compartment in extensions");let U=J.get(q.compartment)||q.inner;Q.set(q.compartment,U),K(U,W)}else if(q instanceof PY)K(q.inner,q.prec);else if(q instanceof H0){if(X[W].push(q),q.provides)K(q.provides,W)}else if(q instanceof u4){if(X[W].push(q),q.facet.extensions)K(q.facet.extensions,E9.default)}else{let U=q.extension;if(!U)throw Error(`Unrecognized extension value in extension set (${q}).`);if(U==q)throw Error(`Unrecognized extension value in extension set (${q}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);K(U,W)}}return K(Z,E9.default),X.reduce((q,W)=>q.concat(W))}function v4(Z,J){if(J&1)return 2;let Q=J>>1,X=Z.status[Q];if(X==4)throw Error("Cyclic dependency between fields and/or facets");if(X&2)return X;Z.status[Q]=4;let Y=Z.computeSlot(Z,Z.config.dynamicSlots[Q]);return Z.status[Q]=2|Y}function vZ(Z,J){return J&1?Z.config.staticValues[J>>1]:Z.values[J>>1]}var Xz=r.define(),OY=r.define({combine:(Z)=>Z.some((J)=>J),static:!0}),Yz=r.define({combine:(Z)=>Z.length?Z[0]:void 0,static:!0}),Kz=r.define(),qz=r.define(),Wz=r.define(),Gz=r.define({combine:(Z)=>Z.length?Z[0]:!1});class M6{constructor(Z,J){this.type=Z,this.value=J}static define(){return new Uz}}class Uz{of(Z){return new M6(this,Z)}}class zz{constructor(Z){this.map=Z}of(Z){return new D1(this,Z)}}class D1{constructor(Z,J){this.type=Z,this.value=J}map(Z){let J=this.type.map(this.value,Z);return J===void 0?void 0:J==this.value?this:new D1(this.type,J)}is(Z){return this.type==Z}static define(Z={}){return new zz(Z.map||((J)=>J))}static mapEffects(Z,J){if(!Z.length)return Z;let Q=[];for(let X of Z){let Y=X.map(J);if(Y)Q.push(Y)}return Q}}D1.reconfigure=D1.define();D1.appendConfig=D1.define();class s1{constructor(Z,J,Q,X,Y,K){if(this.startState=Z,this.changes=J,this.selection=Q,this.effects=X,this.annotations=Y,this.scrollIntoView=K,this._doc=null,this._state=null,Q)Qz(Q,J.newLength);if(!Y.some((q)=>q.type==s1.time))this.annotations=Y.concat(s1.time.of(Date.now()))}static create(Z,J,Q,X,Y,K){return new s1(Z,J,Q,X,Y,K)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){if(!this._state)this.startState.applyTransaction(this);return this._state}annotation(Z){for(let J of this.annotations)if(J.type==Z)return J.value;return}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(Z){let J=this.annotation(s1.userEvent);return!!(J&&(J==Z||J.length>Z.length&&J.slice(0,Z.length)==Z&&J[Z.length]=="."))}}s1.time=M6.define();s1.userEvent=M6.define();s1.addToHistory=M6.define();s1.remote=M6.define();function QD(Z,J){let Q=[];for(let X=0,Y=0;;){let K,q;if(X<Z.length&&(Y==J.length||J[Y]>=Z[X]))K=Z[X++],q=Z[X++];else if(Y<J.length)K=J[Y++],q=J[Y++];else return Q;if(!Q.length||Q[Q.length-1]<K)Q.push(K,q);else if(Q[Q.length-1]<q)Q[Q.length-1]=q}}function Iz(Z,J,Q){var X;let Y,K,q;if(Q)Y=J.changes,K=l1.empty(J.changes.length),q=Z.changes.compose(J.changes);else Y=J.changes.map(Z.changes),K=Z.changes.mapDesc(J.changes,!0),q=Z.changes.compose(Y);return{changes:q,selection:J.selection?J.selection.map(K):(X=Z.selection)===null||X===void 0?void 0:X.map(Y),effects:D1.mapEffects(Z.effects,Y).concat(D1.mapEffects(J.effects,K)),annotations:Z.annotations.length?Z.annotations.concat(J.annotations):J.annotations,scrollIntoView:Z.scrollIntoView||J.scrollIntoView}}function FY(Z,J,Q){let X=J.selection,Y=N7(J.annotations);if(J.userEvent)Y=Y.concat(s1.userEvent.of(J.userEvent));return{changes:J.changes instanceof l1?J.changes:l1.of(J.changes||[],Q,Z.facet(Yz)),selection:X&&(X instanceof y?X:y.single(X.anchor,X.head)),effects:N7(J.effects),annotations:Y,scrollIntoView:!!J.scrollIntoView}}function Vz(Z,J,Q){let X=FY(Z,J.length?J[0]:{},Z.doc.length);if(J.length&&J[0].filter===!1)Q=!1;for(let K=1;K<J.length;K++){if(J[K].filter===!1)Q=!1;let q=!!J[K].sequential;X=Iz(X,FY(Z,J[K],q?X.changes.newLength:Z.doc.length),q)}let Y=s1.create(Z,X.changes,X.selection,X.effects,X.annotations,X.scrollIntoView);return YD(Q?XD(Y):Y)}function XD(Z){let J=Z.startState,Q=!0;for(let Y of J.facet(Kz)){let K=Y(Z);if(K===!1){Q=!1;break}if(Array.isArray(K))Q=Q===!0?K:QD(Q,K)}if(Q!==!0){let Y,K;if(Q===!1)K=Z.changes.invertedDesc,Y=l1.empty(J.doc.length);else{let q=Z.changes.filter(Q);Y=q.changes,K=q.filtered.mapDesc(q.changes).invertedDesc}Z=s1.create(J,Y,Z.selection&&Z.selection.map(K),D1.mapEffects(Z.effects,K),Z.annotations,Z.scrollIntoView)}let X=J.facet(qz);for(let Y=X.length-1;Y>=0;Y--){let K=X[Y](Z);if(K instanceof s1)Z=K;else if(Array.isArray(K)&&K.length==1&&K[0]instanceof s1)Z=K[0];else Z=Vz(J,N7(K),!1)}return Z}function YD(Z){let J=Z.startState,Q=J.facet(Wz),X=Z;for(let Y=Q.length-1;Y>=0;Y--){let K=Q[Y](Z);if(K&&Object.keys(K).length)X=Iz(X,FY(J,K,Z.changes.newLength),!0)}return X==Z?Z:s1.create(J,Z.changes,Z.selection,X.effects,X.annotations,X.scrollIntoView)}var KD=[];function N7(Z){return Z==null?KD:Array.isArray(Z)?Z:[Z]}var R6=function(Z){return Z[Z.Word=0]="Word",Z[Z.Space=1]="Space",Z[Z.Other=2]="Other",Z}(R6||(R6={})),qD=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,NY;try{NY=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch(Z){}function WD(Z){if(NY)return NY.test(Z);for(let J=0;J<Z.length;J++){let Q=Z[J];if(/\w/.test(Q)||Q>""&&(Q.toUpperCase()!=Q.toLowerCase()||qD.test(Q)))return!0}return!1}function GD(Z){return(J)=>{if(!/\S/.test(J))return R6.Space;if(WD(J))return R6.Word;for(let Q=0;Q<Z.length;Q++)if(J.indexOf(Z[Q])>-1)return R6.Word;return R6.Other}}class R1{constructor(Z,J,Q,X,Y,K){if(this.config=Z,this.doc=J,this.selection=Q,this.values=X,this.status=Z.statusTemplate.slice(),this.computeSlot=Y,K)K._state=this;for(let q=0;q<this.config.dynamicSlots.length;q++)v4(this,q<<1);this.computeSlot=null}field(Z,J=!0){let Q=this.config.address[Z.id];if(Q==null){if(J)throw RangeError("Field is not present in this state");return}return v4(this,Q),vZ(this,Q)}update(...Z){return Vz(this,Z,!0)}applyTransaction(Z){let J=this.config,{base:Q,compartments:X}=J;for(let q of Z.effects)if(q.is(C9.reconfigure)){if(J)X=new Map,J.compartments.forEach((W,G)=>X.set(G,W)),J=null;X.set(q.value.compartment,q.value.extension)}else if(q.is(D1.reconfigure))J=null,Q=q.value;else if(q.is(D1.appendConfig))J=null,Q=N7(Q).concat(q.value);let Y;if(!J)J=uZ.resolve(Q,X,this),Y=new R1(J,this.doc,this.selection,J.dynamicSlots.map(()=>null),(W,G)=>G.reconfigure(W,this),null).values;else Y=Z.startState.values.slice();let K=Z.startState.facet(OY)?Z.newSelection:Z.newSelection.asSingle();new R1(J,Z.newDoc,K,Y,(q,W)=>W.update(q,Z),Z)}replaceSelection(Z){if(typeof Z=="string")Z=this.toText(Z);return this.changeByRange((J)=>({changes:{from:J.from,to:J.to,insert:Z},range:y.cursor(J.from+Z.length)}))}changeByRange(Z){let J=this.selection,Q=Z(J.ranges[0]),X=this.changes(Q.changes),Y=[Q.range],K=N7(Q.effects);for(let q=1;q<J.ranges.length;q++){let W=Z(J.ranges[q]),G=this.changes(W.changes),U=G.map(X);for(let I=0;I<q;I++)Y[I]=Y[I].map(U);let z=X.mapDesc(G,!0);Y.push(W.range.map(z)),X=X.compose(U),K=D1.mapEffects(K,U).concat(D1.mapEffects(N7(W.effects),z))}return{changes:X,selection:y.create(Y,J.mainIndex),effects:K}}changes(Z=[]){if(Z instanceof l1)return Z;return l1.of(Z,this.doc.length,this.facet(R1.lineSeparator))}toText(Z){return O1.of(Z.split(this.facet(R1.lineSeparator)||IY))}sliceDoc(Z=0,J=this.doc.length){return this.doc.sliceString(Z,J,this.lineBreak)}facet(Z){let J=this.config.address[Z.id];if(J==null)return Z.default;return v4(this,J),vZ(this,J)}toJSON(Z){let J={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(Z)for(let Q in Z){let X=Z[Q];if(X instanceof H0&&this.config.address[X.id]!=null)J[Q]=X.spec.toJSON(this.field(Z[Q]),this)}return J}static fromJSON(Z,J={},Q){if(!Z||typeof Z.doc!="string")throw RangeError("Invalid JSON representation for EditorState");let X=[];if(Q){for(let Y in Q)if(Object.prototype.hasOwnProperty.call(Z,Y)){let K=Q[Y],q=Z[Y];X.push(K.init((W)=>K.spec.fromJSON(q,W)))}}return R1.create({doc:Z.doc,selection:y.fromJSON(Z.selection),extensions:J.extensions?X.concat([J.extensions]):X})}static create(Z={}){let J=uZ.resolve(Z.extensions||[],new Map),Q=Z.doc instanceof O1?Z.doc:O1.of((Z.doc||"").split(J.staticFacet(R1.lineSeparator)||IY)),X=!Z.selection?y.single(0):Z.selection instanceof y?Z.selection:y.single(Z.selection.anchor,Z.selection.head);if(Qz(X,Q.length),!J.staticFacet(OY))X=X.asSingle();return new R1(J,Q,X,J.dynamicSlots.map(()=>null),(Y,K)=>K.create(Y),null)}get tabSize(){return this.facet(R1.tabSize)}get lineBreak(){return this.facet(R1.lineSeparator)||`
`}get readOnly(){return this.facet(Gz)}phrase(Z,...J){for(let Q of this.facet(R1.phrases))if(Object.prototype.hasOwnProperty.call(Q,Z)){Z=Q[Z];break}if(J.length)Z=Z.replace(/\$(\$|\d*)/g,(Q,X)=>{if(X=="$")return"$";let Y=+(X||1);return!Y||Y>J.length?Q:J[Y-1]});return Z}languageDataAt(Z,J,Q=-1){let X=[];for(let Y of this.facet(Xz))for(let K of Y(this,J,Q))if(Object.prototype.hasOwnProperty.call(K,Z))X.push(K[Z]);return X}charCategorizer(Z){let J=this.languageDataAt("wordChars",Z);return GD(J.length?J[0]:"")}wordAt(Z){let{text:J,from:Q,length:X}=this.doc.lineAt(Z),Y=this.charCategorizer(Z),K=Z-Q,q=Z-Q;while(K>0){let W=K0(J,K,!1);if(Y(J.slice(W,K))!=R6.Word)break;K=W}while(q<X){let W=K0(J,q);if(Y(J.slice(q,W))!=R6.Word)break;q=W}return K==q?null:y.range(K+Q,q+Q)}}R1.allowMultipleSelections=OY;R1.tabSize=r.define({combine:(Z)=>Z.length?Z[0]:4});R1.lineSeparator=Yz;R1.readOnly=Gz;R1.phrases=r.define({compare(Z,J){let Q=Object.keys(Z),X=Object.keys(J);return Q.length==X.length&&Q.every((Y)=>Z[Y]==J[Y])}});R1.languageData=Xz;R1.changeFilter=Kz;R1.transactionFilter=qz;R1.transactionExtender=Wz;C9.reconfigure=D1.define();function R8(Z,J,Q={}){let X={};for(let Y of Z)for(let K of Object.keys(Y)){let q=Y[K],W=X[K];if(W===void 0)X[K]=q;else if(W===q||q===void 0);else if(Object.hasOwnProperty.call(Q,K))X[K]=Q[K](W,q);else throw Error("Config merge conflict for field "+K)}for(let Y in J)if(X[Y]===void 0)X[Y]=J[Y];return X}class O8{eq(Z){return this==Z}range(Z,J=Z){return m4.create(Z,J,this)}}O8.prototype.startSide=O8.prototype.endSide=0;O8.prototype.point=!1;O8.prototype.mapMode=A0.TrackDel;function TY(Z,J){return Z==J||Z.constructor==J.constructor&&Z.eq(J)}class m4{constructor(Z,J,Q){this.from=Z,this.to=J,this.value=Q}static create(Z,J,Q){return new m4(Z,J,Q)}}function RY(Z,J){return Z.from-J.from||Z.value.startSide-J.value.startSide}class SY{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.value=Q,this.maxPoint=X}get length(){return this.to[this.to.length-1]}findIndex(Z,J,Q,X=0){let Y=Q?this.to:this.from;for(let K=X,q=Y.length;;){if(K==q)return K;let W=K+q>>1,G=Y[W]-Z||(Q?this.value[W].endSide:this.value[W].startSide)-J;if(W==K)return G>=0?K:q;if(G>=0)q=W;else K=W+1}}between(Z,J,Q,X){for(let Y=this.findIndex(J,-1e9,!0),K=this.findIndex(Q,1e9,!1,Y);Y<K;Y++)if(X(this.from[Y]+Z,this.to[Y]+Z,this.value[Y])===!1)return!1}map(Z,J){let Q=[],X=[],Y=[],K=-1,q=-1;for(let W=0;W<this.value.length;W++){let G=this.value[W],U=this.from[W]+Z,z=this.to[W]+Z,I,V;if(U==z){let O=J.mapPos(U,G.startSide,G.mapMode);if(O==null)continue;if(I=V=O,G.startSide!=G.endSide){if(V=J.mapPos(U,G.endSide),V<I)continue}}else if(I=J.mapPos(U,G.startSide),V=J.mapPos(z,G.endSide),I>V||I==V&&G.startSide>0&&G.endSide<=0)continue;if((V-I||G.endSide-G.startSide)<0)continue;if(K<0)K=I;if(G.point)q=Math.max(q,V-I);Q.push(G),X.push(I-K),Y.push(V-K)}return{mapped:Q.length?new SY(X,Y,Q,q):null,pos:K}}}class H1{constructor(Z,J,Q,X){this.chunkPos=Z,this.chunk=J,this.nextLayer=Q,this.maxPoint=X}static create(Z,J,Q,X){return new H1(Z,J,Q,X)}get length(){let Z=this.chunk.length-1;return Z<0?0:Math.max(this.chunkEnd(Z),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let Z=this.nextLayer.size;for(let J of this.chunk)Z+=J.value.length;return Z}chunkEnd(Z){return this.chunkPos[Z]+this.chunk[Z].length}update(Z){let{add:J=[],sort:Q=!1,filterFrom:X=0,filterTo:Y=this.length}=Z,K=Z.filter;if(J.length==0&&!K)return this;if(Q)J=J.slice().sort(RY);if(this.isEmpty)return J.length?H1.of(J):this;let q=new EY(this,null,-1).goto(0),W=0,G=[],U=new F8;while(q.value||W<J.length)if(W<J.length&&(q.from-J[W].from||q.startSide-J[W].value.startSide)>=0){let z=J[W++];if(!U.addInner(z.from,z.to,z.value))G.push(z)}else if(q.rangeIndex==1&&q.chunkIndex<this.chunk.length&&(W==J.length||this.chunkEnd(q.chunkIndex)<J[W].from)&&(!K||X>this.chunkEnd(q.chunkIndex)||Y<this.chunkPos[q.chunkIndex])&&U.addChunk(this.chunkPos[q.chunkIndex],this.chunk[q.chunkIndex]))q.nextChunk();else{if(!K||X>q.to||Y<q.from||K(q.from,q.to,q.value)){if(!U.addInner(q.from,q.to,q.value))G.push(m4.create(q.from,q.to,q.value))}q.next()}return U.finishInner(this.nextLayer.isEmpty&&!G.length?H1.empty:this.nextLayer.update({add:G,filter:K,filterFrom:X,filterTo:Y}))}map(Z){if(Z.empty||this.isEmpty)return this;let J=[],Q=[],X=-1;for(let K=0;K<this.chunk.length;K++){let q=this.chunkPos[K],W=this.chunk[K],G=Z.touchesRange(q,q+W.length);if(G===!1)X=Math.max(X,W.maxPoint),J.push(W),Q.push(Z.mapPos(q));else if(G===!0){let{mapped:U,pos:z}=W.map(q,Z);if(U)X=Math.max(X,U.maxPoint),J.push(U),Q.push(z)}}let Y=this.nextLayer.map(Z);return J.length==0?Y:new H1(Q,J,Y||H1.empty,X)}between(Z,J,Q){if(this.isEmpty)return;for(let X=0;X<this.chunk.length;X++){let Y=this.chunkPos[X],K=this.chunk[X];if(J>=Y&&Z<=Y+K.length&&K.between(Y,Z-Y,J-Y,Q)===!1)return}this.nextLayer.between(Z,J,Q)}iter(Z=0){return p4.from([this]).goto(Z)}get isEmpty(){return this.nextLayer==this}static iter(Z,J=0){return p4.from(Z).goto(J)}static compare(Z,J,Q,X,Y=-1){let K=Z.filter((z)=>z.maxPoint>0||!z.isEmpty&&z.maxPoint>=Y),q=J.filter((z)=>z.maxPoint>0||!z.isEmpty&&z.maxPoint>=Y),W=rU(K,q,Q),G=new O7(K,W,Y),U=new O7(q,W,Y);if(Q.iterGaps((z,I,V)=>aU(G,z,U,I,V,X)),Q.empty&&Q.length==0)aU(G,0,U,0,0,X)}static eq(Z,J,Q=0,X){if(X==null)X=999999999;let Y=Z.filter((U)=>!U.isEmpty&&J.indexOf(U)<0),K=J.filter((U)=>!U.isEmpty&&Z.indexOf(U)<0);if(Y.length!=K.length)return!1;if(!Y.length)return!0;let q=rU(Y,K),W=new O7(Y,q,0).goto(Q),G=new O7(K,q,0).goto(Q);for(;;){if(W.to!=G.to||!DY(W.active,G.active)||W.point&&(!G.point||!TY(W.point,G.point)))return!1;if(W.to>X)return!0;W.next(),G.next()}}static spans(Z,J,Q,X,Y=-1){let K=new O7(Z,null,Y).goto(J),q=J,W=K.openStart;for(;;){let G=Math.min(K.to,Q);if(K.point){let U=K.activeForPoint(K.to),z=K.pointFrom<J?U.length+1:K.point.startSide<0?U.length:Math.min(U.length,W);X.point(q,G,K.point,U,z,K.pointRank),W=Math.min(K.openEnd(G),U.length)}else if(G>q)X.span(q,G,K.active,W),W=K.openEnd(G);if(K.to>Q)return W+(K.point&&K.to>Q?1:0);q=K.to,K.next()}}static of(Z,J=!1){let Q=new F8;for(let X of Z instanceof m4?[Z]:J?UD(Z):Z)Q.add(X.from,X.to,X.value);return Q.finish()}static join(Z){if(!Z.length)return H1.empty;let J=Z[Z.length-1];for(let Q=Z.length-2;Q>=0;Q--)for(let X=Z[Q];X!=H1.empty;X=X.nextLayer)J=new H1(X.chunkPos,X.chunk,J,Math.max(X.maxPoint,J.maxPoint));return J}}H1.empty=new H1([],[],null,-1);function UD(Z){if(Z.length>1)for(let J=Z[0],Q=1;Q<Z.length;Q++){let X=Z[Q];if(RY(J,X)>0)return Z.slice().sort(RY);J=X}return Z}H1.empty.nextLayer=H1.empty;class F8{finishChunk(Z){if(this.chunks.push(new SY(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,Z)this.from=[],this.to=[],this.value=[]}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(Z,J,Q){if(!this.addInner(Z,J,Q))(this.nextLayer||(this.nextLayer=new F8)).add(Z,J,Q)}addInner(Z,J,Q){let X=Z-this.lastTo||Q.startSide-this.last.endSide;if(X<=0&&(Z-this.lastFrom||Q.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");if(X<0)return!1;if(this.from.length==250)this.finishChunk(!0);if(this.chunkStart<0)this.chunkStart=Z;if(this.from.push(Z-this.chunkStart),this.to.push(J-this.chunkStart),this.last=Q,this.lastFrom=Z,this.lastTo=J,this.value.push(Q),Q.point)this.maxPoint=Math.max(this.maxPoint,J-Z);return!0}addChunk(Z,J){if((Z-this.lastTo||J.value[0].startSide-this.last.endSide)<0)return!1;if(this.from.length)this.finishChunk(!0);this.setMaxPoint=Math.max(this.setMaxPoint,J.maxPoint),this.chunks.push(J),this.chunkPos.push(Z);let Q=J.value.length-1;return this.last=J.value[Q],this.lastFrom=J.from[Q]+Z,this.lastTo=J.to[Q]+Z,!0}finish(){return this.finishInner(H1.empty)}finishInner(Z){if(this.from.length)this.finishChunk(!1);if(this.chunks.length==0)return Z;let J=H1.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(Z):Z,this.setMaxPoint);return this.from=null,J}}function rU(Z,J,Q){let X=new Map;for(let K of Z)for(let q=0;q<K.chunk.length;q++)if(K.chunk[q].maxPoint<=0)X.set(K.chunk[q],K.chunkPos[q]);let Y=new Set;for(let K of J)for(let q=0;q<K.chunk.length;q++){let W=X.get(K.chunk[q]);if(W!=null&&(Q?Q.mapPos(W):W)==K.chunkPos[q]&&!(Q===null||Q===void 0?void 0:Q.touchesRange(W,W+K.chunk[q].length)))Y.add(K.chunk[q])}return Y}class EY{constructor(Z,J,Q,X=0){this.layer=Z,this.skip=J,this.minPoint=Q,this.rank=X}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(Z,J=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(Z,J,!1),this}gotoInner(Z,J,Q){while(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(X)||this.layer.chunkEnd(this.chunkIndex)<Z||X.maxPoint<this.minPoint))break;this.chunkIndex++,Q=!1}if(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex].findIndex(Z-this.layer.chunkPos[this.chunkIndex],J,!0);if(!Q||this.rangeIndex<X)this.setRangeIndex(X)}this.next()}forward(Z,J){if((this.to-Z||this.endSide-J)<0)this.gotoInner(Z,J,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let Z=this.layer.chunkPos[this.chunkIndex],J=this.layer.chunk[this.chunkIndex],Q=Z+J.from[this.rangeIndex];if(this.from=Q,this.to=Z+J.to[this.rangeIndex],this.value=J.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(Z){if(Z==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)while(this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]))this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=Z}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(Z){return this.from-Z.from||this.startSide-Z.startSide||this.rank-Z.rank||this.to-Z.to||this.endSide-Z.endSide}}class p4{constructor(Z){this.heap=Z}static from(Z,J=null,Q=-1){let X=[];for(let Y=0;Y<Z.length;Y++)for(let K=Z[Y];!K.isEmpty;K=K.nextLayer)if(K.maxPoint>=Q)X.push(new EY(K,J,Q,Y));return X.length==1?X[0]:new p4(X)}get startSide(){return this.value?this.value.startSide:0}goto(Z,J=-1e9){for(let Q of this.heap)Q.goto(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)zY(this.heap,Q);return this.next(),this}forward(Z,J){for(let Q of this.heap)Q.forward(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)zY(this.heap,Q);if((this.to-Z||this.value.endSide-J)<0)this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let Z=this.heap[0];if(this.from=Z.from,this.to=Z.to,this.value=Z.value,this.rank=Z.rank,Z.value)Z.next();zY(this.heap,0)}}}function zY(Z,J){for(let Q=Z[J];;){let X=(J<<1)+1;if(X>=Z.length)break;let Y=Z[X];if(X+1<Z.length&&Y.compare(Z[X+1])>=0)Y=Z[X+1],X++;if(Q.compare(Y)<0)break;Z[X]=Q,Z[J]=Y,J=X}}class O7{constructor(Z,J,Q){this.minPoint=Q,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=p4.from(Z,J,Q)}goto(Z,J=-1e9){return this.cursor.goto(Z,J),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=Z,this.endSide=J,this.openStart=-1,this.next(),this}forward(Z,J){while(this.minActive>-1&&(this.activeTo[this.minActive]-Z||this.active[this.minActive].endSide-J)<0)this.removeActive(this.minActive);this.cursor.forward(Z,J)}removeActive(Z){$Z(this.active,Z),$Z(this.activeTo,Z),$Z(this.activeRank,Z),this.minActive=oU(this.active,this.activeTo)}addActive(Z){let J=0,{value:Q,to:X,rank:Y}=this.cursor;while(J<this.activeRank.length&&(Y-this.activeRank[J]||X-this.activeTo[J])>0)J++;if(hZ(this.active,J,Q),hZ(this.activeTo,J,X),hZ(this.activeRank,J,Y),Z)hZ(Z,J,this.cursor.from);this.minActive=oU(this.active,this.activeTo)}next(){let Z=this.to,J=this.point;this.point=null;let Q=this.openStart<0?[]:null;for(;;){let X=this.minActive;if(X>-1&&(this.activeTo[X]-this.cursor.from||this.active[X].endSide-this.cursor.startSide)<0){if(this.activeTo[X]>Z){this.to=this.activeTo[X],this.endSide=this.active[X].endSide;break}if(this.removeActive(X),Q)$Z(Q,X)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>Z){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let Y=this.cursor.value;if(!Y.point)this.addActive(Q),this.cursor.next();else if(J&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=Y,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=Y.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(Q){this.openStart=0;for(let X=Q.length-1;X>=0&&Q[X]<Z;X--)this.openStart++}}activeForPoint(Z){if(!this.active.length)return this.active;let J=[];for(let Q=this.active.length-1;Q>=0;Q--){if(this.activeRank[Q]<this.pointRank)break;if(this.activeTo[Q]>Z||this.activeTo[Q]==Z&&this.active[Q].endSide>=this.point.endSide)J.push(this.active[Q])}return J.reverse()}openEnd(Z){let J=0;for(let Q=this.activeTo.length-1;Q>=0&&this.activeTo[Q]>Z;Q--)J++;return J}}function aU(Z,J,Q,X,Y,K){Z.goto(J),Q.goto(X);let q=X+Y,W=X,G=X-J,U=!!K.boundChange;for(let z=!1;;){let I=Z.to+G-Q.to,V=I||Z.endSide-Q.endSide,O=V<0?Z.to+G:Q.to,F=Math.min(O,q);if(Z.point||Q.point){if(!(Z.point&&Q.point&&TY(Z.point,Q.point)&&DY(Z.activeForPoint(Z.to),Q.activeForPoint(Q.to))))K.comparePoint(W,F,Z.point,Q.point);z=!1}else{if(z)K.boundChange(W);if(F>W&&!DY(Z.active,Q.active))K.compareRange(W,F,Z.active,Q.active);if(U&&F<q&&(I||Z.openEnd(O)!=Q.openEnd(O)))z=!0}if(O>q)break;if(W=O,V<=0)Z.next();if(V>=0)Q.next()}}function DY(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(Z[Q]!=J[Q]&&!TY(Z[Q],J[Q]))return!1;return!0}function $Z(Z,J){for(let Q=J,X=Z.length-1;Q<X;Q++)Z[Q]=Z[Q+1];Z.pop()}function hZ(Z,J,Q){for(let X=Z.length-1;X>=J;X--)Z[X+1]=Z[X];Z[J]=Q}function oU(Z,J){let Q=-1,X=1e9;for(let Y=0;Y<J.length;Y++)if((J[Y]-X||Z[Y].endSide-Z[Q].endSide)<0)Q=Y,X=J[Y];return Q}function _9(Z,J,Q=Z.length){let X=0;for(let Y=0;Y<Q&&Y<Z.length;)if(Z.charCodeAt(Y)==9)X+=J-X%J,Y++;else X++,Y=K0(Z,Y);return X}function jz(Z,J,Q,X){for(let Y=0,K=0;;){if(K>=J)return Y;if(Y==Z.length)break;K+=Z.charCodeAt(Y)==9?Q-K%Q:1,Y=K0(Z,Y)}return X===!0?-1:Z.length}var Hz=typeof Symbol>"u"?"__"+"ͼ":Symbol.for("ͼ"),CY=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),Oz=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class A6{constructor(Z,J){this.rules=[];let{finish:Q}=J||{};function X(K){return/^@/.test(K)?[K]:K.split(/,\s*/)}function Y(K,q,W,G){let U=[],z=/^@(\w+)\b/.exec(K[0]),I=z&&z[1]=="keyframes";if(z&&q==null)return W.push(K[0]+";");for(let V in q){let O=q[V];if(/&/.test(V))Y(V.split(/,\s*/).map((F)=>K.map((N)=>F.replace(/&/,N))).reduce((F,N)=>F.concat(N)),O,W);else if(O&&typeof O=="object"){if(!z)throw RangeError("The value of a property ("+V+") should be a primitive value.");Y(X(V),O,U,I)}else if(O!=null)U.push(V.replace(/_.*/,"").replace(/[A-Z]/g,(F)=>"-"+F.toLowerCase())+": "+O+";")}if(U.length||I)W.push((Q&&!z&&!G?K.map(Q):K).join(", ")+" {"+U.join(" ")+"}")}for(let K in Z)Y(X(K),Z[K],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let Z=Oz[Hz]||1;return Oz[Hz]=Z+1,"ͼ"+Z.toString(36)}static mount(Z,J,Q){let X=Z[CY],Y=Q&&Q.nonce;if(!X)X=new Nz(Z,Y);else if(Y)X.setNonce(Y);X.mount(Array.isArray(J)?J:[J],Z)}}var Fz=new Map;class Nz{constructor(Z,J){let Q=Z.ownerDocument||Z,X=Q.defaultView;if(!Z.head&&Z.adoptedStyleSheets&&X.CSSStyleSheet){let Y=Fz.get(Q);if(Y)return Z[CY]=Y;this.sheet=new X.CSSStyleSheet,Fz.set(Q,this)}else if(this.styleTag=Q.createElement("style"),J)this.styleTag.setAttribute("nonce",J);this.modules=[],Z[CY]=this}mount(Z,J){let Q=this.sheet,X=0,Y=0;for(let K=0;K<Z.length;K++){let q=Z[K],W=this.modules.indexOf(q);if(W<Y&&W>-1)this.modules.splice(W,1),Y--,W=-1;if(W==-1){if(this.modules.splice(Y++,0,q),Q)for(let G=0;G<q.rules.length;G++)Q.insertRule(q.rules[G],X++)}else{while(Y<W)X+=this.modules[Y++].rules.length;X+=q.rules.length,Y++}}if(Q){if(J.adoptedStyleSheets.indexOf(this.sheet)<0)J.adoptedStyleSheets=[this.sheet,...J.adoptedStyleSheets]}else{let K="";for(let W=0;W<this.modules.length;W++)K+=this.modules[W].getRules()+`
`;this.styleTag.textContent=K;let q=J.head||J;if(this.styleTag.parentNode!=q)q.insertBefore(this.styleTag,q.firstChild)}}setNonce(Z){if(this.styleTag&&this.styleTag.getAttribute("nonce")!=Z)this.styleTag.setAttribute("nonce",Z)}}var D8={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},M7={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},zD=typeof navigator<"u"&&/Mac/.test(navigator.platform),ID=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(m1=0;m1<10;m1++)D8[48+m1]=D8[96+m1]=String(m1);var m1;for(m1=1;m1<=24;m1++)D8[m1+111]="F"+m1;var m1;for(m1=65;m1<=90;m1++)D8[m1]=String.fromCharCode(m1+32),M7[m1]=String.fromCharCode(m1);var m1;for(c4 in D8)if(!M7.hasOwnProperty(c4))M7[c4]=D8[c4];var c4;function Rz(Z){var J=zD&&Z.metaKey&&Z.shiftKey&&!Z.ctrlKey&&!Z.altKey||ID&&Z.shiftKey&&Z.key&&Z.key.length==1||Z.key=="Unidentified",Q=!J&&Z.key||(Z.shiftKey?M7:D8)[Z.keyCode]||Z.key||"Unidentified";if(Q=="Esc")Q="Escape";if(Q=="Del")Q="Delete";if(Q=="Left")Q="ArrowLeft";if(Q=="Up")Q="ArrowUp";if(Q=="Right")Q="ArrowRight";if(Q=="Down")Q="ArrowDown";return Q}function v0(){var Z=arguments[0];if(typeof Z=="string")Z=document.createElement(Z);var J=1,Q=arguments[1];if(Q&&typeof Q=="object"&&Q.nodeType==null&&!Array.isArray(Q)){for(var X in Q)if(Object.prototype.hasOwnProperty.call(Q,X)){var Y=Q[X];if(typeof Y=="string")Z.setAttribute(X,Y);else if(Y!=null)Z[X]=Y}J++}for(;J<arguments.length;J++)Dz(Z,arguments[J]);return Z}function Dz(Z,J){if(typeof J=="string")Z.appendChild(document.createTextNode(J));else if(J==null);else if(J.nodeType!=null)Z.appendChild(J);else if(Array.isArray(J))for(var Q=0;Q<J.length;Q++)Dz(Z,J[Q]);else throw RangeError("Unsupported child node: "+J)}var L0=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},fY=typeof document<"u"?document:{documentElement:{style:{}}},gY=/Edge\/(\d+)/.exec(L0.userAgent),JI=/MSIE \d/.test(L0.userAgent),uY=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(L0.userAgent),jJ=!!(JI||uY||gY),Mz=!jJ&&/gecko\/(\d+)/i.test(L0.userAgent),_Y=!jJ&&/Chrome\/(\d+)/.exec(L0.userAgent),Az="webkitFontSmoothing"in fY.documentElement.style,vY=!jJ&&/Apple Computer/.test(L0.vendor),Lz=vY&&(/Mobile\/\w+/.test(L0.userAgent)||L0.maxTouchPoints>2),i={mac:Lz||/Mac/.test(L0.platform),windows:/Win/.test(L0.platform),linux:/Linux|X11/.test(L0.platform),ie:jJ,ie_version:JI?fY.documentMode||6:uY?+uY[1]:gY?+gY[1]:0,gecko:Mz,gecko_version:Mz?+(/Firefox\/(\d+)/.exec(L0.userAgent)||[0,0])[1]:0,chrome:!!_Y,chrome_version:_Y?+_Y[1]:0,ios:Lz,android:/Android\b/.test(L0.userAgent),webkit:Az,webkit_version:Az?+(/\bAppleWebKit\/(\d+)/.exec(L0.userAgent)||[0,0])[1]:0,safari:vY,safari_version:vY?+(/\bVersion\/(\d+(\.\d+)?)/.exec(L0.userAgent)||[0,0])[1]:0,tabSize:fY.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function q3(Z,J){for(let Q in Z)if(Q=="class"&&J.class)J.class+=" "+Z.class;else if(Q=="style"&&J.style)J.style+=";"+Z.style;else J[Q]=Z[Q];return J}var YJ=Object.create(null);function W3(Z,J,Q){if(Z==J)return!0;if(!Z)Z=YJ;if(!J)J=YJ;let X=Object.keys(Z),Y=Object.keys(J);if(X.length-(Q&&X.indexOf(Q)>-1?1:0)!=Y.length-(Q&&Y.indexOf(Q)>-1?1:0))return!1;for(let K of X)if(K!=Q&&(Y.indexOf(K)==-1||Z[K]!==J[K]))return!1;return!0}function VD(Z,J){for(let Q=Z.attributes.length-1;Q>=0;Q--){let X=Z.attributes[Q].name;if(J[X]==null)Z.removeAttribute(X)}for(let Q in J){let X=J[Q];if(Q=="style")Z.style.cssText=X;else if(Z.getAttribute(Q)!=X)Z.setAttribute(Q,X)}}function Bz(Z,J,Q){let X=!1;if(J){for(let Y in J)if(!(Q&&(Y in Q)))if(X=!0,Y=="style")Z.style.cssText="";else Z.removeAttribute(Y)}if(Q){for(let Y in Q)if(!(J&&J[Y]==Q[Y]))if(X=!0,Y=="style")Z.style.cssText=Q[Y];else Z.setAttribute(Y,Q[Y])}return X}function jD(Z){let J=Object.create(null);for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];J[X.name]=X.value}return J}class l8{eq(Z){return!1}updateDOM(Z,J,Q){return!1}compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(Z){return!0}coordsAt(Z,J,Q){return null}get isHidden(){return!1}get editable(){return!1}destroy(Z){}}var U0=function(Z){return Z[Z.Text=0]="Text",Z[Z.WidgetBefore=1]="WidgetBefore",Z[Z.WidgetAfter=2]="WidgetAfter",Z[Z.WidgetRange=3]="WidgetRange",Z}(U0||(U0={}));class M1 extends O8{constructor(Z,J,Q,X){super();this.startSide=Z,this.endSide=J,this.widget=Q,this.spec=X}get heightRelevant(){return!1}static mark(Z){return new J5(Z)}static widget(Z){let J=Math.max(-1e4,Math.min(1e4,Z.side||0)),Q=!!Z.block;return J+=Q&&!Z.inlineOrder?J>0?300000000:-400000000:J>0?1e8:-1e8,new b9(Z,J,J,Q,Z.widget||null,!1)}static replace(Z){let J=!!Z.block,Q,X;if(Z.isBlockGap)Q=-500000000,X=400000000;else{let{start:Y,end:K}=QI(Z,J);Q=(Y?J?-300000000:-1:500000000)-1,X=(K?J?200000000:1:-600000000)+1}return new b9(Z,Q,X,J,Z.widget||null,!0)}static line(Z){return new Q5(Z)}static set(Z,J=!1){return H1.of(Z,J)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}M1.none=H1.empty;class J5 extends M1{constructor(Z){let{start:J,end:Q}=QI(Z);super(J?-1:500000000,Q?1:-600000000,null,Z);this.tagName=Z.tagName||"span",this.attrs=Z.class&&Z.attributes?q3(Z.attributes,{class:Z.class}):Z.class?{class:Z.class}:Z.attributes||YJ}eq(Z){return this==Z||Z instanceof J5&&this.tagName==Z.tagName&&W3(this.attrs,Z.attrs)}range(Z,J=Z){if(Z>=J)throw RangeError("Mark decorations may not be empty");return super.range(Z,J)}}J5.prototype.point=!1;class Q5 extends M1{constructor(Z){super(-200000000,-200000000,null,Z)}eq(Z){return Z instanceof Q5&&this.spec.class==Z.spec.class&&W3(this.spec.attributes,Z.spec.attributes)}range(Z,J=Z){if(J!=Z)throw RangeError("Line decoration ranges must be zero-length");return super.range(Z,J)}}Q5.prototype.mapMode=A0.TrackBefore;Q5.prototype.point=!0;class b9 extends M1{constructor(Z,J,Q,X,Y,K){super(J,Q,Y,Z);this.block=X,this.isReplace=K,this.mapMode=!X?A0.TrackDel:J<=0?A0.TrackBefore:A0.TrackAfter}get type(){return this.startSide!=this.endSide?U0.WidgetRange:this.startSide<=0?U0.WidgetBefore:U0.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(Z){return Z instanceof b9&&HD(this.widget,Z.widget)&&this.block==Z.block&&this.startSide==Z.startSide&&this.endSide==Z.endSide}range(Z,J=Z){if(this.isReplace&&(Z>J||Z==J&&this.startSide>0&&this.endSide<=0))throw RangeError("Invalid range for replacement decoration");if(!this.isReplace&&J!=Z)throw RangeError("Widget decorations can only have zero-length ranges");return super.range(Z,J)}}b9.prototype.point=!0;function QI(Z,J=!1){let{inclusiveStart:Q,inclusiveEnd:X}=Z;if(Q==null)Q=Z.inclusive;if(X==null)X=Z.inclusive;return{start:Q!==null&&Q!==void 0?Q:J,end:X!==null&&X!==void 0?X:J}}function HD(Z,J){return Z==J||!!(Z&&J&&Z.compare(J))}function P7(Z,J,Q,X=0){let Y=Q.length-1;if(Y>=0&&Q[Y]+X>=Z)Q[Y]=Math.max(Q[Y],J);else Q.push(Z,J)}class o4 extends O8{constructor(Z,J,Q){super();this.tagName=Z,this.attributes=J,this.rank=Q}eq(Z){return Z==this||Z instanceof o4&&this.tagName==Z.tagName&&W3(this.attributes,Z.attributes)}static create(Z){return new o4(Z.tagName,Z.attributes||YJ,Z.rank==null?50:Math.max(0,Math.min(Z.rank,100)))}static set(Z,J=!1){return H1.of(Z,J)}}o4.prototype.startSide=o4.prototype.endSide=-1;function t4(Z){let J;if(Z.nodeType==11)J=Z.getSelection?Z:Z.ownerDocument;else J=Z;return J.getSelection()}function mY(Z,J){return J?Z==J||Z.contains(J.nodeType!=1?J.parentNode:J):!1}function i4(Z,J){if(!J.anchorNode)return!1;try{return mY(Z,J.anchorNode)}catch(Q){return!1}}function aZ(Z){if(Z.nodeType==3)return e4(Z,0,Z.nodeValue.length).getClientRects();else if(Z.nodeType==1)return Z.getClientRects();else return[]}function r4(Z,J,Q,X){return Q?Pz(Z,J,Q,X,-1)||Pz(Z,J,Q,X,1):!1}function n8(Z){for(var J=0;;J++)if(Z=Z.previousSibling,!Z)return J}function KJ(Z){return Z.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(Z.nodeName)}function Pz(Z,J,Q,X,Y){for(;;){if(Z==Q&&J==X)return!0;if(J==(Y<0?0:L8(Z))){if(Z.nodeName=="DIV")return!1;let K=Z.parentNode;if(!K||K.nodeType!=1)return!1;J=n8(Z)+(Y<0?0:1),Z=K}else if(Z.nodeType==1){if(Z=Z.childNodes[J+(Y<0?-1:0)],Z.nodeType==1&&Z.contentEditable=="false")return!1;J=Y<0?L8(Z):0}else return!1}}function L8(Z){return Z.nodeType==3?Z.nodeValue.length:Z.childNodes.length}function qJ(Z,J){let{left:Q,right:X}=Z;if(Q==X)return Z;let Y=J?Q:X;return{left:Y,right:Y,top:Z.top,bottom:Z.bottom}}function OD(Z){let J=Z.visualViewport;if(J)return{left:0,right:J.width,top:0,bottom:J.height};return{left:0,right:Z.innerWidth,top:0,bottom:Z.innerHeight}}function XI(Z,J){let Q=J.width/Z.offsetWidth,X=J.height/Z.offsetHeight;if(Q>0.995&&Q<1.005||!isFinite(Q)||Math.abs(J.width-Z.offsetWidth)<1)Q=1;if(X>0.995&&X<1.005||!isFinite(X)||Math.abs(J.height-Z.offsetHeight)<1)X=1;return{scaleX:Q,scaleY:X}}function FD(Z,J,Q,X,Y,K,q,W){let G=Z.ownerDocument,U=G.defaultView||window;for(let z=Z,I=!1;z&&!I;)if(z.nodeType==1){let V,O=z==G.body,F=1,N=1;if(O)V=OD(U);else{if(/^(fixed|sticky)$/.test(getComputedStyle(z).position))I=!0;if(z.scrollHeight<=z.clientHeight&&z.scrollWidth<=z.clientWidth){z=z.assignedSlot||z.parentNode;continue}let T=z.getBoundingClientRect();({scaleX:F,scaleY:N}=XI(z,T)),V={left:T.left,right:T.left+z.clientWidth*F,top:T.top,bottom:T.top+z.clientHeight*N}}let R=0,P=0;if(Y=="nearest"){if(J.top<V.top+q){if(P=J.top-(V.top+q),Q>0&&J.bottom>V.bottom+P)P=J.bottom-V.bottom+q}else if(J.bottom>V.bottom-q){if(P=J.bottom-V.bottom+q,Q<0&&J.top-P<V.top)P=J.top-(V.top+q)}}else{let T=J.bottom-J.top,C=V.bottom-V.top;P=(Y=="center"&&T<=C?J.top+T/2-C/2:Y=="start"||Y=="center"&&Q<0?J.top-q:J.bottom-C+q)-V.top}if(X=="nearest"){if(J.left<V.left+K){if(R=J.left-(V.left+K),Q>0&&J.right>V.right+R)R=J.right-V.right+K}else if(J.right>V.right-K){if(R=J.right-V.right+K,Q<0&&J.left<V.left+R)R=J.left-(V.left+K)}}else R=(X=="center"?J.left+(J.right-J.left)/2-(V.right-V.left)/2:X=="start"==W?J.left-K:J.right-(V.right-V.left)+K)-V.left;if(R||P)if(O)U.scrollBy(R,P);else{let T=0,C=0;if(P){let _=z.scrollTop;z.scrollTop+=P/N,C=(z.scrollTop-_)*N}if(R){let _=z.scrollLeft;z.scrollLeft+=R/F,T=(z.scrollLeft-_)*F}if(J={left:J.left-T,top:J.top-C,right:J.right-T,bottom:J.bottom-C},T&&Math.abs(T-R)<1)X="nearest";if(C&&Math.abs(C-P)<1)Y="nearest"}if(O)break;if(J.top<V.top||J.bottom>V.bottom||J.left<V.left||J.right>V.right)J={left:Math.max(J.left,V.left),right:Math.min(J.right,V.right),top:Math.max(J.top,V.top),bottom:Math.min(J.bottom,V.bottom)};z=z.assignedSlot||z.parentNode}else if(z.nodeType==11)z=z.host;else break}function YI(Z,J=!0){let Q=Z.ownerDocument,X=null,Y=null;for(let K=Z.parentNode;K;)if(K==Q.body||(!J||X)&&Y)break;else if(K.nodeType==1){if(!Y&&K.scrollHeight>K.clientHeight)Y=K;if(J&&!X&&K.scrollWidth>K.clientWidth)X=K;K=K.assignedSlot||K.parentNode}else if(K.nodeType==11)K=K.host;else break;return{x:X,y:Y}}class KI{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(Z){return this.anchorNode==Z.anchorNode&&this.anchorOffset==Z.anchorOffset&&this.focusNode==Z.focusNode&&this.focusOffset==Z.focusOffset}setRange(Z){let{anchorNode:J,focusNode:Q}=Z;this.set(J,Math.min(Z.anchorOffset,J?L8(J):0),Q,Math.min(Z.focusOffset,Q?L8(Q):0))}set(Z,J,Q,X){this.anchorNode=Z,this.anchorOffset=J,this.focusNode=Q,this.focusOffset=X}}function qI(Z){let J=[];for(let Q=Z;Q;Q=Q.nodeType==11?Q.host:Q.parentNode)if(Q.nodeType==1)J.push({node:Q,left:Q.scrollLeft,top:Q.scrollTop});return J}function WI(Z,J=!0){for(let{node:Q,left:X,top:Y}of Z){if(J&&Q.scrollTop!=Y)Q.scrollTop=Y;if(Q.scrollLeft!=X)Q.scrollLeft=X}}var k9=null;if(i.safari&&i.safari_version>=26)k9=!1;function GI(Z){if(Z.setActive)return Z.setActive();if(k9)return Z.focus(k9);let J=qI(Z);if(Z.focus(k9==null?{get preventScroll(){return k9={preventScroll:!0},!0}}:void 0),!k9)k9=!1,WI(J)}var Tz;function e4(Z,J,Q=J){let X=Tz||(Tz=document.createRange());return X.setEnd(Z,Q),X.setStart(Z,J),X}function T7(Z,J,Q,X){let Y={key:J,code:J,keyCode:Q,which:Q,cancelable:!0};if(X)({altKey:Y.altKey,ctrlKey:Y.ctrlKey,shiftKey:Y.shiftKey,metaKey:Y.metaKey}=X);let K=new KeyboardEvent("keydown",Y);K.synthetic=!0,Z.dispatchEvent(K);let q=new KeyboardEvent("keyup",Y);return q.synthetic=!0,Z.dispatchEvent(q),K.defaultPrevented||q.defaultPrevented}function ND(Z){while(Z){if(Z&&(Z.nodeType==9||Z.nodeType==11&&Z.host))return Z;Z=Z.assignedSlot||Z.parentNode}return null}function RD(Z,J){let{focusNode:Q,focusOffset:X}=J;if(!Q||J.anchorNode!=Q||J.anchorOffset!=X)return!1;X=Math.min(X,L8(Q));for(;;)if(X){if(Q.nodeType!=1)return!1;let Y=Q.childNodes[X-1];if(Y.contentEditable=="false")X--;else Q=Y,X=L8(Q)}else if(Q==Z)return!0;else X=n8(Q),Q=Q.parentNode}function UI(Z){if(Z instanceof Window)return Z.pageYOffset>Math.max(0,Z.document.documentElement.scrollHeight-Z.innerHeight-4);return Z.scrollTop>Math.max(1,Z.scrollHeight-Z.clientHeight-4)}function zI(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X>0)return{node:Q,offset:X};else if(Q.nodeType==1&&X>0){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X-1],X=L8(Q)}else if(Q.parentNode&&!KJ(Q))X=n8(Q),Q=Q.parentNode;else return null}function II(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X<Q.nodeValue.length)return{node:Q,offset:X};else if(Q.nodeType==1&&X<Q.childNodes.length){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X],X=0}else if(Q.parentNode&&!KJ(Q))X=n8(Q)+1,Q=Q.parentNode;else return null}class P6{constructor(Z,J,Q=!0){this.node=Z,this.offset=J,this.precise=Q}static before(Z,J){return new P6(Z.parentNode,n8(Z),J)}static after(Z,J){return new P6(Z.parentNode,n8(Z)+1,J)}}var C1=function(Z){return Z[Z.LTR=0]="LTR",Z[Z.RTL=1]="RTL",Z}(C1||(C1={})),y9=C1.LTR,G3=C1.RTL;function VI(Z){let J=[];for(let Q=0;Q<Z.length;Q++)J.push(1<<+Z[Q]);return J}var DD=VI("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),MD=VI("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),pY=Object.create(null),s6=[];for(let Z of["()","[]","{}"]){let J=Z.charCodeAt(0),Q=Z.charCodeAt(1);pY[J]=Q,pY[Q]=-J}function jI(Z){return Z<=247?DD[Z]:1424<=Z&&Z<=1524?2:1536<=Z&&Z<=1785?MD[Z-1536]:1774<=Z&&Z<=2220?4:8192<=Z&&Z<=8204?256:64336<=Z&&Z<=65023?4:1}var AD=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class T6{get dir(){return this.level%2?G3:y9}constructor(Z,J,Q){this.from=Z,this.to=J,this.level=Q}side(Z,J){return this.dir==J==Z?this.to:this.from}forward(Z,J){return Z==(this.dir==J)}static find(Z,J,Q,X){let Y=-1;for(let K=0;K<Z.length;K++){let q=Z[K];if(q.from<=J&&q.to>=J){if(q.level==Q)return K;if(Y<0||(X!=0?X<0?q.from<J:q.to>J:Z[Y].level>q.level))Y=K}}if(Y<0)throw RangeError("Index out of range");return Y}}function HI(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.direction!=Y.direction||!HI(X.inner,Y.inner))return!1}return!0}var x1=[];function LD(Z,J,Q,X,Y){for(let K=0;K<=X.length;K++){let q=K?X[K-1].to:J,W=K<X.length?X[K].from:Q,G=K?256:Y;for(let U=q,z=G,I=G;U<W;U++){let V=jI(Z.charCodeAt(U));if(V==512)V=z;else if(V==8&&I==4)V=16;if(x1[U]=V==4?2:V,V&7)I=V;z=V}for(let U=q,z=G,I=G;U<W;U++){let V=x1[U];if(V==128)if(U<W-1&&z==x1[U+1]&&z&24)V=x1[U]=z;else x1[U]=256;else if(V==64){let O=U+1;while(O<W&&x1[O]==64)O++;let F=U&&z==8||O<Q&&x1[O]==8?I==1?1:8:256;for(let N=U;N<O;N++)x1[N]=F;U=O-1}else if(V==8&&I==1)x1[U]=1;if(z=V,V&7)I=V}}}function BD(Z,J,Q,X,Y){let K=Y==1?2:1;for(let q=0,W=0,G=0;q<=X.length;q++){let U=q?X[q-1].to:J,z=q<X.length?X[q].from:Q;for(let I=U,V,O,F;I<z;I++)if(O=pY[V=Z.charCodeAt(I)])if(O<0){for(let N=W-3;N>=0;N-=3)if(s6[N+1]==-O){let R=s6[N+2],P=R&2?Y:!(R&4)?0:R&1?K:Y;if(P)x1[I]=x1[s6[N]]=P;W=N;break}}else if(s6.length==189)break;else s6[W++]=I,s6[W++]=V,s6[W++]=G;else if((F=x1[I])==2||F==1){let N=F==Y;G=N?0:1;for(let R=W-3;R>=0;R-=3){let P=s6[R+2];if(P&2)break;if(N)s6[R+2]|=2;else{if(P&4)break;s6[R+2]|=4}}}}}function PD(Z,J,Q,X){for(let Y=0,K=X;Y<=Q.length;Y++){let q=Y?Q[Y-1].to:Z,W=Y<Q.length?Q[Y].from:J;for(let G=q;G<W;){let U=x1[G];if(U==256){let z=G+1;for(;;)if(z==W){if(Y==Q.length)break;z=Q[Y++].to,W=Y<Q.length?Q[Y].from:J}else if(x1[z]==256)z++;else break;let I=K==1,V=(z<J?x1[z]:X)==1,O=I==V?I?1:2:X;for(let F=z,N=Y,R=N?Q[N-1].to:Z;F>G;){if(F==R)F=Q[--N].from,R=N?Q[N-1].to:Z;x1[--F]=O}G=z}else K=U,G++}}}function cY(Z,J,Q,X,Y,K,q){let W=X%2?2:1;if(X%2==Y%2)for(let G=J,U=0;G<Q;){let z=!0,I=!1;if(U==K.length||G<K[U].from){let N=x1[G];if(N!=W)z=!1,I=N==16}let V=!z&&W==1?[]:null,O=z?X:X+1,F=G;Z:for(;;)if(U<K.length&&F==K[U].from){if(I)break Z;let N=K[U];if(!z)for(let R=N.to,P=U+1;;){if(R==Q)break Z;if(P<K.length&&K[P].from==R)R=K[P++].to;else if(x1[R]==W)break Z;else break}if(U++,V)V.push(N);else{if(N.from>G)q.push(new T6(G,N.from,O));let R=N.direction==y9!=!(O%2);dY(Z,R?X+1:X,Y,N.inner,N.from,N.to,q),G=N.to}F=N.to}else if(F==Q||(z?x1[F]!=W:x1[F]==W))break;else F++;if(V)cY(Z,G,F,X+1,Y,V,q);else if(G<F)q.push(new T6(G,F,O));G=F}else for(let G=Q,U=K.length;G>J;){let z=!0,I=!1;if(!U||G>K[U-1].to){let N=x1[G-1];if(N!=W)z=!1,I=N==16}let V=!z&&W==1?[]:null,O=z?X:X+1,F=G;Z:for(;;)if(U&&F==K[U-1].to){if(I)break Z;let N=K[--U];if(!z)for(let R=N.from,P=U;;){if(R==J)break Z;if(P&&K[P-1].to==R)R=K[--P].from;else if(x1[R-1]==W)break Z;else break}if(V)V.push(N);else{if(N.to<G)q.push(new T6(N.to,G,O));let R=N.direction==y9!=!(O%2);dY(Z,R?X+1:X,Y,N.inner,N.from,N.to,q),G=N.from}F=N.from}else if(F==J||(z?x1[F-1]!=W:x1[F-1]==W))break;else F--;if(V)cY(Z,F,G,X+1,Y,V,q);else if(F<G)q.push(new T6(F,G,O));G=F}}function dY(Z,J,Q,X,Y,K,q){let W=J%2?2:1;LD(Z,Y,K,X,W),BD(Z,Y,K,X,W),PD(Y,K,X,W),cY(Z,Y,K,J,Q,X,q)}function TD(Z,J,Q){if(!Z)return[new T6(0,0,J==G3?1:0)];if(J==y9&&!Q.length&&!AD.test(Z))return OI(Z.length);if(Q.length)while(Z.length>x1.length)x1[x1.length]=256;let X=[],Y=J==y9?0:1;return dY(Z,Y,Y,Q,0,Z.length,X),X}function OI(Z){return[new T6(0,Z,0)]}var FI="";function SD(Z,J,Q,X,Y){var K;let q=X.head-Z.from,W=T6.find(J,q,(K=X.bidiLevel)!==null&&K!==void 0?K:-1,X.assoc),G=J[W],U=G.side(Y,Q);if(q==U){let V=W+=Y?1:-1;if(V<0||V>=J.length)return null;G=J[W=V],q=G.side(!Y,Q),U=G.side(Y,Q)}let z=K0(Z.text,q,G.forward(Y,Q));if(z<G.from||z>G.to)z=U;FI=Z.text.slice(Math.min(q,z),Math.max(q,z));let I=W==(Y?J.length-1:0)?null:J[W+(Y?1:-1)];if(I&&z==U&&I.level+(Y?0:1)<G.level)return y.cursor(I.side(!Y,Q)+Z.from,I.forward(Y,Q)?1:-1,I.level);return y.cursor(z+Z.from,G.forward(Y,Q)?-1:1,G.level)}function ED(Z,J,Q){for(let X=J;X<Q;X++){let Y=jI(Z.charCodeAt(X));if(Y==1)return y9;if(Y==2||Y==4)return G3}return y9}var NI=r.define(),RI=r.define(),DI=r.define(),MI=r.define(),nY=r.define(),AI=r.define(),LI=r.define(),U3=r.define(),z3=r.define(),BI=r.define({combine:(Z)=>Z.some((J)=>J)}),PI=r.define({combine:(Z)=>Z.some((J)=>J)}),TI=r.define();class S7{constructor(Z,J,Q,X,Y,K=!1){this.range=Z,this.y=J,this.x=Q,this.yMargin=X,this.xMargin=Y,this.isSnapshot=K}map(Z){return Z.empty?this:new S7(this.range.map(Z),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(Z){return this.range.to<=Z.doc.length?this:new S7(y.cursor(Z.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}var mZ=D1.define({map:(Z,J)=>Z.map(J)}),SI=D1.define();function p0(Z,J,Q){let X=Z.facet(MI);if(X.length)X[0](J);else if(window.onerror&&window.onerror(String(J),Q,void 0,void 0,J));else if(Q)console.error(Q+":",J);else console.error(J)}var M8=r.define({combine:(Z)=>Z.length?Z[0]:!0}),CD=0,L7=r.define({combine(Z){return Z.filter((J,Q)=>{for(let X=0;X<Q;X++)if(Z[X].plugin==J.plugin)return!1;return!0})}});class O0{constructor(Z,J,Q,X,Y){this.id=Z,this.create=J,this.domEventHandlers=Q,this.domEventObservers=X,this.baseExtensions=Y(this),this.extension=this.baseExtensions.concat(L7.of({plugin:this,arg:void 0}))}of(Z){return this.baseExtensions.concat(L7.of({plugin:this,arg:Z}))}static define(Z,J){let{eventHandlers:Q,eventObservers:X,provide:Y,decorations:K}=J||{};return new O0(CD++,Z,Q,X,(q)=>{let W=[];if(K)W.push(HJ.of((G)=>{let U=G.plugin(q);return U?K(U):M1.none}));if(Y)W.push(Y(q));return W})}static fromClass(Z,J){return O0.define((Q,X)=>new Z(Q,X),J)}}class oZ{constructor(Z){this.spec=Z,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(Z){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(Z,this.spec.arg)}catch(J){p0(Z.state,J,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let J=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(J)}catch(Q){if(p0(J.state,Q,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(X){}this.deactivate()}}return this}destroy(Z){var J;if((J=this.value)===null||J===void 0?void 0:J.destroy)try{this.value.destroy()}catch(Q){p0(Z.state,Q,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}var EI=r.define(),I3=r.define(),HJ=r.define(),CI=r.define(),V3=r.define(),X5=r.define(),_I=r.define();function Sz(Z,J){let Q=Z.state.facet(_I);if(!Q.length)return Q;let X=Q.map((K)=>K instanceof Function?K(Z):K),Y=[];return H1.spans(X,J.from,J.to,{point(){},span(K,q,W,G){let U=K-J.from,z=q-J.from,I=Y;for(let V=W.length-1;V>=0;V--,G--){let O=W[V].spec.bidiIsolate,F;if(O==null)O=ED(J.text,U,z);if(G>0&&I.length&&(F=I[I.length-1]).to==U&&F.direction==O)F.to=z,I=F.inner;else{let N={from:U,to:z,direction:O,inner:[]};I.push(N),I=N.inner}}}}),Y}var kI=r.define();function j3(Z){let J=0,Q=0,X=0,Y=0;for(let K of Z.state.facet(kI)){let q=K(Z);if(q){if(q.left!=null)J=Math.max(J,q.left);if(q.right!=null)Q=Math.max(Q,q.right);if(q.top!=null)X=Math.max(X,q.top);if(q.bottom!=null)Y=Math.max(Y,q.bottom)}}return{left:J,right:Q,top:X,bottom:Y}}var d4=r.define();class Q6{constructor(Z,J,Q,X){this.fromA=Z,this.toA=J,this.fromB=Q,this.toB=X}join(Z){return new Q6(Math.min(this.fromA,Z.fromA),Math.max(this.toA,Z.toA),Math.min(this.fromB,Z.fromB),Math.max(this.toB,Z.toB))}addToSet(Z){let J=Z.length,Q=this;for(;J>0;J--){let X=Z[J-1];if(X.fromA>Q.toA)continue;if(X.toA<Q.fromA)break;Q=Q.join(X),Z.splice(J-1,1)}return Z.splice(J,0,Q),Z}static extendWithRanges(Z,J){if(J.length==0)return Z;let Q=[];for(let X=0,Y=0,K=0;;){let q=X<Z.length?Z[X].fromB:1e9,W=Y<J.length?J[Y]:1e9,G=Math.min(q,W);if(G==1e9)break;let U=G+K,z=G,I=U;for(;;)if(Y<J.length&&J[Y]<=z){let V=J[Y+1];Y+=2,z=Math.max(z,V);for(let O=X;O<Z.length&&Z[O].fromB<=z;O++)K=Z[O].toA-Z[O].toB;I=Math.max(I,V+K)}else if(X<Z.length&&Z[X].fromB<=z){let V=Z[X++];z=Math.max(z,V.toB),I=Math.max(I,V.toA),K=V.toA-V.toB}else break;Q.push(new Q6(U,I,G,z))}return Q}}class WJ{constructor(Z,J,Q){this.view=Z,this.state=J,this.transactions=Q,this.flags=0,this.startState=Z.state,this.changes=l1.empty(this.startState.doc.length);for(let Y of Q)this.changes=this.changes.compose(Y.changes);let X=[];this.changes.iterChangedRanges((Y,K,q,W)=>X.push(new Q6(Y,K,q,W))),this.changedRanges=X}static create(Z,J,Q){return new WJ(Z,J,Q)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some((Z)=>Z.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}var _D=[];class p1{constructor(Z,J,Q=0){this.dom=Z,this.length=J,this.flags=Q,this.parent=null,Z.cmTile=this}get breakAfter(){return this.flags&1}get children(){return _D}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(Z){if(this.flags|=2,this.flags&4){this.flags&=-5;let J=this.domAttrs;if(J)VD(this.dom,J)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(Z){this.dom=Z,Z.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(Z,J=this.posAtStart){let Q=J;for(let X of this.children){if(X==Z)return Q;Q+=X.length+X.breakAfter}throw RangeError("Invalid child in posBefore")}posAfter(Z){return this.posBefore(Z)+Z.length}covers(Z){return!0}coordsIn(Z,J,Q){return null}domPosFor(Z,J){let Q=n8(this.dom),X=this.length?Z>0:J>0;return new P6(this.parent.dom,Q+(X?1:0),Z==0||Z==this.length)}markDirty(Z){if(this.flags&=-3,Z)this.flags|=4;if(this.parent&&this.parent.flags&2)this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let Z=this;Z;Z=Z.parent)if(Z instanceof K5)return Z;return null}static get(Z){return Z.cmTile}}class Y5 extends p1{constructor(Z){super(Z,0);this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(Z){this.children.push(Z),Z.parent=this}sync(Z){if(this.flags&2)return;super.sync(Z);let J=this.dom,Q=null,X,Y=(Z===null||Z===void 0?void 0:Z.node)==J?Z:null,K=0;for(let q of this.children){if(q.sync(Z),K+=q.length+q.breakAfter,X=Q?Q.nextSibling:J.firstChild,Y&&X!=q.dom)Y.written=!0;if(q.dom.parentNode==J)while(X&&X!=q.dom)X=Ez(X);else J.insertBefore(q.dom,X);Q=q.dom}if(X=Q?Q.nextSibling:J.firstChild,Y&&X)Y.written=!0;while(X)X=Ez(X);this.length=K}}function Ez(Z){let J=Z.nextSibling;return Z.parentNode.removeChild(Z),J}class K5 extends Y5{constructor(Z,J){super(J);this.view=Z}owns(Z){for(;Z;Z=Z.parent)if(Z==this)return!0;return!1}isBlock(){return!0}nearest(Z){for(;;){if(!Z)return null;let J=p1.get(Z);if(J&&this.owns(J))return J;Z=Z.parentNode}}blockTiles(Z){for(let J=[],Q=this,X=0,Y=0;;)if(X==Q.children.length){if(!J.length)return;if(Q=Q.parent,Q.breakAfter)Y++;X=J.pop()}else{let K=Q.children[X++];if(K instanceof A8)J.push(X),Q=K,X=0;else{let q=Y+K.length,W=Z(K,Y);if(W!==void 0)return W;Y=q+K.breakAfter}}}resolveBlock(Z,J){let Q,X=-1,Y,K=-1;if(this.blockTiles((q,W)=>{let G=W+q.length;if(Z>=W&&Z<=G){if(q.isWidget()&&J>=-1&&J<=1){if(q.flags&32)return!0;if(q.flags&16)Q=void 0}if((W<Z||Z==G&&(J<-1?q.length:q.covers(1)))&&(!Q||!q.isWidget()&&Q.isWidget()))Q=q,X=Z-W;if((G>Z||Z==W&&(J>1?q.length:q.covers(-1)))&&(!Y||!q.isWidget()&&Y.isWidget()))Y=q,K=Z-W}}),!Q&&!Y)throw Error("No tile at position "+Z);return Q&&J<0||!Y?{tile:Q,offset:X}:{tile:Y,offset:K}}}class A8 extends Y5{constructor(Z,J){super(Z);this.wrapper=J}isBlock(){return!0}covers(Z){if(!this.children.length)return!1;return Z<0?this.children[0].covers(-1):this.lastChild.covers(1)}get domAttrs(){return this.wrapper.attributes}static of(Z,J){let Q=new A8(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class E7 extends Y5{constructor(Z,J){super(Z);this.attrs=J}isLine(){return!0}static start(Z,J,Q){let X=new E7(J||document.createElement("div"),Z);if(!J||!Q)X.flags|=4;return X}get domAttrs(){return this.attrs}resolveInline(Z,J,Q){let X=null,Y=-1,K=null,q=-1;function W(U,z){for(let I=0,V=0;I<U.children.length&&V<=z;I++){let O=U.children[I],F=V+O.length;if(F>=z){if(O.isComposite())W(O,z-V);else if((!K||K.isHidden&&(J>0&&!(K.flags&32)||Q&&xD(K,O)))&&(F>z||O.flags&32&&J<=1))K=O,q=z-V;else if(V<z||O.flags&16&&!O.isHidden&&J>=-1)X=O,Y=z-V}V=F}}W(this,Z);let G=(J<0?X:K)||X||K;return G?{tile:G,offset:G==X?Y:q}:null}coordsIn(Z,J,Q){let X=this.resolveInline(Z,J,!0);if(!X)return kD(this);return X.tile.coordsIn(Math.max(0,X.offset),J,Q)}domIn(Z,J){let Q=this.resolveInline(Z,J);if(Q){let{tile:X,offset:Y}=Q;if(this.dom.contains(X.dom)){if(X.isText())return new P6(X.dom,Math.min(X.dom.nodeValue.length,Y));return X.domPosFor(Y,X.flags&16?1:X.flags&32?-1:J)}let K=Q.tile.parent,q=!1;for(let W of K.children){if(q)return new P6(W.dom,0);if(W==Q.tile)q=!0}}return new P6(this.dom,0)}}function kD(Z){let J=Z.dom.lastChild;if(!J)return Z.dom.getBoundingClientRect();let Q=aZ(J);return Q[Q.length-1]||null}function xD(Z,J){let Q=Z.coordsIn(0,1),X=J.coordsIn(0,1);return Q&&X&&X.top<Q.bottom}class w0 extends Y5{constructor(Z,J){super(Z);this.mark=J}get domAttrs(){return this.mark.attrs}static of(Z,J){let Q=new w0(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class x9 extends p1{constructor(Z,J){super(Z,J.length);this.text=J}sync(Z){if(this.flags&2)return;if(super.sync(Z),this.dom.nodeValue!=this.text){if(Z&&Z.node==this.dom)Z.written=!0;this.dom.nodeValue=this.text}}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(Z,J,Q){let X=this.dom.nodeValue.length;if(Z>X)Z=X;let Y=Z,K=Z,q=0;if(Z==0&&J<0||Z==X&&J>=0){if(!(i.chrome||i.gecko)){if(Z)Y--,q=1;else if(K<X)K++,q=-1}}else if(J<0)Y--;else if(K<X)K++;let W=e4(this.dom,Y,K).getClientRects();if(!W.length)return null;let G=W[(q?q<0:J>=0)?0:W.length-1];if(i.safari&&!q&&G.width==0)G=Array.prototype.find.call(W,(U)=>U.width)||G;return Q==null?G:qJ(G,(q?q>0:J<0)==Q)}static of(Z,J){let Q=new x9(J||document.createTextNode(Z),Z);if(!J)Q.flags|=2;return Q}}class $9 extends p1{constructor(Z,J,Q,X){super(Z,J,X);this.widget=Q}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(Z){if(this.flags&48)return!1;return(this.flags&(Z<0?64:128))>0}coordsIn(Z,J){return this.coordsInWidget(Z,J,!1)}coordsInWidget(Z,J,Q){let X=this.widget.coordsAt(this.dom,Z,J);if(X)return X;if(Q)return qJ(this.dom.getBoundingClientRect(),this.length?Z==0:J<=0);else{let Y=this.dom.getClientRects(),K=null;if(!Y.length)return null;let q=this.flags&16?!0:this.flags&32?!1:Z>0;for(let W=q?Y.length-1:0;;W+=q?-1:1)if(K=Y[W],Z>0?W==0:W==Y.length-1||K.top<K.bottom)break;return qJ(K,!q)}}get overrideDOMText(){if(!this.length)return O1.empty;let{root:Z}=this;if(!Z)return O1.empty;let J=this.posAtStart;return Z.view.state.doc.slice(J,J+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(Z,J,Q,X,Y){if(!Y){if(Y=Z.toDOM(J),!Z.editable)Y.contentEditable="false"}return new $9(Y,Q,Z,X)}}class Z5 extends p1{constructor(Z){let J=document.createElement("img");J.className="cm-widgetBuffer",J.setAttribute("aria-hidden","true");super(J,0,Z)}get isHidden(){return!0}get overrideDOMText(){return O1.empty}coordsIn(Z,J,Q){let X=this.dom.getBoundingClientRect();return Q==null?X:qJ(X,J>0==Q)}}class xI{constructor(Z){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=Z}advance(Z,J,Q){let{tile:X,index:Y,beforeBreak:K,parents:q}=this;while(Z||J>0)if(!X.isComposite()){let W=X.length;if(Y<W&&Z){let G=Math.min(Z,W-Y);if(Q)Q.skip(X,Y,Y+G);Z-=G,Y+=G}if(Y==W)K=!!X.breakAfter,{tile:X,index:Y}=q.pop(),Y++;else if(!Z)break}else if(K){if(!Z)break;if(Q)Q.break();Z--,K=!1}else if(Y==X.children.length){if(!Z&&!q.length)break;if(Q)Q.leave(X);K=!!X.breakAfter,{tile:X,index:Y}=q.pop(),Y++}else{let W=X.children[Y],G=W.breakAfter;if((J>0?W.length<=Z:W.length<Z)&&(!Q||Q.skip(W,0,W.length)!==!1||!W.isComposite))K=!!G,Y++,Z-=W.length;else if(q.push({tile:X,index:Y}),X=W,Y=0,Q&&W.isComposite())Q.enter(W)}return this.tile=X,this.index=Y,this.beforeBreak=K,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class wI{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.wrapper=Q,this.rank=X}}class bI{constructor(Z,J,Q){this.cache=Z,this.root=J,this.blockWrappers=Q,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(Z,J,Q,X){var Y;this.flushBuffer();let K=this.ensureMarks(J,Q),q=K.lastChild;if(q&&q.isText()&&!(q.flags&8)&&q.length+Z.length<512){this.cache.reused.set(q,2);let W=K.children[K.children.length-1]=new x9(q.dom,q.text+Z);W.parent=K}else K.append(X||x9.of(Z,(Y=this.cache.find(x9))===null||Y===void 0?void 0:Y.dom));this.pos+=Z.length,this.afterWidget=null}addComposition(Z,J){let Q=this.curLine;if(Q.dom!=J.line.dom)Q.setDOM(this.cache.reused.has(J.line)?kY(J.line.dom):J.line.dom),this.cache.reused.set(J.line,2);let X=Q;for(let q=J.marks.length-1;q>=0;q--){let W=J.marks[q],G=X.lastChild;if(G instanceof w0&&G.mark.eq(W.mark)){if(G.dom!=W.dom)G.setDOM(kY(W.dom));X=G}else{if(this.cache.reused.get(W)){let z=p1.get(W.dom);if(z)z.setDOM(kY(W.dom))}let U=w0.of(W.mark,W.dom);X.append(U),X=U}this.cache.reused.set(W,2)}let Y=p1.get(Z.text);if(Y)this.cache.reused.set(Y,2);let K=new x9(Z.text,Z.text.nodeValue);K.flags|=8,this.pos=Z.range.toB,X.append(K)}addInlineWidget(Z,J,Q){let X=this.afterWidget&&Z.flags&48&&(this.afterWidget.flags&48)==(Z.flags&48);if(!X)this.flushBuffer();let Y=this.ensureMarks(J,Q);if(!X&&!(Z.flags&16))Y.append(this.getBuffer(1));Y.append(Z),this.pos+=Z.length,this.afterWidget=Z}addMark(Z,J,Q){this.flushBuffer(),this.ensureMarks(J,Q).append(Z),this.pos+=Z.length,this.afterWidget=null}addBlockWidget(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}continueWidget(Z){let J=this.afterWidget||this.lastBlock;J.length+=Z,this.pos+=Z}addLineStart(Z,J){var Q;if(!Z)Z=fI;let X=E7.start(Z,J||((Q=this.cache.find(E7))===null||Q===void 0?void 0:Q.dom),!!J);this.getBlockPos().append(this.lastBlock=this.curLine=X)}addLine(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(Z){if(!this.blockPosCovered())this.addLineStart(Z)}ensureLine(Z){if(!this.curLine)this.addLineStart(Z)}ensureMarks(Z,J){var Q;let X=this.curLine;for(let Y=Z.length-1;Y>=0;Y--){let K=Z[Y],q;if(J>0&&(q=X.lastChild)&&q instanceof w0&&q.mark.eq(K))X=q,J--;else{let W=w0.of(K,(Q=this.cache.find(w0,(G)=>G.mark.eq(K)))===null||Q===void 0?void 0:Q.dom);X.append(W),X=W,J=0}}return X}endLine(){if(this.curLine){this.flushBuffer();let Z=this.curLine.lastChild;if(!Z||!Cz(this.curLine,!1)||Z.dom.nodeName!="BR"&&Z.isWidget()&&!(i.ios&&Cz(this.curLine,!0)))this.curLine.append(this.cache.findWidget(xY,0,32)||new $9(xY.toDOM(),0,xY,32));this.curLine=this.afterWidget=null}}updateBlockWrappers(){if(this.wrapperPos>this.pos+1e4)this.blockWrappers.goto(this.pos),this.wrappers.length=0;for(let Z=this.wrappers.length-1;Z>=0;Z--)if(this.wrappers[Z].to<this.pos)this.wrappers.splice(Z,1);for(let Z=this.blockWrappers;Z.value&&Z.from<=this.pos;Z.next())if(Z.to>=this.pos){let J=Z.rank*102+Z.value.rank,Q=new wI(Z.from,Z.to,Z.value,J),X=this.wrappers.length;while(X>0&&(this.wrappers[X-1].rank-Q.rank||this.wrappers[X-1].to-Q.to)<0)X--;this.wrappers.splice(X,0,Q)}this.wrapperPos=this.pos}getBlockPos(){var Z;this.updateBlockWrappers();let J=this.root;for(let Q of this.wrappers){let X=J.lastChild;if(Q.from<this.pos&&X instanceof A8&&X.wrapper.eq(Q.wrapper))J=X;else{let Y=A8.of(Q.wrapper,(Z=this.cache.find(A8,(K)=>K.wrapper.eq(Q.wrapper)))===null||Z===void 0?void 0:Z.dom);J.append(Y),J=Y}}return J}blockPosCovered(){let Z=this.lastBlock;return Z!=null&&!Z.breakAfter&&(!Z.isWidget()||(Z.flags&160)>0)}getBuffer(Z){let J=2|(Z<0?16:32),Q=this.cache.find(Z5,void 0,1);if(Q)Q.flags=J;return Q||new Z5(J)}flushBuffer(){if(this.afterWidget&&!(this.afterWidget.flags&32))this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null}}class yI{constructor(Z){this.skipCount=0,this.text="",this.textOff=0,this.cursor=Z.iter()}skip(Z){if(this.textOff+Z<=this.text.length)this.textOff+=Z;else this.skipCount+=Z-(this.text.length-this.textOff),this.text="",this.textOff=0}next(Z){if(this.textOff==this.text.length){let{value:X,lineBreak:Y,done:K}=this.cursor.next(this.skipCount);if(this.skipCount=0,K)throw Error("Ran out of text content when drawing inline views");this.text=X;let q=this.textOff=Math.min(Z,X.length);return Y?null:X.slice(0,q)}let J=Math.min(this.text.length,this.textOff+Z),Q=this.text.slice(this.textOff,J);return this.textOff=J,Q}}var GJ=[$9,E7,x9,w0,Z5,A8,K5];for(let Z=0;Z<GJ.length;Z++)GJ[Z].bucket=Z;class $I{constructor(Z){this.view=Z,this.buckets=GJ.map(()=>[]),this.index=GJ.map(()=>0),this.reused=new Map}add(Z){let J=Z.constructor.bucket,Q=this.buckets[J];if(Q.length<6)Q.push(Z);else Q[this.index[J]=(this.index[J]+1)%6]=Z}find(Z,J,Q=2){let X=Z.bucket,Y=this.buckets[X],K=this.index[X];for(let q=0;q<Y.length;q++){let W=(q+K)%Y.length,G=Y[W];if((!J||J(G))&&!this.reused.has(G)){if(Y.splice(W,1),W<K)this.index[X]--;return this.reused.set(G,Q),G}}return null}findWidget(Z,J,Q){let X=this.buckets[0];if(X.length)for(let Y=0,K=0;;Y++){if(Y==X.length){if(K)return null;K=1,Y=0}let q=X[Y];if(!this.reused.has(q)&&(K==0?q.widget.compare(Z):q.widget.constructor==Z.constructor&&Z.updateDOM(q.dom,this.view,q.widget))){if(X.splice(Y,1),Y<this.index[0])this.index[0]--;if(q.widget==Z&&q.length==J&&(q.flags&497)==Q)return this.reused.set(q,1),q;else return this.reused.set(q,2),new $9(q.dom,J,Z,q.flags&-498|Q)}}}reuse(Z){return this.reused.set(Z,1),Z}maybeReuse(Z,J=2){if(this.reused.has(Z))return;return this.reused.set(Z,J),Z.dom}clear(){for(let Z=0;Z<this.buckets.length;Z++)this.buckets[Z].length=this.index[Z]=0}}class hI{constructor(Z,J,Q,X,Y){this.view=Z,this.decorations=X,this.disallowBlockEffectsFor=Y,this.openWidget=!1,this.openMarks=0,this.cache=new $I(Z),this.text=new yI(Z.state.doc),this.builder=new bI(this.cache,new K5(Z,Z.contentDOM),H1.iter(Q)),this.cache.reused.set(J,2),this.old=new xI(J),this.reuseWalker={skip:(K,q,W)=>{if(this.cache.add(K),K.isComposite())return!1},enter:(K)=>this.cache.add(K),leave:()=>{},break:()=>{}}}run(Z,J){let Q=J&&this.getCompositionContext(J.text);for(let X=0,Y=0,K=0;;){let q=K<Z.length?Z[K++]:null,W=q?q.fromA:this.old.root.length;if(W>X){let G=W-X;this.preserve(G,!K,!q),X=W,Y+=G}if(!q)break;if(J&&q.fromA<=J.range.fromA&&q.toA>=J.range.toA)this.forward(q.fromA,J.range.fromA,J.range.fromA<J.range.toA?1:-1),this.emit(Y,J.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(J,Q),this.text.skip(J.range.toB-J.range.fromB),this.forward(J.range.fromA,q.toA),this.emit(J.range.toB,q.toB);else this.forward(q.fromA,q.toA),this.emit(Y,q.toB);Y=q.toB,X=q.toA}if(this.builder.curLine)this.builder.endLine();return this.builder.root}preserve(Z,J,Q){let X=yD(this.old),Y=this.openMarks;this.old.advance(Z,Q?1:-1,{skip:(K,q,W)=>{if(K.isWidget())if(this.openWidget)this.builder.continueWidget(W-q);else{let G=W>0||q<K.length?$9.of(K.widget,this.view,W-q,K.flags&496,this.cache.maybeReuse(K)):this.cache.reuse(K);if(G.flags&256)G.flags&=-2,this.builder.addBlockWidget(G);else this.builder.ensureLine(null),this.builder.addInlineWidget(G,X,Y),Y=X.length}else if(K.isText()){if(this.builder.ensureLine(null),!q&&W==K.length&&!this.cache.reused.has(K))this.builder.addText(K.text,X,Y,this.cache.reuse(K));else this.cache.add(K),this.builder.addText(K.text.slice(q,W),X,Y);Y=X.length}else if(K.isLine())K.flags&=-2,this.cache.reused.set(K,1),this.builder.addLine(K);else if(K instanceof Z5)this.cache.add(K);else if(K instanceof w0)this.builder.ensureLine(null),this.builder.addMark(K,X,Y),this.cache.reused.set(K,1),Y=X.length;else return!1;this.openWidget=!1},enter:(K)=>{if(K.isLine())this.builder.addLineStart(K.attrs,this.cache.maybeReuse(K));else if(this.cache.add(K),K instanceof w0)X.unshift(K.mark);this.openWidget=!1},leave:(K)=>{if(K.isLine()){if(X.length)X.length=Y=0}else if(K instanceof w0)X.shift(),Y=Math.min(Y,X.length)},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(Z)}emit(Z,J){let Q=null,X=this.builder,Y=-1,K=H1.spans(this.decorations,Z,J,{point:(q,W,G,U,z,I)=>{if(G instanceof b9){if(this.disallowBlockEffectsFor[I]){if(G.block)throw RangeError("Block decorations may not be specified via plugins");if(W>this.view.state.doc.lineAt(q).to)throw RangeError("Decorations that replace line breaks may not be specified via plugins")}if(Y=U.length,z>U.length)X.continueWidget(W-q);else{let V=G.widget||(G.block?h9.block:h9.inline),O=wD(G),F=this.cache.findWidget(V,W-q,O)||$9.of(V,this.view,W-q,O);if(G.block){if(G.startSide>0)X.addLineStartIfNotCovered(Q);X.addBlockWidget(F)}else X.ensureLine(Q),X.addInlineWidget(F,U,z)}Q=null}else Q=bD(Q,G);if(W>q)this.text.skip(W-q)},span:(q,W,G,U)=>{for(let z=q;z<W;){let I=this.text.next(Math.min(512,W-z));if(I==null)X.addLineStartIfNotCovered(Q),X.addBreak(),z++;else X.ensureLine(Q),X.addText(I,G,z==q?U:G.length),z+=I.length;Q=null}Y=G.length}});if(Y>-1)this.openWidget=K>Y;if(!this.openWidget)X.addLineStartIfNotCovered(Q);this.openMarks=K}forward(Z,J,Q=1){if(J-Z<=10)this.old.advance(J-Z,Q,this.reuseWalker);else this.old.advance(5,-1,this.reuseWalker),this.old.advance(J-Z-10,-1),this.old.advance(5,Q,this.reuseWalker)}getCompositionContext(Z){let J=[],Q=null;for(let X=Z.parentNode;;X=X.parentNode){let Y=p1.get(X);if(X==this.view.contentDOM)break;if(Y instanceof w0)J.push(Y);else if(Y===null||Y===void 0?void 0:Y.isLine())Q=Y;else if(Y instanceof A8);else if(X.nodeName=="DIV"&&!Q&&X!=this.view.contentDOM)Q=new E7(X,fI);else if(!Q)J.push(w0.of(new J5({tagName:X.nodeName.toLowerCase(),attributes:jD(X)}),X))}return{line:Q,marks:J}}}function Cz(Z,J){let Q=(X)=>{for(let Y of X.children)if((J?Y.isText():Y.length)||Q(Y))return!0;return!1};return Q(Z)}function wD(Z){let J=Z.isReplace?(Z.startSide<0?64:0)|(Z.endSide>0?128:0):Z.startSide>0?32:16;if(Z.block)J|=256;return J}var fI={class:"cm-line"};function bD(Z,J){let Q=J.spec.attributes,X=J.spec.class;if(!Q&&!X)return Z;if(!Z)Z={class:"cm-line"};if(Q)q3(Q,Z);if(X)Z.class+=" "+X;return Z}function yD(Z){let J=[];for(let Q=Z.parents.length;Q>1;Q--){let X=Q==Z.parents.length?Z.tile:Z.parents[Q].tile;if(X instanceof w0)J.push(X.mark)}return J}function kY(Z){let J=p1.get(Z);if(J)J.setDOM(Z.cloneNode());return Z}class h9 extends l8{constructor(Z){super();this.tag=Z}eq(Z){return Z.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(Z){return Z.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}h9.inline=new h9("span");h9.block=new h9("div");var xY=new class extends l8{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class lY{constructor(Z){this.view=Z,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=M1.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new K5(Z,Z.contentDOM),this.updateInner([new Q6(0,0,0,Z.state.doc.length)],null)}update(Z){var J;let Q=Z.changedRanges;if(this.minWidth>0&&Q.length)if(!Q.every(({fromA:U,toA:z})=>z<this.minWidthFrom||U>this.minWidthTo))this.minWidth=this.minWidthFrom=this.minWidthTo=0;else this.minWidthFrom=Z.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=Z.changes.mapPos(this.minWidthTo,1);this.updateEditContextFormatting(Z);let X=-1;if(this.view.inputState.composing>=0&&!this.view.observer.editContext){if((J=this.domChanged)===null||J===void 0?void 0:J.newSel)X=this.domChanged.newSel.head;else if(!pD(Z.changes,this.hasComposition)&&!Z.selectionSet)X=Z.state.selection.main.head}let Y=X>-1?hD(this.view,Z.changes,X):null;if(this.domChanged=null,this.hasComposition){let{from:U,to:z}=this.hasComposition;Q=new Q6(U,z,Z.changes.mapPos(U,-1),Z.changes.mapPos(z,1)).addToSet(Q.slice())}if(this.hasComposition=Y?{from:Y.range.fromB,to:Y.range.toB}:null,(i.ie||i.chrome)&&!Y&&Z&&Z.state.doc.lines!=Z.startState.doc.lines)this.forceSelection=!0;let K=this.decorations,q=this.blockWrappers;this.updateDeco();let W=uD(K,this.decorations,Z.changes);if(W.length)Q=Q6.extendWithRanges(Q,W);let G=vD(q,this.blockWrappers,Z.changes);if(G.length)Q=Q6.extendWithRanges(Q,G);if(Y&&!Q.some((U)=>U.fromA<=Y.range.fromA&&U.toA>=Y.range.toA))Q=Y.range.addToSet(Q.slice());if(this.tile.flags&2&&Q.length==0)return!1;else{if(this.updateInner(Q,Y),Z.transactions.length)this.lastUpdate=Date.now();return!0}}updateInner(Z,J){this.view.viewState.mustMeasureContent=!0;let{observer:Q}=this.view;Q.ignore(()=>{if(J||Z.length){let K=this.tile,q=new hI(this.view,K,this.blockWrappers,this.decorations,this.dynamicDecorationMap);if(J&&p1.get(J.text))q.cache.reused.set(p1.get(J.text),2);this.tile=q.run(Z,J),sY(K,q.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let Y=i.chrome||i.ios?{node:Q.selectionRange.focusNode,written:!1}:void 0;if(this.tile.sync(Y),Y&&(Y.written||Q.selectionRange.focusNode!=Y.node||!this.tile.dom.contains(Y.node)))this.forceSelection=!0;this.tile.dom.style.height=""});let X=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length){for(let Y of this.tile.children)if(Y.isWidget()&&Y.widget instanceof tZ)X.push(Y.dom)}Q.updateGaps(X)}updateEditContextFormatting(Z){this.editContextFormatting=this.editContextFormatting.map(Z.changes);for(let J of Z.transactions)for(let Q of J.effects)if(Q.is(SI))this.editContextFormatting=Q.value}updateSelection(Z=!1,J=!1){if(Z||!this.view.observer.selectionRange.focusNode)this.view.observer.readSelectionRange();let{dom:Q}=this.tile,X=this.view.root.activeElement,Y=X==Q,K=!Y&&!(this.view.state.facet(M8)||Q.tabIndex>-1)&&i4(Q,this.view.observer.selectionRange)&&!(X&&Q.contains(X));if(!(Y||J||K))return;let q=this.forceSelection;this.forceSelection=!1;let W=this.view.state.selection.main,G,U;if(W.empty)U=G=this.inlineDOMNearPos(W.anchor,W.assoc||1);else U=this.inlineDOMNearPos(W.head,W.head==W.from?1:-1),G=this.inlineDOMNearPos(W.anchor,W.anchor==W.from?1:-1);if(i.gecko&&W.empty&&!this.hasComposition&&$D(G)){let I=document.createTextNode("");this.view.observer.ignore(()=>G.node.insertBefore(I,G.node.childNodes[G.offset]||null)),G=U=new P6(I,0),q=!0}let z=this.view.observer.selectionRange;if(q||!z.focusNode||(!r4(G.node,G.offset,z.anchorNode,z.anchorOffset)||!r4(U.node,U.offset,z.focusNode,z.focusOffset))&&!this.suppressWidgetCursorChange(z,W))this.view.observer.ignore(()=>{if(i.android&&i.chrome&&Q.contains(z.focusNode)&&mD(z.focusNode,Q))Q.blur(),Q.focus({preventScroll:!0});let I=t4(this.view.root);if(!I);else if(W.empty){if(i.gecko){let V=fD(G.node,G.offset);if(V&&V!=3){let O=(V==1?zI:II)(G.node,G.offset);if(O)G=new P6(O.node,O.offset)}}if(I.collapse(G.node,G.offset),W.bidiLevel!=null&&I.caretBidiLevel!==void 0)I.caretBidiLevel=W.bidiLevel}else if(I.extend){I.collapse(G.node,G.offset);try{I.extend(U.node,U.offset)}catch(V){}}else{let V=document.createRange();if(W.anchor>W.head)[G,U]=[U,G];V.setEnd(U.node,U.offset),V.setStart(G.node,G.offset),I.removeAllRanges(),I.addRange(V)}if(K&&this.view.root.activeElement==Q){if(Q.blur(),X)X.focus()}}),this.view.observer.setSelectionRange(G,U);this.impreciseAnchor=G.precise?null:new P6(z.anchorNode,z.anchorOffset),this.impreciseHead=U.precise?null:new P6(z.focusNode,z.focusOffset)}suppressWidgetCursorChange(Z,J){return this.hasComposition&&J.empty&&r4(Z.focusNode,Z.focusOffset,Z.anchorNode,Z.anchorOffset)&&this.posFromDOM(Z.focusNode,Z.focusOffset)==J.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:Z}=this,J=Z.state.selection.main,Q=t4(Z.root),{anchorNode:X,anchorOffset:Y}=Z.observer.selectionRange;if(!Q||!J.empty||!J.assoc||!Q.modify)return;let K=this.lineAt(J.head,J.assoc);if(!K)return;let q=K.posAtStart;if(J.head==q||J.head==q+K.length)return;let W=this.coordsAt(J.head,-1),G=this.coordsAt(J.head,1);if(!W||!G||W.bottom>G.top)return;let U=this.domAtPos(J.head+J.assoc,J.assoc);Q.collapse(U.node,U.offset),Q.modify("move",J.assoc<0?"forward":"backward","lineboundary"),Z.observer.readSelectionRange();let z=Z.observer.selectionRange;if(Z.docView.posFromDOM(z.anchorNode,z.anchorOffset)!=J.from)Q.collapse(X,Y)}posFromDOM(Z,J){let Q=this.tile.nearest(Z);if(!Q)return this.tile.dom.compareDocumentPosition(Z)&2?0:this.view.state.doc.length;let X=Q.posAtStart;if(Q.isComposite()){let Y;if(Z==Q.dom)Y=Q.dom.childNodes[J];else{let K=L8(Z)==0?0:J==0?-1:1;for(;;){let q=Z.parentNode;if(q==Q.dom)break;if(K==0&&q.firstChild!=q.lastChild)if(Z==q.firstChild)K=-1;else K=1;Z=q}if(K<0)Y=Z;else Y=Z.nextSibling}if(Y==Q.dom.firstChild)return X;while(Y&&!p1.get(Y))Y=Y.nextSibling;if(!Y)return X+Q.length;for(let K=0,q=X;;K++){let W=Q.children[K];if(W.dom==Y)return q;q+=W.length+W.breakAfter}}else if(Q.isText())return Z==Q.dom?X+J:X+(J?Q.length:0);else return X}domAtPos(Z,J){let{tile:Q,offset:X}=this.tile.resolveBlock(Z,J);if(Q.isWidget())return Q.domPosFor(X,J);return Q.domIn(X,J)}inlineDOMNearPos(Z,J){let Q,X=-1,Y=!1,K,q=-1,W=!1;if(this.tile.blockTiles((G,U)=>{if(G.isWidget()){if(G.flags&32&&U>=Z)return!0;if(G.flags&16)Y=!0}else{let z=U+G.length;if(U<=Z)Q=G,X=Z-U,Y=z<Z;if(z>=Z&&!K)K=G,q=Z-U,W=U>Z;if(U>Z&&K)return!0}}),!Q&&!K)return this.domAtPos(Z,J);if(Y&&K)Q=null;else if(W&&Q)K=null;return Q&&J<0||!K?Q.domIn(X,J):K.domIn(q,J)}coordsAt(Z,J,Q){let{tile:X,offset:Y}=this.tile.resolveBlock(Z,J);if(X.isWidget()){if(X.widget instanceof tZ)return null;return X.coordsInWidget(Y,J,!0)}return X.coordsIn(Y,J,Q)}lineAt(Z,J){let{tile:Q}=this.tile.resolveBlock(Z,J);return Q.isLine()?Q:null}coordsForChar(Z){let{tile:J,offset:Q}=this.tile.resolveBlock(Z,1);if(!J.isLine())return null;function X(Y,K){if(Y.isComposite())for(let q of Y.children){if(q.length>=K){let W=X(q,K);if(W)return W}if(K-=q.length,K<0)break}else if(Y.isText()&&K<Y.length){let q=K0(Y.text,K);if(q==K)return null;let W=e4(Y.dom,K,q).getClientRects();for(let G=0;G<W.length;G++){let U=W[G];if(G==W.length-1||U.top<U.bottom&&U.left<U.right)return U}}return null}return X(J,Q)}measureVisibleLineHeights(Z){let J=[],{from:Q,to:X}=Z,Y=this.view.contentDOM.clientWidth,K=Y>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,q=-1,W=this.view.textDirection==C1.LTR,G=0,U=(z,I,V)=>{for(let O=0;O<z.children.length;O++){if(I>X)break;let F=z.children[O],N=I+F.length,R=F.dom.getBoundingClientRect(),{height:P}=R;if(V&&!O)G+=R.top-V.top;if(F instanceof A8){if(N>Q)U(F,I,R)}else if(I>=Q){if(G>0)J.push(-G);if(J.push(P+G),G=0,K){let T=F.dom.lastChild,C=T?aZ(T):[];if(C.length){let _=C[C.length-1],A=W?_.right-R.left:R.right-_.left;if(A>q)q=A,this.minWidth=Y,this.minWidthFrom=I,this.minWidthTo=N}}}if(V&&O==z.children.length-1)G+=V.bottom-R.bottom;I=N+F.breakAfter}};return U(this.tile,0,null),J}textDirectionAt(Z){let{tile:J}=this.tile.resolveBlock(Z,1);return getComputedStyle(J.dom).direction=="rtl"?C1.RTL:C1.LTR}measureTextSize(){let Z=this.tile.blockTiles((K)=>{if(K.isLine()&&K.children.length&&K.length<=20){let q=0,W;for(let G of K.children){if(!G.isText()||/[^ -~]/.test(G.text))return;let U=aZ(G.dom);if(U.length!=1)return;q+=U[0].width,W=U[0].height}if(q)return{lineHeight:K.dom.getBoundingClientRect().height,charWidth:q/K.length,textHeight:W}}});if(Z)return Z;let J=document.createElement("div"),Q,X,Y;return J.className="cm-line",J.style.width="99999px",J.style.position="absolute",J.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(J);let K=aZ(J.firstChild)[0];Q=J.getBoundingClientRect().height,X=K&&K.width?K.width/27:7,Y=K&&K.height?K.height:Q,J.remove()}),{lineHeight:Q,charWidth:X,textHeight:Y}}computeBlockGapDeco(){let Z=[],J=this.view.viewState;for(let Q=0,X=0;;X++){let Y=X==J.viewports.length?null:J.viewports[X],K=Y?Y.from-1:this.view.state.doc.length;if(K>Q){let q=(J.lineBlockAt(K).bottom-J.lineBlockAt(Q).top)/this.view.scaleY;Z.push(M1.replace({widget:new tZ(q),block:!0,inclusive:!0,isBlockGap:!0}).range(Q,K))}if(!Y)break;Q=Y.to+1}return M1.set(Z)}updateDeco(){let Z=1,J=this.view.state.facet(HJ).map((Y)=>{return(this.dynamicDecorationMap[Z++]=typeof Y=="function")?Y(this.view):Y}),Q=!1,X=this.view.state.facet(V3).map((Y,K)=>{let q=typeof Y=="function";if(q)Q=!0;return q?Y(this.view):Y});if(X.length)this.dynamicDecorationMap[Z++]=Q,J.push(H1.join(X));this.decorations=[this.editContextFormatting,...J,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];while(Z<this.decorations.length)this.dynamicDecorationMap[Z++]=!1;this.blockWrappers=this.view.state.facet(CI).map((Y)=>typeof Y=="function"?Y(this.view):Y)}scrollIntoView(Z){if(Z.isSnapshot){let G=this.view.viewState.lineBlockAt(Z.range.head);this.view.scrollDOM.scrollTop=G.top-Z.yMargin,this.view.scrollDOM.scrollLeft=Z.xMargin;return}for(let G of this.view.state.facet(TI))try{if(G(this.view,Z.range,Z))return!0}catch(U){p0(this.view.state,U,"scroll handler")}let{range:J}=Z,Q=this.coordsAt(J.head,J.assoc||(J.head>J.anchor?-1:1)),X;if(!Q)return;if(!J.empty&&(X=this.coordsAt(J.anchor,J.anchor>J.head?-1:1)))Q={left:Math.min(Q.left,X.left),top:Math.min(Q.top,X.top),right:Math.max(Q.right,X.right),bottom:Math.max(Q.bottom,X.bottom)};let Y=j3(this.view),K={left:Q.left-Y.left,top:Q.top-Y.top,right:Q.right+Y.right,bottom:Q.bottom+Y.bottom},{offsetWidth:q,offsetHeight:W}=this.view.scrollDOM;if(FD(this.view.scrollDOM,K,J.head<J.anchor?-1:1,Z.x,Z.y,Math.max(Math.min(Z.xMargin,q),-q),Math.max(Math.min(Z.yMargin,W),-W),this.view.textDirection==C1.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(Q.top>window.visualViewport.offsetTop+window.visualViewport.height||Q.bottom<window.visualViewport.offsetTop)){let G=this.view.docView.lineAt(J.head,1);if(G){let U=qI(G.dom);G.dom.scrollIntoView({block:"nearest"}),WI(U,!1)}}}lineHasWidget(Z){let J=(Q)=>Q.isWidget()||Q.children.some(J);return J(this.tile.resolveBlock(Z,1).tile)}destroy(){sY(this.tile)}}function sY(Z,J){let Q=J===null||J===void 0?void 0:J.get(Z);if(Q!=1){if(Q==null)Z.destroy();for(let X of Z.children)sY(X,J)}}function $D(Z){return Z.node.nodeType==1&&Z.node.firstChild&&(Z.offset==0||Z.node.childNodes[Z.offset-1].contentEditable=="false")&&(Z.offset==Z.node.childNodes.length||Z.node.childNodes[Z.offset].contentEditable=="false")}function gI(Z,J){let Q=Z.observer.selectionRange;if(!Q.focusNode)return null;let X=zI(Q.focusNode,Q.focusOffset),Y=II(Q.focusNode,Q.focusOffset),K=X||Y;if(Y&&X&&Y.node!=X.node){let W=p1.get(Y.node);if(!W||W.isText()&&W.text!=Y.node.nodeValue)K=Y;else if(Z.docView.lastCompositionAfterCursor){let G=p1.get(X.node);if(!(!G||G.isText()&&G.text!=X.node.nodeValue))K=Y}}if(Z.docView.lastCompositionAfterCursor=K!=X,!K)return null;let q=J-K.offset;return{from:q,to:q+K.node.nodeValue.length,node:K.node}}function hD(Z,J,Q){let X=gI(Z,Q);if(!X)return null;let{node:Y,from:K,to:q}=X,W=Y.nodeValue;if(/[\n\r]/.test(W))return null;if(Z.state.doc.sliceString(X.from,X.to)!=W)return null;let G=J.invertedDesc;return{range:new Q6(G.mapPos(K),G.mapPos(q),K,q),text:Y}}function fD(Z,J){if(Z.nodeType!=1)return 0;return(J&&Z.childNodes[J-1].contentEditable=="false"?1:0)|(J<Z.childNodes.length&&Z.childNodes[J].contentEditable=="false"?2:0)}var gD=class{constructor(){this.changes=[]}compareRange(J,Q){P7(J,Q,this.changes)}comparePoint(J,Q){P7(J,Q,this.changes)}boundChange(J){P7(J,J,this.changes)}};function uD(Z,J,Q){let X=new gD;return H1.compare(Z,J,Q,X),X.changes}class uI{constructor(){this.changes=[]}compareRange(Z,J){P7(Z,J,this.changes)}comparePoint(){}boundChange(Z){P7(Z,Z,this.changes)}}function vD(Z,J,Q){let X=new uI;return H1.compare(Z,J,Q,X),X.changes}function mD(Z,J){for(let Q=Z;Q&&Q!=J;Q=Q.assignedSlot||Q.parentNode)if(Q.nodeType==1&&Q.contentEditable=="false")return!0;return!1}function pD(Z,J){let Q=!1;if(J)Z.iterChangedRanges((X,Y)=>{if(X<J.to&&Y>J.from)Q=!0});return Q}class tZ extends l8{constructor(Z){super();this.height=Z}toDOM(){let Z=document.createElement("div");return Z.className="cm-gap",this.updateDOM(Z),Z}eq(Z){return Z.height==this.height}updateDOM(Z){return Z.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function cD(Z,J,Q=1){let X=Z.charCategorizer(J),Y=Z.doc.lineAt(J),K=J-Y.from;if(Y.length==0)return y.cursor(J);if(K==0)Q=1;else if(K==Y.length)Q=-1;let q=K,W=K;if(Q<0)q=K0(Y.text,K,!1);else W=K0(Y.text,K);let G=X(Y.text.slice(q,W));while(q>0){let U=K0(Y.text,q,!1);if(X(Y.text.slice(U,q))!=G)break;q=U}while(W<Y.length){let U=K0(Y.text,W);if(X(Y.text.slice(W,U))!=G)break;W=U}return y.undirectionalRange(q+Y.from,W+Y.from)}function dD(Z,J,Q,X,Y){let K=Math.round((X-J.left)*Z.defaultCharacterWidth);if(Z.lineWrapping&&Q.height>Z.defaultLineHeight*1.5){let W=Z.viewState.heightOracle.textHeight,G=Math.floor((Y-Q.top-(Z.defaultLineHeight-W)*0.5)/W);K+=G*Z.viewState.heightOracle.lineLength}let q=Z.state.sliceDoc(Q.from,Q.to);return Q.from+jz(q,K,Z.state.tabSize)}function iY(Z,J,Q){let X=Z.lineBlockAt(J);if(Array.isArray(X.type)){let Y;for(let K of X.type){if(K.from>J)break;if(K.to<J)continue;if(K.from<J&&K.to>J)return K;if(!Y||K.type==U0.Text&&(Y.type!=K.type||(Q<0?K.from<J:K.to>J)))Y=K}return Y||X}return X}function nD(Z,J,Q,X){let Y=iY(Z,J.head,J.assoc||-1),K=!X||Y.type!=U0.Text||!(Z.lineWrapping||Y.widgetLineBreaks)?null:Z.coordsAtPos(J.assoc<0&&J.head>Y.from?J.head-1:J.head);if(K){let q=Z.dom.getBoundingClientRect(),W=Z.textDirectionAt(Y.from),G=Z.posAtCoords({x:Q==(W==C1.LTR)?q.right-1:q.left+1,y:(K.top+K.bottom)/2});if(G!=null)return y.cursor(G,Q?-1:1)}return y.cursor(Q?Y.to:Y.from,Q?-1:1)}function _z(Z,J,Q,X){let Y=Z.state.doc.lineAt(J.head),K=Z.bidiSpans(Y),q=Z.textDirectionAt(Y.from);for(let W=J,G=null;;){let U=SD(Y,K,q,W,Q),z=FI;if(!U){if(Y.number==(Q?Z.state.doc.lines:1))return W;z=`
`,Y=Z.state.doc.line(Y.number+(Q?1:-1)),K=Z.bidiSpans(Y),U=Z.visualLineSide(Y,!Q)}if(!G){if(!X)return U;G=X(z)}else if(!G(z))return W;W=U}}function lD(Z,J,Q){let X=Z.state.charCategorizer(J),Y=X(Q);return(K)=>{let q=X(K);if(Y==R6.Space)Y=q;return Y==q}}function sD(Z,J,Q,X){let Y=J.head,K=Q?1:-1;if(Y==(Q?Z.state.doc.length:0))return y.cursor(Y,J.assoc);let q=J.goalColumn,W,G=Z.contentDOM.getBoundingClientRect(),U=Z.coordsAtPos(Y,J.assoc||((J.empty?Q:J.head==J.from)?1:-1)),z=Z.documentTop;if(U){if(q==null)q=U.left-G.left;W=K<0?U.top:U.bottom}else{let F=Z.viewState.lineBlockAt(Y);if(q==null)q=Math.min(G.right-G.left,Z.defaultCharacterWidth*(Y-F.from));W=(K<0?F.top:F.bottom)+z}let I=G.left+q,V=Z.viewState.heightOracle.textHeight>>1,O=X!==null&&X!==void 0?X:V;for(let F=0;;F+=V){let N=W+(O+F)*K,R=rY(Z,{x:I,y:N},!1,K);if(Q?N>G.bottom:N<G.top)return y.cursor(R.pos,R.assoc);let P=Z.coordsAtPos(R.pos,R.assoc),T=P?(P.top+P.bottom)/2:0;if(!P||(Q?T>W:T<W))return y.cursor(R.pos,R.assoc,void 0,q)}}function a4(Z,J,Q){for(;;){let X=0;for(let Y of Z)Y.between(J-1,J+1,(K,q,W)=>{if(J>K&&J<q){let G=X||Q||(J-K<q-J?-1:1);J=G<0?K:q,X=G}});if(!X)return J}}function vI(Z,J){let Q=null;for(let X=0;X<J.ranges.length;X++){let Y=J.ranges[X],K=null;if(Y.empty){let q=a4(Z,Y.from,0);if(q!=Y.from)K=y.cursor(q,-1)}else{let q=a4(Z,Y.from,-1),W=a4(Z,Y.to,1);if(q!=Y.from||W!=Y.to)if(Y.undirectional)K=y.undirectionalRange(Y.from,Y.to);else K=y.range(Y.from==Y.anchor?q:W,Y.from==Y.head?q:W)}if(K){if(!Q)Q=J.ranges.slice();Q[X]=K}}return Q?y.create(Q,J.mainIndex):J}function wY(Z,J,Q){let X=a4(Z.state.facet(X5).map((Y)=>Y(Z)),Q.from,J.head>Q.from?-1:1);return X==Q.from?Q:y.cursor(X,X<Q.from?1:-1)}class L6{constructor(Z,J){this.pos=Z,this.assoc=J}}function rY(Z,J,Q,X){let Y=Z.contentDOM.getBoundingClientRect(),K=Y.top+Z.viewState.paddingTop,{x:q,y:W}=J,G=W-K,U;for(;;){if(G<0)return new L6(0,1);if(G>Z.viewState.docHeight)return new L6(Z.state.doc.length,-1);if(U=Z.elementAtHeight(G),X==null)break;if(U.type==U0.Text){if(X<0?U.to<Z.viewport.from:U.from>Z.viewport.to)break;let V=Z.docView.coordsAt(X<0?U.from:U.to,X>0?-1:1);if(V&&(X<0?V.top<=G+K:V.bottom>=G+K))break}let I=Z.viewState.heightOracle.textHeight/2;G=X>0?U.bottom+I:U.top-I}if(Z.viewport.from>=U.to||Z.viewport.to<=U.from){if(Q)return null;if(U.type==U0.Text){let I=dD(Z,Y,U,q,W);return new L6(I,I==U.from?1:-1)}}if(U.type!=U0.Text)return G<(U.top+U.bottom)/2?new L6(U.from,1):new L6(U.to,-1);let z=Z.docView.lineAt(U.from,2);if(!z||z.length!=U.length)z=Z.docView.lineAt(U.from,-2);return new mI(Z,q,W,Z.textDirectionAt(U.from)).scanTile(z,U.from)}class mI{constructor(Z,J,Q,X){this.view=Z,this.x=J,this.y=Q,this.baseDir=X,this.line=null,this.spans=null}bidiSpansAt(Z){if(!this.line||this.line.from>Z||this.line.to<Z)this.line=this.view.state.doc.lineAt(Z),this.spans=this.view.bidiSpans(this.line);return this}baseDirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[T6.find(X,Z-Q.from,-1,J)].level==this.baseDir}dirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[T6.find(X,Z-Q.from,-1,J)].dir}bidiIn(Z,J){let{spans:Q,line:X}=this.bidiSpansAt(Z);return Q.length>1||Q.length&&(Q[0].level!=this.baseDir||Q[0].to+X.from<J)}scan(Z,J,Q=!1){let X=0,Y=Z.length-1,K=new Set,q=this.bidiIn(Z[0],Z[Y]),W,G,U=-1,z=1e9,I;Z:while(X<Y){let O=Y-X,F=X+Y>>1;J:if(K.has(F)){for(let P=1;P<O;P++){let T=F+P;if(T>=Y)T-=O;if(!K.has(T)){F=T;break J}}break Z}K.add(F);let N=J(F),R=0;if(N)for(let P=0;P<N.length;P++){let T=N[P];if(T.width==0&&N.length>1)continue;if(T.bottom<this.y){if(!W||W.bottom<T.bottom)W=T;R=1}else if(T.top>this.y){if(!G||G.top>T.top)G=T;R=-1}else{let C=T.left>this.x?this.x-T.left:T.right<this.x?this.x-T.right:0,_=Math.abs(C);if(_<z)U=F,z=_,I=T;if(C)R=C<0==(this.baseDir==C1.LTR)?-1:1}}if(R==-1&&(!q||this.baseDirAt(Z[F],1)))Y=F;else if(R==1&&(!q||this.baseDirAt(Z[F+1],-1)))X=F+1}if(!I){if(!G&&!W)return{i:Z[0],after:!1};let O=W&&(!G||this.y-W.bottom<G.top-this.y)?W:G;return this.y=(O.top+O.bottom)/2,this.scan(Z,J,!0)}if(z&&!Q){let{top:O,bottom:F}=I;if(W&&W.bottom>(O+O+F)/3)return this.y=W.bottom-1,this.scan(Z,J,!0);if(G&&G.top<(O+F+F)/3)return this.y=G.top+1,this.scan(Z,J,!0)}let V=(q?this.dirAt(Z[U],1):this.baseDir)==C1.LTR;return{i:U,after:this.x>(I.left+I.right)/2==V}}scanText(Z,J){let Q=[];for(let Y=0;Y<Z.length;Y=K0(Z.text,Y))Q.push(J+Y);Q.push(J+Z.length);let X=this.scan(Q,(Y)=>{let K=Q[Y]-J,q=Q[Y+1]-J;return e4(Z.dom,K,q).getClientRects()});return X.after?new L6(Q[X.i+1],-1):new L6(Q[X.i],1)}scanTile(Z,J){if(!Z.length)return new L6(J,1);if(Z.children.length==1){let q=Z.children[0];if(q.isText())return this.scanText(q,J);else if(q.isComposite())return this.scanTile(q,J)}let Q=[J];for(let q=0,W=J;q<Z.children.length;q++)Q.push(W+=Z.children[q].length);let X=this.scan(Q,(q)=>{let W=Z.children[q];if(W.flags&48)return null;return(W.dom.nodeType==1?W.dom:e4(W.dom,0,W.length)).getClientRects()}),Y=Z.children[X.i],K=Q[X.i];if(Y.isText())return this.scanText(Y,K);if(Y.isComposite())return this.scanTile(Y,K);return X.after?new L6(Q[X.i+1],-1):new L6(K,1)}}var A7="￿";class pI{constructor(Z,J){this.points=Z,this.view=J,this.text="",this.lineSeparator=J.state.facet(R1.lineSeparator)}append(Z){this.text+=Z}lineBreak(){this.text+=A7}readRange(Z,J){if(!Z)return this;let Q=Z.parentNode;for(let X=Z;;){this.findPointBefore(Q,X);let Y=this.text.length;this.readNode(X);let K=p1.get(X),q=X.nextSibling;if(q==J){if((K===null||K===void 0?void 0:K.breakAfter)&&!q&&Q!=this.view.contentDOM)this.lineBreak();break}let W=p1.get(q);if((K&&W?K.breakAfter:(K?K.breakAfter:KJ(X))||KJ(q)&&(X.nodeName!="BR"||(K===null||K===void 0?void 0:K.isWidget()))&&this.text.length>Y)&&!rD(q,J))this.lineBreak();X=q}return this.findPointBefore(Q,J),this}readTextNode(Z){let J=Z.nodeValue;for(let Q of this.points)if(Q.node==Z)Q.pos=this.text.length+Math.min(Q.offset,J.length);for(let Q=0,X=this.lineSeparator?null:/\r\n?|\n/g;;){let Y=-1,K=1,q;if(this.lineSeparator)Y=J.indexOf(this.lineSeparator,Q),K=this.lineSeparator.length;else if(q=X.exec(J))Y=q.index,K=q[0].length;if(this.append(J.slice(Q,Y<0?J.length:Y)),Y<0)break;if(this.lineBreak(),K>1){for(let W of this.points)if(W.node==Z&&W.pos>this.text.length)W.pos-=K-1}Q=Y+K}}readNode(Z){let J=p1.get(Z),Q=J&&J.overrideDOMText;if(Q!=null){this.findPointInside(Z,Q.length);for(let X=Q.iter();!X.next().done;)if(X.lineBreak)this.lineBreak();else this.append(X.value)}else if(Z.nodeType==3)this.readTextNode(Z);else if(Z.nodeName=="BR"){if(Z.nextSibling)this.lineBreak()}else if(Z.nodeType==1)this.readRange(Z.firstChild,null)}findPointBefore(Z,J){for(let Q of this.points)if(Q.node==Z&&Z.childNodes[Q.offset]==J)Q.pos=this.text.length}findPointInside(Z,J){for(let Q of this.points)if(Z.nodeType==3?Q.node==Z:Z.contains(Q.node))Q.pos=this.text.length+(iD(Z,Q.node,Q.offset)?J:0)}}function iD(Z,J,Q){for(;;){if(!J||Q<L8(J))return!1;if(J==Z)return!0;Q=n8(J)+1,J=J.parentNode}}function rD(Z,J){let Q;for(;;Z=Z.nextSibling){if(Z==J||!Z)break;let X=p1.get(Z);if(!(X===null||X===void 0?void 0:X.isWidget()))return!1;if(X)(Q||(Q=[])).push(X)}if(Q)for(let X of Q){let Y=X.overrideDOMText;if(Y===null||Y===void 0?void 0:Y.length)return!1}return!0}class aY{constructor(Z,J){this.node=Z,this.offset=J,this.pos=-1}}class cI{constructor(Z,J,Q,X){this.typeOver=X,this.bounds=null,this.text="",this.domChanged=J>-1;let{impreciseHead:Y,impreciseAnchor:K}=Z.docView,q=Z.state.selection;if(Z.state.readOnly&&J>-1)this.newSel=null;else if(J>-1&&(this.bounds=dI(Z.docView.tile,J,Q,0))){let W=Y||K?[]:oD(Z),G=new pI(W,Z);G.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=G.text,this.newSel=tD(W,this.bounds.from)}else{let W=Z.observer.selectionRange,G=Y&&Y.node==W.focusNode&&Y.offset==W.focusOffset||!mY(Z.contentDOM,W.focusNode)?q.main.head:Z.docView.posFromDOM(W.focusNode,W.focusOffset),U=K&&K.node==W.anchorNode&&K.offset==W.anchorOffset||!mY(Z.contentDOM,W.anchorNode)?q.main.anchor:Z.docView.posFromDOM(W.anchorNode,W.anchorOffset),z=Z.viewport;if((i.ios||i.chrome)&&G!=U&&Math.min(G,U)<=q.main.from&&Math.max(G,U)>=q.main.to&&(z.from>0||z.to<Z.state.doc.length)){let I=Math.min(G,U),V=Math.max(G,U),O=z.from-I,F=z.to-V;if((O==0||O==1||I==0)&&(F==0||F==-1||V==Z.state.doc.length))G=0,U=Z.state.doc.length}if(Z.inputState.composing>-1&&q.ranges.length>1)this.newSel=q.replaceRange(y.range(U,G));else if(Z.lineWrapping&&U==G&&!(q.main.empty&&q.main.head==G)&&Z.inputState.lastTouchTime>Date.now()-100){let I=Z.coordsAtPos(G,-1),V=0;if(I)V=Z.inputState.lastTouchY<=I.bottom?-1:1;this.newSel=y.create([y.cursor(G,V)])}else this.newSel=y.single(U,G)}}}function dI(Z,J,Q,X){if(Z.isComposite()){let Y=-1,K=-1,q=-1,W=-1;for(let G=0,U=X,z=X;G<Z.children.length;G++){let I=Z.children[G],V=U+I.length;if(U<J&&V>Q)return dI(I,J,Q,U);if(V>=J&&Y==-1)Y=G,K=U;if(U>Q&&I.dom.parentNode==Z.dom){q=G,W=z;break}z=V,U=V+I.breakAfter}return{from:K,to:W<0?X+Z.length:W,startDOM:(Y?Z.children[Y-1].dom.nextSibling:null)||Z.dom.firstChild,endDOM:q<Z.children.length&&q>=0?Z.children[q].dom:null}}else if(Z.isText())return{from:X,to:X+Z.length,startDOM:Z.dom,endDOM:Z.dom.nextSibling};else return null}function nI(Z,J){let Q,{newSel:X}=J,{state:Y}=Z,K=Y.selection.main,q=Z.inputState.lastKeyTime>Date.now()-100?Z.inputState.lastKeyCode:-1;if(J.bounds){let{from:W,to:G}=J.bounds,U=K.from,z=null;if(q===8||i.android&&J.text.length<G-W)U=K.to,z="end";let I=Y.doc.sliceString(W,G,A7),V,O;if(!K.empty&&K.from>=W&&K.to<=G&&(J.typeOver||I!=J.text)&&I.slice(0,K.from-W)==J.text.slice(0,K.from-W)&&I.slice(K.to-W)==J.text.slice(V=J.text.length-(I.length-(K.to-W))))Q={from:K.from,to:K.to,insert:O1.of(J.text.slice(K.from-W,V).split(A7))};else if(O=lI(I,J.text,U-W,z)){if(i.chrome&&q==13&&O.toB==O.from+2&&J.text.slice(O.from,O.toB)==A7+A7)O.toB--;Q={from:W+O.from,to:W+O.toA,insert:O1.of(J.text.slice(O.from,O.toB).split(A7))}}}else if(X&&(!Z.hasFocus&&Y.facet(M8)||UJ(X,K)))X=null;if(!Q&&!X)return!1;if((i.mac||i.android)&&Q&&Q.from==Q.to&&Q.from==K.head-1&&/^\. ?$/.test(Q.insert.toString())&&Z.contentDOM.getAttribute("autocorrect")=="off"){if(X&&Q.insert.length==2)X=y.single(X.main.anchor-1,X.main.head-1);Q={from:Q.from,to:Q.to,insert:O1.of([Q.insert.toString().replace("."," ")])}}else if(Y.doc.lineAt(K.from).to<K.to&&Z.docView.lineHasWidget(K.to)&&Z.inputState.insertingTextAt>Date.now()-50)Q={from:K.from,to:K.to,insert:Y.toText(Z.inputState.insertingText)};else if(i.chrome&&Q&&Q.from==Q.to&&Q.from==K.head&&Q.insert.toString()==`
 `&&Z.lineWrapping){if(X)X=y.single(X.main.anchor-1,X.main.head-1);Q={from:K.from,to:K.to,insert:O1.of([" "])}}if(Q)return H3(Z,Q,X,q);else if(X&&!UJ(X,K)){let W=!1,G="select";if(Z.inputState.lastSelectionTime>Date.now()-50){if(Z.inputState.lastSelectionOrigin=="select")W=!0;if(G=Z.inputState.lastSelectionOrigin,G=="select.pointer")X=vI(Y.facet(X5).map((U)=>U(Z)),X)}return Z.dispatch({selection:X,scrollIntoView:W,userEvent:G}),!0}else return!1}function H3(Z,J,Q,X=-1){if(i.ios&&Z.inputState.flushIOSKey(J))return!0;let Y=Z.state.selection.main;if(i.android&&(J.to==Y.to&&(J.from==Y.from||J.from==Y.from-1&&Z.state.sliceDoc(J.from,Y.from)==" ")&&J.insert.length==1&&J.insert.lines==2&&T7(Z.contentDOM,"Enter",13)||(J.from==Y.from-1&&J.to==Y.to&&J.insert.length==0||X==8&&J.insert.length<J.to-J.from&&J.to>Y.head)&&T7(Z.contentDOM,"Backspace",8)||J.from==Y.from&&J.to==Y.to+1&&J.insert.length==0&&T7(Z.contentDOM,"Delete",46)))return!0;let K=J.insert.toString();if(Z.inputState.composing>=0)Z.inputState.composing++;let q,W=()=>q||(q=aD(Z,J,Q));if(!Z.state.facet(AI).some((G)=>G(Z,J.from,J.to,K,W)))Z.dispatch(W());return!0}function aD(Z,J,Q){let X,Y=Z.state,K=Y.selection.main,q=-1;if(J.from==J.to&&J.from<K.from||J.from>K.to){let G=J.from<K.from?-1:1,U=G<0?K.from:K.to,z=a4(Y.facet(X5).map((I)=>I(Z)),U,G);if(J.from==z)q=z}if(q>-1)X={changes:J,selection:y.cursor(J.from+J.insert.length,-1)};else if(J.from>=K.from&&J.to<=K.to&&J.to-J.from>=(K.to-K.from)/3&&(!Q||Q.main.empty&&Q.main.from==J.from+J.insert.length)&&Z.inputState.composing<0){let G=K.from<J.from?Y.sliceDoc(K.from,J.from):"",U=K.to>J.to?Y.sliceDoc(J.to,K.to):"";X=Y.replaceSelection(Z.state.toText(G+J.insert.sliceString(0,void 0,Z.state.lineBreak)+U))}else{let G=Y.changes(J),U=Q&&Q.main.to<=G.newLength?Q.main:void 0;if(Y.selection.ranges.length>1&&(Z.inputState.composing>=0||Z.inputState.compositionPendingChange)&&J.to<=K.to+10&&J.to>=K.to-10){let z=Z.state.sliceDoc(J.from,J.to),I,V=Q&&gI(Z,Q.main.head);if(V){let F=J.insert.length-(J.to-J.from);I={from:V.from,to:V.to-F}}else I=Z.state.doc.lineAt(K.head);let O=K.to-J.to;X=Y.changeByRange((F)=>{if(F.from==K.from&&F.to==K.to)return{changes:G,range:U||F.map(G)};let N=F.to-O,R=N-z.length;if(Z.state.sliceDoc(R,N)!=z||N>=I.from&&R<=I.to)return{range:F};let P=Y.changes({from:R,to:N,insert:J.insert}),T=F.to-K.to;return{changes:P,range:!U?F.map(P):y.range(Math.max(0,U.anchor+T),Math.max(0,U.head+T))}})}else X={changes:G,selection:U&&Y.selection.replaceRange(U)}}let W="input.type";if(Z.composing||Z.inputState.compositionPendingChange&&Z.inputState.compositionEndedAt>Date.now()-50){if(Z.inputState.compositionPendingChange=!1,W+=".compose",Z.inputState.compositionFirstChange)W+=".start",Z.inputState.compositionFirstChange=!1}return Y.update(X,{userEvent:W,scrollIntoView:!0})}function lI(Z,J,Q,X){let Y=Math.min(Z.length,J.length),K=0;while(K<Y&&Z.charCodeAt(K)==J.charCodeAt(K))K++;if(K==Y&&Z.length==J.length)return null;let q=Z.length,W=J.length;while(q>0&&W>0&&Z.charCodeAt(q-1)==J.charCodeAt(W-1))q--,W--;if(X=="end"){let G=Math.max(0,K-Math.min(q,W));Q-=q+G-K}if(q<K&&Z.length<J.length){let G=Q<=K&&Q>=q?K-Q:0;K-=G,W=K+(W-q),q=K}else if(W<K){let G=Q<=K&&Q>=W?K-Q:0;K-=G,q=K+(q-W),W=K}return{from:K,toA:q,toB:W}}function oD(Z){let J=[];if(Z.root.activeElement!=Z.contentDOM)return J;let{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}=Z.observer.selectionRange;if(Q){if(J.push(new aY(Q,X)),Y!=Q||K!=X)J.push(new aY(Y,K))}return J}function tD(Z,J){if(Z.length==0)return null;let Q=Z[0].pos,X=Z.length==2?Z[1].pos:Q;return Q>-1&&X>-1?y.single(Q+J,X+J):null}function UJ(Z,J){return J.head==Z.main.head&&J.anchor==Z.main.anchor}class sI{setSelectionOrigin(Z){this.lastSelectionOrigin=Z,this.lastSelectionTime=Date.now()}constructor(Z){if(this.view=Z,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=Z.hasFocus,i.safari)Z.contentDOM.addEventListener("input",()=>null);if(i.gecko)jM(Z.contentDOM.ownerDocument)}handleEvent(Z){if(!qM(this.view,Z)||this.ignoreDuringComposition(Z))return;if(Z.type=="keydown"&&this.keydown(Z))return;if(this.view.updateState!=0)Promise.resolve().then(()=>this.runHandlers(Z.type,Z));else this.runHandlers(Z.type,Z)}runHandlers(Z,J){let Q=this.handlers[Z];if(Q){for(let X of Q.observers)X(this.view,J);for(let X of Q.handlers){if(J.defaultPrevented)break;if(X(this.view,J)){J.preventDefault();break}}}}ensureHandlers(Z){let J=ZM(Z),Q=this.handlers,X=this.view.contentDOM;for(let Y in J)if(Y!="scroll"){let K=!J[Y].handlers.length,q=Q[Y];if(q&&K!=!q.handlers.length)X.removeEventListener(Y,this.handleEvent),q=null;if(!q)X.addEventListener(Y,this.handleEvent,{passive:K})}for(let Y in Q)if(Y!="scroll"&&!J[Y])X.removeEventListener(Y,this.handleEvent);this.handlers=J}keydown(Z){if(this.lastKeyCode=Z.keyCode,this.lastKeyTime=Date.now(),Z.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&Z.keyCode!=27&&rI.indexOf(Z.keyCode)<0)this.tabFocusMode=-1;if(i.android&&i.chrome&&!Z.synthetic&&(Z.keyCode==13||Z.keyCode==8))return this.view.observer.delayAndroidKey(Z.key,Z.keyCode),!0;if(i.ios&&!Z.synthetic&&!Z.altKey&&!Z.metaKey&&(iI.some((J)=>J.keyCode==Z.keyCode)&&!Z.ctrlKey||JM.indexOf(Z.key)>-1&&Z.ctrlKey)){let J={ctrlKey:Z.ctrlKey,altKey:Z.altKey,metaKey:Z.metaKey,shiftKey:Z.shiftKey};if(J.shiftKey&&i.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&eD(this.view.win))J.shiftKey=!1;return this.pendingIOSKey={key:Z.key,keyCode:Z.keyCode,mods:J},setTimeout(()=>this.flushIOSKey(),250),!0}if(Z.keyCode!=229)this.view.observer.forceFlush();return!1}flushIOSKey(Z){let J=this.pendingIOSKey;if(!J)return!1;if(J.key=="Enter"&&Z&&Z.from<Z.to&&/^\S+$/.test(Z.insert.toString()))return!1;return this.pendingIOSKey=void 0,T7(this.view.contentDOM,J.key,J.keyCode,J.mods)}ignoreDuringComposition(Z){if(!/^key/.test(Z.type)||Z.synthetic)return!1;if(this.composing>0)return!0;if(i.safari&&!i.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100)return this.compositionPendingKey=!1,!0;return!1}startMouseSelection(Z){if(this.mouseSelection)this.mouseSelection.destroy();this.mouseSelection=Z}update(Z){if(this.view.observer.update(Z),this.mouseSelection)this.mouseSelection.update(Z);if(this.draggedContent&&Z.docChanged)this.draggedContent=this.draggedContent.map(Z.changes);if(Z.transactions.length)this.lastKeyCode=this.lastSelectionTime=0}destroy(){if(this.mouseSelection)this.mouseSelection.destroy()}}function eD(Z){if(!Z.visualViewport)return!1;return Z.visualViewport.height*Z.visualViewport.scale/Z.document.documentElement.clientHeight<0.85}function kz(Z,J){return(Q,X)=>{try{return J.call(Z,X,Q)}catch(Y){p0(Q.state,Y)}}}function ZM(Z){let J=Object.create(null);function Q(X){return J[X]||(J[X]={observers:[],handlers:[]})}for(let X of Z){let Y=X.spec,K=Y&&Y.plugin.domEventHandlers,q=Y&&Y.plugin.domEventObservers;if(K)for(let W in K){let G=K[W];if(G)Q(W).handlers.push(kz(X.value,G))}if(q)for(let W in q){let G=q[W];if(G)Q(W).observers.push(kz(X.value,G))}}for(let X in S6)Q(X).handlers.push(S6[X]);for(let X in P0)Q(X).observers.push(P0[X]);return J}var iI=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],JM="dthko",rI=[16,17,18,20,91,92,224,225],pZ=6;function cZ(Z){return Math.max(0,Z)*0.7+8}function QM(Z,J){return Math.max(Math.abs(Z.clientX-J.clientX),Math.abs(Z.clientY-J.clientY))}class aI{constructor(Z,J,Q,X){this.view=Z,this.startEvent=J,this.style=Q,this.mustSelect=X,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=J,this.scrollParents=YI(Z.contentDOM),this.atoms=Z.state.facet(X5).map((K)=>K(Z));let Y=Z.contentDOM.ownerDocument;Y.addEventListener("mousemove",this.move=this.move.bind(this)),Y.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=J.shiftKey,this.multiple=Z.state.facet(R1.allowMultipleSelections)&&XM(Z,J),this.dragging=KM(Z,J)&&eI(J)==1?null:!1}start(Z){if(this.dragging===!1)this.select(Z)}move(Z){if(Z.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&QM(this.startEvent,Z)<10)return;this.select(this.lastEvent=Z);let J=0,Q=0,X=0,Y=0,K=this.view.win.innerWidth,q=this.view.win.innerHeight;if(this.scrollParents.x)({left:X,right:K}=this.scrollParents.x.getBoundingClientRect());if(this.scrollParents.y)({top:Y,bottom:q}=this.scrollParents.y.getBoundingClientRect());let W=j3(this.view);if(Z.clientX-W.left<=X+pZ)J=-cZ(X-Z.clientX);else if(Z.clientX+W.right>=K-pZ)J=cZ(Z.clientX-K);if(Z.clientY-W.top<=Y+pZ)Q=-cZ(Y-Z.clientY);else if(Z.clientY+W.bottom>=q-pZ)Q=cZ(Z.clientY-q);this.setScrollSpeed(J,Q)}up(Z){if(this.dragging==null)this.select(this.lastEvent);if(!this.dragging)Z.preventDefault();this.destroy()}destroy(){this.setScrollSpeed(0,0);let Z=this.view.contentDOM.ownerDocument;Z.removeEventListener("mousemove",this.move),Z.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(Z,J){if(this.scrollSpeed={x:Z,y:J},Z||J){if(this.scrolling<0)this.scrolling=setInterval(()=>this.scroll(),50)}else if(this.scrolling>-1)clearInterval(this.scrolling),this.scrolling=-1}scroll(){let{x:Z,y:J}=this.scrollSpeed;if(Z&&this.scrollParents.x)this.scrollParents.x.scrollLeft+=Z,Z=0;if(J&&this.scrollParents.y)this.scrollParents.y.scrollTop+=J,J=0;if(Z||J)this.view.win.scrollBy(Z,J);if(this.dragging===!1)this.select(this.lastEvent)}select(Z){let{view:J}=this,Q=vI(this.atoms,this.style.get(Z,this.extend,this.multiple));if(this.mustSelect||!Q.eq(J.state.selection,this.dragging===!1))this.view.dispatch({selection:Q,userEvent:"select.pointer"});this.mustSelect=!1}update(Z){if(Z.transactions.some((J)=>J.isUserEvent("input.type")))this.destroy();else if(this.style.update(Z))setTimeout(()=>this.select(this.lastEvent),20)}}function XM(Z,J){let Q=Z.state.facet(NI);return Q.length?Q[0](J):i.mac?J.metaKey:J.ctrlKey}function YM(Z,J){let Q=Z.state.facet(RI);return Q.length?Q[0](J):i.mac?!J.altKey:!J.ctrlKey}function KM(Z,J){let{main:Q}=Z.state.selection;if(Q.empty)return!1;let X=t4(Z.root);if(!X||X.rangeCount==0)return!0;let Y=X.getRangeAt(0).getClientRects();for(let K=0;K<Y.length;K++){let q=Y[K];if(q.left<=J.clientX&&q.right>=J.clientX&&q.top<=J.clientY&&q.bottom>=J.clientY)return!0}return!1}function qM(Z,J){if(!J.bubbles)return!0;if(J.defaultPrevented)return!1;for(let Q=J.target,X;Q!=Z.contentDOM;Q=Q.parentNode)if(!Q||Q.nodeType==11||(X=p1.get(Q))&&X.isWidget()&&!X.isHidden&&X.widget.ignoreEvent(J))return!1;return!0}var S6=Object.create(null),P0=Object.create(null),oI=i.ie&&i.ie_version<15||i.ios&&i.webkit_version<604;function WM(Z){let J=Z.dom.parentNode;if(!J)return;let Q=J.appendChild(document.createElement("textarea"));Q.style.cssText="position: fixed; left: -10000px; top: 10px",Q.focus(),setTimeout(()=>{Z.focus(),Q.remove(),tI(Z,Q.value)},50)}function OJ(Z,J,Q){for(let X of Z.facet(J))Q=X(Q,Z);return Q}function tI(Z,J){J=OJ(Z.state,U3,J);let{state:Q}=Z,X,Y=1,K=Q.toText(J),q=K.lines==Q.selection.ranges.length;if(oY!=null&&Q.selection.ranges.every((G)=>G.empty)&&oY==K.toString()){let G=-1;X=Q.changeByRange((U)=>{let z=Q.doc.lineAt(U.from);if(z.from==G)return{range:U};G=z.from;let I=Q.toText((q?K.line(Y++).text:J)+Q.lineBreak);return{changes:{from:z.from,insert:I},range:y.cursor(U.from+I.length)}})}else if(q)X=Q.changeByRange((G)=>{let U=K.line(Y++);return{changes:{from:G.from,to:G.to,insert:U.text},range:y.cursor(G.from+U.length)}});else X=Q.replaceSelection(K);Z.dispatch(X,{userEvent:"input.paste",scrollIntoView:!0})}P0.scroll=(Z)=>{let J=Z.inputState;if(J.lastScrollTop=Z.scrollDOM.scrollTop,J.lastScrollLeft=Z.scrollDOM.scrollLeft,i.ios&&!J.touchActive)J.lastIOSMomentumScroll=Date.now()};P0.wheel=P0.mousewheel=(Z)=>{Z.inputState.lastWheelEvent=Date.now()};S6.keydown=(Z,J)=>{if(Z.inputState.setSelectionOrigin("select"),J.keyCode==27&&Z.inputState.tabFocusMode!=0)Z.inputState.tabFocusMode=Date.now()+2000;return!1};P0.touchstart=(Z,J)=>{let Q=Z.inputState,X=J.targetTouches[0];if(Q.touchActive=!0,Q.lastTouchTime=Date.now(),X)Q.lastTouchX=X.clientX,Q.lastTouchY=X.clientY;Q.setSelectionOrigin("select.pointer")};P0.touchmove=(Z)=>{Z.inputState.setSelectionOrigin("select.pointer")};P0.touchend=(Z,J)=>{Z.inputState.touchActive=!1};S6.mousedown=(Z,J)=>{if(Z.observer.flush(),Z.inputState.lastTouchTime>Date.now()-2000)return!1;let Q=null;for(let X of Z.state.facet(DI))if(Q=X(Z,J),Q)break;if(!Q&&J.button==0)Q=UM(Z,J);if(Q){let X=!Z.hasFocus;if(Z.inputState.startMouseSelection(new aI(Z,J,Q,X)),X)Z.observer.ignore(()=>{GI(Z.contentDOM);let K=Z.root.activeElement;if(K&&!K.contains(Z.contentDOM))K.blur()});let Y=Z.inputState.mouseSelection;if(Y)return Y.start(J),Y.dragging===!1}else Z.inputState.setSelectionOrigin("select.pointer");return!1};function xz(Z,J,Q,X){if(X==1)return y.cursor(J,Q);else if(X==2)return cD(Z.state,J,Q);else{let Y=Z.docView.lineAt(J,Q),K=Z.state.doc.lineAt(Y?Y.posAtEnd:J),q=Y?Y.posAtStart:K.from,W=Y?Y.posAtEnd:K.to;if(W<Z.state.doc.length&&W==K.to)W++;return y.undirectionalRange(q,W)}}var GM=i.ie&&i.ie_version<=11,wz=null,bz=0,yz=0;function eI(Z){if(!GM)return Z.detail;let J=wz,Q=yz;return wz=Z,yz=Date.now(),bz=!J||Q>Date.now()-400&&Math.abs(J.clientX-Z.clientX)<2&&Math.abs(J.clientY-Z.clientY)<2?(bz+1)%3:1}function UM(Z,J){let Q=Z.posAndSideAtCoords({x:J.clientX,y:J.clientY},!1),X=eI(J),Y=Z.state.selection;return{update(K){if(K.docChanged)Q.pos=K.changes.mapPos(Q.pos),Y=Y.map(K.changes)},get(K,q,W){let G=Z.posAndSideAtCoords({x:K.clientX,y:K.clientY},!1),U,z=xz(Z,G.pos,G.assoc,X);if(Q.pos!=G.pos&&!q){let I=xz(Z,Q.pos,Q.assoc,X),V=Math.min(I.from,z.from),O=Math.max(I.to,z.to);z=V<z.from?y.range(V,O,z.assoc):y.range(O,V,z.assoc)}if(q)return Y.replaceRange(Y.main.extend(z.from,z.to,z.assoc));else if(W&&X==1&&Y.ranges.length>1&&(U=zM(Y,G.pos)))return U;else if(W)return Y.addRange(z);else return y.create([z])}}}function zM(Z,J){for(let Q=0;Q<Z.ranges.length;Q++){let{from:X,to:Y}=Z.ranges[Q];if(X<=J&&Y>=J)return y.create(Z.ranges.slice(0,Q).concat(Z.ranges.slice(Q+1)),Z.mainIndex==Q?0:Z.mainIndex-(Z.mainIndex>Q?1:0))}return null}S6.dragstart=(Z,J)=>{let{selection:{main:Q}}=Z.state;if(J.target.draggable){let Y=Z.docView.tile.nearest(J.target);if(Y&&Y.isWidget()){let K=Y.posAtStart,q=K+Y.length;if(K>=Q.to||q<=Q.from)Q=y.undirectionalRange(K,q)}}let{inputState:X}=Z;if(X.mouseSelection)X.mouseSelection.dragging=!0;if(X.draggedContent=Q,J.dataTransfer)J.dataTransfer.setData("Text",OJ(Z.state,z3,Z.state.sliceDoc(Q.from,Q.to))),J.dataTransfer.effectAllowed="copyMove";return!1};S6.dragend=(Z)=>{return Z.inputState.draggedContent=null,!1};function $z(Z,J,Q,X){if(Q=OJ(Z.state,U3,Q),!Q)return;let Y=Z.posAtCoords({x:J.clientX,y:J.clientY},!1),{draggedContent:K}=Z.inputState,q=X&&K&&YM(Z,J)?{from:K.from,to:K.to}:null,W={from:Y,insert:Q},G=Z.state.changes(q?[q,W]:W);Z.focus(),Z.dispatch({changes:G,selection:{anchor:G.mapPos(Y,-1),head:G.mapPos(Y,1)},userEvent:q?"move.drop":"input.drop"}),Z.inputState.draggedContent=null}S6.drop=(Z,J)=>{if(!J.dataTransfer)return!1;if(Z.state.readOnly)return!0;let Q=J.dataTransfer.files;if(Q&&Q.length){let X=Array(Q.length),Y=0,K=()=>{if(++Y==Q.length)$z(Z,J,X.filter((q)=>q!=null).join(Z.state.lineBreak),!1)};for(let q=0;q<Q.length;q++){let W=new FileReader;W.onerror=K,W.onload=()=>{if(!/[\x00-\x08\x0e-\x1f]{2}/.test(W.result))X[q]=W.result;K()},W.readAsText(Q[q])}return!0}else{let X=J.dataTransfer.getData("Text");if(X)return $z(Z,J,X,!0),!0}return!1};S6.paste=(Z,J)=>{if(Z.state.readOnly)return!0;Z.observer.flush();let Q=oI?null:J.clipboardData;if(Q)return tI(Z,Q.getData("text/plain")||Q.getData("text/uri-list")),!0;else return WM(Z),!1};function IM(Z,J){let Q=Z.dom.parentNode;if(!Q)return;let X=Q.appendChild(document.createElement("textarea"));X.style.cssText="position: fixed; left: -10000px; top: 10px",X.value=J,X.focus(),X.selectionEnd=J.length,X.selectionStart=0,setTimeout(()=>{X.remove(),Z.focus()},50)}function VM(Z){let J=[],Q=[],X=!1;for(let Y of Z.selection.ranges)if(!Y.empty)J.push(Z.sliceDoc(Y.from,Y.to)),Q.push(Y);if(!J.length){let Y=-1;for(let{from:K}of Z.selection.ranges){let q=Z.doc.lineAt(K);if(q.number>Y)J.push(q.text),Q.push({from:q.from,to:Math.min(Z.doc.length,q.to+1)});Y=q.number}X=!0}return{text:OJ(Z,z3,J.join(Z.lineBreak)),ranges:Q,linewise:X}}var oY=null;S6.copy=S6.cut=(Z,J)=>{if(!i4(Z.contentDOM,Z.observer.selectionRange))return!1;let{text:Q,ranges:X,linewise:Y}=VM(Z.state);if(!Q&&!Y)return!1;if(oY=Y?Q:null,J.type=="cut"&&!Z.state.readOnly)Z.dispatch({changes:X,scrollIntoView:!0,userEvent:"delete.cut"});let K=oI?null:J.clipboardData;if(K)return K.clearData(),K.setData("text/plain",Q),!0;else return IM(Z,Q),!1};var ZV=M6.define();function JV(Z,J){let Q=[];for(let X of Z.facet(LI)){let Y=X(Z,J);if(Y)Q.push(Y)}return Q.length?Z.update({effects:Q,annotations:ZV.of(!0)}):null}function QV(Z){setTimeout(()=>{let J=Z.hasFocus;if(J!=Z.inputState.notifiedFocused){let Q=JV(Z.state,J);if(Q)Z.dispatch(Q);else Z.update([])}},10)}P0.focus=(Z)=>{if(Z.inputState.lastFocusTime=Date.now(),!Z.scrollDOM.scrollTop&&(Z.inputState.lastScrollTop||Z.inputState.lastScrollLeft))Z.scrollDOM.scrollTop=Z.inputState.lastScrollTop,Z.scrollDOM.scrollLeft=Z.inputState.lastScrollLeft;QV(Z)};P0.blur=(Z)=>{Z.observer.clearSelectionRange(),QV(Z)};P0.compositionstart=P0.compositionupdate=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.compositionFirstChange==null)Z.inputState.compositionFirstChange=!0;if(Z.inputState.composing<0)Z.inputState.composing=0};P0.compositionend=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.composing=-1,Z.inputState.compositionEndedAt=Date.now(),Z.inputState.compositionPendingKey=!0,Z.inputState.compositionPendingChange=Z.observer.pendingRecords().length>0,Z.inputState.compositionFirstChange=null,i.chrome&&i.android)Z.observer.flushSoon();else if(Z.inputState.compositionPendingChange)Promise.resolve().then(()=>Z.observer.flush());else setTimeout(()=>{if(Z.inputState.composing<0&&Z.docView.hasComposition)Z.update([])},50)};P0.contextmenu=(Z)=>{Z.inputState.lastContextMenu=Date.now()};S6.beforeinput=(Z,J)=>{var Q,X;if(J.inputType=="insertText"||J.inputType=="insertCompositionText")Z.inputState.insertingText=J.data,Z.inputState.insertingTextAt=Date.now();if(J.inputType=="insertReplacementText"&&Z.observer.editContext){let K=(Q=J.dataTransfer)===null||Q===void 0?void 0:Q.getData("text/plain"),q=J.getTargetRanges();if(K&&q.length){let W=q[0],G=Z.posAtDOM(W.startContainer,W.startOffset),U=Z.posAtDOM(W.endContainer,W.endOffset);return H3(Z,{from:G,to:U,insert:Z.state.toText(K)},null),!0}}let Y;if(i.chrome&&i.android&&(Y=iI.find((K)=>K.inputType==J.inputType))){if(Z.observer.delayAndroidKey(Y.key,Y.keyCode),Y.key=="Backspace"||Y.key=="Delete"){let K=((X=window.visualViewport)===null||X===void 0?void 0:X.height)||0;setTimeout(()=>{var q;if((((q=window.visualViewport)===null||q===void 0?void 0:q.height)||0)>K+10&&Z.hasFocus)Z.contentDOM.blur(),Z.focus()},100)}}if(i.ios&&J.inputType=="deleteContentForward")Z.observer.flushSoon();if(i.safari&&J.inputType=="insertText"&&Z.inputState.composing>=0)setTimeout(()=>P0.compositionend(Z,J),20);return!1};var hz=new Set;function jM(Z){if(!hz.has(Z))hz.add(Z),Z.addEventListener("copy",()=>{}),Z.addEventListener("cut",()=>{})}var fz=["pre-wrap","normal","pre-line","break-spaces"],C7=!1;function gz(){C7=!1}class XV{constructor(Z){this.lineWrapping=Z,this.doc=O1.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(Z,J){let Q=this.doc.lineAt(J).number-this.doc.lineAt(Z).number+1;if(this.lineWrapping)Q+=Math.max(0,Math.ceil((J-Z-Q*this.lineLength*0.5)/this.lineLength));return this.lineHeight*Q}heightForLine(Z){if(!this.lineWrapping)return this.lineHeight;return(1+Math.max(0,Math.ceil((Z-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight}setDoc(Z){return this.doc=Z,this}mustRefreshForWrapping(Z){return fz.indexOf(Z)>-1!=this.lineWrapping}mustRefreshForHeights(Z){let J=!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q];if(X<0)Q++;else if(!this.heightSamples[Math.floor(X*10)])J=!0,this.heightSamples[Math.floor(X*10)]=!0}return J}refresh(Z,J,Q,X,Y,K){let q=fz.indexOf(Z)>-1,W=Math.abs(J-this.lineHeight)>0.3||this.lineWrapping!=q;if(this.lineWrapping=q,this.lineHeight=J,this.charWidth=Q,this.textHeight=X,this.lineLength=Y,W){this.heightSamples={};for(let G=0;G<K.length;G++){let U=K[G];if(U<0)G++;else this.heightSamples[Math.floor(U*10)]=!0}}return W}}class YV{constructor(Z,J){this.from=Z,this.heights=J,this.index=0}get more(){return this.index<this.heights.length}}class B6{constructor(Z,J,Q,X,Y){this.from=Z,this.length=J,this.top=Q,this.height=X,this._content=Y}get type(){return typeof this._content=="number"?U0.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof b9?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(Z){let J=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(Z._content)?Z._content:[Z]);return new B6(this.from,this.length+Z.length,this.top,this.height+Z.height,J)}}var b1=function(Z){return Z[Z.ByPos=0]="ByPos",Z[Z.ByHeight=1]="ByHeight",Z[Z.ByPosNoHeight=2]="ByPosNoHeight",Z}(b1||(b1={})),eZ=0.001;class B0{constructor(Z,J,Q=2){this.length=Z,this.height=J,this.flags=Q}get outdated(){return(this.flags&2)>0}set outdated(Z){this.flags=(Z?2:0)|this.flags&-3}setHeight(Z){if(this.height!=Z){if(Math.abs(this.height-Z)>eZ)C7=!0;this.height=Z}}replace(Z,J,Q){return B0.of(Q)}decomposeLeft(Z,J){J.push(this)}decomposeRight(Z,J){J.push(this)}applyChanges(Z,J,Q,X){let Y=this,K=Q.doc;for(let q=X.length-1;q>=0;q--){let{fromA:W,toA:G,fromB:U,toB:z}=X[q],I=Y.lineAt(W,b1.ByPosNoHeight,Q.setDoc(J),0,0),V=I.to>=G?I:Y.lineAt(G,b1.ByPosNoHeight,Q,0,0);z+=V.to-G,G=V.to;while(q>0&&I.from<=X[q-1].toA)if(W=X[q-1].fromA,U=X[q-1].fromB,q--,W<I.from)I=Y.lineAt(W,b1.ByPosNoHeight,Q,0,0);U+=I.from-W,W=I.from;let O=F3.build(Q.setDoc(K),Z,U,z);Y=zJ(Y,Y.replace(W,G,O))}return Y.updateHeight(Q,0)}static empty(){return new m0(0,0,0)}static of(Z){if(Z.length==1)return Z[0];let J=0,Q=Z.length,X=0,Y=0;for(;;)if(J==Q)if(X>Y*2){let q=Z[J-1];if(q.break)Z.splice(--J,1,q.left,null,q.right);else Z.splice(--J,1,q.left,q.right);Q+=1+q.break,X-=q.size}else if(Y>X*2){let q=Z[Q];if(q.break)Z.splice(Q,1,q.left,null,q.right);else Z.splice(Q,1,q.left,q.right);Q+=2+q.break,Y-=q.size}else break;else if(X<Y){let q=Z[J++];if(q)X+=q.size}else{let q=Z[--Q];if(q)Y+=q.size}let K=0;if(Z[J-1]==null)K=1,J--;else if(Z[J]==null)K=1,Q++;return new KV(B0.of(Z.slice(0,J)),K,B0.of(Z.slice(Q)))}}function zJ(Z,J){if(Z==J)return Z;if(Z.constructor!=J.constructor)C7=!0;return J}B0.prototype.size=1;var HM=M1.replace({});class O3 extends B0{constructor(Z,J,Q){super(Z,J);this.deco=Q,this.spaceAbove=0}mainBlock(Z,J){return new B6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(Z,J,Q,X){return this.spaceAbove&&Z<Q+this.spaceAbove?new B6(X,0,Q,this.spaceAbove,HM):this.mainBlock(Q,X)}lineAt(Z,J,Q,X,Y){let K=this.mainBlock(X,Y);return this.spaceAbove?this.blockAt(0,Q,X,Y).join(K):K}forEachLine(Z,J,Q,X,Y,K){if(Z<=Y+this.length&&J>=Y)K(this.lineAt(0,b1.ByPos,Q,X,Y))}setMeasuredHeight(Z){let J=Z.heights[Z.index++];if(J<0)this.spaceAbove=-J,J=Z.heights[Z.index++];else this.spaceAbove=0;this.setHeight(J)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);return this.outdated=!1,this}toString(){return`block(${this.length})`}}class m0 extends O3{constructor(Z,J,Q){super(Z,J,null);this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=Q}mainBlock(Z,J){return new B6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(Z,J,Q){let X=Q[0];if(Q.length==1&&(X instanceof m0||X instanceof G0&&X.flags&4)&&Math.abs(this.length-X.length)<10){if(X instanceof G0)X=new m0(X.length,this.height,this.spaceAbove);else X.height=this.height;if(!this.outdated)X.outdated=!1;return X}else return B0.of(Q)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);else if(Q||this.outdated)this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,Z.heightForLine(this.length-this.collapsed))+this.breaks*Z.lineHeight);return this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class G0 extends B0{constructor(Z){super(Z,0)}heightMetrics(Z,J){let Q=Z.doc.lineAt(J).number,X=Z.doc.lineAt(J+this.length).number,Y=X-Q+1,K,q=0;if(Z.lineWrapping){let W=Math.min(this.height,Z.lineHeight*Y);if(K=W/Y,this.length>Y+1)q=(this.height-W)/(this.length-Y-1)}else K=this.height/Y;return{firstLine:Q,lastLine:X,perLine:K,perChar:q}}blockAt(Z,J,Q,X){let{firstLine:Y,lastLine:K,perLine:q,perChar:W}=this.heightMetrics(J,X);if(J.lineWrapping){let G=X+(Z<J.lineHeight?0:Math.round(Math.max(0,Math.min(1,(Z-Q)/this.height))*this.length)),U=J.doc.lineAt(G),z=q+U.length*W,I=Math.max(Q,Z-z/2);return new B6(U.from,U.length,I,z,0)}else{let G=Math.max(0,Math.min(K-Y,Math.floor((Z-Q)/q))),{from:U,length:z}=J.doc.line(Y+G);return new B6(U,z,Q+q*G,q,0)}}lineAt(Z,J,Q,X,Y){if(J==b1.ByHeight)return this.blockAt(Z,Q,X,Y);if(J==b1.ByPosNoHeight){let{from:V,to:O}=Q.doc.lineAt(Z);return new B6(V,O-V,0,0,0)}let{firstLine:K,perLine:q,perChar:W}=this.heightMetrics(Q,Y),G=Q.doc.lineAt(Z),U=q+G.length*W,z=G.number-K,I=X+q*z+W*(G.from-Y-z);return new B6(G.from,G.length,Math.max(X,Math.min(I,X+this.height-U)),U,0)}forEachLine(Z,J,Q,X,Y,K){Z=Math.max(Z,Y),J=Math.min(J,Y+this.length);let{firstLine:q,perLine:W,perChar:G}=this.heightMetrics(Q,Y);for(let U=Z,z=X;U<=J;){let I=Q.doc.lineAt(U);if(U==Z){let O=I.number-q;z+=W*O+G*(Z-Y-O)}let V=W+G*I.length;K(new B6(I.from,I.length,z,V,0)),z+=V,U=I.to+1}}replace(Z,J,Q){let X=this.length-J;if(X>0){let Y=Q[Q.length-1];if(Y instanceof G0)Q[Q.length-1]=new G0(Y.length+X);else Q.push(null,new G0(X-1))}if(Z>0){let Y=Q[0];if(Y instanceof G0)Q[0]=new G0(Z+Y.length);else Q.unshift(new G0(Z-1),null)}return B0.of(Q)}decomposeLeft(Z,J){J.push(new G0(Z-1),null)}decomposeRight(Z,J){J.push(null,new G0(this.length-Z-1))}updateHeight(Z,J=0,Q=!1,X){let Y=J+this.length;if(X&&X.from<=J+this.length&&X.more){let K=[],q=Math.max(J,X.from),W=-1;if(X.from>J)K.push(new G0(X.from-J-1).updateHeight(Z,J));while(q<=Y&&X.more){let U=Z.doc.lineAt(q).length;if(K.length)K.push(null);let z=X.heights[X.index++],I=0;if(z<0)I=-z,z=X.heights[X.index++];if(W==-1)W=z;else if(Math.abs(z-W)>=eZ)W=-2;let V=new m0(U,z,I);V.outdated=!1,K.push(V),q+=U+1}if(q<=Y)K.push(null,new G0(Y-q).updateHeight(Z,q));let G=B0.of(K);if(W<0||Math.abs(G.height-this.height)>=eZ||Math.abs(W-this.heightMetrics(Z,J).perLine)>=eZ)C7=!0;return zJ(this,G)}else if(Q||this.outdated)this.setHeight(Z.heightForGap(J,J+this.length)),this.outdated=!1;return this}toString(){return`gap(${this.length})`}}class KV extends B0{constructor(Z,J,Q){super(Z.length+J+Q.length,Z.height+Q.height,J|(Z.outdated||Q.outdated?2:0));this.left=Z,this.right=Q,this.size=Z.size+Q.size}get break(){return this.flags&1}blockAt(Z,J,Q,X){let Y=Q+this.left.height;return Z<Y?this.left.blockAt(Z,J,Q,X):this.right.blockAt(Z,J,Y,X+this.left.length+this.break)}lineAt(Z,J,Q,X,Y){let K=X+this.left.height,q=Y+this.left.length+this.break,W=J==b1.ByHeight?Z<K:Z<q,G=W?this.left.lineAt(Z,J,Q,X,Y):this.right.lineAt(Z,J,Q,K,q);if(this.break||(W?G.to<q:G.from>q))return G;let U=J==b1.ByPosNoHeight?b1.ByPosNoHeight:b1.ByPos;if(W)return G.join(this.right.lineAt(q,U,Q,K,q));else return this.left.lineAt(q,U,Q,X,Y).join(G)}forEachLine(Z,J,Q,X,Y,K){let q=X+this.left.height,W=Y+this.left.length+this.break;if(this.break){if(Z<W)this.left.forEachLine(Z,J,Q,X,Y,K);if(J>=W)this.right.forEachLine(Z,J,Q,q,W,K)}else{let G=this.lineAt(W,b1.ByPos,Q,X,Y);if(Z<G.from)this.left.forEachLine(Z,G.from-1,Q,X,Y,K);if(G.to>=Z&&G.from<=J)K(G);if(J>G.to)this.right.forEachLine(G.to+1,J,Q,q,W,K)}}replace(Z,J,Q){let X=this.left.length+this.break;if(J<X)return this.balanced(this.left.replace(Z,J,Q),this.right);if(Z>this.left.length)return this.balanced(this.left,this.right.replace(Z-X,J-X,Q));let Y=[];if(Z>0)this.decomposeLeft(Z,Y);let K=Y.length;for(let q of Q)Y.push(q);if(Z>0)uz(Y,K-1);if(J<this.length){let q=Y.length;this.decomposeRight(J,Y),uz(Y,q)}return B0.of(Y)}decomposeLeft(Z,J){let Q=this.left.length;if(Z<=Q)return this.left.decomposeLeft(Z,J);if(J.push(this.left),this.break){if(Q++,Z>=Q)J.push(null)}if(Z>Q)this.right.decomposeLeft(Z-Q,J)}decomposeRight(Z,J){let Q=this.left.length,X=Q+this.break;if(Z>=X)return this.right.decomposeRight(Z-X,J);if(Z<Q)this.left.decomposeRight(Z,J);if(this.break&&Z<X)J.push(null);J.push(this.right)}balanced(Z,J){if(Z.size>2*J.size||J.size>2*Z.size)return B0.of(this.break?[Z,null,J]:[Z,J]);return this.left=zJ(this.left,Z),this.right=zJ(this.right,J),this.setHeight(Z.height+J.height),this.outdated=Z.outdated||J.outdated,this.size=Z.size+J.size,this.length=Z.length+this.break+J.length,this}updateHeight(Z,J=0,Q=!1,X){let{left:Y,right:K}=this,q=J+Y.length+this.break,W=null;if(X&&X.from<=J+Y.length&&X.more)W=Y=Y.updateHeight(Z,J,Q,X);else Y.updateHeight(Z,J,Q);if(X&&X.from<=q+K.length&&X.more)W=K=K.updateHeight(Z,q,Q,X);else K.updateHeight(Z,q,Q);if(W)return this.balanced(Y,K);return this.height=this.left.height+this.right.height,this.outdated=!1,this}toString(){return this.left+(this.break?" ":"-")+this.right}}function uz(Z,J){let Q,X;if(Z[J]==null&&(Q=Z[J-1])instanceof G0&&(X=Z[J+1])instanceof G0)Z.splice(J-1,3,new G0(Q.length+1+X.length))}var OM=5;class F3{constructor(Z,J){this.pos=Z,this.oracle=J,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=Z}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(Z,J){if(this.lineStart>-1){let Q=Math.min(J,this.lineEnd),X=this.nodes[this.nodes.length-1];if(X instanceof m0)X.length+=Q-this.pos;else if(Q>this.pos||!this.isCovered)this.nodes.push(new m0(Q-this.pos,-1,0));if(this.writtenTo=Q,J>Q)this.nodes.push(null),this.writtenTo++,this.lineStart=-1}this.pos=J}point(Z,J,Q){if(Z<J||Q.heightRelevant){let X=Q.widget?Q.widget.estimatedHeight:0,Y=Q.widget?Q.widget.lineBreaks:0;if(X<0)X=this.oracle.lineHeight;let K=J-Z;if(Q.block)this.addBlock(new O3(K,X,Q));else if(K||Y||X>=OM)this.addLineDeco(X,Y,K)}else if(J>Z)this.span(Z,J);if(this.lineEnd>-1&&this.lineEnd<this.pos)this.lineEnd=this.oracle.doc.lineAt(this.pos).to}enterLine(){if(this.lineStart>-1)return;let{from:Z,to:J}=this.oracle.doc.lineAt(this.pos);if(this.lineStart=Z,this.lineEnd=J,this.writtenTo<Z){if(this.writtenTo<Z-1||this.nodes[this.nodes.length-1]==null)this.nodes.push(this.blankContent(this.writtenTo,Z-1));this.nodes.push(null)}if(this.pos>Z)this.nodes.push(new m0(this.pos-Z,-1,0));this.writtenTo=this.pos}blankContent(Z,J){let Q=new G0(J-Z);if(this.oracle.doc.lineAt(Z).to==J)Q.flags|=4;return Q}ensureLine(){this.enterLine();let Z=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(Z instanceof m0)return Z;let J=new m0(0,-1,0);return this.nodes.push(J),J}addBlock(Z){this.enterLine();let J=Z.deco;if(J&&J.startSide>0&&!this.isCovered)this.ensureLine();if(this.nodes.push(Z),this.writtenTo=this.pos=this.pos+Z.length,J&&J.endSide>0)this.covering=Z}addLineDeco(Z,J,Q){let X=this.ensureLine();X.length+=Q,X.collapsed+=Q,X.widgetHeight=Math.max(X.widgetHeight,Z),X.breaks+=J,this.writtenTo=this.pos=this.pos+Q}finish(Z){let J=this.nodes.length==0?null:this.nodes[this.nodes.length-1];if(this.lineStart>-1&&!(J instanceof m0)&&!this.isCovered)this.nodes.push(new m0(0,-1,0));else if(this.writtenTo<this.pos||J==null)this.nodes.push(this.blankContent(this.writtenTo,this.pos));let Q=Z;for(let X of this.nodes){if(X instanceof m0)X.updateHeight(this.oracle,Q);Q+=X?X.length:1}return this.nodes}static build(Z,J,Q,X){let Y=new F3(Q,Z);return H1.spans(J,Q,X,Y,0),Y.finish(Q)}}function FM(Z,J,Q){let X=new qV;return H1.compare(Z,J,Q,X,0),X.changes}class qV{constructor(){this.changes=[]}compareRange(){}comparePoint(Z,J,Q,X){if(Z<J||Q&&Q.heightRelevant||X&&X.heightRelevant)P7(Z,J,this.changes,5)}}function NM(Z,J){let Q=Z.getBoundingClientRect(),X=Z.ownerDocument,Y=X.defaultView||window,K=Math.max(0,Q.left),q=Math.min(Y.innerWidth,Q.right),W=Math.max(0,Q.top),G=Math.min(Y.innerHeight,Q.bottom);for(let U=Z.parentNode;U&&U!=X.body;)if(U.nodeType==1){let z=U,I=window.getComputedStyle(z);if((z.scrollHeight>z.clientHeight||z.scrollWidth>z.clientWidth)&&I.overflow!="visible"){let V=z.getBoundingClientRect();K=Math.max(K,V.left),q=Math.min(q,V.right),W=Math.max(W,V.top),G=Math.min(U==Z.parentNode?Y.innerHeight:G,V.bottom)}U=I.position=="absolute"||I.position=="fixed"?z.offsetParent:z.parentNode}else if(U.nodeType==11)U=U.host;else break;return{left:K-Q.left,right:Math.max(K,q)-Q.left,top:W-(Q.top+J),bottom:Math.max(W,G)-(Q.top+J)}}function RM(Z){let J=Z.getBoundingClientRect(),Q=Z.ownerDocument.defaultView||window;return J.left<Q.innerWidth&&J.right>0&&J.top<Q.innerHeight&&J.bottom>0}function DM(Z,J){let Q=Z.getBoundingClientRect();return{left:0,right:Q.right-Q.left,top:J,bottom:Q.bottom-(Q.top+J)}}class ZJ{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.size=Q,this.displaySize=X}static same(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.size!=Y.size)return!1}return!0}draw(Z,J){return M1.replace({widget:new WV(this.displaySize*(J?Z.scaleY:Z.scaleX),J)}).range(this.from,this.to)}}class WV extends l8{constructor(Z,J){super();this.size=Z,this.vertical=J}eq(Z){return Z.size==this.size&&Z.vertical==this.vertical}toDOM(){let Z=document.createElement("div");if(this.vertical)Z.style.height=this.size+"px";else Z.style.width=this.size+"px",Z.style.height="2px",Z.style.display="inline-block";return Z}get estimatedHeight(){return this.vertical?this.size:-1}}class tY{constructor(Z,J){this.view=Z,this.state=J,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=vz,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=C1.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let Q=J.facet(I3).some((X)=>typeof X!="function"&&X.class=="cm-lineWrapping");this.heightOracle=new XV(Q),this.stateDeco=mz(J),this.heightMap=B0.empty().applyChanges(this.stateDeco,O1.empty,this.heightOracle.setDoc(J.doc),[new Q6(0,0,0,J.doc.length)]);for(let X=0;X<2;X++)if(this.viewport=this.getViewport(0,null),!this.updateForViewport())break;this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=M1.set(this.lineGaps.map((X)=>X.draw(this,!1))),this.scrollParent=Z.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let Z=[this.viewport],{main:J}=this.state.selection;for(let Q=0;Q<=1;Q++){let X=Q?J.head:J.anchor;if(!Z.some(({from:Y,to:K})=>X>=Y&&X<=K)){let{from:Y,to:K}=this.lineBlockAt(X);Z.push(new n4(Y,K))}}return this.viewports=Z.sort((Q,X)=>Q.from-X.from),this.updateScaler()}updateScaler(){let Z=this.scaler;return this.scaler=this.heightMap.height<=7000000?vz:new N3(this.heightOracle,this.heightMap,this.viewports),Z.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,(Z)=>{this.viewportLines.push(l4(Z,this.scaler))})}update(Z,J=null){this.state=Z.state;let Q=this.stateDeco;this.stateDeco=mz(this.state);let X=Z.changedRanges,Y=Q6.extendWithRanges(X,FM(Q,this.stateDeco,Z?Z.changes:l1.empty(this.state.doc.length))),K=this.heightMap.height,q=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);if(gz(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,Z.startState.doc,this.heightOracle.setDoc(this.state.doc),Y),this.heightMap.height!=K||C7)Z.flags|=2;if(q)this.scrollAnchorPos=Z.changes.mapPos(q.from,-1),this.scrollAnchorHeight=q.top;else this.scrollAnchorPos=-1,this.scrollAnchorHeight=K;let W=Y.length?this.mapViewport(this.viewport,Z.changes):this.viewport;if(J&&(J.range.head<W.from||J.range.head>W.to)||!this.viewportIsAppropriate(W))W=this.getViewport(0,J);let G=W.from!=this.viewport.from||W.to!=this.viewport.to;if(this.viewport=W,Z.flags|=this.updateForViewport(),G||!Z.changes.empty||Z.flags&2)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,Z.changes)));if(Z.flags|=this.computeVisibleRanges(Z.changes),J)this.scrollTarget=J;if(!this.mustEnforceCursorAssoc&&(Z.selectionSet||Z.focusChanged)&&Z.view.lineWrapping&&Z.state.selection.main.empty&&Z.state.selection.main.assoc&&!Z.state.facet(PI))this.mustEnforceCursorAssoc=!0}measure(){let{view:Z}=this,J=Z.contentDOM,Q=window.getComputedStyle(J),X=this.heightOracle,Y=Q.whiteSpace;this.defaultTextDirection=Q.direction=="rtl"?C1.RTL:C1.LTR;let K=this.heightOracle.mustRefreshForWrapping(Y)||this.mustMeasureContent==="refresh",q=J.getBoundingClientRect(),W=K||this.mustMeasureContent||this.contentDOMHeight!=q.height;this.contentDOMHeight=q.height,this.mustMeasureContent=!1;let G=0,U=0;if(q.width&&q.height){let{scaleX:_,scaleY:A}=XI(J,q);if(_>0.005&&Math.abs(this.scaleX-_)>0.005||A>0.005&&Math.abs(this.scaleY-A)>0.005)this.scaleX=_,this.scaleY=A,G|=16,K=W=!0}let z=(parseInt(Q.paddingTop)||0)*this.scaleY,I=(parseInt(Q.paddingBottom)||0)*this.scaleY;if(this.paddingTop!=z||this.paddingBottom!=I)this.paddingTop=z,this.paddingBottom=I,G|=18;if(this.editorWidth!=Z.scrollDOM.clientWidth){if(X.lineWrapping)W=!0;this.editorWidth=Z.scrollDOM.clientWidth,G|=16}let V=YI(this.view.contentDOM,!1).y;if(V!=this.scrollParent)this.scrollParent=V,this.scrollAnchorHeight=-1,this.scrollOffset=0;let O=this.getScrollOffset();if(this.scrollOffset!=O)this.scrollAnchorHeight=-1,this.scrollOffset=O;this.scrolledToBottom=UI(this.scrollParent||Z.win);let F=(this.printing?DM:NM)(J,this.paddingTop),N=F.top-this.pixelViewport.top,R=F.bottom-this.pixelViewport.bottom;this.pixelViewport=F;let P=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(P!=this.inView){if(this.inView=P,P)W=!0}if(!this.inView&&!this.scrollTarget&&!RM(Z.dom))return 0;let T=q.width;if(this.contentDOMWidth!=T||this.editorHeight!=Z.scrollDOM.clientHeight)this.contentDOMWidth=q.width,this.editorHeight=Z.scrollDOM.clientHeight,G|=16;if(W){let _=Z.docView.measureVisibleLineHeights(this.viewport);if(X.mustRefreshForHeights(_))K=!0;if(K||X.lineWrapping&&Math.abs(T-this.contentDOMWidth)>X.charWidth){let{lineHeight:A,charWidth:B,textHeight:L}=Z.docView.measureTextSize();if(K=A>0&&X.refresh(Y,A,B,L,Math.max(5,T/B),_),K)Z.docView.minWidth=0,G|=16}if(N>0&&R>0)U=Math.max(N,R);else if(N<0&&R<0)U=Math.min(N,R);gz();for(let A of this.viewports){let B=A.from==this.viewport.from?_:Z.docView.measureVisibleLineHeights(A);this.heightMap=(K?B0.empty().applyChanges(this.stateDeco,O1.empty,this.heightOracle,[new Q6(0,0,0,Z.state.doc.length)]):this.heightMap).updateHeight(X,0,K,new YV(A.from,B))}if(C7)G|=2}let C=!this.viewportIsAppropriate(this.viewport,U)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);if(C){if(G&2)G|=this.updateScaler();this.viewport=this.getViewport(U,this.scrollTarget),G|=this.updateForViewport()}if(G&2||C)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(K?[]:this.lineGaps,Z));if(G|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc)this.mustEnforceCursorAssoc=!1,Z.docView.enforceCursorAssoc();return G}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(Z,J){let Q=0.5-Math.max(-0.5,Math.min(0.5,Z/1000/2)),X=this.heightMap,Y=this.heightOracle,{visibleTop:K,visibleBottom:q}=this,W=new n4(X.lineAt(K-Q*1000,b1.ByHeight,Y,0,0).from,X.lineAt(q+(1-Q)*1000,b1.ByHeight,Y,0,0).to);if(J){let{head:G}=J.range;if(G<W.from||G>W.to){let U=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),z=X.lineAt(G,b1.ByPos,Y,0,0),I;if(J.y=="center")I=(z.top+z.bottom)/2-U/2;else if(J.y=="start"||J.y=="nearest"&&G<W.from)I=z.top;else I=z.bottom-U;W=new n4(X.lineAt(I-500,b1.ByHeight,Y,0,0).from,X.lineAt(I+U+500,b1.ByHeight,Y,0,0).to)}}return W}mapViewport(Z,J){let Q=J.mapPos(Z.from,-1),X=J.mapPos(Z.to,1);return new n4(this.heightMap.lineAt(Q,b1.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(X,b1.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:Z,to:J},Q=0){if(!this.inView)return!0;let{top:X}=this.heightMap.lineAt(Z,b1.ByPos,this.heightOracle,0,0),{bottom:Y}=this.heightMap.lineAt(J,b1.ByPos,this.heightOracle,0,0),{visibleTop:K,visibleBottom:q}=this;return(Z==0||X<=K-Math.max(10,Math.min(-Q,250)))&&(J==this.state.doc.length||Y>=q+Math.max(10,Math.min(Q,250)))&&(X>K-2000&&Y<q+2000)}mapLineGaps(Z,J){if(!Z.length||J.empty)return Z;let Q=[];for(let X of Z)if(!J.touchesRange(X.from,X.to))Q.push(new ZJ(J.mapPos(X.from),J.mapPos(X.to),X.size,X.displaySize));return Q}ensureLineGaps(Z,J){let Q=this.heightOracle.lineWrapping,X=Q?1e4:2000,Y=X>>1,K=X<<1;if(this.defaultTextDirection!=C1.LTR&&!Q)return[];let q=[],W=(U,z,I,V)=>{if(z-U<Y)return;let O=this.state.selection.main,F=[O.from];if(!O.empty)F.push(O.to);for(let R of F)if(R>U&&R<z){W(U,R-10,I,V),W(R+10,z,I,V);return}let N=AM(Z,(R)=>R.from>=I.from&&R.to<=I.to&&Math.abs(R.from-U)<Y&&Math.abs(R.to-z)<Y&&!F.some((P)=>R.from<P&&R.to>P));if(!N){if(z<I.to&&J&&Q&&J.visibleRanges.some((T)=>T.from<=z&&T.to>=z)){let T=J.moveToLineBoundary(y.cursor(z),!1,!0).head;if(T>U)z=T}let R=this.gapSize(I,U,z,V),P=Q||R<2000000?R:2000000;N=new ZJ(U,z,R,P)}q.push(N)},G=(U)=>{if(U.length<K||U.type!=U0.Text)return;let z=MM(U.from,U.to,this.stateDeco);if(z.total<K)return;let I=this.scrollTarget?this.scrollTarget.range.head:null,V,O;if(Q){let F=X/this.heightOracle.lineLength*this.heightOracle.lineHeight,N,R;if(I!=null){let P=nZ(z,I),T=((this.visibleBottom-this.visibleTop)/2+F)/U.height;N=P-T,R=P+T}else N=(this.visibleTop-U.top-F)/U.height,R=(this.visibleBottom-U.top+F)/U.height;V=dZ(z,N),O=dZ(z,R)}else{let F=z.total*this.heightOracle.charWidth,N=X*this.heightOracle.charWidth,R=0;if(F>2000000){for(let A of Z)if(A.from>=U.from&&A.from<U.to&&A.size!=A.displaySize&&A.from*this.heightOracle.charWidth+R<this.pixelViewport.left)R=A.size-A.displaySize}let P=this.pixelViewport.left+R,T=this.pixelViewport.right+R,C,_;if(I!=null){let A=nZ(z,I),B=((T-P)/2+N)/F;C=A-B,_=A+B}else C=(P-N)/F,_=(T+N)/F;V=dZ(z,C),O=dZ(z,_)}if(V>U.from)W(U.from,V,U,z);if(O<U.to)W(O,U.to,U,z)};for(let U of this.viewportLines)if(Array.isArray(U.type))U.type.forEach(G);else G(U);return q}gapSize(Z,J,Q,X){let Y=nZ(X,Q)-nZ(X,J);if(this.heightOracle.lineWrapping)return Z.height*Y;else return X.total*this.heightOracle.charWidth*Y}updateLineGaps(Z){if(!ZJ.same(Z,this.lineGaps))this.lineGaps=Z,this.lineGapDeco=M1.set(Z.map((J)=>J.draw(this,this.heightOracle.lineWrapping)))}computeVisibleRanges(Z){let J=this.stateDeco;if(this.lineGaps.length)J=J.concat(this.lineGapDeco);let Q=[];H1.spans(J,this.viewport.from,this.viewport.to,{span(Y,K){Q.push({from:Y,to:K})},point(){}},20);let X=0;if(Q.length!=this.visibleRanges.length)X=12;else for(let Y=0;Y<Q.length&&!(X&8);Y++){let K=this.visibleRanges[Y],q=Q[Y];if(K.from!=q.from||K.to!=q.to){if(X|=4,!(Z&&Z.mapPos(K.from,-1)==q.from&&Z.mapPos(K.to,1)==q.to))X|=8}}return this.visibleRanges=Q,X}lineBlockAt(Z){return Z>=this.viewport.from&&Z<=this.viewport.to&&this.viewportLines.find((J)=>J.from<=Z&&J.to>=Z)||l4(this.heightMap.lineAt(Z,b1.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(Z){return Z>=this.viewportLines[0].top&&Z<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find((J)=>J.top<=Z&&J.bottom>=Z)||l4(this.heightMap.lineAt(this.scaler.fromDOM(Z),b1.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(Z){let J=this.lineBlockAtHeight(Z+8);return J.from>=this.viewport.from||this.viewportLines[0].top-Z>200?J:this.viewportLines[0]}elementAtHeight(Z){return l4(this.heightMap.blockAt(this.scaler.fromDOM(Z),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class n4{constructor(Z,J){this.from=Z,this.to=J}}function MM(Z,J,Q){let X=[],Y=Z,K=0;if(H1.spans(Q,Z,J,{span(){},point(q,W){if(q>Y)X.push({from:Y,to:q}),K+=q-Y;Y=W}},20),Y<J)X.push({from:Y,to:J}),K+=J-Y;return{total:K,ranges:X}}function dZ({total:Z,ranges:J},Q){if(Q<=0)return J[0].from;if(Q>=1)return J[J.length-1].to;let X=Math.floor(Z*Q);for(let Y=0;;Y++){let{from:K,to:q}=J[Y],W=q-K;if(X<=W)return K+X;X-=W}}function nZ(Z,J){let Q=0;for(let{from:X,to:Y}of Z.ranges){if(J<=Y){Q+=J-X;break}Q+=Y-X}return Q/Z.total}function AM(Z,J){for(let Q of Z)if(J(Q))return Q;return}var vz={toDOM(Z){return Z},fromDOM(Z){return Z},scale:1,eq(Z){return Z==this}};function mz(Z){let J=Z.facet(HJ).filter((X)=>typeof X!="function"),Q=Z.facet(V3).filter((X)=>typeof X!="function");if(Q.length)J.push(H1.join(Q));return J}class N3{constructor(Z,J,Q){let X=0,Y=0,K=0;this.viewports=Q.map(({from:q,to:W})=>{let G=J.lineAt(q,b1.ByPos,Z,0,0).top,U=J.lineAt(W,b1.ByPos,Z,0,0).bottom;return X+=U-G,{from:q,to:W,top:G,bottom:U,domTop:0,domBottom:0}}),this.scale=(7000000-X)/(J.height-X);for(let q of this.viewports)q.domTop=K+(q.top-Y)*this.scale,K=q.domBottom=q.domTop+(q.bottom-q.top),Y=q.bottom}toDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.top)return X+(Z-Q)*this.scale;if(Z<=Y.bottom)return Y.domTop+(Z-Y.top);Q=Y.bottom,X=Y.domBottom}}fromDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.domTop)return Q+(Z-X)/this.scale;if(Z<=Y.domBottom)return Y.top+(Z-Y.domTop);Q=Y.bottom,X=Y.domBottom}}eq(Z){if(!(Z instanceof N3))return!1;return this.scale==Z.scale&&this.viewports.length==Z.viewports.length&&this.viewports.every((J,Q)=>J.from==Z.viewports[Q].from&&J.to==Z.viewports[Q].to)}}function l4(Z,J){if(J.scale==1)return Z;let Q=J.toDOM(Z.top),X=J.toDOM(Z.bottom);return new B6(Z.from,Z.length,Q,X-Q,Array.isArray(Z._content)?Z._content.map((Y)=>l4(Y,J)):Z._content)}var lZ=r.define({combine:(Z)=>Z.join(" ")}),eY=r.define({combine:(Z)=>Z.indexOf(!0)>-1}),Z3=A6.newName(),GV=A6.newName(),UV=A6.newName(),zV={"&light":"."+GV,"&dark":"."+UV};function J3(Z,J,Q){return new A6(J,{finish(X){return/&/.test(X)?X.replace(/&\w*/,(Y)=>{if(Y=="&")return Z;if(!Q||!Q[Y])throw RangeError(`Unsupported selector: ${Y}`);return Q[Y]}):Z+" "+X}})}var LM=J3("."+Z3,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{userSelect:"none",position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},".cm-panels-top":{top:"0"},".cm-panels-bottom":{bottom:"0"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},zV),BM={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},bY=i.ie&&i.ie_version<=11;class IV{constructor(Z){if(this.view=Z,this.active=!1,this.editContext=null,this.selectionRange=new KI,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=Z.contentDOM,this.observer=new MutationObserver((J)=>{for(let Q of J)this.queue.push(Q);if((i.ie&&i.ie_version<=11||i.ios&&Z.composing)&&J.some((Q)=>Q.type=="childList"&&Q.removedNodes.length||Q.type=="characterData"&&Q.oldValue.length>Q.target.nodeValue.length))this.flushSoon();else this.flush()}),window.EditContext&&i.android&&Z.constructor.EDIT_CONTEXT!==!1&&!(i.chrome&&i.chrome_version<126)){if(this.editContext=new VV(Z),Z.state.facet(M8))Z.contentDOM.editContext=this.editContext.editContext}if(bY)this.onCharData=(J)=>{this.queue.push({target:J.target,type:"characterData",oldValue:J.prevValue}),this.flushSoon()};if(this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia)this.printQuery=window.matchMedia("print");if(typeof ResizeObserver=="function")this.resizeScroll=new ResizeObserver(()=>{var J;if(((J=this.view.docView)===null||J===void 0?void 0:J.lastUpdate)<Date.now()-75)this.onResize()}),this.resizeScroll.observe(Z.scrollDOM);if(this.addWindowListeners(this.win=Z.win),this.start(),typeof IntersectionObserver=="function")this.intersection=new IntersectionObserver((J)=>{if(this.parentCheck<0)this.parentCheck=setTimeout(this.listenForScroll.bind(this),1000);if(J.length>0&&J[J.length-1].intersectionRatio>0!=this.intersecting){if(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView)this.onScrollChanged(document.createEvent("Event"))}},{threshold:[0,0.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver((J)=>{if(J.length>0&&J[J.length-1].intersectionRatio>0)this.onScrollChanged(document.createEvent("Event"))},{});this.listenForScroll(),this.readSelectionRange()}onScrollChanged(Z){if(this.view.inputState.runHandlers("scroll",Z),this.intersecting)this.view.measure()}onScroll(Z){if(this.intersecting)this.flush(!1);if(this.editContext)this.view.requestMeasure(this.editContext.measureReq);this.onScrollChanged(Z)}onResize(){if(this.resizeTimeout<0)this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50)}onPrint(Z){if((Z.type=="change"||!Z.type)&&!Z.matches)return;this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500)}updateGaps(Z){if(this.gapIntersection&&(Z.length!=this.gaps.length||this.gaps.some((J,Q)=>J!=Z[Q]))){this.gapIntersection.disconnect();for(let J of Z)this.gapIntersection.observe(J);this.gaps=Z}}onSelectionChange(Z){let J=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:Q}=this,X=this.selectionRange;if(Q.state.facet(M8)?Q.root.activeElement!=this.dom:!i4(this.dom,X))return;let Y=X.anchorNode&&Q.docView.tile.nearest(X.anchorNode);if(Y&&Y.isWidget()&&Y.widget.ignoreEvent(Z)){if(!J)this.selectionChanged=!1;return}if((i.ie&&i.ie_version<=11||i.android&&i.chrome)&&!Q.state.selection.main.empty&&X.focusNode&&r4(X.focusNode,X.focusOffset,X.anchorNode,X.anchorOffset))this.flushSoon();else this.flush(!1)}readSelectionRange(){let{view:Z}=this,J=t4(Z.root);if(!J)return!1;let Q=i.safari&&Z.root.nodeType==11&&Z.root.activeElement==this.dom&&PM(this.view,J)||J;if(!Q||this.selectionRange.eq(Q))return!1;let X=i4(this.dom,Q);if(X&&!this.selectionChanged&&Z.inputState.lastFocusTime>Date.now()-200&&Z.inputState.lastTouchTime<Date.now()-300&&RD(this.dom,Q))return this.view.inputState.lastFocusTime=0,Z.docView.updateSelection(),!1;if(this.selectionRange.setRange(Q),X)this.selectionChanged=!0;return!0}setSelectionRange(Z,J){this.selectionRange.set(Z.node,Z.offset,J.node,J.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let Z=0,J=null;for(let Q=this.dom;Q;)if(Q.nodeType==1){if(!J&&Z<this.scrollTargets.length&&this.scrollTargets[Z]==Q)Z++;else if(!J)J=this.scrollTargets.slice(0,Z);if(J)J.push(Q);Q=Q.assignedSlot||Q.parentNode}else if(Q.nodeType==11)Q=Q.host;else break;if(Z<this.scrollTargets.length&&!J)J=this.scrollTargets.slice(0,Z);if(J){for(let Q of this.scrollTargets)Q.removeEventListener("scroll",this.onScroll);for(let Q of this.scrollTargets=J)Q.addEventListener("scroll",this.onScroll)}}ignore(Z){if(!this.active)return Z();try{return this.stop(),Z()}finally{this.start(),this.clear()}}start(){if(this.active)return;if(this.observer.observe(this.dom,BM),bY)this.dom.addEventListener("DOMCharacterDataModified",this.onCharData);this.active=!0}stop(){if(!this.active)return;if(this.active=!1,this.observer.disconnect(),bY)this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(Z,J){var Q;if(!this.delayedAndroidKey){let X=()=>{let Y=this.delayedAndroidKey;if(Y){if(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=Y.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&Y.force)T7(this.dom,Y.key,Y.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(X)}if(!this.delayedAndroidKey||Z=="Enter")this.delayedAndroidKey={key:Z,keyCode:J,force:this.lastChange<Date.now()-50||!!((Q=this.delayedAndroidKey)===null||Q===void 0?void 0:Q.force)}}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){if(this.delayedFlush<0)this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()})}forceFlush(){if(this.delayedFlush>=0)this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1;this.flush()}pendingRecords(){for(let Z of this.observer.takeRecords())this.queue.push(Z);return this.queue}processRecords(){let Z=this.pendingRecords();if(Z.length)this.queue=[];let J=-1,Q=-1,X=!1;for(let Y of Z){let K=this.readMutation(Y);if(!K)continue;if(K.typeOver)X=!0;if(J==-1)({from:J,to:Q}=K);else J=Math.min(K.from,J),Q=Math.max(K.to,Q)}return{from:J,to:Q,typeOver:X}}readChange(){let{from:Z,to:J,typeOver:Q}=this.processRecords(),X=this.selectionChanged&&i4(this.dom,this.selectionRange);if(Z<0&&!X)return null;if(Z>-1)this.lastChange=Date.now();this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let Y=new cI(this.view,Z,J,Q);return this.view.docView.domChanged={newSel:Y.newSel?Y.newSel.main:null},Y}flush(Z=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;if(Z)this.readSelectionRange();let J=this.readChange();if(!J)return this.view.requestMeasure(),!1;let Q=this.view.state,X=nI(this.view,J);if(this.view.state==Q&&(J.domChanged||J.newSel&&!UJ(this.view.state.selection,J.newSel.main)))this.view.update([]);return X}readMutation(Z){let J=this.view.docView.tile.nearest(Z.target);if(!J||J.isWidget())return null;if(J.markDirty(Z.type=="attributes"),Z.type=="childList"){let Q=pz(J,Z.previousSibling||Z.target.previousSibling,-1),X=pz(J,Z.nextSibling||Z.target.nextSibling,1);return{from:Q?J.posAfter(Q):J.posAtStart,to:X?J.posBefore(X):J.posAtEnd,typeOver:!1}}else if(Z.type=="characterData")return{from:J.posAtStart,to:J.posAtEnd,typeOver:Z.target.nodeValue==Z.oldValue};else return null}setWindow(Z){if(Z!=this.win)this.removeWindowListeners(this.win),this.win=Z,this.addWindowListeners(this.win)}addWindowListeners(Z){if(Z.addEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.addEventListener)this.printQuery.addEventListener("change",this.onPrint);else this.printQuery.addListener(this.onPrint);else Z.addEventListener("beforeprint",this.onPrint);Z.addEventListener("scroll",this.onScroll),Z.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(Z){if(Z.removeEventListener("scroll",this.onScroll),Z.removeEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.removeEventListener)this.printQuery.removeEventListener("change",this.onPrint);else this.printQuery.removeListener(this.onPrint);else Z.removeEventListener("beforeprint",this.onPrint);Z.document.removeEventListener("selectionchange",this.onSelectionChange)}update(Z){if(this.editContext){if(this.editContext.update(Z),Z.startState.facet(M8)!=Z.state.facet(M8))Z.view.contentDOM.editContext=Z.state.facet(M8)?this.editContext.editContext:null}}destroy(){var Z,J,Q;this.stop(),(Z=this.intersection)===null||Z===void 0||Z.disconnect(),(J=this.gapIntersection)===null||J===void 0||J.disconnect(),(Q=this.resizeScroll)===null||Q===void 0||Q.disconnect();for(let X of this.scrollTargets)X.removeEventListener("scroll",this.onScroll);if(this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext)this.view.contentDOM.editContext=null,this.editContext.destroy()}}function pz(Z,J,Q){while(J){let X=p1.get(J);if(X&&X.parent==Z)return X;let Y=J.parentNode;J=Y!=Z.dom?Y:Q>0?J.nextSibling:J.previousSibling}return null}function cz(Z,J){let{startContainer:Q,startOffset:X,endContainer:Y,endOffset:K}=J,q=Z.docView.domAtPos(Z.state.selection.main.anchor,1);if(r4(q.node,q.offset,Y,K))[Q,X,Y,K]=[Y,K,Q,X];return{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}}function PM(Z,J){if(J.getComposedRanges){let Y=J.getComposedRanges(Z.root)[0];if(Y)return cz(Z,Y)}let Q=null;function X(Y){Y.preventDefault(),Y.stopImmediatePropagation(),Q=Y.getTargetRanges()[0]}return Z.contentDOM.addEventListener("beforeinput",X,!0),Z.dom.ownerDocument.execCommand("indent"),Z.contentDOM.removeEventListener("beforeinput",X,!0),Q?cz(Z,Q):null}class VV{constructor(Z){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(Z.state);let J=this.editContext=new window.EditContext({text:Z.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,Z.state.selection.main.anchor))),selectionEnd:this.toContextPos(Z.state.selection.main.head)});this.handlers.textupdate=(Q)=>{let X=Z.state.selection.main,{anchor:Y,head:K}=X,q=this.toEditorPos(Q.updateRangeStart),W=this.toEditorPos(Q.updateRangeEnd);if(Z.inputState.composing>=0&&!this.composing)this.composing={contextBase:Q.updateRangeStart,editorBase:q,drifted:!1};let G=W-q>Q.text.length;if(q==this.from&&Y<this.from)q=Y;else if(W==this.to&&Y>this.to)W=Y;let U=lI(Z.state.sliceDoc(q,W),Q.text,(G?X.from:X.to)-q,G?"end":null);if(!U){let I=y.single(this.toEditorPos(Q.selectionStart),this.toEditorPos(Q.selectionEnd));if(!UJ(I,X))Z.dispatch({selection:I,userEvent:"select"});return}let z={from:U.from+q,to:U.toA+q,insert:O1.of(Q.text.slice(U.from,U.toB).split(`
`))};if((i.mac||i.android)&&z.from==K-1&&/^\. ?$/.test(Q.text)&&Z.contentDOM.getAttribute("autocorrect")=="off")z={from:q,to:W,insert:O1.of([Q.text.replace("."," ")])};if(this.pendingContextChange=z,!Z.state.readOnly){let I=this.to-this.from+(z.to-z.from+z.insert.length);H3(Z,z,y.single(this.toEditorPos(Q.selectionStart,I),this.toEditorPos(Q.selectionEnd,I)))}if(this.pendingContextChange)this.revertPending(Z.state),this.setSelection(Z.state);if(z.from<z.to&&!z.insert.length&&Z.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(J.text.slice(Math.max(0,Q.updateRangeStart-1),Math.min(J.text.length,Q.updateRangeStart+1))))this.handlers.compositionend(Q)},this.handlers.characterboundsupdate=(Q)=>{let X=[],Y=null;for(let K=this.toEditorPos(Q.rangeStart),q=this.toEditorPos(Q.rangeEnd);K<q;K++){let W=Z.coordsForChar(K);Y=W&&new DOMRect(W.left,W.top,W.right-W.left,W.bottom-W.top)||Y||new DOMRect,X.push(Y)}J.updateCharacterBounds(Q.rangeStart,X)},this.handlers.textformatupdate=(Q)=>{let X=[];for(let Y of Q.getTextFormats()){let{underlineStyle:K,underlineThickness:q}=Y;if(!/none/i.test(K)&&!/none/i.test(q)){let W=this.toEditorPos(Y.rangeStart),G=this.toEditorPos(Y.rangeEnd);if(W<G){let U=`text-decoration: underline ${/^[a-z]/.test(K)?K+" ":K=="Dashed"?"dashed ":K=="Squiggle"?"wavy ":""}${/thin/i.test(q)?1:2}px`;X.push(M1.mark({attributes:{style:U}}).range(W,G))}}}Z.dispatch({effects:SI.of(M1.set(X))})},this.handlers.compositionstart=()=>{if(Z.inputState.composing<0)Z.inputState.composing=0,Z.inputState.compositionFirstChange=!0},this.handlers.compositionend=()=>{if(Z.inputState.composing=-1,Z.inputState.compositionFirstChange=null,this.composing){let{drifted:Q}=this.composing;if(this.composing=null,Q)this.reset(Z.state)}};for(let Q in this.handlers)J.addEventListener(Q,this.handlers[Q]);this.measureReq={read:(Q)=>{let X=t4(Q.root);if(X&&X.rangeCount)this.editContext.updateSelectionBounds(X.getRangeAt(0).getBoundingClientRect())}}}applyEdits(Z){let J=0,Q=!1,X=this.pendingContextChange;if(Z.changes.iterChanges((Y,K,q,W,G)=>{if(Q)return;let U=G.length-(K-Y);if(X&&K>=X.to)if(X.from==Y&&X.to==K&&X.insert.eq(G)){X=this.pendingContextChange=null,J+=U,this.to+=U;return}else X=null,this.revertPending(Z.state);if(Y+=J,K+=J,K<=this.from)this.from+=U,this.to+=U;else if(Y<this.to){if(Y<this.from||K>this.to||this.to-this.from+G.length>30000){Q=!0;return}this.editContext.updateText(this.toContextPos(Y),this.toContextPos(K),G.toString()),this.to+=U}J+=U}),X&&!Q)this.revertPending(Z.state);return!Q}update(Z){let J=this.pendingContextChange,Q=Z.startState.selection.main;if(this.composing&&(this.composing.drifted||!Z.changes.touchesRange(Q.from,Q.to)&&Z.transactions.some((X)=>!X.isUserEvent("input.type")&&X.changes.touchesRange(this.from,this.to))))this.composing.drifted=!0,this.composing.editorBase=Z.changes.mapPos(this.composing.editorBase);else if(!this.applyEdits(Z)||!this.rangeIsValid(Z.state))this.pendingContextChange=null,this.reset(Z.state);else if(Z.docChanged||Z.selectionSet||J)this.setSelection(Z.state);if(Z.geometryChanged||Z.docChanged||Z.selectionSet)Z.view.requestMeasure(this.measureReq)}resetRange(Z){let{head:J}=Z.selection.main;this.from=Math.max(0,J-1e4),this.to=Math.min(Z.doc.length,J+1e4)}reset(Z){this.resetRange(Z),this.editContext.updateText(0,this.editContext.text.length,Z.doc.sliceString(this.from,this.to)),this.setSelection(Z)}revertPending(Z){let J=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(J.from),this.toContextPos(J.from+J.insert.length),Z.doc.sliceString(J.from,J.to))}setSelection(Z){let{main:J}=Z.selection,Q=this.toContextPos(Math.max(this.from,Math.min(this.to,J.anchor))),X=this.toContextPos(J.head);if(this.editContext.selectionStart!=Q||this.editContext.selectionEnd!=X)this.editContext.updateSelection(Q,X)}rangeIsValid(Z){let{head:J}=Z.selection.main;return!(this.from>0&&J-this.from<500||this.to<Z.doc.length&&this.to-J<500||this.to-this.from>30000)}toEditorPos(Z,J=this.to-this.from){Z=Math.min(Z,J);let Q=this.composing;return Q&&Q.drifted?Q.editorBase+(Z-Q.contextBase):Z+this.from}toContextPos(Z){let J=this.composing;return J&&J.drifted?J.contextBase+(Z-J.editorBase):Z-this.from}destroy(){for(let Z in this.handlers)this.editContext.removeEventListener(Z,this.handlers[Z])}}class X1{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(Z={}){var J;if(this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),Z.parent)Z.parent.appendChild(this.dom);let{dispatch:Q}=Z;if(this.dispatchTransactions=Z.dispatchTransactions||Q&&((X)=>X.forEach((Y)=>Q(Y,this)))||((X)=>this.update(X)),this.dispatch=this.dispatch.bind(this),this._root=Z.root||ND(Z.parent)||document,this.viewState=new tY(this,Z.state||R1.create(Z)),Z.scrollTo&&Z.scrollTo.is(mZ))this.viewState.scrollTarget=Z.scrollTo.value.clip(this.viewState.state);this.plugins=this.state.facet(L7).map((X)=>new oZ(X));for(let X of this.plugins)X.update(this);if(this.observer=new IV(this),this.inputState=new sI(this),this.inputState.ensureHandlers(this.plugins),this.docView=new lY(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),(J=document.fonts)===null||J===void 0?void 0:J.ready)document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...Z){let J=Z.length==1&&Z[0]instanceof s1?Z:Z.length==1&&Array.isArray(Z[0])?Z[0]:[this.state.update(...Z)];this.dispatchTransactions(J,this)}update(Z){if(this.updateState!=0)throw Error("Calls to EditorView.update are not allowed while an update is in progress");let J=!1,Q=!1,X,Y=this.state;for(let I of Z){if(I.startState!=Y)throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");Y=I.state}if(this.destroyed){this.viewState.state=Y;return}let K=this.hasFocus,q=0,W=null;if(Z.some((I)=>I.annotation(ZV)))this.inputState.notifiedFocused=K,q=1;else if(K!=this.inputState.notifiedFocused){if(this.inputState.notifiedFocused=K,W=JV(Y,K),!W)q=1}let G=this.observer.delayedAndroidKey,U=null;if(G){if(this.observer.clearDelayedAndroidKey(),U=this.observer.readChange(),U&&!this.state.doc.eq(Y.doc)||!this.state.selection.eq(Y.selection))U=null}else this.observer.clear();if(Y.facet(R1.phrases)!=this.state.facet(R1.phrases))return this.setState(Y);X=WJ.create(this,Y,Z),X.flags|=q;let z=this.viewState.scrollTarget;try{this.updateState=2;for(let I of Z){if(z)z=z.map(I.changes);if(I.scrollIntoView){let{main:V}=I.state.selection,{x:O,y:F}=this.state.facet(X1.cursorScrollMargin);z=new S7(V.empty?V:y.cursor(V.head,V.head>V.anchor?-1:1),"nearest","nearest",F,O)}for(let V of I.effects)if(V.is(mZ))z=V.value.clip(this.state)}if(this.viewState.update(X,z),this.bidiCache=IJ.update(this.bidiCache,X.changes),!X.empty)this.updatePlugins(X),this.inputState.update(X);if(J=this.docView.update(X),this.state.facet(d4)!=this.styleModules)this.mountStyles();Q=this.updateAttrs(),this.showAnnouncements(Z),this.docView.updateSelection(J,Z.some((I)=>I.isUserEvent("select.pointer")))}finally{this.updateState=0}if(X.startState.facet(lZ)!=X.state.facet(lZ))this.viewState.mustMeasureContent=!0;if(J||Q||z||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)this.requestMeasure();if(J)this.docViewUpdate();if(!X.empty)for(let I of this.state.facet(nY))try{I(X)}catch(V){p0(this.state,V,"update listener")}if(W||U)Promise.resolve().then(()=>{if(W&&this.state==W.startState)this.dispatch(W);if(U){if(!nI(this,U)&&G.force)T7(this.contentDOM,G.key,G.keyCode)}})}setState(Z){if(this.updateState!=0)throw Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=Z;return}this.updateState=2;let J=this.hasFocus;try{for(let Q of this.plugins)Q.destroy(this);this.viewState=new tY(this,Z),this.plugins=Z.facet(L7).map((Q)=>new oZ(Q)),this.pluginMap.clear();for(let Q of this.plugins)Q.update(this);this.docView.destroy(),this.docView=new lY(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}if(J)this.focus();this.requestMeasure()}updatePlugins(Z){let J=Z.startState.facet(L7),Q=Z.state.facet(L7);if(J!=Q){let X=[];for(let Y of Q){let K=J.indexOf(Y);if(K<0)X.push(new oZ(Y));else{let q=this.plugins[K];q.mustUpdate=Z,X.push(q)}}for(let Y of this.plugins)if(Y.mustUpdate!=Z)Y.destroy(this);this.plugins=X,this.pluginMap.clear()}else for(let X of this.plugins)X.mustUpdate=Z;for(let X=0;X<this.plugins.length;X++)this.plugins[X].update(this);if(J!=Q)this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let Z of this.plugins){let J=Z.value;if(J&&J.docViewUpdate)try{J.docViewUpdate(this)}catch(Q){p0(this.state,Q,"doc view update listener")}}}measure(Z=!0){if(this.destroyed)return;if(this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);if(this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}if(this.measureScheduled=0,Z)this.observer.forceFlush();let J=null,Q=this.viewState.scrollParent,X=this.viewState.getScrollOffset(),{scrollAnchorPos:Y,scrollAnchorHeight:K}=this.viewState;if(Math.abs(X-this.viewState.scrollOffset)>1)K=-1;this.viewState.scrollAnchorHeight=-1;try{for(let q=0;;q++){if(K<0)if(UI(Q||this.win))Y=-1,K=this.viewState.heightMap.height;else{let V=this.viewState.scrollAnchorAt(X);Y=V.from,K=V.top}this.updateState=1;let W=this.viewState.measure();if(!W&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(q>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let G=[];if(!(W&4))[this.measureRequests,G]=[G,this.measureRequests];let U=G.map((V)=>{try{return V.read(this)}catch(O){return p0(this.state,O),dz}}),z=WJ.create(this,this.state,[]),I=!1;if(z.flags|=W,!J)J=z;else J.flags|=W;if(this.updateState=2,!z.empty){if(this.updatePlugins(z),this.inputState.update(z),this.updateAttrs(),I=this.docView.update(z),I)this.docViewUpdate()}for(let V=0;V<G.length;V++)if(U[V]!=dz)try{let O=G[V];if(O.write)O.write(U[V],this)}catch(O){p0(this.state,O)}if(I)this.docView.updateSelection(!0);if(!z.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,K=-1;continue}else{let O=((Y<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(Y).top)-K)/this.scaleY;if((O>1||O<-1)&&!(i.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(Q==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){if(X=X+O,Q)Q.scrollTop+=O;else this.win.scrollBy(0,O);K=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(J&&!J.empty)for(let q of this.state.facet(nY))q(J)}get themeClasses(){return Z3+" "+(this.state.facet(eY)?UV:GV)+" "+this.state.facet(lZ)}updateAttrs(){let Z=nz(this,EI,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),J={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:!this.state.facet(M8)?"false":"true",class:"cm-content",style:`${i.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};if(this.state.readOnly)J["aria-readonly"]="true";nz(this,I3,J);let Q=this.observer.ignore(()=>{let X=Bz(this.contentDOM,this.contentAttrs,J),Y=Bz(this.dom,this.editorAttrs,Z);return X||Y});return this.editorAttrs=Z,this.contentAttrs=J,Q}showAnnouncements(Z){let J=!0;for(let Q of Z)for(let X of Q.effects)if(X.is(X1.announce)){if(J)this.announceDOM.textContent="";J=!1;let Y=this.announceDOM.appendChild(document.createElement("div"));Y.textContent=X.value}}mountStyles(){this.styleModules=this.state.facet(d4);let Z=this.state.facet(X1.cspNonce);A6.mount(this.root,this.styleModules.concat(LM).reverse(),Z?{nonce:Z}:void 0)}readMeasured(){if(this.updateState==2)throw Error("Reading the editor layout isn't allowed during an update");if(this.updateState==0&&this.measureScheduled>-1)this.measure(!1)}requestMeasure(Z){if(this.measureScheduled<0)this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure());if(Z){if(this.measureRequests.indexOf(Z)>-1)return;if(Z.key!=null){for(let J=0;J<this.measureRequests.length;J++)if(this.measureRequests[J].key===Z.key){this.measureRequests[J]=Z;return}}this.measureRequests.push(Z)}}plugin(Z){let J=this.pluginMap.get(Z);if(J===void 0||J&&J.plugin!=Z)this.pluginMap.set(Z,J=this.plugins.find((Q)=>Q.plugin==Z)||null);return J&&J.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(Z){return this.readMeasured(),this.viewState.elementAtHeight(Z)}lineBlockAtHeight(Z){return this.readMeasured(),this.viewState.lineBlockAtHeight(Z)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(Z){return this.viewState.lineBlockAt(Z)}get contentHeight(){return this.viewState.contentHeight}moveByChar(Z,J,Q){return wY(this,Z,_z(this,Z,J,Q))}moveByGroup(Z,J){return wY(this,Z,_z(this,Z,J,(Q)=>lD(this,Z.head,Q)))}visualLineSide(Z,J){let Q=this.bidiSpans(Z),X=this.textDirectionAt(Z.from),Y=Q[J?Q.length-1:0];return y.cursor(Y.side(J,X)+Z.from,Y.forward(!J,X)?1:-1)}moveToLineBoundary(Z,J,Q=!0){return nD(this,Z,J,Q)}moveVertically(Z,J,Q){return wY(this,Z,sD(this,Z,J,Q))}domAtPos(Z,J=1){return this.docView.domAtPos(Z,J)}posAtDOM(Z,J=0){return this.docView.posFromDOM(Z,J)}posAtCoords(Z,J=!0){this.readMeasured();let Q=rY(this,Z,J);return Q&&Q.pos}posAndSideAtCoords(Z,J=!0){return this.readMeasured(),rY(this,Z,J)}coordsAtPos(Z,J=1){this.readMeasured();let Q=this.state.doc.lineAt(Z),X=this.bidiSpans(Q),Y=X[T6.find(X,Z-Q.from,-1,J)];return this.docView.coordsAt(Z,J,Y.dir==C1.RTL)}coordsForChar(Z){return this.readMeasured(),this.docView.coordsForChar(Z)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(Z){if(!this.state.facet(BI)||Z<this.viewport.from||Z>this.viewport.to)return this.textDirection;return this.readMeasured(),this.docView.textDirectionAt(Z)}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(Z){if(Z.length>TM)return OI(Z.length);let J=this.textDirectionAt(Z.from),Q;for(let Y of this.bidiCache)if(Y.from==Z.from&&Y.dir==J&&(Y.fresh||HI(Y.isolates,Q=Sz(this,Z))))return Y.order;if(!Q)Q=Sz(this,Z);let X=TD(Z.text,J,Q);return this.bidiCache.push(new IJ(Z.from,Z.to,J,Q,!0,X)),X}get hasFocus(){var Z;return(this.dom.ownerDocument.hasFocus()||i.safari&&((Z=this.inputState)===null||Z===void 0?void 0:Z.lastContextMenu)>Date.now()-30000)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{GI(this.contentDOM),this.docView.updateSelection()})}setRoot(Z){if(this._root!=Z)this._root=Z,this.observer.setWindow((Z.nodeType==9?Z:Z.ownerDocument).defaultView||window),this.mountStyles()}destroy(){if(this.root.activeElement==this.contentDOM)this.contentDOM.blur();for(let Z of this.plugins)Z.destroy(this);if(this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);this.destroyed=!0}static scrollIntoView(Z,J={}){var Q,X,Y,K;return mZ.of(new S7(typeof Z=="number"?y.cursor(Z):Z,(Q=J.y)!==null&&Q!==void 0?Q:"nearest",(X=J.x)!==null&&X!==void 0?X:"nearest",(Y=J.yMargin)!==null&&Y!==void 0?Y:5,(K=J.xMargin)!==null&&K!==void 0?K:5))}scrollSnapshot(){let{scrollTop:Z,scrollLeft:J}=this.scrollDOM,Q=this.viewState.scrollAnchorAt(Z);return mZ.of(new S7(y.cursor(Q.from),"start","start",Q.top-Z,J,!0))}setTabFocusMode(Z){if(Z==null)this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1;else if(typeof Z=="boolean")this.inputState.tabFocusMode=Z?0:-1;else if(this.inputState.tabFocusMode!=0)this.inputState.tabFocusMode=Date.now()+Z}static domEventHandlers(Z){return O0.define(()=>({}),{eventHandlers:Z})}static domEventObservers(Z){return O0.define(()=>({}),{eventObservers:Z})}static theme(Z,J){let Q=A6.newName(),X=[lZ.of(Q),d4.of(J3(`.${Q}`,Z))];if(J&&J.dark)X.push(eY.of(!0));return X}static baseTheme(Z){return N8.lowest(d4.of(J3("."+Z3,Z,zV)))}static findFromDOM(Z){var J;let Q=Z.querySelector(".cm-content"),X=Q&&p1.get(Q)||p1.get(Z);return((J=X===null||X===void 0?void 0:X.root)===null||J===void 0?void 0:J.view)||null}}X1.styleModule=d4;X1.inputHandler=AI;X1.clipboardInputFilter=U3;X1.clipboardOutputFilter=z3;X1.scrollHandler=TI;X1.focusChangeEffect=LI;X1.perLineTextDirection=BI;X1.exceptionSink=MI;X1.updateListener=nY;X1.editable=M8;X1.mouseSelectionStyle=DI;X1.dragMovesSelection=RI;X1.clickAddsSelectionRange=NI;X1.decorations=HJ;X1.blockWrappers=CI;X1.outerDecorations=V3;X1.atomicRanges=X5;X1.bidiIsolatedRanges=_I;X1.cursorScrollMargin=r.define({combine:(Z)=>{let J=5,Q=5;for(let X of Z)if(typeof X=="number")J=Q=X;else({x:J,y:Q}=X);return{x:J,y:Q}}});X1.scrollMargins=kI;X1.darkTheme=eY;X1.cspNonce=r.define({combine:(Z)=>Z.length?Z[0]:""});X1.contentAttributes=I3;X1.editorAttributes=EI;X1.lineWrapping=X1.contentAttributes.of({class:"cm-lineWrapping"});X1.announce=D1.define();var TM=4096,dz={};class IJ{constructor(Z,J,Q,X,Y,K){this.from=Z,this.to=J,this.dir=Q,this.isolates=X,this.fresh=Y,this.order=K}static update(Z,J){if(J.empty&&!Z.some((Y)=>Y.fresh))return Z;let Q=[],X=Z.length?Z[Z.length-1].dir:C1.LTR;for(let Y=Math.max(0,Z.length-10);Y<Z.length;Y++){let K=Z[Y];if(K.dir==X&&!J.touchesRange(K.from,K.to))Q.push(new IJ(J.mapPos(K.from,1),J.mapPos(K.to,-1),K.dir,K.isolates,!1,K.order))}return Q}}function nz(Z,J,Q){for(let X=Z.state.facet(J),Y=X.length-1;Y>=0;Y--){let K=X[Y],q=typeof K=="function"?K(Z):K;if(q)q3(q,Q)}return Q}var SM=i.mac?"mac":i.windows?"win":i.linux?"linux":"key";function EM(Z,J){let Q=Z.split(/-(?!$)/),X=Q[Q.length-1];if(X=="Space")X=" ";let Y,K,q,W;for(let G=0;G<Q.length-1;++G){let U=Q[G];if(/^(cmd|meta|m)$/i.test(U))W=!0;else if(/^a(lt)?$/i.test(U))Y=!0;else if(/^(c|ctrl|control)$/i.test(U))K=!0;else if(/^s(hift)?$/i.test(U))q=!0;else if(/^mod$/i.test(U))if(J=="mac")W=!0;else K=!0;else throw Error("Unrecognized modifier name: "+U)}if(Y)X="Alt-"+X;if(K)X="Ctrl-"+X;if(W)X="Meta-"+X;if(q)X="Shift-"+X;return X}function sZ(Z,J,Q){if(J.altKey)Z="Alt-"+Z;if(J.ctrlKey)Z="Ctrl-"+Z;if(J.metaKey)Z="Meta-"+Z;if(Q!==!1&&J.shiftKey)Z="Shift-"+Z;return Z}var CM=N8.default(X1.domEventHandlers({keydown(Z,J){return wM(_M(J.state),Z,J,"editor")}})),FJ=r.define({enables:CM}),lz=new WeakMap;function _M(Z){let J=Z.facet(FJ),Q=lz.get(J);if(!Q)lz.set(J,Q=xM(J.reduce((X,Y)=>X.concat(Y),[])));return Q}var d8=null,kM=4000;function xM(Z,J=SM){let Q=Object.create(null),X=Object.create(null),Y=(q,W)=>{let G=X[q];if(G==null)X[q]=W;else if(G!=W)throw Error("Key binding "+q+" is used both as a regular binding and as a multi-stroke prefix")},K=(q,W,G,U,z)=>{var I,V;let O=Q[q]||(Q[q]=Object.create(null)),F=W.split(/ (?!$)/).map((P)=>EM(P,J));for(let P=1;P<F.length;P++){let T=F.slice(0,P).join(" ");if(Y(T,!0),!O[T])O[T]={preventDefault:!0,stopPropagation:!1,run:[(C)=>{let _=d8={view:C,prefix:T,scope:q};return setTimeout(()=>{if(d8==_)d8=null},kM),!0}]}}let N=F.join(" ");Y(N,!1);let R=O[N]||(O[N]={preventDefault:!1,stopPropagation:!1,run:((V=(I=O._any)===null||I===void 0?void 0:I.run)===null||V===void 0?void 0:V.slice())||[]});if(G)R.run.push(G);if(U)R.preventDefault=!0;if(z)R.stopPropagation=!0};for(let q of Z){let W=q.scope?q.scope.split(" "):["editor"];if(q.any)for(let U of W){let z=Q[U]||(Q[U]=Object.create(null));if(!z._any)z._any={preventDefault:!1,stopPropagation:!1,run:[]};let{any:I}=q;for(let V in z)z[V].run.push((O)=>I(O,Q3))}let G=q[J]||q.key;if(!G)continue;for(let U of W)if(K(U,G,q.run,q.preventDefault,q.stopPropagation),q.shift)K(U,"Shift-"+G,q.shift,q.preventDefault,q.stopPropagation)}return Q}var Q3=null;function wM(Z,J,Q,X){Q3=J;let Y=Rz(J),K=eU(Y,0),q=Zz(K)==Y.length&&Y!=" ",W="",G=!1,U=!1,z=!1;if(d8&&d8.view==Q&&d8.scope==X){if(W=d8.prefix+" ",rI.indexOf(J.keyCode)<0)U=!0,d8=null}let I=new Set,V=(R)=>{if(R){for(let P of R.run)if(!I.has(P)){if(I.add(P),P(Q)){if(R.stopPropagation)z=!0;return!0}}if(R.preventDefault){if(R.stopPropagation)z=!0;U=!0}}return!1},O=Z[X],F,N;if(O){if(V(O[W+sZ(Y,J,!q)]))G=!0;else if(q&&(J.altKey||J.metaKey||J.ctrlKey)&&!(i.windows&&J.ctrlKey&&J.altKey)&&!(i.mac&&J.altKey&&!(J.ctrlKey||J.metaKey))&&(F=D8[J.keyCode])&&F!=Y){if(V(O[W+sZ(F,J,!0)]))G=!0;else if(J.shiftKey&&(N=M7[J.keyCode])!=Y&&N!=F&&V(O[W+sZ(N,J,!1)]))G=!0}else if(q&&J.shiftKey&&V(O[W+sZ(Y,J,!0)]))G=!0;if(!G&&V(O._any))G=!0}if(U)G=!0;if(G&&z)J.stopPropagation();return Q3=null,G}class w9{constructor(Z,J,Q,X,Y){this.className=Z,this.left=J,this.top=Q,this.width=X,this.height=Y}draw(){let Z=document.createElement("div");return Z.className=this.className,this.adjust(Z),Z}update(Z,J){if(J.className!=this.className)return!1;return this.adjust(Z),!0}adjust(Z){if(Z.style.left=this.left+"px",Z.style.top=this.top+"px",this.width!=null)Z.style.width=this.width+"px";Z.style.height=this.height+"px"}eq(Z){return this.left==Z.left&&this.top==Z.top&&this.width==Z.width&&this.height==Z.height&&this.className==Z.className}static forRange(Z,J,Q){if(Q.empty){let X=Z.coordsAtPos(Q.head,Q.assoc||1);if(!X)return[];let Y=jV(Z);return[new w9(J,X.left-Y.left,X.top-Y.top,null,X.bottom-X.top)]}else return bM(Z,J,Q)}}function jV(Z){let J=Z.scrollDOM.getBoundingClientRect();return{left:(Z.textDirection==C1.LTR?J.left:J.right-Z.scrollDOM.clientWidth*Z.scaleX)-Z.scrollDOM.scrollLeft*Z.scaleX,top:J.top-Z.scrollDOM.scrollTop*Z.scaleY}}function sz(Z,J,Q,X){let Y=Z.coordsAtPos(J,Q*2);if(!Y)return X;let K=Z.dom.getBoundingClientRect(),q=(Y.top+Y.bottom)/2,W=Z.posAtCoords({x:K.left+1,y:q}),G=Z.posAtCoords({x:K.right-1,y:q});if(W==null||G==null)return X;return{from:Math.max(X.from,Math.min(W,G)),to:Math.min(X.to,Math.max(W,G))}}function bM(Z,J,Q){if(Q.to<=Z.viewport.from||Q.from>=Z.viewport.to)return[];let X=Math.max(Q.from,Z.viewport.from),Y=Math.min(Q.to,Z.viewport.to),K=Z.textDirection==C1.LTR,q=Z.contentDOM,W=q.getBoundingClientRect(),G=jV(Z),U=q.querySelector(".cm-line"),z=U&&window.getComputedStyle(U),I=W.left+(z?parseInt(z.paddingLeft)+Math.min(0,parseInt(z.textIndent)):0),V=W.right-(z?parseInt(z.paddingRight):0),O=iY(Z,X,1),F=iY(Z,Y,-1),N=O.type==U0.Text?O:null,R=F.type==U0.Text?F:null;if(N&&(Z.lineWrapping||O.widgetLineBreaks))N=sz(Z,X,1,N);if(R&&(Z.lineWrapping||F.widgetLineBreaks))R=sz(Z,Y,-1,R);if(N&&R&&N.from==R.from&&N.to==R.to)return T(C(Q.from,Q.to,N));else{let A=N?C(Q.from,null,N):_(O,!1),B=R?C(null,Q.to,R):_(F,!0),L=[];if((N||O).to<(R||F).from-(N&&R?1:0)||O.widgetLineBreaks>1&&A.bottom+Z.defaultLineHeight/2<B.top)L.push(P(I,A.bottom,V,B.top));else if(A.bottom<B.top&&Z.elementAtHeight((A.bottom+B.top)/2).type==U0.Text)A.bottom=B.top=(A.bottom+B.top)/2;return T(A).concat(L).concat(T(B))}function P(A,B,L,E){return new w9(J,A-G.left,B-G.top,Math.max(0,L-A),E-B)}function T({top:A,bottom:B,horizontal:L}){let E=[];for(let D=0;D<L.length;D+=2)E.push(P(L[D],A,L[D+1],B));return E}function C(A,B,L){let E=1e9,D=-1e9,l=[];function $(o,t,Y1,W1,e){let a=Z.coordsAtPos(o,o==L.to?-2:2),h=Z.coordsAtPos(Y1,Y1==L.from?2:-2);if(!a||!h)return;if(E=Math.min(a.top,h.top,E),D=Math.max(a.bottom,h.bottom,D),e==C1.LTR)l.push(K&&t?I:a.left,K&&W1?V:h.right);else l.push(!K&&W1?I:h.left,!K&&t?V:a.right)}let m=A!==null&&A!==void 0?A:L.from,q1=B!==null&&B!==void 0?B:L.to;for(let o of Z.visibleRanges)if(o.to>m&&o.from<q1)for(let t=Math.max(o.from,m),Y1=Math.min(o.to,q1);;){let W1=Z.state.doc.lineAt(t);for(let e of Z.bidiSpans(W1)){let a=e.from+W1.from,h=e.to+W1.from;if(a>=Y1)break;if(h>t)$(Math.max(a,t),A==null&&a<=m,Math.min(h,Y1),B==null&&h>=q1,e.dir)}if(t=W1.to+1,t>=Y1)break}if(l.length==0)$(m,A==null,q1,B==null,Z.textDirection);return{top:E,bottom:D,horizontal:l}}function _(A,B){let L=W.top+(B?A.top:A.bottom);return{top:L,bottom:L,horizontal:[]}}}function yM(Z,J){return Z.constructor==J.constructor&&Z.eq(J)}class HV{constructor(Z,J){if(this.view=Z,this.layer=J,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=Z.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),J.above)this.dom.classList.add("cm-layer-above");if(J.class)this.dom.classList.add(J.class);if(this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(Z.state),Z.requestMeasure(this.measureReq),J.mount)J.mount(this.dom,Z)}update(Z){if(Z.startState.facet(JJ)!=Z.state.facet(JJ))this.setOrder(Z.state);if(this.layer.update(Z,this.dom)||Z.geometryChanged)this.scale(),Z.view.requestMeasure(this.measureReq)}docViewUpdate(Z){if(this.layer.updateOnDocViewUpdate!==!1)Z.requestMeasure(this.measureReq)}setOrder(Z){let J=0,Q=Z.facet(JJ);while(J<Q.length&&Q[J]!=this.layer)J++;this.dom.style.zIndex=String((this.layer.above?150:-1)-J)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:Z,scaleY:J}=this.view;if(Z!=this.scaleX||J!=this.scaleY)this.scaleX=Z,this.scaleY=J,this.dom.style.transform=`scale(${1/Z}, ${1/J})`}draw(Z){if(Z.length!=this.drawn.length||Z.some((J,Q)=>!yM(J,this.drawn[Q]))){let J=this.dom.firstChild,Q=0;for(let X of Z)if(X.update&&J&&X.constructor&&this.drawn[Q].constructor&&X.update(J,this.drawn[Q]))J=J.nextSibling,Q++;else this.dom.insertBefore(X.draw(),J);while(J){let X=J.nextSibling;J.remove(),J=X}if(this.drawn=Z,i.webkit)this.dom.style.display=this.dom.firstChild?"":"none"}}destroy(){if(this.layer.destroy)this.layer.destroy(this.dom,this.view);this.dom.remove()}}var JJ=r.define();function OV(Z){return[O0.define((J)=>new HV(J,Z)),JJ.of(Z)]}var _7=r.define({combine(Z){return R8(Z,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(J,Q)=>Math.min(J,Q),drawRangeCursor:(J,Q)=>J||Q})}});function FV(Z={}){return[_7.of(Z),$M,hM,gM,PI.of(!0)]}function NV(Z){return Z.startState.facet(_7)!=Z.state.facet(_7)}var $M=OV({above:!0,markers(Z){let{state:J}=Z,Q=J.facet(_7),X=[];for(let Y of J.selection.ranges){let K=Y==J.selection.main;if(Y.empty||Q.drawRangeCursor&&!(K&&i.ios&&Q.iosSelectionHandles)){let q=K?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",W=Y.empty?Y:y.cursor(Y.head,Y.assoc);for(let G of w9.forRange(Z,q,W))X.push(G)}}return X},update(Z,J){if(Z.transactions.some((X)=>X.selection))J.style.animationName=J.style.animationName=="cm-blink"?"cm-blink2":"cm-blink";let Q=NV(Z);if(Q)iz(Z.state,J);return Z.docChanged||Z.selectionSet||Q},mount(Z,J){iz(J.state,Z)},class:"cm-cursorLayer"});function iz(Z,J){J.style.animationDuration=Z.facet(_7).cursorBlinkRate+"ms"}var hM=OV({above:!1,markers(Z){let J=[],{main:Q,ranges:X}=Z.state.selection;for(let Y of X)if(!Y.empty)for(let K of w9.forRange(Z,"cm-selectionBackground",Y))J.push(K);if(i.ios&&!Q.empty&&Z.state.facet(_7).iosSelectionHandles){for(let Y of w9.forRange(Z,"cm-selectionHandle cm-selectionHandle-start",y.cursor(Q.from,1)))J.push(Y);for(let Y of w9.forRange(Z,"cm-selectionHandle cm-selectionHandle-end",y.cursor(Q.to,1)))J.push(Y)}return J},update(Z,J){return Z.docChanged||Z.selectionSet||Z.viewportChanged||NV(Z)},class:"cm-selectionLayer"}),fM=i.gecko&&i.gecko_version==153?"#ffffff01":"transparent",gM=N8.highest(X1.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${fM} !important`},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var bk=/x/.unicode!=null?"gu":"g";function RV(){return vM}var uM=M1.line({class:"cm-activeLine"}),vM=O0.fromClass(class{constructor(Z){this.decorations=this.getDeco(Z)}update(Z){if(Z.docChanged||Z.selectionSet)this.decorations=this.getDeco(Z.view)}getDeco(Z){let J=-1,Q=[];for(let X of Z.state.selection.ranges){let Y=Z.lineBlockAt(X.head);if(Y.from>J)Q.push(uM.range(Y.from)),J=Y.from}return M1.set(Q)}},{decorations:(Z)=>Z.decorations});var iZ="-10000px";class R3{constructor(Z,J,Q,X){this.facet=J,this.createTooltipView=Q,this.removeTooltipView=X,this.input=Z.state.facet(J),this.tooltips=this.input.filter((K)=>K);let Y=null;this.tooltipViews=this.tooltips.map((K)=>Y=Q(K,Y))}update(Z,J){var Q;let X=Z.state.facet(this.facet),Y=X.filter((W)=>W);if(X===this.input){for(let W of this.tooltipViews)if(W.update)W.update(Z);return!1}let K=[],q=J?[]:null;for(let W=0;W<Y.length;W++){let G=Y[W],U=-1;if(!G)continue;for(let z=0;z<this.tooltips.length;z++){let I=this.tooltips[z];if(I&&I.create==G.create)U=z}if(U<0){if(K[W]=this.createTooltipView(G,W?K[W-1]:null),q)q[W]=!!G.above}else{let z=K[W]=this.tooltipViews[U];if(q)q[W]=J[U];if(z.update)z.update(Z)}}for(let W of this.tooltipViews)if(K.indexOf(W)<0)this.removeTooltipView(W),(Q=W.destroy)===null||Q===void 0||Q.call(W);if(J)q.forEach((W,G)=>J[G]=W),J.length=q.length;return this.input=X,this.tooltips=Y,this.tooltipViews=K,!0}}function mM(Z){let J=Z.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:J.clientHeight,right:J.clientWidth}}var yY=r.define({combine:(Z)=>{var J,Q,X;return{position:i.ios?"absolute":((J=Z.find((Y)=>Y.position))===null||J===void 0?void 0:J.position)||"fixed",parent:((Q=Z.find((Y)=>Y.parent))===null||Q===void 0?void 0:Q.parent)||null,tooltipSpace:((X=Z.find((Y)=>Y.tooltipSpace))===null||X===void 0?void 0:X.tooltipSpace)||mM}}}),rz=new WeakMap,DV=O0.fromClass(class{constructor(Z){this.view=Z,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let J=Z.state.facet(yY);this.position=J.position,this.parent=J.parent,this.classes=Z.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new R3(Z,D3,(Q,X)=>this.createTooltip(Q,X),(Q)=>{if(this.resizeObserver)this.resizeObserver.unobserve(Q.dom);Q.dom.remove()}),this.above=this.manager.tooltips.map((Q)=>!!Q.above),this.intersectionObserver=typeof IntersectionObserver=="function"?new IntersectionObserver((Q)=>{if(Date.now()>this.lastTransaction-50&&Q.length>0&&Q[Q.length-1].intersectionRatio<1)this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),Z.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){if(this.parent)this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container);else this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let Z of this.manager.tooltipViews)this.intersectionObserver.observe(Z.dom)}}measureSoon(){if(this.measureTimeout<0)this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50)}update(Z){if(Z.transactions.length)this.lastTransaction=Date.now();let J=this.manager.update(Z,this.above);if(J)this.observeIntersection();let Q=J||Z.geometryChanged,X=Z.state.facet(yY);if(X.position!=this.position&&!this.madeAbsolute){this.position=X.position;for(let Y of this.manager.tooltipViews)Y.dom.style.position=this.position;Q=!0}if(X.parent!=this.parent){if(this.parent)this.container.remove();this.parent=X.parent,this.createContainer();for(let Y of this.manager.tooltipViews)this.container.appendChild(Y.dom);Q=!0}else if(this.parent&&this.view.themeClasses!=this.classes)this.classes=this.container.className=this.view.themeClasses;if(Q)this.maybeMeasure()}createTooltip(Z,J){let Q=Z.create(this.view),X=J?J.dom:null;if(Q.dom.classList.add("cm-tooltip"),Z.arrow&&!Q.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let Y=document.createElement("div");Y.className="cm-tooltip-arrow",Q.dom.appendChild(Y)}if(Q.dom.style.position=this.position,Q.dom.style.top=iZ,Q.dom.style.left="0px",this.container.insertBefore(Q.dom,X),Q.mount)Q.mount(this.view);if(this.resizeObserver)this.resizeObserver.observe(Q.dom);return Q}destroy(){var Z,J,Q;this.view.win.removeEventListener("resize",this.measureSoon);for(let X of this.manager.tooltipViews)X.dom.remove(),(Z=X.destroy)===null||Z===void 0||Z.call(X);if(this.parent)this.container.remove();(J=this.resizeObserver)===null||J===void 0||J.disconnect(),(Q=this.intersectionObserver)===null||Q===void 0||Q.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let Z=1,J=1,Q=!1;if(this.position=="fixed"&&this.manager.tooltipViews.length){let{dom:K}=this.manager.tooltipViews[0];if(i.safari){let q=K.getBoundingClientRect();Q=Math.abs(q.top+1e4)>1||Math.abs(q.left)>1}else Q=!!K.offsetParent&&K.offsetParent!=this.container.ownerDocument.body}if(Q||this.position=="absolute")if(this.parent){let K=this.parent.getBoundingClientRect();if(K.width&&K.height)Z=K.width/this.parent.offsetWidth,J=K.height/this.parent.offsetHeight}else({scaleX:Z,scaleY:J}=this.view.viewState);let X=this.view.scrollDOM.getBoundingClientRect(),Y=j3(this.view);return{visible:{left:X.left+Y.left,top:X.top+Y.top,right:X.right-Y.right,bottom:X.bottom-Y.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((K,q)=>{let W=this.manager.tooltipViews[q];return W.getCoords?W.getCoords(K.pos):this.view.coordsAtPos(K.pos)}),size:this.manager.tooltipViews.map(({dom:K})=>K.getBoundingClientRect()),space:this.view.state.facet(yY).tooltipSpace(this.view),scaleX:Z,scaleY:J,makeAbsolute:Q}}writeMeasure(Z){var J;if(Z.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let W of this.manager.tooltipViews)W.dom.style.position="absolute"}let{visible:Q,space:X,scaleX:Y,scaleY:K}=Z,q=[];for(let W=0;W<this.manager.tooltips.length;W++){let G=this.manager.tooltips[W],U=this.manager.tooltipViews[W],{dom:z}=U,I=Z.pos[W],V=Z.size[W];if(!I||G.clip!==!1&&(I.bottom<=Math.max(Q.top,X.top)||I.top>=Math.min(Q.bottom,X.bottom)||I.right<Math.max(Q.left,X.left)-0.1||I.left>Math.min(Q.right,X.right)+0.1)){z.style.top=iZ;continue}let O=G.arrow?U.dom.querySelector(".cm-tooltip-arrow"):null,F=O?7:0,N=V.right-V.left,R=(J=rz.get(U))!==null&&J!==void 0?J:V.bottom-V.top,P=U.offset||cM,T=this.view.textDirection==C1.LTR,C=V.width>X.right-X.left?T?X.left:X.right-V.width:T?Math.max(X.left,Math.min(I.left-(O?14:0)+P.x,X.right-N)):Math.min(Math.max(X.left,I.left-N+(O?14:0)-P.x),X.right-N),_=this.above[W];if(!G.strictSide&&(_?I.top-R-F-P.y<X.top:I.bottom+R+F+P.y>X.bottom)&&_==X.bottom-I.bottom>I.top-X.top)_=this.above[W]=!_;let A=(_?I.top-X.top:X.bottom-I.bottom)-F;if(A<R&&U.resize!==!1){if(A<this.view.defaultLineHeight){z.style.top=iZ;continue}rz.set(U,R),z.style.height=(R=A)/K+"px"}else if(z.style.height)z.style.height="";let B=_?I.top-R-F-P.y:I.bottom+F+P.y,L=C+N;if(U.overlap!==!0){for(let E of q)if(E.left<L&&E.right>C&&E.top<B+R&&E.bottom>B)B=_?E.top-R-2-F:E.bottom+F+2}if(this.position=="absolute")z.style.top=(B-Z.parent.top)/K+"px",az(z,(C-Z.parent.left)/Y);else z.style.top=B/K+"px",az(z,C/Y);if(O){let E=I.left+(T?P.x:-P.x)-(C+14-7);O.style.left=E/Y+"px"}if(U.overlap!==!0)q.push({left:C,top:B,right:L,bottom:B+R});if(z.classList.toggle("cm-tooltip-above",_),z.classList.toggle("cm-tooltip-below",!_),U.positioned)U.positioned(Z.space)}}maybeMeasure(){if(this.manager.tooltips.length){if(this.view.inView)this.view.requestMeasure(this.measureReq);if(this.inView!=this.view.inView){if(this.inView=this.view.inView,!this.inView)for(let Z of this.manager.tooltipViews)Z.dom.style.top=iZ}}}},{eventObservers:{scroll(){this.maybeMeasure()}}});function az(Z,J){let Q=parseInt(Z.style.left,10);if(isNaN(Q)||Math.abs(J-Q)>1)Z.style.left=J+"px"}var pM=X1.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:"7px",width:"14px",position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent"},".cm-tooltip-above &":{bottom:"-7px","&:before":{borderTop:"7px solid #bbb"},"&:after":{borderTop:"7px solid #f5f5f5",bottom:"1px"}},".cm-tooltip-below &":{top:"-7px","&:before":{borderBottom:"7px solid #bbb"},"&:after":{borderBottom:"7px solid #f5f5f5",top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),cM={x:0,y:0},D3=r.define({enables:[DV,pM]}),VJ=r.define({combine:(Z)=>Z.reduce((J,Q)=>J.concat(Q),[])});class NJ{static create(Z){return new NJ(Z)}constructor(Z){this.view=Z,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new R3(Z,VJ,(J,Q)=>this.createHostedView(J,Q),(J)=>J.dom.remove())}createHostedView(Z,J){let Q=Z.create(this.view);if(Q.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(Q.dom,J?J.dom.nextSibling:this.dom.firstChild),this.mounted&&Q.mount)Q.mount(this.view);return Q}mount(Z){for(let J of this.manager.tooltipViews)if(J.mount)J.mount(Z);this.mounted=!0}positioned(Z){for(let J of this.manager.tooltipViews)if(J.positioned)J.positioned(Z)}update(Z){this.manager.update(Z)}destroy(){var Z;for(let J of this.manager.tooltipViews)(Z=J.destroy)===null||Z===void 0||Z.call(J)}passProp(Z){let J=void 0;for(let Q of this.manager.tooltipViews){let X=Q[Z];if(X!==void 0){if(J===void 0)J=X;else if(J!==X)return}}return J}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}var dM=D3.compute([VJ],(Z)=>{let J=Z.facet(VJ);if(J.length===0)return null;return{pos:Math.min(...J.map((Q)=>Q.pos)),end:Math.max(...J.map((Q)=>{var X;return(X=Q.end)!==null&&X!==void 0?X:Q.pos})),create:NJ.create,above:J[0].above,arrow:J.some((Q)=>Q.arrow)}}),nM=r.define();class MV{constructor(Z,J,Q,X,Y,K){this.view=Z,this.source=J,this.field=Q,this.locked=X,this.setHover=Y,this.hoverTime=K,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:Z.dom,time:0},this.checkHover=this.checkHover.bind(this),Z.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),Z.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(Z){if(this.pending)this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20)}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let Z=Date.now()-this.lastMove.time;if(Z<this.hoverTime)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-Z);else this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:Z,lastMove:J}=this,Q=Z.docView.tile.nearest(J.target);if(!Q)return;let X,Y=1;if(Q.isWidget())X=Q.posAtStart;else{if(X=Z.posAtCoords(J),X==null)return;let K=Z.coordsAtPos(X);if(!K||J.y<K.top||J.y>K.bottom||J.x<K.left-Z.defaultCharacterWidth||J.x>K.right+Z.defaultCharacterWidth)return;let q=Z.bidiSpans(Z.state.doc.lineAt(X)).find((G)=>G.from<=X&&G.to>=X),W=q&&q.dir==C1.RTL?-1:1;Y=J.x<K.left?-W:W}this.activateHover(Z,X,Y)}activateHover(Z,J,Q,X){let Y=this.source(Z,J,Q),K=(q)=>{if(q&&!(Array.isArray(q)&&!q.length)){let W=Array.isArray(q)?q:[q];if(X)this.locked.set(W,X);Z.dispatch({effects:this.setHover.of(W)})}};if(Y&&"then"in Y){let q=this.pending={pos:J};Y.then((W)=>{if(this.pending==q)this.pending=null,K(W)},(W)=>p0(Z.state,W,"hover tooltip"))}else K(Y)}get tooltip(){let Z=this.view.plugin(DV),J=Z?Z.manager.tooltips.findIndex((Q)=>Q.create==NJ.create):-1;return J>-1?Z.manager.tooltipViews[J]:null}mousemove(Z){var J,Q;if(this.lastMove={x:Z.clientX,y:Z.clientY,target:Z.target,time:Date.now()},this.hoverTimeout<0)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime);let{active:X,tooltip:Y}=this;if(X.length&&!this.locked.has(X)&&Y&&!lM(Y.dom,Z)||this.pending){let{pos:K}=X[0]||this.pending,q=(Q=(J=X[0])===null||J===void 0?void 0:J.end)!==null&&Q!==void 0?Q:K;if(K==q?this.view.posAtCoords(this.lastMove)!=K:!sM(this.view,K,q,Z.clientX,Z.clientY))this.view.dispatch({effects:this.setHover.of([])}),this.pending=null}}mouseleave(Z){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:J}=this;if(J.length&&!this.locked.has(J)){let{tooltip:Q}=this;if(!(Q&&Q.dom.contains(Z.relatedTarget)))this.view.dispatch({effects:this.setHover.of([])});else this.watchTooltipLeave(Q.dom)}}watchTooltipLeave(Z){let J=(Q)=>{Z.removeEventListener("mouseleave",J);let{active:X}=this;if(X.length&&!this.locked.has(X)&&!this.view.dom.contains(Q.relatedTarget))this.view.dispatch({effects:this.setHover.of([])})};Z.addEventListener("mouseleave",J)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}var rZ=4;function lM(Z,J){let{left:Q,right:X,top:Y,bottom:K}=Z.getBoundingClientRect(),q;if(q=Z.querySelector(".cm-tooltip-arrow")){let W=q.getBoundingClientRect();Y=Math.min(W.top,Y),K=Math.max(W.bottom,K)}return J.clientX>=Q-rZ&&J.clientX<=X+rZ&&J.clientY>=Y-rZ&&J.clientY<=K+rZ}function sM(Z,J,Q,X,Y,K){let q=Z.scrollDOM.getBoundingClientRect(),W=Z.documentTop+Z.documentPadding.top+Z.contentHeight;if(q.left>X||q.right<X||q.top>Y||Math.min(q.bottom,W)<Y)return!1;let G=Z.posAtCoords({x:X,y:Y},!1);return G>=J&&G<=Q}function AV(Z,J={}){let Q=D1.define(),X=new WeakMap,Y=H0.define({create(){return[]},update(q,W){let G=X.get(q);if(q.length){if(J.hideOnChange&&(W.docChanged||W.selection))q=[];else if(G&&G(W))q=[];else if(J.hideOn)q=q.filter((U)=>!J.hideOn(W,U))}if(W.docChanged&&q.length){let U=[];for(let z of q){let I=W.changes.mapPos(z.pos,-1,A0.TrackDel);if(I!=null){let V=Object.assign(Object.create(null),z);if(V.pos=I,V.end!=null)V.end=W.changes.mapPos(V.end);U.push(V)}}q=U}for(let U of W.effects){if(U.is(Q))q=U.value,G=void 0;if(U.is(iM)&&!U.value||U.value==Y)q=[]}if(q.length&&G)X.set(q,G);return q},provide:(q)=>VJ.from(q)}),K=O0.define((q)=>new MV(q,Z,Y,X,Q,J.hoverTime||300));return{active:Y,extension:[Y,K,nM.of(K),dM]}}var iM=D1.define();var oz=r.define({combine(Z){let J,Q;for(let X of Z)J=J||X.topContainer,Q=Q||X.bottomContainer;return{topContainer:J,bottomContainer:Q}}});var rM=O0.fromClass(class{constructor(Z){this.input=Z.state.facet(k7),this.specs=this.input.filter((Q)=>Q),this.panels=this.specs.map((Q)=>Q(Z));let J=Z.state.facet(oz);this.top=new s4(Z,!0,J.topContainer),this.bottom=new s4(Z,!1,J.bottomContainer),this.top.sync(this.panels.filter((Q)=>Q.top)),this.bottom.sync(this.panels.filter((Q)=>!Q.top));for(let Q of this.panels)if(Q.dom.classList.add("cm-panel"),Q.mount)Q.mount()}update(Z){let J=Z.state.facet(oz);if(this.top.container!=J.topContainer)this.top.sync([]),this.top=new s4(Z.view,!0,J.topContainer);if(this.bottom.container!=J.bottomContainer)this.bottom.sync([]),this.bottom=new s4(Z.view,!1,J.bottomContainer);this.top.syncClasses(),this.bottom.syncClasses();let Q=Z.state.facet(k7);if(Q!=this.input){let X=Q.filter((G)=>G),Y=[],K=[],q=[],W=[];for(let G of X){let U=this.specs.indexOf(G),z;if(U<0)z=G(Z.view),W.push(z);else if(z=this.panels[U],z.update)z.update(Z);Y.push(z),(z.top?K:q).push(z)}this.specs=X,this.panels=Y,this.top.sync(K),this.bottom.sync(q);for(let G of W)if(G.dom.classList.add("cm-panel"),G.mount)G.mount()}else for(let X of this.panels)if(X.update)X.update(Z)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:(Z)=>X1.scrollMargins.of((J)=>{let Q=J.plugin(Z);return Q&&{top:Q.top.scrollMargin(),bottom:Q.bottom.scrollMargin()}})});class s4{constructor(Z,J,Q){this.view=Z,this.top=J,this.container=Q,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(Z){for(let J of this.panels)if(J.destroy&&Z.indexOf(J)<0)J.destroy();this.panels=Z,this.syncDOM()}syncDOM(){if(this.panels.length==0){if(this.dom)this.dom.remove(),this.dom=void 0;return}if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom";let J=this.container||this.view.dom;J.insertBefore(this.dom,this.top?J.firstChild:null)}let Z=this.dom.firstChild;for(let J of this.panels)if(J.dom.parentNode==this.dom){while(Z!=J.dom)Z=tz(Z);Z=Z.nextSibling}else this.dom.insertBefore(J.dom,Z);while(Z)Z=tz(Z)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(!this.container||this.classes==this.view.themeClasses)return;for(let Z of this.classes.split(" "))if(Z)this.container.classList.remove(Z);for(let Z of(this.classes=this.view.themeClasses).split(" "))if(Z)this.container.classList.add(Z)}}function tz(Z){let J=Z.nextSibling;return Z.remove(),J}var k7=r.define({enables:rM});class i6 extends O8{compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}eq(Z){return!1}destroy(Z){}}i6.prototype.elementClass="";i6.prototype.toDOM=void 0;i6.prototype.mapMode=A0.TrackBefore;i6.prototype.startSide=i6.prototype.endSide=-1;i6.prototype.point=!0;var $Y=r.define(),aM=r.define();var QJ=r.define();var X3=r.define({combine:(Z)=>Z.some((J)=>J)});function oM(Z){let J=[tM];if(Z&&Z.fixed===!1)J.push(X3.of(!0));return J}var tM=O0.fromClass(class{constructor(Z){this.view=Z,this.domAfter=null,this.prevViewport=Z.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=Z.state.facet(QJ).map((J)=>new K3(Z,J)),this.fixed=!Z.state.facet(X3);for(let J of this.gutters)if(J.config.side=="after")this.getDOMAfter().appendChild(J.dom);else this.dom.appendChild(J.dom);if(this.fixed)this.dom.style.position="sticky";this.syncGutters(!1),Z.scrollDOM.insertBefore(this.dom,Z.contentDOM)}getDOMAfter(){if(!this.domAfter)this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter);return this.domAfter}update(Z){if(this.updateGutters(Z)){let J=this.prevViewport,Q=Z.view.viewport,X=Math.min(J.to,Q.to)-Math.max(J.from,Q.from);this.syncGutters(X<(Q.to-Q.from)*0.8)}if(Z.geometryChanged){let J=this.view.contentHeight/this.view.scaleY+"px";if(this.dom.style.minHeight=J,this.domAfter)this.domAfter.style.minHeight=J}if(this.view.state.facet(X3)!=!this.fixed){if(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter)this.domAfter.style.position=this.fixed?"sticky":""}this.prevViewport=Z.view.viewport}syncGutters(Z){let J=this.dom.nextSibling;if(Z){if(this.dom.remove(),this.domAfter)this.domAfter.remove()}let Q=H1.iter(this.view.state.facet($Y),this.view.viewport.from),X=[],Y=this.gutters.map((K)=>new LV(K,this.view.viewport,-this.view.documentPadding.top));for(let K of this.view.viewportLineBlocks){if(X.length)X=[];if(Array.isArray(K.type)){let q=!0;for(let W of K.type)if(W.type==U0.Text&&q){Y3(Q,X,W.from);for(let G of Y)G.line(this.view,W,X);q=!1}else if(W.widget)for(let G of Y)G.widget(this.view,W)}else if(K.type==U0.Text){Y3(Q,X,K.from);for(let q of Y)q.line(this.view,K,X)}else if(K.widget)for(let q of Y)q.widget(this.view,K)}for(let K of Y)K.finish();if(Z){if(this.view.scrollDOM.insertBefore(this.dom,J),this.domAfter)this.view.scrollDOM.appendChild(this.domAfter)}}updateGutters(Z){let J=Z.startState.facet(QJ),Q=Z.state.facet(QJ),X=Z.docChanged||Z.heightChanged||Z.viewportChanged||!H1.eq(Z.startState.facet($Y),Z.state.facet($Y),Z.view.viewport.from,Z.view.viewport.to);if(J==Q){for(let Y of this.gutters)if(Y.update(Z))X=!0}else{X=!0;let Y=[];for(let K of Q){let q=J.indexOf(K);if(q<0)Y.push(new K3(this.view,K));else this.gutters[q].update(Z),Y.push(this.gutters[q])}for(let K of this.gutters)if(K.dom.remove(),Y.indexOf(K)<0)K.destroy();for(let K of Y)if(K.config.side=="after")this.getDOMAfter().appendChild(K.dom);else this.dom.appendChild(K.dom);this.gutters=Y}return X}destroy(){for(let Z of this.gutters)Z.destroy();if(this.dom.remove(),this.domAfter)this.domAfter.remove()}},{provide:(Z)=>X1.scrollMargins.of((J)=>{let Q=J.plugin(Z);if(!Q||Q.gutters.length==0||!Q.fixed)return null;let X=Q.dom.offsetWidth*J.scaleX,Y=Q.domAfter?Q.domAfter.offsetWidth*J.scaleX:0;return J.textDirection==C1.LTR?{left:X,right:Y}:{right:X,left:Y}})});function ez(Z){return Array.isArray(Z)?Z:[Z]}function Y3(Z,J,Q){while(Z.value&&Z.from<=Q){if(Z.from==Q)J.push(Z.value);Z.next()}}class LV{constructor(Z,J,Q){this.gutter=Z,this.height=Q,this.i=0,this.cursor=H1.iter(Z.markers,J.from)}addElement(Z,J,Q){let{gutter:X}=this,Y=(J.top-this.height)/Z.scaleY,K=J.height/Z.scaleY;if(this.i==X.elements.length){let q=new M3(Z,K,Y,Q);X.elements.push(q),X.dom.appendChild(q.dom)}else X.elements[this.i].update(Z,K,Y,Q);this.height=J.bottom,this.i++}line(Z,J,Q){let X=[];if(Y3(this.cursor,X,J.from),Q.length)X=X.concat(Q);let Y=this.gutter.config.lineMarker(Z,J,X);if(Y)X.unshift(Y);let K=this.gutter;if(X.length==0&&!K.config.renderEmptyElements)return;this.addElement(Z,J,X)}widget(Z,J){let Q=this.gutter.config.widgetMarker(Z,J.widget,J),X=Q?[Q]:null;for(let Y of Z.state.facet(aM)){let K=Y(Z,J.widget,J);if(K)(X||(X=[])).push(K)}if(X)this.addElement(Z,J,X)}finish(){let Z=this.gutter;while(Z.elements.length>this.i){let J=Z.elements.pop();Z.dom.removeChild(J.dom),J.destroy()}}}class K3{constructor(Z,J){this.view=Z,this.config=J,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let Q in J.domEventHandlers)this.dom.addEventListener(Q,(X)=>{let Y=X.target,K;if(Y!=this.dom&&this.dom.contains(Y)){while(Y.parentNode!=this.dom)Y=Y.parentNode;let W=Y.getBoundingClientRect();K=(W.top+W.bottom)/2}else K=X.clientY;let q=Z.lineBlockAtHeight(K-Z.documentTop);if(J.domEventHandlers[Q](Z,q,X))X.preventDefault()});if(this.markers=ez(J.markers(Z)),J.initialSpacer)this.spacer=new M3(Z,0,0,[J.initialSpacer(Z)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none"}update(Z){let J=this.markers;if(this.markers=ez(this.config.markers(Z.view)),this.spacer&&this.config.updateSpacer){let X=this.config.updateSpacer(this.spacer.markers[0],Z);if(X!=this.spacer.markers[0])this.spacer.update(Z.view,0,0,[X])}let Q=Z.view.viewport;return!H1.eq(this.markers,J,Q.from,Q.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(Z):!1)}destroy(){for(let Z of this.elements)Z.destroy()}}class M3{constructor(Z,J,Q,X){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(Z,J,Q,X)}update(Z,J,Q,X){if(this.height!=J)this.height=J,this.dom.style.height=J+"px";if(this.above!=Q)this.dom.style.marginTop=(this.above=Q)?Q+"px":"";if(!eM(this.markers,X))this.setMarkers(Z,X)}setMarkers(Z,J){let Q="cm-gutterElement",X=this.dom.firstChild;for(let Y=0,K=0;;){let q=K,W=Y<J.length?J[Y++]:null,G=!1;if(W){let U=W.elementClass;if(U)Q+=" "+U;for(let z=K;z<this.markers.length;z++)if(this.markers[z].compare(W)){q=z,G=!0;break}}else q=this.markers.length;while(K<q){let U=this.markers[K++];if(U.toDOM){U.destroy(X);let z=X.nextSibling;X.remove(),X=z}}if(!W)break;if(W.toDOM)if(G)X=X.nextSibling;else this.dom.insertBefore(W.toDOM(Z),X);if(G)K++}this.dom.className=Q,this.markers=J}destroy(){this.setMarkers(null,[])}}function eM(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(!Z[Q].compare(J[Q]))return!1;return!0}var ZA=r.define(),JA=r.define(),B7=r.define({combine(Z){return R8(Z,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(J,Q){let X=Object.assign({},J);for(let Y in Q){let K=X[Y],q=Q[Y];X[Y]=K?(W,G,U)=>K(W,G,U)||q(W,G,U):q}return X}})}});class XJ extends i6{constructor(Z){super();this.number=Z}eq(Z){return this.number==Z.number}toDOM(){return document.createTextNode(this.number)}}function hY(Z,J){return Z.state.facet(B7).formatNumber(J,Z.state)}var QA=QJ.compute([B7],(Z)=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(J){return J.state.facet(ZA)},lineMarker(J,Q,X){if(X.some((Y)=>Y.toDOM))return null;return new XJ(hY(J,J.state.doc.lineAt(Q.from).number))},widgetMarker:(J,Q,X)=>{for(let Y of J.state.facet(JA)){let K=Y(J,Q,X);if(K)return K}return null},lineMarkerChange:(J)=>J.startState.facet(B7)!=J.state.facet(B7),initialSpacer(J){return new XJ(hY(J,ZI(J.state.doc.lines)))},updateSpacer(J,Q){let X=hY(Q.view,ZI(Q.view.state.doc.lines));return X==J.number?J:new XJ(X)},domEventHandlers:Z.facet(B7).domEventHandlers,side:"before"}));function BV(Z={}){return[B7.of(Z),oM(),QA]}function ZI(Z){let J=9;while(J<Z)J=J*10+9;return J}var XA=0;class DJ{constructor(Z,J){this.from=Z,this.to=J}}class I1{constructor(Z={}){this.id=XA++,this.perNode=!!Z.perNode,this.deserialize=Z.deserialize||(()=>{throw Error("This node type doesn't define a deserialize function")}),this.combine=Z.combine||null}add(Z){if(this.perNode)throw RangeError("Can't add per-node props to node types");if(typeof Z!="function")Z=T0.match(Z);return(J)=>{let Q=Z(J);return Q===void 0?null:[this,Q]}}}I1.closedBy=new I1({deserialize:(Z)=>Z.split(" ")});I1.openedBy=new I1({deserialize:(Z)=>Z.split(" ")});I1.group=new I1({deserialize:(Z)=>Z.split(" ")});I1.isolate=new I1({deserialize:(Z)=>{if(Z&&Z!="rtl"&&Z!="ltr"&&Z!="auto")throw RangeError("Invalid value for isolate: "+Z);return Z||"auto"}});I1.contextHash=new I1({perNode:!0});I1.lookAhead=new I1({perNode:!0});I1.mounted=new I1({perNode:!0});class x7{constructor(Z,J,Q,X=!1){this.tree=Z,this.overlay=J,this.parser=Q,this.bracketed=X}static get(Z){return Z&&Z.props&&Z.props[I1.mounted.id]}}var YA=Object.create(null);class T0{constructor(Z,J,Q,X=0){this.name=Z,this.props=J,this.id=Q,this.flags=X}static define(Z){let J=Z.props&&Z.props.length?Object.create(null):YA,Q=(Z.top?1:0)|(Z.skipped?2:0)|(Z.error?4:0)|(Z.name==null?8:0),X=new T0(Z.name||"",J,Z.id,Q);if(Z.props)for(let Y of Z.props){if(!Array.isArray(Y))Y=Y(X);if(Y){if(Y[0].perNode)throw RangeError("Can't store a per-node prop on a node type");J[Y[0].id]=Y[1]}}return X}prop(Z){return this.props[Z.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(Z){if(typeof Z=="string"){if(this.name==Z)return!0;let J=this.prop(I1.group);return J?J.indexOf(Z)>-1:!1}return this.id==Z}static match(Z){let J=Object.create(null);for(let Q in Z)for(let X of Q.split(" "))J[X]=Z[Q];return(Q)=>{for(let X=Q.prop(I1.group),Y=-1;Y<(X?X.length:0);Y++){let K=J[Y<0?Q.name:X[Y]];if(K)return K}}}}T0.none=new T0("",Object.create(null),0,8);class LJ{constructor(Z){this.types=Z;for(let J=0;J<Z.length;J++)if(Z[J].id!=J)throw RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...Z){let J=[];for(let Q of this.types){let X=null;for(let Y of Z){let K=Y(Q);if(K){if(!X)X=Object.assign({},Q.props);let q=K[1],W=K[0];if(W.combine&&W.id in X)q=W.combine(X[W.id],q);X[W.id]=q}}J.push(X?new T0(Q.name,X,Q.id,Q.flags):Q)}return new LJ(J)}}var RJ=new WeakMap,PV=new WeakMap,d1;(function(Z){Z[Z.ExcludeBuffers=1]="ExcludeBuffers",Z[Z.IncludeAnonymous=2]="IncludeAnonymous",Z[Z.IgnoreMounts=4]="IgnoreMounts",Z[Z.IgnoreOverlays=8]="IgnoreOverlays",Z[Z.EnterBracketed=16]="EnterBracketed"})(d1||(d1={}));class h1{constructor(Z,J,Q,X,Y){if(this.type=Z,this.children=J,this.positions=Q,this.length=X,this.props=null,Y&&Y.length){this.props=Object.create(null);for(let[K,q]of Y)this.props[typeof K=="number"?K:K.id]=q}}toString(){let Z=x7.get(this);if(Z&&!Z.overlay)return Z.tree.toString();let J="";for(let Q of this.children){let X=Q.toString();if(X){if(J)J+=",";J+=X}}return!this.type.name?J:(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(J.length?"("+J+")":"")}cursor(Z=0){return new AJ(this.topNode,Z)}cursorAt(Z,J=0,Q=0){let X=RJ.get(this)||this.topNode,Y=new AJ(X);return Y.moveTo(Z,J),RJ.set(this,Y._tree),Y}get topNode(){return new X6(this,0,0,null)}resolve(Z,J=0){let Q=q5(RJ.get(this)||this.topNode,Z,J,!1);return RJ.set(this,Q),Q}resolveInner(Z,J=0){let Q=q5(PV.get(this)||this.topNode,Z,J,!0);return PV.set(this,Q),Q}resolveStack(Z,J=0){return KA(this,Z,J)}iterate(Z){let{enter:J,leave:Q,from:X=0,to:Y=this.length}=Z,K=Z.mode||0,q=(K&d1.IncludeAnonymous)>0;for(let W=this.cursor(K|d1.IncludeAnonymous);;){let G=!1;if(W.from<=Y&&W.to>=X&&(!q&&W.type.isAnonymous||J(W)!==!1)){if(W.firstChild())continue;G=!0}for(;;){if(G&&Q&&(q||!W.type.isAnonymous))Q(W);if(W.nextSibling())break;if(!W.parent())return;G=!0}}}prop(Z){return!Z.perNode?this.type.prop(Z):this.props?this.props[Z.id]:void 0}get propValues(){let Z=[];if(this.props)for(let J in this.props)Z.push([+J,this.props[J]]);return Z}balance(Z={}){return this.children.length<=8?this:T3(T0.none,this.children,this.positions,0,this.children.length,0,this.length,(J,Q,X)=>new h1(this.type,J,Q,X,this.propValues),Z.makeTree||((J,Q,X)=>new h1(T0.none,J,Q,X)))}static build(Z){return qA(Z)}}h1.empty=new h1(T0.none,[],[],0);class L3{constructor(Z,J){this.buffer=Z,this.index=J}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new L3(this.buffer,this.index)}}class i8{constructor(Z,J,Q){this.buffer=Z,this.length=J,this.set=Q}get type(){return T0.none}toString(){let Z=[];for(let J=0;J<this.buffer.length;)Z.push(this.childString(J)),J=this.buffer[J+3];return Z.join(",")}childString(Z){let J=this.buffer[Z],Q=this.buffer[Z+3],X=this.set.types[J],Y=X.name;if(/\W/.test(Y)&&!X.isError)Y=JSON.stringify(Y);if(Z+=4,Q==Z)return Y;let K=[];while(Z<Q)K.push(this.childString(Z)),Z=this.buffer[Z+3];return Y+"("+K.join(",")+")"}findChild(Z,J,Q,X,Y){let{buffer:K}=this,q=-1;for(let W=Z;W!=J;W=K[W+3])if(EV(Y,X,K[W+1],K[W+2])){if(q=W,Q>0)break}return q}slice(Z,J,Q){let X=this.buffer,Y=new Uint16Array(J-Z),K=0;for(let q=Z,W=0;q<J;){Y[W++]=X[q++],Y[W++]=X[q++]-Q;let G=Y[W++]=X[q++]-Q;Y[W++]=X[q++]-Z,K=Math.max(K,G)}return new i8(Y,K,this.set)}}function EV(Z,J,Q,X){switch(Z){case-2:return Q<J;case-1:return X>=J&&Q<J;case 0:return Q<J&&X>J;case 1:return Q<=J&&X>J;case 2:return X>J;case 4:return!0}}function q5(Z,J,Q,X){var Y;while(Z.from==Z.to||(Q<1?Z.from>=J:Z.from>J)||(Q>-1?Z.to<=J:Z.to<J)){let q=!X&&Z instanceof X6&&Z.index<0?null:Z.parent;if(!q)return Z;Z=q}let K=X?0:d1.IgnoreOverlays;if(X){for(let q=Z,W=q.parent;W;q=W,W=q.parent)if(q instanceof X6&&q.index<0&&((Y=W.enter(J,Q,K))===null||Y===void 0?void 0:Y.from)!=q.from)Z=W}for(;;){let q=Z.enter(J,Q,K);if(!q)return Z;Z=q}}class B3{cursor(Z=0){return new AJ(this,Z)}getChild(Z,J=null,Q=null){let X=TV(this,Z,J,Q);return X.length?X[0]:null}getChildren(Z,J=null,Q=null){return TV(this,Z,J,Q)}resolve(Z,J=0){return q5(this,Z,J,!1)}resolveInner(Z,J=0){return q5(this,Z,J,!0)}matchContext(Z){return A3(this.parent,Z)}enterUnfinishedNodesBefore(Z){let J=this.childBefore(Z),Q=this;while(J){let X=J.lastChild;if(!X||X.to!=J.to)break;if(X.type.isError&&X.from==X.to)Q=J,J=X.prevSibling;else J=X}return Q}get node(){return this}get next(){return this.parent}}class X6 extends B3{constructor(Z,J,Q,X){super();this._tree=Z,this.from=J,this.index=Q,this._parent=X}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(Z,J,Q,X,Y=0){for(let K=this;;){for(let{children:q,positions:W}=K._tree,G=J>0?q.length:-1;Z!=G;Z+=J){let U=q[Z],z=W[Z]+K.from,I;if(!(Y&d1.EnterBracketed&&U instanceof h1&&(I=x7.get(U))&&!I.overlay&&I.bracketed&&Q>=z&&Q<=z+U.length)&&!EV(X,Q,z,z+U.length))continue;if(U instanceof i8){if(Y&d1.ExcludeBuffers)continue;let V=U.findChild(0,U.buffer.length,J,Q-z,X);if(V>-1)return new s8(new CV(K,U,Z,z),null,V)}else if(Y&d1.IncludeAnonymous||(!U.type.isAnonymous||P3(U))){let V;if(!(Y&d1.IgnoreMounts)&&(V=x7.get(U))&&!V.overlay)return new X6(V.tree,z,Z,K);let O=new X6(U,z,Z,K);return Y&d1.IncludeAnonymous||!O.type.isAnonymous?O:O.nextChild(J<0?U.children.length-1:0,J,Q,X,Y)}}if(Y&d1.IncludeAnonymous||!K.type.isAnonymous)return null;if(K.index>=0)Z=K.index+J;else Z=J<0?-1:K._parent._tree.children.length;if(K=K._parent,!K)return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(Z){return this.nextChild(0,1,Z,2)}childBefore(Z){return this.nextChild(this._tree.children.length-1,-1,Z,-2)}prop(Z){return this._tree.prop(Z)}enter(Z,J,Q=0){let X;if(!(Q&d1.IgnoreOverlays)&&(X=x7.get(this._tree))&&X.overlay){let Y=Z-this.from,K=Q&d1.EnterBracketed&&X.bracketed;for(let{from:q,to:W}of X.overlay)if((J>0||K?q<=Y:q<Y)&&(J<0||K?W>=Y:W>Y))return new X6(X.tree,X.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,Z,J,Q)}nextSignificantParent(){let Z=this;while(Z.type.isAnonymous&&Z._parent)Z=Z._parent;return Z}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function TV(Z,J,Q,X){let Y=Z.cursor(),K=[];if(!Y.firstChild())return K;if(Q!=null){for(let q=!1;!q;)if(q=Y.type.is(Q),!Y.nextSibling())return K}for(;;){if(X!=null&&Y.type.is(X))return K;if(Y.type.is(J))K.push(Y.node);if(!Y.nextSibling())return X==null?K:[]}}function A3(Z,J,Q=J.length-1){for(let X=Z;Q>=0;X=X.parent){if(!X)return!1;if(!X.type.isAnonymous){if(J[Q]&&J[Q]!=X.name)return!1;Q--}}return!0}class CV{constructor(Z,J,Q,X){this.parent=Z,this.buffer=J,this.index=Q,this.start=X}}class s8 extends B3{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(Z,J,Q){super();this.context=Z,this._parent=J,this.index=Q,this.type=Z.buffer.set.types[Z.buffer.buffer[Q]]}child(Z,J,Q){let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.context.start,Q);return Y<0?null:new s8(this.context,this,Y)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(Z){return this.child(1,Z,2)}childBefore(Z){return this.child(-1,Z,-2)}prop(Z){return this.type.prop(Z)}enter(Z,J,Q=0){if(Q&d1.ExcludeBuffers)return null;let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],J>0?1:-1,Z-this.context.start,J);return Y<0?null:new s8(this.context,this,Y)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(Z){return this._parent?null:this.context.parent.nextChild(this.context.index+Z,Z,0,4)}get nextSibling(){let{buffer:Z}=this.context,J=Z.buffer[this.index+3];if(J<(this._parent?Z.buffer[this._parent.index+3]:Z.buffer.length))return new s8(this.context,this._parent,J);return this.externalSibling(1)}get prevSibling(){let{buffer:Z}=this.context,J=this._parent?this._parent.index+4:0;if(this.index==J)return this.externalSibling(-1);return new s8(this.context,this._parent,Z.findChild(J,this.index,-1,0,4))}get tree(){return null}toTree(){let Z=[],J=[],{buffer:Q}=this.context,X=this.index+4,Y=Q.buffer[this.index+3];if(Y>X){let K=Q.buffer[this.index+1];Z.push(Q.slice(X,Y,K)),J.push(0)}return new h1(this.type,Z,J,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function _V(Z){if(!Z.length)return null;let J=0,Q=Z[0];for(let K=1;K<Z.length;K++){let q=Z[K];if(q.from>Q.from||q.to<Q.to)Q=q,J=K}let X=Q instanceof X6&&Q.index<0?null:Q.parent,Y=Z.slice();if(X)Y[J]=X;else Y.splice(J,1);return new kV(Y,Q)}class kV{constructor(Z,J){this.heads=Z,this.node=J}get next(){return _V(this.heads)}}function KA(Z,J,Q){let X=Z.resolveInner(J,Q),Y=null;for(let K=X instanceof X6?X:X.context.parent;K;K=K.parent)if(K.index<0){let q=K.parent;(Y||(Y=[X])).push(q.resolve(J,Q)),K=q}else{let q=x7.get(K.tree);if(q&&q.overlay&&q.overlay[0].from<=J&&q.overlay[q.overlay.length-1].to>=J){let W=new X6(q.tree,q.overlay[0].from+K.from,-1,K);(Y||(Y=[X])).push(q5(W,J,Q,!1))}}return Y?_V(Y):X}class AJ{get name(){return this.type.name}constructor(Z,J=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=J&~d1.EnterBracketed,Z instanceof X6)this.yieldNode(Z);else{this._tree=Z.context.parent,this.buffer=Z.context;for(let Q=Z._parent;Q;Q=Q._parent)this.stack.unshift(Q.index);this.bufferNode=Z,this.yieldBuf(Z.index)}}yieldNode(Z){if(!Z)return!1;return this._tree=Z,this.type=Z.type,this.from=Z.from,this.to=Z.to,!0}yieldBuf(Z,J){this.index=Z;let{start:Q,buffer:X}=this.buffer;return this.type=J||X.set.types[X.buffer[Z]],this.from=Q+X.buffer[Z+1],this.to=Q+X.buffer[Z+2],!0}yield(Z){if(!Z)return!1;if(Z instanceof X6)return this.buffer=null,this.yieldNode(Z);return this.buffer=Z.context,this.yieldBuf(Z.index,Z.type)}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(Z,J,Q){if(!this.buffer)return this.yield(this._tree.nextChild(Z<0?this._tree._tree.children.length-1:0,Z,J,Q,this.mode));let{buffer:X}=this.buffer,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.buffer.start,Q);if(Y<0)return!1;return this.stack.push(this.index),this.yieldBuf(Y)}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(Z){return this.enterChild(1,Z,2)}childBefore(Z){return this.enterChild(-1,Z,-2)}enter(Z,J,Q=this.mode){if(!this.buffer)return this.yield(this._tree.enter(Z,J,Q));return Q&d1.ExcludeBuffers?!1:this.enterChild(1,Z,J)}parent(){if(!this.buffer)return this.yieldNode(this.mode&d1.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let Z=this.mode&d1.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(Z)}sibling(Z){if(!this.buffer)return!this._tree._parent?!1:this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+Z,Z,0,4,this.mode));let{buffer:J}=this.buffer,Q=this.stack.length-1;if(Z<0){let X=Q<0?0:this.stack[Q]+4;if(this.index!=X)return this.yieldBuf(J.findChild(X,this.index,-1,0,4))}else{let X=J.buffer[this.index+3];if(X<(Q<0?J.buffer.length:J.buffer[this.stack[Q]+3]))return this.yieldBuf(X)}return Q<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+Z,Z,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(Z){let J,Q,{buffer:X}=this;if(X){if(Z>0){if(this.index<X.buffer.buffer.length)return!1}else for(let Y=0;Y<this.index;Y++)if(X.buffer.buffer[Y+3]<this.index)return!1;({index:J,parent:Q}=X)}else({index:J,_parent:Q}=this._tree);for(;Q;{index:J,_parent:Q}=Q)if(J>-1)for(let Y=J+Z,K=Z<0?-1:Q._tree.children.length;Y!=K;Y+=Z){let q=Q._tree.children[Y];if(this.mode&d1.IncludeAnonymous||q instanceof i8||!q.type.isAnonymous||P3(q))return!1}return!0}move(Z,J){if(J&&this.enterChild(Z,0,4))return!0;for(;;){if(this.sibling(Z))return!0;if(this.atLastNode(Z)||!this.parent())return!1}}next(Z=!0){return this.move(1,Z)}prev(Z=!0){return this.move(-1,Z)}moveTo(Z,J=0){while(this.from==this.to||(J<1?this.from>=Z:this.from>Z)||(J>-1?this.to<=Z:this.to<Z))if(!this.parent())break;while(this.enterChild(1,Z,J));return this}get node(){if(!this.buffer)return this._tree;let Z=this.bufferNode,J=null,Q=0;if(Z&&Z.context==this.buffer)Z:for(let X=this.index,Y=this.stack.length;Y>=0;){for(let K=Z;K;K=K._parent)if(K.index==X){if(X==this.index)return K;J=K,Q=Y+1;break Z}X=this.stack[--Y]}for(let X=Q;X<this.stack.length;X++)J=new s8(this.buffer,J,this.stack[X]);return this.bufferNode=new s8(this.buffer,J,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(Z,J){for(let Q=0;;){let X=!1;if(this.type.isAnonymous||Z(this)!==!1){if(this.firstChild()){Q++;continue}if(!this.type.isAnonymous)X=!0}for(;;){if(X&&J)J(this);if(X=this.type.isAnonymous,!Q)return;if(this.nextSibling())break;this.parent(),Q--,X=!0}}}matchContext(Z){if(!this.buffer)return A3(this.node.parent,Z);let{buffer:J}=this.buffer,{types:Q}=J.set;for(let X=Z.length-1,Y=this.stack.length-1;X>=0;Y--){if(Y<0)return A3(this._tree,Z,X);let K=Q[J.buffer[this.stack[Y]]];if(!K.isAnonymous){if(Z[X]&&Z[X]!=K.name)return!1;X--}}return!0}}function P3(Z){return Z.children.some((J)=>J instanceof i8||!J.type.isAnonymous||P3(J))}function qA(Z){var J;let{buffer:Q,nodeSet:X,maxBufferLength:Y=1024,reused:K=[],minRepeatType:q=X.types.length}=Z,W=Array.isArray(Q)?new L3(Q,Q.length):Q,G=X.types,U=0,z=0;function I(A,B,L,E,D,l){let{id:$,start:m,end:q1,size:o}=W,t=z,Y1=U;if(o<0)if(W.next(),o==-1){let b=K[$];L.push(b),E.push(m-A);return}else if(o==-3){U=$;return}else if(o==-4){z=$;return}else throw RangeError(`Unrecognized record size: ${o}`);let W1=G[$],e,a,h=m-A;if(q1-m<=Y&&(a=R(W.pos-B,D))){let b=new Uint16Array(a.size-a.skip),c=W.pos-a.size,Z1=b.length;while(W.pos>c)Z1=P(a.start,b,Z1);e=new i8(b,q1-a.start,X),h=a.start-A}else{let b=W.pos-o;W.next();let c=[],Z1=[],f1=$>=q?$:-1,z1=0,P1=q1;while(W.pos>b)if(f1>=0&&W.id==f1&&W.size>=0){if(W.end<=P1-Y)F(c,Z1,m,z1,W.end,P1,f1,t,Y1),z1=c.length,P1=W.end;W.next()}else if(l>2500)V(m,b,c,Z1);else I(m,b,c,Z1,f1,l+1);if(f1>=0&&z1>0&&z1<c.length)F(c,Z1,m,z1,m,P1,f1,t,Y1);if(c.reverse(),Z1.reverse(),f1>-1&&z1>0){let J0=O(W1,Y1);e=T3(W1,c,Z1,0,c.length,0,q1-m,J0,J0)}else e=N(W1,c,Z1,q1-m,t-q1,Y1)}L.push(e),E.push(h)}function V(A,B,L,E){let D=[],l=0,$=-1;while(W.pos>B){let{id:m,start:q1,end:o,size:t}=W;if(t>4)W.next();else if($>-1&&q1<$)break;else{if($<0)$=o-Y;D.push(m,q1,o),l++,W.next()}}if(l){let m=new Uint16Array(l*4),q1=D[D.length-2];for(let o=D.length-3,t=0;o>=0;o-=3)m[t++]=D[o],m[t++]=D[o+1]-q1,m[t++]=D[o+2]-q1,m[t++]=t;L.push(new i8(m,D[2]-q1,X)),E.push(q1-A)}}function O(A,B){return(L,E,D)=>{let l=0,$=L.length-1,m,q1;if($>=0&&(m=L[$])instanceof h1){if(!$&&m.type==A&&m.length==D)return m;if(q1=m.prop(I1.lookAhead))l=E[$]+m.length+q1}return N(A,L,E,D,l,B)}}function F(A,B,L,E,D,l,$,m,q1){let o=[],t=[];while(A.length>E)o.push(A.pop()),t.push(B.pop()+L-D);A.push(N(X.types[$],o,t,l-D,m-l,q1)),B.push(D-L)}function N(A,B,L,E,D,l,$){if(l){let m=[I1.contextHash,l];$=$?[m].concat($):[m]}if(D>25){let m=[I1.lookAhead,D];$=$?[m].concat($):[m]}return new h1(A,B,L,E,$)}function R(A,B){let L=W.fork(),E=0,D=0,l=0,$=L.end-Y,m={size:0,start:0,skip:0};Z:for(let q1=L.pos-A;L.pos>q1;){let o=L.size;if(L.id==B&&o>=0){m.size=E,m.start=D,m.skip=l,l+=4,E+=4,L.next();continue}let t=L.pos-o;if(o<0||t<q1||L.start<$)break;let Y1=L.id>=q?4:0,W1=L.start;L.next();while(L.pos>t){if(L.size<0)if(L.size==-3||L.size==-4)Y1+=4;else break Z;else if(L.id>=q)Y1+=4;L.next()}D=W1,E+=o,l+=Y1}if(B<0||E==A)m.size=E,m.start=D,m.skip=l;return m.size>4?m:void 0}function P(A,B,L){let{id:E,start:D,end:l,size:$}=W;if(W.next(),$>=0&&E<q){let m=L;if($>4){let q1=W.pos-($-4);while(W.pos>q1)L=P(A,B,L)}B[--L]=m,B[--L]=l-A,B[--L]=D-A,B[--L]=E}else if($==-3)U=E;else if($==-4)z=E;return L}let T=[],C=[];while(W.pos>0)I(Z.start||0,Z.bufferStart||0,T,C,-1,0);let _=(J=Z.length)!==null&&J!==void 0?J:T.length?C[0]+T[0].length:0;return new h1(G[Z.topID],T.reverse(),C.reverse(),_)}var SV=new WeakMap;function MJ(Z,J){if(!Z.isAnonymous||J instanceof i8||J.type!=Z)return 1;let Q=SV.get(J);if(Q==null){Q=1;for(let X of J.children){if(X.type!=Z||!(X instanceof h1)){Q=1;break}Q+=MJ(Z,X)}SV.set(J,Q)}return Q}function T3(Z,J,Q,X,Y,K,q,W,G){let U=0;for(let F=X;F<Y;F++)U+=MJ(Z,J[F]);let z=Math.ceil(U*1.5/8),I=[],V=[];function O(F,N,R,P,T){for(let C=R;C<P;){let _=C,A=N[C],B=MJ(Z,F[C]);C++;for(;C<P;C++){let L=MJ(Z,F[C]);if(B+L>=z)break;B+=L}if(C==_+1){if(B>z){let L=F[_];O(L.children,L.positions,0,L.children.length,N[_]+T);continue}I.push(F[_])}else{let L=N[C-1]+F[C-1].length-A;I.push(T3(Z,F,N,_,C,A,L,null,G))}V.push(A+T-K)}}return O(J,Q,X,Y,0),(W||G)(I,V,q)}class r8{constructor(Z,J,Q,X,Y=!1,K=!1){this.from=Z,this.to=J,this.tree=Q,this.offset=X,this.open=(Y?1:0)|(K?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(Z,J=[],Q=!1){let X=[new r8(0,Z.length,Z,0,!1,Q)];for(let Y of J)if(Y.to>Z.length)X.push(Y);return X}static applyChanges(Z,J,Q=128){if(!J.length)return Z;let X=[],Y=1,K=Z.length?Z[0]:null;for(let q=0,W=0,G=0;;q++){let U=q<J.length?J[q]:null,z=U?U.fromA:1e9;if(z-W>=Q)while(K&&K.from<z){let I=K;if(W>=I.from||z<=I.to||G){let V=Math.max(I.from,W)-G,O=Math.min(I.to,z)-G;I=V>=O?null:new r8(V,O,I.tree,I.offset+G,q>0,!!U)}if(I)X.push(I);if(K.to>z)break;K=Y<Z.length?Z[Y++]:null}if(!U)break;W=U.toA,G=U.toA-U.toB}return X}}class BJ{startParse(Z,J,Q){if(typeof Z=="string")Z=new xV(Z);return Q=!Q?[new DJ(0,Z.length)]:Q.length?Q.map((X)=>new DJ(X.from,X.to)):[new DJ(0,0)],this.createParse(Z,J||[],Q)}parse(Z,J,Q){let X=this.startParse(Z,J,Q);for(;;){let Y=X.advance();if(Y)return Y}}}class xV{constructor(Z){this.string=Z}get length(){return this.string.length}chunk(Z){return this.string.slice(Z)}get lineChunks(){return!1}read(Z,J){return this.string.slice(Z,J)}}var vk=new I1({perNode:!0});var WA=0;class Y6{constructor(Z,J,Q,X){this.name=Z,this.set=J,this.base=Q,this.modified=X,this.id=WA++}toString(){let{name:Z}=this;for(let J of this.modified)if(J.name)Z=`${J.name}(${Z})`;return Z}static define(Z,J){let Q=typeof Z=="string"?Z:"?";if(Z instanceof Y6)J=Z;if(J===null||J===void 0?void 0:J.base)throw Error("Can not derive from a modified tag");let X=new Y6(Q,[],null,[]);if(X.set.push(X),J)for(let Y of J.set)X.set.push(Y);return X}static defineModifier(Z){let J=new EJ(Z);return(Q)=>{if(Q.modified.indexOf(J)>-1)return Q;return EJ.get(Q.base||Q,Q.modified.concat(J).sort((X,Y)=>X.id-Y.id))}}}var GA=0;class EJ{constructor(Z){this.name=Z,this.instances=[],this.id=GA++}static get(Z,J){if(!J.length)return Z;let Q=J[0].instances.find((q)=>q.base==Z&&UA(J,q.modified));if(Q)return Q;let X=[],Y=new Y6(Z.name,X,Z,J);for(let q of J)q.instances.push(Y);let K=zA(J);for(let q of Z.set)if(!q.modified.length)for(let W of K)X.push(EJ.get(q,W));return Y}}function UA(Z,J){return Z.length==J.length&&Z.every((Q,X)=>Q==J[X])}function zA(Z){let J=[[]];for(let Q=0;Q<Z.length;Q++)for(let X=0,Y=J.length;X<Y;X++)J.push(J[X].concat(Z[Q]));return J.sort((Q,X)=>X.length-Q.length)}function yV(Z){let J=Object.create(null);for(let Q in Z){let X=Z[Q];if(!Array.isArray(X))X=[X];for(let Y of Q.split(" "))if(Y){let K=[],q=2,W=Y;for(let I=0;;){if(W=="..."&&I>0&&I+3==Y.length){q=1;break}let V=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(W);if(!V)throw RangeError("Invalid path: "+Y);if(K.push(V[0]=="*"?"":V[0][0]=='"'?JSON.parse(V[0]):V[0]),I+=V[0].length,I==Y.length)break;let O=Y[I++];if(I==Y.length&&O=="!"){q=0;break}if(O!="/")throw RangeError("Invalid path: "+Y);W=Y.slice(I)}let G=K.length-1,U=K[G];if(!U)throw RangeError("Invalid path: "+Y);let z=new w7(X,q,G>0?K.slice(0,G):null);J[U]=z.sort(J[U])}}return $V.add(J)}var $V=new I1({combine(Z,J){let Q,X,Y;while(Z||J){if(!Z||J&&Z.depth>=J.depth)Y=J,J=J.next;else Y=Z,Z=Z.next;if(Q&&Q.mode==Y.mode&&!Y.context&&!Q.context)continue;let K=new w7(Y.tags,Y.mode,Y.context);if(Q)Q.next=K;else X=K;Q=K}return X}});class w7{constructor(Z,J,Q,X){this.tags=Z,this.mode=J,this.context=Q,this.next=X}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(Z){if(!Z||Z.depth<this.depth)return this.next=Z,this;return Z.next=this.sort(Z.next),Z}get depth(){return this.context?this.context.length:0}}w7.empty=new w7([],2,null);function C3(Z,J){let Q=Object.create(null);for(let K of Z)if(!Array.isArray(K.tag))Q[K.tag.id]=K.class;else for(let q of K.tag)Q[q.id]=K.class;let{scope:X,all:Y=null}=J||{};return{style:(K)=>{let q=Y;for(let W of K)for(let G of W.set){let U=Q[G.id];if(U){q=q?q+" "+U:U;break}}return q},scope:X}}function IA(Z,J){let Q=null;for(let X of Z){let Y=X.style(J);if(Y)Q=Q?Q+" "+Y:Y}return Q}function hV(Z,J,Q,X=0,Y=Z.length){let K=new fV(X,Array.isArray(J)?J:[J],Q);K.highlightRange(Z.cursor(),X,Y,"",K.highlighters),K.flush(Y)}class fV{constructor(Z,J,Q){this.at=Z,this.highlighters=J,this.span=Q,this.class=""}startSpan(Z,J){if(J!=this.class){if(this.flush(Z),Z>this.at)this.at=Z;this.class=J}}flush(Z){if(Z>this.at&&this.class)this.span(this.at,Z,this.class)}highlightRange(Z,J,Q,X,Y){let{type:K,from:q,to:W}=Z;if(q>=Q||W<=J)return;if(K.isTop)Y=this.highlighters.filter((V)=>!V.scope||V.scope(K));let G=X,U=VA(Z)||w7.empty,z=IA(Y,U.tags);if(z){if(G)G+=" ";if(G+=z,U.mode==1)X+=(X?" ":"")+z}if(this.startSpan(Math.max(J,q),G),U.opaque)return;let I=Z.tree&&Z.tree.prop(I1.mounted);if(I&&I.overlay){let V=Z.node.enter(I.overlay[0].from+q,1),O=this.highlighters.filter((N)=>!N.scope||N.scope(I.tree.type)),F=Z.firstChild();for(let N=0,R=q;;N++){let P=N<I.overlay.length?I.overlay[N]:null,T=P?P.from+q:W,C=Math.max(J,R),_=Math.min(Q,T);if(C<_&&F){while(Z.from<_)if(this.highlightRange(Z,C,_,X,Y),this.startSpan(Math.min(_,Z.to),G),Z.to>=T||!Z.nextSibling())break}if(!P||T>Q)break;if(R=P.to+q,R>J)this.highlightRange(V.cursor(),Math.max(J,P.from+q),Math.min(Q,R),"",O),this.startSpan(Math.min(Q,R),G)}if(F)Z.parent()}else if(Z.firstChild()){if(I)X="";do{if(Z.to<=J)continue;if(Z.from>=Q)break;this.highlightRange(Z,J,Q,X,Y),this.startSpan(Math.min(Q,Z.to),G)}while(Z.nextSibling());Z.parent()}}}function VA(Z){let J=Z.type.prop($V);while(J&&J.context&&!Z.matchContext(J.context))J=J.next;return J||null}var n=Y6.define,PJ=n(),a8=n(),wV=n(a8),bV=n(a8),o8=n(),TJ=n(o8),S3=n(o8),o6=n(),f9=n(o6),r6=n(),a6=n(),E3=n(),W5=n(E3),SJ=n(),g={comment:PJ,lineComment:n(PJ),blockComment:n(PJ),docComment:n(PJ),name:a8,variableName:n(a8),typeName:wV,tagName:n(wV),propertyName:bV,attributeName:n(bV),className:n(a8),labelName:n(a8),namespace:n(a8),macroName:n(a8),literal:o8,string:TJ,docString:n(TJ),character:n(TJ),attributeValue:n(TJ),number:S3,integer:n(S3),float:n(S3),bool:n(o8),regexp:n(o8),escape:n(o8),color:n(o8),url:n(o8),keyword:r6,self:n(r6),null:n(r6),atom:n(r6),unit:n(r6),modifier:n(r6),operatorKeyword:n(r6),controlKeyword:n(r6),definitionKeyword:n(r6),moduleKeyword:n(r6),operator:a6,derefOperator:n(a6),arithmeticOperator:n(a6),logicOperator:n(a6),bitwiseOperator:n(a6),compareOperator:n(a6),updateOperator:n(a6),definitionOperator:n(a6),typeOperator:n(a6),controlOperator:n(a6),punctuation:E3,separator:n(E3),bracket:W5,angleBracket:n(W5),squareBracket:n(W5),paren:n(W5),brace:n(W5),content:o6,heading:f9,heading1:n(f9),heading2:n(f9),heading3:n(f9),heading4:n(f9),heading5:n(f9),heading6:n(f9),contentSeparator:n(o6),list:n(o6),quote:n(o6),emphasis:n(o6),strong:n(o6),link:n(o6),monospace:n(o6),strikethrough:n(o6),inserted:n(),deleted:n(),changed:n(),invalid:n(),meta:SJ,documentMeta:n(SJ),annotation:n(SJ),processingInstruction:n(SJ),definition:Y6.defineModifier("definition"),constant:Y6.defineModifier("constant"),function:Y6.defineModifier("function"),standard:Y6.defineModifier("standard"),local:Y6.defineModifier("local"),special:Y6.defineModifier("special")};for(let Z in g){let J=g[Z];if(J instanceof Y6)J.name=Z}var ck=C3([{tag:g.link,class:"tok-link"},{tag:g.heading,class:"tok-heading"},{tag:g.emphasis,class:"tok-emphasis"},{tag:g.strong,class:"tok-strong"},{tag:g.keyword,class:"tok-keyword"},{tag:g.atom,class:"tok-atom"},{tag:g.bool,class:"tok-bool"},{tag:g.url,class:"tok-url"},{tag:g.labelName,class:"tok-labelName"},{tag:g.inserted,class:"tok-inserted"},{tag:g.deleted,class:"tok-deleted"},{tag:g.literal,class:"tok-literal"},{tag:g.string,class:"tok-string"},{tag:g.number,class:"tok-number"},{tag:[g.regexp,g.escape,g.special(g.string)],class:"tok-string2"},{tag:g.variableName,class:"tok-variableName"},{tag:g.local(g.variableName),class:"tok-variableName tok-local"},{tag:g.definition(g.variableName),class:"tok-variableName tok-definition"},{tag:g.special(g.variableName),class:"tok-variableName2"},{tag:g.definition(g.propertyName),class:"tok-propertyName tok-definition"},{tag:g.typeName,class:"tok-typeName"},{tag:g.namespace,class:"tok-namespace"},{tag:g.className,class:"tok-className"},{tag:g.macroName,class:"tok-macroName"},{tag:g.propertyName,class:"tok-propertyName"},{tag:g.operator,class:"tok-operator"},{tag:g.comment,class:"tok-comment"},{tag:g.meta,class:"tok-meta"},{tag:g.invalid,class:"tok-invalid"},{tag:g.punctuation,class:"tok-punctuation"}]);var _3,b7=new I1;function HA(Z){return r.define({combine:Z?(J)=>J.concat(Z):void 0})}var OA=new I1;class K6{constructor(Z,J,Q=[],X=""){if(this.data=Z,this.name=X,!R1.prototype.hasOwnProperty("tree"))Object.defineProperty(R1.prototype,"tree",{get(){return C6(this)}});this.parser=J,this.extension=[h7.of(this),R1.languageData.of((Y,K,q)=>{let W=gV(Y,K,q),G=W.type.prop(b7);if(!G)return[];let U=Y.facet(G),z=W.type.prop(OA);if(z){let I=W.resolve(K-W.from,q);for(let V of z)if(V.test(I,Y)){let O=Y.facet(V.facet);return V.type=="replace"?O:O.concat(U)}}return U})].concat(Q)}isActiveAt(Z,J,Q=-1){return gV(Z,J,Q).type.prop(b7)==this.data}findRegions(Z){let J=Z.facet(h7);if((J===null||J===void 0?void 0:J.data)==this.data)return[{from:0,to:Z.doc.length}];if(!J||!J.allowsNesting)return[];let Q=[],X=(Y,K)=>{if(Y.prop(b7)==this.data){Q.push({from:K,to:K+Y.length});return}let q=Y.prop(I1.mounted);if(q){if(q.tree.prop(b7)==this.data){if(q.overlay)for(let W of q.overlay)Q.push({from:W.from+K,to:W.to+K});else Q.push({from:K,to:K+Y.length});return}else if(q.overlay){let W=Q.length;if(X(q.tree,q.overlay[0].from+K),Q.length>W)return}}for(let W=0;W<Y.children.length;W++){let G=Y.children[W];if(G instanceof h1)X(G,Y.positions[W]+K)}};return X(C6(Z),0),Q}get allowsNesting(){return!0}}K6.setState=D1.define();function gV(Z,J,Q){let X=Z.facet(h7),Y=C6(Z).topNode;if(!X||X.allowsNesting){for(let K=Y;K;K=K.enter(J,Q,d1.ExcludeBuffers|d1.EnterBracketed))if(K.type.isTop)Y=K}return Y}function C6(Z){let J=Z.field(K6.state,!1);return J?J.tree:h1.empty}class nV{constructor(Z){this.doc=Z,this.cursorPos=0,this.string="",this.cursor=Z.iter()}get length(){return this.doc.length}syncTo(Z){return this.string=this.cursor.next(Z-this.cursorPos).value,this.cursorPos=Z+this.string.length,this.cursorPos-this.string.length}chunk(Z){return this.syncTo(Z),this.string}get lineChunks(){return!0}read(Z,J){let Q=this.cursorPos-this.string.length;if(Z<Q||J>=this.cursorPos)return this.doc.sliceString(Z,J);else return this.string.slice(Z-Q,J-Q)}}var G5=null;class y7{constructor(Z,J,Q=[],X,Y,K,q,W){this.parser=Z,this.state=J,this.fragments=Q,this.tree=X,this.treeLen=Y,this.viewport=K,this.skipped=q,this.scheduleOn=W,this.parse=null,this.tempSkipped=[]}static create(Z,J,Q){return new y7(Z,J,[],h1.empty,0,Q,[],null)}startParse(){return this.parser.startParse(new nV(this.state.doc),this.fragments)}work(Z,J){if(J!=null&&J>=this.state.doc.length)J=void 0;if(this.tree!=h1.empty&&this.isDone(J!==null&&J!==void 0?J:this.state.doc.length))return this.takeTree(),!0;return this.withContext(()=>{var Q;if(typeof Z=="number"){let X=Date.now()+Z;Z=()=>Date.now()>X}if(!this.parse)this.parse=this.startParse();if(J!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>J)&&J<this.state.doc.length)this.parse.stopAt(J);for(;;){let X=this.parse.advance();if(X)if(this.fragments=this.withoutTempSkipped(r8.addTree(X,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(Q=this.parse.stoppedAt)!==null&&Q!==void 0?Q:this.state.doc.length,this.tree=X,this.parse=null,this.treeLen<(J!==null&&J!==void 0?J:this.state.doc.length))this.parse=this.startParse();else return!0;if(Z())return!1}})}takeTree(){let Z,J;if(this.parse&&(Z=this.parse.parsedPos)>=this.treeLen){if(this.parse.stoppedAt==null||this.parse.stoppedAt>Z)this.parse.stopAt(Z);this.withContext(()=>{while(!(J=this.parse.advance()));}),this.treeLen=Z,this.tree=J,this.fragments=this.withoutTempSkipped(r8.addTree(this.tree,this.fragments,!0)),this.parse=null}}withContext(Z){let J=G5;G5=this;try{return Z()}finally{G5=J}}withoutTempSkipped(Z){for(let J;J=this.tempSkipped.pop();)Z=uV(Z,J.from,J.to);return Z}changes(Z,J){let{fragments:Q,tree:X,treeLen:Y,viewport:K,skipped:q}=this;if(this.takeTree(),!Z.empty){let W=[];if(Z.iterChangedRanges((G,U,z,I)=>W.push({fromA:G,toA:U,fromB:z,toB:I})),Q=r8.applyChanges(Q,W),X=h1.empty,Y=0,K={from:Z.mapPos(K.from,-1),to:Z.mapPos(K.to,1)},this.skipped.length){q=[];for(let G of this.skipped){let U=Z.mapPos(G.from,1),z=Z.mapPos(G.to,-1);if(U<z)q.push({from:U,to:z})}}}return new y7(this.parser,J,Q,X,Y,K,q,this.scheduleOn)}updateViewport(Z){if(this.viewport.from==Z.from&&this.viewport.to==Z.to)return!1;this.viewport=Z;let J=this.skipped.length;for(let Q=0;Q<this.skipped.length;Q++){let{from:X,to:Y}=this.skipped[Q];if(X<Z.to&&Y>Z.from)this.fragments=uV(this.fragments,X,Y),this.skipped.splice(Q--,1)}if(this.skipped.length>=J)return!1;return this.reset(),!0}reset(){if(this.parse)this.takeTree(),this.parse=null}skipUntilInView(Z,J){this.skipped.push({from:Z,to:J})}static getSkippingParser(Z){return new class extends BJ{createParse(J,Q,X){let Y=X[0].from,K=X[X.length-1].to;return{parsedPos:Y,advance(){let W=G5;if(W){for(let G of X)W.tempSkipped.push(G);if(Z)W.scheduleOn=W.scheduleOn?Promise.all([W.scheduleOn,Z]):Z}return this.parsedPos=K,new h1(T0.none,[],[],K-Y)},stoppedAt:null,stopAt(){}}}}}isDone(Z){Z=Math.min(Z,this.state.doc.length);let J=this.fragments;return this.treeLen>=Z&&J.length&&J[0].from==0&&J[0].to>=Z}static get(){return G5}}function uV(Z,J,Q){return r8.applyChanges(Z,[{fromA:J,toA:Q,fromB:J,toB:Q}])}class $7{constructor(Z){this.context=Z,this.tree=Z.tree}apply(Z){if(!Z.docChanged&&this.tree==this.context.tree)return this;let J=this.context.changes(Z.changes,Z.state),Q=this.context.treeLen==Z.startState.doc.length?void 0:Math.max(Z.changes.mapPos(this.context.treeLen),J.viewport.to);if(!J.work(20,Q))J.takeTree();return new $7(J)}static init(Z){let J=Math.min(3000,Z.doc.length),Q=y7.create(Z.facet(h7).parser,Z,{from:0,to:J});if(!Q.work(20,J))Q.takeTree();return new $7(Q)}}K6.state=H0.define({create:$7.init,update(Z,J){for(let Q of J.effects)if(Q.is(K6.setState))return Q.value;if(J.startState.facet(h7)!=J.state.facet(h7))return $7.init(J.state);return Z.apply(J)}});var lV=(Z)=>{let J=setTimeout(()=>Z(),500);return()=>clearTimeout(J)};if(typeof requestIdleCallback<"u")lV=(Z)=>{let J=-1,Q=setTimeout(()=>{J=requestIdleCallback(Z,{timeout:400})},100);return()=>J<0?clearTimeout(Q):cancelIdleCallback(J)};var k3=typeof navigator<"u"&&((_3=navigator.scheduling)===null||_3===void 0?void 0:_3.isInputPending)?()=>navigator.scheduling.isInputPending():null,FA=O0.fromClass(class{constructor(J){this.view=J,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(J){let Q=this.view.state.field(K6.state).context;if(Q.updateViewport(J.view.viewport)||this.view.viewport.to>Q.treeLen)this.scheduleWork();if(J.docChanged||J.selectionSet){if(this.view.hasFocus)this.chunkBudget+=50;this.scheduleWork()}this.checkAsyncSchedule(Q)}scheduleWork(){if(this.working)return;let{state:J}=this.view,Q=J.field(K6.state);if(Q.tree!=Q.context.tree||!Q.context.isDone(J.doc.length))this.working=lV(this.work)}work(J){this.working=null;let Q=Date.now();if(this.chunkEnd<Q&&(this.chunkEnd<0||this.view.hasFocus))this.chunkEnd=Q+30000,this.chunkBudget=3000;if(this.chunkBudget<=0)return;let{state:X,viewport:{to:Y}}=this.view,K=X.field(K6.state);if(K.tree==K.context.tree&&K.context.isDone(Y+1e5))return;let q=Date.now()+Math.min(this.chunkBudget,100,J&&!k3?Math.max(25,J.timeRemaining()-5):1e9),W=K.context.treeLen<Y&&X.doc.length>Y+1000,G=K.context.work(()=>{return k3&&k3()||Date.now()>q},Y+(W?0:1e5));if(this.chunkBudget-=Date.now()-Q,G||this.chunkBudget<=0)K.context.takeTree(),this.view.dispatch({effects:K6.setState.of(new $7(K.context))});if(this.chunkBudget>0&&!(G&&!W))this.scheduleWork();this.checkAsyncSchedule(K.context)}checkAsyncSchedule(J){if(J.scheduleOn)this.workScheduled++,J.scheduleOn.then(()=>this.scheduleWork()).catch((Q)=>p0(this.view.state,Q)).then(()=>this.workScheduled--),J.scheduleOn=null}destroy(){if(this.working)this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),h7=r.define({combine(Z){return Z.length?Z[0]:null},enables:(Z)=>[K6.state,FA,X1.contentAttributes.compute([Z],(J)=>{let Q=J.facet(Z);return Q&&Q.name?{"data-language":Q.name}:{}})]});var NA=r.define(),f7=r.define({combine:(Z)=>{if(!Z.length)return"  ";let J=Z[0];if(!J||/\S/.test(J)||Array.from(J).some((Q)=>Q!=J[0]))throw Error("Invalid indent unit: "+JSON.stringify(Z[0]));return J}});function t8(Z){let J=Z.facet(f7);return J.charCodeAt(0)==9?Z.tabSize*J.length:J.length}function z5(Z,J){let Q="",X=Z.tabSize,Y=Z.facet(f7)[0];if(Y=="\t"){while(J>=X)Q+="\t",J-=X;Y=" "}for(let K=0;K<J;K++)Q+=Y;return Q}function h3(Z,J){if(Z instanceof R1)Z=new g7(Z);for(let X of Z.state.facet(NA)){let Y=X(Z,J);if(Y!==void 0)return Y}let Q=C6(Z.state);return Q.length>=J?RA(Z,Q,J):null}class g7{constructor(Z,J={}){this.state=Z,this.options=J,this.unit=t8(Z)}lineAt(Z,J=1){let Q=this.state.doc.lineAt(Z),{simulateBreak:X,simulateDoubleBreak:Y}=this.options;if(X!=null&&X>=Q.from&&X<=Q.to)if(Y&&X==Z)return{text:"",from:Z};else if(J<0?X<Z:X<=Z)return{text:Q.text.slice(X-Q.from),from:X};else return{text:Q.text.slice(0,X-Q.from),from:Q.from};return Q}textAfterPos(Z,J=1){if(this.options.simulateDoubleBreak&&Z==this.options.simulateBreak)return"";let{text:Q,from:X}=this.lineAt(Z,J);return Q.slice(Z-X,Math.min(Q.length,Z+100-X))}column(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.countColumn(Q,Z-X),K=this.options.overrideIndentation?this.options.overrideIndentation(X):-1;if(K>-1)Y+=K-this.countColumn(Q,Q.search(/\S|$/));return Y}countColumn(Z,J=Z.length){return _9(Z,this.state.tabSize,J)}lineIndent(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.options.overrideIndentation;if(Y){let K=Y(X);if(K>-1)return K}return this.countColumn(Q,Q.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}var sV=new I1;function RA(Z,J,Q){let X=J.resolveStack(Q),Y=J.resolveInner(Q,-1).resolve(Q,0).enterUnfinishedNodesBefore(Q);if(Y!=X.node){let K=[];for(let q=Y;q&&!(q.from<X.node.from||q.to>X.node.to||q.from==X.node.from&&q.type==X.node.type);q=q.parent)K.push(q);for(let q=K.length-1;q>=0;q--)X={node:K[q],next:X}}return iV(X,Z,Q)}function iV(Z,J,Q){for(let X=Z;X;X=X.next){let Y=MA(X.node);if(Y)return Y(f3.create(J,Q,X))}return 0}function DA(Z){return Z.pos==Z.options.simulateBreak&&Z.options.simulateDoubleBreak}function MA(Z){let J=Z.type.prop(sV);if(J)return J;let Q=Z.firstChild,X;if(Q&&(X=Q.type.prop(I1.closedBy))){let Y=Z.lastChild,K=Y&&X.indexOf(Y.name)>-1;return(q)=>PA(q,!0,1,void 0,K&&!DA(q)?Y.from:void 0)}return Z.parent==null?AA:null}function AA(){return 0}class f3 extends g7{constructor(Z,J,Q){super(Z.state,Z.options);this.base=Z,this.pos=J,this.context=Q}get node(){return this.context.node}static create(Z,J,Q){return new f3(Z,J,Q)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(Z){let J=this.state.doc.lineAt(Z.from);for(;;){let Q=Z.resolve(J.from);while(Q.parent&&Q.parent.from==Q.from)Q=Q.parent;if(LA(Q,Z))break;J=this.state.doc.lineAt(Q.from)}return this.lineIndent(J.from)}continue(){return iV(this.context.next,this.base,this.pos)}}function LA(Z,J){for(let Q=J;Q;Q=Q.parent)if(Z==Q)return!0;return!1}function BA(Z){let J=Z.node,Q=J.childAfter(J.from),X=J.lastChild;if(!Q)return null;let Y=Z.options.simulateBreak,K=Z.state.doc.lineAt(Q.from),q=Y==null||Y<=K.from?K.to:Math.min(K.to,Y);for(let W=Q.to;;){let G=J.childAfter(W);if(!G||G==X)return null;if(!G.type.isSkipped){if(G.from>=q)return null;let U=/^ */.exec(K.text.slice(Q.to-K.from))[0].length;return{from:Q.from,to:Q.to+U}}W=G.to}}function PA(Z,J,Q,X,Y){let K=Z.textAfter,q=K.match(/^\s*/)[0].length,W=X&&K.slice(q,q+X.length)==X||Y==Z.pos+q,G=J?BA(Z):null;if(G)return W?Z.column(G.from):Z.column(G.to);return Z.baseIndent+(W?0:Z.unit*Q)}class u7{constructor(Z,J){this.specs=Z;let Q;function X(q){let W=A6.newName();return(Q||(Q=Object.create(null)))["."+W]=q,W}let Y=typeof J.all=="string"?J.all:J.all?X(J.all):void 0,K=J.scope;this.scope=K instanceof K6?(q)=>q.prop(b7)==K.data:K?(q)=>q==K:void 0,this.style=C3(Z.map((q)=>({tag:q.tag,class:q.class||X(Object.assign({},q,{tag:null}))})),{all:Y}).style,this.module=Q?new A6(Q):null,this.themeType=J.themeType}static define(Z,J){return new u7(Z,J||{})}}var b3=r.define(),rV=r.define({combine(Z){return Z.length?[Z[0]]:null}});function x3(Z){let J=Z.facet(b3);return J.length?J:Z.facet(rV)}function aV(Z,J){let Q=[TA],X;if(Z instanceof u7){if(Z.module)Q.push(X1.styleModule.of(Z.module));X=Z.themeType}if(J===null||J===void 0?void 0:J.fallback)Q.push(rV.of(Z));else if(X)Q.push(b3.computeN([X1.darkTheme],(Y)=>{return Y.facet(X1.darkTheme)==(X=="dark")?[Z]:[]}));else Q.push(b3.of(Z));return Q}class oV{constructor(Z){this.markCache=Object.create(null),this.tree=C6(Z.state),this.decorations=this.buildDeco(Z,x3(Z.state)),this.decoratedTo=Z.viewport.to}update(Z){let J=C6(Z.state),Q=x3(Z.state),X=Q!=x3(Z.startState),{viewport:Y}=Z.view,K=Z.changes.mapPos(this.decoratedTo,1);if(J.length<Y.to&&!X&&J.type==this.tree.type&&K>=Y.to)this.decorations=this.decorations.map(Z.changes),this.decoratedTo=K;else if(J!=this.tree||Z.viewportChanged||X)this.tree=J,this.decorations=this.buildDeco(Z.view,Q),this.decoratedTo=Y.to}buildDeco(Z,J){if(!J||!this.tree.length)return M1.none;let Q=new F8;for(let{from:X,to:Y}of Z.visibleRanges)hV(this.tree,J,(K,q,W)=>{Q.add(K,q,this.markCache[W]||(this.markCache[W]=M1.mark({class:W})))},X,Y);return Q.finish()}}var TA=N8.high(O0.fromClass(oV,{decorations:(Z)=>Z.decorations})),ak=u7.define([{tag:g.meta,color:"#404740"},{tag:g.link,textDecoration:"underline"},{tag:g.heading,textDecoration:"underline",fontWeight:"bold"},{tag:g.emphasis,fontStyle:"italic"},{tag:g.strong,fontWeight:"bold"},{tag:g.strikethrough,textDecoration:"line-through"},{tag:g.keyword,color:"#708"},{tag:[g.atom,g.bool,g.url,g.contentSeparator,g.labelName],color:"#219"},{tag:[g.literal,g.inserted],color:"#164"},{tag:[g.string,g.deleted],color:"#a11"},{tag:[g.regexp,g.escape,g.special(g.string)],color:"#e40"},{tag:g.definition(g.variableName),color:"#00f"},{tag:g.local(g.variableName),color:"#30a"},{tag:[g.typeName,g.namespace],color:"#085"},{tag:g.className,color:"#167"},{tag:[g.special(g.variableName),g.macroName],color:"#256"},{tag:g.definition(g.propertyName),color:"#00c"},{tag:g.comment,color:"#940"},{tag:g.invalid,color:"#f00"}]),SA=X1.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),tV=1e4,eV="()[]{}",Zj=r.define({combine(Z){return R8(Z,{afterCursor:!0,brackets:eV,maxScanDistance:tV,renderMatch:_A})}}),EA=M1.mark({class:"cm-matchingBracket"}),CA=M1.mark({class:"cm-nonmatchingBracket"});function _A(Z){let J=[],Q=Z.matched?EA:CA;if(J.push(Q.range(Z.start.from,Z.start.to)),Z.end)J.push(Q.range(Z.end.from,Z.end.to));return J}function vV(Z){let J=[],Q=Z.facet(Zj);for(let X of Z.selection.ranges){if(!X.empty)continue;let Y=E6(Z,X.head,-1,Q)||X.head>0&&E6(Z,X.head-1,1,Q)||Q.afterCursor&&(E6(Z,X.head,1,Q)||X.head<Z.doc.length&&E6(Z,X.head+1,-1,Q));if(Y)J=J.concat(Q.renderMatch(Y,Z))}return M1.set(J,!0)}var kA=O0.fromClass(class{constructor(Z){this.paused=!1,this.decorations=vV(Z.state)}update(Z){if(Z.docChanged||Z.selectionSet||this.paused)if(Z.view.composing)this.decorations=this.decorations.map(Z.changes),this.paused=!0;else this.decorations=vV(Z.state),this.paused=!1}},{decorations:(Z)=>Z.decorations}),xA=[kA,SA];function Jj(Z={}){return[Zj.of(Z),xA]}var wA=new I1;function y3(Z,J,Q){let X=Z.prop(J<0?I1.openedBy:I1.closedBy);if(X)return X;if(Z.name.length==1){let Y=Q.indexOf(Z.name);if(Y>-1&&Y%2==(J<0?1:0))return[Q[Y+J]]}return null}function $3(Z){let J=Z.type.prop(wA);return J?J(Z.node):Z}function E6(Z,J,Q,X={}){let Y=X.maxScanDistance||tV,K=X.brackets||eV,q=C6(Z),W=q.resolveInner(J,Q);for(let G=W;G;G=G.parent){let U=y3(G.type,Q,K);if(U&&G.from<G.to){let z=$3(G);if(z&&(Q>0?J>=z.from&&J<z.to:J>z.from&&J<=z.to))return bA(Z,J,Q,G,z,U,K)}}return yA(Z,J,Q,q,W.type,Y,K)}function bA(Z,J,Q,X,Y,K,q){let W=X.parent,G={from:Y.from,to:Y.to},U=0,z=W===null||W===void 0?void 0:W.cursor();if(z&&(Q<0?z.childBefore(X.from):z.childAfter(X.to)))do if(Q<0?z.to<=X.from:z.from>=X.to){if(U==0&&K.indexOf(z.type.name)>-1&&z.from<z.to){let I=$3(z);return{start:G,end:I?{from:I.from,to:I.to}:void 0,matched:!0}}else if(y3(z.type,Q,q))U++;else if(y3(z.type,-Q,q)){if(U==0){let I=$3(z);return{start:G,end:I&&I.from<I.to?{from:I.from,to:I.to}:void 0,matched:!1}}U--}}while(Q<0?z.prevSibling():z.nextSibling());return{start:G,matched:!1}}function yA(Z,J,Q,X,Y,K,q){if(Q<0?!J:J==Z.doc.length)return null;let W=Q<0?Z.sliceDoc(J-1,J):Z.sliceDoc(J,J+1),G=q.indexOf(W);if(G<0||G%2==0!=Q>0)return null;let U={from:Q<0?J-1:J,to:Q>0?J+1:J},z=Z.doc.iterRange(J,Q>0?Z.doc.length:0),I=0;for(let V=0;!z.next().done&&V<=K;){let O=z.value;if(Q<0)V+=O.length;let F=J+V*Q;for(let N=Q>0?0:O.length-1,R=Q>0?O.length:-1;N!=R;N+=Q){let P=q.indexOf(O[N]);if(P<0||X.resolveInner(F+N,1).type!=Y)continue;if(P%2==0==Q>0)I++;else if(I==1)return{start:U,end:{from:F+N,to:F+N+1},matched:P>>1==G>>1};else I--}if(Q>0)V+=O.length}return z.done?{start:U,matched:!1}:null}function mV(Z,J,Q,X=0,Y=0){if(J==null){if(J=Z.search(/[^\s\u00a0]/),J==-1)J=Z.length}let K=Y;for(let q=X;q<J;q++)if(Z.charCodeAt(q)==9)K+=Q-K%Q;else K++;return K}class g3{constructor(Z,J,Q,X){this.string=Z,this.tabSize=J,this.indentUnit=Q,this.overrideIndent=X,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(Z){let J=this.string.charAt(this.pos),Q;if(typeof Z=="string")Q=J==Z;else Q=J&&(Z instanceof RegExp?Z.test(J):Z(J));if(Q)return++this.pos,J}eatWhile(Z){let J=this.pos;while(this.eat(Z));return this.pos>J}eatSpace(){let Z=this.pos;while(/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;return this.pos>Z}skipToEnd(){this.pos=this.string.length}skipTo(Z){let J=this.string.indexOf(Z,this.pos);if(J>-1)return this.pos=J,!0}backUp(Z){this.pos-=Z}column(){if(this.lastColumnPos<this.start)this.lastColumnValue=mV(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start;return this.lastColumnValue}indentation(){var Z;return(Z=this.overrideIndent)!==null&&Z!==void 0?Z:mV(this.string,null,this.tabSize)}match(Z,J,Q){if(typeof Z=="string"){let X=(K)=>Q?K.toLowerCase():K,Y=this.string.substr(this.pos,Z.length);if(X(Y)==X(Z)){if(J!==!1)this.pos+=Z.length;return!0}else return null}else{let X=this.string.slice(this.pos).match(Z);if(X&&X.index>0)return null;if(X&&J!==!1)this.pos+=X[0].length;return X}}current(){return this.string.slice(this.start,this.pos)}}function $A(Z){return{name:Z.name||"",token:Z.token,blankLine:Z.blankLine||(()=>{}),startState:Z.startState||(()=>!0),copyState:Z.copyState||hA,indent:Z.indent||(()=>null),languageData:Z.languageData||{},tokenTable:Z.tokenTable||v3,mergeTokens:Z.mergeTokens!==!1}}function hA(Z){if(typeof Z!="object")return Z;let J={};for(let Q in Z){let X=Z[Q];J[Q]=X instanceof Array?X.slice():X}return J}var pV=new WeakMap;class g9 extends K6{constructor(Z){let J=HA(Z.languageData),Q=$A(Z),X,Y=new class extends BJ{createParse(K,q,W){return new Xj(X,K,q,W)}};super(J,Y,[],Z.name);this.topNode=vA(J,this),X=this,this.streamParser=Q,this.stateAfter=new I1({perNode:!0}),this.tokenTable=Z.tokenTable?new m3(Q.tokenTable):uA}static define(Z){return new g9(Z)}getIndent(Z){let J=void 0,{overrideIndentation:Q}=Z.options;if(Q){if(J=pV.get(Z.state),J!=null&&J<Z.pos-1e4)J=void 0}let X=u3(this,Z.node.tree,Z.node.from,Z.node.from,J!==null&&J!==void 0?J:Z.pos),Y,K;if(X)K=X.state,Y=X.pos+1;else K=this.streamParser.startState(Z.unit),Y=Z.node.from;if(Z.pos-Y>1e4)return null;while(Y<Z.pos){let W=Z.state.doc.lineAt(Y),G=Math.min(Z.pos,W.to);if(W.length){let U=Q?Q(W.from):-1,z=new g3(W.text,Z.state.tabSize,Z.unit,U<0?void 0:U);while(z.pos<G-W.from)Yj(this.streamParser.token,z,K)}else this.streamParser.blankLine(K,Z.unit);if(G==Z.pos)break;Y=W.to+1}let q=Z.lineAt(Z.pos);if(Q&&J==null)pV.set(Z.state,q.from);return this.streamParser.indent(K,/^\s*(.*)/.exec(q.text)[1],Z)}get allowsNesting(){return!1}}function u3(Z,J,Q,X,Y){let K=Q>=X&&Q+J.length<=Y&&J.prop(Z.stateAfter);if(K)return{state:Z.streamParser.copyState(K),pos:Q+J.length};for(let q=J.children.length-1;q>=0;q--){let W=J.children[q],G=Q+J.positions[q],U=W instanceof h1&&G<Y&&u3(Z,W,G,X,Y);if(U)return U}return null}function Qj(Z,J,Q,X,Y){if(Y&&Q<=0&&X>=J.length)return J;if(!Y&&Q==0&&J.type==Z.topNode)Y=!0;for(let K=J.children.length-1;K>=0;K--){let q=J.positions[K],W=J.children[K],G;if(q<X&&W instanceof h1){if(!(G=Qj(Z,W,Q-q,X-q,Y)))break;return!Y?G:new h1(J.type,J.children.slice(0,K).concat(G),J.positions.slice(0,K+1),q+G.length)}}return null}function fA(Z,J,Q,X,Y){for(let K of J){let q=K.from+(K.openStart?25:0),W=K.to-(K.openEnd?25:0),G=q<=Q&&W>Q&&u3(Z,K.tree,0-K.offset,Q,W),U;if(G&&G.pos<=X&&(U=Qj(Z,K.tree,Q+K.offset,G.pos+K.offset,!1)))return{state:G.state,tree:U}}return{state:Z.streamParser.startState(Y?t8(Y):4),tree:h1.empty}}class Xj{constructor(Z,J,Q,X){this.lang=Z,this.input=J,this.fragments=Q,this.ranges=X,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=X[X.length-1].to;let Y=y7.get(),K=X[0].from,{state:q,tree:W}=fA(Z,Q,K,this.to,Y===null||Y===void 0?void 0:Y.state);this.state=q,this.parsedPos=this.chunkStart=K+W.length;for(let G=0;G<W.children.length;G++)this.chunks.push(W.children[G]),this.chunkPos.push(W.positions[G]);if(Y&&this.parsedPos<Y.viewport.from-1e5&&X.some((G)=>G.from<=Y.viewport.from&&G.to>=Y.viewport.from))this.state=this.lang.streamParser.startState(t8(Y.state)),Y.skipUntilInView(this.parsedPos,Y.viewport.from),this.parsedPos=Y.viewport.from;this.moveRangeIndex()}advance(){let Z=y7.get(),J=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),Q=Math.min(J,this.chunkStart+512);if(Z)Q=Math.min(Q,Z.viewport.to);while(this.parsedPos<Q)this.parseLine(Z);if(this.chunkStart<this.parsedPos)this.finishChunk();if(this.parsedPos>=J)return this.finish();if(Z&&this.parsedPos>=Z.viewport.to)return Z.skipUntilInView(this.parsedPos,J),this.finish();return null}stopAt(Z){this.stoppedAt=Z}lineAfter(Z){let J=this.input.chunk(Z);if(!this.input.lineChunks){let Q=J.indexOf(`
`);if(Q>-1)J=J.slice(0,Q)}else if(J==`
`)J="";return Z+J.length<=this.to?J:J.slice(0,this.to-Z)}nextLine(){let Z=this.parsedPos,J=this.lineAfter(Z),Q=Z+J.length;for(let X=this.rangeIndex;;){let Y=this.ranges[X].to;if(Y>=Q)break;if(J=J.slice(0,Y-(Q-J.length)),X++,X==this.ranges.length)break;let K=this.ranges[X].from,q=this.lineAfter(K);J+=q,Q=K+q.length}return{line:J,end:Q}}skipGapsTo(Z,J,Q){for(;;){let X=this.ranges[this.rangeIndex].to,Y=Z+J;if(Q>0?X>Y:X>=Y)break;let K=this.ranges[++this.rangeIndex].from;J+=K-X}return J}moveRangeIndex(){while(this.ranges[this.rangeIndex].to<this.parsedPos)this.rangeIndex++}emitToken(Z,J,Q,X){let Y=4;if(this.ranges.length>1){X=this.skipGapsTo(J,X,1),J+=X;let q=this.chunk.length;X=this.skipGapsTo(Q,X,-1),Q+=X,Y+=this.chunk.length-q}let K=this.chunk.length-4;if(this.lang.streamParser.mergeTokens&&Y==4&&K>=0&&this.chunk[K]==Z&&this.chunk[K+2]==J)this.chunk[K+2]=Q;else this.chunk.push(Z,J,Q,Y);return X}parseLine(Z){let{line:J,end:Q}=this.nextLine(),X=0,{streamParser:Y}=this.lang,K=new g3(J,Z?Z.state.tabSize:4,Z?t8(Z.state):2);if(K.eol())Y.blankLine(this.state,K.indentUnit);else while(!K.eol()){let q=Yj(Y.token,K,this.state);if(q)X=this.emitToken(this.lang.tokenTable.resolve(q),this.parsedPos+K.start,this.parsedPos+K.pos,X);if(K.start>1e4)break}if(this.parsedPos=Q,this.moveRangeIndex(),this.parsedPos<this.to)this.parsedPos++}finishChunk(){let Z=h1.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:gA,topID:0,maxBufferLength:512,reused:this.chunkReused});Z=new h1(Z.type,Z.children,Z.positions,Z.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(Z),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new h1(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function Yj(Z,J,Q){J.start=J.pos;for(let X=0;X<10;X++){let Y=Z(J,Q);if(J.pos>J.start)return Y}throw Error("Stream parser failed to advance stream.")}var v3=Object.create(null),U5=[T0.none],gA=new LJ(U5),cV=[],dV=Object.create(null),Kj=Object.create(null);for(let[Z,J]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])Kj[Z]=qj(v3,J);class m3{constructor(Z){this.extra=Z,this.table=Object.assign(Object.create(null),Kj)}resolve(Z){return!Z?0:this.table[Z]||(this.table[Z]=qj(this.extra,Z))}}var uA=new m3(v3);function w3(Z,J){if(cV.indexOf(Z)>-1)return;cV.push(Z),console.warn(J)}function qj(Z,J){let Q=[];for(let W of J.split(" ")){let G=[];for(let U of W.split(".")){let z=Z[U]||g[U];if(!z)w3(U,`Unknown highlighting tag ${U}`);else if(typeof z=="function")if(!G.length)w3(U,`Modifier ${U} used at start of tag`);else G=G.map(z);else if(G.length)w3(U,`Tag ${U} used as modifier`);else G=Array.isArray(z)?z:[z]}for(let U of G)Q.push(U)}if(!Q.length)return 0;let X=J.replace(/ /g,"_"),Y=X+" "+Q.map((W)=>W.id),K=dV[Y];if(K)return K.id;let q=dV[Y]=T0.define({id:U5.length,name:X,props:[yV({[X]:Q})]});return U5.push(q),q.id}function vA(Z,J){let Q=T0.define({id:U5.length,name:"Document",props:[b7.add(()=>Z),sV.add(()=>(X)=>J.getIndent(X))],top:!0});return U5.push(Q),Q}var ok={rtl:M1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:C1.RTL}),ltr:M1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:C1.LTR}),auto:M1.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var mA=(Z)=>{let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.from),X=l3(Z.state,Q.from);return X.line?pA(Z):X.block?dA(Z):!1};function n3(Z,J){return({state:Q,dispatch:X})=>{if(Q.readOnly)return!1;let Y=Z(J,Q);if(!Y)return!1;return X(Q.update(Y)),!0}}var pA=n3(sA,0);var cA=n3(Vj,0);var dA=n3((Z,J)=>Vj(Z,J,lA(J)),0);function l3(Z,J){let Q=Z.languageDataAt("commentTokens",J,1);return Q.length?Q[0]:{}}var I5=50;function nA(Z,{open:J,close:Q},X,Y){let K=Z.sliceDoc(X-I5,X),q=Z.sliceDoc(Y,Y+I5),W=/\s*$/.exec(K)[0].length,G=/^\s*/.exec(q)[0].length,U=K.length-W;if(K.slice(U-J.length,U)==J&&q.slice(G,G+Q.length)==Q)return{open:{pos:X-W,margin:W&&1},close:{pos:Y+G,margin:G&&1}};let z,I;if(Y-X<=2*I5)z=I=Z.sliceDoc(X,Y);else z=Z.sliceDoc(X,X+I5),I=Z.sliceDoc(Y-I5,Y);let V=/^\s*/.exec(z)[0].length,O=/\s*$/.exec(I)[0].length,F=I.length-O-Q.length;if(z.slice(V,V+J.length)==J&&I.slice(F,F+Q.length)==Q)return{open:{pos:X+V+J.length,margin:/\s/.test(z.charAt(V+J.length))?1:0},close:{pos:Y-O-Q.length,margin:/\s/.test(I.charAt(F-1))?1:0}};return null}function lA(Z){let J=[];for(let Q of Z.selection.ranges){let X=Z.doc.lineAt(Q.from),Y=Q.to<=X.to?X:Z.doc.lineAt(Q.to);if(Y.from>X.from&&Y.from==Q.to)Y=Q.to==X.to+1?X:Z.doc.lineAt(Q.to-1);let K=J.length-1;if(K>=0&&J[K].to>X.from)J[K].to=Y.to;else J.push({from:X.from+/^\s*/.exec(X.text)[0].length,to:Y.to})}return J}function Vj(Z,J,Q=J.selection.ranges){let X=Q.map((K)=>l3(J,K.from).block);if(!X.every((K)=>K))return null;let Y=Q.map((K,q)=>nA(J,X[q],K.from,K.to));if(Z!=2&&!Y.every((K)=>K))return{changes:J.changes(Q.map((K,q)=>{if(Y[q])return[];return[{from:K.from,insert:X[q].open+" "},{from:K.to,insert:" "+X[q].close}]}))};else if(Z!=1&&Y.some((K)=>K)){let K=[];for(let q=0,W;q<Y.length;q++)if(W=Y[q]){let G=X[q],{open:U,close:z}=W;K.push({from:U.pos-G.open.length,to:U.pos+U.margin},{from:z.pos-z.margin,to:z.pos+G.close.length})}return{changes:K}}return null}function sA(Z,J,Q=J.selection.ranges){let X=[],Y=-1;Z:for(let{from:K,to:q}of Q){let W=X.length,G=1e9,U;for(let z=K;z<=q;){let I=J.doc.lineAt(z);if(U==null){if(U=l3(J,I.from).line,!U)continue Z}if(I.from>Y&&(K==q||q>I.from)){Y=I.from;let V=/^\s*/.exec(I.text)[0].length,O=V==I.length,F=I.text.slice(V,V+U.length)==U?V:-1;if(V<I.text.length&&V<G)G=V;X.push({line:I,comment:F,token:U,indent:V,empty:O,single:!1})}z=I.to+1}if(G<1e9){for(let z=W;z<X.length;z++)if(X[z].indent<X[z].line.text.length)X[z].indent=G}if(X.length==W+1)X[W].single=!0}if(Z!=2&&X.some((K)=>K.comment<0&&(!K.empty||K.single))){let K=[];for(let{line:W,token:G,indent:U,empty:z,single:I}of X)if(I||!z)K.push({from:W.from+U,insert:G+" "});let q=J.changes(K);return{changes:q,selection:J.selection.map(q,1)}}else if(Z!=1&&X.some((K)=>K.comment>=0)){let K=[];for(let{line:q,comment:W,token:G}of X)if(W>=0){let U=q.from+W,z=U+G.length;if(q.text[z-q.from]==" ")z++;K.push({from:U,to:z})}return{changes:K}}return null}var c3=M6.define(),iA=M6.define(),rA=r.define(),jj=r.define({combine(Z){return R8(Z,{minDepth:100,newGroupDelay:500,joinToEvent:(J,Q)=>Q},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(J,Q)=>(X,Y)=>J(X,Y)||Q(X,Y)})}}),Hj=H0.define({create(){return t6.empty},update(Z,J){let Q=J.state.facet(jj),X=J.annotation(c3);if(X){let G=b0.fromTransaction(J,X.selection),U=X.side,z=U==0?Z.undone:Z.done;if(G)z=_J(z,z.length,Q.minDepth,G);else z=Nj(z,J.startState.selection);return new t6(U==0?X.rest:z,U==0?z:X.rest)}let Y=J.annotation(iA);if(Y=="full"||Y=="before")Z=Z.isolate();if(J.annotation(s1.addToHistory)===!1)return!J.changes.empty?Z.addMapping(J.changes.desc):Z;let K=b0.fromTransaction(J),q=J.annotation(s1.time),W=J.annotation(s1.userEvent);if(K)Z=Z.addChanges(K,q,W,Q,J);else if(J.selection)Z=Z.addSelection(J.startState.selection,q,W,Q.newGroupDelay);if(Y=="full"||Y=="after")Z=Z.isolate();return Z},toJSON(Z){return{done:Z.done.map((J)=>J.toJSON()),undone:Z.undone.map((J)=>J.toJSON())}},fromJSON(Z){return new t6(Z.done.map(b0.fromJSON),Z.undone.map(b0.fromJSON))}});function Oj(Z={}){return[Hj,jj.of(Z),X1.domEventHandlers({beforeinput(J,Q){let X=J.inputType=="historyUndo"?bJ:J.inputType=="historyRedo"?V5:null;if(!X)return!1;return J.preventDefault(),X(Q)}})]}function wJ(Z,J){return function({state:Q,dispatch:X}){if(!J&&Q.readOnly)return!1;let Y=Q.field(Hj,!1);if(!Y)return!1;let K=Y.pop(Z,Q,J);if(!K)return!1;return X(K),!0}}var bJ=wJ(0,!1),V5=wJ(1,!1),aA=wJ(0,!0),oA=wJ(1,!0);class b0{constructor(Z,J,Q,X,Y){this.changes=Z,this.effects=J,this.mapped=Q,this.startSelection=X,this.selectionsAfter=Y}setSelAfter(Z){return new b0(this.changes,this.effects,this.mapped,this.startSelection,Z)}toJSON(){var Z,J,Q;return{changes:(Z=this.changes)===null||Z===void 0?void 0:Z.toJSON(),mapped:(J=this.mapped)===null||J===void 0?void 0:J.toJSON(),startSelection:(Q=this.startSelection)===null||Q===void 0?void 0:Q.toJSON(),selectionsAfter:this.selectionsAfter.map((X)=>X.toJSON())}}static fromJSON(Z){return new b0(Z.changes&&l1.fromJSON(Z.changes),[],Z.mapped&&D6.fromJSON(Z.mapped),Z.startSelection&&y.fromJSON(Z.startSelection),Z.selectionsAfter.map(y.fromJSON))}static fromTransaction(Z,J){let Q=q6;for(let X of Z.startState.facet(rA)){let Y=X(Z);if(Y.length)Q=Q.concat(Y)}if(!Q.length&&Z.changes.empty)return null;return new b0(Z.changes.invert(Z.startState.doc),Q,void 0,J||Z.startState.selection,q6)}static selection(Z){return new b0(void 0,q6,void 0,void 0,Z)}}function _J(Z,J,Q,X){let Y=J+1>Q+20?J-Q-1:0,K=Z.slice(Y,J);return K.push(X),K}function tA(Z,J){let Q=[],X=!1;return Z.iterChangedRanges((Y,K)=>Q.push(Y,K)),J.iterChangedRanges((Y,K,q,W)=>{for(let G=0;G<Q.length;){let U=Q[G++],z=Q[G++];if(W>=U&&q<=z)X=!0}}),X}function eA(Z,J){return Z.ranges.length==J.ranges.length&&Z.ranges.filter((Q,X)=>Q.empty!=J.ranges[X].empty).length===0}function Fj(Z,J){return!Z.length?J:!J.length?Z:Z.concat(J)}var q6=[],ZL=200;function Nj(Z,J){if(!Z.length)return[b0.selection([J])];else{let Q=Z[Z.length-1],X=Q.selectionsAfter.slice(Math.max(0,Q.selectionsAfter.length-ZL));if(X.length&&X[X.length-1].eq(J))return Z;return X.push(J),_J(Z,Z.length-1,1e9,Q.setSelAfter(X))}}function JL(Z){let J=Z[Z.length-1],Q=Z.slice();return Q[Z.length-1]=J.setSelAfter(J.selectionsAfter.slice(0,J.selectionsAfter.length-1)),Q}function p3(Z,J){if(!Z.length)return Z;let Q=Z.length,X=q6;while(Q){let Y=QL(Z[Q-1],J,X);if(Y.changes&&!Y.changes.empty||Y.effects.length){let K=Z.slice(0,Q);return K[Q-1]=Y,K}else J=Y.mapped,Q--,X=Y.selectionsAfter}return X.length?[b0.selection(X)]:q6}function QL(Z,J,Q){let X=Fj(Z.selectionsAfter.length?Z.selectionsAfter.map((W)=>W.map(J)):q6,Q);if(!Z.changes)return b0.selection(X);let Y=Z.changes.map(J),K=J.mapDesc(Z.changes,!0),q=Z.mapped?Z.mapped.composeDesc(K):K;return new b0(Y,D1.mapEffects(Z.effects,J),q,Z.startSelection.map(K),X)}var XL=/^(input\.type|delete)($|\.)/;class t6{constructor(Z,J,Q=0,X=void 0){this.done=Z,this.undone=J,this.prevTime=Q,this.prevUserEvent=X}isolate(){return this.prevTime?new t6(this.done,this.undone):this}addChanges(Z,J,Q,X,Y){let K=this.done,q=K[K.length-1];if(q&&q.changes&&!q.changes.empty&&Z.changes&&(!Q||XL.test(Q))&&(!q.selectionsAfter.length&&J-this.prevTime<X.newGroupDelay&&X.joinToEvent(Y,tA(q.changes,Z.changes))||Q=="input.type.compose"))K=_J(K,K.length-1,X.minDepth,new b0(Z.changes.compose(q.changes),Fj(D1.mapEffects(Z.effects,q.changes),q.effects),q.mapped,q.startSelection,q6));else K=_J(K,K.length,X.minDepth,Z);return new t6(K,q6,J,Q)}addSelection(Z,J,Q,X){let Y=this.done.length?this.done[this.done.length-1].selectionsAfter:q6;if(Y.length>0&&J-this.prevTime<X&&Q==this.prevUserEvent&&Q&&/^select($|\.)/.test(Q)&&eA(Y[Y.length-1],Z))return this;return new t6(Nj(this.done,Z),this.undone,J,Q)}addMapping(Z){return new t6(p3(this.done,Z),p3(this.undone,Z),this.prevTime,this.prevUserEvent)}pop(Z,J,Q){let X=Z==0?this.done:this.undone;if(X.length==0)return null;let Y=X[X.length-1],K=Y.selectionsAfter[0]||(Y.startSelection?Y.startSelection.map(Y.changes.invertedDesc,1):J.selection);if(Q&&Y.selectionsAfter.length)return J.update({selection:Y.selectionsAfter[Y.selectionsAfter.length-1],annotations:c3.of({side:Z,rest:JL(X),selection:K}),userEvent:Z==0?"select.undo":"select.redo",scrollIntoView:!0});else if(!Y.changes)return null;else{let q=X.length==1?q6:X.slice(0,X.length-1);if(Y.mapped)q=p3(q,Y.mapped);return J.update({changes:Y.changes,selection:Y.startSelection,effects:Y.effects,annotations:c3.of({side:Z,rest:q,selection:K}),filter:!1,userEvent:Z==0?"undo":"redo",scrollIntoView:!0})}}}t6.empty=new t6(q6,q6);var Rj=[{key:"Mod-z",run:bJ,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:V5,preventDefault:!0},{linux:"Ctrl-Shift-z",run:V5,preventDefault:!0},{key:"Mod-u",run:aA,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:oA,preventDefault:!0}];function m7(Z,J){return y.create(Z.ranges.map(J),Z.mainIndex)}function _6(Z,J){return Z.update({selection:J,scrollIntoView:!0,userEvent:"select"})}function k6({state:Z,dispatch:J},Q){let X=m7(Z.selection,Q);if(X.eq(Z.selection,!0))return!1;return J(_6(Z,X)),!0}function yJ(Z,J){return y.cursor(J?Z.to:Z.from)}function Dj(Z,J){return k6(Z,(Q)=>Q.empty?Z.moveByChar(Q,J):yJ(Q,J))}function F0(Z){return Z.textDirectionAt(Z.state.selection.main.head)==C1.LTR}var $J=(Z)=>Dj(Z,!F0(Z)),hJ=(Z)=>Dj(Z,F0(Z));function Mj(Z,J){return k6(Z,(Q)=>Q.empty?Z.moveByGroup(Q,J):yJ(Q,J))}var s3=(Z)=>Mj(Z,!F0(Z)),i3=(Z)=>Mj(Z,F0(Z));var qx=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function YL(Z,J,Q){if(J.type.prop(Q))return!0;let X=J.to-J.from;return X&&(X>2||/[^\s,.;:]/.test(Z.sliceDoc(J.from,J.to)))||J.firstChild}function fJ(Z,J,Q){let X=C6(Z).resolveInner(J.head),Y=Q?I1.closedBy:I1.openedBy;for(let G=J.head;;){let U=Q?X.childAfter(G):X.childBefore(G);if(!U)break;if(YL(Z,U,Y))X=U;else G=Q?U.to:U.from}let K=X.type.prop(Y),q,W;if(K&&(q=Q?E6(Z,X.from,1):E6(Z,X.to,-1))&&q.matched)W=Q?q.end.to:q.end.from;else W=Q?X.to:X.from;return y.cursor(W,Q?-1:1)}var KL=(Z)=>k6(Z,(J)=>fJ(Z.state,J,!F0(Z))),qL=(Z)=>k6(Z,(J)=>fJ(Z.state,J,F0(Z)));function Aj(Z,J){return k6(Z,(Q)=>{if(!Q.empty)return yJ(Q,J);let X=Z.moveVertically(Q,J);return X.head!=Q.head?X:Z.moveToLineBoundary(Q,J)})}var gJ=(Z)=>Aj(Z,!1),uJ=(Z)=>Aj(Z,!0);function Lj(Z){let J=Z.scrollDOM.clientHeight<Z.scrollDOM.scrollHeight-2,Q=0,X=0,Y;if(J){for(let K of Z.state.facet(X1.scrollMargins)){let q=K(Z);if(q===null||q===void 0?void 0:q.top)Q=Math.max(q===null||q===void 0?void 0:q.top,Q);if(q===null||q===void 0?void 0:q.bottom)X=Math.max(q===null||q===void 0?void 0:q.bottom,X)}Y=Z.scrollDOM.clientHeight-Q-X}else Y=(Z.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:Q,marginBottom:X,selfScroll:J,height:Math.max(Z.defaultLineHeight,Y-5)}}function Bj(Z,J){let Q=Lj(Z),{state:X}=Z,Y=m7(X.selection,(q)=>{return q.empty?Z.moveVertically(q,J,Q.height):yJ(q,J)});if(Y.eq(X.selection))return!1;let K;if(Q.selfScroll){let q=Z.coordsAtPos(X.selection.main.head),W=Z.scrollDOM.getBoundingClientRect(),G=W.top+Q.marginTop,U=W.bottom-Q.marginBottom;if(q&&q.top>G&&q.bottom<U)K=X1.scrollIntoView(Y.main.head,{y:"start",yMargin:q.top-G})}return Z.dispatch(_6(X,Y),{effects:K}),!0}var j5=(Z)=>Bj(Z,!1),v7=(Z)=>Bj(Z,!0);function e8(Z,J,Q){let X=Z.lineBlockAt(J.head),Y=Z.moveToLineBoundary(J,Q);if(Y.head==J.head&&Y.head!=(Q?X.to:X.from))Y=Z.moveToLineBoundary(J,Q,!1);if(!Q&&Y.head==X.from&&X.length){let K=/^\s*/.exec(Z.state.sliceDoc(X.from,Math.min(X.from+100,X.to)))[0].length;if(K&&J.head!=X.from+K)Y=y.cursor(X.from+K)}return Y}var WL=(Z)=>k6(Z,(J)=>e8(Z,J,!0)),GL=(Z)=>k6(Z,(J)=>e8(Z,J,!1)),UL=(Z)=>k6(Z,(J)=>e8(Z,J,!F0(Z))),zL=(Z)=>k6(Z,(J)=>e8(Z,J,F0(Z))),r3=(Z)=>k6(Z,(J)=>y.cursor(Z.lineBlockAt(J.head).from,1)),a3=(Z)=>k6(Z,(J)=>y.cursor(Z.lineBlockAt(J.head).to,-1));function IL(Z,J,Q){let X=!1,Y=m7(Z.selection,(K)=>{let q=E6(Z,K.head,-1)||E6(Z,K.head,1)||K.head>0&&E6(Z,K.head-1,1)||K.head<Z.doc.length&&E6(Z,K.head+1,-1);if(!q||!q.end)return K;X=!0;let W=q.start.from==K.head?q.end.to:q.end.from;return Q?y.range(K.anchor,W):y.cursor(W)});if(!X)return!1;return J(_6(Z,Y)),!0}var VL=({state:Z,dispatch:J})=>IL(Z,J,!1);function W6(Z,J,Q){let X=m7(Z.state.selection,(Y)=>{if(Y.undirectional&&Y.head>=Y.anchor!=J)Y=y.range(Y.head,Y.anchor);let K=Q(Y);return y.range(Y.anchor,K.head,K.goalColumn,K.bidiLevel||void 0,K.assoc)});if(X.eq(Z.state.selection))return!1;return Z.dispatch(_6(Z.state,X)),!0}function Pj(Z,J){return W6(Z,J,(Q)=>Z.moveByChar(Q,J))}var Tj=(Z)=>Pj(Z,!F0(Z)),Sj=(Z)=>Pj(Z,F0(Z));function Ej(Z,J){return W6(Z,J,(Q)=>Z.moveByGroup(Q,J))}var jL=(Z)=>Ej(Z,!F0(Z)),HL=(Z)=>Ej(Z,F0(Z));var OL=(Z)=>{let J=!F0(Z);return W6(Z,J,(Q)=>fJ(Z.state,Q,J))},FL=(Z)=>{let J=F0(Z);return W6(Z,J,(Q)=>fJ(Z.state,Q,J))};function Cj(Z,J){return W6(Z,J,(Q)=>Z.moveVertically(Q,J))}var _j=(Z)=>Cj(Z,!1),kj=(Z)=>Cj(Z,!0);function xj(Z,J){return W6(Z,J,(Q)=>Z.moveVertically(Q,J,Lj(Z).height))}var Wj=(Z)=>xj(Z,!1),Gj=(Z)=>xj(Z,!0),NL=(Z)=>W6(Z,!0,(J)=>e8(Z,J,!0)),RL=(Z)=>W6(Z,!1,(J)=>e8(Z,J,!1)),DL=(Z)=>{let J=!F0(Z);return W6(Z,J,(Q)=>e8(Z,Q,J))},ML=(Z)=>{let J=F0(Z);return W6(Z,J,(Q)=>e8(Z,Q,J))},AL=(Z)=>W6(Z,!1,(J)=>y.cursor(Z.lineBlockAt(J.head).from)),LL=(Z)=>W6(Z,!0,(J)=>y.cursor(Z.lineBlockAt(J.head).to)),kJ=({state:Z,dispatch:J})=>{return J(_6(Z,{anchor:0})),!0},xJ=({state:Z,dispatch:J})=>{return J(_6(Z,{anchor:Z.doc.length})),!0},Uj=({state:Z,dispatch:J})=>{return J(_6(Z,{anchor:Z.selection.main.anchor,head:0})),!0},zj=({state:Z,dispatch:J})=>{return J(_6(Z,{anchor:Z.selection.main.anchor,head:Z.doc.length})),!0},BL=({state:Z,dispatch:J})=>{return J(Z.update({selection:{anchor:0,head:Z.doc.length},userEvent:"select"})),!0},PL=({state:Z,dispatch:J})=>{let Q=mJ(Z).map(({from:X,to:Y})=>y.range(X,Math.min(Y+1,Z.doc.length)));return J(Z.update({selection:y.create(Q),userEvent:"select"})),!0},TL=({state:Z,dispatch:J})=>{let Q=m7(Z.selection,(X)=>{let Y=C6(Z),K=Y.resolveStack(X.from,1);if(X.empty){let q=Y.resolveStack(X.from,-1);if(q.node.from>=K.node.from&&q.node.to<=K.node.to)K=q}for(let q=K;q;q=q.next){let{node:W}=q;if((W.from<X.from&&W.to>=X.to||W.to>X.to&&W.from<=X.from)&&q.next)return y.range(W.to,W.from)}return X});if(Q.eq(Z.selection))return!1;return J(_6(Z,Q)),!0};function wj(Z,J){let{state:Q}=Z,X=Q.selection,Y=Q.selection.ranges.slice();for(let K of Q.selection.ranges){let q=Q.doc.lineAt(K.head);if(J?q.to<Z.state.doc.length:q.from>0)for(let W=K;;){let G=Z.moveVertically(W,J);if(G.head<q.from||G.head>q.to){if(!Y.some((U)=>U.head==G.head))Y.push(G);break}else if(G.head==W.head)break;else W=G}}if(Y.length==X.ranges.length)return!1;return Z.dispatch(_6(Q,y.create(Y,Y.length-1))),!0}var SL=(Z)=>wj(Z,!1),EL=(Z)=>wj(Z,!0),CL=({state:Z,dispatch:J})=>{let Q=Z.selection,X=null;if(Q.ranges.length>1)X=y.create([Q.main]);else if(!Q.main.empty)X=y.create([y.cursor(Q.main.head)]);if(!X)return!1;return J(_6(Z,X)),!0};function H5(Z,J){if(Z.state.readOnly)return!1;let Q="delete.selection",{state:X}=Z,Y=X.changeByRange((K)=>{let{from:q,to:W}=K;if(q==W){let G=J(K);if(G<q)Q="delete.backward",G=CJ(Z,G,!1);else if(G>q)Q="delete.forward",G=CJ(Z,G,!0);q=Math.min(q,G),W=Math.max(W,G)}else q=CJ(Z,q,!1),W=CJ(Z,W,!0);return q==W?{range:K}:{changes:{from:q,to:W},range:y.cursor(q,q<K.head?-1:1)}});if(Y.changes.empty)return!1;return Z.dispatch(X.update(Y,{scrollIntoView:!0,userEvent:Q,effects:Q=="delete.selection"?X1.announce.of(X.phrase("Selection deleted")):void 0})),!0}function CJ(Z,J,Q){if(Z instanceof X1)for(let X of Z.state.facet(X1.atomicRanges).map((Y)=>Y(Z)))X.between(J,J,(Y,K)=>{if(Y<J&&K>J)J=Q?K:Y});return J}var bj=(Z,J,Q)=>H5(Z,(X)=>{let Y=X.from,{state:K}=Z,q=K.doc.lineAt(Y),W,G;if(Q&&!J&&Y>q.from&&Y<q.from+200&&!/[^ \t]/.test(W=q.text.slice(0,Y-q.from))){if(W[W.length-1]=="\t")return Y-1;let U=_9(W,K.tabSize),z=U%t8(K)||t8(K);for(let I=0;I<z&&W[W.length-1-I]==" ";I++)Y--;G=Y}else if(G=K0(q.text,Y-q.from,J,J)+q.from,G==Y&&q.number!=(J?K.doc.lines:1))G+=J?1:-1;else if(!J&&/[\ufe00-\ufe0f]/.test(q.text.slice(G-q.from,Y-q.from)))G=K0(q.text,G-q.from,!1,!1)+q.from;return G}),d3=(Z)=>bj(Z,!1,!0);var vJ=(Z)=>bj(Z,!0,!1),yj=(Z,J)=>H5(Z,(Q)=>{let X=Q.head,{state:Y}=Z,K=Y.doc.lineAt(X),q=Y.charCategorizer(X);for(let W=null;;){if(X==(J?K.to:K.from)){if(X==Q.head&&K.number!=(J?Y.doc.lines:1))X+=J?1:-1;break}let G=K0(K.text,X-K.from,J)+K.from,U=K.text.slice(Math.min(X,G)-K.from,Math.max(X,G)-K.from),z=q(U);if(W!=null&&z!=W)break;if(U!=" "||X!=Q.head)W=z;X=G}return X}),$j=(Z)=>yj(Z,!1),o3=(Z)=>yj(Z,!0);var _L=(Z)=>H5(Z,(J)=>{let Q=Z.lineBlockAt(J.head).to;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var kL=(Z)=>H5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!1).head;return J.head>Q?Q:Math.max(0,J.head-1)}),xL=(Z)=>H5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!0).head;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var wL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{return{changes:{from:X.from,to:X.to,insert:O1.of(["",""])},range:y.cursor(X.from)}});return J(Z.update(Q,{scrollIntoView:!0,userEvent:"input"})),!0},bL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{if(!X.empty||X.from==0||X.from==Z.doc.length)return{range:X};let Y=X.from,K=Z.doc.lineAt(Y),q=Y==K.from?Y-1:K0(K.text,Y-K.from,!1)+K.from,W=Y==K.to?Y+1:K0(K.text,Y-K.from,!0)+K.from;return{changes:{from:q,to:W,insert:Z.doc.slice(Y,W).append(Z.doc.slice(q,Y))},range:y.cursor(W)}});if(Q.changes.empty)return!1;return J(Z.update(Q,{scrollIntoView:!0,userEvent:"move.character"})),!0};function mJ(Z){let J=[],Q=-1;for(let X of Z.selection.ranges){let Y=Z.doc.lineAt(X.from),K=Z.doc.lineAt(X.to);if(!X.empty&&X.to==K.from)K=Z.doc.lineAt(X.to-1);if(Q>=Y.number){let q=J[J.length-1];q.to=K.to,q.ranges.push(X)}else J.push({from:Y.from,to:K.to,ranges:[X]});Q=K.number+1}return J}function hj(Z,J,Q){if(Z.readOnly)return!1;let X=[],Y=[];for(let K of mJ(Z)){if(Q?K.to==Z.doc.length:K.from==0)continue;let q=Z.doc.lineAt(Q?K.to+1:K.from-1),W=q.length+1;if(Q){X.push({from:K.to,to:q.to},{from:K.from,insert:q.text+Z.lineBreak});for(let G of K.ranges)Y.push(y.range(Math.min(Z.doc.length,G.anchor+W),Math.min(Z.doc.length,G.head+W)))}else{X.push({from:q.from,to:K.from},{from:K.to,insert:Z.lineBreak+q.text});for(let G of K.ranges)Y.push(y.range(G.anchor-W,G.head-W))}}if(!X.length)return!1;return J(Z.update({changes:X,scrollIntoView:!0,selection:y.create(Y,Z.selection.mainIndex),userEvent:"move.line"})),!0}var yL=({state:Z,dispatch:J})=>hj(Z,J,!1),$L=({state:Z,dispatch:J})=>hj(Z,J,!0);function fj(Z,J,Q){if(Z.readOnly)return!1;let X=[];for(let K of mJ(Z))if(Q)X.push({from:K.from,insert:Z.doc.slice(K.from,K.to)+Z.lineBreak});else X.push({from:K.to,insert:Z.lineBreak+Z.doc.slice(K.from,K.to)});let Y=Z.changes(X);return J(Z.update({changes:Y,selection:Z.selection.map(Y,Q?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}var hL=({state:Z,dispatch:J})=>fj(Z,J,!1),fL=({state:Z,dispatch:J})=>fj(Z,J,!0),gL=(Z)=>{if(Z.state.readOnly)return!1;let{state:J}=Z,Q=J.changes(mJ(J).map(({from:Y,to:K})=>{if(Y>0)Y--;else if(K<J.doc.length)K++;return{from:Y,to:K}})),X=m7(J.selection,(Y)=>{let K=void 0;if(Z.lineWrapping){let q=Z.lineBlockAt(Y.head),W=Z.coordsAtPos(Y.head,Y.assoc||1);if(W)K=q.bottom+Z.documentTop-W.bottom+Z.defaultLineHeight/2}return Z.moveVertically(Y,!0,K)}).map(Q);return Z.dispatch({changes:Q,selection:X,scrollIntoView:!0,userEvent:"delete.line"}),!0};function uL(Z,J){if(/\(\)|\[\]|\{\}/.test(Z.sliceDoc(J-1,J+1)))return{from:J,to:J};let Q=C6(Z).resolveInner(J),X=Q.childBefore(J),Y=Q.childAfter(J),K;if(X&&Y&&X.to<=J&&Y.from>=J&&(K=X.type.prop(I1.closedBy))&&K.indexOf(Y.name)>-1&&Z.doc.lineAt(X.to).from==Z.doc.lineAt(Y.from).from&&!/\S/.test(Z.sliceDoc(X.to,Y.from)))return{from:X.to,to:Y.from};return null}var Ij=gj(!1),vL=gj(!0);function gj(Z){return({state:J,dispatch:Q})=>{if(J.readOnly)return!1;let X=J.changeByRange((Y)=>{let{from:K,to:q}=Y,W=J.doc.lineAt(K),G=!Z&&K==q&&uL(J,K);if(Z)K=q=(q<=W.to?W:J.doc.lineAt(q)).to;let U=new g7(J,{simulateBreak:K,simulateDoubleBreak:!!G}),z=h3(U,K);if(z==null)z=_9(/^\s*/.exec(J.doc.lineAt(K).text)[0],J.tabSize);while(q<W.to&&/\s/.test(W.text[q-W.from]))q++;if(G)({from:K,to:q}=G);else if(K>W.from&&K<W.from+100&&!/\S/.test(W.text.slice(0,K)))K=W.from;let I=["",z5(J,z)];if(G)I.push(z5(J,U.lineIndent(W.from,-1)));return{changes:{from:K,to:q,insert:O1.of(I)},range:y.cursor(K+1+I[1].length)}});return Q(J.update(X,{scrollIntoView:!0,userEvent:"input"})),!0}}function t3(Z,J){let Q=-1;return Z.changeByRange((X)=>{let Y=[];for(let q=X.from;q<=X.to;){let W=Z.doc.lineAt(q);if(W.number>Q&&(X.empty||X.to>W.from))J(W,Y,X),Q=W.number;q=W.to+1}let K=Z.changes(Y);return{changes:Y,range:y.range(K.mapPos(X.anchor,1),K.mapPos(X.head,1))}})}var mL=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Object.create(null),X=new g7(Z,{overrideIndentation:(K)=>{let q=Q[K];return q==null?-1:q}}),Y=t3(Z,(K,q,W)=>{let G=h3(X,K.from);if(G==null)return;if(!/\S/.test(K.text))G=0;let U=/^\s*/.exec(K.text)[0],z=z5(Z,G);if(U!=z||W.from<K.from+U.length)Q[K.from]=G,q.push({from:K.from,to:K.from+U.length,insert:z})});if(!Y.changes.empty)J(Z.update(Y,{userEvent:"indent"}));return!0},uj=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(t3(Z,(Q,X)=>{X.push({from:Q.from,insert:Z.facet(f7)})}),{userEvent:"input.indent"})),!0},vj=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(t3(Z,(Q,X)=>{let Y=/^\s*/.exec(Q.text)[0];if(!Y)return;let K=_9(Y,Z.tabSize),q=0,W=z5(Z,Math.max(0,K-t8(Z)));while(q<Y.length&&q<W.length&&Y.charCodeAt(q)==W.charCodeAt(q))q++;X.push({from:Q.from+q,to:Q.from+Y.length,insert:W.slice(q)})}),{userEvent:"delete.dedent"})),!0},pL=(Z)=>{return Z.setTabFocusMode(),!0};var cL=[{key:"Ctrl-b",run:$J,shift:Tj,preventDefault:!0},{key:"Ctrl-f",run:hJ,shift:Sj},{key:"Ctrl-p",run:gJ,shift:_j},{key:"Ctrl-n",run:uJ,shift:kj},{key:"Ctrl-a",run:r3,shift:AL},{key:"Ctrl-e",run:a3,shift:LL},{key:"Ctrl-d",run:vJ},{key:"Ctrl-h",run:d3},{key:"Ctrl-k",run:_L},{key:"Ctrl-Alt-h",run:$j},{key:"Ctrl-o",run:wL},{key:"Ctrl-t",run:bL},{key:"Ctrl-v",run:v7}],dL=[{key:"ArrowLeft",run:$J,shift:Tj,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:s3,shift:jL,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:UL,shift:DL,preventDefault:!0},{key:"ArrowRight",run:hJ,shift:Sj,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:i3,shift:HL,preventDefault:!0},{mac:"Cmd-ArrowRight",run:zL,shift:ML,preventDefault:!0},{key:"ArrowUp",run:gJ,shift:_j,preventDefault:!0},{mac:"Cmd-ArrowUp",run:kJ,shift:Uj},{mac:"Ctrl-ArrowUp",run:j5,shift:Wj},{key:"ArrowDown",run:uJ,shift:kj,preventDefault:!0},{mac:"Cmd-ArrowDown",run:xJ,shift:zj},{mac:"Ctrl-ArrowDown",run:v7,shift:Gj},{key:"PageUp",run:j5,shift:Wj},{key:"PageDown",run:v7,shift:Gj},{key:"Home",run:GL,shift:RL,preventDefault:!0},{key:"Mod-Home",run:kJ,shift:Uj},{key:"End",run:WL,shift:NL,preventDefault:!0},{key:"Mod-End",run:xJ,shift:zj},{key:"Enter",run:Ij,shift:Ij},{key:"Mod-a",run:BL},{key:"Backspace",run:d3,shift:d3,preventDefault:!0},{key:"Delete",run:vJ,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:$j,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:o3,preventDefault:!0},{mac:"Mod-Backspace",run:kL,preventDefault:!0},{mac:"Mod-Delete",run:xL,preventDefault:!0}].concat(cL.map((Z)=>({mac:Z.key,run:Z.run,shift:Z.shift}))),mj=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:KL,shift:OL},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:qL,shift:FL},{key:"Alt-ArrowUp",run:yL},{key:"Shift-Alt-ArrowUp",run:hL},{key:"Alt-ArrowDown",run:$L},{key:"Shift-Alt-ArrowDown",run:fL},{key:"Mod-Alt-ArrowUp",run:SL},{key:"Mod-Alt-ArrowDown",run:EL},{key:"Escape",run:CL},{key:"Mod-Enter",run:vL},{key:"Alt-l",mac:"Ctrl-l",run:PL},{key:"Mod-i",run:TL,preventDefault:!0},{key:"Mod-[",run:vj},{key:"Mod-]",run:uj},{key:"Mod-Alt-\\",run:mL},{key:"Shift-Mod-k",run:gL},{key:"Shift-Mod-\\",run:VL},{key:"Mod-/",run:mA},{key:"Alt-A",run:cA},{key:"Ctrl-m",mac:"Shift-Alt-m",run:pL}].concat(dL),pj={key:"Tab",run:uj,shift:vj};class e3{constructor(Z,J,Q){this.from=Z,this.to=J,this.diagnostic=Q}}class u9{constructor(Z,J,Q){this.diagnostics=Z,this.panel=J,this.selected=Q}static init(Z,J,Q){let X=Q.facet(O5).markerFilter;if(X)Z=X(Z,Q);let Y=Z.slice().sort((V,O)=>V.from-O.from||V.to-O.to),K=new F8,q=[],W=0,G=Q.doc.iter(),U=0,z=Q.doc.length;for(let V=0;;){let O=V==Y.length?null:Y[V];if(!O&&!q.length)break;let F,N;if(q.length)F=W,N=q.reduce((T,C)=>Math.min(T,C.to),O&&O.from>F?O.from:1e8);else{if(F=O.from,F>z)break;N=O.to,q.push(O),V++}while(V<Y.length){let T=Y[V];if(T.from==F&&(T.to>T.from||T.to==F))q.push(T),V++,N=Math.min(T.to,N);else{N=Math.min(T.from,N);break}}N=Math.min(N,z);let R=!1;if(q.some((T)=>T.from==F&&(T.to==N||N==z))){if(R=F==N,!R&&N-F<10){let T=F-(U+G.value.length);if(T>0)G.next(T),U=F;for(let C=F;;){if(C>=N){R=!0;break}if(!G.lineBreak&&U+G.value.length>C)break;C=U+G.value.length,U+=G.value.length,G.next()}}}let P=eL(q);if(R)K.add(F,F,M1.widget({widget:new aj(P),diagnostics:q.slice()}));else{let T=q.reduce((C,_)=>_.markClass?C+" "+_.markClass:C,"");K.add(F,N,M1.mark({class:"cm-lintRange cm-lintRange-"+P+T,diagnostics:q.slice(),inclusiveEnd:q.some((C)=>C.to>N)}))}if(W=N,W==z)break;for(let T=0;T<q.length;T++)if(q[T].to<=W)q.splice(T--,1)}let I=K.finish();return new u9(I,J,p7(I))}}function p7(Z,J=null,Q=0){let X=null;return Z.between(Q,1e9,(Y,K,{spec:q})=>{if(J&&q.diagnostics.indexOf(J)<0)return;if(!X)X=new e3(Y,K,J||q.diagnostics[0]);else if(q.diagnostics.indexOf(X.diagnostic)<0)return!1;else X=new e3(X.from,K,X.diagnostic)}),X}function nL(Z,J){let Q=J.pos,X=J.end||Q,Y=Z.state.facet(O5).hideOn(Z,Q,X);if(Y!=null)return Y;let K=Z.startState.doc.lineAt(J.pos);return!!(Z.effects.some((q)=>q.is(JK))||Z.changes.touchesRange(K.from,Math.max(K.to,X)))}function lL(Z,J){return Z.field(x6,!1)?J:J.concat(D1.appendConfig.of(JB))}function nj(Z,J){return{effects:lL(Z,[JK.of(J)])}}var JK=D1.define(),lj=D1.define(),sj=D1.define(),x6=H0.define({create(){return new u9(M1.none,null,null)},update(Z,J){if(J.docChanged&&Z.diagnostics.size){let Q=Z.diagnostics.map(J.changes),X=null,Y=Z.panel;if(Z.selected){let K=J.changes.mapPos(Z.selected.from,1);X=p7(Q,Z.selected.diagnostic,K)||p7(Q,null,K)}if(!Q.size&&Y&&J.state.facet(O5).autoPanel)Y=null;Z=new u9(Q,Y,X)}for(let Q of J.effects)if(Q.is(JK)){let X=!J.state.facet(O5).autoPanel?Z.panel:Q.value.length?cJ.open:null;Z=u9.init(Q.value,X,J.state)}else if(Q.is(lj))Z=new u9(Z.diagnostics,Q.value?cJ.open:null,Z.selected);else if(Q.is(sj))Z=new u9(Z.diagnostics,Z.panel,Q.value);return Z},provide:(Z)=>[k7.from(Z,(J)=>J.panel),X1.decorations.from(Z,(J)=>J.diagnostics)]});var sL=M1.mark({class:"cm-lintRange cm-lintRange-active"});function iL(Z,J,Q){let{diagnostics:X}=Z.state.field(x6),Y,K=-1,q=-1;X.between(J-(Q<0?1:0),J+(Q>0?1:0),(G,U,{spec:z})=>{if(J>=G&&J<=U&&(G==U||(J>G||Q>0)&&(J<U||Q<0)))return Y=z.diagnostics,K=G,q=U,!1});let W=Z.state.facet(O5).tooltipFilter;if(Y&&W)Y=W(Y,Z.state);if(!Y)return null;return{pos:K,end:q,above:!0,create(){return{dom:rL(Z,Y)}}}}function rL(Z,J){return v0("ul",{class:"cm-tooltip-lint"},J.map((Q)=>rj(Z,Q,!1)))}var cj=(Z)=>{let J=Z.state.field(x6,!1);if(!J||!J.panel)return!1;return Z.dispatch({effects:lj.of(!1)}),!0};var O5=r.define({combine(Z){return{sources:Z.map((J)=>J.source).filter((J)=>J!=null),...R8(Z.map((J)=>J.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:dj,tooltipFilter:dj,needsRefresh:(J,Q)=>!J?Q:!Q?J:(X)=>J(X)||Q(X),hideOn:(J,Q)=>!J?Q:!Q?J:(X,Y,K)=>J(X,Y,K)||Q(X,Y,K),autoPanel:(J,Q)=>J||Q})}}});function dj(Z,J){return!Z?J:!J?Z:(Q,X)=>J(Z(Q,X),X)}function ij(Z){let J=[];if(Z)Z:for(let{name:Q}of Z){for(let X=0;X<Q.length;X++){let Y=Q[X];if(/[a-zA-Z]/.test(Y)&&!J.some((K)=>K.toLowerCase()==Y.toLowerCase())){J.push(Y);continue Z}}J.push("")}return J}function rj(Z,J,Q){var X;let Y=Q?ij(J.actions):[];return v0("li",{class:"cm-diagnostic cm-diagnostic-"+J.severity},v0("span",{class:"cm-diagnosticText"},J.renderMessage?J.renderMessage(Z):J.message),(X=J.actions)===null||X===void 0?void 0:X.map((K,q)=>{let W=!1,G=(O)=>{if(O.preventDefault(),W)return;W=!0;let F=p7(Z.state.field(x6).diagnostics,J);if(F)K.apply(Z,F.from,F.to)},{name:U}=K,z=Y[q]?U.indexOf(Y[q]):-1,I=z<0?U:[U.slice(0,z),v0("u",U.slice(z,z+1)),U.slice(z+1)],V=K.markClass?" "+K.markClass:"";return v0("button",{type:"button",class:"cm-diagnosticAction"+V,onclick:G,onmousedown:G,"aria-label":` Action: ${U}${z<0?"":` (access key "${Y[q]})"`}.`},I)}),J.source&&v0("div",{class:"cm-diagnosticSource"},J.source))}class aj extends l8{constructor(Z){super();this.sev=Z}eq(Z){return Z.sev==this.sev}toDOM(){return v0("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class ZK{constructor(Z,J){this.diagnostic=J,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=rj(Z,J,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class cJ{constructor(Z){this.view=Z,this.items=[];let J=(X)=>{if(X.ctrlKey||X.altKey||X.metaKey)return;if(X.keyCode==27)cj(this.view),this.view.focus();else if(X.keyCode==38||X.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(X.keyCode==40||X.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(X.keyCode==36)this.moveSelection(0);else if(X.keyCode==35)this.moveSelection(this.items.length-1);else if(X.keyCode==13)this.view.focus();else if(X.keyCode>=65&&X.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:Y}=this.items[this.selectedIndex],K=ij(Y.actions);for(let q=0;q<K.length;q++)if(K[q].toUpperCase().charCodeAt(0)==X.keyCode){let W=p7(this.view.state.field(x6).diagnostics,Y);if(W)Y.actions[q].apply(Z,W.from,W.to)}}else return;X.preventDefault()},Q=(X)=>{for(let Y=0;Y<this.items.length;Y++)if(this.items[Y].dom.contains(X.target))this.moveSelection(Y)};this.list=v0("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:J,onclick:Q}),this.dom=v0("div",{class:"cm-panel-lint"},this.list,v0("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>cj(this.view)},"×")),this.update()}get selectedIndex(){let Z=this.view.state.field(x6).selected;if(!Z)return-1;for(let J=0;J<this.items.length;J++)if(this.items[J].diagnostic==Z.diagnostic)return J;return-1}update(){let{diagnostics:Z,selected:J}=this.view.state.field(x6),Q=0,X=!1,Y=null,K=new Set;Z.between(0,this.view.state.doc.length,(q,W,{spec:G})=>{for(let U of G.diagnostics){if(K.has(U))continue;K.add(U);let z=-1,I;for(let V=Q;V<this.items.length;V++)if(this.items[V].diagnostic==U){z=V;break}if(z<0)I=new ZK(this.view,U),this.items.splice(Q,0,I),X=!0;else if(I=this.items[z],z>Q)this.items.splice(Q,z-Q),X=!0;if(J&&I.diagnostic==J.diagnostic){if(!I.dom.hasAttribute("aria-selected"))I.dom.setAttribute("aria-selected","true"),Y=I}else if(I.dom.hasAttribute("aria-selected"))I.dom.removeAttribute("aria-selected");Q++}});while(Q<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0))X=!0,this.items.pop();if(this.items.length==0)this.items.push(new ZK(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),X=!0;if(Y)this.list.setAttribute("aria-activedescendant",Y.id),this.view.requestMeasure({key:this,read:()=>({sel:Y.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:q,panel:W})=>{let G=W.height/this.list.offsetHeight;if(q.top<W.top)this.list.scrollTop-=(W.top-q.top)/G;else if(q.bottom>W.bottom)this.list.scrollTop+=(q.bottom-W.bottom)/G}});else if(this.selectedIndex<0)this.list.removeAttribute("aria-activedescendant");if(X)this.sync()}sync(){let Z=this.list.firstChild;function J(){let Q=Z;Z=Q.nextSibling,Q.remove()}for(let Q of this.items)if(Q.dom.parentNode==this.list){while(Z!=Q.dom)J();Z=Q.dom.nextSibling}else this.list.insertBefore(Q.dom,Z);while(Z)J()}moveSelection(Z){if(this.selectedIndex<0)return;let J=this.view.state.field(x6),Q=p7(J.diagnostics,this.items[Z].diagnostic);if(!Q)return;this.view.dispatch({selection:{anchor:Q.from,head:Q.to},scrollIntoView:!0,effects:sj.of(Q)})}static open(Z){return new cJ(Z)}}function aL(Z,J='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${J}>${encodeURIComponent(Z)}</svg>')`}function pJ(Z){return aL(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${Z}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}var oL=X1.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:0.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:pJ("#f11")},".cm-lintRange-warning":{backgroundImage:pJ("orange")},".cm-lintRange-info":{backgroundImage:pJ("#999")},".cm-lintRange-hint":{backgroundImage:pJ("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});function tL(Z){return Z=="error"?4:Z=="warning"?3:Z=="info"?2:1}function eL(Z){let J="hint",Q=1;for(let X of Z){let Y=tL(X.severity);if(Y>Q)Q=Y,J=X.severity}return J}var ZB=AV(iL,{hideOn:nL}),JB=[x6,X1.decorations.compute([x6],(Z)=>{let{selected:J,panel:Q}=Z.field(x6);return!J||!Q||J.from==J.to?M1.none:M1.set([sL.range(J.from,J.to)])}),ZB,oL];function QK(Z){return new RegExp("^(("+Z.join(")|(")+"))\\b")}var QB=QK(["and","or","not","is"]),oj=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],tj=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function w6(Z){return Z.scopes[Z.scopes.length-1]}function ej(Z){var J="error",Q=Z.delimiters||Z.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,X=[Z.singleOperators,Z.doubleOperators,Z.doubleDelimiters,Z.tripleDelimiters,Z.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/];for(var Y=0;Y<X.length;Y++)if(!X[Y])X.splice(Y--,1);var K=Z.hangingIndent,q=oj,W=tj;if(Z.extra_keywords!=null)q=q.concat(Z.extra_keywords);if(Z.extra_builtins!=null)W=W.concat(Z.extra_builtins);var G=!(Z.version&&Number(Z.version)<3);if(G){var U=Z.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;q=q.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),W=W.concat(["ascii","bytes","exec","print"]);var z=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var U=Z.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;q=q.concat(["exec","print"]),W=W.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var z=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var I=QK(q),V=QK(W);function O(A,B){var L=A.sol()&&B.lastToken!="\\";if(L)B.indent=A.indentation();if(L&&w6(B).type=="py"){var E=w6(B).offset;if(A.eatSpace()){var D=A.indentation();if(D>E)P(A,B);else if(D<E&&C(A,B)&&A.peek()!="#")B.errorToken=!0;return null}else{var l=F(A,B);if(E>0&&C(A,B))l+=" "+J;return l}}return F(A,B)}function F(A,B,L){if(A.eatSpace())return null;if(!L&&A.match(/^#.*/))return"comment";if(A.match(/^[0-9\.]/,!1)){var E=!1;if(A.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i))E=!0;if(A.match(/^[\d_]+\.\d*/))E=!0;if(A.match(/^\.\d+/))E=!0;if(E)return A.eat(/J/i),"number";var D=!1;if(A.match(/^0x[0-9a-f_]+/i))D=!0;if(A.match(/^0b[01_]+/i))D=!0;if(A.match(/^0o[0-7_]+/i))D=!0;if(A.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/))A.eat(/J/i),D=!0;if(A.match(/^0(?![\dx])/i))D=!0;if(D)return A.eat(/L/i),"number"}if(A.match(z)){var l=A.current().toLowerCase().indexOf("f")!==-1;if(!l)return B.tokenize=R(A.current(),B.tokenize),B.tokenize(A,B);else return B.tokenize=N(A.current(),B.tokenize),B.tokenize(A,B)}for(var $=0;$<X.length;$++)if(A.match(X[$]))return"operator";if(A.match(Q))return"punctuation";if(B.lastToken=="."&&A.match(U))return"property";if(A.match(I)||A.match(QB))return"keyword";if(A.match(V))return"builtin";if(A.match(/^(self|cls)\b/))return"self";if(A.match(U)){if(B.lastToken=="def"||B.lastToken=="class")return"def";return"variable"}return A.next(),L?null:J}function N(A,B){while("rubf".indexOf(A.charAt(0).toLowerCase())>=0)A=A.substr(1);var L=A.length==1,E="string";function D($){return function(m,q1){var o=F(m,q1,!0);if(o=="punctuation"){if(m.current()=="{")q1.tokenize=D($+1);else if(m.current()=="}")if($>1)q1.tokenize=D($-1);else q1.tokenize=l}return o}}function l($,m){while(!$.eol())if($.eatWhile(/[^'"\{\}\\]/),$.eat("\\")){if($.next(),L&&$.eol())return E}else if($.match(A))return m.tokenize=B,E;else if($.match("{{"))return E;else if($.match("{",!1))if(m.tokenize=D(0),$.current())return E;else return m.tokenize($,m);else if($.match("}}"))return E;else if($.match("}"))return J;else $.eat(/['"]/);if(L)if(Z.singleLineStringErrors)return J;else m.tokenize=B;return E}return l.isString=!0,l}function R(A,B){while("rubf".indexOf(A.charAt(0).toLowerCase())>=0)A=A.substr(1);var L=A.length==1,E="string";function D(l,$){while(!l.eol())if(l.eatWhile(/[^'"\\]/),l.eat("\\")){if(l.next(),L&&l.eol())return E}else if(l.match(A))return $.tokenize=B,E;else l.eat(/['"]/);if(L)if(Z.singleLineStringErrors)return J;else $.tokenize=B;return E}return D.isString=!0,D}function P(A,B){while(w6(B).type!="py")B.scopes.pop();B.scopes.push({offset:w6(B).offset+A.indentUnit,type:"py",align:null})}function T(A,B,L){var E=A.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:A.column()+1;B.scopes.push({offset:B.indent+(K||A.indentUnit),type:L,align:E})}function C(A,B){var L=A.indentation();while(B.scopes.length>1&&w6(B).offset>L){if(w6(B).type!="py")return!0;B.scopes.pop()}return w6(B).offset!=L}function _(A,B){if(A.sol())B.beginningOfLine=!0,B.dedent=!1;var L=B.tokenize(A,B),E=A.current();if(B.beginningOfLine&&E=="@")return A.match(U,!1)?"meta":G?"operator":J;if(/\S/.test(E))B.beginningOfLine=!1;if((L=="variable"||L=="builtin")&&B.lastToken=="meta")L="meta";if(E=="pass"||E=="return")B.dedent=!0;if(E=="lambda")B.lambda=!0;if(E==":"&&!B.lambda&&w6(B).type=="py"&&A.match(/^\s*(?:#|$)/,!1))P(A,B);if(E.length==1&&!/string|comment/.test(L)){var D="[({".indexOf(E);if(D!=-1)T(A,B,"])}".slice(D,D+1));if(D="])}".indexOf(E),D!=-1)if(w6(B).type==E)B.indent=B.scopes.pop().offset-(K||A.indentUnit);else return J}if(B.dedent&&A.eol()&&w6(B).type=="py"&&B.scopes.length>1)B.scopes.pop();return L}return{name:"python",startState:function(){return{tokenize:O,scopes:[{offset:0,type:"py",align:null}],indent:0,lastToken:null,lambda:!1,dedent:0}},token:function(A,B){var L=B.errorToken;if(L)B.errorToken=!1;var E=_(A,B);if(E&&E!="comment")B.lastToken=E=="keyword"||E=="punctuation"?A.current():E;if(E=="punctuation")E=null;if(A.eol()&&B.lambda)B.lambda=!1;return L?J:E},indent:function(A,B,L){if(A.tokenize!=O)return A.tokenize.isString?null:0;var E=w6(A),D=E.type==B.charAt(0)||E.type=="py"&&!A.dedent&&/^(else:|elif |except |finally:)/.test(B);if(E.align!=null)return E.align-(D?1:0);else return E.offset-(D?K||L.unit:0)},languageData:{autocomplete:oj.concat(tj).concat(["exec","print"]),indentOnInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}}}var XB=function(Z){return Z.split(" ")},ZH=ej({}),Hx=ej({extra_keywords:XB("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")});function dJ(Z){var{statementIndent:J,jsonld:Q}=Z,X=Z.json||Q,Y=Z.typescript,K=Z.wordCharacters||/[\w$\xa1-\uffff]/,q=function(){function H($0){return{type:$0,style:"keyword"}}var M=H("keyword a"),x=H("keyword b"),s=H("keyword c"),J1=H("keyword d"),F1=H("operator"),E1={type:"atom",style:"atom"};return{if:H("if"),while:M,with:M,else:x,do:x,try:x,finally:x,return:J1,break:J1,continue:J1,new:H("new"),delete:s,void:s,throw:s,debugger:H("debugger"),var:H("var"),const:H("var"),let:H("var"),function:H("function"),catch:H("catch"),for:H("for"),switch:H("switch"),case:H("case"),default:H("default"),in:F1,typeof:F1,instanceof:F1,true:E1,false:E1,null:E1,undefined:E1,NaN:E1,Infinity:E1,this:H("this"),class:H("class"),super:H("atom"),yield:s,export:H("export"),import:H("import"),extends:s,await:s}}(),W=/[+\-*&%=<>!?|~^@]/,G=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function U(H){var M=!1,x,s=!1;while((x=H.next())!=null){if(!M){if(x=="/"&&!s)return;if(x=="[")s=!0;else if(s&&x=="]")s=!1}M=!M&&x=="\\"}}var z,I;function V(H,M,x){return z=H,I=x,M}function O(H,M){var x=H.next();if(x=='"'||x=="'")return M.tokenize=F(x),M.tokenize(H,M);else if(x=="."&&H.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return V("number","number");else if(x=="."&&H.match(".."))return V("spread","meta");else if(/[\[\]{}\(\),;\:\.]/.test(x))return V(x);else if(x=="="&&H.eat(">"))return V("=>","operator");else if(x=="0"&&H.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return V("number","number");else if(/\d/.test(x))return H.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),V("number","number");else if(x=="/")if(H.eat("*"))return M.tokenize=N,N(H,M);else if(H.eat("/"))return H.skipToEnd(),V("comment","comment");else if(MN(H,M,1))return U(H),H.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),V("regexp","string.special");else return H.eat("="),V("operator","operator",H.current());else if(x=="`")return M.tokenize=R,R(H,M);else if(x=="#"&&H.peek()=="!")return H.skipToEnd(),V("meta","meta");else if(x=="#"&&H.eatWhile(K))return V("variable","property");else if(x=="<"&&H.match("!--")||x=="-"&&H.match("->")&&!/\S/.test(H.string.slice(0,H.start)))return H.skipToEnd(),V("comment","comment");else if(W.test(x)){if(x!=">"||!M.lexical||M.lexical.type!=">"){if(H.eat("=")){if(x=="!"||x=="=")H.eat("=")}else if(/[<>*+\-|&?]/.test(x)){if(H.eat(x),x==">")H.eat(x)}}if(x=="?"&&H.eat("."))return V(".");return V("operator","operator",H.current())}else if(K.test(x)){H.eatWhile(K);var s=H.current();if(M.lastType!="."){if(q.propertyIsEnumerable(s)){var J1=q[s];return V(J1.type,J1.style,s)}if(s=="async"&&H.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return V("async","keyword",s)}return V("variable","variable",s)}}function F(H){return function(M,x){var s=!1,J1;if(Q&&M.peek()=="@"&&M.match(G))return x.tokenize=O,V("jsonld-keyword","meta");while((J1=M.next())!=null){if(J1==H&&!s)break;s=!s&&J1=="\\"}if(!s)x.tokenize=O;return V("string","string")}}function N(H,M){var x=!1,s;while(s=H.next()){if(s=="/"&&x){M.tokenize=O;break}x=s=="*"}return V("comment","comment")}function R(H,M){var x=!1,s;while((s=H.next())!=null){if(!x&&(s=="`"||s=="$"&&H.eat("{"))){M.tokenize=O;break}x=!x&&s=="\\"}return V("quasi","string.special",H.current())}var P="([{}])";function T(H,M){if(M.fatArrowAt)M.fatArrowAt=null;var x=H.string.indexOf("=>",H.start);if(x<0)return;if(Y){var s=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(H.string.slice(H.start,x));if(s)x=s.index}var J1=0,F1=!1;for(var E1=x-1;E1>=0;--E1){var $0=H.string.charAt(E1),i0=P.indexOf($0);if(i0>=0&&i0<3){if(!J1){++E1;break}if(--J1==0){if($0=="(")F1=!0;break}}else if(i0>=3&&i0<6)++J1;else if(K.test($0))F1=!0;else if(/["'\/`]/.test($0))for(;;--E1){if(E1==0)return;var Q4=H.string.charAt(E1-1);if(Q4==$0&&H.string.charAt(E1-2)!="\\"){E1--;break}}else if(F1&&!J1){++E1;break}}if(F1&&!J1)M.fatArrowAt=E1}var C={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function _(H,M,x,s,J1,F1){if(this.indented=H,this.column=M,this.type=x,this.prev=J1,this.info=F1,s!=null)this.align=s}function A(H,M){for(var x=H.localVars;x;x=x.next)if(x.name==M)return!0;for(var s=H.context;s;s=s.prev)for(var x=s.vars;x;x=x.next)if(x.name==M)return!0}function B(H,M,x,s,J1){var F1=H.cc;if(L.state=H,L.stream=J1,L.marked=null,L.cc=F1,L.style=M,!H.lexical.hasOwnProperty("align"))H.lexical.align=!0;while(!0){var E1=F1.length?F1.pop():X?z1:Z1;if(E1(x,s)){while(F1.length&&F1[F1.length-1].lex)F1.pop()();if(L.marked)return L.marked;if(x=="variable"&&A(H,s))return"variableName.local";return M}}}var L={state:null,column:null,marked:null,cc:null};function E(){for(var H=arguments.length-1;H>=0;H--)L.cc.push(arguments[H])}function D(){return E.apply(null,arguments),!0}function l(H,M){for(var x=M;x;x=x.next)if(x.name==H)return!0;return!1}function $(H){var M=L.state;if(L.marked="def",M.context){if(M.lexical.info=="var"&&M.context&&M.context.block){var x=m(H,M.context);if(x!=null){M.context=x;return}}else if(!l(H,M.localVars)){M.localVars=new t(H,M.localVars);return}}if(Z.globalVars&&!l(H,M.globalVars))M.globalVars=new t(H,M.globalVars)}function m(H,M){if(!M)return null;else if(M.block){var x=m(H,M.prev);if(!x)return null;if(x==M.prev)return M;return new o(x,M.vars,!0)}else if(l(H,M.vars))return M;else return new o(M.prev,new t(H,M.vars),!1)}function q1(H){return H=="public"||H=="private"||H=="protected"||H=="abstract"||H=="readonly"}function o(H,M,x){this.prev=H,this.vars=M,this.block=x}function t(H,M){this.name=H,this.next=M}var Y1=new t("this",new t("arguments",null));function W1(){L.state.context=new o(L.state.context,L.state.localVars,!1),L.state.localVars=Y1}function e(){L.state.context=new o(L.state.context,L.state.localVars,!0),L.state.localVars=null}W1.lex=e.lex=!0;function a(){L.state.localVars=L.state.context.vars,L.state.context=L.state.context.prev}a.lex=!0;function h(H,M){var x=function(){var s=L.state,J1=s.indented;if(s.lexical.type=="stat")J1=s.lexical.indented;else for(var F1=s.lexical;F1&&F1.type==")"&&F1.align;F1=F1.prev)J1=F1.indented;s.lexical=new _(J1,L.stream.column(),H,null,s.lexical,M)};return x.lex=!0,x}function b(){var H=L.state;if(H.lexical.prev){if(H.lexical.type==")")H.indented=H.lexical.indented;H.lexical=H.lexical.prev}}b.lex=!0;function c(H){function M(x){if(x==H)return D();else if(H==";"||x=="}"||x==")"||x=="]")return E();else return D(M)}return M}function Z1(H,M){if(H=="var")return D(h("vardef",M),NQ,c(";"),b);if(H=="keyword a")return D(h("form"),J0,Z1,b);if(H=="keyword b")return D(h("form"),Z1,b);if(H=="keyword d")return L.stream.match(/^\s*$/,!1)?D():D(h("stat"),X0,c(";"),b);if(H=="debugger")return D(c(";"));if(H=="{")return D(h("}"),e,g5,b,a);if(H==";")return D();if(H=="if"){if(L.state.lexical.info=="else"&&L.state.cc[L.state.cc.length-1]==b)L.state.cc.pop()();return D(h("form"),J0,Z1,b,_K)}if(H=="function")return D(E8);if(H=="for")return D(h("form"),e,kK,Z1,a,b);if(H=="class"||Y&&M=="interface")return L.marked="keyword",D(h("form",H=="class"?H:M),wK,b);if(H=="variable")if(Y&&M=="declare")return L.marked="keyword",D(Z1);else if(Y&&(M=="module"||M=="enum"||M=="type")&&L.stream.match(/^\s*\w/,!1))if(L.marked="keyword",M=="enum")return D($K);else if(M=="type")return D(xK,c("operator"),S1,c(";"));else return D(h("form"),z6,c("{"),h("}"),g5,b,b);else if(Y&&M=="namespace")return L.marked="keyword",D(h("form"),z1,Z1,b);else if(Y&&M=="abstract")return L.marked="keyword",D(Z1);else return D(h("stat"),JN);if(H=="switch")return D(h("form"),J0,c("{"),h("}","switch"),e,g5,b,b,a);if(H=="case")return D(z1,c(":"));if(H=="default")return D(c(":"));if(H=="catch")return D(h("form"),W1,f1,Z1,b,a);if(H=="export")return D(h("stat"),HN,b);if(H=="import")return D(h("stat"),ON,b);if(H=="async")return D(Z1);if(M=="@")return D(z1,Z1);return E(h("stat"),z1,c(";"),b)}function f1(H){if(H=="(")return D(I9,c(")"))}function z1(H,M){return J8(H,M,!1)}function P1(H,M){return J8(H,M,!0)}function J0(H){if(H!="(")return E();return D(h(")"),X0,c(")"),b)}function J8(H,M,x){if(L.state.fatArrowAt==L.stream.start){var s=x?jQ:h5;if(H=="(")return D(W1,h(")"),W0(I9,")"),b,c("=>"),s,a);else if(H=="variable")return E(W1,z6,c("=>"),s,a)}var J1=x?U6:S0;if(C.hasOwnProperty(H))return D(J1);if(H=="function")return D(E8,J1);if(H=="class"||Y&&M=="interface")return L.marked="keyword",D(h("form"),jN,b);if(H=="keyword c"||H=="async")return D(x?P1:z1);if(H=="(")return D(h(")"),X0,c(")"),b,J1);if(H=="operator"||H=="spread")return D(x?P1:z1);if(H=="[")return D(h("]"),NN,b,J1);if(H=="{")return Z4(f5,"}",null,J1);if(H=="quasi")return E(y6,J1);if(H=="new")return D(SK(x));return D()}function X0(H){if(H.match(/[;\}\)\],]/))return E();return E(z1)}function S0(H,M){if(H==",")return D(X0);return U6(H,M,!1)}function U6(H,M,x){var s=x==!1?S0:U6,J1=x==!1?z1:P1;if(H=="=>")return D(W1,x?jQ:h5,a);if(H=="operator"){if(/\+\+|--/.test(M)||Y&&M=="!")return D(s);if(Y&&M=="<"&&L.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1))return D(h(">"),W0(S1,">"),b,s);if(M=="?")return D(z1,c(":"),J1);return D(J1)}if(H=="quasi")return E(y6,s);if(H==";")return;if(H=="(")return Z4(P1,")","call",s);if(H==".")return D(QN,s);if(H=="[")return D(h("]"),X0,c("]"),b,s);if(Y&&M=="as")return L.marked="keyword",D(S1,s);if(H=="regexp")return L.state.lastType=L.marked="operator",L.stream.backUp(L.stream.pos-L.stream.start-1),D(J1)}function y6(H,M){if(H!="quasi")return E();if(M.slice(M.length-2)!="${")return D(y6);return D(X0,TK)}function TK(H){if(H=="}")return L.marked="string.special",L.state.tokenize=R,D(y6)}function h5(H){return T(L.stream,L.state),E(H=="{"?Z1:z1)}function jQ(H){return T(L.stream,L.state),E(H=="{"?Z1:P1)}function SK(H){return function(M){if(M==".")return D(H?ZN:eF);else if(M=="variable"&&Y)return D(GN,H?U6:S0);else return E(H?P1:z1)}}function eF(H,M){if(M=="target")return L.marked="keyword",D(S0)}function ZN(H,M){if(M=="target")return L.marked="keyword",D(U6)}function JN(H){if(H==":")return D(b,Z1);return E(S0,c(";"),b)}function QN(H){if(H=="variable")return L.marked="property",D()}function f5(H,M){if(H=="async")return L.marked="property",D(f5);else if(H=="variable"||L.style=="keyword"){if(L.marked="property",M=="get"||M=="set")return D(XN);var x;if(Y&&L.state.fatArrowAt==L.stream.start&&(x=L.stream.match(/^\s*:\s*/,!1)))L.state.fatArrowAt=L.stream.pos+x[0].length;return D(z9)}else if(H=="number"||H=="string")return L.marked=Q?"property":L.style+" property",D(z9);else if(H=="jsonld-keyword")return D(z9);else if(Y&&q1(M))return L.marked="keyword",D(f5);else if(H=="[")return D(z1,l9,c("]"),z9);else if(H=="spread")return D(P1,z9);else if(M=="*")return L.marked="keyword",D(f5);else if(H==":")return E(z9)}function XN(H){if(H!="variable")return E(z9);return L.marked="property",D(E8)}function z9(H){if(H==":")return D(P1);if(H=="(")return E(E8)}function W0(H,M,x){function s(J1,F1){if(x?x.indexOf(J1)>-1:J1==","){var E1=L.state.lexical;if(E1.info=="call")E1.pos=(E1.pos||0)+1;return D(function($0,i0){if($0==M||i0==M)return E();return E(H)},s)}if(J1==M||F1==M)return D();if(x&&x.indexOf(";")>-1)return E(H);return D(c(M))}return function(J1,F1){if(J1==M||F1==M)return D();return E(H,s)}}function Z4(H,M,x){for(var s=3;s<arguments.length;s++)L.cc.push(arguments[s]);return D(h(M,x),W0(H,M),b)}function g5(H){if(H=="}")return D();return E(Z1,g5)}function l9(H,M){if(Y){if(H==":")return D(S1);if(M=="?")return D(l9)}}function YN(H,M){if(Y&&(H==":"||M=="in"))return D(S1)}function EK(H){if(Y&&H==":")if(L.stream.match(/^\s*\w+\s+is\b/,!1))return D(z1,KN,S1);else return D(S1)}function KN(H,M){if(M=="is")return L.marked="keyword",D()}function S1(H,M){if(M=="keyof"||M=="typeof"||M=="infer"||M=="readonly")return L.marked="keyword",D(M=="typeof"?P1:S1);if(H=="variable"||M=="void")return L.marked="type",D(Q8);if(M=="|"||M=="&")return D(S1);if(H=="string"||H=="number"||H=="atom")return D(Q8);if(H=="[")return D(h("]"),W0(S1,"]",","),b,Q8);if(H=="{")return D(h("}"),HQ,b,Q8);if(H=="(")return D(W0(FQ,")"),qN,Q8);if(H=="<")return D(W0(S1,">"),S1);if(H=="quasi")return E(OQ,Q8)}function qN(H){if(H=="=>")return D(S1)}function HQ(H){if(H.match(/[\}\)\]]/))return D();if(H==","||H==";")return D(HQ);return E(J4,HQ)}function J4(H,M){if(H=="variable"||L.style=="keyword")return L.marked="property",D(J4);else if(M=="?"||H=="number"||H=="string")return D(J4);else if(H==":")return D(S1);else if(H=="[")return D(c("variable"),YN,c("]"),J4);else if(H=="(")return E(i9,J4);else if(!H.match(/[;\}\)\],]/))return D()}function OQ(H,M){if(H!="quasi")return E();if(M.slice(M.length-2)!="${")return D(OQ);return D(S1,WN)}function WN(H){if(H=="}")return L.marked="string.special",L.state.tokenize=R,D(OQ)}function FQ(H,M){if(H=="variable"&&L.stream.match(/^\s*[?:]/,!1)||M=="?")return D(FQ);if(H==":")return D(S1);if(H=="spread")return D(FQ);return E(S1)}function Q8(H,M){if(M=="<")return D(h(">"),W0(S1,">"),b,Q8);if(M=="|"||H=="."||M=="&")return D(S1);if(H=="[")return D(S1,c("]"),Q8);if(M=="extends"||M=="implements")return L.marked="keyword",D(S1);if(M=="?")return D(S1,c(":"),S1)}function GN(H,M){if(M=="<")return D(h(">"),W0(S1,">"),b,Q8)}function u5(){return E(S1,UN)}function UN(H,M){if(M=="=")return D(S1)}function NQ(H,M){if(M=="enum")return L.marked="keyword",D($K);return E(z6,l9,S8,IN)}function z6(H,M){if(Y&&q1(M))return L.marked="keyword",D(z6);if(H=="variable")return $(M),D();if(H=="spread")return D(z6);if(H=="[")return Z4(zN,"]");if(H=="{")return Z4(CK,"}")}function CK(H,M){if(H=="variable"&&!L.stream.match(/^\s*:/,!1))return $(M),D(S8);if(H=="variable")L.marked="property";if(H=="spread")return D(z6);if(H=="}")return E();if(H=="[")return D(z1,c("]"),c(":"),CK);return D(c(":"),z6,S8)}function zN(){return E(z6,S8)}function S8(H,M){if(M=="=")return D(P1)}function IN(H){if(H==",")return D(NQ)}function _K(H,M){if(H=="keyword b"&&M=="else")return D(h("form","else"),Z1,b)}function kK(H,M){if(M=="await")return D(kK);if(H=="(")return D(h(")"),VN,b)}function VN(H){if(H=="var")return D(NQ,s9);if(H=="variable")return D(s9);return E(s9)}function s9(H,M){if(H==")")return D();if(H==";")return D(s9);if(M=="in"||M=="of")return L.marked="keyword",D(z1,s9);return E(z1,s9)}function E8(H,M){if(M=="*")return L.marked="keyword",D(E8);if(H=="variable")return $(M),D(E8);if(H=="(")return D(W1,h(")"),W0(I9,")"),b,EK,Z1,a);if(Y&&M=="<")return D(h(">"),W0(u5,">"),b,E8)}function i9(H,M){if(M=="*")return L.marked="keyword",D(i9);if(H=="variable")return $(M),D(i9);if(H=="(")return D(W1,h(")"),W0(I9,")"),b,EK,a);if(Y&&M=="<")return D(h(">"),W0(u5,">"),b,i9)}function xK(H,M){if(H=="keyword"||H=="variable")return L.marked="type",D(xK);else if(M=="<")return D(h(">"),W0(u5,">"),b)}function I9(H,M){if(M=="@")D(z1,I9);if(H=="spread")return D(I9);if(Y&&q1(M))return L.marked="keyword",D(I9);if(Y&&H=="this")return D(l9,S8);return E(z6,l9,S8)}function jN(H,M){if(H=="variable")return wK(H,M);return v5(H,M)}function wK(H,M){if(H=="variable")return $(M),D(v5)}function v5(H,M){if(M=="<")return D(h(">"),W0(u5,">"),b,v5);if(M=="extends"||M=="implements"||Y&&H==","){if(M=="implements")L.marked="keyword";return D(Y?S1:z1,v5)}if(H=="{")return D(h("}"),X8,b)}function X8(H,M){if(H=="async"||H=="variable"&&(M=="static"||M=="get"||M=="set"||Y&&q1(M))&&L.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1))return L.marked="keyword",D(X8);if(H=="variable"||L.style=="keyword")return L.marked="property",D(m5,X8);if(H=="number"||H=="string")return D(m5,X8);if(H=="[")return D(z1,l9,c("]"),m5,X8);if(M=="*")return L.marked="keyword",D(X8);if(Y&&H=="(")return E(i9,X8);if(H==";"||H==",")return D(X8);if(H=="}")return D();if(M=="@")return D(z1,X8)}function m5(H,M){if(M=="!"||M=="?")return D(m5);if(H==":")return D(S1,S8);if(M=="=")return D(P1);var x=L.state.lexical.prev,s=x&&x.info=="interface";return E(s?i9:E8)}function HN(H,M){if(M=="*")return L.marked="keyword",D(RQ,c(";"));if(M=="default")return L.marked="keyword",D(z1,c(";"));if(H=="{")return D(W0(bK,"}"),RQ,c(";"));return E(Z1)}function bK(H,M){if(M=="as")return L.marked="keyword",D(c("variable"));if(H=="variable")return E(P1,bK)}function ON(H){if(H=="string")return D();if(H=="(")return E(z1);if(H==".")return E(S0);return E(p5,yK,RQ)}function p5(H,M){if(H=="{")return Z4(p5,"}");if(H=="variable")$(M);if(M=="*")L.marked="keyword";return D(FN)}function yK(H){if(H==",")return D(p5,yK)}function FN(H,M){if(M=="as")return L.marked="keyword",D(p5)}function RQ(H,M){if(M=="from")return L.marked="keyword",D(z1)}function NN(H){if(H=="]")return D();return E(W0(P1,"]"))}function $K(){return E(h("form"),z6,c("{"),h("}"),W0(RN,"}"),b,b)}function RN(){return E(z6,S8)}function DN(H,M){return H.lastType=="operator"||H.lastType==","||W.test(M.charAt(0))||/[,.]/.test(M.charAt(0))}function MN(H,M,x){return M.tokenize==O&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(M.lastType)||M.lastType=="quasi"&&/\{\s*$/.test(H.string.slice(0,H.pos-(x||0)))}return{name:Z.name,startState:function(H){var M={tokenize:O,lastType:"sof",cc:[],lexical:new _(-H,0,"block",!1),localVars:Z.localVars,context:Z.localVars&&new o(null,null,!1),indented:0};if(Z.globalVars&&typeof Z.globalVars=="object")M.globalVars=Z.globalVars;return M},token:function(H,M){if(H.sol()){if(!M.lexical.hasOwnProperty("align"))M.lexical.align=!1;M.indented=H.indentation(),T(H,M)}if(M.tokenize!=N&&H.eatSpace())return null;var x=M.tokenize(H,M);if(z=="comment")return x;return M.lastType=z=="operator"&&(I=="++"||I=="--")?"incdec":z,B(M,x,z,I,H)},indent:function(H,M,x){if(H.tokenize==N||H.tokenize==R)return null;if(H.tokenize!=O)return 0;var s=M&&M.charAt(0),J1=H.lexical,F1;if(!/^\s*else\b/.test(M))for(var E1=H.cc.length-1;E1>=0;--E1){var $0=H.cc[E1];if($0==b)J1=J1.prev;else if($0!=_K&&$0!=a)break}while((J1.type=="stat"||J1.type=="form")&&(s=="}"||(F1=H.cc[H.cc.length-1])&&(F1==S0||F1==U6)&&!/^[,\.=+\-*:?[\(]/.test(M)))J1=J1.prev;if(J&&J1.type==")"&&J1.prev.type=="stat")J1=J1.prev;var i0=J1.type,Q4=s==i0;if(i0=="vardef")return J1.indented+(H.lastType=="operator"||H.lastType==","?J1.info.length+1:0);else if(i0=="form"&&s=="{")return J1.indented;else if(i0=="form")return J1.indented+x.unit;else if(i0=="stat")return J1.indented+(DN(H,M)?J||x.unit:0);else if(J1.info=="switch"&&!Q4&&Z.doubleIndentSwitch!=!1)return J1.indented+(/^(?:case|default)\b/.test(M)?x.unit:2*x.unit);else if(J1.align)return J1.column+(Q4?0:1);else return J1.indented+(Q4?0:x.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:X?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}var Fx=dJ({name:"javascript"}),Nx=dJ({name:"json",json:!0}),Rx=dJ({name:"json",jsonld:!0}),JH=dJ({name:"typescript",typescript:!0});var lJ="";function YB(Z){let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.head),X=J.selection.main.head,Y=X===Q.to?Math.min(Q.to+1,J.doc.length):Q.to;if(X===Y)return!1;return lJ=J.sliceDoc(X,Y),Z.dispatch({changes:{from:X,to:Y},userEvent:"delete"}),!0}function KB(Z){if(!lJ)return!1;let{from:J,to:Q}=Z.state.selection.main;return Z.dispatch({changes:{from:J,to:Q,insert:lJ},selection:{anchor:J+lJ.length},userEvent:"input"}),!0}var qB=FJ.of([{key:"Ctrl-f",run:hJ},{key:"Ctrl-b",run:$J},{key:"Ctrl-n",run:uJ},{key:"Ctrl-p",run:gJ},{key:"Ctrl-a",run:r3},{key:"Ctrl-e",run:a3},{key:"Alt-f",run:i3},{key:"Alt-b",run:s3},{key:"Ctrl-d",run:vJ},{key:"Alt-d",run:o3},{key:"Ctrl-k",run:YB},{key:"Ctrl-y",run:KB},{key:"Ctrl-v",run:v7},{key:"Alt-v",run:j5},{key:"Alt-Shift-,",run:kJ},{key:"Alt-Shift-.",run:xJ}]),Z9=D1.define(),q0={count:"",operator:null,pending:""},c7=H0.define({create:()=>({mode:"normal",...q0}),update(Z,J){for(let Q of J.effects)if(Q.is(Z9))Z={...Z,...Q.value};return Z}}),v9={text:"",linewise:!1};function y0(Z,J){Z.dispatch({effects:Z9.of(J)})}function B8(Z,J){return J>=0&&J<Z.length?Z.sliceString(J,J+1):""}function P8(Z){if(!Z||/\s/.test(Z))return"space";return/[A-Za-z0-9_]/.test(Z)?"word":"punct"}function WB(Z,J){let Q=J,X=P8(B8(Z,Q));if(X!=="space")while(Q<Z.length&&P8(B8(Z,Q))===X)Q++;while(Q<Z.length&&P8(B8(Z,Q))==="space")Q++;return Q}function GB(Z,J){let Q=J-1;while(Q>=0&&P8(B8(Z,Q))==="space")Q--;if(Q<0)return 0;let X=P8(B8(Z,Q));while(Q>=0&&P8(B8(Z,Q))===X)Q--;return Q+1}function UB(Z,J){let Q=J+1;while(Q<Z.length&&P8(B8(Z,Q))==="space")Q++;if(Q>=Z.length)return Math.max(0,Z.length-1);let X=P8(B8(Z,Q));while(Q+1<Z.length&&P8(B8(Z,Q+1))===X)Q++;return Q}function m9(Z){return Z.from+/^\s*/.exec(Z.text)[0].length}function F5(Z,J,Q,X){let{doc:Y,selection:K}=Z.state,q=K.main.head,W=Y.lineAt(q),G=Q||1;switch(J){case"h":return{pos:Math.max(W.from,q-G)};case"l":return{pos:Math.min(X?W.to:Math.max(W.from,W.to-1),q+G)};case"j":case"k":{let U=K.main;for(let z=0;z<G;z++)U=Z.moveVertically(U,J==="j");return{pos:U.head,linewise:!0}}case"w":{let U=q;for(let z=0;z<G;z++)U=WB(Y,U);return{pos:U}}case"b":{let U=q;for(let z=0;z<G;z++)U=GB(Y,U);return{pos:U}}case"e":{let U=q;for(let z=0;z<G;z++)U=UB(Y,U);return{pos:U,inclusive:!0}}case"0":return{pos:W.from};case"^":return{pos:m9(W)};case"$":return{pos:X?W.to:Math.max(W.from,W.to-1)};case"gg":case"G":{let U=Q?Math.min(Math.max(Q,1),Y.lines):J==="gg"?1:Y.lines;return{pos:m9(Y.line(U)),linewise:!0}}default:return null}}function c0(Z,J){let{doc:Q}=Z.state,X=Math.max(0,Math.min(J,Q.length)),Y=Q.lineAt(X);Z.dispatch({selection:{anchor:Math.min(X,Math.max(Y.from,Y.to-1))},scrollIntoView:!0})}function nJ(Z,J){let Q=Z9.of({mode:"insert",...q0});if(J===void 0)Z.dispatch({effects:Q});else Z.dispatch({selection:{anchor:J},effects:Q,scrollIntoView:!0})}function zB(Z){let{head:J}=Z.state.selection.main,Q=Z.state.doc.lineAt(J);Z.dispatch({selection:{anchor:J>Q.from?J-1:J},effects:Z9.of({mode:"normal",...q0})})}function IB(Z,J,Q){let X=Z.lineAt(J),Y=Z.line(Math.min(X.number+Math.max(Q,1)-1,Z.lines)),K=Z.sliceString(X.from,Y.to)+`
`;if(Y.to<Z.length)return{from:X.from,to:Y.to+1,text:K};return{from:Math.max(0,X.from-1),to:Y.to,text:K}}function YK(Z,J,Q,X){let Y=Math.min(Q,X),K=Math.max(Q,X);if(v9={text:Z.state.sliceDoc(Y,K),linewise:!1},J==="y"){c0(Z,Y);return}if(J==="d"){Z.dispatch({changes:{from:Y,to:K},userEvent:"delete"}),c0(Z,Y);return}Z.dispatch({changes:{from:Y,to:K},selection:{anchor:Y},effects:Z9.of({mode:"insert",...q0}),userEvent:"delete",scrollIntoView:!0})}function sJ(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head;if(J==="c"){let W=X.lineAt(Y),G=X.line(Math.min(W.number+Math.max(Q,1)-1,X.lines)),U=m9(W);v9={text:X.sliceString(U,G.to)+`
`,linewise:!0},Z.dispatch({changes:{from:U,to:G.to},selection:{anchor:U},effects:Z9.of({mode:"insert",...q0}),userEvent:"delete",scrollIntoView:!0});return}let K=IB(X,Y,Q);if(v9={text:K.text,linewise:!0},J==="y"){c0(Z,X.lineAt(Y).from);return}Z.dispatch({changes:{from:K.from,to:K.to},userEvent:"delete"});let q=Math.min(K.from,Z.state.doc.length);c0(Z,m9(Z.state.doc.lineAt(q)))}function QH(Z,J,Q){if(!v9.text)return;let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=v9.text.repeat(Math.max(Q,1)),q=X.lineAt(Y);if(v9.linewise){let G=K.endsWith(`
`)?K.slice(0,-1):K,U=J?q.to:q.from,z=J?`
`+G:G+`
`;Z.dispatch({changes:{from:U,insert:z},userEvent:"input.paste"});let I=J?q.to+1:q.from;c0(Z,m9(Z.state.doc.lineAt(I)));return}let W=J?Math.min(Y+1,q.to):Y;Z.dispatch({changes:{from:W,insert:K},userEvent:"input.paste"}),c0(Z,W+K.length-1)}function XH(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=/^\s*/.exec(X.text)[0],K=J?X.to:X.from,q=J?`
`+Y:Y+`
`;Z.dispatch({changes:{from:K,insert:q},selection:{anchor:K+q.length-(J?0:1)},effects:Z9.of({mode:"insert",...q0}),userEvent:"input",scrollIntoView:!0})}function VB(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=X.to,K=0;for(let W=Math.max(J-1,1);W>0;W--){let G=Q.lineAt(Y).number+1;if(G>Q.lines)break;Y=Q.line(G).to,K++}if(!K)return;let q=Q.sliceString(X.from,Y).replace(/\n\s*/g," ");Z.dispatch({changes:{from:X.from,to:Y,insert:q},userEvent:"input"}),c0(Z,X.from+X.text.replace(/\s+$/,"").length)}function XK(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=X.lineAt(Y),q=Math.min(K.to,Y+Math.max(J,1));if(q===Y)return;if(v9={text:X.sliceString(Y,q),linewise:!1},Q){Z.dispatch({changes:{from:Y,to:q},selection:{anchor:Y},effects:Z9.of({mode:"insert",...q0}),userEvent:"delete"});return}Z.dispatch({changes:{from:Y,to:q},userEvent:"delete"}),c0(Z,Y)}function YH(Z,J,Q,X){let Y=Z.state.selection.main.head,K=F5(Z,Q,X,!0);if(!K){y0(Z,q0);return}if(K.linewise){let{doc:W}=Z.state,G=W.lineAt(Y).number,U=W.lineAt(Math.max(0,Math.min(K.pos,W.length))).number,z=W.line(Math.min(G,U));if(c0(Z,z.from),sJ(Z,J,Math.abs(U-G)+1),J!=="c")y0(Z,q0);return}let q=K.inclusive?K.pos+1:K.pos;if(YK(Z,J,Y,q),J!=="c")y0(Z,q0)}var jB=new Set(["Enter","Backspace","Delete","Tab"]);function HB(Z,J,Q){let X=J.key,Y=Q.count?parseInt(Q.count,10):0;if(J.ctrlKey){if(X==="r")return V5(Z)||!0;if(X==="d")return v7(Z)||!0;if(X==="u")return j5(Z)||!0;if(X==="[")return y0(Z,q0),!0;return!1}if(X==="Escape")return y0(Z,q0),!0;if(jB.has(X)){if(X==="Enter"){let U=F5(Z,"j",Y,!1);if(U)c0(Z,m9(Z.state.doc.lineAt(U.pos)))}else if(X==="Backspace"){let U=F5(Z,"h",Y,!1);if(U)c0(Z,U.pos)}else if(X==="Delete")XK(Z,Y||1,!1);return y0(Z,q0),!0}if(X.length!==1)return!1;if(/[1-9]/.test(X)||X==="0"&&Q.count)return y0(Z,{count:Q.count+X}),!0;if(Q.pending==="g"){if(X==="g")if(Q.operator)YH(Z,Q.operator,"gg",Y);else{let U=F5(Z,"gg",Y,!1);c0(Z,U.pos),y0(Z,q0)}else y0(Z,q0);return!0}if(X==="g")return y0(Z,{pending:"g"}),!0;if(Q.operator){if(X===Q.operator){if(sJ(Z,Q.operator,Y||1),Q.operator!=="c")y0(Z,q0)}else YH(Z,Q.operator,X,Y);return!0}if(X==="d"||X==="c"||X==="y")return y0(Z,{operator:X}),!0;let K=F5(Z,X,Y,!1);if(K)return c0(Z,K.pos),y0(Z,q0),!0;let{doc:q}=Z.state,W=Z.state.selection.main.head,G=q.lineAt(W);switch(X){case"i":nJ(Z,W);break;case"a":nJ(Z,Math.min(W+1,G.to));break;case"I":nJ(Z,m9(G));break;case"A":nJ(Z,G.to);break;case"o":XH(Z,!0);break;case"O":XH(Z,!1);break;case"x":XK(Z,Y||1,!1);break;case"s":XK(Z,Y||1,!0);break;case"S":sJ(Z,"c",Y||1);break;case"D":YK(Z,"d",W,G.to);break;case"C":YK(Z,"c",W,G.to);break;case"Y":sJ(Z,"y",Y||1);break;case"p":QH(Z,!0,Y||1);break;case"P":QH(Z,!1,Y||1);break;case"J":VB(Z,Y||1);break;case"u":bJ(Z);break;default:break}return y0(Z,q0),!0}function OB(Z,J){let Q=J.state.field(c7,!1);if(!Q)return!1;if(Z.metaKey||Z.altKey)return!1;if(Z.key==="Shift"||Z.key==="Control")return!1;if(Z.key==="Alt"||Z.key==="Meta")return!1;if(Q.mode==="insert"){if(Z.key==="Escape"||Z.ctrlKey&&Z.key==="[")return zB(J),Z.preventDefault(),!0;return!1}if(!HB(J,Z,Q))return!1;return Z.preventDefault(),Z.stopPropagation(),!0}function FB(Z){let J=document.createElement("div");J.className="cm-vim-panel";let Q=(X)=>{let Y=X.field(c7,!1);if(!Y)return;let K=Y.count+(Y.operator??"")+Y.pending;J.textContent=(Y.mode==="insert"?"-- INSERT --":"-- NORMAL --")+(K?"  "+K:"")};return Q(Z.state),{dom:J,bottom:!0,update:(X)=>Q(X.state)}}var NB=[c7,X1.domEventHandlers({keydown:OB}),X1.inputHandler.of((Z)=>{let J=Z.state.field(c7,!1);return!!J&&J.mode!=="insert"}),X1.editorAttributes.compute([c7],(Z)=>{let J=Z.field(c7,!1);return J&&J.mode!=="insert"?{class:"cm-vim-normal"}:{}}),k7.of(FB)],RB=new Set(["as","assert","auto","case","const","delegate","derive","echo","else","fn","if","implement","import","let","macro","opaque","panic","pub","test","todo","type","use"]),DB=g9.define({name:"gleam",token(Z){if(Z.eatSpace())return null;if(Z.match("//"))return Z.skipToEnd(),"comment";if(Z.peek()==='"'){Z.next();let Q=!1;while(!Z.eol()){let X=Z.next();if(Q)Q=!1;else if(X==="\\")Q=!0;else if(X==='"')break}return"string"}if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9]*/))return"typeName";if(Z.match(/^[a-z_][a-z0-9_]*/))return RB.has(Z.current())?"keyword":"variableName";if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}#".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"//"},closeBrackets:{brackets:["(","[","{",'"']}}}),MB=new Set(["after","and","case","catch","cond","def","defdelegate","defexception","defguard","defimpl","defmacro","defmodule","defp","defprotocol","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","rescue","try","unless","unquote","use","when","with"]),AB=new Set(["true","false","nil"]),LB=g9.define({name:"elixir",token(Z){if(Z.eatSpace())return null;if(Z.match("#"))return Z.skipToEnd(),"comment";if(Z.match('"""')||Z.match("'''"))return Z.skipToEnd(),"string";if(Z.peek()==='"'||Z.peek()==="'"){let Q=Z.next(),X=!1;while(!Z.eol()){let Y=Z.next();if(X)X=!1;else if(Y==="\\")X=!0;else if(Y===Q)break}return"string"}if(Z.match(/^~[a-zA-Z]/)){let Q=Z.next(),X={"(":")","[":"]","{":"}","<":">"}[Q]??Q;while(!Z.eol()&&Z.next()!==X);return Z.match(/^[a-z]*/),"string"}if(Z.match(/^[@^][a-z_][A-Za-z0-9_]*/))return"variableName";if(Z.match(/^:"[^"]*"/)||Z.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/))return"atom";if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9_]*/))return"typeName";if(Z.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)){let Q=Z.current();if(MB.has(Q))return"keyword";if(AB.has(Q))return"atom";return"variableName"}if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("=>")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("===")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{",'"']}}}),BB=u7.define([{tag:g.keyword,color:"#bb9af7"},{tag:g.string,color:"#9ece6a"},{tag:g.comment,color:"#565f89",fontStyle:"italic"},{tag:g.number,color:"#ff9e64"},{tag:g.typeName,color:"#2ac3de"},{tag:g.variableName,color:"#c0caf5"},{tag:g.operator,color:"#89ddff"},{tag:g.bracket,color:"#a9b1d6"}]),PB=X1.theme({"&":{backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"14px",height:"100%"},".cm-content":{caretColor:"var(--accent)",fontFamily:"inherit",padding:"12px 0"},".cm-gutters":{backgroundColor:"var(--bg-secondary)",color:"var(--text-secondary)",border:"none",opacity:"0.7"},".cm-activeLine":{backgroundColor:"rgba(65, 72, 104, 0.3)"},".cm-activeLineGutter":{backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--bg-hover)"},".cm-cursor":{borderLeftColor:"var(--accent)"}},{dark:!0});function KH(Z){switch(Z){case"vim":return N8.highest(NB);case"emacs":return N8.highest(qB);default:return[]}}function qH(Z){switch(Z){case"python":return g9.define(ZH);case"typescript":return g9.define(JH);case"elixir":return LB;default:return DB}}class WH extends HTMLElement{static observedAttributes=["keymap","language"];#Z=null;#q="";#X=[];#J=new C9;#Q=new C9;set doc(Z){if(this.#q=Z??"",this.#Z&&this.#Z.state.doc.toString()!==this.#q)this.#Z.dispatch({changes:{from:0,to:this.#Z.state.doc.length,insert:this.#q}})}get doc(){return this.#Z?this.#Z.state.doc.toString():this.#q}set diagnostics(Z){if(this.#X=Array.isArray(Z)?Z:[],this.#Z)this.#K()}get#Y(){return this.getAttribute("keymap")??"default"}get#W(){return this.getAttribute("language")??"gleam"}attributeChangedCallback(Z,J,Q){if(!this.#Z)return;switch(Z){case"keymap":this.#Z.dispatch({effects:this.#J.reconfigure(KH(this.#Y))});break;case"language":this.#Z.dispatch({effects:this.#Q.reconfigure(qH(this.#W))});break}}connectedCallback(){if(this.#Z)return;let Z=X1.updateListener.of((J)=>{if(J.docChanged)this.dispatchEvent(new CustomEvent("editor-change",{detail:{value:J.state.doc.toString()},bubbles:!0}))});if(this.#Z=new X1({state:R1.create({doc:this.#q,extensions:[this.#J.of(KH(this.#Y)),BV(),Oj(),FV(),Jj(),RV(),f7.of("  "),this.#Q.of(qH(this.#W)),aV(BB),PB,FJ.of([pj,...mj,...Rj]),Z]}),parent:this}),this.#X.length>0)this.#K()}disconnectedCallback(){this.#Z?.destroy(),this.#Z=null}#K(){let Z=this.#Z.state.doc,J=this.#X.flatMap((Q)=>{if(!Q||typeof Q.line!=="number")return[];let X=Z.line(Math.min(Math.max(Q.line,1),Z.lines)),Y=Math.min(X.from+Math.max((Q.column??1)-1,0),X.to),q=X.text.slice(Y-X.from).match(/^\S+/),W=Math.min(Y+(q?q[0].length:1),Z.length);return[{from:Y,to:Math.max(W,Math.min(Y+1,Z.length)),severity:"error",message:String(Q.message??"")}]});this.#Z.dispatch(nj(this.#Z.state,J))}}function KK(){if(!customElements.get("gleam-editor"))customElements.define("gleam-editor",WH)}class N5 extends S{constructor(Z,J,Q){super();this.line=Z,this.column=J,this.message=Q}}function GH(Z){return Z0("gleam-editor",Z,d)}function UH(Z){return B4("doc",Y0(Z))}function zH(Z){return e1("keymap",Z)}function IH(Z){return e1("language",Z)}function VH(Z){return B4("diagnostics",w8(Z,(J)=>{return A9(j([["line",m6(J.line)],["column",m6(J.column)],["message",Y0(J.message)]]))}))}function jH(Z){return f4("editor-change",J7(j(["detail","value"]),k1,(J)=>{return $1(Z(J))}))}class d7 extends S{}var n7=new d7;class p9 extends S{}var iJ=new p9;class J9 extends S{constructor(Z,J,Q){super();this.category=Z,this.subcategory=J,this.title=Q}}class l7 extends S{}var TB=new l7;class rJ extends S{}var qK=new rJ;class s7 extends S{}var OH=new s7;class aJ extends S{constructor(Z){super();this[0]=Z}}class WK extends S{constructor(Z,J,Q,X){super();this.label=Z,this.expected=J,this.actual=Q,this.passed=X}}class GK extends S{constructor(Z,J,Q,X,Y){super();this.phase=Z,this.file=J,this.line=Q,this.column=X,this.message=Y}}class Q9 extends S{constructor(Z){super();this[0]=Z}}class X9 extends S{constructor(Z){super();this[0]=Z}}class UK extends S{}var zK=new UK;class oJ extends S{}var R5=new oJ;class Y9 extends S{constructor(Z){super();this.id=Z}}class K9 extends S{constructor(Z){super();this[0]=Z}}class q9 extends S{}var tJ=new q9;class IK extends S{}var D5=new IK;class A1 extends S{constructor(Z,J,Q,X,Y,K,q,W,G,U,z,I,V,O,F,N){super();this.route=Z,this.selected_category=J,this.selected_subcategory=Q,this.selected=X,this.problem_index=Y,this.iteration_count=K,this.current_iteration=q,this.draft=W,this.revealed_solution=G,this.runtimes=U,this.run=z,this.drafts=I,this.attempts=V,this.search=O,this.next_run_id=F,this.editor_keymap=N}}class M5 extends S{constructor(Z){super();this[0]=Z}}class A5 extends S{constructor(Z){super();this[0]=Z}}class L5 extends S{constructor(Z){super();this[0]=Z}}class T8 extends S{constructor(Z){super();this[0]=Z}}class eJ extends S{}var FH=new eJ;class ZQ extends S{}var NH=new ZQ;class B5 extends S{constructor(Z){super();this[0]=Z}}class JQ extends S{}var RH=new JQ;class P5 extends S{}var DH=new P5;class T5 extends S{constructor(Z){super();this[0]=Z}}class i7 extends S{constructor(Z){super();this[0]=Z}}class QQ extends S{}var MH=new QQ;class S5 extends S{constructor(Z){super();this[0]=Z}}class E5 extends S{constructor(Z){super();this[0]=Z}}class r7 extends S{constructor(Z){super();this[0]=Z}}class XQ extends S{}var AH=new XQ;class C5 extends S{}var LH=new C5;class c9 extends S{constructor(Z){super();this.language=Z}}class W9 extends S{constructor(Z,J){super();this.language=Z,this.message=J}}class a7 extends S{constructor(Z,J){super();this.id=Z,this.outcome=J}}class YQ extends S{constructor(Z){super();this.id=Z}}function d9(){return new A1(n7,V1,V1,d,0,3,1,"",V1,d,R5,d,d,"",1,"default")}function o7(Z,J){return Yq(Z,(Q)=>{if(B1(Q[0],J))return new v(Q[1]);else return new L1(void 0)})}function _5(Z,J){let Q=o7(Z.runtimes,J);if(Q instanceof v)return Q[0];else return TB}function b6(Z,J,Q){return k([J,Q],r0(Z,(X)=>{return!B1(X[0],J)}))}function e6(Z){let J=Z.selected,Q=t5(J,Z.problem_index);return a5(Q)}class KQ extends S{}var qQ=new KQ;class WQ extends S{}var GQ=new WQ;class UQ extends S{}var BH=new UQ;class PH extends S{}var TH=new PH;class f extends S{constructor(Z,J,Q){super();this.signature=Z,this.starter=J,this.harness=Q}}class d0 extends S{constructor(Z,J){super();this.label=Z,this.code=J}}class n0 extends S{constructor(Z,J,Q,X,Y,K){super();this.title=Z,this.prompt=J,this.approach=Q,this.solutions=X,this.language=Y,this.check=K}}class T1 extends S{constructor(Z,J){super();this.name=Z,this.problems=J}}class l0 extends S{constructor(Z,J){super();this.name=Z,this.subcategories=J}}function SH(Z){if(Z instanceof KQ)return"Python";else if(Z instanceof WQ)return"Gleam";else if(Z instanceof UQ)return"TypeScript";else return"Elixir"}function x5(Z){if(Z instanceof KQ)return"python";else if(Z instanceof WQ)return"gleam";else if(Z instanceof UQ)return"typescript";else return"elixir"}function G6(Z){if(Z==="Contains Duplicate")return"A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n).";else if(Z==="Valid Anagram")return"A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative.";else if(Z==="Two Sum")return"A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n²).";else if(Z==="Group Anagrams")return"A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups.";else if(Z==="Top K Frequent Elements")return"Count, then select. Build a value-to-frequency map first; then pick the k largest counts — sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n.";else if(Z==="Product of Array Except Self")return"A prefix/suffix problem. The answer at position i is (product of everything before i) × (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise — no division needed.";else if(Z==="Longest Consecutive Sequence")return"A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk.";else if(Z==="Valid Palindrome")return"Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse — same complexity, pick whichever reads better in your language.";else if(Z==="Two Sum II - Input Array Is Sorted")return"A two-pointer convergence problem — the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory.";else if(Z==="3Sum")return"Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip.";else if(Z==="Container With Most Water")return"Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help — always move the shorter one inwards and track the best area seen.";else if(Z==="Best Time to Buy and Sell Stock")return"A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables.";else if(Z==="Longest Substring Without Repeating Characters")return"A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen.";else if(Z==="Longest Repeating Character Replacement")return"A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window.";else if(Z==="Permutation in String")return"A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies — slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps.";else if(Z==="Valid Parentheses")return"A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack.";else if(Z==="Min Stack")return"Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1).";else if(Z==="Daily Temperatures")return"A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry — the popped days just found their warmer day — then pushes itself.";else if(Z==="Binary Search")return"The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step.";else if(Z==="Find Minimum in Rotated Sorted Array")return"Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point — and the minimum — hides in the unsorted half.";else if(Z==="Search in Rotated Sorted Array")return"Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it — recurse into that half or the other.";else if(Z==="Pattern matching on lists")return"In Gleam a list is either [] or [head, ..tail] — every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail.";else if(Z==="Tail recursion with accumulators")return"The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop — no stack growth.";else if(Z==="fold is the loop")return"Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values.";else if(Z==="Frequency maps with dict.upsert")return"dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside.";else if(Z==="Result chains with use")return"use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results.";else if(Z==="Option ergonomics")return"Chains of option.map / option.unwrap / option.from_result express “use it if present, fall back if not” without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value.";else if(Z==="String prefix patterns and graphemes")return'Gleam can pattern-match string prefixes directly: "# " <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions.';else if(Z==="Pipelines")return"The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline.";else if(Z==="Records: labelled args and update syntax")return"Records are immutable: construction uses labelled arguments, and “modifying” one is Record(..old, field: new) — a copy with some fields swapped. Updates return the new record; nothing changes in place.";else if(Z==="gleam/set for membership and dedupe")return"Membership questions want a set, not a list — contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new.";else if(Z==="Counter for frequency maps")return"collections.Counter is the counting idiom: feed it any iterable and it's a dict of value → count, with missing keys reading as 0 and most_common(k) giving the top k — no manual dict bookkeeping.";else if(Z==="defaultdict for grouping")return"collections.defaultdict removes the “is the key there yet?” dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership.";else if(Z==="deque for O(1) popleft")return"Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm — breadth-first search above all — wants a deque: append to the right, popleft from the left.";else if(Z==="heapq for min/max heaps")return"heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap — negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection.";else if(Z==="Enumerate, zip, and unpacking")return"enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly — between them, almost no loop needs range(len(...)).";else if(Z==="Slicing and reversal")return"Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate — every slice is a new sequence.";else if(Z==="Sorting with a key")return"sort/sorted take a key function that maps each element to what it should be compared by — len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list.";else if(Z==="Building strings efficiently")return"Strings are immutable, so building one with += in a loop re-copies everything each time — O(n²). Collect the pieces in a list and ''.join(parts) once at the end for O(n).";else return""}class u extends S{constructor(Z,J){super();this.solutions=Z,this.check=J}}function EH(){return new u(j([["Solution 1",`import gleam/set

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
}`],["Solution 2 · Sorting",`import gleam/int
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
}`]]),new f("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
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
}`))}function CH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorting",`import gleam/list
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
}`]]),new f("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
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
}`))}function _H(){return new u(j([["Solution 1",`import gleam/dict

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
}`],["Solution 2 · Brute force",`import gleam/list

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
}`],["Solution 3 · Sorted two pointer",`import gleam/int
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
}`]]),new f("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
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
}`))}function kH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Count key",`import gleam/dict
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
}`]]),new f("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
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
}`))}function xH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Bucket sort",`import gleam/dict
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
}`]]),new f("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
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
}`))}function wH(){return new u(j([["Solution 1",`import gleam/list

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
}`],["Solution 2 · Brute force",`import gleam/list

/// The obvious O(n²) reading of the problem: for each slot, multiply everything
/// that is not in it. Worth knowing as the thing the prefix/suffix trick beats.
pub fn product_except_self(nums: List(Int)) -> List(Int) {
  list.index_map(nums, fn(_, i) {
    list.index_fold(nums, 1, fn(product, n, j) {
      case i == j {
        True -> product
        False -> product * n
      }
    })
  })
}`]]),new f("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
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
}`))}function bH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Sorting",`import gleam/int
import gleam/list

/// No set: sort, then walk once counting runs. O(n log n) rather than O(n), but
/// it needs no extra structure and the run logic is easier to hold in your head.
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
}`]]),new f("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
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
}`))}function yH(){return new u(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Two pointers",`import gleam/list
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
}`]]),new f("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
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
}`))}function $H(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Binary search",`import gleam/int
import gleam/list
import gleam/order

/// Instead of converging two pointers, fix each number and binary search the
/// tail for its complement — O(n log n), and it reuses the binary search you
/// already know rather than a second pointer discipline.
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
}`]]),new f(`pub fn two_sum_sorted(
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
}`))}function hH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

/// Every triple, checked. Sorting first means each triple comes out in
/// ascending order, so \`list.unique\` is enough to collapse the duplicates that
/// repeated values produce — no set needed.
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
}`]]),new f("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
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
}`))}function fH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

/// Every pair of lines, measured. O(n²), but it makes the thing the two-pointer
/// sweep is actually maximising explicit: shorter line times distance.
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
}`]]),new f("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
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
}`))}function gH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Brute force",`import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [buy, ..later] -> int.max(best_sale(buy, later), max_profit(later))
  }
}

fn best_sale(buy: Int, later: List(Int)) -> Int {
  list.fold(later, 0, fn(best, sell) { int.max(best, sell - buy) })
}`]]),new f("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
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
}`))}function uH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Shrinking window",`import gleam/int
import gleam/list
import gleam/string

/// The window itself is the bookkeeping: when a character repeats, drop
/// everything up to and including its earlier copy. No last-seen dictionary,
/// at the cost of scanning the window on each repeat.
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
}`]]),new f("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
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
}`))}function vH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Per character",`import gleam/int
import gleam/list
import gleam/string

/// One sweep per distinct character, asking a much simpler question each time:
/// how long a window can I hold if *this* is the character I keep? The answer
/// is the best of those. No running frequency map, no max-count bookkeeping.
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
}`]]),new f("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
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
}`))}function mH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorted windows",`import gleam/list
import gleam/string

/// Every window of the right length, sorted and compared against the sorted
/// needle. Slower than sliding counts, but there is no incremental state to get
/// wrong — the whole method is "is this window an anagram?".
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
}`]]),new f("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
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
}`))}function pH(){return new u(j([["Solution 1",`import gleam/string

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
}`],["Solution 2 · Reduction",`import gleam/string

/// No stack: strip every matched pair, over and over, until nothing more can
/// go. Whatever survives is unmatched, so the string was balanced exactly when
/// nothing survives. This is why "([)]" fails — neither pair is ever adjacent.
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
}`]]),new f("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
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
}`))}function cH(){return new u(j([["Solution 1",`import gleam/int

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
}`],["Solution 2 · Two stacks",`import gleam/int

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
}`]]),new f(`pub type MinStack {
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
}`))}function dH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Brute force",`import gleam/list

/// For each day, scan forward until it gets warmer. O(n²), and the direct
/// reading of the question — the monotonic stack exists only to avoid rescanning
/// the same cold stretch once per day.
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
}`]]),new f("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
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
}`))}function nH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · First match scan",`import gleam/list

/// The O(n) baseline the binary search beats: scan with an index. Worth
/// contrasting with the halving version to see what the sortedness buys.
pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  list.index_fold(nums, Error(Nil), fn(found, n, i) {
    case found, n == target {
      Error(Nil), True -> Ok(i)
      _, _ -> found
    }
  })
}`]]),new f("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function lH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Linear scan",`/// O(n) rather than O(log n), but it makes the shape of the problem obvious:
/// a rotated sorted array has exactly one place where a value drops, and that
/// drop is the minimum. No drop means it was never rotated, so the head wins.
pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`]]),new f("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`))}function sH(){return new u(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Find pivot",`import gleam/int
import gleam/list
import gleam/order

/// Two plain steps instead of one clever one: find where the rotation wrapped,
/// which splits the input into two ordinary sorted arrays, then binary search
/// each. Nothing has to reason about which half is sorted mid-search.
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
}`]]),new f("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function iH(){return new u(j([["Solution 1",`pub fn length(items: List(a)) -> Int {
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
}`],["Solution 2 · Stdlib",`import gleam/list

/// The same two answers straight from the standard library. Writing the
/// recursion by hand is how you learn the shape; reaching for these is what you
/// actually do afterwards.
pub fn length(items: List(a)) -> Int {
  list.length(items)
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  list.last(items)
}`]]),new f(`pub fn length(items: List(a)) -> Int

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
}`))}function rH(){return new u(j([["Solution 1",`pub fn reverse(items: List(a)) -> List(a) {
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
}`],["Solution 2 · Fold",`import gleam/list

/// A fold *is* a tail-recursive loop with a name: the accumulator is the second
/// argument, the step function is the body. Once you see that, most hand-written
/// \`*_loop\` helpers turn into one line.
pub fn reverse(items: List(a)) -> List(a) {
  list.fold(items, [], fn(acc, item) { [item, ..acc] })
}

pub fn sum(numbers: List(Int)) -> Int {
  list.fold(numbers, 0, fn(acc, n) { acc + n })
}`]]),new f(`pub fn reverse(items: List(a)) -> List(a)

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
}`))}function aH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Explicit recursion",`import gleam/int
import gleam/list

/// What each fold expands to. Useful to write once so the folded version stops
/// looking like magic — and to notice that \`count_if\` here is not tail
/// recursive, while the fold always is.
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
}`]]),new f(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

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
}`))}function oH(){return new u(j([["Solution 1",`import gleam/dict
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
}`],["Solution 2 · Sorted runs",`import gleam/dict
import gleam/list
import gleam/string

/// Group by sorting instead of by lookup: once the words are in order, equal
/// ones are adjacent, so counting is a single pass that never searches for
/// anything. The dictionary is built at the end, from finished pairs.
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
}`]]),new f("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
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
}`))}function tH(){return new u(j([["Solution 1",`import gleam/int
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
}`],["Solution 2 · Nested case",`import gleam/int

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

/// What \`use <- result.try\` desugars to. Same behaviour, one level of nesting
/// per fallible step — which is exactly the staircase \`use\` exists to flatten.
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
}`]]),new f(`pub type Config {
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
}`))}function eH(){return new u(j([["Solution 1",`import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}`],["Solution 2 · Case on result",`import gleam/dict

/// Skipping Option entirely: \`dict.get\` already returns a Result, so one \`case\`
/// covers both branches. Converting to Option earns its keep when the value is
/// passed on, not when it is consumed immediately like this.
pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}`]]),new f("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
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
}`))}function ZO(){return new u(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · Prefix functions",`import gleam/list
import gleam/string

/// The same work with functions rather than string patterns. Patterns bind the
/// remainder for free, which is why they win for prefixes; these read better
/// when the test and the surgery are separate ideas.
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
}`]]),new f(`pub fn strip_comment(line: String) -> String

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
}`))}function JO(){return new u(j([["Solution 1",`import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}`],["Solution 2 · Nested calls",`import gleam/list
import gleam/string

/// The same steps without the pipe, and therefore inside out: to read the order
/// of operations you start at \`title\` in the middle and work outwards. Identical
/// output — the pipe only changes which end you read from.
pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}`]]),new f("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
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
}`))}function QO(){return new u(j([["Solution 1",`pub type Player {
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
}`],["Solution 2 · Explicit fields",`pub type Player {
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
}`]]),new f(`pub type Player {
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
}`))}function XO(){return new u(j([["Solution 1",`import gleam/list
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
}`],["Solution 2 · List contains",`import gleam/list

/// No set: keep what has been accepted and ask that list directly. O(n²)
/// instead of O(n), but it needs nothing of the element type — and for a
/// handful of items it is the shorter, plainer code.
pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}`]]),new f("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
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
}`))}function Z8(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q.solutions,(X)=>{return new d0(X[0],X[1])}),GQ,new Q1(Q.check))}function YO(){return new l0("Gleam Tips",j([new T1("Idioms",j([Z8("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",iH()),Z8("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",rH()),Z8("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",aH()),Z8("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",oH()),Z8("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",tH()),Z8("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',eH()),Z8("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',ZO()),Z8("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",JO()),Z8("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",QO()),Z8("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",XO())]))]))}function KO(){return j([["Solution 1",`defmodule Solution do
  def contains_duplicate?(nums) do
    # A MapSet collapses duplicates, so a shrunken size is the answer.
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end`],["Solution 2 · Sorting",`defmodule Solution do
  def contains_duplicate?(nums) do
    # Duplicates are adjacent once sorted, so a sliding pair over the sorted
    # list answers it without holding every value in a set.
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end`]])}function qO(){return j([["Solution 1",`defmodule Solution do
  def anagram?(s, t) do
    frequencies(s) == frequencies(t)
  end

  defp frequencies(word) do
    word |> String.graphemes() |> Enum.frequencies()
  end
end`],["Solution 2 · Sorting",`defmodule Solution do
  def anagram?(s, t) do
    # Two words are anagrams exactly when their sorted letters match.
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end`]])}function WO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def two_sum(nums, target) do
    indexed = Enum.with_index(nums)

    # A comprehension over every ordered pair, stopping at the first hit.
    Enum.find_value(indexed, fn {a, i} ->
      Enum.find_value(indexed, fn {b, j} ->
        if j > i and a + b == target, do: {i, j}
      end)
    end)
  end
end`]])}function GO(){return j([["Solution 1",`defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.sort() end)
    |> Map.values()
  end
end`],["Solution 2 · Count key",`defmodule Solution do
  def group_anagrams(strs) do
    # A letter tally is anagram-invariant too, and costs O(len) to build rather
    # than O(len log len).
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.frequencies() end)
    |> Map.values()
  end
end`]])}function UO(){return j([["Solution 1",`defmodule Solution do
  def top_k_frequent(nums, k) do
    nums
    |> Enum.frequencies()
    |> Enum.sort_by(fn {_num, count} -> count end, :desc)
    |> Enum.take(k)
    |> Enum.map(fn {num, _count} -> num end)
  end
end`],["Solution 2 · Bucket sort",`defmodule Solution do
  def top_k_frequent(nums, k) do
    # A count can never exceed the input length, so grouping by count and
    # reading the groups downwards replaces the comparison sort entirely.
    buckets =
      nums
      |> Enum.frequencies()
      |> Enum.group_by(fn {_num, count} -> count end, fn {num, _count} -> num end)

    length(nums)..1//-1
    |> Enum.flat_map(fn count -> Map.get(buckets, count, []) end)
    |> Enum.take(k)
  end
end`]])}function zO(){return j([["Solution 1",`defmodule Solution do
  def product_except_self(nums) do
    # Everything before each slot, times everything after it — no division.
    prefixes = nums |> Enum.scan(1, &(&1 * &2)) |> then(&[1 | Enum.drop(&1, -1)])

    suffixes =
      nums
      |> Enum.reverse()
      |> Enum.scan(1, &(&1 * &2))
      |> then(&[1 | Enum.drop(&1, -1)])
      |> Enum.reverse()

    Enum.zip_with(prefixes, suffixes, &(&1 * &2))
  end
end`],["Solution 2 · Brute force",`defmodule Solution do
  def product_except_self(nums) do
    # The obvious O(n^2) reading: for each slot, multiply everything else.
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end`]])}function IO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Sorting",`defmodule Solution do
  def longest_consecutive(nums) do
    # No set: sort, then fold once over the gaps. O(n log n) rather than O(n),
    # but the run logic reads straight through.
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
end`]])}function VO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Two pointers",`defmodule Solution do
  def palindrome?(s) do
    # Compare inwards from both ends instead of building a reversed copy.
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
end`]])}function jO(){return j([["Solution 1",`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    # Positions are 1-based. Sorted input means too small can only be fixed by
    # raising the low end, too large by lowering the high end.
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
end`],["Solution 2 · Binary search",`defmodule Solution do
  def two_sum_sorted(numbers, target) do
    # Fix each number and binary search the tail for its complement.
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
end`]])}function HO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def three_sum(nums) do
    # Every triple, checked. Sorting first means each triple comes out in
    # ascending order, so \`uniq\` is enough to collapse the repeats.
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
end`]])}function OO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def max_area(heights) do
    # Every pair of lines, measured — the definition the two-pointer sweep is
    # an optimisation of.
    indexed = Enum.with_index(heights)

    areas =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          j > i,
          do: min(a, b) * (j - i)

    Enum.max([0 | areas])
  end
end`]])}function FO(){return j([["Solution 1",`defmodule Solution do
  def max_profit(prices) do
    # Carry the cheapest day seen so far; today's best sale is against that.
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end`],["Solution 2 · Brute force",`defmodule Solution do
  def max_profit(prices) do
    # Every buy day against every later sell day. O(n^2), and the problem
    # statement written out.
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end`]])}function NO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Shrinking window",`defmodule Solution do
  def length_of_longest_substring(s) do
    # The window itself is the bookkeeping: on a repeat, drop everything up to
    # and including the earlier copy. No last-seen map at all.
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
end`]])}function RO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Per character",`defmodule Solution do
  @alphabet String.graphemes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def character_replacement(s, k) do
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep?
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
end`]])}function DO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Sorted windows",`defmodule Solution do
  def inclusion?(s1, s2) do
    # Every window of the right length, sorted and compared. Slower, but there
    # is no incremental state to get wrong.
    needle = s1 |> String.graphemes() |> Enum.sort()
    size = length(needle)
    graphemes = String.graphemes(s2)

    cond do
      size == 0 -> true
      size > length(graphemes) -> false
      true -> graphemes |> Enum.chunk_every(size, 1, :discard) |> Enum.any?(&(Enum.sort(&1) == needle))
    end
  end
end`]])}function MO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Reduction",`defmodule Solution do
  def valid?(s) do
    # No stack: strip every matched pair, over and over. Whatever survives is
    # unmatched — which is also why "([)]" fails, since neither pair is ever
    # adjacent.
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end`]])}function AO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Two stacks",`defmodule Solution do
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
end`]])}function LO(){return j([["Solution 1",`defmodule Solution do
  def daily_temperatures(temps) do
    # A stack of days still waiting for something warmer; each day resolves
    # every colder day below it, so each day is pushed and popped once.
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
end`],["Solution 2 · Brute force",`defmodule Solution do
  def daily_temperatures(temps) do
    # For each day, scan forward until it gets warmer. O(n^2) — the monotonic
    # stack exists only to avoid rescanning the same cold stretch every day.
    temps
    |> Enum.with_index()
    |> Enum.map(fn {temp, i} ->
      case Enum.find_index(Enum.drop(temps, i + 1), &(&1 > temp)) do
        nil -> 0
        offset -> offset + 1
      end
    end)
  end
end`]])}function BO(){return j([["Solution 1",`defmodule Solution do
  def search(nums, target) do
    # Lists have no random access, so index into a tuple instead — otherwise
    # every "midpoint" would cost a walk and the log would be a lie.
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
end`],["Solution 2 · First match scan",`defmodule Solution do
  def search(nums, target) do
    # O(n), so it fails the stated requirement — but it is the baseline the
    # halving has to beat, and on a short list it wins on constants.
    Enum.find_index(nums, &(&1 == target))
  end
end`]])}function PO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Linear scan",`defmodule Solution do
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
end`]])}function TO(){return j([["Solution 1",`defmodule Solution do
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
end`],["Solution 2 · Find pivot",`defmodule Solution do
  def search_rotated(nums, target) do
    # Two plain steps instead of one clever one: find where the rotation
    # wrapped, which leaves two ordinary sorted runs, then binary search each.
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
end`]])}function i1(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q,(X)=>{return new d0(X[0],X[1])}),TH,V1)}function SO(){return new l0("NeetCode 150 (Elixir)",j([new T1("Arrays & Hashing",j([i1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",KO()),i1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",qO()),i1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",WO()),i1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",GO()),i1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",UO()),i1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",zO()),i1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",IO())])),new T1("Two Pointers",j([i1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",VO()),i1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",jO()),i1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",HO()),i1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",OO())])),new T1("Sliding Window",j([i1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",FO()),i1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",NO()),i1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",RO()),i1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",DO())])),new T1("Stack",j([i1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",MO()),i1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",AO()),i1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",LO())])),new T1("Binary Search",j([i1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",BO()),i1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",PO()),i1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",TO())]))]))}function r1(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q.solutions,(X)=>{return new d0(X[0],X[1])}),GQ,new Q1(Q.check))}function EO(){return new l0("NeetCode 150 (Gleam)",j([new T1("Arrays & Hashing",j([r1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Solve it in Gleam.",EH()),r1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise. Solve it in Gleam.",CH()),r1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Solve it in Gleam.",_H()),r1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve it in Gleam.",kH()),r1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Note: Gleam's stdlib has no heap - counting then sorting by frequency is the idiomatic approach. Solve it in Gleam.",xH()),r1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time. Solve it in Gleam.",wH()),r1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time. Solve it in Gleam.",bH())])),new T1("Two Pointers",j([r1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Note: in Gleam, comparing the cleaned graphemes with their reverse is the idiomatic answer. Solve it in Gleam.",yH()),r1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",$H()),r1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",hH()),r1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",fH())])),new T1("Sliding Window",j([r1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell. Solve it in Gleam.",gH()),r1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters. Solve it in Gleam.",uH()),r1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get. Solve it in Gleam.",vH()),r1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2. Solve it in Gleam.",mH())])),new T1("Stack",j([r1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Solve it in Gleam.",pH()),r1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Note: model the stack as a list of #(value, min_so_far) tuples returned from each operation. Solve it in Gleam.",cH()),r1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. Solve it in Gleam.",dH())])),new T1("Binary Search",j([r1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",nH()),r1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",lH()),r1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",sH())]))]))}function CO(){return new u(j([["Solution 1",`def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`],["Solution 2 · Sorting",`def containsDuplicate(nums):
    # Duplicates are adjacent once sorted, so one pass over the sorted copy
    # answers it — O(n log n) time but no extra structure to hold every value.
    ordered = sorted(nums)
    for i in range(1, len(ordered)):
        if ordered[i] == ordered[i - 1]:
            return True
    return False`]]),new f("def containsDuplicate(nums):",`def containsDuplicate(nums):
    pass`,`try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))`))}function _O(){return new u(j([["Solution 1",`def isAnagram(s, t):
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

    return True`],["Solution 2 · Sorting",`def isAnagram(s, t):
    # Two words are anagrams exactly when their sorted letters match. One line,
    # O(n log n), and nothing to get wrong in the counting.
    return sorted(s) == sorted(t)`]]),new f("def isAnagram(s, t):",`def isAnagram(s, t):
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
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))`))}function kO(){return new u(j([["Solution 1",`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`],["Solution 2 · Brute force",`def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`],["Solution 3 · Sorted two pointer",`def twoSum(nums, target):
    # Sorting loses the original positions, so carry them along, then walk one
    # pointer in from each end: too small lifts the low end, too large drops
    # the high end.
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

    return []`]]),new f("def twoSum(nums, target):",`def twoSum(nums, target):
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
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))`))}function xO(){return new u(j([["Solution 1",`from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())`],["Solution 2 · Sorted key",`from collections import defaultdict

def groupAnagrams(strs):
    # The sorted word itself is an anagram-invariant key. Shorter than tallying
    # letters, and it works for any alphabet rather than just a-z.
    groups = defaultdict(list)
    for s in strs:
        groups["".join(sorted(s))].append(s)
    return list(groups.values())`]]),new f("def groupAnagrams(strs):",`def groupAnagrams(strs):
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
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))`))}function wO(){return new u(j([["Solution 1",`from collections import Counter

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
    return result`],["Solution 2 · Heapq",`import heapq
from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)`],["Solution 3 · Sorting",`def topKFrequent(nums, k):
    # Straight sort by frequency: O(n log n) rather than the bucket version's
    # O(n), but it is the version you can write without thinking.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return [num for num, _ in ordered[:k]]`]]),new f("def topKFrequent(nums, k):",`def topKFrequent(nums, k):
    pass`,`try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))`))}function bO(){return new u(j([["Solution 1",`def productExceptSelf(nums):
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

    return result`],["Solution 2 · Brute force",`def productExceptSelf(nums):
    # The obvious O(n^2) reading of the problem: for each slot, multiply
    # everything that is not in it. Worth knowing as the thing prefix/suffix
    # beats.
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result`]]),new f("def productExceptSelf(nums):",`def productExceptSelf(nums):
    pass`,`try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))`))}function yO(){return new u(j([["Solution 1",`def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest`],["Solution 2 · Sorting",`def longestConsecutive(nums):
    # No set: sort, then walk once counting runs. O(n log n) rather than O(n),
    # but it needs no extra structure and the run logic reads straight through.
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

    return longest`]]),new f("def longestConsecutive(nums):",`def longestConsecutive(nums):
    pass`,`try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))`))}function $O(){return new u(j([["Solution 1",`def isPalindrome(s):
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

    return True`],["Solution 2 · Cleaned reverse",`def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`]]),new f("def isPalindrome(s):",`def isPalindrome(s):
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
__case__("isPalindrome('0P')", False, isPalindrome("0P"))`))}function hO(){return new u(j([["Solution 1",`def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`],["Solution 2 · Binary search",`def twoSum(numbers, target):
    # Instead of converging two pointers, fix each number and binary search the
    # tail for its complement. O(n log n), and it reuses a search you already
    # know rather than a second pointer discipline.
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
    return []`]]),new f("def twoSum(numbers, target):",`def twoSum(numbers, target):
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
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))`))}function fO(){return new u(j([["Solution 1",`def threeSum(nums):
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

    return result`],["Solution 2 · Brute force",`def threeSum(nums):
    # Every triple, checked. Sorting first means each triple comes out in
    # ascending order, so duplicates are literal list equality.
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            for k in range(j + 1, len(ordered)):
                triple = [ordered[i], ordered[j], ordered[k]]
                if sum(triple) == 0 and triple not in result:
                    result.append(triple)

    return result`]]),new f("def threeSum(nums):",`def threeSum(nums):
    pass`,`try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))`))}function gO(){return new u(j([["Solution 1",`def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`],["Solution 2 · Brute force",`def maxArea(height):
    # Every pair of lines, measured. O(n^2), but it makes what the two-pointer
    # sweep is maximising explicit: shorter line times distance.
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best`]]),new f("def maxArea(height):",`def maxArea(height):
    pass`,`try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))`))}function uO(){return new u(j([["Solution 1",`def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit`],["Solution 2 · Brute force",`def maxProfit(prices):
    profit = 0
    for buy in range(len(prices)):
        for sell in range(buy + 1, len(prices)):
            profit = max(profit, prices[sell] - prices[buy])
    return profit`]]),new f("def maxProfit(prices):",`def maxProfit(prices):
    pass`,`try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))`))}function vO(){return new u(j([["Solution 1",`def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest`],["Solution 2 · Index scan",`def lengthOfLongestSubstring(s):
    # No set, no dict: ask the string itself whether this character already
    # appeared inside the current window, and if so start just past it.
    longest = 0
    start = 0

    for right, char in enumerate(s):
        found = s.find(char, start, right)
        if found != -1:
            start = found + 1
        longest = max(longest, right - start + 1)

    return longest`]]),new f("def lengthOfLongestSubstring(s):",`def lengthOfLongestSubstring(s):
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
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))`))}function mO(){return new u(j([["Solution 1",`def characterReplacement(s, k):
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

    return longest`],["Solution 2 · Per character",`ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep? No running frequency
    # map and no max-count bookkeeping — 26 easy passes instead of one subtle
    # one.
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

    return longest`]]),new f("def characterReplacement(s, k):",`def characterReplacement(s, k):
    pass`,`try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))`))}function pO(){return new u(j([["Solution 1",`from collections import Counter

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

    return False`],["Solution 2 · Sorted windows",`def checkInclusion(s1, s2):
    # Every window of the right length, sorted and compared. Slower than
    # sliding counts, but there is no incremental state to get wrong: the whole
    # method is "is this window an anagram?".
    if len(s1) > len(s2):
        return False

    needle = sorted(s1)
    size = len(s1)

    for start in range(len(s2) - size + 1):
        if sorted(s2[start:start + size]) == needle:
            return True

    return False`]]),new f("def checkInclusion(s1, s2):",`def checkInclusion(s1, s2):
    pass`,`try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))`))}function cO(){return new u(j([["Solution 1",`def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`],["Solution 2 · Reduction",`def isValid(s):
    # No stack: strip every matched pair, over and over, until nothing more can
    # go. Whatever survives is unmatched. This is also why "([)]" fails —
    # neither pair is ever adjacent.
    previous = None
    while previous != s:
        previous = s
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return s == ""`]]),new f("def isValid(s):",`def isValid(s):
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
__case__("isValid('(')", False, isValid("("))`))}function dO(){return new u(j([["Solution 1",`class MinStack:
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
        return self.mins[-1]`],["Solution 2 · Pair stack",`class MinStack:
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
        return self.entries[-1][1]`]]),new f(`class MinStack:
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
__case__("getMin() after pop()", -2, __stack__.getMin())`))}function nO(){return new u(j([["Solution 1",`def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result`],["Solution 2 · Brute force",`def dailyTemperatures(temperatures):
    # For each day, scan forward until it gets warmer. O(n^2), and the direct
    # reading of the question — the monotonic stack exists only to avoid
    # rescanning the same cold stretch once per day.
    result = []
    for i, temp in enumerate(temperatures):
        days = 0
        for j in range(i + 1, len(temperatures)):
            if temperatures[j] > temp:
                days = j - i
                break
        result.append(days)
    return result`]]),new f("def dailyTemperatures(temperatures):",`def dailyTemperatures(temperatures):
    pass`,`try:
    (dailyTemperatures)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
__case__("dailyTemperatures([30, 40, 50, 60])", [1, 1, 1, 0], dailyTemperatures([30, 40, 50, 60]))
__case__("dailyTemperatures([30, 30, 30])", [0, 0, 0], dailyTemperatures([30, 30, 30]))`))}function lO(){return new u(j([["Solution 1",`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`],["Solution 2 · Recursive",`def search(nums, target):
    # The same halving, written as recursion. The bounds are arguments rather
    # than mutated locals, which makes each step's invariant easier to see.
    return halve(nums, target, 0, len(nums) - 1)

def halve(nums, target, lo, hi):
    if lo > hi:
        return -1

    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return halve(nums, target, mid + 1, hi)
    return halve(nums, target, lo, mid - 1)`]]),new f("def search(nums, target):",`def search(nums, target):
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
__case__("search([], 1)", -1, search([], 1))`))}function sO(){return new u(j([["Solution 1",`def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`],["Solution 2 · Linear scan",`def findMin(nums):
    # O(n) rather than O(log n), but it makes the shape of the problem obvious:
    # a rotated sorted array drops in value exactly once, and that drop is the
    # minimum. No drop means it was never rotated, so the head wins.
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return nums[i]
    return nums[0]`]]),new f("def findMin(nums):",`def findMin(nums):
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
__case__("findMin([2, 1])", 1, findMin([2, 1]))`))}function iO(){return new u(j([["Solution 1",`def search(nums, target):
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

    return -1`],["Solution 2 · Find pivot",`def search(nums, target):
    # Two plain steps instead of one clever one: find where the rotation
    # wrapped, which splits the input into two ordinary sorted arrays, then
    # binary search each. Nothing has to reason mid-search about which half is
    # sorted.
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
    return -1`]]),new f("def search(nums, target):",`def search(nums, target):
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
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))`))}function rO(){return new u(j([["Solution 1",`from collections import Counter

def topTwo(nums):
    return Counter(nums).most_common(2)

def countOf(nums, value):
    return Counter(nums)[value]`],["Solution 2 · Plain dict",`def topTwo(nums):
    # What Counter does underneath: a dict of counts, then a sort. Worth writing
    # once so most_common stops being a black box.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return ordered[:2]

def countOf(nums, value):
    return sum(1 for num in nums if num == value)`]]),new f(`def topTwo(nums):

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
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))`))}function aO(){return new u(j([["Solution 1",`from collections import defaultdict

def groupByLength(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)`],["Solution 2 · Setdefault",`def groupByLength(words):
    # setdefault does the same job as defaultdict without changing the type of
    # the dictionary — handy when the result is returned or serialised, since
    # there is no default factory left attached to it.
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups`]]),new f("def groupByLength(words):",`def groupByLength(words):
    pass`,`try:
    (groupByLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("groupByLength(['a', 'bc', 'de', 'f'])", {1: ["a", "f"], 2: ["bc", "de"]}, groupByLength(["a", "bc", "de", "f"]))
__case__("groupByLength([])", {}, groupByLength([]))`))}function oO(){return new u(j([["Solution 1",`from collections import deque

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
    return order`],["Solution 2 · List queue",`def bfsOrder(graph, start):
    # A list plus a read cursor. The cursor is the point: list.pop(0) is O(n),
    # so a plain list only stays a good queue if you never shift it.
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

    return order`]]),new f("def bfsOrder(graph, start):",`def bfsOrder(graph, start):
    pass`,`try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))`))}function tO(){return new u(j([["Solution 1",`import heapq

def kSmallest(nums, k):
    heap = list(nums)
    heapq.heapify(heap)
    return [heapq.heappop(heap) for _ in range(min(k, len(heap)))]

def kLargest(nums, k):
    heap = [-n for n in nums]
    heapq.heapify(heap)
    return [-heapq.heappop(heap) for _ in range(min(k, len(heap)))]`],["Solution 2 · Sorting",`def kSmallest(nums, k):
    # Sorting is O(n log n) against the heap's O(n + k log n). For small k the
    # heap wins; for k near n they are the same, and this is far shorter.
    return sorted(nums)[:k]

def kLargest(nums, k):
    return sorted(nums, reverse=True)[:k]`]]),new f(`def kSmallest(nums, k):

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
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))`))}function eO(){return new u(j([["Solution 1",`def firstIndexOf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1

def dotProduct(a, b):
    return sum(x * y for x, y in zip(a, b))`],["Solution 2 · Index loop",`def firstIndexOf(nums, target):
    # Indexing by hand. It works, and it is exactly what enumerate and zip save
    # you from: the off-by-one risk and the second subscript in dotProduct.
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

def dotProduct(a, b):
    total = 0
    for i in range(min(len(a), len(b))):
        total += a[i] * b[i]
    return total`]]),new f(`def firstIndexOf(nums, target):

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
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))`))}function ZF(){return new u(j([["Solution 1",`def reversedString(s):
    return s[::-1]

def everySecond(s):
    return s[::2]

def lastN(s, n):
    return s[-n:] if n > 0 else ""

def trimEnds(s):
    return s[1:-1]`],["Solution 2 · Explicit loops",`def reversedString(s):
    # Every slice spelled out as a loop. The slices are better in real code;
    # writing them this way once makes the step and the negative bounds obvious.
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
    return "".join(s[i] for i in range(1, len(s) - 1))`]]),new f(`def reversedString(s):

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
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))`))}function JF(){return new u(j([["Solution 1",`def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))`],["Solution 2 · Decorate sort undecorate",`def sortByLength(words):
    # Decorate, sort, undecorate: attach the sort key to each item, sort the
    # pairs, then strip it. \`key=\` is this pattern built into sorted().
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]`]]),new f(`def sortByLength(words):

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
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))`))}function QF(){return new u(j([["Solution 1",`def joinUpper(chars):
    parts = []
    for c in chars:
        parts.append(c.upper())
    return "".join(parts)`],["Solution 2 · Concatenation",`def joinUpper(chars):
    # The version join exists to replace. Each \`+=\` builds a whole new string,
    # so this is quadratic in the output length — fine for two characters,
    # painful for a megabyte.
    out = ""
    for c in chars:
        out += c.upper()
    return out`]]),new f("def joinUpper(chars):",`def joinUpper(chars):
    pass`,`try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))`))}function a1(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q.solutions,(X)=>{return new d0(X[0],X[1])}),qQ,new Q1(Q.check))}function YF(){return new l0("NeetCode 150",j([new T1("Arrays & Hashing",j([a1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",CO()),a1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",_O()),a1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",kO()),a1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",xO()),a1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",wO()),a1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",bO()),a1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",yO())])),new T1("Two Pointers",j([a1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",$O()),a1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",hO()),a1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",fO()),a1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",gO())])),new T1("Sliding Window",j([a1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",uO()),a1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",vO()),a1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",mO()),a1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",pO())])),new T1("Stack",j([a1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",cO()),a1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",dO()),a1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",nO())])),new T1("Binary Search",j([a1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",lO()),a1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",sO()),a1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",iO())]))]))}function KF(){return new u(j([["Solution 1",`export function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`],["Solution 2 · Sorting",`export function containsDuplicate(nums: number[]): boolean {
  // Duplicates are adjacent once sorted, so one pass over the sorted copy
  // answers it — O(n log n), but nothing has to hold every value at once.
  const ordered = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] === ordered[i - 1]) return true;
  }
  return false;
}`]]),new f("export function containsDuplicate(nums: number[]): boolean",`export function containsDuplicate(nums: number[]): boolean {
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
}`))}function qF(){return new u(j([["Solution 1",`export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();
  for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

  for (const char of t) {
    const remaining = counts.get(char);
    if (remaining === undefined || remaining === 0) return false;
    counts.set(char, remaining - 1);
  }

  return true;
}`],["Solution 2 · Sorting",`export function isAnagram(s: string, t: string): boolean {
  // Two words are anagrams exactly when their sorted letters match. O(n log n),
  // and there is no counting to get wrong.
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}`]]),new f("export function isAnagram(s: string, t: string): boolean",`export function isAnagram(s: string, t: string): boolean {
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
}`))}function WF(){return new u(j([["Solution 1",`export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`],["Solution 2 · Sorted two pointer",`export function twoSum(nums: number[], target: number): number[] {
  // Sorting loses the original positions, so carry them along, then walk one
  // pointer in from each end.
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
}`]]),new f("export function twoSum(nums: number[], target: number): number[]",`export function twoSum(nums: number[], target: number): number[] {
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
}`))}function GF(){return new u(j([["Solution 1",`export function groupAnagrams(strs: string[]): string[][] {
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
}`],["Solution 2 · Sorted key",`export function groupAnagrams(strs: string[]): string[][] {
  // The sorted word itself is an anagram-invariant key: shorter than tallying
  // letters, and it works for any alphabet rather than just a-z.
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
}`]]),new f("export function groupAnagrams(strs: string[]): string[][]",`export function groupAnagrams(strs: string[]): string[][] {
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
}`))}function UF(){return new u(j([["Solution 1",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`],["Solution 2 · Sorting",`export function topKFrequent(nums: number[], k: number): number[] {
  // Straight sort by frequency: O(n log n) rather than the bucket version's
  // O(n), but it is the version you can write without thinking.
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`]]),new f("export function topKFrequent(nums: number[], k: number): number[]",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`))}function zF(){return new u(j([["Solution 1",`export function productExceptSelf(nums: number[]): number[] {
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
}`],["Solution 2 · Brute force",`export function productExceptSelf(nums: number[]): number[] {
  // The obvious O(n^2) reading: for each slot, multiply everything that is not
  // in it. Worth knowing as the thing prefix/suffix beats.
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}`]]),new f("export function productExceptSelf(nums: number[]): number[]",`export function productExceptSelf(nums: number[]): number[] {
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
}`))}function IF(){return new u(j([["Solution 1",`export function longestConsecutive(nums: number[]): number {
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
}`],["Solution 2 · Sorting",`export function longestConsecutive(nums: number[]): number {
  // No set: sort, then walk once counting runs. O(n log n) rather than O(n),
  // but it needs no extra structure and the run logic reads straight through.
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
}`]]),new f("export function longestConsecutive(nums: number[]): number",`export function longestConsecutive(nums: number[]): number {
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
}`))}function VF(){return new u(j([["Solution 1",`export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`],["Solution 2 · Cleaned reverse",`export function isPalindrome(s: string): boolean {
  // Strip, then compare against the reverse. Allocates a second string instead
  // of converging two pointers, but it is one line of intent.
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}`]]),new f("export function isPalindrome(s: string): boolean",`export function isPalindrome(s: string): boolean {
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
}`))}function jF(){return new u(j([["Solution 1",`export function twoSum(numbers: number[], target: number): number[] {
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
}`],["Solution 2 · Binary search",`export function twoSum(numbers: number[], target: number): number[] {
  // Fix each number and binary search the tail for its complement, rather than
  // converging two pointers. O(n log n), reusing a search you already know.
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
}`]]),new f("export function twoSum(numbers: number[], target: number): number[]",`export function twoSum(numbers: number[], target: number): number[] {
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
}`))}function HF(){return new u(j([["Solution 1",`export function threeSum(nums: number[]): number[][] {
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
}`],["Solution 2 · Brute force",`export function threeSum(nums: number[]): number[][] {
  // Every triple, checked. Sorting first means each triple comes out in
  // ascending order, so duplicates are plain string equality on the triple.
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
}`]]),new f("export function threeSum(nums: number[]): number[][]",`export function threeSum(nums: number[]): number[][] {
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
}`))}function OF(){return new u(j([["Solution 1",`export function maxArea(height: number[]): number {
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
}`],["Solution 2 · Brute force",`export function maxArea(height: number[]): number {
  // Every pair of lines, measured. O(n^2), but it makes what the two-pointer
  // sweep is maximising explicit: shorter line times distance.
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}`]]),new f("export function maxArea(height: number[]): number",`export function maxArea(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}`))}function FF(){return new u(j([["Solution 1",`export function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let profit = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    profit = Math.max(profit, price - lowest);
  }
  return profit;
}`],["Solution 2 · Brute force",`export function maxProfit(prices: number[]): number {
  // Every buy day against every later sell day. O(n^2), and the definition of
  // the problem written out — the single pass is the optimisation.
  let profit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      profit = Math.max(profit, prices[sell] - prices[buy]);
    }
  }
  return profit;
}`]]),new f("export function maxProfit(prices: number[]): number",`export function maxProfit(prices: number[]): number {
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
}`))}function NF(){return new u(j([["Solution 1",`export function lengthOfLongestSubstring(s: string): number {
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
}`],["Solution 2 · Index scan",`export function lengthOfLongestSubstring(s: string): number {
  // No set: ask the string itself whether this character already appeared
  // inside the current window, and if so restart just past it.
  let longest = 0;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const found = s.slice(start, right).indexOf(s[right]);
    if (found !== -1) start = start + found + 1;
    longest = Math.max(longest, right - start + 1);
  }

  return longest;
}`]]),new f("export function lengthOfLongestSubstring(s: string): number",`export function lengthOfLongestSubstring(s: string): number {
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
}`))}function RF(){return new u(j([["Solution 1",`export function characterReplacement(s: string, k: number): number {
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
}`],["Solution 2 · Per character",`const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function characterReplacement(s: string, k: number): number {
  // One sweep per letter, asking a much simpler question each time: how long a
  // window can I hold if *this* is the letter I keep? No running frequency map
  // and no max-count bookkeeping — 26 easy passes instead of one subtle one.
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
}`]]),new f("export function characterReplacement(s: string, k: number): number",`export function characterReplacement(s: string, k: number): number {
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
}`))}function DF(){return new u(j([["Solution 1",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`],["Solution 2 · Sorted windows",`export function checkInclusion(s1: string, s2: string): boolean {
  // Every window of the right length, sorted and compared. Slower than sliding
  // counts, but there is no incremental state to get wrong: the whole method is
  // "is this window an anagram?".
  if (s1.length > s2.length) return false;

  const needle = [...s1].sort().join("");
  for (let start = 0; start + s1.length <= s2.length; start++) {
    if ([...s2.slice(start, start + s1.length)].sort().join("") === needle) {
      return true;
    }
  }

  return false;
}`]]),new f("export function checkInclusion(s1: string, s2: string): boolean",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`))}function MF(){return new u(j([["Solution 1",`export function isValid(s: string): boolean {
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
}`],["Solution 2 · Reduction",`export function isValid(s: string): boolean {
  // No stack: strip every matched pair, over and over, until nothing more can
  // go. Whatever survives is unmatched. It is also why "([)]" fails — neither
  // pair is ever adjacent.
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}`]]),new f("export function isValid(s: string): boolean",`export function isValid(s: string): boolean {
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
}`))}function AF(){return new u(j([["Solution 1",`export class MinStack {
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
}`],["Solution 2 · Pair stack",`export class MinStack {
  // Each entry carries the minimum of everything at or below it, so getMin is
  // a peek. One array instead of two, at the cost of a second number per value.
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
}`]]),new f(`export class MinStack
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
}`))}function LF(){return new u(j([["Solution 1",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`],["Solution 2 · Brute force",`export function dailyTemperatures(temperatures: number[]): number[] {
  // For each day, scan forward until it gets warmer. O(n^2), and the direct
  // reading of the question — the monotonic stack exists only to avoid
  // rescanning the same cold stretch once per day.
  return temperatures.map((temp, i) => {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temp) return j - i;
    }
    return 0;
  });
}`]]),new f("export function dailyTemperatures(temperatures: number[]): number[]",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`))}function BF(){return new u(j([["Solution 1",`export function search(nums: number[], target: number): number {
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
}`],["Solution 2 · Recursive",`export function search(nums: number[], target: number): number {
  // The same halving, written as recursion: the bounds are arguments rather
  // than mutated locals, which makes each step's invariant easier to see.
  return halve(nums, target, 0, nums.length - 1);
}

function halve(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return halve(nums, target, mid + 1, hi);
  return halve(nums, target, lo, mid - 1);
}`]]),new f("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function PF(){return new u(j([["Solution 1",`export function findMin(nums: number[]): number {
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
}`],["Solution 2 · Linear scan",`export function findMin(nums: number[]): number {
  // O(n) rather than O(log n), but it makes the shape of the problem obvious:
  // a rotated sorted array drops in value exactly once, and that drop is the
  // minimum. No drop means it was never rotated, so the head wins.
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return nums[i];
  }
  return nums[0];
}`]]),new f("export function findMin(nums: number[]): number",`export function findMin(nums: number[]): number {
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
}`))}function TF(){return new u(j([["Solution 1",`export function search(nums: number[], target: number): number {
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
}`],["Solution 2 · Find pivot",`export function search(nums: number[], target: number): number {
  // Two plain steps instead of one clever one: find where the rotation wrapped,
  // which splits the input into two ordinary sorted arrays, then binary search
  // each. Nothing has to reason mid-search about which half is sorted.
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
}`]]),new f("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function o1(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q.solutions,(X)=>{return new d0(X[0],X[1])}),BH,new Q1(Q.check))}function SF(){return new l0("NeetCode 150 (TypeScript)",j([new T1("Arrays & Hashing",j([o1("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",KF()),o1("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.",qF()),o1("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",WF()),o1("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.",GF()),o1("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",UF()),o1("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",zF()),o1("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",IF())])),new T1("Two Pointers",j([o1("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",VF()),o1("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",jF()),o1("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",HF()),o1("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",OF())])),new T1("Sliding Window",j([o1("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",FF()),o1("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.",NF()),o1("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",RF()),o1("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",DF())])),new T1("Stack",j([o1("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",MF()),o1("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",AF()),o1("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",LF())])),new T1("Binary Search",j([o1("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",BF()),o1("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",PF()),o1("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",TF())]))]))}function G9(Z,J,Q){return new n0(Z,J,G6(Z),j1(Q.solutions,(X)=>{return new d0(X[0],X[1])}),qQ,new Q1(Q.check))}function EF(){return new l0("Python Tips",j([new T1("Idioms",j([G9("Counter for frequency maps","Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",rO()),G9("defaultdict for grouping","Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",aO()),G9("deque for O(1) popleft","Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",oO()),G9("heapq for min/max heaps","Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",tO()),G9("Enumerate, zip, and unpacking","Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",eO()),G9("Slicing and reversal","Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",ZF()),G9("Sorting with a key","Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",JF()),G9("Building strings efficiently","Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",QF())]))]))}function e7(){return j([YF(),EO(),SF(),SO(),EF(),YO()])}function _F(){return j1(e7(),(Z)=>{return Z.name})}function kF(Z){let J=Z7(e7(),(Q)=>{return Q.name===Z});if(J instanceof v){let Q=J[0];return j1(Q.subcategories,(X)=>{return X.name})}else return d}function zQ(Z,J){let Q=Z7(e7(),(X)=>{return X.name===Z});if(Q instanceof v){let X=Q[0],Y=Z7(X.subcategories,(K)=>{return K.name===J});if(Y instanceof v)return Y[0].problems;else return d}else return d}function CF(Z,J,Q){let X=Z7(Z,J);if(X instanceof v){let Y=X[0];return Q(Y)}else return X}function U9(Z,J,Q){return CF(e7(),(X)=>{return X.name===Z},(X)=>{return CF(X.subcategories,(Y)=>{return Y.name===J},(Y)=>{return Z7(Y.problems,(K)=>{return K.title===Q})})})}var w5=new Map;function VK(Z,J,Q,X,Y){if(w5.has(Z))return;let K=new Worker(J,Q?{type:"module"}:void 0);K.onmessage=(q)=>X(JSON.stringify(q.data)),K.onerror=(q)=>Y(String(q.message??"The runtime failed to load.")),w5.set(Z,K)}function xF(Z,J,Q,X,Y){w5.get(Z)?.terminate(),w5.delete(Z),VK(Z,J,Q,X,Y)}function wF(Z,J,Q,X){w5.get(Z)?.postMessage({type:"run",id:J,solution:Q,harness:X})}function bF(Z,J){setTimeout(J,Z)}var yB="1.18.1",$B="3.14.3",hB=8000;function yF(Z){if(Z==="python")return["/python-worker.js?v="+$B,!1];else if(Z==="typescript")return["/ts-worker.js",!0];else return["/gleam-worker.js?v="+yB,!0]}function jK(Z,J,Q){return x8(Z,V1,QZ(J),Q)}function fB(Z){return w1("phase",k1,(J)=>{return jK("file",k1,(Q)=>{return jK("line",o0,(X)=>{return jK("column",o0,(Y)=>{return w1("message",k1,(K)=>{return Z(new X9(new GK(J,Q,X,Y,K)))})})})})})}function gB(Z){let J=w1("label",k1,(Q)=>{return w1("expected",k1,(X)=>{return w1("actual",k1,(Y)=>{return w1("passed",gQ,(K)=>{return $1(new WK(Q,X,Y,K))})})})});return w1("cases",k8(J),(Q)=>{return Z(new Q9(Q))})}function uB(Z){return w1("type",k1,(J)=>{if(J==="ready")return $1(new c9(Z));else if(J==="result")return w1("id",o0,(Q)=>{return gB((X)=>{return $1(new a7(Q,X))})});else if(J==="error")return w1("id",o0,(Q)=>{return fB((X)=>{return $1(new a7(Q,X))})});else return R4(new c9(Z),"Msg")})}function $F(Z,J){let Q=Y7(J,uB(Z));if(Q instanceof v)return Q[0];else return new W9(Z,"The runtime sent an unreadable message.")}function hF(Z){return p6((J)=>{let Q=yF(Z),X=Q[0],Y=Q[1];return VK(Z,X,Y,(K)=>{return J($F(Z,K))},(K)=>{return J(new W9(Z,K))})})}function fF(Z){return p6((J)=>{let Q=yF(Z),X=Q[0],Y=Q[1];return xF(Z,X,Y,(K)=>{return J($F(Z,K))},(K)=>{return J(new W9(Z,K))})})}function gF(Z,J,Q,X){return p6((Y)=>{return wF(Z,J,Q,X),bF(hB,()=>{return Y(new YQ(J))})})}function VQ(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return v1(globalThis.localStorage);else return t1(null)}catch{return t1(null)}}function b5(Z,J){return mB(Z.getItem(J))}function HK(Z,J,Q){try{return Z.setItem(J,Q),v1(null)}catch{return t1(null)}}function mB(Z){if(Z!==null)return v1(Z);else return t1(null)}var cB="algoDrillState",dB="algoDrillState.v2",mF="algoDrillState.v3";function FK(Z){let J=(K)=>{if(U9(K.category,K.subcategory,K.title)instanceof v)return!0;else return!1},Q=r0(Z.selected,J),X=new A1(Z.route,Z.selected_category,Z.selected_subcategory,Q,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,r0(Z.drafts,(K)=>{return J(K[0])}),r0(Z.attempts,(K)=>{return J(K[0])}),Z.search,Z.next_run_id,Z.editor_keymap);if(X.route instanceof p9&&X.problem_index>=g6(Q))return new A1(n7,X.selected_category,X.selected_subcategory,X.selected,0,X.iteration_count,1,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap);else return X}function nB(Z,J){if(Z==="currentView")return w1("currentProblemIndex",o0,J);else return w1("problemIndex",o0,J)}function pF(){return w1("category",k1,(Z)=>{return w1("subcategory",k1,(J)=>{return w1("title",k1,(Q)=>{return $1(new J9(Z,J,Q))})})})}function uF(Z,J){return x8(Z,V1,QZ(k1),J)}function lB(){return XZ(k1,(Z)=>{if(Z==="drill")return $1(iJ);else return $1(n7)})}function NK(Z,J,Q){return w1(Z,lB(),(X)=>{return uF("selectedCategory",(Y)=>{return uF("selectedSubcategory",(K)=>{return w1(J,k8(pF()),(q)=>{return nB(Z,(W)=>{return w1("iterationCount",o0,(G)=>{return w1("currentIteration",o0,(U)=>{return Q((()=>{let z=d9();return new A1(X,Y,K,q,W,G,U,z.draft,z.revealed_solution,z.runtimes,z.run,z.drafts,z.attempts,z.search,z.next_run_id,z.editor_keymap)})())})})})})})})})}function sB(){return NK("currentView","selectedProblems",(Z)=>{return $1(Z)})}function iB(Z){let J=b5(Z,cB);if(J instanceof v){let Q=J[0],X=Y7(Q,sB()),Y=M4(X,FK);return qZ(Y,d9())}else return d9()}function rB(){return NK("route","selected",(Z)=>{return $1(Z)})}function aB(Z){let J=b5(Z,dB);if(J instanceof v){let Q=J[0],X=Y7(Q,rB()),Y=M4(X,FK);return qZ(Y,d9())}else return iB(Z)}function oB(){return XZ(k1,(Z)=>{if(Z==="passed")return $1(tJ);else return $1(D5)})}function vF(Z,J){return XZ(pF(),(Q)=>{return w1(Z,J,(X)=>{return $1([Q,X])})})}function tB(){return NK("route","selected",(Z)=>{return x8("drafts",d,k8(vF("draft",k1)),(J)=>{return x8("attempts",d,k8(vF("result",oB())),(Q)=>{return x8("search","",k1,(X)=>{return x8("editorKeymap","default",k1,(Y)=>{return $1(new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,J,Q,X,Z.next_run_id,Y))})})})})})}function cF(){let Z=VQ();if(Z instanceof v){let J=Z[0],Q=b5(J,mF);if(Q instanceof v){let X=Q[0],Y=Y7(X,tB()),K=M4(Y,FK);return qZ(K,d9())}else return aB(J)}else return d9()}function OK(Z,J){return A9(k(["category",Y0(Z.category)],k(["subcategory",Y0(Z.subcategory)],k(["title",Y0(Z.title)],J))))}function eB(Z){return OK(Z,d)}function ZP(Z){let J=A9(j([["route",Y0((()=>{if(Z.route instanceof d7)return"menu";else return"drill"})())],["selectedCategory",iQ(Z.selected_category,Y0)],["selectedSubcategory",iQ(Z.selected_subcategory,Y0)],["selected",w8(Z.selected,eB)],["problemIndex",m6(Z.problem_index)],["iterationCount",m6(Z.iteration_count)],["currentIteration",m6(Z.current_iteration)],["drafts",w8(Z.drafts,(Q)=>{return OK(Q[0],j([["draft",Y0(Q[1])]]))})],["attempts",w8(Z.attempts,(Q)=>{return OK(Q[0],j([["result",Y0((()=>{if(Q[1]instanceof q9)return"passed";else return"failed"})())]]))})],["search",Y0(Z.search)],["editorKeymap",Y0(Z.editor_keymap)]]));return QW(J)}function dF(Z){return p6((J)=>{let Q=VQ();if(Q instanceof v){let X=Q[0],Y=HK(X,mF,ZP(Z));return}else return})}function QP(Z,J){let Q=Z.revealed_solution;if(Q instanceof Q1){let X=Q[0],Y=J.solutions,K=t5(Y,X);return a5(K)}else return new L1(void 0)}function XP(Z,J){let Q,X=Z.file;if(X instanceof Q1){let q=X[0];Q=F4(q,"check")}else Q=!1;let Y=Q,K=J.check;if(Y&&K instanceof Q1){let q=K[0];return U1(j([p("results")]),j([U1(j([p("results-summary fail")]),j([K1("Your solution doesn't match the required signature.")])),z7(j([p("signature")]),j([I7(d,j([K1(q.signature)]))])),IX(j([p("results-details")]),j([VX(d,j([K1("Details")])),z7(j([p("results-message")]),j([K1(Z.message)]))]))]))}else return U1(j([p("results")]),j([U1(j([p("results-summary fail")]),j([K1((()=>{if(Z.phase==="compile")return"Your code doesn't compile.";else return"Your code crashed while running."})())])),z7(j([p("results-message")]),j([K1(Z.message)]))]))}function YP(Z){let J=g6(Z),Q=Qq(Z,(U)=>{return U.passed}),X=Q===J&&J>0,Y=U1(j([z8(j([["results-summary",!0],["pass",X],["fail",!X]]))]),j([K1((()=>{if(X)return"✓ ";else return"✗ "})()+Q0(Q)+"/"+Q0(J)+" passed")])),K,W=r0(Z,(U)=>{return!U.passed});K=j1(W,(U)=>{return U1(j([p("case fail")]),j([U1(j([p("case-label")]),j([K1("✗ "+U.label)])),U1(j([p("case-diff")]),j([U1(d,j([k0(j([p("case-diff-tag")]),j([K1("expected ")])),I7(d,j([K1(U.expected)]))])),U1(d,j([k0(j([p("case-diff-tag")]),j([K1("got ")])),I7(d,j([K1(U.actual)]))]))]))]))});let G=K;return U1(j([p("results")]),k(Y,G))}function KP(Z,J){let Q,X=Z.run;if(X instanceof oJ)Q=d;else if(X instanceof Y9)Q=j([U1(j([p("results")]),j([U1(j([p("results-summary")]),j([K1("Compiling and running…")]))]))]);else{let G=X[0];if(G instanceof Q9){let U=G[0];Q=j([YP(U)])}else if(G instanceof X9){let U=G[0];Q=j([XP(U,J)])}else Q=j([U1(j([p("results")]),j([U1(j([p("results-summary fail")]),j([K1("Your solution didn't finish — likely an infinite loop. The runtime was restarted.")]))]))])}let Y=Q,K,q=QP(Z,J);if(q instanceof v){let G=q[0];K=j([U1(j([p("answer-content")]),j([U1(j([p("answer-label")]),j([K1(G.label)])),z7(d,j([I7(d,j([K1(G.code)]))]))]))])}else K=d;return I0(Y,K)}function qP(Z,J){return o5(J.solutions,(Q,X)=>{return F6(j([z8(j([["btn-secondary",!0],["solution-button",!0],["revealed",B1(Z.revealed_solution,new Q1(X))]])),M0(new i7(X))]),j([K1(Q.label)]))})}function y5(Z,J){return F6(j([p("btn-primary run-button"),T4(J),M0(LH)]),j([K1(Z)]))}function WP(Z,J){let Q;if(J.check instanceof Q1)Q=j([(()=>{let K=_5(Z,x5(J.language));if(Z.run instanceof Y9)return y5("Running…",!0);else if(K instanceof l7)return y5("Loading runtime…",!0);else if(K instanceof rJ)return y5("Loading runtime…",!0);else if(K instanceof s7)return y5("▶ Run tests",!1);else return y5("Runtime unavailable",!0)})()]);else Q=j([k0(j([p("run-unavailable")]),j([K1("Checking isn't available for this drill — compare with a solution.")]))]);let Y=Q;return U1(j([p("run-bar")]),j4(j([Y,qP(Z,J),j([F6(j([p("btn-primary next-button"),M0(MH)]),j([K1("Next")]))])])))}function RK(Z){let Q=ZZ(Z,`
`),X=Xq(Q,3);return JZ(X,`
`)}function GP(Z){let J=Z.run;if(J instanceof K9){let Q=J[0];if(Q instanceof X9){let X=Q[0],Y=X.file,K=X.line,q=X.column;if(Y instanceof Q1&&K instanceof Q1&&q instanceof Q1){let W=Y[0];if(W==="solution.gleam"){let G=K[0],U=q[0];return j([new N5(G,U,RK(X.message))])}else if(W==="solution.py"){let G=K[0],U=q[0];return j([new N5(G,U,RK(X.message))])}else if(W==="solution.ts"){let G=K[0],U=q[0];return j([new N5(G,U,RK(X.message))])}else return d}else return d}else return d}else return d}function UP(Z){let J=Z.run;if(J instanceof K9){let Q=J[0];if(Q instanceof Q9){let X=Q[0];return gW(j([p("case-list")]),j1(X,(Y)=>{return fW(j([z8(j([["case",!0],["pass",Y.passed],["fail",!Y.passed]]))]),j([k0(j([p("case-icon")]),j([K1((()=>{if(Y.passed)return"✓";else return"✗"})())])),K1(" "+Y.label)]))}))}else return U1(j([p("pane-empty")]),j([K1("Run the tests to see the cases.")]))}else return U1(j([p("pane-empty")]),j([K1("Run the tests to see the cases.")]))}function DK(Z,J){return hW(j([p("panel")]),k(FZ(j([p("panel-title")]),j([K1(Z)])),J))}function zP(Z,J,Q){let X=DK("Prompt",j([U1(j([p("problem-category")]),j([K1(J.category+" › "+J.subcategory+" · "+SH(Q.language))])),U1(j([p("problem-prompt")]),j([K1(Q.prompt)]))])),Y,K=Q.approach;if(K==="")Y=d;else{let z=K;Y=j([IX(j([p("panel approach")]),j([VX(j([p("panel-title")]),j([K1("Approach")])),U1(j([p("approach-text")]),j([K1(z)]))]))])}let q=Y,W,G=Q.check;if(G instanceof Q1){let z=G[0];W=j([DK("Signature",j([z7(j([p("signature")]),j([I7(d,j([K1(z.signature)]))]))])),DK("Tests",j([UP(Z)]))])}else W=d;return k(X,I0(q,W))}function IP(Z){return U1(j([p("keymap-picker")]),j1(j([["default","Std"],["vim","Vim"],["emacs","Emacs"]]),(J)=>{return F6(j([z8(j([["keymap-option",!0],["active",Z.editor_keymap===J[0]]])),e1("title",J[1]+" keybindings"),M0(new E5(J[0]))]),j([K1(J[1])]))}))}function VP(Z,J,Q){let X="Pass "+Q0(Z.current_iteration)+"/"+Q0(Z.iteration_count)+" · Problem "+Q0(Z.problem_index+1)+"/"+Q0(g6(Z.selected)),Y=J.category+"|"+J.subcategory+"|"+J.title+"|"+Q0(Z.current_iteration);return U1(j([p("drill-container")]),j([U1(j([p("drill-header")]),j([F6(j([p("btn-secondary"),M0(DH)]),j([K1("← Exit")])),$W(j([p("drill-title")]),j([K1(Q.title)])),IP(Z),U1(j([p("progress-text")]),j([K1(X)]))])),U1(j([p("drill-grid")]),j([U1(j([p("drill-side")]),zP(Z,J,Q)),U1(j([p("drill-main")]),k(m8(j([p("editor-frame")]),j([[Y,GH(j([UH(Z.draft),IH(x5(Q.language)),zH(Z.editor_keymap),jH((K)=>{return new r7(K)}),VH(GP(Z))]))]])),k(WP(Z,Q),KP(Z,Q))))]))]))}function nF(Z){return A4(e6(Z),(J)=>{return A4(U9(J.category,J.subcategory,J.title),(Q)=>{return new v(VP(Z,J,Q))})})}var lF="src/algodrill/view/menu.gleam";function HP(Z){let J=Z.selected;if(J instanceof w)return k4();else{let Q=J;return m8(j([p("chips")]),j1(Q,(X)=>{return[X.category+"|"+X.subcategory+"|"+X.title,k0(j([p("chip")]),j([K1(X.title+" "),F6(j([p("chip-remove"),e1("aria-label","Remove "+X.title),M0(new T8(X))]),j([K1("×")]))]))]}))}}function sF(Z,J){let Q=o7(Z.attempts,J);if(Q instanceof v){let X=Q[0],Y;if(X instanceof q9)Y=["badge badge-passed","✓"];else Y=["badge badge-failed","✗"];let K=Y,q=K[0],W=K[1];return k0(j([p(q)]),j([K1(W)]))}else return k4()}function MK(Z){return hU("keydown",w1("key",k1,(J)=>{if(J==="Enter")return $1(bZ(Z,!0,!1));else if(J===" ")return $1(bZ(Z,!0,!1));else return R4(bZ(Z,!1,!1),"key")}))}function OP(Z,J){let Q=O4(J),X,Y=e7();X=bQ(Y,(q)=>{let W=q.subcategories;return bQ(W,(G)=>{let U=G.problems;return wQ(U,(z)=>{if(fQ(O4(z.title),Q))return new v([new J9(q.name,G.name,z.title),z]);else return new L1(void 0)})})});let K=X;if(K instanceof w)return U1(j([p("search-results")]),j([U1(j([p("pane-empty")]),j([K1("No problems match “"+J+"”")]))]));else return m8(j([p("search-results")]),j1(K,(q)=>{let W=q[0];return[W.category+"|"+W.subcategory+"|"+W.title,(()=>{let G=e9(Z.selected,W);return U1(j([z8(j([["search-hit",!0],["selected",G]])),zZ(0),M0(new T8(W)),MK(new T8(W))]),j([k0(j([p("search-hit-title")]),j([K1(W.title)])),sF(Z,W),k0(j([p("search-hit-context")]),j([K1(W.category+" › "+W.subcategory)]))]))})()]}))}function FP(Z,J){return U1(j([z8(j([["pane-item",!0],["selected",e9(Z.selected,J)]])),zZ(0),M0(new T8(J)),MK(new T8(J))]),j([K1(J.title),sF(Z,J)]))}function AK(Z,J){return U1(j([p("pane")]),j([FZ(d,j([K1(Z)])),J]))}function NP(Z,J){return AK("Problems",(()=>{if(J instanceof w)return U1(j([p("pane-list")]),j([U1(j([p("pane-empty")]),j([K1("Pick a subcategory first")]))]));else{let Q=Z.selected_category,X;if(Q instanceof Q1)X=Q[0];else throw V9("let_assert",lF,"algodrill/view/menu",271,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Q,start:7920,end:7962,pattern_start:7931,pattern_end:7940});let Y=Z.selected_subcategory,K;if(Y instanceof Q1)K=Y[0];else throw V9("let_assert",lF,"algodrill/view/menu",272,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Y,start:7969,end:8014,pattern_start:7980,pattern_end:7989});return m8(j([p("pane-list")]),j1(J,(q)=>{let W=new J9(X,K,q.title);return[q.title,FP(Z,W)]}))}})())}function iF(Z,J,Q){return U1(j([z8(j([["pane-item",!0],["current",J]])),zZ(0),M0(Q),MK(Q)]),j([K1(Z)]))}function RP(Z){let J,Q=Z.selected_category;if(Q instanceof Q1){let Y=Q[0];J=kF(Y)}else J=d;let X=J;return AK("Subcategory",(()=>{if(X instanceof w)return U1(j([p("pane-list")]),j([U1(j([p("pane-empty")]),j([K1("Pick a category first")]))]));else return m8(j([p("pane-list")]),j1(X,(Y)=>{return[Y,iF(Y,B1(Z.selected_subcategory,new Q1(Y)),new A5(Y))]}))})())}function DP(Z){return AK("Category",m8(j([p("pane-list")]),j1(_F(),(J)=>{return[J,iF(J,B1(Z.selected_category,new Q1(J)),new M5(J))]})))}function MP(Z){let J,Q=j(["Categories"]),X=I0(Q,BQ(j([Z.selected_category])));J=I0(X,BQ(j([Z.selected_subcategory])));let Y=J,K=g6(Y)-1;return U1(j([p("breadcrumbs")]),(()=>{let W=o5(Y,(G,U)=>{if(U===K)return j([k0(j([p("breadcrumb")]),j([K1(G)]))]);else return j([k0(j([p("breadcrumb clickable"),M0(new L5(U))]),j([K1(G)])),K1(" "),k0(j([p("breadcrumb")]),j([K1("/")])),K1(" ")])});return j4(W)})())}function LK(Z){let J,Q=Z.selected_category,X=Z.selected_subcategory;if(Q instanceof Q1&&X instanceof Q1){let K=Q[0],q=X[0];J=zQ(K,q)}else J=d;let Y=J;return U1(j([p("menu-container")]),k(U1(j([p("menu-top")]),j([yW(j([p("menu-title")]),j([K1("Algo Drill")])),zX(j([YX("search"),p("search"),RW("Search problems…"),KX(Z.search),fU((K)=>{return new S5(K)})]))])),(()=>{let K,q=Fq(Z.search);if(q==="")K=j([MP(Z),U1(j([p("panes-container")]),j([DP(Z),RP(Z),NP(Z,Y)]))]);else K=j([OP(Z,q)]);return I0(K,j([HP(Z),U1(j([p("iteration-control")]),j([uW(j([OW("iterations")]),j([K1("Repetitions per problem")])),zX(j([YX("number"),P4("iterations"),NW("1"),FW("20"),KX(Q0(Z.iteration_count)),gU((G)=>{return new B5(G)})])),k0(j([p("progress-text")]),j([K1(Q0(g6(Z.selected))+" selected")]))])),U1(j([p("menu-actions")]),j([F6(j([P4("startDrill"),p("btn-primary"),T4(Z.selected instanceof w),M0(RH)]),j([K1("Start drill")])),F6(j([P4("selectAll"),p("btn-secondary"),T4(Y instanceof w),M0(FH)]),j([K1("Select all in subcategory")])),F6(j([P4("clearSelection"),p("btn-secondary"),M0(NH)]),j([K1("Clear selection")]))]))]))})()))}var LP="src/algodrill.gleam";function BP(Z){if(Z.route instanceof d7)return LK(Z);else{let Q=nF(Z);if(Q instanceof v)return Q[0];else return LK(Z)}}function PP(Z){if(Z instanceof P5)return!1;else if(Z instanceof T5)if(!Z[0])return!1;else return!0;else if(Z instanceof i7)return!1;else if(Z instanceof r7)return!1;else if(Z instanceof C5)return!1;else if(Z instanceof c9)return!1;else if(Z instanceof W9)return!1;else return!0}function BK(Z){let J=e6(Z);if(J instanceof v){let Q=J[0],X=U9(Q.category,Q.subcategory,Q.title);if(X instanceof v){let Y=X[0];return new v(x5(Y.language))}else return X}else return J}function rF(Z,J,Q){let X=o7(Z,J);if(Q)return b6(Z,J,tJ);else if(X instanceof v)if(X[0]instanceof q9)return Z;else return b6(Z,J,D5);else return b6(Z,J,D5)}function oF(Z){let J=e6(Z);if(J instanceof v){let Q=J[0],X=U9(Q.category,Q.subcategory,Q.title);if(X instanceof v){let K=X[0].check;if(K instanceof Q1){let q=K[0];return new v(q)}else return new L1(void 0)}else return X}else return J}function TP(){return p6((Z)=>{return YY("draft-save",400,()=>{return Z(AH)})})}function PK(Z){let J=Z[0],Q=Z[1],X=J.route instanceof p9&&!B1(oF(J),new L1(void 0)),Y=BK(J);if(X&&Y instanceof v){let K=Y[0];if(_5(J,K)instanceof l7)return[new A1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,J.draft,J.revealed_solution,b6(J.runtimes,K,qK),J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap),S4(j([Q,hF(K)]))];else return Z}else return Z}function $5(Z){let J=U9(Z.category,Z.subcategory,Z.title);if(J instanceof v){let X=J[0].check;if(X instanceof Q1)return X[0].starter;else return""}else return""}function aF(Z){return new A1(n7,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,"",V1,Z.runtimes,R5,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap)}function SP(Z,J){if(e9(Z,J))return r0(Z,(X)=>{return!B1(X,J)});else return I0(Z,j([J]))}function EP(Z,J){if(J instanceof M5){let Q=J[0];return[new A1(Z.route,new Q1(Q),V1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof A5){let Q=J[0];return[new A1(Z.route,Z.selected_category,new Q1(Q),Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof L5)if(J[0]===0)return[new A1(Z.route,V1,V1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()];else return[new A1(Z.route,Z.selected_category,V1,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()];else if(J instanceof T8){let Q=J[0];return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,SP(Z.selected,Q),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof eJ){let{selected_category:Q,selected_subcategory:X}=Z;if(Q instanceof Q1&&X instanceof Q1){let Y=Q[0],K=X[0],q,W=zQ(Y,K),G=j1(W,(z)=>{return new J9(Y,K,z.title)});q=r0(G,(z)=>{return!e9(Z.selected,z)});let U=q;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,I0(Z.selected,U),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else return[Z,N1()]}else if(J instanceof ZQ)return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,d,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()];else if(J instanceof B5){let Q=J[0],X,Y=mQ(Q);if(Y instanceof v){let q=Y[0];if(q>0)X=q;else X=1}else X=1;let K=X;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,K,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof JQ){let Q=Z.selected;if(Q instanceof w)return[Z,N1()];else{let X=Q.head;return PK([new A1(iJ,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,$5(X),V1,Z.runtimes,R5,b6(Z.drafts,X,$5(X)),Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()])}}else if(J instanceof P5)return[Z,p6((Q)=>{return Q(new T5(KY("Exit the drill? Your typed code will be lost.")))})];else if(J instanceof T5)if(J[0])return[aF(Z),N1()];else return[Z,N1()];else if(J instanceof i7){let Q=J[0],X,Y=Z.revealed_solution;if(Y instanceof Q1)if(Y[0]===Q)X=V1;else X=new Q1(Q);else X=new Q1(Q);let K=X;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,K,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof QQ){let Q;if(Z.problem_index+1<g6(Z.selected))Q=[Z.problem_index+1,Z.current_iteration];else Q=[0,Z.current_iteration+1];let Y=Q,K=Y[0],q=Y[1];if(q>Z.iteration_count)return[aF(Z),p6((G)=>{return qY("Drill complete.")})];else{let G=new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,K,Z.iteration_count,q,Z.draft,V1,Z.runtimes,R5,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),U,z=e6(G);if(z instanceof v){let V=z[0];U=new A1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,$5(V),G.revealed_solution,G.runtimes,G.run,b6(G.drafts,V,$5(V)),G.attempts,G.search,G.next_run_id,G.editor_keymap)}else U=new A1(G.route,G.selected_category,G.selected_subcategory,G.selected,G.problem_index,G.iteration_count,G.current_iteration,"",G.revealed_solution,G.runtimes,G.run,G.drafts,G.attempts,G.search,G.next_run_id,G.editor_keymap);return PK([U,N1()])}}else if(J instanceof S5){let Q=J[0];return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Q,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof E5){let Q=J[0];return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Q),N1()]}else if(J instanceof r7){let Q=J[0],X,Y=e6(Z);if(Y instanceof v){let q=Y[0];X=b6(Z.drafts,q,Q)}else X=Z.drafts;let K=X;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Q,Z.revealed_solution,Z.runtimes,Z.run,K,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),TP()]}else if(J instanceof XQ)return[Z,N1()];else if(J instanceof C5){let Q=BK(Z),X=oF(Z);if(Q instanceof v&&X instanceof v){let Y=Q[0],K=X[0];if(_5(Z,Y)instanceof s7){let W=Z.next_run_id;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new Y9(W),Z.drafts,Z.attempts,Z.search,W+1,Z.editor_keymap),gF(Y,W,Z.draft,K.harness)]}else return[Z,N1()]}else return[Z,N1()]}else if(J instanceof c9){let Q=J.language;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,b6(Z.runtimes,Q,OH),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof W9){let{language:Q,message:X}=J;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,b6(Z.runtimes,Q,new aJ(X)),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else if(J instanceof a7){let{id:Q,outcome:X}=J,Y=Z.run;if(Y instanceof Y9)if(Y.id===Q){let q;if(X instanceof Q9){let I=X[0];q=!(I instanceof w)&&Kq(I,(V)=>{return V.passed})}else if(X instanceof X9)q=!1;else q=!1;let W=q,G,U=e6(Z);if(U instanceof v){let I=U[0];G=rF(Z.attempts,I,W)}else G=Z.attempts;let z=G;return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new K9(X),Z.drafts,z,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else return[Z,N1()];else return[Z,N1()]}else{let Q=J.id,X=Z.run;if(X instanceof Y9)if(X.id===Q){let K,q=e6(Z);if(q instanceof v){let U=q[0];K=rF(Z.attempts,U,!1)}else K=Z.attempts;let W=K,G=BK(Z);if(G instanceof v){let U=G[0];return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,b6(Z.runtimes,U,qK),new K9(zK),Z.drafts,W,Z.search,Z.next_run_id,Z.editor_keymap),fF(U)]}else return[new A1(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new K9(zK),Z.drafts,W,Z.search,Z.next_run_id,Z.editor_keymap),N1()]}else return[Z,N1()];else return[Z,N1()]}}function CP(Z,J){let Q=EP(Z,J),X=Q[0],Y=Q[1];if(PP(J))return[X,S4(j([dF(X),Y]))];else return[X,Y]}function _P(Z,J){let Q=o7(Z.drafts,J);if(Q instanceof v)return Q[0];else return $5(J)}function kP(Z){let J=cF(),Q,X=J.route,Y=e6(J);if(X instanceof p9&&Y instanceof v){let q=Y[0];Q=new A1(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,_P(J,q),J.revealed_solution,J.runtimes,J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap)}else Q=J;return PK([Q,N1()])}function tF(){KK();let Z=bU(kP,CP,BP),J=yU(Z,"#app",void 0);if(!(J instanceof v))throw V9("let_assert",LP,"algodrill",29,"main","Pattern match failed, no pattern matched the value.",{value:J,start:1076,end:1125,pattern_start:1087,pattern_end:1092});return}tF();
