class P{withFields(Z){let J=Object.keys(this).map((Q)=>(Q in Z)?Z[Q]:this[Q]);return new this.constructor(...J)}}class tQ{static fromArray(Z,J){return j(Z,J)}[Symbol.iterator](){return new hq(this)}toArray(){return[...this]}atLeastLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return J!==void 0}hasLength(Z){let J=this;while(Z-- >0&&J)J=J.tail;return Z===-1&&J instanceof x}countLength(){let Z=this,J=0;while(Z)Z=Z.tail,J++;return J-1}}function w(Z,J){return new M4(Z,J)}function j(Z,J){let Q=J||$;for(let X=Z.length-1;X>=0;--X)Q=new M4(Z[X],Q);return Q}class hq{#Z;constructor(Z){this.#Z=Z}next(){if(this.#Z instanceof x)return{done:!0};else{let{head:Z,tail:J}=this.#Z;return this.#Z=J,{value:Z,done:!1}}}}class x extends tQ{}var $=new x,$q=()=>$,eQ=(Z)=>Z instanceof x;class M4 extends tQ{constructor(Z,J){super();this.head=Z,this.tail=J}}var q9=(Z,J)=>new M4(Z,J),Y8=(Z)=>Z instanceof M4,W9=(Z)=>Z.head,f6=(Z)=>Z.tail;class A4{bitSize;byteSize;bitOffset;rawBuffer;constructor(Z,J,Q){if(!(Z instanceof Uint8Array))throw globalThis.Error("BitArray can only be constructed from a Uint8Array");if(this.bitSize=J??Z.length*8,this.byteSize=Math.trunc((this.bitSize+7)/8),this.bitOffset=Q??0,this.bitSize<0)throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);if(this.bitOffset<0||this.bitOffset>7)throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);if(Z.length!==Math.trunc((this.bitOffset+this.bitSize+7)/8))throw globalThis.Error("BitArray buffer length is invalid");this.rawBuffer=Z}byteAt(Z){if(Z<0||Z>=this.byteSize)return;return R4(this.rawBuffer,this.bitOffset,Z)}equals(Z){if(this.bitSize!==Z.bitSize)return!1;let J=Math.trunc(this.bitSize/8);if(this.bitOffset===0&&Z.bitOffset===0){for(let X=0;X<J;X++)if(this.rawBuffer[X]!==Z.rawBuffer[X])return!1;let Q=this.bitSize%8;if(Q){let X=8-Q;if(this.rawBuffer[J]>>X!==Z.rawBuffer[J]>>X)return!1}}else{for(let X=0;X<J;X++){let Y=R4(this.rawBuffer,this.bitOffset,X),K=R4(Z.rawBuffer,Z.bitOffset,X);if(Y!==K)return!1}let Q=this.bitSize%8;if(Q){let X=R4(this.rawBuffer,this.bitOffset,J),Y=R4(Z.rawBuffer,Z.bitOffset,J),K=8-Q;if(X>>K!==Y>>K)return!1}}return!0}get buffer(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");return this.rawBuffer}get length(){if(this.bitOffset!==0||this.bitSize%8!==0)throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");return this.rawBuffer.length}}function R4(Z,J,Q){if(J===0)return Z[Q]??0;else{let X=Z[Q]<<J&255,Y=Z[Q+1]>>8-J;return X|Y}}class ZX{constructor(Z){this.value=Z}}class GZ extends P{static isResult(Z){return Z instanceof GZ}}class L extends GZ{constructor(Z){super();this[0]=Z}isOk(){return!0}}var m0=(Z)=>new L(Z),F1=(Z)=>Z instanceof L,D1=(Z)=>Z[0];class V0 extends GZ{constructor(Z){super();this[0]=Z}isOk(){return!1}}var t0=(Z)=>new V0(Z),gq=(Z)=>Z instanceof V0;function P0(Z,J){let Q=[Z,J];while(Q.length){let X=Q.pop(),Y=Q.pop();if(X===Y)continue;if(!yq(X)||!yq(Y))return!1;if(!mH(X,Y)||hH(X,Y)||$H(X,Y)||gH(X,Y)||fH(X,Y)||uH(X,Y)||vH(X,Y))return!1;let q=Object.getPrototypeOf(X);if(q!==null&&typeof q.equals==="function")try{if(X.equals(Y))continue;else return!1}catch{}let[W,G]=yH(X),I=W(X),U=W(Y);if(I.length!==U.length)return!1;for(let z of I)Q.push(G(X,z),G(Y,z))}return!0}function yH(Z){if(Z instanceof Map)return[(J)=>J.keys(),(J,Q)=>J.get(Q)];else{let J=Z instanceof globalThis.Error?["message"]:[];return[(Q)=>[...J,...Object.keys(Q)],(Q,X)=>Q[X]]}}function hH(Z,J){return Z instanceof Date&&(Z>J||Z<J)}function $H(Z,J){return!(Z instanceof A4)&&Z.buffer instanceof ArrayBuffer&&Z.BYTES_PER_ELEMENT&&!(Z.byteLength===J.byteLength&&Z.every((Q,X)=>Q===J[X]))}function gH(Z,J){return Array.isArray(Z)&&Z.length!==J.length}function fH(Z,J){return Z instanceof Map&&Z.size!==J.size}function uH(Z,J){return Z instanceof Set&&(Z.size!=J.size||[...Z].some((Q)=>!J.has(Q)))}function vH(Z,J){return Z instanceof RegExp&&(Z.source!==J.source||Z.flags!==J.flags)}function yq(Z){return typeof Z==="object"&&Z!==null}function mH(Z,J){if(typeof Z!=="object"&&typeof J!=="object"&&(!Z||!J))return!1;if([Promise,WeakSet,WeakMap,Function].some((X)=>Z instanceof X))return!1;return Z.constructor===J.constructor}function y8(Z,J){return Math.trunc(JX(Z,J))}function JX(Z,J){if(J===0)return 0;else return Z/J}function R7(Z,J,Q,X,Y,K,q){let W=new globalThis.Error(K);W.gleam_error=Z,W.file=J,W.module=Q,W.line=X,W.function=Y,W.fn=Y;for(let G in q)W[G]=q[G];return W}class m1 extends P{}var M7=new m1,fq=()=>M7;class B1 extends P{}var A7=new B1,uq=()=>A7;class QX extends P{}var D7=new QX,vq=()=>D7;class a extends P{constructor(Z){super();this[0]=Z}}var IZ=(Z)=>Z instanceof a,UZ=(Z)=>Z[0];class U6 extends P{}var U0=new U6;function nH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function pH(Z){return nH(Z,$)}function cH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return pH(X);else{let Y=Q.head;if(Y instanceof a){let K=Q.tail,q=Y[0];Z=K,J=w(q,X)}else Z=Q.tail,J=X}}}function XX(Z){return cH(Z,$)}var mq=new WeakMap,YX=new DataView(new ArrayBuffer(8)),KX=0;function qX(Z){let J=mq.get(Z);if(J!==void 0)return J;let Q=KX++;if(KX===2147483647)KX=0;return mq.set(Z,Q),Q}function WX(Z,J){return Z^J+2654435769+(Z<<6)+(Z>>2)|0}function GX(Z){let J=0,Q=Z.length;for(let X=0;X<Q;X++)J=Math.imul(31,J)+Z.charCodeAt(X)|0;return J}function cq(Z){YX.setFloat64(0,Z);let J=YX.getInt32(0),Q=YX.getInt32(4);return Math.imul(73244475,J>>16^J)^Q}function dH(Z){return GX(Z.toString())}function lH(Z){let J=Object.getPrototypeOf(Z);if(J!==null&&typeof J.hashCode==="function")try{let X=Z.hashCode(Z);if(typeof X==="number")return X}catch{}if(Z instanceof Promise||Z instanceof WeakSet||Z instanceof WeakMap)return qX(Z);if(Z instanceof Date)return cq(Z.getTime());let Q=0;if(Z instanceof ArrayBuffer)Z=new Uint8Array(Z);if(Array.isArray(Z)||Z instanceof Uint8Array)for(let X=0;X<Z.length;X++)Q=Math.imul(31,Q)+z6(Z[X])|0;else if(Z instanceof Set)Z.forEach((X)=>{Q=Q+z6(X)|0});else if(Z instanceof Map)Z.forEach((X,Y)=>{Q=Q+WX(z6(X),z6(Y))|0});else{let X=Object.keys(Z);for(let Y=0;Y<X.length;Y++){let K=X[Y],q=Z[K];Q=Q+WX(z6(q),GX(K))|0}}return Q}function z6(Z){if(Z===null)return 1108378658;if(Z===void 0)return 1108378659;if(Z===!0)return 1108378657;if(Z===!1)return 1108378656;switch(typeof Z){case"number":return cq(Z);case"string":return GX(Z);case"bigint":return dH(Z);case"object":return lH(Z);case"symbol":return qX(Z);case"function":return qX(Z);default:return 0}}class K8{constructor(Z,J){this.size=Z,this.root=J}}var D4=5,sH=(1<<D4)-1,VZ=Symbol();class L7{constructor(Z,J,Q,X){this.datamap=J,this.nodemap=Q,this.data=X,this.generation=Z}equals(Z){if(this===Z)return!0;if(!(Z instanceof L7))return!1;if(this.datamap!==Z.datamap||this.nodemap!==Z.nodemap)return!1;let J=this.data,Q=Z.data;if(J.length!==Q.length)return!1;if(this.datamap===0&&this.nodemap===0)return this.#Z(Q);let X=J.length-B4(this.nodemap);for(let Y=0;Y<X;Y+=2)if(!P0(J[Y],Q[Y])||!P0(J[Y+1],Q[Y+1]))return!1;for(let Y=X;Y<J.length;++Y)if(!J[Y].equals(Q[Y]))return!1;return!0}#Z(Z){let J=this.data;Z:for(let Q=0;Q<J.length;Q+=2){for(let X=0;X<Z.length;X+=2)if(P0(J[Q],Z[X])){if(!P0(J[Q+1],Z[X+1]))return!1;continue Z}return!1}return!0}hashCode(){let Z=this.data,J=Z.length-B4(this.nodemap),Q=0;for(let X=0;X<J;X+=2)Q=Q+WX(z6(Z[X+1]),z6(Z[X]))|0;for(let X=J;X<Z.length;++X)Q=Q+Z[X].hashCode()|0;return Q}}var dq=rH(0),lq=new K8(0,dq),iH=t0(void 0);function rH(Z){return new L7(Z,0,0,[])}function sq(Z,J){if(Z.generation===J)return Z;let Q=Z.data.slice(0);return new L7(J,Z.datamap,Z.nodemap,Q)}function jZ(Z,J,Q,X){if(Z.data[Q]===X)return Z;return Z=sq(Z,J),Z.data[Q]=X,Z}function nq(Z,J,Q,X,Y,K){let q=Z.data,W=q.length,G=Array(W+2),I=0,U=0;while(I<X)G[U++]=q[I++];G[U++]=Y,G[U++]=K;while(I<W)G[U++]=q[I++];return new L7(J,Z.datamap|Q,Z.nodemap,G)}function pq(Z,J,Q,X){Z=sq(Z,J);let Y=Z.data,K=Y.length;for(let q=X,W=X+2;W<K;++W,++q)Y[q]=Y[W];return Y.pop(),Y.pop(),Z.datamap^=Q,Z}function G9(){return lq}function q8(Z,J){let Q=aH(Z.root,J,z6(J));return Q!==VZ?m0(Q):iH}function aH(Z,J,Q){for(let Y=0;Y<32;Y+=D4){let K=Z.data,q=UX(Q,Y);if(Z.nodemap&q)Z=K[K.length-1-B7(Z.nodemap,q)];else if(Z.datamap&q){let W=Math.imul(B7(Z.datamap,q),2);return P0(J,K[W])?K[W+1]:VZ}else return VZ}let X=Z.data;for(let Y=0;Y<X.length;Y+=2)if(P0(J,X[Y]))return X[Y+1];return VZ}function IX(Z){return{generation:rq(Z),root:Z.root,size:Z.size,dict:Z}}function iq(Z){if(Z.root===Z.dict.root)return Z.dict;return new K8(Z.size,Z.root)}function rq(Z){let J=Z.root;if(J.generation<Number.MAX_SAFE_INTEGER)return J.generation+1;let Q=[J];while(Q.length){let X=Q.pop();X.generation=0;let Y=X.data.length-B4(X.nodemap);for(let K=Y;K<X.data.length;++K)Q.push(X.data[K])}return 1}var zZ=IX(lq);function P7(Z,J,Q){zZ.generation=rq(Z),zZ.size=Z.size;let X=z6(J),Y=FZ(zZ,Z.root,J,Q,X,0);if(Y===Z.root)return Z;return new K8(zZ.size,Y)}function FZ(Z,J,Q,X,Y,K){let q=J.data,W=Z.generation;if(K>32){for(let k=0;k<q.length;k+=2)if(P0(Q,q[k]))return jZ(J,W,k+1,X);return Z.size+=1,nq(J,W,0,q.length,Q,X)}let G=UX(Y,K);if(J.nodemap&G){let k=q.length-1-B7(J.nodemap,G),D=q[k];return D=FZ(Z,D,Q,X,Y,K+D4),jZ(J,W,k,D)}let I=Math.imul(B7(J.datamap,G),2);if((J.datamap&G)===0)return Z.size+=1,nq(J,W,G,I,Q,X);if(P0(Q,q[I]))return jZ(J,W,I+1,X);let U=K+D4,z=dq;z=FZ(Z,z,Q,X,Y,U);let V=q[I],F=q[I+1],H=z6(V);z=FZ(Z,z,V,F,H,U),Z.size-=1;let N=q.length,R=N-1-B7(J.nodemap,G),T=Array(N-1),E=0,_=0;while(E<I)T[_++]=q[E++];E+=2;while(E<=R)T[_++]=q[E++];T[_++]=z;while(E<N)T[_++]=q[E++];return new L7(W,J.datamap^G,J.nodemap|G,T)}function aq(Z,J){let Q=z6(Z);return J.root=oq(J,J.root,Z,Q,0),J}function oq(Z,J,Q,X,Y){let K=J.data,q=Z.generation;if(Y>32){for(let I=0;I<K.length;I+=2)if(P0(Q,K[I]))return Z.size-=1,pq(J,q,0,I);return J}let W=UX(X,Y),G=Math.imul(B7(J.datamap,W),2);if((J.nodemap&W)!==0){let I=K.length-1-B7(J.nodemap,W),U=K[I];if(U=oq(Z,U,Q,X,Y+D4),U.nodemap!==0||U.data.length>2)return jZ(J,q,I,U);let z=K.length,V=Array(z+1),F=0,H=0;while(F<G)V[H++]=K[F++];V[H++]=U.data[0],V[H++]=U.data[1];while(F<I)V[H++]=K[F++];F++;while(F<z)V[H++]=K[F++];return new L7(q,J.datamap|W,J.nodemap^W,V)}if((J.datamap&W)===0||!P0(Q,K[G]))return J;return Z.size-=1,pq(J,q,W,G)}function S7(Z,J,Q){let X=[Z.root];while(X.length){let Y=X.pop(),K=Y.data,q=K.length-B4(Y.nodemap);for(let W=0;W<q;W+=2)J=Q(J,K[W],K[W+1]);for(let W=q;W<K.length;++W)X.push(K[W])}return J}function B4(Z){return Z-=Z>>>1&1431655765,Z=(Z&858993459)+(Z>>>2&858993459),Math.imul(Z+(Z>>>4)&252645135,16843009)>>>24}function B7(Z,J){return B4(Z&J-1)}function UX(Z,J){return 1<<(Z>>>J&sH)}function L4(Z){return S7(Z,$,(J,Q,X)=>{return w(Q,J)})}function zX(Z,J){let Q=IX(Z),X=((Y)=>{return aq(J,Y)})(Q);return iq(X)}class $8 extends P{}var u6=new $8;class eq extends P{}var P4=new eq;function tH(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else Z=Q.tail,J=X+1}}function I1(Z){return tH(Z,0)}function eH(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return K;else{let{head:q,tail:W}=X;if(Y(q))Z=W,J=Y,Q=K+1;else Z=W,J=Y,Q=K}}}function U9(Z,J){return eH(Z,J,0)}function I9(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function T0(Z){return I9(Z,$)}function z9(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return!1;else{let Y=Q.head;if(P0(Y,X))return!0;else Z=Q.tail,J=X}}}function OZ(Z){if(Z instanceof x)return new V0(void 0);else{let J=Z.head;return new L(J)}}function Z2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return T0(K);else{let{head:q,tail:W}=X,G;if(Y(q))G=w(q,K);else G=K;let U=G;Z=W,J=Y,Q=U}}}function Q1(Z,J){return Z2(Z,J,$)}function J2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return T0(K);else{let{head:q,tail:W}=X,G,I=Y(q);if(I instanceof L){let z=I[0];G=w(z,K)}else G=K;let U=G;Z=W,J=Y,Q=U}}}function V9(Z,J){return J2(Z,J,$)}function Q2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return T0(K);else{let q=X.head;Z=X.tail,J=Y,Q=w(Y(q),K)}}}function H0(Z,J){return Q2(Z,J,$)}function X2(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof x)return T0(W);else{let{head:G,tail:I}=Y,U=w(K(G,q),W);Z=I,J=K,Q=q+1,X=U}}}function S4(Z,J){return X2(Z,J,0,$)}function HZ(Z,J){while(!0){let Q=Z,X=J;if(X<=0)return Q;else if(Q instanceof x)return Q;else Z=Q.tail,J=X-1}}function Y2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return T0(K);else if(X instanceof x)return T0(K);else{let W=X.head;Z=X.tail,J=Y-1,Q=w(W,K)}}}function NZ(Z,J){return Y2(Z,J,$)}function K2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=w(Y,X)}}}function X1(Z,J){return K2(T0(Z),J)}function RZ(Z,J){return w(J,Z)}function q2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return T0(X);else{let Y=Q.head;Z=Q.tail,J=I9(Y,X)}}}function j9(Z){return q2(Z,$)}function T4(Z,J){return j9(H0(Z,J))}function L1(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return Y;else{let q=X.head;Z=X.tail,J=K(Y,q),Q=K}}}function F9(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return new V0(void 0);else{let{head:Y,tail:K}=Q;if(X(Y))return new L(Y);else Z=K,J=X}}}function ZW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return new V0(void 0);else{let{head:Y,tail:K}=Q,q=X(Y);if(q instanceof L)return q;else Z=K,J=X}}}function JW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return!0;else{let{head:Y,tail:K}=Q,q=X(Y);if(q)Z=K,J=X;else return q}}}function W2(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof x)return I9(K,W);else if(K instanceof x)return I9(Y,W);else{let{head:G,tail:I}=Y,U=K.head,z=K.tail,V=q(G,U);if(V instanceof m1)Z=Y,J=z,Q=q,X=w(U,W);else if(V instanceof B1)Z=I,J=K,Q=q,X=w(G,W);else Z=I,J=K,Q=q,X=w(G,W)}}}function G2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return T0(K);else{let q=X.tail;if(q instanceof x){let W=X.head;return T0(w(T0(W),K))}else{let W=X.head,G=q.head,I=q.tail,U=W2(W,G,Y,$);Z=I,J=Y,Q=w(U,K)}}}}function I2(Z,J,Q,X){while(!0){let Y=Z,K=J,q=Q,W=X;if(Y instanceof x)return I9(K,W);else if(K instanceof x)return I9(Y,W);else{let{head:G,tail:I}=Y,U=K.head,z=K.tail,V=q(G,U);if(V instanceof m1)Z=I,J=K,Q=q,X=w(G,W);else if(V instanceof B1)Z=Y,J=z,Q=q,X=w(U,W);else Z=Y,J=z,Q=q,X=w(U,W)}}}function U2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return T0(K);else{let q=X.tail;if(q instanceof x){let W=X.head;return T0(w(T0(W),K))}else{let W=X.head,G=q.head,I=q.tail,U=I2(W,G,Y,$);Z=I,J=Y,Q=w(U,K)}}}}function z2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return X;else if(Y instanceof $8)if(X.tail instanceof x)return X.head;else Z=U2(X,K,$),J=P4,Q=K;else if(X.tail instanceof x){let W=X.head;return T0(W)}else Z=G2(X,K,$),J=u6,Q=K}}function V2(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,I=X,U=Y,z=K,V=w(U,G);if(q instanceof x)if(I instanceof $8)return w(T0(V),z);else return w(V,z);else{let{head:F,tail:H}=q,N=W(U,F);if(I instanceof $8)if(N instanceof m1)Z=H,J=W,Q=V,X=I,Y=F,K=z;else if(N instanceof B1)Z=H,J=W,Q=V,X=I,Y=F,K=z;else{let R;if(I instanceof $8)R=w(T0(V),z);else R=w(V,z);let T=R;if(H instanceof x)return w(j([F]),T);else{let{head:E,tail:_}=H,k,D=W(F,E);if(D instanceof m1)k=u6;else if(D instanceof B1)k=u6;else k=P4;let S=k;Z=_,J=W,Q=j([F]),X=S,Y=E,K=T}}else if(N instanceof m1){let R;if(I instanceof $8)R=w(T0(V),z);else R=w(V,z);let T=R;if(H instanceof x)return w(j([F]),T);else{let{head:E,tail:_}=H,k,D=W(F,E);if(D instanceof m1)k=u6;else if(D instanceof B1)k=u6;else k=P4;let S=k;Z=_,J=W,Q=j([F]),X=S,Y=E,K=T}}else if(N instanceof B1){let R;if(I instanceof $8)R=w(T0(V),z);else R=w(V,z);let T=R;if(H instanceof x)return w(j([F]),T);else{let{head:E,tail:_}=H,k,D=W(F,E);if(D instanceof m1)k=u6;else if(D instanceof B1)k=u6;else k=P4;let S=k;Z=_,J=W,Q=j([F]),X=S,Y=E,K=T}}else Z=H,J=W,Q=V,X=I,Y=F,K=z}}}function MZ(Z,J){if(Z instanceof x)return Z;else{let Q=Z.tail;if(Q instanceof x)return Z;else{let X=Z.head,Y=Q.head,K=Q.tail,q,W=J(X,Y);if(W instanceof m1)q=u6;else if(W instanceof B1)q=u6;else q=P4;let G=q,I=V2(K,J,j([X]),G,Y,$);return z2(I,u6,J)}}}function j2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return[T0(K),X];else if(X instanceof x)return[T0(K),$];else{let W=X.head;Z=X.tail,J=Y-1,Q=w(W,K)}}}function QW(Z,J){return j2(Z,J,$)}function XW(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return;else{let{head:Y,tail:K}=Q;X(Y),Z=K,J=X}}}class qW extends P{}var _T=new qW;class IW extends P{}var hT=new IW;class UW extends P{}var $T=new UW;function zW(Z,J){if(Z===J)return A7;else if(jW(Z,J))return M7;else return D7}function AZ(Z,J){if(J==="")return jX(Z);else{let X=v0(Z),Y=FX(X,J);return H0(Y,v0)}}function M2(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;Z=Q.tail,J=X+Y}}}function VW(Z){return M2(Z,"")}function A2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return K;else{let q=X.head;Z=X.tail,J=Y,Q=K+Y+q}}}function DZ(Z,J){if(Z instanceof x)return"";else{let{head:Q,tail:X}=Z;return A2(X,J,Q)}}function BZ(Z){let Q=FW(Z);return OW(Q)}class g8 extends P{constructor(Z,J,Q){super();this.expected=Z,this.found=J,this.path=Q}}var MW=(Z,J,Q)=>new g8(Z,J,Q);class b1 extends P{constructor(Z){super();this.function=Z}}var P2=new b1(S2),a1=new b1(T2);var _0=new b1(E2),k4=new b1(k2);function v6(Z,J){let Q=J.function(Z),X=Q[0],Y=Q[1];if(Y instanceof x)return new L(X);else return new V0(Y)}function HX(Z,J,Q){let X=Q(Z);if(X instanceof L)return[X[0],$];else return[X[0],j([new g8(J,G8(Z),$)])]}function S2(Z){return HX(Z,"Float",LW)}function T7(Z,J){return new b1((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1];return[J(Y),K]})}function T2(Z){return HX(Z,"Int",PW)}function E2(Z){return HX(Z,"String",SW)}function C2(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(K instanceof x)return Y;else{let{head:q,tail:W}=K,G=q.function(X),I=G;if(G[1]instanceof x)return I;else Z=X,J=Y,Q=W}}}function AW(Z,J){return new b1((Q)=>{let X=Z.function(Q),Y=X;if(X[1]instanceof x)return Y;else return C2(Q,Y,J)})}function _2(Z){let J=AW(_0,j([(()=>{return T7(a1,A0)})(),(()=>{return T7(P2,PZ)})()])),Q=v6(Z,J);if(Q instanceof L)return Q[0];else return"<"+G8(Z)+">"}function w4(Z,J){let Q=H0(J,(Y)=>{let q=v0(Y);return _2(q)}),X=H0(Z[1],(Y)=>{return new g8(Y.expected,Y.found,X1(Q,Y.path))});return[Z[0],X]}function I8(Z){return new b1((J)=>{return BW(J,Z.function,(Q,X)=>{return w4(Q,j([X]))},0,$)})}function w2(Z,J,Q,X,Y){while(!0){let K=Z,q=J,W=Q,G=X,I=Y;if(K instanceof x){let z=W(G);return w4(z,T0(q))}else{let{head:U,tail:z}=K,V=NX(G,U);if(V instanceof L){let F=V[0];if(F instanceof a){let H=F[0];Z=z,J=w(U,q),Q=W,X=H,Y=I}else return I(G,w(U,q))}else{let F=V[0],R=[W(G)[0],j([new g8(F,G8(G),$)])];return w4(R,T0(q))}}}}function O9(Z,J,Q){return new b1((X)=>{let Y=w2(Z,$,J.function,X,(U,z)=>{let H=[J.function(U)[0],j([new g8("Field","Nothing",$)])];return w4(H,T0(z))}),K=Y[0],q=Y[1],W=Q(K).function(X),G=W[0],I=W[1];return[G,X1(q,I)]})}function k0(Z){return new b1((J)=>{return[Z,$]})}function DW(Z,J){return j([new g8(Z,G8(J),$)])}function h0(Z,J,Q){return O9(j([Z]),J,Q)}function m6(Z,J,Q,X){return new b1((Y)=>{let K,q,W=NX(Y,Z);if(W instanceof L){let N=W[0];if(N instanceof a){let R=N[0];q=Q.function(R)}else q=[J,$]}else{let N=W[0];q=[J,j([new g8(N,G8(Y),$)])]}K=w4(q,j([Z]));let I=K,U=I[0],z=I[1],V=X(U).function(Y),F=V[0],H=V[1];return[F,X1(z,H)]})}function k2(Z){if(P0(v0(!0),Z))return[!0,$];else if(P0(v0(!1),Z))return[!1,$];else return[!1,DW("Bool",Z)]}function LZ(Z){return new b1((J)=>{if(TW(J))return[U0,$];else{let X=Z.function(J),Y=X[0],K=X[1];return[new a(Y),K]}})}function x4(Z,J){return new b1((Q)=>{let X=Z.function(Q),Y=X[0],K=X[1],W=J(Y).function(Q),G=W,I=W[0];if(K instanceof x)return G;else return[I,K]})}function b4(Z,J){return new b1((Q)=>{return[Z,DW(J,Q)]})}var b2=void 0;function v0(Z){return Z}function RX(Z){if(/^[-+]?(\d+)$/.test(Z))return m0(parseInt(Z));else return t0(b2)}function A0(Z){return Z.toString()}function jX(Z){let J=y2(Z);if(J)return y4(Array.from(J).map((Q)=>Q.segment));else return y4(Z.match(/./gsu))}var EW=void 0;function y2(Z){if(globalThis.Intl&&Intl.Segmenter)return EW||=new Intl.Segmenter,EW.segment(Z)[Symbol.iterator]()}function C4(Z){return Z.toLowerCase()}function jW(Z,J){return Z<J}function FX(Z,J){return y4(Z.split(J))}function OX(Z,J){return Z.indexOf(J)>=0}function _4(Z,J){return Z.startsWith(J)}var CW=[" ","\t",`
`,"\v","\f","\r","","\u2028","\u2029"].join(""),h2=new RegExp(`^[${CW}]*`),$2=new RegExp(`[${CW}]*$`);function FW(Z){return Z.replace(h2,"")}function OW(Z){return Z.replace($2,"")}function G8(Z){if(typeof Z==="string")return"String";else if(typeof Z==="boolean")return"Bool";else if(f2(Z))return"Result";else if(SZ(Z))return"List";else if(Z instanceof A4)return"BitArray";else if(Z instanceof K8)return"Dict";else if(Number.isInteger(Z))return"Int";else if(Array.isArray(Z))return"Array";else if(typeof Z==="number")return"Float";else if(Z===null)return"Nil";else if(Z===void 0)return"Nil";else{let J=typeof Z;return J.charAt(0).toUpperCase()+J.slice(1)}}var{MAX_SAFE_INTEGER:wE,MIN_SAFE_INTEGER:kE}=Number;function PZ(Z){let J=Z.toString().replace("+","");if(J.indexOf(".")>=0)return J;else{let Q=J.indexOf("e");if(Q>=0)return J.slice(0,Q)+".0"+J.slice(Q);else return J+".0"}}class g2{#Z=new Set;inspect(Z){let J=typeof Z;if(Z===!0)return"True";if(Z===!1)return"False";if(Z===null)return"//js(null)";if(Z===void 0)return"Nil";if(J==="string")return this.#Y(Z);if(J==="bigint"||Number.isInteger(Z))return Z.toString();if(J==="number")return PZ(Z);if(Z instanceof ZX)return this.#W(Z);if(Z instanceof A4)return this.#K(Z);if(Z instanceof RegExp)return`//js(${Z})`;if(Z instanceof Date)return`//js(Date("${Z.toISOString()}"))`;if(Z instanceof globalThis.Error)return`//js(${Z.toString()})`;if(Z instanceof Function){let X=[];for(let Y of Array(Z.length).keys())X.push(String.fromCharCode(Y+97));return`//fn(${X.join(", ")}) { ... }`}if(this.#Z.size===this.#Z.add(Z).size)return"//js(circular reference)";let Q;if(Array.isArray(Z))Q=`#(${Z.map((X)=>this.inspect(X)).join(", ")})`;else if(SZ(Z))Q=this.#Q(Z);else if(Z instanceof P)Q=this.#J(Z);else if(Z instanceof K8)Q=this.#X(Z);else if(Z instanceof Set)return`//js(Set(${[...Z].map((X)=>this.inspect(X)).join(", ")}))`;else Q=this.#q(Z);return this.#Z.delete(Z),Q}#q(Z){let J=Object.getPrototypeOf(Z)?.constructor?.name||"Object",Q=[];for(let K of Object.keys(Z))Q.push(`${this.inspect(K)}: ${this.inspect(Z[K])}`);let X=Q.length?" "+Q.join(", ")+" ":"";return`//js(${J==="Object"?"":J+" "}{${X}})`}#X(Z){let J="dict.from_list([",Q=!0;return J=S7(Z,J,(X,Y,K)=>{if(!Q)X=X+", ";return Q=!1,X+"#("+this.inspect(Y)+", "+this.inspect(K)+")"}),J+"])"}#J(Z){let J=Object.keys(Z).map((Q)=>{let X=this.inspect(Z[Q]);return isNaN(parseInt(Q))?`${Q}: ${X}`:X}).join(", ");return J?`${Z.constructor.name}(${J})`:Z.constructor.name}#Q(Z){if(eQ(Z))return"[]";let J='charlist.from_string("',Q="[",X=Z;while(Y8(X)){let Y=X.head;if(X=X.tail,Q!=="[")Q+=", ";if(Q+=this.inspect(Y),J)if(Number.isInteger(Y)&&Y>=32&&Y<=126)J+=String.fromCharCode(Y);else J=null}if(J)return J+'")';else return Q+"]"}#Y(Z){let J='"';for(let Q=0;Q<Z.length;Q++){let X=Z[Q];switch(X){case`
`:J+="\\n";break;case"\r":J+="\\r";break;case"\t":J+="\\t";break;case"\f":J+="\\f";break;case"\\":J+="\\\\";break;case'"':J+="\\\"";break;default:if(X<" "||X>"~"&&X<" ")J+="\\u{"+X.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")+"}";else J+=X}}return J+='"',J}#W(Z){return`//utfcodepoint(${String.fromCodePoint(Z.value)})`}#K(Z){if(Z.bitSize===0)return"<<>>";let J="<<";for(let Q=0;Q<Z.byteSize-1;Q++)J+=Z.byteAt(Q).toString(),J+=", ";if(Z.byteSize*8===Z.bitSize)J+=Z.byteAt(Z.byteSize-1).toString();else{let Q=Z.bitSize%8;J+=Z.byteAt(Z.byteSize-1)>>8-Q,J+=`:size(${Q})`}return J+=">>",J}}function NX(Z,J){if(Z instanceof K8){let X=q8(Z,J);return m0(X.isOk()?new a(X[0]):new U6)}if(Z instanceof WeakMap||Z instanceof Map){let X={},Y=Z.get(J,X);if(Y===X)return m0(new U6);return m0(new a(Y))}let Q=Number.isInteger(J);if(Q&&J>=0&&J<8&&SZ(Z)){let X=0;for(let Y of Z){if(X===J)return m0(new a(Y));X++}return t0("Indexable")}if(Q&&Array.isArray(Z)||Z&&typeof Z==="object"||Z&&Object.getPrototypeOf(Z)===Object.prototype){if(J in Z)return m0(new a(Z[J]));return m0(new U6)}return t0(Q?"Indexable":"Dict")}function BW(Z,J,Q,X,Y){if(!(SZ(Z)||Array.isArray(Z))){let q=MW("List",G8(Z),Y);return[Y,y4([q])]}let K=[];for(let q of Z){let W=J(q),[G,I]=W;if(Y8(I)){let[U,z]=Q(W,X.toString());return[Y,z]}K.push(G),X++}return[y4(K),Y]}function LW(Z){if(typeof Z==="number")return m0(Z);return t0(0)}function PW(Z){if(Number.isInteger(Z))return m0(Z);return t0(0)}function SW(Z){if(typeof Z==="string")return m0(Z);return t0("")}function TW(Z){return Z===null||Z===void 0}function y4(Z){let J=$q(),Q=Z.length;while(Q--)J=q9(Z[Q],J);return J}function SZ(Z){return eQ(Z)||Y8(Z)}function f2(Z){return F1(Z)||gq(Z)}function TZ(Z,J){if(Z>J)return Z;else return J}function _W(Z,J){if(Z===J)return A7;else if(Z<J)return M7;else return D7}class wW extends P{}var u2=new wW;class AX extends P{}var YC=new AX;class kW extends P{}var KC=new kW;class xW extends P{}var qC=new xW;class bW extends P{}var WC=new bW;class yW extends P{}var GC=new yW;function H1(Z,J){if(Z instanceof L){let Q=Z[0];return new L(J(Q))}else return Z}function hW(Z,J){if(Z instanceof L)return Z;else{let Q=Z[0];return new V0(J(Q))}}function h4(Z,J){if(Z instanceof L){let Q=Z[0];return J(Q)}else return Z}function $4(Z,J){if(Z instanceof L)return Z[0];else return J}class DX extends P{}var FC=new DX;class BX extends P{}var OC=new BX;class $W extends P{}var HC=new $W;class gW extends P{}var EC=new gW;class fW extends P{}var kC=new fW;class uW extends P{}var p2=new uW;class vW extends P{}var xC=new vW;class mW extends P{}var c2=new mW;class pW extends P{}var gC=new pW;function cW(Z,J,Q){if(Z)return J;else return Q()}function y1(Z){return Z}function LX(Z){return JSON.stringify(Z)}function lW(Z){return Object.fromEntries(Z)}function C7(Z){return Z}function sW(Z){let J=[];while(Y8(Z))J.push(W9(Z)),Z=f6(Z);return J}function iW(){return null}function rW(Z){try{let J=JSON.parse(Z);return m0(J)}catch(J){return t0(s2(J,Z))}}function s2(Z,J){if(i2(Z))return aW();return r2(Z,J)}function i2(Z){return/((unexpected (end|eof))|(end of data)|(unterminated string)|(json( parse error|\.parse)\: expected '(\:|\}|\])'))/i.test(Z.message)}function r2(Z,J){let Q=[a2,o2,e2,t2];for(let X of Q){let Y=X(Z,J);if(Y)return Y}return H9("")}function a2(Z){let Q=/unexpected token '(.)', ".+" is not valid JSON/i.exec(Z.message);if(!Q)return null;let X=CZ(Q[1]);return H9(X)}function o2(Z){let Q=/unexpected token (.) in JSON at position (\d+)/i.exec(Z.message);if(!Q)return null;let X=CZ(Q[1]);return H9(X)}function t2(Z,J){let X=/(unexpected character|expected .*) at line (\d+) column (\d+)/i.exec(Z.message);if(!X)return null;let Y=Number(X[2]),K=Number(X[3]),q=ZN(Y,K,J),W=CZ(J[q]);return H9(W)}function e2(Z){let Q=/unexpected (identifier|token) "(.)"/i.exec(Z.message);if(!Q)return null;let X=CZ(Q[2]);return H9(X)}function CZ(Z){return"0x"+Z.charCodeAt(0).toString(16).toUpperCase()}function ZN(Z,J,Q){if(Z===1)return J-1;let X=1,Y=0;return Q.split("").find((K,q)=>{if(K===`
`)X+=1;if(X===Z)return Y=q+J,!0;return!1}),Y}class oW extends P{}var JN=new oW,aW=()=>JN;class tW extends P{constructor(Z){super();this[0]=Z}}var H9=(Z)=>new tW(Z);class eW extends P{constructor(Z){super();this[0]=Z}}function QN(Z,J){return h4(rW(Z),(Q)=>{let X=v6(Q,J);return hW(X,(Y)=>{return new eW(Y)})})}function _7(Z,J){return QN(Z,J)}function ZG(Z){return LX(Z)}function K1(Z){return C7(Z)}function g4(Z){return C7(Z)}function n6(Z){return C7(Z)}function XN(){return iW()}function PX(Z,J){if(Z instanceof a){let Q=Z[0];return J(Q)}else return XN()}function w7(Z){return lW(Z)}function YN(Z){return sW(Z)}function U8(Z,J){let X=H0(Z,J);return YN(X)}function f4(Z){return Z.replaceAll(/[><&"']/g,(J)=>{switch(J){case">":return"&gt;";case"<":return"&lt;";case"'":return"&#39;";case"&":return"&amp;";case'"':return"&quot;";default:return J}})}var I0=$,N9=new V0(void 0);function P1(Z){return w(Z,I0)}var KN=vq(),qN=fq(),WN=uq();function _Z(Z,J){if(Z.name===J.name)return WN;else if(Z.name<J.name)return qN;else return KN}class H6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class R9 extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}class S1 extends P{constructor(Z,J,Q,X,Y,K,q,W){super();this.kind=Z,this.name=J,this.handler=Q,this.include=X,this.prevent_default=Y,this.stop_propagation=K,this.debounce=q,this.throttle=W}}class M9 extends P{constructor(Z,J,Q){super();this.prevent_default=Z,this.stop_propagation=J,this.message=Q}}class WG extends P{constructor(Z){super();this.kind=Z}}class GG extends P{constructor(Z){super();this.kind=Z}}var TX=0,EX=1,CX=2,_X=0,wX=new WG(_X),zN=1,kX=new GG(zN),xX=2;function IG(Z,J){return new H6(TX,Z,J)}function UG(Z,J){return new R9(EX,Z,J)}function bX(Z,J,Q,X,Y,K,q){return new S1(CX,Z,J,Q,X,Y,K,q)}function VN(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else{let Y=Q.head;if(Y instanceof H6){let K=Y.name;if(K==="")Z=Q.tail,J=X;else if(K==="class"){let q=Y.value;if(q==="")Z=Q.tail,J=X;else{let W=Q.tail;if(W instanceof x){let G=Y;Z=W,J=w(G,X)}else{let G=W.head;if(G instanceof H6)if(G.name==="class"){let U=Y.kind,z=q,V=W.tail,F=G.value,H=z+" "+F,N=new H6(U,"class",H);Z=w(N,V),J=X}else{let U=Y;Z=W,J=w(U,X)}else{let I=Y;Z=W,J=w(I,X)}}}}else if(K==="style"){let q=Y.value;if(q==="")Z=Q.tail,J=X;else{let W=Q.tail;if(W instanceof x){let G=Y;Z=W,J=w(G,X)}else{let G=W.head;if(G instanceof H6)if(G.name==="style"){let U=Y.kind,z=q,V=W.tail,F=G.value,H=z+";"+F,N=new H6(U,"style",H);Z=w(N,V),J=X}else{let U=Y;Z=W,J=w(U,X)}else{let I=Y;Z=W,J=w(I,X)}}}}else{let q=Y;Z=Q.tail,J=w(q,X)}}else{let K=Y;Z=Q.tail,J=w(K,X)}}}}function zG(Z){if(Z instanceof x)return Z;else if(Z.tail instanceof x)return Z;else{let X=MZ(Z,(Y,K)=>{return _Z(K,Y)});return VN(X,I0)}}function s0(Z,J){return IG(Z,J)}function u4(Z,J){return UG(Z,J)}function jN(Z,J){if(J)return s0(Z,"");else return u4(Z,g4(!1))}function y(Z){return s0("class",Z)}function VG(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)return X;else if(Q.head[1]){let K=Q.tail,q=Q.head[0];return X+q+" "+VG(K,X)}else Z=Q.tail,J=X}}function n1(Z){return y(VG(Z,""))}function A9(Z){return s0("id",Z)}function wZ(Z,J){if(Z==="")return y("");else if(J==="")return y("");else return s0("style",Z+":"+J+";")}function kZ(Z){return s0("tabindex",A0(Z))}function f8(Z){return jN("disabled",Z)}function jG(Z){return s0("for",Z)}function FG(Z){return s0("max",Z)}function OG(Z){return s0("min",Z)}function HG(Z){return s0("placeholder",Z)}function yX(Z){return s0("type",Z)}function hX(Z){return s0("value",Z)}class bZ extends P{constructor(Z,J,Q){super();this.synchronous=Z,this.before_paint=J,this.after_paint=Q}}class NG extends P{constructor(Z,J,Q,X,Y,K,q){super();this.dispatch=Z,this.emit=J,this.select=Q,this.root=X,this.provide=Y,this.subscribe=K,this.unsubscribe=q}}var xZ=new bZ(I0,I0,I0);function j0(){return xZ}function N6(Z){return new bZ(P1((Q)=>{let X=Q.dispatch;return Z(X)}),xZ.before_paint,xZ.after_paint)}function v4(Z){return L1(Z,xZ,(J,Q)=>{return new bZ(L1(Q.synchronous,J.synchronous,RZ),L1(Q.before_paint,J.before_paint,RZ),L1(Q.after_paint,J.after_paint,RZ))})}function RG(Z,J,Q,X,Y,K,q,W){let G=new NG(J,Q,X,Y,K,q,W);return XW(Z.synchronous,(I)=>{return I(G)})}function d0(){return null}function x7(Z,J){return Z?.get(J)}function D9(Z,J,Q){return Z?.get(J)??Q()}function p6(Z,J){return Z&&Z.has(J)}function o1(Z,J,Q){return Z??=new Map,Z.set(J,Q),Z}function yZ(Z,J){return Z?.delete(J),Z}function MG(Z,J){if(typeof Z==="number"&&typeof J==="number")return Z===J||Z!==Z&&J!==J;return Z===J}function AG(Z,J){while(!0){let Q=Z,X=J;if(Q instanceof x)if(X instanceof x)return!0;else return!1;else if(X instanceof x)return!1;else{let{head:Y,tail:K}=Q,q=X.head,W=X.tail,G=MG(Y,q);if(G)Z=K,J=W;else return G}}}class R6 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.children=Q,this.keyed_children=X}}class M6 extends P{constructor(Z,J,Q,X,Y,K,q,W,G){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.children=K,this.keyed_children=q,this.self_closing=W,this.void=G}}class c6 extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.content=Q}}class d6 extends P{constructor(Z,J,Q,X,Y,K){super();this.kind=Z,this.key=J,this.namespace=Q,this.tag=X,this.attributes=Y,this.inner_html=K}}class p1 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.mapper=Q,this.child=X}}class b7 extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.key=J,this.dependencies=Q,this.view=X}}var y7=0,v8=1,B9=2,DG=3,u8=4,gX=5;function fX(Z,J,Q){return new R6(y7,Z,J,Q)}function n4(Z,J,Q,X,Y,K,q,W){return new M6(v8,Z,J,Q,zG(X),Y,K,q,W)}function p4(Z,J){if(J==="")if(Z==="area")return!0;else if(Z==="base")return!0;else if(Z==="br")return!0;else if(Z==="col")return!0;else if(Z==="embed")return!0;else if(Z==="hr")return!0;else if(Z==="img")return!0;else if(Z==="input")return!0;else if(Z==="link")return!0;else if(Z==="meta")return!0;else if(Z==="param")return!0;else if(Z==="source")return!0;else if(Z==="track")return!0;else if(Z==="wbr")return!0;else return!1;else return!1}function uX(Z,J){return new c6(B9,Z,J)}function BG(Z,J){if(Z instanceof p1){let Q=Z.mapper;return new p1(u8,Z.key,(X)=>{return y1(J)(Q(X))},y1(Z.child))}else return new p1(u8,Z.key,y1(J),y1(Z))}function LG(Z,J,Q){return new b7(gX,Z,J,Q)}function hZ(Z,J){if(J instanceof R6)return new R6(J.kind,Z,J.children,J.keyed_children);else if(J instanceof M6)return new M6(J.kind,Z,J.namespace,J.tag,J.attributes,J.children,J.keyed_children,J.self_closing,J.void);else if(J instanceof c6)return new c6(J.kind,Z,J.content);else if(J instanceof d6)return new d6(J.kind,Z,J.namespace,J.tag,J.attributes,J.inner_html);else if(J instanceof p1){let Q=J.child;return new p1(J.kind,Z,J.mapper,hZ(Z,Q))}else{let Q=J.view;return new b7(J.kind,Z,J.dependencies,()=>{return hZ(Z,Q())})}}class PG extends P{}var E_=new PG;class SG extends P{}var C_=new SG;class TG extends P{}var __=new TG;class EG extends P{}var w_=new EG;class CG extends P{}var k_=new CG;function e0(Z,J,Q){return n4("","",Z,J,Q,d0(),!1,p4(Z,""))}function $Z(Z){return uX("",Z)}function h7(){return uX("","")}function _G(Z,J){return LG("",Z,J)}function wG(Z){return y1(Z)}function kG(Z,J){return BG(Z,J)}function d(Z){return $Z(Z)}function xG(Z,J){return e0("h1",Z,J)}function gZ(Z,J){return e0("h2",Z,J)}function fZ(Z,J){return e0("h3",Z,J)}function bG(Z,J){return e0("section",Z,J)}function Y0(Z,J){return e0("div",Z,J)}function c4(Z,J){return e0("li",Z,J)}function $7(Z,J){return e0("pre",Z,J)}function d4(Z,J){return e0("ul",Z,J)}function L9(Z,J){return e0("code",Z,J)}function n0(Z,J){return e0("span",Z,J)}function U1(Z,J){return e0("button",Z,J)}function vX(Z){return e0("input",Z,I0)}function yG(Z,J){return e0("label",Z,J)}function uZ(Z,J){return e0("details",Z,J)}function vZ(Z,J){return e0("summary",Z,J)}class nZ extends P{constructor(Z,J,Q,X,Y){super();this.index=Z,this.path=J,this.removed=Q,this.changes=X,this.children=Y}}class hG extends P{constructor(Z,J){super();this.kind=Z,this.content=J}}class $G extends P{constructor(Z,J){super();this.kind=Z,this.inner_html=J}}class gG extends P{constructor(Z,J,Q){super();this.kind=Z,this.added=J,this.removed=Q}}class fG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.before=Q}}class uG extends P{constructor(Z,J,Q){super();this.kind=Z,this.index=J,this.with=Q}}class vG extends P{constructor(Z,J){super();this.kind=Z,this.index=J}}class mG extends P{constructor(Z,J,Q){super();this.kind=Z,this.children=J,this.before=Q}}var mX=0,nX=1,pX=2,cX=3,dX=4,lX=5,sX=6;function n8(Z,J,Q,X){return new nZ(Z,I0,J,Q,X)}function nG(Z){return new hG(mX,Z)}function pG(Z){return new $G(nX,Z)}function iX(Z,J){return new gG(pX,Z,J)}function cG(Z,J){return new fG(cX,Z,J)}function dG(Z){return new vG(dX,Z)}function F8(Z,J){return new uG(lX,Z,J)}function rX(Z,J){return new mG(sX,Z,J)}function lG(Z,J){return new nZ(J,w(Z.index,Z.path),Z.removed,Z.changes,Z.children)}class iG extends P{constructor(Z,J,Q,X,Y,K,q,W,G){super();this.kind=Z,this.open_shadow_root=J,this.will_adopt_styles=Q,this.observed_attributes=X,this.observed_properties=Y,this.requested_contexts=K,this.provided_contexts=q,this.vdom=W,this.memos=G}}class rG extends P{constructor(Z,J,Q){super();this.kind=Z,this.patch=J,this.memos=Q}}class aG extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.data=Q}}class oG extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}class tG extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class eG extends P{constructor(Z,J){super();this.kind=Z,this.key=J}}class ZI extends P{constructor(Z,J){super();this.kind=Z,this.messages=J}}var JI=(Z)=>Z instanceof ZI;class QI extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var XI=(Z)=>Z instanceof QI;class YI extends P{constructor(Z,J,Q){super();this.kind=Z,this.name=J,this.value=Q}}var KI=(Z)=>Z instanceof YI;class qI extends P{constructor(Z,J,Q,X){super();this.kind=Z,this.path=J,this.name=Q,this.event=X}}var WI=(Z)=>Z instanceof qI;class GI extends P{constructor(Z,J,Q){super();this.kind=Z,this.key=J,this.value=Q}}var II=(Z)=>Z instanceof GI;var NN=0,RN=1,MN=2,AN=3,DN=4,BN=5;function UI(Z,J,Q,X,Y,K,q,W){return new iG(NN,Z,J,Q,X,Y,K,q,W)}function aX(Z,J){return new rG(RN,Z,J)}function zI(Z,J){return new aG(MN,Z,J)}function VI(Z,J){return new oG(AN,Z,J)}function jI(Z){return new tG(DN,Z)}function FI(Z){return new eG(BN,Z)}class oX extends P{}var LN=new oX;class tX extends P{constructor(Z,J){super();this.key=Z,this.parent=J}}class eX extends P{constructor(Z,J){super();this.index=Z,this.parent=J}}class NI extends P{constructor(Z){super();this.parent=Z}}var cZ="\r",pZ="\t",ZY=`
`,dZ=LN;function HI(Z){if(Z instanceof x)return"";else{let J=Z.tail;return VW(J)}}function JY(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof oX)return HI(K);else if(Y instanceof tX){let{key:q,parent:W}=Y;Z=X,J=W,Q=w(pZ,w(q,K))}else if(Y instanceof eX){let{index:q,parent:W}=Y,G=w(pZ,w(A0(q),K));Z=X,J=W,Q=G}else if(!X)return HI(K);else{let q=Y.parent;if(K instanceof x)Z=X,J=q,Q=K;else{let W=K.tail;Z=X,J=q,Q=w(cZ,W)}}}}function PN(Z){return JY(!0,Z,I0)}function SN(Z,J){while(!0){let Q=Z,X=J;if(X instanceof x)return!1;else{let{head:Y,tail:K}=X,q=_4(Q,Y);if(q)return q;else Z=Q,J=K}}}function RI(Z,J){if(J instanceof x)return!1;else return SN(PN(Z),J)}function MI(Z){return AZ(Z,cZ)}function $1(Z,J,Q){if(Q==="")return new eX(J,Z);else return new tX(Q,Z)}function lZ(Z){return new NI(Z)}function QY(Z,J){return JY(!1,Z,w(ZY,w(J,I0)))}function l4(Z){return JY(!1,Z,I0)}class O8 extends P{constructor(Z,J,Q,X,Y){super();this.events=Z,this.vdoms=J,this.old_vdoms=Q,this.dispatched_paths=X,this.next_dispatched_paths=Y}}class p8 extends P{constructor(Z,J){super();this.handlers=Z,this.children=J}}class iZ extends P{constructor(Z,J){super();this.mapper=Z,this.events=J}}class LI extends P{constructor(Z,J,Q){super();this.handlers=Z,this.children=J,this.vdoms=Q}}class KY extends P{constructor(Z,J){super();this.path=Z,this.handler=J}}class XY extends P{constructor(Z){super();this.path=Z}}function TN(Z,J){return(Q)=>{return Z(J(Q))}}function PI(){return new p8(d0(),d0())}function qY(){return new O8(PI(),d0(),d0(),I0,I0)}function SI(Z,J,Q,X){return o1(Z,QY(J,Q),X)}function DI(Z,J,Q){return L1(Q,Z,(X,Y)=>{if(Y instanceof S1){let{name:K,handler:q}=Y;return SI(X,J,K,q)}else return X})}function sZ(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,I=X,U=Y,z=K,V=U+1;if(z instanceof x)return new LI(q,W,G);else{let F=z.head;if(F instanceof R6){let H=z.tail,N=F.key,R=F.children,T=$1(I,U,N),E=sZ(q,W,G,T,0,R),_=E.handlers,k=E.children,D=E.vdoms;Z=_,J=k,Q=D,X=I,Y=V,K=H}else if(F instanceof M6){let H=z.tail,N=F.key,R=F.attributes,T=F.children,E=$1(I,U,N),_=DI(q,E,R),k=sZ(_,W,G,E,0,T),D=k.handlers,S=k.children,B=k.vdoms;Z=D,J=S,Q=B,X=I,Y=V,K=H}else if(F instanceof c6){let H=z.tail;Z=q,J=W,Q=G,X=I,Y=V,K=H}else if(F instanceof d6){let H=z.tail,N=F.key,R=F.attributes,T=$1(I,U,N);Z=DI(q,T,R),J=W,Q=G,X=I,Y=V,K=H}else if(F instanceof p1){let H=z.tail,N=F.key,R=F.mapper,T=F.child,E=$1(I,U,N),_=sZ(d0(),d0(),G,lZ(E),0,P1(T)),k=_.vdoms,D=new p8(_.handlers,_.children),S=new iZ(R,D),B=o1(W,l4(E),S);Z=q,J=B,Q=k,X=I,Y=V,K=H}else{let H=z.tail,N=F.view,R=N(),T=o1(G,N,R),E=U,_=w(R,H);Z=q,J=W,Q=T,X=I,Y=E,K=_}}}}function WY(Z,J,Q,X,Y){let K=Z.vdoms,q=J.handlers,W=J.children,G=sZ(q,W,K,Q,X,Y),I=G.handlers,U=G.children,z=G.vdoms;return[new O8(Z.events,z,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths),new p8(I,U)]}function rZ(Z,J,Q,X,Y){let K=P1(Y);return WY(Z,J,Q,X,K)}function TI(Z){let J=qY(),Q=rZ(J,J.events,dZ,0,Z),X=Q[0],Y=Q[1];return new O8(Y,X.vdoms,X.old_vdoms,X.dispatched_paths,X.next_dispatched_paths)}function EI(Z){return new O8(Z.events,d0(),Z.vdoms,Z.next_dispatched_paths,I0)}function CI(Z){return Z.events}function _I(Z,J){return new O8(J,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function P9(Z){return Z.vdoms}function wI(Z,J,Q){return D9(Z.old_vdoms,J,Q)}function kI(Z,J,Q){let X=D9(Z.old_vdoms,J,Q),Y=o1(Z.vdoms,Q,X);return new O8(Z.events,Y,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function xI(Z,J,Q){let X=o1(Z.vdoms,J,Q);return new O8(Z.events,X,Z.old_vdoms,Z.dispatched_paths,Z.next_dispatched_paths)}function bI(Z,J,Q){return D9(Z.children,J,()=>{return new iZ(Q,PI())}).events}function yI(Z,J,Q,X){let Y=new iZ(Q,X),K=o1(Z.children,J,Y);return new p8(Z.handlers,K)}function S9(Z,J,Q,X){let Y=SI(Z.handlers,J,Q,X);return new p8(Y,Z.children)}function hI(Z,J,Q){return yZ(Z,QY(J,Q))}function aZ(Z,J,Q){let X=hI(Z.handlers,J,Q);return new p8(X,Z.children)}function BI(Z,J,Q){return L1(Q,Z,(X,Y)=>{if(Y instanceof S1){let K=Y.name;return hI(X,J,K)}else return X})}function YY(Z,J,Q,X,Y,K){while(!0){let q=Z,W=J,G=Q,I=X,U=Y,z=K,V=U+1;if(z instanceof x)return new p8(q,W);else{let F=z.head;if(F instanceof R6){let H=z.tail,N=F.key,R=F.children,T=$1(I,U,N),E=YY(q,W,G,T,0,R),_=E.handlers,k=E.children;Z=_,J=k,Q=G,X=I,Y=V,K=H}else if(F instanceof M6){let H=z.tail,N=F.key,R=F.attributes,T=F.children,E=$1(I,U,N),_=BI(q,E,R),k=YY(_,W,G,E,0,T),D=k.handlers,S=k.children;Z=D,J=S,Q=G,X=I,Y=V,K=H}else if(F instanceof c6){let H=z.tail;Z=q,J=W,Q=G,X=I,Y=V,K=H}else if(F instanceof d6){let H=z.tail,N=F.key,R=F.attributes,T=$1(I,U,N);Z=BI(q,T,R),J=W,Q=G,X=I,Y=V,K=H}else if(F instanceof p1){let H=z.tail,N=F.key,R=$1(I,U,N),T=yZ(W,l4(R));Z=q,J=T,Q=G,X=I,Y=V,K=H}else{let H=z.tail,N=F.view;if(p6(G,N)){let T=x7(G,N),E=w(T,H);Z=q,J=W,Q=G,X=I,Y=U,K=E}else Z=q,J=W,Q=G,X=I,Y=V,K=H}}}}function oZ(Z,J,Q,X,Y){return YY(J.handlers,J.children,Z.old_vdoms,Q,X,P1(Y))}function H8(Z,J,Q,X,Y,K){let q=oZ(Z,J,Q,X,Y);return rZ(Z,q,Q,X,K)}function EN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y instanceof x)return N9;else{let q=Y.tail;if(q instanceof x){let W=Y.head;if(p6(X.handlers,W)){let I=x7(X.handlers,W);return new L(T7(I,(U)=>{return new M9(U.prevent_default,U.stop_propagation,y1(K)(U.message))}))}else return N9}else{let W=Y.head,G=q;if(p6(X.children,W)){let U=x7(X.children,W),z=TN(K,U.mapper);Z=U.events,J=G,Q=z}else return N9}}}}function GY(Z,J,Q,X){let Y=MI(J+ZY+Q),K=EN(Z.events,Y,y1);if(K instanceof L){let q=K[0],W=v6(X,q);if(W instanceof L){let G=W[0];return new KY(J,G)}else return new XY(J)}else return new XY(J)}function IY(Z,J){let Q=w(J.path,Z.next_dispatched_paths),X=new O8(Z.events,Z.vdoms,Z.old_vdoms,Z.dispatched_paths,Q);if(J instanceof KY){let Y=J.handler;return[X,new L(Y)]}else return[X,N9]}function $I(Z,J,Q,X){let Y=GY(Z,J,Q,X);return((K)=>{return IY(Z,K)})(Y)}function tZ(Z,J){return RI(J,Z.dispatched_paths)}class gI extends P{constructor(Z){super();this.message=Z}}var fI=(Z)=>Z instanceof gI;class uI extends P{constructor(Z){super();this.callback=Z}}var vI=(Z)=>Z instanceof uI;class mI extends P{constructor(Z){super();this.callback=Z}}var nI=(Z)=>Z instanceof mI;class ZJ extends P{constructor(Z){super();this.message=Z}}var pI=(Z)=>new ZJ(Z),s4=(Z)=>Z instanceof ZJ;class UY extends P{constructor(Z,J){super();this.name=Z,this.data=J}}var cI=(Z,J)=>new UY(Z,J),i4=(Z)=>Z instanceof UY;class zY extends P{constructor(Z,J){super();this.key=Z,this.value=J}}var dI=(Z,J)=>new zY(Z,J),lI=(Z)=>Z instanceof zY;class VY extends P{constructor(Z,J){super();this.key=Z,this.decoder=J}}var sI=(Z,J)=>new VY(Z,J),iI=(Z)=>Z instanceof VY;class jY extends P{constructor(Z){super();this.key=Z}}var rI=(Z)=>new jY(Z),aI=(Z)=>Z instanceof jY;class FY extends P{}var CN=new FY;var r4=(Z)=>Z instanceof FY;class OY extends P{constructor(Z,J,Q,X,Y){super();this.name=Z,this.init=J,this.update=Q,this.view=X,this.config=Y}}class HY extends P{constructor(Z,J,Q,X,Y,K,q,W,G,I,U,z,V,F){super();this.open_shadow_root=Z,this.adopt_styles=J,this.delegates_focus=Q,this.attributes=X,this.properties=Y,this.contexts=K,this.is_form_associated=q,this.on_form_autofill=W,this.on_form_reset=G,this.on_form_restore=I,this.on_form_disabled=U,this.on_connect=z,this.on_adopt=V,this.on_disconnect=F}}var tI=new HY(!0,!0,!1,I0,I0,I0,!1,U0,U0,U0,U0,U0,U0,U0);var A6=(Z,J)=>{if(Z===J)return!0;if(Z==null||J==null)return!1;let Q=typeof Z;if(Q!==typeof J)return!1;if(Q!=="object")return!1;if(Z.constructor!==J.constructor)return!1;if(Array.isArray(Z))return _N(Z,J);return wN(Z,J)},_N=(Z,J)=>{let Q=Z.length;if(Q!==J.length)return!1;while(Q--)if(!A6(Z[Q],J[Q]))return!1;return!0},wN=(Z,J)=>{let Q=Object.keys(Z),X=Q.length;if(Object.keys(J).length!==X)return!1;while(X--){let Y=Q[X];if(!Object.hasOwn(J,Y))return!1;if(!A6(Z[Y],J[Y]))return!1}return!0};class ZU extends P{constructor(Z,J){super();this.patch=Z,this.cache=J}}class RY extends P{constructor(Z,J,Q){super();this.patch=Z,this.cache=J,this.events=Q}}class JU extends P{constructor(Z,J,Q){super();this.added=Z,this.removed=J,this.events=Q}}function eI(Z,J,Q,X,Y,K,q){while(!0){let W=Z,G=J,I=Q,U=X,z=Y,V=K,F=q;if(U instanceof x)if(z instanceof x)return new JU(V,F,I);else{let H=z.head;if(H instanceof S1){let N=H,R=z.tail,T=H.name,E=H.handler,_=S9(I,G,T,E),k=w(N,V);Z=W,J=G,Q=_,X=U,Y=R,K=k,q=F}else{let N=H,R=z.tail,T=w(N,V);Z=W,J=G,Q=I,X=U,Y=R,K=T,q=F}}else if(z instanceof x){let H=U.head;if(H instanceof S1){let N=H,R=U.tail,T=H.name,E=aZ(I,G,T),_=w(N,F);Z=W,J=G,Q=E,X=R,Y=z,K=V,q=_}else{let N=H,R=U.tail,T=w(N,F);Z=W,J=G,Q=I,X=R,Y=z,K=V,q=T}}else{let{head:H,tail:N}=U,R=z.head,T=z.tail,E=_Z(H,R);if(E instanceof m1)if(H instanceof S1){let _=H.name;Z=W,J=G,Q=aZ(I,G,_),X=N,Y=z,K=V,q=w(H,F)}else Z=W,J=G,Q=I,X=N,Y=z,K=V,q=w(H,F);else if(E instanceof B1)if(H instanceof H6)if(R instanceof H6){let _,k=R.name;if(k==="value")_=W||H.value!==R.value;else if(k==="checked")_=W||H.value!==R.value;else if(k==="selected")_=W||H.value!==R.value;else _=H.value!==R.value;let D=_,S;if(D)S=w(R,V);else S=V;let B=S;Z=W,J=G,Q=I,X=N,Y=T,K=B,q=F}else if(R instanceof S1){let{name:_,handler:k}=R;Z=W,J=G,Q=S9(I,G,_,k),X=N,Y=T,K=w(R,V),q=w(H,F)}else Z=W,J=G,Q=I,X=N,Y=T,K=w(R,V),q=w(H,F);else if(H instanceof R9)if(R instanceof R9){let _,k=R.name;if(k==="scrollLeft")_=!0;else if(k==="scrollRight")_=!0;else if(k==="value")_=W||!A6(H.value,R.value);else if(k==="checked")_=W||!A6(H.value,R.value);else if(k==="selected")_=W||!A6(H.value,R.value);else _=!A6(H.value,R.value);let D=_,S;if(D)S=w(R,V);else S=V;let B=S;Z=W,J=G,Q=I,X=N,Y=T,K=B,q=F}else if(R instanceof S1){let{name:_,handler:k}=R;Z=W,J=G,Q=S9(I,G,_,k),X=N,Y=T,K=w(R,V),q=w(H,F)}else Z=W,J=G,Q=I,X=N,Y=T,K=w(R,V),q=w(H,F);else if(R instanceof S1){let{name:_,handler:k}=R,D=H.prevent_default.kind!==R.prevent_default.kind||H.stop_propagation.kind!==R.stop_propagation.kind||H.debounce!==R.debounce||H.throttle!==R.throttle,S;if(D)S=w(R,V);else S=V;let B=S;Z=W,J=G,Q=S9(I,G,_,k),X=N,Y=T,K=B,q=F}else{let _=H.name;Z=W,J=G,Q=aZ(I,G,_),X=N,Y=T,K=w(R,V),q=w(H,F)}else if(R instanceof S1){let{name:_,handler:k}=R;Z=W,J=G,Q=S9(I,G,_,k),X=U,Y=T,K=w(R,V),q=F}else Z=W,J=G,Q=I,X=U,Y=T,K=w(R,V),q=F}}}function kN(Z,J,Q,X){if(Q==="input"&&J==="")return tZ(Z,X);else if(Q==="select"&&J==="")return tZ(Z,X);else if(Q==="textarea"&&J==="")return tZ(Z,X);else return!1}function JJ(Z,J,Q,X,Y,K,q,W,G,I,U,z,V,F){while(!0){let H=Z,N=J,R=Q,T=X,E=Y,_=K,k=q,D=W,S=G,B=I,C=U,M=z,s=V,v=F;if(H instanceof x)if(R instanceof x){let p,W0=g7();if(B instanceof x)if(C instanceof x)p=n8(S,k,B,C);else if(!W0)if(C.tail instanceof x&&k===0){let q0=C.head;p=lG(q0,S)}else p=n8(S,k,B,C);else p=n8(S,k,B,C);else p=n8(S,k,B,C);return new RY(p,s,v)}else{let p=WY(s,v,M,D,R),W0=p[0],e=p[1],Z0=rX(R,D-_),q0=w(Z0,B),G0=n8(S,k,q0,C);return new RY(G0,W0,e)}else if(R instanceof x){let{head:p,tail:W0}=H;if(p.key===""||!p6(E,p.key)){let Z0=oZ(s,v,M,D,p);Z=W0,J=N,Q=R,X=T,Y=E,K=_,q=k+1,W=D,G=S,I=B,U=C,z=M,V=s,F=Z0}else Z=W0,J=N,Q=R,X=T,Y=E,K=_,q=k,W=D,G=S,I=B,U=C,z=M,V=s,F=v}else{let p=H.head,W0=R.head;if(p.key!==W0.key){let e=H.tail,Z0=R.tail,q0=p6(N,W0.key);if(p6(T,p.key))if(q0)if(p6(E,p.key))Z=e,J=N,Q=R,X=T,Y=E,K=_-1,q=k,W=D,G=S,I=B,U=C,z=M,V=s,F=v;else{let t=x7(N,W0.key),m=D-_,h=w(cG(W0.key,m),B),c=o1(E,W0.key,void 0);Z=w(t,H),J=N,Q=R,X=T,Y=c,K=_+1,q=k,W=D,G=S,I=h,U=C,z=M,V=s,F=v}else{let J0=D-_,t=rZ(s,v,M,D,W0),m=t[0],h=t[1],c=rX(P1(W0),J0),Q0=w(c,B);Z=H,J=N,Q=Z0,X=T,Y=E,K=_+1,q=k,W=D+1,G=S,I=Q0,U=C,z=M,V=m,F=h}else if(q0){let J0=D-_,t=w(dG(J0),B),m=oZ(s,v,M,D,p);Z=e,J=N,Q=R,X=T,Y=E,K=_-1,q=k,W=D,G=S,I=t,U=C,z=M,V=s,F=m}else{let J0=F8(D-_,W0),t=H8(s,v,M,D,p,W0),m=t[0],h=t[1];Z=e,J=N,Q=Z0,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(J0,B),U=C,z=M,V=m,F=h}}else{let e=H.head;if(e instanceof R6){let Z0=R.head;if(Z0 instanceof R6){let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=JJ(q0.children,q0.keyed_children,J0.children,J0.keyed_children,d0(),0,0,0,D,I0,I0,$1(M,D,J0.key),s,v),h=m.patch,c=m.cache,Q0=m.events,f0;if(h.changes instanceof x)if(h.children instanceof x)if(h.removed===0)f0=C;else f0=w(h,C);else f0=w(h,C);else f0=w(h,C);let S0=f0;Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=S0,z=M,V=c,F=Q0}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}else if(e instanceof M6){let Z0=R.head;if(Z0 instanceof M6){let q0=e,G0=Z0;if(q0.namespace===G0.namespace&&q0.tag===G0.tag){let J0=H.tail,t=R.tail,m=$1(M,D,G0.key),h=kN(s,G0.namespace,G0.tag,m),c=eI(h,m,v,q0.attributes,G0.attributes,I0,I0),Q0=c.added,f0=c.removed,z0=c.events,S0;if(Q0 instanceof x&&f0 instanceof x)S0=I0;else S0=P1(iX(Q0,f0));let J1=S0,J8=JJ(q0.children,q0.keyed_children,G0.children,G0.keyed_children,d0(),0,0,0,D,J1,I0,m,s,z0),Y1=J8.patch,x1=J8.cache,G6=J8.events,g6;if(Y1.changes instanceof x)if(Y1.children instanceof x)if(Y1.removed===0)g6=C;else g6=w(Y1,C);else g6=w(Y1,C);else g6=w(Y1,C);let JZ=g6;Z=J0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=JZ,z=M,V=x1,F=G6}else{let J0=e,t=H.tail,m=Z0,h=R.tail,c=F8(D-_,m),Q0=H8(s,v,M,D,J0,m),f0=Q0[0],z0=Q0[1];Z=t,J=N,Q=h,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(c,B),U=C,z=M,V=f0,F=z0}}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}else if(e instanceof c6){let Z0=R.head;if(Z0 instanceof c6){let q0=e,G0=Z0;if(q0.content===G0.content){let J0=H.tail,t=R.tail;Z=J0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=C,z=M,V=s,F=v}else{let J0=H.tail,t=Z0,m=R.tail,h=n8(D,0,P1(nG(t.content)),I0);Z=J0,J=N,Q=m,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=w(h,C),z=M,V=s,F=v}}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}else if(e instanceof d6){let Z0=R.head;if(Z0 instanceof d6){let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=$1(M,D,J0.key),h=eI(!1,m,v,q0.attributes,J0.attributes,I0,I0),c=h.added,Q0=h.removed,f0=h.events,z0;if(c instanceof x&&Q0 instanceof x)z0=I0;else z0=P1(iX(c,Q0));let S0=z0,J1;if(q0.inner_html===J0.inner_html)J1=S0;else J1=w(pG(J0.inner_html),S0);let Y1=J1,x1;if(Y1 instanceof x)x1=C;else x1=w(n8(D,0,Y1,I0),C);let G6=x1;Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=G6,z=M,V=s,F=f0}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}else if(e instanceof p1){let Z0=R.head;if(Z0 instanceof p1){let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=$1(M,D,J0.key),h=l4(m),c=JJ(P1(q0.child),d0(),P1(J0.child),d0(),d0(),0,0,0,D,I0,I0,lZ(m),s,bI(v,h,q0.mapper)),Q0=c.patch,f0=c.cache,z0=c.events,S0=yI(v,h,J0.mapper,z0),J1;if(Q0.changes instanceof x)if(Q0.children instanceof x)if(Q0.removed===0)J1=C;else J1=w(Q0,C);else J1=w(Q0,C);else J1=w(Q0,C);let Y1=J1;Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=Y1,z=M,V=f0,F=S0}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}else{let Z0=R.head;if(Z0 instanceof b7){let q0=e,G0=H.tail,J0=Z0,t=R.tail;if(AG(q0.dependencies,J0.dependencies)){let h=kI(s,q0.view,J0.view);Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=B,U=C,z=M,V=h,F=v}else{let h=wI(s,q0.view,q0.view),c=J0.view(),Q0=xI(s,J0.view,c);Z=w(h,G0),J=N,Q=w(c,t),X=T,Y=E,K=_,q=k,W=D,G=S,I=B,U=C,z=M,V=Q0,F=v}}else{let q0=e,G0=H.tail,J0=Z0,t=R.tail,m=F8(D-_,J0),h=H8(s,v,M,D,q0,J0),c=h[0],Q0=h[1];Z=G0,J=N,Q=t,X=T,Y=E,K=_,q=k,W=D+1,G=S,I=w(m,B),U=C,z=M,V=c,F=Q0}}}}}}function a4(Z,J,Q){let X=EI(Z),Y=JJ(P1(J),d0(),P1(Q),d0(),d0(),0,0,0,0,I0,I0,dZ,X,CI(X)),K=Y.patch,q=Y.cache,W=Y.events;return new ZU(K,_I(q,W))}var QU=(Z)=>Z.reduceRight((J,Q)=>q9(Q,J),I0),t1=(Z,J)=>{if(Array.isArray(Z))for(let Q=0;Q<Z.length;Q++)J(Z[Q]);else if(Z)for(Z;f6(Z);Z=f6(Z))J(W9(Z))},MY=(Z,J)=>{if(!f6(Z))return J;else if(!f6(J))return Z;else return X1(Z,J)};var QJ="http://www.w3.org/1999/xhtml",XU=1,YU=3,AY=8;var KU=!!globalThis.HTMLElement?.prototype?.moveBefore;var{setTimeout:bN,clearTimeout:DY}=globalThis,yN=(Z,J)=>globalThis.document.createElementNS(Z,J),qU=(Z)=>globalThis.document.createTextNode(Z),WU=(Z)=>globalThis.document.createComment(Z),hN=()=>globalThis.document.createDocumentFragment(),c8=(Z,J,Q)=>Z.insertBefore(J,Q),GU=KU?(Z,J,Q)=>Z.moveBefore(J,Q):c8,IU=(Z,J)=>Z.removeChild(J),$N=(Z,J)=>Z.getAttribute(J),UU=(Z,J,Q)=>Z.setAttribute(J,Q),gN=(Z,J)=>Z.removeAttribute(J),fN=(Z,J,Q,X)=>Z.addEventListener(J,Q,X),zU=(Z,J,Q)=>Z.removeEventListener(J,Q),uN=(Z,J)=>Z.innerHTML=J,vN=(Z,J)=>Z.data=J,e1=Symbol("lustre");class FU{constructor(Z,J,Q,X){this.kind=Z,this.key=X,this.parent=J,this.children=[],this.node=Q,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===y7||this.kind===u8}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}}var Z6=(Z,J,Q,X,Y)=>{let K=new FU(Z,J,Q,Y);return Q[e1]=K,J?.children.splice(X,0,K),K},mN=(Z)=>{let J="";for(let Q=Z[e1];Q.parent;Q=Q.parent){let X=Q.parent&&Q.parent.kind===u8?cZ:pZ;if(Q.key)J=`${X}${Q.key}${J}`;else{let Y=Q.parent.children.indexOf(Q);J=`${X}${Y}${J}`}}return J.slice(1)};class LY{#Z=null;#q;#X;#J=!1;constructor(Z,J,Q,{debug:X=!1}={}){this.#Z=Z,this.#q=J,this.#X=Q,this.#J=X}mount(Z){Z6(v8,null,this.#Z,0,null),this.#H(this.#Z,null,this.#Z[e1],0,Z)}push(Z,J=null){this.#Q=J,this.#Y.push({node:this.#Z[e1],patch:Z}),this.#W()}#Q;#Y=[];#W(){let Z=this.#Y;while(Z.length){let{node:J,patch:Q}=Z.pop(),{path:X,changes:Y,removed:K,children:q}=Q;t1(X,(G)=>{J=J.children[G]});let{children:W}=J;if(t1(Y,(G)=>this.#K(J,G)),K)this.#j(J,W.length-K,K);t1(q,(G)=>{let I=W[G.index|0];this.#Y.push({node:I,patch:G})})}}#K(Z,J){switch(J.kind){case mX:this.#S(Z,J);break;case nX:this.#D(Z,J);break;case pX:this.#O(Z,J);break;case cX:this.#z(Z,J);break;case dX:this.#R(Z,J);break;case lX:this.#G(Z,J);break;case sX:this.#V(Z,J);break}}#V(Z,{children:J,before:Q}){let X=hN(),Y=this.#U(Z,Q);this.#A(X,null,Z,Q|0,J),c8(Z.parentNode,X,Y)}#G(Z,{index:J,with:Q}){this.#j(Z,J|0,1);let X=this.#U(Z,J);this.#H(Z.parentNode,X,Z,J|0,Q)}#U(Z,J){J=J|0;let{children:Q}=Z,X=Q.length;if(J<X)return Q[J].node;if(Z.endNode)return Z.endNode;if(!Z.isVirtual)return null;while(Z.isVirtual&&Z.children.length){if(Z.endNode)return Z.endNode.nextSibling;Z=Z.children[Z.children.length-1]}return Z.node.nextSibling}#z(Z,{key:J,before:Q}){Q=Q|0;let{children:X,parentNode:Y}=Z,K=X[Q].node,q=X[Q];for(let W=Q+1;W<X.length;++W){let G=X[W];if(X[W]=q,q=G,G.key===J){X[Q]=G;break}}this.#N(Y,q,K)}#I(Z,J,Q){for(let X=0;X<J.length;++X)this.#N(Z,J[X],Q)}#N(Z,J,Q){if(GU(Z,J.node,Q),J.isVirtual)this.#I(Z,J.children,Q);if(J.endNode)GU(Z,J.endNode,Q)}#R(Z,{index:J}){this.#j(Z,J,1)}#j(Z,J,Q){let{children:X,parentNode:Y}=Z,K=X.splice(J,Q);for(let q=0;q<K.length;++q){let W=K[q],{node:G,endNode:I,isVirtual:U,children:z}=W;if(IU(Y,G),I)IU(Y,I);if(this.#F(W),U)K.push(...z)}}#F(Z){let{debouncers:J,children:Q}=Z;for(let{timeout:X}of J.values())if(X)DY(X);J.clear(),t1(Q,(X)=>this.#F(X))}#O({node:Z,handlers:J,throttles:Q,debouncers:X},{added:Y,removed:K}){t1(K,({name:q})=>{if(J.delete(q))zU(Z,q,BY),this.#M(Q,q,0),this.#M(X,q,0);else gN(Z,q),jU[q]?.removed?.(Z,q)}),t1(Y,(q)=>this.#P(Z,q))}#S({node:Z},{content:J}){vN(Z,J??"")}#D({node:Z},{inner_html:J}){uN(Z,J??"")}#A(Z,J,Q,X,Y){t1(Y,(K)=>this.#H(Z,J,Q,X++,K))}#H(Z,J,Q,X,Y){switch(Y.kind){case v8:{let K=this.#B(Q,X,Y);this.#A(K,null,K[e1],0,Y.children),c8(Z,K,J);break}case B9:{let K=this.#T(Q,X,Y);c8(Z,K,J);break}case y7:{let q=this.#L("lustre:fragment",Q,X,Y);if(c8(Z,q,J),this.#A(Z,J,q[e1],0,Y.children),this.#J)q[e1].endNode=WU(" /lustre:fragment "),c8(Z,q[e1].endNode,J);break}case DG:{let K=this.#B(Q,X,Y);this.#D({node:K},Y),c8(Z,K,J);break}case u8:{let K=this.#L("lustre:map",Q,X,Y);c8(Z,K,J),this.#H(Z,J,K[e1],0,Y.child);break}case gX:{let K=this.#Q?.get(Y.view)??Y.view();this.#H(Z,J,Q,X,K);break}}}#B(Z,J,{kind:Q,key:X,tag:Y,namespace:K,attributes:q}){let W=yN(K||QJ,Y);if(Z6(Q,Z,W,J,X),this.#J&&X)UU(W,"data-lustre-key",X);return t1(q,(G)=>this.#P(W,G)),W}#T(Z,J,{kind:Q,key:X,content:Y}){let K=qU(Y??"");return Z6(Q,Z,K,J,X),K}#L(Z,J,Q,{kind:X,key:Y}){let K=this.#J?WU(nN(Z,Y)):qU("");return Z6(X,J,K,Q,Y),K}#P(Z,J){let{debouncers:Q,handlers:X,throttles:Y}=Z[e1],{kind:K,name:q,value:W,prevent_default:G,debounce:I,throttle:U}=J;switch(K){case TX:{let z=W??"";if(q==="virtual:defaultValue"){Z.defaultValue=z;return}else if(q==="virtual:defaultChecked"){Z.defaultChecked=!0;return}else if(q==="virtual:defaultSelected"){Z.defaultSelected=!0;return}if(z!==$N(Z,q))UU(Z,q,z);jU[q]?.added?.(Z,z);break}case EX:Z[q]=W;break;case CX:{if(X.has(q))zU(Z,q,BY);let z=G.kind===_X;fN(Z,q,BY,{passive:z}),this.#M(Y,q,U),this.#M(Q,q,I),X.set(q,(V)=>this.#E(J,V));break}}}#M(Z,J,Q){let X=Z.get(J);if(Q>0)if(X)X.delay=Q;else Z.set(J,{delay:Q});else if(X){let{timeout:Y}=X;if(Y)DY(Y);Z.delete(J)}}#E(Z,J){let{currentTarget:Q,type:X}=J,{debouncers:Y,throttles:K}=Q[e1],q=mN(Q),{prevent_default:W,stop_propagation:G,include:I}=Z;if(W.kind===xX)J.preventDefault();if(G.kind===xX)J.stopPropagation();if(X==="submit")J.detail??={},J.detail.formData=[...new FormData(J.target,J.submitter).entries()];let U=this.#q(J,q,X,I),z=K.get(X);if(z){let F=Date.now(),H=z.last||0;if(F>H+z.delay)z.last=F,z.lastEvent=J,this.#X(J,U)}let V=Y.get(X);if(V)DY(V.timeout),V.timeout=bN(()=>{if(J===K.get(X)?.lastEvent)return;this.#X(J,U)},V.delay);if(!z&&!V)this.#X(J,U)}}var nN=(Z,J)=>{if(J)return` ${Z} key="${f4(J)}" `;else return` ${Z} `},BY=(Z)=>{let{currentTarget:J,type:Q}=Z;J[e1].handlers.get(Q)(Z)},VU=(Z)=>{return{added(J){J[Z]=!0},removed(J){J[Z]=!1}}},pN=(Z)=>{return{added(J,Q){J[Z]=Q}}},jU={checked:VU("checked"),selected:VU("selected"),value:pN("value"),autofocus:{added(Z){queueMicrotask(()=>{Z.focus?.()})}},autoplay:{added(Z){try{Z.play?.()}catch(J){console.error(J)}}}};function cN(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(X instanceof x)return[Y,T0(K)];else{let q=X.tail,W=X.head[0],G=X.head[1],I=hZ(W,G),U;if(W==="")U=Y;else U=o1(Y,W,I);let z=U,V=w(I,K);Z=q,J=z,Q=V}}}function PY(Z){return cN(Z,d0(),I0)}function SY(Z,J,Q){let X=PY(Q),Y=X[0],K=X[1];return n4("","",Z,J,K,Y,!1,p4(Z,""))}function OU(Z,J,Q,X){let Y=PY(X),K=Y[0],q=Y[1];return n4("",Z,J,Q,q,K,!1,p4(J,Z))}function TY(Z){let J=PY(Z),Q=J[0],X=J[1];return fX("",X,Q)}function d8(Z,J){return SY("div",Z,J)}var NU=(Z)=>{let J=Z6(v8,null,Z,0,null),{children:Q}=EY(J,Z,Z.firstChild);if(Q.length>1){let Y=Z6(v8,null,Z,0,null);return J.kind=y7,J.node=globalThis.document.createTextNode(""),J.parent=Y,Y.children.push(J),Z.insertBefore(J.node,Z.firstChild),TY(T9(Q))}if(Q.length===1)return Q[0][1];let X=globalThis.document.createTextNode("");return Z6(B9,J,X,0,null),Z.insertBefore(X,Z.firstChild),h7()},RU=(Z,J,Q,X)=>{if(Q.nodeType===AY){let Y=Q.data.trim();if(Y.startsWith("lustre:fragment"))return sN(Z,J,Q,X);if(Y.startsWith("lustre:map"))return iN(Z,J,Q,X);if(Y.startsWith("lustre:memo"))return rN(Z,J,Q,X);return null}if(Q.nodeType===XU)return dN(Z,Q,X);if(Q.nodeType===YU)return lN(Z,Q,X);return null},dN=(Z,J,Q)=>{let X=J.getAttribute("data-lustre-key")??"";if(X)J.removeAttribute("data-lustre-key");let Y=Z6(v8,Z,J,Q,X),K=J.localName,q=J.namespaceURI,W=!q||q===QJ;if(W&&oN.includes(K))tN(K,J);let G=aN(J),{children:I}=EY(Y,J,J.firstChild),U=W?SY(K,G,T9(I)):OU(q,K,G,T9(I));return o4(X,U,J.nextSibling)},EY=(Z,J,Q)=>{let X=[];while(Q&&(Q.nodeType!==AY||Q.data.trim()!=="/lustre:fragment")){let Y=RU(Z,J,Q,X.length);if(Y)X.push([Y.key,Y.vnode]),Q=Y.next;else Q=Q.nextSibling}return{children:X,end:Q}},lN=(Z,J,Q)=>{return Z6(B9,Z,J,Q,null),o4("",$Z(J.data),J.nextSibling)},sN=(Z,J,Q,X)=>{let Y=CY(Q.data),K=Z6(y7,Z,Q,X,Y),{children:q,end:W}=EY(K,J,Q.nextSibling);K.endNode=W;let G=TY(T9(q));return o4(Y,G,W?.nextSibling)},iN=(Z,J,Q,X)=>{let Y=CY(Q.data),K=Z6(u8,Z,Q,X,Y),q=MU(K,J,Q,0);if(!q)return null;let W=kG(q.vnode,(G)=>G);return o4(Y,W,q.next)},rN=(Z,J,Q,X)=>{let Y=CY(Q.data),K=MU(Z,J,Q,X);if(!K)return null;J.removeChild(Q);let q=_G(T9([wG({})]),()=>K.vnode);return o4(Y,q,K.next)},MU=(Z,J,Q,X)=>{while(!0){if(Q=Q.nextSibling,!Q)return null;let Y=RU(Z,J,Q,X);if(Y)return Y}},o4=(Z,J,Q)=>{return{key:Z,vnode:J,next:Q}},aN=(Z)=>{let J=[];for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];if(X.name!=="xmlns")J.push(s0(X.localName,X.value))}return T9(J)},oN=["input","select","textarea"],tN=(Z,J)=>{let{value:Q,checked:X}=J;if(Z==="input"&&J.type==="checkbox"&&!X)return;if(Z==="input"&&J.type==="radio"&&!X)return;if(J.type!=="checkbox"&&J.type!=="radio"&&!Q)return;queueMicrotask(()=>{if(J.value=Q,J.checked=X,J.dispatchEvent(new Event("input",{bubbles:!0})),J.dispatchEvent(new Event("change",{bubbles:!0})),globalThis.document.activeElement!==J)J.dispatchEvent(new Event("blur",{bubbles:!0}))})},CY=(Z)=>{let J=Z.match(/key="([^"]*)"/);if(!J)return"";return eN(J[1])},eN=(Z)=>{return Z.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&#39;/g,"'")},T9=(Z)=>Z.reduceRight((J,Q)=>q9(Q,J),I0);var g7=()=>!!globalThis.document;class XJ{constructor(Z,[J,Q],X,Y,K){this.root=Z,this.#Z=J,this.#q=X,this.#X=Y,this.root.addEventListener("context-request",(G)=>{if(!(G.context&&G.callback))return;if(!this.#W.has(G.context))return;G.stopImmediatePropagation();let I=this.#W.get(G.context);if(G.subscribe){let U=()=>{I.subscribers=I.subscribers.filter((z)=>z!==G.callback)};I.subscribers.push([G.callback,U]),G.callback(I.value,U)}else G.callback(I.value)});let q=(G,I,U)=>GY(this.#Q,I,U,G),W=(G,I)=>{let[U,z]=IY(this.#Q,I);if(this.#Q=U,F1(z)){let V=D1(z);if(V.stop_propagation)G.stopPropagation();if(V.prevent_default)G.preventDefault();this.dispatch(V.message,!1)}};this.#Y=new LY(this.root,q,W,K),this.#J=NU(this.root),this.#Q=qY(),this.#j(Q),this.#O()}root=null;dispatch(Z,J=!1){if(this.#V)this.#G.push(Z);else{let[Q,X]=this.#X(this.#Z,Z);this.#Z=Q,this.#R(J),this.#j(X)}}emit(Z,J){(this.root.host??this.root).dispatchEvent(new DU(Z,J))}provide(Z,J){if(!this.#W.has(Z))this.#W.set(Z,{value:J,subscribers:[]});else{let Q=this.#W.get(Z);if(A6(Q.value,J))return;Q.value=J;for(let X=Q.subscribers.length-1;X>=0;X--){let[Y,K]=Q.subscribers[X];if(!Y){Q.subscribers.splice(X,1);continue}Y(J,K)}}}subscribe(Z,J){if(!Z)return;this.#K.get(Z)?.(),(this.root.host??this.root).dispatchEvent(new _Y(Z,(X,Y)=>{let K=this.#K.get(Z);if(K!==Y)K?.();let q=v6(X,J);if(this.#K.set(Z,Y),F1(q))this.dispatch(D1(q),!0)},!0))}unsubscribe(Z){let J=this.#K.get(Z);if(J)J(),this.#K.delete(Z)}unsubscribeAll(){for(let[Z,J]of this.#K)J?.();this.#K.clear()}#Z;#q;#X;#J;#Q;#Y;#W=new Map;#K=new Map;#V=!1;#G=[];#U=I0;#z=I0;#I=null;#N={dispatch:(Z)=>this.dispatch(Z),emit:(Z,J)=>this.emit(Z,J),select:()=>{},root:()=>this.root,provide:(Z,J)=>this.provide(Z,J),subscribe:(Z,J)=>this.subscribe(Z,J),unsubscribe:(Z)=>this.unsubscribe(Z)};#R(Z=!1){if(this.#I)return;if(Z)this.#I="sync",queueMicrotask(()=>this.#O());else this.#I=window.requestAnimationFrame(()=>this.#O())}#j(Z){this.#V=!0;let J=!1;while(!0){if(t1(Z.synchronous,(X)=>X(this.#N)),this.#U=MY(this.#U,Z.before_paint),this.#z=MY(this.#z,Z.after_paint),!this.#G.length)break;let Q=this.#G.shift();[this.#Z,Z]=this.#X(this.#Z,Q),J=!0}return this.#V=!1,J}#F(Z){if(this.#j(Z))this.#R(!0)}#O(){this.#I=null;let Z=this.#q(this.#Z),{patch:J,cache:Q}=a4(this.#Q,this.#J,Z);if(this.#Q=Q,this.#J=Z,this.#Y.push(J,P9(Q)),Y8(this.#U)){let X=AU(this.#U);this.#U=I0,queueMicrotask(()=>this.#F(X))}if(Y8(this.#z)){let X=AU(this.#z);this.#z=I0,window.requestAnimationFrame(()=>this.#F(X))}}}function AU(Z){return{synchronous:Z,after_paint:I0,before_paint:I0}}class _Y extends Event{constructor(Z,J,Q){super("context-request",{bubbles:!0,composed:!0});this.context=Z,this.callback=J,this.subscribe=Q}}class DU extends CustomEvent{isLustreEvent=!0;constructor(Z,J){super(Z,{detail:J,bubbles:!0,composed:!0})}}class BU{#Z;constructor(Z,[J,Q],X,Y){this.#Z=new XJ(Z,[J,Q],Y,X)}send(Z){if(s4(Z))this.dispatch(Z.message,!1);else if(i4(Z))this.emit(Z.name,Z.data);else if(r4(Z));}dispatch(Z){this.#Z.dispatch(Z)}emit(Z,J){this.#Z.emit(Z,J)}}var LU=({init:Z,update:J,view:Q},X,Y)=>{if(!g7())return t0(wY());let K=X instanceof HTMLElement?X:globalThis.document.querySelector(X);if(!K)return t0(PU(X));return m0(new BU(K,Z(Y),J,Q))};class QR{#Z;#q;#X;#J;#Q;#Y;#W=G9();#K=new Set;constructor(Z,J,Q,X,Y,K){let[q,W]=J(K);this.#Z=q,this.#q=Q,this.#X=X,this.#J=Y,this.#Q=this.#X(this.#Z),this.#Y=TI(this.#Q),this.#I(W)}send(Z){if(fI(Z)){let{message:J}=J,Q=this.#V(J),X=a4(this.#Y,this.#Q,Q);this.#Q=Q,this.#Y=X.cache,this.broadcast(aX(X.patch,P9(X.cache)))}else if(vI(Z)){let{callback:J}=Z;if(this.#K.add(J),J(UI(this.#J.open_shadow_root,this.#J.adopt_styles,L4(this.#J.attributes),L4(this.#J.properties),L4(this.#J.contexts),this.#W,this.#Q,P9(this.#Y))),IZ(this.#J.on_connect))this.#G(UZ(this.#J.on_connect))}else if(nI(Z)){let{callback:J}=Z;if(this.#K.delete(J),IZ(this.#J.on_disconnect))this.#G(UZ(this.#J.on_disconnect))}else if(s4(Z)){let{message:J}=J,[Q,X]=this.#q(this.#Z,J),Y=this.#X(Q),K=a4(this.#Y,this.#Q,Y);this.#I(X),this.#Z=Q,this.#Q=Y,this.#Y=K.cache,this.broadcast(aX(K.patch,P9(K.cache)))}else if(i4(Z)){let{name:J,data:Q}=Z;this.broadcast(zI(J,Q))}else if(lI(Z)){let{key:J,value:Q}=Z,X=q8(this.#W,J);if(F1(X)&&A6(D1(X),Q))return;this.#W=P7(this.#W,J,Q),this.broadcast(VI(J,Q))}else if(iI(Z)){let{key:J,decoder:Q}=Z;this.broadcast(jI(J)),this.#J.contexts=P7(this.#J.contexts,J,Q)}else if(aI(Z)){let{key:J}=Z;this.broadcast(FI(J)),this.#J.contexts=zX(this.#J.contexts,J)}else if(r4(Z))this.#Z=null,this.#q=null,this.#X=null,this.#J=null,this.#Q=null,this.#Y=null,this.#W=null,this.#K.clear()}broadcast(Z){for(let J of this.#K)J(Z)}#V(Z){if(JI(Z)){let{messages:J}=Z,Q=this.#Z,X=j0();for(let Y=J;f6(Y);Y=f6(Y)){let K=this.#V(W9(Y));if(F1(K)){Q=D1(K)[0],X=v4(QU([X,D1(K)[1]]));break}}return this.#I(X),this.#Z=Q,this.#X(Q)}else if(XI(Z)){let{name:J,value:Q}=Z,X=this.#U(J,Q);if(!F1(X))return this.#Q;return this.#G(D1(X))}else if(KI(Z)){let{name:J,value:Q}=Z,X=this.#z(J,Q);if(!F1(X))return this.#Q;return this.#G(D1(X))}else if(WI(Z)){let{path:J,name:Q,event:X}=q,[Y,K]=$I(this.#Y,J,Q,X);if(this.#Y=Y,!F1(K))return this.#Q;let{message:q}=D1(K);return this.#G(q)}else if(II(Z)){let{key:J,value:Q}=Z,X=q8(this.#J.contexts,J);if(!F1(X))return this.#Q;if(X=v6(Q,D1(X)),!F1(X))return this.#Q;return this.#G(D1(X))}}#G(Z){let[J,Q]=this.#q(this.#Z,Z);return this.#I(Q),this.#Z=J,this.#X(this.#Z)}#U(Z,J){let Q=q8(this.#J.attributes,Z);if(!F1(Q))return Q;return D1(Q)(J)}#z(Z,J){let Q=q8(this.#J.properties,Z);if(!F1(Q))return Q;return D1(Q)(J)}#I(Z){let J=(G)=>this.send(pI(G)),Q=(G,I)=>this.send(cI(G,I)),X=()=>{return},Y=()=>{return},K=(G,I)=>this.send(dI(G,I)),q=(G,I)=>this.send(sI(G,I)),W=(G)=>this.send(rI(G));globalThis.queueMicrotask(()=>{RG(Z,J,Q,X,Y,K,q,W)})}}class SU extends P{constructor(Z){super();this.selector=Z}}var PU=(Z)=>new SU(Z);class TU extends P{}var EU=new TU,wY=()=>EU;function CU(Z,J,Q){return new OY(U0,Z,J,Q,tI)}function _U(Z,J,Q){return cW(!g7(),new V0(EU),()=>{return LU(Z,J,Q)})}var wU=new Map;function kY(Z,J,Q){clearTimeout(wU.get(Z)),wU.set(Z,setTimeout(Q,J))}function xY(Z){return confirm(Z)}function bY(Z){alert(Z)}function yY(Z){return Z<=0?0:Math.floor(Math.random()*Z)}function t4(Z,J){return bX(Z,T7(J,(Q)=>{return new M9(!1,!1,Q)}),I0,wX,wX,0,0)}function kU(Z,J){return bX(Z,J,I0,kX,kX,0,0)}function YJ(Z,J,Q){return new M9(J,Q,Z)}function i0(Z){return t4("click",k0(Z))}function xU(Z){return t4("input",O9(j(["target","value"]),_0,(J)=>{return k0(Z(J))}))}function bU(Z){return t4("change",O9(j(["target","value"]),_0,(J)=>{return k0(Z(J))}))}var $Y=[],gU=[];(()=>{let Z="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((J)=>J?parseInt(J,36):1);for(let J=0,Q=0;J<Z.length;J++)(J%2?gU:$Y).push(Q=Q+Z[J])})();function qR(Z){if(Z<768)return!1;for(let J=0,Q=$Y.length;;){let X=J+Q>>1;if(Z<$Y[X])Q=X;else if(Z>=gU[X])J=X+1;else return!0;if(J==Q)return!1}}function yU(Z){return Z>=127462&&Z<=127487}var hU=8205;function fU(Z,J,Q=!0,X=!0){return(Q?uU:WR)(Z,J,X)}function uU(Z,J,Q){if(J==Z.length)return J;if(J&&vU(Z.charCodeAt(J))&&mU(Z.charCodeAt(J-1)))J--;let X=hY(Z,J);J+=$U(X);while(J<Z.length){let Y=hY(Z,J);if(X==hU||Y==hU||Q&&qR(Y))J+=$U(Y),X=Y;else if(yU(Y)){let K=0,q=J-2;while(q>=0&&yU(hY(Z,q)))K++,q-=2;if(K%2==0)break;else J+=2}else break}return J}function WR(Z,J,Q){while(J>1){let X=uU(Z,J-2,Q);if(X<J)return X;J--}return 0}function hY(Z,J){let Q=Z.charCodeAt(J);if(!mU(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!vU(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function vU(Z){return Z>=56320&&Z<57344}function mU(Z){return Z>=55296&&Z<56320}function $U(Z){return Z<65536?1:2}class R0{lineAt(Z){if(Z<0||Z>this.length)throw RangeError(`Invalid position ${Z} in document of length ${this.length}`);return this.lineInner(Z,!1,1,0)}line(Z){if(Z<1||Z>this.lines)throw RangeError(`Invalid line number ${Z} in ${this.lines}-line document`);return this.lineInner(Z,!0,1,0)}replace(Z,J,Q){[Z,J]=w9(this,Z,J);let X=[];if(this.decompose(0,Z,X,2),Q.length)Q.decompose(0,Q.length,X,3);return this.decompose(J,this.length,X,1),l6.from(X,this.length-(J-Z)+Q.length)}append(Z){return this.replace(this.length,this.length,Z)}slice(Z,J=this.length){[Z,J]=w9(this,Z,J);let Q=[];return this.decompose(Z,J,Q,0),l6.from(Q,J-Z)}eq(Z){if(Z==this)return!0;if(Z.length!=this.length||Z.lines!=this.lines)return!1;let J=this.scanIdentical(Z,1),Q=this.length-this.scanIdentical(Z,-1),X=new C9(this),Y=new C9(Z);for(let K=J,q=J;;){if(X.next(K),Y.next(K),K=0,X.lineBreak!=Y.lineBreak||X.done!=Y.done||X.value!=Y.value)return!1;if(q+=X.value.length,X.done||q>=Q)return!0}}iter(Z=1){return new C9(this,Z)}iterRange(Z,J=this.length){return new sY(this,Z,J)}iterLines(Z,J){let Q;if(Z==null)Q=this.iter();else{if(J==null)J=this.lines+1;let X=this.line(Z).from;Q=this.iterRange(X,Math.max(X,J==this.lines+1?this.length:J<=1?0:this.line(J-1).to))}return new iY(Q)}toString(){return this.sliceString(0)}toJSON(){let Z=[];return this.flatten(Z),Z}constructor(){}static of(Z){if(Z.length==0)throw RangeError("A document must have at least one line");if(Z.length==1&&!Z[0])return R0.empty;return Z.length<=32?new r0(Z):l6.from(r0.split(Z,[]))}}class r0 extends R0{constructor(Z,J=GR(Z)){super();this.text=Z,this.length=J}get lines(){return this.text.length}get children(){return null}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.text[Y],q=X+K.length;if((J?Q:q)>=Z)return new sU(X,q,Q,K);X=q+1,Q++}}decompose(Z,J,Q,X){let Y=Z<=0&&J>=this.length?this:new r0(nU(this.text,Z,J),Math.min(J,this.length)-Math.max(0,Z));if(X&1){let K=Q.pop(),q=IJ(Y.text,K.text.slice(),0,Y.length);if(q.length<=32)Q.push(new r0(q,K.length+Y.length));else{let W=q.length>>1;Q.push(new r0(q.slice(0,W)),new r0(q.slice(W)))}}else Q.push(Y)}replace(Z,J,Q){if(!(Q instanceof r0))return super.replace(Z,J,Q);[Z,J]=w9(this,Z,J);let X=IJ(this.text,IJ(Q.text,nU(this.text,0,Z)),J),Y=this.length+Q.length-(J-Z);if(X.length<=32)return new r0(X,Y);return l6.from(r0.split(X,[]),Y)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=w9(this,Z,J);let X="";for(let Y=0,K=0;Y<=J&&K<this.text.length;K++){let q=this.text[K],W=Y+q.length;if(Y>Z&&K)X+=Q;if(Z<W&&J>Y)X+=q.slice(Math.max(0,Z-Y),J-Y);Y=W+1}return X}flatten(Z){for(let J of this.text)Z.push(J)}scanIdentical(){return 0}static split(Z,J){let Q=[],X=-1;for(let Y of Z)if(Q.push(Y),X+=Y.length+1,Q.length==32)J.push(new r0(Q,X)),Q=[],X=-1;if(X>-1)J.push(new r0(Q,X));return J}}class l6 extends R0{constructor(Z,J){super();this.children=Z,this.length=J,this.lines=0;for(let Q of Z)this.lines+=Q.lines}lineInner(Z,J,Q,X){for(let Y=0;;Y++){let K=this.children[Y],q=X+K.length,W=Q+K.lines-1;if((J?W:q)>=Z)return K.lineInner(Z,J,Q,X);X=q+1,Q=W+1}}decompose(Z,J,Q,X){for(let Y=0,K=0;K<=J&&Y<this.children.length;Y++){let q=this.children[Y],W=K+q.length;if(Z<=W&&J>=K){let G=X&((K<=Z?1:0)|(W>=J?2:0));if(K>=Z&&W<=J&&!G)Q.push(q);else q.decompose(Z-K,J-K,Q,G)}K=W+1}}replace(Z,J,Q){if([Z,J]=w9(this,Z,J),Q.lines<this.lines)for(let X=0,Y=0;X<this.children.length;X++){let K=this.children[X],q=Y+K.length;if(Z>=Y&&J<=q){let W=K.replace(Z-Y,J-Y,Q),G=this.lines-K.lines+W.lines;if(W.lines<G>>4&&W.lines>G>>6){let I=this.children.slice();return I[X]=W,new l6(I,this.length-(J-Z)+Q.length)}return super.replace(Y,q,W)}Y=q+1}return super.replace(Z,J,Q)}sliceString(Z,J=this.length,Q=`
`){[Z,J]=w9(this,Z,J);let X="";for(let Y=0,K=0;Y<this.children.length&&K<=J;Y++){let q=this.children[Y],W=K+q.length;if(K>Z&&Y)X+=Q;if(Z<W&&J>K)X+=q.sliceString(Z-K,J-K,Q);K=W+1}return X}flatten(Z){for(let J of this.children)J.flatten(Z)}scanIdentical(Z,J){if(!(Z instanceof l6))return 0;let Q=0,[X,Y,K,q]=J>0?[0,0,this.children.length,Z.children.length]:[this.children.length-1,Z.children.length-1,-1,-1];for(;;X+=J,Y+=J){if(X==K||Y==q)return Q;let W=this.children[X],G=Z.children[Y];if(W!=G)return Q+W.scanIdentical(G,J);Q+=W.length+1}}static from(Z,J=Z.reduce((Q,X)=>Q+X.length+1,-1)){let Q=0;for(let V of Z)Q+=V.lines;if(Q<32){let V=[];for(let F of Z)F.flatten(V);return new r0(V,J)}let X=Math.max(32,Q>>5),Y=X<<1,K=X>>1,q=[],W=0,G=-1,I=[];function U(V){let F;if(V.lines>Y&&V instanceof l6)for(let H of V.children)U(H);else if(V.lines>K&&(W>K||!W))z(),q.push(V);else if(V instanceof r0&&W&&(F=I[I.length-1])instanceof r0&&V.lines+F.lines<=32)W+=V.lines,G+=V.length+1,I[I.length-1]=new r0(F.text.concat(V.text),F.length+1+V.length);else{if(W+V.lines>X)z();W+=V.lines,G+=V.length+1,I.push(V)}}function z(){if(W==0)return;q.push(I.length==1?I[0]:l6.from(I,G)),G=-1,W=I.length=0}for(let V of Z)U(V);return z(),q.length==1?q[0]:new l6(q,J)}}R0.empty=new r0([""],0);function GR(Z){let J=-1;for(let Q of Z)J+=Q.length+1;return J}function IJ(Z,J,Q=0,X=1e9){for(let Y=0,K=0,q=!0;K<Z.length&&Y<=X;K++){let W=Z[K],G=Y+W.length;if(G>=Q){if(G>X)W=W.slice(0,X-Y);if(Y<Q)W=W.slice(Q-Y);if(q)J[J.length-1]+=W,q=!1;else J.push(W)}Y=G+1}return J}function nU(Z,J,Q){return IJ(Z,[""],J,Q)}class C9{constructor(Z,J=1){this.dir=J,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[Z],this.offsets=[J>0?1:(Z instanceof r0?Z.text.length:Z.children.length)<<1]}nextInner(Z,J){this.done=this.lineBreak=!1;for(;;){let Q=this.nodes.length-1,X=this.nodes[Q],Y=this.offsets[Q],K=Y>>1,q=X instanceof r0?X.text.length:X.children.length;if(K==(J>0?q:0)){if(Q==0)return this.done=!0,this.value="",this;if(J>0)this.offsets[Q-1]++;this.nodes.pop(),this.offsets.pop()}else if((Y&1)==(J>0?0:1)){if(this.offsets[Q]+=J,Z==0)return this.lineBreak=!0,this.value=`
`,this;Z--}else if(X instanceof r0){let W=X.text[K+(J<0?-1:0)];if(this.offsets[Q]+=J,W.length>Math.max(0,Z))return this.value=Z==0?W:J>0?W.slice(Z):W.slice(0,W.length-Z),this;Z-=W.length}else{let W=X.children[K+(J<0?-1:0)];if(Z>W.length)Z-=W.length,this.offsets[Q]+=J;else{if(J<0)this.offsets[Q]--;this.nodes.push(W),this.offsets.push(J>0?1:(W instanceof r0?W.text.length:W.children.length)<<1)}}}}next(Z=0){if(Z<0)this.nextInner(-Z,-this.dir),Z=this.value.length;return this.nextInner(Z,this.dir)}}class sY{constructor(Z,J,Q){this.value="",this.done=!1,this.cursor=new C9(Z,J>Q?-1:1),this.pos=J>Q?Z.length:0,this.from=Math.min(J,Q),this.to=Math.max(J,Q)}nextInner(Z,J){if(J<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;Z+=Math.max(0,J<0?this.pos-this.to:this.from-this.pos);let Q=J<0?this.pos-this.from:this.to-this.pos;if(Z>Q)Z=Q;Q-=Z;let{value:X}=this.cursor.next(Z);return this.pos+=(X.length+Z)*J,this.value=X.length<=Q?X:J<0?X.slice(X.length-Q):X.slice(0,Q),this.done=!this.value,this}next(Z=0){if(Z<0)Z=Math.max(Z,this.from-this.pos);else if(Z>0)Z=Math.min(Z,this.to-this.pos);return this.nextInner(Z,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class iY{constructor(Z){this.inner=Z,this.afterBreak=!0,this.value="",this.done=!1}next(Z=0){let{done:J,lineBreak:Q,value:X}=this.inner.next(Z);if(J&&this.afterBreak)this.value="",this.afterBreak=!1;else if(J)this.done=!0,this.value="";else if(Q)if(this.afterBreak)this.value="";else this.afterBreak=!0,this.next();else this.value=X,this.afterBreak=!1;return this}get lineBreak(){return!1}}if(typeof Symbol<"u")R0.prototype[Symbol.iterator]=function(){return this.iter()},C9.prototype[Symbol.iterator]=sY.prototype[Symbol.iterator]=iY.prototype[Symbol.iterator]=function(){return this};class sU{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.number=Q,this.text=X}get length(){return this.to-this.from}}function w9(Z,J,Q){return J=Math.max(0,Math.min(Z.length,J)),[J,Math.max(J,Math.min(Z.length,Q))]}function q1(Z,J,Q=!0,X=!0){return fU(Z,J,Q,X)}function IR(Z){return Z>=56320&&Z<57344}function UR(Z){return Z>=55296&&Z<56320}function iU(Z,J){let Q=Z.charCodeAt(J);if(!UR(Q)||J+1==Z.length)return Q;let X=Z.charCodeAt(J+1);if(!IR(X))return Q;return(Q-55296<<10)+(X-56320)+65536}function rU(Z){return Z<65536?1:2}var fY=/\r\n?|\n/,T1=function(Z){return Z[Z.Simple=0]="Simple",Z[Z.TrackDel=1]="TrackDel",Z[Z.TrackBefore=2]="TrackBefore",Z[Z.TrackAfter=3]="TrackAfter",Z}(T1||(T1={}));class B6{constructor(Z){this.sections=Z}get length(){let Z=0;for(let J=0;J<this.sections.length;J+=2)Z+=this.sections[J];return Z}get newLength(){let Z=0;for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J+1];Z+=Q<0?this.sections[J]:Q}return Z}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(Z){for(let J=0,Q=0,X=0;J<this.sections.length;){let Y=this.sections[J++],K=this.sections[J++];if(K<0)Z(Q,X,Y),X+=Y;else X+=K;Q+=Y}}iterChangedRanges(Z,J=!1){uY(this,Z,J)}get invertedDesc(){let Z=[];for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];if(X<0)Z.push(Q,X);else Z.push(X,Q)}return new B6(Z)}composeDesc(Z){return this.empty?Z:Z.empty?this:aU(this,Z)}mapDesc(Z,J=!1){return Z.empty?this:vY(this,Z,J)}mapPos(Z,J=-1,Q=T1.Simple){let X=0,Y=0;for(let K=0;K<this.sections.length;){let q=this.sections[K++],W=this.sections[K++],G=X+q;if(W<0){if(G>Z)return Y+(Z-X);Y+=q}else{if(Q!=T1.Simple&&G>=Z&&(Q==T1.TrackDel&&X<Z&&G>Z||Q==T1.TrackBefore&&X<Z||Q==T1.TrackAfter&&G>Z))return null;if(G>Z||G==Z&&J<0&&!q)return Z==X||J<0?Y:Y+W;Y+=W}X=G}if(Z>X)throw RangeError(`Position ${Z} is out of range for changeset of length ${X}`);return Y}touchesRange(Z,J=Z){for(let Q=0,X=0;Q<this.sections.length&&X<=J;){let Y=this.sections[Q++],K=this.sections[Q++],q=X+Y;if(K>=0&&X<=J&&q>=Z)return X<Z&&q>J?"cover":!0;X=q}return!1}toString(){let Z="";for(let J=0;J<this.sections.length;){let Q=this.sections[J++],X=this.sections[J++];Z+=(Z?" ":"")+Q+(X>=0?":"+X:"")}return Z}toJSON(){return this.sections}static fromJSON(Z){if(!Array.isArray(Z)||Z.length%2||Z.some((J)=>typeof J!="number"))throw RangeError("Invalid JSON representation of ChangeDesc");return new B6(Z)}static create(Z){return new B6(Z)}}class a0 extends B6{constructor(Z,J){super(Z);this.inserted=J}apply(Z){if(this.length!=Z.length)throw RangeError("Applying change set to a document with the wrong length");return uY(this,(J,Q,X,Y,K)=>Z=Z.replace(X,X+(Q-J),K),!1),Z}mapDesc(Z,J=!1){return vY(this,Z,J,!0)}invert(Z){let J=this.sections.slice(),Q=[];for(let X=0,Y=0;X<J.length;X+=2){let K=J[X],q=J[X+1];if(q>=0){J[X]=q,J[X+1]=K;let W=X>>1;while(Q.length<W)Q.push(R0.empty);Q.push(K?Z.slice(Y,Y+K):R0.empty)}Y+=K}return new a0(J,Q)}compose(Z){return this.empty?Z:Z.empty?this:aU(this,Z,!0)}map(Z,J=!1){return Z.empty?this:vY(this,Z,J,!0)}iterChanges(Z,J=!1){uY(this,Z,J)}get desc(){return B6.create(this.sections)}filter(Z){let J=[],Q=[],X=[],Y=new k9(this);Z:for(let K=0,q=0;;){let W=K==Z.length?1e9:Z[K++];while(q<W||q==W&&Y.len==0){if(Y.done)break Z;let I=Math.min(Y.len,W-q);N1(X,I,-1);let U=Y.ins==-1?-1:Y.off==0?Y.ins:0;if(N1(J,I,U),U>0)s8(Q,J,Y.text);Y.forward(I),q+=I}let G=Z[K++];while(q<G){if(Y.done)break Z;let I=Math.min(Y.len,G-q);N1(J,I,-1),N1(X,I,Y.ins==-1?-1:Y.off==0?Y.ins:0),Y.forward(I),q+=I}}return{changes:new a0(J,Q),filtered:B6.create(X)}}toJSON(){let Z=[];for(let J=0;J<this.sections.length;J+=2){let Q=this.sections[J],X=this.sections[J+1];if(X<0)Z.push(Q);else if(X==0)Z.push([Q]);else Z.push([Q].concat(this.inserted[J>>1].toJSON()))}return Z}static of(Z,J,Q){let X=[],Y=[],K=0,q=null;function W(I=!1){if(!I&&!X.length)return;if(K<J)N1(X,J-K,-1);let U=new a0(X,Y);q=q?q.compose(U.map(q)):U,X=[],Y=[],K=0}function G(I){if(Array.isArray(I))for(let U of I)G(U);else if(I instanceof a0){if(I.length!=J)throw RangeError(`Mismatched change set length (got ${I.length}, expected ${J})`);W(),q=q?q.compose(I.map(q)):I}else{let{from:U,to:z=U,insert:V}=I;if(U>z||U<0||z>J)throw RangeError(`Invalid change range ${U} to ${z} (in doc of length ${J})`);let F=!V?R0.empty:typeof V=="string"?R0.of(V.split(Q||fY)):V,H=F.length;if(U==z&&H==0)return;if(U<K)W();if(U>K)N1(X,U-K,-1);N1(X,z-U,H),s8(Y,X,F),K=z}}return G(Z),W(!q),q}static empty(Z){return new a0(Z?[Z,-1]:[],[])}static fromJSON(Z){if(!Array.isArray(Z))throw RangeError("Invalid JSON representation of ChangeSet");let J=[],Q=[];for(let X=0;X<Z.length;X++){let Y=Z[X];if(typeof Y=="number")J.push(Y,-1);else if(!Array.isArray(Y)||typeof Y[0]!="number"||Y.some((K,q)=>q&&typeof K!="string"))throw RangeError("Invalid JSON representation of ChangeSet");else if(Y.length==1)J.push(Y[0],0);else{while(Q.length<X)Q.push(R0.empty);Q[X]=R0.of(Y.slice(1)),J.push(Y[0],Q[X].length)}}return new a0(J,Q)}static createSet(Z,J){return new a0(Z,J)}}function N1(Z,J,Q,X=!1){if(J==0&&Q<=0)return;let Y=Z.length-2;if(Y>=0&&Q<=0&&Q==Z[Y+1])Z[Y]+=J;else if(Y>=0&&J==0&&Z[Y]==0)Z[Y+1]+=Q;else if(X)Z[Y]+=J,Z[Y+1]+=Q;else Z.push(J,Q)}function s8(Z,J,Q){if(Q.length==0)return;let X=J.length-2>>1;if(X<Z.length)Z[Z.length-1]=Z[Z.length-1].append(Q);else{while(Z.length<X)Z.push(R0.empty);Z.push(Q)}}function uY(Z,J,Q){let X=Z.inserted;for(let Y=0,K=0,q=0;q<Z.sections.length;){let W=Z.sections[q++],G=Z.sections[q++];if(G<0)Y+=W,K+=W;else{let I=Y,U=K,z=R0.empty;for(;;){if(I+=W,U+=G,G&&X)z=z.append(X[q-2>>1]);if(Q||q==Z.sections.length||Z.sections[q+1]<0)break;W=Z.sections[q++],G=Z.sections[q++]}J(Y,I,K,U,z),Y=I,K=U}}}function vY(Z,J,Q,X=!1){let Y=[],K=X?[]:null,q=new k9(Z),W=new k9(J);for(let G=-1;;)if(q.done&&W.len||W.done&&q.len)throw Error("Mismatched change set lengths");else if(q.ins==-1&&W.ins==-1){let I=Math.min(q.len,W.len);N1(Y,I,-1),q.forward(I),W.forward(I)}else if(W.ins>=0&&(q.ins<0||G==q.i||q.off==0&&(W.len<q.len||W.len==q.len&&!Q))){let I=W.len;N1(Y,W.ins,-1);while(I){let U=Math.min(q.len,I);if(q.ins>=0&&G<q.i&&q.len<=U){if(N1(Y,0,q.ins),K)s8(K,Y,q.text);G=q.i}q.forward(U),I-=U}W.next()}else if(q.ins>=0){let I=0,U=q.len;while(U)if(W.ins==-1){let z=Math.min(U,W.len);I+=z,U-=z,W.forward(z)}else if(W.ins==0&&W.len<U)U-=W.len,W.next();else break;if(N1(Y,I,G<q.i?q.ins:0),K&&G<q.i)s8(K,Y,q.text);G=q.i,q.forward(q.len-U)}else if(q.done&&W.done)return K?a0.createSet(Y,K):B6.create(Y);else throw Error("Mismatched change set lengths")}function aU(Z,J,Q=!1){let X=[],Y=Q?[]:null,K=new k9(Z),q=new k9(J);for(let W=!1;;)if(K.done&&q.done)return Y?a0.createSet(X,Y):B6.create(X);else if(K.ins==0)N1(X,K.len,0,W),K.next();else if(q.len==0&&!q.done){if(N1(X,0,q.ins,W),Y)s8(Y,X,q.text);q.next()}else if(K.done||q.done)throw Error("Mismatched change set lengths");else{let G=Math.min(K.len2,q.len),I=X.length;if(K.ins==-1){let U=q.ins==-1?-1:q.off?0:q.ins;if(N1(X,G,U,W),Y&&U)s8(Y,X,q.text)}else if(q.ins==-1){if(N1(X,K.off?0:K.len,G,W),Y)s8(Y,X,K.textBit(G))}else if(N1(X,K.off?0:K.len,q.off?0:q.ins,W),Y&&!q.off)s8(Y,X,q.text);W=(K.ins>G||q.ins>=0&&q.len>G)&&(W||X.length>I),K.forward2(G),q.forward(G)}}class k9{constructor(Z){this.set=Z,this.i=0,this.next()}next(){let{sections:Z}=this.set;if(this.i<Z.length)this.len=Z[this.i++],this.ins=Z[this.i++];else this.len=0,this.ins=-2;this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:Z}=this.set,J=this.i-2>>1;return J>=Z.length?R0.empty:Z[J]}textBit(Z){let{inserted:J}=this.set,Q=this.i-2>>1;return Q>=J.length&&!Z?R0.empty:J[Q].slice(this.off,Z==null?void 0:this.off+Z)}forward(Z){if(Z==this.len)this.next();else this.len-=Z,this.off+=Z}forward2(Z){if(this.ins==-1)this.forward(Z);else if(Z==this.ins)this.next();else this.ins-=Z,this.off+=Z}}class l8{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.flags=Q,this.goalColumn=X}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get undirectional(){return(this.flags&64)>0}get bidiLevel(){let Z=this.flags&7;return Z==7?null:Z}map(Z,J=-1){let Q,X;if(this.empty)Q=X=Z.mapPos(this.from,J);else Q=Z.mapPos(this.from,1),X=Z.mapPos(this.to,-1);return Q==this.from&&X==this.to?this:new l8(Q,X,this.flags,this.goalColumn)}extend(Z,J=Z,Q=0){if(Z<=this.anchor&&J>=this.anchor)return f.range(Z,J,void 0,void 0,Q);let X=Math.abs(Z-this.anchor)>Math.abs(J-this.anchor)?Z:J;return f.range(this.anchor,X,void 0,void 0,Q)}eq(Z,J=!1){return this.anchor==Z.anchor&&this.head==Z.head&&this.goalColumn==Z.goalColumn&&(!J||!this.empty||this.assoc==Z.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(Z){if(!Z||typeof Z.anchor!="number"||typeof Z.head!="number")throw RangeError("Invalid JSON representation for SelectionRange");return f.range(Z.anchor,Z.head)}static create(Z,J,Q,X){return new l8(Z,J,Q,X)}}class f{constructor(Z,J){this.ranges=Z,this.mainIndex=J}map(Z,J=-1){if(Z.empty)return this;return f.create(this.ranges.map((Q)=>Q.map(Z,J)),this.mainIndex)}eq(Z,J=!1){if(this.ranges.length!=Z.ranges.length||this.mainIndex!=Z.mainIndex)return!1;for(let Q=0;Q<this.ranges.length;Q++)if(!this.ranges[Q].eq(Z.ranges[Q],J))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new f([this.main],0)}addRange(Z,J=!0){return f.create([Z].concat(this.ranges),J?0:this.mainIndex+1)}replaceRange(Z,J=this.mainIndex){let Q=this.ranges.slice();return Q[J]=Z,f.create(Q,this.mainIndex)}toJSON(){return{ranges:this.ranges.map((Z)=>Z.toJSON()),main:this.mainIndex}}static fromJSON(Z){if(!Z||!Array.isArray(Z.ranges)||typeof Z.main!="number"||Z.main>=Z.ranges.length)throw RangeError("Invalid JSON representation for EditorSelection");return new f(Z.ranges.map((J)=>l8.fromJSON(J)),Z.main)}static single(Z,J=Z){return new f([f.range(Z,J)],0)}static create(Z,J=0){if(Z.length==0)throw RangeError("A selection needs at least one range");for(let Q=0,X=0;X<Z.length;X++){let Y=Z[X];if(Y.empty?Y.from<=Q:Y.from<Q)return f.normalized(Z.slice(),J);Q=Y.to}return new f(Z,J)}static cursor(Z,J=0,Q,X){return l8.create(Z,Z,(J==0?0:J<0?8:16)|(Q==null?7:Math.min(6,Q)),X)}static range(Z,J,Q,X,Y){let K=X==null?7:Math.min(6,X);if(!Y&&Z!=J)Y=J<Z?1:-1;if(Y)K|=Y<0?8:16;return J<Z?l8.create(J,Z,K|32,Q):l8.create(Z,J,K,Q)}static undirectionalRange(Z,J){return l8.create(Z,J,64,void 0)}static normalized(Z,J=0){let Q=Z[J];Z.sort((X,Y)=>X.from-Y.from),J=Z.indexOf(Q);for(let X=1;X<Z.length;X++){let Y=Z[X],K=Z[X-1];if(Y.empty?Y.from<=K.to:Y.from<K.to){let q=K.from,W=Math.max(Y.to,K.to);if(X<=J)J--;Z.splice(--X,2,Y.anchor>Y.head?f.range(W,q):f.range(q,W))}}return new f(Z,J)}}function oU(Z,J){for(let Q of Z.ranges)if(Q.to>J)throw RangeError("Selection points outside of document")}var rY=0;class o{constructor(Z,J,Q,X,Y){this.combine=Z,this.compareInput=J,this.compare=Q,this.isStatic=X,this.id=rY++,this.default=Z([]),this.extensions=typeof Y=="function"?Y(this):Y}get reader(){return this}static define(Z={}){return new o(Z.combine||((J)=>J),Z.compareInput||((J,Q)=>J===Q),Z.compare||(!Z.combine?aY:(J,Q)=>J===Q),!!Z.static,Z.enables)}of(Z){return new Z5([],this,0,Z)}compute(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new Z5(Z,this,1,J)}computeN(Z,J){if(this.isStatic)throw Error("Can't compute a static facet");return new Z5(Z,this,2,J)}from(Z,J){if(!J)J=(Q)=>Q;return this.compute([Z],(Q)=>J(Q.field(Z)))}}function aY(Z,J){return Z==J||Z.length==J.length&&Z.every((Q,X)=>Q===J[X])}class Z5{constructor(Z,J,Q,X){this.dependencies=Z,this.facet=J,this.type=Q,this.value=X,this.id=rY++}dynamicSlot(Z){var J;let Q=this.value,X=this.facet.compareInput,Y=this.id,K=Z[Y]>>1,q=this.type==2,W=!1,G=!1,I=[];for(let U of this.dependencies)if(U=="doc")W=!0;else if(U=="selection")G=!0;else if((((J=Z[U.id])!==null&&J!==void 0?J:1)&1)==0)I.push(Z[U.id]);return{create(U){return U.values[K]=Q(U),1},update(U,z){if(W&&z.docChanged||G&&(z.docChanged||z.selection)||mY(U,I)){let V=Q(U);if(q?!pU(V,U.values[K],X):!X(V,U.values[K]))return U.values[K]=V,1}return 0},reconfigure:(U,z)=>{let V,F=z.config.address[Y];if(F!=null){let H=VJ(z,F);if(this.dependencies.every((N)=>{return N instanceof o?z.facet(N)===U.facet(N):N instanceof R1?z.field(N,!1)==U.field(N,!1):!0})||(q?pU(V=Q(U),H,X):X(V=Q(U),H)))return U.values[K]=H,0}else V=Q(U);return U.values[K]=V,1}}}get extension(){return this}}function pU(Z,J,Q){if(Z.length!=J.length)return!1;for(let X=0;X<Z.length;X++)if(!Q(Z[X],J[X]))return!1;return!0}function mY(Z,J){let Q=!1;for(let X of J)if(J5(Z,X)&1)Q=!0;return Q}function zR(Z,J,Q){let X=Q.map((G)=>Z[G.id]),Y=Q.map((G)=>G.type),K=X.filter((G)=>!(G&1)),q=Z[J.id]>>1;function W(G){let I=[];for(let U=0;U<X.length;U++){let z=VJ(G,X[U]);if(Y[U]==2)for(let V of z)I.push(V);else I.push(z)}return J.combine(I)}return{create(G){for(let I of X)J5(G,I);return G.values[q]=W(G),1},update(G,I){if(!mY(G,K))return 0;let U=W(G);if(J.compare(U,G.values[q]))return 0;return G.values[q]=U,1},reconfigure(G,I){let U=mY(G,X),z=I.config.facets[J.id],V=I.facet(J);if(z&&!U&&aY(Q,z))return G.values[q]=V,0;let F=W(G);if(J.compare(F,V))return G.values[q]=V,0;return G.values[q]=F,1}}}var qJ=o.define({static:!0});class R1{constructor(Z,J,Q,X,Y){this.id=Z,this.createF=J,this.updateF=Q,this.compareF=X,this.spec=Y,this.provides=void 0}static define(Z){let J=new R1(rY++,Z.create,Z.update,Z.compare||((Q,X)=>Q===X),Z);if(Z.provide)J.provides=Z.provide(J);return J}create(Z){let J=Z.facet(qJ).find((Q)=>Q.field==this);return((J===null||J===void 0?void 0:J.create)||this.createF)(Z)}slot(Z){let J=Z[this.id]>>1;return{create:(Q)=>{return Q.values[J]=this.create(Q),1},update:(Q,X)=>{let Y=Q.values[J],K=this.updateF(Y,X);if(this.compareF(Y,K))return 0;return Q.values[J]=K,1},reconfigure:(Q,X)=>{let Y=Q.facet(qJ),K=X.facet(qJ),q;if((q=Y.find((W)=>W.field==this))&&q!=K.find((W)=>W.field==this))return Q.values[J]=q.create(Q),1;if(X.config.address[this.id]!=null)return Q.values[J]=X.field(this),0;return Q.values[J]=this.create(Q),1}}}init(Z){return[this,qJ.of({field:this,create:Z})]}get extension(){return this}}var f7={lowest:4,low:3,default:2,high:1,highest:0};function e4(Z){return(J)=>new oY(J,Z)}var M8={highest:e4(f7.highest),high:e4(f7.high),default:e4(f7.default),low:e4(f7.low),lowest:e4(f7.lowest)};class oY{constructor(Z,J){this.inner=Z,this.prec=J}get extension(){return this}}class u7{of(Z){return new UJ(this,Z)}reconfigure(Z){return u7.reconfigure.of({compartment:this,extension:Z})}get(Z){return Z.config.compartments.get(this)}}class UJ{constructor(Z,J){this.compartment=Z,this.inner=J}get extension(){return this}}class zJ{constructor(Z,J,Q,X,Y,K){this.base=Z,this.compartments=J,this.dynamicSlots=Q,this.address=X,this.staticValues=Y,this.facets=K,this.statusTemplate=[];while(this.statusTemplate.length<Q.length)this.statusTemplate.push(0)}staticFacet(Z){let J=this.address[Z.id];return J==null?Z.default:this.staticValues[J>>1]}static resolve(Z,J,Q){let X=[],Y=Object.create(null),K=new Map;for(let z of VR(Z,J,K))if(z instanceof R1)X.push(z);else(Y[z.facet.id]||(Y[z.facet.id]=[])).push(z);let q=Object.create(null),W=[],G=[];for(let z of X)q[z.id]=G.length<<1,G.push((V)=>z.slot(V));let I=Q===null||Q===void 0?void 0:Q.config.facets;for(let z in Y){let V=Y[z],F=V[0].facet,H=I&&I[z]||[];if(V.every((N)=>N.type==0))if(q[F.id]=W.length<<1|1,aY(H,V))W.push(Q.facet(F));else{let N=F.combine(V.map((R)=>R.value));W.push(Q&&F.compare(N,Q.facet(F))?Q.facet(F):N)}else{for(let N of V)if(N.type==0)q[N.id]=W.length<<1|1,W.push(N.value);else q[N.id]=G.length<<1,G.push((R)=>N.dynamicSlot(R));q[F.id]=G.length<<1,G.push((N)=>zR(N,F,V))}}let U=G.map((z)=>z(q));return new zJ(Z,K,U,q,W,Y)}}function VR(Z,J,Q){let X=[[],[],[],[],[]],Y=new Map;function K(q,W){let G=Y.get(q);if(G!=null){if(G<=W)return;let I=X[G].indexOf(q);if(I>-1)X[G].splice(I,1);if(q instanceof UJ)Q.delete(q.compartment)}if(Y.set(q,W),Array.isArray(q))for(let I of q)K(I,W);else if(q instanceof UJ){if(Q.has(q.compartment))throw RangeError("Duplicate use of compartment in extensions");let I=J.get(q.compartment)||q.inner;Q.set(q.compartment,I),K(I,W)}else if(q instanceof oY)K(q.inner,q.prec);else if(q instanceof R1){if(X[W].push(q),q.provides)K(q.provides,W)}else if(q instanceof Z5){if(X[W].push(q),q.facet.extensions)K(q.facet.extensions,f7.default)}else{let I=q.extension;if(!I)throw Error(`Unrecognized extension value in extension set (${q}).`);if(I==q)throw Error(`Unrecognized extension value in extension set (${q}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);K(I,W)}}return K(Z,f7.default),X.reduce((q,W)=>q.concat(W))}function J5(Z,J){if(J&1)return 2;let Q=J>>1,X=Z.status[Q];if(X==4)throw Error("Cyclic dependency between fields and/or facets");if(X&2)return X;Z.status[Q]=4;let Y=Z.computeSlot(Z,Z.config.dynamicSlots[Q]);return Z.status[Q]=2|Y}function VJ(Z,J){return J&1?Z.config.staticValues[J>>1]:Z.values[J>>1]}var tU=o.define(),nY=o.define({combine:(Z)=>Z.some((J)=>J),static:!0}),eU=o.define({combine:(Z)=>Z.length?Z[0]:void 0,static:!0}),Zz=o.define(),Jz=o.define(),Qz=o.define(),Xz=o.define({combine:(Z)=>Z.length?Z[0]:!1});class L6{constructor(Z,J){this.type=Z,this.value=J}static define(){return new Yz}}class Yz{of(Z){return new L6(this,Z)}}class Kz{constructor(Z){this.map=Z}of(Z){return new B0(this,Z)}}class B0{constructor(Z,J){this.type=Z,this.value=J}map(Z){let J=this.type.map(this.value,Z);return J===void 0?void 0:J==this.value?this:new B0(this.type,J)}is(Z){return this.type==Z}static define(Z={}){return new Kz(Z.map||((J)=>J))}static mapEffects(Z,J){if(!Z.length)return Z;let Q=[];for(let X of Z){let Y=X.map(J);if(Y)Q.push(Y)}return Q}}B0.reconfigure=B0.define();B0.appendConfig=B0.define();class o0{constructor(Z,J,Q,X,Y,K){if(this.startState=Z,this.changes=J,this.selection=Q,this.effects=X,this.annotations=Y,this.scrollIntoView=K,this._doc=null,this._state=null,Q)oU(Q,J.newLength);if(!Y.some((q)=>q.type==o0.time))this.annotations=Y.concat(o0.time.of(Date.now()))}static create(Z,J,Q,X,Y,K){return new o0(Z,J,Q,X,Y,K)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){if(!this._state)this.startState.applyTransaction(this);return this._state}annotation(Z){for(let J of this.annotations)if(J.type==Z)return J.value;return}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(Z){let J=this.annotation(o0.userEvent);return!!(J&&(J==Z||J.length>Z.length&&J.slice(0,Z.length)==Z&&J[Z.length]=="."))}}o0.time=L6.define();o0.userEvent=L6.define();o0.addToHistory=L6.define();o0.remote=L6.define();function jR(Z,J){let Q=[];for(let X=0,Y=0;;){let K,q;if(X<Z.length&&(Y==J.length||J[Y]>=Z[X]))K=Z[X++],q=Z[X++];else if(Y<J.length)K=J[Y++],q=J[Y++];else return Q;if(!Q.length||Q[Q.length-1]<K)Q.push(K,q);else if(Q[Q.length-1]<q)Q[Q.length-1]=q}}function qz(Z,J,Q){var X;let Y,K,q;if(Q)Y=J.changes,K=a0.empty(J.changes.length),q=Z.changes.compose(J.changes);else Y=J.changes.map(Z.changes),K=Z.changes.mapDesc(J.changes,!0),q=Z.changes.compose(Y);return{changes:q,selection:J.selection?J.selection.map(K):(X=Z.selection)===null||X===void 0?void 0:X.map(Y),effects:B0.mapEffects(Z.effects,Y).concat(B0.mapEffects(J.effects,K)),annotations:Z.annotations.length?Z.annotations.concat(J.annotations):J.annotations,scrollIntoView:Z.scrollIntoView||J.scrollIntoView}}function pY(Z,J,Q){let X=J.selection,Y=_9(J.annotations);if(J.userEvent)Y=Y.concat(o0.userEvent.of(J.userEvent));return{changes:J.changes instanceof a0?J.changes:a0.of(J.changes||[],Q,Z.facet(eU)),selection:X&&(X instanceof f?X:f.single(X.anchor,X.head)),effects:_9(J.effects),annotations:Y,scrollIntoView:!!J.scrollIntoView}}function Wz(Z,J,Q){let X=pY(Z,J.length?J[0]:{},Z.doc.length);if(J.length&&J[0].filter===!1)Q=!1;for(let K=1;K<J.length;K++){if(J[K].filter===!1)Q=!1;let q=!!J[K].sequential;X=qz(X,pY(Z,J[K],q?X.changes.newLength:Z.doc.length),q)}let Y=o0.create(Z,X.changes,X.selection,X.effects,X.annotations,X.scrollIntoView);return OR(Q?FR(Y):Y)}function FR(Z){let J=Z.startState,Q=!0;for(let Y of J.facet(Zz)){let K=Y(Z);if(K===!1){Q=!1;break}if(Array.isArray(K))Q=Q===!0?K:jR(Q,K)}if(Q!==!0){let Y,K;if(Q===!1)K=Z.changes.invertedDesc,Y=a0.empty(J.doc.length);else{let q=Z.changes.filter(Q);Y=q.changes,K=q.filtered.mapDesc(q.changes).invertedDesc}Z=o0.create(J,Y,Z.selection&&Z.selection.map(K),B0.mapEffects(Z.effects,K),Z.annotations,Z.scrollIntoView)}let X=J.facet(Jz);for(let Y=X.length-1;Y>=0;Y--){let K=X[Y](Z);if(K instanceof o0)Z=K;else if(Array.isArray(K)&&K.length==1&&K[0]instanceof o0)Z=K[0];else Z=Wz(J,_9(K),!1)}return Z}function OR(Z){let J=Z.startState,Q=J.facet(Qz),X=Z;for(let Y=Q.length-1;Y>=0;Y--){let K=Q[Y](Z);if(K&&Object.keys(K).length)X=qz(X,pY(J,K,Z.changes.newLength),!0)}return X==Z?Z:o0.create(J,Z.changes,Z.selection,X.effects,X.annotations,X.scrollIntoView)}var HR=[];function _9(Z){return Z==null?HR:Array.isArray(Z)?Z:[Z]}var D6=function(Z){return Z[Z.Word=0]="Word",Z[Z.Space=1]="Space",Z[Z.Other=2]="Other",Z}(D6||(D6={})),NR=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,cY;try{cY=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch(Z){}function RR(Z){if(cY)return cY.test(Z);for(let J=0;J<Z.length;J++){let Q=Z[J];if(/\w/.test(Q)||Q>""&&(Q.toUpperCase()!=Q.toLowerCase()||NR.test(Q)))return!0}return!1}function MR(Z){return(J)=>{if(!/\S/.test(J))return D6.Space;if(RR(J))return D6.Word;for(let Q=0;Q<Z.length;Q++)if(J.indexOf(Z[Q])>-1)return D6.Word;return D6.Other}}class D0{constructor(Z,J,Q,X,Y,K){if(this.config=Z,this.doc=J,this.selection=Q,this.values=X,this.status=Z.statusTemplate.slice(),this.computeSlot=Y,K)K._state=this;for(let q=0;q<this.config.dynamicSlots.length;q++)J5(this,q<<1);this.computeSlot=null}field(Z,J=!0){let Q=this.config.address[Z.id];if(Q==null){if(J)throw RangeError("Field is not present in this state");return}return J5(this,Q),VJ(this,Q)}update(...Z){return Wz(this,Z,!0)}applyTransaction(Z){let J=this.config,{base:Q,compartments:X}=J;for(let q of Z.effects)if(q.is(u7.reconfigure)){if(J)X=new Map,J.compartments.forEach((W,G)=>X.set(G,W)),J=null;X.set(q.value.compartment,q.value.extension)}else if(q.is(B0.reconfigure))J=null,Q=q.value;else if(q.is(B0.appendConfig))J=null,Q=_9(Q).concat(q.value);let Y;if(!J)J=zJ.resolve(Q,X,this),Y=new D0(J,this.doc,this.selection,J.dynamicSlots.map(()=>null),(W,G)=>G.reconfigure(W,this),null).values;else Y=Z.startState.values.slice();let K=Z.startState.facet(nY)?Z.newSelection:Z.newSelection.asSingle();new D0(J,Z.newDoc,K,Y,(q,W)=>W.update(q,Z),Z)}replaceSelection(Z){if(typeof Z=="string")Z=this.toText(Z);return this.changeByRange((J)=>({changes:{from:J.from,to:J.to,insert:Z},range:f.cursor(J.from+Z.length)}))}changeByRange(Z){let J=this.selection,Q=Z(J.ranges[0]),X=this.changes(Q.changes),Y=[Q.range],K=_9(Q.effects);for(let q=1;q<J.ranges.length;q++){let W=Z(J.ranges[q]),G=this.changes(W.changes),I=G.map(X);for(let z=0;z<q;z++)Y[z]=Y[z].map(I);let U=X.mapDesc(G,!0);Y.push(W.range.map(U)),X=X.compose(I),K=B0.mapEffects(K,I).concat(B0.mapEffects(_9(W.effects),U))}return{changes:X,selection:f.create(Y,J.mainIndex),effects:K}}changes(Z=[]){if(Z instanceof a0)return Z;return a0.of(Z,this.doc.length,this.facet(D0.lineSeparator))}toText(Z){return R0.of(Z.split(this.facet(D0.lineSeparator)||fY))}sliceDoc(Z=0,J=this.doc.length){return this.doc.sliceString(Z,J,this.lineBreak)}facet(Z){let J=this.config.address[Z.id];if(J==null)return Z.default;return J5(this,J),VJ(this,J)}toJSON(Z){let J={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(Z)for(let Q in Z){let X=Z[Q];if(X instanceof R1&&this.config.address[X.id]!=null)J[Q]=X.spec.toJSON(this.field(Z[Q]),this)}return J}static fromJSON(Z,J={},Q){if(!Z||typeof Z.doc!="string")throw RangeError("Invalid JSON representation for EditorState");let X=[];if(Q){for(let Y in Q)if(Object.prototype.hasOwnProperty.call(Z,Y)){let K=Q[Y],q=Z[Y];X.push(K.init((W)=>K.spec.fromJSON(q,W)))}}return D0.create({doc:Z.doc,selection:f.fromJSON(Z.selection),extensions:J.extensions?X.concat([J.extensions]):X})}static create(Z={}){let J=zJ.resolve(Z.extensions||[],new Map),Q=Z.doc instanceof R0?Z.doc:R0.of((Z.doc||"").split(J.staticFacet(D0.lineSeparator)||fY)),X=!Z.selection?f.single(0):Z.selection instanceof f?Z.selection:f.single(Z.selection.anchor,Z.selection.head);if(oU(X,Q.length),!J.staticFacet(nY))X=X.asSingle();return new D0(J,Q,X,J.dynamicSlots.map(()=>null),(Y,K)=>K.create(Y),null)}get tabSize(){return this.facet(D0.tabSize)}get lineBreak(){return this.facet(D0.lineSeparator)||`
`}get readOnly(){return this.facet(Xz)}phrase(Z,...J){for(let Q of this.facet(D0.phrases))if(Object.prototype.hasOwnProperty.call(Q,Z)){Z=Q[Z];break}if(J.length)Z=Z.replace(/\$(\$|\d*)/g,(Q,X)=>{if(X=="$")return"$";let Y=+(X||1);return!Y||Y>J.length?Q:J[Y-1]});return Z}languageDataAt(Z,J,Q=-1){let X=[];for(let Y of this.facet(tU))for(let K of Y(this,J,Q))if(Object.prototype.hasOwnProperty.call(K,Z))X.push(K[Z]);return X}charCategorizer(Z){let J=this.languageDataAt("wordChars",Z);return MR(J.length?J[0]:"")}wordAt(Z){let{text:J,from:Q,length:X}=this.doc.lineAt(Z),Y=this.charCategorizer(Z),K=Z-Q,q=Z-Q;while(K>0){let W=q1(J,K,!1);if(Y(J.slice(W,K))!=D6.Word)break;K=W}while(q<X){let W=q1(J,q);if(Y(J.slice(q,W))!=D6.Word)break;q=W}return K==q?null:f.range(K+Q,q+Q)}}D0.allowMultipleSelections=nY;D0.tabSize=o.define({combine:(Z)=>Z.length?Z[0]:4});D0.lineSeparator=eU;D0.readOnly=Xz;D0.phrases=o.define({compare(Z,J){let Q=Object.keys(Z),X=Object.keys(J);return Q.length==X.length&&Q.every((Y)=>Z[Y]==J[Y])}});D0.languageData=tU;D0.changeFilter=Zz;D0.transactionFilter=Jz;D0.transactionExtender=Qz;u7.reconfigure=B0.define();function A8(Z,J,Q={}){let X={};for(let Y of Z)for(let K of Object.keys(Y)){let q=Y[K],W=X[K];if(W===void 0)X[K]=q;else if(W===q||q===void 0);else if(Object.hasOwnProperty.call(Q,K))X[K]=Q[K](W,q);else throw Error("Config merge conflict for field "+K)}for(let Y in J)if(X[Y]===void 0)X[Y]=J[Y];return X}class N8{eq(Z){return this==Z}range(Z,J=Z){return Q5.create(Z,J,this)}}N8.prototype.startSide=N8.prototype.endSide=0;N8.prototype.point=!1;N8.prototype.mapMode=T1.TrackDel;function tY(Z,J){return Z==J||Z.constructor==J.constructor&&Z.eq(J)}class Q5{constructor(Z,J,Q){this.from=Z,this.to=J,this.value=Q}static create(Z,J,Q){return new Q5(Z,J,Q)}}function dY(Z,J){return Z.from-J.from||Z.value.startSide-J.value.startSide}class eY{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.value=Q,this.maxPoint=X}get length(){return this.to[this.to.length-1]}findIndex(Z,J,Q,X=0){let Y=Q?this.to:this.from;for(let K=X,q=Y.length;;){if(K==q)return K;let W=K+q>>1,G=Y[W]-Z||(Q?this.value[W].endSide:this.value[W].startSide)-J;if(W==K)return G>=0?K:q;if(G>=0)q=W;else K=W+1}}between(Z,J,Q,X){for(let Y=this.findIndex(J,-1e9,!0),K=this.findIndex(Q,1e9,!1,Y);Y<K;Y++)if(X(this.from[Y]+Z,this.to[Y]+Z,this.value[Y])===!1)return!1}map(Z,J){let Q=[],X=[],Y=[],K=-1,q=-1;for(let W=0;W<this.value.length;W++){let G=this.value[W],I=this.from[W]+Z,U=this.to[W]+Z,z,V;if(I==U){let F=J.mapPos(I,G.startSide,G.mapMode);if(F==null)continue;if(z=V=F,G.startSide!=G.endSide){if(V=J.mapPos(I,G.endSide),V<z)continue}}else if(z=J.mapPos(I,G.startSide),V=J.mapPos(U,G.endSide),z>V||z==V&&G.startSide>0&&G.endSide<=0)continue;if((V-z||G.endSide-G.startSide)<0)continue;if(K<0)K=z;if(G.point)q=Math.max(q,V-z);Q.push(G),X.push(z-K),Y.push(V-K)}return{mapped:Q.length?new eY(X,Y,Q,q):null,pos:K}}}class N0{constructor(Z,J,Q,X){this.chunkPos=Z,this.chunk=J,this.nextLayer=Q,this.maxPoint=X}static create(Z,J,Q,X){return new N0(Z,J,Q,X)}get length(){let Z=this.chunk.length-1;return Z<0?0:Math.max(this.chunkEnd(Z),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let Z=this.nextLayer.size;for(let J of this.chunk)Z+=J.value.length;return Z}chunkEnd(Z){return this.chunkPos[Z]+this.chunk[Z].length}update(Z){let{add:J=[],sort:Q=!1,filterFrom:X=0,filterTo:Y=this.length}=Z,K=Z.filter;if(J.length==0&&!K)return this;if(Q)J=J.slice().sort(dY);if(this.isEmpty)return J.length?N0.of(J):this;let q=new Z3(this,null,-1).goto(0),W=0,G=[],I=new R8;while(q.value||W<J.length)if(W<J.length&&(q.from-J[W].from||q.startSide-J[W].value.startSide)>=0){let U=J[W++];if(!I.addInner(U.from,U.to,U.value))G.push(U)}else if(q.rangeIndex==1&&q.chunkIndex<this.chunk.length&&(W==J.length||this.chunkEnd(q.chunkIndex)<J[W].from)&&(!K||X>this.chunkEnd(q.chunkIndex)||Y<this.chunkPos[q.chunkIndex])&&I.addChunk(this.chunkPos[q.chunkIndex],this.chunk[q.chunkIndex]))q.nextChunk();else{if(!K||X>q.to||Y<q.from||K(q.from,q.to,q.value)){if(!I.addInner(q.from,q.to,q.value))G.push(Q5.create(q.from,q.to,q.value))}q.next()}return I.finishInner(this.nextLayer.isEmpty&&!G.length?N0.empty:this.nextLayer.update({add:G,filter:K,filterFrom:X,filterTo:Y}))}map(Z){if(Z.empty||this.isEmpty)return this;let J=[],Q=[],X=-1;for(let K=0;K<this.chunk.length;K++){let q=this.chunkPos[K],W=this.chunk[K],G=Z.touchesRange(q,q+W.length);if(G===!1)X=Math.max(X,W.maxPoint),J.push(W),Q.push(Z.mapPos(q));else if(G===!0){let{mapped:I,pos:U}=W.map(q,Z);if(I)X=Math.max(X,I.maxPoint),J.push(I),Q.push(U)}}let Y=this.nextLayer.map(Z);return J.length==0?Y:new N0(Q,J,Y||N0.empty,X)}between(Z,J,Q){if(this.isEmpty)return;for(let X=0;X<this.chunk.length;X++){let Y=this.chunkPos[X],K=this.chunk[X];if(J>=Y&&Z<=Y+K.length&&K.between(Y,Z-Y,J-Y,Q)===!1)return}this.nextLayer.between(Z,J,Q)}iter(Z=0){return X5.from([this]).goto(Z)}get isEmpty(){return this.nextLayer==this}static iter(Z,J=0){return X5.from(Z).goto(J)}static compare(Z,J,Q,X,Y=-1){let K=Z.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=Y),q=J.filter((U)=>U.maxPoint>0||!U.isEmpty&&U.maxPoint>=Y),W=cU(K,q,Q),G=new E9(K,W,Y),I=new E9(q,W,Y);if(Q.iterGaps((U,z,V)=>dU(G,U,I,z,V,X)),Q.empty&&Q.length==0)dU(G,0,I,0,0,X)}static eq(Z,J,Q=0,X){if(X==null)X=999999999;let Y=Z.filter((I)=>!I.isEmpty&&J.indexOf(I)<0),K=J.filter((I)=>!I.isEmpty&&Z.indexOf(I)<0);if(Y.length!=K.length)return!1;if(!Y.length)return!0;let q=cU(Y,K),W=new E9(Y,q,0).goto(Q),G=new E9(K,q,0).goto(Q);for(;;){if(W.to!=G.to||!lY(W.active,G.active)||W.point&&(!G.point||!tY(W.point,G.point)))return!1;if(W.to>X)return!0;W.next(),G.next()}}static spans(Z,J,Q,X,Y=-1){let K=new E9(Z,null,Y).goto(J),q=J,W=K.openStart;for(;;){let G=Math.min(K.to,Q);if(K.point){let I=K.activeForPoint(K.to),U=K.pointFrom<J?I.length+1:K.point.startSide<0?I.length:Math.min(I.length,W);X.point(q,G,K.point,I,U,K.pointRank),W=Math.min(K.openEnd(G),I.length)}else if(G>q)X.span(q,G,K.active,W),W=K.openEnd(G);if(K.to>Q)return W+(K.point&&K.to>Q?1:0);q=K.to,K.next()}}static of(Z,J=!1){let Q=new R8;for(let X of Z instanceof Q5?[Z]:J?AR(Z):Z)Q.add(X.from,X.to,X.value);return Q.finish()}static join(Z){if(!Z.length)return N0.empty;let J=Z[Z.length-1];for(let Q=Z.length-2;Q>=0;Q--)for(let X=Z[Q];X!=N0.empty;X=X.nextLayer)J=new N0(X.chunkPos,X.chunk,J,Math.max(X.maxPoint,J.maxPoint));return J}}N0.empty=new N0([],[],null,-1);function AR(Z){if(Z.length>1)for(let J=Z[0],Q=1;Q<Z.length;Q++){let X=Z[Q];if(dY(J,X)>0)return Z.slice().sort(dY);J=X}return Z}N0.empty.nextLayer=N0.empty;class R8{finishChunk(Z){if(this.chunks.push(new eY(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,Z)this.from=[],this.to=[],this.value=[]}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(Z,J,Q){if(!this.addInner(Z,J,Q))(this.nextLayer||(this.nextLayer=new R8)).add(Z,J,Q)}addInner(Z,J,Q){let X=Z-this.lastTo||Q.startSide-this.last.endSide;if(X<=0&&(Z-this.lastFrom||Q.startSide-this.last.startSide)<0)throw Error("Ranges must be added sorted by `from` position and `startSide`");if(X<0)return!1;if(this.from.length==250)this.finishChunk(!0);if(this.chunkStart<0)this.chunkStart=Z;if(this.from.push(Z-this.chunkStart),this.to.push(J-this.chunkStart),this.last=Q,this.lastFrom=Z,this.lastTo=J,this.value.push(Q),Q.point)this.maxPoint=Math.max(this.maxPoint,J-Z);return!0}addChunk(Z,J){if((Z-this.lastTo||J.value[0].startSide-this.last.endSide)<0)return!1;if(this.from.length)this.finishChunk(!0);this.setMaxPoint=Math.max(this.setMaxPoint,J.maxPoint),this.chunks.push(J),this.chunkPos.push(Z);let Q=J.value.length-1;return this.last=J.value[Q],this.lastFrom=J.from[Q]+Z,this.lastTo=J.to[Q]+Z,!0}finish(){return this.finishInner(N0.empty)}finishInner(Z){if(this.from.length)this.finishChunk(!1);if(this.chunks.length==0)return Z;let J=N0.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(Z):Z,this.setMaxPoint);return this.from=null,J}}function cU(Z,J,Q){let X=new Map;for(let K of Z)for(let q=0;q<K.chunk.length;q++)if(K.chunk[q].maxPoint<=0)X.set(K.chunk[q],K.chunkPos[q]);let Y=new Set;for(let K of J)for(let q=0;q<K.chunk.length;q++){let W=X.get(K.chunk[q]);if(W!=null&&(Q?Q.mapPos(W):W)==K.chunkPos[q]&&!(Q===null||Q===void 0?void 0:Q.touchesRange(W,W+K.chunk[q].length)))Y.add(K.chunk[q])}return Y}class Z3{constructor(Z,J,Q,X=0){this.layer=Z,this.skip=J,this.minPoint=Q,this.rank=X}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(Z,J=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(Z,J,!1),this}gotoInner(Z,J,Q){while(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(X)||this.layer.chunkEnd(this.chunkIndex)<Z||X.maxPoint<this.minPoint))break;this.chunkIndex++,Q=!1}if(this.chunkIndex<this.layer.chunk.length){let X=this.layer.chunk[this.chunkIndex].findIndex(Z-this.layer.chunkPos[this.chunkIndex],J,!0);if(!Q||this.rangeIndex<X)this.setRangeIndex(X)}this.next()}forward(Z,J){if((this.to-Z||this.endSide-J)<0)this.gotoInner(Z,J,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let Z=this.layer.chunkPos[this.chunkIndex],J=this.layer.chunk[this.chunkIndex],Q=Z+J.from[this.rangeIndex];if(this.from=Q,this.to=Z+J.to[this.rangeIndex],this.value=J.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(Z){if(Z==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)while(this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]))this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=Z}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(Z){return this.from-Z.from||this.startSide-Z.startSide||this.rank-Z.rank||this.to-Z.to||this.endSide-Z.endSide}}class X5{constructor(Z){this.heap=Z}static from(Z,J=null,Q=-1){let X=[];for(let Y=0;Y<Z.length;Y++)for(let K=Z[Y];!K.isEmpty;K=K.nextLayer)if(K.maxPoint>=Q)X.push(new Z3(K,J,Q,Y));return X.length==1?X[0]:new X5(X)}get startSide(){return this.value?this.value.startSide:0}goto(Z,J=-1e9){for(let Q of this.heap)Q.goto(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)gY(this.heap,Q);return this.next(),this}forward(Z,J){for(let Q of this.heap)Q.forward(Z,J);for(let Q=this.heap.length>>1;Q>=0;Q--)gY(this.heap,Q);if((this.to-Z||this.value.endSide-J)<0)this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let Z=this.heap[0];if(this.from=Z.from,this.to=Z.to,this.value=Z.value,this.rank=Z.rank,Z.value)Z.next();gY(this.heap,0)}}}function gY(Z,J){for(let Q=Z[J];;){let X=(J<<1)+1;if(X>=Z.length)break;let Y=Z[X];if(X+1<Z.length&&Y.compare(Z[X+1])>=0)Y=Z[X+1],X++;if(Q.compare(Y)<0)break;Z[X]=Q,Z[J]=Y,J=X}}class E9{constructor(Z,J,Q){this.minPoint=Q,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=X5.from(Z,J,Q)}goto(Z,J=-1e9){return this.cursor.goto(Z,J),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=Z,this.endSide=J,this.openStart=-1,this.next(),this}forward(Z,J){while(this.minActive>-1&&(this.activeTo[this.minActive]-Z||this.active[this.minActive].endSide-J)<0)this.removeActive(this.minActive);this.cursor.forward(Z,J)}removeActive(Z){WJ(this.active,Z),WJ(this.activeTo,Z),WJ(this.activeRank,Z),this.minActive=lU(this.active,this.activeTo)}addActive(Z){let J=0,{value:Q,to:X,rank:Y}=this.cursor;while(J<this.activeRank.length&&(Y-this.activeRank[J]||X-this.activeTo[J])>0)J++;if(GJ(this.active,J,Q),GJ(this.activeTo,J,X),GJ(this.activeRank,J,Y),Z)GJ(Z,J,this.cursor.from);this.minActive=lU(this.active,this.activeTo)}next(){let Z=this.to,J=this.point;this.point=null;let Q=this.openStart<0?[]:null;for(;;){let X=this.minActive;if(X>-1&&(this.activeTo[X]-this.cursor.from||this.active[X].endSide-this.cursor.startSide)<0){if(this.activeTo[X]>Z){this.to=this.activeTo[X],this.endSide=this.active[X].endSide;break}if(this.removeActive(X),Q)WJ(Q,X)}else if(!this.cursor.value){this.to=this.endSide=1e9;break}else if(this.cursor.from>Z){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let Y=this.cursor.value;if(!Y.point)this.addActive(Q),this.cursor.next();else if(J&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=Y,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=Y.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}}if(Q){this.openStart=0;for(let X=Q.length-1;X>=0&&Q[X]<Z;X--)this.openStart++}}activeForPoint(Z){if(!this.active.length)return this.active;let J=[];for(let Q=this.active.length-1;Q>=0;Q--){if(this.activeRank[Q]<this.pointRank)break;if(this.activeTo[Q]>Z||this.activeTo[Q]==Z&&this.active[Q].endSide>=this.point.endSide)J.push(this.active[Q])}return J.reverse()}openEnd(Z){let J=0;for(let Q=this.activeTo.length-1;Q>=0&&this.activeTo[Q]>Z;Q--)J++;return J}}function dU(Z,J,Q,X,Y,K){Z.goto(J),Q.goto(X);let q=X+Y,W=X,G=X-J,I=!!K.boundChange;for(let U=!1;;){let z=Z.to+G-Q.to,V=z||Z.endSide-Q.endSide,F=V<0?Z.to+G:Q.to,H=Math.min(F,q);if(Z.point||Q.point){if(!(Z.point&&Q.point&&tY(Z.point,Q.point)&&lY(Z.activeForPoint(Z.to),Q.activeForPoint(Q.to))))K.comparePoint(W,H,Z.point,Q.point);U=!1}else{if(U)K.boundChange(W);if(H>W&&!lY(Z.active,Q.active))K.compareRange(W,H,Z.active,Q.active);if(I&&H<q&&(z||Z.openEnd(F)!=Q.openEnd(F)))U=!0}if(F>q)break;if(W=F,V<=0)Z.next();if(V>=0)Q.next()}}function lY(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(Z[Q]!=J[Q]&&!tY(Z[Q],J[Q]))return!1;return!0}function WJ(Z,J){for(let Q=J,X=Z.length-1;Q<X;Q++)Z[Q]=Z[Q+1];Z.pop()}function GJ(Z,J,Q){for(let X=Z.length-1;X>=J;X--)Z[X+1]=Z[X];Z[J]=Q}function lU(Z,J){let Q=-1,X=1e9;for(let Y=0;Y<J.length;Y++)if((J[Y]-X||Z[Y].endSide-Z[Q].endSide)<0)Q=Y,X=J[Y];return Q}function v7(Z,J,Q=Z.length){let X=0;for(let Y=0;Y<Q&&Y<Z.length;)if(Z.charCodeAt(Y)==9)X+=J-X%J,Y++;else X++,Y=q1(Z,Y);return X}function Gz(Z,J,Q,X){for(let Y=0,K=0;;){if(K>=J)return Y;if(Y==Z.length)break;K+=Z.charCodeAt(Y)==9?Q-K%Q:1,Y=q1(Z,Y)}return X===!0?-1:Z.length}var Iz=typeof Symbol>"u"?"__"+"ͼ":Symbol.for("ͼ"),J3=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),Uz=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class P6{constructor(Z,J){this.rules=[];let{finish:Q}=J||{};function X(K){return/^@/.test(K)?[K]:K.split(/,\s*/)}function Y(K,q,W,G){let I=[],U=/^@(\w+)\b/.exec(K[0]),z=U&&U[1]=="keyframes";if(U&&q==null)return W.push(K[0]+";");for(let V in q){let F=q[V];if(/&/.test(V))Y(V.split(/,\s*/).map((H)=>K.map((N)=>H.replace(/&/,N))).reduce((H,N)=>H.concat(N)),F,W);else if(F&&typeof F=="object"){if(!U)throw RangeError("The value of a property ("+V+") should be a primitive value.");Y(X(V),F,I,z)}else if(F!=null)I.push(V.replace(/_.*/,"").replace(/[A-Z]/g,(H)=>"-"+H.toLowerCase())+": "+F+";")}if(I.length||z)W.push((Q&&!U&&!G?K.map(Q):K).join(", ")+" {"+I.join(" ")+"}")}for(let K in Z)Y(X(K),Z[K],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let Z=Uz[Iz]||1;return Uz[Iz]=Z+1,"ͼ"+Z.toString(36)}static mount(Z,J,Q){let X=Z[J3],Y=Q&&Q.nonce;if(!X)X=new Vz(Z,Y);else if(Y)X.setNonce(Y);X.mount(Array.isArray(J)?J:[J],Z)}}var zz=new Map;class Vz{constructor(Z,J){let Q=Z.ownerDocument||Z,X=Q.defaultView;if(!Z.head&&Z.adoptedStyleSheets&&X.CSSStyleSheet){let Y=zz.get(Q);if(Y)return Z[J3]=Y;this.sheet=new X.CSSStyleSheet,zz.set(Q,this)}else if(this.styleTag=Q.createElement("style"),J)this.styleTag.setAttribute("nonce",J);this.modules=[],Z[J3]=this}mount(Z,J){let Q=this.sheet,X=0,Y=0;for(let K=0;K<Z.length;K++){let q=Z[K],W=this.modules.indexOf(q);if(W<Y&&W>-1)this.modules.splice(W,1),Y--,W=-1;if(W==-1){if(this.modules.splice(Y++,0,q),Q)for(let G=0;G<q.rules.length;G++)Q.insertRule(q.rules[G],X++)}else{while(Y<W)X+=this.modules[Y++].rules.length;X+=q.rules.length,Y++}}if(Q){if(J.adoptedStyleSheets.indexOf(this.sheet)<0)J.adoptedStyleSheets=[this.sheet,...J.adoptedStyleSheets]}else{let K="";for(let W=0;W<this.modules.length;W++)K+=this.modules[W].getRules()+`
`;this.styleTag.textContent=K;let q=J.head||J;if(this.styleTag.parentNode!=q)q.insertBefore(this.styleTag,q.firstChild)}}setNonce(Z){if(this.styleTag&&this.styleTag.getAttribute("nonce")!=Z)this.styleTag.setAttribute("nonce",Z)}}var D8={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},x9={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},DR=typeof navigator<"u"&&/Mac/.test(navigator.platform),BR=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(p0=0;p0<10;p0++)D8[48+p0]=D8[96+p0]=String(p0);var p0;for(p0=1;p0<=24;p0++)D8[p0+111]="F"+p0;var p0;for(p0=65;p0<=90;p0++)D8[p0]=String.fromCharCode(p0+32),x9[p0]=String.fromCharCode(p0);var p0;for(Y5 in D8)if(!x9.hasOwnProperty(Y5))x9[Y5]=D8[Y5];var Y5;function jz(Z){var J=DR&&Z.metaKey&&Z.shiftKey&&!Z.ctrlKey&&!Z.altKey||BR&&Z.shiftKey&&Z.key&&Z.key.length==1||Z.key=="Unidentified",Q=!J&&Z.key||(Z.shiftKey?x9:D8)[Z.keyCode]||Z.key||"Unidentified";if(Q=="Esc")Q="Escape";if(Q=="Del")Q="Delete";if(Q=="Left")Q="ArrowLeft";if(Q=="Up")Q="ArrowUp";if(Q=="Right")Q="ArrowRight";if(Q=="Down")Q="ArrowDown";return Q}function c1(){var Z=arguments[0];if(typeof Z=="string")Z=document.createElement(Z);var J=1,Q=arguments[1];if(Q&&typeof Q=="object"&&Q.nodeType==null&&!Array.isArray(Q)){for(var X in Q)if(Object.prototype.hasOwnProperty.call(Q,X)){var Y=Q[X];if(typeof Y=="string")Z.setAttribute(X,Y);else if(Y!=null)Z[X]=Y}J++}for(;J<arguments.length;J++)Fz(Z,arguments[J]);return Z}function Fz(Z,J){if(typeof J=="string")Z.appendChild(document.createTextNode(J));else if(J==null);else if(J.nodeType!=null)Z.appendChild(J);else if(Array.isArray(J))for(var Q=0;Q<J.length;Q++)Fz(Z,J[Q]);else throw RangeError("Unsupported child node: "+J)}var E1=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},U3=typeof document<"u"?document:{documentElement:{style:{}}},z3=/Edge\/(\d+)/.exec(E1.userAgent),az=/MSIE \d/.test(E1.userAgent),V3=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(E1.userAgent),uJ=!!(az||V3||z3),Oz=!uJ&&/gecko\/(\d+)/i.test(E1.userAgent),Q3=!uJ&&/Chrome\/(\d+)/.exec(E1.userAgent),Hz="webkitFontSmoothing"in U3.documentElement.style,j3=!uJ&&/Apple Computer/.test(E1.vendor),Nz=j3&&(/Mobile\/\w+/.test(E1.userAgent)||E1.maxTouchPoints>2),r={mac:Nz||/Mac/.test(E1.platform),windows:/Win/.test(E1.platform),linux:/Linux|X11/.test(E1.platform),ie:uJ,ie_version:az?U3.documentMode||6:V3?+V3[1]:z3?+z3[1]:0,gecko:Oz,gecko_version:Oz?+(/Firefox\/(\d+)/.exec(E1.userAgent)||[0,0])[1]:0,chrome:!!Q3,chrome_version:Q3?+Q3[1]:0,ios:Nz,android:/Android\b/.test(E1.userAgent),webkit:Hz,webkit_version:Hz?+(/\bAppleWebKit\/(\d+)/.exec(E1.userAgent)||[0,0])[1]:0,safari:j3,safari_version:j3?+(/\bVersion\/(\d+(\.\d+)?)/.exec(E1.userAgent)||[0,0])[1]:0,tabSize:U3.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function b3(Z,J){for(let Q in Z)if(Q=="class"&&J.class)J.class+=" "+Z.class;else if(Q=="style"&&J.style)J.style+=";"+Z.style;else J[Q]=Z[Q];return J}var wJ=Object.create(null);function y3(Z,J,Q){if(Z==J)return!0;if(!Z)Z=wJ;if(!J)J=wJ;let X=Object.keys(Z),Y=Object.keys(J);if(X.length-(Q&&X.indexOf(Q)>-1?1:0)!=Y.length-(Q&&Y.indexOf(Q)>-1?1:0))return!1;for(let K of X)if(K!=Q&&(Y.indexOf(K)==-1||Z[K]!==J[K]))return!1;return!0}function LR(Z,J){for(let Q=Z.attributes.length-1;Q>=0;Q--){let X=Z.attributes[Q].name;if(J[X]==null)Z.removeAttribute(X)}for(let Q in J){let X=J[Q];if(Q=="style")Z.style.cssText=X;else if(Z.getAttribute(Q)!=X)Z.setAttribute(Q,X)}}function Rz(Z,J,Q){let X=!1;if(J){for(let Y in J)if(!(Q&&(Y in Q)))if(X=!0,Y=="style")Z.style.cssText="";else Z.removeAttribute(Y)}if(Q){for(let Y in Q)if(!(J&&J[Y]==Q[Y]))if(X=!0,Y=="style")Z.style.cssText=Q[Y];else Z.setAttribute(Y,Q[Y])}return X}function PR(Z){let J=Object.create(null);for(let Q=0;Q<Z.attributes.length;Q++){let X=Z.attributes[Q];J[X.name]=X.value}return J}class a8{eq(Z){return!1}updateDOM(Z,J,Q){return!1}compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(Z){return!0}coordsAt(Z,J,Q){return null}get isHidden(){return!1}get editable(){return!1}destroy(Z){}}var V1=function(Z){return Z[Z.Text=0]="Text",Z[Z.WidgetBefore=1]="WidgetBefore",Z[Z.WidgetAfter=2]="WidgetAfter",Z[Z.WidgetRange=3]="WidgetRange",Z}(V1||(V1={}));class L0 extends N8{constructor(Z,J,Q,X){super();this.startSide=Z,this.endSide=J,this.widget=Q,this.spec=X}get heightRelevant(){return!1}static mark(Z){return new H5(Z)}static widget(Z){let J=Math.max(-1e4,Math.min(1e4,Z.side||0)),Q=!!Z.block;return J+=Q&&!Z.inlineOrder?J>0?300000000:-400000000:J>0?1e8:-1e8,new c7(Z,J,J,Q,Z.widget||null,!1)}static replace(Z){let J=!!Z.block,Q,X;if(Z.isBlockGap)Q=-500000000,X=400000000;else{let{start:Y,end:K}=oz(Z,J);Q=(Y?J?-300000000:-1:500000000)-1,X=(K?J?200000000:1:-600000000)+1}return new c7(Z,Q,X,J,Z.widget||null,!0)}static line(Z){return new N5(Z)}static set(Z,J=!1){return N0.of(Z,J)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}L0.none=N0.empty;class H5 extends L0{constructor(Z){let{start:J,end:Q}=oz(Z);super(J?-1:500000000,Q?1:-600000000,null,Z);this.tagName=Z.tagName||"span",this.attrs=Z.class&&Z.attributes?b3(Z.attributes,{class:Z.class}):Z.class?{class:Z.class}:Z.attributes||wJ}eq(Z){return this==Z||Z instanceof H5&&this.tagName==Z.tagName&&y3(this.attrs,Z.attrs)}range(Z,J=Z){if(Z>=J)throw RangeError("Mark decorations may not be empty");return super.range(Z,J)}}H5.prototype.point=!1;class N5 extends L0{constructor(Z){super(-200000000,-200000000,null,Z)}eq(Z){return Z instanceof N5&&this.spec.class==Z.spec.class&&y3(this.spec.attributes,Z.spec.attributes)}range(Z,J=Z){if(J!=Z)throw RangeError("Line decoration ranges must be zero-length");return super.range(Z,J)}}N5.prototype.mapMode=T1.TrackBefore;N5.prototype.point=!0;class c7 extends L0{constructor(Z,J,Q,X,Y,K){super(J,Q,Y,Z);this.block=X,this.isReplace=K,this.mapMode=!X?T1.TrackDel:J<=0?T1.TrackBefore:T1.TrackAfter}get type(){return this.startSide!=this.endSide?V1.WidgetRange:this.startSide<=0?V1.WidgetBefore:V1.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(Z){return Z instanceof c7&&SR(this.widget,Z.widget)&&this.block==Z.block&&this.startSide==Z.startSide&&this.endSide==Z.endSide}range(Z,J=Z){if(this.isReplace&&(Z>J||Z==J&&this.startSide>0&&this.endSide<=0))throw RangeError("Invalid range for replacement decoration");if(!this.isReplace&&J!=Z)throw RangeError("Widget decorations can only have zero-length ranges");return super.range(Z,J)}}c7.prototype.point=!0;function oz(Z,J=!1){let{inclusiveStart:Q,inclusiveEnd:X}=Z;if(Q==null)Q=Z.inclusive;if(X==null)X=Z.inclusive;return{start:Q!==null&&Q!==void 0?Q:J,end:X!==null&&X!==void 0?X:J}}function SR(Z,J){return Z==J||!!(Z&&J&&Z.compare(J))}function $9(Z,J,Q,X=0){let Y=Q.length-1;if(Y>=0&&Q[Y]+X>=Z)Q[Y]=Math.max(Q[Y],J);else Q.push(Z,J)}class V5 extends N8{constructor(Z,J,Q){super();this.tagName=Z,this.attributes=J,this.rank=Q}eq(Z){return Z==this||Z instanceof V5&&this.tagName==Z.tagName&&y3(this.attributes,Z.attributes)}static create(Z){return new V5(Z.tagName,Z.attributes||wJ,Z.rank==null?50:Math.max(0,Math.min(Z.rank,100)))}static set(Z,J=!1){return N0.of(Z,J)}}V5.prototype.startSide=V5.prototype.endSide=-1;function j5(Z){let J;if(Z.nodeType==11)J=Z.getSelection?Z:Z.ownerDocument;else J=Z;return J.getSelection()}function F3(Z,J){return J?Z==J||Z.contains(J.nodeType!=1?J.parentNode:J):!1}function I5(Z,J){if(!J.anchorNode)return!1;try{return F3(Z,J.anchorNode)}catch(Q){return!1}}function BJ(Z){if(Z.nodeType==3)return F5(Z,0,Z.nodeValue.length).getClientRects();else if(Z.nodeType==1)return Z.getClientRects();else return[]}function U5(Z,J,Q,X){return Q?Mz(Z,J,Q,X,-1)||Mz(Z,J,Q,X,1):!1}function r8(Z){for(var J=0;;J++)if(Z=Z.previousSibling,!Z)return J}function kJ(Z){return Z.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(Z.nodeName)}function Mz(Z,J,Q,X,Y){for(;;){if(Z==Q&&J==X)return!0;if(J==(Y<0?0:P8(Z))){if(Z.nodeName=="DIV")return!1;let K=Z.parentNode;if(!K||K.nodeType!=1)return!1;J=r8(Z)+(Y<0?0:1),Z=K}else if(Z.nodeType==1){if(Z=Z.childNodes[J+(Y<0?-1:0)],Z.nodeType==1&&Z.contentEditable=="false")return!1;J=Y<0?P8(Z):0}else return!1}}function P8(Z){return Z.nodeType==3?Z.nodeValue.length:Z.childNodes.length}function xJ(Z,J){let{left:Q,right:X}=Z;if(Q==X)return Z;let Y=J?Q:X;return{left:Y,right:Y,top:Z.top,bottom:Z.bottom}}function TR(Z){let J=Z.visualViewport;if(J)return{left:0,right:J.width,top:0,bottom:J.height};return{left:0,right:Z.innerWidth,top:0,bottom:Z.innerHeight}}function tz(Z,J){let Q=J.width/Z.offsetWidth,X=J.height/Z.offsetHeight;if(Q>0.995&&Q<1.005||!isFinite(Q)||Math.abs(J.width-Z.offsetWidth)<1)Q=1;if(X>0.995&&X<1.005||!isFinite(X)||Math.abs(J.height-Z.offsetHeight)<1)X=1;return{scaleX:Q,scaleY:X}}function ER(Z,J,Q,X,Y,K,q,W){let G=Z.ownerDocument,I=G.defaultView||window;for(let U=Z,z=!1;U&&!z;)if(U.nodeType==1){let V,F=U==G.body,H=1,N=1;if(F)V=TR(I);else{if(/^(fixed|sticky)$/.test(getComputedStyle(U).position))z=!0;if(U.scrollHeight<=U.clientHeight&&U.scrollWidth<=U.clientWidth){U=U.assignedSlot||U.parentNode;continue}let E=U.getBoundingClientRect();({scaleX:H,scaleY:N}=tz(U,E)),V={left:E.left,right:E.left+U.clientWidth*H,top:E.top,bottom:E.top+U.clientHeight*N}}let R=0,T=0;if(Y=="nearest"){if(J.top<V.top+q){if(T=J.top-(V.top+q),Q>0&&J.bottom>V.bottom+T)T=J.bottom-V.bottom+q}else if(J.bottom>V.bottom-q){if(T=J.bottom-V.bottom+q,Q<0&&J.top-T<V.top)T=J.top-(V.top+q)}}else{let E=J.bottom-J.top,_=V.bottom-V.top;T=(Y=="center"&&E<=_?J.top+E/2-_/2:Y=="start"||Y=="center"&&Q<0?J.top-q:J.bottom-_+q)-V.top}if(X=="nearest"){if(J.left<V.left+K){if(R=J.left-(V.left+K),Q>0&&J.right>V.right+R)R=J.right-V.right+K}else if(J.right>V.right-K){if(R=J.right-V.right+K,Q<0&&J.left<V.left+R)R=J.left-(V.left+K)}}else R=(X=="center"?J.left+(J.right-J.left)/2-(V.right-V.left)/2:X=="start"==W?J.left-K:J.right-(V.right-V.left)+K)-V.left;if(R||T)if(F)I.scrollBy(R,T);else{let E=0,_=0;if(T){let k=U.scrollTop;U.scrollTop+=T/N,_=(U.scrollTop-k)*N}if(R){let k=U.scrollLeft;U.scrollLeft+=R/H,E=(U.scrollLeft-k)*H}if(J={left:J.left-E,top:J.top-_,right:J.right-E,bottom:J.bottom-_},E&&Math.abs(E-R)<1)X="nearest";if(_&&Math.abs(_-T)<1)Y="nearest"}if(F)break;if(J.top<V.top||J.bottom>V.bottom||J.left<V.left||J.right>V.right)J={left:Math.max(J.left,V.left),right:Math.min(J.right,V.right),top:Math.max(J.top,V.top),bottom:Math.min(J.bottom,V.bottom)};U=U.assignedSlot||U.parentNode}else if(U.nodeType==11)U=U.host;else break}function ez(Z,J=!0){let Q=Z.ownerDocument,X=null,Y=null;for(let K=Z.parentNode;K;)if(K==Q.body||(!J||X)&&Y)break;else if(K.nodeType==1){if(!Y&&K.scrollHeight>K.clientHeight)Y=K;if(J&&!X&&K.scrollWidth>K.clientWidth)X=K;K=K.assignedSlot||K.parentNode}else if(K.nodeType==11)K=K.host;else break;return{x:X,y:Y}}class ZV{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(Z){return this.anchorNode==Z.anchorNode&&this.anchorOffset==Z.anchorOffset&&this.focusNode==Z.focusNode&&this.focusOffset==Z.focusOffset}setRange(Z){let{anchorNode:J,focusNode:Q}=Z;this.set(J,Math.min(Z.anchorOffset,J?P8(J):0),Q,Math.min(Z.focusOffset,Q?P8(Q):0))}set(Z,J,Q,X){this.anchorNode=Z,this.anchorOffset=J,this.focusNode=Q,this.focusOffset=X}}function JV(Z){let J=[];for(let Q=Z;Q;Q=Q.nodeType==11?Q.host:Q.parentNode)if(Q.nodeType==1)J.push({node:Q,left:Q.scrollLeft,top:Q.scrollTop});return J}function QV(Z,J=!0){for(let{node:Q,left:X,top:Y}of Z){if(J&&Q.scrollTop!=Y)Q.scrollTop=Y;if(Q.scrollLeft!=X)Q.scrollLeft=X}}var m7=null;if(r.safari&&r.safari_version>=26)m7=!1;function XV(Z){if(Z.setActive)return Z.setActive();if(m7)return Z.focus(m7);let J=JV(Z);if(Z.focus(m7==null?{get preventScroll(){return m7={preventScroll:!0},!0}}:void 0),!m7)m7=!1,QV(J)}var Az;function F5(Z,J,Q=J){let X=Az||(Az=document.createRange());return X.setEnd(Z,Q),X.setStart(Z,J),X}function g9(Z,J,Q,X){let Y={key:J,code:J,keyCode:Q,which:Q,cancelable:!0};if(X)({altKey:Y.altKey,ctrlKey:Y.ctrlKey,shiftKey:Y.shiftKey,metaKey:Y.metaKey}=X);let K=new KeyboardEvent("keydown",Y);K.synthetic=!0,Z.dispatchEvent(K);let q=new KeyboardEvent("keyup",Y);return q.synthetic=!0,Z.dispatchEvent(q),K.defaultPrevented||q.defaultPrevented}function CR(Z){while(Z){if(Z&&(Z.nodeType==9||Z.nodeType==11&&Z.host))return Z;Z=Z.assignedSlot||Z.parentNode}return null}function _R(Z,J){let{focusNode:Q,focusOffset:X}=J;if(!Q||J.anchorNode!=Q||J.anchorOffset!=X)return!1;X=Math.min(X,P8(Q));for(;;)if(X){if(Q.nodeType!=1)return!1;let Y=Q.childNodes[X-1];if(Y.contentEditable=="false")X--;else Q=Y,X=P8(Q)}else if(Q==Z)return!0;else X=r8(Q),Q=Q.parentNode}function YV(Z){if(Z instanceof Window)return Z.pageYOffset>Math.max(0,Z.document.documentElement.scrollHeight-Z.innerHeight-4);return Z.scrollTop>Math.max(1,Z.scrollHeight-Z.clientHeight-4)}function KV(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X>0)return{node:Q,offset:X};else if(Q.nodeType==1&&X>0){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X-1],X=P8(Q)}else if(Q.parentNode&&!kJ(Q))X=r8(Q),Q=Q.parentNode;else return null}function qV(Z,J){for(let Q=Z,X=J;;)if(Q.nodeType==3&&X<Q.nodeValue.length)return{node:Q,offset:X};else if(Q.nodeType==1&&X<Q.childNodes.length){if(Q.contentEditable=="false")return null;Q=Q.childNodes[X],X=0}else if(Q.parentNode&&!kJ(Q))X=r8(Q)+1,Q=Q.parentNode;else return null}class E6{constructor(Z,J,Q=!0){this.node=Z,this.offset=J,this.precise=Q}static before(Z,J){return new E6(Z.parentNode,r8(Z),J)}static after(Z,J){return new E6(Z.parentNode,r8(Z)+1,J)}}var w0=function(Z){return Z[Z.LTR=0]="LTR",Z[Z.RTL=1]="RTL",Z}(w0||(w0={})),d7=w0.LTR,h3=w0.RTL;function WV(Z){let J=[];for(let Q=0;Q<Z.length;Q++)J.push(1<<+Z[Q]);return J}var wR=WV("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),kR=WV("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),O3=Object.create(null),s6=[];for(let Z of["()","[]","{}"]){let J=Z.charCodeAt(0),Q=Z.charCodeAt(1);O3[J]=Q,O3[Q]=-J}function GV(Z){return Z<=247?wR[Z]:1424<=Z&&Z<=1524?2:1536<=Z&&Z<=1785?kR[Z-1536]:1774<=Z&&Z<=2220?4:8192<=Z&&Z<=8204?256:64336<=Z&&Z<=65023?4:1}var xR=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class C6{get dir(){return this.level%2?h3:d7}constructor(Z,J,Q){this.from=Z,this.to=J,this.level=Q}side(Z,J){return this.dir==J==Z?this.to:this.from}forward(Z,J){return Z==(this.dir==J)}static find(Z,J,Q,X){let Y=-1;for(let K=0;K<Z.length;K++){let q=Z[K];if(q.from<=J&&q.to>=J){if(q.level==Q)return K;if(Y<0||(X!=0?X<0?q.from<J:q.to>J:Z[Y].level>q.level))Y=K}}if(Y<0)throw RangeError("Index out of range");return Y}}function IV(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.direction!=Y.direction||!IV(X.inner,Y.inner))return!1}return!0}var x0=[];function bR(Z,J,Q,X,Y){for(let K=0;K<=X.length;K++){let q=K?X[K-1].to:J,W=K<X.length?X[K].from:Q,G=K?256:Y;for(let I=q,U=G,z=G;I<W;I++){let V=GV(Z.charCodeAt(I));if(V==512)V=U;else if(V==8&&z==4)V=16;if(x0[I]=V==4?2:V,V&7)z=V;U=V}for(let I=q,U=G,z=G;I<W;I++){let V=x0[I];if(V==128)if(I<W-1&&U==x0[I+1]&&U&24)V=x0[I]=U;else x0[I]=256;else if(V==64){let F=I+1;while(F<W&&x0[F]==64)F++;let H=I&&U==8||F<Q&&x0[F]==8?z==1?1:8:256;for(let N=I;N<F;N++)x0[N]=H;I=F-1}else if(V==8&&z==1)x0[I]=1;if(U=V,V&7)z=V}}}function yR(Z,J,Q,X,Y){let K=Y==1?2:1;for(let q=0,W=0,G=0;q<=X.length;q++){let I=q?X[q-1].to:J,U=q<X.length?X[q].from:Q;for(let z=I,V,F,H;z<U;z++)if(F=O3[V=Z.charCodeAt(z)])if(F<0){for(let N=W-3;N>=0;N-=3)if(s6[N+1]==-F){let R=s6[N+2],T=R&2?Y:!(R&4)?0:R&1?K:Y;if(T)x0[z]=x0[s6[N]]=T;W=N;break}}else if(s6.length==189)break;else s6[W++]=z,s6[W++]=V,s6[W++]=G;else if((H=x0[z])==2||H==1){let N=H==Y;G=N?0:1;for(let R=W-3;R>=0;R-=3){let T=s6[R+2];if(T&2)break;if(N)s6[R+2]|=2;else{if(T&4)break;s6[R+2]|=4}}}}}function hR(Z,J,Q,X){for(let Y=0,K=X;Y<=Q.length;Y++){let q=Y?Q[Y-1].to:Z,W=Y<Q.length?Q[Y].from:J;for(let G=q;G<W;){let I=x0[G];if(I==256){let U=G+1;for(;;)if(U==W){if(Y==Q.length)break;U=Q[Y++].to,W=Y<Q.length?Q[Y].from:J}else if(x0[U]==256)U++;else break;let z=K==1,V=(U<J?x0[U]:X)==1,F=z==V?z?1:2:X;for(let H=U,N=Y,R=N?Q[N-1].to:Z;H>G;){if(H==R)H=Q[--N].from,R=N?Q[N-1].to:Z;x0[--H]=F}G=U}else K=I,G++}}}function H3(Z,J,Q,X,Y,K,q){let W=X%2?2:1;if(X%2==Y%2)for(let G=J,I=0;G<Q;){let U=!0,z=!1;if(I==K.length||G<K[I].from){let N=x0[G];if(N!=W)U=!1,z=N==16}let V=!U&&W==1?[]:null,F=U?X:X+1,H=G;Z:for(;;)if(I<K.length&&H==K[I].from){if(z)break Z;let N=K[I];if(!U)for(let R=N.to,T=I+1;;){if(R==Q)break Z;if(T<K.length&&K[T].from==R)R=K[T++].to;else if(x0[R]==W)break Z;else break}if(I++,V)V.push(N);else{if(N.from>G)q.push(new C6(G,N.from,F));let R=N.direction==d7!=!(F%2);N3(Z,R?X+1:X,Y,N.inner,N.from,N.to,q),G=N.to}H=N.to}else if(H==Q||(U?x0[H]!=W:x0[H]==W))break;else H++;if(V)H3(Z,G,H,X+1,Y,V,q);else if(G<H)q.push(new C6(G,H,F));G=H}else for(let G=Q,I=K.length;G>J;){let U=!0,z=!1;if(!I||G>K[I-1].to){let N=x0[G-1];if(N!=W)U=!1,z=N==16}let V=!U&&W==1?[]:null,F=U?X:X+1,H=G;Z:for(;;)if(I&&H==K[I-1].to){if(z)break Z;let N=K[--I];if(!U)for(let R=N.from,T=I;;){if(R==J)break Z;if(T&&K[T-1].to==R)R=K[--T].from;else if(x0[R-1]==W)break Z;else break}if(V)V.push(N);else{if(N.to<G)q.push(new C6(N.to,G,F));let R=N.direction==d7!=!(F%2);N3(Z,R?X+1:X,Y,N.inner,N.from,N.to,q),G=N.from}H=N.from}else if(H==J||(U?x0[H-1]!=W:x0[H-1]==W))break;else H--;if(V)H3(Z,H,G,X+1,Y,V,q);else if(H<G)q.push(new C6(H,G,F));G=H}}function N3(Z,J,Q,X,Y,K,q){let W=J%2?2:1;bR(Z,Y,K,X,W),yR(Z,Y,K,X,W),hR(Y,K,X,W),H3(Z,Y,K,J,Q,X,q)}function $R(Z,J,Q){if(!Z)return[new C6(0,0,J==h3?1:0)];if(J==d7&&!Q.length&&!xR.test(Z))return UV(Z.length);if(Q.length)while(Z.length>x0.length)x0[x0.length]=256;let X=[],Y=J==d7?0:1;return N3(Z,Y,Y,Q,0,Z.length,X),X}function UV(Z){return[new C6(0,Z,0)]}var zV="";function gR(Z,J,Q,X,Y){var K;let q=X.head-Z.from,W=C6.find(J,q,(K=X.bidiLevel)!==null&&K!==void 0?K:-1,X.assoc),G=J[W],I=G.side(Y,Q);if(q==I){let V=W+=Y?1:-1;if(V<0||V>=J.length)return null;G=J[W=V],q=G.side(!Y,Q),I=G.side(Y,Q)}let U=q1(Z.text,q,G.forward(Y,Q));if(U<G.from||U>G.to)U=I;zV=Z.text.slice(Math.min(q,U),Math.max(q,U));let z=W==(Y?J.length-1:0)?null:J[W+(Y?1:-1)];if(z&&U==I&&z.level+(Y?0:1)<G.level)return f.cursor(z.side(!Y,Q)+Z.from,z.forward(Y,Q)?1:-1,z.level);return f.cursor(U+Z.from,G.forward(Y,Q)?-1:1,G.level)}function fR(Z,J,Q){for(let X=J;X<Q;X++){let Y=GV(Z.charCodeAt(X));if(Y==1)return d7;if(Y==2||Y==4)return h3}return d7}var VV=o.define(),jV=o.define(),FV=o.define(),OV=o.define(),R3=o.define(),HV=o.define(),NV=o.define(),$3=o.define(),g3=o.define(),RV=o.define({combine:(Z)=>Z.some((J)=>J)}),MV=o.define({combine:(Z)=>Z.some((J)=>J)}),AV=o.define();class f9{constructor(Z,J,Q,X,Y,K=!1){this.range=Z,this.y=J,this.x=Q,this.yMargin=X,this.xMargin=Y,this.isSnapshot=K}map(Z){return Z.empty?this:new f9(this.range.map(Z),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(Z){return this.range.to<=Z.doc.length?this:new f9(f.cursor(Z.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}var jJ=B0.define({map:(Z,J)=>Z.map(J)}),DV=B0.define();function l1(Z,J,Q){let X=Z.facet(OV);if(X.length)X[0](J);else if(window.onerror&&window.onerror(String(J),Q,void 0,void 0,J));else if(Q)console.error(Q+":",J);else console.error(J)}var B8=o.define({combine:(Z)=>Z.length?Z[0]:!0}),uR=0,y9=o.define({combine(Z){return Z.filter((J,Q)=>{for(let X=0;X<Q;X++)if(Z[X].plugin==J.plugin)return!1;return!0})}});class M1{constructor(Z,J,Q,X,Y){this.id=Z,this.create=J,this.domEventHandlers=Q,this.domEventObservers=X,this.baseExtensions=Y(this),this.extension=this.baseExtensions.concat(y9.of({plugin:this,arg:void 0}))}of(Z){return this.baseExtensions.concat(y9.of({plugin:this,arg:Z}))}static define(Z,J){let{eventHandlers:Q,eventObservers:X,provide:Y,decorations:K}=J||{};return new M1(uR++,Z,Q,X,(q)=>{let W=[];if(K)W.push(vJ.of((G)=>{let I=G.plugin(q);return I?K(I):L0.none}));if(Y)W.push(Y(q));return W})}static fromClass(Z,J){return M1.define((Q,X)=>new Z(Q,X),J)}}class LJ{constructor(Z){this.spec=Z,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(Z){if(!this.value){if(this.spec)try{this.value=this.spec.plugin.create(Z,this.spec.arg)}catch(J){l1(Z.state,J,"CodeMirror plugin crashed"),this.deactivate()}}else if(this.mustUpdate){let J=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(J)}catch(Q){if(l1(J.state,Q,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch(X){}this.deactivate()}}return this}destroy(Z){var J;if((J=this.value)===null||J===void 0?void 0:J.destroy)try{this.value.destroy()}catch(Q){l1(Z.state,Q,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}var BV=o.define(),f3=o.define(),vJ=o.define(),LV=o.define(),u3=o.define(),R5=o.define(),PV=o.define();function Dz(Z,J){let Q=Z.state.facet(PV);if(!Q.length)return Q;let X=Q.map((K)=>K instanceof Function?K(Z):K),Y=[];return N0.spans(X,J.from,J.to,{point(){},span(K,q,W,G){let I=K-J.from,U=q-J.from,z=Y;for(let V=W.length-1;V>=0;V--,G--){let F=W[V].spec.bidiIsolate,H;if(F==null)F=fR(J.text,I,U);if(G>0&&z.length&&(H=z[z.length-1]).to==I&&H.direction==F)H.to=U,z=H.inner;else{let N={from:I,to:U,direction:F,inner:[]};z.push(N),z=N.inner}}}}),Y}var SV=o.define();function v3(Z){let J=0,Q=0,X=0,Y=0;for(let K of Z.state.facet(SV)){let q=K(Z);if(q){if(q.left!=null)J=Math.max(J,q.left);if(q.right!=null)Q=Math.max(Q,q.right);if(q.top!=null)X=Math.max(X,q.top);if(q.bottom!=null)Y=Math.max(Y,q.bottom)}}return{left:J,right:Q,top:X,bottom:Y}}var K5=o.define();class J6{constructor(Z,J,Q,X){this.fromA=Z,this.toA=J,this.fromB=Q,this.toB=X}join(Z){return new J6(Math.min(this.fromA,Z.fromA),Math.max(this.toA,Z.toA),Math.min(this.fromB,Z.fromB),Math.max(this.toB,Z.toB))}addToSet(Z){let J=Z.length,Q=this;for(;J>0;J--){let X=Z[J-1];if(X.fromA>Q.toA)continue;if(X.toA<Q.fromA)break;Q=Q.join(X),Z.splice(J-1,1)}return Z.splice(J,0,Q),Z}static extendWithRanges(Z,J){if(J.length==0)return Z;let Q=[];for(let X=0,Y=0,K=0;;){let q=X<Z.length?Z[X].fromB:1e9,W=Y<J.length?J[Y]:1e9,G=Math.min(q,W);if(G==1e9)break;let I=G+K,U=G,z=I;for(;;)if(Y<J.length&&J[Y]<=U){let V=J[Y+1];Y+=2,U=Math.max(U,V);for(let F=X;F<Z.length&&Z[F].fromB<=U;F++)K=Z[F].toA-Z[F].toB;z=Math.max(z,V+K)}else if(X<Z.length&&Z[X].fromB<=U){let V=Z[X++];U=Math.max(U,V.toB),z=Math.max(z,V.toA),K=V.toA-V.toB}else break;Q.push(new J6(I,z,G,U))}return Q}}class bJ{constructor(Z,J,Q){this.view=Z,this.state=J,this.transactions=Q,this.flags=0,this.startState=Z.state,this.changes=a0.empty(this.startState.doc.length);for(let Y of Q)this.changes=this.changes.compose(Y.changes);let X=[];this.changes.iterChangedRanges((Y,K,q,W)=>X.push(new J6(Y,K,q,W))),this.changedRanges=X}static create(Z,J,Q){return new bJ(Z,J,Q)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some((Z)=>Z.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}var vR=[];class c0{constructor(Z,J,Q=0){this.dom=Z,this.length=J,this.flags=Q,this.parent=null,Z.cmTile=this}get breakAfter(){return this.flags&1}get children(){return vR}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(Z){if(this.flags|=2,this.flags&4){this.flags&=-5;let J=this.domAttrs;if(J)LR(this.dom,J)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(Z){this.dom=Z,Z.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(Z,J=this.posAtStart){let Q=J;for(let X of this.children){if(X==Z)return Q;Q+=X.length+X.breakAfter}throw RangeError("Invalid child in posBefore")}posAfter(Z){return this.posBefore(Z)+Z.length}covers(Z){return!0}coordsIn(Z,J,Q){return null}domPosFor(Z,J){let Q=r8(this.dom),X=this.length?Z>0:J>0;return new E6(this.parent.dom,Q+(X?1:0),Z==0||Z==this.length)}markDirty(Z){if(this.flags&=-3,Z)this.flags|=4;if(this.parent&&this.parent.flags&2)this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let Z=this;Z;Z=Z.parent)if(Z instanceof A5)return Z;return null}static get(Z){return Z.cmTile}}class M5 extends c0{constructor(Z){super(Z,0);this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(Z){this.children.push(Z),Z.parent=this}sync(Z){if(this.flags&2)return;super.sync(Z);let J=this.dom,Q=null,X,Y=(Z===null||Z===void 0?void 0:Z.node)==J?Z:null,K=0;for(let q of this.children){if(q.sync(Z),K+=q.length+q.breakAfter,X=Q?Q.nextSibling:J.firstChild,Y&&X!=q.dom)Y.written=!0;if(q.dom.parentNode==J)while(X&&X!=q.dom)X=Bz(X);else J.insertBefore(q.dom,X);Q=q.dom}if(X=Q?Q.nextSibling:J.firstChild,Y&&X)Y.written=!0;while(X)X=Bz(X);this.length=K}}function Bz(Z){let J=Z.nextSibling;return Z.parentNode.removeChild(Z),J}class A5 extends M5{constructor(Z,J){super(J);this.view=Z}owns(Z){for(;Z;Z=Z.parent)if(Z==this)return!0;return!1}isBlock(){return!0}nearest(Z){for(;;){if(!Z)return null;let J=c0.get(Z);if(J&&this.owns(J))return J;Z=Z.parentNode}}blockTiles(Z){for(let J=[],Q=this,X=0,Y=0;;)if(X==Q.children.length){if(!J.length)return;if(Q=Q.parent,Q.breakAfter)Y++;X=J.pop()}else{let K=Q.children[X++];if(K instanceof L8)J.push(X),Q=K,X=0;else{let q=Y+K.length,W=Z(K,Y);if(W!==void 0)return W;Y=q+K.breakAfter}}}resolveBlock(Z,J){let Q,X=-1,Y,K=-1;if(this.blockTiles((q,W)=>{let G=W+q.length;if(Z>=W&&Z<=G){if(q.isWidget()&&J>=-1&&J<=1){if(q.flags&32)return!0;if(q.flags&16)Q=void 0}if((W<Z||Z==G&&(J<-1?q.length:q.covers(1)))&&(!Q||!q.isWidget()&&Q.isWidget()))Q=q,X=Z-W;if((G>Z||Z==W&&(J>1?q.length:q.covers(-1)))&&(!Y||!q.isWidget()&&Y.isWidget()))Y=q,K=Z-W}}),!Q&&!Y)throw Error("No tile at position "+Z);return Q&&J<0||!Y?{tile:Q,offset:X}:{tile:Y,offset:K}}}class L8 extends M5{constructor(Z,J){super(Z);this.wrapper=J}isBlock(){return!0}covers(Z){if(!this.children.length)return!1;return Z<0?this.children[0].covers(-1):this.lastChild.covers(1)}get domAttrs(){return this.wrapper.attributes}static of(Z,J){let Q=new L8(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class u9 extends M5{constructor(Z,J){super(Z);this.attrs=J}isLine(){return!0}static start(Z,J,Q){let X=new u9(J||document.createElement("div"),Z);if(!J||!Q)X.flags|=4;return X}get domAttrs(){return this.attrs}resolveInline(Z,J,Q){let X=null,Y=-1,K=null,q=-1;function W(I,U){for(let z=0,V=0;z<I.children.length&&V<=U;z++){let F=I.children[z],H=V+F.length;if(H>=U){if(F.isComposite())W(F,U-V);else if((!K||K.isHidden&&(J>0&&!(K.flags&32)||Q&&nR(K,F)))&&(H>U||F.flags&32&&J<=1))K=F,q=U-V;else if(V<U||F.flags&16&&!F.isHidden&&J>=-1)X=F,Y=U-V}V=H}}W(this,Z);let G=(J<0?X:K)||X||K;return G?{tile:G,offset:G==X?Y:q}:null}coordsIn(Z,J,Q){let X=this.resolveInline(Z,J,!0);if(!X)return mR(this);return X.tile.coordsIn(Math.max(0,X.offset),J,Q)}domIn(Z,J){let Q=this.resolveInline(Z,J);if(Q){let{tile:X,offset:Y}=Q;if(this.dom.contains(X.dom)){if(X.isText())return new E6(X.dom,Math.min(X.dom.nodeValue.length,Y));return X.domPosFor(Y,X.flags&16?1:X.flags&32?-1:J)}let K=Q.tile.parent,q=!1;for(let W of K.children){if(q)return new E6(W.dom,0);if(W==Q.tile)q=!0}}return new E6(this.dom,0)}}function mR(Z){let J=Z.dom.lastChild;if(!J)return Z.dom.getBoundingClientRect();let Q=BJ(J);return Q[Q.length-1]||null}function nR(Z,J){let Q=Z.coordsIn(0,1),X=J.coordsIn(0,1);return Q&&X&&X.top<Q.bottom}class g1 extends M5{constructor(Z,J){super(Z);this.mark=J}get domAttrs(){return this.mark.attrs}static of(Z,J){let Q=new g1(J||document.createElement(Z.tagName),Z);if(!J)Q.flags|=4;return Q}}class n7 extends c0{constructor(Z,J){super(Z,J.length);this.text=J}sync(Z){if(this.flags&2)return;if(super.sync(Z),this.dom.nodeValue!=this.text){if(Z&&Z.node==this.dom)Z.written=!0;this.dom.nodeValue=this.text}}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(Z,J,Q){let X=this.dom.nodeValue.length;if(Z>X)Z=X;let Y=Z,K=Z,q=0;if(Z==0&&J<0||Z==X&&J>=0){if(!(r.chrome||r.gecko)){if(Z)Y--,q=1;else if(K<X)K++,q=-1}}else if(J<0)Y--;else if(K<X)K++;let W=F5(this.dom,Y,K).getClientRects();if(!W.length)return null;let G=W[(q?q<0:J>=0)?0:W.length-1];if(r.safari&&!q&&G.width==0)G=Array.prototype.find.call(W,(I)=>I.width)||G;return Q==null?G:xJ(G,(q?q>0:J<0)==Q)}static of(Z,J){let Q=new n7(J||document.createTextNode(Z),Z);if(!J)Q.flags|=2;return Q}}class l7 extends c0{constructor(Z,J,Q,X){super(Z,J,X);this.widget=Q}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(Z){if(this.flags&48)return!1;return(this.flags&(Z<0?64:128))>0}coordsIn(Z,J){return this.coordsInWidget(Z,J,!1)}coordsInWidget(Z,J,Q){let X=this.widget.coordsAt(this.dom,Z,J);if(X)return X;if(Q)return xJ(this.dom.getBoundingClientRect(),this.length?Z==0:J<=0);else{let Y=this.dom.getClientRects(),K=null;if(!Y.length)return null;let q=this.flags&16?!0:this.flags&32?!1:Z>0;for(let W=q?Y.length-1:0;;W+=q?-1:1)if(K=Y[W],Z>0?W==0:W==Y.length-1||K.top<K.bottom)break;return xJ(K,!q)}}get overrideDOMText(){if(!this.length)return R0.empty;let{root:Z}=this;if(!Z)return R0.empty;let J=this.posAtStart;return Z.view.state.doc.slice(J,J+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(Z,J,Q,X,Y){if(!Y){if(Y=Z.toDOM(J),!Z.editable)Y.contentEditable="false"}return new l7(Y,Q,Z,X)}}class O5 extends c0{constructor(Z){let J=document.createElement("img");J.className="cm-widgetBuffer",J.setAttribute("aria-hidden","true");super(J,0,Z)}get isHidden(){return!0}get overrideDOMText(){return R0.empty}coordsIn(Z,J,Q){let X=this.dom.getBoundingClientRect();return Q==null?X:xJ(X,J>0==Q)}}class TV{constructor(Z){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=Z}advance(Z,J,Q){let{tile:X,index:Y,beforeBreak:K,parents:q}=this;while(Z||J>0)if(!X.isComposite()){let W=X.length;if(Y<W&&Z){let G=Math.min(Z,W-Y);if(Q)Q.skip(X,Y,Y+G);Z-=G,Y+=G}if(Y==W)K=!!X.breakAfter,{tile:X,index:Y}=q.pop(),Y++;else if(!Z)break}else if(K){if(!Z)break;if(Q)Q.break();Z--,K=!1}else if(Y==X.children.length){if(!Z&&!q.length)break;if(Q)Q.leave(X);K=!!X.breakAfter,{tile:X,index:Y}=q.pop(),Y++}else{let W=X.children[Y],G=W.breakAfter;if((J>0?W.length<=Z:W.length<Z)&&(!Q||Q.skip(W,0,W.length)!==!1||!W.isComposite))K=!!G,Y++,Z-=W.length;else if(q.push({tile:X,index:Y}),X=W,Y=0,Q&&W.isComposite())Q.enter(W)}return this.tile=X,this.index=Y,this.beforeBreak=K,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class EV{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.wrapper=Q,this.rank=X}}class CV{constructor(Z,J,Q){this.cache=Z,this.root=J,this.blockWrappers=Q,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(Z,J,Q,X){var Y;this.flushBuffer();let K=this.ensureMarks(J,Q),q=K.lastChild;if(q&&q.isText()&&!(q.flags&8)&&q.length+Z.length<512){this.cache.reused.set(q,2);let W=K.children[K.children.length-1]=new n7(q.dom,q.text+Z);W.parent=K}else K.append(X||n7.of(Z,(Y=this.cache.find(n7))===null||Y===void 0?void 0:Y.dom));this.pos+=Z.length,this.afterWidget=null}addComposition(Z,J){let Q=this.curLine;if(Q.dom!=J.line.dom)Q.setDOM(this.cache.reused.has(J.line)?X3(J.line.dom):J.line.dom),this.cache.reused.set(J.line,2);let X=Q;for(let q=J.marks.length-1;q>=0;q--){let W=J.marks[q],G=X.lastChild;if(G instanceof g1&&G.mark.eq(W.mark)){if(G.dom!=W.dom)G.setDOM(X3(W.dom));X=G}else{if(this.cache.reused.get(W)){let U=c0.get(W.dom);if(U)U.setDOM(X3(W.dom))}let I=g1.of(W.mark,W.dom);X.append(I),X=I}this.cache.reused.set(W,2)}let Y=c0.get(Z.text);if(Y)this.cache.reused.set(Y,2);let K=new n7(Z.text,Z.text.nodeValue);K.flags|=8,this.pos=Z.range.toB,X.append(K)}addInlineWidget(Z,J,Q){let X=this.afterWidget&&Z.flags&48&&(this.afterWidget.flags&48)==(Z.flags&48);if(!X)this.flushBuffer();let Y=this.ensureMarks(J,Q);if(!X&&!(Z.flags&16))Y.append(this.getBuffer(1));Y.append(Z),this.pos+=Z.length,this.afterWidget=Z}addMark(Z,J,Q){this.flushBuffer(),this.ensureMarks(J,Q).append(Z),this.pos+=Z.length,this.afterWidget=null}addBlockWidget(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}continueWidget(Z){let J=this.afterWidget||this.lastBlock;J.length+=Z,this.pos+=Z}addLineStart(Z,J){var Q;if(!Z)Z=xV;let X=u9.start(Z,J||((Q=this.cache.find(u9))===null||Q===void 0?void 0:Q.dom),!!J);this.getBlockPos().append(this.lastBlock=this.curLine=X)}addLine(Z){this.getBlockPos().append(Z),this.pos+=Z.length,this.lastBlock=Z,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(Z){if(!this.blockPosCovered())this.addLineStart(Z)}ensureLine(Z){if(!this.curLine)this.addLineStart(Z)}ensureMarks(Z,J){var Q;let X=this.curLine;for(let Y=Z.length-1;Y>=0;Y--){let K=Z[Y],q;if(J>0&&(q=X.lastChild)&&q instanceof g1&&q.mark.eq(K))X=q,J--;else{let W=g1.of(K,(Q=this.cache.find(g1,(G)=>G.mark.eq(K)))===null||Q===void 0?void 0:Q.dom);X.append(W),X=W,J=0}}return X}endLine(){if(this.curLine){this.flushBuffer();let Z=this.curLine.lastChild;if(!Z||!Lz(this.curLine,!1)||Z.dom.nodeName!="BR"&&Z.isWidget()&&!(r.ios&&Lz(this.curLine,!0)))this.curLine.append(this.cache.findWidget(Y3,0,32)||new l7(Y3.toDOM(),0,Y3,32));this.curLine=this.afterWidget=null}}updateBlockWrappers(){if(this.wrapperPos>this.pos+1e4)this.blockWrappers.goto(this.pos),this.wrappers.length=0;for(let Z=this.wrappers.length-1;Z>=0;Z--)if(this.wrappers[Z].to<this.pos)this.wrappers.splice(Z,1);for(let Z=this.blockWrappers;Z.value&&Z.from<=this.pos;Z.next())if(Z.to>=this.pos){let J=Z.rank*102+Z.value.rank,Q=new EV(Z.from,Z.to,Z.value,J),X=this.wrappers.length;while(X>0&&(this.wrappers[X-1].rank-Q.rank||this.wrappers[X-1].to-Q.to)<0)X--;this.wrappers.splice(X,0,Q)}this.wrapperPos=this.pos}getBlockPos(){var Z;this.updateBlockWrappers();let J=this.root;for(let Q of this.wrappers){let X=J.lastChild;if(Q.from<this.pos&&X instanceof L8&&X.wrapper.eq(Q.wrapper))J=X;else{let Y=L8.of(Q.wrapper,(Z=this.cache.find(L8,(K)=>K.wrapper.eq(Q.wrapper)))===null||Z===void 0?void 0:Z.dom);J.append(Y),J=Y}}return J}blockPosCovered(){let Z=this.lastBlock;return Z!=null&&!Z.breakAfter&&(!Z.isWidget()||(Z.flags&160)>0)}getBuffer(Z){let J=2|(Z<0?16:32),Q=this.cache.find(O5,void 0,1);if(Q)Q.flags=J;return Q||new O5(J)}flushBuffer(){if(this.afterWidget&&!(this.afterWidget.flags&32))this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null}}class _V{constructor(Z){this.skipCount=0,this.text="",this.textOff=0,this.cursor=Z.iter()}skip(Z){if(this.textOff+Z<=this.text.length)this.textOff+=Z;else this.skipCount+=Z-(this.text.length-this.textOff),this.text="",this.textOff=0}next(Z){if(this.textOff==this.text.length){let{value:X,lineBreak:Y,done:K}=this.cursor.next(this.skipCount);if(this.skipCount=0,K)throw Error("Ran out of text content when drawing inline views");this.text=X;let q=this.textOff=Math.min(Z,X.length);return Y?null:X.slice(0,q)}let J=Math.min(this.text.length,this.textOff+Z),Q=this.text.slice(this.textOff,J);return this.textOff=J,Q}}var yJ=[l7,u9,n7,g1,O5,L8,A5];for(let Z=0;Z<yJ.length;Z++)yJ[Z].bucket=Z;class wV{constructor(Z){this.view=Z,this.buckets=yJ.map(()=>[]),this.index=yJ.map(()=>0),this.reused=new Map}add(Z){let J=Z.constructor.bucket,Q=this.buckets[J];if(Q.length<6)Q.push(Z);else Q[this.index[J]=(this.index[J]+1)%6]=Z}find(Z,J,Q=2){let X=Z.bucket,Y=this.buckets[X],K=this.index[X];for(let q=0;q<Y.length;q++){let W=(q+K)%Y.length,G=Y[W];if((!J||J(G))&&!this.reused.has(G)){if(Y.splice(W,1),W<K)this.index[X]--;return this.reused.set(G,Q),G}}return null}findWidget(Z,J,Q){let X=this.buckets[0];if(X.length)for(let Y=0,K=0;;Y++){if(Y==X.length){if(K)return null;K=1,Y=0}let q=X[Y];if(!this.reused.has(q)&&(K==0?q.widget.compare(Z):q.widget.constructor==Z.constructor&&Z.updateDOM(q.dom,this.view,q.widget))){if(X.splice(Y,1),Y<this.index[0])this.index[0]--;if(q.widget==Z&&q.length==J&&(q.flags&497)==Q)return this.reused.set(q,1),q;else return this.reused.set(q,2),new l7(q.dom,J,Z,q.flags&-498|Q)}}}reuse(Z){return this.reused.set(Z,1),Z}maybeReuse(Z,J=2){if(this.reused.has(Z))return;return this.reused.set(Z,J),Z.dom}clear(){for(let Z=0;Z<this.buckets.length;Z++)this.buckets[Z].length=this.index[Z]=0}}class kV{constructor(Z,J,Q,X,Y){this.view=Z,this.decorations=X,this.disallowBlockEffectsFor=Y,this.openWidget=!1,this.openMarks=0,this.cache=new wV(Z),this.text=new _V(Z.state.doc),this.builder=new CV(this.cache,new A5(Z,Z.contentDOM),N0.iter(Q)),this.cache.reused.set(J,2),this.old=new TV(J),this.reuseWalker={skip:(K,q,W)=>{if(this.cache.add(K),K.isComposite())return!1},enter:(K)=>this.cache.add(K),leave:()=>{},break:()=>{}}}run(Z,J){let Q=J&&this.getCompositionContext(J.text);for(let X=0,Y=0,K=0;;){let q=K<Z.length?Z[K++]:null,W=q?q.fromA:this.old.root.length;if(W>X){let G=W-X;this.preserve(G,!K,!q),X=W,Y+=G}if(!q)break;if(J&&q.fromA<=J.range.fromA&&q.toA>=J.range.toA)this.forward(q.fromA,J.range.fromA,J.range.fromA<J.range.toA?1:-1),this.emit(Y,J.range.fromB),this.builder.flushBuffer(),this.cache.clear(),this.builder.addComposition(J,Q),this.text.skip(J.range.toB-J.range.fromB),this.forward(J.range.fromA,q.toA),this.emit(J.range.toB,q.toB);else this.forward(q.fromA,q.toA),this.emit(Y,q.toB);Y=q.toB,X=q.toA}if(this.builder.curLine)this.builder.endLine();return this.builder.root}preserve(Z,J,Q){let X=dR(this.old),Y=this.openMarks;this.old.advance(Z,Q?1:-1,{skip:(K,q,W)=>{if(K.isWidget())if(this.openWidget)this.builder.continueWidget(W-q);else{let G=W>0||q<K.length?l7.of(K.widget,this.view,W-q,K.flags&496,this.cache.maybeReuse(K)):this.cache.reuse(K);if(G.flags&256)G.flags&=-2,this.builder.addBlockWidget(G);else this.builder.ensureLine(null),this.builder.addInlineWidget(G,X,Y),Y=X.length}else if(K.isText()){if(this.builder.ensureLine(null),!q&&W==K.length&&!this.cache.reused.has(K))this.builder.addText(K.text,X,Y,this.cache.reuse(K));else this.cache.add(K),this.builder.addText(K.text.slice(q,W),X,Y);Y=X.length}else if(K.isLine())K.flags&=-2,this.cache.reused.set(K,1),this.builder.addLine(K);else if(K instanceof O5)this.cache.add(K);else if(K instanceof g1)this.builder.ensureLine(null),this.builder.addMark(K,X,Y),this.cache.reused.set(K,1),Y=X.length;else return!1;this.openWidget=!1},enter:(K)=>{if(K.isLine())this.builder.addLineStart(K.attrs,this.cache.maybeReuse(K));else if(this.cache.add(K),K instanceof g1)X.unshift(K.mark);this.openWidget=!1},leave:(K)=>{if(K.isLine()){if(X.length)X.length=Y=0}else if(K instanceof g1)X.shift(),Y=Math.min(Y,X.length)},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(Z)}emit(Z,J){let Q=null,X=this.builder,Y=-1,K=N0.spans(this.decorations,Z,J,{point:(q,W,G,I,U,z)=>{if(G instanceof c7){if(this.disallowBlockEffectsFor[z]){if(G.block)throw RangeError("Block decorations may not be specified via plugins");if(W>this.view.state.doc.lineAt(q).to)throw RangeError("Decorations that replace line breaks may not be specified via plugins")}if(Y=I.length,U>I.length)X.continueWidget(W-q);else{let V=G.widget||(G.block?s7.block:s7.inline),F=pR(G),H=this.cache.findWidget(V,W-q,F)||l7.of(V,this.view,W-q,F);if(G.block){if(G.startSide>0)X.addLineStartIfNotCovered(Q);X.addBlockWidget(H)}else X.ensureLine(Q),X.addInlineWidget(H,I,U)}Q=null}else Q=cR(Q,G);if(W>q)this.text.skip(W-q)},span:(q,W,G,I)=>{for(let U=q;U<W;){let z=this.text.next(Math.min(512,W-U));if(z==null)X.addLineStartIfNotCovered(Q),X.addBreak(),U++;else X.ensureLine(Q),X.addText(z,G,U==q?I:G.length),U+=z.length;Q=null}Y=G.length}});if(Y>-1)this.openWidget=K>Y;if(!this.openWidget)X.addLineStartIfNotCovered(Q);this.openMarks=K}forward(Z,J,Q=1){if(J-Z<=10)this.old.advance(J-Z,Q,this.reuseWalker);else this.old.advance(5,-1,this.reuseWalker),this.old.advance(J-Z-10,-1),this.old.advance(5,Q,this.reuseWalker)}getCompositionContext(Z){let J=[],Q=null;for(let X=Z.parentNode;;X=X.parentNode){let Y=c0.get(X);if(X==this.view.contentDOM)break;if(Y instanceof g1)J.push(Y);else if(Y===null||Y===void 0?void 0:Y.isLine())Q=Y;else if(Y instanceof L8);else if(X.nodeName=="DIV"&&!Q&&X!=this.view.contentDOM)Q=new u9(X,xV);else if(!Q)J.push(g1.of(new H5({tagName:X.nodeName.toLowerCase(),attributes:PR(X)}),X))}return{line:Q,marks:J}}}function Lz(Z,J){let Q=(X)=>{for(let Y of X.children)if((J?Y.isText():Y.length)||Q(Y))return!0;return!1};return Q(Z)}function pR(Z){let J=Z.isReplace?(Z.startSide<0?64:0)|(Z.endSide>0?128:0):Z.startSide>0?32:16;if(Z.block)J|=256;return J}var xV={class:"cm-line"};function cR(Z,J){let Q=J.spec.attributes,X=J.spec.class;if(!Q&&!X)return Z;if(!Z)Z={class:"cm-line"};if(Q)b3(Q,Z);if(X)Z.class+=" "+X;return Z}function dR(Z){let J=[];for(let Q=Z.parents.length;Q>1;Q--){let X=Q==Z.parents.length?Z.tile:Z.parents[Q].tile;if(X instanceof g1)J.push(X.mark)}return J}function X3(Z){let J=c0.get(Z);if(J)J.setDOM(Z.cloneNode());return Z}class s7 extends a8{constructor(Z){super();this.tag=Z}eq(Z){return Z.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(Z){return Z.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}s7.inline=new s7("span");s7.block=new s7("div");var Y3=new class extends a8{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class M3{constructor(Z){this.view=Z,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=L0.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new A5(Z,Z.contentDOM),this.updateInner([new J6(0,0,0,Z.state.doc.length)],null)}update(Z){var J;let Q=Z.changedRanges;if(this.minWidth>0&&Q.length)if(!Q.every(({fromA:I,toA:U})=>U<this.minWidthFrom||I>this.minWidthTo))this.minWidth=this.minWidthFrom=this.minWidthTo=0;else this.minWidthFrom=Z.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=Z.changes.mapPos(this.minWidthTo,1);this.updateEditContextFormatting(Z);let X=-1;if(this.view.inputState.composing>=0&&!this.view.observer.editContext){if((J=this.domChanged)===null||J===void 0?void 0:J.newSel)X=this.domChanged.newSel.head;else if(!eR(Z.changes,this.hasComposition)&&!Z.selectionSet)X=Z.state.selection.main.head}let Y=X>-1?sR(this.view,Z.changes,X):null;if(this.domChanged=null,this.hasComposition){let{from:I,to:U}=this.hasComposition;Q=new J6(I,U,Z.changes.mapPos(I,-1),Z.changes.mapPos(U,1)).addToSet(Q.slice())}if(this.hasComposition=Y?{from:Y.range.fromB,to:Y.range.toB}:null,(r.ie||r.chrome)&&!Y&&Z&&Z.state.doc.lines!=Z.startState.doc.lines)this.forceSelection=!0;let K=this.decorations,q=this.blockWrappers;this.updateDeco();let W=aR(K,this.decorations,Z.changes);if(W.length)Q=J6.extendWithRanges(Q,W);let G=oR(q,this.blockWrappers,Z.changes);if(G.length)Q=J6.extendWithRanges(Q,G);if(Y&&!Q.some((I)=>I.fromA<=Y.range.fromA&&I.toA>=Y.range.toA))Q=Y.range.addToSet(Q.slice());if(this.tile.flags&2&&Q.length==0)return!1;else{if(this.updateInner(Q,Y),Z.transactions.length)this.lastUpdate=Date.now();return!0}}updateInner(Z,J){this.view.viewState.mustMeasureContent=!0;let{observer:Q}=this.view;Q.ignore(()=>{if(J||Z.length){let K=this.tile,q=new kV(this.view,K,this.blockWrappers,this.decorations,this.dynamicDecorationMap);if(J&&c0.get(J.text))q.cache.reused.set(c0.get(J.text),2);this.tile=q.run(Z,J),A3(K,q.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let Y=r.chrome||r.ios?{node:Q.selectionRange.focusNode,written:!1}:void 0;if(this.tile.sync(Y),Y&&(Y.written||Q.selectionRange.focusNode!=Y.node||!this.tile.dom.contains(Y.node)))this.forceSelection=!0;this.tile.dom.style.height=""});let X=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length){for(let Y of this.tile.children)if(Y.isWidget()&&Y.widget instanceof PJ)X.push(Y.dom)}Q.updateGaps(X)}updateEditContextFormatting(Z){this.editContextFormatting=this.editContextFormatting.map(Z.changes);for(let J of Z.transactions)for(let Q of J.effects)if(Q.is(DV))this.editContextFormatting=Q.value}updateSelection(Z=!1,J=!1){if(Z||!this.view.observer.selectionRange.focusNode)this.view.observer.readSelectionRange();let{dom:Q}=this.tile,X=this.view.root.activeElement,Y=X==Q,K=!Y&&!(this.view.state.facet(B8)||Q.tabIndex>-1)&&I5(Q,this.view.observer.selectionRange)&&!(X&&Q.contains(X));if(!(Y||J||K))return;let q=this.forceSelection;this.forceSelection=!1;let W=this.view.state.selection.main,G,I;if(W.empty)I=G=this.inlineDOMNearPos(W.anchor,W.assoc||1);else I=this.inlineDOMNearPos(W.head,W.head==W.from?1:-1),G=this.inlineDOMNearPos(W.anchor,W.anchor==W.from?1:-1);if(r.gecko&&W.empty&&!this.hasComposition&&lR(G)){let z=document.createTextNode("");this.view.observer.ignore(()=>G.node.insertBefore(z,G.node.childNodes[G.offset]||null)),G=I=new E6(z,0),q=!0}let U=this.view.observer.selectionRange;if(q||!U.focusNode||(!U5(G.node,G.offset,U.anchorNode,U.anchorOffset)||!U5(I.node,I.offset,U.focusNode,U.focusOffset))&&!this.suppressWidgetCursorChange(U,W))this.view.observer.ignore(()=>{if(r.android&&r.chrome&&Q.contains(U.focusNode)&&tR(U.focusNode,Q))Q.blur(),Q.focus({preventScroll:!0});let z=j5(this.view.root);if(!z);else if(W.empty){if(r.gecko){let V=iR(G.node,G.offset);if(V&&V!=3){let F=(V==1?KV:qV)(G.node,G.offset);if(F)G=new E6(F.node,F.offset)}}if(z.collapse(G.node,G.offset),W.bidiLevel!=null&&z.caretBidiLevel!==void 0)z.caretBidiLevel=W.bidiLevel}else if(z.extend){z.collapse(G.node,G.offset);try{z.extend(I.node,I.offset)}catch(V){}}else{let V=document.createRange();if(W.anchor>W.head)[G,I]=[I,G];V.setEnd(I.node,I.offset),V.setStart(G.node,G.offset),z.removeAllRanges(),z.addRange(V)}if(K&&this.view.root.activeElement==Q){if(Q.blur(),X)X.focus()}}),this.view.observer.setSelectionRange(G,I);this.impreciseAnchor=G.precise?null:new E6(U.anchorNode,U.anchorOffset),this.impreciseHead=I.precise?null:new E6(U.focusNode,U.focusOffset)}suppressWidgetCursorChange(Z,J){return this.hasComposition&&J.empty&&U5(Z.focusNode,Z.focusOffset,Z.anchorNode,Z.anchorOffset)&&this.posFromDOM(Z.focusNode,Z.focusOffset)==J.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:Z}=this,J=Z.state.selection.main,Q=j5(Z.root),{anchorNode:X,anchorOffset:Y}=Z.observer.selectionRange;if(!Q||!J.empty||!J.assoc||!Q.modify)return;let K=this.lineAt(J.head,J.assoc);if(!K)return;let q=K.posAtStart;if(J.head==q||J.head==q+K.length)return;let W=this.coordsAt(J.head,-1),G=this.coordsAt(J.head,1);if(!W||!G||W.bottom>G.top)return;let I=this.domAtPos(J.head+J.assoc,J.assoc);Q.collapse(I.node,I.offset),Q.modify("move",J.assoc<0?"forward":"backward","lineboundary"),Z.observer.readSelectionRange();let U=Z.observer.selectionRange;if(Z.docView.posFromDOM(U.anchorNode,U.anchorOffset)!=J.from)Q.collapse(X,Y)}posFromDOM(Z,J){let Q=this.tile.nearest(Z);if(!Q)return this.tile.dom.compareDocumentPosition(Z)&2?0:this.view.state.doc.length;let X=Q.posAtStart;if(Q.isComposite()){let Y;if(Z==Q.dom)Y=Q.dom.childNodes[J];else{let K=P8(Z)==0?0:J==0?-1:1;for(;;){let q=Z.parentNode;if(q==Q.dom)break;if(K==0&&q.firstChild!=q.lastChild)if(Z==q.firstChild)K=-1;else K=1;Z=q}if(K<0)Y=Z;else Y=Z.nextSibling}if(Y==Q.dom.firstChild)return X;while(Y&&!c0.get(Y))Y=Y.nextSibling;if(!Y)return X+Q.length;for(let K=0,q=X;;K++){let W=Q.children[K];if(W.dom==Y)return q;q+=W.length+W.breakAfter}}else if(Q.isText())return Z==Q.dom?X+J:X+(J?Q.length:0);else return X}domAtPos(Z,J){let{tile:Q,offset:X}=this.tile.resolveBlock(Z,J);if(Q.isWidget())return Q.domPosFor(X,J);return Q.domIn(X,J)}inlineDOMNearPos(Z,J){let Q,X=-1,Y=!1,K,q=-1,W=!1;if(this.tile.blockTiles((G,I)=>{if(G.isWidget()){if(G.flags&32&&I>=Z)return!0;if(G.flags&16)Y=!0}else{let U=I+G.length;if(I<=Z)Q=G,X=Z-I,Y=U<Z;if(U>=Z&&!K)K=G,q=Z-I,W=I>Z;if(I>Z&&K)return!0}}),!Q&&!K)return this.domAtPos(Z,J);if(Y&&K)Q=null;else if(W&&Q)K=null;return Q&&J<0||!K?Q.domIn(X,J):K.domIn(q,J)}coordsAt(Z,J,Q){let{tile:X,offset:Y}=this.tile.resolveBlock(Z,J);if(X.isWidget()){if(X.widget instanceof PJ)return null;return X.coordsInWidget(Y,J,!0)}return X.coordsIn(Y,J,Q)}lineAt(Z,J){let{tile:Q}=this.tile.resolveBlock(Z,J);return Q.isLine()?Q:null}coordsForChar(Z){let{tile:J,offset:Q}=this.tile.resolveBlock(Z,1);if(!J.isLine())return null;function X(Y,K){if(Y.isComposite())for(let q of Y.children){if(q.length>=K){let W=X(q,K);if(W)return W}if(K-=q.length,K<0)break}else if(Y.isText()&&K<Y.length){let q=q1(Y.text,K);if(q==K)return null;let W=F5(Y.dom,K,q).getClientRects();for(let G=0;G<W.length;G++){let I=W[G];if(G==W.length-1||I.top<I.bottom&&I.left<I.right)return I}}return null}return X(J,Q)}measureVisibleLineHeights(Z){let J=[],{from:Q,to:X}=Z,Y=this.view.contentDOM.clientWidth,K=Y>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,q=-1,W=this.view.textDirection==w0.LTR,G=0,I=(U,z,V)=>{for(let F=0;F<U.children.length;F++){if(z>X)break;let H=U.children[F],N=z+H.length,R=H.dom.getBoundingClientRect(),{height:T}=R;if(V&&!F)G+=R.top-V.top;if(H instanceof L8){if(N>Q)I(H,z,R)}else if(z>=Q){if(G>0)J.push(-G);if(J.push(T+G),G=0,K){let E=H.dom.lastChild,_=E?BJ(E):[];if(_.length){let k=_[_.length-1],D=W?k.right-R.left:R.right-k.left;if(D>q)q=D,this.minWidth=Y,this.minWidthFrom=z,this.minWidthTo=N}}}if(V&&F==U.children.length-1)G+=V.bottom-R.bottom;z=N+H.breakAfter}};return I(this.tile,0,null),J}textDirectionAt(Z){let{tile:J}=this.tile.resolveBlock(Z,1);return getComputedStyle(J.dom).direction=="rtl"?w0.RTL:w0.LTR}measureTextSize(){let Z=this.tile.blockTiles((K)=>{if(K.isLine()&&K.children.length&&K.length<=20){let q=0,W;for(let G of K.children){if(!G.isText()||/[^ -~]/.test(G.text))return;let I=BJ(G.dom);if(I.length!=1)return;q+=I[0].width,W=I[0].height}if(q)return{lineHeight:K.dom.getBoundingClientRect().height,charWidth:q/K.length,textHeight:W}}});if(Z)return Z;let J=document.createElement("div"),Q,X,Y;return J.className="cm-line",J.style.width="99999px",J.style.position="absolute",J.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(J);let K=BJ(J.firstChild)[0];Q=J.getBoundingClientRect().height,X=K&&K.width?K.width/27:7,Y=K&&K.height?K.height:Q,J.remove()}),{lineHeight:Q,charWidth:X,textHeight:Y}}computeBlockGapDeco(){let Z=[],J=this.view.viewState;for(let Q=0,X=0;;X++){let Y=X==J.viewports.length?null:J.viewports[X],K=Y?Y.from-1:this.view.state.doc.length;if(K>Q){let q=(J.lineBlockAt(K).bottom-J.lineBlockAt(Q).top)/this.view.scaleY;Z.push(L0.replace({widget:new PJ(q),block:!0,inclusive:!0,isBlockGap:!0}).range(Q,K))}if(!Y)break;Q=Y.to+1}return L0.set(Z)}updateDeco(){let Z=1,J=this.view.state.facet(vJ).map((Y)=>{return(this.dynamicDecorationMap[Z++]=typeof Y=="function")?Y(this.view):Y}),Q=!1,X=this.view.state.facet(u3).map((Y,K)=>{let q=typeof Y=="function";if(q)Q=!0;return q?Y(this.view):Y});if(X.length)this.dynamicDecorationMap[Z++]=Q,J.push(N0.join(X));this.decorations=[this.editContextFormatting,...J,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];while(Z<this.decorations.length)this.dynamicDecorationMap[Z++]=!1;this.blockWrappers=this.view.state.facet(LV).map((Y)=>typeof Y=="function"?Y(this.view):Y)}scrollIntoView(Z){if(Z.isSnapshot){let G=this.view.viewState.lineBlockAt(Z.range.head);this.view.scrollDOM.scrollTop=G.top-Z.yMargin,this.view.scrollDOM.scrollLeft=Z.xMargin;return}for(let G of this.view.state.facet(AV))try{if(G(this.view,Z.range,Z))return!0}catch(I){l1(this.view.state,I,"scroll handler")}let{range:J}=Z,Q=this.coordsAt(J.head,J.assoc||(J.head>J.anchor?-1:1)),X;if(!Q)return;if(!J.empty&&(X=this.coordsAt(J.anchor,J.anchor>J.head?-1:1)))Q={left:Math.min(Q.left,X.left),top:Math.min(Q.top,X.top),right:Math.max(Q.right,X.right),bottom:Math.max(Q.bottom,X.bottom)};let Y=v3(this.view),K={left:Q.left-Y.left,top:Q.top-Y.top,right:Q.right+Y.right,bottom:Q.bottom+Y.bottom},{offsetWidth:q,offsetHeight:W}=this.view.scrollDOM;if(ER(this.view.scrollDOM,K,J.head<J.anchor?-1:1,Z.x,Z.y,Math.max(Math.min(Z.xMargin,q),-q),Math.max(Math.min(Z.yMargin,W),-W),this.view.textDirection==w0.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(Q.top>window.visualViewport.offsetTop+window.visualViewport.height||Q.bottom<window.visualViewport.offsetTop)){let G=this.view.docView.lineAt(J.head,1);if(G){let I=JV(G.dom);G.dom.scrollIntoView({block:"nearest"}),QV(I,!1)}}}lineHasWidget(Z){let J=(Q)=>Q.isWidget()||Q.children.some(J);return J(this.tile.resolveBlock(Z,1).tile)}destroy(){A3(this.tile)}}function A3(Z,J){let Q=J===null||J===void 0?void 0:J.get(Z);if(Q!=1){if(Q==null)Z.destroy();for(let X of Z.children)A3(X,J)}}function lR(Z){return Z.node.nodeType==1&&Z.node.firstChild&&(Z.offset==0||Z.node.childNodes[Z.offset-1].contentEditable=="false")&&(Z.offset==Z.node.childNodes.length||Z.node.childNodes[Z.offset].contentEditable=="false")}function bV(Z,J){let Q=Z.observer.selectionRange;if(!Q.focusNode)return null;let X=KV(Q.focusNode,Q.focusOffset),Y=qV(Q.focusNode,Q.focusOffset),K=X||Y;if(Y&&X&&Y.node!=X.node){let W=c0.get(Y.node);if(!W||W.isText()&&W.text!=Y.node.nodeValue)K=Y;else if(Z.docView.lastCompositionAfterCursor){let G=c0.get(X.node);if(!(!G||G.isText()&&G.text!=X.node.nodeValue))K=Y}}if(Z.docView.lastCompositionAfterCursor=K!=X,!K)return null;let q=J-K.offset;return{from:q,to:q+K.node.nodeValue.length,node:K.node}}function sR(Z,J,Q){let X=bV(Z,Q);if(!X)return null;let{node:Y,from:K,to:q}=X,W=Y.nodeValue;if(/[\n\r]/.test(W))return null;if(Z.state.doc.sliceString(X.from,X.to)!=W)return null;let G=J.invertedDesc;return{range:new J6(G.mapPos(K),G.mapPos(q),K,q),text:Y}}function iR(Z,J){if(Z.nodeType!=1)return 0;return(J&&Z.childNodes[J-1].contentEditable=="false"?1:0)|(J<Z.childNodes.length&&Z.childNodes[J].contentEditable=="false"?2:0)}var rR=class{constructor(){this.changes=[]}compareRange(J,Q){$9(J,Q,this.changes)}comparePoint(J,Q){$9(J,Q,this.changes)}boundChange(J){$9(J,J,this.changes)}};function aR(Z,J,Q){let X=new rR;return N0.compare(Z,J,Q,X),X.changes}class yV{constructor(){this.changes=[]}compareRange(Z,J){$9(Z,J,this.changes)}comparePoint(){}boundChange(Z){$9(Z,Z,this.changes)}}function oR(Z,J,Q){let X=new yV;return N0.compare(Z,J,Q,X),X.changes}function tR(Z,J){for(let Q=Z;Q&&Q!=J;Q=Q.assignedSlot||Q.parentNode)if(Q.nodeType==1&&Q.contentEditable=="false")return!0;return!1}function eR(Z,J){let Q=!1;if(J)Z.iterChangedRanges((X,Y)=>{if(X<J.to&&Y>J.from)Q=!0});return Q}class PJ extends a8{constructor(Z){super();this.height=Z}toDOM(){let Z=document.createElement("div");return Z.className="cm-gap",this.updateDOM(Z),Z}eq(Z){return Z.height==this.height}updateDOM(Z){return Z.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function ZM(Z,J,Q=1){let X=Z.charCategorizer(J),Y=Z.doc.lineAt(J),K=J-Y.from;if(Y.length==0)return f.cursor(J);if(K==0)Q=1;else if(K==Y.length)Q=-1;let q=K,W=K;if(Q<0)q=q1(Y.text,K,!1);else W=q1(Y.text,K);let G=X(Y.text.slice(q,W));while(q>0){let I=q1(Y.text,q,!1);if(X(Y.text.slice(I,q))!=G)break;q=I}while(W<Y.length){let I=q1(Y.text,W);if(X(Y.text.slice(W,I))!=G)break;W=I}return f.undirectionalRange(q+Y.from,W+Y.from)}function JM(Z,J,Q,X,Y){let K=Math.round((X-J.left)*Z.defaultCharacterWidth);if(Z.lineWrapping&&Q.height>Z.defaultLineHeight*1.5){let W=Z.viewState.heightOracle.textHeight,G=Math.floor((Y-Q.top-(Z.defaultLineHeight-W)*0.5)/W);K+=G*Z.viewState.heightOracle.lineLength}let q=Z.state.sliceDoc(Q.from,Q.to);return Q.from+Gz(q,K,Z.state.tabSize)}function D3(Z,J,Q){let X=Z.lineBlockAt(J);if(Array.isArray(X.type)){let Y;for(let K of X.type){if(K.from>J)break;if(K.to<J)continue;if(K.from<J&&K.to>J)return K;if(!Y||K.type==V1.Text&&(Y.type!=K.type||(Q<0?K.from<J:K.to>J)))Y=K}return Y||X}return X}function QM(Z,J,Q,X){let Y=D3(Z,J.head,J.assoc||-1),K=!X||Y.type!=V1.Text||!(Z.lineWrapping||Y.widgetLineBreaks)?null:Z.coordsAtPos(J.assoc<0&&J.head>Y.from?J.head-1:J.head);if(K){let q=Z.dom.getBoundingClientRect(),W=Z.textDirectionAt(Y.from),G=Z.posAtCoords({x:Q==(W==w0.LTR)?q.right-1:q.left+1,y:(K.top+K.bottom)/2});if(G!=null)return f.cursor(G,Q?-1:1)}return f.cursor(Q?Y.to:Y.from,Q?-1:1)}function Pz(Z,J,Q,X){let Y=Z.state.doc.lineAt(J.head),K=Z.bidiSpans(Y),q=Z.textDirectionAt(Y.from);for(let W=J,G=null;;){let I=gR(Y,K,q,W,Q),U=zV;if(!I){if(Y.number==(Q?Z.state.doc.lines:1))return W;U=`
`,Y=Z.state.doc.line(Y.number+(Q?1:-1)),K=Z.bidiSpans(Y),I=Z.visualLineSide(Y,!Q)}if(!G){if(!X)return I;G=X(U)}else if(!G(U))return W;W=I}}function XM(Z,J,Q){let X=Z.state.charCategorizer(J),Y=X(Q);return(K)=>{let q=X(K);if(Y==D6.Space)Y=q;return Y==q}}function YM(Z,J,Q,X){let Y=J.head,K=Q?1:-1;if(Y==(Q?Z.state.doc.length:0))return f.cursor(Y,J.assoc);let q=J.goalColumn,W,G=Z.contentDOM.getBoundingClientRect(),I=Z.coordsAtPos(Y,J.assoc||((J.empty?Q:J.head==J.from)?1:-1)),U=Z.documentTop;if(I){if(q==null)q=I.left-G.left;W=K<0?I.top:I.bottom}else{let H=Z.viewState.lineBlockAt(Y);if(q==null)q=Math.min(G.right-G.left,Z.defaultCharacterWidth*(Y-H.from));W=(K<0?H.top:H.bottom)+U}let z=G.left+q,V=Z.viewState.heightOracle.textHeight>>1,F=X!==null&&X!==void 0?X:V;for(let H=0;;H+=V){let N=W+(F+H)*K,R=B3(Z,{x:z,y:N},!1,K);if(Q?N>G.bottom:N<G.top)return f.cursor(R.pos,R.assoc);let T=Z.coordsAtPos(R.pos,R.assoc),E=T?(T.top+T.bottom)/2:0;if(!T||(Q?E>W:E<W))return f.cursor(R.pos,R.assoc,void 0,q)}}function z5(Z,J,Q){for(;;){let X=0;for(let Y of Z)Y.between(J-1,J+1,(K,q,W)=>{if(J>K&&J<q){let G=X||Q||(J-K<q-J?-1:1);J=G<0?K:q,X=G}});if(!X)return J}}function hV(Z,J){let Q=null;for(let X=0;X<J.ranges.length;X++){let Y=J.ranges[X],K=null;if(Y.empty){let q=z5(Z,Y.from,0);if(q!=Y.from)K=f.cursor(q,-1)}else{let q=z5(Z,Y.from,-1),W=z5(Z,Y.to,1);if(q!=Y.from||W!=Y.to)if(Y.undirectional)K=f.undirectionalRange(Y.from,Y.to);else K=f.range(Y.from==Y.anchor?q:W,Y.from==Y.head?q:W)}if(K){if(!Q)Q=J.ranges.slice();Q[X]=K}}return Q?f.create(Q,J.mainIndex):J}function K3(Z,J,Q){let X=z5(Z.state.facet(R5).map((Y)=>Y(Z)),Q.from,J.head>Q.from?-1:1);return X==Q.from?Q:f.cursor(X,X<Q.from?1:-1)}class S6{constructor(Z,J){this.pos=Z,this.assoc=J}}function B3(Z,J,Q,X){let Y=Z.contentDOM.getBoundingClientRect(),K=Y.top+Z.viewState.paddingTop,{x:q,y:W}=J,G=W-K,I;for(;;){if(G<0)return new S6(0,1);if(G>Z.viewState.docHeight)return new S6(Z.state.doc.length,-1);if(I=Z.elementAtHeight(G),X==null)break;if(I.type==V1.Text){if(X<0?I.to<Z.viewport.from:I.from>Z.viewport.to)break;let V=Z.docView.coordsAt(X<0?I.from:I.to,X>0?-1:1);if(V&&(X<0?V.top<=G+K:V.bottom>=G+K))break}let z=Z.viewState.heightOracle.textHeight/2;G=X>0?I.bottom+z:I.top-z}if(Z.viewport.from>=I.to||Z.viewport.to<=I.from){if(Q)return null;if(I.type==V1.Text){let z=JM(Z,Y,I,q,W);return new S6(z,z==I.from?1:-1)}}if(I.type!=V1.Text)return G<(I.top+I.bottom)/2?new S6(I.from,1):new S6(I.to,-1);let U=Z.docView.lineAt(I.from,2);if(!U||U.length!=I.length)U=Z.docView.lineAt(I.from,-2);return new $V(Z,q,W,Z.textDirectionAt(I.from)).scanTile(U,I.from)}class $V{constructor(Z,J,Q,X){this.view=Z,this.x=J,this.y=Q,this.baseDir=X,this.line=null,this.spans=null}bidiSpansAt(Z){if(!this.line||this.line.from>Z||this.line.to<Z)this.line=this.view.state.doc.lineAt(Z),this.spans=this.view.bidiSpans(this.line);return this}baseDirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[C6.find(X,Z-Q.from,-1,J)].level==this.baseDir}dirAt(Z,J){let{line:Q,spans:X}=this.bidiSpansAt(Z);return X[C6.find(X,Z-Q.from,-1,J)].dir}bidiIn(Z,J){let{spans:Q,line:X}=this.bidiSpansAt(Z);return Q.length>1||Q.length&&(Q[0].level!=this.baseDir||Q[0].to+X.from<J)}scan(Z,J,Q=!1){let X=0,Y=Z.length-1,K=new Set,q=this.bidiIn(Z[0],Z[Y]),W,G,I=-1,U=1e9,z;Z:while(X<Y){let F=Y-X,H=X+Y>>1;J:if(K.has(H)){for(let T=1;T<F;T++){let E=H+T;if(E>=Y)E-=F;if(!K.has(E)){H=E;break J}}break Z}K.add(H);let N=J(H),R=0;if(N)for(let T=0;T<N.length;T++){let E=N[T];if(E.width==0&&N.length>1)continue;if(E.bottom<this.y){if(!W||W.bottom<E.bottom)W=E;R=1}else if(E.top>this.y){if(!G||G.top>E.top)G=E;R=-1}else{let _=E.left>this.x?this.x-E.left:E.right<this.x?this.x-E.right:0,k=Math.abs(_);if(k<U)I=H,U=k,z=E;if(_)R=_<0==(this.baseDir==w0.LTR)?-1:1}}if(R==-1&&(!q||this.baseDirAt(Z[H],1)))Y=H;else if(R==1&&(!q||this.baseDirAt(Z[H+1],-1)))X=H+1}if(!z){if(!G&&!W)return{i:Z[0],after:!1};let F=W&&(!G||this.y-W.bottom<G.top-this.y)?W:G;return this.y=(F.top+F.bottom)/2,this.scan(Z,J,!0)}if(U&&!Q){let{top:F,bottom:H}=z;if(W&&W.bottom>(F+F+H)/3)return this.y=W.bottom-1,this.scan(Z,J,!0);if(G&&G.top<(F+H+H)/3)return this.y=G.top+1,this.scan(Z,J,!0)}let V=(q?this.dirAt(Z[I],1):this.baseDir)==w0.LTR;return{i:I,after:this.x>(z.left+z.right)/2==V}}scanText(Z,J){let Q=[];for(let Y=0;Y<Z.length;Y=q1(Z.text,Y))Q.push(J+Y);Q.push(J+Z.length);let X=this.scan(Q,(Y)=>{let K=Q[Y]-J,q=Q[Y+1]-J;return F5(Z.dom,K,q).getClientRects()});return X.after?new S6(Q[X.i+1],-1):new S6(Q[X.i],1)}scanTile(Z,J){if(!Z.length)return new S6(J,1);if(Z.children.length==1){let q=Z.children[0];if(q.isText())return this.scanText(q,J);else if(q.isComposite())return this.scanTile(q,J)}let Q=[J];for(let q=0,W=J;q<Z.children.length;q++)Q.push(W+=Z.children[q].length);let X=this.scan(Q,(q)=>{let W=Z.children[q];if(W.flags&48)return null;return(W.dom.nodeType==1?W.dom:F5(W.dom,0,W.length)).getClientRects()}),Y=Z.children[X.i],K=Q[X.i];if(Y.isText())return this.scanText(Y,K);if(Y.isComposite())return this.scanTile(Y,K);return X.after?new S6(Q[X.i+1],-1):new S6(K,1)}}var b9="￿";class gV{constructor(Z,J){this.points=Z,this.view=J,this.text="",this.lineSeparator=J.state.facet(D0.lineSeparator)}append(Z){this.text+=Z}lineBreak(){this.text+=b9}readRange(Z,J){if(!Z)return this;let Q=Z.parentNode;for(let X=Z;;){this.findPointBefore(Q,X);let Y=this.text.length;this.readNode(X);let K=c0.get(X),q=X.nextSibling;if(q==J){if((K===null||K===void 0?void 0:K.breakAfter)&&!q&&Q!=this.view.contentDOM)this.lineBreak();break}let W=c0.get(q);if((K&&W?K.breakAfter:(K?K.breakAfter:kJ(X))||kJ(q)&&(X.nodeName!="BR"||(K===null||K===void 0?void 0:K.isWidget()))&&this.text.length>Y)&&!qM(q,J))this.lineBreak();X=q}return this.findPointBefore(Q,J),this}readTextNode(Z){let J=Z.nodeValue;for(let Q of this.points)if(Q.node==Z)Q.pos=this.text.length+Math.min(Q.offset,J.length);for(let Q=0,X=this.lineSeparator?null:/\r\n?|\n/g;;){let Y=-1,K=1,q;if(this.lineSeparator)Y=J.indexOf(this.lineSeparator,Q),K=this.lineSeparator.length;else if(q=X.exec(J))Y=q.index,K=q[0].length;if(this.append(J.slice(Q,Y<0?J.length:Y)),Y<0)break;if(this.lineBreak(),K>1){for(let W of this.points)if(W.node==Z&&W.pos>this.text.length)W.pos-=K-1}Q=Y+K}}readNode(Z){let J=c0.get(Z),Q=J&&J.overrideDOMText;if(Q!=null){this.findPointInside(Z,Q.length);for(let X=Q.iter();!X.next().done;)if(X.lineBreak)this.lineBreak();else this.append(X.value)}else if(Z.nodeType==3)this.readTextNode(Z);else if(Z.nodeName=="BR"){if(Z.nextSibling)this.lineBreak()}else if(Z.nodeType==1)this.readRange(Z.firstChild,null)}findPointBefore(Z,J){for(let Q of this.points)if(Q.node==Z&&Z.childNodes[Q.offset]==J)Q.pos=this.text.length}findPointInside(Z,J){for(let Q of this.points)if(Z.nodeType==3?Q.node==Z:Z.contains(Q.node))Q.pos=this.text.length+(KM(Z,Q.node,Q.offset)?J:0)}}function KM(Z,J,Q){for(;;){if(!J||Q<P8(J))return!1;if(J==Z)return!0;Q=r8(J)+1,J=J.parentNode}}function qM(Z,J){let Q;for(;;Z=Z.nextSibling){if(Z==J||!Z)break;let X=c0.get(Z);if(!(X===null||X===void 0?void 0:X.isWidget()))return!1;if(X)(Q||(Q=[])).push(X)}if(Q)for(let X of Q){let Y=X.overrideDOMText;if(Y===null||Y===void 0?void 0:Y.length)return!1}return!0}class L3{constructor(Z,J){this.node=Z,this.offset=J,this.pos=-1}}class fV{constructor(Z,J,Q,X){this.typeOver=X,this.bounds=null,this.text="",this.domChanged=J>-1;let{impreciseHead:Y,impreciseAnchor:K}=Z.docView,q=Z.state.selection;if(Z.state.readOnly&&J>-1)this.newSel=null;else if(J>-1&&(this.bounds=uV(Z.docView.tile,J,Q,0))){let W=Y||K?[]:GM(Z),G=new gV(W,Z);G.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=G.text,this.newSel=IM(W,this.bounds.from)}else{let W=Z.observer.selectionRange,G=Y&&Y.node==W.focusNode&&Y.offset==W.focusOffset||!F3(Z.contentDOM,W.focusNode)?q.main.head:Z.docView.posFromDOM(W.focusNode,W.focusOffset),I=K&&K.node==W.anchorNode&&K.offset==W.anchorOffset||!F3(Z.contentDOM,W.anchorNode)?q.main.anchor:Z.docView.posFromDOM(W.anchorNode,W.anchorOffset),U=Z.viewport;if((r.ios||r.chrome)&&G!=I&&Math.min(G,I)<=q.main.from&&Math.max(G,I)>=q.main.to&&(U.from>0||U.to<Z.state.doc.length)){let z=Math.min(G,I),V=Math.max(G,I),F=U.from-z,H=U.to-V;if((F==0||F==1||z==0)&&(H==0||H==-1||V==Z.state.doc.length))G=0,I=Z.state.doc.length}if(Z.inputState.composing>-1&&q.ranges.length>1)this.newSel=q.replaceRange(f.range(I,G));else if(Z.lineWrapping&&I==G&&!(q.main.empty&&q.main.head==G)&&Z.inputState.lastTouchTime>Date.now()-100){let z=Z.coordsAtPos(G,-1),V=0;if(z)V=Z.inputState.lastTouchY<=z.bottom?-1:1;this.newSel=f.create([f.cursor(G,V)])}else this.newSel=f.single(I,G)}}}function uV(Z,J,Q,X){if(Z.isComposite()){let Y=-1,K=-1,q=-1,W=-1;for(let G=0,I=X,U=X;G<Z.children.length;G++){let z=Z.children[G],V=I+z.length;if(I<J&&V>Q)return uV(z,J,Q,I);if(V>=J&&Y==-1)Y=G,K=I;if(I>Q&&z.dom.parentNode==Z.dom){q=G,W=U;break}U=V,I=V+z.breakAfter}return{from:K,to:W<0?X+Z.length:W,startDOM:(Y?Z.children[Y-1].dom.nextSibling:null)||Z.dom.firstChild,endDOM:q<Z.children.length&&q>=0?Z.children[q].dom:null}}else if(Z.isText())return{from:X,to:X+Z.length,startDOM:Z.dom,endDOM:Z.dom.nextSibling};else return null}function vV(Z,J){let Q,{newSel:X}=J,{state:Y}=Z,K=Y.selection.main,q=Z.inputState.lastKeyTime>Date.now()-100?Z.inputState.lastKeyCode:-1;if(J.bounds){let{from:W,to:G}=J.bounds,I=K.from,U=null;if(q===8||r.android&&J.text.length<G-W)I=K.to,U="end";let z=Y.doc.sliceString(W,G,b9),V,F;if(!K.empty&&K.from>=W&&K.to<=G&&(J.typeOver||z!=J.text)&&z.slice(0,K.from-W)==J.text.slice(0,K.from-W)&&z.slice(K.to-W)==J.text.slice(V=J.text.length-(z.length-(K.to-W))))Q={from:K.from,to:K.to,insert:R0.of(J.text.slice(K.from-W,V).split(b9))};else if(F=mV(z,J.text,I-W,U)){if(r.chrome&&q==13&&F.toB==F.from+2&&J.text.slice(F.from,F.toB)==b9+b9)F.toB--;Q={from:W+F.from,to:W+F.toA,insert:R0.of(J.text.slice(F.from,F.toB).split(b9))}}}else if(X&&(!Z.hasFocus&&Y.facet(B8)||hJ(X,K)))X=null;if(!Q&&!X)return!1;if((r.mac||r.android)&&Q&&Q.from==Q.to&&Q.from==K.head-1&&/^\. ?$/.test(Q.insert.toString())&&Z.contentDOM.getAttribute("autocorrect")=="off"){if(X&&Q.insert.length==2)X=f.single(X.main.anchor-1,X.main.head-1);Q={from:Q.from,to:Q.to,insert:R0.of([Q.insert.toString().replace("."," ")])}}else if(Y.doc.lineAt(K.from).to<K.to&&Z.docView.lineHasWidget(K.to)&&Z.inputState.insertingTextAt>Date.now()-50)Q={from:K.from,to:K.to,insert:Y.toText(Z.inputState.insertingText)};else if(r.chrome&&Q&&Q.from==Q.to&&Q.from==K.head&&Q.insert.toString()==`
 `&&Z.lineWrapping){if(X)X=f.single(X.main.anchor-1,X.main.head-1);Q={from:K.from,to:K.to,insert:R0.of([" "])}}if(Q)return m3(Z,Q,X,q);else if(X&&!hJ(X,K)){let W=!1,G="select";if(Z.inputState.lastSelectionTime>Date.now()-50){if(Z.inputState.lastSelectionOrigin=="select")W=!0;if(G=Z.inputState.lastSelectionOrigin,G=="select.pointer")X=hV(Y.facet(R5).map((I)=>I(Z)),X)}return Z.dispatch({selection:X,scrollIntoView:W,userEvent:G}),!0}else return!1}function m3(Z,J,Q,X=-1){if(r.ios&&Z.inputState.flushIOSKey(J))return!0;let Y=Z.state.selection.main;if(r.android&&(J.to==Y.to&&(J.from==Y.from||J.from==Y.from-1&&Z.state.sliceDoc(J.from,Y.from)==" ")&&J.insert.length==1&&J.insert.lines==2&&g9(Z.contentDOM,"Enter",13)||(J.from==Y.from-1&&J.to==Y.to&&J.insert.length==0||X==8&&J.insert.length<J.to-J.from&&J.to>Y.head)&&g9(Z.contentDOM,"Backspace",8)||J.from==Y.from&&J.to==Y.to+1&&J.insert.length==0&&g9(Z.contentDOM,"Delete",46)))return!0;let K=J.insert.toString();if(Z.inputState.composing>=0)Z.inputState.composing++;let q,W=()=>q||(q=WM(Z,J,Q));if(!Z.state.facet(HV).some((G)=>G(Z,J.from,J.to,K,W)))Z.dispatch(W());return!0}function WM(Z,J,Q){let X,Y=Z.state,K=Y.selection.main,q=-1;if(J.from==J.to&&J.from<K.from||J.from>K.to){let G=J.from<K.from?-1:1,I=G<0?K.from:K.to,U=z5(Y.facet(R5).map((z)=>z(Z)),I,G);if(J.from==U)q=U}if(q>-1)X={changes:J,selection:f.cursor(J.from+J.insert.length,-1)};else if(J.from>=K.from&&J.to<=K.to&&J.to-J.from>=(K.to-K.from)/3&&(!Q||Q.main.empty&&Q.main.from==J.from+J.insert.length)&&Z.inputState.composing<0){let G=K.from<J.from?Y.sliceDoc(K.from,J.from):"",I=K.to>J.to?Y.sliceDoc(J.to,K.to):"";X=Y.replaceSelection(Z.state.toText(G+J.insert.sliceString(0,void 0,Z.state.lineBreak)+I))}else{let G=Y.changes(J),I=Q&&Q.main.to<=G.newLength?Q.main:void 0;if(Y.selection.ranges.length>1&&(Z.inputState.composing>=0||Z.inputState.compositionPendingChange)&&J.to<=K.to+10&&J.to>=K.to-10){let U=Z.state.sliceDoc(J.from,J.to),z,V=Q&&bV(Z,Q.main.head);if(V){let H=J.insert.length-(J.to-J.from);z={from:V.from,to:V.to-H}}else z=Z.state.doc.lineAt(K.head);let F=K.to-J.to;X=Y.changeByRange((H)=>{if(H.from==K.from&&H.to==K.to)return{changes:G,range:I||H.map(G)};let N=H.to-F,R=N-U.length;if(Z.state.sliceDoc(R,N)!=U||N>=z.from&&R<=z.to)return{range:H};let T=Y.changes({from:R,to:N,insert:J.insert}),E=H.to-K.to;return{changes:T,range:!I?H.map(T):f.range(Math.max(0,I.anchor+E),Math.max(0,I.head+E))}})}else X={changes:G,selection:I&&Y.selection.replaceRange(I)}}let W="input.type";if(Z.composing||Z.inputState.compositionPendingChange&&Z.inputState.compositionEndedAt>Date.now()-50){if(Z.inputState.compositionPendingChange=!1,W+=".compose",Z.inputState.compositionFirstChange)W+=".start",Z.inputState.compositionFirstChange=!1}return Y.update(X,{userEvent:W,scrollIntoView:!0})}function mV(Z,J,Q,X){let Y=Math.min(Z.length,J.length),K=0;while(K<Y&&Z.charCodeAt(K)==J.charCodeAt(K))K++;if(K==Y&&Z.length==J.length)return null;let q=Z.length,W=J.length;while(q>0&&W>0&&Z.charCodeAt(q-1)==J.charCodeAt(W-1))q--,W--;if(X=="end"){let G=Math.max(0,K-Math.min(q,W));Q-=q+G-K}if(q<K&&Z.length<J.length){let G=Q<=K&&Q>=q?K-Q:0;K-=G,W=K+(W-q),q=K}else if(W<K){let G=Q<=K&&Q>=W?K-Q:0;K-=G,q=K+(q-W),W=K}return{from:K,toA:q,toB:W}}function GM(Z){let J=[];if(Z.root.activeElement!=Z.contentDOM)return J;let{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}=Z.observer.selectionRange;if(Q){if(J.push(new L3(Q,X)),Y!=Q||K!=X)J.push(new L3(Y,K))}return J}function IM(Z,J){if(Z.length==0)return null;let Q=Z[0].pos,X=Z.length==2?Z[1].pos:Q;return Q>-1&&X>-1?f.single(Q+J,X+J):null}function hJ(Z,J){return J.head==Z.main.head&&J.anchor==Z.main.anchor}class nV{setSelectionOrigin(Z){this.lastSelectionOrigin=Z,this.lastSelectionTime=Date.now()}constructor(Z){if(this.view=Z,this.lastKeyCode=0,this.lastKeyTime=0,this.touchActive=!1,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.lastIOSMomentumScroll=0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=Z.hasFocus,r.safari)Z.contentDOM.addEventListener("input",()=>null);if(r.gecko)PM(Z.contentDOM.ownerDocument)}handleEvent(Z){if(!NM(this.view,Z)||this.ignoreDuringComposition(Z))return;if(Z.type=="keydown"&&this.keydown(Z))return;if(this.view.updateState!=0)Promise.resolve().then(()=>this.runHandlers(Z.type,Z));else this.runHandlers(Z.type,Z)}runHandlers(Z,J){let Q=this.handlers[Z];if(Q){for(let X of Q.observers)X(this.view,J);for(let X of Q.handlers){if(J.defaultPrevented)break;if(X(this.view,J)){J.preventDefault();break}}}}ensureHandlers(Z){let J=zM(Z),Q=this.handlers,X=this.view.contentDOM;for(let Y in J)if(Y!="scroll"){let K=!J[Y].handlers.length,q=Q[Y];if(q&&K!=!q.handlers.length)X.removeEventListener(Y,this.handleEvent),q=null;if(!q)X.addEventListener(Y,this.handleEvent,{passive:K})}for(let Y in Q)if(Y!="scroll"&&!J[Y])X.removeEventListener(Y,this.handleEvent);this.handlers=J}keydown(Z){if(this.lastKeyCode=Z.keyCode,this.lastKeyTime=Date.now(),Z.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&Z.keyCode!=27&&cV.indexOf(Z.keyCode)<0)this.tabFocusMode=-1;if(r.android&&r.chrome&&!Z.synthetic&&(Z.keyCode==13||Z.keyCode==8))return this.view.observer.delayAndroidKey(Z.key,Z.keyCode),!0;if(r.ios&&!Z.synthetic&&!Z.altKey&&!Z.metaKey&&(pV.some((J)=>J.keyCode==Z.keyCode)&&!Z.ctrlKey||VM.indexOf(Z.key)>-1&&Z.ctrlKey)){let J={ctrlKey:Z.ctrlKey,altKey:Z.altKey,metaKey:Z.metaKey,shiftKey:Z.shiftKey};if(J.shiftKey&&r.ios&&!/^(off|none)$/.test(this.view.contentDOM.autocapitalize)&&UM(this.view.win))J.shiftKey=!1;return this.pendingIOSKey={key:Z.key,keyCode:Z.keyCode,mods:J},setTimeout(()=>this.flushIOSKey(),250),!0}if(Z.keyCode!=229)this.view.observer.forceFlush();return!1}flushIOSKey(Z){let J=this.pendingIOSKey;if(!J)return!1;if(J.key=="Enter"&&Z&&Z.from<Z.to&&/^\S+$/.test(Z.insert.toString()))return!1;return this.pendingIOSKey=void 0,g9(this.view.contentDOM,J.key,J.keyCode,J.mods)}ignoreDuringComposition(Z){if(!/^key/.test(Z.type)||Z.synthetic)return!1;if(this.composing>0)return!0;if(r.safari&&!r.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100)return this.compositionPendingKey=!1,!0;return!1}startMouseSelection(Z){if(this.mouseSelection)this.mouseSelection.destroy();this.mouseSelection=Z}update(Z){if(this.view.observer.update(Z),this.mouseSelection)this.mouseSelection.update(Z);if(this.draggedContent&&Z.docChanged)this.draggedContent=this.draggedContent.map(Z.changes);if(Z.transactions.length)this.lastKeyCode=this.lastSelectionTime=0}destroy(){if(this.mouseSelection)this.mouseSelection.destroy()}}function UM(Z){if(!Z.visualViewport)return!1;return Z.visualViewport.height*Z.visualViewport.scale/Z.document.documentElement.clientHeight<0.85}function Sz(Z,J){return(Q,X)=>{try{return J.call(Z,X,Q)}catch(Y){l1(Q.state,Y)}}}function zM(Z){let J=Object.create(null);function Q(X){return J[X]||(J[X]={observers:[],handlers:[]})}for(let X of Z){let Y=X.spec,K=Y&&Y.plugin.domEventHandlers,q=Y&&Y.plugin.domEventObservers;if(K)for(let W in K){let G=K[W];if(G)Q(W).handlers.push(Sz(X.value,G))}if(q)for(let W in q){let G=q[W];if(G)Q(W).observers.push(Sz(X.value,G))}}for(let X in _6)Q(X).handlers.push(_6[X]);for(let X in _1)Q(X).observers.push(_1[X]);return J}var pV=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],VM="dthko",cV=[16,17,18,20,91,92,224,225],FJ=6;function OJ(Z){return Math.max(0,Z)*0.7+8}function jM(Z,J){return Math.max(Math.abs(Z.clientX-J.clientX),Math.abs(Z.clientY-J.clientY))}class dV{constructor(Z,J,Q,X){this.view=Z,this.startEvent=J,this.style=Q,this.mustSelect=X,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=J,this.scrollParents=ez(Z.contentDOM),this.atoms=Z.state.facet(R5).map((K)=>K(Z));let Y=Z.contentDOM.ownerDocument;Y.addEventListener("mousemove",this.move=this.move.bind(this)),Y.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=J.shiftKey,this.multiple=Z.state.facet(D0.allowMultipleSelections)&&FM(Z,J),this.dragging=HM(Z,J)&&iV(J)==1?null:!1}start(Z){if(this.dragging===!1)this.select(Z)}move(Z){if(Z.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&jM(this.startEvent,Z)<10)return;this.select(this.lastEvent=Z);let J=0,Q=0,X=0,Y=0,K=this.view.win.innerWidth,q=this.view.win.innerHeight;if(this.scrollParents.x)({left:X,right:K}=this.scrollParents.x.getBoundingClientRect());if(this.scrollParents.y)({top:Y,bottom:q}=this.scrollParents.y.getBoundingClientRect());let W=v3(this.view);if(Z.clientX-W.left<=X+FJ)J=-OJ(X-Z.clientX);else if(Z.clientX+W.right>=K-FJ)J=OJ(Z.clientX-K);if(Z.clientY-W.top<=Y+FJ)Q=-OJ(Y-Z.clientY);else if(Z.clientY+W.bottom>=q-FJ)Q=OJ(Z.clientY-q);this.setScrollSpeed(J,Q)}up(Z){if(this.dragging==null)this.select(this.lastEvent);if(!this.dragging)Z.preventDefault();this.destroy()}destroy(){this.setScrollSpeed(0,0);let Z=this.view.contentDOM.ownerDocument;Z.removeEventListener("mousemove",this.move),Z.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(Z,J){if(this.scrollSpeed={x:Z,y:J},Z||J){if(this.scrolling<0)this.scrolling=setInterval(()=>this.scroll(),50)}else if(this.scrolling>-1)clearInterval(this.scrolling),this.scrolling=-1}scroll(){let{x:Z,y:J}=this.scrollSpeed;if(Z&&this.scrollParents.x)this.scrollParents.x.scrollLeft+=Z,Z=0;if(J&&this.scrollParents.y)this.scrollParents.y.scrollTop+=J,J=0;if(Z||J)this.view.win.scrollBy(Z,J);if(this.dragging===!1)this.select(this.lastEvent)}select(Z){let{view:J}=this,Q=hV(this.atoms,this.style.get(Z,this.extend,this.multiple));if(this.mustSelect||!Q.eq(J.state.selection,this.dragging===!1))this.view.dispatch({selection:Q,userEvent:"select.pointer"});this.mustSelect=!1}update(Z){if(Z.transactions.some((J)=>J.isUserEvent("input.type")))this.destroy();else if(this.style.update(Z))setTimeout(()=>this.select(this.lastEvent),20)}}function FM(Z,J){let Q=Z.state.facet(VV);return Q.length?Q[0](J):r.mac?J.metaKey:J.ctrlKey}function OM(Z,J){let Q=Z.state.facet(jV);return Q.length?Q[0](J):r.mac?!J.altKey:!J.ctrlKey}function HM(Z,J){let{main:Q}=Z.state.selection;if(Q.empty)return!1;let X=j5(Z.root);if(!X||X.rangeCount==0)return!0;let Y=X.getRangeAt(0).getClientRects();for(let K=0;K<Y.length;K++){let q=Y[K];if(q.left<=J.clientX&&q.right>=J.clientX&&q.top<=J.clientY&&q.bottom>=J.clientY)return!0}return!1}function NM(Z,J){if(!J.bubbles)return!0;if(J.defaultPrevented)return!1;for(let Q=J.target,X;Q!=Z.contentDOM;Q=Q.parentNode)if(!Q||Q.nodeType==11||(X=c0.get(Q))&&X.isWidget()&&!X.isHidden&&X.widget.ignoreEvent(J))return!1;return!0}var _6=Object.create(null),_1=Object.create(null),lV=r.ie&&r.ie_version<15||r.ios&&r.webkit_version<604;function RM(Z){let J=Z.dom.parentNode;if(!J)return;let Q=J.appendChild(document.createElement("textarea"));Q.style.cssText="position: fixed; left: -10000px; top: 10px",Q.focus(),setTimeout(()=>{Z.focus(),Q.remove(),sV(Z,Q.value)},50)}function mJ(Z,J,Q){for(let X of Z.facet(J))Q=X(Q,Z);return Q}function sV(Z,J){J=mJ(Z.state,$3,J);let{state:Q}=Z,X,Y=1,K=Q.toText(J),q=K.lines==Q.selection.ranges.length;if(P3!=null&&Q.selection.ranges.every((G)=>G.empty)&&P3==K.toString()){let G=-1;X=Q.changeByRange((I)=>{let U=Q.doc.lineAt(I.from);if(U.from==G)return{range:I};G=U.from;let z=Q.toText((q?K.line(Y++).text:J)+Q.lineBreak);return{changes:{from:U.from,insert:z},range:f.cursor(I.from+z.length)}})}else if(q)X=Q.changeByRange((G)=>{let I=K.line(Y++);return{changes:{from:G.from,to:G.to,insert:I.text},range:f.cursor(G.from+I.length)}});else X=Q.replaceSelection(K);Z.dispatch(X,{userEvent:"input.paste",scrollIntoView:!0})}_1.scroll=(Z)=>{let J=Z.inputState;if(J.lastScrollTop=Z.scrollDOM.scrollTop,J.lastScrollLeft=Z.scrollDOM.scrollLeft,r.ios&&!J.touchActive)J.lastIOSMomentumScroll=Date.now()};_1.wheel=_1.mousewheel=(Z)=>{Z.inputState.lastWheelEvent=Date.now()};_6.keydown=(Z,J)=>{if(Z.inputState.setSelectionOrigin("select"),J.keyCode==27&&Z.inputState.tabFocusMode!=0)Z.inputState.tabFocusMode=Date.now()+2000;return!1};_1.touchstart=(Z,J)=>{let Q=Z.inputState,X=J.targetTouches[0];if(Q.touchActive=!0,Q.lastTouchTime=Date.now(),X)Q.lastTouchX=X.clientX,Q.lastTouchY=X.clientY;Q.setSelectionOrigin("select.pointer")};_1.touchmove=(Z)=>{Z.inputState.setSelectionOrigin("select.pointer")};_1.touchend=(Z,J)=>{Z.inputState.touchActive=!1};_6.mousedown=(Z,J)=>{if(Z.observer.flush(),Z.inputState.lastTouchTime>Date.now()-2000)return!1;let Q=null;for(let X of Z.state.facet(FV))if(Q=X(Z,J),Q)break;if(!Q&&J.button==0)Q=AM(Z,J);if(Q){let X=!Z.hasFocus;if(Z.inputState.startMouseSelection(new dV(Z,J,Q,X)),X)Z.observer.ignore(()=>{XV(Z.contentDOM);let K=Z.root.activeElement;if(K&&!K.contains(Z.contentDOM))K.blur()});let Y=Z.inputState.mouseSelection;if(Y)return Y.start(J),Y.dragging===!1}else Z.inputState.setSelectionOrigin("select.pointer");return!1};function Tz(Z,J,Q,X){if(X==1)return f.cursor(J,Q);else if(X==2)return ZM(Z.state,J,Q);else{let Y=Z.docView.lineAt(J,Q),K=Z.state.doc.lineAt(Y?Y.posAtEnd:J),q=Y?Y.posAtStart:K.from,W=Y?Y.posAtEnd:K.to;if(W<Z.state.doc.length&&W==K.to)W++;return f.undirectionalRange(q,W)}}var MM=r.ie&&r.ie_version<=11,Ez=null,Cz=0,_z=0;function iV(Z){if(!MM)return Z.detail;let J=Ez,Q=_z;return Ez=Z,_z=Date.now(),Cz=!J||Q>Date.now()-400&&Math.abs(J.clientX-Z.clientX)<2&&Math.abs(J.clientY-Z.clientY)<2?(Cz+1)%3:1}function AM(Z,J){let Q=Z.posAndSideAtCoords({x:J.clientX,y:J.clientY},!1),X=iV(J),Y=Z.state.selection;return{update(K){if(K.docChanged)Q.pos=K.changes.mapPos(Q.pos),Y=Y.map(K.changes)},get(K,q,W){let G=Z.posAndSideAtCoords({x:K.clientX,y:K.clientY},!1),I,U=Tz(Z,G.pos,G.assoc,X);if(Q.pos!=G.pos&&!q){let z=Tz(Z,Q.pos,Q.assoc,X),V=Math.min(z.from,U.from),F=Math.max(z.to,U.to);U=V<U.from?f.range(V,F,U.assoc):f.range(F,V,U.assoc)}if(q)return Y.replaceRange(Y.main.extend(U.from,U.to,U.assoc));else if(W&&X==1&&Y.ranges.length>1&&(I=DM(Y,G.pos)))return I;else if(W)return Y.addRange(U);else return f.create([U])}}}function DM(Z,J){for(let Q=0;Q<Z.ranges.length;Q++){let{from:X,to:Y}=Z.ranges[Q];if(X<=J&&Y>=J)return f.create(Z.ranges.slice(0,Q).concat(Z.ranges.slice(Q+1)),Z.mainIndex==Q?0:Z.mainIndex-(Z.mainIndex>Q?1:0))}return null}_6.dragstart=(Z,J)=>{let{selection:{main:Q}}=Z.state;if(J.target.draggable){let Y=Z.docView.tile.nearest(J.target);if(Y&&Y.isWidget()){let K=Y.posAtStart,q=K+Y.length;if(K>=Q.to||q<=Q.from)Q=f.undirectionalRange(K,q)}}let{inputState:X}=Z;if(X.mouseSelection)X.mouseSelection.dragging=!0;if(X.draggedContent=Q,J.dataTransfer)J.dataTransfer.setData("Text",mJ(Z.state,g3,Z.state.sliceDoc(Q.from,Q.to))),J.dataTransfer.effectAllowed="copyMove";return!1};_6.dragend=(Z)=>{return Z.inputState.draggedContent=null,!1};function wz(Z,J,Q,X){if(Q=mJ(Z.state,$3,Q),!Q)return;let Y=Z.posAtCoords({x:J.clientX,y:J.clientY},!1),{draggedContent:K}=Z.inputState,q=X&&K&&OM(Z,J)?{from:K.from,to:K.to}:null,W={from:Y,insert:Q},G=Z.state.changes(q?[q,W]:W);Z.focus(),Z.dispatch({changes:G,selection:{anchor:G.mapPos(Y,-1),head:G.mapPos(Y,1)},userEvent:q?"move.drop":"input.drop"}),Z.inputState.draggedContent=null}_6.drop=(Z,J)=>{if(!J.dataTransfer)return!1;if(Z.state.readOnly)return!0;let Q=J.dataTransfer.files;if(Q&&Q.length){let X=Array(Q.length),Y=0,K=()=>{if(++Y==Q.length)wz(Z,J,X.filter((q)=>q!=null).join(Z.state.lineBreak),!1)};for(let q=0;q<Q.length;q++){let W=new FileReader;W.onerror=K,W.onload=()=>{if(!/[\x00-\x08\x0e-\x1f]{2}/.test(W.result))X[q]=W.result;K()},W.readAsText(Q[q])}return!0}else{let X=J.dataTransfer.getData("Text");if(X)return wz(Z,J,X,!0),!0}return!1};_6.paste=(Z,J)=>{if(Z.state.readOnly)return!0;Z.observer.flush();let Q=lV?null:J.clipboardData;if(Q)return sV(Z,Q.getData("text/plain")||Q.getData("text/uri-list")),!0;else return RM(Z),!1};function BM(Z,J){let Q=Z.dom.parentNode;if(!Q)return;let X=Q.appendChild(document.createElement("textarea"));X.style.cssText="position: fixed; left: -10000px; top: 10px",X.value=J,X.focus(),X.selectionEnd=J.length,X.selectionStart=0,setTimeout(()=>{X.remove(),Z.focus()},50)}function LM(Z){let J=[],Q=[],X=!1;for(let Y of Z.selection.ranges)if(!Y.empty)J.push(Z.sliceDoc(Y.from,Y.to)),Q.push(Y);if(!J.length){let Y=-1;for(let{from:K}of Z.selection.ranges){let q=Z.doc.lineAt(K);if(q.number>Y)J.push(q.text),Q.push({from:q.from,to:Math.min(Z.doc.length,q.to+1)});Y=q.number}X=!0}return{text:mJ(Z,g3,J.join(Z.lineBreak)),ranges:Q,linewise:X}}var P3=null;_6.copy=_6.cut=(Z,J)=>{if(!I5(Z.contentDOM,Z.observer.selectionRange))return!1;let{text:Q,ranges:X,linewise:Y}=LM(Z.state);if(!Q&&!Y)return!1;if(P3=Y?Q:null,J.type=="cut"&&!Z.state.readOnly)Z.dispatch({changes:X,scrollIntoView:!0,userEvent:"delete.cut"});let K=lV?null:J.clipboardData;if(K)return K.clearData(),K.setData("text/plain",Q),!0;else return BM(Z,Q),!1};var rV=L6.define();function aV(Z,J){let Q=[];for(let X of Z.facet(NV)){let Y=X(Z,J);if(Y)Q.push(Y)}return Q.length?Z.update({effects:Q,annotations:rV.of(!0)}):null}function oV(Z){setTimeout(()=>{let J=Z.hasFocus;if(J!=Z.inputState.notifiedFocused){let Q=aV(Z.state,J);if(Q)Z.dispatch(Q);else Z.update([])}},10)}_1.focus=(Z)=>{if(Z.inputState.lastFocusTime=Date.now(),!Z.scrollDOM.scrollTop&&(Z.inputState.lastScrollTop||Z.inputState.lastScrollLeft))Z.scrollDOM.scrollTop=Z.inputState.lastScrollTop,Z.scrollDOM.scrollLeft=Z.inputState.lastScrollLeft;oV(Z)};_1.blur=(Z)=>{Z.observer.clearSelectionRange(),oV(Z)};_1.compositionstart=_1.compositionupdate=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.compositionFirstChange==null)Z.inputState.compositionFirstChange=!0;if(Z.inputState.composing<0)Z.inputState.composing=0};_1.compositionend=(Z)=>{if(Z.observer.editContext)return;if(Z.inputState.composing=-1,Z.inputState.compositionEndedAt=Date.now(),Z.inputState.compositionPendingKey=!0,Z.inputState.compositionPendingChange=Z.observer.pendingRecords().length>0,Z.inputState.compositionFirstChange=null,r.chrome&&r.android)Z.observer.flushSoon();else if(Z.inputState.compositionPendingChange)Promise.resolve().then(()=>Z.observer.flush());else setTimeout(()=>{if(Z.inputState.composing<0&&Z.docView.hasComposition)Z.update([])},50)};_1.contextmenu=(Z)=>{Z.inputState.lastContextMenu=Date.now()};_6.beforeinput=(Z,J)=>{var Q,X;if(J.inputType=="insertText"||J.inputType=="insertCompositionText")Z.inputState.insertingText=J.data,Z.inputState.insertingTextAt=Date.now();if(J.inputType=="insertReplacementText"&&Z.observer.editContext){let K=(Q=J.dataTransfer)===null||Q===void 0?void 0:Q.getData("text/plain"),q=J.getTargetRanges();if(K&&q.length){let W=q[0],G=Z.posAtDOM(W.startContainer,W.startOffset),I=Z.posAtDOM(W.endContainer,W.endOffset);return m3(Z,{from:G,to:I,insert:Z.state.toText(K)},null),!0}}let Y;if(r.chrome&&r.android&&(Y=pV.find((K)=>K.inputType==J.inputType))){if(Z.observer.delayAndroidKey(Y.key,Y.keyCode),Y.key=="Backspace"||Y.key=="Delete"){let K=((X=window.visualViewport)===null||X===void 0?void 0:X.height)||0;setTimeout(()=>{var q;if((((q=window.visualViewport)===null||q===void 0?void 0:q.height)||0)>K+10&&Z.hasFocus)Z.contentDOM.blur(),Z.focus()},100)}}if(r.ios&&J.inputType=="deleteContentForward")Z.observer.flushSoon();if(r.safari&&J.inputType=="insertText"&&Z.inputState.composing>=0)setTimeout(()=>_1.compositionend(Z,J),20);return!1};var kz=new Set;function PM(Z){if(!kz.has(Z))kz.add(Z),Z.addEventListener("copy",()=>{}),Z.addEventListener("cut",()=>{})}var xz=["pre-wrap","normal","pre-line","break-spaces"],v9=!1;function bz(){v9=!1}class tV{constructor(Z){this.lineWrapping=Z,this.doc=R0.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(Z,J){let Q=this.doc.lineAt(J).number-this.doc.lineAt(Z).number+1;if(this.lineWrapping)Q+=Math.max(0,Math.ceil((J-Z-Q*this.lineLength*0.5)/this.lineLength));return this.lineHeight*Q}heightForLine(Z){if(!this.lineWrapping)return this.lineHeight;return(1+Math.max(0,Math.ceil((Z-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight}setDoc(Z){return this.doc=Z,this}mustRefreshForWrapping(Z){return xz.indexOf(Z)>-1!=this.lineWrapping}mustRefreshForHeights(Z){let J=!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q];if(X<0)Q++;else if(!this.heightSamples[Math.floor(X*10)])J=!0,this.heightSamples[Math.floor(X*10)]=!0}return J}refresh(Z,J,Q,X,Y,K){let q=xz.indexOf(Z)>-1,W=Math.abs(J-this.lineHeight)>0.3||this.lineWrapping!=q;if(this.lineWrapping=q,this.lineHeight=J,this.charWidth=Q,this.textHeight=X,this.lineLength=Y,W){this.heightSamples={};for(let G=0;G<K.length;G++){let I=K[G];if(I<0)G++;else this.heightSamples[Math.floor(I*10)]=!0}}return W}}class eV{constructor(Z,J){this.from=Z,this.heights=J,this.index=0}get more(){return this.index<this.heights.length}}class T6{constructor(Z,J,Q,X,Y){this.from=Z,this.length=J,this.top=Q,this.height=X,this._content=Y}get type(){return typeof this._content=="number"?V1.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof c7?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(Z){let J=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(Z._content)?Z._content:[Z]);return new T6(this.from,this.length+Z.length,this.top,this.height+Z.height,J)}}var $0=function(Z){return Z[Z.ByPos=0]="ByPos",Z[Z.ByHeight=1]="ByHeight",Z[Z.ByPosNoHeight=2]="ByPosNoHeight",Z}($0||($0={})),SJ=0.001;class C1{constructor(Z,J,Q=2){this.length=Z,this.height=J,this.flags=Q}get outdated(){return(this.flags&2)>0}set outdated(Z){this.flags=(Z?2:0)|this.flags&-3}setHeight(Z){if(this.height!=Z){if(Math.abs(this.height-Z)>SJ)v9=!0;this.height=Z}}replace(Z,J,Q){return C1.of(Q)}decomposeLeft(Z,J){J.push(this)}decomposeRight(Z,J){J.push(this)}applyChanges(Z,J,Q,X){let Y=this,K=Q.doc;for(let q=X.length-1;q>=0;q--){let{fromA:W,toA:G,fromB:I,toB:U}=X[q],z=Y.lineAt(W,$0.ByPosNoHeight,Q.setDoc(J),0,0),V=z.to>=G?z:Y.lineAt(G,$0.ByPosNoHeight,Q,0,0);U+=V.to-G,G=V.to;while(q>0&&z.from<=X[q-1].toA)if(W=X[q-1].fromA,I=X[q-1].fromB,q--,W<z.from)z=Y.lineAt(W,$0.ByPosNoHeight,Q,0,0);I+=z.from-W,W=z.from;let F=p3.build(Q.setDoc(K),Z,I,U);Y=$J(Y,Y.replace(W,G,F))}return Y.updateHeight(Q,0)}static empty(){return new d1(0,0,0)}static of(Z){if(Z.length==1)return Z[0];let J=0,Q=Z.length,X=0,Y=0;for(;;)if(J==Q)if(X>Y*2){let q=Z[J-1];if(q.break)Z.splice(--J,1,q.left,null,q.right);else Z.splice(--J,1,q.left,q.right);Q+=1+q.break,X-=q.size}else if(Y>X*2){let q=Z[Q];if(q.break)Z.splice(Q,1,q.left,null,q.right);else Z.splice(Q,1,q.left,q.right);Q+=2+q.break,Y-=q.size}else break;else if(X<Y){let q=Z[J++];if(q)X+=q.size}else{let q=Z[--Q];if(q)Y+=q.size}let K=0;if(Z[J-1]==null)K=1,J--;else if(Z[J]==null)K=1,Q++;return new Zj(C1.of(Z.slice(0,J)),K,C1.of(Z.slice(Q)))}}function $J(Z,J){if(Z==J)return Z;if(Z.constructor!=J.constructor)v9=!0;return J}C1.prototype.size=1;var SM=L0.replace({});class n3 extends C1{constructor(Z,J,Q){super(Z,J);this.deco=Q,this.spaceAbove=0}mainBlock(Z,J){return new T6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(Z,J,Q,X){return this.spaceAbove&&Z<Q+this.spaceAbove?new T6(X,0,Q,this.spaceAbove,SM):this.mainBlock(Q,X)}lineAt(Z,J,Q,X,Y){let K=this.mainBlock(X,Y);return this.spaceAbove?this.blockAt(0,Q,X,Y).join(K):K}forEachLine(Z,J,Q,X,Y,K){if(Z<=Y+this.length&&J>=Y)K(this.lineAt(0,$0.ByPos,Q,X,Y))}setMeasuredHeight(Z){let J=Z.heights[Z.index++];if(J<0)this.spaceAbove=-J,J=Z.heights[Z.index++];else this.spaceAbove=0;this.setHeight(J)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);return this.outdated=!1,this}toString(){return`block(${this.length})`}}class d1 extends n3{constructor(Z,J,Q){super(Z,J,null);this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=Q}mainBlock(Z,J){return new T6(J,this.length,Z+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(Z,J,Q){let X=Q[0];if(Q.length==1&&(X instanceof d1||X instanceof z1&&X.flags&4)&&Math.abs(this.length-X.length)<10){if(X instanceof z1)X=new d1(X.length,this.height,this.spaceAbove);else X.height=this.height;if(!this.outdated)X.outdated=!1;return X}else return C1.of(Q)}updateHeight(Z,J=0,Q=!1,X){if(X&&X.from<=J&&X.more)this.setMeasuredHeight(X);else if(Q||this.outdated)this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,Z.heightForLine(this.length-this.collapsed))+this.breaks*Z.lineHeight);return this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class z1 extends C1{constructor(Z){super(Z,0)}heightMetrics(Z,J){let Q=Z.doc.lineAt(J).number,X=Z.doc.lineAt(J+this.length).number,Y=X-Q+1,K,q=0;if(Z.lineWrapping){let W=Math.min(this.height,Z.lineHeight*Y);if(K=W/Y,this.length>Y+1)q=(this.height-W)/(this.length-Y-1)}else K=this.height/Y;return{firstLine:Q,lastLine:X,perLine:K,perChar:q}}blockAt(Z,J,Q,X){let{firstLine:Y,lastLine:K,perLine:q,perChar:W}=this.heightMetrics(J,X);if(J.lineWrapping){let G=X+(Z<J.lineHeight?0:Math.round(Math.max(0,Math.min(1,(Z-Q)/this.height))*this.length)),I=J.doc.lineAt(G),U=q+I.length*W,z=Math.max(Q,Z-U/2);return new T6(I.from,I.length,z,U,0)}else{let G=Math.max(0,Math.min(K-Y,Math.floor((Z-Q)/q))),{from:I,length:U}=J.doc.line(Y+G);return new T6(I,U,Q+q*G,q,0)}}lineAt(Z,J,Q,X,Y){if(J==$0.ByHeight)return this.blockAt(Z,Q,X,Y);if(J==$0.ByPosNoHeight){let{from:V,to:F}=Q.doc.lineAt(Z);return new T6(V,F-V,0,0,0)}let{firstLine:K,perLine:q,perChar:W}=this.heightMetrics(Q,Y),G=Q.doc.lineAt(Z),I=q+G.length*W,U=G.number-K,z=X+q*U+W*(G.from-Y-U);return new T6(G.from,G.length,Math.max(X,Math.min(z,X+this.height-I)),I,0)}forEachLine(Z,J,Q,X,Y,K){Z=Math.max(Z,Y),J=Math.min(J,Y+this.length);let{firstLine:q,perLine:W,perChar:G}=this.heightMetrics(Q,Y);for(let I=Z,U=X;I<=J;){let z=Q.doc.lineAt(I);if(I==Z){let F=z.number-q;U+=W*F+G*(Z-Y-F)}let V=W+G*z.length;K(new T6(z.from,z.length,U,V,0)),U+=V,I=z.to+1}}replace(Z,J,Q){let X=this.length-J;if(X>0){let Y=Q[Q.length-1];if(Y instanceof z1)Q[Q.length-1]=new z1(Y.length+X);else Q.push(null,new z1(X-1))}if(Z>0){let Y=Q[0];if(Y instanceof z1)Q[0]=new z1(Z+Y.length);else Q.unshift(new z1(Z-1),null)}return C1.of(Q)}decomposeLeft(Z,J){J.push(new z1(Z-1),null)}decomposeRight(Z,J){J.push(null,new z1(this.length-Z-1))}updateHeight(Z,J=0,Q=!1,X){let Y=J+this.length;if(X&&X.from<=J+this.length&&X.more){let K=[],q=Math.max(J,X.from),W=-1;if(X.from>J)K.push(new z1(X.from-J-1).updateHeight(Z,J));while(q<=Y&&X.more){let I=Z.doc.lineAt(q).length;if(K.length)K.push(null);let U=X.heights[X.index++],z=0;if(U<0)z=-U,U=X.heights[X.index++];if(W==-1)W=U;else if(Math.abs(U-W)>=SJ)W=-2;let V=new d1(I,U,z);V.outdated=!1,K.push(V),q+=I+1}if(q<=Y)K.push(null,new z1(Y-q).updateHeight(Z,q));let G=C1.of(K);if(W<0||Math.abs(G.height-this.height)>=SJ||Math.abs(W-this.heightMetrics(Z,J).perLine)>=SJ)v9=!0;return $J(this,G)}else if(Q||this.outdated)this.setHeight(Z.heightForGap(J,J+this.length)),this.outdated=!1;return this}toString(){return`gap(${this.length})`}}class Zj extends C1{constructor(Z,J,Q){super(Z.length+J+Q.length,Z.height+Q.height,J|(Z.outdated||Q.outdated?2:0));this.left=Z,this.right=Q,this.size=Z.size+Q.size}get break(){return this.flags&1}blockAt(Z,J,Q,X){let Y=Q+this.left.height;return Z<Y?this.left.blockAt(Z,J,Q,X):this.right.blockAt(Z,J,Y,X+this.left.length+this.break)}lineAt(Z,J,Q,X,Y){let K=X+this.left.height,q=Y+this.left.length+this.break,W=J==$0.ByHeight?Z<K:Z<q,G=W?this.left.lineAt(Z,J,Q,X,Y):this.right.lineAt(Z,J,Q,K,q);if(this.break||(W?G.to<q:G.from>q))return G;let I=J==$0.ByPosNoHeight?$0.ByPosNoHeight:$0.ByPos;if(W)return G.join(this.right.lineAt(q,I,Q,K,q));else return this.left.lineAt(q,I,Q,X,Y).join(G)}forEachLine(Z,J,Q,X,Y,K){let q=X+this.left.height,W=Y+this.left.length+this.break;if(this.break){if(Z<W)this.left.forEachLine(Z,J,Q,X,Y,K);if(J>=W)this.right.forEachLine(Z,J,Q,q,W,K)}else{let G=this.lineAt(W,$0.ByPos,Q,X,Y);if(Z<G.from)this.left.forEachLine(Z,G.from-1,Q,X,Y,K);if(G.to>=Z&&G.from<=J)K(G);if(J>G.to)this.right.forEachLine(G.to+1,J,Q,q,W,K)}}replace(Z,J,Q){let X=this.left.length+this.break;if(J<X)return this.balanced(this.left.replace(Z,J,Q),this.right);if(Z>this.left.length)return this.balanced(this.left,this.right.replace(Z-X,J-X,Q));let Y=[];if(Z>0)this.decomposeLeft(Z,Y);let K=Y.length;for(let q of Q)Y.push(q);if(Z>0)yz(Y,K-1);if(J<this.length){let q=Y.length;this.decomposeRight(J,Y),yz(Y,q)}return C1.of(Y)}decomposeLeft(Z,J){let Q=this.left.length;if(Z<=Q)return this.left.decomposeLeft(Z,J);if(J.push(this.left),this.break){if(Q++,Z>=Q)J.push(null)}if(Z>Q)this.right.decomposeLeft(Z-Q,J)}decomposeRight(Z,J){let Q=this.left.length,X=Q+this.break;if(Z>=X)return this.right.decomposeRight(Z-X,J);if(Z<Q)this.left.decomposeRight(Z,J);if(this.break&&Z<X)J.push(null);J.push(this.right)}balanced(Z,J){if(Z.size>2*J.size||J.size>2*Z.size)return C1.of(this.break?[Z,null,J]:[Z,J]);return this.left=$J(this.left,Z),this.right=$J(this.right,J),this.setHeight(Z.height+J.height),this.outdated=Z.outdated||J.outdated,this.size=Z.size+J.size,this.length=Z.length+this.break+J.length,this}updateHeight(Z,J=0,Q=!1,X){let{left:Y,right:K}=this,q=J+Y.length+this.break,W=null;if(X&&X.from<=J+Y.length&&X.more)W=Y=Y.updateHeight(Z,J,Q,X);else Y.updateHeight(Z,J,Q);if(X&&X.from<=q+K.length&&X.more)W=K=K.updateHeight(Z,q,Q,X);else K.updateHeight(Z,q,Q);if(W)return this.balanced(Y,K);return this.height=this.left.height+this.right.height,this.outdated=!1,this}toString(){return this.left+(this.break?" ":"-")+this.right}}function yz(Z,J){let Q,X;if(Z[J]==null&&(Q=Z[J-1])instanceof z1&&(X=Z[J+1])instanceof z1)Z.splice(J-1,3,new z1(Q.length+1+X.length))}var TM=5;class p3{constructor(Z,J){this.pos=Z,this.oracle=J,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=Z}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(Z,J){if(this.lineStart>-1){let Q=Math.min(J,this.lineEnd),X=this.nodes[this.nodes.length-1];if(X instanceof d1)X.length+=Q-this.pos;else if(Q>this.pos||!this.isCovered)this.nodes.push(new d1(Q-this.pos,-1,0));if(this.writtenTo=Q,J>Q)this.nodes.push(null),this.writtenTo++,this.lineStart=-1}this.pos=J}point(Z,J,Q){if(Z<J||Q.heightRelevant){let X=Q.widget?Q.widget.estimatedHeight:0,Y=Q.widget?Q.widget.lineBreaks:0;if(X<0)X=this.oracle.lineHeight;let K=J-Z;if(Q.block)this.addBlock(new n3(K,X,Q));else if(K||Y||X>=TM)this.addLineDeco(X,Y,K)}else if(J>Z)this.span(Z,J);if(this.lineEnd>-1&&this.lineEnd<this.pos)this.lineEnd=this.oracle.doc.lineAt(this.pos).to}enterLine(){if(this.lineStart>-1)return;let{from:Z,to:J}=this.oracle.doc.lineAt(this.pos);if(this.lineStart=Z,this.lineEnd=J,this.writtenTo<Z){if(this.writtenTo<Z-1||this.nodes[this.nodes.length-1]==null)this.nodes.push(this.blankContent(this.writtenTo,Z-1));this.nodes.push(null)}if(this.pos>Z)this.nodes.push(new d1(this.pos-Z,-1,0));this.writtenTo=this.pos}blankContent(Z,J){let Q=new z1(J-Z);if(this.oracle.doc.lineAt(Z).to==J)Q.flags|=4;return Q}ensureLine(){this.enterLine();let Z=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(Z instanceof d1)return Z;let J=new d1(0,-1,0);return this.nodes.push(J),J}addBlock(Z){this.enterLine();let J=Z.deco;if(J&&J.startSide>0&&!this.isCovered)this.ensureLine();if(this.nodes.push(Z),this.writtenTo=this.pos=this.pos+Z.length,J&&J.endSide>0)this.covering=Z}addLineDeco(Z,J,Q){let X=this.ensureLine();X.length+=Q,X.collapsed+=Q,X.widgetHeight=Math.max(X.widgetHeight,Z),X.breaks+=J,this.writtenTo=this.pos=this.pos+Q}finish(Z){let J=this.nodes.length==0?null:this.nodes[this.nodes.length-1];if(this.lineStart>-1&&!(J instanceof d1)&&!this.isCovered)this.nodes.push(new d1(0,-1,0));else if(this.writtenTo<this.pos||J==null)this.nodes.push(this.blankContent(this.writtenTo,this.pos));let Q=Z;for(let X of this.nodes){if(X instanceof d1)X.updateHeight(this.oracle,Q);Q+=X?X.length:1}return this.nodes}static build(Z,J,Q,X){let Y=new p3(Q,Z);return N0.spans(J,Q,X,Y,0),Y.finish(Q)}}function EM(Z,J,Q){let X=new Jj;return N0.compare(Z,J,Q,X,0),X.changes}class Jj{constructor(){this.changes=[]}compareRange(){}comparePoint(Z,J,Q,X){if(Z<J||Q&&Q.heightRelevant||X&&X.heightRelevant)$9(Z,J,this.changes,5)}}function CM(Z,J){let Q=Z.getBoundingClientRect(),X=Z.ownerDocument,Y=X.defaultView||window,K=Math.max(0,Q.left),q=Math.min(Y.innerWidth,Q.right),W=Math.max(0,Q.top),G=Math.min(Y.innerHeight,Q.bottom);for(let I=Z.parentNode;I&&I!=X.body;)if(I.nodeType==1){let U=I,z=window.getComputedStyle(U);if((U.scrollHeight>U.clientHeight||U.scrollWidth>U.clientWidth)&&z.overflow!="visible"){let V=U.getBoundingClientRect();K=Math.max(K,V.left),q=Math.min(q,V.right),W=Math.max(W,V.top),G=Math.min(I==Z.parentNode?Y.innerHeight:G,V.bottom)}I=z.position=="absolute"||z.position=="fixed"?U.offsetParent:U.parentNode}else if(I.nodeType==11)I=I.host;else break;return{left:K-Q.left,right:Math.max(K,q)-Q.left,top:W-(Q.top+J),bottom:Math.max(W,G)-(Q.top+J)}}function _M(Z){let J=Z.getBoundingClientRect(),Q=Z.ownerDocument.defaultView||window;return J.left<Q.innerWidth&&J.right>0&&J.top<Q.innerHeight&&J.bottom>0}function wM(Z,J){let Q=Z.getBoundingClientRect();return{left:0,right:Q.right-Q.left,top:J,bottom:Q.bottom-(Q.top+J)}}class TJ{constructor(Z,J,Q,X){this.from=Z,this.to=J,this.size=Q,this.displaySize=X}static same(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],Y=J[Q];if(X.from!=Y.from||X.to!=Y.to||X.size!=Y.size)return!1}return!0}draw(Z,J){return L0.replace({widget:new Qj(this.displaySize*(J?Z.scaleY:Z.scaleX),J)}).range(this.from,this.to)}}class Qj extends a8{constructor(Z,J){super();this.size=Z,this.vertical=J}eq(Z){return Z.size==this.size&&Z.vertical==this.vertical}toDOM(){let Z=document.createElement("div");if(this.vertical)Z.style.height=this.size+"px";else Z.style.width=this.size+"px",Z.style.height="2px",Z.style.display="inline-block";return Z}get estimatedHeight(){return this.vertical?this.size:-1}}class S3{constructor(Z,J){this.view=Z,this.state=J,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=hz,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=w0.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let Q=J.facet(f3).some((X)=>typeof X!="function"&&X.class=="cm-lineWrapping");this.heightOracle=new tV(Q),this.stateDeco=$z(J),this.heightMap=C1.empty().applyChanges(this.stateDeco,R0.empty,this.heightOracle.setDoc(J.doc),[new J6(0,0,0,J.doc.length)]);for(let X=0;X<2;X++)if(this.viewport=this.getViewport(0,null),!this.updateForViewport())break;this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=L0.set(this.lineGaps.map((X)=>X.draw(this,!1))),this.scrollParent=Z.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let Z=[this.viewport],{main:J}=this.state.selection;for(let Q=0;Q<=1;Q++){let X=Q?J.head:J.anchor;if(!Z.some(({from:Y,to:K})=>X>=Y&&X<=K)){let{from:Y,to:K}=this.lineBlockAt(X);Z.push(new q5(Y,K))}}return this.viewports=Z.sort((Q,X)=>Q.from-X.from),this.updateScaler()}updateScaler(){let Z=this.scaler;return this.scaler=this.heightMap.height<=7000000?hz:new c3(this.heightOracle,this.heightMap,this.viewports),Z.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,(Z)=>{this.viewportLines.push(W5(Z,this.scaler))})}update(Z,J=null){this.state=Z.state;let Q=this.stateDeco;this.stateDeco=$z(this.state);let X=Z.changedRanges,Y=J6.extendWithRanges(X,EM(Q,this.stateDeco,Z?Z.changes:a0.empty(this.state.doc.length))),K=this.heightMap.height,q=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);if(bz(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,Z.startState.doc,this.heightOracle.setDoc(this.state.doc),Y),this.heightMap.height!=K||v9)Z.flags|=2;if(q)this.scrollAnchorPos=Z.changes.mapPos(q.from,-1),this.scrollAnchorHeight=q.top;else this.scrollAnchorPos=-1,this.scrollAnchorHeight=K;let W=Y.length?this.mapViewport(this.viewport,Z.changes):this.viewport;if(J&&(J.range.head<W.from||J.range.head>W.to)||!this.viewportIsAppropriate(W))W=this.getViewport(0,J);let G=W.from!=this.viewport.from||W.to!=this.viewport.to;if(this.viewport=W,Z.flags|=this.updateForViewport(),G||!Z.changes.empty||Z.flags&2)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,Z.changes)));if(Z.flags|=this.computeVisibleRanges(Z.changes),J)this.scrollTarget=J;if(!this.mustEnforceCursorAssoc&&(Z.selectionSet||Z.focusChanged)&&Z.view.lineWrapping&&Z.state.selection.main.empty&&Z.state.selection.main.assoc&&!Z.state.facet(MV))this.mustEnforceCursorAssoc=!0}measure(){let{view:Z}=this,J=Z.contentDOM,Q=window.getComputedStyle(J),X=this.heightOracle,Y=Q.whiteSpace;this.defaultTextDirection=Q.direction=="rtl"?w0.RTL:w0.LTR;let K=this.heightOracle.mustRefreshForWrapping(Y)||this.mustMeasureContent==="refresh",q=J.getBoundingClientRect(),W=K||this.mustMeasureContent||this.contentDOMHeight!=q.height;this.contentDOMHeight=q.height,this.mustMeasureContent=!1;let G=0,I=0;if(q.width&&q.height){let{scaleX:k,scaleY:D}=tz(J,q);if(k>0.005&&Math.abs(this.scaleX-k)>0.005||D>0.005&&Math.abs(this.scaleY-D)>0.005)this.scaleX=k,this.scaleY=D,G|=16,K=W=!0}let U=(parseInt(Q.paddingTop)||0)*this.scaleY,z=(parseInt(Q.paddingBottom)||0)*this.scaleY;if(this.paddingTop!=U||this.paddingBottom!=z)this.paddingTop=U,this.paddingBottom=z,G|=18;if(this.editorWidth!=Z.scrollDOM.clientWidth){if(X.lineWrapping)W=!0;this.editorWidth=Z.scrollDOM.clientWidth,G|=16}let V=ez(this.view.contentDOM,!1).y;if(V!=this.scrollParent)this.scrollParent=V,this.scrollAnchorHeight=-1,this.scrollOffset=0;let F=this.getScrollOffset();if(this.scrollOffset!=F)this.scrollAnchorHeight=-1,this.scrollOffset=F;this.scrolledToBottom=YV(this.scrollParent||Z.win);let H=(this.printing?wM:CM)(J,this.paddingTop),N=H.top-this.pixelViewport.top,R=H.bottom-this.pixelViewport.bottom;this.pixelViewport=H;let T=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(T!=this.inView){if(this.inView=T,T)W=!0}if(!this.inView&&!this.scrollTarget&&!_M(Z.dom))return 0;let E=q.width;if(this.contentDOMWidth!=E||this.editorHeight!=Z.scrollDOM.clientHeight)this.contentDOMWidth=q.width,this.editorHeight=Z.scrollDOM.clientHeight,G|=16;if(W){let k=Z.docView.measureVisibleLineHeights(this.viewport);if(X.mustRefreshForHeights(k))K=!0;if(K||X.lineWrapping&&Math.abs(E-this.contentDOMWidth)>X.charWidth){let{lineHeight:D,charWidth:S,textHeight:B}=Z.docView.measureTextSize();if(K=D>0&&X.refresh(Y,D,S,B,Math.max(5,E/S),k),K)Z.docView.minWidth=0,G|=16}if(N>0&&R>0)I=Math.max(N,R);else if(N<0&&R<0)I=Math.min(N,R);bz();for(let D of this.viewports){let S=D.from==this.viewport.from?k:Z.docView.measureVisibleLineHeights(D);this.heightMap=(K?C1.empty().applyChanges(this.stateDeco,R0.empty,this.heightOracle,[new J6(0,0,0,Z.state.doc.length)]):this.heightMap).updateHeight(X,0,K,new eV(D.from,S))}if(v9)G|=2}let _=!this.viewportIsAppropriate(this.viewport,I)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);if(_){if(G&2)G|=this.updateScaler();this.viewport=this.getViewport(I,this.scrollTarget),G|=this.updateForViewport()}if(G&2||_)this.updateViewportLines();if(this.lineGaps.length||this.viewport.to-this.viewport.from>4000)this.updateLineGaps(this.ensureLineGaps(K?[]:this.lineGaps,Z));if(G|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc)this.mustEnforceCursorAssoc=!1,Z.docView.enforceCursorAssoc();return G}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(Z,J){let Q=0.5-Math.max(-0.5,Math.min(0.5,Z/1000/2)),X=this.heightMap,Y=this.heightOracle,{visibleTop:K,visibleBottom:q}=this,W=new q5(X.lineAt(K-Q*1000,$0.ByHeight,Y,0,0).from,X.lineAt(q+(1-Q)*1000,$0.ByHeight,Y,0,0).to);if(J){let{head:G}=J.range;if(G<W.from||G>W.to){let I=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),U=X.lineAt(G,$0.ByPos,Y,0,0),z;if(J.y=="center")z=(U.top+U.bottom)/2-I/2;else if(J.y=="start"||J.y=="nearest"&&G<W.from)z=U.top;else z=U.bottom-I;W=new q5(X.lineAt(z-500,$0.ByHeight,Y,0,0).from,X.lineAt(z+I+500,$0.ByHeight,Y,0,0).to)}}return W}mapViewport(Z,J){let Q=J.mapPos(Z.from,-1),X=J.mapPos(Z.to,1);return new q5(this.heightMap.lineAt(Q,$0.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(X,$0.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:Z,to:J},Q=0){if(!this.inView)return!0;let{top:X}=this.heightMap.lineAt(Z,$0.ByPos,this.heightOracle,0,0),{bottom:Y}=this.heightMap.lineAt(J,$0.ByPos,this.heightOracle,0,0),{visibleTop:K,visibleBottom:q}=this;return(Z==0||X<=K-Math.max(10,Math.min(-Q,250)))&&(J==this.state.doc.length||Y>=q+Math.max(10,Math.min(Q,250)))&&(X>K-2000&&Y<q+2000)}mapLineGaps(Z,J){if(!Z.length||J.empty)return Z;let Q=[];for(let X of Z)if(!J.touchesRange(X.from,X.to))Q.push(new TJ(J.mapPos(X.from),J.mapPos(X.to),X.size,X.displaySize));return Q}ensureLineGaps(Z,J){let Q=this.heightOracle.lineWrapping,X=Q?1e4:2000,Y=X>>1,K=X<<1;if(this.defaultTextDirection!=w0.LTR&&!Q)return[];let q=[],W=(I,U,z,V)=>{if(U-I<Y)return;let F=this.state.selection.main,H=[F.from];if(!F.empty)H.push(F.to);for(let R of H)if(R>I&&R<U){W(I,R-10,z,V),W(R+10,U,z,V);return}let N=xM(Z,(R)=>R.from>=z.from&&R.to<=z.to&&Math.abs(R.from-I)<Y&&Math.abs(R.to-U)<Y&&!H.some((T)=>R.from<T&&R.to>T));if(!N){if(U<z.to&&J&&Q&&J.visibleRanges.some((E)=>E.from<=U&&E.to>=U)){let E=J.moveToLineBoundary(f.cursor(U),!1,!0).head;if(E>I)U=E}let R=this.gapSize(z,I,U,V),T=Q||R<2000000?R:2000000;N=new TJ(I,U,R,T)}q.push(N)},G=(I)=>{if(I.length<K||I.type!=V1.Text)return;let U=kM(I.from,I.to,this.stateDeco);if(U.total<K)return;let z=this.scrollTarget?this.scrollTarget.range.head:null,V,F;if(Q){let H=X/this.heightOracle.lineLength*this.heightOracle.lineHeight,N,R;if(z!=null){let T=NJ(U,z),E=((this.visibleBottom-this.visibleTop)/2+H)/I.height;N=T-E,R=T+E}else N=(this.visibleTop-I.top-H)/I.height,R=(this.visibleBottom-I.top+H)/I.height;V=HJ(U,N),F=HJ(U,R)}else{let H=U.total*this.heightOracle.charWidth,N=X*this.heightOracle.charWidth,R=0;if(H>2000000){for(let D of Z)if(D.from>=I.from&&D.from<I.to&&D.size!=D.displaySize&&D.from*this.heightOracle.charWidth+R<this.pixelViewport.left)R=D.size-D.displaySize}let T=this.pixelViewport.left+R,E=this.pixelViewport.right+R,_,k;if(z!=null){let D=NJ(U,z),S=((E-T)/2+N)/H;_=D-S,k=D+S}else _=(T-N)/H,k=(E+N)/H;V=HJ(U,_),F=HJ(U,k)}if(V>I.from)W(I.from,V,I,U);if(F<I.to)W(F,I.to,I,U)};for(let I of this.viewportLines)if(Array.isArray(I.type))I.type.forEach(G);else G(I);return q}gapSize(Z,J,Q,X){let Y=NJ(X,Q)-NJ(X,J);if(this.heightOracle.lineWrapping)return Z.height*Y;else return X.total*this.heightOracle.charWidth*Y}updateLineGaps(Z){if(!TJ.same(Z,this.lineGaps))this.lineGaps=Z,this.lineGapDeco=L0.set(Z.map((J)=>J.draw(this,this.heightOracle.lineWrapping)))}computeVisibleRanges(Z){let J=this.stateDeco;if(this.lineGaps.length)J=J.concat(this.lineGapDeco);let Q=[];N0.spans(J,this.viewport.from,this.viewport.to,{span(Y,K){Q.push({from:Y,to:K})},point(){}},20);let X=0;if(Q.length!=this.visibleRanges.length)X=12;else for(let Y=0;Y<Q.length&&!(X&8);Y++){let K=this.visibleRanges[Y],q=Q[Y];if(K.from!=q.from||K.to!=q.to){if(X|=4,!(Z&&Z.mapPos(K.from,-1)==q.from&&Z.mapPos(K.to,1)==q.to))X|=8}}return this.visibleRanges=Q,X}lineBlockAt(Z){return Z>=this.viewport.from&&Z<=this.viewport.to&&this.viewportLines.find((J)=>J.from<=Z&&J.to>=Z)||W5(this.heightMap.lineAt(Z,$0.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(Z){return Z>=this.viewportLines[0].top&&Z<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find((J)=>J.top<=Z&&J.bottom>=Z)||W5(this.heightMap.lineAt(this.scaler.fromDOM(Z),$0.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(Z){let J=this.lineBlockAtHeight(Z+8);return J.from>=this.viewport.from||this.viewportLines[0].top-Z>200?J:this.viewportLines[0]}elementAtHeight(Z){return W5(this.heightMap.blockAt(this.scaler.fromDOM(Z),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class q5{constructor(Z,J){this.from=Z,this.to=J}}function kM(Z,J,Q){let X=[],Y=Z,K=0;if(N0.spans(Q,Z,J,{span(){},point(q,W){if(q>Y)X.push({from:Y,to:q}),K+=q-Y;Y=W}},20),Y<J)X.push({from:Y,to:J}),K+=J-Y;return{total:K,ranges:X}}function HJ({total:Z,ranges:J},Q){if(Q<=0)return J[0].from;if(Q>=1)return J[J.length-1].to;let X=Math.floor(Z*Q);for(let Y=0;;Y++){let{from:K,to:q}=J[Y],W=q-K;if(X<=W)return K+X;X-=W}}function NJ(Z,J){let Q=0;for(let{from:X,to:Y}of Z.ranges){if(J<=Y){Q+=J-X;break}Q+=Y-X}return Q/Z.total}function xM(Z,J){for(let Q of Z)if(J(Q))return Q;return}var hz={toDOM(Z){return Z},fromDOM(Z){return Z},scale:1,eq(Z){return Z==this}};function $z(Z){let J=Z.facet(vJ).filter((X)=>typeof X!="function"),Q=Z.facet(u3).filter((X)=>typeof X!="function");if(Q.length)J.push(N0.join(Q));return J}class c3{constructor(Z,J,Q){let X=0,Y=0,K=0;this.viewports=Q.map(({from:q,to:W})=>{let G=J.lineAt(q,$0.ByPos,Z,0,0).top,I=J.lineAt(W,$0.ByPos,Z,0,0).bottom;return X+=I-G,{from:q,to:W,top:G,bottom:I,domTop:0,domBottom:0}}),this.scale=(7000000-X)/(J.height-X);for(let q of this.viewports)q.domTop=K+(q.top-Y)*this.scale,K=q.domBottom=q.domTop+(q.bottom-q.top),Y=q.bottom}toDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.top)return X+(Z-Q)*this.scale;if(Z<=Y.bottom)return Y.domTop+(Z-Y.top);Q=Y.bottom,X=Y.domBottom}}fromDOM(Z){for(let J=0,Q=0,X=0;;J++){let Y=J<this.viewports.length?this.viewports[J]:null;if(!Y||Z<Y.domTop)return Q+(Z-X)/this.scale;if(Z<=Y.domBottom)return Y.top+(Z-Y.domTop);Q=Y.bottom,X=Y.domBottom}}eq(Z){if(!(Z instanceof c3))return!1;return this.scale==Z.scale&&this.viewports.length==Z.viewports.length&&this.viewports.every((J,Q)=>J.from==Z.viewports[Q].from&&J.to==Z.viewports[Q].to)}}function W5(Z,J){if(J.scale==1)return Z;let Q=J.toDOM(Z.top),X=J.toDOM(Z.bottom);return new T6(Z.from,Z.length,Q,X-Q,Array.isArray(Z._content)?Z._content.map((Y)=>W5(Y,J)):Z._content)}var RJ=o.define({combine:(Z)=>Z.join(" ")}),T3=o.define({combine:(Z)=>Z.indexOf(!0)>-1}),E3=P6.newName(),Xj=P6.newName(),Yj=P6.newName(),Kj={"&light":"."+Xj,"&dark":"."+Yj};function C3(Z,J,Q){return new P6(J,{finish(X){return/&/.test(X)?X.replace(/&\w*/,(Y)=>{if(Y=="&")return Z;if(!Q||!Q[Y])throw RangeError(`Unsupported selector: ${Y}`);return Q[Y]}):Z+" "+X}})}var bM=C3("."+E3,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{userSelect:"none",position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},".cm-panels-top":{top:"0"},".cm-panels-bottom":{bottom:"0"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},Kj),yM={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},q3=r.ie&&r.ie_version<=11;class qj{constructor(Z){if(this.view=Z,this.active=!1,this.editContext=null,this.selectionRange=new ZV,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=Z.contentDOM,this.observer=new MutationObserver((J)=>{for(let Q of J)this.queue.push(Q);if((r.ie&&r.ie_version<=11||r.ios&&Z.composing)&&J.some((Q)=>Q.type=="childList"&&Q.removedNodes.length||Q.type=="characterData"&&Q.oldValue.length>Q.target.nodeValue.length))this.flushSoon();else this.flush()}),window.EditContext&&r.android&&Z.constructor.EDIT_CONTEXT!==!1&&!(r.chrome&&r.chrome_version<126)){if(this.editContext=new Wj(Z),Z.state.facet(B8))Z.contentDOM.editContext=this.editContext.editContext}if(q3)this.onCharData=(J)=>{this.queue.push({target:J.target,type:"characterData",oldValue:J.prevValue}),this.flushSoon()};if(this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia)this.printQuery=window.matchMedia("print");if(typeof ResizeObserver=="function")this.resizeScroll=new ResizeObserver(()=>{var J;if(((J=this.view.docView)===null||J===void 0?void 0:J.lastUpdate)<Date.now()-75)this.onResize()}),this.resizeScroll.observe(Z.scrollDOM);if(this.addWindowListeners(this.win=Z.win),this.start(),typeof IntersectionObserver=="function")this.intersection=new IntersectionObserver((J)=>{if(this.parentCheck<0)this.parentCheck=setTimeout(this.listenForScroll.bind(this),1000);if(J.length>0&&J[J.length-1].intersectionRatio>0!=this.intersecting){if(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView)this.onScrollChanged(document.createEvent("Event"))}},{threshold:[0,0.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver((J)=>{if(J.length>0&&J[J.length-1].intersectionRatio>0)this.onScrollChanged(document.createEvent("Event"))},{});this.listenForScroll(),this.readSelectionRange()}onScrollChanged(Z){if(this.view.inputState.runHandlers("scroll",Z),this.intersecting)this.view.measure()}onScroll(Z){if(this.intersecting)this.flush(!1);if(this.editContext)this.view.requestMeasure(this.editContext.measureReq);this.onScrollChanged(Z)}onResize(){if(this.resizeTimeout<0)this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50)}onPrint(Z){if((Z.type=="change"||!Z.type)&&!Z.matches)return;this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500)}updateGaps(Z){if(this.gapIntersection&&(Z.length!=this.gaps.length||this.gaps.some((J,Q)=>J!=Z[Q]))){this.gapIntersection.disconnect();for(let J of Z)this.gapIntersection.observe(J);this.gaps=Z}}onSelectionChange(Z){let J=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:Q}=this,X=this.selectionRange;if(Q.state.facet(B8)?Q.root.activeElement!=this.dom:!I5(this.dom,X))return;let Y=X.anchorNode&&Q.docView.tile.nearest(X.anchorNode);if(Y&&Y.isWidget()&&Y.widget.ignoreEvent(Z)){if(!J)this.selectionChanged=!1;return}if((r.ie&&r.ie_version<=11||r.android&&r.chrome)&&!Q.state.selection.main.empty&&X.focusNode&&U5(X.focusNode,X.focusOffset,X.anchorNode,X.anchorOffset))this.flushSoon();else this.flush(!1)}readSelectionRange(){let{view:Z}=this,J=j5(Z.root);if(!J)return!1;let Q=r.safari&&Z.root.nodeType==11&&Z.root.activeElement==this.dom&&hM(this.view,J)||J;if(!Q||this.selectionRange.eq(Q))return!1;let X=I5(this.dom,Q);if(X&&!this.selectionChanged&&Z.inputState.lastFocusTime>Date.now()-200&&Z.inputState.lastTouchTime<Date.now()-300&&_R(this.dom,Q))return this.view.inputState.lastFocusTime=0,Z.docView.updateSelection(),!1;if(this.selectionRange.setRange(Q),X)this.selectionChanged=!0;return!0}setSelectionRange(Z,J){this.selectionRange.set(Z.node,Z.offset,J.node,J.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let Z=0,J=null;for(let Q=this.dom;Q;)if(Q.nodeType==1){if(!J&&Z<this.scrollTargets.length&&this.scrollTargets[Z]==Q)Z++;else if(!J)J=this.scrollTargets.slice(0,Z);if(J)J.push(Q);Q=Q.assignedSlot||Q.parentNode}else if(Q.nodeType==11)Q=Q.host;else break;if(Z<this.scrollTargets.length&&!J)J=this.scrollTargets.slice(0,Z);if(J){for(let Q of this.scrollTargets)Q.removeEventListener("scroll",this.onScroll);for(let Q of this.scrollTargets=J)Q.addEventListener("scroll",this.onScroll)}}ignore(Z){if(!this.active)return Z();try{return this.stop(),Z()}finally{this.start(),this.clear()}}start(){if(this.active)return;if(this.observer.observe(this.dom,yM),q3)this.dom.addEventListener("DOMCharacterDataModified",this.onCharData);this.active=!0}stop(){if(!this.active)return;if(this.active=!1,this.observer.disconnect(),q3)this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(Z,J){var Q;if(!this.delayedAndroidKey){let X=()=>{let Y=this.delayedAndroidKey;if(Y){if(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=Y.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&Y.force)g9(this.dom,Y.key,Y.keyCode)}};this.flushingAndroidKey=this.view.win.requestAnimationFrame(X)}if(!this.delayedAndroidKey||Z=="Enter")this.delayedAndroidKey={key:Z,keyCode:J,force:this.lastChange<Date.now()-50||!!((Q=this.delayedAndroidKey)===null||Q===void 0?void 0:Q.force)}}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){if(this.delayedFlush<0)this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()})}forceFlush(){if(this.delayedFlush>=0)this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1;this.flush()}pendingRecords(){for(let Z of this.observer.takeRecords())this.queue.push(Z);return this.queue}processRecords(){let Z=this.pendingRecords();if(Z.length)this.queue=[];let J=-1,Q=-1,X=!1;for(let Y of Z){let K=this.readMutation(Y);if(!K)continue;if(K.typeOver)X=!0;if(J==-1)({from:J,to:Q}=K);else J=Math.min(K.from,J),Q=Math.max(K.to,Q)}return{from:J,to:Q,typeOver:X}}readChange(){let{from:Z,to:J,typeOver:Q}=this.processRecords(),X=this.selectionChanged&&I5(this.dom,this.selectionRange);if(Z<0&&!X)return null;if(Z>-1)this.lastChange=Date.now();this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let Y=new fV(this.view,Z,J,Q);return this.view.docView.domChanged={newSel:Y.newSel?Y.newSel.main:null},Y}flush(Z=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;if(Z)this.readSelectionRange();let J=this.readChange();if(!J)return this.view.requestMeasure(),!1;let Q=this.view.state,X=vV(this.view,J);if(this.view.state==Q&&(J.domChanged||J.newSel&&!hJ(this.view.state.selection,J.newSel.main)))this.view.update([]);return X}readMutation(Z){let J=this.view.docView.tile.nearest(Z.target);if(!J||J.isWidget())return null;if(J.markDirty(Z.type=="attributes"),Z.type=="childList"){let Q=gz(J,Z.previousSibling||Z.target.previousSibling,-1),X=gz(J,Z.nextSibling||Z.target.nextSibling,1);return{from:Q?J.posAfter(Q):J.posAtStart,to:X?J.posBefore(X):J.posAtEnd,typeOver:!1}}else if(Z.type=="characterData")return{from:J.posAtStart,to:J.posAtEnd,typeOver:Z.target.nodeValue==Z.oldValue};else return null}setWindow(Z){if(Z!=this.win)this.removeWindowListeners(this.win),this.win=Z,this.addWindowListeners(this.win)}addWindowListeners(Z){if(Z.addEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.addEventListener)this.printQuery.addEventListener("change",this.onPrint);else this.printQuery.addListener(this.onPrint);else Z.addEventListener("beforeprint",this.onPrint);Z.addEventListener("scroll",this.onScroll),Z.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(Z){if(Z.removeEventListener("scroll",this.onScroll),Z.removeEventListener("resize",this.onResize),this.printQuery)if(this.printQuery.removeEventListener)this.printQuery.removeEventListener("change",this.onPrint);else this.printQuery.removeListener(this.onPrint);else Z.removeEventListener("beforeprint",this.onPrint);Z.document.removeEventListener("selectionchange",this.onSelectionChange)}update(Z){if(this.editContext){if(this.editContext.update(Z),Z.startState.facet(B8)!=Z.state.facet(B8))Z.view.contentDOM.editContext=Z.state.facet(B8)?this.editContext.editContext:null}}destroy(){var Z,J,Q;this.stop(),(Z=this.intersection)===null||Z===void 0||Z.disconnect(),(J=this.gapIntersection)===null||J===void 0||J.disconnect(),(Q=this.resizeScroll)===null||Q===void 0||Q.disconnect();for(let X of this.scrollTargets)X.removeEventListener("scroll",this.onScroll);if(this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext)this.view.contentDOM.editContext=null,this.editContext.destroy()}}function gz(Z,J,Q){while(J){let X=c0.get(J);if(X&&X.parent==Z)return X;let Y=J.parentNode;J=Y!=Z.dom?Y:Q>0?J.nextSibling:J.previousSibling}return null}function fz(Z,J){let{startContainer:Q,startOffset:X,endContainer:Y,endOffset:K}=J,q=Z.docView.domAtPos(Z.state.selection.main.anchor,1);if(U5(q.node,q.offset,Y,K))[Q,X,Y,K]=[Y,K,Q,X];return{anchorNode:Q,anchorOffset:X,focusNode:Y,focusOffset:K}}function hM(Z,J){if(J.getComposedRanges){let Y=J.getComposedRanges(Z.root)[0];if(Y)return fz(Z,Y)}let Q=null;function X(Y){Y.preventDefault(),Y.stopImmediatePropagation(),Q=Y.getTargetRanges()[0]}return Z.contentDOM.addEventListener("beforeinput",X,!0),Z.dom.ownerDocument.execCommand("indent"),Z.contentDOM.removeEventListener("beforeinput",X,!0),Q?fz(Z,Q):null}class Wj{constructor(Z){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(Z.state);let J=this.editContext=new window.EditContext({text:Z.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,Z.state.selection.main.anchor))),selectionEnd:this.toContextPos(Z.state.selection.main.head)});this.handlers.textupdate=(Q)=>{let X=Z.state.selection.main,{anchor:Y,head:K}=X,q=this.toEditorPos(Q.updateRangeStart),W=this.toEditorPos(Q.updateRangeEnd);if(Z.inputState.composing>=0&&!this.composing)this.composing={contextBase:Q.updateRangeStart,editorBase:q,drifted:!1};let G=W-q>Q.text.length;if(q==this.from&&Y<this.from)q=Y;else if(W==this.to&&Y>this.to)W=Y;let I=mV(Z.state.sliceDoc(q,W),Q.text,(G?X.from:X.to)-q,G?"end":null);if(!I){let z=f.single(this.toEditorPos(Q.selectionStart),this.toEditorPos(Q.selectionEnd));if(!hJ(z,X))Z.dispatch({selection:z,userEvent:"select"});return}let U={from:I.from+q,to:I.toA+q,insert:R0.of(Q.text.slice(I.from,I.toB).split(`
`))};if((r.mac||r.android)&&U.from==K-1&&/^\. ?$/.test(Q.text)&&Z.contentDOM.getAttribute("autocorrect")=="off")U={from:q,to:W,insert:R0.of([Q.text.replace("."," ")])};if(this.pendingContextChange=U,!Z.state.readOnly){let z=this.to-this.from+(U.to-U.from+U.insert.length);m3(Z,U,f.single(this.toEditorPos(Q.selectionStart,z),this.toEditorPos(Q.selectionEnd,z)))}if(this.pendingContextChange)this.revertPending(Z.state),this.setSelection(Z.state);if(U.from<U.to&&!U.insert.length&&Z.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(J.text.slice(Math.max(0,Q.updateRangeStart-1),Math.min(J.text.length,Q.updateRangeStart+1))))this.handlers.compositionend(Q)},this.handlers.characterboundsupdate=(Q)=>{let X=[],Y=null;for(let K=this.toEditorPos(Q.rangeStart),q=this.toEditorPos(Q.rangeEnd);K<q;K++){let W=Z.coordsForChar(K);Y=W&&new DOMRect(W.left,W.top,W.right-W.left,W.bottom-W.top)||Y||new DOMRect,X.push(Y)}J.updateCharacterBounds(Q.rangeStart,X)},this.handlers.textformatupdate=(Q)=>{let X=[];for(let Y of Q.getTextFormats()){let{underlineStyle:K,underlineThickness:q}=Y;if(!/none/i.test(K)&&!/none/i.test(q)){let W=this.toEditorPos(Y.rangeStart),G=this.toEditorPos(Y.rangeEnd);if(W<G){let I=`text-decoration: underline ${/^[a-z]/.test(K)?K+" ":K=="Dashed"?"dashed ":K=="Squiggle"?"wavy ":""}${/thin/i.test(q)?1:2}px`;X.push(L0.mark({attributes:{style:I}}).range(W,G))}}}Z.dispatch({effects:DV.of(L0.set(X))})},this.handlers.compositionstart=()=>{if(Z.inputState.composing<0)Z.inputState.composing=0,Z.inputState.compositionFirstChange=!0},this.handlers.compositionend=()=>{if(Z.inputState.composing=-1,Z.inputState.compositionFirstChange=null,this.composing){let{drifted:Q}=this.composing;if(this.composing=null,Q)this.reset(Z.state)}};for(let Q in this.handlers)J.addEventListener(Q,this.handlers[Q]);this.measureReq={read:(Q)=>{let X=j5(Q.root);if(X&&X.rangeCount)this.editContext.updateSelectionBounds(X.getRangeAt(0).getBoundingClientRect())}}}applyEdits(Z){let J=0,Q=!1,X=this.pendingContextChange;if(Z.changes.iterChanges((Y,K,q,W,G)=>{if(Q)return;let I=G.length-(K-Y);if(X&&K>=X.to)if(X.from==Y&&X.to==K&&X.insert.eq(G)){X=this.pendingContextChange=null,J+=I,this.to+=I;return}else X=null,this.revertPending(Z.state);if(Y+=J,K+=J,K<=this.from)this.from+=I,this.to+=I;else if(Y<this.to){if(Y<this.from||K>this.to||this.to-this.from+G.length>30000){Q=!0;return}this.editContext.updateText(this.toContextPos(Y),this.toContextPos(K),G.toString()),this.to+=I}J+=I}),X&&!Q)this.revertPending(Z.state);return!Q}update(Z){let J=this.pendingContextChange,Q=Z.startState.selection.main;if(this.composing&&(this.composing.drifted||!Z.changes.touchesRange(Q.from,Q.to)&&Z.transactions.some((X)=>!X.isUserEvent("input.type")&&X.changes.touchesRange(this.from,this.to))))this.composing.drifted=!0,this.composing.editorBase=Z.changes.mapPos(this.composing.editorBase);else if(!this.applyEdits(Z)||!this.rangeIsValid(Z.state))this.pendingContextChange=null,this.reset(Z.state);else if(Z.docChanged||Z.selectionSet||J)this.setSelection(Z.state);if(Z.geometryChanged||Z.docChanged||Z.selectionSet)Z.view.requestMeasure(this.measureReq)}resetRange(Z){let{head:J}=Z.selection.main;this.from=Math.max(0,J-1e4),this.to=Math.min(Z.doc.length,J+1e4)}reset(Z){this.resetRange(Z),this.editContext.updateText(0,this.editContext.text.length,Z.doc.sliceString(this.from,this.to)),this.setSelection(Z)}revertPending(Z){let J=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(J.from),this.toContextPos(J.from+J.insert.length),Z.doc.sliceString(J.from,J.to))}setSelection(Z){let{main:J}=Z.selection,Q=this.toContextPos(Math.max(this.from,Math.min(this.to,J.anchor))),X=this.toContextPos(J.head);if(this.editContext.selectionStart!=Q||this.editContext.selectionEnd!=X)this.editContext.updateSelection(Q,X)}rangeIsValid(Z){let{head:J}=Z.selection.main;return!(this.from>0&&J-this.from<500||this.to<Z.doc.length&&this.to-J<500||this.to-this.from>30000)}toEditorPos(Z,J=this.to-this.from){Z=Math.min(Z,J);let Q=this.composing;return Q&&Q.drifted?Q.editorBase+(Z-Q.contextBase):Z+this.from}toContextPos(Z){let J=this.composing;return J&&J.drifted?J.contextBase+(Z-J.editorBase):Z-this.from}destroy(){for(let Z in this.handlers)this.editContext.removeEventListener(Z,this.handlers[Z])}}class K0{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(Z={}){var J;if(this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),Z.parent)Z.parent.appendChild(this.dom);let{dispatch:Q}=Z;if(this.dispatchTransactions=Z.dispatchTransactions||Q&&((X)=>X.forEach((Y)=>Q(Y,this)))||((X)=>this.update(X)),this.dispatch=this.dispatch.bind(this),this._root=Z.root||CR(Z.parent)||document,this.viewState=new S3(this,Z.state||D0.create(Z)),Z.scrollTo&&Z.scrollTo.is(jJ))this.viewState.scrollTarget=Z.scrollTo.value.clip(this.viewState.state);this.plugins=this.state.facet(y9).map((X)=>new LJ(X));for(let X of this.plugins)X.update(this);if(this.observer=new qj(this),this.inputState=new nV(this),this.inputState.ensureHandlers(this.plugins),this.docView=new M3(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),(J=document.fonts)===null||J===void 0?void 0:J.ready)document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...Z){let J=Z.length==1&&Z[0]instanceof o0?Z:Z.length==1&&Array.isArray(Z[0])?Z[0]:[this.state.update(...Z)];this.dispatchTransactions(J,this)}update(Z){if(this.updateState!=0)throw Error("Calls to EditorView.update are not allowed while an update is in progress");let J=!1,Q=!1,X,Y=this.state;for(let z of Z){if(z.startState!=Y)throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");Y=z.state}if(this.destroyed){this.viewState.state=Y;return}let K=this.hasFocus,q=0,W=null;if(Z.some((z)=>z.annotation(rV)))this.inputState.notifiedFocused=K,q=1;else if(K!=this.inputState.notifiedFocused){if(this.inputState.notifiedFocused=K,W=aV(Y,K),!W)q=1}let G=this.observer.delayedAndroidKey,I=null;if(G){if(this.observer.clearDelayedAndroidKey(),I=this.observer.readChange(),I&&!this.state.doc.eq(Y.doc)||!this.state.selection.eq(Y.selection))I=null}else this.observer.clear();if(Y.facet(D0.phrases)!=this.state.facet(D0.phrases))return this.setState(Y);X=bJ.create(this,Y,Z),X.flags|=q;let U=this.viewState.scrollTarget;try{this.updateState=2;for(let z of Z){if(U)U=U.map(z.changes);if(z.scrollIntoView){let{main:V}=z.state.selection,{x:F,y:H}=this.state.facet(K0.cursorScrollMargin);U=new f9(V.empty?V:f.cursor(V.head,V.head>V.anchor?-1:1),"nearest","nearest",H,F)}for(let V of z.effects)if(V.is(jJ))U=V.value.clip(this.state)}if(this.viewState.update(X,U),this.bidiCache=gJ.update(this.bidiCache,X.changes),!X.empty)this.updatePlugins(X),this.inputState.update(X);if(J=this.docView.update(X),this.state.facet(K5)!=this.styleModules)this.mountStyles();Q=this.updateAttrs(),this.showAnnouncements(Z),this.docView.updateSelection(J,Z.some((z)=>z.isUserEvent("select.pointer")))}finally{this.updateState=0}if(X.startState.facet(RJ)!=X.state.facet(RJ))this.viewState.mustMeasureContent=!0;if(J||Q||U||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)this.requestMeasure();if(J)this.docViewUpdate();if(!X.empty)for(let z of this.state.facet(R3))try{z(X)}catch(V){l1(this.state,V,"update listener")}if(W||I)Promise.resolve().then(()=>{if(W&&this.state==W.startState)this.dispatch(W);if(I){if(!vV(this,I)&&G.force)g9(this.contentDOM,G.key,G.keyCode)}})}setState(Z){if(this.updateState!=0)throw Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=Z;return}this.updateState=2;let J=this.hasFocus;try{for(let Q of this.plugins)Q.destroy(this);this.viewState=new S3(this,Z),this.plugins=Z.facet(y9).map((Q)=>new LJ(Q)),this.pluginMap.clear();for(let Q of this.plugins)Q.update(this);this.docView.destroy(),this.docView=new M3(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}if(J)this.focus();this.requestMeasure()}updatePlugins(Z){let J=Z.startState.facet(y9),Q=Z.state.facet(y9);if(J!=Q){let X=[];for(let Y of Q){let K=J.indexOf(Y);if(K<0)X.push(new LJ(Y));else{let q=this.plugins[K];q.mustUpdate=Z,X.push(q)}}for(let Y of this.plugins)if(Y.mustUpdate!=Z)Y.destroy(this);this.plugins=X,this.pluginMap.clear()}else for(let X of this.plugins)X.mustUpdate=Z;for(let X=0;X<this.plugins.length;X++)this.plugins[X].update(this);if(J!=Q)this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let Z of this.plugins){let J=Z.value;if(J&&J.docViewUpdate)try{J.docViewUpdate(this)}catch(Q){l1(this.state,Q,"doc view update listener")}}}measure(Z=!0){if(this.destroyed)return;if(this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);if(this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}if(this.measureScheduled=0,Z)this.observer.forceFlush();let J=null,Q=this.viewState.scrollParent,X=this.viewState.getScrollOffset(),{scrollAnchorPos:Y,scrollAnchorHeight:K}=this.viewState;if(Math.abs(X-this.viewState.scrollOffset)>1)K=-1;this.viewState.scrollAnchorHeight=-1;try{for(let q=0;;q++){if(K<0)if(YV(Q||this.win))Y=-1,K=this.viewState.heightMap.height;else{let V=this.viewState.scrollAnchorAt(X);Y=V.from,K=V.top}this.updateState=1;let W=this.viewState.measure();if(!W&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(q>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let G=[];if(!(W&4))[this.measureRequests,G]=[G,this.measureRequests];let I=G.map((V)=>{try{return V.read(this)}catch(F){return l1(this.state,F),uz}}),U=bJ.create(this,this.state,[]),z=!1;if(U.flags|=W,!J)J=U;else J.flags|=W;if(this.updateState=2,!U.empty){if(this.updatePlugins(U),this.inputState.update(U),this.updateAttrs(),z=this.docView.update(U),z)this.docViewUpdate()}for(let V=0;V<G.length;V++)if(I[V]!=uz)try{let F=G[V];if(F.write)F.write(I[V],this)}catch(F){l1(this.state,F)}if(z)this.docView.updateSelection(!0);if(!U.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,K=-1;continue}else{let F=((Y<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(Y).top)-K)/this.scaleY;if((F>1||F<-1)&&!(r.ios&&this.inputState.lastIOSMomentumScroll>Date.now()-100)&&(Q==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){if(X=X+F,Q)Q.scrollTop+=F;else this.win.scrollBy(0,F);K=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(J&&!J.empty)for(let q of this.state.facet(R3))q(J)}get themeClasses(){return E3+" "+(this.state.facet(T3)?Yj:Xj)+" "+this.state.facet(RJ)}updateAttrs(){let Z=vz(this,BV,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),J={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:!this.state.facet(B8)?"false":"true",class:"cm-content",style:`${r.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};if(this.state.readOnly)J["aria-readonly"]="true";vz(this,f3,J);let Q=this.observer.ignore(()=>{let X=Rz(this.contentDOM,this.contentAttrs,J),Y=Rz(this.dom,this.editorAttrs,Z);return X||Y});return this.editorAttrs=Z,this.contentAttrs=J,Q}showAnnouncements(Z){let J=!0;for(let Q of Z)for(let X of Q.effects)if(X.is(K0.announce)){if(J)this.announceDOM.textContent="";J=!1;let Y=this.announceDOM.appendChild(document.createElement("div"));Y.textContent=X.value}}mountStyles(){this.styleModules=this.state.facet(K5);let Z=this.state.facet(K0.cspNonce);P6.mount(this.root,this.styleModules.concat(bM).reverse(),Z?{nonce:Z}:void 0)}readMeasured(){if(this.updateState==2)throw Error("Reading the editor layout isn't allowed during an update");if(this.updateState==0&&this.measureScheduled>-1)this.measure(!1)}requestMeasure(Z){if(this.measureScheduled<0)this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure());if(Z){if(this.measureRequests.indexOf(Z)>-1)return;if(Z.key!=null){for(let J=0;J<this.measureRequests.length;J++)if(this.measureRequests[J].key===Z.key){this.measureRequests[J]=Z;return}}this.measureRequests.push(Z)}}plugin(Z){let J=this.pluginMap.get(Z);if(J===void 0||J&&J.plugin!=Z)this.pluginMap.set(Z,J=this.plugins.find((Q)=>Q.plugin==Z)||null);return J&&J.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(Z){return this.readMeasured(),this.viewState.elementAtHeight(Z)}lineBlockAtHeight(Z){return this.readMeasured(),this.viewState.lineBlockAtHeight(Z)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(Z){return this.viewState.lineBlockAt(Z)}get contentHeight(){return this.viewState.contentHeight}moveByChar(Z,J,Q){return K3(this,Z,Pz(this,Z,J,Q))}moveByGroup(Z,J){return K3(this,Z,Pz(this,Z,J,(Q)=>XM(this,Z.head,Q)))}visualLineSide(Z,J){let Q=this.bidiSpans(Z),X=this.textDirectionAt(Z.from),Y=Q[J?Q.length-1:0];return f.cursor(Y.side(J,X)+Z.from,Y.forward(!J,X)?1:-1)}moveToLineBoundary(Z,J,Q=!0){return QM(this,Z,J,Q)}moveVertically(Z,J,Q){return K3(this,Z,YM(this,Z,J,Q))}domAtPos(Z,J=1){return this.docView.domAtPos(Z,J)}posAtDOM(Z,J=0){return this.docView.posFromDOM(Z,J)}posAtCoords(Z,J=!0){this.readMeasured();let Q=B3(this,Z,J);return Q&&Q.pos}posAndSideAtCoords(Z,J=!0){return this.readMeasured(),B3(this,Z,J)}coordsAtPos(Z,J=1){this.readMeasured();let Q=this.state.doc.lineAt(Z),X=this.bidiSpans(Q),Y=X[C6.find(X,Z-Q.from,-1,J)];return this.docView.coordsAt(Z,J,Y.dir==w0.RTL)}coordsForChar(Z){return this.readMeasured(),this.docView.coordsForChar(Z)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(Z){if(!this.state.facet(RV)||Z<this.viewport.from||Z>this.viewport.to)return this.textDirection;return this.readMeasured(),this.docView.textDirectionAt(Z)}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(Z){if(Z.length>$M)return UV(Z.length);let J=this.textDirectionAt(Z.from),Q;for(let Y of this.bidiCache)if(Y.from==Z.from&&Y.dir==J&&(Y.fresh||IV(Y.isolates,Q=Dz(this,Z))))return Y.order;if(!Q)Q=Dz(this,Z);let X=$R(Z.text,J,Q);return this.bidiCache.push(new gJ(Z.from,Z.to,J,Q,!0,X)),X}get hasFocus(){var Z;return(this.dom.ownerDocument.hasFocus()||r.safari&&((Z=this.inputState)===null||Z===void 0?void 0:Z.lastContextMenu)>Date.now()-30000)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{XV(this.contentDOM),this.docView.updateSelection()})}setRoot(Z){if(this._root!=Z)this._root=Z,this.observer.setWindow((Z.nodeType==9?Z:Z.ownerDocument).defaultView||window),this.mountStyles()}destroy(){if(this.root.activeElement==this.contentDOM)this.contentDOM.blur();for(let Z of this.plugins)Z.destroy(this);if(this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1)this.win.cancelAnimationFrame(this.measureScheduled);this.destroyed=!0}static scrollIntoView(Z,J={}){var Q,X,Y,K;return jJ.of(new f9(typeof Z=="number"?f.cursor(Z):Z,(Q=J.y)!==null&&Q!==void 0?Q:"nearest",(X=J.x)!==null&&X!==void 0?X:"nearest",(Y=J.yMargin)!==null&&Y!==void 0?Y:5,(K=J.xMargin)!==null&&K!==void 0?K:5))}scrollSnapshot(){let{scrollTop:Z,scrollLeft:J}=this.scrollDOM,Q=this.viewState.scrollAnchorAt(Z);return jJ.of(new f9(f.cursor(Q.from),"start","start",Q.top-Z,J,!0))}setTabFocusMode(Z){if(Z==null)this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1;else if(typeof Z=="boolean")this.inputState.tabFocusMode=Z?0:-1;else if(this.inputState.tabFocusMode!=0)this.inputState.tabFocusMode=Date.now()+Z}static domEventHandlers(Z){return M1.define(()=>({}),{eventHandlers:Z})}static domEventObservers(Z){return M1.define(()=>({}),{eventObservers:Z})}static theme(Z,J){let Q=P6.newName(),X=[RJ.of(Q),K5.of(C3(`.${Q}`,Z))];if(J&&J.dark)X.push(T3.of(!0));return X}static baseTheme(Z){return M8.lowest(K5.of(C3("."+E3,Z,Kj)))}static findFromDOM(Z){var J;let Q=Z.querySelector(".cm-content"),X=Q&&c0.get(Q)||c0.get(Z);return((J=X===null||X===void 0?void 0:X.root)===null||J===void 0?void 0:J.view)||null}}K0.styleModule=K5;K0.inputHandler=HV;K0.clipboardInputFilter=$3;K0.clipboardOutputFilter=g3;K0.scrollHandler=AV;K0.focusChangeEffect=NV;K0.perLineTextDirection=RV;K0.exceptionSink=OV;K0.updateListener=R3;K0.editable=B8;K0.mouseSelectionStyle=FV;K0.dragMovesSelection=jV;K0.clickAddsSelectionRange=VV;K0.decorations=vJ;K0.blockWrappers=LV;K0.outerDecorations=u3;K0.atomicRanges=R5;K0.bidiIsolatedRanges=PV;K0.cursorScrollMargin=o.define({combine:(Z)=>{let J=5,Q=5;for(let X of Z)if(typeof X=="number")J=Q=X;else({x:J,y:Q}=X);return{x:J,y:Q}}});K0.scrollMargins=SV;K0.darkTheme=T3;K0.cspNonce=o.define({combine:(Z)=>Z.length?Z[0]:""});K0.contentAttributes=f3;K0.editorAttributes=BV;K0.lineWrapping=K0.contentAttributes.of({class:"cm-lineWrapping"});K0.announce=B0.define();var $M=4096,uz={};class gJ{constructor(Z,J,Q,X,Y,K){this.from=Z,this.to=J,this.dir=Q,this.isolates=X,this.fresh=Y,this.order=K}static update(Z,J){if(J.empty&&!Z.some((Y)=>Y.fresh))return Z;let Q=[],X=Z.length?Z[Z.length-1].dir:w0.LTR;for(let Y=Math.max(0,Z.length-10);Y<Z.length;Y++){let K=Z[Y];if(K.dir==X&&!J.touchesRange(K.from,K.to))Q.push(new gJ(J.mapPos(K.from,1),J.mapPos(K.to,-1),K.dir,K.isolates,!1,K.order))}return Q}}function vz(Z,J,Q){for(let X=Z.state.facet(J),Y=X.length-1;Y>=0;Y--){let K=X[Y],q=typeof K=="function"?K(Z):K;if(q)b3(q,Q)}return Q}var gM=r.mac?"mac":r.windows?"win":r.linux?"linux":"key";function fM(Z,J){let Q=Z.split(/-(?!$)/),X=Q[Q.length-1];if(X=="Space")X=" ";let Y,K,q,W;for(let G=0;G<Q.length-1;++G){let I=Q[G];if(/^(cmd|meta|m)$/i.test(I))W=!0;else if(/^a(lt)?$/i.test(I))Y=!0;else if(/^(c|ctrl|control)$/i.test(I))K=!0;else if(/^s(hift)?$/i.test(I))q=!0;else if(/^mod$/i.test(I))if(J=="mac")W=!0;else K=!0;else throw Error("Unrecognized modifier name: "+I)}if(Y)X="Alt-"+X;if(K)X="Ctrl-"+X;if(W)X="Meta-"+X;if(q)X="Shift-"+X;return X}function MJ(Z,J,Q){if(J.altKey)Z="Alt-"+Z;if(J.ctrlKey)Z="Ctrl-"+Z;if(J.metaKey)Z="Meta-"+Z;if(Q!==!1&&J.shiftKey)Z="Shift-"+Z;return Z}var uM=M8.default(K0.domEventHandlers({keydown(Z,J){return pM(vM(J.state),Z,J,"editor")}})),nJ=o.define({enables:uM}),mz=new WeakMap;function vM(Z){let J=Z.facet(nJ),Q=mz.get(J);if(!Q)mz.set(J,Q=nM(J.reduce((X,Y)=>X.concat(Y),[])));return Q}var i8=null,mM=4000;function nM(Z,J=gM){let Q=Object.create(null),X=Object.create(null),Y=(q,W)=>{let G=X[q];if(G==null)X[q]=W;else if(G!=W)throw Error("Key binding "+q+" is used both as a regular binding and as a multi-stroke prefix")},K=(q,W,G,I,U)=>{var z,V;let F=Q[q]||(Q[q]=Object.create(null)),H=W.split(/ (?!$)/).map((T)=>fM(T,J));for(let T=1;T<H.length;T++){let E=H.slice(0,T).join(" ");if(Y(E,!0),!F[E])F[E]={preventDefault:!0,stopPropagation:!1,run:[(_)=>{let k=i8={view:_,prefix:E,scope:q};return setTimeout(()=>{if(i8==k)i8=null},mM),!0}]}}let N=H.join(" ");Y(N,!1);let R=F[N]||(F[N]={preventDefault:!1,stopPropagation:!1,run:((V=(z=F._any)===null||z===void 0?void 0:z.run)===null||V===void 0?void 0:V.slice())||[]});if(G)R.run.push(G);if(I)R.preventDefault=!0;if(U)R.stopPropagation=!0};for(let q of Z){let W=q.scope?q.scope.split(" "):["editor"];if(q.any)for(let I of W){let U=Q[I]||(Q[I]=Object.create(null));if(!U._any)U._any={preventDefault:!1,stopPropagation:!1,run:[]};let{any:z}=q;for(let V in U)U[V].run.push((F)=>z(F,_3))}let G=q[J]||q.key;if(!G)continue;for(let I of W)if(K(I,G,q.run,q.preventDefault,q.stopPropagation),q.shift)K(I,"Shift-"+G,q.shift,q.preventDefault,q.stopPropagation)}return Q}var _3=null;function pM(Z,J,Q,X){_3=J;let Y=jz(J),K=iU(Y,0),q=rU(K)==Y.length&&Y!=" ",W="",G=!1,I=!1,U=!1;if(i8&&i8.view==Q&&i8.scope==X){if(W=i8.prefix+" ",cV.indexOf(J.keyCode)<0)I=!0,i8=null}let z=new Set,V=(R)=>{if(R){for(let T of R.run)if(!z.has(T)){if(z.add(T),T(Q)){if(R.stopPropagation)U=!0;return!0}}if(R.preventDefault){if(R.stopPropagation)U=!0;I=!0}}return!1},F=Z[X],H,N;if(F){if(V(F[W+MJ(Y,J,!q)]))G=!0;else if(q&&(J.altKey||J.metaKey||J.ctrlKey)&&!(r.windows&&J.ctrlKey&&J.altKey)&&!(r.mac&&J.altKey&&!(J.ctrlKey||J.metaKey))&&(H=D8[J.keyCode])&&H!=Y){if(V(F[W+MJ(H,J,!0)]))G=!0;else if(J.shiftKey&&(N=x9[J.keyCode])!=Y&&N!=H&&V(F[W+MJ(N,J,!1)]))G=!0}else if(q&&J.shiftKey&&V(F[W+MJ(Y,J,!0)]))G=!0;if(!G&&V(F._any))G=!0}if(I)G=!0;if(G&&U)J.stopPropagation();return _3=null,G}class p7{constructor(Z,J,Q,X,Y){this.className=Z,this.left=J,this.top=Q,this.width=X,this.height=Y}draw(){let Z=document.createElement("div");return Z.className=this.className,this.adjust(Z),Z}update(Z,J){if(J.className!=this.className)return!1;return this.adjust(Z),!0}adjust(Z){if(Z.style.left=this.left+"px",Z.style.top=this.top+"px",this.width!=null)Z.style.width=this.width+"px";Z.style.height=this.height+"px"}eq(Z){return this.left==Z.left&&this.top==Z.top&&this.width==Z.width&&this.height==Z.height&&this.className==Z.className}static forRange(Z,J,Q){if(Q.empty){let X=Z.coordsAtPos(Q.head,Q.assoc||1);if(!X)return[];let Y=Gj(Z);return[new p7(J,X.left-Y.left,X.top-Y.top,null,X.bottom-X.top)]}else return cM(Z,J,Q)}}function Gj(Z){let J=Z.scrollDOM.getBoundingClientRect();return{left:(Z.textDirection==w0.LTR?J.left:J.right-Z.scrollDOM.clientWidth*Z.scaleX)-Z.scrollDOM.scrollLeft*Z.scaleX,top:J.top-Z.scrollDOM.scrollTop*Z.scaleY}}function nz(Z,J,Q,X){let Y=Z.coordsAtPos(J,Q*2);if(!Y)return X;let K=Z.dom.getBoundingClientRect(),q=(Y.top+Y.bottom)/2,W=Z.posAtCoords({x:K.left+1,y:q}),G=Z.posAtCoords({x:K.right-1,y:q});if(W==null||G==null)return X;return{from:Math.max(X.from,Math.min(W,G)),to:Math.min(X.to,Math.max(W,G))}}function cM(Z,J,Q){if(Q.to<=Z.viewport.from||Q.from>=Z.viewport.to)return[];let X=Math.max(Q.from,Z.viewport.from),Y=Math.min(Q.to,Z.viewport.to),K=Z.textDirection==w0.LTR,q=Z.contentDOM,W=q.getBoundingClientRect(),G=Gj(Z),I=q.querySelector(".cm-line"),U=I&&window.getComputedStyle(I),z=W.left+(U?parseInt(U.paddingLeft)+Math.min(0,parseInt(U.textIndent)):0),V=W.right-(U?parseInt(U.paddingRight):0),F=D3(Z,X,1),H=D3(Z,Y,-1),N=F.type==V1.Text?F:null,R=H.type==V1.Text?H:null;if(N&&(Z.lineWrapping||F.widgetLineBreaks))N=nz(Z,X,1,N);if(R&&(Z.lineWrapping||H.widgetLineBreaks))R=nz(Z,Y,-1,R);if(N&&R&&N.from==R.from&&N.to==R.to)return E(_(Q.from,Q.to,N));else{let D=N?_(Q.from,null,N):k(F,!1),S=R?_(null,Q.to,R):k(H,!0),B=[];if((N||F).to<(R||H).from-(N&&R?1:0)||F.widgetLineBreaks>1&&D.bottom+Z.defaultLineHeight/2<S.top)B.push(T(z,D.bottom,V,S.top));else if(D.bottom<S.top&&Z.elementAtHeight((D.bottom+S.top)/2).type==V1.Text)D.bottom=S.top=(D.bottom+S.top)/2;return E(D).concat(B).concat(E(S))}function T(D,S,B,C){return new p7(J,D-G.left,S-G.top,Math.max(0,B-D),C-S)}function E({top:D,bottom:S,horizontal:B}){let C=[];for(let M=0;M<B.length;M+=2)C.push(T(B[M],D,B[M+1],S));return C}function _(D,S,B){let C=1e9,M=-1e9,s=[];function v(e,Z0,q0,G0,J0){let t=Z.coordsAtPos(e,e==B.to?-2:2),m=Z.coordsAtPos(q0,q0==B.from?2:-2);if(!t||!m)return;if(C=Math.min(t.top,m.top,C),M=Math.max(t.bottom,m.bottom,M),J0==w0.LTR)s.push(K&&Z0?z:t.left,K&&G0?V:m.right);else s.push(!K&&G0?z:m.left,!K&&Z0?V:t.right)}let p=D!==null&&D!==void 0?D:B.from,W0=S!==null&&S!==void 0?S:B.to;for(let e of Z.visibleRanges)if(e.to>p&&e.from<W0)for(let Z0=Math.max(e.from,p),q0=Math.min(e.to,W0);;){let G0=Z.state.doc.lineAt(Z0);for(let J0 of Z.bidiSpans(G0)){let t=J0.from+G0.from,m=J0.to+G0.from;if(t>=q0)break;if(m>Z0)v(Math.max(t,Z0),D==null&&t<=p,Math.min(m,q0),S==null&&m>=W0,J0.dir)}if(Z0=G0.to+1,Z0>=q0)break}if(s.length==0)v(p,D==null,W0,S==null,Z.textDirection);return{top:C,bottom:M,horizontal:s}}function k(D,S){let B=W.top+(S?D.top:D.bottom);return{top:B,bottom:B,horizontal:[]}}}function dM(Z,J){return Z.constructor==J.constructor&&Z.eq(J)}class Ij{constructor(Z,J){if(this.view=Z,this.layer=J,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=Z.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),J.above)this.dom.classList.add("cm-layer-above");if(J.class)this.dom.classList.add(J.class);if(this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(Z.state),Z.requestMeasure(this.measureReq),J.mount)J.mount(this.dom,Z)}update(Z){if(Z.startState.facet(EJ)!=Z.state.facet(EJ))this.setOrder(Z.state);if(this.layer.update(Z,this.dom)||Z.geometryChanged)this.scale(),Z.view.requestMeasure(this.measureReq)}docViewUpdate(Z){if(this.layer.updateOnDocViewUpdate!==!1)Z.requestMeasure(this.measureReq)}setOrder(Z){let J=0,Q=Z.facet(EJ);while(J<Q.length&&Q[J]!=this.layer)J++;this.dom.style.zIndex=String((this.layer.above?150:-1)-J)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:Z,scaleY:J}=this.view;if(Z!=this.scaleX||J!=this.scaleY)this.scaleX=Z,this.scaleY=J,this.dom.style.transform=`scale(${1/Z}, ${1/J})`}draw(Z){if(Z.length!=this.drawn.length||Z.some((J,Q)=>!dM(J,this.drawn[Q]))){let J=this.dom.firstChild,Q=0;for(let X of Z)if(X.update&&J&&X.constructor&&this.drawn[Q].constructor&&X.update(J,this.drawn[Q]))J=J.nextSibling,Q++;else this.dom.insertBefore(X.draw(),J);while(J){let X=J.nextSibling;J.remove(),J=X}if(this.drawn=Z,r.webkit)this.dom.style.display=this.dom.firstChild?"":"none"}}destroy(){if(this.layer.destroy)this.layer.destroy(this.dom,this.view);this.dom.remove()}}var EJ=o.define();function Uj(Z){return[M1.define((J)=>new Ij(J,Z)),EJ.of(Z)]}var m9=o.define({combine(Z){return A8(Z,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(J,Q)=>Math.min(J,Q),drawRangeCursor:(J,Q)=>J||Q})}});function zj(Z={}){return[m9.of(Z),lM,sM,rM,MV.of(!0)]}function Vj(Z){return Z.startState.facet(m9)!=Z.state.facet(m9)}var lM=Uj({above:!0,markers(Z){let{state:J}=Z,Q=J.facet(m9),X=[];for(let Y of J.selection.ranges){let K=Y==J.selection.main;if(Y.empty||Q.drawRangeCursor&&!(K&&r.ios&&Q.iosSelectionHandles)){let q=K?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",W=Y.empty?Y:f.cursor(Y.head,Y.assoc);for(let G of p7.forRange(Z,q,W))X.push(G)}}return X},update(Z,J){if(Z.transactions.some((X)=>X.selection))J.style.animationName=J.style.animationName=="cm-blink"?"cm-blink2":"cm-blink";let Q=Vj(Z);if(Q)pz(Z.state,J);return Z.docChanged||Z.selectionSet||Q},mount(Z,J){pz(J.state,Z)},class:"cm-cursorLayer"});function pz(Z,J){J.style.animationDuration=Z.facet(m9).cursorBlinkRate+"ms"}var sM=Uj({above:!1,markers(Z){let J=[],{main:Q,ranges:X}=Z.state.selection;for(let Y of X)if(!Y.empty)for(let K of p7.forRange(Z,"cm-selectionBackground",Y))J.push(K);if(r.ios&&!Q.empty&&Z.state.facet(m9).iosSelectionHandles){for(let Y of p7.forRange(Z,"cm-selectionHandle cm-selectionHandle-start",f.cursor(Q.from,1)))J.push(Y);for(let Y of p7.forRange(Z,"cm-selectionHandle cm-selectionHandle-end",f.cursor(Q.to,1)))J.push(Y)}return J},update(Z,J){return Z.docChanged||Z.selectionSet||Z.viewportChanged||Vj(Z)},class:"cm-selectionLayer"}),iM=r.gecko&&r.gecko_version==153?"#ffffff01":"transparent",rM=M8.highest(K0.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:`${iM} !important`},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var Gx=/x/.unicode!=null?"gu":"g";function jj(){return oM}var aM=L0.line({class:"cm-activeLine"}),oM=M1.fromClass(class{constructor(Z){this.decorations=this.getDeco(Z)}update(Z){if(Z.docChanged||Z.selectionSet)this.decorations=this.getDeco(Z.view)}getDeco(Z){let J=-1,Q=[];for(let X of Z.state.selection.ranges){let Y=Z.lineBlockAt(X.head);if(Y.from>J)Q.push(aM.range(Y.from)),J=Y.from}return L0.set(Q)}},{decorations:(Z)=>Z.decorations});var AJ="-10000px";class d3{constructor(Z,J,Q,X){this.facet=J,this.createTooltipView=Q,this.removeTooltipView=X,this.input=Z.state.facet(J),this.tooltips=this.input.filter((K)=>K);let Y=null;this.tooltipViews=this.tooltips.map((K)=>Y=Q(K,Y))}update(Z,J){var Q;let X=Z.state.facet(this.facet),Y=X.filter((W)=>W);if(X===this.input){for(let W of this.tooltipViews)if(W.update)W.update(Z);return!1}let K=[],q=J?[]:null;for(let W=0;W<Y.length;W++){let G=Y[W],I=-1;if(!G)continue;for(let U=0;U<this.tooltips.length;U++){let z=this.tooltips[U];if(z&&z.create==G.create)I=U}if(I<0){if(K[W]=this.createTooltipView(G,W?K[W-1]:null),q)q[W]=!!G.above}else{let U=K[W]=this.tooltipViews[I];if(q)q[W]=J[I];if(U.update)U.update(Z)}}for(let W of this.tooltipViews)if(K.indexOf(W)<0)this.removeTooltipView(W),(Q=W.destroy)===null||Q===void 0||Q.call(W);if(J)q.forEach((W,G)=>J[G]=W),J.length=q.length;return this.input=X,this.tooltips=Y,this.tooltipViews=K,!0}}function tM(Z){let J=Z.dom.ownerDocument.documentElement;return{top:0,left:0,bottom:J.clientHeight,right:J.clientWidth}}var W3=o.define({combine:(Z)=>{var J,Q,X;return{position:r.ios?"absolute":((J=Z.find((Y)=>Y.position))===null||J===void 0?void 0:J.position)||"fixed",parent:((Q=Z.find((Y)=>Y.parent))===null||Q===void 0?void 0:Q.parent)||null,tooltipSpace:((X=Z.find((Y)=>Y.tooltipSpace))===null||X===void 0?void 0:X.tooltipSpace)||tM}}}),cz=new WeakMap,Fj=M1.fromClass(class{constructor(Z){this.view=Z,this.above=[],this.inView=!0,this.madeAbsolute=!1,this.lastTransaction=0,this.measureTimeout=-1;let J=Z.state.facet(W3);this.position=J.position,this.parent=J.parent,this.classes=Z.themeClasses,this.createContainer(),this.measureReq={read:this.readMeasure.bind(this),write:this.writeMeasure.bind(this),key:this},this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.measureSoon()):null,this.manager=new d3(Z,l3,(Q,X)=>this.createTooltip(Q,X),(Q)=>{if(this.resizeObserver)this.resizeObserver.unobserve(Q.dom);Q.dom.remove()}),this.above=this.manager.tooltips.map((Q)=>!!Q.above),this.intersectionObserver=typeof IntersectionObserver=="function"?new IntersectionObserver((Q)=>{if(Date.now()>this.lastTransaction-50&&Q.length>0&&Q[Q.length-1].intersectionRatio<1)this.measureSoon()},{threshold:[1]}):null,this.observeIntersection(),Z.win.addEventListener("resize",this.measureSoon=this.measureSoon.bind(this)),this.maybeMeasure()}createContainer(){if(this.parent)this.container=document.createElement("div"),this.container.style.position="relative",this.container.className=this.view.themeClasses,this.parent.appendChild(this.container);else this.container=this.view.dom}observeIntersection(){if(this.intersectionObserver){this.intersectionObserver.disconnect();for(let Z of this.manager.tooltipViews)this.intersectionObserver.observe(Z.dom)}}measureSoon(){if(this.measureTimeout<0)this.measureTimeout=setTimeout(()=>{this.measureTimeout=-1,this.maybeMeasure()},50)}update(Z){if(Z.transactions.length)this.lastTransaction=Date.now();let J=this.manager.update(Z,this.above);if(J)this.observeIntersection();let Q=J||Z.geometryChanged,X=Z.state.facet(W3);if(X.position!=this.position&&!this.madeAbsolute){this.position=X.position;for(let Y of this.manager.tooltipViews)Y.dom.style.position=this.position;Q=!0}if(X.parent!=this.parent){if(this.parent)this.container.remove();this.parent=X.parent,this.createContainer();for(let Y of this.manager.tooltipViews)this.container.appendChild(Y.dom);Q=!0}else if(this.parent&&this.view.themeClasses!=this.classes)this.classes=this.container.className=this.view.themeClasses;if(Q)this.maybeMeasure()}createTooltip(Z,J){let Q=Z.create(this.view),X=J?J.dom:null;if(Q.dom.classList.add("cm-tooltip"),Z.arrow&&!Q.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")){let Y=document.createElement("div");Y.className="cm-tooltip-arrow",Q.dom.appendChild(Y)}if(Q.dom.style.position=this.position,Q.dom.style.top=AJ,Q.dom.style.left="0px",this.container.insertBefore(Q.dom,X),Q.mount)Q.mount(this.view);if(this.resizeObserver)this.resizeObserver.observe(Q.dom);return Q}destroy(){var Z,J,Q;this.view.win.removeEventListener("resize",this.measureSoon);for(let X of this.manager.tooltipViews)X.dom.remove(),(Z=X.destroy)===null||Z===void 0||Z.call(X);if(this.parent)this.container.remove();(J=this.resizeObserver)===null||J===void 0||J.disconnect(),(Q=this.intersectionObserver)===null||Q===void 0||Q.disconnect(),clearTimeout(this.measureTimeout)}readMeasure(){let Z=1,J=1,Q=!1;if(this.position=="fixed"&&this.manager.tooltipViews.length){let{dom:K}=this.manager.tooltipViews[0];if(r.safari){let q=K.getBoundingClientRect();Q=Math.abs(q.top+1e4)>1||Math.abs(q.left)>1}else Q=!!K.offsetParent&&K.offsetParent!=this.container.ownerDocument.body}if(Q||this.position=="absolute")if(this.parent){let K=this.parent.getBoundingClientRect();if(K.width&&K.height)Z=K.width/this.parent.offsetWidth,J=K.height/this.parent.offsetHeight}else({scaleX:Z,scaleY:J}=this.view.viewState);let X=this.view.scrollDOM.getBoundingClientRect(),Y=v3(this.view);return{visible:{left:X.left+Y.left,top:X.top+Y.top,right:X.right-Y.right,bottom:X.bottom-Y.bottom},parent:this.parent?this.container.getBoundingClientRect():this.view.dom.getBoundingClientRect(),pos:this.manager.tooltips.map((K,q)=>{let W=this.manager.tooltipViews[q];return W.getCoords?W.getCoords(K.pos):this.view.coordsAtPos(K.pos)}),size:this.manager.tooltipViews.map(({dom:K})=>K.getBoundingClientRect()),space:this.view.state.facet(W3).tooltipSpace(this.view),scaleX:Z,scaleY:J,makeAbsolute:Q}}writeMeasure(Z){var J;if(Z.makeAbsolute){this.madeAbsolute=!0,this.position="absolute";for(let W of this.manager.tooltipViews)W.dom.style.position="absolute"}let{visible:Q,space:X,scaleX:Y,scaleY:K}=Z,q=[];for(let W=0;W<this.manager.tooltips.length;W++){let G=this.manager.tooltips[W],I=this.manager.tooltipViews[W],{dom:U}=I,z=Z.pos[W],V=Z.size[W];if(!z||G.clip!==!1&&(z.bottom<=Math.max(Q.top,X.top)||z.top>=Math.min(Q.bottom,X.bottom)||z.right<Math.max(Q.left,X.left)-0.1||z.left>Math.min(Q.right,X.right)+0.1)){U.style.top=AJ;continue}let F=G.arrow?I.dom.querySelector(".cm-tooltip-arrow"):null,H=F?7:0,N=V.right-V.left,R=(J=cz.get(I))!==null&&J!==void 0?J:V.bottom-V.top,T=I.offset||ZA,E=this.view.textDirection==w0.LTR,_=V.width>X.right-X.left?E?X.left:X.right-V.width:E?Math.max(X.left,Math.min(z.left-(F?14:0)+T.x,X.right-N)):Math.min(Math.max(X.left,z.left-N+(F?14:0)-T.x),X.right-N),k=this.above[W];if(!G.strictSide&&(k?z.top-R-H-T.y<X.top:z.bottom+R+H+T.y>X.bottom)&&k==X.bottom-z.bottom>z.top-X.top)k=this.above[W]=!k;let D=(k?z.top-X.top:X.bottom-z.bottom)-H;if(D<R&&I.resize!==!1){if(D<this.view.defaultLineHeight){U.style.top=AJ;continue}cz.set(I,R),U.style.height=(R=D)/K+"px"}else if(U.style.height)U.style.height="";let S=k?z.top-R-H-T.y:z.bottom+H+T.y,B=_+N;if(I.overlap!==!0){for(let C of q)if(C.left<B&&C.right>_&&C.top<S+R&&C.bottom>S)S=k?C.top-R-2-H:C.bottom+H+2}if(this.position=="absolute")U.style.top=(S-Z.parent.top)/K+"px",dz(U,(_-Z.parent.left)/Y);else U.style.top=S/K+"px",dz(U,_/Y);if(F){let C=z.left+(E?T.x:-T.x)-(_+14-7);F.style.left=C/Y+"px"}if(I.overlap!==!0)q.push({left:_,top:S,right:B,bottom:S+R});if(U.classList.toggle("cm-tooltip-above",k),U.classList.toggle("cm-tooltip-below",!k),I.positioned)I.positioned(Z.space)}}maybeMeasure(){if(this.manager.tooltips.length){if(this.view.inView)this.view.requestMeasure(this.measureReq);if(this.inView!=this.view.inView){if(this.inView=this.view.inView,!this.inView)for(let Z of this.manager.tooltipViews)Z.dom.style.top=AJ}}}},{eventObservers:{scroll(){this.maybeMeasure()}}});function dz(Z,J){let Q=parseInt(Z.style.left,10);if(isNaN(Q)||Math.abs(J-Q)>1)Z.style.left=J+"px"}var eM=K0.baseTheme({".cm-tooltip":{zIndex:500,boxSizing:"border-box"},"&light .cm-tooltip":{border:"1px solid #bbb",backgroundColor:"#f5f5f5"},"&light .cm-tooltip-section:not(:first-child)":{borderTop:"1px solid #bbb"},"&dark .cm-tooltip":{backgroundColor:"#333338",color:"white"},".cm-tooltip-arrow":{height:"7px",width:"14px",position:"absolute",zIndex:-1,overflow:"hidden","&:before, &:after":{content:"''",position:"absolute",width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent"},".cm-tooltip-above &":{bottom:"-7px","&:before":{borderTop:"7px solid #bbb"},"&:after":{borderTop:"7px solid #f5f5f5",bottom:"1px"}},".cm-tooltip-below &":{top:"-7px","&:before":{borderBottom:"7px solid #bbb"},"&:after":{borderBottom:"7px solid #f5f5f5",top:"1px"}}},"&dark .cm-tooltip .cm-tooltip-arrow":{"&:before":{borderTopColor:"#333338",borderBottomColor:"#333338"},"&:after":{borderTopColor:"transparent",borderBottomColor:"transparent"}}}),ZA={x:0,y:0},l3=o.define({enables:[Fj,eM]}),fJ=o.define({combine:(Z)=>Z.reduce((J,Q)=>J.concat(Q),[])});class pJ{static create(Z){return new pJ(Z)}constructor(Z){this.view=Z,this.mounted=!1,this.dom=document.createElement("div"),this.dom.classList.add("cm-tooltip-hover"),this.manager=new d3(Z,fJ,(J,Q)=>this.createHostedView(J,Q),(J)=>J.dom.remove())}createHostedView(Z,J){let Q=Z.create(this.view);if(Q.dom.classList.add("cm-tooltip-section"),this.dom.insertBefore(Q.dom,J?J.dom.nextSibling:this.dom.firstChild),this.mounted&&Q.mount)Q.mount(this.view);return Q}mount(Z){for(let J of this.manager.tooltipViews)if(J.mount)J.mount(Z);this.mounted=!0}positioned(Z){for(let J of this.manager.tooltipViews)if(J.positioned)J.positioned(Z)}update(Z){this.manager.update(Z)}destroy(){var Z;for(let J of this.manager.tooltipViews)(Z=J.destroy)===null||Z===void 0||Z.call(J)}passProp(Z){let J=void 0;for(let Q of this.manager.tooltipViews){let X=Q[Z];if(X!==void 0){if(J===void 0)J=X;else if(J!==X)return}}return J}get offset(){return this.passProp("offset")}get getCoords(){return this.passProp("getCoords")}get overlap(){return this.passProp("overlap")}get resize(){return this.passProp("resize")}}var JA=l3.compute([fJ],(Z)=>{let J=Z.facet(fJ);if(J.length===0)return null;return{pos:Math.min(...J.map((Q)=>Q.pos)),end:Math.max(...J.map((Q)=>{var X;return(X=Q.end)!==null&&X!==void 0?X:Q.pos})),create:pJ.create,above:J[0].above,arrow:J.some((Q)=>Q.arrow)}}),QA=o.define();class Oj{constructor(Z,J,Q,X,Y,K){this.view=Z,this.source=J,this.field=Q,this.locked=X,this.setHover=Y,this.hoverTime=K,this.hoverTimeout=-1,this.restartTimeout=-1,this.pending=null,this.lastMove={x:0,y:0,target:Z.dom,time:0},this.checkHover=this.checkHover.bind(this),Z.dom.addEventListener("mouseleave",this.mouseleave=this.mouseleave.bind(this)),Z.dom.addEventListener("mousemove",this.mousemove=this.mousemove.bind(this))}update(Z){if(this.pending)this.pending=null,clearTimeout(this.restartTimeout),this.restartTimeout=setTimeout(()=>this.startHover(),20)}get active(){return this.view.state.field(this.field)}checkHover(){if(this.hoverTimeout=-1,this.active.length)return;let Z=Date.now()-this.lastMove.time;if(Z<this.hoverTime)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime-Z);else this.startHover()}startHover(){clearTimeout(this.restartTimeout);let{view:Z,lastMove:J}=this,Q=Z.docView.tile.nearest(J.target);if(!Q)return;let X,Y=1;if(Q.isWidget())X=Q.posAtStart;else{if(X=Z.posAtCoords(J),X==null)return;let K=Z.coordsAtPos(X);if(!K||J.y<K.top||J.y>K.bottom||J.x<K.left-Z.defaultCharacterWidth||J.x>K.right+Z.defaultCharacterWidth)return;let q=Z.bidiSpans(Z.state.doc.lineAt(X)).find((G)=>G.from<=X&&G.to>=X),W=q&&q.dir==w0.RTL?-1:1;Y=J.x<K.left?-W:W}this.activateHover(Z,X,Y)}activateHover(Z,J,Q,X){let Y=this.source(Z,J,Q),K=(q)=>{if(q&&!(Array.isArray(q)&&!q.length)){let W=Array.isArray(q)?q:[q];if(X)this.locked.set(W,X);Z.dispatch({effects:this.setHover.of(W)})}};if(Y&&"then"in Y){let q=this.pending={pos:J};Y.then((W)=>{if(this.pending==q)this.pending=null,K(W)},(W)=>l1(Z.state,W,"hover tooltip"))}else K(Y)}get tooltip(){let Z=this.view.plugin(Fj),J=Z?Z.manager.tooltips.findIndex((Q)=>Q.create==pJ.create):-1;return J>-1?Z.manager.tooltipViews[J]:null}mousemove(Z){var J,Q;if(this.lastMove={x:Z.clientX,y:Z.clientY,target:Z.target,time:Date.now()},this.hoverTimeout<0)this.hoverTimeout=setTimeout(this.checkHover,this.hoverTime);let{active:X,tooltip:Y}=this;if(X.length&&!this.locked.has(X)&&Y&&!XA(Y.dom,Z)||this.pending){let{pos:K}=X[0]||this.pending,q=(Q=(J=X[0])===null||J===void 0?void 0:J.end)!==null&&Q!==void 0?Q:K;if(K==q?this.view.posAtCoords(this.lastMove)!=K:!YA(this.view,K,q,Z.clientX,Z.clientY))this.view.dispatch({effects:this.setHover.of([])}),this.pending=null}}mouseleave(Z){clearTimeout(this.hoverTimeout),this.hoverTimeout=-1;let{active:J}=this;if(J.length&&!this.locked.has(J)){let{tooltip:Q}=this;if(!(Q&&Q.dom.contains(Z.relatedTarget)))this.view.dispatch({effects:this.setHover.of([])});else this.watchTooltipLeave(Q.dom)}}watchTooltipLeave(Z){let J=(Q)=>{Z.removeEventListener("mouseleave",J);let{active:X}=this;if(X.length&&!this.locked.has(X)&&!this.view.dom.contains(Q.relatedTarget))this.view.dispatch({effects:this.setHover.of([])})};Z.addEventListener("mouseleave",J)}destroy(){clearTimeout(this.hoverTimeout),clearTimeout(this.restartTimeout),this.view.dom.removeEventListener("mouseleave",this.mouseleave),this.view.dom.removeEventListener("mousemove",this.mousemove)}}var DJ=4;function XA(Z,J){let{left:Q,right:X,top:Y,bottom:K}=Z.getBoundingClientRect(),q;if(q=Z.querySelector(".cm-tooltip-arrow")){let W=q.getBoundingClientRect();Y=Math.min(W.top,Y),K=Math.max(W.bottom,K)}return J.clientX>=Q-DJ&&J.clientX<=X+DJ&&J.clientY>=Y-DJ&&J.clientY<=K+DJ}function YA(Z,J,Q,X,Y,K){let q=Z.scrollDOM.getBoundingClientRect(),W=Z.documentTop+Z.documentPadding.top+Z.contentHeight;if(q.left>X||q.right<X||q.top>Y||Math.min(q.bottom,W)<Y)return!1;let G=Z.posAtCoords({x:X,y:Y},!1);return G>=J&&G<=Q}function Hj(Z,J={}){let Q=B0.define(),X=new WeakMap,Y=R1.define({create(){return[]},update(q,W){let G=X.get(q);if(q.length){if(J.hideOnChange&&(W.docChanged||W.selection))q=[];else if(G&&G(W))q=[];else if(J.hideOn)q=q.filter((I)=>!J.hideOn(W,I))}if(W.docChanged&&q.length){let I=[];for(let U of q){let z=W.changes.mapPos(U.pos,-1,T1.TrackDel);if(z!=null){let V=Object.assign(Object.create(null),U);if(V.pos=z,V.end!=null)V.end=W.changes.mapPos(V.end);I.push(V)}}q=I}for(let I of W.effects){if(I.is(Q))q=I.value,G=void 0;if(I.is(KA)&&!I.value||I.value==Y)q=[]}if(q.length&&G)X.set(q,G);return q},provide:(q)=>fJ.from(q)}),K=M1.define((q)=>new Oj(q,Z,Y,X,Q,J.hoverTime||300));return{active:Y,extension:[Y,K,QA.of(K),JA]}}var KA=B0.define();var lz=o.define({combine(Z){let J,Q;for(let X of Z)J=J||X.topContainer,Q=Q||X.bottomContainer;return{topContainer:J,bottomContainer:Q}}});var qA=M1.fromClass(class{constructor(Z){this.input=Z.state.facet(n9),this.specs=this.input.filter((Q)=>Q),this.panels=this.specs.map((Q)=>Q(Z));let J=Z.state.facet(lz);this.top=new G5(Z,!0,J.topContainer),this.bottom=new G5(Z,!1,J.bottomContainer),this.top.sync(this.panels.filter((Q)=>Q.top)),this.bottom.sync(this.panels.filter((Q)=>!Q.top));for(let Q of this.panels)if(Q.dom.classList.add("cm-panel"),Q.mount)Q.mount()}update(Z){let J=Z.state.facet(lz);if(this.top.container!=J.topContainer)this.top.sync([]),this.top=new G5(Z.view,!0,J.topContainer);if(this.bottom.container!=J.bottomContainer)this.bottom.sync([]),this.bottom=new G5(Z.view,!1,J.bottomContainer);this.top.syncClasses(),this.bottom.syncClasses();let Q=Z.state.facet(n9);if(Q!=this.input){let X=Q.filter((G)=>G),Y=[],K=[],q=[],W=[];for(let G of X){let I=this.specs.indexOf(G),U;if(I<0)U=G(Z.view),W.push(U);else if(U=this.panels[I],U.update)U.update(Z);Y.push(U),(U.top?K:q).push(U)}this.specs=X,this.panels=Y,this.top.sync(K),this.bottom.sync(q);for(let G of W)if(G.dom.classList.add("cm-panel"),G.mount)G.mount()}else for(let X of this.panels)if(X.update)X.update(Z)}destroy(){this.top.sync([]),this.bottom.sync([])}},{provide:(Z)=>K0.scrollMargins.of((J)=>{let Q=J.plugin(Z);return Q&&{top:Q.top.scrollMargin(),bottom:Q.bottom.scrollMargin()}})});class G5{constructor(Z,J,Q){this.view=Z,this.top=J,this.container=Q,this.dom=void 0,this.classes="",this.panels=[],this.syncClasses()}sync(Z){for(let J of this.panels)if(J.destroy&&Z.indexOf(J)<0)J.destroy();this.panels=Z,this.syncDOM()}syncDOM(){if(this.panels.length==0){if(this.dom)this.dom.remove(),this.dom=void 0;return}if(!this.dom){this.dom=document.createElement("div"),this.dom.className=this.top?"cm-panels cm-panels-top":"cm-panels cm-panels-bottom";let J=this.container||this.view.dom;J.insertBefore(this.dom,this.top?J.firstChild:null)}let Z=this.dom.firstChild;for(let J of this.panels)if(J.dom.parentNode==this.dom){while(Z!=J.dom)Z=sz(Z);Z=Z.nextSibling}else this.dom.insertBefore(J.dom,Z);while(Z)Z=sz(Z)}scrollMargin(){return!this.dom||this.container?0:Math.max(0,this.top?this.dom.getBoundingClientRect().bottom-Math.max(0,this.view.scrollDOM.getBoundingClientRect().top):Math.min(innerHeight,this.view.scrollDOM.getBoundingClientRect().bottom)-this.dom.getBoundingClientRect().top)}syncClasses(){if(!this.container||this.classes==this.view.themeClasses)return;for(let Z of this.classes.split(" "))if(Z)this.container.classList.remove(Z);for(let Z of(this.classes=this.view.themeClasses).split(" "))if(Z)this.container.classList.add(Z)}}function sz(Z){let J=Z.nextSibling;return Z.remove(),J}var n9=o.define({enables:qA});class i6 extends N8{compare(Z){return this==Z||this.constructor==Z.constructor&&this.eq(Z)}eq(Z){return!1}destroy(Z){}}i6.prototype.elementClass="";i6.prototype.toDOM=void 0;i6.prototype.mapMode=T1.TrackBefore;i6.prototype.startSide=i6.prototype.endSide=-1;i6.prototype.point=!0;var G3=o.define(),WA=o.define();var CJ=o.define();var w3=o.define({combine:(Z)=>Z.some((J)=>J)});function GA(Z){let J=[IA];if(Z&&Z.fixed===!1)J.push(w3.of(!0));return J}var IA=M1.fromClass(class{constructor(Z){this.view=Z,this.domAfter=null,this.prevViewport=Z.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=Z.state.facet(CJ).map((J)=>new x3(Z,J)),this.fixed=!Z.state.facet(w3);for(let J of this.gutters)if(J.config.side=="after")this.getDOMAfter().appendChild(J.dom);else this.dom.appendChild(J.dom);if(this.fixed)this.dom.style.position="sticky";this.syncGutters(!1),Z.scrollDOM.insertBefore(this.dom,Z.contentDOM)}getDOMAfter(){if(!this.domAfter)this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter);return this.domAfter}update(Z){if(this.updateGutters(Z)){let J=this.prevViewport,Q=Z.view.viewport,X=Math.min(J.to,Q.to)-Math.max(J.from,Q.from);this.syncGutters(X<(Q.to-Q.from)*0.8)}if(Z.geometryChanged){let J=this.view.contentHeight/this.view.scaleY+"px";if(this.dom.style.minHeight=J,this.domAfter)this.domAfter.style.minHeight=J}if(this.view.state.facet(w3)!=!this.fixed){if(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter)this.domAfter.style.position=this.fixed?"sticky":""}this.prevViewport=Z.view.viewport}syncGutters(Z){let J=this.dom.nextSibling;if(Z){if(this.dom.remove(),this.domAfter)this.domAfter.remove()}let Q=N0.iter(this.view.state.facet(G3),this.view.viewport.from),X=[],Y=this.gutters.map((K)=>new Nj(K,this.view.viewport,-this.view.documentPadding.top));for(let K of this.view.viewportLineBlocks){if(X.length)X=[];if(Array.isArray(K.type)){let q=!0;for(let W of K.type)if(W.type==V1.Text&&q){k3(Q,X,W.from);for(let G of Y)G.line(this.view,W,X);q=!1}else if(W.widget)for(let G of Y)G.widget(this.view,W)}else if(K.type==V1.Text){k3(Q,X,K.from);for(let q of Y)q.line(this.view,K,X)}else if(K.widget)for(let q of Y)q.widget(this.view,K)}for(let K of Y)K.finish();if(Z){if(this.view.scrollDOM.insertBefore(this.dom,J),this.domAfter)this.view.scrollDOM.appendChild(this.domAfter)}}updateGutters(Z){let J=Z.startState.facet(CJ),Q=Z.state.facet(CJ),X=Z.docChanged||Z.heightChanged||Z.viewportChanged||!N0.eq(Z.startState.facet(G3),Z.state.facet(G3),Z.view.viewport.from,Z.view.viewport.to);if(J==Q){for(let Y of this.gutters)if(Y.update(Z))X=!0}else{X=!0;let Y=[];for(let K of Q){let q=J.indexOf(K);if(q<0)Y.push(new x3(this.view,K));else this.gutters[q].update(Z),Y.push(this.gutters[q])}for(let K of this.gutters)if(K.dom.remove(),Y.indexOf(K)<0)K.destroy();for(let K of Y)if(K.config.side=="after")this.getDOMAfter().appendChild(K.dom);else this.dom.appendChild(K.dom);this.gutters=Y}return X}destroy(){for(let Z of this.gutters)Z.destroy();if(this.dom.remove(),this.domAfter)this.domAfter.remove()}},{provide:(Z)=>K0.scrollMargins.of((J)=>{let Q=J.plugin(Z);if(!Q||Q.gutters.length==0||!Q.fixed)return null;let X=Q.dom.offsetWidth*J.scaleX,Y=Q.domAfter?Q.domAfter.offsetWidth*J.scaleX:0;return J.textDirection==w0.LTR?{left:X,right:Y}:{right:X,left:Y}})});function iz(Z){return Array.isArray(Z)?Z:[Z]}function k3(Z,J,Q){while(Z.value&&Z.from<=Q){if(Z.from==Q)J.push(Z.value);Z.next()}}class Nj{constructor(Z,J,Q){this.gutter=Z,this.height=Q,this.i=0,this.cursor=N0.iter(Z.markers,J.from)}addElement(Z,J,Q){let{gutter:X}=this,Y=(J.top-this.height)/Z.scaleY,K=J.height/Z.scaleY;if(this.i==X.elements.length){let q=new s3(Z,K,Y,Q);X.elements.push(q),X.dom.appendChild(q.dom)}else X.elements[this.i].update(Z,K,Y,Q);this.height=J.bottom,this.i++}line(Z,J,Q){let X=[];if(k3(this.cursor,X,J.from),Q.length)X=X.concat(Q);let Y=this.gutter.config.lineMarker(Z,J,X);if(Y)X.unshift(Y);let K=this.gutter;if(X.length==0&&!K.config.renderEmptyElements)return;this.addElement(Z,J,X)}widget(Z,J){let Q=this.gutter.config.widgetMarker(Z,J.widget,J),X=Q?[Q]:null;for(let Y of Z.state.facet(WA)){let K=Y(Z,J.widget,J);if(K)(X||(X=[])).push(K)}if(X)this.addElement(Z,J,X)}finish(){let Z=this.gutter;while(Z.elements.length>this.i){let J=Z.elements.pop();Z.dom.removeChild(J.dom),J.destroy()}}}class x3{constructor(Z,J){this.view=Z,this.config=J,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let Q in J.domEventHandlers)this.dom.addEventListener(Q,(X)=>{let Y=X.target,K;if(Y!=this.dom&&this.dom.contains(Y)){while(Y.parentNode!=this.dom)Y=Y.parentNode;let W=Y.getBoundingClientRect();K=(W.top+W.bottom)/2}else K=X.clientY;let q=Z.lineBlockAtHeight(K-Z.documentTop);if(J.domEventHandlers[Q](Z,q,X))X.preventDefault()});if(this.markers=iz(J.markers(Z)),J.initialSpacer)this.spacer=new s3(Z,0,0,[J.initialSpacer(Z)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none"}update(Z){let J=this.markers;if(this.markers=iz(this.config.markers(Z.view)),this.spacer&&this.config.updateSpacer){let X=this.config.updateSpacer(this.spacer.markers[0],Z);if(X!=this.spacer.markers[0])this.spacer.update(Z.view,0,0,[X])}let Q=Z.view.viewport;return!N0.eq(this.markers,J,Q.from,Q.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(Z):!1)}destroy(){for(let Z of this.elements)Z.destroy()}}class s3{constructor(Z,J,Q,X){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(Z,J,Q,X)}update(Z,J,Q,X){if(this.height!=J)this.height=J,this.dom.style.height=J+"px";if(this.above!=Q)this.dom.style.marginTop=(this.above=Q)?Q+"px":"";if(!UA(this.markers,X))this.setMarkers(Z,X)}setMarkers(Z,J){let Q="cm-gutterElement",X=this.dom.firstChild;for(let Y=0,K=0;;){let q=K,W=Y<J.length?J[Y++]:null,G=!1;if(W){let I=W.elementClass;if(I)Q+=" "+I;for(let U=K;U<this.markers.length;U++)if(this.markers[U].compare(W)){q=U,G=!0;break}}else q=this.markers.length;while(K<q){let I=this.markers[K++];if(I.toDOM){I.destroy(X);let U=X.nextSibling;X.remove(),X=U}}if(!W)break;if(W.toDOM)if(G)X=X.nextSibling;else this.dom.insertBefore(W.toDOM(Z),X);if(G)K++}this.dom.className=Q,this.markers=J}destroy(){this.setMarkers(null,[])}}function UA(Z,J){if(Z.length!=J.length)return!1;for(let Q=0;Q<Z.length;Q++)if(!Z[Q].compare(J[Q]))return!1;return!0}var zA=o.define(),VA=o.define(),h9=o.define({combine(Z){return A8(Z,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(J,Q){let X=Object.assign({},J);for(let Y in Q){let K=X[Y],q=Q[Y];X[Y]=K?(W,G,I)=>K(W,G,I)||q(W,G,I):q}return X}})}});class _J extends i6{constructor(Z){super();this.number=Z}eq(Z){return this.number==Z.number}toDOM(){return document.createTextNode(this.number)}}function I3(Z,J){return Z.state.facet(h9).formatNumber(J,Z.state)}var jA=CJ.compute([h9],(Z)=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(J){return J.state.facet(zA)},lineMarker(J,Q,X){if(X.some((Y)=>Y.toDOM))return null;return new _J(I3(J,J.state.doc.lineAt(Q.from).number))},widgetMarker:(J,Q,X)=>{for(let Y of J.state.facet(VA)){let K=Y(J,Q,X);if(K)return K}return null},lineMarkerChange:(J)=>J.startState.facet(h9)!=J.state.facet(h9),initialSpacer(J){return new _J(I3(J,rz(J.state.doc.lines)))},updateSpacer(J,Q){let X=I3(Q.view,rz(Q.view.state.doc.lines));return X==J.number?J:new _J(X)},domEventHandlers:Z.facet(h9).domEventHandlers,side:"before"}));function Rj(Z={}){return[h9.of(Z),GA(),jA]}function rz(Z){let J=9;while(J<Z)J=J*10+9;return J}var FA=0;class dJ{constructor(Z,J){this.from=Z,this.to=J}}class O0{constructor(Z={}){this.id=FA++,this.perNode=!!Z.perNode,this.deserialize=Z.deserialize||(()=>{throw Error("This node type doesn't define a deserialize function")}),this.combine=Z.combine||null}add(Z){if(this.perNode)throw RangeError("Can't add per-node props to node types");if(typeof Z!="function")Z=w1.match(Z);return(J)=>{let Q=Z(J);return Q===void 0?null:[this,Q]}}}O0.closedBy=new O0({deserialize:(Z)=>Z.split(" ")});O0.openedBy=new O0({deserialize:(Z)=>Z.split(" ")});O0.group=new O0({deserialize:(Z)=>Z.split(" ")});O0.isolate=new O0({deserialize:(Z)=>{if(Z&&Z!="rtl"&&Z!="ltr"&&Z!="auto")throw RangeError("Invalid value for isolate: "+Z);return Z||"auto"}});O0.contextHash=new O0({perNode:!0});O0.lookAhead=new O0({perNode:!0});O0.mounted=new O0({perNode:!0});class p9{constructor(Z,J,Q,X=!1){this.tree=Z,this.overlay=J,this.parser=Q,this.bracketed=X}static get(Z){return Z&&Z.props&&Z.props[O0.mounted.id]}}var OA=Object.create(null);class w1{constructor(Z,J,Q,X=0){this.name=Z,this.props=J,this.id=Q,this.flags=X}static define(Z){let J=Z.props&&Z.props.length?Object.create(null):OA,Q=(Z.top?1:0)|(Z.skipped?2:0)|(Z.error?4:0)|(Z.name==null?8:0),X=new w1(Z.name||"",J,Z.id,Q);if(Z.props)for(let Y of Z.props){if(!Array.isArray(Y))Y=Y(X);if(Y){if(Y[0].perNode)throw RangeError("Can't store a per-node prop on a node type");J[Y[0].id]=Y[1]}}return X}prop(Z){return this.props[Z.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(Z){if(typeof Z=="string"){if(this.name==Z)return!0;let J=this.prop(O0.group);return J?J.indexOf(Z)>-1:!1}return this.id==Z}static match(Z){let J=Object.create(null);for(let Q in Z)for(let X of Q.split(" "))J[X]=Z[Q];return(Q)=>{for(let X=Q.prop(O0.group),Y=-1;Y<(X?X.length:0);Y++){let K=J[Y<0?Q.name:X[Y]];if(K)return K}}}}w1.none=new w1("",Object.create(null),0,8);class iJ{constructor(Z){this.types=Z;for(let J=0;J<Z.length;J++)if(Z[J].id!=J)throw RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...Z){let J=[];for(let Q of this.types){let X=null;for(let Y of Z){let K=Y(Q);if(K){if(!X)X=Object.assign({},Q.props);let q=K[1],W=K[0];if(W.combine&&W.id in X)q=W.combine(X[W.id],q);X[W.id]=q}}J.push(X?new w1(Q.name,X,Q.id,Q.flags):Q)}return new iJ(J)}}var cJ=new WeakMap,Mj=new WeakMap,l0;(function(Z){Z[Z.ExcludeBuffers=1]="ExcludeBuffers",Z[Z.IncludeAnonymous=2]="IncludeAnonymous",Z[Z.IgnoreMounts=4]="IgnoreMounts",Z[Z.IgnoreOverlays=8]="IgnoreOverlays",Z[Z.EnterBracketed=16]="EnterBracketed"})(l0||(l0={}));class g0{constructor(Z,J,Q,X,Y){if(this.type=Z,this.children=J,this.positions=Q,this.length=X,this.props=null,Y&&Y.length){this.props=Object.create(null);for(let[K,q]of Y)this.props[typeof K=="number"?K:K.id]=q}}toString(){let Z=p9.get(this);if(Z&&!Z.overlay)return Z.tree.toString();let J="";for(let Q of this.children){let X=Q.toString();if(X){if(J)J+=",";J+=X}}return!this.type.name?J:(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(J.length?"("+J+")":"")}cursor(Z=0){return new sJ(this.topNode,Z)}cursorAt(Z,J=0,Q=0){let X=cJ.get(this)||this.topNode,Y=new sJ(X);return Y.moveTo(Z,J),cJ.set(this,Y._tree),Y}get topNode(){return new Q6(this,0,0,null)}resolve(Z,J=0){let Q=D5(cJ.get(this)||this.topNode,Z,J,!1);return cJ.set(this,Q),Q}resolveInner(Z,J=0){let Q=D5(Mj.get(this)||this.topNode,Z,J,!0);return Mj.set(this,Q),Q}resolveStack(Z,J=0){return HA(this,Z,J)}iterate(Z){let{enter:J,leave:Q,from:X=0,to:Y=this.length}=Z,K=Z.mode||0,q=(K&l0.IncludeAnonymous)>0;for(let W=this.cursor(K|l0.IncludeAnonymous);;){let G=!1;if(W.from<=Y&&W.to>=X&&(!q&&W.type.isAnonymous||J(W)!==!1)){if(W.firstChild())continue;G=!0}for(;;){if(G&&Q&&(q||!W.type.isAnonymous))Q(W);if(W.nextSibling())break;if(!W.parent())return;G=!0}}}prop(Z){return!Z.perNode?this.type.prop(Z):this.props?this.props[Z.id]:void 0}get propValues(){let Z=[];if(this.props)for(let J in this.props)Z.push([+J,this.props[J]]);return Z}balance(Z={}){return this.children.length<=8?this:t3(w1.none,this.children,this.positions,0,this.children.length,0,this.length,(J,Q,X)=>new g0(this.type,J,Q,X,this.propValues),Z.makeTree||((J,Q,X)=>new g0(w1.none,J,Q,X)))}static build(Z){return NA(Z)}}g0.empty=new g0(w1.none,[],[],0);class r3{constructor(Z,J){this.buffer=Z,this.index=J}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new r3(this.buffer,this.index)}}class t8{constructor(Z,J,Q){this.buffer=Z,this.length=J,this.set=Q}get type(){return w1.none}toString(){let Z=[];for(let J=0;J<this.buffer.length;)Z.push(this.childString(J)),J=this.buffer[J+3];return Z.join(",")}childString(Z){let J=this.buffer[Z],Q=this.buffer[Z+3],X=this.set.types[J],Y=X.name;if(/\W/.test(Y)&&!X.isError)Y=JSON.stringify(Y);if(Z+=4,Q==Z)return Y;let K=[];while(Z<Q)K.push(this.childString(Z)),Z=this.buffer[Z+3];return Y+"("+K.join(",")+")"}findChild(Z,J,Q,X,Y){let{buffer:K}=this,q=-1;for(let W=Z;W!=J;W=K[W+3])if(Bj(Y,X,K[W+1],K[W+2])){if(q=W,Q>0)break}return q}slice(Z,J,Q){let X=this.buffer,Y=new Uint16Array(J-Z),K=0;for(let q=Z,W=0;q<J;){Y[W++]=X[q++],Y[W++]=X[q++]-Q;let G=Y[W++]=X[q++]-Q;Y[W++]=X[q++]-Z,K=Math.max(K,G)}return new t8(Y,K,this.set)}}function Bj(Z,J,Q,X){switch(Z){case-2:return Q<J;case-1:return X>=J&&Q<J;case 0:return Q<J&&X>J;case 1:return Q<=J&&X>J;case 2:return X>J;case 4:return!0}}function D5(Z,J,Q,X){var Y;while(Z.from==Z.to||(Q<1?Z.from>=J:Z.from>J)||(Q>-1?Z.to<=J:Z.to<J)){let q=!X&&Z instanceof Q6&&Z.index<0?null:Z.parent;if(!q)return Z;Z=q}let K=X?0:l0.IgnoreOverlays;if(X){for(let q=Z,W=q.parent;W;q=W,W=q.parent)if(q instanceof Q6&&q.index<0&&((Y=W.enter(J,Q,K))===null||Y===void 0?void 0:Y.from)!=q.from)Z=W}for(;;){let q=Z.enter(J,Q,K);if(!q)return Z;Z=q}}class a3{cursor(Z=0){return new sJ(this,Z)}getChild(Z,J=null,Q=null){let X=Aj(this,Z,J,Q);return X.length?X[0]:null}getChildren(Z,J=null,Q=null){return Aj(this,Z,J,Q)}resolve(Z,J=0){return D5(this,Z,J,!1)}resolveInner(Z,J=0){return D5(this,Z,J,!0)}matchContext(Z){return i3(this.parent,Z)}enterUnfinishedNodesBefore(Z){let J=this.childBefore(Z),Q=this;while(J){let X=J.lastChild;if(!X||X.to!=J.to)break;if(X.type.isError&&X.from==X.to)Q=J,J=X.prevSibling;else J=X}return Q}get node(){return this}get next(){return this.parent}}class Q6 extends a3{constructor(Z,J,Q,X){super();this._tree=Z,this.from=J,this.index=Q,this._parent=X}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(Z,J,Q,X,Y=0){for(let K=this;;){for(let{children:q,positions:W}=K._tree,G=J>0?q.length:-1;Z!=G;Z+=J){let I=q[Z],U=W[Z]+K.from,z;if(!(Y&l0.EnterBracketed&&I instanceof g0&&(z=p9.get(I))&&!z.overlay&&z.bracketed&&Q>=U&&Q<=U+I.length)&&!Bj(X,Q,U,U+I.length))continue;if(I instanceof t8){if(Y&l0.ExcludeBuffers)continue;let V=I.findChild(0,I.buffer.length,J,Q-U,X);if(V>-1)return new o8(new Lj(K,I,Z,U),null,V)}else if(Y&l0.IncludeAnonymous||(!I.type.isAnonymous||o3(I))){let V;if(!(Y&l0.IgnoreMounts)&&(V=p9.get(I))&&!V.overlay)return new Q6(V.tree,U,Z,K);let F=new Q6(I,U,Z,K);return Y&l0.IncludeAnonymous||!F.type.isAnonymous?F:F.nextChild(J<0?I.children.length-1:0,J,Q,X,Y)}}if(Y&l0.IncludeAnonymous||!K.type.isAnonymous)return null;if(K.index>=0)Z=K.index+J;else Z=J<0?-1:K._parent._tree.children.length;if(K=K._parent,!K)return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(Z){return this.nextChild(0,1,Z,2)}childBefore(Z){return this.nextChild(this._tree.children.length-1,-1,Z,-2)}prop(Z){return this._tree.prop(Z)}enter(Z,J,Q=0){let X;if(!(Q&l0.IgnoreOverlays)&&(X=p9.get(this._tree))&&X.overlay){let Y=Z-this.from,K=Q&l0.EnterBracketed&&X.bracketed;for(let{from:q,to:W}of X.overlay)if((J>0||K?q<=Y:q<Y)&&(J<0||K?W>=Y:W>Y))return new Q6(X.tree,X.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,Z,J,Q)}nextSignificantParent(){let Z=this;while(Z.type.isAnonymous&&Z._parent)Z=Z._parent;return Z}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Aj(Z,J,Q,X){let Y=Z.cursor(),K=[];if(!Y.firstChild())return K;if(Q!=null){for(let q=!1;!q;)if(q=Y.type.is(Q),!Y.nextSibling())return K}for(;;){if(X!=null&&Y.type.is(X))return K;if(Y.type.is(J))K.push(Y.node);if(!Y.nextSibling())return X==null?K:[]}}function i3(Z,J,Q=J.length-1){for(let X=Z;Q>=0;X=X.parent){if(!X)return!1;if(!X.type.isAnonymous){if(J[Q]&&J[Q]!=X.name)return!1;Q--}}return!0}class Lj{constructor(Z,J,Q,X){this.parent=Z,this.buffer=J,this.index=Q,this.start=X}}class o8 extends a3{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(Z,J,Q){super();this.context=Z,this._parent=J,this.index=Q,this.type=Z.buffer.set.types[Z.buffer.buffer[Q]]}child(Z,J,Q){let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.context.start,Q);return Y<0?null:new o8(this.context,this,Y)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(Z){return this.child(1,Z,2)}childBefore(Z){return this.child(-1,Z,-2)}prop(Z){return this.type.prop(Z)}enter(Z,J,Q=0){if(Q&l0.ExcludeBuffers)return null;let{buffer:X}=this.context,Y=X.findChild(this.index+4,X.buffer[this.index+3],J>0?1:-1,Z-this.context.start,J);return Y<0?null:new o8(this.context,this,Y)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(Z){return this._parent?null:this.context.parent.nextChild(this.context.index+Z,Z,0,4)}get nextSibling(){let{buffer:Z}=this.context,J=Z.buffer[this.index+3];if(J<(this._parent?Z.buffer[this._parent.index+3]:Z.buffer.length))return new o8(this.context,this._parent,J);return this.externalSibling(1)}get prevSibling(){let{buffer:Z}=this.context,J=this._parent?this._parent.index+4:0;if(this.index==J)return this.externalSibling(-1);return new o8(this.context,this._parent,Z.findChild(J,this.index,-1,0,4))}get tree(){return null}toTree(){let Z=[],J=[],{buffer:Q}=this.context,X=this.index+4,Y=Q.buffer[this.index+3];if(Y>X){let K=Q.buffer[this.index+1];Z.push(Q.slice(X,Y,K)),J.push(0)}return new g0(this.type,Z,J,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Pj(Z){if(!Z.length)return null;let J=0,Q=Z[0];for(let K=1;K<Z.length;K++){let q=Z[K];if(q.from>Q.from||q.to<Q.to)Q=q,J=K}let X=Q instanceof Q6&&Q.index<0?null:Q.parent,Y=Z.slice();if(X)Y[J]=X;else Y.splice(J,1);return new Sj(Y,Q)}class Sj{constructor(Z,J){this.heads=Z,this.node=J}get next(){return Pj(this.heads)}}function HA(Z,J,Q){let X=Z.resolveInner(J,Q),Y=null;for(let K=X instanceof Q6?X:X.context.parent;K;K=K.parent)if(K.index<0){let q=K.parent;(Y||(Y=[X])).push(q.resolve(J,Q)),K=q}else{let q=p9.get(K.tree);if(q&&q.overlay&&q.overlay[0].from<=J&&q.overlay[q.overlay.length-1].to>=J){let W=new Q6(q.tree,q.overlay[0].from+K.from,-1,K);(Y||(Y=[X])).push(D5(W,J,Q,!1))}}return Y?Pj(Y):X}class sJ{get name(){return this.type.name}constructor(Z,J=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=J&~l0.EnterBracketed,Z instanceof Q6)this.yieldNode(Z);else{this._tree=Z.context.parent,this.buffer=Z.context;for(let Q=Z._parent;Q;Q=Q._parent)this.stack.unshift(Q.index);this.bufferNode=Z,this.yieldBuf(Z.index)}}yieldNode(Z){if(!Z)return!1;return this._tree=Z,this.type=Z.type,this.from=Z.from,this.to=Z.to,!0}yieldBuf(Z,J){this.index=Z;let{start:Q,buffer:X}=this.buffer;return this.type=J||X.set.types[X.buffer[Z]],this.from=Q+X.buffer[Z+1],this.to=Q+X.buffer[Z+2],!0}yield(Z){if(!Z)return!1;if(Z instanceof Q6)return this.buffer=null,this.yieldNode(Z);return this.buffer=Z.context,this.yieldBuf(Z.index,Z.type)}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(Z,J,Q){if(!this.buffer)return this.yield(this._tree.nextChild(Z<0?this._tree._tree.children.length-1:0,Z,J,Q,this.mode));let{buffer:X}=this.buffer,Y=X.findChild(this.index+4,X.buffer[this.index+3],Z,J-this.buffer.start,Q);if(Y<0)return!1;return this.stack.push(this.index),this.yieldBuf(Y)}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(Z){return this.enterChild(1,Z,2)}childBefore(Z){return this.enterChild(-1,Z,-2)}enter(Z,J,Q=this.mode){if(!this.buffer)return this.yield(this._tree.enter(Z,J,Q));return Q&l0.ExcludeBuffers?!1:this.enterChild(1,Z,J)}parent(){if(!this.buffer)return this.yieldNode(this.mode&l0.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let Z=this.mode&l0.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(Z)}sibling(Z){if(!this.buffer)return!this._tree._parent?!1:this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+Z,Z,0,4,this.mode));let{buffer:J}=this.buffer,Q=this.stack.length-1;if(Z<0){let X=Q<0?0:this.stack[Q]+4;if(this.index!=X)return this.yieldBuf(J.findChild(X,this.index,-1,0,4))}else{let X=J.buffer[this.index+3];if(X<(Q<0?J.buffer.length:J.buffer[this.stack[Q]+3]))return this.yieldBuf(X)}return Q<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+Z,Z,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(Z){let J,Q,{buffer:X}=this;if(X){if(Z>0){if(this.index<X.buffer.buffer.length)return!1}else for(let Y=0;Y<this.index;Y++)if(X.buffer.buffer[Y+3]<this.index)return!1;({index:J,parent:Q}=X)}else({index:J,_parent:Q}=this._tree);for(;Q;{index:J,_parent:Q}=Q)if(J>-1)for(let Y=J+Z,K=Z<0?-1:Q._tree.children.length;Y!=K;Y+=Z){let q=Q._tree.children[Y];if(this.mode&l0.IncludeAnonymous||q instanceof t8||!q.type.isAnonymous||o3(q))return!1}return!0}move(Z,J){if(J&&this.enterChild(Z,0,4))return!0;for(;;){if(this.sibling(Z))return!0;if(this.atLastNode(Z)||!this.parent())return!1}}next(Z=!0){return this.move(1,Z)}prev(Z=!0){return this.move(-1,Z)}moveTo(Z,J=0){while(this.from==this.to||(J<1?this.from>=Z:this.from>Z)||(J>-1?this.to<=Z:this.to<Z))if(!this.parent())break;while(this.enterChild(1,Z,J));return this}get node(){if(!this.buffer)return this._tree;let Z=this.bufferNode,J=null,Q=0;if(Z&&Z.context==this.buffer)Z:for(let X=this.index,Y=this.stack.length;Y>=0;){for(let K=Z;K;K=K._parent)if(K.index==X){if(X==this.index)return K;J=K,Q=Y+1;break Z}X=this.stack[--Y]}for(let X=Q;X<this.stack.length;X++)J=new o8(this.buffer,J,this.stack[X]);return this.bufferNode=new o8(this.buffer,J,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(Z,J){for(let Q=0;;){let X=!1;if(this.type.isAnonymous||Z(this)!==!1){if(this.firstChild()){Q++;continue}if(!this.type.isAnonymous)X=!0}for(;;){if(X&&J)J(this);if(X=this.type.isAnonymous,!Q)return;if(this.nextSibling())break;this.parent(),Q--,X=!0}}}matchContext(Z){if(!this.buffer)return i3(this.node.parent,Z);let{buffer:J}=this.buffer,{types:Q}=J.set;for(let X=Z.length-1,Y=this.stack.length-1;X>=0;Y--){if(Y<0)return i3(this._tree,Z,X);let K=Q[J.buffer[this.stack[Y]]];if(!K.isAnonymous){if(Z[X]&&Z[X]!=K.name)return!1;X--}}return!0}}function o3(Z){return Z.children.some((J)=>J instanceof t8||!J.type.isAnonymous||o3(J))}function NA(Z){var J;let{buffer:Q,nodeSet:X,maxBufferLength:Y=1024,reused:K=[],minRepeatType:q=X.types.length}=Z,W=Array.isArray(Q)?new r3(Q,Q.length):Q,G=X.types,I=0,U=0;function z(D,S,B,C,M,s){let{id:v,start:p,end:W0,size:e}=W,Z0=U,q0=I;if(e<0)if(W.next(),e==-1){let h=K[v];B.push(h),C.push(p-D);return}else if(e==-3){I=v;return}else if(e==-4){U=v;return}else throw RangeError(`Unrecognized record size: ${e}`);let G0=G[v],J0,t,m=p-D;if(W0-p<=Y&&(t=R(W.pos-S,M))){let h=new Uint16Array(t.size-t.skip),c=W.pos-t.size,Q0=h.length;while(W.pos>c)Q0=T(t.start,h,Q0);J0=new t8(h,W0-t.start,X),m=t.start-D}else{let h=W.pos-e;W.next();let c=[],Q0=[],f0=v>=q?v:-1,z0=0,S0=W0;while(W.pos>h)if(f0>=0&&W.id==f0&&W.size>=0){if(W.end<=S0-Y)H(c,Q0,p,z0,W.end,S0,f0,Z0,q0),z0=c.length,S0=W.end;W.next()}else if(s>2500)V(p,h,c,Q0);else z(p,h,c,Q0,f0,s+1);if(f0>=0&&z0>0&&z0<c.length)H(c,Q0,p,z0,p,S0,f0,Z0,q0);if(c.reverse(),Q0.reverse(),f0>-1&&z0>0){let J1=F(G0,q0);J0=t3(G0,c,Q0,0,c.length,0,W0-p,J1,J1)}else J0=N(G0,c,Q0,W0-p,Z0-W0,q0)}B.push(J0),C.push(m)}function V(D,S,B,C){let M=[],s=0,v=-1;while(W.pos>S){let{id:p,start:W0,end:e,size:Z0}=W;if(Z0>4)W.next();else if(v>-1&&W0<v)break;else{if(v<0)v=e-Y;M.push(p,W0,e),s++,W.next()}}if(s){let p=new Uint16Array(s*4),W0=M[M.length-2];for(let e=M.length-3,Z0=0;e>=0;e-=3)p[Z0++]=M[e],p[Z0++]=M[e+1]-W0,p[Z0++]=M[e+2]-W0,p[Z0++]=Z0;B.push(new t8(p,M[2]-W0,X)),C.push(W0-D)}}function F(D,S){return(B,C,M)=>{let s=0,v=B.length-1,p,W0;if(v>=0&&(p=B[v])instanceof g0){if(!v&&p.type==D&&p.length==M)return p;if(W0=p.prop(O0.lookAhead))s=C[v]+p.length+W0}return N(D,B,C,M,s,S)}}function H(D,S,B,C,M,s,v,p,W0){let e=[],Z0=[];while(D.length>C)e.push(D.pop()),Z0.push(S.pop()+B-M);D.push(N(X.types[v],e,Z0,s-M,p-s,W0)),S.push(M-B)}function N(D,S,B,C,M,s,v){if(s){let p=[O0.contextHash,s];v=v?[p].concat(v):[p]}if(M>25){let p=[O0.lookAhead,M];v=v?[p].concat(v):[p]}return new g0(D,S,B,C,v)}function R(D,S){let B=W.fork(),C=0,M=0,s=0,v=B.end-Y,p={size:0,start:0,skip:0};Z:for(let W0=B.pos-D;B.pos>W0;){let e=B.size;if(B.id==S&&e>=0){p.size=C,p.start=M,p.skip=s,s+=4,C+=4,B.next();continue}let Z0=B.pos-e;if(e<0||Z0<W0||B.start<v)break;let q0=B.id>=q?4:0,G0=B.start;B.next();while(B.pos>Z0){if(B.size<0)if(B.size==-3||B.size==-4)q0+=4;else break Z;else if(B.id>=q)q0+=4;B.next()}M=G0,C+=e,s+=q0}if(S<0||C==D)p.size=C,p.start=M,p.skip=s;return p.size>4?p:void 0}function T(D,S,B){let{id:C,start:M,end:s,size:v}=W;if(W.next(),v>=0&&C<q){let p=B;if(v>4){let W0=W.pos-(v-4);while(W.pos>W0)B=T(D,S,B)}S[--B]=p,S[--B]=s-D,S[--B]=M-D,S[--B]=C}else if(v==-3)I=C;else if(v==-4)U=C;return B}let E=[],_=[];while(W.pos>0)z(Z.start||0,Z.bufferStart||0,E,_,-1,0);let k=(J=Z.length)!==null&&J!==void 0?J:E.length?_[0]+E[0].length:0;return new g0(G[Z.topID],E.reverse(),_.reverse(),k)}var Dj=new WeakMap;function lJ(Z,J){if(!Z.isAnonymous||J instanceof t8||J.type!=Z)return 1;let Q=Dj.get(J);if(Q==null){Q=1;for(let X of J.children){if(X.type!=Z||!(X instanceof g0)){Q=1;break}Q+=lJ(Z,X)}Dj.set(J,Q)}return Q}function t3(Z,J,Q,X,Y,K,q,W,G){let I=0;for(let H=X;H<Y;H++)I+=lJ(Z,J[H]);let U=Math.ceil(I*1.5/8),z=[],V=[];function F(H,N,R,T,E){for(let _=R;_<T;){let k=_,D=N[_],S=lJ(Z,H[_]);_++;for(;_<T;_++){let B=lJ(Z,H[_]);if(S+B>=U)break;S+=B}if(_==k+1){if(S>U){let B=H[k];F(B.children,B.positions,0,B.children.length,N[k]+E);continue}z.push(H[k])}else{let B=N[_-1]+H[_-1].length-D;z.push(t3(Z,H,N,k,_,D,B,null,G))}V.push(D+E-K)}}return F(J,Q,X,Y,0),(W||G)(z,V,q)}class e8{constructor(Z,J,Q,X,Y=!1,K=!1){this.from=Z,this.to=J,this.tree=Q,this.offset=X,this.open=(Y?1:0)|(K?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(Z,J=[],Q=!1){let X=[new e8(0,Z.length,Z,0,!1,Q)];for(let Y of J)if(Y.to>Z.length)X.push(Y);return X}static applyChanges(Z,J,Q=128){if(!J.length)return Z;let X=[],Y=1,K=Z.length?Z[0]:null;for(let q=0,W=0,G=0;;q++){let I=q<J.length?J[q]:null,U=I?I.fromA:1e9;if(U-W>=Q)while(K&&K.from<U){let z=K;if(W>=z.from||U<=z.to||G){let V=Math.max(z.from,W)-G,F=Math.min(z.to,U)-G;z=V>=F?null:new e8(V,F,z.tree,z.offset+G,q>0,!!I)}if(z)X.push(z);if(K.to>U)break;K=Y<Z.length?Z[Y++]:null}if(!I)break;W=I.toA,G=I.toA-I.toB}return X}}class rJ{startParse(Z,J,Q){if(typeof Z=="string")Z=new Tj(Z);return Q=!Q?[new dJ(0,Z.length)]:Q.length?Q.map((X)=>new dJ(X.from,X.to)):[new dJ(0,0)],this.createParse(Z,J||[],Q)}parse(Z,J,Q){let X=this.startParse(Z,J,Q);for(;;){let Y=X.advance();if(Y)return Y}}}class Tj{constructor(Z){this.string=Z}get length(){return this.string.length}chunk(Z){return this.string.slice(Z)}get lineChunks(){return!1}read(Z,J){return this.string.slice(Z,J)}}var Ox=new O0({perNode:!0});var RA=0;class X6{constructor(Z,J,Q,X){this.name=Z,this.set=J,this.base=Q,this.modified=X,this.id=RA++}toString(){let{name:Z}=this;for(let J of this.modified)if(J.name)Z=`${J.name}(${Z})`;return Z}static define(Z,J){let Q=typeof Z=="string"?Z:"?";if(Z instanceof X6)J=Z;if(J===null||J===void 0?void 0:J.base)throw Error("Can not derive from a modified tag");let X=new X6(Q,[],null,[]);if(X.set.push(X),J)for(let Y of J.set)X.set.push(Y);return X}static defineModifier(Z){let J=new eJ(Z);return(Q)=>{if(Q.modified.indexOf(J)>-1)return Q;return eJ.get(Q.base||Q,Q.modified.concat(J).sort((X,Y)=>X.id-Y.id))}}}var MA=0;class eJ{constructor(Z){this.name=Z,this.instances=[],this.id=MA++}static get(Z,J){if(!J.length)return Z;let Q=J[0].instances.find((q)=>q.base==Z&&AA(J,q.modified));if(Q)return Q;let X=[],Y=new X6(Z.name,X,Z,J);for(let q of J)q.instances.push(Y);let K=DA(J);for(let q of Z.set)if(!q.modified.length)for(let W of K)X.push(eJ.get(q,W));return Y}}function AA(Z,J){return Z.length==J.length&&Z.every((Q,X)=>Q==J[X])}function DA(Z){let J=[[]];for(let Q=0;Q<Z.length;Q++)for(let X=0,Y=J.length;X<Y;X++)J.push(J[X].concat(Z[Q]));return J.sort((Q,X)=>X.length-Q.length)}function _j(Z){let J=Object.create(null);for(let Q in Z){let X=Z[Q];if(!Array.isArray(X))X=[X];for(let Y of Q.split(" "))if(Y){let K=[],q=2,W=Y;for(let z=0;;){if(W=="..."&&z>0&&z+3==Y.length){q=1;break}let V=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(W);if(!V)throw RangeError("Invalid path: "+Y);if(K.push(V[0]=="*"?"":V[0][0]=='"'?JSON.parse(V[0]):V[0]),z+=V[0].length,z==Y.length)break;let F=Y[z++];if(z==Y.length&&F=="!"){q=0;break}if(F!="/")throw RangeError("Invalid path: "+Y);W=Y.slice(z)}let G=K.length-1,I=K[G];if(!I)throw RangeError("Invalid path: "+Y);let U=new c9(X,q,G>0?K.slice(0,G):null);J[I]=U.sort(J[I])}}return wj.add(J)}var wj=new O0({combine(Z,J){let Q,X,Y;while(Z||J){if(!Z||J&&Z.depth>=J.depth)Y=J,J=J.next;else Y=Z,Z=Z.next;if(Q&&Q.mode==Y.mode&&!Y.context&&!Q.context)continue;let K=new c9(Y.tags,Y.mode,Y.context);if(Q)Q.next=K;else X=K;Q=K}return X}});class c9{constructor(Z,J,Q,X){this.tags=Z,this.mode=J,this.context=Q,this.next=X}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(Z){if(!Z||Z.depth<this.depth)return this.next=Z,this;return Z.next=this.sort(Z.next),Z}get depth(){return this.context?this.context.length:0}}c9.empty=new c9([],2,null);function JK(Z,J){let Q=Object.create(null);for(let K of Z)if(!Array.isArray(K.tag))Q[K.tag.id]=K.class;else for(let q of K.tag)Q[q.id]=K.class;let{scope:X,all:Y=null}=J||{};return{style:(K)=>{let q=Y;for(let W of K)for(let G of W.set){let I=Q[G.id];if(I){q=q?q+" "+I:I;break}}return q},scope:X}}function BA(Z,J){let Q=null;for(let X of Z){let Y=X.style(J);if(Y)Q=Q?Q+" "+Y:Y}return Q}function kj(Z,J,Q,X=0,Y=Z.length){let K=new xj(X,Array.isArray(J)?J:[J],Q);K.highlightRange(Z.cursor(),X,Y,"",K.highlighters),K.flush(Y)}class xj{constructor(Z,J,Q){this.at=Z,this.highlighters=J,this.span=Q,this.class=""}startSpan(Z,J){if(J!=this.class){if(this.flush(Z),Z>this.at)this.at=Z;this.class=J}}flush(Z){if(Z>this.at&&this.class)this.span(this.at,Z,this.class)}highlightRange(Z,J,Q,X,Y){let{type:K,from:q,to:W}=Z;if(q>=Q||W<=J)return;if(K.isTop)Y=this.highlighters.filter((V)=>!V.scope||V.scope(K));let G=X,I=LA(Z)||c9.empty,U=BA(Y,I.tags);if(U){if(G)G+=" ";if(G+=U,I.mode==1)X+=(X?" ":"")+U}if(this.startSpan(Math.max(J,q),G),I.opaque)return;let z=Z.tree&&Z.tree.prop(O0.mounted);if(z&&z.overlay){let V=Z.node.enter(z.overlay[0].from+q,1),F=this.highlighters.filter((N)=>!N.scope||N.scope(z.tree.type)),H=Z.firstChild();for(let N=0,R=q;;N++){let T=N<z.overlay.length?z.overlay[N]:null,E=T?T.from+q:W,_=Math.max(J,R),k=Math.min(Q,E);if(_<k&&H){while(Z.from<k)if(this.highlightRange(Z,_,k,X,Y),this.startSpan(Math.min(k,Z.to),G),Z.to>=E||!Z.nextSibling())break}if(!T||E>Q)break;if(R=T.to+q,R>J)this.highlightRange(V.cursor(),Math.max(J,T.from+q),Math.min(Q,R),"",F),this.startSpan(Math.min(Q,R),G)}if(H)Z.parent()}else if(Z.firstChild()){if(z)X="";do{if(Z.to<=J)continue;if(Z.from>=Q)break;this.highlightRange(Z,J,Q,X,Y),this.startSpan(Math.min(Q,Z.to),G)}while(Z.nextSibling());Z.parent()}}}function LA(Z){let J=Z.type.prop(wj);while(J&&J.context&&!Z.matchContext(J.context))J=J.next;return J||null}var l=X6.define,aJ=l(),Z7=l(),Ej=l(Z7),Cj=l(Z7),J7=l(),oJ=l(J7),e3=l(J7),o6=l(),i7=l(o6),r6=l(),a6=l(),ZK=l(),B5=l(ZK),tJ=l(),n={comment:aJ,lineComment:l(aJ),blockComment:l(aJ),docComment:l(aJ),name:Z7,variableName:l(Z7),typeName:Ej,tagName:l(Ej),propertyName:Cj,attributeName:l(Cj),className:l(Z7),labelName:l(Z7),namespace:l(Z7),macroName:l(Z7),literal:J7,string:oJ,docString:l(oJ),character:l(oJ),attributeValue:l(oJ),number:e3,integer:l(e3),float:l(e3),bool:l(J7),regexp:l(J7),escape:l(J7),color:l(J7),url:l(J7),keyword:r6,self:l(r6),null:l(r6),atom:l(r6),unit:l(r6),modifier:l(r6),operatorKeyword:l(r6),controlKeyword:l(r6),definitionKeyword:l(r6),moduleKeyword:l(r6),operator:a6,derefOperator:l(a6),arithmeticOperator:l(a6),logicOperator:l(a6),bitwiseOperator:l(a6),compareOperator:l(a6),updateOperator:l(a6),definitionOperator:l(a6),typeOperator:l(a6),controlOperator:l(a6),punctuation:ZK,separator:l(ZK),bracket:B5,angleBracket:l(B5),squareBracket:l(B5),paren:l(B5),brace:l(B5),content:o6,heading:i7,heading1:l(i7),heading2:l(i7),heading3:l(i7),heading4:l(i7),heading5:l(i7),heading6:l(i7),contentSeparator:l(o6),list:l(o6),quote:l(o6),emphasis:l(o6),strong:l(o6),link:l(o6),monospace:l(o6),strikethrough:l(o6),inserted:l(),deleted:l(),changed:l(),invalid:l(),meta:tJ,documentMeta:l(tJ),annotation:l(tJ),processingInstruction:l(tJ),definition:X6.defineModifier("definition"),constant:X6.defineModifier("constant"),function:X6.defineModifier("function"),standard:X6.defineModifier("standard"),local:X6.defineModifier("local"),special:X6.defineModifier("special")};for(let Z in n){let J=n[Z];if(J instanceof X6)J.name=Z}var Rx=JK([{tag:n.link,class:"tok-link"},{tag:n.heading,class:"tok-heading"},{tag:n.emphasis,class:"tok-emphasis"},{tag:n.strong,class:"tok-strong"},{tag:n.keyword,class:"tok-keyword"},{tag:n.atom,class:"tok-atom"},{tag:n.bool,class:"tok-bool"},{tag:n.url,class:"tok-url"},{tag:n.labelName,class:"tok-labelName"},{tag:n.inserted,class:"tok-inserted"},{tag:n.deleted,class:"tok-deleted"},{tag:n.literal,class:"tok-literal"},{tag:n.string,class:"tok-string"},{tag:n.number,class:"tok-number"},{tag:[n.regexp,n.escape,n.special(n.string)],class:"tok-string2"},{tag:n.variableName,class:"tok-variableName"},{tag:n.local(n.variableName),class:"tok-variableName tok-local"},{tag:n.definition(n.variableName),class:"tok-variableName tok-definition"},{tag:n.special(n.variableName),class:"tok-variableName2"},{tag:n.definition(n.propertyName),class:"tok-propertyName tok-definition"},{tag:n.typeName,class:"tok-typeName"},{tag:n.namespace,class:"tok-namespace"},{tag:n.className,class:"tok-className"},{tag:n.macroName,class:"tok-macroName"},{tag:n.propertyName,class:"tok-propertyName"},{tag:n.operator,class:"tok-operator"},{tag:n.comment,class:"tok-comment"},{tag:n.meta,class:"tok-meta"},{tag:n.invalid,class:"tok-invalid"},{tag:n.punctuation,class:"tok-punctuation"}]);var QK,d9=new O0;function SA(Z){return o.define({combine:Z?(J)=>J.concat(Z):void 0})}var TA=new O0;class Y6{constructor(Z,J,Q=[],X=""){if(this.data=Z,this.name=X,!D0.prototype.hasOwnProperty("tree"))Object.defineProperty(D0.prototype,"tree",{get(){return k6(this)}});this.parser=J,this.extension=[i9.of(this),D0.languageData.of((Y,K,q)=>{let W=bj(Y,K,q),G=W.type.prop(d9);if(!G)return[];let I=Y.facet(G),U=W.type.prop(TA);if(U){let z=W.resolve(K-W.from,q);for(let V of U)if(V.test(z,Y)){let F=Y.facet(V.facet);return V.type=="replace"?F:F.concat(I)}}return I})].concat(Q)}isActiveAt(Z,J,Q=-1){return bj(Z,J,Q).type.prop(d9)==this.data}findRegions(Z){let J=Z.facet(i9);if((J===null||J===void 0?void 0:J.data)==this.data)return[{from:0,to:Z.doc.length}];if(!J||!J.allowsNesting)return[];let Q=[],X=(Y,K)=>{if(Y.prop(d9)==this.data){Q.push({from:K,to:K+Y.length});return}let q=Y.prop(O0.mounted);if(q){if(q.tree.prop(d9)==this.data){if(q.overlay)for(let W of q.overlay)Q.push({from:W.from+K,to:W.to+K});else Q.push({from:K,to:K+Y.length});return}else if(q.overlay){let W=Q.length;if(X(q.tree,q.overlay[0].from+K),Q.length>W)return}}for(let W=0;W<Y.children.length;W++){let G=Y.children[W];if(G instanceof g0)X(G,Y.positions[W]+K)}};return X(k6(Z),0),Q}get allowsNesting(){return!0}}Y6.setState=B0.define();function bj(Z,J,Q){let X=Z.facet(i9),Y=k6(Z).topNode;if(!X||X.allowsNesting){for(let K=Y;K;K=K.enter(J,Q,l0.ExcludeBuffers|l0.EnterBracketed))if(K.type.isTop)Y=K}return Y}function k6(Z){let J=Z.field(Y6.state,!1);return J?J.tree:g0.empty}class vj{constructor(Z){this.doc=Z,this.cursorPos=0,this.string="",this.cursor=Z.iter()}get length(){return this.doc.length}syncTo(Z){return this.string=this.cursor.next(Z-this.cursorPos).value,this.cursorPos=Z+this.string.length,this.cursorPos-this.string.length}chunk(Z){return this.syncTo(Z),this.string}get lineChunks(){return!0}read(Z,J){let Q=this.cursorPos-this.string.length;if(Z<Q||J>=this.cursorPos)return this.doc.sliceString(Z,J);else return this.string.slice(Z-Q,J-Q)}}var L5=null;class l9{constructor(Z,J,Q=[],X,Y,K,q,W){this.parser=Z,this.state=J,this.fragments=Q,this.tree=X,this.treeLen=Y,this.viewport=K,this.skipped=q,this.scheduleOn=W,this.parse=null,this.tempSkipped=[]}static create(Z,J,Q){return new l9(Z,J,[],g0.empty,0,Q,[],null)}startParse(){return this.parser.startParse(new vj(this.state.doc),this.fragments)}work(Z,J){if(J!=null&&J>=this.state.doc.length)J=void 0;if(this.tree!=g0.empty&&this.isDone(J!==null&&J!==void 0?J:this.state.doc.length))return this.takeTree(),!0;return this.withContext(()=>{var Q;if(typeof Z=="number"){let X=Date.now()+Z;Z=()=>Date.now()>X}if(!this.parse)this.parse=this.startParse();if(J!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>J)&&J<this.state.doc.length)this.parse.stopAt(J);for(;;){let X=this.parse.advance();if(X)if(this.fragments=this.withoutTempSkipped(e8.addTree(X,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(Q=this.parse.stoppedAt)!==null&&Q!==void 0?Q:this.state.doc.length,this.tree=X,this.parse=null,this.treeLen<(J!==null&&J!==void 0?J:this.state.doc.length))this.parse=this.startParse();else return!0;if(Z())return!1}})}takeTree(){let Z,J;if(this.parse&&(Z=this.parse.parsedPos)>=this.treeLen){if(this.parse.stoppedAt==null||this.parse.stoppedAt>Z)this.parse.stopAt(Z);this.withContext(()=>{while(!(J=this.parse.advance()));}),this.treeLen=Z,this.tree=J,this.fragments=this.withoutTempSkipped(e8.addTree(this.tree,this.fragments,!0)),this.parse=null}}withContext(Z){let J=L5;L5=this;try{return Z()}finally{L5=J}}withoutTempSkipped(Z){for(let J;J=this.tempSkipped.pop();)Z=yj(Z,J.from,J.to);return Z}changes(Z,J){let{fragments:Q,tree:X,treeLen:Y,viewport:K,skipped:q}=this;if(this.takeTree(),!Z.empty){let W=[];if(Z.iterChangedRanges((G,I,U,z)=>W.push({fromA:G,toA:I,fromB:U,toB:z})),Q=e8.applyChanges(Q,W),X=g0.empty,Y=0,K={from:Z.mapPos(K.from,-1),to:Z.mapPos(K.to,1)},this.skipped.length){q=[];for(let G of this.skipped){let I=Z.mapPos(G.from,1),U=Z.mapPos(G.to,-1);if(I<U)q.push({from:I,to:U})}}}return new l9(this.parser,J,Q,X,Y,K,q,this.scheduleOn)}updateViewport(Z){if(this.viewport.from==Z.from&&this.viewport.to==Z.to)return!1;this.viewport=Z;let J=this.skipped.length;for(let Q=0;Q<this.skipped.length;Q++){let{from:X,to:Y}=this.skipped[Q];if(X<Z.to&&Y>Z.from)this.fragments=yj(this.fragments,X,Y),this.skipped.splice(Q--,1)}if(this.skipped.length>=J)return!1;return this.reset(),!0}reset(){if(this.parse)this.takeTree(),this.parse=null}skipUntilInView(Z,J){this.skipped.push({from:Z,to:J})}static getSkippingParser(Z){return new class extends rJ{createParse(J,Q,X){let Y=X[0].from,K=X[X.length-1].to;return{parsedPos:Y,advance(){let W=L5;if(W){for(let G of X)W.tempSkipped.push(G);if(Z)W.scheduleOn=W.scheduleOn?Promise.all([W.scheduleOn,Z]):Z}return this.parsedPos=K,new g0(w1.none,[],[],K-Y)},stoppedAt:null,stopAt(){}}}}}isDone(Z){Z=Math.min(Z,this.state.doc.length);let J=this.fragments;return this.treeLen>=Z&&J.length&&J[0].from==0&&J[0].to>=Z}static get(){return L5}}function yj(Z,J,Q){return e8.applyChanges(Z,[{fromA:J,toA:Q,fromB:J,toB:Q}])}class s9{constructor(Z){this.context=Z,this.tree=Z.tree}apply(Z){if(!Z.docChanged&&this.tree==this.context.tree)return this;let J=this.context.changes(Z.changes,Z.state),Q=this.context.treeLen==Z.startState.doc.length?void 0:Math.max(Z.changes.mapPos(this.context.treeLen),J.viewport.to);if(!J.work(20,Q))J.takeTree();return new s9(J)}static init(Z){let J=Math.min(3000,Z.doc.length),Q=l9.create(Z.facet(i9).parser,Z,{from:0,to:J});if(!Q.work(20,J))Q.takeTree();return new s9(Q)}}Y6.state=R1.define({create:s9.init,update(Z,J){for(let Q of J.effects)if(Q.is(Y6.setState))return Q.value;if(J.startState.facet(i9)!=J.state.facet(i9))return s9.init(J.state);return Z.apply(J)}});var mj=(Z)=>{let J=setTimeout(()=>Z(),500);return()=>clearTimeout(J)};if(typeof requestIdleCallback<"u")mj=(Z)=>{let J=-1,Q=setTimeout(()=>{J=requestIdleCallback(Z,{timeout:400})},100);return()=>J<0?clearTimeout(Q):cancelIdleCallback(J)};var XK=typeof navigator<"u"&&((QK=navigator.scheduling)===null||QK===void 0?void 0:QK.isInputPending)?()=>navigator.scheduling.isInputPending():null,EA=M1.fromClass(class{constructor(J){this.view=J,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(J){let Q=this.view.state.field(Y6.state).context;if(Q.updateViewport(J.view.viewport)||this.view.viewport.to>Q.treeLen)this.scheduleWork();if(J.docChanged||J.selectionSet){if(this.view.hasFocus)this.chunkBudget+=50;this.scheduleWork()}this.checkAsyncSchedule(Q)}scheduleWork(){if(this.working)return;let{state:J}=this.view,Q=J.field(Y6.state);if(Q.tree!=Q.context.tree||!Q.context.isDone(J.doc.length))this.working=mj(this.work)}work(J){this.working=null;let Q=Date.now();if(this.chunkEnd<Q&&(this.chunkEnd<0||this.view.hasFocus))this.chunkEnd=Q+30000,this.chunkBudget=3000;if(this.chunkBudget<=0)return;let{state:X,viewport:{to:Y}}=this.view,K=X.field(Y6.state);if(K.tree==K.context.tree&&K.context.isDone(Y+1e5))return;let q=Date.now()+Math.min(this.chunkBudget,100,J&&!XK?Math.max(25,J.timeRemaining()-5):1e9),W=K.context.treeLen<Y&&X.doc.length>Y+1000,G=K.context.work(()=>{return XK&&XK()||Date.now()>q},Y+(W?0:1e5));if(this.chunkBudget-=Date.now()-Q,G||this.chunkBudget<=0)K.context.takeTree(),this.view.dispatch({effects:Y6.setState.of(new s9(K.context))});if(this.chunkBudget>0&&!(G&&!W))this.scheduleWork();this.checkAsyncSchedule(K.context)}checkAsyncSchedule(J){if(J.scheduleOn)this.workScheduled++,J.scheduleOn.then(()=>this.scheduleWork()).catch((Q)=>l1(this.view.state,Q)).then(()=>this.workScheduled--),J.scheduleOn=null}destroy(){if(this.working)this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),i9=o.define({combine(Z){return Z.length?Z[0]:null},enables:(Z)=>[Y6.state,EA,K0.contentAttributes.compute([Z],(J)=>{let Q=J.facet(Z);return Q&&Q.name?{"data-language":Q.name}:{}})]});var CA=o.define(),r9=o.define({combine:(Z)=>{if(!Z.length)return"  ";let J=Z[0];if(!J||/\S/.test(J)||Array.from(J).some((Q)=>Q!=J[0]))throw Error("Invalid indent unit: "+JSON.stringify(Z[0]));return J}});function Q7(Z){let J=Z.facet(r9);return J.charCodeAt(0)==9?Z.tabSize*J.length:J.length}function S5(Z,J){let Q="",X=Z.tabSize,Y=Z.facet(r9)[0];if(Y=="\t"){while(J>=X)Q+="\t",J-=X;Y=" "}for(let K=0;K<J;K++)Q+=Y;return Q}function IK(Z,J){if(Z instanceof D0)Z=new a9(Z);for(let X of Z.state.facet(CA)){let Y=X(Z,J);if(Y!==void 0)return Y}let Q=k6(Z.state);return Q.length>=J?_A(Z,Q,J):null}class a9{constructor(Z,J={}){this.state=Z,this.options=J,this.unit=Q7(Z)}lineAt(Z,J=1){let Q=this.state.doc.lineAt(Z),{simulateBreak:X,simulateDoubleBreak:Y}=this.options;if(X!=null&&X>=Q.from&&X<=Q.to)if(Y&&X==Z)return{text:"",from:Z};else if(J<0?X<Z:X<=Z)return{text:Q.text.slice(X-Q.from),from:X};else return{text:Q.text.slice(0,X-Q.from),from:Q.from};return Q}textAfterPos(Z,J=1){if(this.options.simulateDoubleBreak&&Z==this.options.simulateBreak)return"";let{text:Q,from:X}=this.lineAt(Z,J);return Q.slice(Z-X,Math.min(Q.length,Z+100-X))}column(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.countColumn(Q,Z-X),K=this.options.overrideIndentation?this.options.overrideIndentation(X):-1;if(K>-1)Y+=K-this.countColumn(Q,Q.search(/\S|$/));return Y}countColumn(Z,J=Z.length){return v7(Z,this.state.tabSize,J)}lineIndent(Z,J=1){let{text:Q,from:X}=this.lineAt(Z,J),Y=this.options.overrideIndentation;if(Y){let K=Y(X);if(K>-1)return K}return this.countColumn(Q,Q.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}var nj=new O0;function _A(Z,J,Q){let X=J.resolveStack(Q),Y=J.resolveInner(Q,-1).resolve(Q,0).enterUnfinishedNodesBefore(Q);if(Y!=X.node){let K=[];for(let q=Y;q&&!(q.from<X.node.from||q.to>X.node.to||q.from==X.node.from&&q.type==X.node.type);q=q.parent)K.push(q);for(let q=K.length-1;q>=0;q--)X={node:K[q],next:X}}return pj(X,Z,Q)}function pj(Z,J,Q){for(let X=Z;X;X=X.next){let Y=kA(X.node);if(Y)return Y(UK.create(J,Q,X))}return 0}function wA(Z){return Z.pos==Z.options.simulateBreak&&Z.options.simulateDoubleBreak}function kA(Z){let J=Z.type.prop(nj);if(J)return J;let Q=Z.firstChild,X;if(Q&&(X=Q.type.prop(O0.closedBy))){let Y=Z.lastChild,K=Y&&X.indexOf(Y.name)>-1;return(q)=>hA(q,!0,1,void 0,K&&!wA(q)?Y.from:void 0)}return Z.parent==null?xA:null}function xA(){return 0}class UK extends a9{constructor(Z,J,Q){super(Z.state,Z.options);this.base=Z,this.pos=J,this.context=Q}get node(){return this.context.node}static create(Z,J,Q){return new UK(Z,J,Q)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(Z){let J=this.state.doc.lineAt(Z.from);for(;;){let Q=Z.resolve(J.from);while(Q.parent&&Q.parent.from==Q.from)Q=Q.parent;if(bA(Q,Z))break;J=this.state.doc.lineAt(Q.from)}return this.lineIndent(J.from)}continue(){return pj(this.context.next,this.base,this.pos)}}function bA(Z,J){for(let Q=J;Q;Q=Q.parent)if(Z==Q)return!0;return!1}function yA(Z){let J=Z.node,Q=J.childAfter(J.from),X=J.lastChild;if(!Q)return null;let Y=Z.options.simulateBreak,K=Z.state.doc.lineAt(Q.from),q=Y==null||Y<=K.from?K.to:Math.min(K.to,Y);for(let W=Q.to;;){let G=J.childAfter(W);if(!G||G==X)return null;if(!G.type.isSkipped){if(G.from>=q)return null;let I=/^ */.exec(K.text.slice(Q.to-K.from))[0].length;return{from:Q.from,to:Q.to+I}}W=G.to}}function hA(Z,J,Q,X,Y){let K=Z.textAfter,q=K.match(/^\s*/)[0].length,W=X&&K.slice(q,q+X.length)==X||Y==Z.pos+q,G=J?yA(Z):null;if(G)return W?Z.column(G.from):Z.column(G.to);return Z.baseIndent+(W?0:Z.unit*Q)}class o9{constructor(Z,J){this.specs=Z;let Q;function X(q){let W=P6.newName();return(Q||(Q=Object.create(null)))["."+W]=q,W}let Y=typeof J.all=="string"?J.all:J.all?X(J.all):void 0,K=J.scope;this.scope=K instanceof Y6?(q)=>q.prop(d9)==K.data:K?(q)=>q==K:void 0,this.style=JK(Z.map((q)=>({tag:q.tag,class:q.class||X(Object.assign({},q,{tag:null}))})),{all:Y}).style,this.module=Q?new P6(Q):null,this.themeType=J.themeType}static define(Z,J){return new o9(Z,J||{})}}var qK=o.define(),cj=o.define({combine(Z){return Z.length?[Z[0]]:null}});function YK(Z){let J=Z.facet(qK);return J.length?J:Z.facet(cj)}function dj(Z,J){let Q=[$A],X;if(Z instanceof o9){if(Z.module)Q.push(K0.styleModule.of(Z.module));X=Z.themeType}if(J===null||J===void 0?void 0:J.fallback)Q.push(cj.of(Z));else if(X)Q.push(qK.computeN([K0.darkTheme],(Y)=>{return Y.facet(K0.darkTheme)==(X=="dark")?[Z]:[]}));else Q.push(qK.of(Z));return Q}class lj{constructor(Z){this.markCache=Object.create(null),this.tree=k6(Z.state),this.decorations=this.buildDeco(Z,YK(Z.state)),this.decoratedTo=Z.viewport.to}update(Z){let J=k6(Z.state),Q=YK(Z.state),X=Q!=YK(Z.startState),{viewport:Y}=Z.view,K=Z.changes.mapPos(this.decoratedTo,1);if(J.length<Y.to&&!X&&J.type==this.tree.type&&K>=Y.to)this.decorations=this.decorations.map(Z.changes),this.decoratedTo=K;else if(J!=this.tree||Z.viewportChanged||X)this.tree=J,this.decorations=this.buildDeco(Z.view,Q),this.decoratedTo=Y.to}buildDeco(Z,J){if(!J||!this.tree.length)return L0.none;let Q=new R8;for(let{from:X,to:Y}of Z.visibleRanges)kj(this.tree,J,(K,q,W)=>{Q.add(K,q,this.markCache[W]||(this.markCache[W]=L0.mark({class:W})))},X,Y);return Q.finish()}}var $A=M8.high(M1.fromClass(lj,{decorations:(Z)=>Z.decorations})),Sx=o9.define([{tag:n.meta,color:"#404740"},{tag:n.link,textDecoration:"underline"},{tag:n.heading,textDecoration:"underline",fontWeight:"bold"},{tag:n.emphasis,fontStyle:"italic"},{tag:n.strong,fontWeight:"bold"},{tag:n.strikethrough,textDecoration:"line-through"},{tag:n.keyword,color:"#708"},{tag:[n.atom,n.bool,n.url,n.contentSeparator,n.labelName],color:"#219"},{tag:[n.literal,n.inserted],color:"#164"},{tag:[n.string,n.deleted],color:"#a11"},{tag:[n.regexp,n.escape,n.special(n.string)],color:"#e40"},{tag:n.definition(n.variableName),color:"#00f"},{tag:n.local(n.variableName),color:"#30a"},{tag:[n.typeName,n.namespace],color:"#085"},{tag:n.className,color:"#167"},{tag:[n.special(n.variableName),n.macroName],color:"#256"},{tag:n.definition(n.propertyName),color:"#00c"},{tag:n.comment,color:"#940"},{tag:n.invalid,color:"#f00"}]),gA=K0.baseTheme({"&.cm-focused .cm-matchingBracket":{backgroundColor:"#328c8252"},"&.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bb555544"}}),sj=1e4,ij="()[]{}",rj=o.define({combine(Z){return A8(Z,{afterCursor:!0,brackets:ij,maxScanDistance:sj,renderMatch:vA})}}),fA=L0.mark({class:"cm-matchingBracket"}),uA=L0.mark({class:"cm-nonmatchingBracket"});function vA(Z){let J=[],Q=Z.matched?fA:uA;if(J.push(Q.range(Z.start.from,Z.start.to)),Z.end)J.push(Q.range(Z.end.from,Z.end.to));return J}function hj(Z){let J=[],Q=Z.facet(rj);for(let X of Z.selection.ranges){if(!X.empty)continue;let Y=w6(Z,X.head,-1,Q)||X.head>0&&w6(Z,X.head-1,1,Q)||Q.afterCursor&&(w6(Z,X.head,1,Q)||X.head<Z.doc.length&&w6(Z,X.head+1,-1,Q));if(Y)J=J.concat(Q.renderMatch(Y,Z))}return L0.set(J,!0)}var mA=M1.fromClass(class{constructor(Z){this.paused=!1,this.decorations=hj(Z.state)}update(Z){if(Z.docChanged||Z.selectionSet||this.paused)if(Z.view.composing)this.decorations=this.decorations.map(Z.changes),this.paused=!0;else this.decorations=hj(Z.state),this.paused=!1}},{decorations:(Z)=>Z.decorations}),nA=[mA,gA];function aj(Z={}){return[rj.of(Z),nA]}var pA=new O0;function WK(Z,J,Q){let X=Z.prop(J<0?O0.openedBy:O0.closedBy);if(X)return X;if(Z.name.length==1){let Y=Q.indexOf(Z.name);if(Y>-1&&Y%2==(J<0?1:0))return[Q[Y+J]]}return null}function GK(Z){let J=Z.type.prop(pA);return J?J(Z.node):Z}function w6(Z,J,Q,X={}){let Y=X.maxScanDistance||sj,K=X.brackets||ij,q=k6(Z),W=q.resolveInner(J,Q);for(let G=W;G;G=G.parent){let I=WK(G.type,Q,K);if(I&&G.from<G.to){let U=GK(G);if(U&&(Q>0?J>=U.from&&J<U.to:J>U.from&&J<=U.to))return cA(Z,J,Q,G,U,I,K)}}return dA(Z,J,Q,q,W.type,Y,K)}function cA(Z,J,Q,X,Y,K,q){let W=X.parent,G={from:Y.from,to:Y.to},I=0,U=W===null||W===void 0?void 0:W.cursor();if(U&&(Q<0?U.childBefore(X.from):U.childAfter(X.to)))do if(Q<0?U.to<=X.from:U.from>=X.to){if(I==0&&K.indexOf(U.type.name)>-1&&U.from<U.to){let z=GK(U);return{start:G,end:z?{from:z.from,to:z.to}:void 0,matched:!0}}else if(WK(U.type,Q,q))I++;else if(WK(U.type,-Q,q)){if(I==0){let z=GK(U);return{start:G,end:z&&z.from<z.to?{from:z.from,to:z.to}:void 0,matched:!1}}I--}}while(Q<0?U.prevSibling():U.nextSibling());return{start:G,matched:!1}}function dA(Z,J,Q,X,Y,K,q){if(Q<0?!J:J==Z.doc.length)return null;let W=Q<0?Z.sliceDoc(J-1,J):Z.sliceDoc(J,J+1),G=q.indexOf(W);if(G<0||G%2==0!=Q>0)return null;let I={from:Q<0?J-1:J,to:Q>0?J+1:J},U=Z.doc.iterRange(J,Q>0?Z.doc.length:0),z=0;for(let V=0;!U.next().done&&V<=K;){let F=U.value;if(Q<0)V+=F.length;let H=J+V*Q;for(let N=Q>0?0:F.length-1,R=Q>0?F.length:-1;N!=R;N+=Q){let T=q.indexOf(F[N]);if(T<0||X.resolveInner(H+N,1).type!=Y)continue;if(T%2==0==Q>0)z++;else if(z==1)return{start:I,end:{from:H+N,to:H+N+1},matched:T>>1==G>>1};else z--}if(Q>0)V+=F.length}return U.done?{start:I,matched:!1}:null}function $j(Z,J,Q,X=0,Y=0){if(J==null){if(J=Z.search(/[^\s\u00a0]/),J==-1)J=Z.length}let K=Y;for(let q=X;q<J;q++)if(Z.charCodeAt(q)==9)K+=Q-K%Q;else K++;return K}class zK{constructor(Z,J,Q,X){this.string=Z,this.tabSize=J,this.indentUnit=Q,this.overrideIndent=X,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(Z){let J=this.string.charAt(this.pos),Q;if(typeof Z=="string")Q=J==Z;else Q=J&&(Z instanceof RegExp?Z.test(J):Z(J));if(Q)return++this.pos,J}eatWhile(Z){let J=this.pos;while(this.eat(Z));return this.pos>J}eatSpace(){let Z=this.pos;while(/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;return this.pos>Z}skipToEnd(){this.pos=this.string.length}skipTo(Z){let J=this.string.indexOf(Z,this.pos);if(J>-1)return this.pos=J,!0}backUp(Z){this.pos-=Z}column(){if(this.lastColumnPos<this.start)this.lastColumnValue=$j(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start;return this.lastColumnValue}indentation(){var Z;return(Z=this.overrideIndent)!==null&&Z!==void 0?Z:$j(this.string,null,this.tabSize)}match(Z,J,Q){if(typeof Z=="string"){let X=(K)=>Q?K.toLowerCase():K,Y=this.string.substr(this.pos,Z.length);if(X(Y)==X(Z)){if(J!==!1)this.pos+=Z.length;return!0}else return null}else{let X=this.string.slice(this.pos).match(Z);if(X&&X.index>0)return null;if(X&&J!==!1)this.pos+=X[0].length;return X}}current(){return this.string.slice(this.start,this.pos)}}function lA(Z){return{name:Z.name||"",token:Z.token,blankLine:Z.blankLine||(()=>{}),startState:Z.startState||(()=>!0),copyState:Z.copyState||sA,indent:Z.indent||(()=>null),languageData:Z.languageData||{},tokenTable:Z.tokenTable||jK,mergeTokens:Z.mergeTokens!==!1}}function sA(Z){if(typeof Z!="object")return Z;let J={};for(let Q in Z){let X=Z[Q];J[Q]=X instanceof Array?X.slice():X}return J}var gj=new WeakMap;class r7 extends Y6{constructor(Z){let J=SA(Z.languageData),Q=lA(Z),X,Y=new class extends rJ{createParse(K,q,W){return new tj(X,K,q,W)}};super(J,Y,[],Z.name);this.topNode=oA(J,this),X=this,this.streamParser=Q,this.stateAfter=new O0({perNode:!0}),this.tokenTable=Z.tokenTable?new FK(Q.tokenTable):aA}static define(Z){return new r7(Z)}getIndent(Z){let J=void 0,{overrideIndentation:Q}=Z.options;if(Q){if(J=gj.get(Z.state),J!=null&&J<Z.pos-1e4)J=void 0}let X=VK(this,Z.node.tree,Z.node.from,Z.node.from,J!==null&&J!==void 0?J:Z.pos),Y,K;if(X)K=X.state,Y=X.pos+1;else K=this.streamParser.startState(Z.unit),Y=Z.node.from;if(Z.pos-Y>1e4)return null;while(Y<Z.pos){let W=Z.state.doc.lineAt(Y),G=Math.min(Z.pos,W.to);if(W.length){let I=Q?Q(W.from):-1,U=new zK(W.text,Z.state.tabSize,Z.unit,I<0?void 0:I);while(U.pos<G-W.from)ej(this.streamParser.token,U,K)}else this.streamParser.blankLine(K,Z.unit);if(G==Z.pos)break;Y=W.to+1}let q=Z.lineAt(Z.pos);if(Q&&J==null)gj.set(Z.state,q.from);return this.streamParser.indent(K,/^\s*(.*)/.exec(q.text)[1],Z)}get allowsNesting(){return!1}}function VK(Z,J,Q,X,Y){let K=Q>=X&&Q+J.length<=Y&&J.prop(Z.stateAfter);if(K)return{state:Z.streamParser.copyState(K),pos:Q+J.length};for(let q=J.children.length-1;q>=0;q--){let W=J.children[q],G=Q+J.positions[q],I=W instanceof g0&&G<Y&&VK(Z,W,G,X,Y);if(I)return I}return null}function oj(Z,J,Q,X,Y){if(Y&&Q<=0&&X>=J.length)return J;if(!Y&&Q==0&&J.type==Z.topNode)Y=!0;for(let K=J.children.length-1;K>=0;K--){let q=J.positions[K],W=J.children[K],G;if(q<X&&W instanceof g0){if(!(G=oj(Z,W,Q-q,X-q,Y)))break;return!Y?G:new g0(J.type,J.children.slice(0,K).concat(G),J.positions.slice(0,K+1),q+G.length)}}return null}function iA(Z,J,Q,X,Y){for(let K of J){let q=K.from+(K.openStart?25:0),W=K.to-(K.openEnd?25:0),G=q<=Q&&W>Q&&VK(Z,K.tree,0-K.offset,Q,W),I;if(G&&G.pos<=X&&(I=oj(Z,K.tree,Q+K.offset,G.pos+K.offset,!1)))return{state:G.state,tree:I}}return{state:Z.streamParser.startState(Y?Q7(Y):4),tree:g0.empty}}class tj{constructor(Z,J,Q,X){this.lang=Z,this.input=J,this.fragments=Q,this.ranges=X,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=X[X.length-1].to;let Y=l9.get(),K=X[0].from,{state:q,tree:W}=iA(Z,Q,K,this.to,Y===null||Y===void 0?void 0:Y.state);this.state=q,this.parsedPos=this.chunkStart=K+W.length;for(let G=0;G<W.children.length;G++)this.chunks.push(W.children[G]),this.chunkPos.push(W.positions[G]);if(Y&&this.parsedPos<Y.viewport.from-1e5&&X.some((G)=>G.from<=Y.viewport.from&&G.to>=Y.viewport.from))this.state=this.lang.streamParser.startState(Q7(Y.state)),Y.skipUntilInView(this.parsedPos,Y.viewport.from),this.parsedPos=Y.viewport.from;this.moveRangeIndex()}advance(){let Z=l9.get(),J=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),Q=Math.min(J,this.chunkStart+512);if(Z)Q=Math.min(Q,Z.viewport.to);while(this.parsedPos<Q)this.parseLine(Z);if(this.chunkStart<this.parsedPos)this.finishChunk();if(this.parsedPos>=J)return this.finish();if(Z&&this.parsedPos>=Z.viewport.to)return Z.skipUntilInView(this.parsedPos,J),this.finish();return null}stopAt(Z){this.stoppedAt=Z}lineAfter(Z){let J=this.input.chunk(Z);if(!this.input.lineChunks){let Q=J.indexOf(`
`);if(Q>-1)J=J.slice(0,Q)}else if(J==`
`)J="";return Z+J.length<=this.to?J:J.slice(0,this.to-Z)}nextLine(){let Z=this.parsedPos,J=this.lineAfter(Z),Q=Z+J.length;for(let X=this.rangeIndex;;){let Y=this.ranges[X].to;if(Y>=Q)break;if(J=J.slice(0,Y-(Q-J.length)),X++,X==this.ranges.length)break;let K=this.ranges[X].from,q=this.lineAfter(K);J+=q,Q=K+q.length}return{line:J,end:Q}}skipGapsTo(Z,J,Q){for(;;){let X=this.ranges[this.rangeIndex].to,Y=Z+J;if(Q>0?X>Y:X>=Y)break;let K=this.ranges[++this.rangeIndex].from;J+=K-X}return J}moveRangeIndex(){while(this.ranges[this.rangeIndex].to<this.parsedPos)this.rangeIndex++}emitToken(Z,J,Q,X){let Y=4;if(this.ranges.length>1){X=this.skipGapsTo(J,X,1),J+=X;let q=this.chunk.length;X=this.skipGapsTo(Q,X,-1),Q+=X,Y+=this.chunk.length-q}let K=this.chunk.length-4;if(this.lang.streamParser.mergeTokens&&Y==4&&K>=0&&this.chunk[K]==Z&&this.chunk[K+2]==J)this.chunk[K+2]=Q;else this.chunk.push(Z,J,Q,Y);return X}parseLine(Z){let{line:J,end:Q}=this.nextLine(),X=0,{streamParser:Y}=this.lang,K=new zK(J,Z?Z.state.tabSize:4,Z?Q7(Z.state):2);if(K.eol())Y.blankLine(this.state,K.indentUnit);else while(!K.eol()){let q=ej(Y.token,K,this.state);if(q)X=this.emitToken(this.lang.tokenTable.resolve(q),this.parsedPos+K.start,this.parsedPos+K.pos,X);if(K.start>1e4)break}if(this.parsedPos=Q,this.moveRangeIndex(),this.parsedPos<this.to)this.parsedPos++}finishChunk(){let Z=g0.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:rA,topID:0,maxBufferLength:512,reused:this.chunkReused});Z=new g0(Z.type,Z.children,Z.positions,Z.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(Z),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new g0(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function ej(Z,J,Q){J.start=J.pos;for(let X=0;X<10;X++){let Y=Z(J,Q);if(J.pos>J.start)return Y}throw Error("Stream parser failed to advance stream.")}var jK=Object.create(null),P5=[w1.none],rA=new iJ(P5),fj=[],uj=Object.create(null),ZF=Object.create(null);for(let[Z,J]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])ZF[Z]=JF(jK,J);class FK{constructor(Z){this.extra=Z,this.table=Object.assign(Object.create(null),ZF)}resolve(Z){return!Z?0:this.table[Z]||(this.table[Z]=JF(this.extra,Z))}}var aA=new FK(jK);function KK(Z,J){if(fj.indexOf(Z)>-1)return;fj.push(Z),console.warn(J)}function JF(Z,J){let Q=[];for(let W of J.split(" ")){let G=[];for(let I of W.split(".")){let U=Z[I]||n[I];if(!U)KK(I,`Unknown highlighting tag ${I}`);else if(typeof U=="function")if(!G.length)KK(I,`Modifier ${I} used at start of tag`);else G=G.map(U);else if(G.length)KK(I,`Tag ${I} used as modifier`);else G=Array.isArray(U)?U:[U]}for(let I of G)Q.push(I)}if(!Q.length)return 0;let X=J.replace(/ /g,"_"),Y=X+" "+Q.map((W)=>W.id),K=uj[Y];if(K)return K.id;let q=uj[Y]=w1.define({id:P5.length,name:X,props:[_j({[X]:Q})]});return P5.push(q),q.id}function oA(Z,J){let Q=w1.define({id:P5.length,name:"Document",props:[d9.add(()=>Z),nj.add(()=>(X)=>J.getIndent(X))],top:!0});return P5.push(Q),Q}var Tx={rtl:L0.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:w0.RTL}),ltr:L0.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:w0.LTR}),auto:L0.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var tA=(Z)=>{let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.from),X=MK(Z.state,Q.from);return X.line?eA(Z):X.block?JD(Z):!1};function RK(Z,J){return({state:Q,dispatch:X})=>{if(Q.readOnly)return!1;let Y=Z(J,Q);if(!Y)return!1;return X(Q.update(Y)),!0}}var eA=RK(YD,0);var ZD=RK(WF,0);var JD=RK((Z,J)=>WF(Z,J,XD(J)),0);function MK(Z,J){let Q=Z.languageDataAt("commentTokens",J,1);return Q.length?Q[0]:{}}var T5=50;function QD(Z,{open:J,close:Q},X,Y){let K=Z.sliceDoc(X-T5,X),q=Z.sliceDoc(Y,Y+T5),W=/\s*$/.exec(K)[0].length,G=/^\s*/.exec(q)[0].length,I=K.length-W;if(K.slice(I-J.length,I)==J&&q.slice(G,G+Q.length)==Q)return{open:{pos:X-W,margin:W&&1},close:{pos:Y+G,margin:G&&1}};let U,z;if(Y-X<=2*T5)U=z=Z.sliceDoc(X,Y);else U=Z.sliceDoc(X,X+T5),z=Z.sliceDoc(Y-T5,Y);let V=/^\s*/.exec(U)[0].length,F=/\s*$/.exec(z)[0].length,H=z.length-F-Q.length;if(U.slice(V,V+J.length)==J&&z.slice(H,H+Q.length)==Q)return{open:{pos:X+V+J.length,margin:/\s/.test(U.charAt(V+J.length))?1:0},close:{pos:Y-F-Q.length,margin:/\s/.test(z.charAt(H-1))?1:0}};return null}function XD(Z){let J=[];for(let Q of Z.selection.ranges){let X=Z.doc.lineAt(Q.from),Y=Q.to<=X.to?X:Z.doc.lineAt(Q.to);if(Y.from>X.from&&Y.from==Q.to)Y=Q.to==X.to+1?X:Z.doc.lineAt(Q.to-1);let K=J.length-1;if(K>=0&&J[K].to>X.from)J[K].to=Y.to;else J.push({from:X.from+/^\s*/.exec(X.text)[0].length,to:Y.to})}return J}function WF(Z,J,Q=J.selection.ranges){let X=Q.map((K)=>MK(J,K.from).block);if(!X.every((K)=>K))return null;let Y=Q.map((K,q)=>QD(J,X[q],K.from,K.to));if(Z!=2&&!Y.every((K)=>K))return{changes:J.changes(Q.map((K,q)=>{if(Y[q])return[];return[{from:K.from,insert:X[q].open+" "},{from:K.to,insert:" "+X[q].close}]}))};else if(Z!=1&&Y.some((K)=>K)){let K=[];for(let q=0,W;q<Y.length;q++)if(W=Y[q]){let G=X[q],{open:I,close:U}=W;K.push({from:I.pos-G.open.length,to:I.pos+I.margin},{from:U.pos-U.margin,to:U.pos+G.close.length})}return{changes:K}}return null}function YD(Z,J,Q=J.selection.ranges){let X=[],Y=-1;Z:for(let{from:K,to:q}of Q){let W=X.length,G=1e9,I;for(let U=K;U<=q;){let z=J.doc.lineAt(U);if(I==null){if(I=MK(J,z.from).line,!I)continue Z}if(z.from>Y&&(K==q||q>z.from)){Y=z.from;let V=/^\s*/.exec(z.text)[0].length,F=V==z.length,H=z.text.slice(V,V+I.length)==I?V:-1;if(V<z.text.length&&V<G)G=V;X.push({line:z,comment:H,token:I,indent:V,empty:F,single:!1})}U=z.to+1}if(G<1e9){for(let U=W;U<X.length;U++)if(X[U].indent<X[U].line.text.length)X[U].indent=G}if(X.length==W+1)X[W].single=!0}if(Z!=2&&X.some((K)=>K.comment<0&&(!K.empty||K.single))){let K=[];for(let{line:W,token:G,indent:I,empty:U,single:z}of X)if(z||!U)K.push({from:W.from+I,insert:G+" "});let q=J.changes(K);return{changes:q,selection:J.selection.map(q,1)}}else if(Z!=1&&X.some((K)=>K.comment>=0)){let K=[];for(let{line:q,comment:W,token:G}of X)if(W>=0){let I=q.from+W,U=I+G.length;if(q.text[U-q.from]==" ")U++;K.push({from:I,to:U})}return{changes:K}}return null}var HK=L6.define(),KD=L6.define(),qD=o.define(),GF=o.define({combine(Z){return A8(Z,{minDepth:100,newGroupDelay:500,joinToEvent:(J,Q)=>Q},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(J,Q)=>(X,Y)=>J(X,Y)||Q(X,Y)})}}),IF=R1.define({create(){return t6.empty},update(Z,J){let Q=J.state.facet(GF),X=J.annotation(HK);if(X){let G=f1.fromTransaction(J,X.selection),I=X.side,U=I==0?Z.undone:Z.done;if(G)U=JQ(U,U.length,Q.minDepth,G);else U=VF(U,J.startState.selection);return new t6(I==0?X.rest:U,I==0?U:X.rest)}let Y=J.annotation(KD);if(Y=="full"||Y=="before")Z=Z.isolate();if(J.annotation(o0.addToHistory)===!1)return!J.changes.empty?Z.addMapping(J.changes.desc):Z;let K=f1.fromTransaction(J),q=J.annotation(o0.time),W=J.annotation(o0.userEvent);if(K)Z=Z.addChanges(K,q,W,Q,J);else if(J.selection)Z=Z.addSelection(J.startState.selection,q,W,Q.newGroupDelay);if(Y=="full"||Y=="after")Z=Z.isolate();return Z},toJSON(Z){return{done:Z.done.map((J)=>J.toJSON()),undone:Z.undone.map((J)=>J.toJSON())}},fromJSON(Z){return new t6(Z.done.map(f1.fromJSON),Z.undone.map(f1.fromJSON))}});function UF(Z={}){return[IF,GF.of(Z),K0.domEventHandlers({beforeinput(J,Q){let X=J.inputType=="historyUndo"?KQ:J.inputType=="historyRedo"?E5:null;if(!X)return!1;return J.preventDefault(),X(Q)}})]}function YQ(Z,J){return function({state:Q,dispatch:X}){if(!J&&Q.readOnly)return!1;let Y=Q.field(IF,!1);if(!Y)return!1;let K=Y.pop(Z,Q,J);if(!K)return!1;return X(K),!0}}var KQ=YQ(0,!1),E5=YQ(1,!1),WD=YQ(0,!0),GD=YQ(1,!0);class f1{constructor(Z,J,Q,X,Y){this.changes=Z,this.effects=J,this.mapped=Q,this.startSelection=X,this.selectionsAfter=Y}setSelAfter(Z){return new f1(this.changes,this.effects,this.mapped,this.startSelection,Z)}toJSON(){var Z,J,Q;return{changes:(Z=this.changes)===null||Z===void 0?void 0:Z.toJSON(),mapped:(J=this.mapped)===null||J===void 0?void 0:J.toJSON(),startSelection:(Q=this.startSelection)===null||Q===void 0?void 0:Q.toJSON(),selectionsAfter:this.selectionsAfter.map((X)=>X.toJSON())}}static fromJSON(Z){return new f1(Z.changes&&a0.fromJSON(Z.changes),[],Z.mapped&&B6.fromJSON(Z.mapped),Z.startSelection&&f.fromJSON(Z.startSelection),Z.selectionsAfter.map(f.fromJSON))}static fromTransaction(Z,J){let Q=K6;for(let X of Z.startState.facet(qD)){let Y=X(Z);if(Y.length)Q=Q.concat(Y)}if(!Q.length&&Z.changes.empty)return null;return new f1(Z.changes.invert(Z.startState.doc),Q,void 0,J||Z.startState.selection,K6)}static selection(Z){return new f1(void 0,K6,void 0,void 0,Z)}}function JQ(Z,J,Q,X){let Y=J+1>Q+20?J-Q-1:0,K=Z.slice(Y,J);return K.push(X),K}function ID(Z,J){let Q=[],X=!1;return Z.iterChangedRanges((Y,K)=>Q.push(Y,K)),J.iterChangedRanges((Y,K,q,W)=>{for(let G=0;G<Q.length;){let I=Q[G++],U=Q[G++];if(W>=I&&q<=U)X=!0}}),X}function UD(Z,J){return Z.ranges.length==J.ranges.length&&Z.ranges.filter((Q,X)=>Q.empty!=J.ranges[X].empty).length===0}function zF(Z,J){return!Z.length?J:!J.length?Z:Z.concat(J)}var K6=[],zD=200;function VF(Z,J){if(!Z.length)return[f1.selection([J])];else{let Q=Z[Z.length-1],X=Q.selectionsAfter.slice(Math.max(0,Q.selectionsAfter.length-zD));if(X.length&&X[X.length-1].eq(J))return Z;return X.push(J),JQ(Z,Z.length-1,1e9,Q.setSelAfter(X))}}function VD(Z){let J=Z[Z.length-1],Q=Z.slice();return Q[Z.length-1]=J.setSelAfter(J.selectionsAfter.slice(0,J.selectionsAfter.length-1)),Q}function OK(Z,J){if(!Z.length)return Z;let Q=Z.length,X=K6;while(Q){let Y=jD(Z[Q-1],J,X);if(Y.changes&&!Y.changes.empty||Y.effects.length){let K=Z.slice(0,Q);return K[Q-1]=Y,K}else J=Y.mapped,Q--,X=Y.selectionsAfter}return X.length?[f1.selection(X)]:K6}function jD(Z,J,Q){let X=zF(Z.selectionsAfter.length?Z.selectionsAfter.map((W)=>W.map(J)):K6,Q);if(!Z.changes)return f1.selection(X);let Y=Z.changes.map(J),K=J.mapDesc(Z.changes,!0),q=Z.mapped?Z.mapped.composeDesc(K):K;return new f1(Y,B0.mapEffects(Z.effects,J),q,Z.startSelection.map(K),X)}var FD=/^(input\.type|delete)($|\.)/;class t6{constructor(Z,J,Q=0,X=void 0){this.done=Z,this.undone=J,this.prevTime=Q,this.prevUserEvent=X}isolate(){return this.prevTime?new t6(this.done,this.undone):this}addChanges(Z,J,Q,X,Y){let K=this.done,q=K[K.length-1];if(q&&q.changes&&!q.changes.empty&&Z.changes&&(!Q||FD.test(Q))&&(!q.selectionsAfter.length&&J-this.prevTime<X.newGroupDelay&&X.joinToEvent(Y,ID(q.changes,Z.changes))||Q=="input.type.compose"))K=JQ(K,K.length-1,X.minDepth,new f1(Z.changes.compose(q.changes),zF(B0.mapEffects(Z.effects,q.changes),q.effects),q.mapped,q.startSelection,K6));else K=JQ(K,K.length,X.minDepth,Z);return new t6(K,K6,J,Q)}addSelection(Z,J,Q,X){let Y=this.done.length?this.done[this.done.length-1].selectionsAfter:K6;if(Y.length>0&&J-this.prevTime<X&&Q==this.prevUserEvent&&Q&&/^select($|\.)/.test(Q)&&UD(Y[Y.length-1],Z))return this;return new t6(VF(this.done,Z),this.undone,J,Q)}addMapping(Z){return new t6(OK(this.done,Z),OK(this.undone,Z),this.prevTime,this.prevUserEvent)}pop(Z,J,Q){let X=Z==0?this.done:this.undone;if(X.length==0)return null;let Y=X[X.length-1],K=Y.selectionsAfter[0]||(Y.startSelection?Y.startSelection.map(Y.changes.invertedDesc,1):J.selection);if(Q&&Y.selectionsAfter.length)return J.update({selection:Y.selectionsAfter[Y.selectionsAfter.length-1],annotations:HK.of({side:Z,rest:VD(X),selection:K}),userEvent:Z==0?"select.undo":"select.redo",scrollIntoView:!0});else if(!Y.changes)return null;else{let q=X.length==1?K6:X.slice(0,X.length-1);if(Y.mapped)q=OK(q,Y.mapped);return J.update({changes:Y.changes,selection:Y.startSelection,effects:Y.effects,annotations:HK.of({side:Z,rest:q,selection:K}),filter:!1,userEvent:Z==0?"undo":"redo",scrollIntoView:!0})}}}t6.empty=new t6(K6,K6);var jF=[{key:"Mod-z",run:KQ,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:E5,preventDefault:!0},{linux:"Ctrl-Shift-z",run:E5,preventDefault:!0},{key:"Mod-u",run:WD,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:GD,preventDefault:!0}];function e9(Z,J){return f.create(Z.ranges.map(J),Z.mainIndex)}function x6(Z,J){return Z.update({selection:J,scrollIntoView:!0,userEvent:"select"})}function b6({state:Z,dispatch:J},Q){let X=e9(Z.selection,Q);if(X.eq(Z.selection,!0))return!1;return J(x6(Z,X)),!0}function qQ(Z,J){return f.cursor(J?Z.to:Z.from)}function FF(Z,J){return b6(Z,(Q)=>Q.empty?Z.moveByChar(Q,J):qQ(Q,J))}function A1(Z){return Z.textDirectionAt(Z.state.selection.main.head)==w0.LTR}var WQ=(Z)=>FF(Z,!A1(Z)),GQ=(Z)=>FF(Z,A1(Z));function OF(Z,J){return b6(Z,(Q)=>Q.empty?Z.moveByGroup(Q,J):qQ(Q,J))}var AK=(Z)=>OF(Z,!A1(Z)),DK=(Z)=>OF(Z,A1(Z));var hx=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function OD(Z,J,Q){if(J.type.prop(Q))return!0;let X=J.to-J.from;return X&&(X>2||/[^\s,.;:]/.test(Z.sliceDoc(J.from,J.to)))||J.firstChild}function IQ(Z,J,Q){let X=k6(Z).resolveInner(J.head),Y=Q?O0.closedBy:O0.openedBy;for(let G=J.head;;){let I=Q?X.childAfter(G):X.childBefore(G);if(!I)break;if(OD(Z,I,Y))X=I;else G=Q?I.to:I.from}let K=X.type.prop(Y),q,W;if(K&&(q=Q?w6(Z,X.from,1):w6(Z,X.to,-1))&&q.matched)W=Q?q.end.to:q.end.from;else W=Q?X.to:X.from;return f.cursor(W,Q?-1:1)}var HD=(Z)=>b6(Z,(J)=>IQ(Z.state,J,!A1(Z))),ND=(Z)=>b6(Z,(J)=>IQ(Z.state,J,A1(Z)));function HF(Z,J){return b6(Z,(Q)=>{if(!Q.empty)return qQ(Q,J);let X=Z.moveVertically(Q,J);return X.head!=Q.head?X:Z.moveToLineBoundary(Q,J)})}var UQ=(Z)=>HF(Z,!1),zQ=(Z)=>HF(Z,!0);function NF(Z){let J=Z.scrollDOM.clientHeight<Z.scrollDOM.scrollHeight-2,Q=0,X=0,Y;if(J){for(let K of Z.state.facet(K0.scrollMargins)){let q=K(Z);if(q===null||q===void 0?void 0:q.top)Q=Math.max(q===null||q===void 0?void 0:q.top,Q);if(q===null||q===void 0?void 0:q.bottom)X=Math.max(q===null||q===void 0?void 0:q.bottom,X)}Y=Z.scrollDOM.clientHeight-Q-X}else Y=(Z.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:Q,marginBottom:X,selfScroll:J,height:Math.max(Z.defaultLineHeight,Y-5)}}function RF(Z,J){let Q=NF(Z),{state:X}=Z,Y=e9(X.selection,(q)=>{return q.empty?Z.moveVertically(q,J,Q.height):qQ(q,J)});if(Y.eq(X.selection))return!1;let K;if(Q.selfScroll){let q=Z.coordsAtPos(X.selection.main.head),W=Z.scrollDOM.getBoundingClientRect(),G=W.top+Q.marginTop,I=W.bottom-Q.marginBottom;if(q&&q.top>G&&q.bottom<I)K=K0.scrollIntoView(Y.main.head,{y:"start",yMargin:q.top-G})}return Z.dispatch(x6(X,Y),{effects:K}),!0}var C5=(Z)=>RF(Z,!1),t9=(Z)=>RF(Z,!0);function X7(Z,J,Q){let X=Z.lineBlockAt(J.head),Y=Z.moveToLineBoundary(J,Q);if(Y.head==J.head&&Y.head!=(Q?X.to:X.from))Y=Z.moveToLineBoundary(J,Q,!1);if(!Q&&Y.head==X.from&&X.length){let K=/^\s*/.exec(Z.state.sliceDoc(X.from,Math.min(X.from+100,X.to)))[0].length;if(K&&J.head!=X.from+K)Y=f.cursor(X.from+K)}return Y}var RD=(Z)=>b6(Z,(J)=>X7(Z,J,!0)),MD=(Z)=>b6(Z,(J)=>X7(Z,J,!1)),AD=(Z)=>b6(Z,(J)=>X7(Z,J,!A1(Z))),DD=(Z)=>b6(Z,(J)=>X7(Z,J,A1(Z))),BK=(Z)=>b6(Z,(J)=>f.cursor(Z.lineBlockAt(J.head).from,1)),LK=(Z)=>b6(Z,(J)=>f.cursor(Z.lineBlockAt(J.head).to,-1));function BD(Z,J,Q){let X=!1,Y=e9(Z.selection,(K)=>{let q=w6(Z,K.head,-1)||w6(Z,K.head,1)||K.head>0&&w6(Z,K.head-1,1)||K.head<Z.doc.length&&w6(Z,K.head+1,-1);if(!q||!q.end)return K;X=!0;let W=q.start.from==K.head?q.end.to:q.end.from;return Q?f.range(K.anchor,W):f.cursor(W)});if(!X)return!1;return J(x6(Z,Y)),!0}var LD=({state:Z,dispatch:J})=>BD(Z,J,!1);function q6(Z,J,Q){let X=e9(Z.state.selection,(Y)=>{if(Y.undirectional&&Y.head>=Y.anchor!=J)Y=f.range(Y.head,Y.anchor);let K=Q(Y);return f.range(Y.anchor,K.head,K.goalColumn,K.bidiLevel||void 0,K.assoc)});if(X.eq(Z.state.selection))return!1;return Z.dispatch(x6(Z.state,X)),!0}function MF(Z,J){return q6(Z,J,(Q)=>Z.moveByChar(Q,J))}var AF=(Z)=>MF(Z,!A1(Z)),DF=(Z)=>MF(Z,A1(Z));function BF(Z,J){return q6(Z,J,(Q)=>Z.moveByGroup(Q,J))}var PD=(Z)=>BF(Z,!A1(Z)),SD=(Z)=>BF(Z,A1(Z));var TD=(Z)=>{let J=!A1(Z);return q6(Z,J,(Q)=>IQ(Z.state,Q,J))},ED=(Z)=>{let J=A1(Z);return q6(Z,J,(Q)=>IQ(Z.state,Q,J))};function LF(Z,J){return q6(Z,J,(Q)=>Z.moveVertically(Q,J))}var PF=(Z)=>LF(Z,!1),SF=(Z)=>LF(Z,!0);function TF(Z,J){return q6(Z,J,(Q)=>Z.moveVertically(Q,J,NF(Z).height))}var QF=(Z)=>TF(Z,!1),XF=(Z)=>TF(Z,!0),CD=(Z)=>q6(Z,!0,(J)=>X7(Z,J,!0)),_D=(Z)=>q6(Z,!1,(J)=>X7(Z,J,!1)),wD=(Z)=>{let J=!A1(Z);return q6(Z,J,(Q)=>X7(Z,Q,J))},kD=(Z)=>{let J=A1(Z);return q6(Z,J,(Q)=>X7(Z,Q,J))},xD=(Z)=>q6(Z,!1,(J)=>f.cursor(Z.lineBlockAt(J.head).from)),bD=(Z)=>q6(Z,!0,(J)=>f.cursor(Z.lineBlockAt(J.head).to)),QQ=({state:Z,dispatch:J})=>{return J(x6(Z,{anchor:0})),!0},XQ=({state:Z,dispatch:J})=>{return J(x6(Z,{anchor:Z.doc.length})),!0},YF=({state:Z,dispatch:J})=>{return J(x6(Z,{anchor:Z.selection.main.anchor,head:0})),!0},KF=({state:Z,dispatch:J})=>{return J(x6(Z,{anchor:Z.selection.main.anchor,head:Z.doc.length})),!0},yD=({state:Z,dispatch:J})=>{return J(Z.update({selection:{anchor:0,head:Z.doc.length},userEvent:"select"})),!0},hD=({state:Z,dispatch:J})=>{let Q=jQ(Z).map(({from:X,to:Y})=>f.range(X,Math.min(Y+1,Z.doc.length)));return J(Z.update({selection:f.create(Q),userEvent:"select"})),!0},$D=({state:Z,dispatch:J})=>{let Q=e9(Z.selection,(X)=>{let Y=k6(Z),K=Y.resolveStack(X.from,1);if(X.empty){let q=Y.resolveStack(X.from,-1);if(q.node.from>=K.node.from&&q.node.to<=K.node.to)K=q}for(let q=K;q;q=q.next){let{node:W}=q;if((W.from<X.from&&W.to>=X.to||W.to>X.to&&W.from<=X.from)&&q.next)return f.range(W.to,W.from)}return X});if(Q.eq(Z.selection))return!1;return J(x6(Z,Q)),!0};function EF(Z,J){let{state:Q}=Z,X=Q.selection,Y=Q.selection.ranges.slice();for(let K of Q.selection.ranges){let q=Q.doc.lineAt(K.head);if(J?q.to<Z.state.doc.length:q.from>0)for(let W=K;;){let G=Z.moveVertically(W,J);if(G.head<q.from||G.head>q.to){if(!Y.some((I)=>I.head==G.head))Y.push(G);break}else if(G.head==W.head)break;else W=G}}if(Y.length==X.ranges.length)return!1;return Z.dispatch(x6(Q,f.create(Y,Y.length-1))),!0}var gD=(Z)=>EF(Z,!1),fD=(Z)=>EF(Z,!0),uD=({state:Z,dispatch:J})=>{let Q=Z.selection,X=null;if(Q.ranges.length>1)X=f.create([Q.main]);else if(!Q.main.empty)X=f.create([f.cursor(Q.main.head)]);if(!X)return!1;return J(x6(Z,X)),!0};function _5(Z,J){if(Z.state.readOnly)return!1;let Q="delete.selection",{state:X}=Z,Y=X.changeByRange((K)=>{let{from:q,to:W}=K;if(q==W){let G=J(K);if(G<q)Q="delete.backward",G=ZQ(Z,G,!1);else if(G>q)Q="delete.forward",G=ZQ(Z,G,!0);q=Math.min(q,G),W=Math.max(W,G)}else q=ZQ(Z,q,!1),W=ZQ(Z,W,!0);return q==W?{range:K}:{changes:{from:q,to:W},range:f.cursor(q,q<K.head?-1:1)}});if(Y.changes.empty)return!1;return Z.dispatch(X.update(Y,{scrollIntoView:!0,userEvent:Q,effects:Q=="delete.selection"?K0.announce.of(X.phrase("Selection deleted")):void 0})),!0}function ZQ(Z,J,Q){if(Z instanceof K0)for(let X of Z.state.facet(K0.atomicRanges).map((Y)=>Y(Z)))X.between(J,J,(Y,K)=>{if(Y<J&&K>J)J=Q?K:Y});return J}var CF=(Z,J,Q)=>_5(Z,(X)=>{let Y=X.from,{state:K}=Z,q=K.doc.lineAt(Y),W,G;if(Q&&!J&&Y>q.from&&Y<q.from+200&&!/[^ \t]/.test(W=q.text.slice(0,Y-q.from))){if(W[W.length-1]=="\t")return Y-1;let I=v7(W,K.tabSize),U=I%Q7(K)||Q7(K);for(let z=0;z<U&&W[W.length-1-z]==" ";z++)Y--;G=Y}else if(G=q1(q.text,Y-q.from,J,J)+q.from,G==Y&&q.number!=(J?K.doc.lines:1))G+=J?1:-1;else if(!J&&/[\ufe00-\ufe0f]/.test(q.text.slice(G-q.from,Y-q.from)))G=q1(q.text,G-q.from,!1,!1)+q.from;return G}),NK=(Z)=>CF(Z,!1,!0);var VQ=(Z)=>CF(Z,!0,!1),_F=(Z,J)=>_5(Z,(Q)=>{let X=Q.head,{state:Y}=Z,K=Y.doc.lineAt(X),q=Y.charCategorizer(X);for(let W=null;;){if(X==(J?K.to:K.from)){if(X==Q.head&&K.number!=(J?Y.doc.lines:1))X+=J?1:-1;break}let G=q1(K.text,X-K.from,J)+K.from,I=K.text.slice(Math.min(X,G)-K.from,Math.max(X,G)-K.from),U=q(I);if(W!=null&&U!=W)break;if(I!=" "||X!=Q.head)W=U;X=G}return X}),wF=(Z)=>_F(Z,!1),PK=(Z)=>_F(Z,!0);var vD=(Z)=>_5(Z,(J)=>{let Q=Z.lineBlockAt(J.head).to;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var mD=(Z)=>_5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!1).head;return J.head>Q?Q:Math.max(0,J.head-1)}),nD=(Z)=>_5(Z,(J)=>{let Q=Z.moveToLineBoundary(J,!0).head;return J.head<Q?Q:Math.min(Z.state.doc.length,J.head+1)});var pD=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{return{changes:{from:X.from,to:X.to,insert:R0.of(["",""])},range:f.cursor(X.from)}});return J(Z.update(Q,{scrollIntoView:!0,userEvent:"input"})),!0},cD=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Z.changeByRange((X)=>{if(!X.empty||X.from==0||X.from==Z.doc.length)return{range:X};let Y=X.from,K=Z.doc.lineAt(Y),q=Y==K.from?Y-1:q1(K.text,Y-K.from,!1)+K.from,W=Y==K.to?Y+1:q1(K.text,Y-K.from,!0)+K.from;return{changes:{from:q,to:W,insert:Z.doc.slice(Y,W).append(Z.doc.slice(q,Y))},range:f.cursor(W)}});if(Q.changes.empty)return!1;return J(Z.update(Q,{scrollIntoView:!0,userEvent:"move.character"})),!0};function jQ(Z){let J=[],Q=-1;for(let X of Z.selection.ranges){let Y=Z.doc.lineAt(X.from),K=Z.doc.lineAt(X.to);if(!X.empty&&X.to==K.from)K=Z.doc.lineAt(X.to-1);if(Q>=Y.number){let q=J[J.length-1];q.to=K.to,q.ranges.push(X)}else J.push({from:Y.from,to:K.to,ranges:[X]});Q=K.number+1}return J}function kF(Z,J,Q){if(Z.readOnly)return!1;let X=[],Y=[];for(let K of jQ(Z)){if(Q?K.to==Z.doc.length:K.from==0)continue;let q=Z.doc.lineAt(Q?K.to+1:K.from-1),W=q.length+1;if(Q){X.push({from:K.to,to:q.to},{from:K.from,insert:q.text+Z.lineBreak});for(let G of K.ranges)Y.push(f.range(Math.min(Z.doc.length,G.anchor+W),Math.min(Z.doc.length,G.head+W)))}else{X.push({from:q.from,to:K.from},{from:K.to,insert:Z.lineBreak+q.text});for(let G of K.ranges)Y.push(f.range(G.anchor-W,G.head-W))}}if(!X.length)return!1;return J(Z.update({changes:X,scrollIntoView:!0,selection:f.create(Y,Z.selection.mainIndex),userEvent:"move.line"})),!0}var dD=({state:Z,dispatch:J})=>kF(Z,J,!1),lD=({state:Z,dispatch:J})=>kF(Z,J,!0);function xF(Z,J,Q){if(Z.readOnly)return!1;let X=[];for(let K of jQ(Z))if(Q)X.push({from:K.from,insert:Z.doc.slice(K.from,K.to)+Z.lineBreak});else X.push({from:K.to,insert:Z.lineBreak+Z.doc.slice(K.from,K.to)});let Y=Z.changes(X);return J(Z.update({changes:Y,selection:Z.selection.map(Y,Q?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}var sD=({state:Z,dispatch:J})=>xF(Z,J,!1),iD=({state:Z,dispatch:J})=>xF(Z,J,!0),rD=(Z)=>{if(Z.state.readOnly)return!1;let{state:J}=Z,Q=J.changes(jQ(J).map(({from:Y,to:K})=>{if(Y>0)Y--;else if(K<J.doc.length)K++;return{from:Y,to:K}})),X=e9(J.selection,(Y)=>{let K=void 0;if(Z.lineWrapping){let q=Z.lineBlockAt(Y.head),W=Z.coordsAtPos(Y.head,Y.assoc||1);if(W)K=q.bottom+Z.documentTop-W.bottom+Z.defaultLineHeight/2}return Z.moveVertically(Y,!0,K)}).map(Q);return Z.dispatch({changes:Q,selection:X,scrollIntoView:!0,userEvent:"delete.line"}),!0};function aD(Z,J){if(/\(\)|\[\]|\{\}/.test(Z.sliceDoc(J-1,J+1)))return{from:J,to:J};let Q=k6(Z).resolveInner(J),X=Q.childBefore(J),Y=Q.childAfter(J),K;if(X&&Y&&X.to<=J&&Y.from>=J&&(K=X.type.prop(O0.closedBy))&&K.indexOf(Y.name)>-1&&Z.doc.lineAt(X.to).from==Z.doc.lineAt(Y.from).from&&!/\S/.test(Z.sliceDoc(X.to,Y.from)))return{from:X.to,to:Y.from};return null}var qF=bF(!1),oD=bF(!0);function bF(Z){return({state:J,dispatch:Q})=>{if(J.readOnly)return!1;let X=J.changeByRange((Y)=>{let{from:K,to:q}=Y,W=J.doc.lineAt(K),G=!Z&&K==q&&aD(J,K);if(Z)K=q=(q<=W.to?W:J.doc.lineAt(q)).to;let I=new a9(J,{simulateBreak:K,simulateDoubleBreak:!!G}),U=IK(I,K);if(U==null)U=v7(/^\s*/.exec(J.doc.lineAt(K).text)[0],J.tabSize);while(q<W.to&&/\s/.test(W.text[q-W.from]))q++;if(G)({from:K,to:q}=G);else if(K>W.from&&K<W.from+100&&!/\S/.test(W.text.slice(0,K)))K=W.from;let z=["",S5(J,U)];if(G)z.push(S5(J,I.lineIndent(W.from,-1)));return{changes:{from:K,to:q,insert:R0.of(z)},range:f.cursor(K+1+z[1].length)}});return Q(J.update(X,{scrollIntoView:!0,userEvent:"input"})),!0}}function SK(Z,J){let Q=-1;return Z.changeByRange((X)=>{let Y=[];for(let q=X.from;q<=X.to;){let W=Z.doc.lineAt(q);if(W.number>Q&&(X.empty||X.to>W.from))J(W,Y,X),Q=W.number;q=W.to+1}let K=Z.changes(Y);return{changes:Y,range:f.range(K.mapPos(X.anchor,1),K.mapPos(X.head,1))}})}var tD=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;let Q=Object.create(null),X=new a9(Z,{overrideIndentation:(K)=>{let q=Q[K];return q==null?-1:q}}),Y=SK(Z,(K,q,W)=>{let G=IK(X,K.from);if(G==null)return;if(!/\S/.test(K.text))G=0;let I=/^\s*/.exec(K.text)[0],U=S5(Z,G);if(I!=U||W.from<K.from+I.length)Q[K.from]=G,q.push({from:K.from,to:K.from+I.length,insert:U})});if(!Y.changes.empty)J(Z.update(Y,{userEvent:"indent"}));return!0},yF=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(SK(Z,(Q,X)=>{X.push({from:Q.from,insert:Z.facet(r9)})}),{userEvent:"input.indent"})),!0},hF=({state:Z,dispatch:J})=>{if(Z.readOnly)return!1;return J(Z.update(SK(Z,(Q,X)=>{let Y=/^\s*/.exec(Q.text)[0];if(!Y)return;let K=v7(Y,Z.tabSize),q=0,W=S5(Z,Math.max(0,K-Q7(Z)));while(q<Y.length&&q<W.length&&Y.charCodeAt(q)==W.charCodeAt(q))q++;X.push({from:Q.from+q,to:Q.from+Y.length,insert:W.slice(q)})}),{userEvent:"delete.dedent"})),!0},eD=(Z)=>{return Z.setTabFocusMode(),!0};var ZB=[{key:"Ctrl-b",run:WQ,shift:AF,preventDefault:!0},{key:"Ctrl-f",run:GQ,shift:DF},{key:"Ctrl-p",run:UQ,shift:PF},{key:"Ctrl-n",run:zQ,shift:SF},{key:"Ctrl-a",run:BK,shift:xD},{key:"Ctrl-e",run:LK,shift:bD},{key:"Ctrl-d",run:VQ},{key:"Ctrl-h",run:NK},{key:"Ctrl-k",run:vD},{key:"Ctrl-Alt-h",run:wF},{key:"Ctrl-o",run:pD},{key:"Ctrl-t",run:cD},{key:"Ctrl-v",run:t9}],JB=[{key:"ArrowLeft",run:WQ,shift:AF,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:AK,shift:PD,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:AD,shift:wD,preventDefault:!0},{key:"ArrowRight",run:GQ,shift:DF,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:DK,shift:SD,preventDefault:!0},{mac:"Cmd-ArrowRight",run:DD,shift:kD,preventDefault:!0},{key:"ArrowUp",run:UQ,shift:PF,preventDefault:!0},{mac:"Cmd-ArrowUp",run:QQ,shift:YF},{mac:"Ctrl-ArrowUp",run:C5,shift:QF},{key:"ArrowDown",run:zQ,shift:SF,preventDefault:!0},{mac:"Cmd-ArrowDown",run:XQ,shift:KF},{mac:"Ctrl-ArrowDown",run:t9,shift:XF},{key:"PageUp",run:C5,shift:QF},{key:"PageDown",run:t9,shift:XF},{key:"Home",run:MD,shift:_D,preventDefault:!0},{key:"Mod-Home",run:QQ,shift:YF},{key:"End",run:RD,shift:CD,preventDefault:!0},{key:"Mod-End",run:XQ,shift:KF},{key:"Enter",run:qF,shift:qF},{key:"Mod-a",run:yD},{key:"Backspace",run:NK,shift:NK,preventDefault:!0},{key:"Delete",run:VQ,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:wF,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:PK,preventDefault:!0},{mac:"Mod-Backspace",run:mD,preventDefault:!0},{mac:"Mod-Delete",run:nD,preventDefault:!0}].concat(ZB.map((Z)=>({mac:Z.key,run:Z.run,shift:Z.shift}))),$F=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:HD,shift:TD},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:ND,shift:ED},{key:"Alt-ArrowUp",run:dD},{key:"Shift-Alt-ArrowUp",run:sD},{key:"Alt-ArrowDown",run:lD},{key:"Shift-Alt-ArrowDown",run:iD},{key:"Mod-Alt-ArrowUp",run:gD},{key:"Mod-Alt-ArrowDown",run:fD},{key:"Escape",run:uD},{key:"Mod-Enter",run:oD},{key:"Alt-l",mac:"Ctrl-l",run:hD},{key:"Mod-i",run:$D,preventDefault:!0},{key:"Mod-[",run:hF},{key:"Mod-]",run:yF},{key:"Mod-Alt-\\",run:tD},{key:"Shift-Mod-k",run:rD},{key:"Shift-Mod-\\",run:LD},{key:"Mod-/",run:tA},{key:"Alt-A",run:ZD},{key:"Ctrl-m",mac:"Shift-Alt-m",run:eD}].concat(JB),gF={key:"Tab",run:yF,shift:hF};class TK{constructor(Z,J,Q){this.from=Z,this.to=J,this.diagnostic=Q}}class a7{constructor(Z,J,Q){this.diagnostics=Z,this.panel=J,this.selected=Q}static init(Z,J,Q){let X=Q.facet(w5).markerFilter;if(X)Z=X(Z,Q);let Y=Z.slice().sort((V,F)=>V.from-F.from||V.to-F.to),K=new R8,q=[],W=0,G=Q.doc.iter(),I=0,U=Q.doc.length;for(let V=0;;){let F=V==Y.length?null:Y[V];if(!F&&!q.length)break;let H,N;if(q.length)H=W,N=q.reduce((E,_)=>Math.min(E,_.to),F&&F.from>H?F.from:1e8);else{if(H=F.from,H>U)break;N=F.to,q.push(F),V++}while(V<Y.length){let E=Y[V];if(E.from==H&&(E.to>E.from||E.to==H))q.push(E),V++,N=Math.min(E.to,N);else{N=Math.min(E.from,N);break}}N=Math.min(N,U);let R=!1;if(q.some((E)=>E.from==H&&(E.to==N||N==U))){if(R=H==N,!R&&N-H<10){let E=H-(I+G.value.length);if(E>0)G.next(E),I=H;for(let _=H;;){if(_>=N){R=!0;break}if(!G.lineBreak&&I+G.value.length>_)break;_=I+G.value.length,I+=G.value.length,G.next()}}}let T=UB(q);if(R)K.add(H,H,L0.widget({widget:new dF(T),diagnostics:q.slice()}));else{let E=q.reduce((_,k)=>k.markClass?_+" "+k.markClass:_,"");K.add(H,N,L0.mark({class:"cm-lintRange cm-lintRange-"+T+E,diagnostics:q.slice(),inclusiveEnd:q.some((_)=>_.to>N)}))}if(W=N,W==U)break;for(let E=0;E<q.length;E++)if(q[E].to<=W)q.splice(E--,1)}let z=K.finish();return new a7(z,J,Z4(z))}}function Z4(Z,J=null,Q=0){let X=null;return Z.between(Q,1e9,(Y,K,{spec:q})=>{if(J&&q.diagnostics.indexOf(J)<0)return;if(!X)X=new TK(Y,K,J||q.diagnostics[0]);else if(q.diagnostics.indexOf(X.diagnostic)<0)return!1;else X=new TK(X.from,K,X.diagnostic)}),X}function QB(Z,J){let Q=J.pos,X=J.end||Q,Y=Z.state.facet(w5).hideOn(Z,Q,X);if(Y!=null)return Y;let K=Z.startState.doc.lineAt(J.pos);return!!(Z.effects.some((q)=>q.is(CK))||Z.changes.touchesRange(K.from,Math.max(K.to,X)))}function XB(Z,J){return Z.field(y6,!1)?J:J.concat(B0.appendConfig.of(VB))}function vF(Z,J){return{effects:XB(Z,[CK.of(J)])}}var CK=B0.define(),mF=B0.define(),nF=B0.define(),y6=R1.define({create(){return new a7(L0.none,null,null)},update(Z,J){if(J.docChanged&&Z.diagnostics.size){let Q=Z.diagnostics.map(J.changes),X=null,Y=Z.panel;if(Z.selected){let K=J.changes.mapPos(Z.selected.from,1);X=Z4(Q,Z.selected.diagnostic,K)||Z4(Q,null,K)}if(!Q.size&&Y&&J.state.facet(w5).autoPanel)Y=null;Z=new a7(Q,Y,X)}for(let Q of J.effects)if(Q.is(CK)){let X=!J.state.facet(w5).autoPanel?Z.panel:Q.value.length?OQ.open:null;Z=a7.init(Q.value,X,J.state)}else if(Q.is(mF))Z=new a7(Z.diagnostics,Q.value?OQ.open:null,Z.selected);else if(Q.is(nF))Z=new a7(Z.diagnostics,Z.panel,Q.value);return Z},provide:(Z)=>[n9.from(Z,(J)=>J.panel),K0.decorations.from(Z,(J)=>J.diagnostics)]});var YB=L0.mark({class:"cm-lintRange cm-lintRange-active"});function KB(Z,J,Q){let{diagnostics:X}=Z.state.field(y6),Y,K=-1,q=-1;X.between(J-(Q<0?1:0),J+(Q>0?1:0),(G,I,{spec:U})=>{if(J>=G&&J<=I&&(G==I||(J>G||Q>0)&&(J<I||Q<0)))return Y=U.diagnostics,K=G,q=I,!1});let W=Z.state.facet(w5).tooltipFilter;if(Y&&W)Y=W(Y,Z.state);if(!Y)return null;return{pos:K,end:q,above:!0,create(){return{dom:qB(Z,Y)}}}}function qB(Z,J){return c1("ul",{class:"cm-tooltip-lint"},J.map((Q)=>cF(Z,Q,!1)))}var fF=(Z)=>{let J=Z.state.field(y6,!1);if(!J||!J.panel)return!1;return Z.dispatch({effects:mF.of(!1)}),!0};var w5=o.define({combine(Z){return{sources:Z.map((J)=>J.source).filter((J)=>J!=null),...A8(Z.map((J)=>J.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null,hideOn:()=>null},{delay:Math.max,markerFilter:uF,tooltipFilter:uF,needsRefresh:(J,Q)=>!J?Q:!Q?J:(X)=>J(X)||Q(X),hideOn:(J,Q)=>!J?Q:!Q?J:(X,Y,K)=>J(X,Y,K)||Q(X,Y,K),autoPanel:(J,Q)=>J||Q})}}});function uF(Z,J){return!Z?J:!J?Z:(Q,X)=>J(Z(Q,X),X)}function pF(Z){let J=[];if(Z)Z:for(let{name:Q}of Z){for(let X=0;X<Q.length;X++){let Y=Q[X];if(/[a-zA-Z]/.test(Y)&&!J.some((K)=>K.toLowerCase()==Y.toLowerCase())){J.push(Y);continue Z}}J.push("")}return J}function cF(Z,J,Q){var X;let Y=Q?pF(J.actions):[];return c1("li",{class:"cm-diagnostic cm-diagnostic-"+J.severity},c1("span",{class:"cm-diagnosticText"},J.renderMessage?J.renderMessage(Z):J.message),(X=J.actions)===null||X===void 0?void 0:X.map((K,q)=>{let W=!1,G=(F)=>{if(F.preventDefault(),W)return;W=!0;let H=Z4(Z.state.field(y6).diagnostics,J);if(H)K.apply(Z,H.from,H.to)},{name:I}=K,U=Y[q]?I.indexOf(Y[q]):-1,z=U<0?I:[I.slice(0,U),c1("u",I.slice(U,U+1)),I.slice(U+1)],V=K.markClass?" "+K.markClass:"";return c1("button",{type:"button",class:"cm-diagnosticAction"+V,onclick:G,onmousedown:G,"aria-label":` Action: ${I}${U<0?"":` (access key "${Y[q]})"`}.`},z)}),J.source&&c1("div",{class:"cm-diagnosticSource"},J.source))}class dF extends a8{constructor(Z){super();this.sev=Z}eq(Z){return Z.sev==this.sev}toDOM(){return c1("span",{class:"cm-lintPoint cm-lintPoint-"+this.sev})}}class EK{constructor(Z,J){this.diagnostic=J,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=cF(Z,J,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class OQ{constructor(Z){this.view=Z,this.items=[];let J=(X)=>{if(X.ctrlKey||X.altKey||X.metaKey)return;if(X.keyCode==27)fF(this.view),this.view.focus();else if(X.keyCode==38||X.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(X.keyCode==40||X.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(X.keyCode==36)this.moveSelection(0);else if(X.keyCode==35)this.moveSelection(this.items.length-1);else if(X.keyCode==13)this.view.focus();else if(X.keyCode>=65&&X.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:Y}=this.items[this.selectedIndex],K=pF(Y.actions);for(let q=0;q<K.length;q++)if(K[q].toUpperCase().charCodeAt(0)==X.keyCode){let W=Z4(this.view.state.field(y6).diagnostics,Y);if(W)Y.actions[q].apply(Z,W.from,W.to)}}else return;X.preventDefault()},Q=(X)=>{for(let Y=0;Y<this.items.length;Y++)if(this.items[Y].dom.contains(X.target))this.moveSelection(Y)};this.list=c1("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:J,onclick:Q}),this.dom=c1("div",{class:"cm-panel-lint"},this.list,c1("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>fF(this.view)},"×")),this.update()}get selectedIndex(){let Z=this.view.state.field(y6).selected;if(!Z)return-1;for(let J=0;J<this.items.length;J++)if(this.items[J].diagnostic==Z.diagnostic)return J;return-1}update(){let{diagnostics:Z,selected:J}=this.view.state.field(y6),Q=0,X=!1,Y=null,K=new Set;Z.between(0,this.view.state.doc.length,(q,W,{spec:G})=>{for(let I of G.diagnostics){if(K.has(I))continue;K.add(I);let U=-1,z;for(let V=Q;V<this.items.length;V++)if(this.items[V].diagnostic==I){U=V;break}if(U<0)z=new EK(this.view,I),this.items.splice(Q,0,z),X=!0;else if(z=this.items[U],U>Q)this.items.splice(Q,U-Q),X=!0;if(J&&z.diagnostic==J.diagnostic){if(!z.dom.hasAttribute("aria-selected"))z.dom.setAttribute("aria-selected","true"),Y=z}else if(z.dom.hasAttribute("aria-selected"))z.dom.removeAttribute("aria-selected");Q++}});while(Q<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0))X=!0,this.items.pop();if(this.items.length==0)this.items.push(new EK(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),X=!0;if(Y)this.list.setAttribute("aria-activedescendant",Y.id),this.view.requestMeasure({key:this,read:()=>({sel:Y.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:q,panel:W})=>{let G=W.height/this.list.offsetHeight;if(q.top<W.top)this.list.scrollTop-=(W.top-q.top)/G;else if(q.bottom>W.bottom)this.list.scrollTop+=(q.bottom-W.bottom)/G}});else if(this.selectedIndex<0)this.list.removeAttribute("aria-activedescendant");if(X)this.sync()}sync(){let Z=this.list.firstChild;function J(){let Q=Z;Z=Q.nextSibling,Q.remove()}for(let Q of this.items)if(Q.dom.parentNode==this.list){while(Z!=Q.dom)J();Z=Q.dom.nextSibling}else this.list.insertBefore(Q.dom,Z);while(Z)J()}moveSelection(Z){if(this.selectedIndex<0)return;let J=this.view.state.field(y6),Q=Z4(J.diagnostics,this.items[Z].diagnostic);if(!Q)return;this.view.dispatch({selection:{anchor:Q.from,head:Q.to},scrollIntoView:!0,effects:nF.of(Q)})}static open(Z){return new OQ(Z)}}function WB(Z,J='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${J}>${encodeURIComponent(Z)}</svg>')`}function FQ(Z){return WB(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${Z}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}var GB=K0.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:0.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:FQ("#f11")},".cm-lintRange-warning":{backgroundImage:FQ("orange")},".cm-lintRange-info":{backgroundImage:FQ("#999")},".cm-lintRange-hint":{backgroundImage:FQ("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}},"&dark .cm-lintRange-active":{backgroundColor:"#86714a80"},"&dark .cm-panel.cm-panel-lint ul":{"& [aria-selected]":{backgroundColor:"#2e343e"}}});function IB(Z){return Z=="error"?4:Z=="warning"?3:Z=="info"?2:1}function UB(Z){let J="hint",Q=1;for(let X of Z){let Y=IB(X.severity);if(Y>Q)Q=Y,J=X.severity}return J}var zB=Hj(KB,{hideOn:QB}),VB=[y6,K0.decorations.compute([y6],(Z)=>{let{selected:J,panel:Q}=Z.field(y6);return!J||!Q||J.from==J.to?L0.none:L0.set([YB.range(J.from,J.to)])}),zB,GB];function _K(Z){return new RegExp("^(("+Z.join(")|(")+"))\\b")}var jB=_K(["and","or","not","is"]),lF=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],sF=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function h6(Z){return Z.scopes[Z.scopes.length-1]}function iF(Z){var J="error",Q=Z.delimiters||Z.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,X=[Z.singleOperators,Z.doubleOperators,Z.doubleDelimiters,Z.tripleDelimiters,Z.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/];for(var Y=0;Y<X.length;Y++)if(!X[Y])X.splice(Y--,1);var K=Z.hangingIndent,q=lF,W=sF;if(Z.extra_keywords!=null)q=q.concat(Z.extra_keywords);if(Z.extra_builtins!=null)W=W.concat(Z.extra_builtins);var G=!(Z.version&&Number(Z.version)<3);if(G){var I=Z.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;q=q.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),W=W.concat(["ascii","bytes","exec","print"]);var U=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var I=Z.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;q=q.concat(["exec","print"]),W=W.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var U=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var z=_K(q),V=_K(W);function F(D,S){var B=D.sol()&&S.lastToken!="\\";if(B)S.indent=D.indentation();if(B&&h6(S).type=="py"){var C=h6(S).offset;if(D.eatSpace()){var M=D.indentation();if(M>C)T(D,S);else if(M<C&&_(D,S)&&D.peek()!="#")S.errorToken=!0;return null}else{var s=H(D,S);if(C>0&&_(D,S))s+=" "+J;return s}}return H(D,S)}function H(D,S,B){if(D.eatSpace())return null;if(!B&&D.match(/^#.*/))return"comment";if(D.match(/^[0-9\.]/,!1)){var C=!1;if(D.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i))C=!0;if(D.match(/^[\d_]+\.\d*/))C=!0;if(D.match(/^\.\d+/))C=!0;if(C)return D.eat(/J/i),"number";var M=!1;if(D.match(/^0x[0-9a-f_]+/i))M=!0;if(D.match(/^0b[01_]+/i))M=!0;if(D.match(/^0o[0-7_]+/i))M=!0;if(D.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/))D.eat(/J/i),M=!0;if(D.match(/^0(?![\dx])/i))M=!0;if(M)return D.eat(/L/i),"number"}if(D.match(U)){var s=D.current().toLowerCase().indexOf("f")!==-1;if(!s)return S.tokenize=R(D.current(),S.tokenize),S.tokenize(D,S);else return S.tokenize=N(D.current(),S.tokenize),S.tokenize(D,S)}for(var v=0;v<X.length;v++)if(D.match(X[v]))return"operator";if(D.match(Q))return"punctuation";if(S.lastToken=="."&&D.match(I))return"property";if(D.match(z)||D.match(jB))return"keyword";if(D.match(V))return"builtin";if(D.match(/^(self|cls)\b/))return"self";if(D.match(I)){if(S.lastToken=="def"||S.lastToken=="class")return"def";return"variable"}return D.next(),B?null:J}function N(D,S){while("rubf".indexOf(D.charAt(0).toLowerCase())>=0)D=D.substr(1);var B=D.length==1,C="string";function M(v){return function(p,W0){var e=H(p,W0,!0);if(e=="punctuation"){if(p.current()=="{")W0.tokenize=M(v+1);else if(p.current()=="}")if(v>1)W0.tokenize=M(v-1);else W0.tokenize=s}return e}}function s(v,p){while(!v.eol())if(v.eatWhile(/[^'"\{\}\\]/),v.eat("\\")){if(v.next(),B&&v.eol())return C}else if(v.match(D))return p.tokenize=S,C;else if(v.match("{{"))return C;else if(v.match("{",!1))if(p.tokenize=M(0),v.current())return C;else return p.tokenize(v,p);else if(v.match("}}"))return C;else if(v.match("}"))return J;else v.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else p.tokenize=S;return C}return s.isString=!0,s}function R(D,S){while("rubf".indexOf(D.charAt(0).toLowerCase())>=0)D=D.substr(1);var B=D.length==1,C="string";function M(s,v){while(!s.eol())if(s.eatWhile(/[^'"\\]/),s.eat("\\")){if(s.next(),B&&s.eol())return C}else if(s.match(D))return v.tokenize=S,C;else s.eat(/['"]/);if(B)if(Z.singleLineStringErrors)return J;else v.tokenize=S;return C}return M.isString=!0,M}function T(D,S){while(h6(S).type!="py")S.scopes.pop();S.scopes.push({offset:h6(S).offset+D.indentUnit,type:"py",align:null})}function E(D,S,B){var C=D.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:D.column()+1;S.scopes.push({offset:S.indent+(K||D.indentUnit),type:B,align:C})}function _(D,S){var B=D.indentation();while(S.scopes.length>1&&h6(S).offset>B){if(h6(S).type!="py")return!0;S.scopes.pop()}return h6(S).offset!=B}function k(D,S){if(D.sol())S.beginningOfLine=!0,S.dedent=!1;var B=S.tokenize(D,S),C=D.current();if(S.beginningOfLine&&C=="@")return D.match(I,!1)?"meta":G?"operator":J;if(/\S/.test(C))S.beginningOfLine=!1;if((B=="variable"||B=="builtin")&&S.lastToken=="meta")B="meta";if(C=="pass"||C=="return")S.dedent=!0;if(C=="lambda")S.lambda=!0;if(C==":"&&!S.lambda&&h6(S).type=="py"&&D.match(/^\s*(?:#|$)/,!1))T(D,S);if(C.length==1&&!/string|comment/.test(B)){var M="[({".indexOf(C);if(M!=-1)E(D,S,"])}".slice(M,M+1));if(M="])}".indexOf(C),M!=-1)if(h6(S).type==C)S.indent=S.scopes.pop().offset-(K||D.indentUnit);else return J}if(S.dedent&&D.eol()&&h6(S).type=="py"&&S.scopes.length>1)S.scopes.pop();return B}return{name:"python",startState:function(){return{tokenize:F,scopes:[{offset:0,type:"py",align:null}],indent:0,lastToken:null,lambda:!1,dedent:0}},token:function(D,S){var B=S.errorToken;if(B)S.errorToken=!1;var C=k(D,S);if(C&&C!="comment")S.lastToken=C=="keyword"||C=="punctuation"?D.current():C;if(C=="punctuation")C=null;if(D.eol()&&S.lambda)S.lambda=!1;return B?J:C},indent:function(D,S,B){if(D.tokenize!=F)return D.tokenize.isString?null:0;var C=h6(D),M=C.type==S.charAt(0)||C.type=="py"&&!D.dedent&&/^(else:|elif |except |finally:)/.test(S);if(C.align!=null)return C.align-(M?1:0);else return C.offset-(M?K||B.unit:0)},languageData:{autocomplete:lF.concat(sF).concat(["exec","print"]),indentOnInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}}}var FB=function(Z){return Z.split(" ")},rF=iF({}),px=iF({extra_keywords:FB("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")});function HQ(Z){var{statementIndent:J,jsonld:Q}=Z,X=Z.json||Q,Y=Z.typescript,K=Z.wordCharacters||/[\w$\xa1-\uffff]/,q=function(){function O(v1){return{type:v1,style:"keyword"}}var A=O("keyword a"),b=O("keyword b"),i=O("keyword c"),X0=O("keyword d"),M0=O("operator"),C0={type:"atom",style:"atom"};return{if:O("if"),while:A,with:A,else:b,do:b,try:b,finally:b,return:X0,break:X0,continue:X0,new:O("new"),delete:i,void:i,throw:i,debugger:O("debugger"),var:O("var"),const:O("var"),let:O("var"),function:O("function"),catch:O("catch"),for:O("for"),switch:O("switch"),case:O("case"),default:O("default"),in:M0,typeof:M0,instanceof:M0,true:C0,false:C0,null:C0,undefined:C0,NaN:C0,Infinity:C0,this:O("this"),class:O("class"),super:O("atom"),yield:i,export:O("export"),import:O("import"),extends:i,await:i}}(),W=/[+\-*&%=<>!?|~^@]/,G=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function I(O){var A=!1,b,i=!1;while((b=O.next())!=null){if(!A){if(b=="/"&&!i)return;if(b=="[")i=!0;else if(i&&b=="]")i=!1}A=!A&&b=="\\"}}var U,z;function V(O,A,b){return U=O,z=b,A}function F(O,A){var b=O.next();if(b=='"'||b=="'")return A.tokenize=H(b),A.tokenize(O,A);else if(b=="."&&O.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return V("number","number");else if(b=="."&&O.match(".."))return V("spread","meta");else if(/[\[\]{}\(\),;\:\.]/.test(b))return V(b);else if(b=="="&&O.eat(">"))return V("=>","operator");else if(b=="0"&&O.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return V("number","number");else if(/\d/.test(b))return O.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),V("number","number");else if(b=="/")if(O.eat("*"))return A.tokenize=N,N(O,A);else if(O.eat("/"))return O.skipToEnd(),V("comment","comment");else if(bH(O,A,1))return I(O),O.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),V("regexp","string.special");else return O.eat("="),V("operator","operator",O.current());else if(b=="`")return A.tokenize=R,R(O,A);else if(b=="#"&&O.peek()=="!")return O.skipToEnd(),V("meta","meta");else if(b=="#"&&O.eatWhile(K))return V("variable","property");else if(b=="<"&&O.match("!--")||b=="-"&&O.match("->")&&!/\S/.test(O.string.slice(0,O.start)))return O.skipToEnd(),V("comment","comment");else if(W.test(b)){if(b!=">"||!A.lexical||A.lexical.type!=">"){if(O.eat("=")){if(b=="!"||b=="=")O.eat("=")}else if(/[<>*+\-|&?]/.test(b)){if(O.eat(b),b==">")O.eat(b)}}if(b=="?"&&O.eat("."))return V(".");return V("operator","operator",O.current())}else if(K.test(b)){O.eatWhile(K);var i=O.current();if(A.lastType!="."){if(q.propertyIsEnumerable(i)){var X0=q[i];return V(X0.type,X0.style,i)}if(i=="async"&&O.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return V("async","keyword",i)}return V("variable","variable",i)}}function H(O){return function(A,b){var i=!1,X0;if(Q&&A.peek()=="@"&&A.match(G))return b.tokenize=F,V("jsonld-keyword","meta");while((X0=A.next())!=null){if(X0==O&&!i)break;i=!i&&X0=="\\"}if(!i)b.tokenize=F;return V("string","string")}}function N(O,A){var b=!1,i;while(i=O.next()){if(i=="/"&&b){A.tokenize=F;break}b=i=="*"}return V("comment","comment")}function R(O,A){var b=!1,i;while((i=O.next())!=null){if(!b&&(i=="`"||i=="$"&&O.eat("{"))){A.tokenize=F;break}b=!b&&i=="\\"}return V("quasi","string.special",O.current())}var T="([{}])";function E(O,A){if(A.fatArrowAt)A.fatArrowAt=null;var b=O.string.indexOf("=>",O.start);if(b<0)return;if(Y){var i=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(O.string.slice(O.start,b));if(i)b=i.index}var X0=0,M0=!1;for(var C0=b-1;C0>=0;--C0){var v1=O.string.charAt(C0),i1=T.indexOf(v1);if(i1>=0&&i1<3){if(!X0){++C0;break}if(--X0==0){if(v1=="(")M0=!0;break}}else if(i1>=3&&i1<6)++X0;else if(K.test(v1))M0=!0;else if(/["'\/`]/.test(v1))for(;;--C0){if(C0==0)return;var N4=O.string.charAt(C0-1);if(N4==v1&&O.string.charAt(C0-2)!="\\"){C0--;break}}else if(M0&&!X0){++C0;break}}if(M0&&!X0)A.fatArrowAt=C0}var _={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function k(O,A,b,i,X0,M0){if(this.indented=O,this.column=A,this.type=b,this.prev=X0,this.info=M0,i!=null)this.align=i}function D(O,A){for(var b=O.localVars;b;b=b.next)if(b.name==A)return!0;for(var i=O.context;i;i=i.prev)for(var b=i.vars;b;b=b.next)if(b.name==A)return!0}function S(O,A,b,i,X0){var M0=O.cc;if(B.state=O,B.stream=X0,B.marked=null,B.cc=M0,B.style=A,!O.lexical.hasOwnProperty("align"))O.lexical.align=!0;while(!0){var C0=M0.length?M0.pop():X?z0:Q0;if(C0(b,i)){while(M0.length&&M0[M0.length-1].lex)M0.pop()();if(B.marked)return B.marked;if(b=="variable"&&D(O,i))return"variableName.local";return A}}}var B={state:null,column:null,marked:null,cc:null};function C(){for(var O=arguments.length-1;O>=0;O--)B.cc.push(arguments[O])}function M(){return C.apply(null,arguments),!0}function s(O,A){for(var b=A;b;b=b.next)if(b.name==O)return!0;return!1}function v(O){var A=B.state;if(B.marked="def",A.context){if(A.lexical.info=="var"&&A.context&&A.context.block){var b=p(O,A.context);if(b!=null){A.context=b;return}}else if(!s(O,A.localVars)){A.localVars=new Z0(O,A.localVars);return}}if(Z.globalVars&&!s(O,A.globalVars))A.globalVars=new Z0(O,A.globalVars)}function p(O,A){if(!A)return null;else if(A.block){var b=p(O,A.prev);if(!b)return null;if(b==A.prev)return A;return new e(b,A.vars,!0)}else if(s(O,A.vars))return A;else return new e(A.prev,new Z0(O,A.vars),!1)}function W0(O){return O=="public"||O=="private"||O=="protected"||O=="abstract"||O=="readonly"}function e(O,A,b){this.prev=O,this.vars=A,this.block=b}function Z0(O,A){this.name=O,this.next=A}var q0=new Z0("this",new Z0("arguments",null));function G0(){B.state.context=new e(B.state.context,B.state.localVars,!1),B.state.localVars=q0}function J0(){B.state.context=new e(B.state.context,B.state.localVars,!0),B.state.localVars=null}G0.lex=J0.lex=!0;function t(){B.state.localVars=B.state.context.vars,B.state.context=B.state.context.prev}t.lex=!0;function m(O,A){var b=function(){var i=B.state,X0=i.indented;if(i.lexical.type=="stat")X0=i.lexical.indented;else for(var M0=i.lexical;M0&&M0.type==")"&&M0.align;M0=M0.prev)X0=M0.indented;i.lexical=new k(X0,B.stream.column(),O,null,i.lexical,A)};return b.lex=!0,b}function h(){var O=B.state;if(O.lexical.prev){if(O.lexical.type==")")O.indented=O.lexical.indented;O.lexical=O.lexical.prev}}h.lex=!0;function c(O){function A(b){if(b==O)return M();else if(O==";"||b=="}"||b==")"||b=="]")return C();else return M(A)}return A}function Q0(O,A){if(O=="var")return M(m("vardef",A),aQ,c(";"),h);if(O=="keyword a")return M(m("form"),J1,Q0,h);if(O=="keyword b")return M(m("form"),Q0,h);if(O=="keyword d")return B.stream.match(/^\s*$/,!1)?M():M(m("stat"),Y1,c(";"),h);if(O=="debugger")return M(c(";"));if(O=="{")return M(m("}"),J0,XZ,h,t);if(O==";")return M();if(O=="if"){if(B.state.lexical.info=="else"&&B.state.cc[B.state.cc.length-1]==h)B.state.cc.pop()();return M(m("form"),J1,Q0,h,Eq)}if(O=="function")return M(b8);if(O=="for")return M(m("form"),J0,Cq,Q0,t,h);if(O=="class"||Y&&A=="interface")return B.marked="keyword",M(m("form",O=="class"?O:A),wq,h);if(O=="variable")if(Y&&A=="declare")return B.marked="keyword",M(Q0);else if(Y&&(A=="module"||A=="enum"||A=="type")&&B.stream.match(/^\s*\w/,!1))if(B.marked="keyword",A=="enum")return M(bq);else if(A=="type")return M(_q,c("operator"),E0,c(";"));else return M(m("form"),I6,c("{"),m("}"),XZ,h,h);else if(Y&&A=="namespace")return B.marked="keyword",M(m("form"),z0,Q0,h);else if(Y&&A=="abstract")return B.marked="keyword",M(Q0);else return M(m("stat"),FH);if(O=="switch")return M(m("form"),J1,c("{"),m("}","switch"),J0,XZ,h,h,t);if(O=="case")return M(z0,c(":"));if(O=="default")return M(c(":"));if(O=="catch")return M(m("form"),G0,f0,Q0,h,t);if(O=="export")return M(m("stat"),EH,h);if(O=="import")return M(m("stat"),CH,h);if(O=="async")return M(Q0);if(A=="@")return M(z0,Q0);return C(m("stat"),z0,c(";"),h)}function f0(O){if(O=="(")return M(N7,c(")"))}function z0(O,A){return J8(O,A,!1)}function S0(O,A){return J8(O,A,!0)}function J1(O){if(O!="(")return C();return M(m(")"),Y1,c(")"),h)}function J8(O,A,b){if(B.state.fatArrowAt==B.stream.start){var i=b?lQ:JZ;if(O=="(")return M(G0,m(")"),G1(N7,")"),h,c("=>"),i,t);else if(O=="variable")return C(G0,I6,c("=>"),i,t)}var X0=b?G6:x1;if(_.hasOwnProperty(O))return M(X0);if(O=="function")return M(b8,X0);if(O=="class"||Y&&A=="interface")return B.marked="keyword",M(m("form"),TH,h);if(O=="keyword c"||O=="async")return M(b?S0:z0);if(O=="(")return M(m(")"),Y1,c(")"),h,X0);if(O=="operator"||O=="spread")return M(b?S0:z0);if(O=="[")return M(m("]"),wH,h,X0);if(O=="{")return O4(QZ,"}",null,X0);if(O=="quasi")return C(g6,X0);if(O=="new")return M(Pq(b));return M()}function Y1(O){if(O.match(/[;\}\)\],]/))return C();return C(z0)}function x1(O,A){if(O==",")return M(Y1);return G6(O,A,!1)}function G6(O,A,b){var i=b==!1?x1:G6,X0=b==!1?z0:S0;if(O=="=>")return M(G0,b?lQ:JZ,t);if(O=="operator"){if(/\+\+|--/.test(A)||Y&&A=="!")return M(i);if(Y&&A=="<"&&B.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1))return M(m(">"),G1(E0,">"),h,i);if(A=="?")return M(z0,c(":"),X0);return M(X0)}if(O=="quasi")return C(g6,i);if(O==";")return;if(O=="(")return O4(S0,")","call",i);if(O==".")return M(OH,i);if(O=="[")return M(m("]"),Y1,c("]"),h,i);if(Y&&A=="as")return B.marked="keyword",M(E0,i);if(O=="regexp")return B.state.lastType=B.marked="operator",B.stream.backUp(B.stream.pos-B.stream.start-1),M(X0)}function g6(O,A){if(O!="quasi")return C();if(A.slice(A.length-2)!="${")return M(g6);return M(Y1,Lq)}function Lq(O){if(O=="}")return B.marked="string.special",B.state.tokenize=R,M(g6)}function JZ(O){return E(B.stream,B.state),C(O=="{"?Q0:z0)}function lQ(O){return E(B.stream,B.state),C(O=="{"?Q0:S0)}function Pq(O){return function(A){if(A==".")return M(O?jH:VH);else if(A=="variable"&&Y)return M(DH,O?G6:x1);else return C(O?S0:z0)}}function VH(O,A){if(A=="target")return B.marked="keyword",M(x1)}function jH(O,A){if(A=="target")return B.marked="keyword",M(G6)}function FH(O){if(O==":")return M(h,Q0);return C(x1,c(";"),h)}function OH(O){if(O=="variable")return B.marked="property",M()}function QZ(O,A){if(O=="async")return B.marked="property",M(QZ);else if(O=="variable"||B.style=="keyword"){if(B.marked="property",A=="get"||A=="set")return M(HH);var b;if(Y&&B.state.fatArrowAt==B.stream.start&&(b=B.stream.match(/^\s*:\s*/,!1)))B.state.fatArrowAt=B.stream.pos+b[0].length;return M(H7)}else if(O=="number"||O=="string")return B.marked=Q?"property":B.style+" property",M(H7);else if(O=="jsonld-keyword")return M(H7);else if(Y&&W0(A))return B.marked="keyword",M(QZ);else if(O=="[")return M(z0,X9,c("]"),H7);else if(O=="spread")return M(S0,H7);else if(A=="*")return B.marked="keyword",M(QZ);else if(O==":")return C(H7)}function HH(O){if(O!="variable")return C(H7);return B.marked="property",M(b8)}function H7(O){if(O==":")return M(S0);if(O=="(")return C(b8)}function G1(O,A,b){function i(X0,M0){if(b?b.indexOf(X0)>-1:X0==","){var C0=B.state.lexical;if(C0.info=="call")C0.pos=(C0.pos||0)+1;return M(function(v1,i1){if(v1==A||i1==A)return C();return C(O)},i)}if(X0==A||M0==A)return M();if(b&&b.indexOf(";")>-1)return C(O);return M(c(A))}return function(X0,M0){if(X0==A||M0==A)return M();return C(O,i)}}function O4(O,A,b){for(var i=3;i<arguments.length;i++)B.cc.push(arguments[i]);return M(m(A,b),G1(O,A),h)}function XZ(O){if(O=="}")return M();return C(Q0,XZ)}function X9(O,A){if(Y){if(O==":")return M(E0);if(A=="?")return M(X9)}}function NH(O,A){if(Y&&(O==":"||A=="in"))return M(E0)}function Sq(O){if(Y&&O==":")if(B.stream.match(/^\s*\w+\s+is\b/,!1))return M(z0,RH,E0);else return M(E0)}function RH(O,A){if(A=="is")return B.marked="keyword",M()}function E0(O,A){if(A=="keyof"||A=="typeof"||A=="infer"||A=="readonly")return B.marked="keyword",M(A=="typeof"?S0:E0);if(O=="variable"||A=="void")return B.marked="type",M(Q8);if(A=="|"||A=="&")return M(E0);if(O=="string"||O=="number"||O=="atom")return M(Q8);if(O=="[")return M(m("]"),G1(E0,"]",","),h,Q8);if(O=="{")return M(m("}"),sQ,h,Q8);if(O=="(")return M(G1(rQ,")"),MH,Q8);if(O=="<")return M(G1(E0,">"),E0);if(O=="quasi")return C(iQ,Q8)}function MH(O){if(O=="=>")return M(E0)}function sQ(O){if(O.match(/[\}\)\]]/))return M();if(O==","||O==";")return M(sQ);return C(H4,sQ)}function H4(O,A){if(O=="variable"||B.style=="keyword")return B.marked="property",M(H4);else if(A=="?"||O=="number"||O=="string")return M(H4);else if(O==":")return M(E0);else if(O=="[")return M(c("variable"),NH,c("]"),H4);else if(O=="(")return C(K9,H4);else if(!O.match(/[;\}\)\],]/))return M()}function iQ(O,A){if(O!="quasi")return C();if(A.slice(A.length-2)!="${")return M(iQ);return M(E0,AH)}function AH(O){if(O=="}")return B.marked="string.special",B.state.tokenize=R,M(iQ)}function rQ(O,A){if(O=="variable"&&B.stream.match(/^\s*[?:]/,!1)||A=="?")return M(rQ);if(O==":")return M(E0);if(O=="spread")return M(rQ);return C(E0)}function Q8(O,A){if(A=="<")return M(m(">"),G1(E0,">"),h,Q8);if(A=="|"||O=="."||A=="&")return M(E0);if(O=="[")return M(E0,c("]"),Q8);if(A=="extends"||A=="implements")return B.marked="keyword",M(E0);if(A=="?")return M(E0,c(":"),E0)}function DH(O,A){if(A=="<")return M(m(">"),G1(E0,">"),h,Q8)}function YZ(){return C(E0,BH)}function BH(O,A){if(A=="=")return M(E0)}function aQ(O,A){if(A=="enum")return B.marked="keyword",M(bq);return C(I6,X9,x8,PH)}function I6(O,A){if(Y&&W0(A))return B.marked="keyword",M(I6);if(O=="variable")return v(A),M();if(O=="spread")return M(I6);if(O=="[")return O4(LH,"]");if(O=="{")return O4(Tq,"}")}function Tq(O,A){if(O=="variable"&&!B.stream.match(/^\s*:/,!1))return v(A),M(x8);if(O=="variable")B.marked="property";if(O=="spread")return M(I6);if(O=="}")return C();if(O=="[")return M(z0,c("]"),c(":"),Tq);return M(c(":"),I6,x8)}function LH(){return C(I6,x8)}function x8(O,A){if(A=="=")return M(S0)}function PH(O){if(O==",")return M(aQ)}function Eq(O,A){if(O=="keyword b"&&A=="else")return M(m("form","else"),Q0,h)}function Cq(O,A){if(A=="await")return M(Cq);if(O=="(")return M(m(")"),SH,h)}function SH(O){if(O=="var")return M(aQ,Y9);if(O=="variable")return M(Y9);return C(Y9)}function Y9(O,A){if(O==")")return M();if(O==";")return M(Y9);if(A=="in"||A=="of")return B.marked="keyword",M(z0,Y9);return C(z0,Y9)}function b8(O,A){if(A=="*")return B.marked="keyword",M(b8);if(O=="variable")return v(A),M(b8);if(O=="(")return M(G0,m(")"),G1(N7,")"),h,Sq,Q0,t);if(Y&&A=="<")return M(m(">"),G1(YZ,">"),h,b8)}function K9(O,A){if(A=="*")return B.marked="keyword",M(K9);if(O=="variable")return v(A),M(K9);if(O=="(")return M(G0,m(")"),G1(N7,")"),h,Sq,t);if(Y&&A=="<")return M(m(">"),G1(YZ,">"),h,K9)}function _q(O,A){if(O=="keyword"||O=="variable")return B.marked="type",M(_q);else if(A=="<")return M(m(">"),G1(YZ,">"),h)}function N7(O,A){if(A=="@")M(z0,N7);if(O=="spread")return M(N7);if(Y&&W0(A))return B.marked="keyword",M(N7);if(Y&&O=="this")return M(X9,x8);return C(I6,X9,x8)}function TH(O,A){if(O=="variable")return wq(O,A);return KZ(O,A)}function wq(O,A){if(O=="variable")return v(A),M(KZ)}function KZ(O,A){if(A=="<")return M(m(">"),G1(YZ,">"),h,KZ);if(A=="extends"||A=="implements"||Y&&O==","){if(A=="implements")B.marked="keyword";return M(Y?E0:z0,KZ)}if(O=="{")return M(m("}"),X8,h)}function X8(O,A){if(O=="async"||O=="variable"&&(A=="static"||A=="get"||A=="set"||Y&&W0(A))&&B.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1))return B.marked="keyword",M(X8);if(O=="variable"||B.style=="keyword")return B.marked="property",M(qZ,X8);if(O=="number"||O=="string")return M(qZ,X8);if(O=="[")return M(z0,X9,c("]"),qZ,X8);if(A=="*")return B.marked="keyword",M(X8);if(Y&&O=="(")return C(K9,X8);if(O==";"||O==",")return M(X8);if(O=="}")return M();if(A=="@")return M(z0,X8)}function qZ(O,A){if(A=="!"||A=="?")return M(qZ);if(O==":")return M(E0,x8);if(A=="=")return M(S0);var b=B.state.lexical.prev,i=b&&b.info=="interface";return C(i?K9:b8)}function EH(O,A){if(A=="*")return B.marked="keyword",M(oQ,c(";"));if(A=="default")return B.marked="keyword",M(z0,c(";"));if(O=="{")return M(G1(kq,"}"),oQ,c(";"));return C(Q0)}function kq(O,A){if(A=="as")return B.marked="keyword",M(c("variable"));if(O=="variable")return C(S0,kq)}function CH(O){if(O=="string")return M();if(O=="(")return C(z0);if(O==".")return C(x1);return C(WZ,xq,oQ)}function WZ(O,A){if(O=="{")return O4(WZ,"}");if(O=="variable")v(A);if(A=="*")B.marked="keyword";return M(_H)}function xq(O){if(O==",")return M(WZ,xq)}function _H(O,A){if(A=="as")return B.marked="keyword",M(WZ)}function oQ(O,A){if(A=="from")return B.marked="keyword",M(z0)}function wH(O){if(O=="]")return M();return C(G1(S0,"]"))}function bq(){return C(m("form"),I6,c("{"),m("}"),G1(kH,"}"),h,h)}function kH(){return C(I6,x8)}function xH(O,A){return O.lastType=="operator"||O.lastType==","||W.test(A.charAt(0))||/[,.]/.test(A.charAt(0))}function bH(O,A,b){return A.tokenize==F&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(A.lastType)||A.lastType=="quasi"&&/\{\s*$/.test(O.string.slice(0,O.pos-(b||0)))}return{name:Z.name,startState:function(O){var A={tokenize:F,lastType:"sof",cc:[],lexical:new k(-O,0,"block",!1),localVars:Z.localVars,context:Z.localVars&&new e(null,null,!1),indented:0};if(Z.globalVars&&typeof Z.globalVars=="object")A.globalVars=Z.globalVars;return A},token:function(O,A){if(O.sol()){if(!A.lexical.hasOwnProperty("align"))A.lexical.align=!1;A.indented=O.indentation(),E(O,A)}if(A.tokenize!=N&&O.eatSpace())return null;var b=A.tokenize(O,A);if(U=="comment")return b;return A.lastType=U=="operator"&&(z=="++"||z=="--")?"incdec":U,S(A,b,U,z,O)},indent:function(O,A,b){if(O.tokenize==N||O.tokenize==R)return null;if(O.tokenize!=F)return 0;var i=A&&A.charAt(0),X0=O.lexical,M0;if(!/^\s*else\b/.test(A))for(var C0=O.cc.length-1;C0>=0;--C0){var v1=O.cc[C0];if(v1==h)X0=X0.prev;else if(v1!=Eq&&v1!=t)break}while((X0.type=="stat"||X0.type=="form")&&(i=="}"||(M0=O.cc[O.cc.length-1])&&(M0==x1||M0==G6)&&!/^[,\.=+\-*:?[\(]/.test(A)))X0=X0.prev;if(J&&X0.type==")"&&X0.prev.type=="stat")X0=X0.prev;var i1=X0.type,N4=i==i1;if(i1=="vardef")return X0.indented+(O.lastType=="operator"||O.lastType==","?X0.info.length+1:0);else if(i1=="form"&&i=="{")return X0.indented;else if(i1=="form")return X0.indented+b.unit;else if(i1=="stat")return X0.indented+(xH(O,A)?J||b.unit:0);else if(X0.info=="switch"&&!N4&&Z.doubleIndentSwitch!=!1)return X0.indented+(/^(?:case|default)\b/.test(A)?b.unit:2*b.unit);else if(X0.align)return X0.column+(N4?0:1);else return X0.indented+(N4?0:b.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:X?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}var dx=HQ({name:"javascript"}),lx=HQ({name:"json",json:!0}),sx=HQ({name:"json",jsonld:!0}),aF=HQ({name:"typescript",typescript:!0});var RQ="";function OB(Z){let{state:J}=Z,Q=J.doc.lineAt(J.selection.main.head),X=J.selection.main.head,Y=X===Q.to?Math.min(Q.to+1,J.doc.length):Q.to;if(X===Y)return!1;return RQ=J.sliceDoc(X,Y),Z.dispatch({changes:{from:X,to:Y},userEvent:"delete"}),!0}function HB(Z){if(!RQ)return!1;let{from:J,to:Q}=Z.state.selection.main;return Z.dispatch({changes:{from:J,to:Q,insert:RQ},selection:{anchor:J+RQ.length},userEvent:"input"}),!0}var NB=nJ.of([{key:"Ctrl-f",run:GQ},{key:"Ctrl-b",run:WQ},{key:"Ctrl-n",run:zQ},{key:"Ctrl-p",run:UQ},{key:"Ctrl-a",run:BK},{key:"Ctrl-e",run:LK},{key:"Alt-f",run:DK},{key:"Alt-b",run:AK},{key:"Ctrl-d",run:VQ},{key:"Alt-d",run:PK},{key:"Ctrl-k",run:OB},{key:"Ctrl-y",run:HB},{key:"Ctrl-v",run:t9},{key:"Alt-v",run:C5},{key:"Alt-Shift-,",run:QQ},{key:"Alt-Shift-.",run:XQ}]),Y7=B0.define(),W1={count:"",operator:null,pending:""},J4=R1.define({create:()=>({mode:"normal",...W1}),update(Z,J){for(let Q of J.effects)if(Q.is(Y7))Z={...Z,...Q.value};return Z}}),o7={text:"",linewise:!1};function u1(Z,J){Z.dispatch({effects:Y7.of(J)})}function S8(Z,J){return J>=0&&J<Z.length?Z.sliceString(J,J+1):""}function T8(Z){if(!Z||/\s/.test(Z))return"space";return/[A-Za-z0-9_]/.test(Z)?"word":"punct"}function RB(Z,J){let Q=J,X=T8(S8(Z,Q));if(X!=="space")while(Q<Z.length&&T8(S8(Z,Q))===X)Q++;while(Q<Z.length&&T8(S8(Z,Q))==="space")Q++;return Q}function MB(Z,J){let Q=J-1;while(Q>=0&&T8(S8(Z,Q))==="space")Q--;if(Q<0)return 0;let X=T8(S8(Z,Q));while(Q>=0&&T8(S8(Z,Q))===X)Q--;return Q+1}function AB(Z,J){let Q=J+1;while(Q<Z.length&&T8(S8(Z,Q))==="space")Q++;if(Q>=Z.length)return Math.max(0,Z.length-1);let X=T8(S8(Z,Q));while(Q+1<Z.length&&T8(S8(Z,Q+1))===X)Q++;return Q}function t7(Z){return Z.from+/^\s*/.exec(Z.text)[0].length}function k5(Z,J,Q,X){let{doc:Y,selection:K}=Z.state,q=K.main.head,W=Y.lineAt(q),G=Q||1;switch(J){case"h":return{pos:Math.max(W.from,q-G)};case"l":return{pos:Math.min(X?W.to:Math.max(W.from,W.to-1),q+G)};case"j":case"k":{let I=K.main;for(let U=0;U<G;U++)I=Z.moveVertically(I,J==="j");return{pos:I.head,linewise:!0}}case"w":{let I=q;for(let U=0;U<G;U++)I=RB(Y,I);return{pos:I}}case"b":{let I=q;for(let U=0;U<G;U++)I=MB(Y,I);return{pos:I}}case"e":{let I=q;for(let U=0;U<G;U++)I=AB(Y,I);return{pos:I,inclusive:!0}}case"0":return{pos:W.from};case"^":return{pos:t7(W)};case"$":return{pos:X?W.to:Math.max(W.from,W.to-1)};case"gg":case"G":{let I=Q?Math.min(Math.max(Q,1),Y.lines):J==="gg"?1:Y.lines;return{pos:t7(Y.line(I)),linewise:!0}}default:return null}}function s1(Z,J){let{doc:Q}=Z.state,X=Math.max(0,Math.min(J,Q.length)),Y=Q.lineAt(X);Z.dispatch({selection:{anchor:Math.min(X,Math.max(Y.from,Y.to-1))},scrollIntoView:!0})}function NQ(Z,J){let Q=Y7.of({mode:"insert",...W1});if(J===void 0)Z.dispatch({effects:Q});else Z.dispatch({selection:{anchor:J},effects:Q,scrollIntoView:!0})}function DB(Z){let{head:J}=Z.state.selection.main,Q=Z.state.doc.lineAt(J);Z.dispatch({selection:{anchor:J>Q.from?J-1:J},effects:Y7.of({mode:"normal",...W1})})}function BB(Z,J,Q){let X=Z.lineAt(J),Y=Z.line(Math.min(X.number+Math.max(Q,1)-1,Z.lines)),K=Z.sliceString(X.from,Y.to)+`
`;if(Y.to<Z.length)return{from:X.from,to:Y.to+1,text:K};return{from:Math.max(0,X.from-1),to:Y.to,text:K}}function kK(Z,J,Q,X){let Y=Math.min(Q,X),K=Math.max(Q,X);if(o7={text:Z.state.sliceDoc(Y,K),linewise:!1},J==="y"){s1(Z,Y);return}if(J==="d"){Z.dispatch({changes:{from:Y,to:K},userEvent:"delete"}),s1(Z,Y);return}Z.dispatch({changes:{from:Y,to:K},selection:{anchor:Y},effects:Y7.of({mode:"insert",...W1}),userEvent:"delete",scrollIntoView:!0})}function MQ(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head;if(J==="c"){let W=X.lineAt(Y),G=X.line(Math.min(W.number+Math.max(Q,1)-1,X.lines)),I=t7(W);o7={text:X.sliceString(I,G.to)+`
`,linewise:!0},Z.dispatch({changes:{from:I,to:G.to},selection:{anchor:I},effects:Y7.of({mode:"insert",...W1}),userEvent:"delete",scrollIntoView:!0});return}let K=BB(X,Y,Q);if(o7={text:K.text,linewise:!0},J==="y"){s1(Z,X.lineAt(Y).from);return}Z.dispatch({changes:{from:K.from,to:K.to},userEvent:"delete"});let q=Math.min(K.from,Z.state.doc.length);s1(Z,t7(Z.state.doc.lineAt(q)))}function oF(Z,J,Q){if(!o7.text)return;let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=o7.text.repeat(Math.max(Q,1)),q=X.lineAt(Y);if(o7.linewise){let G=K.endsWith(`
`)?K.slice(0,-1):K,I=J?q.to:q.from,U=J?`
`+G:G+`
`;Z.dispatch({changes:{from:I,insert:U},userEvent:"input.paste"});let z=J?q.to+1:q.from;s1(Z,t7(Z.state.doc.lineAt(z)));return}let W=J?Math.min(Y+1,q.to):Y;Z.dispatch({changes:{from:W,insert:K},userEvent:"input.paste"}),s1(Z,W+K.length-1)}function tF(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=/^\s*/.exec(X.text)[0],K=J?X.to:X.from,q=J?`
`+Y:Y+`
`;Z.dispatch({changes:{from:K,insert:q},selection:{anchor:K+q.length-(J?0:1)},effects:Y7.of({mode:"insert",...W1}),userEvent:"input",scrollIntoView:!0})}function LB(Z,J){let{doc:Q}=Z.state,X=Q.lineAt(Z.state.selection.main.head),Y=X.to,K=0;for(let W=Math.max(J-1,1);W>0;W--){let G=Q.lineAt(Y).number+1;if(G>Q.lines)break;Y=Q.line(G).to,K++}if(!K)return;let q=Q.sliceString(X.from,Y).replace(/\n\s*/g," ");Z.dispatch({changes:{from:X.from,to:Y,insert:q},userEvent:"input"}),s1(Z,X.from+X.text.replace(/\s+$/,"").length)}function wK(Z,J,Q){let{doc:X}=Z.state,Y=Z.state.selection.main.head,K=X.lineAt(Y),q=Math.min(K.to,Y+Math.max(J,1));if(q===Y)return;if(o7={text:X.sliceString(Y,q),linewise:!1},Q){Z.dispatch({changes:{from:Y,to:q},selection:{anchor:Y},effects:Y7.of({mode:"insert",...W1}),userEvent:"delete"});return}Z.dispatch({changes:{from:Y,to:q},userEvent:"delete"}),s1(Z,Y)}function eF(Z,J,Q,X){let Y=Z.state.selection.main.head,K=k5(Z,Q,X,!0);if(!K){u1(Z,W1);return}if(K.linewise){let{doc:W}=Z.state,G=W.lineAt(Y).number,I=W.lineAt(Math.max(0,Math.min(K.pos,W.length))).number,U=W.line(Math.min(G,I));if(s1(Z,U.from),MQ(Z,J,Math.abs(I-G)+1),J!=="c")u1(Z,W1);return}let q=K.inclusive?K.pos+1:K.pos;if(kK(Z,J,Y,q),J!=="c")u1(Z,W1)}var PB=new Set(["Enter","Backspace","Delete","Tab"]);function SB(Z,J,Q){let X=J.key,Y=Q.count?parseInt(Q.count,10):0;if(J.ctrlKey){if(X==="r")return E5(Z)||!0;if(X==="d")return t9(Z)||!0;if(X==="u")return C5(Z)||!0;if(X==="[")return u1(Z,W1),!0;return!1}if(X==="Escape")return u1(Z,W1),!0;if(PB.has(X)){if(X==="Enter"){let I=k5(Z,"j",Y,!1);if(I)s1(Z,t7(Z.state.doc.lineAt(I.pos)))}else if(X==="Backspace"){let I=k5(Z,"h",Y,!1);if(I)s1(Z,I.pos)}else if(X==="Delete")wK(Z,Y||1,!1);return u1(Z,W1),!0}if(X.length!==1)return!1;if(/[1-9]/.test(X)||X==="0"&&Q.count)return u1(Z,{count:Q.count+X}),!0;if(Q.pending==="g"){if(X==="g")if(Q.operator)eF(Z,Q.operator,"gg",Y);else{let I=k5(Z,"gg",Y,!1);s1(Z,I.pos),u1(Z,W1)}else u1(Z,W1);return!0}if(X==="g")return u1(Z,{pending:"g"}),!0;if(Q.operator){if(X===Q.operator){if(MQ(Z,Q.operator,Y||1),Q.operator!=="c")u1(Z,W1)}else eF(Z,Q.operator,X,Y);return!0}if(X==="d"||X==="c"||X==="y")return u1(Z,{operator:X}),!0;let K=k5(Z,X,Y,!1);if(K)return s1(Z,K.pos),u1(Z,W1),!0;let{doc:q}=Z.state,W=Z.state.selection.main.head,G=q.lineAt(W);switch(X){case"i":NQ(Z,W);break;case"a":NQ(Z,Math.min(W+1,G.to));break;case"I":NQ(Z,t7(G));break;case"A":NQ(Z,G.to);break;case"o":tF(Z,!0);break;case"O":tF(Z,!1);break;case"x":wK(Z,Y||1,!1);break;case"s":wK(Z,Y||1,!0);break;case"S":MQ(Z,"c",Y||1);break;case"D":kK(Z,"d",W,G.to);break;case"C":kK(Z,"c",W,G.to);break;case"Y":MQ(Z,"y",Y||1);break;case"p":oF(Z,!0,Y||1);break;case"P":oF(Z,!1,Y||1);break;case"J":LB(Z,Y||1);break;case"u":KQ(Z);break;default:break}return u1(Z,W1),!0}function TB(Z,J){let Q=J.state.field(J4,!1);if(!Q)return!1;if(Z.metaKey||Z.altKey)return!1;if(Z.key==="Shift"||Z.key==="Control")return!1;if(Z.key==="Alt"||Z.key==="Meta")return!1;if(Q.mode==="insert"){if(Z.key==="Escape"||Z.ctrlKey&&Z.key==="[")return DB(J),Z.preventDefault(),!0;return!1}if(!SB(J,Z,Q))return!1;return Z.preventDefault(),Z.stopPropagation(),!0}function EB(Z){let J=document.createElement("div");J.className="cm-vim-panel";let Q=(X)=>{let Y=X.field(J4,!1);if(!Y)return;let K=Y.count+(Y.operator??"")+Y.pending;J.textContent=(Y.mode==="insert"?"-- INSERT --":"-- NORMAL --")+(K?"  "+K:"")};return Q(Z.state),{dom:J,bottom:!0,update:(X)=>Q(X.state)}}var CB=[J4,K0.domEventHandlers({keydown:TB}),K0.inputHandler.of((Z)=>{let J=Z.state.field(J4,!1);return!!J&&J.mode!=="insert"}),K0.editorAttributes.compute([J4],(Z)=>{let J=Z.field(J4,!1);return J&&J.mode!=="insert"?{class:"cm-vim-normal"}:{}}),n9.of(EB)],_B=new Set(["as","assert","auto","case","const","delegate","derive","echo","else","fn","if","implement","import","let","macro","opaque","panic","pub","test","todo","type","use"]),wB=r7.define({name:"gleam",token(Z){if(Z.eatSpace())return null;if(Z.match("//"))return Z.skipToEnd(),"comment";if(Z.peek()==='"'){Z.next();let Q=!1;while(!Z.eol()){let X=Z.next();if(Q)Q=!1;else if(X==="\\")Q=!0;else if(X==='"')break}return"string"}if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9]*/))return"typeName";if(Z.match(/^[a-z_][a-z0-9_]*/))return _B.has(Z.current())?"keyword":"variableName";if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}#".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"//"},closeBrackets:{brackets:["(","[","{",'"']}}}),kB=new Set(["after","and","case","catch","cond","def","defdelegate","defexception","defguard","defimpl","defmacro","defmodule","defp","defprotocol","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","rescue","try","unless","unquote","use","when","with"]),xB=new Set(["true","false","nil"]),bB=r7.define({name:"elixir",token(Z){if(Z.eatSpace())return null;if(Z.match("#"))return Z.skipToEnd(),"comment";if(Z.match('"""')||Z.match("'''"))return Z.skipToEnd(),"string";if(Z.peek()==='"'||Z.peek()==="'"){let Q=Z.next(),X=!1;while(!Z.eol()){let Y=Z.next();if(X)X=!1;else if(Y==="\\")X=!0;else if(Y===Q)break}return"string"}if(Z.match(/^~[a-zA-Z]/)){let Q=Z.next(),X={"(":")","[":"]","{":"}","<":">"}[Q]??Q;while(!Z.eol()&&Z.next()!==X);return Z.match(/^[a-z]*/),"string"}if(Z.match(/^[@^][a-z_][A-Za-z0-9_]*/))return"variableName";if(Z.match(/^:"[^"]*"/)||Z.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/))return"atom";if(/[0-9]/.test(Z.peek()))return Z.match(/^0[box][0-9a-fA-F_]+/)||Z.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/),"number";if(Z.match(/^[A-Z][A-Za-z0-9_]*/))return"typeName";if(Z.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)){let Q=Z.current();if(kB.has(Q))return"keyword";if(xB.has(Q))return"atom";return"variableName"}if(Z.match("|>")||Z.match("<>")||Z.match("->")||Z.match("<-")||Z.match("=>")||Z.match("..")||Z.match("<=")||Z.match(">=")||Z.match("===")||Z.match("==")||Z.match("!=")||Z.match("&&")||Z.match("||"))return"operator";let J=Z.next();if("+-*/%=<>!&|".includes(J))return"operator";if("()[]{}".includes(J))return"bracket";return null},languageData:{commentTokens:{line:"#"},closeBrackets:{brackets:["(","[","{",'"']}}}),yB=o9.define([{tag:n.keyword,color:"#bb9af7"},{tag:n.string,color:"#9ece6a"},{tag:n.comment,color:"#565f89",fontStyle:"italic"},{tag:n.number,color:"#ff9e64"},{tag:n.typeName,color:"#2ac3de"},{tag:n.variableName,color:"#c0caf5"},{tag:n.operator,color:"#89ddff"},{tag:n.bracket,color:"#a9b1d6"}]),hB=K0.theme({"&":{backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"var(--editor-font-size, 14px)",height:"100%"},".cm-content":{caretColor:"var(--accent)",fontFamily:"inherit",padding:"12px 0"},".cm-gutters":{backgroundColor:"var(--bg-secondary)",color:"var(--text-secondary)",border:"none",opacity:"0.7"},".cm-activeLine":{backgroundColor:"rgba(65, 72, 104, 0.3)"},".cm-activeLineGutter":{backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--bg-hover)"},".cm-cursor":{borderLeftColor:"var(--accent)"}},{dark:!0});function ZO(Z){switch(Z){case"vim":return M8.highest(CB);case"emacs":return M8.highest(NB);default:return[]}}function JO(Z){switch(Z){case"python":return r7.define(rF);case"typescript":return r7.define(aF);case"elixir":return bB;default:return wB}}class QO extends HTMLElement{static observedAttributes=["keymap","language"];#Z=null;#q="";#X=[];#J=new u7;#Q=new u7;set doc(Z){if(this.#q=Z??"",this.#Z&&this.#Z.state.doc.toString()!==this.#q)this.#Z.dispatch({changes:{from:0,to:this.#Z.state.doc.length,insert:this.#q}})}get doc(){return this.#Z?this.#Z.state.doc.toString():this.#q}set diagnostics(Z){if(this.#X=Array.isArray(Z)?Z:[],this.#Z)this.#K()}get#Y(){return this.getAttribute("keymap")??"default"}get#W(){return this.getAttribute("language")??"gleam"}attributeChangedCallback(Z,J,Q){if(!this.#Z)return;switch(Z){case"keymap":this.#Z.dispatch({effects:this.#J.reconfigure(ZO(this.#Y))});break;case"language":this.#Z.dispatch({effects:this.#Q.reconfigure(JO(this.#W))});break}}connectedCallback(){if(this.#Z)return;let Z=K0.updateListener.of((J)=>{if(J.docChanged)this.dispatchEvent(new CustomEvent("editor-change",{detail:{value:J.state.doc.toString()},bubbles:!0}))});if(this.#Z=new K0({state:D0.create({doc:this.#q,extensions:[this.#J.of(ZO(this.#Y)),Rj(),UF(),zj(),aj(),jj(),r9.of("  "),this.#Q.of(JO(this.#W)),dj(yB),hB,nJ.of([gF,...$F,...jF]),Z]}),parent:this}),this.#X.length>0)this.#K()}disconnectedCallback(){this.#Z?.destroy(),this.#Z=null}#K(){let Z=this.#Z.state.doc,J=this.#X.flatMap((Q)=>{if(!Q||typeof Q.line!=="number")return[];let X=Z.line(Math.min(Math.max(Q.line,1),Z.lines)),Y=Math.min(X.from+Math.max((Q.column??1)-1,0),X.to),q=X.text.slice(Y-X.from).match(/^\S+/),W=Math.min(Y+(q?q[0].length:1),Z.length);return[{from:Y,to:Math.max(W,Math.min(Y+1,Z.length)),severity:"error",message:String(Q.message??"")}]});this.#Z.dispatch(vF(this.#Z.state,J))}}function xK(){if(!customElements.get("gleam-editor"))customElements.define("gleam-editor",QO)}class x5 extends P{constructor(Z,J,Q){super();this.line=Z,this.column=J,this.message=Q}}function XO(Z){return e0("gleam-editor",Z,$)}function YO(Z){return u4("doc",K1(Z))}function KO(Z){return s0("keymap",Z)}function qO(Z){return s0("language",Z)}function WO(Z){return u4("diagnostics",U8(Z,(J)=>{return w7(j([["line",n6(J.line)],["column",n6(J.column)],["message",K1(J.message)]]))}))}function GO(Z){return t4("editor-change",O9(j(["detail","value"]),_0,(J)=>{return k0(Z(J))}))}class Q4 extends P{}var K7=new Q4;class E8 extends P{}var b5=new E8;class AQ extends P{}var DQ=new AQ;class e6 extends P{constructor(Z,J,Q){super();this.category=Z,this.subcategory=J,this.title=Q}}class X4 extends P{}var $B=new X4;class BQ extends P{}var bK=new BQ;class Y4 extends P{}var UO=new Y4;class LQ extends P{constructor(Z){super();this[0]=Z}}class yK extends P{constructor(Z,J,Q,X){super();this.label=Z,this.expected=J,this.actual=Q,this.passed=X}}class hK extends P{constructor(Z,J,Q,X,Y){super();this.phase=Z,this.file=J,this.line=Q,this.column=X,this.message=Y}}class q7 extends P{constructor(Z){super();this[0]=Z}}class W7 extends P{constructor(Z){super();this[0]=Z}}class $K extends P{}var gK=new $K;class PQ extends P{}var K4=new PQ;class G7 extends P{constructor(Z){super();this.id=Z}}class I7 extends P{constructor(Z,J){super();this.outcome=Z,this.stdout=J}}class U7 extends P{}var SQ=new U7;class fK extends P{}var y5=new fK;class F0 extends P{constructor(Z,J,Q,X,Y,K,q,W,G,I,U,z,V,F,H,N,R,T,E){super();this.route=Z,this.selected_category=J,this.selected_subcategory=Q,this.selected=X,this.problem_index=Y,this.iteration_count=K,this.current_iteration=q,this.draft=W,this.revealed_solution=G,this.runtimes=I,this.run=U,this.drafts=z,this.attempts=V,this.search=F,this.next_run_id=H,this.editor_keymap=N,this.choice=R,this.graded=T,this.exam_answers=E}}class h5 extends P{constructor(Z){super();this[0]=Z}}class $5 extends P{constructor(Z){super();this[0]=Z}}class g5 extends P{constructor(Z){super();this[0]=Z}}class C8 extends P{constructor(Z){super();this[0]=Z}}class TQ extends P{}var zO=new TQ;class EQ extends P{}var VO=new EQ;class f5 extends P{constructor(Z){super();this[0]=Z}}class CQ extends P{}var jO=new CQ;class u5 extends P{}var FO=new u5;class v5 extends P{constructor(Z){super();this[0]=Z}}class q4 extends P{constructor(Z){super();this[0]=Z}}class _Q extends P{}var uK=new _Q;class m5 extends P{constructor(Z){super();this[0]=Z}}class n5 extends P{constructor(Z){super();this[0]=Z}}class W4 extends P{constructor(Z){super();this[0]=Z}}class wQ extends P{}var OO=new wQ;class p5 extends P{}var HO=new p5;class Z9 extends P{constructor(Z){super();this.language=Z}}class z7 extends P{constructor(Z,J){super();this.language=Z,this.message=J}}class G4 extends P{constructor(Z,J,Q){super();this.id=Z,this.outcome=J,this.stdout=Q}}class c5 extends P{constructor(Z){super();this.id=Z}}class d5 extends P{constructor(Z){super();this[0]=Z}}class kQ extends P{}var NO=new kQ;class xQ extends P{}var RO=new xQ;class bQ extends P{constructor(Z){super();this[0]=Z}}class vK extends P{}var MO=new vK;class AO extends P{constructor(Z,J,Q){super();this.section=Z,this.correct=J,this.total=Q}}var yQ=70;function V7(){return new F0(K7,U0,U0,$,0,3,1,"",U0,$,K4,$,$,"",1,"default",U0,!1,$)}function I4(Z,J){return ZW(Z,(Q)=>{if(P0(Q[0],J))return new L(Q[1]);else return new V0(void 0)})}function l5(Z,J){let Q=I4(Z.runtimes,J);if(Q instanceof L)return Q[0];else return $B}function $6(Z,J,Q){return w([J,Q],Q1(Z,(X)=>{return!P0(X[0],J)}))}function W6(Z){let J=Z.selected,Q=HZ(J,Z.problem_index);return OZ(Q)}function e7(Z,J){if(J===0)return J;else return y8(Z*100,J)}function DO(Z,J){let X=H0(J,(K)=>{let q=Q1(Z,(W)=>{return W[0].subcategory===K});return new AO(K,U9(q,(W)=>{return W[1]}),I1(q))}),Y=Q1(X,(K)=>{return K.total>0});return MZ(Y,(K,q)=>{let W=_W(e7(K.correct,K.total),e7(q.correct,q.total));if(W instanceof B1)return zW(K.section,q.section);else return W})}class hQ extends P{}var $Q=new hQ;class gQ extends P{}var fQ=new gQ;class uQ extends P{}var BO=new uQ;class vQ extends P{}var LO=new vQ;class PO extends P{}var SO=new PO;class g extends P{constructor(Z,J,Q){super();this.signature=Z,this.starter=J,this.harness=Q}}class Q9 extends P{constructor(Z,J,Q){super();this.label=Z,this.note=J,this.code=Q}}class mK extends P{constructor(Z,J,Q,X){super();this.choices=Z,this.correct=J,this.explanation=Q,this.page=X}}class _8 extends P{constructor(Z,J,Q,X,Y,K,q){super();this.title=Z,this.prompt=J,this.approach=Q,this.solutions=X,this.language=Y,this.check=K,this.quiz=q}}class j1 extends P{constructor(Z,J){super();this.name=Z,this.problems=J}}class w8 extends P{constructor(Z,J){super();this.name=Z,this.subcategories=J}}function TO(Z){if(Z instanceof hQ)return"Python";else if(Z instanceof gQ)return"Gleam";else if(Z instanceof uQ)return"TypeScript";else if(Z instanceof vQ)return"Elixir";else return"Concept"}function s5(Z){if(Z instanceof hQ)return"python";else if(Z instanceof gQ)return"gleam";else if(Z instanceof uQ)return"typescript";else if(Z instanceof vQ)return"elixir";else return"concept"}function U4(Z){if(Z==="Contains Duplicate")return"A set-membership problem. Walk the list once, keeping a set of everything seen so far; the moment a value is already in the set you've found a duplicate. Sorting first and checking neighbours also works, but costs O(n log n) against the set's O(n).";else if(Z==="Valid Anagram")return"A frequency-counting problem. Two strings are anagrams exactly when every character occurs the same number of times in both, so build a character-count map for each and compare them. Sorting both strings and comparing is the simpler O(n log n) alternative.";else if(Z==="Two Sum")return"A hash-map complement lookup. For each number, ask: have I already seen target minus this number? Keep a map from value to index as you walk; each lookup is O(1), one pass total. The brute force checks every pair at O(n²).";else if(Z==="Group Anagrams")return"A canonical-key bucketing problem. Anagrams become identical when you sort their letters, so use the sorted word as a map key and append each word to its bucket. The map's values are the groups.";else if(Z==="Top K Frequent Elements")return"Count, then select. Build a value-to-frequency map first; then pick the k largest counts — sorting the (value, count) pairs by count is the simple way, a heap of size k is the classic optimisation when k is much smaller than n.";else if(Z==="Encode and Decode Strings")return"A framing problem rather than a string problem. Any encoding is legal so long as decode undoes it, so the only real question is how the decoder knows where each string ends. Length-prefixing answers it outright — read a number, take that many characters — and needs no assumption about what the strings contain. A separator works too, but only with escaping. Either way the encoding has to tell an empty list apart from a list holding one empty string.";else if(Z==="Product of Array Except Self")return"A prefix/suffix problem. The answer at position i is (product of everything before i) × (product of everything after i). Compute prefix products in one pass, suffix products in a reverse pass, and multiply them position-wise — no division needed.";else if(Z==="Valid Sudoku")return"Three constraints, checked together. A digit is illegal if it repeats within its row, its column, or its 3×3 box, so either carry one set of (value, unit) signatures and test all three as you walk, or gather the 27 units and check each for a repeat. Only filled cells matter: the board does not have to be solvable, only consistent.";else if(Z==="Longest Consecutive Sequence")return"A set problem with a pruning trick. Put every number in a set; then only start counting a run at numbers that have no predecessor (n-1 not in the set), walking forward while successors exist. Each number is visited at most twice, so it's O(n) despite the nested-looking walk.";else if(Z==="Valid Palindrome")return"Normalise, then compare from both ends. Strip everything but letters and digits, lowercase, then either walk two pointers inwards or just compare the cleaned sequence with its reverse — same complexity, pick whichever reads better in your language.";else if(Z==="Two Sum II - Input Array Is Sorted")return"A two-pointer convergence problem — the sortedness is the whole hint. Start pointers at both ends: too small a sum means advance the left pointer (bigger values), too big means retreat the right. They meet in O(n) with no extra memory.";else if(Z==="3Sum")return"Sort, fix one, two-pointer the rest. After sorting, fix each number in turn and run the Two Sum II two-pointer scan on the remainder looking for the negated value. Sorting also makes duplicate triples easy to skip.";else if(Z==="Container With Most Water")return"Two pointers with a greedy argument. Start at both ends; the area is limited by the shorter line, so moving the taller pointer can never help — always move the shorter one inwards and track the best area seen.";else if(Z==="Trapping Rain Water")return"Ask what sits above one position, not how the pools are shaped. The water at index i is min(tallest to the left, tallest to the right) minus height[i]. Computing both running maxima and summing is the direct reading; the two-pointer version gets there in one pass by always advancing the shorter side, where the near maximum alone already fixes the water level.";else if(Z==="Best Time to Buy and Sell Stock")return"A running-minimum problem. Sweep once, tracking the cheapest price seen so far and the best profit if you sold today (price minus that minimum). One pass, two variables.";else if(Z==="Longest Substring Without Repeating Characters")return"A sliding-window problem. Grow the window rightwards; remember the last index of each character, and when you hit a repeat, jump the window's start past that character's previous position. Track the widest window seen.";else if(Z==="Longest Repeating Character Replacement")return"A sliding window with a validity rule. A window can be made uniform with k changes when window size minus its most-frequent-character count is at most k. Grow the right edge; when the rule breaks, shrink from the left. The answer is the biggest valid window.";else if(Z==="Permutation in String")return"A fixed-width sliding window. A permutation of s1 is just any window of length |s1| in s2 with identical character frequencies — slide the window one character at a time, incrementally adding the new character and removing the old, comparing frequency maps.";else if(Z==="Minimum Window Substring")return'A sliding window that grows until it is valid and shrinks while it stays valid. The whole trick is making "valid" a single integer test rather than a map comparison: count how many needed characters are still missing, decrement only when a character that was genuinely still needed arrives, and the window is valid exactly when that count hits zero. Then pull the left edge in as far as it will go before growing again.';else if(Z==="Sliding Window Maximum")return"The maximum is not something you can maintain by adding and removing — dropping the current maximum leaves you with no idea what the next one is. Two ways out: keep a queue of the indices that could still win, values decreasing, so the front is always the answer; or pre-compute running maxima within blocks of k, since every window straddles at most one block boundary. Both are O(n).";else if(Z==="Valid Parentheses")return"A stack problem. On every opener, push the closer you expect; on every closer, it must match the top of the stack. Valid means never mismatching and ending with an empty stack.";else if(Z==="Min Stack")return"Augment each entry. Store pairs of (value, minimum-so-far) so the current minimum always sits on top; push computes the new pair's min against the previous top, pop just discards. All four operations are O(1).";else if(Z==="Daily Temperatures")return"A monotonic-stack problem. Keep a stack of indices whose answer is still unknown, always in decreasing temperature order. Each new day pops every colder entry — the popped days just found their warmer day — then pushes itself.";else if(Z==="Binary Search")return"The classic halving. Compare the target with the middle element and discard the half that can't contain it; repeat until found or empty. O(log n) because the search space halves every step.";else if(Z==="Find Minimum in Rotated Sorted Array")return"Binary search on a rotation. The minimum is the one place order breaks. Compare the middle against a boundary: if the segment looks sorted the minimum is at its start; otherwise the rotation point — and the minimum — hides in the unsorted half.";else if(Z==="Search in Rotated Sorted Array")return"Binary search with a twist: after the rotation, one half around the midpoint is always sorted. Check which half is sorted, then use its endpoints to decide whether the target lies inside it — recurse into that half or the other.";else if(Z==="Pattern matching on lists")return"In Gleam a list is either [] or [head, ..tail] — every list function is a case expression over those two shapes (plus [only] when the last element matters). Recursion replaces loops: handle the empty case, then recurse on the tail.";else if(Z==="Tail recursion with accumulators")return"The loop-variable idiom: a public wrapper calls a private helper that carries the work-in-progress as an extra argument. When the recursive call is the last thing the function does, the compiler turns it into a loop — no stack growth.";else if(Z==="fold is the loop")return"Anything that walks a list carrying state is a fold: give it an initial value and a function combining the accumulator with each element. max, counting, and running totals all fall out; list.scan is fold that keeps the intermediate values.";else if(Z==="Frequency maps with dict.upsert")return"dict.upsert is Gleam's counter idiom: it hands you Some(current) or None and stores what you return, so counting is one fold with option.unwrap(n, 0) + 1 inside.";else if(Z==="Result chains with use")return"use x <- result.try(...) flattens what would be nested case expressions: each fallible step either binds its Ok value and continues, or short-circuits the whole function with the Error. Read it as early-return for Results.";else if(Z==="Option ergonomics")return"Chains of option.map / option.unwrap / option.from_result express “use it if present, fall back if not” without a single case expression. Reach for them when the code is a straight pipeline over a maybe-missing value.";else if(Z==="String prefix patterns and graphemes")return'Gleam can pattern-match string prefixes directly: "# " <> rest binds everything after the prefix. For anything character-by-character, convert with string.to_graphemes and use list functions.';else if(Z==="Pipelines")return"The |> operator feeds each result into the next call, turning inside-out nesting into a top-to-bottom recipe. If you find yourself naming throwaway intermediate variables, it probably wants to be a pipeline.";else if(Z==="Records: labelled args and update syntax")return"Records are immutable: construction uses labelled arguments, and “modifying” one is Record(..old, field: new) — a copy with some fields swapped. Updates return the new record; nothing changes in place.";else if(Z==="gleam/set for membership and dedupe")return"Membership questions want a set, not a list — contains is effectively O(1). Deduping while keeping first-seen order is a fold carrying #(kept, seen): append to kept only when insert into seen reports the value is new.";else if(Z==="Counter for frequency maps")return"collections.Counter is the counting idiom: feed it any iterable and it's a dict of value → count, with missing keys reading as 0 and most_common(k) giving the top k — no manual dict bookkeeping.";else if(Z==="defaultdict for grouping")return"collections.defaultdict removes the “is the key there yet?” dance: defaultdict(list) materialises an empty list on first touch, so grouping is one append per item. Use int for counters and set for unique membership.";else if(Z==="deque for O(1) popleft")return"Lists pop from the front in O(n); collections.deque does it in O(1). Any queue-shaped algorithm — breadth-first search above all — wants a deque: append to the right, popleft from the left.";else if(Z==="heapq for min/max heaps")return"heapq turns a plain list into a min-heap: heapify in O(n), push and pop in O(log n). Python has no max-heap — negate values on the way in and out. Reach for it when you repeatedly need the smallest (or largest) of a changing collection.";else if(Z==="Enumerate, zip, and unpacking")return"enumerate gives you index and value together, zip walks two sequences in lockstep, and tuple unpacking names the pieces directly — between them, almost no loop needs range(len(...)).";else if(Z==="Slicing and reversal")return"Slices are Python's substring/subarray notation: s[a:b:step]. The famous ones: [::-1] reverses, [:] copies, negative indices count from the end. They never mutate — every slice is a new sequence.";else if(Z==="Sorting with a key")return"sort/sorted take a key function that maps each element to what it should be compared by — len, a tuple for multi-field ordering, a negated number for descending. sort mutates in place; sorted returns a new list.";else if(Z==="Building strings efficiently")return"Strings are immutable, so building one with += in a loop re-copies everything each time — O(n²). Collect the pieces in a list and ''.join(parts) once at the end for O(n).";else return""}class u extends P{constructor(Z,J){super();this.solutions=Z,this.check=J}}function gB(){return new u(j([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`import gleam/set

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
}`]]),new g("pub fn contains_duplicate(nums: List(Int)) -> Bool",`pub fn contains_duplicate(nums: List(Int)) -> Bool {
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
}`))}function fB(){return new u(j([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`import gleam/dict
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
}`]]),new g("pub fn is_anagram(s: String, t: String) -> Bool",`pub fn is_anagram(s: String, t: String) -> Bool {
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
}`))}function uB(){return new u(j([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`import gleam/dict

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
}`]]),new g("pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil)",`pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
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
}`))}function vB(){return new u(j([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

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
}`]]),new g("pub fn group_anagrams(strs: List(String)) -> List(List(String))",`pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
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
}`))}function mB(){return new u(j([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`import gleam/dict
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
}`]]),new g("pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int)",`pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
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
}`))}function nB(){return new u(j([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`import gleam/list

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
}`]]),new g("pub fn product_except_self(nums: List(Int)) -> List(Int)",`pub fn product_except_self(nums: List(Int)) -> List(Int) {
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
}`))}function pB(){return new u(j([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`import gleam/int
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
}`]]),new g("pub fn longest_consecutive(nums: List(Int)) -> Int",`pub fn longest_consecutive(nums: List(Int)) -> Int {
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
}`))}function cB(){return new u(j([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`import gleam/list
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
}`]]),new g("pub fn is_palindrome(s: String) -> Bool",`pub fn is_palindrome(s: String) -> Bool {
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
}`))}function dB(){return new u(j([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

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
}`]]),new g(`pub fn two_sum_sorted(
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
}`))}function lB(){return new u(j([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`import gleam/int
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
}`]]),new g("pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int))",`pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
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
}`))}function sB(){return new u(j([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`import gleam/int
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
}`]]),new g("pub fn max_area(heights: List(Int)) -> Int",`pub fn max_area(heights: List(Int)) -> Int {
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
}`))}function iB(){return new u(j([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`import gleam/int
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
}`]]),new g("pub fn max_profit(prices: List(Int)) -> Int",`pub fn max_profit(prices: List(Int)) -> Int {
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
}`))}function rB(){return new u(j([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`import gleam/dict
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
}`]]),new g("pub fn length_of_longest_substring(s: String) -> Int",`pub fn length_of_longest_substring(s: String) -> Int {
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
}`))}function aB(){return new u(j([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`import gleam/dict
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
}`]]),new g("pub fn character_replacement(s: String, k: Int) -> Int",`pub fn character_replacement(s: String, k: Int) -> Int {
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
}`))}function oB(){return new u(j([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`import gleam/dict
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
}`]]),new g("pub fn check_inclusion(s1: String, s2: String) -> Bool",`pub fn check_inclusion(s1: String, s2: String) -> Bool {
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
}`))}function tB(){return new u(j([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`import gleam/string

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
}`]]),new g("pub fn is_valid(s: String) -> Bool",`pub fn is_valid(s: String) -> Bool {
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
}`))}function eB(){return new u(j([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`import gleam/int

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
}`]]),new g(`pub type MinStack {
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
}`))}function ZL(){return new u(j([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`import gleam/dict
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
}`]]),new g("pub fn daily_temperatures(temps: List(Int)) -> List(Int)",`pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
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
}`))}function JL(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function QL(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("pub fn find_min(nums: List(Int)) -> Result(Int, Nil)",`pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
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
}`))}function XL(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil)",`pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
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
}`))}function YL(){return new u(j([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`import gleam/int
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
}`]]),new g(`pub fn encode(strs: List(String)) -> String

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
}`))}function KL(){return new u(j([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`import gleam/int
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
}`]]),new g("pub fn is_valid_sudoku(board: List(List(String))) -> Bool",`pub fn is_valid_sudoku(board: List(List(String))) -> Bool {
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
}`))}function qL(){return new u(j([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`import gleam/int
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
}`]]),new g("pub fn trap(height: List(Int)) -> Int",`pub fn trap(height: List(Int)) -> Int {
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
}`))}function WL(){return new u(j([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`import gleam/dict.{type Dict}
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
}`]]),new g("pub fn min_window(s: String, t: String) -> String",`pub fn min_window(s: String, t: String) -> String {
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
}`))}function GL(){return new u(j([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`import gleam/int
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
}`]]),new g("pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int)",`pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
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
}`))}function pK(){return new u(j([["Solution 1","",`pub fn length(items: List(a)) -> Int {
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
}`]]),new g(`pub fn length(items: List(a)) -> Int

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
}`))}function cK(){return new u(j([["Solution 1","",`pub fn reverse(items: List(a)) -> List(a) {
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
}`]]),new g(`pub fn reverse(items: List(a)) -> List(a)

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
}`))}function dK(){return new u(j([["Solution 1","",`import gleam/int
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
}`]]),new g(`pub fn max(numbers: List(Int)) -> Result(Int, Nil)

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
}`))}function lK(){return new u(j([["Solution 1","",`import gleam/dict
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
}`]]),new g("pub fn word_frequencies(text: String) -> dict.Dict(String, Int)",`pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
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
}`))}function sK(){return new u(j([["Solution 1","",`import gleam/int
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
}`]]),new g(`pub type Config {
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
}`))}function iK(){return new u(j([["Solution 1","",`import gleam/dict
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
}`]]),new g("pub fn port_description(config: dict.Dict(String, String)) -> String",`pub fn port_description(config: dict.Dict(String, String)) -> String {
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
}`))}function rK(){return new u(j([["Solution 1","",`import gleam/list
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
}`]]),new g(`pub fn strip_comment(line: String) -> String

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
}`))}function aK(){return new u(j([["Solution 1","",`import gleam/list
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
}`]]),new g("pub fn slug(title: String) -> String",`pub fn slug(title: String) -> String {
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
}`))}function oK(){return new u(j([["Solution 1","",`pub type Player {
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
}`]]),new g(`pub type Player {
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
}`))}function tK(){return new u(j([["Solution 1","",`import gleam/list
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
}`]]),new g("pub fn dedupe(items: List(a)) -> List(a)",`pub fn dedupe(items: List(a)) -> List(a) {
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
}`))}function EO(Z){if(Z==="nc01_contains_duplicate")return new L(gB());else if(Z==="nc02_valid_anagram")return new L(fB());else if(Z==="nc03_two_sum")return new L(uB());else if(Z==="nc04_group_anagrams")return new L(vB());else if(Z==="nc05_top_k_frequent")return new L(mB());else if(Z==="nc06_product_except_self")return new L(nB());else if(Z==="nc07_longest_consecutive")return new L(pB());else if(Z==="nc08_valid_palindrome")return new L(cB());else if(Z==="nc09_two_sum_sorted")return new L(dB());else if(Z==="nc10_three_sum")return new L(lB());else if(Z==="nc11_container_water")return new L(sB());else if(Z==="nc12_best_time_stock")return new L(iB());else if(Z==="nc13_longest_substring")return new L(rB());else if(Z==="nc14_character_replacement")return new L(aB());else if(Z==="nc15_permutation_in_string")return new L(oB());else if(Z==="nc16_valid_parentheses")return new L(tB());else if(Z==="nc17_min_stack")return new L(eB());else if(Z==="nc18_daily_temperatures")return new L(ZL());else if(Z==="nc19_binary_search")return new L(JL());else if(Z==="nc20_find_min_rotated")return new L(QL());else if(Z==="nc21_search_rotated")return new L(XL());else if(Z==="nc22_encode_decode")return new L(YL());else if(Z==="nc23_valid_sudoku")return new L(KL());else if(Z==="nc24_trapping_rain_water")return new L(qL());else if(Z==="nc25_min_window_substring")return new L(WL());else if(Z==="nc26_sliding_window_maximum")return new L(GL());else if(Z==="tip01_list_patterns")return new L(pK());else if(Z==="tip02_tail_recursion")return new L(cK());else if(Z==="tip03_fold")return new L(dK());else if(Z==="tip04_frequency_maps")return new L(lK());else if(Z==="tip05_result_chains")return new L(sK());else if(Z==="tip06_option")return new L(iK());else if(Z==="tip07_string_patterns")return new L(rK());else if(Z==="tip08_pipelines")return new L(aK());else if(Z==="tip09_records")return new L(oK());else if(Z==="tip10_set_dedupe")return new L(tK());else return new V0(void 0)}function Z8(Z,J,Q){return new _8(Z,J,U4(Z),H0(Q.solutions,(X)=>{return new Q9(X[0],X[1],X[2])}),fQ,new a(Q.check),U0)}function CO(){return new w8("Gleam Tips",j([new j1("Idioms",j([Z8("Pattern matching on lists","Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",pK()),Z8("Tail recursion with accumulators","Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",cK()),Z8("fold is the loop","Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",dK()),Z8("Frequency maps with dict.upsert","Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",lK()),Z8("Result chains with use","Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",sK()),Z8("Option ergonomics",'Write port_description(config) that reads an optional "port" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.',iK()),Z8("String prefix patterns and graphemes",'Implement strip_comment using "# " <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.',rK()),Z8("Pipelines","Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",aK()),Z8("Records: labelled args and update syntax","Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",oK()),Z8("gleam/set for membership and dedupe","Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",tK())]))]))}class b0 extends P{constructor(Z,J,Q){super();this.title=Z,this.prompt=J,this.stem=Q}}class z4 extends P{constructor(Z,J){super();this.subcategory=Z,this.drills=J}}var j7="NeetCode 150";function UL(){return j([new z4("Arrays & Hashing",j([new b0("Contains Duplicate","Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.","nc01_contains_duplicate"),new b0("Valid Anagram","Given two strings s and t, return true if t is an anagram of s, and false otherwise.","nc02_valid_anagram"),new b0("Two Sum","Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.","nc03_two_sum"),new b0("Group Anagrams","Given an array of strings strs, group the anagrams together. You can return the answer in any order.","nc04_group_anagrams"),new b0("Top K Frequent Elements","Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.","nc05_top_k_frequent"),new b0("Encode and Decode Strings","Design an algorithm to encode a list of strings to a single string, and another to decode that string back to the original list. The strings may contain any characters.","nc22_encode_decode"),new b0("Product of Array Except Self","Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.","nc06_product_except_self"),new b0("Valid Sudoku",'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated: each row, each column and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are written ".".',"nc23_valid_sudoku"),new b0("Longest Consecutive Sequence","Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.","nc07_longest_consecutive")])),new z4("Two Pointers",j([new b0("Valid Palindrome","A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.","nc08_valid_palindrome"),new b0("Two Sum II - Input Array Is Sorted","Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.","nc09_two_sum_sorted"),new b0("3Sum","Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.","nc10_three_sum"),new b0("Container With Most Water","You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.","nc11_container_water"),new b0("Trapping Rain Water","Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.","nc24_trapping_rain_water")])),new z4("Sliding Window",j([new b0("Best Time to Buy and Sell Stock","You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.","nc12_best_time_stock"),new b0("Longest Substring Without Repeating Characters","Given a string s, find the length of the longest substring without repeating characters.","nc13_longest_substring"),new b0("Longest Repeating Character Replacement","You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.","nc14_character_replacement"),new b0("Permutation in String","Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.","nc15_permutation_in_string"),new b0("Minimum Window Substring","Given two strings s and t, return the minimum window substring of s that contains every character of t, including duplicates. If there is no such substring, return the empty string.","nc25_min_window_substring"),new b0("Sliding Window Maximum","You are given an array of integers nums and a window of size k sliding from the very left to the very right, one position at a time. Return the maximum in the window at each position.","nc26_sliding_window_maximum")])),new z4("Stack",j([new b0("Valid Parentheses","Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.","nc16_valid_parentheses"),new b0("Min Stack","Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.","nc17_min_stack"),new b0("Daily Temperatures","Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.","nc18_daily_temperatures")])),new z4("Binary Search",j([new b0("Binary Search","Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.","nc19_binary_search"),new b0("Find Minimum in Rotated Sorted Array","Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.","nc20_find_min_rotated"),new b0("Search in Rotated Sorted Array","Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.","nc21_search_rotated")]))])}function zL(Z,J,Q){return H1(Q(Z.stem),(X)=>{let Y=X[0],K=X[1];return new _8(Z.title,Z.prompt,U4(Z.title),H0(Y,(q)=>{return new Q9(q[0],q[1],q[2])}),J,K,U0)})}function F7(Z,J,Q){return new w8(Z,(()=>{let X=UL();return V9(X,(Y)=>{let K=V9(Y.drills,(q)=>{return zL(q,J,Q)});if(K instanceof x)return new V0(void 0);else{let q=K;return new L(new j1(Y.subcategory,q))}})})())}function VL(){return j([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`defmodule Solution do
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
end`]])}function jL(){return j([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`defmodule Solution do
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
end`]])}function FL(){return j([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`defmodule Solution do
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
end`]])}function OL(){return j([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

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
end`]])}function HL(){return j([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`defmodule Solution do
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
end`]])}function NL(){return j([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`defmodule Solution do
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
end`]])}function RL(){return j([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`defmodule Solution do
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
end`]])}function ML(){return j([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`defmodule Solution do
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
end`]])}function AL(){return j([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

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
end`]])}function DL(){return j([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`defmodule Solution do
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
end`]])}function BL(){return j([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`defmodule Solution do
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
end`]])}function LL(){return j([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`defmodule Solution do
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
end`]])}function PL(){return j([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`defmodule Solution do
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
end`]])}function SL(){return j([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`defmodule Solution do
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
end`]])}function TL(){return j([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`defmodule Solution do
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
end`]])}function EL(){return j([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`defmodule Solution do
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
end`]])}function CL(){return j([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`defmodule Solution do
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
end`]])}function _L(){return j([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`defmodule Solution do
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
end`]])}function wL(){return j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
end`]])}function kL(){return j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
end`]])}function xL(){return j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
end`]])}function bL(){return j([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
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
end`]])}function yL(){return j([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`defmodule Solution do
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
end`]])}function hL(){return j([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`defmodule Solution do
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
end`]])}function $L(){return j([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`defmodule Solution do
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
end`]])}function gL(){return j([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`defmodule Solution do
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
end`]])}function _O(Z){if(Z==="nc01_contains_duplicate")return new L(VL());else if(Z==="nc02_valid_anagram")return new L(jL());else if(Z==="nc03_two_sum")return new L(FL());else if(Z==="nc04_group_anagrams")return new L(OL());else if(Z==="nc05_top_k_frequent")return new L(HL());else if(Z==="nc06_product_except_self")return new L(NL());else if(Z==="nc07_longest_consecutive")return new L(RL());else if(Z==="nc08_valid_palindrome")return new L(ML());else if(Z==="nc09_two_sum_sorted")return new L(AL());else if(Z==="nc10_three_sum")return new L(DL());else if(Z==="nc11_container_water")return new L(BL());else if(Z==="nc12_best_time_stock")return new L(LL());else if(Z==="nc13_longest_substring")return new L(PL());else if(Z==="nc14_character_replacement")return new L(SL());else if(Z==="nc15_permutation_in_string")return new L(TL());else if(Z==="nc16_valid_parentheses")return new L(EL());else if(Z==="nc17_min_stack")return new L(CL());else if(Z==="nc18_daily_temperatures")return new L(_L());else if(Z==="nc19_binary_search")return new L(wL());else if(Z==="nc20_find_min_rotated")return new L(kL());else if(Z==="nc21_search_rotated")return new L(xL());else if(Z==="nc22_encode_decode")return new L(bL());else if(Z==="nc23_valid_sudoku")return new L(yL());else if(Z==="nc24_trapping_rain_water")return new L(hL());else if(Z==="nc25_min_window_substring")return new L($L());else if(Z==="nc26_sliding_window_maximum")return new L(gL());else return new V0(void 0)}function wO(){return F7(j7+" (Elixir)",LO,(Z)=>{return H1(_O(Z),(J)=>{return[J,U0]})})}function kO(){return F7(j7+" (Gleam)",fQ,(Z)=>{return H1(EO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function mL(){return new u(j([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`def containsDuplicate(nums):
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
    return False`]]),new g("def containsDuplicate(nums):",`def containsDuplicate(nums):
    pass`,`try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))`))}function nL(){return new u(j([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`def isAnagram(s, t):
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
    return sorted(s) == sorted(t)`]]),new g("def isAnagram(s, t):",`def isAnagram(s, t):
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
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))`))}function pL(){return new u(j([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`def twoSum(nums, target):
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

    return []`]]),new g("def twoSum(nums, target):",`def twoSum(nums, target):
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
__case__("twoSum([1, 2], 7)", [], twoSum([1, 2], 7))`))}function cL(){return new u(j([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

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
    return list(groups.values())`]]),new g("def groupAnagrams(strs):",`def groupAnagrams(strs):
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
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))`))}function dL(){return new u(j([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`from collections import Counter

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
    return [num for num, _ in ordered[:k]]`]]),new g("def topKFrequent(nums, k):",`def topKFrequent(nums, k):
    pass`,`try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))`))}function lL(){return new u(j([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`def productExceptSelf(nums):
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
    return result`]]),new g("def productExceptSelf(nums):",`def productExceptSelf(nums):
    pass`,`try:
    (productExceptSelf)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("productExceptSelf([1, 2, 3, 4])", [24, 12, 8, 6], productExceptSelf([1, 2, 3, 4]))
__case__("productExceptSelf([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], productExceptSelf([-1, 1, 0, -3, 3]))
__case__("productExceptSelf([2, 3])", [3, 2], productExceptSelf([2, 3]))`))}function sL(){return new u(j([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`def longestConsecutive(nums):
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

    return longest`]]),new g("def longestConsecutive(nums):",`def longestConsecutive(nums):
    pass`,`try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))`))}function iL(){return new u(j([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`def isPalindrome(s):
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
    return cleaned == cleaned[::-1]`]]),new g("def isPalindrome(s):",`def isPalindrome(s):
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
__case__("isPalindrome('0P')", False, isPalindrome("0P"))`))}function rL(){return new u(j([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

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
    return []`]]),new g("def twoSum(numbers, target):",`def twoSum(numbers, target):
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
__case__("twoSum([1, 2, 3], 100)", [], twoSum([1, 2, 3], 100))`))}function aL(){return new u(j([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`def threeSum(nums):
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

    return result`]]),new g("def threeSum(nums):",`def threeSum(nums):
    pass`,`try:
    (threeSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("threeSum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], threeSum([-1, 0, 1, 2, -1, -4]))
__case__("threeSum([0, 1, 1])", [], threeSum([0, 1, 1]))
__case__("threeSum([0, 0, 0])", [[0, 0, 0]], threeSum([0, 0, 0]))`))}function oL(){return new u(j([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`def maxArea(height):
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
    return best`]]),new g("def maxArea(height):",`def maxArea(height):
    pass`,`try:
    (maxArea)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
__case__("maxArea([1, 1])", 1, maxArea([1, 1]))`))}function tL(){return new u(j([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`def maxProfit(prices):
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
    return profit`]]),new g("def maxProfit(prices):",`def maxProfit(prices):
    pass`,`try:
    (maxProfit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([7, 1, 5, 3, 6, 4]))
__case__("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([7, 6, 4, 3, 1]))
__case__("maxProfit([])", 0, maxProfit([]))`))}function eL(){return new u(j([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`def lengthOfLongestSubstring(s):
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

    return longest`]]),new g("def lengthOfLongestSubstring(s):",`def lengthOfLongestSubstring(s):
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
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))`))}function ZP(){return new u(j([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`def characterReplacement(s, k):
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

    return longest`]]),new g("def characterReplacement(s, k):",`def characterReplacement(s, k):
    pass`,`try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))`))}function JP(){return new u(j([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`from collections import Counter

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

    return False`]]),new g("def checkInclusion(s1, s2):",`def checkInclusion(s1, s2):
    pass`,`try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))`))}function QP(){return new u(j([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`def isValid(s):
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
    return s == ""`]]),new g("def isValid(s):",`def isValid(s):
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
__case__("isValid('(')", False, isValid("("))`))}function XP(){return new u(j([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`class MinStack:
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
        return self.entries[-1][1]`]]),new g(`class MinStack:
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
__case__("getMin() after pop()", -2, __stack__.getMin())`))}function YP(){return new u(j([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`def dailyTemperatures(temperatures):
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
    return result`]]),new g("def dailyTemperatures(temperatures):",`def dailyTemperatures(temperatures):
    pass`,`try:
    (dailyTemperatures)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
__case__("dailyTemperatures([30, 40, 50, 60])", [1, 1, 1, 0], dailyTemperatures([30, 40, 50, 60]))
__case__("dailyTemperatures([30, 30, 30])", [0, 0, 0], dailyTemperatures([30, 30, 30]))`))}function KP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
    return halve(nums, target, lo, mid - 1)`]]),new g("def search(nums, target):",`def search(nums, target):
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
__case__("search([], 1)", -1, search([], 1))`))}function qP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
    return nums[0]`]]),new g("def findMin(nums):",`def findMin(nums):
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
__case__("findMin([2, 1])", 1, findMin([2, 1]))`))}function WP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
    return -1`]]),new g("def search(nums, target):",`def search(nums, target):
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
__case__("search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6))`))}function GP(){return new u(j([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
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
    return out`]]),new g(`def encode(strs):

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
__case__("decode(encode(['\\\\\\\\', '|', '#']))", ["\\\\", "|", "#"], __round_trip__(["\\\\", "|", "#"]))`))}function IP(){return new u(j([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`def isValidSudoku(board):
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
    return len(filled) == len(set(filled))`]]),new g("def isValidSudoku(board):",`def isValidSudoku(board):
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
__case__("isValidSudoku(empty board)", True, isValidSudoku([["."] * 9 for _ in range(9)]))`))}function UP(){return new u(j([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`def trap(height):
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

    return sum(min(left[i], right[i]) - height[i] for i in range(len(height)))`]]),new g("def trap(height):",`def trap(height):
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
__case__("trap([5, 4, 3, 2, 1])", 0, trap([5, 4, 3, 2, 1]))`))}function zP(){return new u(j([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`def minWindow(s, t):
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

    return s[best_start:best_start + best_length]`]]),new g("def minWindow(s, t):",`def minWindow(s, t):
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
__case__("minWindow('aaflslflsldkalskaaa', 'aaa')", "aaa", minWindow("aaflslflsldkalskaaa", "aaa"))`))}function VP(){return new u(j([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`def maxSlidingWindow(nums, k):
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

    return out`]]),new g("def maxSlidingWindow(nums, k):",`def maxSlidingWindow(nums, k):
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
__case__("maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", [7, 7, 7, 7, 7], maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))`))}function eK(){return new u(j([["Solution 1","",`from collections import Counter

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
    return sum(1 for num in nums if num == value)`]]),new g(`def topTwo(nums):

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
__case__("countOf([1, 1, 2], 9)", 0, countOf([1, 1, 2], 9))`))}function Zq(){return new u(j([["Solution 1","",`from collections import defaultdict

def groupByLength(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)`],["Solution 2 · Setdefault","setdefault does the same job as defaultdict without changing the type of the dictionary — handy when the result is returned or serialised, since there is no default factory left attached to it.",`def groupByLength(words):
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups`]]),new g("def groupByLength(words):",`def groupByLength(words):
    pass`,`try:
    (groupByLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("groupByLength(['a', 'bc', 'de', 'f'])", {1: ["a", "f"], 2: ["bc", "de"]}, groupByLength(["a", "bc", "de", "f"]))
__case__("groupByLength([])", {}, groupByLength([]))`))}function Jq(){return new u(j([["Solution 1","",`from collections import deque

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

    return order`]]),new g("def bfsOrder(graph, start):",`def bfsOrder(graph, start):
    pass`,`try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))`))}function Qq(){return new u(j([["Solution 1","",`import heapq

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
    return sorted(nums, reverse=True)[:k]`]]),new g(`def kSmallest(nums, k):

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
__case__("kSmallest([3], 5)", [3], kSmallest([3], 5))`))}function Xq(){return new u(j([["Solution 1","",`def firstIndexOf(nums, target):
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
    return total`]]),new g(`def firstIndexOf(nums, target):

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
__case__("dotProduct([1, 2, 3], [4, 5, 6])", 32, dotProduct([1, 2, 3], [4, 5, 6]))`))}function Yq(){return new u(j([["Solution 1","",`def reversedString(s):
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
    return "".join(s[i] for i in range(1, len(s) - 1))`]]),new g(`def reversedString(s):

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
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))`))}function Kq(){return new u(j([["Solution 1","",`def sortByLength(words):
    return sorted(words, key=len)

def sortPairs(pairs):
    return sorted(pairs, key=lambda p: (p[0], -p[1]))`],["Solution 2 · Decorate sort undecorate","Decorate, sort, undecorate: attach the sort key to each item, sort the pairs, then strip it. `key=` is this pattern built into sorted().",`def sortByLength(words):
    decorated = [(len(word), word) for word in words]
    decorated.sort(key=lambda pair: pair[0])
    return [word for _, word in decorated]

def sortPairs(pairs):
    decorated = [((pair[0], -pair[1]), pair) for pair in pairs]
    decorated.sort(key=lambda entry: entry[0])
    return [pair for _, pair in decorated]`]]),new g(`def sortByLength(words):

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
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))`))}function qq(){return new u(j([["Solution 1","",`def joinUpper(chars):
    parts = []
    for c in chars:
        parts.append(c.upper())
    return "".join(parts)`],["Solution 2 · Concatenation","The version join exists to replace. Each `+=` builds a whole new string, so this is quadratic in the output length — fine for two characters, painful for a megabyte.",`def joinUpper(chars):
    out = ""
    for c in chars:
        out += c.upper()
    return out`]]),new g("def joinUpper(chars):",`def joinUpper(chars):
    pass`,`try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))`))}function xO(Z){if(Z==="nc01_contains_duplicate")return new L(mL());else if(Z==="nc02_valid_anagram")return new L(nL());else if(Z==="nc03_two_sum")return new L(pL());else if(Z==="nc04_group_anagrams")return new L(cL());else if(Z==="nc05_top_k_frequent")return new L(dL());else if(Z==="nc06_product_except_self")return new L(lL());else if(Z==="nc07_longest_consecutive")return new L(sL());else if(Z==="nc08_valid_palindrome")return new L(iL());else if(Z==="nc09_two_sum_sorted")return new L(rL());else if(Z==="nc10_three_sum")return new L(aL());else if(Z==="nc11_container_water")return new L(oL());else if(Z==="nc12_best_time_stock")return new L(tL());else if(Z==="nc13_longest_substring")return new L(eL());else if(Z==="nc14_character_replacement")return new L(ZP());else if(Z==="nc15_permutation_in_string")return new L(JP());else if(Z==="nc16_valid_parentheses")return new L(QP());else if(Z==="nc17_min_stack")return new L(XP());else if(Z==="nc18_daily_temperatures")return new L(YP());else if(Z==="nc19_binary_search")return new L(KP());else if(Z==="nc20_find_min_rotated")return new L(qP());else if(Z==="nc21_search_rotated")return new L(WP());else if(Z==="nc22_encode_decode")return new L(GP());else if(Z==="nc23_valid_sudoku")return new L(IP());else if(Z==="nc24_trapping_rain_water")return new L(UP());else if(Z==="nc25_min_window_substring")return new L(zP());else if(Z==="nc26_sliding_window_maximum")return new L(VP());else if(Z==="tip01_counter")return new L(eK());else if(Z==="tip02_defaultdict")return new L(Zq());else if(Z==="tip03_deque")return new L(Jq());else if(Z==="tip04_heapq")return new L(Qq());else if(Z==="tip05_enumerate_zip")return new L(Xq());else if(Z==="tip06_slicing")return new L(Yq());else if(Z==="tip07_sort_key")return new L(Kq());else if(Z==="tip08_join")return new L(qq());else return new V0(void 0)}function yO(){return F7(j7,$Q,(Z)=>{return H1(xO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function FP(){return new u(j([["Solution 1","A set answers the whole question. Walk once, and the moment a value is already in the set you are done — no need to finish the pass, and no need to know where the duplicate was.",`export function containsDuplicate(nums: number[]): boolean {
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
}`]]),new g("export function containsDuplicate(nums: number[]): boolean",`export function containsDuplicate(nums: number[]): boolean {
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
}`))}function OP(){return new u(j([["Solution 1","Two strings are anagrams exactly when every character occurs the same number of times in both, so build a count per string and compare the two maps.",`export function isAnagram(s: string, t: string): boolean {
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
}`]]),new g("export function isAnagram(s: string, t: string): boolean",`export function isAnagram(s: string, t: string): boolean {
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
}`))}function HP(){return new u(j([["Solution 1","Every number seen so far is already in the map, so the complement is one lookup away — one pass, O(1) per step, and the map hands back the index for free.",`export function twoSum(nums: number[], target: number): number[] {
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
}`]]),new g("export function twoSum(nums: number[], target: number): number[]",`export function twoSum(nums: number[], target: number): number[] {
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
}`))}function NP(){return new u(j([["Solution 1",`Bucket by a key that comes out identical for everything that belongs together. Once the key is anagram-invariant the grouping is just a map from key to list, and no pair of words is ever compared directly.

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
}`]]),new g("export function groupAnagrams(strs: string[]): string[][]",`export function groupAnagrams(strs: string[]): string[][] {
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
}`))}function RP(){return new u(j([["Solution 1","Count, then select. The frequencies come first; picking the k largest is a separate question, and which method you use for it is what separates the variants.",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`]]),new g("export function topKFrequent(nums: number[], k: number): number[]",`export function topKFrequent(nums: number[], k: number): number[] {
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
}`))}function MP(){return new u(j([["Solution 1","The answer at each slot is everything before it times everything after it. One forward pass builds the prefixes, one reverse pass folds in the suffixes — and no division, so a zero in the input costs nothing special.",`export function productExceptSelf(nums: number[]): number[] {
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
}`]]),new g("export function productExceptSelf(nums: number[]): number[]",`export function productExceptSelf(nums: number[]): number[] {
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
}`))}function AP(){return new u(j([["Solution 1","Put everything in a set, then only start counting at numbers with no predecessor. That guard is what keeps it O(n): every run is walked exactly once instead of once per member.",`export function longestConsecutive(nums: number[]): number {
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
}`]]),new g("export function longestConsecutive(nums: number[]): number",`export function longestConsecutive(nums: number[]): number {
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
}`))}function DP(){return new u(j([["Solution 1","Normalise first — letters and digits only, lowercased — and the palindrome test is whatever comparison you like: two pointers converging, or the cleaned string against its reverse.",`export function isPalindrome(s: string): boolean {
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
}`]]),new g("export function isPalindrome(s: string): boolean",`export function isPalindrome(s: string): boolean {
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
}`))}function BP(){return new u(j([["Solution 1",`Sorted input plus a pointer at each end. A sum that is too small can only be fixed by raising the low end, one that is too large by lowering the high end, so neither pointer ever needs to go back. They meet in O(n) with no extra memory.

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
}`]]),new g("export function twoSum(numbers: number[], target: number): number[]",`export function twoSum(numbers: number[], target: number): number[] {
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
}`))}function LP(){return new u(j([["Solution 1","Sort, fix one number, then run the two-pointer scan on the remainder looking for its negation. Sorting is what makes the duplicate triples skippable: equal values are adjacent, so stepping past them is a while loop, not a set.",`export function threeSum(nums: number[]): number[][] {
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
}`]]),new g("export function threeSum(nums: number[]): number[][]",`export function threeSum(nums: number[]): number[][] {
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
}`))}function PP(){return new u(j([["Solution 1","Start at both ends. The area is capped by the shorter line, so moving the taller one in can never help — always move the shorter, and track the best area seen.",`export function maxArea(height: number[]): number {
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
}`]]),new g("export function maxArea(height: number[]): number",`export function maxArea(height: number[]): number {
  // todo
}`,`import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}`))}function SP(){return new u(j([["Solution 1","Carry the cheapest price seen so far; today's best sale is today's price against that minimum. One pass, two variables.",`export function maxProfit(prices: number[]): number {
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
}`]]),new g("export function maxProfit(prices: number[]): number",`export function maxProfit(prices: number[]): number {
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
}`))}function TP(){return new u(j([["Solution 1","Grow a window rightwards and, whenever the new character is already inside it, move the start past that character's earlier copy. The window is always repeat-free, so its widest reading is the answer.",`export function lengthOfLongestSubstring(s: string): number {
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
}`]]),new g("export function lengthOfLongestSubstring(s: string): number",`export function lengthOfLongestSubstring(s: string): number {
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
}`))}function EP(){return new u(j([["Solution 1","A window can be made uniform with k changes when its size minus its most-frequent-character count is at most k. Grow the right edge, shrink from the left when that breaks, and the biggest valid window is the answer.",`export function characterReplacement(s: string, k: number): number {
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
}`]]),new g("export function characterReplacement(s: string, k: number): number",`export function characterReplacement(s: string, k: number): number {
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
}`))}function CP(){return new u(j([["Solution 1","A permutation of s1 is any window of length |s1| in s2 with identical character counts. Slide one character at a time, adding the entering character and removing the leaving one, so each step is O(1) rather than a recount.",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`]]),new g("export function checkInclusion(s1: string, s2: string): boolean",`export function checkInclusion(s1: string, s2: string): boolean {
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
}`))}function _P(){return new u(j([["Solution 1","On every opener, push the closer you expect; on every closer, it must match the top. Valid means never mismatching and finishing with an empty stack — both halves are needed.",`export function isValid(s: string): boolean {
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
}`]]),new g("export function isValid(s: string): boolean",`export function isValid(s: string): boolean {
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
}`))}function wP(){return new u(j([["Solution 1","The minimum has to be O(1), so it cannot be computed on demand — it has to be carried. Either each entry remembers the minimum at or below it, or a second stack tracks the running minimum alongside the first.",`export class MinStack {
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
}`]]),new g(`export class MinStack
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
}`))}function kP(){return new u(j([["Solution 1","A stack of days still waiting for something warmer, kept in decreasing temperature order. Each new day resolves and pops every colder day below it, so every day is pushed once and popped once — O(n).",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`]]),new g("export function dailyTemperatures(temperatures: number[]): number[]",`export function dailyTemperatures(temperatures: number[]): number[] {
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
}`))}function xP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function bP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("export function findMin(nums: number[]): number",`export function findMin(nums: number[]): number {
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
}`))}function yP(){return new u(j([["Solution 1",`Compare against the midpoint and throw away the half that cannot hold the answer. O(log n); the only thing to get right is which side the midpoint itself falls on, which is what decides whether the loop terminates.

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
}`]]),new g("export function search(nums: number[], target: number): number",`export function search(nums: number[], target: number): number {
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
}`))}function hP(){return new u(j([["Solution 1","Length-prefix each string: its length, a delimiter, then the string itself. Decoding reads a number and then takes exactly that many characters, so nothing inside a payload can ever be mistaken for structure — the delimiter appearing in the data is harmless, because the decoder was never scanning for it.",`
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
}`]]),new g(`export function encode(strs: string[]): string

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
}`))}function $P(){return new u(j([["Solution 1","One pass, one set. Each filled cell contributes three signatures — this value in this row, in this column, in this box — and the first one already present is the duplicate. Nothing has to be gathered up first, and the scan stops the moment it fails.",`export function isValidSudoku(board: string[][]): boolean {
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
}`]]),new g("export function isValidSudoku(board: string[][]): boolean",`export function isValidSudoku(board: string[][]): boolean {
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
}`))}function gP(){return new u(j([["Solution 1","Two pointers, moving whichever side is shorter. The trick is that the shorter side alone decides how much water sits above it: whatever is on the far side is at least as tall, so the running maximum behind the short pointer is the water level, and there is no need to know the far maximum exactly. One pass, no extra arrays.",`export function trap(height: number[]): number {
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
}`]]),new g("export function trap(height: number[]): number",`export function trap(height: number[]): number {
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
}`))}function fP(){return new u(j([["Solution 1",'Count what is still missing, not what is present. Every character the window takes in decrements its requirement, and only a character that was actually still needed moves the counter — so "missing == 0" is a single integer test rather than a map comparison. Once the window is valid, shrink from the left until it stops being valid, recording the best as you go.',`export function minWindow(s: string, t: string): string {
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
}`]]),new g("export function minWindow(s: string, t: string): string",`export function minWindow(s: string, t: string): string {
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
}`))}function uP(){return new u(j([["Solution 1","Cut the array into blocks of k and pre-compute, within each block, the running maximum forwards and backwards. Any window of width k straddles at most one block boundary, so it is exactly a suffix of one block and a prefix of the next — one max from each, and the whole thing is O(n) with no queue at all.",`export function maxSlidingWindow(nums: number[], k: number): number[] {
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
}`]]),new g("export function maxSlidingWindow(nums: number[], k: number): number[]",`export function maxSlidingWindow(nums: number[], k: number): number[] {
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
}`))}function hO(Z){if(Z==="nc01_contains_duplicate")return new L(FP());else if(Z==="nc02_valid_anagram")return new L(OP());else if(Z==="nc03_two_sum")return new L(HP());else if(Z==="nc04_group_anagrams")return new L(NP());else if(Z==="nc05_top_k_frequent")return new L(RP());else if(Z==="nc06_product_except_self")return new L(MP());else if(Z==="nc07_longest_consecutive")return new L(AP());else if(Z==="nc08_valid_palindrome")return new L(DP());else if(Z==="nc09_two_sum_sorted")return new L(BP());else if(Z==="nc10_three_sum")return new L(LP());else if(Z==="nc11_container_water")return new L(PP());else if(Z==="nc12_best_time_stock")return new L(SP());else if(Z==="nc13_longest_substring")return new L(TP());else if(Z==="nc14_character_replacement")return new L(EP());else if(Z==="nc15_permutation_in_string")return new L(CP());else if(Z==="nc16_valid_parentheses")return new L(_P());else if(Z==="nc17_min_stack")return new L(wP());else if(Z==="nc18_daily_temperatures")return new L(kP());else if(Z==="nc19_binary_search")return new L(xP());else if(Z==="nc20_find_min_rotated")return new L(bP());else if(Z==="nc21_search_rotated")return new L(yP());else if(Z==="nc22_encode_decode")return new L(hP());else if(Z==="nc23_valid_sudoku")return new L($P());else if(Z==="nc24_trapping_rain_water")return new L(gP());else if(Z==="nc25_min_window_substring")return new L(fP());else if(Z==="nc26_sliding_window_maximum")return new L(uP());else return new V0(void 0)}function $O(){return F7(j7+" (TypeScript)",BO,(Z)=>{return H1(hO(Z),(J)=>{return[J.solutions,new a(J.check)]})})}function O7(Z,J,Q){return new _8(Z,J,U4(Z),H0(Q.solutions,(X)=>{return new Q9(X[0],X[1],X[2])}),$Q,new a(Q.check),U0)}function gO(){return new w8("Python Tips",j([new j1("Idioms",j([O7("Counter for frequency maps","Write topTwo(nums) returning the two most common values as (value, count) pairs, and countOf(nums, value) returning how often value appears (0 if absent, no KeyError). Reach for collections.Counter.",eK()),O7("defaultdict for grouping","Write groupByLength(words) returning a dict mapping each length to the list of words of that length, keeping input order. Use collections.defaultdict(list); convert to a plain dict at the end.",Zq()),O7("deque for O(1) popleft","Write bfsOrder(graph, start): a breadth-first walk of graph (a dict of node to neighbour list) from start, returning nodes in visit order. Use collections.deque as the queue - list.pop(0) is O(n).",Jq()),O7("heapq for min/max heaps","Write kSmallest(nums, k) and kLargest(nums, k) returning the k smallest / largest values in order using heapq. Python only has a min-heap: negate values on the way in and out for the max side.",Qq()),O7("Enumerate, zip, and unpacking","Write firstIndexOf(nums, target) returning the index of the first match (-1 if none) with enumerate - no range(len(...)) - and dotProduct(a, b) summing pairwise products with zip.",Xq()),O7("Slicing and reversal","Using only slicing: reversedString(s), everySecond(s) (characters at even indices), lastN(s, n) (last n characters, empty when n <= 0), and trimEnds(s) (drop the first and last character).",Yq()),O7("Sorting with a key","Write sortByLength(words) sorting by word length, and sortPairs(pairs) sorting (name, score) tuples by name ascending then score descending - both as one sorted(...) call with a key.",Kq()),O7("Building strings efficiently","Write joinUpper(chars) returning the uppercased concatenation of a list of characters the O(n) way: append the pieces to a list and join once at the end - += in a loop re-copies the string every time.",qq())]))]))}var V4="System Design";function pP(){return $}function cP(){return $}function dP(){return $}function lP(){return $}function sP(){return $}function Z1(Z,J,Q,X,Y,K){return new _8(Z,J,"",$,SO,U0,new a(new mK(Q,X,Y,K)))}function iP(){return j([Z1("Partitioning, sharding and replication","You have used all three words in one sentence and the interviewer asks you to be precise. Which statement is right?",j(["Replication and sharding both divide a data set into subsets; partitioning is the term for copying those subsets to other nodes","Replication makes copies of data on different nodes; partitioning and sharding both divide a data set into subsets, but sharding implies those subsets are distributed across multiple nodes and partitioning does not","Sharding makes copies of data across nodes; partitioning divides a data set into subsets on one node; replication is the general term for both","Partitioning is a physical layout on disk; sharding is the logical division above it; replication is orthogonal to both"]),1,"Replication makes copies of data - replicas - stored on different nodes. Partitioning and sharding both divide a data set into subsets; sharding implies the subsets are distributed across multiple nodes, partitioning does not.","p111"),Z1("Where three-megabyte objects belong","Your service stores user-uploaded objects averaging 3 MB, read far more often than written, streamed to clients on request. Database or filesystem, and on what grounds?",j(["Database, as a BLOB column, so the object stays transactionally consistent with its metadata row","Either - below about 10 MB the choice makes no measurable difference to read latency","Database, sharded by object ID, so reads spread evenly across the cluster","Filesystem - objects larger than 1 MB belong there; database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow"]),3,"The 2006 Microsoft rule of thumb: objects smaller than 256 KB are best stored in a database; objects larger than 1 MB are best on the filesystem. Between 256 KB and 1 MB, the read:write ratio and the rate of overwrite decide. Also: database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow.","p111"),Z1("Read replicas for a write-heavy load","Your single-leader database is saturating on writes. A teammate proposes adding four read replicas. Does that solve the problem?",j(["No - single-leader replication scales reads, not writes, and the entire database must still fit on the single leader host","Yes - once provisioned, replicas can accept writes and forward them to the leader asynchronously","Yes, provided the replicas are synchronous, which lets the leader acknowledge writes without waiting for disk","Yes - adding a second tier of replicas below the first spreads write load across both tiers"]),0,"Single-leader replication scales reads, not writes. Its limits: the entire database must fit on a single host, and followers are eventually consistent because write replication takes time.","p112-115"),Z1("Sizing a quorum","You have 7 nodes and want quorum reads and writes that guarantee consistency. Which pair of quorum sizes does the rule give you?",j(["Read 3, write 3","Read 2, write 5","Read 4, write 4","Read 3, write 4"]),2,"A quorum is the minimum number of nodes that must agree for consensus. With n nodes, read and write quorums of n/2 + 1 guarantee consistency - here 7/2 + 1 = 4 for both. Every other pair listed sums to 7 or fewer, so a read quorum and a write quorum can miss each other entirely.","p117"),Z1("Last write wins by timestamp","Two leaders in different data centers accept conflicting updates to the same row. A teammate proposes resolving it with last-write-wins on a timestamp column. Why does that not work?",j(["It works, but only when both leaders sit in the same data center and share a clock signal","Clocks on different nodes cannot be perfectly synchronized - even periodically synced servers differ by milliseconds or more, so writes made inside that window cannot be ordered","Timestamps require a coordination service to issue them, which reintroduces the single leader you were trying to avoid","Timestamps are not monotonic while NTP is slewing, but the drift is bounded, so the scheme is safe at one-second granularity"]),1,"Clocks on different nodes cannot be perfectly synchronized, and sharing one clock fails because each node receives its signal at a different time - clock skew. Even periodically synced servers differ by milliseconds or more, so queries made within that window cannot be ordered.","p116"),Z1("Tuning quorums for a read-heavy load","A 5-node cluster serves ten reads for every write, and you need consistency rather than eventual consistency. How do you set the quorums, and what does it cost?",j(["Low write quorum, high read quorum - fast reads, paid for with slower writes","Read and write quorums both set to 5, so every operation sees every node","Read and write quorums both set to 1, accepting eventual consistency for speed on both sides","Low read quorum, high write quorum - fast reads, paid for with slower writes"]),3,"If you want consistency you must choose: a low write quorum and high read quorum gives fast writes; the reverse - a low read quorum and high write quorum - gives fast reads. Otherwise only eventual consistency is possible, and UPDATE and DELETE cannot be consistent.","p117"),Z1("Seeing your own increment","A user taps like and must immediately see the count include their own tap. Other users continuing to see the old count for a few seconds is fine. Name the guarantee, and the general lesson.",j(["Read-after-write consistency - and the lesson is to look for ways to relax consistency, minimizing the amount of data that must be consistent for all users","Linearizability - and the lesson is that any user-visible counter must be linearizable or users will report it as a bug","Monotonic reads - and the lesson is that a client must be pinned to one replica for the duration of a session","Strong eventual consistency - and the lesson is that conflict-free replicated data types remove the need to choose"]),0,"Read-after-write consistency: a user who increments a counter and then reads it sees their own increment, while other users may still be served the pre-increment value. The general lesson: look for ways to relax consistency, and minimize the amount of data that must be consistent for all users.","p117"),Z1("The JOIN that got slower after sharding","After sharding two large tables, a JOIN between them became dramatically slower. What is happening, and what is the suggested remedy?",j(["Replication lag means followers hold different snapshots of each table; directing the JOIN at the leader restores speed","The query planner lost its statistics at shard time; a covering index on each shard restores the original plan","Each shard of one table must compare its rows against every row of the other across the network - unless the JOIN is on the shard key, so you may constrain JOINs to those columns","The shard key was hashed rather than ranged, so matching rows are scattered; switching to range sharding colocates them"]),2,"Sharding imposes two limits on an RDBMS. JOINs get far slower - each shard of one table must compare its rows against every row of the other across the network, unless the JOIN is on the shard key, so you may constrain JOINs to those columns. And aggregation splits between database and application.","p120"),Z1("The aggregate that survived sharding worst","Your reporting queries run sum, count, mean and median over a sharded table. Which one becomes disproportionately harder and slower, and why?",j(["Mean - it needs the full row set in one place before a divisor can be computed","Median - sum and mean are easy because each node returns partial results, but median and percentile are much harder and slower","Sum - each node's partial must be locked across shards to avoid double counting","Count - it requires a distinct pass over every shard before the totals can be added"]),1,"Aggregation splits between database and application: sum and mean are easy (each node returns partials), median and percentile are much harder and slower.","p120"),Z1("Replication lag across thirty followers","Your leader replicates to thirty followers and the tail of them is falling steadily behind. What is the explanation, and the remedy?",j(["A leader's throughput caps the number of followers it can serve, so multi-level replication adds tiers to scale reads further - at the cost of further-delayed consistency","Followers compete with clients for the leader's read capacity, so moving client reads onto the followers lets the leader catch up","The write quorum has been set too high, so each write waits on too many acknowledgements before the next can start","Eventual consistency means replication lag is unbounded by design, so the only remedy is to make reads tolerate any staleness"]),0,"A leader's throughput caps the number of followers, so multi-level replication adds tiers to scale reads further, at the cost of further-delayed consistency.","p112-115")])}function rP(){return j([Z1("Buying a bigger host","Your service is saturating its single host. Finance has approved a mainframe-class replacement with four times the cores and eight times the RAM, and a migration window is agreed. Setting the invoice aside, what is the strongest argument against making this your scaling strategy?",j(["You lose the ability to do gradual rollouts, because there is no second host to shift a fraction of traffic onto","It trades higher latency for lower cost, because one host cannot be placed close to every region of users","Past a point, monetary cost rises faster than the hardware's performance; current technology imposes hard limits on processing power, RAM and storage per host; and the swap may require downtime unless the service's state lives elsewhere","A single host cannot implement the bulkhead pattern, so one saturated endpoint will starve all the others"]),2,"Three disadvantages of vertical scaling. Past a point, monetary cost rises faster than the hardware's performance - a multi-processor mainframe costs more than the same number of commodity single-processor machines. Current technology imposes hard limits on processing power, RAM and storage per host. And it may require downtime, unless you provision a new host, which is only possible if the service's state lives elsewhere.","p88"),Z1("Choosing the load balancer layer","You need the load balancer to reject requests missing an authorization header with a 401, terminate TLS, and forward events by key range based on a field in the request body. Which balancer do you specify, and why?",j(["Level 7 - it works at the application layer, so it can route on packet contents, authenticate, and terminate TLS","Level 4 - it works at the transport layer, which is faster and sufficient for header inspection","Level 4 with TLS passthrough, delegating authentication to an API gateway behind it","Either - the layers differ only in throughput, not in what they can inspect"]),0,"A level 4 balancer works at the transport layer (TCP), makes routing decisions from address information in the first few packets of the stream, and can only forward. A level 7 balancer works at the application layer (HTTP), so it can route on packet contents, authenticate (returning 401 when a header is absent), and terminate TLS.","p89-90"),Z1("Reading an availability SLA","A contract permits roughly five minutes of unplanned downtime per year. Which availability target are you being asked to hit?",j(["99.99% - 52.6 minutes per year, 8.64 seconds per day","99.9% - 8.77 hours per year, 1.44 minutes per day","99.95% - 4.38 hours per year, 43 seconds per day","99.999% - 5.26 minutes per year, 864 milliseconds per day"]),3,"99.9% is 8.77 hours per year (1.44 minutes per day). 99.99% is 52.6 minutes per year (8.64 seconds per day). 99.999% is 5.26 minutes per year (864 milliseconds per day).","p91"),Z1("The circuit breaker that hid the limit","Your team wraps every downstream call in a circuit breaker. A load test that previously overwhelmed the payment service now passes cleanly, so you ship. Real customer traffic then causes an outage in that same service. What went wrong?",j(["The breaker's failure counter reset between test runs, so the threshold was never actually reached","The breaker makes the system harder to test - it opened under the test load and masked the downstream limit the test existed to find","The breaker's probe requests counted against the payment service's rate limit and exhausted it","Retries without jitter arrived in unison and caused a retry storm against the recovering service"]),1,"A circuit breaker counts failures in a recent interval and stops calling downstream past a threshold, later probing with a limited number of requests. Its hidden cost: the breaker makes the system harder to test - a load test that should have overwhelmed downstream now passes, and real customer load causes the outage.","p93-94"),Z1("What per-endpoint thread pools cost","You adopt the bulkhead pattern, giving each endpoint its own thread pool so an exhausted pool cannot starve the others. What have you given up in exchange?",j(["Requests can no longer be traced across services, because each pool logs under its own identifier","You can no longer terminate TLS at the load balancer, since pools are selected after decryption","Thread pools force synchronous I/O, so a long downstream call blocks a whole pool","Pools cannot support each other during a spike - an idle pool's capacity is unavailable to a saturated one"]),3,"Divide the system into isolated pools so a fault in one cannot affect the whole. Per-endpoint thread pools mean an exhausted pool does not starve other endpoints. Host pools per requestor stop a crash-inducing request from taking down every host, and stop one noisy requestor consuming all capacity. The tradeoff: pools cannot support each other during a spike.","p95-96"),Z1("Which consistency are you talking about",'You have said "consistency" four times and the interviewer stops you: which consistency do you mean? What is the distinction they are fishing for?',j(["ACID consistency means synchronous replication; CAP consistency means asynchronous replication with a bounded lag","CAP consistency is read-after-write for the writing client; ACID consistency is the durability guarantee that survives a crash","ACID consistency is about data relationships - foreign keys, uniqueness, the invariants a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time and begin serving a change at the same time","ACID consistency applies within a single node; CAP consistency applies across the cluster, but both mean reads never return stale data"]),2,"ACID consistency is about data relationships - foreign keys, uniqueness, and the invariants that a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time, and when data changes all nodes start serving the change at the same time. Emphasize the distinction out loud in the interview.","p98"),Z1("Accepting writes during a partition","A hard requirement: the store must keep accepting writes during a network partition between data centers. Stale reads for a few seconds are acceptable. Which of these do you pick, and what rules the others out?",j(["Redis - being in-memory, it is unaffected by partitions between data centers","Cassandra - an ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did","MongoDB - it favors availability, and its replica sets elect a new primary on either side of the partition","HBase - its write-ahead log lets it accept writes and reconcile them once the partition heals"]),1,"Databases favoring linearizability: HBase, MongoDB, Redis. Databases favoring availability: Cassandra, CouchDB, Dynamo, Hadoop, Riak. An ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did.","p98"),Z1("Propagating state across a small cluster","Eight hosts need to share a small amount of mutable state. You want low latency, simple operations and independent scaling of the state store, and you accept that nothing will validate the shape of what gets written. Which technique fits?",j(["A full mesh, where every host broadcasts state changes to every other host","A coordination service such as ZooKeeper, using Paxos, Raft or Zab","A gossip protocol with random leader selection","A distributed cache such as Redis - simple, low latency and independently scalable, at the cost of no schema validation, so bad data goes undetected until it is read, and no encryption"]),3,"Full mesh - every host broadcasts to every other; simplest, but message count grows quadratically, so small clusters only. Coordination service - Paxos, Raft, Zab; ZooKeeper gives access control, in-memory speed, horizontal scaling and ordered reads, but is complex and must guarantee exactly one leader or you get split brain. Distributed cache - Redis; simple, low latency, independently scalable, but no schema validation, so bad data goes undetected until read, and no encryption. Gossip protocol and random leader selection trade consistency and accuracy for lower cost.","p99-103"),Z1("Approximating a distinct count","A dashboard needs the number of unique visitors over a huge event stream. An exact COUNT DISTINCT is too expensive, and a few percent of error is fine. Which algorithm?",j(["HyperLogLog, which estimates cardinality - it is what Presto uses for this","Count-min sketch, which is the standard structure for estimating distinct values in a stream","A bloom filter, testing each visitor for membership and counting the misses","A quorum read across the aggregation tier, summing each node's local count"]),0,"HyperLogLog for cardinality - COUNT DISTINCT, as used in Presto. Count-min sketch for estimating the frequency of events in a data stream. Estimation algorithms trade accuracy for lower complexity.","p103-104"),Z1("What PACELC adds to CAP","The interviewer asks whether CAP is the whole story. What does PACELC add to it?",j(["It adds durability as a fourth property, alongside consistency, availability and partition tolerance","It formalizes eventual consistency as a fourth choice available during a partition","Else - during normal operation with no partition, you must still choose between latency and consistency","Else - during normal operation, you must still choose between availability and partition tolerance"]),2,"PACELC is an extension of CAP: when a network Partition occurs you must choose between Availability and Consistency; Else, during normal operation, you must choose between Latency and Consistency. The book flags it as further reading rather than covering it in depth.","p107")])}function aP(){return $}function oP(){return $}function fO(){return new w8("System Design",(()=>{let Z=j([new j1("Interview flow & requirements",oP()),new j1("Observability & search",aP()),new j1("Non-functional requirements",rP()),new j1("Storage, replication & sharding",iP()),new j1("ETL, denormalization & caching",sP()),new j1("Events & distributed transactions",lP()),new j1("Services & API paradigms",dP()),new j1("Case studies",cP()),new j1("Terminology",pP())]);return Q1(Z,(J)=>{return!(J.problems instanceof x)})})())}function j4(){return j([yO(),kO(),$O(),wO(),gO(),CO(),fO()])}function r5(Z,J){let Q=F9(j4(),(X)=>{return X.name===Z});if(Q instanceof L){let X=Q[0],Y=F9(X.subcategories,(K)=>{return K.name===J});if(Y instanceof L)return Y[0].problems;else return $}else return $}function a5(Z){let J=F9(j4(),(Q)=>{return Q.name===Z});if(J instanceof L){let Q=J[0];return H0(Q.subcategories,(X)=>{return X.name})}else return $}function nQ(){let Z=a5(V4);return H0(Z,(J)=>{return[J,(()=>{let Q=r5(V4,J);return H0(Q,(X)=>{return new e6(V4,J,X.title)})})()]})}function mO(){return H0(j4(),(Z)=>{return Z.name})}function vO(Z,J,Q){let X=F9(Z,J);if(X instanceof L){let Y=X[0];return Q(Y)}else return X}function k8(Z,J,Q){return vO(j4(),(X)=>{return X.name===Z},(X)=>{return vO(X.subcategories,(Y)=>{return Y.name===J},(Y)=>{return F9(Y.problems,(K)=>{return K.title===Q})})})}var t5=new Map;function Wq(Z,J,Q,X,Y){if(t5.has(Z))return;let K=new Worker(J,Q?{type:"module"}:void 0);K.onmessage=(q)=>X(JSON.stringify(q.data)),K.onerror=(q)=>Y(String(q.message??"The runtime failed to load.")),t5.set(Z,K)}function nO(Z,J,Q,X,Y){t5.get(Z)?.terminate(),t5.delete(Z),Wq(Z,J,Q,X,Y)}function pO(Z,J,Q,X){t5.get(Z)?.postMessage({type:"run",id:J,solution:Q,harness:X})}function cO(Z,J){setTimeout(J,Z)}var tP="1.18.1",eP="3.14.3",ZS=8000;function lO(Z){if(Z==="python")return["/python-worker.js?v="+eP,!1];else if(Z==="typescript")return["/ts-worker.js",!0];else return["/gleam-worker.js?v="+tP,!0]}function Gq(Z,J,Q){return m6(Z,U0,LZ(J),Q)}function JS(Z){return h0("phase",_0,(J)=>{return Gq("file",_0,(Q)=>{return Gq("line",a1,(X)=>{return Gq("column",a1,(Y)=>{return h0("message",_0,(K)=>{return Z(new W7(new hK(J,Q,X,Y,K)))})})})})})}function dO(Z){return m6("stdout","",_0,Z)}function QS(Z){let J=h0("label",_0,(Q)=>{return h0("expected",_0,(X)=>{return h0("actual",_0,(Y)=>{return h0("passed",k4,(K)=>{return k0(new yK(Q,X,Y,K))})})})});return h0("cases",I8(J),(Q)=>{return Z(new q7(Q))})}function XS(Z){return h0("type",_0,(J)=>{if(J==="ready")return k0(new Z9(Z));else if(J==="result")return h0("id",a1,(Q)=>{return dO((X)=>{return QS((Y)=>{return k0(new G4(Q,Y,X))})})});else if(J==="error")return h0("id",a1,(Q)=>{return dO((X)=>{return JS((Y)=>{return k0(new G4(Q,Y,X))})})});else return b4(new Z9(Z),"Msg")})}function sO(Z,J){let Q=_7(J,XS(Z));if(Q instanceof L)return Q[0];else return new z7(Z,"The runtime sent an unreadable message.")}function iO(Z){return N6((J)=>{let Q=lO(Z),X=Q[0],Y=Q[1];return Wq(Z,X,Y,(K)=>{return J(sO(Z,K))},(K)=>{return J(new z7(Z,K))})})}function rO(Z){return N6((J)=>{let Q=lO(Z),X=Q[0],Y=Q[1];return nO(Z,X,Y,(K)=>{return J(sO(Z,K))},(K)=>{return J(new z7(Z,K))})})}function aO(Z,J,Q,X){return N6((Y)=>{return pO(Z,J,Q,X),cO(ZS,()=>{return Y(new c5(J))})})}function pQ(){try{if(globalThis.Storage&&globalThis.localStorage instanceof globalThis.Storage)return m0(globalThis.localStorage);else return t0(null)}catch{return t0(null)}}function F4(Z,J){return KS(Z.getItem(J))}function Iq(Z,J,Q){try{return Z.setItem(J,Q),m0(null)}catch{return t0(null)}}function KS(Z){if(Z!==null)return m0(Z);else return t0(null)}var WS="algoDrillState",GS="algoDrillState.v2",IS="algoDrillState.v3",tO="algoDrillState.v4";function dQ(Z){let J=(K)=>{if(k8(K.category,K.subcategory,K.title)instanceof L)return!0;else return!1},Q=Q1(Z.selected,J),X=new F0(Z.route,Z.selected_category,Z.selected_subcategory,Q,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Q1(Z.drafts,(K)=>{return J(K[0])}),Q1(Z.attempts,(K)=>{return J(K[0])}),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Q1(Z.exam_answers,(K)=>{return J(K[0])}));if(X.route instanceof E8&&X.problem_index>=I1(Q))return new F0(K7,X.selected_category,X.selected_subcategory,X.selected,0,X.iteration_count,1,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else if(X.route instanceof AQ&&X.exam_answers instanceof x)return new F0(K7,X.selected_category,X.selected_subcategory,X.selected,X.problem_index,X.iteration_count,X.current_iteration,X.draft,X.revealed_solution,X.runtimes,X.run,X.drafts,X.attempts,X.search,X.next_run_id,X.editor_keymap,X.choice,X.graded,X.exam_answers);else return X}function US(Z,J){if(Z==="currentView")return h0("currentProblemIndex",a1,J);else return h0("problemIndex",a1,J)}function eO(){return h0("category",_0,(Z)=>{return h0("subcategory",_0,(J)=>{return h0("title",_0,(Q)=>{return k0(new e6(Z,J,Q))})})})}function oO(Z,J){return m6(Z,U0,LZ(_0),J)}function zS(){return x4(_0,(Z)=>{if(Z==="drill")return k0(b5);else if(Z==="report")return k0(DQ);else return k0(K7)})}function zq(Z,J,Q){return h0(Z,zS(),(X)=>{return oO("selectedCategory",(Y)=>{return oO("selectedSubcategory",(K)=>{return h0(J,I8(eO()),(q)=>{return US(Z,(W)=>{return h0("iterationCount",a1,(G)=>{return h0("currentIteration",a1,(I)=>{return Q((()=>{let U=V7();return new F0(X,Y,K,q,W,G,I,U.draft,U.revealed_solution,U.runtimes,U.run,U.drafts,U.attempts,U.search,U.next_run_id,U.editor_keymap,U.choice,U.graded,U.exam_answers)})())})})})})})})})}function VS(){return zq("currentView","selectedProblems",(Z)=>{return k0(Z)})}function jS(Z){let J=F4(Z,WS);if(J instanceof L){let Q=J[0],X=_7(Q,VS()),Y=H1(X,dQ);return $4(Y,V7())}else return V7()}function FS(){return zq("route","selected",(Z)=>{return k0(Z)})}function OS(Z){let J=F4(Z,GS);if(J instanceof L){let Q=J[0],X=_7(Q,FS()),Y=H1(X,dQ);return $4(Y,V7())}else return jS(Z)}function HS(){return x4(_0,(Z)=>{if(Z==="passed")return k0(SQ);else return k0(y5)})}function Uq(Z,J){return x4(eO(),(Q)=>{return h0(Z,J,(X)=>{return k0([Q,X])})})}function ZH(){return zq("route","selected",(Z)=>{return m6("drafts",$,I8(Uq("draft",_0)),(J)=>{return m6("attempts",$,I8(Uq("result",HS())),(Q)=>{return m6("search","",_0,(X)=>{return m6("editorKeymap","default",_0,(Y)=>{return k0(new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,J,Q,X,Z.next_run_id,Y,Z.choice,Z.graded,Z.exam_answers))})})})})})}function NS(Z){let J=F4(Z,IS);if(J instanceof L){let Q=J[0],X=_7(Q,ZH()),Y=H1(X,dQ);return $4(Y,V7())}else return OS(Z)}function RS(){return x4(ZH(),(Z)=>{return m6("examAnswers",$,I8(Uq("correct",k4)),(J)=>{return k0(new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,J))})})}function JH(){let Z=pQ();if(Z instanceof L){let J=Z[0],Q=F4(J,tO);if(Q instanceof L){let X=Q[0],Y=_7(X,RS()),K=H1(Y,dQ);return $4(K,V7())}else return NS(J)}else return V7()}function cQ(Z,J){return w7(w(["category",K1(Z.category)],w(["subcategory",K1(Z.subcategory)],w(["title",K1(Z.title)],J))))}function MS(Z){return cQ(Z,$)}function AS(Z){let J=w7(j([["route",K1((()=>{let Q=Z.route;if(Q instanceof Q4)return"menu";else if(Q instanceof E8)return"drill";else return"report"})())],["selectedCategory",PX(Z.selected_category,K1)],["selectedSubcategory",PX(Z.selected_subcategory,K1)],["selected",U8(Z.selected,MS)],["problemIndex",n6(Z.problem_index)],["iterationCount",n6(Z.iteration_count)],["currentIteration",n6(Z.current_iteration)],["drafts",U8(Z.drafts,(Q)=>{return cQ(Q[0],j([["draft",K1(Q[1])]]))})],["attempts",U8(Z.attempts,(Q)=>{return cQ(Q[0],j([["result",K1((()=>{if(Q[1]instanceof U7)return"passed";else return"failed"})())]]))})],["examAnswers",U8(Z.exam_answers,(Q)=>{return cQ(Q[0],j([["correct",g4(Q[1])]]))})],["search",K1(Z.search)],["editorKeymap",K1(Z.editor_keymap)]]));return ZG(J)}function QH(Z){return N6((J)=>{let Q=pQ();if(Q instanceof L){let X=Q[0],Y=Iq(X,tO,AS(Z));return}else return})}function BS(Z,J){let Q=Z.revealed_solution;if(Q instanceof a){let X=Q[0],Y=J.solutions,K=HZ(Y,X);return OZ(K)}else return new V0(void 0)}function Fq(Z){let J=BZ(Z);if(J==="")return $;else{let Q=J;return j([uZ(j([y("results-details")]),j([vZ($,j([d("Output")])),$7(j([y("results-stdout")]),j([d(Q)]))]))])}}function LS(Z,J,Q){let X,Y=Z.file;if(Y instanceof a){let W=Y[0];X=_4(W,"check")}else X=!1;let K=X,q=J.check;if(K&&q instanceof a){let W=q[0];return Y0(j([y("results")]),w(Y0(j([y("results-summary fail")]),j([d("Your solution doesn't match the required signature.")])),w($7(j([y("signature")]),j([L9($,j([d(W.signature)]))])),w(uZ(j([y("results-details")]),j([vZ($,j([d("Details")])),$7(j([y("results-message")]),j([d(Z.message)]))])),Fq(Q)))))}else return Y0(j([y("results")]),w(Y0(j([y("results-summary fail")]),j([d((()=>{if(Z.phase==="compile")return"Your code doesn't compile.";else return"Your code crashed while running."})())])),w($7(j([y("results-message")]),j([d(Z.message)])),Fq(Q))))}function PS(Z,J){let Q=I1(Z),X=U9(Z,(U)=>{return U.passed}),Y=X===Q&&Q>0,K=Y0(j([n1(j([["results-summary",!0],["pass",Y],["fail",!Y]]))]),j([d((()=>{if(Y)return"✓ ";else return"✗ "})()+A0(X)+"/"+A0(Q)+" passed")])),q,G=Q1(Z,(U)=>{return!U.passed});q=H0(G,(U)=>{return Y0(j([y("case fail")]),j([Y0(j([y("case-label")]),j([d("✗ "+U.label)])),Y0(j([y("case-diff")]),j([Y0($,j([n0(j([y("case-diff-tag")]),j([d("expected ")])),L9($,j([d(U.expected)]))])),Y0($,j([n0(j([y("case-diff-tag")]),j([d("got ")])),L9($,j([d(U.actual)]))]))]))]))});let I=q;return Y0(j([y("results")]),w(K,X1(Fq(J),I)))}function SS(Z,J){let Q,X=Z.run;if(X instanceof PQ)Q=$;else if(X instanceof G7)Q=j([Y0(j([y("results")]),j([Y0(j([y("results-summary")]),j([d("Compiling and running…")]))]))]);else{let G=X.outcome;if(G instanceof q7){let I=X.stdout,U=G[0];Q=j([PS(U,I)])}else if(G instanceof W7){let I=X.stdout,U=G[0];Q=j([LS(U,J,I)])}else Q=j([Y0(j([y("results")]),j([Y0(j([y("results-summary fail")]),j([d("Your solution didn't finish — likely an infinite loop. The runtime was restarted.")]))]))])}let Y=Q,K,q=BS(Z,J);if(q instanceof L){let G=q[0];K=j([Y0(j([y("answer-content")]),j9(j([j([Y0(j([y("answer-label")]),j([d(G.label)]))]),(()=>{let I=G.note;if(I==="")return $;else{let U=I;return j([Y0(j([y("answer-note")]),j([d(U)]))])}})(),j([$7($,j([L9($,j([d(G.code)]))]))])])))])}else K=$;return X1(Y,K)}function TS(Z,J){return S4(J.solutions,(Q,X)=>{return U1(j([n1(j([["btn-secondary",!0],["solution-button",!0],["revealed",P0(Z.revealed_solution,new a(X))]])),i0(new q4(X))]),j([d(Q.label)]))})}function e5(Z,J){return U1(j([y("btn-primary run-button"),f8(J),i0(HO)]),j([d(Z)]))}function ES(Z,J){let Q;if(J.check instanceof a)Q=j([(()=>{let K=l5(Z,s5(J.language));if(Z.run instanceof G7)return e5("Running…",!0);else if(K instanceof X4)return e5("Loading runtime…",!0);else if(K instanceof BQ)return e5("Loading runtime…",!0);else if(K instanceof Y4)return e5("▶ Run tests",!1);else return e5("Runtime unavailable",!0)})()]);else Q=j([n0(j([y("run-unavailable")]),j([d("Checking isn't available for this drill — compare with a solution.")]))]);let Y=Q;return Y0(j([y("run-bar")]),j9(j([Y,TS(Z,J),j([U1(j([y("btn-primary next-button"),i0(uK)]),j([d("Next")]))])])))}function Vq(Z){let Q=AZ(Z,`
`),X=NZ(Q,3);return DZ(X,`
`)}function CS(Z){let J=Z.run;if(J instanceof I7){let Q=J.outcome;if(Q instanceof W7){let X=Q[0],Y=X.file,K=X.line,q=X.column;if(Y instanceof a&&K instanceof a&&q instanceof a){let W=Y[0];if(W==="solution.gleam"){let G=K[0],I=q[0];return j([new x5(G,I,Vq(X.message))])}else if(W==="solution.py"){let G=K[0],I=q[0];return j([new x5(G,I,Vq(X.message))])}else if(W==="solution.ts"){let G=K[0],I=q[0];return j([new x5(G,I,Vq(X.message))])}else return $}else return $}else return $}else return $}function _S(Z,J){if(Z.graded){let X=P0(Z.choice,new a(J.correct));return j([Y0(j([y("results")]),j([Y0(j([n1(j([["results-summary",!0],["pass",X],["fail",!X]]))]),j([d((()=>{if(X)return"✓ Correct";else return"✗ Not quite"})())])),Y0(j([y("quiz-explanation")]),j([d(J.explanation)])),Y0(j([y("quiz-page")]),j([d("Book reference: "+J.page)]))]))])}else return $}function wS(Z){if(Z===0)return"A";else if(Z===1)return"B";else if(Z===2)return"C";else if(Z===3)return"D";else return A0(Z+1)}function kS(Z,J){let Q=Y0(j([y("quiz-choices")]),S4(J.choices,(Y,K)=>{let q=P0(Z.choice,new a(K)),W=K===J.correct;return U1(j([n1(j([["quiz-choice",!0],["picked",q],["correct",Z.graded&&W],["wrong",Z.graded&&q&&!W]])),f8(Z.graded),i0(new d5(K))]),j([n0(j([y("quiz-marker")]),j([d(wS(K))])),n0(j([y("quiz-choice-text")]),j([d(Y)]))]))})),X=Y0(j([y("run-bar")]),(()=>{if(Z.graded)return j([U1(j([y("btn-primary next-button"),i0(uK)]),j([d("Next")]))]);else return j([U1(j([y("btn-primary"),f8(Z.choice instanceof U6),i0(NO)]),j([d("Submit answer")]))])})());return w(Q,w(X,_S(Z,J)))}function xS(Z){let J=Z.run;if(J instanceof I7){let Q=J.outcome;if(Q instanceof q7){let X=Q[0];return d4(j([y("case-list")]),H0(X,(Y)=>{return c4(j([n1(j([["case",!0],["pass",Y.passed],["fail",!Y.passed]]))]),j([n0(j([y("case-icon")]),j([d((()=>{if(Y.passed)return"✓";else return"✗"})())])),d(" "+Y.label)]))}))}else return Y0(j([y("pane-empty")]),j([d("Run the tests to see the cases.")]))}else return Y0(j([y("pane-empty")]),j([d("Run the tests to see the cases.")]))}function jq(Z,J){return bG(j([y("panel")]),w(fZ(j([y("panel-title")]),j([d(Z)])),J))}function bS(Z,J,Q){let X=jq("Prompt",j([Y0(j([y("problem-category")]),j([d(J.category+" › "+J.subcategory+" · "+TO(Q.language))])),Y0(j([y("problem-prompt")]),j([d(Q.prompt)]))])),Y,K=Q.approach;if(K==="")Y=$;else{let U=K;Y=j([uZ(j([y("panel approach")]),j([vZ(j([y("panel-title")]),j([d("Approach")])),Y0(j([y("approach-text")]),j([d(U)]))]))])}let q=Y,W,G=Q.check;if(G instanceof a){let U=G[0];W=j([jq("Signature",j([$7(j([y("signature")]),j([L9($,j([d(U.signature)]))]))])),jq("Tests",j([xS(Z)]))])}else W=$;return w(X,X1(q,W))}function yS(Z){return Y0(j([y("keymap-picker")]),H0(j([["default","Std"],["vim","Vim"],["emacs","Emacs"]]),(J)=>{return U1(j([n1(j([["keymap-option",!0],["active",Z.editor_keymap===J[0]]])),s0("title",J[1]+" keybindings"),i0(new n5(J[0]))]),j([d(J[1])]))}))}function hS(Z,J,Q){let X=I1(Z.selected),Y;if(Q.quiz instanceof a)Y="Question "+A0(Z.problem_index+1)+"/"+A0(X);else Y="Pass "+A0(Z.current_iteration)+"/"+A0(Z.iteration_count)+" · Problem "+A0(Z.problem_index+1)+"/"+A0(X);let q=Y,W=X*Z.iteration_count,G=(Z.current_iteration-1)*X+Z.problem_index,I;if(W===0)I=W;else I=y8(G*100,W);let U=I,z=J.category+"|"+J.subcategory+"|"+J.title+"|"+A0(Z.current_iteration);return Y0(j([y("drill-container")]),j([Y0(j([y("drill-header")]),j([U1(j([y("btn-secondary"),i0(FO)]),j([d("← Exit")])),gZ(j([y("drill-title")]),j([d(Q.title)])),(()=>{if(Q.quiz instanceof a)return h7();else return yS(Z)})(),Y0(j([y("progress-text"),wZ("--progress",A0(U)+"%")]),j([d(q)]))])),Y0(j([y("drill-grid")]),j([Y0(j([y("drill-side")]),bS(Z,J,Q)),Y0(j([y("drill-main")]),(()=>{let V=Q.quiz;if(V instanceof a){let F=V[0];return kS(Z,F)}else return w(d8(j([y("editor-frame")]),j([[z,XO(j([YO(Z.draft),qO(s5(Q.language)),KO(Z.editor_keymap),GO((F)=>{return new W4(F)}),WO(CS(Z))]))]])),w(ES(Z,Q),SS(Z,Q)))})())]))]))}function XH(Z){return h4(W6(Z),(J)=>{return h4(k8(J.category,J.subcategory,J.title),(Q)=>{return new L(hS(Z,J,Q))})})}var YH="src/algodrill/view/menu.gleam";function gS(){let Z=nQ();return L1(Z,0,(J,Q)=>{return J+I1(Q[1])})}function fS(Z){let J=Z.selected;if(J instanceof x)return h7();else{let Q=J;return d8(j([y("chips")]),H0(Q,(X)=>{return[X.category+"|"+X.subcategory+"|"+X.title,n0(j([y("chip")]),j([d(X.title+" "),U1(j([y("chip-remove"),s0("aria-label","Remove "+X.title),i0(new C8(X))]),j([d("×")]))]))]}))}}function KH(Z,J){let Q=I4(Z.attempts,J);if(Q instanceof L){let X=Q[0],Y;if(X instanceof U7)Y=["badge badge-passed","✓"];else Y=["badge badge-failed","✗"];let K=Y,q=K[0],W=K[1];return n0(j([y(q)]),j([d(W)]))}else return h7()}function Oq(Z){return kU("keydown",h0("key",_0,(J)=>{if(J==="Enter")return k0(YJ(Z,!0,!1));else if(J===" ")return k0(YJ(Z,!0,!1));else return b4(YJ(Z,!1,!1),"key")}))}function uS(Z,J){let Q=C4(J),X,Y=j4();X=T4(Y,(q)=>{let W=q.subcategories;return T4(W,(G)=>{let I=G.problems;return V9(I,(U)=>{if(OX(C4(U.title),Q))return new L([new e6(q.name,G.name,U.title),U]);else return new V0(void 0)})})});let K=X;if(K instanceof x)return Y0(j([y("search-results")]),j([Y0(j([y("pane-empty")]),j([d("No problems match “"+J+"”")]))]));else return d8(j([y("search-results")]),H0(K,(q)=>{let W=q[0];return[W.category+"|"+W.subcategory+"|"+W.title,(()=>{let G=z9(Z.selected,W);return Y0(j([n1(j([["search-hit",!0],["selected",G]])),kZ(0),i0(new C8(W)),Oq(new C8(W))]),j([n0(j([y("search-hit-title")]),j([d(W.title)])),KH(Z,W),n0(j([y("search-hit-context")]),j([d(W.category+" › "+W.subcategory)]))]))})()]}))}function vS(Z,J){return Y0(j([n1(j([["pane-item",!0],["selected",z9(Z.selected,J)]])),kZ(0),i0(new C8(J)),Oq(new C8(J))]),j([d(J.title),KH(Z,J)]))}function Hq(Z,J){return Y0(j([y("pane")]),j([fZ($,j([d(Z)])),J]))}function mS(Z,J){return Hq("Problems",(()=>{if(J instanceof x)return Y0(j([y("pane-list")]),j([Y0(j([y("pane-empty")]),j([d("Pick a subcategory first")]))]));else{let Q=Z.selected_category,X;if(Q instanceof a)X=Q[0];else throw R7("let_assert",YH,"algodrill/view/menu",288,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Q,start:8541,end:8583,pattern_start:8552,pattern_end:8561});let Y=Z.selected_subcategory,K;if(Y instanceof a)K=Y[0];else throw R7("let_assert",YH,"algodrill/view/menu",289,"problem_pane","Pattern match failed, no pattern matched the value.",{value:Y,start:8590,end:8635,pattern_start:8601,pattern_end:8610});return d8(j([y("pane-list")]),H0(J,(q)=>{let W=new e6(X,K,q.title);return[q.title,vS(Z,W)]}))}})())}function qH(Z,J,Q){return Y0(j([n1(j([["pane-item",!0],["current",J]])),kZ(0),i0(Q),Oq(Q)]),j([d(Z)]))}function nS(Z){let J,Q=Z.selected_category;if(Q instanceof a){let Y=Q[0];J=a5(Y)}else J=$;let X=J;return Hq("Subcategory",(()=>{if(X instanceof x)return Y0(j([y("pane-list")]),j([Y0(j([y("pane-empty")]),j([d("Pick a category first")]))]));else return d8(j([y("pane-list")]),H0(X,(Y)=>{return[Y,qH(Y,P0(Z.selected_subcategory,new a(Y)),new $5(Y))]}))})())}function pS(Z){return Hq("Category",d8(j([y("pane-list")]),H0(mO(),(J)=>{return[J,qH(J,P0(Z.selected_category,new a(J)),new h5(J))]})))}function cS(Z){let J,Q=j(["Categories"]),X=X1(Q,XX(j([Z.selected_category])));J=X1(X,XX(j([Z.selected_subcategory])));let Y=J,K=I1(Y)-1;return Y0(j([y("breadcrumbs")]),(()=>{let W=S4(Y,(G,I)=>{if(I===K)return j([n0(j([y("breadcrumb")]),j([d(G)]))]);else return j([n0(j([y("breadcrumb clickable"),i0(new g5(I))]),j([d(G)])),d(" "),n0(j([y("breadcrumb")]),j([d("/")])),d(" ")])});return j9(W)})())}function Nq(Z){let J,Q=Z.selected_category,X=Z.selected_subcategory;if(Q instanceof a&&X instanceof a){let K=Q[0],q=X[0];J=r5(K,q)}else J=$;let Y=J;return Y0(j([y("menu-container")]),w(Y0(j([y("menu-top")]),j([xG(j([y("menu-title")]),j([d("Algo Drill")])),vX(j([yX("search"),y("search"),HG("Search problems…"),hX(Z.search),xU((K)=>{return new m5(K)})]))])),(()=>{let K,q=BZ(Z.search);if(q==="")K=j([cS(Z),Y0(j([y("panes-container")]),j([pS(Z),nS(Z),mS(Z,Y)]))]);else K=j([uS(Z,q)]);return X1(K,j([fS(Z),Y0(j([y("iteration-control")]),j([yG(j([jG("iterations")]),j([d("Repetitions per problem")])),vX(j([yX("number"),A9("iterations"),OG("1"),FG("20"),hX(A0(Z.iteration_count)),bU((G)=>{return new f5(G)})])),n0(j([y("progress-text")]),j([d(A0(I1(Z.selected))+" selected")]))])),Y0(j([y("menu-actions")]),j([U1(j([A9("startDrill"),y("btn-primary"),f8(Z.selected instanceof x),i0(jO)]),j([d("Start drill")])),U1(j([A9("selectAll"),y("btn-secondary"),f8(Y instanceof x),i0(zO)]),j([d("Select all in subcategory")])),U1(j([A9("clearSelection"),y("btn-secondary"),i0(VO)]),j([d("Clear selection")])),U1(j([A9("startExam"),y("btn-secondary"),f8(gS()===0),i0(RO)]),j([d("System design exam")]))]))]))})()))}function Rq(Z,J){return Y0(j([y("panel")]),w(Y0(j([y("panel-title")]),j([d(Z)])),J))}function lS(Z){if(Z instanceof x)return j([Rq("Where to study",j([Y0(j([y("pane-empty")]),j([d("Nothing under "+A0(yQ)+"%. Widen the pool or raise the bar.")]))]))]);else return j([Rq("Where to study",j([d4(j([y("report-advice")]),H0(Z,(J)=>{return c4($,j([d(J.section+" — "+A0(e7(J.correct,J.total))+"%")]))}))]))])}function sS(Z){let J=e7(Z.correct,Z.total),Q=J<yQ;return c4(j([n1(j([["report-section",!0],["weak",Q]]))]),j([n0(j([y("report-section-name")]),j([d(Z.section)])),n0(j([y("report-bar"),wZ("--score",A0(J)+"%")]),$),n0(j([y("report-section-score")]),j([d(A0(Z.correct)+"/"+A0(Z.total))])),n0(j([y("report-section-percent")]),j([d(A0(J)+"%")]))]))}function WH(Z){let J=DO(Z.exam_answers,a5(V4)),Q=I1(Z.exam_answers),X=U9(Z.exam_answers,(K)=>{return K[1]}),Y=Q1(J,(K)=>{return e7(K.correct,K.total)<yQ});return Y0(j([y("report-container")]),j([Y0(j([y("drill-header")]),j([U1(j([y("btn-secondary"),i0(MO)]),j([d("← Menu")])),gZ(j([y("drill-title")]),j([d("Exam result")]))])),Y0(j([y("report-body")]),w(Y0(j([y("report-total")]),j([n0(j([y("report-total-score")]),j([d(A0(X)+"/"+A0(Q))])),n0(j([y("report-total-percent")]),j([d(A0(e7(X,Q))+"%")]))])),w(Rq("By section — weakest first",j([d4(j([y("report-sections")]),H0(J,sS))])),lS(Y))))]))}var rS="src/algodrill.gleam",aS=40;function oS(Z){let J=Z.route;if(J instanceof Q4)return Nq(Z);else if(J instanceof E8){let Q=XH(Z);if(Q instanceof L)return Q[0];else return Nq(Z)}else return WH(Z)}function tS(Z){if(Z instanceof u5)return!1;else if(Z instanceof v5)if(!Z[0])return!1;else return!0;else if(Z instanceof q4)return!1;else if(Z instanceof W4)return!1;else if(Z instanceof p5)return!1;else if(Z instanceof Z9)return!1;else if(Z instanceof z7)return!1;else return!0}function Dq(Z){let J=W6(Z);if(J instanceof L){let Q=J[0],X=k8(Q.category,Q.subcategory,Q.title);if(X instanceof L){let Y=X[0];return new L(s5(Y.language))}else return X}else return J}function Mq(Z,J,Q){let X=I4(Z,J);if(Q)return $6(Z,J,SQ);else if(X instanceof L)if(X[0]instanceof U7)return Z;else return $6(Z,J,y5);else return $6(Z,J,y5)}function UH(Z){let J=W6(Z);if(J instanceof L){let Q=J[0],X=k8(Q.category,Q.subcategory,Q.title);if(X instanceof L){let K=X[0].check;if(K instanceof a){let q=K[0];return new L(q)}else return new V0(void 0)}else return X}else return J}function eS(){return N6((Z)=>{return kY("draft-save",400,()=>{return Z(OO)})})}function Bq(Z){let J=Z[0],Q=Z[1],X=J.route instanceof E8&&!P0(UH(J),new V0(void 0)),Y=Dq(J);if(X&&Y instanceof L){let K=Y[0];if(l5(J,K)instanceof X4)return[new F0(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,J.draft,J.revealed_solution,$6(J.runtimes,K,bK),J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers),v4(j([Q,iO(K)]))];else return Z}else return Z}function ZZ(Z){let J=k8(Z.category,Z.subcategory,Z.title);if(J instanceof L){let X=J[0].check;if(X instanceof a)return X[0].starter;else return""}else return""}function Aq(Z){return new F0(K7,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,"",U0,Z.runtimes,K4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U0,!1,Z.exam_answers)}function GH(Z){let J=W6(Z);if(J instanceof L){let Q=J[0],X=k8(Q.category,Q.subcategory,Q.title);if(X instanceof L){let K=X[0].quiz;if(K instanceof a){let q=K[0];return new L(q)}else return new V0(void 0)}else return X}else return J}function ZT(Z,J,Q){while(!0){let X=Z,Y=J,K=Q;if(Y<=0)return K;else{let W=QW(X,yY(Y)),G=W[0],I=W[1];if(I instanceof x)return X1(K,X);else{let{head:U,tail:z}=I;Z=X1(G,z),J=Y-1,Q=w(U,K)}}}}function IH(Z){return ZT(Z,I1(Z),$)}function JT(){let Z=nQ(),J,Q=I1(Z);if(Q===0)J=Q;else J=TZ(1,y8(aS,Q));let X=J,K=T4(Z,(q)=>{return NZ(IH(q[1]),X)});return IH(K)}function QT(Z,J){if(z9(Z,J))return Q1(Z,(X)=>{return!P0(X,J)});else return X1(Z,j([J]))}function XT(Z,J){if(J instanceof h5){let Q=J[0];return[new F0(Z.route,new a(Q),U0,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof $5){let Q=J[0];return[new F0(Z.route,Z.selected_category,new a(Q),Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof g5)if(J[0]===0)return[new F0(Z.route,U0,U0,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()];else return[new F0(Z.route,Z.selected_category,U0,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()];else if(J instanceof C8){let Q=J[0];return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,QT(Z.selected,Q),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof TQ){let{selected_category:Q,selected_subcategory:X}=Z;if(Q instanceof a&&X instanceof a){let Y=Q[0],K=X[0],q,W=r5(Y,K),G=H0(W,(U)=>{return new e6(Y,K,U.title)});q=Q1(G,(U)=>{return!z9(Z.selected,U)});let I=q;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,X1(Z.selected,I),Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else return[Z,j0()]}else if(J instanceof EQ)return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,$,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()];else if(J instanceof f5){let Q=J[0],X,Y=RX(Q);if(Y instanceof L){let q=Y[0];if(q>0)X=q;else X=1}else X=1;let K=X;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,K,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof CQ){let Q=Z.selected;if(Q instanceof x)return[Z,j0()];else{let X=Q.head;return Bq([new F0(b5,Z.selected_category,Z.selected_subcategory,Z.selected,0,Z.iteration_count,1,ZZ(X),U0,Z.runtimes,K4,$6(Z.drafts,X,ZZ(X)),Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U0,!1,$),j0()])}}else if(J instanceof u5)return[Z,N6((Q)=>{return Q(new v5(xY((()=>{if(GH(Z)instanceof L)return"Exit the exam? You will not get a score for it.";else return"Exit the drill? Your typed code will be lost."})())))})];else if(J instanceof v5)if(J[0])return[Aq(Z),j0()];else return[Z,j0()];else if(J instanceof q4){let Q=J[0],X,Y=Z.revealed_solution;if(Y instanceof a)if(Y[0]===Q)X=U0;else X=new a(Q);else X=new a(Q);let K=X;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,K,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof _Q){let Q;if(Z.problem_index+1<I1(Z.selected))Q=[Z.problem_index+1,Z.current_iteration];else Q=[0,Z.current_iteration+1];let Y=Q,K=Y[0],q=Y[1],W=q>Z.iteration_count,G=Z.exam_answers;if(W)if(G instanceof x)return[Aq(Z),N6((I)=>{return bY("Drill complete.")})];else return[(()=>{let I=Aq(Z);return new F0(DQ,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,I.draft,I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers)})(),j0()];else{let I=new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,K,Z.iteration_count,q,Z.draft,U0,Z.runtimes,K4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U0,!1,Z.exam_answers),U,z=W6(I);if(z instanceof L){let F=z[0];U=new F0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,ZZ(F),I.revealed_solution,I.runtimes,I.run,$6(I.drafts,F,ZZ(F)),I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers)}else U=new F0(I.route,I.selected_category,I.selected_subcategory,I.selected,I.problem_index,I.iteration_count,I.current_iteration,"",I.revealed_solution,I.runtimes,I.run,I.drafts,I.attempts,I.search,I.next_run_id,I.editor_keymap,I.choice,I.graded,I.exam_answers);return Bq([U,j0()])}}else if(J instanceof m5){let Q=J[0];return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Q,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof n5){let Q=J[0];return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Q,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof W4){let Q=J[0],X,Y=W6(Z);if(Y instanceof L){let q=Y[0];X=$6(Z.drafts,q,Q)}else X=Z.drafts;let K=X;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Q,Z.revealed_solution,Z.runtimes,Z.run,K,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),eS()]}else if(J instanceof wQ)return[Z,j0()];else if(J instanceof p5){let Q=Dq(Z),X=UH(Z);if(Q instanceof L&&X instanceof L){let Y=Q[0],K=X[0];if(l5(Z,Y)instanceof Y4){let W=Z.next_run_id;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new G7(W),Z.drafts,Z.attempts,Z.search,W+1,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),aO(Y,W,Z.draft,K.harness)]}else return[Z,j0()]}else return[Z,j0()]}else if(J instanceof Z9){let Q=J.language;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,$6(Z.runtimes,Q,UO),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof z7){let{language:Q,message:X}=J;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,$6(Z.runtimes,Q,new LQ(X)),Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else if(J instanceof G4){let{id:Q,outcome:X,stdout:Y}=J,K=Z.run;if(K instanceof G7)if(K.id===Q){let W;if(X instanceof q7){let V=X[0];W=!(V instanceof x)&&JW(V,(F)=>{return F.passed})}else if(X instanceof W7)W=!1;else W=!1;let G=W,I,U=W6(Z);if(U instanceof L){let V=U[0];I=Mq(Z.attempts,V,G)}else I=Z.attempts;let z=I;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new I7(X,Y),Z.drafts,z,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else return[Z,j0()];else return[Z,j0()]}else if(J instanceof c5){let Q=J.id,X=Z.run;if(X instanceof G7)if(X.id===Q){let K,q=W6(Z);if(q instanceof L){let I=q[0];K=Mq(Z.attempts,I,!1)}else K=Z.attempts;let W=K,G=Dq(Z);if(G instanceof L){let I=G[0];return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,$6(Z.runtimes,I,bK),new I7(gK,""),Z.drafts,W,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),rO(I)]}else return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,new I7(gK,""),Z.drafts,W,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}else return[Z,j0()];else return[Z,j0()]}else if(J instanceof d5){let Q=J[0];if(Z.graded)return[Z,j0()];else return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,new a(Q),Z.graded,Z.exam_answers),j0()]}else if(J instanceof kQ){let{graded:Q,choice:X}=Z,Y=GH(Z),K=W6(Z);if(!Q&&X instanceof a&&Y instanceof L&&K instanceof L){let q=X[0],W=Y[0],G=K[0],I=q===W.correct;return[new F0(Z.route,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Mq(Z.attempts,G,I),Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,!0,w([G,I],Z.exam_answers)),j0()]}else return[Z,j0()]}else if(J instanceof xQ)return[Z,N6((Q)=>{return Q(new bQ(JT()))})];else if(J instanceof bQ){let Q=J[0];if(Q instanceof x)return[Z,j0()];else return[new F0(b5,Z.selected_category,Z.selected_subcategory,Q,0,1,1,"",U0,Z.runtimes,K4,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,U0,!1,$),j0()]}else return[new F0(K7,Z.selected_category,Z.selected_subcategory,Z.selected,Z.problem_index,Z.iteration_count,Z.current_iteration,Z.draft,Z.revealed_solution,Z.runtimes,Z.run,Z.drafts,Z.attempts,Z.search,Z.next_run_id,Z.editor_keymap,Z.choice,Z.graded,Z.exam_answers),j0()]}function YT(Z,J){let Q=XT(Z,J),X=Q[0],Y=Q[1];if(tS(J))return[X,v4(j([QH(X),Y]))];else return[X,Y]}function KT(Z,J){let Q=I4(Z.drafts,J);if(Q instanceof L)return Q[0];else return ZZ(J)}function qT(Z){let J=JH(),Q,X=J.route,Y=W6(J);if(Y instanceof L&&X instanceof E8){let q=Y[0];Q=new F0(J.route,J.selected_category,J.selected_subcategory,J.selected,J.problem_index,J.iteration_count,J.current_iteration,KT(J,q),J.revealed_solution,J.runtimes,J.run,J.drafts,J.attempts,J.search,J.next_run_id,J.editor_keymap,J.choice,J.graded,J.exam_answers)}else Q=J;return Bq([Q,j0()])}function zH(){xK();let Z=CU(qT,YT,oS),J=_U(Z,"#app",void 0);if(!(J instanceof L))throw R7("let_assert",rS,"algodrill",32,"main","Pattern match failed, no pattern matched the value.",{value:J,start:1219,end:1268,pattern_start:1230,pattern_end:1235});return}zH();
