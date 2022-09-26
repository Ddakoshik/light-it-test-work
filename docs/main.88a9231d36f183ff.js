'use strict';
(self.webpackChunklight_it_test_work = self.webpackChunklight_it_test_work || []).push([
  [179],
  {
    859: () => {
      function ie(n) {
        return 'function' == typeof n;
      }
      function xs(n) {
        const e = n(i => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (e.prototype = Object.create(Error.prototype)), (e.prototype.constructor = e), e;
      }
      const Fs = xs(
        n =>
          function (e) {
            n(this),
              (this.message = e
                ? `${e.length} errors occurred during unsubscription:\n${e
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = e);
          }
      );
      function Ji(n, t) {
        if (n) {
          const e = n.indexOf(t);
          0 <= e && n.splice(e, 1);
        }
      }
      class Ne {
        constructor(t) {
          (this.initialTeardown = t), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: e } = this;
            if (e)
              if (((this._parentage = null), Array.isArray(e))) for (const o of e) o.remove(this);
              else e.remove(this);
            const { initialTeardown: i } = this;
            if (ie(i))
              try {
                i();
              } catch (o) {
                t = o instanceof Fs ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  Uf(o);
                } catch (s) {
                  (t = t ?? []), s instanceof Fs ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Fs(t);
          }
        }
        add(t) {
          var e;
          if (t && t !== this)
            if (this.closed) Uf(t);
            else {
              if (t instanceof Ne) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers = null !== (e = this._finalizers) && void 0 !== e ? e : []).push(t);
            }
        }
        _hasParent(t) {
          const { _parentage: e } = this;
          return e === t || (Array.isArray(e) && e.includes(t));
        }
        _addParent(t) {
          const { _parentage: e } = this;
          this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
        }
        _removeParent(t) {
          const { _parentage: e } = this;
          e === t ? (this._parentage = null) : Array.isArray(e) && Ji(e, t);
        }
        remove(t) {
          const { _finalizers: e } = this;
          e && Ji(e, t), t instanceof Ne && t._removeParent(this);
        }
      }
      Ne.EMPTY = (() => {
        const n = new Ne();
        return (n.closed = !0), n;
      })();
      const zf = Ne.EMPTY;
      function $f(n) {
        return n instanceof Ne || (n && 'closed' in n && ie(n.remove) && ie(n.add) && ie(n.unsubscribe));
      }
      function Uf(n) {
        ie(n) ? n() : n.unsubscribe();
      }
      const Di = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Os = {
          setTimeout(n, t, ...e) {
            const { delegate: i } = Os;
            return i?.setTimeout ? i.setTimeout(n, t, ...e) : setTimeout(n, t, ...e);
          },
          clearTimeout(n) {
            const { delegate: t } = Os;
            return (t?.clearTimeout || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function Gf(n) {
        Os.setTimeout(() => {
          const { onUnhandledError: t } = Di;
          if (!t) throw n;
          t(n);
        });
      }
      function ks() {}
      const BE = ac('C', void 0, void 0);
      function ac(n, t, e) {
        return { kind: n, value: t, error: e };
      }
      let Ei = null;
      function Rs(n) {
        if (Di.useDeprecatedSynchronousErrorHandling) {
          const t = !Ei;
          if ((t && (Ei = { errorThrown: !1, error: null }), n(), t)) {
            const { errorThrown: e, error: i } = Ei;
            if (((Ei = null), e)) throw i;
          }
        } else n();
      }
      class lc extends Ne {
        constructor(t) {
          super(), (this.isStopped = !1), t ? ((this.destination = t), $f(t) && t.add(this)) : (this.destination = WE);
        }
        static create(t, e, i) {
          return new lo(t, e, i);
        }
        next(t) {
          this.isStopped
            ? uc(
                (function jE(n) {
                  return ac('N', n, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? uc(
                (function HE(n) {
                  return ac('E', void 0, n);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped ? uc(BE, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const $E = Function.prototype.bind;
      function cc(n, t) {
        return $E.call(n, t);
      }
      class UE {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: e } = this;
          if (e.next)
            try {
              e.next(t);
            } catch (i) {
              Ps(i);
            }
        }
        error(t) {
          const { partialObserver: e } = this;
          if (e.error)
            try {
              e.error(t);
            } catch (i) {
              Ps(i);
            }
          else Ps(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (e) {
              Ps(e);
            }
        }
      }
      class lo extends lc {
        constructor(t, e, i) {
          let r;
          if ((super(), ie(t) || !t)) r = { next: t ?? void 0, error: e ?? void 0, complete: i ?? void 0 };
          else {
            let o;
            this && Di.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: t.next && cc(t.next, o),
                  error: t.error && cc(t.error, o),
                  complete: t.complete && cc(t.complete, o),
                }))
              : (r = t);
          }
          this.destination = new UE(r);
        }
      }
      function Ps(n) {
        Di.useDeprecatedSynchronousErrorHandling
          ? (function zE(n) {
              Di.useDeprecatedSynchronousErrorHandling && Ei && ((Ei.errorThrown = !0), (Ei.error = n));
            })(n)
          : Gf(n);
      }
      function uc(n, t) {
        const { onStoppedNotification: e } = Di;
        e && Os.setTimeout(() => e(n, t));
      }
      const WE = {
          closed: !0,
          next: ks,
          error: function GE(n) {
            throw n;
          },
          complete: ks,
        },
        dc = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function er(n) {
        return n;
      }
      let be = (() => {
        class n {
          constructor(e) {
            e && (this._subscribe = e);
          }
          lift(e) {
            const i = new n();
            return (i.source = this), (i.operator = e), i;
          }
          subscribe(e, i, r) {
            const o = (function KE(n) {
              return (
                (n && n instanceof lc) ||
                ((function qE(n) {
                  return n && ie(n.next) && ie(n.error) && ie(n.complete);
                })(n) &&
                  $f(n))
              );
            })(e)
              ? e
              : new lo(e, i, r);
            return (
              Rs(() => {
                const { operator: s, source: a } = this;
                o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o));
              }),
              o
            );
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (i) {
              e.error(i);
            }
          }
          forEach(e, i) {
            return new (i = qf(i))((r, o) => {
              const s = new lo({
                next: a => {
                  try {
                    e(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(e) {
            var i;
            return null === (i = this.source) || void 0 === i ? void 0 : i.subscribe(e);
          }
          [dc]() {
            return this;
          }
          pipe(...e) {
            return (function Wf(n) {
              return 0 === n.length
                ? er
                : 1 === n.length
                ? n[0]
                : function (e) {
                    return n.reduce((i, r) => r(i), e);
                  };
            })(e)(this);
          }
          toPromise(e) {
            return new (e = qf(e))((i, r) => {
              let o;
              this.subscribe(
                s => (o = s),
                s => r(s),
                () => i(o)
              );
            });
          }
        }
        return (n.create = t => new n(t)), n;
      })();
      function qf(n) {
        var t;
        return null !== (t = n ?? Di.Promise) && void 0 !== t ? t : Promise;
      }
      const YE = xs(
        n =>
          function () {
            n(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
          }
      );
      let ee = (() => {
        class n extends be {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(e) {
            const i = new Kf(this, this);
            return (i.operator = e), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new YE();
          }
          next(e) {
            Rs(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(e);
              }
            });
          }
          error(e) {
            Rs(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = e);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(e);
              }
            });
          }
          complete() {
            Rs(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
          }
          get observed() {
            var e;
            return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0;
          }
          _trySubscribe(e) {
            return this._throwIfClosed(), super._trySubscribe(e);
          }
          _subscribe(e) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
          }
          _innerSubscribe(e) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? zf
              : ((this.currentObservers = null),
                o.push(e),
                new Ne(() => {
                  (this.currentObservers = null), Ji(o, e);
                }));
          }
          _checkFinalizedStatuses(e) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? e.error(r) : o && e.complete();
          }
          asObservable() {
            const e = new be();
            return (e.source = this), e;
          }
        }
        return (n.create = (t, e) => new Kf(t, e)), n;
      })();
      class Kf extends ee {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          var e, i;
          null === (i = null === (e = this.destination) || void 0 === e ? void 0 : e.next) ||
            void 0 === i ||
            i.call(e, t);
        }
        error(t) {
          var e, i;
          null === (i = null === (e = this.destination) || void 0 === e ? void 0 : e.error) ||
            void 0 === i ||
            i.call(e, t);
        }
        complete() {
          var t, e;
          null === (e = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) ||
            void 0 === e ||
            e.call(t);
        }
        _subscribe(t) {
          var e, i;
          return null !== (i = null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(t)) && void 0 !== i
            ? i
            : zf;
        }
      }
      function qe(n) {
        return t => {
          if (
            (function ZE(n) {
              return ie(n?.lift);
            })(t)
          )
            return t.lift(function (e) {
              try {
                return n(e, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function Le(n, t, e, i, r) {
        return new QE(n, t, e, i, r);
      }
      class QE extends lc {
        constructor(t, e, i, r, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = e
              ? function (a) {
                  try {
                    e(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: e } = this;
            super.unsubscribe(), !e && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
          }
        }
      }
      function Ze(n, t) {
        return qe((e, i) => {
          let r = 0;
          e.subscribe(
            Le(i, o => {
              i.next(n.call(t, o, r++));
            })
          );
        });
      }
      function Si(n) {
        return this instanceof Si ? ((this.v = n), this) : new Si(n);
      }
      function e0(n, t, e) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var r,
          i = e.apply(n, t || []),
          o = [];
        return (
          (r = {}),
          s('next'),
          s('throw'),
          s('return'),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function s(h) {
          i[h] &&
            (r[h] = function (f) {
              return new Promise(function (p, m) {
                o.push([h, f, p, m]) > 1 || a(h, f);
              });
            });
        }
        function a(h, f) {
          try {
            !(function l(h) {
              h.value instanceof Si ? Promise.resolve(h.value.v).then(c, u) : d(o[0][2], h);
            })(i[h](f));
          } catch (p) {
            d(o[0][3], p);
          }
        }
        function c(h) {
          a('next', h);
        }
        function u(h) {
          a('throw', h);
        }
        function d(h, f) {
          h(f), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function t0(n) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var e,
          t = n[Symbol.asyncIterator];
        return t
          ? t.call(n)
          : ((n = (function Qf(n) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                e = t && n[t],
                i = 0;
              if (e) return e.call(n);
              if (n && 'number' == typeof n.length)
                return {
                  next: function () {
                    return n && i >= n.length && (n = void 0), { value: n && n[i++], done: !n };
                  },
                };
              throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
            })(n)),
            (e = {}),
            i('next'),
            i('throw'),
            i('return'),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function i(o) {
          e[o] =
            n[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = n[o](s)).done, s.value);
              });
            };
        }
      }
      const fc = n => n && 'number' == typeof n.length && 'function' != typeof n;
      function Xf(n) {
        return ie(n?.then);
      }
      function Jf(n) {
        return ie(n[dc]);
      }
      function ep(n) {
        return Symbol.asyncIterator && ie(n?.[Symbol.asyncIterator]);
      }
      function tp(n) {
        return new TypeError(
          `You provided ${
            null !== n && 'object' == typeof n ? 'an invalid object' : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const np = (function r0() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      })();
      function ip(n) {
        return ie(n?.[np]);
      }
      function rp(n) {
        return e0(this, arguments, function* () {
          const e = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Si(e.read());
              if (r) return yield Si(void 0);
              yield yield Si(i);
            }
          } finally {
            e.releaseLock();
          }
        });
      }
      function op(n) {
        return ie(n?.getReader);
      }
      function vt(n) {
        if (n instanceof be) return n;
        if (null != n) {
          if (Jf(n))
            return (function o0(n) {
              return new be(t => {
                const e = n[dc]();
                if (ie(e.subscribe)) return e.subscribe(t);
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
              });
            })(n);
          if (fc(n))
            return (function s0(n) {
              return new be(t => {
                for (let e = 0; e < n.length && !t.closed; e++) t.next(n[e]);
                t.complete();
              });
            })(n);
          if (Xf(n))
            return (function a0(n) {
              return new be(t => {
                n.then(
                  e => {
                    t.closed || (t.next(e), t.complete());
                  },
                  e => t.error(e)
                ).then(null, Gf);
              });
            })(n);
          if (ep(n)) return sp(n);
          if (ip(n))
            return (function l0(n) {
              return new be(t => {
                for (const e of n) if ((t.next(e), t.closed)) return;
                t.complete();
              });
            })(n);
          if (op(n))
            return (function c0(n) {
              return sp(rp(n));
            })(n);
        }
        throw tp(n);
      }
      function sp(n) {
        return new be(t => {
          (function u0(n, t) {
            var e, i, r, o;
            return (function XE(n, t, e, i) {
              return new (e || (e = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function r(o) {
                        return o instanceof e
                          ? o
                          : new e(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (e = t0(n); !(i = yield e.next()).done; ) if ((t.next(i.value), t.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = e.return) && (yield o.call(e));
                } finally {
                  if (r) throw r.error;
                }
              }
              t.complete();
            });
          })(n, t).catch(e => t.error(e));
        });
      }
      function Rn(n, t, e, i = 0, r = !1) {
        const o = t.schedule(function () {
          e(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(o), !r)) return o;
      }
      function co(n, t, e = 1 / 0) {
        return ie(t)
          ? co((i, r) => Ze((o, s) => t(i, o, r, s))(vt(n(i, r))), e)
          : ('number' == typeof t && (e = t),
            qe((i, r) =>
              (function d0(n, t, e, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && t.complete();
                  },
                  f = m => (c < i ? p(m) : l.push(m)),
                  p = m => {
                    o && t.next(m), c++;
                    let _ = !1;
                    vt(e(m, u++)).subscribe(
                      Le(
                        t,
                        y => {
                          r?.(y), o ? f(y) : t.next(y);
                        },
                        () => {
                          _ = !0;
                        },
                        void 0,
                        () => {
                          if (_)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift();
                                s ? Rn(t, s, () => p(y)) : p(y);
                              }
                              h();
                            } catch (y) {
                              t.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    Le(t, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, n, e)
            ));
      }
      function ap(n = 1 / 0) {
        return co(er, n);
      }
      const pc = new be(n => n.complete());
      function lp(n) {
        return n && ie(n.schedule);
      }
      function mc(n) {
        return n[n.length - 1];
      }
      function cp(n) {
        return ie(mc(n)) ? n.pop() : void 0;
      }
      function uo(n) {
        return lp(mc(n)) ? n.pop() : void 0;
      }
      function up(n, t = 0) {
        return qe((e, i) => {
          e.subscribe(
            Le(
              i,
              r => Rn(i, n, () => i.next(r), t),
              () => Rn(i, n, () => i.complete(), t),
              r => Rn(i, n, () => i.error(r), t)
            )
          );
        });
      }
      function dp(n, t = 0) {
        return qe((e, i) => {
          i.add(n.schedule(() => e.subscribe(i), t));
        });
      }
      function hp(n, t) {
        if (!n) throw new Error('Iterable cannot be null');
        return new be(e => {
          Rn(e, t, () => {
            const i = n[Symbol.asyncIterator]();
            Rn(
              e,
              t,
              () => {
                i.next().then(r => {
                  r.done ? e.complete() : e.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function tr(n, t) {
        return t
          ? (function v0(n, t) {
              if (null != n) {
                if (Jf(n))
                  return (function p0(n, t) {
                    return vt(n).pipe(dp(t), up(t));
                  })(n, t);
                if (fc(n))
                  return (function g0(n, t) {
                    return new be(e => {
                      let i = 0;
                      return t.schedule(function () {
                        i === n.length ? e.complete() : (e.next(n[i++]), e.closed || this.schedule());
                      });
                    });
                  })(n, t);
                if (Xf(n))
                  return (function m0(n, t) {
                    return vt(n).pipe(dp(t), up(t));
                  })(n, t);
                if (ep(n)) return hp(n, t);
                if (ip(n))
                  return (function _0(n, t) {
                    return new be(e => {
                      let i;
                      return (
                        Rn(e, t, () => {
                          (i = n[np]()),
                            Rn(
                              e,
                              t,
                              () => {
                                let r, o;
                                try {
                                  ({ value: r, done: o } = i.next());
                                } catch (s) {
                                  return void e.error(s);
                                }
                                o ? e.complete() : e.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ie(i?.return) && i.return()
                      );
                    });
                  })(n, t);
                if (op(n))
                  return (function y0(n, t) {
                    return hp(rp(n), t);
                  })(n, t);
              }
              throw tp(n);
            })(n, t)
          : vt(n);
      }
      function mn(...n) {
        const t = uo(n),
          e = (function f0(n, t) {
            return 'number' == typeof mc(n) ? n.pop() : t;
          })(n, 1 / 0),
          i = n;
        return i.length ? (1 === i.length ? vt(i[0]) : ap(e)(tr(i, t))) : pc;
      }
      function fp(n = {}) {
        const {
          connector: t = () => new ee(),
          resetOnError: e = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = n;
        return o => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const h = () => {
              a?.unsubscribe(), (a = void 0);
            },
            f = () => {
              h(), (s = l = void 0), (u = d = !1);
            },
            p = () => {
              const m = s;
              f(), m?.unsubscribe();
            };
          return qe((m, _) => {
            c++, !d && !u && h();
            const y = (l = l ?? t());
            _.add(() => {
              c--, 0 === c && !d && !u && (a = gc(p, r));
            }),
              y.subscribe(_),
              !s &&
                c > 0 &&
                ((s = new lo({
                  next: D => y.next(D),
                  error: D => {
                    (d = !0), h(), (a = gc(f, e, D)), y.error(D);
                  },
                  complete: () => {
                    (u = !0), h(), (a = gc(f, i)), y.complete();
                  },
                })),
                vt(m).subscribe(s));
          })(o);
        };
      }
      function gc(n, t, ...e) {
        if (!0 === t) return void n();
        if (!1 === t) return;
        const i = new lo({
          next: () => {
            i.unsubscribe(), n();
          },
        });
        return t(...e).subscribe(i);
      }
      function me(n) {
        for (let t in n) if (n[t] === me) return t;
        throw Error('Could not find renamed property on target object.');
      }
      function _c(n, t) {
        for (const e in t) t.hasOwnProperty(e) && !n.hasOwnProperty(e) && (n[e] = t[e]);
      }
      function ge(n) {
        if ('string' == typeof n) return n;
        if (Array.isArray(n)) return '[' + n.map(ge).join(', ') + ']';
        if (null == n) return '' + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const t = n.toString();
        if (null == t) return '' + t;
        const e = t.indexOf('\n');
        return -1 === e ? t : t.substring(0, e);
      }
      function yc(n, t) {
        return null == n || '' === n ? (null === t ? '' : t) : null == t || '' === t ? n : n + ' ' + t;
      }
      const b0 = me({ __forward_ref__: me });
      function we(n) {
        return (
          (n.__forward_ref__ = we),
          (n.toString = function () {
            return ge(this());
          }),
          n
        );
      }
      function V(n) {
        return vc(n) ? n() : n;
      }
      function vc(n) {
        return 'function' == typeof n && n.hasOwnProperty(b0) && n.__forward_ref__ === we;
      }
      class C extends Error {
        constructor(t, e) {
          super(
            (function Ns(n, t) {
              return `NG0${Math.abs(n)}${t ? ': ' + t.trim() : ''}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function z(n) {
        return 'string' == typeof n ? n : null == n ? '' : String(n);
      }
      function Ls(n, t) {
        throw new C(-201, !1);
      }
      function It(n, t) {
        null == n &&
          (function de(n, t, e, i) {
            throw new Error(`ASSERTION ERROR: ${n}` + (null == i ? '' : ` [Expected=> ${e} ${i} ${t} <=Actual]`));
          })(t, n, null, '!=');
      }
      function T(n) {
        return { token: n.token, providedIn: n.providedIn || null, factory: n.factory, value: void 0 };
      }
      function oe(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Vs(n) {
        return pp(n, Bs) || pp(n, gp);
      }
      function pp(n, t) {
        return n.hasOwnProperty(t) ? n[t] : null;
      }
      function mp(n) {
        return n && (n.hasOwnProperty(bc) || n.hasOwnProperty(T0)) ? n[bc] : null;
      }
      const Bs = me({ ɵprov: me }),
        bc = me({ ɵinj: me }),
        gp = me({ ngInjectableDef: me }),
        T0 = me({ ngInjectorDef: me });
      var H = (() => (
        ((H = H || {})[(H.Default = 0)] = 'Default'),
        (H[(H.Host = 1)] = 'Host'),
        (H[(H.Self = 2)] = 'Self'),
        (H[(H.SkipSelf = 4)] = 'SkipSelf'),
        (H[(H.Optional = 8)] = 'Optional'),
        H
      ))();
      let wc;
      function zt(n) {
        const t = wc;
        return (wc = n), t;
      }
      function _p(n, t, e) {
        const i = Vs(n);
        return i && 'root' == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : e & H.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ls(ge(n));
      }
      function ti(n) {
        return { toString: n }.toString();
      }
      var tn = (() => (((tn = tn || {})[(tn.OnPush = 0)] = 'OnPush'), (tn[(tn.Default = 1)] = 'Default'), tn))(),
        nn = (() => {
          return (
            ((n = nn || (nn = {}))[(n.Emulated = 0)] = 'Emulated'),
            (n[(n.None = 2)] = 'None'),
            (n[(n.ShadowDom = 3)] = 'ShadowDom'),
            nn
          );
          var n;
        })();
      const _e = (() =>
          (typeof globalThis < 'u' && globalThis) ||
          (typeof global < 'u' && global) ||
          (typeof window < 'u' && window) ||
          (typeof self < 'u' && typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && self))(),
        nr = {},
        ae = [],
        Hs = me({ ɵcmp: me }),
        Cc = me({ ɵdir: me }),
        Dc = me({ ɵpipe: me }),
        yp = me({ ɵmod: me }),
        Nn = me({ ɵfac: me }),
        ho = me({ __NG_ELEMENT_ID__: me });
      let x0 = 0;
      function Tt(n) {
        return ti(() => {
          const e = !0 === n.standalone,
            i = {},
            r = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === tn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: e,
              dependencies: (e && n.dependencies) || null,
              getStandaloneInjector: null,
              selectors: n.selectors || ae,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || nn.Emulated,
              id: 'c' + x0++,
              styles: n.styles || ae,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            o = n.dependencies,
            s = n.features;
          return (
            (r.inputs = wp(n.inputs, i)),
            (r.outputs = wp(n.outputs)),
            s && s.forEach(a => a(r)),
            (r.directiveDefs = o ? () => ('function' == typeof o ? o() : o).map(vp).filter(bp) : null),
            (r.pipeDefs = o ? () => ('function' == typeof o ? o() : o).map(ut).filter(bp) : null),
            r
          );
        });
      }
      function vp(n) {
        return pe(n) || ct(n);
      }
      function bp(n) {
        return null !== n;
      }
      function le(n) {
        return ti(() => ({
          type: n.type,
          bootstrap: n.bootstrap || ae,
          declarations: n.declarations || ae,
          imports: n.imports || ae,
          exports: n.exports || ae,
          transitiveCompileScopes: null,
          schemas: n.schemas || null,
          id: n.id || null,
        }));
      }
      function wp(n, t) {
        if (null == n) return nr;
        const e = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])), (e[r] = i), t && (t[r] = o);
          }
        return e;
      }
      const x = Tt;
      function bt(n) {
        return {
          type: n.type,
          name: n.name,
          factory: null,
          pure: !1 !== n.pure,
          standalone: !0 === n.standalone,
          onDestroy: n.type.prototype.ngOnDestroy || null,
        };
      }
      function pe(n) {
        return n[Hs] || null;
      }
      function ct(n) {
        return n[Cc] || null;
      }
      function ut(n) {
        return n[Dc] || null;
      }
      const K = 11;
      function wt(n) {
        return Array.isArray(n) && 'object' == typeof n[1];
      }
      function on(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function Mc(n) {
        return 0 != (8 & n.flags);
      }
      function Us(n) {
        return 2 == (2 & n.flags);
      }
      function Gs(n) {
        return 1 == (1 & n.flags);
      }
      function sn(n) {
        return null !== n.template;
      }
      function N0(n) {
        return 0 != (256 & n[2]);
      }
      function xi(n, t) {
        return n.hasOwnProperty(Nn) ? n[Nn] : null;
      }
      class B0 {
        constructor(t, e, i) {
          (this.previousValue = t), (this.currentValue = e), (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ut() {
        return Ep;
      }
      function Ep(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = j0), H0;
      }
      function H0() {
        const n = Mp(this),
          t = n?.current;
        if (t) {
          const e = n.previous;
          if (e === nr) n.previous = t;
          else for (let i in t) e[i] = t[i];
          (n.current = null), this.ngOnChanges(t);
        }
      }
      function j0(n, t, e, i) {
        const r =
            Mp(n) ||
            (function z0(n, t) {
              return (n[Sp] = t);
            })(n, { previous: nr, current: null }),
          o = r.current || (r.current = {}),
          s = r.previous,
          a = this.declaredInputs[e],
          l = s[a];
        (o[a] = new B0(l && l.currentValue, t, s === nr)), (n[i] = t);
      }
      Ut.ngInherit = !0;
      const Sp = '__ngSimpleChanges__';
      function Mp(n) {
        return n[Sp] || null;
      }
      function Ve(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Ws(n, t) {
        return Ve(t[n]);
      }
      function Wt(n, t) {
        return Ve(t[n.index]);
      }
      function Fc(n, t) {
        return n.data[t];
      }
      function sr(n, t) {
        return n[t];
      }
      function Ft(n, t) {
        const e = t[n];
        return wt(e) ? e : e[0];
      }
      function qs(n) {
        return 64 == (64 & n[2]);
      }
      function ni(n, t) {
        return null == t ? null : n[t];
      }
      function Ip(n) {
        n[18] = 0;
      }
      function Oc(n, t) {
        n[5] += t;
        let e = n,
          i = n[3];
        for (; null !== i && ((1 === t && 1 === e[5]) || (-1 === t && 0 === e[5])); ) (i[5] += t), (e = i), (i = i[3]);
      }
      const j = { lFrame: Lp(null), bindingsEnabled: !0 };
      function Ap() {
        return j.bindingsEnabled;
      }
      function w() {
        return j.lFrame.lView;
      }
      function te() {
        return j.lFrame.tView;
      }
      function gn(n) {
        return (j.lFrame.contextLView = n), n[8];
      }
      function _n(n) {
        return (j.lFrame.contextLView = null), n;
      }
      function $e() {
        let n = xp();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function xp() {
        return j.lFrame.currentTNode;
      }
      function yn(n, t) {
        const e = j.lFrame;
        (e.currentTNode = n), (e.isParent = t);
      }
      function kc() {
        return j.lFrame.isParent;
      }
      function Rc() {
        j.lFrame.isParent = !1;
      }
      function dt() {
        const n = j.lFrame;
        let t = n.bindingRootIndex;
        return -1 === t && (t = n.bindingRootIndex = n.tView.bindingStartIndex), t;
      }
      function ar() {
        return j.lFrame.bindingIndex++;
      }
      function Vn(n) {
        const t = j.lFrame,
          e = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + n), e;
      }
      function iS(n, t) {
        const e = j.lFrame;
        (e.bindingIndex = e.bindingRootIndex = n), Pc(t);
      }
      function Pc(n) {
        j.lFrame.currentDirectiveIndex = n;
      }
      function Rp() {
        return j.lFrame.currentQueryIndex;
      }
      function Lc(n) {
        j.lFrame.currentQueryIndex = n;
      }
      function oS(n) {
        const t = n[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? n[6] : null;
      }
      function Pp(n, t, e) {
        if (e & H.SkipSelf) {
          let r = t,
            o = n;
          for (
            ;
            !((r = r.parent), null !== r || e & H.Host || ((r = oS(o)), null === r || ((o = o[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (t = r), (n = o);
        }
        const i = (j.lFrame = Np());
        return (i.currentTNode = t), (i.lView = n), !0;
      }
      function Vc(n) {
        const t = Np(),
          e = n[1];
        (j.lFrame = t),
          (t.currentTNode = e.firstChild),
          (t.lView = n),
          (t.tView = e),
          (t.contextLView = n),
          (t.bindingIndex = e.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Np() {
        const n = j.lFrame,
          t = null === n ? null : n.child;
        return null === t ? Lp(n) : t;
      }
      function Lp(n) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = t), t;
      }
      function Vp() {
        const n = j.lFrame;
        return (j.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n;
      }
      const Bp = Vp;
      function Bc() {
        const n = Vp();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function ht() {
        return j.lFrame.selectedIndex;
      }
      function ii(n) {
        j.lFrame.selectedIndex = n;
      }
      function ke() {
        const n = j.lFrame;
        return Fc(n.tView, n.selectedIndex);
      }
      function lr() {
        j.lFrame.currentNamespace = 'svg';
      }
      function Hc() {
        !(function cS() {
          j.lFrame.currentNamespace = null;
        })();
      }
      function Ks(n, t) {
        for (let e = t.directiveStart, i = t.directiveEnd; e < i; e++) {
          const o = n.data[e].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (n.contentHooks || (n.contentHooks = [])).push(-e, s),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(e, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(e, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-e, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(e, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(e, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(e, u);
        }
      }
      function Ys(n, t, e) {
        Hp(n, t, 3, e);
      }
      function Zs(n, t, e, i) {
        (3 & n[2]) === e && Hp(n, t, e, i);
      }
      function jc(n, t) {
        let e = n[2];
        (3 & e) === t && ((e &= 2047), (e += 1), (n[2] = e));
      }
      function Hp(n, t, e, i) {
        const o = i ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < s; l++)
          if ('number' == typeof t[l + 1]) {
            if (((a = t[l]), null != i && a >= i)) break;
          } else
            t[l] < 0 && (n[18] += 65536),
              (a < o || -1 == o) && (hS(n, e, t, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function hS(n, t, e, i) {
        const r = e[i] < 0,
          o = e[i + 1],
          a = n[r ? -e[i] : e[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === t) {
            n[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class vo {
        constructor(t, e, i) {
          (this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = e), (this.injectImpl = i);
        }
      }
      function Qs(n, t, e) {
        let i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if ('number' == typeof r) {
            if (0 !== r) break;
            i++;
            const o = e[i++],
              s = e[i++],
              a = e[i++];
            n.setAttribute(t, s, a, o);
          } else {
            const o = r,
              s = e[++i];
            zp(o) ? n.setProperty(t, o, s) : n.setAttribute(t, o, s), i++;
          }
        }
        return i;
      }
      function jp(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function zp(n) {
        return 64 === n.charCodeAt(0);
      }
      function Xs(n, t) {
        if (null !== t && 0 !== t.length)
          if (null === n || 0 === n.length) n = t.slice();
          else {
            let e = -1;
            for (let i = 0; i < t.length; i++) {
              const r = t[i];
              'number' == typeof r ? (e = r) : 0 === e || $p(n, e, r, null, -1 === e || 2 === e ? t[++i] : null);
            }
          }
        return n;
      }
      function $p(n, t, e, i, r) {
        let o = 0,
          s = n.length;
        if (-1 === t) s = -1;
        else
          for (; o < n.length; ) {
            const a = n[o++];
            if ('number' == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < n.length; ) {
          const a = n[o];
          if ('number' == typeof a) break;
          if (a === e) {
            if (null === i) return void (null !== r && (n[o + 1] = r));
            if (i === n[o + 1]) return void (n[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (n.splice(s, 0, t), (o = s + 1)),
          n.splice(o++, 0, e),
          null !== i && n.splice(o++, 0, i),
          null !== r && n.splice(o++, 0, r);
      }
      function Up(n) {
        return -1 !== n;
      }
      function cr(n) {
        return 32767 & n;
      }
      function ur(n, t) {
        let e = (function _S(n) {
            return n >> 16;
          })(n),
          i = t;
        for (; e > 0; ) (i = i[15]), e--;
        return i;
      }
      let $c = !0;
      function Js(n) {
        const t = $c;
        return ($c = n), t;
      }
      let yS = 0;
      const vn = {};
      function wo(n, t) {
        const e = Gc(n, t);
        if (-1 !== e) return e;
        const i = t[1];
        i.firstCreatePass && ((n.injectorIndex = t.length), Uc(i.data, n), Uc(t, null), Uc(i.blueprint, null));
        const r = ea(n, t),
          o = n.injectorIndex;
        if (Up(r)) {
          const s = cr(r),
            a = ur(r, t),
            l = a[1].data;
          for (let c = 0; c < 8; c++) t[o + c] = a[s + c] | l[s + c];
        }
        return (t[o + 8] = r), o;
      }
      function Uc(n, t) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Gc(n, t) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === t[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function ea(n, t) {
        if (n.parent && -1 !== n.parent.injectorIndex) return n.parent.injectorIndex;
        let e = 0,
          i = null,
          r = t;
        for (; null !== r; ) {
          if (((i = Jp(r)), null === i)) return -1;
          if ((e++, (r = r[15]), -1 !== i.injectorIndex)) return i.injectorIndex | (e << 16);
        }
        return -1;
      }
      function ta(n, t, e) {
        !(function vS(n, t, e) {
          let i;
          'string' == typeof e ? (i = e.charCodeAt(0) || 0) : e.hasOwnProperty(ho) && (i = e[ho]),
            null == i && (i = e[ho] = yS++);
          const r = 255 & i;
          t.data[n + (r >> 5)] |= 1 << r;
        })(n, t, e);
      }
      function qp(n, t, e) {
        if (e & H.Optional || void 0 !== n) return n;
        Ls();
      }
      function Kp(n, t, e, i) {
        if ((e & H.Optional && void 0 === i && (i = null), 0 == (e & (H.Self | H.Host)))) {
          const r = n[9],
            o = zt(void 0);
          try {
            return r ? r.get(t, i, e & H.Optional) : _p(t, i, e & H.Optional);
          } finally {
            zt(o);
          }
        }
        return qp(i, 0, e);
      }
      function Yp(n, t, e, i = H.Default, r) {
        if (null !== n) {
          if (1024 & t[2]) {
            const s = (function ES(n, t, e, i, r) {
              let o = n,
                s = t;
              for (; null !== o && null !== s && 1024 & s[2] && !(256 & s[2]); ) {
                const a = Zp(o, s, e, i | H.Self, vn);
                if (a !== vn) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[21];
                  if (c) {
                    const u = c.get(e, vn, i);
                    if (u !== vn) return u;
                  }
                  (l = Jp(s)), (s = s[15]);
                }
                o = l;
              }
              return r;
            })(n, t, e, i, vn);
            if (s !== vn) return s;
          }
          const o = Zp(n, t, e, i, vn);
          if (o !== vn) return o;
        }
        return Kp(t, e, i, r);
      }
      function Zp(n, t, e, i, r) {
        const o = (function CS(n) {
          if ('string' == typeof n) return n.charCodeAt(0) || 0;
          const t = n.hasOwnProperty(ho) ? n[ho] : void 0;
          return 'number' == typeof t ? (t >= 0 ? 255 & t : DS) : t;
        })(e);
        if ('function' == typeof o) {
          if (!Pp(t, n, i)) return i & H.Host ? qp(r, 0, i) : Kp(t, e, i, r);
          try {
            const s = o(i);
            if (null != s || i & H.Optional) return s;
            Ls();
          } finally {
            Bp();
          }
        } else if ('number' == typeof o) {
          let s = null,
            a = Gc(n, t),
            l = -1,
            c = i & H.Host ? t[16][6] : null;
          for (
            (-1 === a || i & H.SkipSelf) &&
            ((l = -1 === a ? ea(n, t) : t[a + 8]),
            -1 !== l && Xp(i, !1) ? ((s = t[1]), (a = cr(l)), (t = ur(l, t))) : (a = -1));
            -1 !== a;

          ) {
            const u = t[1];
            if (Qp(o, a, u.data)) {
              const d = wS(a, t, e, s, i, c);
              if (d !== vn) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Xp(i, t[1].data[a + 8] === c) && Qp(o, a, t)
                ? ((s = u), (a = cr(l)), (t = ur(l, t)))
                : (a = -1);
          }
        }
        return r;
      }
      function wS(n, t, e, i, r, o) {
        const s = t[1],
          a = s.data[n + 8],
          u = na(a, s, e, null == i ? Us(a) && $c : i != s && 0 != (3 & a.type), r & H.Host && o === a);
        return null !== u ? Co(t, s, u, a) : vn;
      }
      function na(n, t, e, i, r) {
        const o = n.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          l = n.directiveStart,
          u = o >> 20,
          h = r ? a + u : n.directiveEnd;
        for (let f = i ? a : a + u; f < h; f++) {
          const p = s[f];
          if ((f < l && e === p) || (f >= l && p.type === e)) return f;
        }
        if (r) {
          const f = s[l];
          if (f && sn(f) && f.type === e) return l;
        }
        return null;
      }
      function Co(n, t, e, i) {
        let r = n[e];
        const o = t.data;
        if (
          (function fS(n) {
            return n instanceof vo;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function w0(n, t) {
              const e = t ? `. Dependency path: ${t.join(' > ')} > ${n}` : '';
              throw new C(-200, `Circular dependency in DI detected for ${n}${e}`);
            })(
              (function se(n) {
                return 'function' == typeof n
                  ? n.name || n.toString()
                  : 'object' == typeof n && null != n && 'function' == typeof n.type
                  ? n.type.name || n.type.toString()
                  : z(n);
              })(o[e])
            );
          const a = Js(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? zt(s.injectImpl) : null;
          Pp(n, i, H.Default);
          try {
            (r = n[e] = s.factory(void 0, o, n, i)),
              t.firstCreatePass &&
                e >= i.directiveStart &&
                (function dS(n, t, e) {
                  const { ngOnChanges: i, ngOnInit: r, ngDoCheck: o } = t.type.prototype;
                  if (i) {
                    const s = Ep(t);
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(n, s),
                      (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n, s);
                  }
                  r && (e.preOrderHooks || (e.preOrderHooks = [])).push(0 - n, r),
                    o &&
                      ((e.preOrderHooks || (e.preOrderHooks = [])).push(n, o),
                      (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n, o));
                })(e, o[e], t);
          } finally {
            null !== l && zt(l), Js(a), (s.resolving = !1), Bp();
          }
        }
        return r;
      }
      function Qp(n, t, e) {
        return !!(e[t + (n >> 5)] & (1 << n));
      }
      function Xp(n, t) {
        return !(n & H.Self || (n & H.Host && t));
      }
      class dr {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e, i) {
          return Yp(this._tNode, this._lView, t, i, e);
        }
      }
      function DS() {
        return new dr($e(), w());
      }
      function Wc(n) {
        return vc(n)
          ? () => {
              const t = Wc(V(n));
              return t && t();
            }
          : xi(n);
      }
      function Jp(n) {
        const t = n[1],
          e = t.type;
        return 2 === e ? t.declTNode : 1 === e ? n[6] : null;
      }
      function hr(n) {
        return (function bS(n, t) {
          if ('class' === t) return n.classes;
          if ('style' === t) return n.styles;
          const e = n.attrs;
          if (e) {
            const i = e.length;
            let r = 0;
            for (; r < i; ) {
              const o = e[r];
              if (jp(o)) break;
              if (0 === o) r += 2;
              else if ('number' == typeof o) for (r++; r < i && 'string' == typeof e[r]; ) r++;
              else {
                if (o === t) return e[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })($e(), n);
      }
      const pr = '__parameters__';
      function gr(n, t, e) {
        return ti(() => {
          const i = (function qc(n) {
            return function (...e) {
              if (n) {
                const i = n(...e);
                for (const r in i) this[r] = i[r];
              }
            };
          })(t);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(pr) ? l[pr] : Object.defineProperty(l, pr, { value: [] })[pr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            e && (r.prototype = Object.create(e.prototype)), (r.prototype.ngMetadataName = n), (r.annotationCls = r), r
          );
        });
      }
      class E {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = T({ token: this, providedIn: e.providedIn || 'root', factory: e.factory }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Ot(n, t) {
        void 0 === t && (t = n);
        for (let e = 0; e < n.length; e++) {
          let i = n[e];
          Array.isArray(i) ? (t === n && (t = n.slice(0, e)), Ot(i, t)) : t !== n && t.push(i);
        }
        return t;
      }
      function Bn(n, t) {
        n.forEach(e => (Array.isArray(e) ? Bn(e, t) : t(e)));
      }
      function tm(n, t, e) {
        t >= n.length ? n.push(e) : n.splice(t, 0, e);
      }
      function ia(n, t) {
        return t >= n.length - 1 ? n.pop() : n.splice(t, 1)[0];
      }
      function So(n, t) {
        const e = [];
        for (let i = 0; i < n; i++) e.push(t);
        return e;
      }
      function kt(n, t, e) {
        let i = _r(n, t);
        return (
          i >= 0
            ? (n[1 | i] = e)
            : ((i = ~i),
              (function TS(n, t, e, i) {
                let r = n.length;
                if (r == t) n.push(e, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = e);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > t; ) (n[r] = n[r - 2]), r--;
                  (n[t] = e), (n[t + 1] = i);
                }
              })(n, i, t, e)),
          i
        );
      }
      function Yc(n, t) {
        const e = _r(n, t);
        if (e >= 0) return n[1 | e];
      }
      function _r(n, t) {
        return (function rm(n, t, e) {
          let i = 0,
            r = n.length >> e;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = n[o << e];
            if (t === s) return o << e;
            s > t ? (r = o) : (i = o + 1);
          }
          return ~(r << e);
        })(n, t, 1);
      }
      const Mo = {},
        Qc = '__NG_DI_FLAG__',
        oa = 'ngTempTokenPath',
        NS = /\n/gm,
        om = '__source';
      let Io;
      function yr(n) {
        const t = Io;
        return (Io = n), t;
      }
      function VS(n, t = H.Default) {
        if (void 0 === Io) throw new C(-203, !1);
        return null === Io ? _p(n, void 0, t) : Io.get(n, t & H.Optional ? null : void 0, t);
      }
      function b(n, t = H.Default) {
        return (
          (function A0() {
            return wc;
          })() || VS
        )(V(n), t);
      }
      function oi(n, t = H.Default) {
        return (
          'number' != typeof t && (t = 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4)),
          b(n, t)
        );
      }
      function Xc(n) {
        const t = [];
        for (let e = 0; e < n.length; e++) {
          const i = V(n[e]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new C(900, !1);
            let r,
              o = H.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = BS(a);
              'number' == typeof l ? (-1 === l ? (r = a.token) : (o |= l)) : (r = a);
            }
            t.push(b(r, o));
          } else t.push(b(i));
        }
        return t;
      }
      function To(n, t) {
        return (n[Qc] = t), (n.prototype[Qc] = t), n;
      }
      function BS(n) {
        return n[Qc];
      }
      const si = To(gr('Optional'), 8),
        vr = To(gr('SkipSelf'), 4);
      let eu, la;
      function wr(n) {
        return (
          (function tu() {
            if (void 0 === la && ((la = null), _e.trustedTypes))
              try {
                la = _e.trustedTypes.createPolicy('angular', {
                  createHTML: n => n,
                  createScript: n => n,
                  createScriptURL: n => n,
                });
              } catch {}
            return la;
          })()?.createHTML(n) || n
        );
      }
      class Fi {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class eM extends Fi {
        getTypeName() {
          return 'HTML';
        }
      }
      class tM extends Fi {
        getTypeName() {
          return 'Style';
        }
      }
      class nM extends Fi {
        getTypeName() {
          return 'Script';
        }
      }
      class iM extends Fi {
        getTypeName() {
          return 'URL';
        }
      }
      class rM extends Fi {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function Rt(n) {
        return n instanceof Fi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function bn(n, t) {
        const e = (function oM(n) {
          return (n instanceof Fi && n.getTypeName()) || null;
        })(n);
        if (null != e && e !== t) {
          if ('ResourceURL' === e && 'URL' === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${e} (see https://g.co/ng/security#xss)`);
        }
        return e === t;
      }
      class dM {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const e = new window.DOMParser().parseFromString(wr(t), 'text/html').body;
            return null === e ? this.inertDocumentHelper.getInertBodyElement(t) : (e.removeChild(e.firstChild), e);
          } catch {
            return null;
          }
        }
      }
      class hM {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')),
            null == this.inertDocument.body)
          ) {
            const e = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(e);
            const i = this.inertDocument.createElement('body');
            e.appendChild(i);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement('template');
          if ('content' in e) return (e.innerHTML = wr(t)), e;
          const i = this.inertDocument.createElement('body');
          return (i.innerHTML = wr(t)), this.defaultDoc.documentMode && this.stripCustomNsAttrs(i), i;
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const s = e.item(r).name;
            ('xmlns:ns1' === s || 0 === s.indexOf('ns1:')) && t.removeAttribute(s);
          }
          let i = t.firstChild;
          for (; i; ) i.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(i), (i = i.nextSibling);
        }
      }
      const pM = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function ua(n) {
        return (n = String(n)).match(pM) ? n : 'unsafe:' + n;
      }
      function Hn(n) {
        const t = {};
        for (const e of n.split(',')) t[e] = !0;
        return t;
      }
      function Fo(...n) {
        const t = {};
        for (const e of n) for (const i in e) e.hasOwnProperty(i) && (t[i] = !0);
        return t;
      }
      const vm = Hn('area,br,col,hr,img,wbr'),
        bm = Hn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        wm = Hn('rp,rt'),
        iu = Fo(
          vm,
          Fo(
            bm,
            Hn(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Fo(
            wm,
            Hn(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Fo(wm, bm)
        ),
        ru = Hn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Cm = Fo(
          ru,
          Hn(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          Hn(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        mM = Hn('script,style,template');
      class gM {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            i = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (i = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              i && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let r = this.checkClobberedElement(e, e.nextSibling);
                if (r) {
                  e = r;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!iu.hasOwnProperty(e)) return (this.sanitizedSomething = !0), !mM.hasOwnProperty(e);
          this.buf.push('<'), this.buf.push(e);
          const i = t.attributes;
          for (let r = 0; r < i.length; r++) {
            const o = i.item(r),
              s = o.name,
              a = s.toLowerCase();
            if (!Cm.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = o.value;
            ru[a] && (l = ua(l)), this.buf.push(' ', s, '="', Dm(l), '"');
          }
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          iu.hasOwnProperty(e) && !vm.hasOwnProperty(e) && (this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(Dm(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);
          return e;
        }
      }
      const _M = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        yM = /([^\#-~ |!])/g;
      function Dm(n) {
        return n
          .replace(/&/g, '&amp;')
          .replace(_M, function (t) {
            return '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';';
          })
          .replace(yM, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let da;
      function Em(n, t) {
        let e = null;
        try {
          da =
            da ||
            (function ym(n) {
              const t = new hM(n);
              return (function fM() {
                try {
                  return !!new window.DOMParser().parseFromString(wr(''), 'text/html');
                } catch {
                  return !1;
                }
              })()
                ? new dM(t)
                : t;
            })(n);
          let i = t ? String(t) : '';
          e = da.getInertBodyElement(i);
          let r = 5,
            o = i;
          do {
            if (0 === r) throw new Error('Failed to sanitize html because the input is unstable');
            r--, (i = o), (o = e.innerHTML), (e = da.getInertBodyElement(i));
          } while (i !== o);
          return wr(new gM().sanitizeChildren(ou(e) || e));
        } finally {
          if (e) {
            const i = ou(e) || e;
            for (; i.firstChild; ) i.removeChild(i.firstChild);
          }
        }
      }
      function ou(n) {
        return 'content' in n &&
          (function vM(n) {
            return n.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === n.nodeName;
          })(n)
          ? n.content
          : null;
      }
      var ce = (() => (
        ((ce = ce || {})[(ce.NONE = 0)] = 'NONE'),
        (ce[(ce.HTML = 1)] = 'HTML'),
        (ce[(ce.STYLE = 2)] = 'STYLE'),
        (ce[(ce.SCRIPT = 3)] = 'SCRIPT'),
        (ce[(ce.URL = 4)] = 'URL'),
        (ce[(ce.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        ce
      ))();
      function su(n) {
        const t = (function Oo() {
          const n = w();
          return n && n[12];
        })();
        return t ? t.sanitize(ce.URL, n) || '' : bn(n, 'URL') ? Rt(n) : ua(z(n));
      }
      const Mm = new E('ENVIRONMENT_INITIALIZER'),
        Im = new E('INJECTOR', -1),
        Tm = new E('INJECTOR_DEF_TYPES');
      class Am {
        get(t, e = Mo) {
          if (e === Mo) {
            const i = new Error(`NullInjectorError: No provider for ${ge(t)}!`);
            throw ((i.name = 'NullInjectorError'), i);
          }
          return e;
        }
      }
      function IM(...n) {
        return { ɵproviders: xm(0, n) };
      }
      function xm(n, ...t) {
        const e = [],
          i = new Set();
        let r;
        return (
          Bn(t, o => {
            const s = o;
            au(s, e, [], i) && (r || (r = []), r.push(s));
          }),
          void 0 !== r && Fm(r, e),
          e
        );
      }
      function Fm(n, t) {
        for (let e = 0; e < n.length; e++) {
          const { providers: r } = n[e];
          Bn(r, o => {
            t.push(o);
          });
        }
      }
      function au(n, t, e, i) {
        if (!(n = V(n))) return !1;
        let r = null,
          o = mp(n);
        const s = !o && pe(n);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = n;
        } else {
          const l = n.ngModule;
          if (((o = mp(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l = 'function' == typeof s.dependencies ? s.dependencies() : s.dependencies;
            for (const c of l) au(c, t, e, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                Bn(o.imports, u => {
                  au(u, t, e, i) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && Fm(c, t);
            }
            if (!a) {
              const c = xi(r) || (() => new r());
              t.push(
                { provide: r, useFactory: c, deps: ae },
                { provide: Tm, useValue: r, multi: !0 },
                { provide: Mm, useValue: () => b(r), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              Bn(l, u => {
                t.push(u);
              });
          }
        }
        return r !== n && void 0 !== n.providers;
      }
      const TM = me({ provide: String, useValue: me });
      function lu(n) {
        return null !== n && 'object' == typeof n && TM in n;
      }
      function Oi(n) {
        return 'function' == typeof n;
      }
      const cu = new E('Set Injector scope.'),
        ha = {},
        xM = {};
      let uu;
      function fa() {
        return void 0 === uu && (uu = new Am()), uu;
      }
      class Cr {}
      class Rm extends Cr {
        constructor(t, e, i, r) {
          super(),
            (this.parent = e),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            hu(t, s => this.processProvider(s)),
            this.records.set(Im, Dr(void 0, this)),
            r.has('environment') && this.records.set(Cr, Dr(void 0, this));
          const o = this.records.get(cu);
          null != o && 'string' == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(Tm.multi, ae, H.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const e = yr(this),
            i = zt(void 0);
          try {
            return t();
          } finally {
            yr(e), zt(i);
          }
        }
        get(t, e = Mo, i = H.Default) {
          this.assertNotDestroyed();
          const r = yr(this),
            o = zt(void 0);
          try {
            if (!(i & H.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function PM(n) {
                    return 'function' == typeof n || ('object' == typeof n && n instanceof E);
                  })(t) && Vs(t);
                (a = l && this.injectableDefInScope(l) ? Dr(du(t), ha) : null), this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (i & H.Self ? fa() : this.parent).get(t, (e = i & H.Optional && e === Mo ? null : e));
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[oa] = s[oa] || []).unshift(ge(t)), r)) throw s;
              return (function HS(n, t, e, i) {
                const r = n[oa];
                throw (
                  (t[om] && r.unshift(t[om]),
                  (n.message = (function jS(n, t, e, i = null) {
                    n = n && '\n' === n.charAt(0) && '\u0275' == n.charAt(1) ? n.slice(2) : n;
                    let r = ge(t);
                    if (Array.isArray(t)) r = t.map(ge).join(' -> ');
                    else if ('object' == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(s + ':' + ('string' == typeof a ? JSON.stringify(a) : ge(a)));
                        }
                      r = `{${o.join(', ')}}`;
                    }
                    return `${e}${i ? '(' + i + ')' : ''}[${r}]: ${n.replace(NS, '\n  ')}`;
                  })('\n' + n.message, r, e, i)),
                  (n.ngTokenPath = r),
                  (n[oa] = null),
                  n)
                );
              })(s, t, 'R3InjectorError', this.source);
            }
            throw s;
          } finally {
            zt(o), yr(r);
          }
        }
        resolveInjectorInitializers() {
          const t = yr(this),
            e = zt(void 0);
          try {
            const i = this.get(Mm.multi, ae, H.Self);
            for (const r of i) r();
          } finally {
            yr(t), zt(e);
          }
        }
        toString() {
          const t = [],
            e = this.records;
          for (const i of e.keys()) t.push(ge(i));
          return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let e = Oi((t = V(t))) ? t : V(t && t.provide);
          const i = (function OM(n) {
            return lu(n) ? Dr(void 0, n.useValue) : Dr(Pm(n), ha);
          })(t);
          if (Oi(t) || !0 !== t.multi) this.records.get(e);
          else {
            let r = this.records.get(e);
            r || ((r = Dr(void 0, ha, !0)), (r.factory = () => Xc(r.multi)), this.records.set(e, r)),
              (e = t),
              r.multi.push(t);
          }
          this.records.set(e, i);
        }
        hydrate(t, e) {
          return (
            e.value === ha && ((e.value = xM), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              (function RM(n) {
                return null !== n && 'object' == typeof n && 'function' == typeof n.ngOnDestroy;
              })(e.value) &&
              this._ngOnDestroyHooks.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = V(t.providedIn);
          return 'string' == typeof e ? 'any' === e || this.scopes.has(e) : this.injectorDefTypes.has(e);
        }
      }
      function du(n) {
        const t = Vs(n),
          e = null !== t ? t.factory : xi(n);
        if (null !== e) return e;
        if (n instanceof E) throw new C(204, !1);
        if (n instanceof Function)
          return (function FM(n) {
            const t = n.length;
            if (t > 0) throw (So(t, '?'), new C(204, !1));
            const e = (function M0(n) {
              const t = n && (n[Bs] || n[gp]);
              if (t) {
                const e = (function I0(n) {
                  if (n.hasOwnProperty('name')) return n.name;
                  const t = ('' + n).match(/^function\s*([^\s(]+)/);
                  return null === t ? '' : t[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${e}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${e}" class.`
                  ),
                  t
                );
              }
              return null;
            })(n);
            return null !== e ? () => e.factory(n) : () => new n();
          })(n);
        throw new C(204, !1);
      }
      function Pm(n, t, e) {
        let i;
        if (Oi(n)) {
          const r = V(n);
          return xi(r) || du(r);
        }
        if (lu(n)) i = () => V(n.useValue);
        else if (
          (function km(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...Xc(n.deps || []));
        else if (
          (function Om(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => b(V(n.useExisting));
        else {
          const r = V(n && (n.useClass || n.provide));
          if (
            !(function kM(n) {
              return !!n.deps;
            })(n)
          )
            return xi(r) || du(r);
          i = () => new r(...Xc(n.deps));
        }
        return i;
      }
      function Dr(n, t, e = !1) {
        return { factory: n, value: t, multi: e ? [] : void 0 };
      }
      function NM(n) {
        return !!n.ɵproviders;
      }
      function hu(n, t) {
        for (const e of n) Array.isArray(e) ? hu(e, t) : NM(e) ? hu(e.ɵproviders, t) : t(e);
      }
      class Nm {}
      class BM {
        resolveComponentFactory(t) {
          throw (function VM(n) {
            const t = Error(`No component factory found for ${ge(n)}. Did you add it to @NgModule.entryComponents?`);
            return (t.ngComponent = n), t;
          })(t);
        }
      }
      let ko = (() => {
        class n {}
        return (n.NULL = new BM()), n;
      })();
      function HM() {
        return Er($e(), w());
      }
      function Er(n, t) {
        return new ye(Wt(n, t));
      }
      let ye = (() => {
        class n {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (n.__NG_ELEMENT_ID__ = HM), n;
      })();
      function jM(n) {
        return n instanceof ye ? n.nativeElement : n;
      }
      class Ro {}
      let ki = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function zM() {
                const n = w(),
                  e = Ft($e().index, n);
                return (wt(e) ? e : n)[K];
              })()),
            n
          );
        })(),
        $M = (() => {
          class n {}
          return (n.ɵprov = T({ token: n, providedIn: 'root', factory: () => null })), n;
        })();
      class Sr {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const UM = new Sr('14.2.3'),
        fu = {};
      function yu(n) {
        return n.ngOriginalError;
      }
      class jn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t);
          this._console.error('ERROR', t), e && this._console.error('ORIGINAL ERROR', e);
        }
        _findOriginalError(t) {
          let e = t && yu(t);
          for (; e && yu(e); ) e = yu(e);
          return e || null;
        }
      }
      const vu = new Map();
      let nI = 0;
      const wu = '__ngContext__';
      function rt(n, t) {
        wt(t)
          ? ((n[wu] = t[20]),
            (function rI(n) {
              vu.set(n[20], n);
            })(t))
          : (n[wu] = t);
      }
      var Ct = (() => (
        ((Ct = Ct || {})[(Ct.Important = 1)] = 'Important'), (Ct[(Ct.DashCase = 2)] = 'DashCase'), Ct
      ))();
      function Du(n, t) {
        return undefined(n, t);
      }
      function No(n) {
        const t = n[3];
        return on(t) ? t[3] : t;
      }
      function Eu(n) {
        return Qm(n[13]);
      }
      function Su(n) {
        return Qm(n[4]);
      }
      function Qm(n) {
        for (; null !== n && !on(n); ) n = n[4];
        return n;
      }
      function Ir(n, t, e, i, r) {
        if (null != i) {
          let o,
            s = !1;
          on(i) ? (o = i) : wt(i) && ((s = !0), (i = i[0]));
          const a = Ve(i);
          0 === n && null !== e
            ? null == r
              ? ig(t, e, a)
              : Ri(t, e, a, r || null, !0)
            : 1 === n && null !== e
            ? Ri(t, e, a, r || null, !0)
            : 2 === n
            ? (function ug(n, t, e) {
                const i = pa(n, t);
                i &&
                  (function FI(n, t, e, i) {
                    n.removeChild(t, e, i);
                  })(n, i, t, e);
              })(t, a, s)
            : 3 === n && t.destroyNode(a),
            null != o &&
              (function RI(n, t, e, i, r) {
                const o = e[7];
                o !== Ve(e) && Ir(t, n, i, o, r);
                for (let a = 10; a < e.length; a++) {
                  const l = e[a];
                  Lo(l[1], l, n, t, i, o);
                }
              })(t, n, o, e, r);
        }
      }
      function Iu(n, t, e) {
        return n.createElement(t, e);
      }
      function Jm(n, t) {
        const e = n[9],
          i = e.indexOf(t),
          r = t[3];
        512 & t[2] && ((t[2] &= -513), Oc(r, -1)), e.splice(i, 1);
      }
      function Tu(n, t) {
        if (n.length <= 10) return;
        const e = 10 + t,
          i = n[e];
        if (i) {
          const r = i[17];
          null !== r && r !== n && Jm(r, i), t > 0 && (n[e - 1][4] = i[4]);
          const o = ia(n, 10 + t);
          !(function DI(n, t) {
            Lo(n, t, t[K], 2, null, null), (t[0] = null), (t[6] = null);
          })(i[1], i);
          const s = o[19];
          null !== s && s.detachView(o[1]), (i[3] = null), (i[4] = null), (i[2] &= -65);
        }
        return i;
      }
      function eg(n, t) {
        if (!(128 & t[2])) {
          const e = t[K];
          e.destroyNode && Lo(n, t, e, 3, null, null),
            (function MI(n) {
              let t = n[13];
              if (!t) return Au(n[1], n);
              for (; t; ) {
                let e = null;
                if (wt(t)) e = t[13];
                else {
                  const i = t[10];
                  i && (e = i);
                }
                if (!e) {
                  for (; t && !t[4] && t !== n; ) wt(t) && Au(t[1], t), (t = t[3]);
                  null === t && (t = n), wt(t) && Au(t[1], t), (e = t && t[4]);
                }
                t = e;
              }
            })(t);
        }
      }
      function Au(n, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function xI(n, t) {
              let e;
              if (null != n && null != (e = n.destroyHooks))
                for (let i = 0; i < e.length; i += 2) {
                  const r = t[e[i]];
                  if (!(r instanceof vo)) {
                    const o = e[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(r);
                      } finally {
                      }
                  }
                }
            })(n, t),
            (function AI(n, t) {
              const e = n.cleanup,
                i = t[7];
              let r = -1;
              if (null !== e)
                for (let o = 0; o < e.length - 1; o += 2)
                  if ('string' == typeof e[o]) {
                    const s = e[o + 1],
                      a = 'function' == typeof s ? s(t) : Ve(t[s]),
                      l = i[(r = e[o + 2])],
                      c = e[o + 3];
                    'boolean' == typeof c
                      ? a.removeEventListener(e[o], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = i[(r = e[o + 1])];
                    e[o].call(s);
                  }
              if (null !== i) {
                for (let o = r + 1; o < i.length; o++) (0, i[o])();
                t[7] = null;
              }
            })(n, t),
            1 === t[1].type && t[K].destroy();
          const e = t[17];
          if (null !== e && on(t[3])) {
            e !== t[3] && Jm(e, t);
            const i = t[19];
            null !== i && i.detachView(n);
          }
          !(function oI(n) {
            vu.delete(n[20]);
          })(t);
        }
      }
      function tg(n, t, e) {
        return (function ng(n, t, e) {
          let i = t;
          for (; null !== i && 40 & i.type; ) i = (t = i).parent;
          if (null === i) return e[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === nn.None || r === nn.Emulated) return null;
          }
          return Wt(i, e);
        })(n, t.parent, e);
      }
      function Ri(n, t, e, i, r) {
        n.insertBefore(t, e, i, r);
      }
      function ig(n, t, e) {
        n.appendChild(t, e);
      }
      function rg(n, t, e, i, r) {
        null !== i ? Ri(n, t, e, i, r) : ig(n, t, e);
      }
      function pa(n, t) {
        return n.parentNode(t);
      }
      function og(n, t, e) {
        return ag(n, t, e);
      }
      let ag = function sg(n, t, e) {
        return 40 & n.type ? Wt(n, e) : null;
      };
      function ma(n, t, e, i) {
        const r = tg(n, i, t),
          o = t[K],
          a = og(i.parent || t[6], i, t);
        if (null != r)
          if (Array.isArray(e)) for (let l = 0; l < e.length; l++) rg(o, r, e[l], a, !1);
          else rg(o, r, e, a, !1);
      }
      function ga(n, t) {
        if (null !== t) {
          const e = t.type;
          if (3 & e) return Wt(t, n);
          if (4 & e) return Fu(-1, n[t.index]);
          if (8 & e) {
            const i = t.child;
            if (null !== i) return ga(n, i);
            {
              const r = n[t.index];
              return on(r) ? Fu(-1, r) : Ve(r);
            }
          }
          if (32 & e) return Du(t, n)() || Ve(n[t.index]);
          {
            const i = cg(n, t);
            return null !== i ? (Array.isArray(i) ? i[0] : ga(No(n[16]), i)) : ga(n, t.next);
          }
        }
        return null;
      }
      function cg(n, t) {
        return null !== t ? n[16][6].projection[t.projection] : null;
      }
      function Fu(n, t) {
        const e = 10 + n + 1;
        if (e < t.length) {
          const i = t[e],
            r = i[1].firstChild;
          if (null !== r) return ga(i, r);
        }
        return t[7];
      }
      function Ou(n, t, e, i, r, o, s) {
        for (; null != e; ) {
          const a = i[e.index],
            l = e.type;
          if ((s && 0 === t && (a && rt(Ve(a), i), (e.flags |= 4)), 64 != (64 & e.flags)))
            if (8 & l) Ou(n, t, e.child, i, r, o, !1), Ir(t, n, r, a, o);
            else if (32 & l) {
              const c = Du(e, i);
              let u;
              for (; (u = c()); ) Ir(t, n, r, u, o);
              Ir(t, n, r, a, o);
            } else 16 & l ? dg(n, t, i, e, r, o) : Ir(t, n, r, a, o);
          e = s ? e.projectionNext : e.next;
        }
      }
      function Lo(n, t, e, i, r, o) {
        Ou(e, i, n.firstChild, t, r, o, !1);
      }
      function dg(n, t, e, i, r, o) {
        const s = e[16],
          l = s[6].projection[i.projection];
        if (Array.isArray(l)) for (let c = 0; c < l.length; c++) Ir(t, n, r, l[c], o);
        else Ou(n, t, l, s[3], r, o, !0);
      }
      function hg(n, t, e) {
        n.setAttribute(t, 'style', e);
      }
      function ku(n, t, e) {
        '' === e ? n.removeAttribute(t, 'class') : n.setAttribute(t, 'class', e);
      }
      function fg(n, t, e) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(t, e);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const o = t.length;
            if (r + o === i || n.charCodeAt(r + o) <= 32) return r;
          }
          e = r + 1;
        }
      }
      const pg = 'ng-template';
      function NI(n, t, e) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (e && 'class' === r) {
            if (((r = n[i]), -1 !== fg(r.toLowerCase(), t, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && 'string' == typeof (r = n[i++]); ) if (r.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function mg(n) {
        return 4 === n.type && n.value !== pg;
      }
      function LI(n, t, e) {
        return t === (4 !== n.type || e ? n.value : pg);
      }
      function VI(n, t, e) {
        let i = 4;
        const r = n.attrs || [],
          o = (function jI(n) {
            for (let t = 0; t < n.length; t++) if (jp(n[t])) return t;
            return n.length;
          })(r);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ('number' != typeof l) {
            if (!s)
              if (4 & i) {
                if (((i = 2 | (1 & i)), ('' !== l && !LI(n, l, e)) || ('' === l && 1 === t.length))) {
                  if (an(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : t[++a];
                if (8 & i && null !== n.attrs) {
                  if (!NI(n.attrs, c, e)) {
                    if (an(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = BI(8 & i ? 'class' : l, r, mg(n), e);
                if (-1 === d) {
                  if (an(i)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== c) {
                  let h;
                  h = d > o ? '' : r[d + 1].toLowerCase();
                  const f = 8 & i ? h : null;
                  if ((f && -1 !== fg(f, c, 0)) || (2 & i && c !== h)) {
                    if (an(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !an(i) && !an(l)) return !1;
            if (s && an(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return an(i) || s;
      }
      function an(n) {
        return 0 == (1 & n);
      }
      function BI(n, t, e, i) {
        if (null === t) return -1;
        let r = 0;
        if (i || !e) {
          let o = !1;
          for (; r < t.length; ) {
            const s = t[r];
            if (s === n) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++r];
                for (; 'string' == typeof a; ) a = t[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function zI(n, t) {
          let e = n.indexOf(4);
          if (e > -1)
            for (e++; e < n.length; ) {
              const i = n[e];
              if ('number' == typeof i) return -1;
              if (i === t) return e;
              e++;
            }
          return -1;
        })(t, n);
      }
      function gg(n, t, e = !1) {
        for (let i = 0; i < t.length; i++) if (VI(n, t[i], e)) return !0;
        return !1;
      }
      function $I(n, t) {
        e: for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function _g(n, t) {
        return n ? ':not(' + t.trim() + ')' : t;
      }
      function UI(n) {
        let t = n[0],
          e = 1,
          i = 2,
          r = '',
          o = !1;
        for (; e < n.length; ) {
          let s = n[e];
          if ('string' == typeof s)
            if (2 & i) {
              const a = n[++e];
              r += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else 8 & i ? (r += '.' + s) : 4 & i && (r += ' ' + s);
          else '' !== r && !an(s) && ((t += _g(o, r)), (r = '')), (i = s), (o = o || !an(i));
          e++;
        }
        return '' !== r && (t += _g(o, r)), t;
      }
      const $ = {};
      function R(n) {
        yg(te(), w(), ht() + n, !1);
      }
      function yg(n, t, e, i) {
        if (!i)
          if (3 == (3 & t[2])) {
            const o = n.preOrderCheckHooks;
            null !== o && Ys(t, o, e);
          } else {
            const o = n.preOrderHooks;
            null !== o && Zs(t, o, 0, e);
          }
        ii(e);
      }
      function Cg(n, t = null, e = null, i) {
        const r = Dg(n, t, e, i);
        return r.resolveInjectorInitializers(), r;
      }
      function Dg(n, t = null, e = null, i, r = new Set()) {
        const o = [e || ae, IM(n)];
        return (i = i || ('object' == typeof n ? void 0 : ge(n))), new Rm(o, t || fa(), i || null, r);
      }
      let qt = (() => {
        class n {
          static create(e, i) {
            if (Array.isArray(e)) return Cg({ name: '' }, i, e, '');
            {
              const r = e.name ?? '';
              return Cg({ name: r }, e.parent, e.providers, r);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = Mo),
          (n.NULL = new Am()),
          (n.ɵprov = T({ token: n, providedIn: 'any', factory: () => b(Im) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function g(n, t = H.Default) {
        const e = w();
        return null === e ? b(n, t) : Yp($e(), e, V(n), t);
      }
      function ya() {
        throw new Error('invalid');
      }
      function va(n, t) {
        return (n << 17) | (t << 2);
      }
      function ln(n) {
        return (n >> 17) & 32767;
      }
      function Vu(n) {
        return 2 | n;
      }
      function $n(n) {
        return (131068 & n) >> 2;
      }
      function Bu(n, t) {
        return (-131069 & n) | (t << 2);
      }
      function Hu(n) {
        return 1 | n;
      }
      function Hg(n, t) {
        const e = n.contentQueries;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) {
            const r = e[i],
              o = e[i + 1];
            if (-1 !== o) {
              const s = n.data[o];
              Lc(r), s.contentQueries(2, t[o], o);
            }
          }
      }
      function Ca(n, t, e, i, r, o, s, a, l, c, u) {
        const d = t.blueprint.slice();
        return (
          (d[0] = r),
          (d[2] = 76 | i),
          (null !== u || (n && 1024 & n[2])) && (d[2] |= 1024),
          Ip(d),
          (d[3] = d[15] = n),
          (d[8] = e),
          (d[10] = s || (n && n[10])),
          (d[K] = a || (n && n[K])),
          (d[12] = l || (n && n[12]) || null),
          (d[9] = c || (n && n[9]) || null),
          (d[6] = o),
          (d[20] = (function iI() {
            return nI++;
          })()),
          (d[21] = u),
          (d[16] = 2 == t.type ? n[16] : d),
          d
        );
      }
      function Ar(n, t, e, i, r) {
        let o = n.data[t];
        if (null === o)
          (o = (function Ku(n, t, e, i, r) {
            const o = xp(),
              s = kc(),
              l = (n.data[t] = (function MT(n, t, e, i, r, o) {
                return {
                  type: e,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, e, t, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== o &&
                (s ? null == o.child && null !== l.parent && (o.child = l) : null === o.next && (o.next = l)),
              l
            );
          })(n, t, e, i, r)),
            (function nS() {
              return j.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = e), (o.value = i), (o.attrs = r);
          const s = (function yo() {
            const n = j.lFrame,
              t = n.currentTNode;
            return n.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return yn(o, !0), o;
      }
      function xr(n, t, e, i) {
        if (0 === e) return -1;
        const r = t.length;
        for (let o = 0; o < e; o++) t.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function Yu(n, t, e) {
        Vc(t);
        try {
          const i = n.viewQuery;
          null !== i && id(1, i, e);
          const r = n.template;
          null !== r && jg(n, t, r, 1, e),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && Hg(n, t),
            n.staticViewQueries && id(2, n.viewQuery, e);
          const o = n.components;
          null !== o &&
            (function DT(n, t) {
              for (let e = 0; e < t.length; e++) zT(n, t[e]);
            })(t, o);
        } catch (i) {
          throw (n.firstCreatePass && ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)), i);
        } finally {
          (t[2] &= -5), Bc();
        }
      }
      function Da(n, t, e, i) {
        const r = t[2];
        if (128 != (128 & r)) {
          Vc(t);
          try {
            Ip(t),
              (function Op(n) {
                return (j.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== e && jg(n, t, e, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = n.preOrderCheckHooks;
              null !== c && Ys(t, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && Zs(t, c, 0, null), jc(t, 0);
            }
            if (
              ((function HT(n) {
                for (let t = Eu(n); null !== t; t = Su(t)) {
                  if (!t[2]) continue;
                  const e = t[9];
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i],
                      o = r[3];
                    0 == (512 & r[2]) && Oc(o, 1), (r[2] |= 512);
                  }
                }
              })(t),
              (function BT(n) {
                for (let t = Eu(n); null !== t; t = Su(t))
                  for (let e = 10; e < t.length; e++) {
                    const i = t[e],
                      r = i[1];
                    qs(i) && Da(r, i, r.template, i[8]);
                  }
              })(t),
              null !== n.contentQueries && Hg(n, t),
              s)
            ) {
              const c = n.contentCheckHooks;
              null !== c && Ys(t, c);
            } else {
              const c = n.contentHooks;
              null !== c && Zs(t, c, 1), jc(t, 1);
            }
            !(function wT(n, t) {
              const e = n.hostBindingOpCodes;
              if (null !== e)
                try {
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i];
                    if (r < 0) ii(~r);
                    else {
                      const o = r,
                        s = e[++i],
                        a = e[++i];
                      iS(s, o), a(2, t[o]);
                    }
                  }
                } finally {
                  ii(-1);
                }
            })(n, t);
            const a = n.components;
            null !== a &&
              (function CT(n, t) {
                for (let e = 0; e < t.length; e++) jT(n, t[e]);
              })(t, a);
            const l = n.viewQuery;
            if ((null !== l && id(2, l, i), s)) {
              const c = n.viewCheckHooks;
              null !== c && Ys(t, c);
            } else {
              const c = n.viewHooks;
              null !== c && Zs(t, c, 2), jc(t, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Oc(t[3], -1));
          } finally {
            Bc();
          }
        }
      }
      function jg(n, t, e, i, r) {
        const o = ht(),
          s = 2 & i;
        try {
          ii(-1), s && t.length > 22 && yg(n, t, 22, !1), e(i, r);
        } finally {
          ii(o);
        }
      }
      function zg(n, t, e) {
        if (Mc(t)) {
          const r = t.directiveEnd;
          for (let o = t.directiveStart; o < r; o++) {
            const s = n.data[o];
            s.contentQueries && s.contentQueries(1, e[o], o);
          }
        }
      }
      function Zu(n, t, e) {
        !Ap() ||
          ((function FT(n, t, e, i) {
            const r = e.directiveStart,
              o = e.directiveEnd;
            n.firstCreatePass || wo(e, t), rt(i, t);
            const s = e.initialInputs;
            for (let a = r; a < o; a++) {
              const l = n.data[a],
                c = sn(l);
              c && NT(t, e, l);
              const u = Co(t, n, a, e);
              rt(u, t), null !== s && LT(0, a - r, u, l, 0, s), c && (Ft(e.index, t)[8] = u);
            }
          })(n, t, e, Wt(e, t)),
          128 == (128 & e.flags) &&
            (function OT(n, t, e) {
              const i = e.directiveStart,
                r = e.directiveEnd,
                o = e.index,
                s = (function rS() {
                  return j.lFrame.currentDirectiveIndex;
                })();
              try {
                ii(o);
                for (let a = i; a < r; a++) {
                  const l = n.data[a],
                    c = t[a];
                  Pc(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && Yg(l, c);
                }
              } finally {
                ii(-1), Pc(s);
              }
            })(n, t, e));
      }
      function Qu(n, t, e = Wt) {
        const i = t.localNames;
        if (null !== i) {
          let r = t.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? e(t, n) : n[s];
            n[r++] = a;
          }
        }
      }
      function $g(n) {
        const t = n.tView;
        return null === t || t.incompleteFirstPass
          ? (n.tView = Xu(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : t;
      }
      function Xu(n, t, e, i, r, o, s, a, l, c) {
        const u = 22 + i,
          d = u + r,
          h = (function ET(n, t) {
            const e = [];
            for (let i = 0; i < t; i++) e.push(i < n ? null : $);
            return e;
          })(u, d),
          f = 'function' == typeof c ? c() : c;
        return (h[1] = {
          type: n,
          blueprint: h,
          template: e,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function Ug(n, t, e, i) {
        const r = e_(t);
        null === e ? r.push(i) : (r.push(e), n.firstCreatePass && t_(n).push(i, r.length - 1));
      }
      function Gg(n, t, e) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (e = null === e ? {} : e).hasOwnProperty(i) ? e[i].push(t, r) : (e[i] = [t, r]);
          }
        return e;
      }
      function Wg(n, t) {
        const i = t.directiveEnd,
          r = n.data,
          o = t.attrs,
          s = [];
        let a = null,
          l = null;
        for (let c = t.directiveStart; c < i; c++) {
          const u = r[c],
            d = u.inputs,
            h = null === o || mg(t) ? null : VT(d, o);
          s.push(h), (a = Gg(d, c, a)), (l = Gg(u.outputs, c, l));
        }
        null !== a && (a.hasOwnProperty('class') && (t.flags |= 16), a.hasOwnProperty('style') && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = l);
      }
      function Pt(n, t, e, i, r, o, s, a) {
        const l = Wt(t, e);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[i])
          ? (rd(n, e, u, i, r), Us(t) && qg(e, t.index))
          : 3 & t.type &&
            ((i = (function IT(n) {
              return 'class' === n
                ? 'className'
                : 'for' === n
                ? 'htmlFor'
                : 'formaction' === n
                ? 'formAction'
                : 'innerHtml' === n
                ? 'innerHTML'
                : 'readonly' === n
                ? 'readOnly'
                : 'tabindex' === n
                ? 'tabIndex'
                : n;
            })(i)),
            (r = null != s ? s(r, t.value || '', i) : r),
            o.setProperty(l, i, r));
      }
      function qg(n, t) {
        const e = Ft(t, n);
        16 & e[2] || (e[2] |= 32);
      }
      function Ju(n, t, e, i) {
        let r = !1;
        if (Ap()) {
          const o = (function kT(n, t, e) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const s = i[o];
                  gg(e, s.selectors, !1) &&
                    (r || (r = []), ta(wo(e, t), n, s.type), sn(s) ? (Zg(n, e), r.unshift(s)) : r.push(s));
                }
              return r;
            })(n, t, e),
            s = null === i ? null : { '': -1 };
          if (null !== o) {
            (r = !0), Qg(e, n.data.length, o.length);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = xr(n, t, o.length, null);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              (e.mergedAttrs = Xs(e.mergedAttrs, d.hostAttrs)),
                Xg(n, e, t, c, d),
                PT(c, d, s),
                null !== d.contentQueries && (e.flags |= 8),
                (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (e.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(e.index), (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e.index), (l = !0)),
                c++;
            }
            Wg(n, e);
          }
          s &&
            (function RT(n, t, e) {
              if (t) {
                const i = (n.localNames = []);
                for (let r = 0; r < t.length; r += 2) {
                  const o = e[t[r + 1]];
                  if (null == o) throw new C(-301, !1);
                  i.push(t[r], o);
                }
              }
            })(e, i, s);
        }
        return (e.mergedAttrs = Xs(e.mergedAttrs, e.attrs)), r;
      }
      function Kg(n, t, e, i, r, o) {
        const s = o.hostBindings;
        if (s) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~t.index;
          (function xT(n) {
            let t = n.length;
            for (; t > 0; ) {
              const e = n[--t];
              if ('number' == typeof e && e < 0) return e;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, s);
        }
      }
      function Yg(n, t) {
        null !== n.hostBindings && n.hostBindings(1, t);
      }
      function Zg(n, t) {
        (t.flags |= 2), (n.components || (n.components = [])).push(t.index);
      }
      function PT(n, t, e) {
        if (e) {
          if (t.exportAs) for (let i = 0; i < t.exportAs.length; i++) e[t.exportAs[i]] = n;
          sn(t) && (e[''] = n);
        }
      }
      function Qg(n, t, e) {
        (n.flags |= 1), (n.directiveStart = t), (n.directiveEnd = t + e), (n.providerIndexes = t);
      }
      function Xg(n, t, e, i, r) {
        n.data[i] = r;
        const o = r.factory || (r.factory = xi(r.type)),
          s = new vo(o, sn(r), g);
        (n.blueprint[i] = s), (e[i] = s), Kg(n, t, 0, i, xr(n, e, r.hostVars, $), r);
      }
      function NT(n, t, e) {
        const i = Wt(t, n),
          r = $g(e),
          o = n[10],
          s = Ea(n, Ca(n, r, null, e.onPush ? 32 : 16, i, t, o, o.createRenderer(i, e), null, null, null));
        n[t.index] = s;
      }
      function wn(n, t, e, i, r, o) {
        const s = Wt(n, t);
        !(function ed(n, t, e, i, r, o, s) {
          if (null == o) n.removeAttribute(t, r, e);
          else {
            const a = null == s ? z(o) : s(o, i || '', r);
            n.setAttribute(t, r, a, e);
          }
        })(t[K], s, o, n.value, e, i, r);
      }
      function LT(n, t, e, i, r, o) {
        const s = o[t];
        if (null !== s) {
          const a = i.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? i.setInput(e, d, c, u) : (e[u] = d);
          }
        }
      }
      function VT(n, t) {
        let e = null,
          i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if (0 !== r)
            if (5 !== r) {
              if ('number' == typeof r) break;
              n.hasOwnProperty(r) && (null === e && (e = []), e.push(r, n[r], t[i + 1])), (i += 2);
            } else i += 2;
          else i += 4;
        }
        return e;
      }
      function Jg(n, t, e, i) {
        return new Array(n, !0, !1, t, null, 0, i, e, null, null);
      }
      function jT(n, t) {
        const e = Ft(t, n);
        if (qs(e)) {
          const i = e[1];
          48 & e[2] ? Da(i, e, i.template, e[8]) : e[5] > 0 && td(e);
        }
      }
      function td(n) {
        for (let i = Eu(n); null !== i; i = Su(i))
          for (let r = 10; r < i.length; r++) {
            const o = i[r];
            if (qs(o))
              if (512 & o[2]) {
                const s = o[1];
                Da(s, o, s.template, o[8]);
              } else o[5] > 0 && td(o);
          }
        const e = n[1].components;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const r = Ft(e[i], n);
            qs(r) && r[5] > 0 && td(r);
          }
      }
      function zT(n, t) {
        const e = Ft(t, n),
          i = e[1];
        (function $T(n, t) {
          for (let e = t.length; e < n.blueprint.length; e++) t.push(n.blueprint[e]);
        })(i, e),
          Yu(i, e, e[8]);
      }
      function Ea(n, t) {
        return n[13] ? (n[14][4] = t) : (n[13] = t), (n[14] = t), t;
      }
      function nd(n) {
        for (; n; ) {
          n[2] |= 32;
          const t = No(n);
          if (N0(n) && !t) return n;
          n = t;
        }
        return null;
      }
      function Sa(n, t, e, i = !0) {
        const r = t[10];
        r.begin && r.begin();
        try {
          Da(n, t, n.template, e);
        } catch (s) {
          throw (i && i_(t, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function id(n, t, e) {
        Lc(0), t(n, e);
      }
      function e_(n) {
        return n[7] || (n[7] = []);
      }
      function t_(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function i_(n, t) {
        const e = n[9],
          i = e ? e.get(jn, null) : null;
        i && i.handleError(t);
      }
      function rd(n, t, e, i, r) {
        for (let o = 0; o < e.length; ) {
          const s = e[o++],
            a = e[o++],
            l = t[s],
            c = n.data[s];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function Ma(n, t, e) {
        let i = e ? n.styles : null,
          r = e ? n.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            'number' == typeof a ? (o = a) : 1 == o ? (r = yc(r, a)) : 2 == o && (i = yc(i, a + ': ' + t[++s] + ';'));
          }
        e ? (n.styles = i) : (n.stylesWithoutHost = i), e ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      function Ia(n, t, e, i, r = !1) {
        for (; null !== e; ) {
          const o = t[e.index];
          if ((null !== o && i.push(Ve(o)), on(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                c = l[1].firstChild;
              null !== c && Ia(l[1], l, c, i);
            }
          const s = e.type;
          if (8 & s) Ia(n, t, e.child, i);
          else if (32 & s) {
            const a = Du(e, t);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = cg(t, e);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = No(t[16]);
              Ia(l[1], l, a, i, !0);
            }
          }
          e = r ? e.projectionNext : e.next;
        }
        return i;
      }
      class Vo {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return Ia(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (on(t)) {
              const e = t[8],
                i = e ? e.indexOf(this) : -1;
              i > -1 && (Tu(t, i), ia(e, i));
            }
            this._attachedToViewContainer = !1;
          }
          eg(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Ug(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          nd(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          Sa(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function SI(n, t) {
              Lo(n, t, t[K], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class UT extends Vo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Sa(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class od extends ko {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = pe(t);
          return new Bo(e, this.ngModule);
        }
      }
      function r_(n) {
        const t = [];
        for (let e in n) n.hasOwnProperty(e) && t.push({ propName: n[e], templateName: e });
        return t;
      }
      class WT {
        constructor(t, e) {
          (this.injector = t), (this.parentInjector = e);
        }
        get(t, e, i) {
          const r = this.injector.get(t, fu, i);
          return r !== fu || e === fu ? r : this.parentInjector.get(t, e, i);
        }
      }
      class Bo extends Nm {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = (function GI(n) {
              return n.map(UI).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return r_(this.componentDef.inputs);
        }
        get outputs() {
          return r_(this.componentDef.outputs);
        }
        create(t, e, i, r) {
          let o = (r = r || this.ngModule) instanceof Cr ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new WT(t, o) : t,
            a = s.get(Ro, null);
          if (null === a) throw new C(407, !1);
          const l = s.get($M, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || 'div',
            d = i
              ? (function ST(n, t, e) {
                  return n.selectRootElement(t, e === nn.ShadowDom);
                })(c, i, this.componentDef.encapsulation)
              : Iu(
                  a.createRenderer(null, this.componentDef),
                  u,
                  (function GT(n) {
                    const t = n.toLowerCase();
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null;
                  })(u)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            f = Xu(0, null, null, 1, 0, null, null, null, null, null),
            p = Ca(null, f, null, h, null, null, a, c, l, s, null);
          let m, _;
          Vc(p);
          try {
            const y = (function YT(n, t, e, i, r, o) {
              const s = e[1];
              e[22] = n;
              const l = Ar(s, 22, 2, '#host', null),
                c = (l.mergedAttrs = t.hostAttrs);
              null !== c &&
                (Ma(l, c, !0),
                null !== n &&
                  (Qs(r, n, c), null !== l.classes && ku(r, n, l.classes), null !== l.styles && hg(r, n, l.styles)));
              const u = i.createRenderer(n, t),
                d = Ca(e, $g(t), null, t.onPush ? 32 : 16, e[22], l, i, u, o || null, null, null);
              return (
                s.firstCreatePass && (ta(wo(l, e), s, t.type), Zg(s, l), Qg(l, e.length, 1)), Ea(e, d), (e[22] = d)
              );
            })(d, this.componentDef, p, a, c);
            if (d)
              if (i) Qs(c, d, ['ng-version', UM.full]);
              else {
                const { attrs: D, classes: v } = (function WI(n) {
                  const t = [],
                    e = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let o = n[i];
                    if ('string' == typeof o) 2 === r ? '' !== o && t.push(o, n[++i]) : 8 === r && e.push(o);
                    else {
                      if (!an(r)) break;
                      r = o;
                    }
                    i++;
                  }
                  return { attrs: t, classes: e };
                })(this.componentDef.selectors[0]);
                D && Qs(c, d, D), v && v.length > 0 && ku(c, d, v.join(' '));
              }
            if (((_ = Fc(f, 22)), void 0 !== e)) {
              const D = (_.projection = []);
              for (let v = 0; v < this.ngContentSelectors.length; v++) {
                const S = e[v];
                D.push(null != S ? Array.from(S) : null);
              }
            }
            (m = (function ZT(n, t, e, i) {
              const r = e[1],
                o = (function AT(n, t, e) {
                  const i = $e();
                  n.firstCreatePass &&
                    (e.providersResolver && e.providersResolver(e), Xg(n, i, t, xr(n, t, 1, null), e), Wg(n, i));
                  const r = Co(t, n, i.directiveStart, i);
                  rt(r, t);
                  const o = Wt(i, t);
                  return o && rt(o, t), r;
                })(r, e, t);
              if (((n[8] = e[8] = o), null !== i)) for (const a of i) a(o, t);
              if (t.contentQueries) {
                const a = $e();
                t.contentQueries(1, o, a.directiveStart);
              }
              const s = $e();
              return (
                !r.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (ii(s.index), Kg(e[1], s, 0, s.directiveStart, s.directiveEnd, t), Yg(t, o)),
                o
              );
            })(y, this.componentDef, p, [QT])),
              Yu(f, p, null);
          } finally {
            Bc();
          }
          return new KT(this.componentType, m, Er(_, p), p, _);
        }
      }
      class KT extends class LM {} {
        constructor(t, e, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new UT(r)),
            (this.componentType = t);
        }
        setInput(t, e) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[t])) {
            const o = this._rootLView;
            rd(o[1], o, r, t, e), qg(o, this._tNode.index);
          }
        }
        get injector() {
          return new dr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function QT() {
        const n = $e();
        Ks(w()[1], n);
      }
      function G(n) {
        let t = (function o_(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          e = !0;
        const i = [n];
        for (; t; ) {
          let r;
          if (sn(n)) r = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            r = t.ɵdir;
          }
          if (r) {
            if (e) {
              i.push(r);
              const s = n;
              (s.inputs = sd(n.inputs)), (s.declaredInputs = sd(n.declaredInputs)), (s.outputs = sd(n.outputs));
              const a = r.hostBindings;
              a && tA(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && JT(n, l),
                c && eA(n, c),
                _c(n.inputs, r.inputs),
                _c(n.declaredInputs, r.declaredInputs),
                _c(n.outputs, r.outputs),
                sn(r) && r.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation);
              }
            }
            const o = r.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(n), a === G && (e = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function XT(n) {
          let t = 0,
            e = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = t += r.hostVars), (r.hostAttrs = Xs(r.hostAttrs, (e = Xs(e, r.hostAttrs))));
          }
        })(i);
      }
      function sd(n) {
        return n === nr ? {} : n === ae ? [] : n;
      }
      function JT(n, t) {
        const e = n.viewQuery;
        n.viewQuery = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      function eA(n, t) {
        const e = n.contentQueries;
        n.contentQueries = e
          ? (i, r, o) => {
              t(i, r, o), e(i, r, o);
            }
          : t;
      }
      function tA(n, t) {
        const e = n.hostBindings;
        n.hostBindings = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      let Ta = null;
      function Pi() {
        if (!Ta) {
          const n = _e.Symbol;
          if (n && n.iterator) Ta = n.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const i = t[e];
              'entries' !== i && 'size' !== i && Map.prototype[i] === Map.prototype.entries && (Ta = i);
            }
          }
        }
        return Ta;
      }
      function Ho(n) {
        return !!ad(n) && (Array.isArray(n) || (!(n instanceof Map) && Pi() in n));
      }
      function ad(n) {
        return null !== n && ('function' == typeof n || 'object' == typeof n);
      }
      function Cn(n, t, e) {
        return (n[t] = e);
      }
      function ot(n, t, e) {
        return !Object.is(n[t], e) && ((n[t] = e), !0);
      }
      function Te(n, t, e, i) {
        const r = w();
        return ot(r, ar(), t) && (te(), wn(ke(), r, n, t, e, i)), Te;
      }
      function Or(n, t, e, i) {
        return ot(n, ar(), e) ? t + z(e) + i : $;
      }
      function ue(n, t, e, i, r, o, s, a) {
        const l = w(),
          c = te(),
          u = n + 22,
          d = c.firstCreatePass
            ? (function cA(n, t, e, i, r, o, s, a, l) {
                const c = t.consts,
                  u = Ar(t, n, 4, s || null, ni(c, a));
                Ju(t, e, u, ni(c, l)), Ks(t, u);
                const d = (u.tViews = Xu(2, u, i, r, o, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c));
                return null !== t.queries && (t.queries.template(t, u), (d.queries = t.queries.embeddedTView(u))), u;
              })(u, c, l, t, e, i, r, o, s)
            : c.data[u];
        yn(d, !1);
        const h = l[K].createComment('');
        ma(c, l, h, d), rt(h, l), Ea(l, (l[u] = Jg(h, l, h, d))), Gs(d) && Zu(c, l, d), null != s && Qu(l, d, a);
      }
      function ld(n) {
        return sr(
          (function tS() {
            return j.lFrame.contextLView;
          })(),
          22 + n
        );
      }
      function F(n, t, e) {
        const i = w();
        return ot(i, ar(), t) && Pt(te(), ke(), i, n, t, i[K], e, !1), F;
      }
      function cd(n, t, e, i, r) {
        const s = r ? 'class' : 'style';
        rd(n, e, t.inputs[s], s, i);
      }
      function O(n, t, e, i) {
        const r = w(),
          o = te(),
          s = 22 + n,
          a = r[K],
          l = (r[s] = Iu(
            a,
            t,
            (function uS() {
              return j.lFrame.currentNamespace;
            })()
          )),
          c = o.firstCreatePass
            ? (function dA(n, t, e, i, r, o, s) {
                const a = t.consts,
                  c = Ar(t, n, 2, r, ni(a, o));
                return (
                  Ju(t, e, c, ni(a, s)),
                  null !== c.attrs && Ma(c, c.attrs, !1),
                  null !== c.mergedAttrs && Ma(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(s, o, r, 0, t, e, i)
            : o.data[s];
        yn(c, !0);
        const u = c.mergedAttrs;
        null !== u && Qs(a, l, u);
        const d = c.classes;
        null !== d && ku(a, l, d);
        const h = c.styles;
        return (
          null !== h && hg(a, l, h),
          64 != (64 & c.flags) && ma(o, r, l, c),
          0 ===
            (function Z0() {
              return j.lFrame.elementDepthCount;
            })() && rt(l, r),
          (function Q0() {
            j.lFrame.elementDepthCount++;
          })(),
          Gs(c) && (Zu(o, r, c), zg(o, c, r)),
          null !== i && Qu(r, c),
          O
        );
      }
      function B() {
        let n = $e();
        kc() ? Rc() : ((n = n.parent), yn(n, !1));
        const t = n;
        !(function X0() {
          j.lFrame.elementDepthCount--;
        })();
        const e = te();
        return (
          e.firstCreatePass && (Ks(e, n), Mc(n) && e.queries.elementEnd(n)),
          null != t.classesWithoutHost &&
            (function mS(n) {
              return 0 != (16 & n.flags);
            })(t) &&
            cd(e, t, w(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function gS(n) {
              return 0 != (32 & n.flags);
            })(t) &&
            cd(e, t, w(), t.stylesWithoutHost, !1),
          B
        );
      }
      function pt(n, t, e, i) {
        return O(n, t, e, i), B(), pt;
      }
      function ci(n, t, e) {
        const i = w(),
          r = te(),
          o = n + 22,
          s = r.firstCreatePass
            ? (function hA(n, t, e, i, r) {
                const o = t.consts,
                  s = ni(o, i),
                  a = Ar(t, n, 8, 'ng-container', s);
                return (
                  null !== s && Ma(a, s, !0),
                  Ju(t, e, a, ni(o, r)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(o, r, i, t, e)
            : r.data[o];
        yn(s, !0);
        const a = (i[o] = i[K].createComment(''));
        return ma(r, i, a, s), rt(a, i), Gs(s) && (Zu(r, i, s), zg(r, s, i)), null != e && Qu(i, s), ci;
      }
      function ui() {
        let n = $e();
        const t = te();
        return (
          kc() ? Rc() : ((n = n.parent), yn(n, !1)),
          t.firstCreatePass && (Ks(t, n), Mc(n) && t.queries.elementEnd(n)),
          ui
        );
      }
      function Gn() {
        return w();
      }
      function xa(n) {
        return !!n && 'function' == typeof n.then;
      }
      function g_(n) {
        return !!n && 'function' == typeof n.subscribe;
      }
      const __ = g_;
      function X(n, t, e, i) {
        const r = w(),
          o = te(),
          s = $e();
        return (
          (function v_(n, t, e, i, r, o, s, a) {
            const l = Gs(i),
              u = n.firstCreatePass && t_(n),
              d = t[8],
              h = e_(t);
            let f = !0;
            if (3 & i.type || a) {
              const _ = Wt(i, t),
                y = a ? a(_) : _,
                D = h.length,
                v = a ? q => a(Ve(q[i.index])) : i.index;
              let S = null;
              if (
                (!a &&
                  l &&
                  (S = (function fA(n, t, e, i) {
                    const r = n.cleanup;
                    if (null != r)
                      for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === e && r[o + 1] === i) {
                          const a = t[7],
                            l = r[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        'string' == typeof s && (o += 2);
                      }
                    return null;
                  })(n, t, r, i.index)),
                null !== S)
              )
                ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = o), (S.__ngLastListenerFn__ = o), (f = !1);
              else {
                o = w_(i, t, d, o, !1);
                const q = e.listen(y, r, o);
                h.push(o, q), u && u.push(r, v, D, D + 1);
              }
            } else o = w_(i, t, d, o, !1);
            const p = i.outputs;
            let m;
            if (f && null !== p && (m = p[r])) {
              const _ = m.length;
              if (_)
                for (let y = 0; y < _; y += 2) {
                  const J = t[m[y]][m[y + 1]].subscribe(o),
                    xe = h.length;
                  h.push(o, J), u && u.push(r, i.index, xe, -(xe + 1));
                }
            }
          })(o, r, r[K], s, n, t, 0, i),
          X
        );
      }
      function b_(n, t, e, i) {
        try {
          return !1 !== e(i);
        } catch (r) {
          return i_(n, r), !1;
        }
      }
      function w_(n, t, e, i, r) {
        return function o(s) {
          if (s === Function) return i;
          nd(2 & n.flags ? Ft(n.index, t) : t);
          let l = b_(t, 0, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = b_(t, 0, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function he(n = 1) {
        return (function sS(n) {
          return (j.lFrame.contextLView = (function aS(n, t) {
            for (; n > 0; ) (t = t[15]), n--;
            return t;
          })(n, j.lFrame.contextLView))[8];
        })(n);
      }
      function pA(n, t) {
        let e = null;
        const i = (function HI(n) {
          const t = n.attrs;
          if (null != t) {
            const e = t.indexOf(5);
            if (0 == (1 & e)) return t[e + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < t.length; r++) {
          const o = t[r];
          if ('*' !== o) {
            if (null === i ? gg(n, o, !0) : $I(i, o)) return r;
          } else e = r;
        }
        return e;
      }
      function Li(n) {
        const t = w()[16][6];
        if (!t.projection) {
          const i = (t.projection = So(n ? n.length : 1, null)),
            r = i.slice();
          let o = t.child;
          for (; null !== o; ) {
            const s = n ? pA(o, n) : 0;
            null !== s && (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o)), (o = o.next);
          }
        }
      }
      function mt(n, t = 0, e) {
        const i = w(),
          r = te(),
          o = Ar(r, 22 + n, 16, null, e || null);
        null === o.projection && (o.projection = t),
          Rc(),
          64 != (64 & o.flags) &&
            (function kI(n, t, e) {
              dg(t[K], 0, t, e, tg(n, e, t), og(e.parent || t[6], e, t));
            })(r, i, o);
      }
      function F_(n, t, e, i, r) {
        const o = n[e + 1],
          s = null === t;
        let a = i ? ln(o) : $n(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = n[a + 1];
          _A(n[a], t) && ((l = !0), (n[a + 1] = i ? Hu(u) : Vu(u))), (a = i ? ln(u) : $n(u));
        }
        l && (n[e + 1] = i ? Vu(o) : Hu(o));
      }
      function _A(n, t) {
        return (
          null === n ||
          null == t ||
          (Array.isArray(n) ? n[1] : n) === t ||
          (!(!Array.isArray(n) || 'string' != typeof t) && _r(n, t) >= 0)
        );
      }
      const Ge = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function O_(n) {
        return n.substring(Ge.key, Ge.keyEnd);
      }
      function k_(n, t) {
        const e = Ge.textEnd;
        return e === t
          ? -1
          : ((t = Ge.keyEnd =
              (function wA(n, t, e) {
                for (; t < e && n.charCodeAt(t) > 32; ) t++;
                return t;
              })(n, (Ge.key = t), e)),
            Hr(n, t, e));
      }
      function Hr(n, t, e) {
        for (; t < e && n.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function Fa(n, t, e) {
        return cn(n, t, e, !1), Fa;
      }
      function Xe(n, t) {
        return cn(n, t, null, !0), Xe;
      }
      function En(n, t) {
        for (
          let e = (function vA(n) {
            return (
              (function P_(n) {
                (Ge.key = 0), (Ge.keyEnd = 0), (Ge.value = 0), (Ge.valueEnd = 0), (Ge.textEnd = n.length);
              })(n),
              k_(n, Hr(n, 0, Ge.textEnd))
            );
          })(t);
          e >= 0;
          e = k_(t, e)
        )
          kt(n, O_(t), !0);
      }
      function cn(n, t, e, i) {
        const r = w(),
          o = te(),
          s = Vn(2);
        o.firstUpdatePass && B_(o, n, s, i),
          t !== $ &&
            ot(r, s, t) &&
            j_(
              o,
              o.data[ht()],
              r,
              r[K],
              n,
              (r[s + 1] = (function OA(n, t) {
                return null == n || ('string' == typeof t ? (n += t) : 'object' == typeof n && (n = ge(Rt(n)))), n;
              })(t, e)),
              i,
              s
            );
      }
      function V_(n, t) {
        return t >= n.expandoStartIndex;
      }
      function B_(n, t, e, i) {
        const r = n.data;
        if (null === r[e + 1]) {
          const o = r[ht()],
            s = V_(n, e);
          $_(o, i) && null === t && !s && (t = !1),
            (t = (function MA(n, t, e, i) {
              const r = (function Nc(n) {
                const t = j.lFrame.currentDirectiveIndex;
                return -1 === t ? null : n[t];
              })(n);
              let o = i ? t.residualClasses : t.residualStyles;
              if (null === r)
                0 === (i ? t.classBindings : t.styleBindings) &&
                  ((e = zo((e = dd(null, n, t, e, i)), t.attrs, i)), (o = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || n[s] !== r)
                  if (((e = dd(r, n, t, e, i)), null === o)) {
                    let l = (function IA(n, t, e) {
                      const i = e ? t.classBindings : t.styleBindings;
                      if (0 !== $n(i)) return n[ln(i)];
                    })(n, t, i);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = dd(null, n, t, l[1], i)),
                      (l = zo(l, t.attrs, i)),
                      (function TA(n, t, e, i) {
                        n[ln(e ? t.classBindings : t.styleBindings)] = i;
                      })(n, t, i, l));
                  } else
                    o = (function AA(n, t, e) {
                      let i;
                      const r = t.directiveEnd;
                      for (let o = 1 + t.directiveStylingLast; o < r; o++) i = zo(i, n[o].hostAttrs, e);
                      return zo(i, t.attrs, e);
                    })(n, t, i);
              }
              return void 0 !== o && (i ? (t.residualClasses = o) : (t.residualStyles = o)), e;
            })(r, o, t, i)),
            (function mA(n, t, e, i, r, o) {
              let s = o ? t.classBindings : t.styleBindings,
                a = ln(s),
                l = $n(s);
              n[i] = e;
              let u,
                c = !1;
              if (Array.isArray(e)) {
                const d = e;
                (u = d[1]), (null === u || _r(d, u) > 0) && (c = !0);
              } else u = e;
              if (r)
                if (0 !== l) {
                  const h = ln(n[a + 1]);
                  (n[i + 1] = va(h, a)),
                    0 !== h && (n[h + 1] = Bu(n[h + 1], i)),
                    (n[a + 1] = (function dT(n, t) {
                      return (131071 & n) | (t << 17);
                    })(n[a + 1], i));
                } else (n[i + 1] = va(a, 0)), 0 !== a && (n[a + 1] = Bu(n[a + 1], i)), (a = i);
              else (n[i + 1] = va(l, 0)), 0 === a ? (a = i) : (n[l + 1] = Bu(n[l + 1], i)), (l = i);
              c && (n[i + 1] = Vu(n[i + 1])),
                F_(n, u, i, !0),
                F_(n, u, i, !1),
                (function gA(n, t, e, i, r) {
                  const o = r ? n.residualClasses : n.residualStyles;
                  null != o && 'string' == typeof t && _r(o, t) >= 0 && (e[i + 1] = Hu(e[i + 1]));
                })(t, u, n, i, o),
                (s = va(a, l)),
                o ? (t.classBindings = s) : (t.styleBindings = s);
            })(r, o, t, e, s, i);
        }
      }
      function dd(n, t, e, i, r) {
        let o = null;
        const s = e.directiveEnd;
        let a = e.directiveStylingLast;
        for (-1 === a ? (a = e.directiveStart) : a++; a < s && ((o = t[a]), (i = zo(i, o.hostAttrs, r)), o !== n); )
          a++;
        return null !== n && (e.directiveStylingLast = a), i;
      }
      function zo(n, t, e) {
        const i = e ? 1 : 2;
        let r = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            'number' == typeof s
              ? (r = s)
              : r === i && (Array.isArray(n) || (n = void 0 === n ? [] : ['', n]), kt(n, s, !!e || t[++o]));
          }
        return void 0 === n ? null : n;
      }
      function j_(n, t, e, i, r, o, s, a) {
        if (!(3 & t.type)) return;
        const l = n.data,
          c = l[a + 1];
        Oa(
          (function Og(n) {
            return 1 == (1 & n);
          })(c)
            ? z_(l, t, e, r, $n(c), s)
            : void 0
        ) ||
          (Oa(o) ||
            ((function Fg(n) {
              return 2 == (2 & n);
            })(c) &&
              (o = z_(l, null, e, r, a, s))),
          (function PI(n, t, e, i, r) {
            if (t) r ? n.addClass(e, i) : n.removeClass(e, i);
            else {
              let o = -1 === i.indexOf('-') ? void 0 : Ct.DashCase;
              null == r
                ? n.removeStyle(e, i, o)
                : ('string' == typeof r && r.endsWith('!important') && ((r = r.slice(0, -10)), (o |= Ct.Important)),
                  n.setStyle(e, i, r, o));
            }
          })(i, s, Ws(ht(), e), r, o));
      }
      function z_(n, t, e, i, r, o) {
        const s = null === t;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = e[r + 1];
          h === $ && (h = d ? ae : void 0);
          let f = d ? Yc(h, i) : u === i ? h : void 0;
          if ((c && !Oa(f) && (f = Yc(l, i)), Oa(f) && ((a = f), s))) return a;
          const p = n[r + 1];
          r = s ? ln(p) : $n(p);
        }
        if (null !== t) {
          let l = o ? t.residualClasses : t.residualStyles;
          null != l && (a = Yc(l, i));
        }
        return a;
      }
      function Oa(n) {
        return void 0 !== n;
      }
      function $_(n, t) {
        return 0 != (n.flags & (t ? 16 : 32));
      }
      function Je(n, t = '') {
        const e = w(),
          i = te(),
          r = n + 22,
          o = i.firstCreatePass ? Ar(i, r, 1, t, null) : i.data[r],
          s = (e[r] = (function Mu(n, t) {
            return n.createText(t);
          })(e[K], t));
        ma(i, e, s, o), yn(o, !1);
      }
      function di(n) {
        return hi('', n, ''), di;
      }
      function hi(n, t, e) {
        const i = w(),
          r = Or(i, n, t, e);
        return (
          r !== $ &&
            (function Un(n, t, e) {
              const i = Ws(t, n);
              !(function Xm(n, t, e) {
                n.setValue(t, e);
              })(n[K], i, e);
            })(i, ht(), r),
          hi
        );
      }
      function X_(n, t, e) {
        !(function un(n, t, e, i) {
          const r = te(),
            o = Vn(2);
          r.firstUpdatePass && B_(r, null, o, i);
          const s = w();
          if (e !== $ && ot(s, o, e)) {
            const a = r.data[ht()];
            if ($_(a, i) && !V_(r, o)) {
              let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (e = yc(l, e || '')), cd(r, a, s, e, i);
            } else
              !(function FA(n, t, e, i, r, o, s, a) {
                r === $ && (r = ae);
                let l = 0,
                  c = 0,
                  u = 0 < r.length ? r[0] : null,
                  d = 0 < o.length ? o[0] : null;
                for (; null !== u || null !== d; ) {
                  const h = l < r.length ? r[l + 1] : void 0,
                    f = c < o.length ? o[c + 1] : void 0;
                  let m,
                    p = null;
                  u === d
                    ? ((l += 2), (c += 2), h !== f && ((p = d), (m = f)))
                    : null === d || (null !== u && u < d)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = d), (m = f)),
                    null !== p && j_(n, t, e, i, p, m, s, a),
                    (u = l < r.length ? r[l] : null),
                    (d = c < o.length ? o[c] : null);
                }
              })(
                r,
                a,
                s,
                s[K],
                s[o + 1],
                (s[o + 1] = (function xA(n, t, e) {
                  if (null == e || '' === e) return ae;
                  const i = [],
                    r = Rt(e);
                  if (Array.isArray(r)) for (let o = 0; o < r.length; o++) n(i, r[o], !0);
                  else if ('object' == typeof r) for (const o in r) r.hasOwnProperty(o) && n(i, o, r[o]);
                  else 'string' == typeof r && t(i, r);
                  return i;
                })(n, t, e)),
                i,
                o
              );
          }
        })(kt, En, Or(w(), n, t, e), !0);
      }
      function $o(n, t, e) {
        const i = w();
        return ot(i, ar(), t) && Pt(te(), ke(), i, n, t, i[K], e, !0), $o;
      }
      const zr = 'en-US';
      let dy = zr;
      function pd(n, t, e, i, r) {
        if (((n = V(n)), Array.isArray(n))) for (let o = 0; o < n.length; o++) pd(n[o], t, e, i, r);
        else {
          const o = te(),
            s = w();
          let a = Oi(n) ? n : V(n.provide),
            l = Pm(n);
          const c = $e(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (Oi(n) || !n.multi) {
            const f = new vo(l, r, g),
              p = gd(a, t, r ? u : u + h, d);
            -1 === p
              ? (ta(wo(c, s), o, a),
                md(o, n, t.length),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(f),
                s.push(f))
              : ((e[p] = f), (s[p] = f));
          } else {
            const f = gd(a, t, u + h, d),
              p = gd(a, t, u, u + h),
              m = f >= 0 && e[f],
              _ = p >= 0 && e[p];
            if ((r && !_) || (!r && !m)) {
              ta(wo(c, s), o, a);
              const y = (function Yx(n, t, e, i, r) {
                const o = new vo(n, e, g);
                return (o.multi = []), (o.index = t), (o.componentProviders = 0), Ny(o, r, i && !e), o;
              })(r ? Kx : qx, e.length, r, i, l);
              !r && _ && (e[p].providerFactory = y),
                md(o, n, t.length, 0),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(y),
                s.push(y);
            } else md(o, n, f > -1 ? f : p, Ny(e[r ? p : f], l, !r && i));
            !r && i && _ && e[p].componentProviders++;
          }
        }
      }
      function md(n, t, e, i) {
        const r = Oi(t),
          o = (function AM(n) {
            return !!n.useClass;
          })(t);
        if (r || o) {
          const l = (o ? V(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && t.multi) {
              const u = c.indexOf(e);
              -1 === u ? c.push(e, [i, l]) : c[u + 1].push(i, l);
            } else c.push(e, l);
          }
        }
      }
      function Ny(n, t, e) {
        return e && n.componentProviders++, n.multi.push(t) - 1;
      }
      function gd(n, t, e, i) {
        for (let r = e; r < i; r++) if (t[r] === n) return r;
        return -1;
      }
      function qx(n, t, e, i) {
        return _d(this.multi, []);
      }
      function Kx(n, t, e, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Co(e, e[1], this.providerFactory.index, i);
          (o = a.slice(0, s)), _d(r, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), _d(r, o);
        return o;
      }
      function _d(n, t) {
        for (let e = 0; e < n.length; e++) t.push((0, n[e])());
        return t;
      }
      function fe(n, t = []) {
        return e => {
          e.providersResolver = (i, r) =>
            (function Wx(n, t, e) {
              const i = te();
              if (i.firstCreatePass) {
                const r = sn(n);
                pd(e, i.data, i.blueprint, r, !0), pd(t, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, t);
        };
      }
      class $r {}
      class Ly extends $r {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new od(this));
          const i = (function At(n, t) {
            const e = n[yp] || null;
            if (!e && !0 === t) throw new Error(`Type ${ge(n)} does not have '\u0275mod' property.`);
            return e;
          })(t);
          (this._bootstrapComponents = (function zn(n) {
            return n instanceof Function ? n() : n;
          })(i.bootstrap)),
            (this._r3Injector = Dg(
              t,
              e,
              [
                { provide: $r, useValue: this },
                { provide: ko, useValue: this.componentFactoryResolver },
              ],
              ge(t),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(), this.destroyCbs.forEach(e => e()), (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class yd extends class Zx {} {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Ly(this.moduleType, t);
        }
      }
      function Wy(n, t, e, i, r, o) {
        const s = t + e;
        return ot(n, s, r)
          ? Cn(n, s + 1, o ? i.call(o, r) : i(r))
          : (function Yo(n, t) {
              const e = n[t];
              return e === $ ? void 0 : e;
            })(n, s + 1);
      }
      function bd(n, t) {
        const e = te();
        let i;
        const r = n + 22;
        e.firstCreatePass
          ? ((i = (function yF(n, t) {
              if (t)
                for (let e = t.length - 1; e >= 0; e--) {
                  const i = t[e];
                  if (n === i.name) return i;
                }
            })(t, e.pipeRegistry)),
            (e.data[r] = i),
            i.onDestroy && (e.destroyHooks || (e.destroyHooks = [])).push(r, i.onDestroy))
          : (i = e.data[r]);
        const o = i.factory || (i.factory = xi(i.type)),
          s = zt(g);
        try {
          const a = Js(!1),
            l = o();
          return (
            Js(a),
            (function uA(n, t, e, i) {
              e >= n.data.length && ((n.data[e] = null), (n.blueprint[e] = null)), (t[e] = i);
            })(e, w(), r, l),
            l
          );
        } finally {
          zt(s);
        }
      }
      function wd(n, t, e) {
        const i = n + 22,
          r = w(),
          o = sr(r, i);
        return (function Zo(n, t) {
          return n[1].data[t].pure;
        })(r, i)
          ? Wy(r, dt(), t, o.transform, e, o)
          : o.transform(e);
      }
      function Cd(n) {
        return t => {
          setTimeout(n, void 0, t);
        };
      }
      const Y = class DF extends ee {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, i) {
          let r = t,
            o = e || (() => null),
            s = i;
          if (t && 'object' == typeof t) {
            const l = t;
            (r = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Cd(o)), r && (r = Cd(r)), s && (s = Cd(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return t instanceof Ne && t.add(a), a;
        }
      };
      function EF() {
        return this._results[Pi()]();
      }
      class Qo {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = Pi(),
            i = Qo.prototype;
          i[e] || (i[e] = EF);
        }
        get changes() {
          return this._changes || (this._changes = new Y());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const i = this;
          i.dirty = !1;
          const r = Ot(t);
          (this._changesDetected = !(function MS(n, t, e) {
            if (n.length !== t.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                o = t[i];
              if ((e && ((r = e(r)), (o = e(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, e)) &&
            ((i._results = r), (i.length = r.length), (i.last = r[this.length - 1]), (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Sn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = IF), n;
      })();
      const SF = Sn,
        MF = class extends SF {
          constructor(t, e, i) {
            super(), (this._declarationLView = t), (this._declarationTContainer = e), (this.elementRef = i);
          }
          createEmbeddedView(t, e) {
            const i = this._declarationTContainer.tViews,
              r = Ca(this._declarationLView, i, t, 16, null, i.declTNode, null, null, null, null, e || null);
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return null !== s && (r[19] = s.createEmbeddedView(i)), Yu(i, r, t), new Vo(r);
          }
        };
      function IF() {
        return La($e(), w());
      }
      function La(n, t) {
        return 4 & n.type ? new MF(t, n, Er(n, t)) : null;
      }
      let Yt = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = TF), n;
      })();
      function TF() {
        return Jy($e(), w());
      }
      const AF = Yt,
        Qy = class extends AF {
          constructor(t, e, i) {
            super(), (this._lContainer = t), (this._hostTNode = e), (this._hostLView = i);
          }
          get element() {
            return Er(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new dr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ea(this._hostTNode, this._hostLView);
            if (Up(t)) {
              const e = ur(t, this._hostLView),
                i = cr(t);
              return new dr(e[1].data[i + 8], e);
            }
            return new dr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Xy(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, e, i) {
            let r, o;
            'number' == typeof i ? (r = i) : null != i && ((r = i.index), (o = i.injector));
            const s = t.createEmbeddedView(e || {}, o);
            return this.insert(s, r), s;
          }
          createComponent(t, e, i, r, o) {
            const s =
              t &&
              !(function Eo(n) {
                return 'function' == typeof n;
              })(t);
            let a;
            if (s) a = e;
            else {
              const d = e || {};
              (a = d.index), (i = d.injector), (r = d.projectableNodes), (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Bo(pe(t)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const h = (s ? c : this.parentInjector).get(Cr, null);
              h && (o = h);
            }
            const u = l.create(c, r, void 0, o);
            return this.insert(u.hostView, a), u;
          }
          insert(t, e) {
            const i = t._lView,
              r = i[1];
            if (
              (function Y0(n) {
                return on(n[3]);
              })(i)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  h = new Qy(d, d[6], d[3]);
                h.detach(h.indexOf(t));
              }
            }
            const o = this._adjustIndex(e),
              s = this._lContainer;
            !(function II(n, t, e, i) {
              const r = 10 + i,
                o = e.length;
              i > 0 && (e[r - 1][4] = t),
                i < o - 10 ? ((t[4] = e[r]), tm(e, 10 + i, t)) : (e.push(t), (t[4] = null)),
                (t[3] = e);
              const s = t[17];
              null !== s &&
                e !== s &&
                (function TI(n, t) {
                  const e = n[9];
                  t[16] !== t[3][3][16] && (n[2] = !0), null === e ? (n[9] = [t]) : e.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(n), (t[2] |= 64);
            })(r, i, s, o);
            const a = Fu(o, s),
              l = i[K],
              c = pa(l, s[7]);
            return (
              null !== c &&
                (function EI(n, t, e, i, r, o) {
                  (i[0] = r), (i[6] = t), Lo(n, i, e, 1, r, o);
                })(r, s[6], l, i, c, a),
              t.attachToViewContainerRef(),
              tm(Dd(s), o, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Xy(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              i = Tu(this._lContainer, e);
            i && (ia(Dd(this._lContainer), e), eg(i[1], i));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              i = Tu(this._lContainer, e);
            return i && null != ia(Dd(this._lContainer), e) ? new Vo(i) : null;
          }
          _adjustIndex(t, e = 0) {
            return t ?? this.length + e;
          }
        };
      function Xy(n) {
        return n[8];
      }
      function Dd(n) {
        return n[8] || (n[8] = []);
      }
      function Jy(n, t) {
        let e;
        const i = t[n.index];
        if (on(i)) e = i;
        else {
          let r;
          if (8 & n.type) r = Ve(i);
          else {
            const o = t[K];
            r = o.createComment('');
            const s = Wt(n, t);
            Ri(
              o,
              pa(o, s),
              r,
              (function OI(n, t) {
                return n.nextSibling(t);
              })(o, s),
              !1
            );
          }
          (t[n.index] = e = Jg(i, t, r, n)), Ea(t, e);
        }
        return new Qy(e, n, t);
      }
      class Ed {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ed(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Sd {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const i = null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = e.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Sd(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++) null !== rv(t, e).matches && this.queries[e].setDirty();
        }
      }
      class ev {
        constructor(t, e, i = null) {
          (this.predicate = t), (this.flags = e), (this.read = i);
        }
      }
      class Md {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== e ? e.length : 0,
              o = this.getByIndex(i).embeddedTView(t, r);
            o && ((o.indexInDeclarationView = i), null !== e ? e.push(o) : (e = [o]));
          }
          return null !== e ? new Md(e) : null;
        }
        template(t, e) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Id {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, e), new Id(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let i = t.parent;
            for (; null !== i && 8 & i.type && i.index !== e; ) i = i.parent;
            return e === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(t, e, OF(e, o)), this.matchTNodeWithReadOption(t, e, na(e, t, o, !1, !1));
            }
          else
            i === Sn
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, na(e, t, i, !1, !1));
        }
        matchTNodeWithReadOption(t, e, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === ye || r === Yt || (r === Sn && 4 & e.type)) this.addMatch(e.index, -2);
              else {
                const o = na(e, t, r, !1, !1);
                null !== o && this.addMatch(e.index, o);
              }
            else this.addMatch(e.index, i);
          }
        }
        addMatch(t, e) {
          null === this.matches ? (this.matches = [t, e]) : this.matches.push(t, e);
        }
      }
      function OF(n, t) {
        const e = n.localNames;
        if (null !== e) for (let i = 0; i < e.length; i += 2) if (e[i] === t) return e[i + 1];
        return null;
      }
      function RF(n, t, e, i) {
        return -1 === e
          ? (function kF(n, t) {
              return 11 & n.type ? Er(n, t) : 4 & n.type ? La(n, t) : null;
            })(t, n)
          : -2 === e
          ? (function PF(n, t, e) {
              return e === ye ? Er(t, n) : e === Sn ? La(t, n) : e === Yt ? Jy(t, n) : void 0;
            })(n, t, i)
          : Co(n, n[1], e, t);
      }
      function tv(n, t, e, i) {
        const r = t[19].queries[i];
        if (null === r.matches) {
          const o = n.data,
            s = e.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : RF(t, o[c], s[l + 1], e.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function Td(n, t, e, i) {
        const r = n.queries.getByIndex(e),
          o = r.matches;
        if (null !== o) {
          const s = tv(n, t, r, e);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = t[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && Td(h[1], h, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  Td(f[1], f, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function Ee(n) {
        const t = w(),
          e = te(),
          i = Rp();
        Lc(i + 1);
        const r = rv(e, i);
        if (
          n.dirty &&
          (function K0(n) {
            return 4 == (4 & n[2]);
          })(t) ===
            (2 == (2 & r.metadata.flags))
        ) {
          if (null === r.matches) n.reset([]);
          else {
            const o = r.crossesNgTemplate ? Td(e, t, i, []) : tv(e, t, r, i);
            n.reset(o, jM), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Wn(n, t, e) {
        const i = te();
        i.firstCreatePass && (iv(i, new ev(n, t, e), -1), 2 == (2 & t) && (i.staticViewQueries = !0)), nv(i, w(), t);
      }
      function et(n, t, e, i) {
        const r = te();
        if (r.firstCreatePass) {
          const o = $e();
          iv(r, new ev(t, e, i), o.index),
            (function LF(n, t) {
              const e = n.contentQueries || (n.contentQueries = []);
              t !== (e.length ? e[e.length - 1] : -1) && e.push(n.queries.length - 1, t);
            })(r, n),
            2 == (2 & e) && (r.staticContentQueries = !0);
        }
        nv(r, w(), e);
      }
      function Se() {
        return (function NF(n, t) {
          return n[19].queries[t].queryList;
        })(w(), Rp());
      }
      function nv(n, t, e) {
        const i = new Qo(4 == (4 & e));
        Ug(n, t, i, i.destroy), null === t[19] && (t[19] = new Sd()), t[19].queries.push(new Ed(i));
      }
      function iv(n, t, e) {
        null === n.queries && (n.queries = new Md()), n.queries.track(new Id(t, e));
      }
      function rv(n, t) {
        return n.queries.getByIndex(t);
      }
      function Ba(...n) {}
      const Dv = new E('Application Initializer');
      let Ha = (() => {
        class n {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = Ba),
              (this.reject = Ba),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]();
                if (xa(o)) e.push(o);
                else if (__(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  e.push(s);
                }
              }
            Promise.all(e)
              .then(() => {
                i();
              })
              .catch(r => {
                this.reject(r);
              }),
              0 === e.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Dv, 8));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      const Wr = new E('AppId', {
        providedIn: 'root',
        factory: function Ev() {
          return `${kd()}${kd()}${kd()}`;
        },
      });
      function kd() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Sv = new E('Platform Initializer'),
        ja = new E('Platform ID', { providedIn: 'platform', factory: () => 'unknown' }),
        rO = new E('appBootstrapListener'),
        Mn = new E('AnimationModuleType'),
        In = new E('LocaleId', {
          providedIn: 'root',
          factory: () =>
            oi(In, H.Optional | H.SkipSelf) ||
            (function oO() {
              return (typeof $localize < 'u' && $localize.locale) || zr;
            })(),
        }),
        uO = (() => Promise.resolve(0))();
      function Rd(n) {
        typeof Zone > 'u'
          ? uO.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', n);
      }
      class ne {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Y(!1)),
            (this.onMicrotaskEmpty = new Y(!1)),
            (this.onStable = new Y(!1)),
            (this.onError = new Y(!1)),
            typeof Zone > 'u')
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const r = this;
          if (((r._nesting = 0), (r._outer = r._inner = Zone.current), Zone.AsyncStackTaggingZoneSpec)) {
            const o = Zone.AsyncStackTaggingZoneSpec;
            r._inner = r._inner.fork(new o('Angular'));
          }
          Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && e),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function dO() {
              let n = _e.requestAnimationFrame,
                t = _e.cancelAnimationFrame;
              if (typeof Zone < 'u' && n && t) {
                const e = n[Zone.__symbol__('OriginalDelegate')];
                e && (n = e);
                const i = t[Zone.__symbol__('OriginalDelegate')];
                i && (t = i);
              }
              return { nativeRequestAnimationFrame: n, nativeCancelAnimationFrame: t };
            })().nativeRequestAnimationFrame),
            (function pO(n) {
              const t = () => {
                !(function fO(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId = n.nativeRequestAnimationFrame.call(_e, () => {
                      n.fakeTopEventTask ||
                        (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (n.lastRequestAnimationFrameId = -1),
                              Nd(n),
                              (n.isCheckStableRunning = !0),
                              Pd(n),
                              (n.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        n.fakeTopEventTask.invoke();
                    })),
                    Nd(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (e, i, r, o, s, a) => {
                  try {
                    return Tv(n), e.invokeTask(r, o, s, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection && 'eventTask' === o.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Av(n);
                  }
                },
                onInvoke: (e, i, r, o, s, a, l) => {
                  try {
                    return Tv(n), e.invoke(r, o, s, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && t(), Av(n);
                  }
                },
                onHasTask: (e, i, r, o) => {
                  e.hasTask(r, o),
                    i === r &&
                      ('microTask' == o.change
                        ? ((n._hasPendingMicrotasks = o.microTask), Nd(n), Pd(n))
                        : 'macroTask' == o.change && (n.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (e, i, r, o) => (e.handleError(r, o), n.runOutsideAngular(() => n.onError.emit(o)), !1),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!ne.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (ne.isInAngularZone()) throw new C(909, !1);
        }
        run(t, e, i) {
          return this._inner.run(t, e, i);
        }
        runTask(t, e, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask('NgZoneEvent: ' + r, t, hO, Ba, Ba);
          try {
            return o.runTask(s, e, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, e, i) {
          return this._inner.runGuarded(t, e, i);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const hO = {};
      function Pd(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function Nd(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection || n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function Tv(n) {
        n._nesting++, n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function Av(n) {
        n._nesting--, Pd(n);
      }
      class mO {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Y()),
            (this.onMicrotaskEmpty = new Y()),
            (this.onStable = new Y()),
            (this.onError = new Y());
        }
        run(t, e, i) {
          return t.apply(e, i);
        }
        runGuarded(t, e, i) {
          return t.apply(e, i);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, i, r) {
          return t.apply(e, i);
        }
      }
      const xv = new E(''),
        za = new E('');
      let Bd,
        Ld = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Bd ||
                  ((function gO(n) {
                    Bd = n;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone = typeof Zone > 'u' ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ne.assertNotInAngularZone(),
                        Rd(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Rd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  i => !i.updateCb || !i.updateCb(e) || (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(e => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(s => s.timeoutId !== o)),
                    e(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: e, timeoutId: o, updateCb: r });
            }
            whenStable(e, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(e, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(e) {
              this.registry.registerApplication(e, this);
            }
            unregisterApplication(e) {
              this.registry.unregisterApplication(e);
            }
            findProviders(e, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(ne), b(Vd), b(za));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Vd = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(e, i) {
              this._applications.set(e, i);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, i = !0) {
              return Bd?.findTestabilityInTree(this, e, i) ?? null;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'platform' })),
            n
          );
        })(),
        fi = null;
      const Fv = new E('AllowMultipleToken'),
        Hd = new E('PlatformDestroyListeners');
      function kv(n, t, e = []) {
        const i = `Platform: ${t}`,
          r = new E(i);
        return (o = []) => {
          let s = jd();
          if (!s || s.injector.get(Fv, !1)) {
            const a = [...e, ...o, { provide: r, useValue: !0 }];
            n
              ? n(a)
              : (function vO(n) {
                  if (fi && !fi.get(Fv, !1)) throw new C(400, !1);
                  fi = n;
                  const t = n.get(Pv);
                  (function Ov(n) {
                    const t = n.get(Sv, null);
                    t && t.forEach(e => e());
                  })(n);
                })(
                  (function Rv(n = [], t) {
                    return qt.create({
                      name: t,
                      providers: [
                        { provide: cu, useValue: 'platform' },
                        { provide: Hd, useValue: new Set([() => (fi = null)]) },
                        ...n,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function wO(n) {
            const t = jd();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function jd() {
        return fi?.get(Pv) ?? null;
      }
      let Pv = (() => {
        class n {
          constructor(e) {
            (this._injector = e), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, i) {
            const r = (function Lv(n, t) {
                let e;
                return (e = 'noop' === n ? new mO() : ('zone.js' === n ? void 0 : n) || new ne(t)), e;
              })(
                i?.ngZone,
                (function Nv(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection: !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection: !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(i)
              ),
              o = [{ provide: ne, useValue: r }];
            return r.run(() => {
              const s = qt.create({ providers: o, parent: this.injector, name: e.moduleType.name }),
                a = e.create(s),
                l = a.injector.get(jn, null);
              if (!l) throw new C(402, !1);
              return (
                r.runOutsideAngular(() => {
                  const c = r.onError.subscribe({
                    next: u => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    $a(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Vv(n, t, e) {
                  try {
                    const i = e();
                    return xa(i)
                      ? i.catch(r => {
                          throw (t.runOutsideAngular(() => n.handleError(r)), r);
                        })
                      : i;
                  } catch (i) {
                    throw (t.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(l, r, () => {
                  const c = a.injector.get(Ha);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function hy(n) {
                          It(n, 'Expected localeId to be defined'),
                            'string' == typeof n && (dy = n.toLowerCase().replace(/_/g, '-'));
                        })(a.injector.get(In, zr) || zr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, i = []) {
            const r = Bv({}, i);
            return (function _O(n, t, e) {
              const i = new yd(e);
              return Promise.resolve(i);
            })(0, 0, e).then(o => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(e) {
            const i = e.injector.get(Jo);
            if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(r => i.bootstrap(r));
            else {
              if (!e.instance.ngDoBootstrap) throw new C(403, !1);
              e.instance.ngDoBootstrap(i);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach(i => i.destroy()), this._destroyListeners.forEach(i => i());
            const e = this._injector.get(Hd, null);
            e && (e.forEach(i => i()), e.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(qt));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'platform' })),
          n
        );
      })();
      function Bv(n, t) {
        return Array.isArray(t) ? t.reduce(Bv, n) : { ...n, ...t };
      }
      let Jo = (() => {
        class n {
          constructor(e, i, r) {
            (this._zone = e),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              }));
            const o = new be(a => {
                (this._stable =
                  this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new be(a => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    ne.assertNotInAngularZone(),
                      Rd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  ne.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = mn(o, s.pipe(fp()));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(e, i) {
            const r = e instanceof Nm;
            if (!this._injector.get(Ha).done)
              throw (
                (!r &&
                  (function fo(n) {
                    const t = pe(n) || ct(n) || ut(n);
                    return null !== t && t.standalone;
                  })(e),
                new C(405, false))
              );
            let s;
            (s = r ? e : this._injector.get(ko).resolveComponentFactory(e)), this.componentTypes.push(s.componentType);
            const a = (function yO(n) {
                return n.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get($r),
              c = s.create(qt.NULL, [], i || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(xv, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView), $a(this.components, c), d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const i = e;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(e) {
            const i = e;
            $a(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(rO, [])
                .concat(this._bootstrapListeners)
                .forEach(r => r(e));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(e => e()),
                  this._views.slice().forEach(e => e.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(e) {
            return this._destroyListeners.push(e), () => $a(this._destroyListeners, e);
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const e = this._injector;
            e.destroy && !e.destroyed && e.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(ne), b(Cr), b(jn));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      function $a(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      let jv = !0,
        Tn = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = EO), n;
        })();
      function EO(n) {
        return (function SO(n, t, e) {
          if (Us(n) && !e) {
            const i = Ft(n.index, t);
            return new Vo(i, i);
          }
          return 47 & n.type ? new Vo(t[16], t) : null;
        })($e(), w(), 16 == (16 & n));
      }
      class Wv {
        constructor() {}
        supports(t) {
          return Ho(t);
        }
        create(t) {
          return new FO(t);
        }
      }
      const xO = (n, t) => t;
      class FO {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || xO);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; e || i; ) {
            const s = !i || (e && e.currentIndex < Kv(i, r, o)) ? e : i,
              a = Kv(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let h = 0; h < c; h++) {
                  const f = h < o.length ? o[h] : (o[h] = 0),
                    p = f + h;
                  u <= p && p < c && (o[h] = f + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Ho(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let r,
            o,
            s,
            e = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== e && Object.is(e.trackById, s)
                  ? (i && (e = this._verifyReinsertion(e, o, s, a)),
                    Object.is(e.item, o) || this._addIdentityChange(e, o))
                  : ((e = this._mismatch(e, o, s, a)), (i = !0)),
                (e = e._next);
          } else
            (r = 0),
              (function sA(n, t) {
                if (Array.isArray(n)) for (let e = 0; e < n.length; e++) t(n[e]);
                else {
                  const e = n[Pi()]();
                  let i;
                  for (; !(i = e.next()).done; ) t(i.value);
                }
              })(t, a => {
                (s = this._trackByFn(r, a)),
                  null !== e && Object.is(e.trackById, s)
                    ? (i && (e = this._verifyReinsertion(e, a, s, r)),
                      Object.is(e.item, a) || this._addIdentityChange(e, a))
                    : ((e = this._mismatch(e, a, s, r)), (i = !0)),
                  (e = e._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(e), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved)
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, i, r) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, o, r))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(i, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, o, r))
              : (t = this._addAfter(new OO(e, i), o, r)),
            t
          );
        }
        _verifyReinsertion(t, e, i, r) {
          let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, r))
              : t.currentIndex != r && ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _moveAfter(t, e, i) {
          return this._unlink(t), this._insertAfter(t, e, i), this._addToMoves(t, i), t;
        }
        _addAfter(t, e, i) {
          return (
            this._insertAfter(t, e, i),
            (this._additionsTail =
              null === this._additionsTail ? (this._additionsHead = t) : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, i) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new qv()),
            this._linkedRecords.put(t),
            (t.currentIndex = i),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            i = t._next;
          return null === e ? (this._itHead = i) : (e._next = i), null === i ? (this._itTail = e) : (i._prev = e), t;
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail = null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new qv()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class OO {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class kO {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t));
        }
        get(t, e) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if ((null === e || e <= i.currentIndex) && Object.is(i.trackById, t)) return i;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            i = t._nextDup;
          return (
            null === e ? (this._head = i) : (e._nextDup = i),
            null === i ? (this._tail = e) : (i._prevDup = e),
            null === this._head
          );
        }
      }
      class qv {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let i = this.map.get(e);
          i || ((i = new kO()), this.map.set(e, i)), i.add(t);
        }
        get(t, e) {
          const r = this.map.get(t);
          return r ? r.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Kv(n, t, e) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return e && i < e.length && (r = e[i]), i + t + r;
      }
      class Yv {
        constructor() {}
        supports(t) {
          return t instanceof Map || ad(t);
        }
        create() {
          return new RO();
        }
      }
      class RO {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || ad(t))) throw new C(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (i, r) => {
              if (e && e.key === r) this._maybeAddToChanges(e, i), (this._appendAfter = e), (e = e._next);
              else {
                const o = this._getOrCreateRecordForKey(r, i);
                e = this._insertBeforeOrAppend(e, o);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let i = e; null !== i; i = i._nextRemoved)
              i === this._mapHead && (this._mapHead = null),
                this._records.delete(i.key),
                (i._nextRemoved = i._next),
                (i.previousValue = i.currentValue),
                (i.currentValue = null),
                (i._prev = null),
                (i._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const i = t._prev;
            return (
              (e._next = t),
              (e._prev = i),
              (t._prev = e),
              i && (i._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter ? ((this._appendAfter._next = e), (e._prev = this._appendAfter)) : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const r = this._records.get(t);
            this._maybeAddToChanges(r, e);
            const o = r._prev,
              s = r._next;
            return o && (o._next = s), s && (s._prev = o), (r._next = null), (r._prev = null), r;
          }
          const i = new PO(t);
          return this._records.set(t, i), (i.currentValue = e), this._addToAdditions(i), i;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(i => e(t[i], i));
        }
      }
      class PO {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Zv() {
        return new Wa([new Wv()]);
      }
      let Wa = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (null != i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return { provide: n, useFactory: i => n.create(e, i || Zv()), deps: [[n, new vr(), new si()]] };
          }
          find(e) {
            const i = this.factories.find(r => r.supports(e));
            if (null != i) return i;
            throw new C(901, !1);
          }
        }
        return (n.ɵprov = T({ token: n, providedIn: 'root', factory: Zv })), n;
      })();
      function Qv() {
        return new es([new Yv()]);
      }
      let es = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return { provide: n, useFactory: i => n.create(e, i || Qv()), deps: [[n, new vr(), new si()]] };
          }
          find(e) {
            const i = this.factories.find(r => r.supports(e));
            if (i) return i;
            throw new C(901, !1);
          }
        }
        return (n.ɵprov = T({ token: n, providedIn: 'root', factory: Qv })), n;
      })();
      const VO = kv(null, 'core', []);
      let BO = (() => {
          class n {
            constructor(e) {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Jo));
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({})),
            n
          );
        })(),
        qa = null;
      function An() {
        return qa;
      }
      const Z = new E('DocumentToken');
      let Xv = (() => {
          class n {
            historyGo(e) {
              throw new Error('Not implemented');
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({
              token: n,
              factory: function () {
                return (function $O() {
                  return b(Jv);
                })();
              },
              providedIn: 'platform',
            })),
            n
          );
        })(),
        Jv = (() => {
          class n extends Xv {
            constructor(e) {
              super(), (this._doc = e), this._init();
            }
            _init() {
              (this.location = window.location), (this._history = window.history);
            }
            getBaseHrefFromDOM() {
              return An().getBaseHref(this._doc);
            }
            onPopState(e) {
              const i = An().getGlobalEventTarget(this._doc, 'window');
              return i.addEventListener('popstate', e, !1), () => i.removeEventListener('popstate', e);
            }
            onHashChange(e) {
              const i = An().getGlobalEventTarget(this._doc, 'window');
              return i.addEventListener('hashchange', e, !1), () => i.removeEventListener('hashchange', e);
            }
            get href() {
              return this.location.href;
            }
            get protocol() {
              return this.location.protocol;
            }
            get hostname() {
              return this.location.hostname;
            }
            get port() {
              return this.location.port;
            }
            get pathname() {
              return this.location.pathname;
            }
            get search() {
              return this.location.search;
            }
            get hash() {
              return this.location.hash;
            }
            set pathname(e) {
              this.location.pathname = e;
            }
            pushState(e, i, r) {
              eb() ? this._history.pushState(e, i, r) : (this.location.hash = r);
            }
            replaceState(e, i, r) {
              eb() ? this._history.replaceState(e, i, r) : (this.location.hash = r);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            historyGo(e = 0) {
              this._history.go(e);
            }
            getState() {
              return this._history.state;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z));
            }),
            (n.ɵprov = T({
              token: n,
              factory: function () {
                return (function UO() {
                  return new Jv(b(Z));
                })();
              },
              providedIn: 'platform',
            })),
            n
          );
        })();
      function eb() {
        return !!window.history.pushState;
      }
      function tb(n, t) {
        if (0 == n.length) return t;
        if (0 == t.length) return n;
        let e = 0;
        return (
          n.endsWith('/') && e++, t.startsWith('/') && e++, 2 == e ? n + t.substring(1) : 1 == e ? n + t : n + '/' + t
        );
      }
      function nb(n) {
        const t = n.match(/#|\?|$/),
          e = (t && t.index) || n.length;
        return n.slice(0, e - ('/' === n[e - 1] ? 1 : 0)) + n.slice(e);
      }
      function Hi(n) {
        return n && '?' !== n[0] ? '?' + n : n;
      }
      let qd = (() => {
        class n {
          historyGo(e) {
            throw new Error('Not implemented');
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = T({
            token: n,
            factory: function () {
              return oi(WO);
            },
            providedIn: 'root',
          })),
          n
        );
      })();
      const GO = new E('appBaseHref');
      let WO = (() => {
          class n extends qd {
            constructor(e, i) {
              super(),
                (this._platformLocation = e),
                (this._removeListenerFns = []),
                (this._baseHref = i ?? this._platformLocation.getBaseHrefFromDOM() ?? oi(Z).location?.origin ?? '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(e) {
              return tb(this._baseHref, e);
            }
            path(e = !1) {
              const i = this._platformLocation.pathname + Hi(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && e ? `${i}${r}` : i;
            }
            pushState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + Hi(o));
              this._platformLocation.pushState(e, i, s);
            }
            replaceState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + Hi(o));
              this._platformLocation.replaceState(e, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              this._platformLocation.historyGo?.(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Xv), b(GO, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        ib = (() => {
          class n {
            constructor(e) {
              (this._subject = new Y()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = e);
              const i = this._locationStrategy.getBaseHref();
              (this._baseHref = nb(rb(i))),
                this._locationStrategy.onPopState(r => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: r.state, type: r.type });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
            }
            path(e = !1) {
              return this.normalize(this._locationStrategy.path(e));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(e, i = '') {
              return this.path() == this.normalize(e + Hi(i));
            }
            normalize(e) {
              return n.stripTrailingSlash(
                (function KO(n, t) {
                  return n && t.startsWith(n) ? t.substring(n.length) : t;
                })(this._baseHref, rb(e))
              );
            }
            prepareExternalUrl(e) {
              return e && '/' !== e[0] && (e = '/' + e), this._locationStrategy.prepareExternalUrl(e);
            }
            go(e, i = '', r = null) {
              this._locationStrategy.pushState(r, '', e, i),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Hi(i)), r);
            }
            replaceState(e, i = '', r = null) {
              this._locationStrategy.replaceState(r, '', e, i),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Hi(i)), r);
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(e = 0) {
              this._locationStrategy.historyGo?.(e);
            }
            onUrlChange(e) {
              return (
                this._urlChangeListeners.push(e),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(i => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  })),
                () => {
                  const i = this._urlChangeListeners.indexOf(e);
                  this._urlChangeListeners.splice(i, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(e = '', i) {
              this._urlChangeListeners.forEach(r => r(e, i));
            }
            subscribe(e, i, r) {
              return this._subject.subscribe({ next: e, error: i, complete: r });
            }
          }
          return (
            (n.normalizeQueryParams = Hi),
            (n.joinWithSlash = tb),
            (n.stripTrailingSlash = nb),
            (n.ɵfac = function (e) {
              return new (e || n)(b(qd));
            }),
            (n.ɵprov = T({
              token: n,
              factory: function () {
                return (function qO() {
                  return new ib(b(qd));
                })();
              },
              providedIn: 'root',
            })),
            n
          );
        })();
      function rb(n) {
        return n.replace(/\/index.html$/, '');
      }
      function fb(n, t) {
        t = encodeURIComponent(t);
        for (const e of n.split(';')) {
          const i = e.indexOf('='),
            [r, o] = -1 == i ? [e, ''] : [e.slice(0, i), e.slice(i + 1)];
          if (r.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      let ih = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._iterableDiffers = e),
              (this._keyValueDiffers = i),
              (this._ngEl = r),
              (this._renderer = o),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(e) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses = 'string' == typeof e ? e.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(e) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof e ? e.split(/\s+/) : e),
              this._rawClass &&
                (Ho(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create())
                  : (this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const e = this._iterableDiffer.diff(this._rawClass);
              e && this._applyIterableChanges(e);
            } else if (this._keyValueDiffer) {
              const e = this._keyValueDiffer.diff(this._rawClass);
              e && this._applyKeyValueChanges(e);
            }
          }
          _applyKeyValueChanges(e) {
            e.forEachAddedItem(i => this._toggleClass(i.key, i.currentValue)),
              e.forEachChangedItem(i => this._toggleClass(i.key, i.currentValue)),
              e.forEachRemovedItem(i => {
                i.previousValue && this._toggleClass(i.key, !1);
              });
          }
          _applyIterableChanges(e) {
            e.forEachAddedItem(i => {
              if ('string' != typeof i.item)
                throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${ge(i.item)}`);
              this._toggleClass(i.item, !0);
            }),
              e.forEachRemovedItem(i => this._toggleClass(i.item, !1));
          }
          _applyClasses(e) {
            e &&
              (Array.isArray(e) || e instanceof Set
                ? e.forEach(i => this._toggleClass(i, !0))
                : Object.keys(e).forEach(i => this._toggleClass(i, !!e[i])));
          }
          _removeClasses(e) {
            e &&
              (Array.isArray(e) || e instanceof Set
                ? e.forEach(i => this._toggleClass(i, !1))
                : Object.keys(e).forEach(i => this._toggleClass(i, !1)));
          }
          _toggleClass(e, i) {
            (e = e.trim()) &&
              e.split(/\s+/g).forEach(r => {
                i
                  ? this._renderer.addClass(this._ngEl.nativeElement, r)
                  : this._renderer.removeClass(this._ngEl.nativeElement, r);
              });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(Wa), g(es), g(ye), g(ki));
          }),
          (n.ɵdir = x({
            type: n,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
            standalone: !0,
          })),
          n
        );
      })();
      class Ok {
        constructor(t, e, i, r) {
          (this.$implicit = t), (this.ngForOf = e), (this.index = i), (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let il = (() => {
        class n {
          constructor(e, i, r) {
            (this._viewContainer = e),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            this._trackByFn = e;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const e = this._ngForOf;
              !this._differ && e && (this._differ = this._differs.find(e).create(this.ngForTrackBy));
            }
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const i = this._viewContainer;
            e.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(this._template, new Ok(r.item, this._ngForOf, -1, -1), null === s ? void 0 : s);
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), gb(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange(r => {
              gb(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(Yt), g(Sn), g(Wa));
          }),
          (n.ɵdir = x({
            type: n,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
            standalone: !0,
          })),
          n
        );
      })();
      function gb(n, t) {
        n.context.$implicit = t.item;
      }
      let is = (() => {
        class n {
          constructor(e, i) {
            (this._viewContainer = e),
              (this._context = new Rk()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e), this._updateView();
          }
          set ngIfThen(e) {
            _b('ngIfThen', e), (this._thenTemplateRef = e), (this._thenViewRef = null), this._updateView();
          }
          set ngIfElse(e) {
            _b('ngIfElse', e), (this._elseTemplateRef = e), (this._elseViewRef = null), this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(Yt), g(Sn));
          }),
          (n.ɵdir = x({
            type: n,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
            standalone: !0,
          })),
          n
        );
      })();
      class Rk {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function _b(n, t) {
        if (t && !t.createEmbeddedView) throw new Error(`${n} must be a TemplateRef, but received '${ge(t)}'.`);
      }
      class rh {
        constructor(t, e) {
          (this._viewContainerRef = t), (this._templateRef = e), (this._created = !1);
        }
        create() {
          (this._created = !0), this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created ? this.create() : !t && this._created && this.destroy();
        }
      }
      let rs = (() => {
          class n {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(e) {
              (this._ngSwitch = e), 0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(e) {
              this._defaultViews || (this._defaultViews = []), this._defaultViews.push(e);
            }
            _matchCase(e) {
              const i = e == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || i),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                i
              );
            }
            _updateDefaultCases(e) {
              if (this._defaultViews && e !== this._defaultUsed) {
                this._defaultUsed = e;
                for (let i = 0; i < this._defaultViews.length; i++) this._defaultViews[i].enforceState(e);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'ngSwitch', '']],
              inputs: { ngSwitch: 'ngSwitch' },
              standalone: !0,
            })),
            n
          );
        })(),
        oh = (() => {
          class n {
            constructor(e, i, r) {
              (this.ngSwitch = r), r._addCase(), (this._view = new rh(e, i));
            }
            ngDoCheck() {
              this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Yt), g(Sn), g(rs, 9));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'ngSwitchCase', '']],
              inputs: { ngSwitchCase: 'ngSwitchCase' },
              standalone: !0,
            })),
            n
          );
        })(),
        yb = (() => {
          class n {
            constructor(e, i, r) {
              r._addDefault(new rh(e, i));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Yt), g(Sn), g(rs, 9));
            }),
            (n.ɵdir = x({ type: n, selectors: [['', 'ngSwitchDefault', '']], standalone: !0 })),
            n
          );
        })();
      class Vk {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: i => {
              throw i;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
      }
      class Bk {
        createSubscription(t, e) {
          return t.then(e, i => {
            throw i;
          });
        }
        dispose(t) {}
      }
      const Hk = new Bk(),
        jk = new Vk();
      let sh = (() => {
          class n {
            constructor(e) {
              (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null),
                (this._ref = e);
            }
            ngOnDestroy() {
              this._subscription && this._dispose(), (this._ref = null);
            }
            transform(e) {
              return this._obj
                ? e !== this._obj
                  ? (this._dispose(), this.transform(e))
                  : this._latestValue
                : (e && this._subscribe(e), this._latestValue);
            }
            _subscribe(e) {
              (this._obj = e),
                (this._strategy = this._selectStrategy(e)),
                (this._subscription = this._strategy.createSubscription(e, i => this._updateLatestValue(e, i)));
            }
            _selectStrategy(e) {
              if (xa(e)) return Hk;
              if (g_(e)) return jk;
              throw (function fn(n, t) {
                return new C(2100, !1);
              })();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(e, i) {
              e === this._obj && ((this._latestValue = i), this._ref.markForCheck());
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Tn, 16));
            }),
            (n.ɵpipe = bt({ name: 'async', type: n, pure: !1, standalone: !0 })),
            n
          );
        })(),
        qr = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({})),
            n
          );
        })();
      const wb = 'browser';
      class Db {}
      class dh extends class MR extends class zO {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function jO(n) {
            qa || (qa = n);
          })(new dh());
        }
        onAndCancel(t, e, i) {
          return (
            t.addEventListener(e, i, !1),
            () => {
              t.removeEventListener(e, i, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null;
        }
        getBaseHref(t) {
          const e = (function IR() {
            return (ss = ss || document.querySelector('base')), ss ? ss.getAttribute('href') : null;
          })();
          return null == e
            ? null
            : (function TR(n) {
                (ol = ol || document.createElement('a')), ol.setAttribute('href', n);
                const t = ol.pathname;
                return '/' === t.charAt(0) ? t : `/${t}`;
              })(e);
        }
        resetBaseElement() {
          ss = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return fb(document.cookie, t);
        }
      }
      let ol,
        ss = null;
      const Ib = new E('TRANSITION_ID'),
        xR = [
          {
            provide: Dv,
            useFactory: function AR(n, t, e) {
              return () => {
                e.get(Ha).donePromise.then(() => {
                  const i = An(),
                    r = t.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let o = 0; o < r.length; o++) i.remove(r[o]);
                });
              };
            },
            deps: [Ib, Z, qt],
            multi: !0,
          },
        ];
      let OR = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const sl = new E('EventManagerPlugins');
      let al = (() => {
        class n {
          constructor(e, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              e.forEach(r => (r.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, i, r) {
            return this._findPluginFor(i).addEventListener(e, i, r);
          }
          addGlobalEventListener(e, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(e, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const i = this._eventNameToPlugin.get(e);
            if (i) return i;
            const r = this._plugins;
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              if (s.supports(e)) return this._eventNameToPlugin.set(e, s), s;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(sl), b(ne));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Tb {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, i) {
          const r = An().getGlobalEventTarget(this._doc, t);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, i);
        }
      }
      let Ab = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const i = new Set();
              e.forEach(r => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        as = (() => {
          class n extends Ab {
            constructor(e) {
              super(), (this._doc = e), (this._hostNodes = new Map()), this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, i, r) {
              e.forEach(o => {
                const s = this._doc.createElement('style');
                (s.textContent = o), r.push(i.appendChild(s));
              });
            }
            addHost(e) {
              const i = [];
              this._addStylesToHost(this._stylesSet, e, i), this._hostNodes.set(e, i);
            }
            removeHost(e) {
              const i = this._hostNodes.get(e);
              i && i.forEach(xb), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(e, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach(e => e.forEach(xb));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function xb(n) {
        An().remove(n);
      }
      const hh = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        fh = /%COMP%/g;
      function ll(n, t, e) {
        for (let i = 0; i < t.length; i++) {
          let r = t[i];
          Array.isArray(r) ? ll(n, r, e) : ((r = r.replace(fh, n)), e.push(r));
        }
        return e;
      }
      function kb(n) {
        return t => {
          if ('__ngUnwrap__' === t) return n;
          !1 === n(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let cl = (() => {
        class n {
          constructor(e, i, r) {
            (this.eventManager = e),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ph(e));
          }
          createRenderer(e, i) {
            if (!e || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case nn.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new VR(this.eventManager, this.sharedStylesHost, i, this.appId)),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(e),
                  r
                );
              }
              case 1:
              case nn.ShadowDom:
                return new BR(this.eventManager, this.sharedStylesHost, e, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = ll(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r), this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(al), b(as), b(Wr));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class ph {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null)), (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(hh[e] || e, t) : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          (Pb(t) ? t.content : t).appendChild(e);
        }
        insertBefore(t, e, i) {
          t && (Pb(t) ? t.content : t).insertBefore(e, i);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let i = 'string' == typeof t ? document.querySelector(t) : t;
          if (!i) throw new Error(`The selector "${t}" did not match any elements`);
          return e || (i.textContent = ''), i;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, i, r) {
          if (r) {
            e = r + ':' + e;
            const o = hh[r];
            o ? t.setAttributeNS(o, e, i) : t.setAttribute(e, i);
          } else t.setAttribute(e, i);
        }
        removeAttribute(t, e, i) {
          if (i) {
            const r = hh[i];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${i}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, i, r) {
          r & (Ct.DashCase | Ct.Important)
            ? t.style.setProperty(e, i, r & Ct.Important ? 'important' : '')
            : (t.style[e] = i);
        }
        removeStyle(t, e, i) {
          i & Ct.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, i) {
          t[e] = i;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, i) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, kb(i))
            : this.eventManager.addEventListener(t, e, kb(i));
        }
      }
      function Pb(n) {
        return 'TEMPLATE' === n.tagName && void 0 !== n.content;
      }
      class VR extends ph {
        constructor(t, e, i, r) {
          super(t), (this.component = i);
          const o = ll(r + '-' + i.id, i.styles, []);
          e.addStyles(o),
            (this.contentAttr = (function PR(n) {
              return '_ngcontent-%COMP%'.replace(fh, n);
            })(r + '-' + i.id)),
            (this.hostAttr = (function NR(n) {
              return '_nghost-%COMP%'.replace(fh, n);
            })(r + '-' + i.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const i = super.createElement(t, e);
          return super.setAttribute(i, this.contentAttr, ''), i;
        }
      }
      class BR extends ph {
        constructor(t, e, i, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = ll(r.id, r.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement('style');
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, i) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, i);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
        }
      }
      let HR = (() => {
        class n extends Tb {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, i, r) {
            return e.addEventListener(i, r, !1), () => this.removeEventListener(e, i, r);
          }
          removeEventListener(e, i, r) {
            return e.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Z));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Nb = ['alt', 'control', 'meta', 'shift'],
        jR = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        zR = { alt: n => n.altKey, control: n => n.ctrlKey, meta: n => n.metaKey, shift: n => n.shiftKey };
      let $R = (() => {
        class n extends Tb {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != n.parseEventName(e);
          }
          addEventListener(e, i, r) {
            const o = n.parseEventName(i),
              s = n.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => An().onAndCancel(e, o.domEventName, s));
          }
          static parseEventName(e) {
            const i = e.toLowerCase().split('.'),
              r = i.shift();
            if (0 === i.length || ('keydown' !== r && 'keyup' !== r)) return null;
            const o = n._normalizeKey(i.pop());
            let s = '',
              a = i.indexOf('code');
            if (
              (a > -1 && (i.splice(a, 1), (s = 'code.')),
              Nb.forEach(c => {
                const u = i.indexOf(c);
                u > -1 && (i.splice(u, 1), (s += c + '.'));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = r), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(e, i) {
            let r = jR[e.key] || e.key,
              o = '';
            return (
              i.indexOf('code.') > -1 && ((r = e.code), (o = 'code.')),
              !(null == r || !r) &&
                ((r = r.toLowerCase()),
                ' ' === r ? (r = 'space') : '.' === r && (r = 'dot'),
                Nb.forEach(s => {
                  s !== r && (0, zR[s])(e) && (o += s + '.');
                }),
                (o += r),
                o === i)
            );
          }
          static eventCallback(e, i, r) {
            return o => {
              n.matchEventFullKeyCode(o, e) && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(e) {
            return 'esc' === e ? 'escape' : e;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Z));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const qR = kv(VO, 'browser', [
          { provide: ja, useValue: wb },
          {
            provide: Sv,
            useValue: function UR() {
              dh.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Z,
            useFactory: function WR() {
              return (
                (function QS(n) {
                  eu = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Bb = new E(''),
        Hb = [
          {
            provide: za,
            useClass: class FR {
              addToWindow(t) {
                (_e.getAngularTestability = (i, r = !0) => {
                  const o = t.findTestabilityInTree(i, r);
                  if (null == o) throw new Error('Could not find testability for element.');
                  return o;
                }),
                  (_e.getAllAngularTestabilities = () => t.getAllTestabilities()),
                  (_e.getAllAngularRootElements = () => t.getAllRootElements()),
                  _e.frameworkStabilizers || (_e.frameworkStabilizers = []),
                  _e.frameworkStabilizers.push(i => {
                    const r = _e.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, e, i) {
                return null == e
                  ? null
                  : t.getTestability(e) ??
                      (i
                        ? An().isShadowRoot(e)
                          ? this.findTestabilityInTree(t, e.host, !0)
                          : this.findTestabilityInTree(t, e.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: xv, useClass: Ld, deps: [ne, Vd, za] },
          { provide: Ld, useClass: Ld, deps: [ne, Vd, za] },
        ],
        jb = [
          { provide: cu, useValue: 'root' },
          {
            provide: jn,
            useFactory: function GR() {
              return new jn();
            },
            deps: [],
          },
          { provide: sl, useClass: HR, multi: !0, deps: [Z, ne, ja] },
          { provide: sl, useClass: $R, multi: !0, deps: [Z] },
          { provide: cl, useClass: cl, deps: [al, as, Wr] },
          { provide: Ro, useExisting: cl },
          { provide: Ab, useExisting: as },
          { provide: as, useClass: as, deps: [Z] },
          { provide: al, useClass: al, deps: [sl, ne] },
          { provide: Db, useClass: OR, deps: [] },
          [],
        ];
      let zb = (() => {
        class n {
          constructor(e) {}
          static withServerTransition(e) {
            return {
              ngModule: n,
              providers: [{ provide: Wr, useValue: e.appId }, { provide: Ib, useExisting: Wr }, xR],
            };
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Bb, 12));
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({ providers: [...jb, ...Hb], imports: [qr, BO] })),
          n
        );
      })();
      typeof window < 'u' && window;
      let _h = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({
              token: n,
              factory: function (e) {
                let i = null;
                return (i = e ? new (e || n)() : b(Gb)), i;
              },
              providedIn: 'root',
            })),
            n
          );
        })(),
        Gb = (() => {
          class n extends _h {
            constructor(e) {
              super(), (this._doc = e);
            }
            sanitize(e, i) {
              if (null == i) return null;
              switch (e) {
                case ce.NONE:
                  return i;
                case ce.HTML:
                  return bn(i, 'HTML') ? Rt(i) : Em(this._doc, String(i)).toString();
                case ce.STYLE:
                  return bn(i, 'Style') ? Rt(i) : i;
                case ce.SCRIPT:
                  if (bn(i, 'Script')) return Rt(i);
                  throw new Error('unsafe value used in a script context');
                case ce.URL:
                  return bn(i, 'URL') ? Rt(i) : ua(String(i));
                case ce.RESOURCE_URL:
                  if (bn(i, 'ResourceURL')) return Rt(i);
                  throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');
                default:
                  throw new Error(`Unexpected SecurityContext ${e} (see https://g.co/ng/security#xss)`);
              }
            }
            bypassSecurityTrustHtml(e) {
              return (function sM(n) {
                return new eM(n);
              })(e);
            }
            bypassSecurityTrustStyle(e) {
              return (function aM(n) {
                return new tM(n);
              })(e);
            }
            bypassSecurityTrustScript(e) {
              return (function lM(n) {
                return new nM(n);
              })(e);
            }
            bypassSecurityTrustUrl(e) {
              return (function cM(n) {
                return new iM(n);
              })(e);
            }
            bypassSecurityTrustResourceUrl(e) {
              return (function uM(n) {
                return new rM(n);
              })(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z));
            }),
            (n.ɵprov = T({
              token: n,
              factory: function (e) {
                let i = null;
                return (
                  (i = e
                    ? new e()
                    : (function nP(n) {
                        return new Gb(n.get(Z));
                      })(b(qt))),
                  i
                );
              },
              providedIn: 'root',
            })),
            n
          );
        })();
      const { isArray: iP } = Array,
        { getPrototypeOf: rP, prototype: oP, keys: sP } = Object;
      function Wb(n) {
        if (1 === n.length) {
          const t = n[0];
          if (iP(t)) return { args: t, keys: null };
          if (
            (function aP(n) {
              return n && 'object' == typeof n && rP(n) === oP;
            })(t)
          ) {
            const e = sP(t);
            return { args: e.map(i => t[i]), keys: e };
          }
        }
        return { args: n, keys: null };
      }
      const { isArray: lP } = Array;
      function yh(n) {
        return Ze(t =>
          (function cP(n, t) {
            return lP(t) ? n(...t) : n(t);
          })(n, t)
        );
      }
      function qb(n, t) {
        return n.reduce((e, i, r) => ((e[i] = t[r]), e), {});
      }
      function Kb(...n) {
        const t = cp(n),
          { args: e, keys: i } = Wb(n),
          r = new be(o => {
            const { length: s } = e;
            if (!s) return void o.complete();
            const a = new Array(s);
            let l = s,
              c = s;
            for (let u = 0; u < s; u++) {
              let d = !1;
              vt(e[u]).subscribe(
                Le(
                  o,
                  h => {
                    d || ((d = !0), c--), (a[u] = h);
                  },
                  () => l--,
                  void 0,
                  () => {
                    (!l || !d) && (c || o.next(i ? qb(i, a) : a), o.complete());
                  }
                )
              );
            }
          });
        return t ? r.pipe(yh(t)) : r;
      }
      function mi(n) {
        return null == n || (('string' == typeof n || Array.isArray(n)) && 0 === n.length);
      }
      function Qb(n) {
        return null != n && 'number' == typeof n.length;
      }
      const at = new E('NgValidators'),
        gi = new E('NgAsyncValidators'),
        mP =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Xb {
        static min(t) {
          return (function Jb(n) {
            return t => {
              if (mi(t.value) || mi(n)) return null;
              const e = parseFloat(t.value);
              return !isNaN(e) && e < n ? { min: { min: n, actual: t.value } } : null;
            };
          })(t);
        }
        static max(t) {
          return (function ew(n) {
            return t => {
              if (mi(t.value) || mi(n)) return null;
              const e = parseFloat(t.value);
              return !isNaN(e) && e > n ? { max: { max: n, actual: t.value } } : null;
            };
          })(t);
        }
        static required(t) {
          return (function tw(n) {
            return mi(n.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function nw(n) {
            return !0 === n.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function iw(n) {
            return mi(n.value) || mP.test(n.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function rw(n) {
            return t =>
              mi(t.value) || !Qb(t.value)
                ? null
                : t.value.length < n
                ? { minlength: { requiredLength: n, actualLength: t.value.length } }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function ow(n) {
            return t =>
              Qb(t.value) && t.value.length > n
                ? { maxlength: { requiredLength: n, actualLength: t.value.length } }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function sw(n) {
            if (!n) return ul;
            let t, e;
            return (
              'string' == typeof n
                ? ((e = ''),
                  '^' !== n.charAt(0) && (e += '^'),
                  (e += n),
                  '$' !== n.charAt(n.length - 1) && (e += '$'),
                  (t = new RegExp(e)))
                : ((e = n.toString()), (t = n)),
              i => {
                if (mi(i.value)) return null;
                const r = i.value;
                return t.test(r) ? null : { pattern: { requiredPattern: e, actualValue: r } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return hw(t);
        }
        static composeAsync(t) {
          return fw(t);
        }
      }
      function ul(n) {
        return null;
      }
      function aw(n) {
        return null != n;
      }
      function lw(n) {
        return xa(n) ? tr(n) : n;
      }
      function cw(n) {
        let t = {};
        return (
          n.forEach(e => {
            t = null != e ? { ...t, ...e } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function uw(n, t) {
        return t.map(e => e(n));
      }
      function dw(n) {
        return n.map(t =>
          (function gP(n) {
            return !n.validate;
          })(t)
            ? t
            : e => t.validate(e)
        );
      }
      function hw(n) {
        if (!n) return null;
        const t = n.filter(aw);
        return 0 == t.length
          ? null
          : function (e) {
              return cw(uw(e, t));
            };
      }
      function bh(n) {
        return null != n ? hw(dw(n)) : null;
      }
      function fw(n) {
        if (!n) return null;
        const t = n.filter(aw);
        return 0 == t.length
          ? null
          : function (e) {
              return Kb(uw(e, t).map(lw)).pipe(Ze(cw));
            };
      }
      function wh(n) {
        return null != n ? fw(dw(n)) : null;
      }
      function pw(n, t) {
        return null === n ? [t] : Array.isArray(n) ? [...n, t] : [n, t];
      }
      function mw(n) {
        return n._rawValidators;
      }
      function gw(n) {
        return n._rawAsyncValidators;
      }
      function Ch(n) {
        return n ? (Array.isArray(n) ? n : [n]) : [];
      }
      function dl(n, t) {
        return Array.isArray(n) ? n.includes(t) : n === t;
      }
      function _w(n, t) {
        const e = Ch(t);
        return (
          Ch(n).forEach(r => {
            dl(e, r) || e.push(r);
          }),
          e
        );
      }
      function yw(n, t) {
        return Ch(t).filter(e => !dl(n, e));
      }
      class vw {
        constructor() {
          (this._rawValidators = []), (this._rawAsyncValidators = []), (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []), (this._composedValidatorFn = bh(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []), (this._composedAsyncValidatorFn = wh(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach(t => t()), (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, e) {
          return !!this.control && this.control.hasError(t, e);
        }
        getError(t, e) {
          return this.control ? this.control.getError(t, e) : null;
        }
      }
      class yt extends vw {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Fn extends vw {
        constructor() {
          super(...arguments), (this._parent = null), (this.name = null), (this.valueAccessor = null);
        }
      }
      const ls = 'VALID',
        fl = 'INVALID',
        Kr = 'PENDING',
        cs = 'DISABLED';
      function Mh(n) {
        return (pl(n) ? n.validators : n) || null;
      }
      function Cw(n) {
        return Array.isArray(n) ? bh(n) : n || null;
      }
      function Ih(n, t) {
        return (pl(t) ? t.asyncValidators : n) || null;
      }
      function Dw(n) {
        return Array.isArray(n) ? wh(n) : n || null;
      }
      function pl(n) {
        return null != n && !Array.isArray(n) && 'object' == typeof n;
      }
      class Mw {
        constructor(t, e) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = Cw(this._rawValidators)),
            (this._composedAsyncValidatorFn = Dw(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === ls;
        }
        get invalid() {
          return this.status === fl;
        }
        get pending() {
          return this.status == Kr;
        }
        get disabled() {
          return this.status === cs;
        }
        get enabled() {
          return this.status !== cs;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = Cw(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t), (this._composedAsyncValidatorFn = Dw(t));
        }
        addValidators(t) {
          this.setValidators(_w(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(_w(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(yw(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(yw(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return dl(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return dl(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0), this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }), this._forEachChild(t => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(e => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1), this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(e => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Kr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = cs),
            (this.errors = null),
            this._forEachChild(i => {
              i.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach(i => i(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = ls),
            this._forEachChild(i => {
              i.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent }),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach(i => i(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === ls || this.status === Kr) && this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild(e => e._updateTreeValidity(t)),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? cs : ls;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Kr), (this._hasOwnPendingAsyncValidator = !0);
            const e = lw(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe(i => {
              (this._hasOwnPendingAsyncValidator = !1), this.setErrors(i, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(), (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          let e = t;
          return null == e || (Array.isArray(e) || (e = e.split('.')), 0 === e.length)
            ? null
            : e.reduce((i, r) => i && i._find(r), this);
        }
        getError(t, e) {
          const i = e ? this.get(e) : this;
          return i && i.errors ? i.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Y()), (this.statusChanges = new Y());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? cs
            : this.errors
            ? fl
            : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Kr)
            ? Kr
            : this._anyControlsHaveStatus(fl)
            ? fl
            : ls;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls(e => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls(t => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(t => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()), this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()), this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          pl(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
        }
        _find(t) {
          return null;
        }
      }
      class Th extends Mw {
        constructor(t, e, i) {
          super(Mh(e), Ih(i, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e), e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e);
        }
        addControl(t, e, i = {}) {
          this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, e = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, e, i = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          (function Sw(n, t, e) {
            n._forEachChild((i, r) => {
              if (void 0 === e[r]) throw new C(1002, '');
            });
          })(this, 0, t),
            Object.keys(t).forEach(i => {
              (function Ew(n, t, e) {
                const i = n.controls;
                if (!(t ? Object.keys(i) : i).length) throw new C(1e3, '');
                if (!i[e]) throw new C(1001, '');
              })(this, !0, i),
                this.controls[i].setValue(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (Object.keys(t).forEach(i => {
              const r = this.controls[i];
              r && r.patchValue(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = {}, e = {}) {
          this._forEachChild((i, r) => {
            i.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren({}, (t, e, i) => ((t[i] = e.getRawValue()), t));
        }
        _syncPendingControls() {
          let t = this._reduceChildren(!1, (e, i) => !!i._syncPendingControls() || e);
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach(e => {
            const i = this.controls[e];
            i && t(i, e);
          });
        }
        _setUpControls() {
          this._forEachChild(t => {
            t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [e, i] of Object.entries(this.controls)) if (this.contains(e) && t(i)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren({}, (e, i, r) => ((i.enabled || this.disabled) && (e[r] = i.value), e));
        }
        _reduceChildren(t, e) {
          let i = t;
          return (
            this._forEachChild((r, o) => {
              i = e(i, r, o);
            }),
            i
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls)) if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      function us(n, t) {
        Ah(n, t),
          t.valueAccessor.writeValue(n.value),
          n.disabled && t.valueAccessor.setDisabledState?.(!0),
          (function IP(n, t) {
            t.valueAccessor.registerOnChange(e => {
              (n._pendingValue = e),
                (n._pendingChange = !0),
                (n._pendingDirty = !0),
                'change' === n.updateOn && Iw(n, t);
            });
          })(n, t),
          (function AP(n, t) {
            const e = (i, r) => {
              t.valueAccessor.writeValue(i), r && t.viewToModelUpdate(i);
            };
            n.registerOnChange(e),
              t._registerOnDestroy(() => {
                n._unregisterOnChange(e);
              });
          })(n, t),
          (function TP(n, t) {
            t.valueAccessor.registerOnTouched(() => {
              (n._pendingTouched = !0),
                'blur' === n.updateOn && n._pendingChange && Iw(n, t),
                'submit' !== n.updateOn && n.markAsTouched();
            });
          })(n, t),
          (function MP(n, t) {
            if (t.valueAccessor.setDisabledState) {
              const e = i => {
                t.valueAccessor.setDisabledState(i);
              };
              n.registerOnDisabledChange(e),
                t._registerOnDestroy(() => {
                  n._unregisterOnDisabledChange(e);
                });
            }
          })(n, t);
      }
      function gl(n, t, e = !0) {
        const i = () => {};
        t.valueAccessor && (t.valueAccessor.registerOnChange(i), t.valueAccessor.registerOnTouched(i)),
          yl(n, t),
          n && (t._invokeOnDestroyCallbacks(), n._registerOnCollectionChange(() => {}));
      }
      function _l(n, t) {
        n.forEach(e => {
          e.registerOnValidatorChange && e.registerOnValidatorChange(t);
        });
      }
      function Ah(n, t) {
        const e = mw(n);
        null !== t.validator ? n.setValidators(pw(e, t.validator)) : 'function' == typeof e && n.setValidators([e]);
        const i = gw(n);
        null !== t.asyncValidator
          ? n.setAsyncValidators(pw(i, t.asyncValidator))
          : 'function' == typeof i && n.setAsyncValidators([i]);
        const r = () => n.updateValueAndValidity();
        _l(t._rawValidators, r), _l(t._rawAsyncValidators, r);
      }
      function yl(n, t) {
        let e = !1;
        if (null !== n) {
          if (null !== t.validator) {
            const r = mw(n);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter(s => s !== t.validator);
              o.length !== r.length && ((e = !0), n.setValidators(o));
            }
          }
          if (null !== t.asyncValidator) {
            const r = gw(n);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter(s => s !== t.asyncValidator);
              o.length !== r.length && ((e = !0), n.setAsyncValidators(o));
            }
          }
        }
        const i = () => {};
        return _l(t._rawValidators, i), _l(t._rawAsyncValidators, i), e;
      }
      function Iw(n, t) {
        n._pendingDirty && n.markAsDirty(),
          n.setValue(n._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(n._pendingValue),
          (n._pendingChange = !1);
      }
      function Tw(n, t) {
        Ah(n, t);
      }
      function xw(n, t) {
        n._syncPendingControls(),
          t.forEach(e => {
            const i = e.control;
            'submit' === i.updateOn &&
              i._pendingChange &&
              (e.viewToModelUpdate(i._pendingValue), (i._pendingChange = !1));
          });
      }
      const RP = { provide: yt, useExisting: we(() => hs) },
        ds = (() => Promise.resolve())();
      let hs = (() => {
        class n extends yt {
          constructor(e, i) {
            super(),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new Y()),
              (this.form = new Th({}, bh(e), wh(i)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(e) {
            ds.then(() => {
              const i = this._findContainer(e.path);
              (e.control = i.registerControl(e.name, e.control)),
                us(e.control, e),
                e.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(e);
            });
          }
          getControl(e) {
            return this.form.get(e.path);
          }
          removeControl(e) {
            ds.then(() => {
              const i = this._findContainer(e.path);
              i && i.removeControl(e.name), this._directives.delete(e);
            });
          }
          addFormGroup(e) {
            ds.then(() => {
              const i = this._findContainer(e.path),
                r = new Th({});
              Tw(r, e), i.registerControl(e.name, r), r.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(e) {
            ds.then(() => {
              const i = this._findContainer(e.path);
              i && i.removeControl(e.name);
            });
          }
          getFormGroup(e) {
            return this.form.get(e.path);
          }
          updateModel(e, i) {
            ds.then(() => {
              this.form.get(e.path).setValue(i);
            });
          }
          setValue(e) {
            this.control.setValue(e);
          }
          onSubmit(e) {
            return (
              (this.submitted = !0),
              xw(this.form, this._directives),
              this.ngSubmit.emit(e),
              'dialog' === e?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(e) {
            this.form.reset(e), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(e) {
            return e.pop(), e.length ? this.form.get(e) : this.form;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(at, 10), g(gi, 10));
          }),
          (n.ɵdir = x({
            type: n,
            selectors: [['form', 3, 'ngNoForm', '', 3, 'formGroup', ''], ['ng-form'], ['', 'ngForm', '']],
            hostBindings: function (e, i) {
              1 & e &&
                X('submit', function (o) {
                  return i.onSubmit(o);
                })('reset', function () {
                  return i.onReset();
                });
            },
            inputs: { options: ['ngFormOptions', 'options'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [fe([RP]), G],
          })),
          n
        );
      })();
      function Fw(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      function Ow(n) {
        return 'object' == typeof n && null !== n && 2 === Object.keys(n).length && 'value' in n && 'disabled' in n;
      }
      const kw = class extends Mw {
        constructor(t = null, e, i) {
          super(Mh(e), Ih(i, e)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }),
            pl(e) && (e.nonNullable || e.initialValueIsDefault) && (this.defaultValue = Ow(t) ? t.value : t);
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach(i => i(this.value, !1 !== e.emitViewToModelChange)),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = this.defaultValue, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          Fw(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          Fw(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), 0)
          );
        }
        _applyFormState(t) {
          Ow(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled ? this.disable({ onlySelf: !0, emitEvent: !1 }) : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let Bw = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({})),
          n
        );
      })();
      const UP = { provide: yt, useExisting: we(() => fs) };
      let fs = (() => {
          class n extends yt {
            constructor(e, i) {
              super(),
                (this.submitted = !1),
                (this._onCollectionChange = () => this._updateDomValue()),
                (this.directives = []),
                (this.form = null),
                (this.ngSubmit = new Y()),
                this._setValidators(e),
                this._setAsyncValidators(i);
            }
            ngOnChanges(e) {
              this._checkFormPresent(),
                e.hasOwnProperty('form') &&
                  (this._updateValidators(),
                  this._updateDomValue(),
                  this._updateRegistrations(),
                  (this._oldForm = this.form));
            }
            ngOnDestroy() {
              this.form &&
                (yl(this.form, this),
                this.form._onCollectionChange === this._onCollectionChange &&
                  this.form._registerOnCollectionChange(() => {}));
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            addControl(e) {
              const i = this.form.get(e.path);
              return us(i, e), i.updateValueAndValidity({ emitEvent: !1 }), this.directives.push(e), i;
            }
            getControl(e) {
              return this.form.get(e.path);
            }
            removeControl(e) {
              gl(e.control || null, e, !1),
                (function kP(n, t) {
                  const e = n.indexOf(t);
                  e > -1 && n.splice(e, 1);
                })(this.directives, e);
            }
            addFormGroup(e) {
              this._setUpFormContainer(e);
            }
            removeFormGroup(e) {
              this._cleanUpFormContainer(e);
            }
            getFormGroup(e) {
              return this.form.get(e.path);
            }
            addFormArray(e) {
              this._setUpFormContainer(e);
            }
            removeFormArray(e) {
              this._cleanUpFormContainer(e);
            }
            getFormArray(e) {
              return this.form.get(e.path);
            }
            updateModel(e, i) {
              this.form.get(e.path).setValue(i);
            }
            onSubmit(e) {
              return (
                (this.submitted = !0),
                xw(this.form, this.directives),
                this.ngSubmit.emit(e),
                'dialog' === e?.target?.method
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(e) {
              this.form.reset(e), (this.submitted = !1);
            }
            _updateDomValue() {
              this.directives.forEach(e => {
                const i = e.control,
                  r = this.form.get(e.path);
                i !== r && (gl(i || null, e), (n => n instanceof kw)(r) && (us(r, e), (e.control = r)));
              }),
                this.form._updateTreeValidity({ emitEvent: !1 });
            }
            _setUpFormContainer(e) {
              const i = this.form.get(e.path);
              Tw(i, e), i.updateValueAndValidity({ emitEvent: !1 });
            }
            _cleanUpFormContainer(e) {
              if (this.form) {
                const i = this.form.get(e.path);
                i &&
                  (function xP(n, t) {
                    return yl(n, t);
                  })(i, e) &&
                  i.updateValueAndValidity({ emitEvent: !1 });
              }
            }
            _updateRegistrations() {
              this.form._registerOnCollectionChange(this._onCollectionChange),
                this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
            }
            _updateValidators() {
              Ah(this.form, this), this._oldForm && yl(this._oldForm, this);
            }
            _checkFormPresent() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(at, 10), g(gi, 10));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'formGroup', '']],
              hostBindings: function (e, i) {
                1 & e &&
                  X('submit', function (o) {
                    return i.onSubmit(o);
                  })('reset', function () {
                    return i.onReset();
                  });
              },
              inputs: { form: ['formGroup', 'form'] },
              outputs: { ngSubmit: 'ngSubmit' },
              exportAs: ['ngForm'],
              features: [fe([UP]), G, Ut],
            })),
            n
          );
        })(),
        lN = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [Bw] })),
            n
          );
        })(),
        cN = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [lN] })),
            n
          );
        })();
      function _i(...n) {
        return tr(n, uo(n));
      }
      function Yr(n, t) {
        return qe((e, i) => {
          let r = 0;
          e.subscribe(Le(i, o => n.call(t, o, r++) && i.next(o)));
        });
      }
      class iC {}
      class rC {}
      class Yn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach(e => {
                            const i = e.indexOf(':');
                            if (i > 0) {
                              const r = e.slice(0, i),
                                o = r.toLowerCase(),
                                s = e.slice(i + 1).trim();
                              this.maybeSetNormalizedName(r, o),
                                this.headers.has(o) ? this.headers.get(o).push(s) : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach(e => {
                            let i = t[e];
                            const r = e.toLowerCase();
                            'string' == typeof i && (i = [i]),
                              i.length > 0 && (this.headers.set(r, i), this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: 'a' });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: 'd' });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Yn ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach(e => {
              this.headers.set(e, t.headers.get(e)), this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Yn();
          return (
            (e.lazyInit = this.lazyInit && this.lazyInit instanceof Yn ? this.lazyInit : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let i = t.value;
              if (('string' == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ('a' === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...i), this.headers.set(e, r);
              break;
            case 'd':
              const o = t.value;
              if (o) {
                let s = this.headers.get(e);
                if (!s) return;
                (s = s.filter(a => -1 === o.indexOf(a))),
                  0 === s.length ? (this.headers.delete(e), this.normalizedNames.delete(e)) : this.headers.set(e, s);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(e => t(this.normalizedNames.get(e), this.headers.get(e)));
        }
      }
      class hN {
        encodeKey(t) {
          return oC(t);
        }
        encodeValue(t) {
          return oC(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const pN = /%(\d[a-f0-9])/gi,
        mN = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
      function oC(n) {
        return encodeURIComponent(n).replace(pN, (t, e) => mN[e] ?? t);
      }
      function vl(n) {
        return `${n}`;
      }
      class yi {
        constructor(t = {}) {
          if (((this.updates = null), (this.cloneFrom = null), (this.encoder = t.encoder || new hN()), t.fromString)) {
            if (t.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function fN(n, t) {
              const e = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach(r => {
                      const o = r.indexOf('='),
                        [s, a] =
                          -1 == o ? [t.decodeKey(r), ''] : [t.decodeKey(r.slice(0, o)), t.decodeValue(r.slice(o + 1))],
                        l = e.get(s) || [];
                      l.push(a), e.set(s, l);
                    }),
                e
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach(e => {
                  const i = t.fromObject[e],
                    r = Array.isArray(i) ? i.map(vl) : [vl(i)];
                  this.map.set(e, r);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: 'a' });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach(i => {
              const r = t[i];
              Array.isArray(r)
                ? r.forEach(o => {
                    e.push({ param: i, value: o, op: 'a' });
                  })
                : e.push({ param: i, value: r, op: 'a' });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(t => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map(i => e + '=' + this.encoder.encodeValue(i))
                  .join('&');
              })
              .filter(t => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const e = new yi({ encoder: this.encoder });
          return (e.cloneFrom = this.cloneFrom || this), (e.updates = (this.updates || []).concat(t)), e;
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach(t => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const e = ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(vl(t.value)), this.map.set(t.param, e);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let i = this.map.get(t.param) || [];
                      const r = i.indexOf(vl(t.value));
                      -1 !== r && i.splice(r, 1), i.length > 0 ? this.map.set(t.param, i) : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class gN {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function sC(n) {
        return typeof ArrayBuffer < 'u' && n instanceof ArrayBuffer;
      }
      function aC(n) {
        return typeof Blob < 'u' && n instanceof Blob;
      }
      function lC(n) {
        return typeof FormData < 'u' && n instanceof FormData;
      }
      class ps {
        constructor(t, e, i, r) {
          let o;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function _N(n) {
              switch (n) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (o = r))
              : (o = i),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Yn()),
            this.context || (this.context = new gN()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = e;
            else {
              const a = e.indexOf('?');
              this.urlWithParams = e + (-1 === a ? '?' : a < e.length - 1 ? '&' : '') + s;
            }
          } else (this.params = new yi()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : sC(this.body) ||
              aC(this.body) ||
              lC(this.body) ||
              (function yN(n) {
                return typeof URLSearchParams < 'u' && n instanceof URLSearchParams;
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof yi
            ? this.body.toString()
            : 'object' == typeof this.body || 'boolean' == typeof this.body || Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || lC(this.body)
            ? null
            : aC(this.body)
            ? this.body.type || null
            : sC(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof yi
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body || 'number' == typeof this.body || 'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            i = t.url || this.url,
            r = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
            a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders && (l = Object.keys(t.setHeaders).reduce((d, h) => d.set(h, t.setHeaders[h]), l)),
            t.setParams && (c = Object.keys(t.setParams).reduce((d, h) => d.set(h, t.setParams[h]), c)),
            new ps(e, i, o, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: s,
            })
          );
        }
      }
      var je = (() => (
        ((je = je || {})[(je.Sent = 0)] = 'Sent'),
        (je[(je.UploadProgress = 1)] = 'UploadProgress'),
        (je[(je.ResponseHeader = 2)] = 'ResponseHeader'),
        (je[(je.DownloadProgress = 3)] = 'DownloadProgress'),
        (je[(je.Response = 4)] = 'Response'),
        (je[(je.User = 5)] = 'User'),
        je
      ))();
      class Lh {
        constructor(t, e = 200, i = 'OK') {
          (this.headers = t.headers || new Yn()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || i),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Vh extends Lh {
        constructor(t = {}) {
          super(t), (this.type = je.ResponseHeader);
        }
        clone(t = {}) {
          return new Vh({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class bl extends Lh {
        constructor(t = {}) {
          super(t), (this.type = je.Response), (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new bl({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class cC extends Lh {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${t.status} ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Bh(n, t) {
        return {
          body: t,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let wl = (() => {
        class n {
          constructor(e) {
            this.handler = e;
          }
          request(e, i, r = {}) {
            let o;
            if (e instanceof ps) o = e;
            else {
              let l, c;
              (l = r.headers instanceof Yn ? r.headers : new Yn(r.headers)),
                r.params && (c = r.params instanceof yi ? r.params : new yi({ fromObject: r.params })),
                (o = new ps(e, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || 'json',
                  withCredentials: r.withCredentials,
                }));
            }
            const s = _i(o).pipe(
              (function dN(n, t) {
                return ie(t) ? co(n, t, 1) : co(n, 1);
              })(l => this.handler.handle(l))
            );
            if (e instanceof ps || 'events' === r.observe) return s;
            const a = s.pipe(Yr(l => l instanceof bl));
            switch (r.observe || 'body') {
              case 'body':
                switch (o.responseType) {
                  case 'arraybuffer':
                    return a.pipe(
                      Ze(l => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return l.body;
                      })
                    );
                  case 'blob':
                    return a.pipe(
                      Ze(l => {
                        if (null !== l.body && !(l.body instanceof Blob)) throw new Error('Response is not a Blob.');
                        return l.body;
                      })
                    );
                  case 'text':
                    return a.pipe(
                      Ze(l => {
                        if (null !== l.body && 'string' != typeof l.body) throw new Error('Response is not a string.');
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(Ze(l => l.body));
                }
              case 'response':
                return a;
              default:
                throw new Error(`Unreachable: unhandled observe type ${r.observe}}`);
            }
          }
          delete(e, i = {}) {
            return this.request('DELETE', e, i);
          }
          get(e, i = {}) {
            return this.request('GET', e, i);
          }
          head(e, i = {}) {
            return this.request('HEAD', e, i);
          }
          jsonp(e, i) {
            return this.request('JSONP', e, {
              params: new yi().append(i, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(e, i = {}) {
            return this.request('OPTIONS', e, i);
          }
          patch(e, i, r = {}) {
            return this.request('PATCH', e, Bh(r, i));
          }
          post(e, i, r = {}) {
            return this.request('POST', e, Bh(r, i));
          }
          put(e, i, r = {}) {
            return this.request('PUT', e, Bh(r, i));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(iC));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class uC {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const dC = new E('HTTP_INTERCEPTORS');
      let vN = (() => {
        class n {
          intercept(e, i) {
            return i.handle(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const bN = /^\)\]\}',?\n/;
      let hC = (() => {
        class n {
          constructor(e) {
            this.xhrFactory = e;
          }
          handle(e) {
            if ('JSONP' === e.method)
              throw new Error('Attempted to construct Jsonp request without HttpClientJsonpModule installed.');
            return new be(i => {
              const r = this.xhrFactory.build();
              if (
                (r.open(e.method, e.urlWithParams),
                e.withCredentials && (r.withCredentials = !0),
                e.headers.forEach((f, p) => r.setRequestHeader(f, p.join(','))),
                e.headers.has('Accept') || r.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                !e.headers.has('Content-Type'))
              ) {
                const f = e.detectContentTypeHeader();
                null !== f && r.setRequestHeader('Content-Type', f);
              }
              if (e.responseType) {
                const f = e.responseType.toLowerCase();
                r.responseType = 'json' !== f ? f : 'text';
              }
              const o = e.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const f = r.statusText || 'OK',
                    p = new Yn(r.getAllResponseHeaders()),
                    m =
                      (function wN(n) {
                        return 'responseURL' in n && n.responseURL
                          ? n.responseURL
                          : /^X-Request-URL:/m.test(n.getAllResponseHeaders())
                          ? n.getResponseHeader('X-Request-URL')
                          : null;
                      })(r) || e.url;
                  return (s = new Vh({ headers: p, status: r.status, statusText: f, url: m })), s;
                },
                l = () => {
                  let { headers: f, status: p, statusText: m, url: _ } = a(),
                    y = null;
                  204 !== p && (y = typeof r.response > 'u' ? r.responseText : r.response),
                    0 === p && (p = y ? 200 : 0);
                  let D = p >= 200 && p < 300;
                  if ('json' === e.responseType && 'string' == typeof y) {
                    const v = y;
                    y = y.replace(bN, '');
                    try {
                      y = '' !== y ? JSON.parse(y) : null;
                    } catch (S) {
                      (y = v), D && ((D = !1), (y = { error: S, text: y }));
                    }
                  }
                  D
                    ? (i.next(new bl({ body: y, headers: f, status: p, statusText: m, url: _ || void 0 })),
                      i.complete())
                    : i.error(new cC({ error: y, headers: f, status: p, statusText: m, url: _ || void 0 }));
                },
                c = f => {
                  const { url: p } = a(),
                    m = new cC({
                      error: f,
                      status: r.status || 0,
                      statusText: r.statusText || 'Unknown Error',
                      url: p || void 0,
                    });
                  i.error(m);
                };
              let u = !1;
              const d = f => {
                  u || (i.next(a()), (u = !0));
                  let p = { type: je.DownloadProgress, loaded: f.loaded };
                  f.lengthComputable && (p.total = f.total),
                    'text' === e.responseType && !!r.responseText && (p.partialText = r.responseText),
                    i.next(p);
                },
                h = f => {
                  let p = { type: je.UploadProgress, loaded: f.loaded };
                  f.lengthComputable && (p.total = f.total), i.next(p);
                };
              return (
                r.addEventListener('load', l),
                r.addEventListener('error', c),
                r.addEventListener('timeout', c),
                r.addEventListener('abort', c),
                e.reportProgress &&
                  (r.addEventListener('progress', d),
                  null !== o && r.upload && r.upload.addEventListener('progress', h)),
                r.send(o),
                i.next({ type: je.Sent }),
                () => {
                  r.removeEventListener('error', c),
                    r.removeEventListener('abort', c),
                    r.removeEventListener('load', l),
                    r.removeEventListener('timeout', c),
                    e.reportProgress &&
                      (r.removeEventListener('progress', d),
                      null !== o && r.upload && r.upload.removeEventListener('progress', h)),
                    r.readyState !== r.DONE && r.abort();
                }
              );
            });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Db));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Hh = new E('XSRF_COOKIE_NAME'),
        jh = new E('XSRF_HEADER_NAME');
      class fC {}
      let CN = (() => {
          class n {
            constructor(e, i, r) {
              (this.doc = e),
                (this.platform = i),
                (this.cookieName = r),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ('server' === this.platform) return null;
              const e = this.doc.cookie || '';
              return (
                e !== this.lastCookieString &&
                  (this.parseCount++, (this.lastToken = fb(e, this.cookieName)), (this.lastCookieString = e)),
                this.lastToken
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z), b(ja), b(Hh));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        zh = (() => {
          class n {
            constructor(e, i) {
              (this.tokenService = e), (this.headerName = i);
            }
            intercept(e, i) {
              const r = e.url.toLowerCase();
              if ('GET' === e.method || 'HEAD' === e.method || r.startsWith('http://') || r.startsWith('https://'))
                return i.handle(e);
              const o = this.tokenService.getToken();
              return (
                null !== o &&
                  !e.headers.has(this.headerName) &&
                  (e = e.clone({ headers: e.headers.set(this.headerName, o) })),
                i.handle(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(fC), b(jh));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        DN = (() => {
          class n {
            constructor(e, i) {
              (this.backend = e), (this.injector = i), (this.chain = null);
            }
            handle(e) {
              if (null === this.chain) {
                const i = this.injector.get(dC, []);
                this.chain = i.reduceRight((r, o) => new uC(r, o), this.backend);
              }
              return this.chain.handle(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(rC), b(qt));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        EN = (() => {
          class n {
            static disable() {
              return { ngModule: n, providers: [{ provide: zh, useClass: vN }] };
            }
            static withOptions(e = {}) {
              return {
                ngModule: n,
                providers: [
                  e.cookieName ? { provide: Hh, useValue: e.cookieName } : [],
                  e.headerName ? { provide: jh, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({
              providers: [
                zh,
                { provide: dC, useExisting: zh, multi: !0 },
                { provide: fC, useClass: CN },
                { provide: Hh, useValue: 'XSRF-TOKEN' },
                { provide: jh, useValue: 'X-XSRF-TOKEN' },
              ],
            })),
            n
          );
        })(),
        SN = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({
              providers: [wl, { provide: iC, useClass: DN }, hC, { provide: rC, useExisting: hC }],
              imports: [EN.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })],
            })),
            n
          );
        })();
      class pC extends ee {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return !e.closed && t.next(this._value), e;
        }
        getValue() {
          const { hasError: t, thrownError: e, _value: i } = this;
          if (t) throw e;
          return this._throwIfClosed(), i;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      let $h,
        IN = (() => {
          class n {
            constructor(e) {
              (this.http = e),
                (this.rating = 'G'),
                (this.lang = 'en'),
                (this.currentOffset = 0),
                (this.currentSearchTerm = ''),
                (this.pageSize = 9),
                (this.totalCount = 0),
                (this.imageResult = []),
                (this.searchResultsSubject = new ee()),
                (this.searchResults$ = new be()),
                (this.searchRequest = new pC({
                  searchTerm: this.currentSearchTerm,
                  offset: this.currentOffset,
                  pageSize: this.pageSize,
                })),
                (this.resetSearch = new ee()),
                (this.searchResults$ = this.searchResultsSubject.asObservable()),
                this.searchRequest
                  .pipe(
                    (function MN(n, t) {
                      return qe((e, i) => {
                        const r = new Set();
                        e.subscribe(
                          Le(i, o => {
                            const s = n ? n(o) : o;
                            r.has(s) || (r.add(s), i.next(o));
                          })
                        ),
                          t?.subscribe(Le(i, () => r.clear(), ks));
                      });
                    })(i => i.offset || i.pageSize, this.resetSearch)
                  )
                  .subscribe(i => {
                    this.getSearchResults(i.searchTerm, i.offset, i.pageSize);
                  });
            }
            getSearchResults(e, i, r) {
              const o = {
                api_key: n.giphyApiKey,
                q: e,
                limit: r.toString(),
                offset: i.toString(),
                rating: this.rating,
                lang: this.lang,
              };
              this.http.get(n.giphyUrl, { params: o }).subscribe(s => {
                (this.imageResult = this.imageResult.concat(s.data)), (this.totalCount = s.pagination.total_count);
                const a = this.imageResult.filter(
                  (l, c) => c >= this.currentOffset && c < this.currentOffset + this.pageSize
                );
                this.searchResultsSubject.next(a);
              });
            }
            search(e) {
              (this.currentSearchTerm = e),
                (this.currentOffset = 0),
                (this.imageResult = []),
                this.searchResultsSubject.next(this.imageResult),
                this.resetSearch.next(null),
                this.searchRequest.next({
                  searchTerm: this.currentSearchTerm,
                  offset: this.currentOffset,
                  pageSize: this.pageSize,
                });
            }
            next() {
              this.searchRequest.next({
                searchTerm: this.currentSearchTerm,
                offset: this.currentOffset,
                pageSize: this.pageSize,
              });
            }
            setPageSize(e) {
              (this.pageSize = e), this.changePage(0);
            }
            changePage(e) {
              const i = 0 === e && this.imageResult.length < this.pageSize;
              this.currentOffset = this.pageSize * e;
              const r = this.imageResult.filter(
                (o, s) => s >= this.currentOffset && s < this.currentOffset + this.pageSize
              );
              r.length === this.pageSize
                ? this.searchResultsSubject.next(r)
                : this.searchRequest.next({
                    searchTerm: this.currentSearchTerm,
                    offset: i ? this.pageSize - this.imageResult.length : this.pageSize * e,
                    pageSize: i ? this.pageSize - this.imageResult.length : this.pageSize,
                  });
            }
          }
          return (
            (n.giphyUrl = 'https://api.giphy.com/v1/gifs/search'),
            (n.giphyApiKey = '2qqbSj6tHH8aYHBhH249Xk122bM84PJF'),
            (n.ɵfac = function (e) {
              return new (e || n)(b(wl));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })();
      try {
        $h = typeof Intl < 'u' && Intl.v8BreakIterator;
      } catch {
        $h = !1;
      }
      let ms,
        $i,
        Uh,
        Et = (() => {
          class n {
            constructor(e) {
              (this._platformId = e),
                (this.isBrowser = this._platformId
                  ? (function aR(n) {
                      return n === wb;
                    })(this._platformId)
                  : 'object' == typeof document && !!document),
                (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser && !(!window.chrome && !$h) && typeof CSS < 'u' && !this.EDGE && !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)),
                (this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
                (this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(ja));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })();
      function gs(n) {
        return (function TN() {
          if (null == ms && typeof window < 'u')
            try {
              window.addEventListener('test', null, Object.defineProperty({}, 'passive', { get: () => (ms = !0) }));
            } finally {
              ms = ms || !1;
            }
          return ms;
        })()
          ? n
          : !!n.capture;
      }
      function AN() {
        if (null == $i) {
          if ('object' != typeof document || !document || 'function' != typeof Element || !Element)
            return ($i = !1), $i;
          if ('scrollBehavior' in document.documentElement.style) $i = !0;
          else {
            const n = Element.prototype.scrollTo;
            $i = !!n && !/\{\s*\[native code\]\s*\}/.test(n.toString());
          }
        }
        return $i;
      }
      function Ui(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function Gh() {
        return (
          (typeof __karma__ < 'u' && !!__karma__) ||
          (typeof jasmine < 'u' && !!jasmine) ||
          (typeof jest < 'u' && !!jest) ||
          (typeof Mocha < 'u' && !!Mocha)
        );
      }
      function vi(n, ...t) {
        return t.length ? t.some(e => n[e]) : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
      }
      function El(n, t, e) {
        const i = ie(n) || t || e ? { next: n, error: t, complete: e } : n;
        return i
          ? qe((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(
                Le(
                  o,
                  l => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l), o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1), null === (l = i.complete) || void 0 === l || l.call(i), o.complete();
                  },
                  l => {
                    var c;
                    (a = !1), null === (c = i.error) || void 0 === c || c.call(i, l), o.error(l);
                  },
                  () => {
                    var l, c;
                    a && (null === (l = i.unsubscribe) || void 0 === l || l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : er;
      }
      class UN extends Ne {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      const Sl = {
        setInterval(n, t, ...e) {
          const { delegate: i } = Sl;
          return i?.setInterval ? i.setInterval(n, t, ...e) : setInterval(n, t, ...e);
        },
        clearInterval(n) {
          const { delegate: t } = Sl;
          return (t?.clearInterval || clearInterval)(n);
        },
        delegate: void 0,
      };
      class Yh extends UN {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e), (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const i = this.id,
            r = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(r, i, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, i = 0) {
          return Sl.setInterval(t.flush.bind(t, this), i);
        }
        recycleAsyncId(t, e, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return e;
          Sl.clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          const i = this._execute(t, e);
          if (i) return i;
          !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let r,
            i = !1;
          try {
            this.work(t);
          } catch (o) {
            (i = !0), (r = o || new Error('Scheduled action threw falsy error'));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: e } = this,
              { actions: i } = e;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              Ji(i, this),
              null != t && (this.id = this.recycleAsyncId(e, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const wC = { now: () => (wC.delegate || Date).now(), delegate: void 0 };
      class ys {
        constructor(t, e = ys.now) {
          (this.schedulerActionCtor = t), (this.now = e);
        }
        schedule(t, e = 0, i) {
          return new this.schedulerActionCtor(this, t).schedule(i, e);
        }
      }
      ys.now = wC.now;
      class Zh extends ys {
        constructor(t, e = ys.now) {
          super(t, e), (this.actions = []), (this._active = !1), (this._scheduled = void 0);
        }
        flush(t) {
          const { actions: e } = this;
          if (this._active) return void e.push(t);
          let i;
          this._active = !0;
          do {
            if ((i = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this._active = !1), i)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw i;
          }
        }
      }
      const Qh = new Zh(Yh),
        GN = Qh;
      function Xh(n, t = Qh) {
        return qe((e, i) => {
          let r = null,
            o = null,
            s = null;
          const a = () => {
            if (r) {
              r.unsubscribe(), (r = null);
              const c = o;
              (o = null), i.next(c);
            }
          };
          function l() {
            const c = s + n,
              u = t.now();
            if (u < c) return (r = this.schedule(void 0, c - u)), void i.add(r);
            a();
          }
          e.subscribe(
            Le(
              i,
              c => {
                (o = c), (s = t.now()), r || ((r = t.schedule(l, n)), i.add(r));
              },
              () => {
                a(), i.complete();
              },
              void 0,
              () => {
                o = r = null;
              }
            )
          );
        });
      }
      function CC(n) {
        return Yr((t, e) => n <= e);
      }
      function DC(n, t = er) {
        return (
          (n = n ?? WN),
          qe((e, i) => {
            let r,
              o = !0;
            e.subscribe(
              Le(i, s => {
                const a = t(s);
                (o || !n(r, a)) && ((o = !1), (r = a), i.next(s));
              })
            );
          })
        );
      }
      function WN(n, t) {
        return n === t;
      }
      function Me(n) {
        return qe((t, e) => {
          vt(n).subscribe(Le(e, () => e.complete(), ks)), !e.closed && t.subscribe(e);
        });
      }
      function ve(n) {
        return null != n && 'false' != `${n}`;
      }
      function Zn(n, t = 0) {
        return (function qN(n) {
          return !isNaN(parseFloat(n)) && !isNaN(Number(n));
        })(n)
          ? Number(n)
          : t;
      }
      function Ml(n) {
        return Array.isArray(n) ? n : [n];
      }
      function ze(n) {
        return null == n ? '' : 'string' == typeof n ? n : `${n}px`;
      }
      function Gi(n) {
        return n instanceof ye ? n.nativeElement : n;
      }
      let EC = (() => {
          class n {
            create(e) {
              return typeof MutationObserver > 'u' ? null : new MutationObserver(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        KN = (() => {
          class n {
            constructor(e) {
              (this._mutationObserverFactory = e), (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((e, i) => this._cleanupObserver(i));
            }
            observe(e) {
              const i = Gi(e);
              return new be(r => {
                const s = this._observeElement(i).subscribe(r);
                return () => {
                  s.unsubscribe(), this._unobserveElement(i);
                };
              });
            }
            _observeElement(e) {
              if (this._observedElements.has(e)) this._observedElements.get(e).count++;
              else {
                const i = new ee(),
                  r = this._mutationObserverFactory.create(o => i.next(o));
                r && r.observe(e, { characterData: !0, childList: !0, subtree: !0 }),
                  this._observedElements.set(e, { observer: r, stream: i, count: 1 });
              }
              return this._observedElements.get(e).stream;
            }
            _unobserveElement(e) {
              this._observedElements.has(e) &&
                (this._observedElements.get(e).count--,
                this._observedElements.get(e).count || this._cleanupObserver(e));
            }
            _cleanupObserver(e) {
              if (this._observedElements.has(e)) {
                const { observer: i, stream: r } = this._observedElements.get(e);
                i && i.disconnect(), r.complete(), this._observedElements.delete(e);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(EC));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        YN = (() => {
          class n {
            constructor(e, i, r) {
              (this._contentObserver = e),
                (this._elementRef = i),
                (this._ngZone = r),
                (this.event = new Y()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              (this._disabled = ve(e)), this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(e) {
              (this._debounce = Zn(e)), this._subscribe();
            }
            ngAfterContentInit() {
              !this._currentSubscription && !this.disabled && this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const e = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce ? e.pipe(Xh(this.debounce)) : e).subscribe(this.event);
              });
            }
            _unsubscribe() {
              this._currentSubscription?.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(KN), g(ye), g(ne));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'cdkObserveContent', '']],
              inputs: { disabled: ['cdkObserveContentDisabled', 'disabled'], debounce: 'debounce' },
              outputs: { event: 'cdkObserveContent' },
              exportAs: ['cdkObserveContent'],
            })),
            n
          );
        })(),
        SC = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [EC] })),
            n
          );
        })();
      function MC(n, t, e) {
        n ? Rn(e, n, t) : t();
      }
      function Jh(...n) {
        return (function XN() {
          return ap(1);
        })()(tr(n, uo(n)));
      }
      function Qn(n) {
        return n <= 0
          ? () => pc
          : qe((t, e) => {
              let i = 0;
              t.subscribe(
                Le(e, r => {
                  ++i <= n && (e.next(r), n <= i && e.complete());
                })
              );
            });
      }
      function Wi(...n) {
        const t = uo(n);
        return qe((e, i) => {
          (t ? Jh(n, e, t) : Jh(n, e)).subscribe(i);
        });
      }
      const IC = new Set();
      let Qr,
        JN = (() => {
          class n {
            constructor(e) {
              (this._platform = e),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : t1);
            }
            matchMedia(e) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function e1(n) {
                    if (!IC.has(n))
                      try {
                        Qr ||
                          ((Qr = document.createElement('style')),
                          Qr.setAttribute('type', 'text/css'),
                          document.head.appendChild(Qr)),
                          Qr.sheet && (Qr.sheet.insertRule(`@media ${n} {body{ }}`, 0), IC.add(n));
                      } catch (t) {
                        console.error(t);
                      }
                  })(e),
                this._matchMedia(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Et));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })();
      function t1(n) {
        return { matches: 'all' === n || '' === n, media: n, addListener: () => {}, removeListener: () => {} };
      }
      let TC = (() => {
        class n {
          constructor(e, i) {
            (this._mediaMatcher = e), (this._zone = i), (this._queries = new Map()), (this._destroySubject = new ee());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(e) {
            return AC(Ml(e)).some(r => this._registerQuery(r).mql.matches);
          }
          observe(e) {
            let o = (function ZN(...n) {
              const t = uo(n),
                e = cp(n),
                { args: i, keys: r } = Wb(n);
              if (0 === i.length) return tr([], t);
              const o = new be(
                (function QN(n, t, e = er) {
                  return i => {
                    MC(
                      t,
                      () => {
                        const { length: r } = n,
                          o = new Array(r);
                        let s = r,
                          a = r;
                        for (let l = 0; l < r; l++)
                          MC(
                            t,
                            () => {
                              const c = tr(n[l], t);
                              let u = !1;
                              c.subscribe(
                                Le(
                                  i,
                                  d => {
                                    (o[l] = d), u || ((u = !0), a--), a || i.next(e(o.slice()));
                                  },
                                  () => {
                                    --s || i.complete();
                                  }
                                )
                              );
                            },
                            i
                          );
                      },
                      i
                    );
                  };
                })(i, t, r ? s => qb(r, s) : er)
              );
              return e ? o.pipe(yh(e)) : o;
            })(AC(Ml(e)).map(s => this._registerQuery(s).observable));
            return (
              (o = Jh(o.pipe(Qn(1)), o.pipe(CC(1), Xh(0)))),
              o.pipe(
                Ze(s => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: l, query: c }) => {
                      (a.matches = a.matches || l), (a.breakpoints[c] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(e) {
            if (this._queries.has(e)) return this._queries.get(e);
            const i = this._mediaMatcher.matchMedia(e),
              o = {
                observable: new be(s => {
                  const a = l => this._zone.run(() => s.next(l));
                  return (
                    i.addListener(a),
                    () => {
                      i.removeListener(a);
                    }
                  );
                }).pipe(
                  Wi(i),
                  Ze(({ matches: s }) => ({ query: e, matches: s })),
                  Me(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(e, o), o;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(JN), b(ne));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      function AC(n) {
        return n
          .map(t => t.split(','))
          .reduce((t, e) => t.concat(e))
          .map(t => t.trim());
      }
      function Il(n, t) {
        return (n.getAttribute(t) || '').match(/\S+/g) || [];
      }
      const FC = 'cdk-describedby-message',
        Tl = 'cdk-describedby-host';
      let ef = 0,
        s1 = (() => {
          class n {
            constructor(e, i) {
              (this._platform = i),
                (this._messageRegistry = new Map()),
                (this._messagesContainer = null),
                (this._id = '' + ef++),
                (this._document = e),
                (this._id = oi(Wr) + '-' + ef++);
            }
            describe(e, i, r) {
              if (!this._canBeDescribed(e, i)) return;
              const o = tf(i, r);
              'string' != typeof i
                ? (OC(i, this._id), this._messageRegistry.set(o, { messageElement: i, referenceCount: 0 }))
                : this._messageRegistry.has(o) || this._createMessageElement(i, r),
                this._isElementDescribedByMessage(e, o) || this._addMessageReference(e, o);
            }
            removeDescription(e, i, r) {
              if (!i || !this._isElementNode(e)) return;
              const o = tf(i, r);
              if (
                (this._isElementDescribedByMessage(e, o) && this._removeMessageReference(e, o), 'string' == typeof i)
              ) {
                const s = this._messageRegistry.get(o);
                s && 0 === s.referenceCount && this._deleteMessageElement(o);
              }
              0 === this._messagesContainer?.childNodes.length &&
                (this._messagesContainer.remove(), (this._messagesContainer = null));
            }
            ngOnDestroy() {
              const e = this._document.querySelectorAll(`[${Tl}="${this._id}"]`);
              for (let i = 0; i < e.length; i++) this._removeCdkDescribedByReferenceIds(e[i]), e[i].removeAttribute(Tl);
              this._messagesContainer?.remove(), (this._messagesContainer = null), this._messageRegistry.clear();
            }
            _createMessageElement(e, i) {
              const r = this._document.createElement('div');
              OC(r, this._id),
                (r.textContent = e),
                i && r.setAttribute('role', i),
                this._createMessagesContainer(),
                this._messagesContainer.appendChild(r),
                this._messageRegistry.set(tf(e, i), { messageElement: r, referenceCount: 0 });
            }
            _deleteMessageElement(e) {
              this._messageRegistry.get(e)?.messageElement?.remove(), this._messageRegistry.delete(e);
            }
            _createMessagesContainer() {
              if (this._messagesContainer) return;
              const e = 'cdk-describedby-message-container',
                i = this._document.querySelectorAll(`.${e}[platform="server"]`);
              for (let o = 0; o < i.length; o++) i[o].remove();
              const r = this._document.createElement('div');
              (r.style.visibility = 'hidden'),
                r.classList.add(e),
                r.classList.add('cdk-visually-hidden'),
                this._platform && !this._platform.isBrowser && r.setAttribute('platform', 'server'),
                this._document.body.appendChild(r),
                (this._messagesContainer = r);
            }
            _removeCdkDescribedByReferenceIds(e) {
              const i = Il(e, 'aria-describedby').filter(r => 0 != r.indexOf(FC));
              e.setAttribute('aria-describedby', i.join(' '));
            }
            _addMessageReference(e, i) {
              const r = this._messageRegistry.get(i);
              (function r1(n, t, e) {
                const i = Il(n, t);
                i.some(r => r.trim() == e.trim()) || (i.push(e.trim()), n.setAttribute(t, i.join(' ')));
              })(e, 'aria-describedby', r.messageElement.id),
                e.setAttribute(Tl, this._id),
                r.referenceCount++;
            }
            _removeMessageReference(e, i) {
              const r = this._messageRegistry.get(i);
              r.referenceCount--,
                (function o1(n, t, e) {
                  const r = Il(n, t).filter(o => o != e.trim());
                  r.length ? n.setAttribute(t, r.join(' ')) : n.removeAttribute(t);
                })(e, 'aria-describedby', r.messageElement.id),
                e.removeAttribute(Tl);
            }
            _isElementDescribedByMessage(e, i) {
              const r = Il(e, 'aria-describedby'),
                o = this._messageRegistry.get(i),
                s = o && o.messageElement.id;
              return !!s && -1 != r.indexOf(s);
            }
            _canBeDescribed(e, i) {
              if (!this._isElementNode(e)) return !1;
              if (i && 'object' == typeof i) return !0;
              const r = null == i ? '' : `${i}`.trim(),
                o = e.getAttribute('aria-label');
              return !(!r || (o && o.trim() === r));
            }
            _isElementNode(e) {
              return e.nodeType === this._document.ELEMENT_NODE;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z), b(Et));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })();
      function tf(n, t) {
        return 'string' == typeof n ? `${t || ''}/${n}` : n;
      }
      function OC(n, t) {
        n.id || (n.id = `${FC}-${t}-${ef++}`);
      }
      class kC {
        constructor(t) {
          (this._items = t),
            (this._activeItemIndex = -1),
            (this._activeItem = null),
            (this._wrap = !1),
            (this._letterKeyStream = new ee()),
            (this._typeaheadSubscription = Ne.EMPTY),
            (this._vertical = !0),
            (this._allowedModifierKeys = []),
            (this._homeAndEnd = !1),
            (this._skipPredicateFn = e => e.disabled),
            (this._pressedLetters = []),
            (this.tabOut = new ee()),
            (this.change = new ee()),
            t instanceof Qo &&
              t.changes.subscribe(e => {
                if (this._activeItem) {
                  const r = e.toArray().indexOf(this._activeItem);
                  r > -1 && r !== this._activeItemIndex && (this._activeItemIndex = r);
                }
              });
        }
        skipPredicate(t) {
          return (this._skipPredicateFn = t), this;
        }
        withWrap(t = !0) {
          return (this._wrap = t), this;
        }
        withVerticalOrientation(t = !0) {
          return (this._vertical = t), this;
        }
        withHorizontalOrientation(t) {
          return (this._horizontal = t), this;
        }
        withAllowedModifierKeys(t) {
          return (this._allowedModifierKeys = t), this;
        }
        withTypeAhead(t = 200) {
          return (
            this._typeaheadSubscription.unsubscribe(),
            (this._typeaheadSubscription = this._letterKeyStream
              .pipe(
                El(e => this._pressedLetters.push(e)),
                Xh(t),
                Yr(() => this._pressedLetters.length > 0),
                Ze(() => this._pressedLetters.join(''))
              )
              .subscribe(e => {
                const i = this._getItemsArray();
                for (let r = 1; r < i.length + 1; r++) {
                  const o = (this._activeItemIndex + r) % i.length,
                    s = i[o];
                  if (!this._skipPredicateFn(s) && 0 === s.getLabel().toUpperCase().trim().indexOf(e)) {
                    this.setActiveItem(o);
                    break;
                  }
                }
                this._pressedLetters = [];
              })),
            this
          );
        }
        withHomeAndEnd(t = !0) {
          return (this._homeAndEnd = t), this;
        }
        setActiveItem(t) {
          const e = this._activeItem;
          this.updateActiveItem(t), this._activeItem !== e && this.change.next(this._activeItemIndex);
        }
        onKeydown(t) {
          const e = t.keyCode,
            r = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].every(
              o => !t[o] || this._allowedModifierKeys.indexOf(o) > -1
            );
          switch (e) {
            case 9:
              return void this.tabOut.next();
            case 40:
              if (this._vertical && r) {
                this.setNextItemActive();
                break;
              }
              return;
            case 38:
              if (this._vertical && r) {
                this.setPreviousItemActive();
                break;
              }
              return;
            case 39:
              if (this._horizontal && r) {
                'rtl' === this._horizontal ? this.setPreviousItemActive() : this.setNextItemActive();
                break;
              }
              return;
            case 37:
              if (this._horizontal && r) {
                'rtl' === this._horizontal ? this.setNextItemActive() : this.setPreviousItemActive();
                break;
              }
              return;
            case 36:
              if (this._homeAndEnd && r) {
                this.setFirstItemActive();
                break;
              }
              return;
            case 35:
              if (this._homeAndEnd && r) {
                this.setLastItemActive();
                break;
              }
              return;
            default:
              return void (
                (r || vi(t, 'shiftKey')) &&
                (t.key && 1 === t.key.length
                  ? this._letterKeyStream.next(t.key.toLocaleUpperCase())
                  : ((e >= 65 && e <= 90) || (e >= 48 && e <= 57)) &&
                    this._letterKeyStream.next(String.fromCharCode(e)))
              );
          }
          (this._pressedLetters = []), t.preventDefault();
        }
        get activeItemIndex() {
          return this._activeItemIndex;
        }
        get activeItem() {
          return this._activeItem;
        }
        isTyping() {
          return this._pressedLetters.length > 0;
        }
        setFirstItemActive() {
          this._setActiveItemByIndex(0, 1);
        }
        setLastItemActive() {
          this._setActiveItemByIndex(this._items.length - 1, -1);
        }
        setNextItemActive() {
          this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
        }
        setPreviousItemActive() {
          this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1);
        }
        updateActiveItem(t) {
          const e = this._getItemsArray(),
            i = 'number' == typeof t ? t : e.indexOf(t);
          (this._activeItem = e[i] ?? null), (this._activeItemIndex = i);
        }
        _setActiveItemByDelta(t) {
          this._wrap ? this._setActiveInWrapMode(t) : this._setActiveInDefaultMode(t);
        }
        _setActiveInWrapMode(t) {
          const e = this._getItemsArray();
          for (let i = 1; i <= e.length; i++) {
            const r = (this._activeItemIndex + t * i + e.length) % e.length;
            if (!this._skipPredicateFn(e[r])) return void this.setActiveItem(r);
          }
        }
        _setActiveInDefaultMode(t) {
          this._setActiveItemByIndex(this._activeItemIndex + t, t);
        }
        _setActiveItemByIndex(t, e) {
          const i = this._getItemsArray();
          if (i[t]) {
            for (; this._skipPredicateFn(i[t]); ) if (!i[(t += e)]) return;
            this.setActiveItem(t);
          }
        }
        _getItemsArray() {
          return this._items instanceof Qo ? this._items.toArray() : this._items;
        }
      }
      class a1 extends kC {
        setActiveItem(t) {
          this.activeItem && this.activeItem.setInactiveStyles(),
            super.setActiveItem(t),
            this.activeItem && this.activeItem.setActiveStyles();
        }
      }
      class l1 extends kC {
        constructor() {
          super(...arguments), (this._origin = 'program');
        }
        setFocusOrigin(t) {
          return (this._origin = t), this;
        }
        setActiveItem(t) {
          super.setActiveItem(t), this.activeItem && this.activeItem.focus(this._origin);
        }
      }
      function PC(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function NC(n) {
        const t = (n.touches && n.touches[0]) || (n.changedTouches && n.changedTouches[0]);
        return !(
          !t ||
          -1 !== t.identifier ||
          (null != t.radiusX && 1 !== t.radiusX) ||
          (null != t.radiusY && 1 !== t.radiusY)
        );
      }
      const p1 = new E('cdk-input-modality-detector-options'),
        m1 = { ignoreKeys: [18, 17, 224, 91, 16] },
        Xr = gs({ passive: !0, capture: !0 });
      let g1 = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._platform = e),
              (this._mostRecentTarget = null),
              (this._modality = new pC(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = s => {
                this._options?.ignoreKeys?.some(a => a === s.keyCode) ||
                  (this._modality.next('keyboard'), (this._mostRecentTarget = Ui(s)));
              }),
              (this._onMousedown = s => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(PC(s) ? 'keyboard' : 'mouse'), (this._mostRecentTarget = Ui(s)));
              }),
              (this._onTouchstart = s => {
                NC(s)
                  ? this._modality.next('keyboard')
                  : ((this._lastTouchMs = Date.now()), this._modality.next('touch'), (this._mostRecentTarget = Ui(s)));
              }),
              (this._options = { ...m1, ...o }),
              (this.modalityDetected = this._modality.pipe(CC(1))),
              (this.modalityChanged = this.modalityDetected.pipe(DC())),
              e.isBrowser &&
                i.runOutsideAngular(() => {
                  r.addEventListener('keydown', this._onKeydown, Xr),
                    r.addEventListener('mousedown', this._onMousedown, Xr),
                    r.addEventListener('touchstart', this._onTouchstart, Xr);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener('keydown', this._onKeydown, Xr),
                document.removeEventListener('mousedown', this._onMousedown, Xr),
                document.removeEventListener('touchstart', this._onTouchstart, Xr));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Et), b(ne), b(Z), b(p1, 8));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      const _1 = new E('liveAnnouncerElement', {
          providedIn: 'root',
          factory: function y1() {
            return null;
          },
        }),
        v1 = new E('LIVE_ANNOUNCER_DEFAULT_OPTIONS');
      let b1 = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._ngZone = i),
              (this._defaultOptions = o),
              (this._document = r),
              (this._liveElement = e || this._createLiveElement());
          }
          announce(e, ...i) {
            const r = this._defaultOptions;
            let o, s;
            return (
              1 === i.length && 'number' == typeof i[0] ? (s = i[0]) : ([o, s] = i),
              this.clear(),
              clearTimeout(this._previousTimeout),
              o || (o = r && r.politeness ? r.politeness : 'polite'),
              null == s && r && (s = r.duration),
              this._liveElement.setAttribute('aria-live', o),
              this._ngZone.runOutsideAngular(
                () => (
                  this._currentPromise || (this._currentPromise = new Promise(a => (this._currentResolve = a))),
                  clearTimeout(this._previousTimeout),
                  (this._previousTimeout = setTimeout(() => {
                    (this._liveElement.textContent = e),
                      'number' == typeof s && (this._previousTimeout = setTimeout(() => this.clear(), s)),
                      this._currentResolve(),
                      (this._currentPromise = this._currentResolve = void 0);
                  }, 100)),
                  this._currentPromise
                )
              )
            );
          }
          clear() {
            this._liveElement && (this._liveElement.textContent = '');
          }
          ngOnDestroy() {
            clearTimeout(this._previousTimeout),
              this._liveElement?.remove(),
              (this._liveElement = null),
              this._currentResolve?.(),
              (this._currentPromise = this._currentResolve = void 0);
          }
          _createLiveElement() {
            const e = 'cdk-live-announcer-element',
              i = this._document.getElementsByClassName(e),
              r = this._document.createElement('div');
            for (let o = 0; o < i.length; o++) i[o].remove();
            return (
              r.classList.add(e),
              r.classList.add('cdk-visually-hidden'),
              r.setAttribute('aria-atomic', 'true'),
              r.setAttribute('aria-live', 'polite'),
              this._document.body.appendChild(r),
              r
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(_1, 8), b(ne), b(Z), b(v1, 8));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      const w1 = new E('cdk-focus-monitor-default-options'),
        Al = gs({ passive: !0, capture: !0 });
      let VC = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this._ngZone = e),
              (this._platform = i),
              (this._inputModalityDetector = r),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(() => (this._windowFocused = !1)));
              }),
              (this._stopInputModalityDetector = new ee()),
              (this._rootNodeFocusAndBlurListener = a => {
                for (let c = Ui(a); c; c = c.parentElement)
                  'focus' === a.type ? this._onFocus(a, c) : this._onBlur(a, c);
              }),
              (this._document = o),
              (this._detectionMode = s?.detectionMode || 0);
          }
          monitor(e, i = !1) {
            const r = Gi(e);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return _i(null);
            const o =
                (function FN(n) {
                  if (
                    (function xN() {
                      if (null == Uh) {
                        const n = typeof document < 'u' ? document.head : null;
                        Uh = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return Uh;
                    })()
                  ) {
                    const t = n.getRootNode ? n.getRootNode() : null;
                    if (typeof ShadowRoot < 'u' && ShadowRoot && t instanceof ShadowRoot) return t;
                  }
                  return null;
                })(r) || this._getDocument(),
              s = this._elementInfo.get(r);
            if (s) return i && (s.checkChildren = !0), s.subject;
            const a = { checkChildren: i, subject: new ee(), rootNode: o };
            return this._elementInfo.set(r, a), this._registerGlobalListeners(a), a.subject;
          }
          stopMonitoring(e) {
            const i = Gi(e),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(), this._setClasses(i), this._elementInfo.delete(i), this._removeGlobalListeners(r));
          }
          focusVia(e, i, r) {
            const o = Gi(e);
            o === this._getDocument().activeElement
              ? this._getClosestElementsInfo(o).forEach(([a, l]) => this._originChanged(a, i, l))
              : (this._setOrigin(i), 'function' == typeof o.focus && o.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((e, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(e) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(e)
                  ? 'touch'
                  : 'program'
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : e && this._isLastInteractionFromInputLabel(e)
              ? 'mouse'
              : 'program';
          }
          _shouldBeAttributedToTouch(e) {
            return 1 === this._detectionMode || !!e?.contains(this._inputModalityDetector._mostRecentTarget);
          }
          _setClasses(e, i) {
            e.classList.toggle('cdk-focused', !!i),
              e.classList.toggle('cdk-touch-focused', 'touch' === i),
              e.classList.toggle('cdk-keyboard-focused', 'keyboard' === i),
              e.classList.toggle('cdk-mouse-focused', 'mouse' === i),
              e.classList.toggle('cdk-program-focused', 'program' === i);
          }
          _setOrigin(e, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = e),
                (this._originFromTouchInteraction = 'touch' === e && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(e, i) {
            const r = this._elementInfo.get(i),
              o = Ui(e);
            !r || (!r.checkChildren && i !== o) || this._originChanged(i, this._getFocusOrigin(o), r);
          }
          _onBlur(e, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren && e.relatedTarget instanceof Node && i.contains(e.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r, null));
          }
          _emitOrigin(e, i) {
            e.subject.observers.length && this._ngZone.run(() => e.subject.next(i));
          }
          _registerGlobalListeners(e) {
            if (!this._platform.isBrowser) return;
            const i = e.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener('focus', this._rootNodeFocusAndBlurListener, Al),
                  i.addEventListener('blur', this._rootNodeFocusAndBlurListener, Al);
              }),
              this._rootNodeFocusListenerCount.set(i, r + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener('focus', this._windowFocusListener);
                }),
                this._inputModalityDetector.modalityDetected.pipe(Me(this._stopInputModalityDetector)).subscribe(o => {
                  this._setOrigin(o, !0);
                }));
          }
          _removeGlobalListeners(e) {
            const i = e.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener('focus', this._rootNodeFocusAndBlurListener, Al),
                  i.removeEventListener('blur', this._rootNodeFocusAndBlurListener, Al),
                  this._rootNodeFocusListenerCount.delete(i));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener('focus', this._windowFocusListener),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(e, i, r) {
            this._setClasses(e, i), this._emitOrigin(r, i), (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(e) {
            const i = [];
            return (
              this._elementInfo.forEach((r, o) => {
                (o === e || (r.checkChildren && o.contains(e))) && i.push([o, r]);
              }),
              i
            );
          }
          _isLastInteractionFromInputLabel(e) {
            const { _mostRecentTarget: i, mostRecentModality: r } = this._inputModalityDetector;
            if ('mouse' !== r || !i || i === e || ('INPUT' !== e.nodeName && 'TEXTAREA' !== e.nodeName) || e.disabled)
              return !1;
            const o = e.labels;
            if (o) for (let s = 0; s < o.length; s++) if (o[s].contains(i)) return !0;
            return !1;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(ne), b(Et), b(g1), b(Z, 8), b(w1, 8));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      const BC = 'cdk-high-contrast-black-on-white',
        HC = 'cdk-high-contrast-white-on-black',
        nf = 'cdk-high-contrast-active';
      let jC = (() => {
          class n {
            constructor(e, i) {
              (this._platform = e),
                (this._document = i),
                (this._breakpointSubscription = oi(TC)
                  .observe('(forced-colors: active)')
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1), this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const e = this._document.createElement('div');
              (e.style.backgroundColor = 'rgb(1,2,3)'),
                (e.style.position = 'absolute'),
                this._document.body.appendChild(e);
              const i = this._document.defaultView || window,
                r = i && i.getComputedStyle ? i.getComputedStyle(e) : null,
                o = ((r && r.backgroundColor) || '').replace(/ /g, '');
              switch ((e.remove(), o)) {
                case 'rgb(0,0,0)':
                case 'rgb(45,50,54)':
                case 'rgb(32,32,32)':
                  return 2;
                case 'rgb(255,255,255)':
                case 'rgb(255,250,239)':
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
                const e = this._document.body.classList;
                e.remove(nf, BC, HC), (this._hasCheckedHighContrastMode = !0);
                const i = this.getHighContrastMode();
                1 === i ? e.add(nf, BC) : 2 === i && e.add(nf, HC);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Et), b(Z));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        C1 = (() => {
          class n {
            constructor(e) {
              e._applyBodyHighContrastModeCssClasses();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(jC));
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [SC] })),
            n
          );
        })();
      const D1 = new E('cdk-dir-doc', {
          providedIn: 'root',
          factory: function E1() {
            return oi(Z);
          },
        }),
        S1 =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let Jr = (() => {
          class n {
            constructor(e) {
              if (((this.value = 'ltr'), (this.change = new Y()), e)) {
                const r = e.documentElement ? e.documentElement.dir : null;
                this.value = (function M1(n) {
                  const t = n?.toLowerCase() || '';
                  return 'auto' === t && typeof navigator < 'u' && navigator?.language
                    ? S1.test(navigator.language)
                      ? 'rtl'
                      : 'ltr'
                    : 'rtl' === t
                    ? 'rtl'
                    : 'ltr';
                })((e.body ? e.body.dir : null) || r || 'ltr');
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(D1, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        vs = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({})),
            n
          );
        })();
      function I1(n, t) {
        if ((1 & n && pt(0, 'mat-pseudo-checkbox', 4), 2 & n)) {
          const e = he();
          F('state', e.selected ? 'checked' : 'unchecked')('disabled', e.disabled);
        }
      }
      function T1(n, t) {
        if ((1 & n && (O(0, 'span', 5), Je(1), B()), 2 & n)) {
          const e = he();
          R(1), hi('(', e.group.label, ')');
        }
      }
      const A1 = ['*'],
        F1 = new E('mat-sanity-checks', {
          providedIn: 'root',
          factory: function x1() {
            return !0;
          },
        });
      let tt = (() => {
        class n {
          constructor(e, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              e._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(e) {
            return !Gh() && ('boolean' == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[e]);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(jC), b(F1, 8), b(Z));
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({ imports: [vs, vs] })),
          n
        );
      })();
      function rf(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = ve(t);
          }
        };
      }
      function xl(n, t) {
        return class extends n {
          constructor(...e) {
            super(...e), (this.defaultColor = t), (this.color = t);
          }
          get color() {
            return this._color;
          }
          set color(e) {
            const i = e || this.defaultColor;
            i !== this._color &&
              (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
              i && this._elementRef.nativeElement.classList.add(`mat-${i}`),
              (this._color = i));
          }
        };
      }
      function sf(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = ve(t);
          }
        };
      }
      function UC(n, t = 0) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._tabIndex = t), (this.defaultTabIndex = t);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(e) {
            this._tabIndex = null != e ? Zn(e) : this.defaultTabIndex;
          }
        };
      }
      function GC(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this.errorState = !1);
          }
          updateErrorState() {
            const t = this.errorState,
              o = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(
                this.ngControl ? this.ngControl.control : null,
                this._parentFormGroup || this._parentForm
              );
            o !== t && ((this.errorState = o), this.stateChanges.next());
          }
        };
      }
      function O1(n) {
        return class extends n {
          constructor(...t) {
            super(...t),
              (this._isInitialized = !1),
              (this._pendingSubscribers = []),
              (this.initialized = new be(e => {
                this._isInitialized ? this._notifySubscriber(e) : this._pendingSubscribers.push(e);
              }));
          }
          _markInitialized() {
            (this._isInitialized = !0),
              this._pendingSubscribers.forEach(this._notifySubscriber),
              (this._pendingSubscribers = null);
          }
          _notifySubscriber(t) {
            t.next(), t.complete();
          }
        };
      }
      let Fl = (() => {
        class n {
          isErrorState(e, i) {
            return !!(e && e.invalid && (e.touched || (i && i.submitted)));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      class R1 {
        constructor(t, e, i, r = !1) {
          (this._renderer = t),
            (this.element = e),
            (this.config = i),
            (this._animationForciblyDisabledThroughCss = r),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const WC = { enterDuration: 225, exitDuration: 150 },
        af = gs({ passive: !0 }),
        qC = ['mousedown', 'touchstart'],
        KC = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
      class YC {
        constructor(t, e, i, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = Gi(i));
        }
        fadeInRipple(t, e, i = {}) {
          const r = (this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect()),
            o = { ...WC, ...i.animation };
          i.centered && ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const s =
              i.radius ||
              (function N1(n, t, e) {
                const i = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
                  r = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
                return Math.sqrt(i * i + r * r);
              })(t, e, r),
            a = t - r.left,
            l = e - r.top,
            c = o.enterDuration,
            u = document.createElement('div');
          u.classList.add('mat-ripple-element'),
            (u.style.left = a - s + 'px'),
            (u.style.top = l - s + 'px'),
            (u.style.height = 2 * s + 'px'),
            (u.style.width = 2 * s + 'px'),
            null != i.color && (u.style.backgroundColor = i.color),
            (u.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(u);
          const d = window.getComputedStyle(u),
            f = d.transitionDuration,
            p = 'none' === d.transitionProperty || '0s' === f || '0s, 0s' === f,
            m = new R1(this, u, i, p);
          (u.style.transform = 'scale3d(1, 1, 1)'),
            (m.state = 0),
            i.persistent || (this._mostRecentTransientRipple = m);
          let _ = null;
          return (
            !p &&
              (c || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const y = () => this._finishRippleTransition(m),
                  D = () => this._destroyRipple(m);
                u.addEventListener('transitionend', y),
                  u.addEventListener('transitioncancel', D),
                  (_ = { onTransitionEnd: y, onTransitionCancel: D });
              }),
            this._activeRipples.set(m, _),
            (p || !c) && this._finishRippleTransition(m),
            m
          );
        }
        fadeOutRipple(t) {
          if (2 === t.state || 3 === t.state) return;
          const e = t.element,
            i = { ...WC, ...t.config.animation };
          (e.style.transitionDuration = `${i.exitDuration}ms`),
            (e.style.opacity = '0'),
            (t.state = 2),
            (t._animationForciblyDisabledThroughCss || !i.exitDuration) && this._finishRippleTransition(t);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach(t => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach(t => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = Gi(t);
          !e ||
            e === this._triggerElement ||
            (this._removeTriggerEvents(), (this._triggerElement = e), this._registerEvents(qC));
        }
        handleEvent(t) {
          'mousedown' === t.type
            ? this._onMousedown(t)
            : 'touchstart' === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered || (this._registerEvents(KC), (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(t) {
          0 === t.state ? this._startFadeOutTransition(t) : 2 === t.state && this._destroyRipple(t);
        }
        _startFadeOutTransition(t) {
          const e = t === this._mostRecentTransientRipple,
            { persistent: i } = t.config;
          (t.state = 1), !i && (!e || !this._isPointerDown) && t.fadeOut();
        }
        _destroyRipple(t) {
          const e = this._activeRipples.get(t) ?? null;
          this._activeRipples.delete(t),
            this._activeRipples.size || (this._containerRect = null),
            t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
            (t.state = 3),
            null !== e &&
              (t.element.removeEventListener('transitionend', e.onTransitionEnd),
              t.element.removeEventListener('transitioncancel', e.onTransitionCancel)),
            t.element.remove();
        }
        _onMousedown(t) {
          const e = PC(t),
            i = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !e &&
            !i &&
            ((this._isPointerDown = !0), this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !NC(t)) {
            (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let i = 0; i < e.length; i++) this.fadeInRipple(e[i].clientX, e[i].clientY, this._target.rippleConfig);
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach(t => {
              !t.config.persistent &&
                (1 === t.state || (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach(e => {
              this._triggerElement.addEventListener(e, this, af);
            });
          });
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (qC.forEach(t => {
              this._triggerElement.removeEventListener(t, this, af);
            }),
            this._pointerUpEventsRegistered &&
              KC.forEach(t => {
                this._triggerElement.removeEventListener(t, this, af);
              }));
        }
      }
      const ZC = new E('mat-ripple-global-options');
      let lf = (() => {
          class n {
            constructor(e, i, r, o, s) {
              (this._elementRef = e),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = o || {}),
                (this._rippleRenderer = new YC(this, i, e, r));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              e && this.fadeOutAllNonPersistent(), (this._disabled = e), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(e) {
              (this._trigger = e), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: {
                  ...this._globalOptions.animation,
                  ...('NoopAnimations' === this._animationMode ? { enterDuration: 0, exitDuration: 0 } : {}),
                  ...this.animation,
                },
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(e, i = 0, r) {
              return 'number' == typeof e
                ? this._rippleRenderer.fadeInRipple(e, i, { ...this.rippleConfig, ...r })
                : this._rippleRenderer.fadeInRipple(0, 0, { ...this.rippleConfig, ...e });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(ne), g(Et), g(ZC, 8), g(Mn, 8));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [
                ['', 'mat-ripple', ''],
                ['', 'matRipple', ''],
              ],
              hostAttrs: [1, 'mat-ripple'],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && Xe('mat-ripple-unbounded', i.unbounded);
              },
              inputs: {
                color: ['matRippleColor', 'color'],
                unbounded: ['matRippleUnbounded', 'unbounded'],
                centered: ['matRippleCentered', 'centered'],
                radius: ['matRippleRadius', 'radius'],
                animation: ['matRippleAnimation', 'animation'],
                disabled: ['matRippleDisabled', 'disabled'],
                trigger: ['matRippleTrigger', 'trigger'],
              },
              exportAs: ['matRipple'],
            })),
            n
          );
        })(),
        QC = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [tt, tt] })),
            n
          );
        })(),
        L1 = (() => {
          class n {
            constructor(e) {
              (this._animationMode = e), (this.state = 'unchecked'), (this.disabled = !1);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Mn, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-pseudo-checkbox']],
              hostAttrs: [1, 'mat-pseudo-checkbox'],
              hostVars: 8,
              hostBindings: function (e, i) {
                2 & e &&
                  Xe('mat-pseudo-checkbox-indeterminate', 'indeterminate' === i.state)(
                    'mat-pseudo-checkbox-checked',
                    'checked' === i.state
                  )('mat-pseudo-checkbox-disabled', i.disabled)(
                    '_mat-animation-noopable',
                    'NoopAnimations' === i._animationMode
                  );
              },
              inputs: { state: 'state', disabled: 'disabled' },
              decls: 0,
              vars: 0,
              template: function (e, i) {},
              styles: [
                '.mat-pseudo-checkbox{width:16px;height:16px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:"";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border-color:rgba(0,0,0,0)}.mat-pseudo-checkbox._mat-animation-noopable{transition:none !important;animation:none !important}.mat-pseudo-checkbox._mat-animation-noopable::after{transition:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:5px;left:1px;width:10px;opacity:1;border-radius:2px}.mat-pseudo-checkbox-checked::after{top:2.4px;left:1px;width:8px;height:3px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        V1 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [tt] })),
            n
          );
        })();
      const XC = new E('MAT_OPTION_PARENT_COMPONENT'),
        JC = new E('MatOptgroup');
      let B1 = 0;
      class H1 {
        constructor(t, e = !1) {
          (this.source = t), (this.isUserInput = e);
        }
      }
      let j1 = (() => {
          class n {
            constructor(e, i, r, o) {
              (this._element = e),
                (this._changeDetectorRef = i),
                (this._parent = r),
                (this.group = o),
                (this._selected = !1),
                (this._active = !1),
                (this._disabled = !1),
                (this._mostRecentViewValue = ''),
                (this.id = 'mat-option-' + B1++),
                (this.onSelectionChange = new Y()),
                (this._stateChanges = new ee());
            }
            get multiple() {
              return this._parent && this._parent.multiple;
            }
            get selected() {
              return this._selected;
            }
            get disabled() {
              return (this.group && this.group.disabled) || this._disabled;
            }
            set disabled(e) {
              this._disabled = ve(e);
            }
            get disableRipple() {
              return !(!this._parent || !this._parent.disableRipple);
            }
            get active() {
              return this._active;
            }
            get viewValue() {
              return (this._getHostElement().textContent || '').trim();
            }
            select() {
              this._selected ||
                ((this._selected = !0), this._changeDetectorRef.markForCheck(), this._emitSelectionChangeEvent());
            }
            deselect() {
              this._selected &&
                ((this._selected = !1), this._changeDetectorRef.markForCheck(), this._emitSelectionChangeEvent());
            }
            focus(e, i) {
              const r = this._getHostElement();
              'function' == typeof r.focus && r.focus(i);
            }
            setActiveStyles() {
              this._active || ((this._active = !0), this._changeDetectorRef.markForCheck());
            }
            setInactiveStyles() {
              this._active && ((this._active = !1), this._changeDetectorRef.markForCheck());
            }
            getLabel() {
              return this.viewValue;
            }
            _handleKeydown(e) {
              (13 === e.keyCode || 32 === e.keyCode) && !vi(e) && (this._selectViaInteraction(), e.preventDefault());
            }
            _selectViaInteraction() {
              this.disabled ||
                ((this._selected = !this.multiple || !this._selected),
                this._changeDetectorRef.markForCheck(),
                this._emitSelectionChangeEvent(!0));
            }
            _getAriaSelected() {
              return this.selected || (!this.multiple && null);
            }
            _getTabIndex() {
              return this.disabled ? '-1' : '0';
            }
            _getHostElement() {
              return this._element.nativeElement;
            }
            ngAfterViewChecked() {
              if (this._selected) {
                const e = this.viewValue;
                e !== this._mostRecentViewValue && ((this._mostRecentViewValue = e), this._stateChanges.next());
              }
            }
            ngOnDestroy() {
              this._stateChanges.complete();
            }
            _emitSelectionChangeEvent(e = !1) {
              this.onSelectionChange.emit(new H1(this, e));
            }
          }
          return (
            (n.ɵfac = function (e) {
              ya();
            }),
            (n.ɵdir = x({
              type: n,
              inputs: { value: 'value', id: 'id', disabled: 'disabled' },
              outputs: { onSelectionChange: 'onSelectionChange' },
            })),
            n
          );
        })(),
        eD = (() => {
          class n extends j1 {
            constructor(e, i, r, o) {
              super(e, i, r, o);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(Tn), g(XC, 8), g(JC, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-option']],
              hostAttrs: ['role', 'option', 1, 'mat-option', 'mat-focus-indicator'],
              hostVars: 12,
              hostBindings: function (e, i) {
                1 & e &&
                  X('click', function () {
                    return i._selectViaInteraction();
                  })('keydown', function (o) {
                    return i._handleKeydown(o);
                  }),
                  2 & e &&
                    ($o('id', i.id),
                    Te('tabindex', i._getTabIndex())('aria-selected', i._getAriaSelected())(
                      'aria-disabled',
                      i.disabled.toString()
                    ),
                    Xe('mat-selected', i.selected)('mat-option-multiple', i.multiple)('mat-active', i.active)(
                      'mat-option-disabled',
                      i.disabled
                    ));
              },
              exportAs: ['matOption'],
              features: [G],
              ngContentSelectors: A1,
              decls: 5,
              vars: 4,
              consts: [
                ['class', 'mat-option-pseudo-checkbox', 3, 'state', 'disabled', 4, 'ngIf'],
                [1, 'mat-option-text'],
                ['class', 'cdk-visually-hidden', 4, 'ngIf'],
                ['mat-ripple', '', 1, 'mat-option-ripple', 3, 'matRippleTrigger', 'matRippleDisabled'],
                [1, 'mat-option-pseudo-checkbox', 3, 'state', 'disabled'],
                [1, 'cdk-visually-hidden'],
              ],
              template: function (e, i) {
                1 & e &&
                  (Li(),
                  ue(0, I1, 1, 2, 'mat-pseudo-checkbox', 0),
                  O(1, 'span', 1),
                  mt(2),
                  B(),
                  ue(3, T1, 2, 1, 'span', 2),
                  pt(4, 'div', 3)),
                  2 & e &&
                    (F('ngIf', i.multiple),
                    R(3),
                    F('ngIf', i.group && i.group._inert),
                    R(1),
                    F('matRippleTrigger', i._getHostElement())('matRippleDisabled', i.disabled || i.disableRipple));
              },
              dependencies: [lf, is, L1],
              styles: [
                '.mat-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-option[disabled]{cursor:default}[dir=rtl] .mat-option{text-align:right}.mat-option .mat-icon{margin-right:16px;vertical-align:middle}.mat-option .mat-icon svg{vertical-align:top}[dir=rtl] .mat-option .mat-icon{margin-left:16px;margin-right:0}.mat-option[aria-disabled=true]{-webkit-user-select:none;user-select:none;cursor:default}.mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:32px}[dir=rtl] .mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:16px;padding-right:32px}.mat-option.mat-active::before{content:""}.cdk-high-contrast-active .mat-option[aria-disabled=true]{opacity:.5}.cdk-high-contrast-active .mat-option.mat-selected:not(.mat-option-multiple)::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}[dir=rtl] .cdk-high-contrast-active .mat-option.mat-selected:not(.mat-option-multiple)::after{right:auto;left:16px}.mat-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.mat-option .mat-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .mat-option-pseudo-checkbox{margin-left:8px;margin-right:0}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })();
      function tD(n, t, e) {
        if (e.length) {
          let i = t.toArray(),
            r = e.toArray(),
            o = 0;
          for (let s = 0; s < n + 1; s++) i[s].group && i[s].group === r[o] && o++;
          return o;
        }
        return 0;
      }
      let nD = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({ imports: [QC, qr, tt, V1] })),
          n
        );
      })();
      const $1 = ['mat-button', ''],
        U1 = ['*'],
        W1 = [
          'mat-button',
          'mat-flat-button',
          'mat-icon-button',
          'mat-raised-button',
          'mat-stroked-button',
          'mat-mini-fab',
          'mat-fab',
        ],
        q1 = xl(
          rf(
            sf(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let K1 = (() => {
          class n extends q1 {
            constructor(e, i, r) {
              super(e),
                (this._focusMonitor = i),
                (this._animationMode = r),
                (this.isRoundButton = this._hasHostAttributes('mat-fab', 'mat-mini-fab')),
                (this.isIconButton = this._hasHostAttributes('mat-icon-button'));
              for (const o of W1) this._hasHostAttributes(o) && this._getHostElement().classList.add(o);
              e.nativeElement.classList.add('mat-button-base'), this.isRoundButton && (this.color = 'accent');
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(e, i) {
              e ? this._focusMonitor.focusVia(this._getHostElement(), e, i) : this._getHostElement().focus(i);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...e) {
              return e.some(i => this._getHostElement().hasAttribute(i));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(VC), g(Mn, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [
                ['button', 'mat-button', ''],
                ['button', 'mat-raised-button', ''],
                ['button', 'mat-icon-button', ''],
                ['button', 'mat-fab', ''],
                ['button', 'mat-mini-fab', ''],
                ['button', 'mat-stroked-button', ''],
                ['button', 'mat-flat-button', ''],
              ],
              viewQuery: function (e, i) {
                if ((1 & e && Wn(lf, 5), 2 & e)) {
                  let r;
                  Ee((r = Se())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, 'mat-focus-indicator'],
              hostVars: 5,
              hostBindings: function (e, i) {
                2 & e &&
                  (Te('disabled', i.disabled || null),
                  Xe('_mat-animation-noopable', 'NoopAnimations' === i._animationMode)(
                    'mat-button-disabled',
                    i.disabled
                  ));
              },
              inputs: { disabled: 'disabled', disableRipple: 'disableRipple', color: 'color' },
              exportAs: ['matButton'],
              features: [G],
              attrs: $1,
              ngContentSelectors: U1,
              decls: 4,
              vars: 5,
              consts: [
                [1, 'mat-button-wrapper'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleCentered',
                  'matRippleTrigger',
                ],
                [1, 'mat-button-focus-overlay'],
              ],
              template: function (e, i) {
                1 & e && (Li(), O(0, 'span', 0), mt(1), B(), pt(2, 'span', 1)(3, 'span', 2)),
                  2 & e &&
                    (R(2),
                    Xe('mat-button-ripple-round', i.isRoundButton || i.isIconButton),
                    F('matRippleDisabled', i._isRippleDisabled())('matRippleCentered', i.isIconButton)(
                      'matRippleTrigger',
                      i._getHostElement()
                    ));
              },
              dependencies: [lf],
              styles: [
                '.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}.mat-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.mat-flat-button::before,.mat-raised-button::before,.mat-fab::before,.mat-mini-fab::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-stroked-button::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        Y1 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [QC, tt, tt] })),
            n
          );
        })();
      const Z1 = ['addListener', 'removeListener'],
        Q1 = ['addEventListener', 'removeEventListener'],
        X1 = ['on', 'off'];
      function Ol(n, t, e, i) {
        if ((ie(e) && ((i = e), (e = void 0)), i)) return Ol(n, t, e).pipe(yh(i));
        const [r, o] = (function tL(n) {
          return ie(n.addEventListener) && ie(n.removeEventListener);
        })(n)
          ? Q1.map(s => a => n[s](t, a, e))
          : (function J1(n) {
              return ie(n.addListener) && ie(n.removeListener);
            })(n)
          ? Z1.map(iD(n, t))
          : (function eL(n) {
              return ie(n.on) && ie(n.off);
            })(n)
          ? X1.map(iD(n, t))
          : [];
        if (!r && fc(n)) return co(s => Ol(s, t, e))(vt(n));
        if (!r) throw new TypeError('Invalid event target');
        return new be(s => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return r(a), () => o(a);
        });
      }
      function iD(n, t) {
        return e => i => n[e](t, i);
      }
      const ws = {
        schedule(n) {
          let t = requestAnimationFrame,
            e = cancelAnimationFrame;
          const { delegate: i } = ws;
          i && ((t = i.requestAnimationFrame), (e = i.cancelAnimationFrame));
          const r = t(o => {
            (e = void 0), n(o);
          });
          return new Ne(() => e?.(r));
        },
        requestAnimationFrame(...n) {
          const { delegate: t } = ws;
          return (t?.requestAnimationFrame || requestAnimationFrame)(...n);
        },
        cancelAnimationFrame(...n) {
          const { delegate: t } = ws;
          return (t?.cancelAnimationFrame || cancelAnimationFrame)(...n);
        },
        delegate: void 0,
      };
      new (class iL extends Zh {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class nL extends Yh {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled || (t._scheduled = ws.requestAnimationFrame(() => t.flush(void 0))));
          }
          recycleAsyncId(t, e, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0)) return super.recycleAsyncId(t, e, i);
            t.actions.some(r => r.id === e) || (ws.cancelAnimationFrame(e), (t._scheduled = void 0));
          }
        }
      );
      let cf,
        oL = 1;
      const kl = {};
      function rD(n) {
        return n in kl && (delete kl[n], !0);
      }
      const sL = {
          setImmediate(n) {
            const t = oL++;
            return (kl[t] = !0), cf || (cf = Promise.resolve()), cf.then(() => rD(t) && n()), t;
          },
          clearImmediate(n) {
            rD(n);
          },
        },
        { setImmediate: aL, clearImmediate: lL } = sL,
        Rl = {
          setImmediate(...n) {
            const { delegate: t } = Rl;
            return (t?.setImmediate || aL)(...n);
          },
          clearImmediate(n) {
            const { delegate: t } = Rl;
            return (t?.clearImmediate || lL)(n);
          },
          delegate: void 0,
        };
      new (class uL extends Zh {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class cL extends Yh {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this), t._scheduled || (t._scheduled = Rl.setImmediate(t.flush.bind(t, void 0))));
          }
          recycleAsyncId(t, e, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0)) return super.recycleAsyncId(t, e, i);
            t.actions.some(r => r.id === e) || (Rl.clearImmediate(e), (t._scheduled = void 0));
          }
        }
      );
      function oD(n, t = Qh) {
        return (function hL(n) {
          return qe((t, e) => {
            let i = !1,
              r = null,
              o = null,
              s = !1;
            const a = () => {
                if ((o?.unsubscribe(), (o = null), i)) {
                  i = !1;
                  const c = r;
                  (r = null), e.next(c);
                }
                s && e.complete();
              },
              l = () => {
                (o = null), s && e.complete();
              };
            t.subscribe(
              Le(
                e,
                c => {
                  (i = !0), (r = c), o || vt(n(c)).subscribe((o = Le(e, a, l)));
                },
                () => {
                  (s = !0), (!i || !o || o.closed) && e.complete();
                }
              )
            );
          });
        })(() =>
          (function pL(n = 0, t, e = GN) {
            let i = -1;
            return (
              null != t && (lp(t) ? (e = t) : (i = t)),
              new be(r => {
                let o = (function fL(n) {
                  return n instanceof Date && !isNaN(n);
                })(n)
                  ? +n - e.now()
                  : n;
                o < 0 && (o = 0);
                let s = 0;
                return e.schedule(function () {
                  r.closed || (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete());
                }, o);
              })
            );
          })(n, t)
        );
      }
      let sD = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this._platform = i),
                (this._scrolled = new ee()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = r);
            }
            register(e) {
              this.scrollContainers.has(e) ||
                this.scrollContainers.set(
                  e,
                  e.elementScrolled().subscribe(() => this._scrolled.next(e))
                );
            }
            deregister(e) {
              const i = this.scrollContainers.get(e);
              i && (i.unsubscribe(), this.scrollContainers.delete(e));
            }
            scrolled(e = 20) {
              return this._platform.isBrowser
                ? new be(i => {
                    this._globalSubscription || this._addGlobalListener();
                    const r = e > 0 ? this._scrolled.pipe(oD(e)).subscribe(i) : this._scrolled.subscribe(i);
                    return (
                      this._scrolledCount++,
                      () => {
                        r.unsubscribe(), this._scrolledCount--, this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : _i();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((e, i) => this.deregister(i)),
                this._scrolled.complete();
            }
            ancestorScrolled(e, i) {
              const r = this.getAncestorScrollContainers(e);
              return this.scrolled(i).pipe(Yr(o => !o || r.indexOf(o) > -1));
            }
            getAncestorScrollContainers(e) {
              const i = [];
              return (
                this.scrollContainers.forEach((r, o) => {
                  this._scrollableContainsElement(o, e) && i.push(o);
                }),
                i
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(e, i) {
              let r = Gi(i),
                o = e.getElementRef().nativeElement;
              do {
                if (r == o) return !0;
              } while ((r = r.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                Ol(this._getWindow().document, 'scroll').subscribe(() => this._scrolled.next())
              );
            }
            _removeGlobalListener() {
              this._globalSubscription && (this._globalSubscription.unsubscribe(), (this._globalSubscription = null));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(ne), b(Et), b(Z, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        uf = (() => {
          class n {
            constructor(e, i, r) {
              (this._platform = e),
                (this._change = new ee()),
                (this._changeListener = o => {
                  this._change.next(o);
                }),
                (this._document = r),
                i.runOutsideAngular(() => {
                  if (e.isBrowser) {
                    const o = this._getWindow();
                    o.addEventListener('resize', this._changeListener),
                      o.addEventListener('orientationchange', this._changeListener);
                  }
                  this.change().subscribe(() => (this._viewportSize = null));
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const e = this._getWindow();
                e.removeEventListener('resize', this._changeListener),
                  e.removeEventListener('orientationchange', this._changeListener);
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const e = { width: this._viewportSize.width, height: this._viewportSize.height };
              return this._platform.isBrowser || (this._viewportSize = null), e;
            }
            getViewportRect() {
              const e = this.getViewportScrollPosition(),
                { width: i, height: r } = this.getViewportSize();
              return { top: e.top, left: e.left, bottom: e.top + r, right: e.left + i, height: r, width: i };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const e = this._document,
                i = this._getWindow(),
                r = e.documentElement,
                o = r.getBoundingClientRect();
              return {
                top: -o.top || e.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left: -o.left || e.body.scrollLeft || i.scrollX || r.scrollLeft || 0,
              };
            }
            change(e = 20) {
              return e > 0 ? this._change.pipe(oD(e)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const e = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: e.innerWidth, height: e.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Et), b(ne), b(Z, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        Pl = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({})),
            n
          );
        })(),
        aD = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [vs, Pl, vs, Pl] })),
            n
          );
        })();
      class df {
        attach(t) {
          return (this._attachedHost = t), t.attach(this);
        }
        detach() {
          let t = this._attachedHost;
          null != t && ((this._attachedHost = null), t.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class lD extends df {
        constructor(t, e, i, r) {
          super(),
            (this.component = t),
            (this.viewContainerRef = e),
            (this.injector = i),
            (this.componentFactoryResolver = r);
        }
      }
      class cD extends df {
        constructor(t, e, i, r) {
          super(), (this.templateRef = t), (this.viewContainerRef = e), (this.context = i), (this.injector = r);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(t, e = this.context) {
          return (this.context = e), super.attach(t);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class _L extends df {
        constructor(t) {
          super(), (this.element = t instanceof ye ? t.nativeElement : t);
        }
      }
      class vL extends class yL {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(t) {
          return t instanceof lD
            ? ((this._attachedPortal = t), this.attachComponentPortal(t))
            : t instanceof cD
            ? ((this._attachedPortal = t), this.attachTemplatePortal(t))
            : this.attachDomPortal && t instanceof _L
            ? ((this._attachedPortal = t), this.attachDomPortal(t))
            : void 0;
        }
        detach() {
          this._attachedPortal && (this._attachedPortal.setAttachedHost(null), (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(), this._invokeDisposeFn(), (this._isDisposed = !0);
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      } {
        constructor(t, e, i, r, o) {
          super(),
            (this.outletElement = t),
            (this._componentFactoryResolver = e),
            (this._appRef = i),
            (this._defaultInjector = r),
            (this.attachDomPortal = s => {
              const a = s.element,
                l = this._document.createComment('dom-portal');
              a.parentNode.insertBefore(l, a),
                this.outletElement.appendChild(a),
                (this._attachedPortal = s),
                super.setDisposeFn(() => {
                  l.parentNode && l.parentNode.replaceChild(a, l);
                });
            }),
            (this._document = o);
        }
        attachComponentPortal(t) {
          const i = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component);
          let r;
          return (
            t.viewContainerRef
              ? ((r = t.viewContainerRef.createComponent(
                  i,
                  t.viewContainerRef.length,
                  t.injector || t.viewContainerRef.injector
                )),
                this.setDisposeFn(() => r.destroy()))
              : ((r = i.create(t.injector || this._defaultInjector || qt.NULL)),
                this._appRef.attachView(r.hostView),
                this.setDisposeFn(() => {
                  this._appRef.viewCount > 0 && this._appRef.detachView(r.hostView), r.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(r)),
            (this._attachedPortal = t),
            r
          );
        }
        attachTemplatePortal(t) {
          let e = t.viewContainerRef,
            i = e.createEmbeddedView(t.templateRef, t.context, { injector: t.injector });
          return (
            i.rootNodes.forEach(r => this.outletElement.appendChild(r)),
            i.detectChanges(),
            this.setDisposeFn(() => {
              let r = e.indexOf(i);
              -1 !== r && e.remove(r);
            }),
            (this._attachedPortal = t),
            i
          );
        }
        dispose() {
          super.dispose(), this.outletElement.remove();
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let bL = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({})),
          n
        );
      })();
      const uD = AN();
      class CL {
        constructor(t, e) {
          (this._viewportRuler = t),
            (this._previousHTMLStyles = { top: '', left: '' }),
            (this._isEnabled = !1),
            (this._document = e);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const t = this._document.documentElement;
            (this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = t.style.left || ''),
              (this._previousHTMLStyles.top = t.style.top || ''),
              (t.style.left = ze(-this._previousScrollPosition.left)),
              (t.style.top = ze(-this._previousScrollPosition.top)),
              t.classList.add('cdk-global-scrollblock'),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const t = this._document.documentElement,
              i = t.style,
              r = this._document.body.style,
              o = i.scrollBehavior || '',
              s = r.scrollBehavior || '';
            (this._isEnabled = !1),
              (i.left = this._previousHTMLStyles.left),
              (i.top = this._previousHTMLStyles.top),
              t.classList.remove('cdk-global-scrollblock'),
              uD && (i.scrollBehavior = r.scrollBehavior = 'auto'),
              window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top),
              uD && ((i.scrollBehavior = o), (r.scrollBehavior = s));
          }
        }
        _canBeEnabled() {
          if (this._document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) return !1;
          const e = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return e.scrollHeight > i.height || e.scrollWidth > i.width;
        }
      }
      class DL {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._ngZone = e),
            (this._viewportRuler = i),
            (this._config = r),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(), this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          if (this._scrollSubscription) return;
          const t = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = t.subscribe(() => {
                const e = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(e - this._initialScrollPosition) > this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = t.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription && (this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class dD {
        enable() {}
        disable() {}
        attach() {}
      }
      function hf(n, t) {
        return t.some(e => n.bottom < e.top || n.top > e.bottom || n.right < e.left || n.left > e.right);
      }
      function hD(n, t) {
        return t.some(e => n.top < e.top || n.bottom > e.bottom || n.left < e.left || n.right > e.right);
      }
      class EL {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._viewportRuler = e),
            (this._ngZone = i),
            (this._config = r),
            (this._scrollSubscription = null);
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if ((this._overlayRef.updatePosition(), this._config && this._config.autoClose)) {
                  const e = this._overlayRef.overlayElement.getBoundingClientRect(),
                    { width: i, height: r } = this._viewportRuler.getViewportSize();
                  hf(e, [{ width: i, height: r, bottom: r, right: i, top: 0, left: 0 }]) &&
                    (this.disable(), this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription && (this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let SL = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._scrollDispatcher = e),
              (this._viewportRuler = i),
              (this._ngZone = r),
              (this.noop = () => new dD()),
              (this.close = s => new DL(this._scrollDispatcher, this._ngZone, this._viewportRuler, s)),
              (this.block = () => new CL(this._viewportRuler, this._document)),
              (this.reposition = s => new EL(this._scrollDispatcher, this._viewportRuler, this._ngZone, s)),
              (this._document = o);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(sD), b(uf), b(ne), b(Z));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      class fD {
        constructor(t) {
          if (
            ((this.scrollStrategy = new dD()),
            (this.panelClass = ''),
            (this.hasBackdrop = !1),
            (this.backdropClass = 'cdk-overlay-dark-backdrop'),
            (this.disposeOnNavigation = !1),
            t)
          ) {
            const e = Object.keys(t);
            for (const i of e) void 0 !== t[i] && (this[i] = t[i]);
          }
        }
      }
      class ML {
        constructor(t, e) {
          (this.connectionPair = t), (this.scrollableViewProperties = e);
        }
      }
      let pD = (() => {
          class n {
            constructor(e) {
              (this._attachedOverlays = []), (this._document = e);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(e) {
              this.remove(e), this._attachedOverlays.push(e);
            }
            remove(e) {
              const i = this._attachedOverlays.indexOf(e);
              i > -1 && this._attachedOverlays.splice(i, 1), 0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        IL = (() => {
          class n extends pD {
            constructor(e, i) {
              super(e),
                (this._ngZone = i),
                (this._keydownListener = r => {
                  const o = this._attachedOverlays;
                  for (let s = o.length - 1; s > -1; s--)
                    if (o[s]._keydownEvents.observers.length > 0) {
                      const a = o[s]._keydownEvents;
                      this._ngZone ? this._ngZone.run(() => a.next(r)) : a.next(r);
                      break;
                    }
                });
            }
            add(e) {
              super.add(e),
                this._isAttached ||
                  (this._ngZone
                    ? this._ngZone.runOutsideAngular(() =>
                        this._document.body.addEventListener('keydown', this._keydownListener)
                      )
                    : this._document.body.addEventListener('keydown', this._keydownListener),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener('keydown', this._keydownListener), (this._isAttached = !1));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z), b(ne, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        TL = (() => {
          class n extends pD {
            constructor(e, i, r) {
              super(e),
                (this._platform = i),
                (this._ngZone = r),
                (this._cursorStyleIsSet = !1),
                (this._pointerDownListener = o => {
                  this._pointerDownEventTarget = Ui(o);
                }),
                (this._clickListener = o => {
                  const s = Ui(o),
                    a = 'click' === o.type && this._pointerDownEventTarget ? this._pointerDownEventTarget : s;
                  this._pointerDownEventTarget = null;
                  const l = this._attachedOverlays.slice();
                  for (let c = l.length - 1; c > -1; c--) {
                    const u = l[c];
                    if (u._outsidePointerEvents.observers.length < 1 || !u.hasAttached()) continue;
                    if (u.overlayElement.contains(s) || u.overlayElement.contains(a)) break;
                    const d = u._outsidePointerEvents;
                    this._ngZone ? this._ngZone.run(() => d.next(o)) : d.next(o);
                  }
                });
            }
            add(e) {
              if ((super.add(e), !this._isAttached)) {
                const i = this._document.body;
                this._ngZone
                  ? this._ngZone.runOutsideAngular(() => this._addEventListeners(i))
                  : this._addEventListeners(i),
                  this._platform.IOS &&
                    !this._cursorStyleIsSet &&
                    ((this._cursorOriginalValue = i.style.cursor),
                    (i.style.cursor = 'pointer'),
                    (this._cursorStyleIsSet = !0)),
                  (this._isAttached = !0);
              }
            }
            detach() {
              if (this._isAttached) {
                const e = this._document.body;
                e.removeEventListener('pointerdown', this._pointerDownListener, !0),
                  e.removeEventListener('click', this._clickListener, !0),
                  e.removeEventListener('auxclick', this._clickListener, !0),
                  e.removeEventListener('contextmenu', this._clickListener, !0),
                  this._platform.IOS &&
                    this._cursorStyleIsSet &&
                    ((e.style.cursor = this._cursorOriginalValue), (this._cursorStyleIsSet = !1)),
                  (this._isAttached = !1);
              }
            }
            _addEventListeners(e) {
              e.addEventListener('pointerdown', this._pointerDownListener, !0),
                e.addEventListener('click', this._clickListener, !0),
                e.addEventListener('auxclick', this._clickListener, !0),
                e.addEventListener('contextmenu', this._clickListener, !0);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z), b(Et), b(ne, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        mD = (() => {
          class n {
            constructor(e, i) {
              (this._platform = i), (this._document = e);
            }
            ngOnDestroy() {
              this._containerElement?.remove();
            }
            getContainerElement() {
              return this._containerElement || this._createContainer(), this._containerElement;
            }
            _createContainer() {
              const e = 'cdk-overlay-container';
              if (this._platform.isBrowser || Gh()) {
                const r = this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);
                for (let o = 0; o < r.length; o++) r[o].remove();
              }
              const i = this._document.createElement('div');
              i.classList.add(e),
                Gh()
                  ? i.setAttribute('platform', 'test')
                  : this._platform.isBrowser || i.setAttribute('platform', 'server'),
                this._document.body.appendChild(i),
                (this._containerElement = i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(Z), b(Et));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })();
      class AL {
        constructor(t, e, i, r, o, s, a, l, c, u = !1) {
          (this._portalOutlet = t),
            (this._host = e),
            (this._pane = i),
            (this._config = r),
            (this._ngZone = o),
            (this._keyboardDispatcher = s),
            (this._document = a),
            (this._location = l),
            (this._outsideClickDispatcher = c),
            (this._animationsDisabled = u),
            (this._backdropElement = null),
            (this._backdropClick = new ee()),
            (this._attachments = new ee()),
            (this._detachments = new ee()),
            (this._locationChanges = Ne.EMPTY),
            (this._backdropClickHandler = d => this._backdropClick.next(d)),
            (this._backdropTransitionendHandler = d => {
              this._disposeBackdrop(d.target);
            }),
            (this._keydownEvents = new ee()),
            (this._outsidePointerEvents = new ee()),
            r.scrollStrategy && ((this._scrollStrategy = r.scrollStrategy), this._scrollStrategy.attach(this)),
            (this._positionStrategy = r.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(t) {
          !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host);
          const e = this._portalOutlet.attach(t);
          return (
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable.pipe(Qn(1)).subscribe(() => {
              this.hasAttached() && this.updatePosition();
            }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              (this._locationChanges = this._location.subscribe(() => this.dispose())),
            this._outsideClickDispatcher.add(this),
            'function' == typeof e?.onDestroy &&
              e.onDestroy(() => {
                this.hasAttached() && this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
              }),
            e
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const t = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher.remove(this),
            t
          );
        }
        dispose() {
          const t = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this._disposeBackdrop(this._backdropElement),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._outsidePointerEvents.complete(),
            this._outsideClickDispatcher.remove(this),
            this._host?.remove(),
            (this._previousHostParent = this._pane = this._host = null),
            t && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick;
        }
        attachments() {
          return this._attachments;
        }
        detachments() {
          return this._detachments;
        }
        keydownEvents() {
          return this._keydownEvents;
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents;
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(t) {
          t !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = t),
            this.hasAttached() && (t.attach(this), this.updatePosition()));
        }
        updateSize(t) {
          (this._config = { ...this._config, ...t }), this._updateElementSize();
        }
        setDirection(t) {
          (this._config = { ...this._config, direction: t }), this._updateElementDirection();
        }
        addPanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !0);
        }
        removePanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !1);
        }
        getDirection() {
          const t = this._config.direction;
          return t ? ('string' == typeof t ? t : t.value) : 'ltr';
        }
        updateScrollStrategy(t) {
          t !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = t),
            this.hasAttached() && (t.attach(this), t.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute('dir', this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const t = this._pane.style;
          (t.width = ze(this._config.width)),
            (t.height = ze(this._config.height)),
            (t.minWidth = ze(this._config.minWidth)),
            (t.minHeight = ze(this._config.minHeight)),
            (t.maxWidth = ze(this._config.maxWidth)),
            (t.maxHeight = ze(this._config.maxHeight));
        }
        _togglePointerEvents(t) {
          this._pane.style.pointerEvents = t ? '' : 'none';
        }
        _attachBackdrop() {
          const t = 'cdk-overlay-backdrop-showing';
          (this._backdropElement = this._document.createElement('div')),
            this._backdropElement.classList.add('cdk-overlay-backdrop'),
            this._animationsDisabled && this._backdropElement.classList.add('cdk-overlay-backdrop-noop-animation'),
            this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0),
            this._host.parentElement.insertBefore(this._backdropElement, this._host),
            this._backdropElement.addEventListener('click', this._backdropClickHandler),
            !this._animationsDisabled && typeof requestAnimationFrame < 'u'
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement && this._backdropElement.classList.add(t);
                  });
                })
              : this._backdropElement.classList.add(t);
        }
        _updateStackingOrder() {
          this._host.nextSibling && this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          const t = this._backdropElement;
          if (t) {
            if (this._animationsDisabled) return void this._disposeBackdrop(t);
            t.classList.remove('cdk-overlay-backdrop-showing'),
              this._ngZone.runOutsideAngular(() => {
                t.addEventListener('transitionend', this._backdropTransitionendHandler);
              }),
              (t.style.pointerEvents = 'none'),
              (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
                setTimeout(() => {
                  this._disposeBackdrop(t);
                }, 500)
              ));
          }
        }
        _toggleClasses(t, e, i) {
          const r = Ml(e || []).filter(o => !!o);
          r.length && (i ? t.classList.add(...r) : t.classList.remove(...r));
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const t = this._ngZone.onStable.pipe(Me(mn(this._attachments, this._detachments))).subscribe(() => {
              (!this._pane || !this._host || 0 === this._pane.children.length) &&
                (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1),
                this._host &&
                  this._host.parentElement &&
                  ((this._previousHostParent = this._host.parentElement), this._host.remove()),
                t.unsubscribe());
            });
          });
        }
        _disposeScrollStrategy() {
          const t = this._scrollStrategy;
          t && (t.disable(), t.detach && t.detach());
        }
        _disposeBackdrop(t) {
          t &&
            (t.removeEventListener('click', this._backdropClickHandler),
            t.removeEventListener('transitionend', this._backdropTransitionendHandler),
            t.remove(),
            this._backdropElement === t && (this._backdropElement = null)),
            this._backdropTimeout && (clearTimeout(this._backdropTimeout), (this._backdropTimeout = void 0));
        }
      }
      const gD = 'cdk-overlay-connected-position-bounding-box',
        xL = /([A-Za-z%]+)$/;
      class FL {
        constructor(t, e, i, r, o) {
          (this._viewportRuler = e),
            (this._document = i),
            (this._platform = r),
            (this._overlayContainer = o),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new ee()),
            (this._resizeSubscription = Ne.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges),
            this.setOrigin(t);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          this._validatePositions(),
            t.hostElement.classList.add(gD),
            (this._overlayRef = t),
            (this._boundingBox = t.hostElement),
            (this._pane = t.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
              (this._isInitialRender = !0), this.apply();
            }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (!this._isInitialRender && this._positionLocked && this._lastPosition)
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect()),
            (this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect());
          const t = this._originRect,
            e = this._overlayRect,
            i = this._viewportRect,
            r = this._containerRect,
            o = [];
          let s;
          for (let a of this._preferredPositions) {
            let l = this._getOriginPoint(t, r, a),
              c = this._getOverlayPoint(l, e, a),
              u = this._getOverlayFit(c, e, i, a);
            if (u.isCompletelyWithinViewport) return (this._isPushed = !1), void this._applyPosition(a, l);
            this._canFitWithFlexibleDimensions(u, c, i)
              ? o.push({
                  position: a,
                  origin: l,
                  overlayRect: e,
                  boundingBoxRect: this._calculateBoundingBoxRect(l, a),
                })
              : (!s || s.overlayFit.visibleArea < u.visibleArea) &&
                (s = { overlayFit: u, overlayPoint: c, originPoint: l, position: a, overlayRect: e });
          }
          if (o.length) {
            let a = null,
              l = -1;
            for (const c of o) {
              const u = c.boundingBoxRect.width * c.boundingBoxRect.height * (c.position.weight || 1);
              u > l && ((l = u), (a = c));
            }
            return (this._isPushed = !1), void this._applyPosition(a.position, a.origin);
          }
          if (this._canPush) return (this._isPushed = !0), void this._applyPosition(s.position, s.originPoint);
          this._applyPosition(s.position, s.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              qi(this._boundingBox.style, {
                top: '',
                left: '',
                right: '',
                bottom: '',
                height: '',
                width: '',
                alignItems: '',
                justifyContent: '',
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef && this._overlayRef.hostElement.classList.remove(gD),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          const t = this._lastPosition;
          if (t) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect()),
              (this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect());
            const e = this._getOriginPoint(this._originRect, this._containerRect, t);
            this._applyPosition(t, e);
          } else this.apply();
        }
        withScrollableContainers(t) {
          return (this._scrollables = t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t),
            -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(t) {
          return (this._viewportMargin = t), this;
        }
        withFlexibleDimensions(t = !0) {
          return (this._hasFlexibleDimensions = t), this;
        }
        withGrowAfterOpen(t = !0) {
          return (this._growAfterOpen = t), this;
        }
        withPush(t = !0) {
          return (this._canPush = t), this;
        }
        withLockedPosition(t = !0) {
          return (this._positionLocked = t), this;
        }
        setOrigin(t) {
          return (this._origin = t), this;
        }
        withDefaultOffsetX(t) {
          return (this._offsetX = t), this;
        }
        withDefaultOffsetY(t) {
          return (this._offsetY = t), this;
        }
        withTransformOriginOn(t) {
          return (this._transformOriginSelector = t), this;
        }
        _getOriginPoint(t, e, i) {
          let r, o;
          if ('center' == i.originX) r = t.left + t.width / 2;
          else {
            const s = this._isRtl() ? t.right : t.left,
              a = this._isRtl() ? t.left : t.right;
            r = 'start' == i.originX ? s : a;
          }
          return (
            e.left < 0 && (r -= e.left),
            (o = 'center' == i.originY ? t.top + t.height / 2 : 'top' == i.originY ? t.top : t.bottom),
            e.top < 0 && (o -= e.top),
            { x: r, y: o }
          );
        }
        _getOverlayPoint(t, e, i) {
          let r, o;
          return (
            (r =
              'center' == i.overlayX
                ? -e.width / 2
                : 'start' === i.overlayX
                ? this._isRtl()
                  ? -e.width
                  : 0
                : this._isRtl()
                ? 0
                : -e.width),
            (o = 'center' == i.overlayY ? -e.height / 2 : 'top' == i.overlayY ? 0 : -e.height),
            { x: t.x + r, y: t.y + o }
          );
        }
        _getOverlayFit(t, e, i, r) {
          const o = yD(e);
          let { x: s, y: a } = t,
            l = this._getOffset(r, 'x'),
            c = this._getOffset(r, 'y');
          l && (s += l), c && (a += c);
          let h = 0 - a,
            f = a + o.height - i.height,
            p = this._subtractOverflows(o.width, 0 - s, s + o.width - i.width),
            m = this._subtractOverflows(o.height, h, f),
            _ = p * m;
          return {
            visibleArea: _,
            isCompletelyWithinViewport: o.width * o.height === _,
            fitsInViewportVertically: m === o.height,
            fitsInViewportHorizontally: p == o.width,
          };
        }
        _canFitWithFlexibleDimensions(t, e, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - e.y,
              o = i.right - e.x,
              s = _D(this._overlayRef.getConfig().minHeight),
              a = _D(this._overlayRef.getConfig().minWidth),
              c = t.fitsInViewportHorizontally || (null != a && a <= o);
            return (t.fitsInViewportVertically || (null != s && s <= r)) && c;
          }
          return !1;
        }
        _pushOverlayOnScreen(t, e, i) {
          if (this._previousPushAmount && this._positionLocked)
            return { x: t.x + this._previousPushAmount.x, y: t.y + this._previousPushAmount.y };
          const r = yD(e),
            o = this._viewportRect,
            s = Math.max(t.x + r.width - o.width, 0),
            a = Math.max(t.y + r.height - o.height, 0),
            l = Math.max(o.top - i.top - t.y, 0),
            c = Math.max(o.left - i.left - t.x, 0);
          let u = 0,
            d = 0;
          return (
            (u = r.width <= o.width ? c || -s : t.x < this._viewportMargin ? o.left - i.left - t.x : 0),
            (d = r.height <= o.height ? l || -a : t.y < this._viewportMargin ? o.top - i.top - t.y : 0),
            (this._previousPushAmount = { x: u, y: d }),
            { x: t.x + u, y: t.y + d }
          );
        }
        _applyPosition(t, e) {
          if (
            (this._setTransformOrigin(t),
            this._setOverlayElementStyles(e, t),
            this._setBoundingBoxStyles(e, t),
            t.panelClass && this._addPanelClasses(t.panelClass),
            (this._lastPosition = t),
            this._positionChanges.observers.length)
          ) {
            const i = this._getScrollVisibility(),
              r = new ML(t, i);
            this._positionChanges.next(r);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(t) {
          if (!this._transformOriginSelector) return;
          const e = this._boundingBox.querySelectorAll(this._transformOriginSelector);
          let i,
            r = t.overlayY;
          i =
            'center' === t.overlayX
              ? 'center'
              : this._isRtl()
              ? 'start' === t.overlayX
                ? 'right'
                : 'left'
              : 'start' === t.overlayX
              ? 'left'
              : 'right';
          for (let o = 0; o < e.length; o++) e[o].style.transformOrigin = `${i} ${r}`;
        }
        _calculateBoundingBoxRect(t, e) {
          const i = this._viewportRect,
            r = this._isRtl();
          let o, s, a, u, d, h;
          if ('top' === e.overlayY) (s = t.y), (o = i.height - s + this._viewportMargin);
          else if ('bottom' === e.overlayY)
            (a = i.height - t.y + 2 * this._viewportMargin), (o = i.height - a + this._viewportMargin);
          else {
            const f = Math.min(i.bottom - t.y + i.top, t.y),
              p = this._lastBoundingBoxSize.height;
            (o = 2 * f), (s = t.y - f), o > p && !this._isInitialRender && !this._growAfterOpen && (s = t.y - p / 2);
          }
          if (('end' === e.overlayX && !r) || ('start' === e.overlayX && r))
            (h = i.width - t.x + this._viewportMargin), (u = t.x - this._viewportMargin);
          else if (('start' === e.overlayX && !r) || ('end' === e.overlayX && r)) (d = t.x), (u = i.right - t.x);
          else {
            const f = Math.min(i.right - t.x + i.left, t.x),
              p = this._lastBoundingBoxSize.width;
            (u = 2 * f), (d = t.x - f), u > p && !this._isInitialRender && !this._growAfterOpen && (d = t.x - p / 2);
          }
          return { top: s, left: d, bottom: a, right: h, width: u, height: o };
        }
        _setBoundingBoxStyles(t, e) {
          const i = this._calculateBoundingBoxRect(t, e);
          !this._isInitialRender &&
            !this._growAfterOpen &&
            ((i.height = Math.min(i.height, this._lastBoundingBoxSize.height)),
            (i.width = Math.min(i.width, this._lastBoundingBoxSize.width)));
          const r = {};
          if (this._hasExactPosition())
            (r.top = r.left = '0'), (r.bottom = r.right = r.maxHeight = r.maxWidth = ''), (r.width = r.height = '100%');
          else {
            const o = this._overlayRef.getConfig().maxHeight,
              s = this._overlayRef.getConfig().maxWidth;
            (r.height = ze(i.height)),
              (r.top = ze(i.top)),
              (r.bottom = ze(i.bottom)),
              (r.width = ze(i.width)),
              (r.left = ze(i.left)),
              (r.right = ze(i.right)),
              (r.alignItems = 'center' === e.overlayX ? 'center' : 'end' === e.overlayX ? 'flex-end' : 'flex-start'),
              (r.justifyContent =
                'center' === e.overlayY ? 'center' : 'bottom' === e.overlayY ? 'flex-end' : 'flex-start'),
              o && (r.maxHeight = ze(o)),
              s && (r.maxWidth = ze(s));
          }
          (this._lastBoundingBoxSize = i), qi(this._boundingBox.style, r);
        }
        _resetBoundingBoxStyles() {
          qi(this._boundingBox.style, {
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            height: '',
            width: '',
            alignItems: '',
            justifyContent: '',
          });
        }
        _resetOverlayElementStyles() {
          qi(this._pane.style, { top: '', left: '', bottom: '', right: '', position: '', transform: '' });
        }
        _setOverlayElementStyles(t, e) {
          const i = {},
            r = this._hasExactPosition(),
            o = this._hasFlexibleDimensions,
            s = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            qi(i, this._getExactOverlayY(e, t, u)), qi(i, this._getExactOverlayX(e, t, u));
          } else i.position = 'static';
          let a = '',
            l = this._getOffset(e, 'x'),
            c = this._getOffset(e, 'y');
          l && (a += `translateX(${l}px) `),
            c && (a += `translateY(${c}px)`),
            (i.transform = a.trim()),
            s.maxHeight && (r ? (i.maxHeight = ze(s.maxHeight)) : o && (i.maxHeight = '')),
            s.maxWidth && (r ? (i.maxWidth = ze(s.maxWidth)) : o && (i.maxWidth = '')),
            qi(this._pane.style, i);
        }
        _getExactOverlayY(t, e, i) {
          let r = { top: '', bottom: '' },
            o = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, i)),
            'bottom' === t.overlayY
              ? (r.bottom = this._document.documentElement.clientHeight - (o.y + this._overlayRect.height) + 'px')
              : (r.top = ze(o.y)),
            r
          );
        }
        _getExactOverlayX(t, e, i) {
          let s,
            r = { left: '', right: '' },
            o = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, i)),
            (s = this._isRtl() ? ('end' === t.overlayX ? 'left' : 'right') : 'end' === t.overlayX ? 'right' : 'left'),
            'right' === s
              ? (r.right = this._document.documentElement.clientWidth - (o.x + this._overlayRect.width) + 'px')
              : (r.left = ze(o.x)),
            r
          );
        }
        _getScrollVisibility() {
          const t = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            i = this._scrollables.map(r => r.getElementRef().nativeElement.getBoundingClientRect());
          return {
            isOriginClipped: hD(t, i),
            isOriginOutsideView: hf(t, i),
            isOverlayClipped: hD(e, i),
            isOverlayOutsideView: hf(e, i),
          };
        }
        _subtractOverflows(t, ...e) {
          return e.reduce((i, r) => i - Math.max(r, 0), t);
        }
        _getNarrowedViewportRect() {
          const t = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + t - this._viewportMargin,
            bottom: i.top + e - this._viewportMargin,
            width: t - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return 'rtl' === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(t, e) {
          return 'x' === e ? t.offsetX ?? this._offsetX : t.offsetY ?? this._offsetY;
        }
        _validatePositions() {}
        _addPanelClasses(t) {
          this._pane &&
            Ml(t).forEach(e => {
              '' !== e &&
                -1 === this._appliedPanelClasses.indexOf(e) &&
                (this._appliedPanelClasses.push(e), this._pane.classList.add(e));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach(t => {
              this._pane.classList.remove(t);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const t = this._origin;
          if (t instanceof ye) return t.nativeElement.getBoundingClientRect();
          if (t instanceof Element) return t.getBoundingClientRect();
          const e = t.width || 0,
            i = t.height || 0;
          return { top: t.y, bottom: t.y + i, left: t.x, right: t.x + e, height: i, width: e };
        }
      }
      function qi(n, t) {
        for (let e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
        return n;
      }
      function _D(n) {
        if ('number' != typeof n && null != n) {
          const [t, e] = n.split(xL);
          return e && 'px' !== e ? null : parseFloat(t);
        }
        return n || null;
      }
      function yD(n) {
        return {
          top: Math.floor(n.top),
          right: Math.floor(n.right),
          bottom: Math.floor(n.bottom),
          left: Math.floor(n.left),
          width: Math.floor(n.width),
          height: Math.floor(n.height),
        };
      }
      const vD = 'cdk-global-overlay-wrapper';
      class OL {
        constructor() {
          (this._cssPosition = 'static'),
            (this._topOffset = ''),
            (this._bottomOffset = ''),
            (this._alignItems = ''),
            (this._xPosition = ''),
            (this._xOffset = ''),
            (this._width = ''),
            (this._height = ''),
            (this._isDisposed = !1);
        }
        attach(t) {
          const e = t.getConfig();
          (this._overlayRef = t),
            this._width && !e.width && t.updateSize({ width: this._width }),
            this._height && !e.height && t.updateSize({ height: this._height }),
            t.hostElement.classList.add(vD),
            (this._isDisposed = !1);
        }
        top(t = '') {
          return (this._bottomOffset = ''), (this._topOffset = t), (this._alignItems = 'flex-start'), this;
        }
        left(t = '') {
          return (this._xOffset = t), (this._xPosition = 'left'), this;
        }
        bottom(t = '') {
          return (this._topOffset = ''), (this._bottomOffset = t), (this._alignItems = 'flex-end'), this;
        }
        right(t = '') {
          return (this._xOffset = t), (this._xPosition = 'right'), this;
        }
        start(t = '') {
          return (this._xOffset = t), (this._xPosition = 'start'), this;
        }
        end(t = '') {
          return (this._xOffset = t), (this._xPosition = 'end'), this;
        }
        width(t = '') {
          return this._overlayRef ? this._overlayRef.updateSize({ width: t }) : (this._width = t), this;
        }
        height(t = '') {
          return this._overlayRef ? this._overlayRef.updateSize({ height: t }) : (this._height = t), this;
        }
        centerHorizontally(t = '') {
          return this.left(t), (this._xPosition = 'center'), this;
        }
        centerVertically(t = '') {
          return this.top(t), (this._alignItems = 'center'), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig(),
            { width: r, height: o, maxWidth: s, maxHeight: a } = i,
            l = !(('100%' !== r && '100vw' !== r) || (s && '100%' !== s && '100vw' !== s)),
            c = !(('100%' !== o && '100vh' !== o) || (a && '100%' !== a && '100vh' !== a)),
            u = this._xPosition,
            d = this._xOffset,
            h = 'rtl' === this._overlayRef.getConfig().direction;
          let f = '',
            p = '',
            m = '';
          l
            ? (m = 'flex-start')
            : 'center' === u
            ? ((m = 'center'), h ? (p = d) : (f = d))
            : h
            ? 'left' === u || 'end' === u
              ? ((m = 'flex-end'), (f = d))
              : ('right' === u || 'start' === u) && ((m = 'flex-start'), (p = d))
            : 'left' === u || 'start' === u
            ? ((m = 'flex-start'), (f = d))
            : ('right' === u || 'end' === u) && ((m = 'flex-end'), (p = d)),
            (t.position = this._cssPosition),
            (t.marginLeft = l ? '0' : f),
            (t.marginTop = c ? '0' : this._topOffset),
            (t.marginBottom = this._bottomOffset),
            (t.marginRight = l ? '0' : p),
            (e.justifyContent = m),
            (e.alignItems = c ? 'flex-start' : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement,
            i = e.style;
          e.classList.remove(vD),
            (i.justifyContent =
              i.alignItems =
              t.marginTop =
              t.marginBottom =
              t.marginLeft =
              t.marginRight =
              t.position =
                ''),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let kL = (() => {
          class n {
            constructor(e, i, r, o) {
              (this._viewportRuler = e), (this._document = i), (this._platform = r), (this._overlayContainer = o);
            }
            global() {
              return new OL();
            }
            flexibleConnectedTo(e) {
              return new FL(e, this._viewportRuler, this._document, this._platform, this._overlayContainer);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(uf), b(Z), b(Et), b(mD));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          );
        })(),
        RL = 0,
        eo = (() => {
          class n {
            constructor(e, i, r, o, s, a, l, c, u, d, h, f) {
              (this.scrollStrategies = e),
                (this._overlayContainer = i),
                (this._componentFactoryResolver = r),
                (this._positionBuilder = o),
                (this._keyboardDispatcher = s),
                (this._injector = a),
                (this._ngZone = l),
                (this._document = c),
                (this._directionality = u),
                (this._location = d),
                (this._outsideClickDispatcher = h),
                (this._animationsModuleType = f);
            }
            create(e) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                o = this._createPortalOutlet(r),
                s = new fD(e);
              return (
                (s.direction = s.direction || this._directionality.value),
                new AL(
                  o,
                  i,
                  r,
                  s,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location,
                  this._outsideClickDispatcher,
                  'NoopAnimations' === this._animationsModuleType
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(e) {
              const i = this._document.createElement('div');
              return (i.id = 'cdk-overlay-' + RL++), i.classList.add('cdk-overlay-pane'), e.appendChild(i), i;
            }
            _createHostElement() {
              const e = this._document.createElement('div');
              return this._overlayContainer.getContainerElement().appendChild(e), e;
            }
            _createPortalOutlet(e) {
              return (
                this._appRef || (this._appRef = this._injector.get(Jo)),
                new vL(e, this._componentFactoryResolver, this._appRef, this._injector, this._document)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(b(SL), b(mD), b(ko), b(kL), b(IL), b(qt), b(ne), b(Z), b(Jr), b(ib), b(TL), b(Mn, 8));
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const PL = [
          { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
          { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
          { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
          { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        ],
        bD = new E('cdk-connected-overlay-scroll-strategy');
      let wD = (() => {
          class n {
            constructor(e) {
              this.elementRef = e;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [
                ['', 'cdk-overlay-origin', ''],
                ['', 'overlay-origin', ''],
                ['', 'cdkOverlayOrigin', ''],
              ],
              exportAs: ['cdkOverlayOrigin'],
            })),
            n
          );
        })(),
        CD = (() => {
          class n {
            constructor(e, i, r, o, s) {
              (this._overlay = e),
                (this._dir = s),
                (this._hasBackdrop = !1),
                (this._lockPosition = !1),
                (this._growAfterOpen = !1),
                (this._flexibleDimensions = !1),
                (this._push = !1),
                (this._backdropSubscription = Ne.EMPTY),
                (this._attachSubscription = Ne.EMPTY),
                (this._detachSubscription = Ne.EMPTY),
                (this._positionSubscription = Ne.EMPTY),
                (this.viewportMargin = 0),
                (this.open = !1),
                (this.disableClose = !1),
                (this.backdropClick = new Y()),
                (this.positionChange = new Y()),
                (this.attach = new Y()),
                (this.detach = new Y()),
                (this.overlayKeydown = new Y()),
                (this.overlayOutsideClick = new Y()),
                (this._templatePortal = new cD(i, r)),
                (this._scrollStrategyFactory = o),
                (this.scrollStrategy = this._scrollStrategyFactory());
            }
            get offsetX() {
              return this._offsetX;
            }
            set offsetX(e) {
              (this._offsetX = e), this._position && this._updatePositionStrategy(this._position);
            }
            get offsetY() {
              return this._offsetY;
            }
            set offsetY(e) {
              (this._offsetY = e), this._position && this._updatePositionStrategy(this._position);
            }
            get hasBackdrop() {
              return this._hasBackdrop;
            }
            set hasBackdrop(e) {
              this._hasBackdrop = ve(e);
            }
            get lockPosition() {
              return this._lockPosition;
            }
            set lockPosition(e) {
              this._lockPosition = ve(e);
            }
            get flexibleDimensions() {
              return this._flexibleDimensions;
            }
            set flexibleDimensions(e) {
              this._flexibleDimensions = ve(e);
            }
            get growAfterOpen() {
              return this._growAfterOpen;
            }
            set growAfterOpen(e) {
              this._growAfterOpen = ve(e);
            }
            get push() {
              return this._push;
            }
            set push(e) {
              this._push = ve(e);
            }
            get overlayRef() {
              return this._overlayRef;
            }
            get dir() {
              return this._dir ? this._dir.value : 'ltr';
            }
            ngOnDestroy() {
              this._attachSubscription.unsubscribe(),
                this._detachSubscription.unsubscribe(),
                this._backdropSubscription.unsubscribe(),
                this._positionSubscription.unsubscribe(),
                this._overlayRef && this._overlayRef.dispose();
            }
            ngOnChanges(e) {
              this._position &&
                (this._updatePositionStrategy(this._position),
                this._overlayRef.updateSize({
                  width: this.width,
                  minWidth: this.minWidth,
                  height: this.height,
                  minHeight: this.minHeight,
                }),
                e.origin && this.open && this._position.apply()),
                e.open && (this.open ? this._attachOverlay() : this._detachOverlay());
            }
            _createOverlay() {
              (!this.positions || !this.positions.length) && (this.positions = PL);
              const e = (this._overlayRef = this._overlay.create(this._buildConfig()));
              (this._attachSubscription = e.attachments().subscribe(() => this.attach.emit())),
                (this._detachSubscription = e.detachments().subscribe(() => this.detach.emit())),
                e.keydownEvents().subscribe(i => {
                  this.overlayKeydown.next(i),
                    27 === i.keyCode && !this.disableClose && !vi(i) && (i.preventDefault(), this._detachOverlay());
                }),
                this._overlayRef.outsidePointerEvents().subscribe(i => {
                  this.overlayOutsideClick.next(i);
                });
            }
            _buildConfig() {
              const e = (this._position = this.positionStrategy || this._createPositionStrategy()),
                i = new fD({
                  direction: this._dir,
                  positionStrategy: e,
                  scrollStrategy: this.scrollStrategy,
                  hasBackdrop: this.hasBackdrop,
                });
              return (
                (this.width || 0 === this.width) && (i.width = this.width),
                (this.height || 0 === this.height) && (i.height = this.height),
                (this.minWidth || 0 === this.minWidth) && (i.minWidth = this.minWidth),
                (this.minHeight || 0 === this.minHeight) && (i.minHeight = this.minHeight),
                this.backdropClass && (i.backdropClass = this.backdropClass),
                this.panelClass && (i.panelClass = this.panelClass),
                i
              );
            }
            _updatePositionStrategy(e) {
              const i = this.positions.map(r => ({
                originX: r.originX,
                originY: r.originY,
                overlayX: r.overlayX,
                overlayY: r.overlayY,
                offsetX: r.offsetX || this.offsetX,
                offsetY: r.offsetY || this.offsetY,
                panelClass: r.panelClass || void 0,
              }));
              return e
                .setOrigin(this._getFlexibleConnectedPositionStrategyOrigin())
                .withPositions(i)
                .withFlexibleDimensions(this.flexibleDimensions)
                .withPush(this.push)
                .withGrowAfterOpen(this.growAfterOpen)
                .withViewportMargin(this.viewportMargin)
                .withLockedPosition(this.lockPosition)
                .withTransformOriginOn(this.transformOriginSelector);
            }
            _createPositionStrategy() {
              const e = this._overlay
                .position()
                .flexibleConnectedTo(this._getFlexibleConnectedPositionStrategyOrigin());
              return this._updatePositionStrategy(e), e;
            }
            _getFlexibleConnectedPositionStrategyOrigin() {
              return this.origin instanceof wD ? this.origin.elementRef : this.origin;
            }
            _attachOverlay() {
              this._overlayRef ? (this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop) : this._createOverlay(),
                this._overlayRef.hasAttached() || this._overlayRef.attach(this._templatePortal),
                this.hasBackdrop
                  ? (this._backdropSubscription = this._overlayRef.backdropClick().subscribe(e => {
                      this.backdropClick.emit(e);
                    }))
                  : this._backdropSubscription.unsubscribe(),
                this._positionSubscription.unsubscribe(),
                this.positionChange.observers.length > 0 &&
                  (this._positionSubscription = this._position.positionChanges
                    .pipe(
                      (function wL(n, t = !1) {
                        return qe((e, i) => {
                          let r = 0;
                          e.subscribe(
                            Le(i, o => {
                              const s = n(o, r++);
                              (s || t) && i.next(o), !s && i.complete();
                            })
                          );
                        });
                      })(() => this.positionChange.observers.length > 0)
                    )
                    .subscribe(e => {
                      this.positionChange.emit(e),
                        0 === this.positionChange.observers.length && this._positionSubscription.unsubscribe();
                    }));
            }
            _detachOverlay() {
              this._overlayRef && this._overlayRef.detach(),
                this._backdropSubscription.unsubscribe(),
                this._positionSubscription.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(eo), g(Sn), g(Yt), g(bD), g(Jr, 8));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [
                ['', 'cdk-connected-overlay', ''],
                ['', 'connected-overlay', ''],
                ['', 'cdkConnectedOverlay', ''],
              ],
              inputs: {
                origin: ['cdkConnectedOverlayOrigin', 'origin'],
                positions: ['cdkConnectedOverlayPositions', 'positions'],
                positionStrategy: ['cdkConnectedOverlayPositionStrategy', 'positionStrategy'],
                offsetX: ['cdkConnectedOverlayOffsetX', 'offsetX'],
                offsetY: ['cdkConnectedOverlayOffsetY', 'offsetY'],
                width: ['cdkConnectedOverlayWidth', 'width'],
                height: ['cdkConnectedOverlayHeight', 'height'],
                minWidth: ['cdkConnectedOverlayMinWidth', 'minWidth'],
                minHeight: ['cdkConnectedOverlayMinHeight', 'minHeight'],
                backdropClass: ['cdkConnectedOverlayBackdropClass', 'backdropClass'],
                panelClass: ['cdkConnectedOverlayPanelClass', 'panelClass'],
                viewportMargin: ['cdkConnectedOverlayViewportMargin', 'viewportMargin'],
                scrollStrategy: ['cdkConnectedOverlayScrollStrategy', 'scrollStrategy'],
                open: ['cdkConnectedOverlayOpen', 'open'],
                disableClose: ['cdkConnectedOverlayDisableClose', 'disableClose'],
                transformOriginSelector: ['cdkConnectedOverlayTransformOriginOn', 'transformOriginSelector'],
                hasBackdrop: ['cdkConnectedOverlayHasBackdrop', 'hasBackdrop'],
                lockPosition: ['cdkConnectedOverlayLockPosition', 'lockPosition'],
                flexibleDimensions: ['cdkConnectedOverlayFlexibleDimensions', 'flexibleDimensions'],
                growAfterOpen: ['cdkConnectedOverlayGrowAfterOpen', 'growAfterOpen'],
                push: ['cdkConnectedOverlayPush', 'push'],
              },
              outputs: {
                backdropClick: 'backdropClick',
                positionChange: 'positionChange',
                attach: 'attach',
                detach: 'detach',
                overlayKeydown: 'overlayKeydown',
                overlayOutsideClick: 'overlayOutsideClick',
              },
              exportAs: ['cdkConnectedOverlay'],
              features: [Ut],
            })),
            n
          );
        })();
      const LL = {
        provide: bD,
        deps: [eo],
        useFactory: function NL(n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let DD = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = le({ type: n })),
          (n.ɵinj = oe({ providers: [eo, LL], imports: [vs, bL, aD, aD] })),
          n
        );
      })();
      class ED {}
      const Xn = '*';
      function Nl(n, t) {
        return { type: 7, name: n, definitions: t, options: {} };
      }
      function Cs(n, t = null) {
        return { type: 4, styles: t, timings: n };
      }
      function SD(n, t = null) {
        return { type: 2, steps: n, options: t };
      }
      function St(n) {
        return { type: 6, styles: n, offset: null };
      }
      function to(n, t, e) {
        return { type: 0, name: n, styles: t, options: e };
      }
      function no(n, t, e = null) {
        return { type: 1, expr: n, animation: t, options: e };
      }
      function HL(n = null) {
        return { type: 9, options: n };
      }
      function jL(n, t, e = null) {
        return { type: 11, selector: n, animation: t, options: e };
      }
      function MD(n) {
        Promise.resolve().then(n);
      }
      class Ds {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished || ((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
        }
        triggerMicrotask() {
          MD(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach(t => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach(i => i()), (e.length = 0);
        }
      }
      class ID {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o
            ? MD(() => this._onFinish())
            : this.players.forEach(s => {
                s.onDone(() => {
                  ++e == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++i == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++r == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0));
        }
        _onFinish() {
          this._finished || ((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
        }
        init() {
          this.players.forEach(t => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() || ((this._started = !0), this._onStartFns.forEach(t => t()), (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play());
        }
        pause() {
          this.players.forEach(t => t.pause());
        }
        restart() {
          this.players.forEach(t => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach(t => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(t => t.destroy()),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach(t => t.reset()), (this._destroyed = !1), (this._finished = !1), (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach(i => {
            const r = i.totalTime ? Math.min(1, e / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const t = this.players.reduce((e, i) => (null === e || i.totalTime > e.totalTime ? i : e), null);
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach(t => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach(i => i()), (e.length = 0);
        }
      }
      const zL = ['connectionContainer'],
        $L = ['inputContainer'],
        UL = ['label'];
      function GL(n, t) {
        1 & n &&
          (ci(0),
          O(1, 'div', 14),
          pt(2, 'div', 15)(3, 'div', 16)(4, 'div', 17),
          B(),
          O(5, 'div', 18),
          pt(6, 'div', 15)(7, 'div', 16)(8, 'div', 17),
          B(),
          ui());
      }
      function WL(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'div', 19),
            X('cdkObserveContent', function () {
              return gn(e), _n(he().updateOutlineGap());
            }),
            mt(1, 1),
            B();
        }
        2 & n && F('cdkObserveContentDisabled', 'outline' != he().appearance);
      }
      function qL(n, t) {
        if ((1 & n && (ci(0), mt(1, 2), O(2, 'span'), Je(3), B(), ui()), 2 & n)) {
          const e = he(2);
          R(3), di(e._control.placeholder);
        }
      }
      function KL(n, t) {
        1 & n && mt(0, 3, ['*ngSwitchCase', 'true']);
      }
      function YL(n, t) {
        1 & n && (O(0, 'span', 23), Je(1, ' *'), B());
      }
      function ZL(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'label', 20, 21),
            X('cdkObserveContent', function () {
              return gn(e), _n(he().updateOutlineGap());
            }),
            ue(2, qL, 4, 1, 'ng-container', 12),
            ue(3, KL, 1, 0, 'ng-content', 12),
            ue(4, YL, 2, 0, 'span', 22),
            B();
        }
        if (2 & n) {
          const e = he();
          Xe('mat-empty', e._control.empty && !e._shouldAlwaysFloat())(
            'mat-form-field-empty',
            e._control.empty && !e._shouldAlwaysFloat()
          )('mat-accent', 'accent' == e.color)('mat-warn', 'warn' == e.color),
            F('cdkObserveContentDisabled', 'outline' != e.appearance)('id', e._labelId)('ngSwitch', e._hasLabel()),
            Te('for', e._control.id)('aria-owns', e._control.id),
            R(2),
            F('ngSwitchCase', !1),
            R(1),
            F('ngSwitchCase', !0),
            R(1),
            F('ngIf', !e.hideRequiredMarker && e._control.required && !e._control.disabled);
        }
      }
      function QL(n, t) {
        1 & n && (O(0, 'div', 24), mt(1, 4), B());
      }
      function XL(n, t) {
        if ((1 & n && (O(0, 'div', 25), pt(1, 'span', 26), B()), 2 & n)) {
          const e = he();
          R(1), Xe('mat-accent', 'accent' == e.color)('mat-warn', 'warn' == e.color);
        }
      }
      function JL(n, t) {
        1 & n && (O(0, 'div'), mt(1, 5), B()), 2 & n && F('@transitionMessages', he()._subscriptAnimationState);
      }
      function eV(n, t) {
        if ((1 & n && (O(0, 'div', 30), Je(1), B()), 2 & n)) {
          const e = he(2);
          F('id', e._hintLabelId), R(1), di(e.hintLabel);
        }
      }
      function tV(n, t) {
        if (
          (1 & n && (O(0, 'div', 27), ue(1, eV, 2, 2, 'div', 28), mt(2, 6), pt(3, 'div', 29), mt(4, 7), B()), 2 & n)
        ) {
          const e = he();
          F('@transitionMessages', e._subscriptAnimationState), R(1), F('ngIf', e.hintLabel);
        }
      }
      const nV = [
          '*',
          [['', 'matPrefix', '']],
          [['mat-placeholder']],
          [['mat-label']],
          [['', 'matSuffix', '']],
          [['mat-error']],
          [['mat-hint', 3, 'align', 'end']],
          [['mat-hint', 'align', 'end']],
        ],
        iV = [
          '*',
          '[matPrefix]',
          'mat-placeholder',
          'mat-label',
          '[matSuffix]',
          'mat-error',
          "mat-hint:not([align='end'])",
          "mat-hint[align='end']",
        ],
        rV = new E('MatError'),
        oV = {
          transitionMessages: Nl('transitionMessages', [
            to('enter', St({ opacity: 1, transform: 'translateY(0%)' })),
            no('void => enter', [
              St({ opacity: 0, transform: 'translateY(-5px)' }),
              Cs('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
            ]),
          ]),
        };
      let Ll = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵdir = x({ type: n })),
          n
        );
      })();
      const sV = new E('MatHint');
      let pf = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = x({ type: n, selectors: [['mat-label']] })),
            n
          );
        })(),
        aV = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = x({ type: n, selectors: [['mat-placeholder']] })),
            n
          );
        })();
      const lV = new E('MatPrefix'),
        cV = new E('MatSuffix');
      let TD = 0;
      const dV = xl(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          },
          'primary'
        ),
        hV = new E('MAT_FORM_FIELD_DEFAULT_OPTIONS'),
        xD = new E('MatFormField');
      let FD = (() => {
          class n extends dV {
            constructor(e, i, r, o, s, a, l) {
              super(e),
                (this._changeDetectorRef = i),
                (this._dir = r),
                (this._defaults = o),
                (this._platform = s),
                (this._ngZone = a),
                (this._outlineGapCalculationNeededImmediately = !1),
                (this._outlineGapCalculationNeededOnStable = !1),
                (this._destroyed = new ee()),
                (this._hideRequiredMarker = !1),
                (this._showAlwaysAnimate = !1),
                (this._subscriptAnimationState = ''),
                (this._hintLabel = ''),
                (this._hintLabelId = 'mat-hint-' + TD++),
                (this._labelId = 'mat-form-field-label-' + TD++),
                (this.floatLabel = this._getDefaultFloatLabelState()),
                (this._animationsEnabled = 'NoopAnimations' !== l),
                (this.appearance = o?.appearance || 'legacy'),
                o &&
                  ((this._hideRequiredMarker = Boolean(o.hideRequiredMarker)),
                  o.color && (this.color = this.defaultColor = o.color));
            }
            get appearance() {
              return this._appearance;
            }
            set appearance(e) {
              const i = this._appearance;
              (this._appearance = e || this._defaults?.appearance || 'legacy'),
                'outline' === this._appearance && i !== e && (this._outlineGapCalculationNeededOnStable = !0);
            }
            get hideRequiredMarker() {
              return this._hideRequiredMarker;
            }
            set hideRequiredMarker(e) {
              this._hideRequiredMarker = ve(e);
            }
            _shouldAlwaysFloat() {
              return 'always' === this.floatLabel && !this._showAlwaysAnimate;
            }
            _canLabelFloat() {
              return 'never' !== this.floatLabel;
            }
            get hintLabel() {
              return this._hintLabel;
            }
            set hintLabel(e) {
              (this._hintLabel = e), this._processHints();
            }
            get floatLabel() {
              return 'legacy' !== this.appearance && 'never' === this._floatLabel ? 'auto' : this._floatLabel;
            }
            set floatLabel(e) {
              e !== this._floatLabel &&
                ((this._floatLabel = e || this._getDefaultFloatLabelState()), this._changeDetectorRef.markForCheck());
            }
            get _control() {
              return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic;
            }
            set _control(e) {
              this._explicitFormFieldControl = e;
            }
            getLabelId() {
              return this._hasFloatingLabel() ? this._labelId : null;
            }
            getConnectedOverlayOrigin() {
              return this._connectionContainerRef || this._elementRef;
            }
            ngAfterContentInit() {
              this._validateControlChild();
              const e = this._control;
              e.controlType && this._elementRef.nativeElement.classList.add(`mat-form-field-type-${e.controlType}`),
                e.stateChanges.pipe(Wi(null)).subscribe(() => {
                  this._validatePlaceholders(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck();
                }),
                e.ngControl &&
                  e.ngControl.valueChanges &&
                  e.ngControl.valueChanges
                    .pipe(Me(this._destroyed))
                    .subscribe(() => this._changeDetectorRef.markForCheck()),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.pipe(Me(this._destroyed)).subscribe(() => {
                    this._outlineGapCalculationNeededOnStable && this.updateOutlineGap();
                  });
                }),
                mn(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
                  (this._outlineGapCalculationNeededOnStable = !0), this._changeDetectorRef.markForCheck();
                }),
                this._hintChildren.changes.pipe(Wi(null)).subscribe(() => {
                  this._processHints(), this._changeDetectorRef.markForCheck();
                }),
                this._errorChildren.changes.pipe(Wi(null)).subscribe(() => {
                  this._syncDescribedByIds(), this._changeDetectorRef.markForCheck();
                }),
                this._dir &&
                  this._dir.change.pipe(Me(this._destroyed)).subscribe(() => {
                    'function' == typeof requestAnimationFrame
                      ? this._ngZone.runOutsideAngular(() => {
                          requestAnimationFrame(() => this.updateOutlineGap());
                        })
                      : this.updateOutlineGap();
                  });
            }
            ngAfterContentChecked() {
              this._validateControlChild(), this._outlineGapCalculationNeededImmediately && this.updateOutlineGap();
            }
            ngAfterViewInit() {
              (this._subscriptAnimationState = 'enter'), this._changeDetectorRef.detectChanges();
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            _shouldForward(e) {
              const i = this._control ? this._control.ngControl : null;
              return i && i[e];
            }
            _hasPlaceholder() {
              return !!((this._control && this._control.placeholder) || this._placeholderChild);
            }
            _hasLabel() {
              return !(!this._labelChildNonStatic && !this._labelChildStatic);
            }
            _shouldLabelFloat() {
              return (
                this._canLabelFloat() &&
                ((this._control && this._control.shouldLabelFloat) || this._shouldAlwaysFloat())
              );
            }
            _hideControlPlaceholder() {
              return (
                ('legacy' === this.appearance && !this._hasLabel()) || (this._hasLabel() && !this._shouldLabelFloat())
              );
            }
            _hasFloatingLabel() {
              return this._hasLabel() || ('legacy' === this.appearance && this._hasPlaceholder());
            }
            _getDisplayedMessages() {
              return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState
                ? 'error'
                : 'hint';
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() &&
                this._canLabelFloat() &&
                (this._animationsEnabled &&
                  this._label &&
                  ((this._showAlwaysAnimate = !0),
                  Ol(this._label.nativeElement, 'transitionend')
                    .pipe(Qn(1))
                    .subscribe(() => {
                      this._showAlwaysAnimate = !1;
                    })),
                (this.floatLabel = 'always'),
                this._changeDetectorRef.markForCheck());
            }
            _validatePlaceholders() {}
            _processHints() {
              this._validateHints(), this._syncDescribedByIds();
            }
            _validateHints() {}
            _getDefaultFloatLabelState() {
              return (this._defaults && this._defaults.floatLabel) || 'auto';
            }
            _syncDescribedByIds() {
              if (this._control) {
                let e = [];
                if (
                  (this._control.userAriaDescribedBy &&
                    'string' == typeof this._control.userAriaDescribedBy &&
                    e.push(...this._control.userAriaDescribedBy.split(' ')),
                  'hint' === this._getDisplayedMessages())
                ) {
                  const i = this._hintChildren ? this._hintChildren.find(o => 'start' === o.align) : null,
                    r = this._hintChildren ? this._hintChildren.find(o => 'end' === o.align) : null;
                  i ? e.push(i.id) : this._hintLabel && e.push(this._hintLabelId), r && e.push(r.id);
                } else this._errorChildren && e.push(...this._errorChildren.map(i => i.id));
                this._control.setDescribedByIds(e);
              }
            }
            _validateControlChild() {}
            updateOutlineGap() {
              const e = this._label ? this._label.nativeElement : null,
                i = this._connectionContainerRef.nativeElement,
                r = '.mat-form-field-outline-start',
                o = '.mat-form-field-outline-gap';
              if ('outline' !== this.appearance || !this._platform.isBrowser) return;
              if (!e || !e.children.length || !e.textContent.trim()) {
                const u = i.querySelectorAll(`${r}, ${o}`);
                for (let d = 0; d < u.length; d++) u[d].style.width = '0';
                return;
              }
              if (!this._isAttachedToDOM()) return void (this._outlineGapCalculationNeededImmediately = !0);
              let s = 0,
                a = 0;
              const l = i.querySelectorAll(r),
                c = i.querySelectorAll(o);
              if (this._label && this._label.nativeElement.children.length) {
                const u = i.getBoundingClientRect();
                if (0 === u.width && 0 === u.height)
                  return (
                    (this._outlineGapCalculationNeededOnStable = !0),
                    void (this._outlineGapCalculationNeededImmediately = !1)
                  );
                const d = this._getStartEnd(u),
                  h = e.children,
                  f = this._getStartEnd(h[0].getBoundingClientRect());
                let p = 0;
                for (let m = 0; m < h.length; m++) p += h[m].offsetWidth;
                (s = Math.abs(f - d) - 5), (a = p > 0 ? 0.75 * p + 10 : 0);
              }
              for (let u = 0; u < l.length; u++) l[u].style.width = `${s}px`;
              for (let u = 0; u < c.length; u++) c[u].style.width = `${a}px`;
              this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1;
            }
            _getStartEnd(e) {
              return this._dir && 'rtl' === this._dir.value ? e.right : e.left;
            }
            _isAttachedToDOM() {
              const e = this._elementRef.nativeElement;
              if (e.getRootNode) {
                const i = e.getRootNode();
                return i && i !== e;
              }
              return document.documentElement.contains(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(Tn), g(Jr, 8), g(hV, 8), g(Et), g(ne), g(Mn, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-form-field']],
              contentQueries: function (e, i, r) {
                if (
                  (1 & e &&
                    (et(r, Ll, 5),
                    et(r, Ll, 7),
                    et(r, pf, 5),
                    et(r, pf, 7),
                    et(r, aV, 5),
                    et(r, rV, 5),
                    et(r, sV, 5),
                    et(r, lV, 5),
                    et(r, cV, 5)),
                  2 & e)
                ) {
                  let o;
                  Ee((o = Se())) && (i._controlNonStatic = o.first),
                    Ee((o = Se())) && (i._controlStatic = o.first),
                    Ee((o = Se())) && (i._labelChildNonStatic = o.first),
                    Ee((o = Se())) && (i._labelChildStatic = o.first),
                    Ee((o = Se())) && (i._placeholderChild = o.first),
                    Ee((o = Se())) && (i._errorChildren = o),
                    Ee((o = Se())) && (i._hintChildren = o),
                    Ee((o = Se())) && (i._prefixChildren = o),
                    Ee((o = Se())) && (i._suffixChildren = o);
                }
              },
              viewQuery: function (e, i) {
                if ((1 & e && (Wn(zL, 7), Wn($L, 5), Wn(UL, 5)), 2 & e)) {
                  let r;
                  Ee((r = Se())) && (i._connectionContainerRef = r.first),
                    Ee((r = Se())) && (i._inputContainerRef = r.first),
                    Ee((r = Se())) && (i._label = r.first);
                }
              },
              hostAttrs: [1, 'mat-form-field'],
              hostVars: 40,
              hostBindings: function (e, i) {
                2 & e &&
                  Xe('mat-form-field-appearance-standard', 'standard' == i.appearance)(
                    'mat-form-field-appearance-fill',
                    'fill' == i.appearance
                  )('mat-form-field-appearance-outline', 'outline' == i.appearance)(
                    'mat-form-field-appearance-legacy',
                    'legacy' == i.appearance
                  )('mat-form-field-invalid', i._control.errorState)('mat-form-field-can-float', i._canLabelFloat())(
                    'mat-form-field-should-float',
                    i._shouldLabelFloat()
                  )('mat-form-field-has-label', i._hasFloatingLabel())(
                    'mat-form-field-hide-placeholder',
                    i._hideControlPlaceholder()
                  )('mat-form-field-disabled', i._control.disabled)('mat-form-field-autofilled', i._control.autofilled)(
                    'mat-focused',
                    i._control.focused
                  )('ng-untouched', i._shouldForward('untouched'))('ng-touched', i._shouldForward('touched'))(
                    'ng-pristine',
                    i._shouldForward('pristine')
                  )('ng-dirty', i._shouldForward('dirty'))('ng-valid', i._shouldForward('valid'))(
                    'ng-invalid',
                    i._shouldForward('invalid')
                  )('ng-pending', i._shouldForward('pending'))('_mat-animation-noopable', !i._animationsEnabled);
              },
              inputs: {
                color: 'color',
                appearance: 'appearance',
                hideRequiredMarker: 'hideRequiredMarker',
                hintLabel: 'hintLabel',
                floatLabel: 'floatLabel',
              },
              exportAs: ['matFormField'],
              features: [fe([{ provide: xD, useExisting: n }]), G],
              ngContentSelectors: iV,
              decls: 15,
              vars: 8,
              consts: [
                [1, 'mat-form-field-wrapper'],
                [1, 'mat-form-field-flex', 3, 'click'],
                ['connectionContainer', ''],
                [4, 'ngIf'],
                ['class', 'mat-form-field-prefix', 3, 'cdkObserveContentDisabled', 'cdkObserveContent', 4, 'ngIf'],
                [1, 'mat-form-field-infix'],
                ['inputContainer', ''],
                [1, 'mat-form-field-label-wrapper'],
                [
                  'class',
                  'mat-form-field-label',
                  3,
                  'cdkObserveContentDisabled',
                  'id',
                  'mat-empty',
                  'mat-form-field-empty',
                  'mat-accent',
                  'mat-warn',
                  'ngSwitch',
                  'cdkObserveContent',
                  4,
                  'ngIf',
                ],
                ['class', 'mat-form-field-suffix', 4, 'ngIf'],
                ['class', 'mat-form-field-underline', 4, 'ngIf'],
                [1, 'mat-form-field-subscript-wrapper', 3, 'ngSwitch'],
                [4, 'ngSwitchCase'],
                ['class', 'mat-form-field-hint-wrapper', 4, 'ngSwitchCase'],
                [1, 'mat-form-field-outline'],
                [1, 'mat-form-field-outline-start'],
                [1, 'mat-form-field-outline-gap'],
                [1, 'mat-form-field-outline-end'],
                [1, 'mat-form-field-outline', 'mat-form-field-outline-thick'],
                [1, 'mat-form-field-prefix', 3, 'cdkObserveContentDisabled', 'cdkObserveContent'],
                [1, 'mat-form-field-label', 3, 'cdkObserveContentDisabled', 'id', 'ngSwitch', 'cdkObserveContent'],
                ['label', ''],
                ['class', 'mat-placeholder-required mat-form-field-required-marker', 'aria-hidden', 'true', 4, 'ngIf'],
                ['aria-hidden', 'true', 1, 'mat-placeholder-required', 'mat-form-field-required-marker'],
                [1, 'mat-form-field-suffix'],
                [1, 'mat-form-field-underline'],
                [1, 'mat-form-field-ripple'],
                [1, 'mat-form-field-hint-wrapper'],
                ['class', 'mat-hint', 3, 'id', 4, 'ngIf'],
                [1, 'mat-form-field-hint-spacer'],
                [1, 'mat-hint', 3, 'id'],
              ],
              template: function (e, i) {
                1 & e &&
                  (Li(nV),
                  O(0, 'div', 0)(1, 'div', 1, 2),
                  X('click', function (o) {
                    return i._control.onContainerClick && i._control.onContainerClick(o);
                  }),
                  ue(3, GL, 9, 0, 'ng-container', 3),
                  ue(4, WL, 2, 1, 'div', 4),
                  O(5, 'div', 5, 6),
                  mt(7),
                  O(8, 'span', 7),
                  ue(9, ZL, 5, 16, 'label', 8),
                  B()(),
                  ue(10, QL, 2, 0, 'div', 9),
                  B(),
                  ue(11, XL, 2, 4, 'div', 10),
                  O(12, 'div', 11),
                  ue(13, JL, 2, 1, 'div', 12),
                  ue(14, tV, 5, 2, 'div', 13),
                  B()()),
                  2 & e &&
                    (R(3),
                    F('ngIf', 'outline' == i.appearance),
                    R(1),
                    F('ngIf', i._prefixChildren.length),
                    R(5),
                    F('ngIf', i._hasFloatingLabel()),
                    R(1),
                    F('ngIf', i._suffixChildren.length),
                    R(1),
                    F('ngIf', 'outline' != i.appearance),
                    R(1),
                    F('ngSwitch', i._getDisplayedMessages()),
                    R(1),
                    F('ngSwitchCase', 'error'),
                    R(1),
                    F('ngSwitchCase', 'hint'));
              },
              dependencies: [is, rs, oh, YN],
              styles: [
                '.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.cdk-high-contrast-active .mat-form-field-disabled .mat-form-field-label{color:GrayText}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}',
                '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-form-field-flex{outline:dashed 3px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}',
                '.mat-input-element{font:inherit;background:rgba(0,0,0,0);color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element:not([type=password])::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{opacity:0}._mat-animation-noopable .mat-input-element::placeholder{transition:none}._mat-animation-noopable .mat-input-element::-moz-placeholder{transition:none}._mat-animation-noopable .mat-input-element::-webkit-input-placeholder{transition:none}._mat-animation-noopable .mat-input-element:-ms-input-placeholder{transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}',
                '.mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px)}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px;border-top-color:GrayText}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}',
                '.mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:rgba(0,0,0,0)}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{border:3px dashed}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:GrayText}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}',
                '.mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}',
              ],
              encapsulation: 2,
              data: { animation: [oV.transitionMessages] },
              changeDetection: 0,
            })),
            n
          );
        })(),
        mf = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [qr, tt, SC, tt] })),
            n
          );
        })();
      class OD {
        constructor(t = !1, e, i = !0, r) {
          (this._multiple = t),
            (this._emitChanges = i),
            (this.compareWith = r),
            (this._selection = new Set()),
            (this._deselectedToEmit = []),
            (this._selectedToEmit = []),
            (this.changed = new ee()),
            e &&
              e.length &&
              (t ? e.forEach(o => this._markSelected(o)) : this._markSelected(e[0]), (this._selectedToEmit.length = 0));
        }
        get selected() {
          return this._selected || (this._selected = Array.from(this._selection.values())), this._selected;
        }
        select(...t) {
          this._verifyValueAssignment(t), t.forEach(i => this._markSelected(i));
          const e = this._hasQueuedChanges();
          return this._emitChangeEvent(), e;
        }
        deselect(...t) {
          this._verifyValueAssignment(t), t.forEach(i => this._unmarkSelected(i));
          const e = this._hasQueuedChanges();
          return this._emitChangeEvent(), e;
        }
        setSelection(...t) {
          this._verifyValueAssignment(t);
          const e = this.selected,
            i = new Set(t);
          t.forEach(o => this._markSelected(o)), e.filter(o => !i.has(o)).forEach(o => this._unmarkSelected(o));
          const r = this._hasQueuedChanges();
          return this._emitChangeEvent(), r;
        }
        toggle(t) {
          return this.isSelected(t) ? this.deselect(t) : this.select(t);
        }
        clear(t = !0) {
          this._unmarkAll();
          const e = this._hasQueuedChanges();
          return t && this._emitChangeEvent(), e;
        }
        isSelected(t) {
          if (this.compareWith) {
            for (const e of this._selection) if (this.compareWith(e, t)) return !0;
            return !1;
          }
          return this._selection.has(t);
        }
        isEmpty() {
          return 0 === this._selection.size;
        }
        hasValue() {
          return !this.isEmpty();
        }
        sort(t) {
          this._multiple && this.selected && this._selected.sort(t);
        }
        isMultipleSelection() {
          return this._multiple;
        }
        _emitChangeEvent() {
          (this._selected = null),
            (this._selectedToEmit.length || this._deselectedToEmit.length) &&
              (this.changed.next({ source: this, added: this._selectedToEmit, removed: this._deselectedToEmit }),
              (this._deselectedToEmit = []),
              (this._selectedToEmit = []));
        }
        _markSelected(t) {
          this.isSelected(t) ||
            (this._multiple || this._unmarkAll(),
            this.isSelected(t) || this._selection.add(t),
            this._emitChanges && this._selectedToEmit.push(t));
        }
        _unmarkSelected(t) {
          this.isSelected(t) && (this._selection.delete(t), this._emitChanges && this._deselectedToEmit.push(t));
        }
        _unmarkAll() {
          this.isEmpty() || this._selection.forEach(t => this._unmarkSelected(t));
        }
        _verifyValueAssignment(t) {}
        _hasQueuedChanges() {
          return !(!this._deselectedToEmit.length && !this._selectedToEmit.length);
        }
      }
      function kD(n, t) {
        return qe((e, i) => {
          let r = null,
            o = 0,
            s = !1;
          const a = () => s && !r && i.complete();
          e.subscribe(
            Le(
              i,
              l => {
                r?.unsubscribe();
                let c = 0;
                const u = o++;
                vt(n(l, u)).subscribe(
                  (r = Le(
                    i,
                    d => i.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      const pV = ['trigger'],
        mV = ['panel'];
      function gV(n, t) {
        if ((1 & n && (O(0, 'span', 8), Je(1), B()), 2 & n)) {
          const e = he();
          R(1), di(e.placeholder);
        }
      }
      function _V(n, t) {
        if ((1 & n && (O(0, 'span', 12), Je(1), B()), 2 & n)) {
          const e = he(2);
          R(1), di(e.triggerValue);
        }
      }
      function yV(n, t) {
        1 & n && mt(0, 0, ['*ngSwitchCase', 'true']);
      }
      function vV(n, t) {
        1 & n && (O(0, 'span', 9), ue(1, _V, 2, 1, 'span', 10), ue(2, yV, 1, 0, 'ng-content', 11), B()),
          2 & n && (F('ngSwitch', !!he().customTrigger), R(2), F('ngSwitchCase', !0));
      }
      function bV(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'div', 13)(1, 'div', 14, 15),
            X('@transformPanel.done', function (r) {
              return gn(e), _n(he()._panelDoneAnimatingStream.next(r.toState));
            })('keydown', function (r) {
              return gn(e), _n(he()._handleKeydown(r));
            }),
            mt(3, 1),
            B()();
        }
        if (2 & n) {
          const e = he();
          F('@transformPanelWrap', void 0),
            R(1),
            X_('mat-select-panel ', e._getPanelTheme(), ''),
            Fa('transform-origin', e._transformOrigin)('font-size', e._triggerFontSize, 'px'),
            F('ngClass', e.panelClass)('@transformPanel', e.multiple ? 'showing-multiple' : 'showing'),
            Te('id', e.id + '-panel')('aria-multiselectable', e.multiple)('aria-label', e.ariaLabel || null)(
              'aria-labelledby',
              e._getPanelAriaLabelledby()
            );
        }
      }
      const wV = [[['mat-select-trigger']], '*'],
        CV = ['mat-select-trigger', '*'],
        RD = {
          transformPanelWrap: Nl('transformPanelWrap', [
            no('* => void', jL('@transformPanel', [HL()], { optional: !0 })),
          ]),
          transformPanel: Nl('transformPanel', [
            to('void', St({ transform: 'scaleY(0.8)', minWidth: '100%', opacity: 0 })),
            to('showing', St({ opacity: 1, minWidth: 'calc(100% + 32px)', transform: 'scaleY(1)' })),
            to('showing-multiple', St({ opacity: 1, minWidth: 'calc(100% + 64px)', transform: 'scaleY(1)' })),
            no('void => *', Cs('120ms cubic-bezier(0, 0, 0.2, 1)')),
            no('* => void', Cs('100ms 25ms linear', St({ opacity: 0 }))),
          ]),
        };
      let PD = 0;
      const LD = new E('mat-select-scroll-strategy'),
        MV = new E('MAT_SELECT_CONFIG'),
        IV = {
          provide: LD,
          deps: [eo],
          useFactory: function SV(n) {
            return () => n.scrollStrategies.reposition();
          },
        };
      class TV {
        constructor(t, e) {
          (this.source = t), (this.value = e);
        }
      }
      const AV = sf(
          UC(
            rf(
              GC(
                class {
                  constructor(n, t, e, i, r) {
                    (this._elementRef = n),
                      (this._defaultErrorStateMatcher = t),
                      (this._parentForm = e),
                      (this._parentFormGroup = i),
                      (this.ngControl = r),
                      (this.stateChanges = new ee());
                  }
                }
              )
            )
          )
        ),
        xV = new E('MatSelectTrigger');
      let FV = (() => {
          class n extends AV {
            constructor(e, i, r, o, s, a, l, c, u, d, h, f, p, m) {
              super(s, o, l, c, d),
                (this._viewportRuler = e),
                (this._changeDetectorRef = i),
                (this._ngZone = r),
                (this._dir = a),
                (this._parentFormField = u),
                (this._liveAnnouncer = p),
                (this._defaultOptions = m),
                (this._panelOpen = !1),
                (this._compareWith = (_, y) => _ === y),
                (this._uid = 'mat-select-' + PD++),
                (this._triggerAriaLabelledBy = null),
                (this._destroy = new ee()),
                (this._onChange = () => {}),
                (this._onTouched = () => {}),
                (this._valueId = 'mat-select-value-' + PD++),
                (this._panelDoneAnimatingStream = new ee()),
                (this._overlayPanelClass = this._defaultOptions?.overlayPanelClass || ''),
                (this._focused = !1),
                (this.controlType = 'mat-select'),
                (this._multiple = !1),
                (this._disableOptionCentering = this._defaultOptions?.disableOptionCentering ?? !1),
                (this.ariaLabel = ''),
                (this.optionSelectionChanges = (function fV(n) {
                  return new be(t => {
                    vt(n()).subscribe(t);
                  });
                })(() => {
                  const _ = this.options;
                  return _
                    ? _.changes.pipe(
                        Wi(_),
                        kD(() => mn(..._.map(y => y.onSelectionChange)))
                      )
                    : this._ngZone.onStable.pipe(
                        Qn(1),
                        kD(() => this.optionSelectionChanges)
                      );
                })),
                (this.openedChange = new Y()),
                (this._openedStream = this.openedChange.pipe(
                  Yr(_ => _),
                  Ze(() => {})
                )),
                (this._closedStream = this.openedChange.pipe(
                  Yr(_ => !_),
                  Ze(() => {})
                )),
                (this.selectionChange = new Y()),
                (this.valueChange = new Y()),
                this.ngControl && (this.ngControl.valueAccessor = this),
                null != m?.typeaheadDebounceInterval && (this._typeaheadDebounceInterval = m.typeaheadDebounceInterval),
                (this._scrollStrategyFactory = f),
                (this._scrollStrategy = this._scrollStrategyFactory()),
                (this.tabIndex = parseInt(h) || 0),
                (this.id = this.id);
            }
            get focused() {
              return this._focused || this._panelOpen;
            }
            get placeholder() {
              return this._placeholder;
            }
            set placeholder(e) {
              (this._placeholder = e), this.stateChanges.next();
            }
            get required() {
              return this._required ?? this.ngControl?.control?.hasValidator(Xb.required) ?? !1;
            }
            set required(e) {
              (this._required = ve(e)), this.stateChanges.next();
            }
            get multiple() {
              return this._multiple;
            }
            set multiple(e) {
              this._multiple = ve(e);
            }
            get disableOptionCentering() {
              return this._disableOptionCentering;
            }
            set disableOptionCentering(e) {
              this._disableOptionCentering = ve(e);
            }
            get compareWith() {
              return this._compareWith;
            }
            set compareWith(e) {
              (this._compareWith = e), this._selectionModel && this._initializeSelection();
            }
            get value() {
              return this._value;
            }
            set value(e) {
              this._assignValue(e) && this._onChange(e);
            }
            get typeaheadDebounceInterval() {
              return this._typeaheadDebounceInterval;
            }
            set typeaheadDebounceInterval(e) {
              this._typeaheadDebounceInterval = Zn(e);
            }
            get id() {
              return this._id;
            }
            set id(e) {
              (this._id = e || this._uid), this.stateChanges.next();
            }
            ngOnInit() {
              (this._selectionModel = new OD(this.multiple)),
                this.stateChanges.next(),
                this._panelDoneAnimatingStream
                  .pipe(DC(), Me(this._destroy))
                  .subscribe(() => this._panelDoneAnimating(this.panelOpen));
            }
            ngAfterContentInit() {
              this._initKeyManager(),
                this._selectionModel.changed.pipe(Me(this._destroy)).subscribe(e => {
                  e.added.forEach(i => i.select()), e.removed.forEach(i => i.deselect());
                }),
                this.options.changes.pipe(Wi(null), Me(this._destroy)).subscribe(() => {
                  this._resetOptions(), this._initializeSelection();
                });
            }
            ngDoCheck() {
              const e = this._getTriggerAriaLabelledby(),
                i = this.ngControl;
              if (e !== this._triggerAriaLabelledBy) {
                const r = this._elementRef.nativeElement;
                (this._triggerAriaLabelledBy = e),
                  e ? r.setAttribute('aria-labelledby', e) : r.removeAttribute('aria-labelledby');
              }
              i &&
                (this._previousControl !== i.control &&
                  (void 0 !== this._previousControl &&
                    null !== i.disabled &&
                    i.disabled !== this.disabled &&
                    (this.disabled = i.disabled),
                  (this._previousControl = i.control)),
                this.updateErrorState());
            }
            ngOnChanges(e) {
              (e.disabled || e.userAriaDescribedBy) && this.stateChanges.next(),
                e.typeaheadDebounceInterval &&
                  this._keyManager &&
                  this._keyManager.withTypeAhead(this._typeaheadDebounceInterval);
            }
            ngOnDestroy() {
              this._destroy.next(), this._destroy.complete(), this.stateChanges.complete();
            }
            toggle() {
              this.panelOpen ? this.close() : this.open();
            }
            open() {
              this._canOpen() &&
                ((this._panelOpen = !0),
                this._keyManager.withHorizontalOrientation(null),
                this._highlightCorrectOption(),
                this._changeDetectorRef.markForCheck());
            }
            close() {
              this._panelOpen &&
                ((this._panelOpen = !1),
                this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr'),
                this._changeDetectorRef.markForCheck(),
                this._onTouched());
            }
            writeValue(e) {
              this._assignValue(e);
            }
            registerOnChange(e) {
              this._onChange = e;
            }
            registerOnTouched(e) {
              this._onTouched = e;
            }
            setDisabledState(e) {
              (this.disabled = e), this._changeDetectorRef.markForCheck(), this.stateChanges.next();
            }
            get panelOpen() {
              return this._panelOpen;
            }
            get selected() {
              return this.multiple ? this._selectionModel?.selected || [] : this._selectionModel?.selected[0];
            }
            get triggerValue() {
              if (this.empty) return '';
              if (this._multiple) {
                const e = this._selectionModel.selected.map(i => i.viewValue);
                return this._isRtl() && e.reverse(), e.join(', ');
              }
              return this._selectionModel.selected[0].viewValue;
            }
            _isRtl() {
              return !!this._dir && 'rtl' === this._dir.value;
            }
            _handleKeydown(e) {
              this.disabled || (this.panelOpen ? this._handleOpenKeydown(e) : this._handleClosedKeydown(e));
            }
            _handleClosedKeydown(e) {
              const i = e.keyCode,
                r = 40 === i || 38 === i || 37 === i || 39 === i,
                o = 13 === i || 32 === i,
                s = this._keyManager;
              if ((!s.isTyping() && o && !vi(e)) || ((this.multiple || e.altKey) && r)) e.preventDefault(), this.open();
              else if (!this.multiple) {
                const a = this.selected;
                s.onKeydown(e);
                const l = this.selected;
                l && a !== l && this._liveAnnouncer.announce(l.viewValue, 1e4);
              }
            }
            _handleOpenKeydown(e) {
              const i = this._keyManager,
                r = e.keyCode,
                o = 40 === r || 38 === r,
                s = i.isTyping();
              if (o && e.altKey) e.preventDefault(), this.close();
              else if (s || (13 !== r && 32 !== r) || !i.activeItem || vi(e))
                if (!s && this._multiple && 65 === r && e.ctrlKey) {
                  e.preventDefault();
                  const a = this.options.some(l => !l.disabled && !l.selected);
                  this.options.forEach(l => {
                    l.disabled || (a ? l.select() : l.deselect());
                  });
                } else {
                  const a = i.activeItemIndex;
                  i.onKeydown(e),
                    this._multiple &&
                      o &&
                      e.shiftKey &&
                      i.activeItem &&
                      i.activeItemIndex !== a &&
                      i.activeItem._selectViaInteraction();
                }
              else e.preventDefault(), i.activeItem._selectViaInteraction();
            }
            _onFocus() {
              this.disabled || ((this._focused = !0), this.stateChanges.next());
            }
            _onBlur() {
              (this._focused = !1),
                !this.disabled &&
                  !this.panelOpen &&
                  (this._onTouched(), this._changeDetectorRef.markForCheck(), this.stateChanges.next());
            }
            _onAttached() {
              this._overlayDir.positionChange.pipe(Qn(1)).subscribe(() => {
                this._changeDetectorRef.detectChanges(), this._positioningSettled();
              });
            }
            _getPanelTheme() {
              return this._parentFormField ? `mat-${this._parentFormField.color}` : '';
            }
            get empty() {
              return !this._selectionModel || this._selectionModel.isEmpty();
            }
            _initializeSelection() {
              Promise.resolve().then(() => {
                this.ngControl && (this._value = this.ngControl.value),
                  this._setSelectionByValue(this._value),
                  this.stateChanges.next();
              });
            }
            _setSelectionByValue(e) {
              if (
                (this._selectionModel.selected.forEach(i => i.setInactiveStyles()),
                this._selectionModel.clear(),
                this.multiple && e)
              )
                Array.isArray(e), e.forEach(i => this._selectOptionByValue(i)), this._sortValues();
              else {
                const i = this._selectOptionByValue(e);
                i ? this._keyManager.updateActiveItem(i) : this.panelOpen || this._keyManager.updateActiveItem(-1);
              }
              this._changeDetectorRef.markForCheck();
            }
            _selectOptionByValue(e) {
              const i = this.options.find(r => {
                if (this._selectionModel.isSelected(r)) return !1;
                try {
                  return null != r.value && this._compareWith(r.value, e);
                } catch {
                  return !1;
                }
              });
              return i && this._selectionModel.select(i), i;
            }
            _assignValue(e) {
              return (
                !!(e !== this._value || (this._multiple && Array.isArray(e))) &&
                (this.options && this._setSelectionByValue(e), (this._value = e), !0)
              );
            }
            _initKeyManager() {
              (this._keyManager = new a1(this.options)
                .withTypeAhead(this._typeaheadDebounceInterval)
                .withVerticalOrientation()
                .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
                .withHomeAndEnd()
                .withAllowedModifierKeys(['shiftKey'])),
                this._keyManager.tabOut.pipe(Me(this._destroy)).subscribe(() => {
                  this.panelOpen &&
                    (!this.multiple &&
                      this._keyManager.activeItem &&
                      this._keyManager.activeItem._selectViaInteraction(),
                    this.focus(),
                    this.close());
                }),
                this._keyManager.change.pipe(Me(this._destroy)).subscribe(() => {
                  this._panelOpen && this.panel
                    ? this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0)
                    : !this._panelOpen &&
                      !this.multiple &&
                      this._keyManager.activeItem &&
                      this._keyManager.activeItem._selectViaInteraction();
                });
            }
            _resetOptions() {
              const e = mn(this.options.changes, this._destroy);
              this.optionSelectionChanges.pipe(Me(e)).subscribe(i => {
                this._onSelect(i.source, i.isUserInput),
                  i.isUserInput && !this.multiple && this._panelOpen && (this.close(), this.focus());
              }),
                mn(...this.options.map(i => i._stateChanges))
                  .pipe(Me(e))
                  .subscribe(() => {
                    this._changeDetectorRef.markForCheck(), this.stateChanges.next();
                  });
            }
            _onSelect(e, i) {
              const r = this._selectionModel.isSelected(e);
              null != e.value || this._multiple
                ? (r !== e.selected && (e.selected ? this._selectionModel.select(e) : this._selectionModel.deselect(e)),
                  i && this._keyManager.setActiveItem(e),
                  this.multiple && (this._sortValues(), i && this.focus()))
                : (e.deselect(), this._selectionModel.clear(), null != this.value && this._propagateChanges(e.value)),
                r !== this._selectionModel.isSelected(e) && this._propagateChanges(),
                this.stateChanges.next();
            }
            _sortValues() {
              if (this.multiple) {
                const e = this.options.toArray();
                this._selectionModel.sort((i, r) =>
                  this.sortComparator ? this.sortComparator(i, r, e) : e.indexOf(i) - e.indexOf(r)
                ),
                  this.stateChanges.next();
              }
            }
            _propagateChanges(e) {
              let i = null;
              (i = this.multiple ? this.selected.map(r => r.value) : this.selected ? this.selected.value : e),
                (this._value = i),
                this.valueChange.emit(i),
                this._onChange(i),
                this.selectionChange.emit(this._getChangeEvent(i)),
                this._changeDetectorRef.markForCheck();
            }
            _highlightCorrectOption() {
              this._keyManager &&
                (this.empty
                  ? this._keyManager.setFirstItemActive()
                  : this._keyManager.setActiveItem(this._selectionModel.selected[0]));
            }
            _canOpen() {
              return !this._panelOpen && !this.disabled && this.options?.length > 0;
            }
            focus(e) {
              this._elementRef.nativeElement.focus(e);
            }
            _getPanelAriaLabelledby() {
              if (this.ariaLabel) return null;
              const e = this._parentFormField?.getLabelId();
              return this.ariaLabelledby ? (e ? e + ' ' : '') + this.ariaLabelledby : e;
            }
            _getAriaActiveDescendant() {
              return this.panelOpen && this._keyManager && this._keyManager.activeItem
                ? this._keyManager.activeItem.id
                : null;
            }
            _getTriggerAriaLabelledby() {
              if (this.ariaLabel) return null;
              const e = this._parentFormField?.getLabelId();
              let i = (e ? e + ' ' : '') + this._valueId;
              return this.ariaLabelledby && (i += ' ' + this.ariaLabelledby), i;
            }
            _panelDoneAnimating(e) {
              this.openedChange.emit(e);
            }
            setDescribedByIds(e) {
              e.length
                ? this._elementRef.nativeElement.setAttribute('aria-describedby', e.join(' '))
                : this._elementRef.nativeElement.removeAttribute('aria-describedby');
            }
            onContainerClick() {
              this.focus(), this.open();
            }
            get shouldLabelFloat() {
              return this._panelOpen || !this.empty || (this._focused && !!this._placeholder);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(uf),
                g(Tn),
                g(ne),
                g(Fl),
                g(ye),
                g(Jr, 8),
                g(hs, 8),
                g(fs, 8),
                g(xD, 8),
                g(Fn, 10),
                hr('tabindex'),
                g(LD),
                g(b1),
                g(MV, 8)
              );
            }),
            (n.ɵdir = x({
              type: n,
              viewQuery: function (e, i) {
                if ((1 & e && (Wn(pV, 5), Wn(mV, 5), Wn(CD, 5)), 2 & e)) {
                  let r;
                  Ee((r = Se())) && (i.trigger = r.first),
                    Ee((r = Se())) && (i.panel = r.first),
                    Ee((r = Se())) && (i._overlayDir = r.first);
                }
              },
              inputs: {
                userAriaDescribedBy: ['aria-describedby', 'userAriaDescribedBy'],
                panelClass: 'panelClass',
                placeholder: 'placeholder',
                required: 'required',
                multiple: 'multiple',
                disableOptionCentering: 'disableOptionCentering',
                compareWith: 'compareWith',
                value: 'value',
                ariaLabel: ['aria-label', 'ariaLabel'],
                ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
                errorStateMatcher: 'errorStateMatcher',
                typeaheadDebounceInterval: 'typeaheadDebounceInterval',
                sortComparator: 'sortComparator',
                id: 'id',
              },
              outputs: {
                openedChange: 'openedChange',
                _openedStream: 'opened',
                _closedStream: 'closed',
                selectionChange: 'selectionChange',
                valueChange: 'valueChange',
              },
              features: [G, Ut],
            })),
            n
          );
        })(),
        OV = (() => {
          class n extends FV {
            constructor() {
              super(...arguments),
                (this._scrollTop = 0),
                (this._triggerFontSize = 0),
                (this._transformOrigin = 'top'),
                (this._offsetY = 0),
                (this._positions = [
                  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
                  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
                ]);
            }
            _calculateOverlayScroll(e, i, r) {
              const o = this._getItemHeight();
              return Math.min(Math.max(0, o * e - i + o / 2), r);
            }
            ngOnInit() {
              super.ngOnInit(),
                this._viewportRuler
                  .change()
                  .pipe(Me(this._destroy))
                  .subscribe(() => {
                    this.panelOpen &&
                      ((this._triggerRect = this.trigger.nativeElement.getBoundingClientRect()),
                      this._changeDetectorRef.markForCheck());
                  });
            }
            open() {
              super._canOpen() &&
                (super.open(),
                (this._triggerRect = this.trigger.nativeElement.getBoundingClientRect()),
                (this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0')),
                this._calculateOverlayPosition(),
                this._ngZone.onStable.pipe(Qn(1)).subscribe(() => {
                  this._triggerFontSize &&
                    this._overlayDir.overlayRef &&
                    this._overlayDir.overlayRef.overlayElement &&
                    (this._overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`);
                }));
            }
            _scrollOptionIntoView(e) {
              const i = tD(e, this.options, this.optionGroups),
                r = this._getItemHeight();
              this.panel.nativeElement.scrollTop =
                0 === e && 1 === i
                  ? 0
                  : (function z1(n, t, e, i) {
                      return n < e ? n : n + t > e + i ? Math.max(0, n - i + t) : e;
                    })((e + i) * r, r, this.panel.nativeElement.scrollTop, 256);
            }
            _positioningSettled() {
              this._calculateOverlayOffsetX(), (this.panel.nativeElement.scrollTop = this._scrollTop);
            }
            _panelDoneAnimating(e) {
              this.panelOpen
                ? (this._scrollTop = 0)
                : ((this._overlayDir.offsetX = 0), this._changeDetectorRef.markForCheck()),
                super._panelDoneAnimating(e);
            }
            _getChangeEvent(e) {
              return new TV(this, e);
            }
            _calculateOverlayOffsetX() {
              const e = this._overlayDir.overlayRef.overlayElement.getBoundingClientRect(),
                i = this._viewportRuler.getViewportSize(),
                r = this._isRtl(),
                o = this.multiple ? 56 : 32;
              let s;
              if (this.multiple) s = 40;
              else if (this.disableOptionCentering) s = 16;
              else {
                let c = this._selectionModel.selected[0] || this.options.first;
                s = c && c.group ? 32 : 16;
              }
              r || (s *= -1);
              const a = 0 - (e.left + s - (r ? o : 0)),
                l = e.right + s - i.width + (r ? 0 : o);
              a > 0 ? (s += a + 8) : l > 0 && (s -= l + 8),
                (this._overlayDir.offsetX = Math.round(s)),
                this._overlayDir.overlayRef.updatePosition();
            }
            _calculateOverlayOffsetY(e, i, r) {
              const o = this._getItemHeight(),
                s = (o - this._triggerRect.height) / 2,
                a = Math.floor(256 / o);
              let l;
              return this.disableOptionCentering
                ? 0
                : ((l =
                    0 === this._scrollTop
                      ? e * o
                      : this._scrollTop === r
                      ? (e - (this._getItemCount() - a)) * o + (o - ((this._getItemCount() * o - 256) % o))
                      : i - o / 2),
                  Math.round(-1 * l - s));
            }
            _checkOverlayWithinViewport(e) {
              const i = this._getItemHeight(),
                r = this._viewportRuler.getViewportSize(),
                o = this._triggerRect.top - 8,
                s = r.height - this._triggerRect.bottom - 8,
                a = Math.abs(this._offsetY),
                c = Math.min(this._getItemCount() * i, 256) - a - this._triggerRect.height;
              c > s
                ? this._adjustPanelUp(c, s)
                : a > o
                ? this._adjustPanelDown(a, o, e)
                : (this._transformOrigin = this._getOriginBasedOnOption());
            }
            _adjustPanelUp(e, i) {
              const r = Math.round(e - i);
              (this._scrollTop -= r),
                (this._offsetY -= r),
                (this._transformOrigin = this._getOriginBasedOnOption()),
                this._scrollTop <= 0 &&
                  ((this._scrollTop = 0), (this._offsetY = 0), (this._transformOrigin = '50% bottom 0px'));
            }
            _adjustPanelDown(e, i, r) {
              const o = Math.round(e - i);
              if (
                ((this._scrollTop += o),
                (this._offsetY += o),
                (this._transformOrigin = this._getOriginBasedOnOption()),
                this._scrollTop >= r)
              )
                return (this._scrollTop = r), (this._offsetY = 0), void (this._transformOrigin = '50% top 0px');
            }
            _calculateOverlayPosition() {
              const e = this._getItemHeight(),
                i = this._getItemCount(),
                r = Math.min(i * e, 256),
                s = i * e - r;
              let a;
              (a = this.empty ? 0 : Math.max(this.options.toArray().indexOf(this._selectionModel.selected[0]), 0)),
                (a += tD(a, this.options, this.optionGroups));
              const l = r / 2;
              (this._scrollTop = this._calculateOverlayScroll(a, l, s)),
                (this._offsetY = this._calculateOverlayOffsetY(a, l, s)),
                this._checkOverlayWithinViewport(s);
            }
            _getOriginBasedOnOption() {
              const e = this._getItemHeight(),
                i = (e - this._triggerRect.height) / 2;
              return `50% ${Math.abs(this._offsetY) - i + e / 2}px 0px`;
            }
            _getItemHeight() {
              return 3 * this._triggerFontSize;
            }
            _getItemCount() {
              return this.options.length + this.optionGroups.length;
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (
                  t ||
                  (t = (function Qe(n) {
                    return ti(() => {
                      const t = n.prototype.constructor,
                        e = t[Nn] || Wc(t),
                        i = Object.prototype;
                      let r = Object.getPrototypeOf(n.prototype).constructor;
                      for (; r && r !== i; ) {
                        const o = r[Nn] || Wc(r);
                        if (o && o !== e) return o;
                        r = Object.getPrototypeOf(r);
                      }
                      return o => new o();
                    });
                  })(n))
                )(i || n);
              };
            })()),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-select']],
              contentQueries: function (e, i, r) {
                if ((1 & e && (et(r, xV, 5), et(r, eD, 5), et(r, JC, 5)), 2 & e)) {
                  let o;
                  Ee((o = Se())) && (i.customTrigger = o.first),
                    Ee((o = Se())) && (i.options = o),
                    Ee((o = Se())) && (i.optionGroups = o);
                }
              },
              hostAttrs: ['role', 'combobox', 'aria-autocomplete', 'none', 'aria-haspopup', 'true', 1, 'mat-select'],
              hostVars: 19,
              hostBindings: function (e, i) {
                1 & e &&
                  X('keydown', function (o) {
                    return i._handleKeydown(o);
                  })('focus', function () {
                    return i._onFocus();
                  })('blur', function () {
                    return i._onBlur();
                  }),
                  2 & e &&
                    (Te('id', i.id)('tabindex', i.tabIndex)('aria-controls', i.panelOpen ? i.id + '-panel' : null)(
                      'aria-expanded',
                      i.panelOpen
                    )('aria-label', i.ariaLabel || null)('aria-required', i.required.toString())(
                      'aria-disabled',
                      i.disabled.toString()
                    )('aria-invalid', i.errorState)('aria-activedescendant', i._getAriaActiveDescendant()),
                    Xe('mat-select-disabled', i.disabled)('mat-select-invalid', i.errorState)(
                      'mat-select-required',
                      i.required
                    )('mat-select-empty', i.empty)('mat-select-multiple', i.multiple));
              },
              inputs: { disabled: 'disabled', disableRipple: 'disableRipple', tabIndex: 'tabIndex' },
              exportAs: ['matSelect'],
              features: [
                fe([
                  { provide: Ll, useExisting: n },
                  { provide: XC, useExisting: n },
                ]),
                G,
              ],
              ngContentSelectors: CV,
              decls: 9,
              vars: 12,
              consts: [
                ['cdk-overlay-origin', '', 1, 'mat-select-trigger', 3, 'click'],
                ['origin', 'cdkOverlayOrigin', 'trigger', ''],
                [1, 'mat-select-value', 3, 'ngSwitch'],
                ['class', 'mat-select-placeholder mat-select-min-line', 4, 'ngSwitchCase'],
                ['class', 'mat-select-value-text', 3, 'ngSwitch', 4, 'ngSwitchCase'],
                [1, 'mat-select-arrow-wrapper'],
                [1, 'mat-select-arrow'],
                [
                  'cdk-connected-overlay',
                  '',
                  'cdkConnectedOverlayLockPosition',
                  '',
                  'cdkConnectedOverlayHasBackdrop',
                  '',
                  'cdkConnectedOverlayBackdropClass',
                  'cdk-overlay-transparent-backdrop',
                  3,
                  'cdkConnectedOverlayPanelClass',
                  'cdkConnectedOverlayScrollStrategy',
                  'cdkConnectedOverlayOrigin',
                  'cdkConnectedOverlayOpen',
                  'cdkConnectedOverlayPositions',
                  'cdkConnectedOverlayMinWidth',
                  'cdkConnectedOverlayOffsetY',
                  'backdropClick',
                  'attach',
                  'detach',
                ],
                [1, 'mat-select-placeholder', 'mat-select-min-line'],
                [1, 'mat-select-value-text', 3, 'ngSwitch'],
                ['class', 'mat-select-min-line', 4, 'ngSwitchDefault'],
                [4, 'ngSwitchCase'],
                [1, 'mat-select-min-line'],
                [1, 'mat-select-panel-wrap'],
                ['role', 'listbox', 'tabindex', '-1', 3, 'ngClass', 'keydown'],
                ['panel', ''],
              ],
              template: function (e, i) {
                if (
                  (1 & e &&
                    (Li(wV),
                    O(0, 'div', 0, 1),
                    X('click', function () {
                      return i.toggle();
                    }),
                    O(3, 'div', 2),
                    ue(4, gV, 2, 1, 'span', 3),
                    ue(5, vV, 3, 2, 'span', 4),
                    B(),
                    O(6, 'div', 5),
                    pt(7, 'div', 6),
                    B()(),
                    ue(8, bV, 4, 14, 'ng-template', 7),
                    X('backdropClick', function () {
                      return i.close();
                    })('attach', function () {
                      return i._onAttached();
                    })('detach', function () {
                      return i.close();
                    })),
                  2 & e)
                ) {
                  const r = ld(1);
                  Te('aria-owns', i.panelOpen ? i.id + '-panel' : null),
                    R(3),
                    F('ngSwitch', i.empty),
                    Te('id', i._valueId),
                    R(1),
                    F('ngSwitchCase', !0),
                    R(1),
                    F('ngSwitchCase', !1),
                    R(3),
                    F('cdkConnectedOverlayPanelClass', i._overlayPanelClass)(
                      'cdkConnectedOverlayScrollStrategy',
                      i._scrollStrategy
                    )('cdkConnectedOverlayOrigin', r)('cdkConnectedOverlayOpen', i.panelOpen)(
                      'cdkConnectedOverlayPositions',
                      i._positions
                    )('cdkConnectedOverlayMinWidth', null == i._triggerRect ? null : i._triggerRect.width)(
                      'cdkConnectedOverlayOffsetY',
                      i._offsetY
                    );
                }
              },
              dependencies: [ih, rs, oh, yb, CD, wD],
              styles: [
                '.mat-select{display:inline-block;width:100%;outline:none}.mat-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{height:16px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-form-field-appearance-standard.mat-form-field-has-label .mat-select:not(.mat-select-empty) .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:none}.mat-select-arrow{width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;margin:0 4px}.mat-form-field.mat-focused .mat-select-arrow{transform:translateX(0)}.mat-select-panel-wrap{flex-basis:100%}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%;border-radius:4px;outline:0}.cdk-high-contrast-active .mat-select-panel{outline:solid 1px}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}',
              ],
              encapsulation: 2,
              data: { animation: [RD.transformPanelWrap, RD.transformPanel] },
              changeDetection: 0,
            })),
            n
          );
        })(),
        kV = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [IV], imports: [qr, DD, nD, tt, Pl, mf, nD, tt] })),
            n
          );
        })();
      const RV = ['tooltip'],
        VD = 'tooltip-panel',
        BD = gs({ passive: !0 }),
        HD = new E('mat-tooltip-scroll-strategy'),
        VV = {
          provide: HD,
          deps: [eo],
          useFactory: function LV(n) {
            return () => n.scrollStrategies.reposition({ scrollThrottle: 20 });
          },
        },
        BV = new E('mat-tooltip-default-options', {
          providedIn: 'root',
          factory: function HV() {
            return { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500 };
          },
        });
      let jV = (() => {
          class n {
            constructor(e, i, r, o, s, a, l, c, u, d, h, f) {
              (this._overlay = e),
                (this._elementRef = i),
                (this._scrollDispatcher = r),
                (this._viewContainerRef = o),
                (this._ngZone = s),
                (this._platform = a),
                (this._ariaDescriber = l),
                (this._focusMonitor = c),
                (this._dir = d),
                (this._defaultOptions = h),
                (this._position = 'below'),
                (this._disabled = !1),
                (this._viewInitialized = !1),
                (this._pointerExitEventsInitialized = !1),
                (this._viewportMargin = 8),
                (this._cssClassPrefix = 'mat'),
                (this._showDelay = this._defaultOptions.showDelay),
                (this._hideDelay = this._defaultOptions.hideDelay),
                (this.touchGestures = 'auto'),
                (this._message = ''),
                (this._passiveListeners = []),
                (this._destroyed = new ee()),
                (this._scrollStrategy = u),
                (this._document = f),
                h &&
                  (h.position && (this.position = h.position),
                  h.touchGestures && (this.touchGestures = h.touchGestures)),
                d.change.pipe(Me(this._destroyed)).subscribe(() => {
                  this._overlayRef && this._updatePosition(this._overlayRef);
                });
            }
            get position() {
              return this._position;
            }
            set position(e) {
              e !== this._position &&
                ((this._position = e),
                this._overlayRef &&
                  (this._updatePosition(this._overlayRef),
                  this._tooltipInstance?.show(0),
                  this._overlayRef.updatePosition()));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              (this._disabled = ve(e)), this._disabled ? this.hide(0) : this._setupPointerEnterEventsIfNeeded();
            }
            get showDelay() {
              return this._showDelay;
            }
            set showDelay(e) {
              this._showDelay = Zn(e);
            }
            get hideDelay() {
              return this._hideDelay;
            }
            set hideDelay(e) {
              (this._hideDelay = Zn(e)),
                this._tooltipInstance && (this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay);
            }
            get message() {
              return this._message;
            }
            set message(e) {
              this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, 'tooltip'),
                (this._message = null != e ? String(e).trim() : ''),
                !this._message && this._isTooltipVisible()
                  ? this.hide(0)
                  : (this._setupPointerEnterEventsIfNeeded(),
                    this._updateTooltipMessage(),
                    this._ngZone.runOutsideAngular(() => {
                      Promise.resolve().then(() => {
                        this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, 'tooltip');
                      });
                    }));
            }
            get tooltipClass() {
              return this._tooltipClass;
            }
            set tooltipClass(e) {
              (this._tooltipClass = e), this._tooltipInstance && this._setTooltipClass(this._tooltipClass);
            }
            ngAfterViewInit() {
              (this._viewInitialized = !0),
                this._setupPointerEnterEventsIfNeeded(),
                this._focusMonitor
                  .monitor(this._elementRef)
                  .pipe(Me(this._destroyed))
                  .subscribe(e => {
                    e ? 'keyboard' === e && this._ngZone.run(() => this.show()) : this._ngZone.run(() => this.hide(0));
                  });
            }
            ngOnDestroy() {
              const e = this._elementRef.nativeElement;
              clearTimeout(this._touchstartTimeout),
                this._overlayRef && (this._overlayRef.dispose(), (this._tooltipInstance = null)),
                this._passiveListeners.forEach(([i, r]) => {
                  e.removeEventListener(i, r, BD);
                }),
                (this._passiveListeners.length = 0),
                this._destroyed.next(),
                this._destroyed.complete(),
                this._ariaDescriber.removeDescription(e, this.message, 'tooltip'),
                this._focusMonitor.stopMonitoring(e);
            }
            show(e = this.showDelay) {
              if (
                this.disabled ||
                !this.message ||
                (this._isTooltipVisible() &&
                  !this._tooltipInstance._showTimeoutId &&
                  !this._tooltipInstance._hideTimeoutId)
              )
                return;
              const i = this._createOverlay();
              this._detach(), (this._portal = this._portal || new lD(this._tooltipComponent, this._viewContainerRef));
              const r = (this._tooltipInstance = i.attach(this._portal).instance);
              (r._triggerElement = this._elementRef.nativeElement),
                (r._mouseLeaveHideDelay = this._hideDelay),
                r
                  .afterHidden()
                  .pipe(Me(this._destroyed))
                  .subscribe(() => this._detach()),
                this._setTooltipClass(this._tooltipClass),
                this._updateTooltipMessage(),
                r.show(e);
            }
            hide(e = this.hideDelay) {
              this._tooltipInstance && this._tooltipInstance.hide(e);
            }
            toggle() {
              this._isTooltipVisible() ? this.hide() : this.show();
            }
            _isTooltipVisible() {
              return !!this._tooltipInstance && this._tooltipInstance.isVisible();
            }
            _createOverlay() {
              if (this._overlayRef) return this._overlayRef;
              const e = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),
                i = this._overlay
                  .position()
                  .flexibleConnectedTo(this._elementRef)
                  .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
                  .withFlexibleDimensions(!1)
                  .withViewportMargin(this._viewportMargin)
                  .withScrollableContainers(e);
              return (
                i.positionChanges.pipe(Me(this._destroyed)).subscribe(r => {
                  this._updateCurrentPositionClass(r.connectionPair),
                    this._tooltipInstance &&
                      r.scrollableViewProperties.isOverlayClipped &&
                      this._tooltipInstance.isVisible() &&
                      this._ngZone.run(() => this.hide(0));
                }),
                (this._overlayRef = this._overlay.create({
                  direction: this._dir,
                  positionStrategy: i,
                  panelClass: `${this._cssClassPrefix}-${VD}`,
                  scrollStrategy: this._scrollStrategy(),
                })),
                this._updatePosition(this._overlayRef),
                this._overlayRef
                  .detachments()
                  .pipe(Me(this._destroyed))
                  .subscribe(() => this._detach()),
                this._overlayRef
                  .outsidePointerEvents()
                  .pipe(Me(this._destroyed))
                  .subscribe(() => this._tooltipInstance?._handleBodyInteraction()),
                this._overlayRef
                  .keydownEvents()
                  .pipe(Me(this._destroyed))
                  .subscribe(r => {
                    this._isTooltipVisible() &&
                      27 === r.keyCode &&
                      !vi(r) &&
                      (r.preventDefault(), r.stopPropagation(), this._ngZone.run(() => this.hide(0)));
                  }),
                this._defaultOptions?.disableTooltipInteractivity &&
                  this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),
                this._overlayRef
              );
            }
            _detach() {
              this._overlayRef && this._overlayRef.hasAttached() && this._overlayRef.detach(),
                (this._tooltipInstance = null);
            }
            _updatePosition(e) {
              const i = e.getConfig().positionStrategy,
                r = this._getOrigin(),
                o = this._getOverlayPosition();
              i.withPositions([
                this._addOffset({ ...r.main, ...o.main }),
                this._addOffset({ ...r.fallback, ...o.fallback }),
              ]);
            }
            _addOffset(e) {
              return e;
            }
            _getOrigin() {
              const e = !this._dir || 'ltr' == this._dir.value,
                i = this.position;
              let r;
              'above' == i || 'below' == i
                ? (r = { originX: 'center', originY: 'above' == i ? 'top' : 'bottom' })
                : 'before' == i || ('left' == i && e) || ('right' == i && !e)
                ? (r = { originX: 'start', originY: 'center' })
                : ('after' == i || ('right' == i && e) || ('left' == i && !e)) &&
                  (r = { originX: 'end', originY: 'center' });
              const { x: o, y: s } = this._invertPosition(r.originX, r.originY);
              return { main: r, fallback: { originX: o, originY: s } };
            }
            _getOverlayPosition() {
              const e = !this._dir || 'ltr' == this._dir.value,
                i = this.position;
              let r;
              'above' == i
                ? (r = { overlayX: 'center', overlayY: 'bottom' })
                : 'below' == i
                ? (r = { overlayX: 'center', overlayY: 'top' })
                : 'before' == i || ('left' == i && e) || ('right' == i && !e)
                ? (r = { overlayX: 'end', overlayY: 'center' })
                : ('after' == i || ('right' == i && e) || ('left' == i && !e)) &&
                  (r = { overlayX: 'start', overlayY: 'center' });
              const { x: o, y: s } = this._invertPosition(r.overlayX, r.overlayY);
              return { main: r, fallback: { overlayX: o, overlayY: s } };
            }
            _updateTooltipMessage() {
              this._tooltipInstance &&
                ((this._tooltipInstance.message = this.message),
                this._tooltipInstance._markForCheck(),
                this._ngZone.onMicrotaskEmpty.pipe(Qn(1), Me(this._destroyed)).subscribe(() => {
                  this._tooltipInstance && this._overlayRef.updatePosition();
                }));
            }
            _setTooltipClass(e) {
              this._tooltipInstance &&
                ((this._tooltipInstance.tooltipClass = e), this._tooltipInstance._markForCheck());
            }
            _invertPosition(e, i) {
              return (
                'above' === this.position || 'below' === this.position
                  ? 'top' === i
                    ? (i = 'bottom')
                    : 'bottom' === i && (i = 'top')
                  : 'end' === e
                  ? (e = 'start')
                  : 'start' === e && (e = 'end'),
                { x: e, y: i }
              );
            }
            _updateCurrentPositionClass(e) {
              const { overlayY: i, originX: r, originY: o } = e;
              let s;
              if (
                ((s =
                  'center' === i
                    ? this._dir && 'rtl' === this._dir.value
                      ? 'end' === r
                        ? 'left'
                        : 'right'
                      : 'start' === r
                      ? 'left'
                      : 'right'
                    : 'bottom' === i && 'top' === o
                    ? 'above'
                    : 'below'),
                s !== this._currentPosition)
              ) {
                const a = this._overlayRef;
                if (a) {
                  const l = `${this._cssClassPrefix}-${VD}-`;
                  a.removePanelClass(l + this._currentPosition), a.addPanelClass(l + s);
                }
                this._currentPosition = s;
              }
            }
            _setupPointerEnterEventsIfNeeded() {
              this._disabled ||
                !this.message ||
                !this._viewInitialized ||
                this._passiveListeners.length ||
                (this._platformSupportsMouseEvents()
                  ? this._passiveListeners.push([
                      'mouseenter',
                      () => {
                        this._setupPointerExitEventsIfNeeded(), this.show();
                      },
                    ])
                  : 'off' !== this.touchGestures &&
                    (this._disableNativeGesturesIfNecessary(),
                    this._passiveListeners.push([
                      'touchstart',
                      () => {
                        this._setupPointerExitEventsIfNeeded(),
                          clearTimeout(this._touchstartTimeout),
                          (this._touchstartTimeout = setTimeout(() => this.show(), 500));
                      },
                    ])),
                this._addListeners(this._passiveListeners));
            }
            _setupPointerExitEventsIfNeeded() {
              if (this._pointerExitEventsInitialized) return;
              this._pointerExitEventsInitialized = !0;
              const e = [];
              if (this._platformSupportsMouseEvents())
                e.push(
                  [
                    'mouseleave',
                    i => {
                      const r = i.relatedTarget;
                      (!r || !this._overlayRef?.overlayElement.contains(r)) && this.hide();
                    },
                  ],
                  ['wheel', i => this._wheelListener(i)]
                );
              else if ('off' !== this.touchGestures) {
                this._disableNativeGesturesIfNecessary();
                const i = () => {
                  clearTimeout(this._touchstartTimeout), this.hide(this._defaultOptions.touchendHideDelay);
                };
                e.push(['touchend', i], ['touchcancel', i]);
              }
              this._addListeners(e), this._passiveListeners.push(...e);
            }
            _addListeners(e) {
              e.forEach(([i, r]) => {
                this._elementRef.nativeElement.addEventListener(i, r, BD);
              });
            }
            _platformSupportsMouseEvents() {
              return !this._platform.IOS && !this._platform.ANDROID;
            }
            _wheelListener(e) {
              if (this._isTooltipVisible()) {
                const i = this._document.elementFromPoint(e.clientX, e.clientY),
                  r = this._elementRef.nativeElement;
                i !== r && !r.contains(i) && this.hide();
              }
            }
            _disableNativeGesturesIfNecessary() {
              const e = this.touchGestures;
              if ('off' !== e) {
                const i = this._elementRef.nativeElement,
                  r = i.style;
                ('on' === e || ('INPUT' !== i.nodeName && 'TEXTAREA' !== i.nodeName)) &&
                  (r.userSelect = r.msUserSelect = r.webkitUserSelect = r.MozUserSelect = 'none'),
                  ('on' === e || !i.draggable) && (r.webkitUserDrag = 'none'),
                  (r.touchAction = 'none'),
                  (r.webkitTapHighlightColor = 'transparent');
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              ya();
            }),
            (n.ɵdir = x({
              type: n,
              inputs: {
                position: ['matTooltipPosition', 'position'],
                disabled: ['matTooltipDisabled', 'disabled'],
                showDelay: ['matTooltipShowDelay', 'showDelay'],
                hideDelay: ['matTooltipHideDelay', 'hideDelay'],
                touchGestures: ['matTooltipTouchGestures', 'touchGestures'],
                message: ['matTooltip', 'message'],
                tooltipClass: ['matTooltipClass', 'tooltipClass'],
              },
            })),
            n
          );
        })(),
        zV = (() => {
          class n extends jV {
            constructor(e, i, r, o, s, a, l, c, u, d, h, f) {
              super(e, i, r, o, s, a, l, c, u, d, h, f), (this._tooltipComponent = UV);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(eo),
                g(ye),
                g(sD),
                g(Yt),
                g(ne),
                g(Et),
                g(s1),
                g(VC),
                g(HD),
                g(Jr, 8),
                g(BV, 8),
                g(Z)
              );
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'matTooltip', '']],
              hostAttrs: [1, 'mat-tooltip-trigger'],
              exportAs: ['matTooltip'],
              features: [G],
            })),
            n
          );
        })(),
        $V = (() => {
          class n {
            constructor(e, i) {
              (this._changeDetectorRef = e),
                (this._visibility = 'initial'),
                (this._closeOnInteraction = !1),
                (this._isVisible = !1),
                (this._onHide = new ee()),
                (this._animationsDisabled = 'NoopAnimations' === i);
            }
            show(e) {
              clearTimeout(this._hideTimeoutId),
                (this._showTimeoutId = setTimeout(() => {
                  this._toggleVisibility(!0), (this._showTimeoutId = void 0);
                }, e));
            }
            hide(e) {
              clearTimeout(this._showTimeoutId),
                (this._hideTimeoutId = setTimeout(() => {
                  this._toggleVisibility(!1), (this._hideTimeoutId = void 0);
                }, e));
            }
            afterHidden() {
              return this._onHide;
            }
            isVisible() {
              return this._isVisible;
            }
            ngOnDestroy() {
              clearTimeout(this._showTimeoutId),
                clearTimeout(this._hideTimeoutId),
                this._onHide.complete(),
                (this._triggerElement = null);
            }
            _handleBodyInteraction() {
              this._closeOnInteraction && this.hide(0);
            }
            _markForCheck() {
              this._changeDetectorRef.markForCheck();
            }
            _handleMouseLeave({ relatedTarget: e }) {
              (!e || !this._triggerElement.contains(e)) && this.hide(this._mouseLeaveHideDelay);
            }
            _onShow() {}
            _handleAnimationEnd({ animationName: e }) {
              (e === this._showAnimation || e === this._hideAnimation) &&
                this._finalizeAnimation(e === this._showAnimation);
            }
            _finalizeAnimation(e) {
              e ? (this._closeOnInteraction = !0) : this.isVisible() || this._onHide.next();
            }
            _toggleVisibility(e) {
              const i = this._tooltip.nativeElement,
                r = this._showAnimation,
                o = this._hideAnimation;
              if (
                (i.classList.remove(e ? o : r),
                i.classList.add(e ? r : o),
                (this._isVisible = e),
                e && !this._animationsDisabled && 'function' == typeof getComputedStyle)
              ) {
                const s = getComputedStyle(i);
                ('0s' === s.getPropertyValue('animation-duration') ||
                  'none' === s.getPropertyValue('animation-name')) &&
                  (this._animationsDisabled = !0);
              }
              e && this._onShow(),
                this._animationsDisabled && (i.classList.add('_mat-animation-noopable'), this._finalizeAnimation(e));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Tn), g(Mn, 8));
            }),
            (n.ɵdir = x({ type: n })),
            n
          );
        })(),
        UV = (() => {
          class n extends $V {
            constructor(e, i, r) {
              super(e, r),
                (this._breakpointObserver = i),
                (this._isHandset = this._breakpointObserver.observe(
                  '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)'
                )),
                (this._showAnimation = 'mat-tooltip-show'),
                (this._hideAnimation = 'mat-tooltip-hide');
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Tn), g(TC), g(Mn, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-tooltip-component']],
              viewQuery: function (e, i) {
                if ((1 & e && Wn(RV, 7), 2 & e)) {
                  let r;
                  Ee((r = Se())) && (i._tooltip = r.first);
                }
              },
              hostAttrs: ['aria-hidden', 'true'],
              hostVars: 2,
              hostBindings: function (e, i) {
                1 & e &&
                  X('mouseleave', function (o) {
                    return i._handleMouseLeave(o);
                  }),
                  2 & e && Fa('zoom', i.isVisible() ? 1 : null);
              },
              features: [G],
              decls: 4,
              vars: 6,
              consts: [
                [1, 'mat-tooltip', 3, 'ngClass', 'animationend'],
                ['tooltip', ''],
              ],
              template: function (e, i) {
                if (
                  (1 & e &&
                    (O(0, 'div', 0, 1),
                    X('animationend', function (o) {
                      return i._handleAnimationEnd(o);
                    }),
                    bd(2, 'async'),
                    Je(3),
                    B()),
                  2 & e)
                ) {
                  let r;
                  Xe('mat-tooltip-handset', null == (r = wd(2, 4, i._isHandset)) ? null : r.matches),
                    F('ngClass', i.tooltipClass),
                    R(3),
                    di(i.message);
                }
              },
              dependencies: [ih, sh],
              styles: [
                '.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis;transform:scale(0)}.mat-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}.mat-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-tooltip-show{0%{opacity:0;transform:scale(0)}50%{opacity:.5;transform:scale(0.99)}100%{opacity:1;transform:scale(1)}}@keyframes mat-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}.mat-tooltip-show{animation:mat-tooltip-show 200ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-tooltip-hide{animation:mat-tooltip-hide 100ms cubic-bezier(0, 0, 0.2, 1) forwards}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        GV = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [VV], imports: [C1, qr, DD, tt, tt, Pl] })),
            n
          );
        })();
      function WV(n, t) {
        if ((1 & n && (O(0, 'mat-option', 19), Je(1), B()), 2 & n)) {
          const e = t.$implicit;
          F('value', e), R(1), hi(' ', e, ' ');
        }
      }
      function qV(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'mat-form-field', 16)(1, 'mat-select', 17),
            X('selectionChange', function (r) {
              return gn(e), _n(he(2)._changePageSize(r.value));
            }),
            ue(2, WV, 2, 2, 'mat-option', 18),
            B()();
        }
        if (2 & n) {
          const e = he(2);
          F('appearance', e._formFieldAppearance)('color', e.color),
            R(1),
            F('value', e.pageSize)('disabled', e.disabled)('panelClass', e.selectConfig.panelClass || '')(
              'disableOptionCentering',
              e.selectConfig.disableOptionCentering
            )('aria-label', e._intl.itemsPerPageLabel),
            R(1),
            F('ngForOf', e._displayedPageSizeOptions);
        }
      }
      function KV(n, t) {
        if ((1 & n && (O(0, 'div', 20), Je(1), B()), 2 & n)) {
          const e = he(2);
          R(1), di(e.pageSize);
        }
      }
      function YV(n, t) {
        if (
          (1 & n &&
            (O(0, 'div', 12)(1, 'div', 13),
            Je(2),
            B(),
            ue(3, qV, 3, 8, 'mat-form-field', 14),
            ue(4, KV, 2, 1, 'div', 15),
            B()),
          2 & n)
        ) {
          const e = he();
          R(2),
            hi(' ', e._intl.itemsPerPageLabel, ' '),
            R(1),
            F('ngIf', e._displayedPageSizeOptions.length > 1),
            R(1),
            F('ngIf', e._displayedPageSizeOptions.length <= 1);
        }
      }
      function ZV(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'button', 21),
            X('click', function () {
              return gn(e), _n(he().firstPage());
            }),
            lr(),
            O(1, 'svg', 7),
            pt(2, 'path', 22),
            B()();
        }
        if (2 & n) {
          const e = he();
          F('matTooltip', e._intl.firstPageLabel)('matTooltipDisabled', e._previousButtonsDisabled())(
            'matTooltipPosition',
            'above'
          )('disabled', e._previousButtonsDisabled()),
            Te('aria-label', e._intl.firstPageLabel);
        }
      }
      function QV(n, t) {
        if (1 & n) {
          const e = Gn();
          lr(),
            Hc(),
            O(0, 'button', 23),
            X('click', function () {
              return gn(e), _n(he().lastPage());
            }),
            lr(),
            O(1, 'svg', 7),
            pt(2, 'path', 24),
            B()();
        }
        if (2 & n) {
          const e = he();
          F('matTooltip', e._intl.lastPageLabel)('matTooltipDisabled', e._nextButtonsDisabled())(
            'matTooltipPosition',
            'above'
          )('disabled', e._nextButtonsDisabled()),
            Te('aria-label', e._intl.lastPageLabel);
        }
      }
      let Bl = (() => {
        class n {
          constructor() {
            (this.changes = new ee()),
              (this.itemsPerPageLabel = 'Items per page:'),
              (this.nextPageLabel = 'Next page'),
              (this.previousPageLabel = 'Previous page'),
              (this.firstPageLabel = 'First page'),
              (this.lastPageLabel = 'Last page'),
              (this.getRangeLabel = (e, i, r) => {
                if (0 == r || 0 == i) return `0 of ${r}`;
                const o = e * i;
                return `${o + 1} \u2013 ${o < (r = Math.max(r, 0)) ? Math.min(o + i, r) : o + i} of ${r}`;
              });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      const JV = {
          provide: Bl,
          deps: [[new si(), new vr(), Bl]],
          useFactory: function XV(n) {
            return n || new Bl();
          },
        },
        tB = new E('MAT_PAGINATOR_DEFAULT_OPTIONS'),
        nB = rf(O1(class {}));
      let iB = (() => {
          class n extends nB {
            constructor(e, i, r) {
              if (
                (super(),
                (this._intl = e),
                (this._changeDetectorRef = i),
                (this._pageIndex = 0),
                (this._length = 0),
                (this._pageSizeOptions = []),
                (this._hidePageSize = !1),
                (this._showFirstLastButtons = !1),
                (this.selectConfig = {}),
                (this.page = new Y()),
                (this._intlChanges = e.changes.subscribe(() => this._changeDetectorRef.markForCheck())),
                r)
              ) {
                const { pageSize: o, pageSizeOptions: s, hidePageSize: a, showFirstLastButtons: l } = r;
                null != o && (this._pageSize = o),
                  null != s && (this._pageSizeOptions = s),
                  null != a && (this._hidePageSize = a),
                  null != l && (this._showFirstLastButtons = l);
              }
            }
            get pageIndex() {
              return this._pageIndex;
            }
            set pageIndex(e) {
              (this._pageIndex = Math.max(Zn(e), 0)), this._changeDetectorRef.markForCheck();
            }
            get length() {
              return this._length;
            }
            set length(e) {
              (this._length = Zn(e)), this._changeDetectorRef.markForCheck();
            }
            get pageSize() {
              return this._pageSize;
            }
            set pageSize(e) {
              (this._pageSize = Math.max(Zn(e), 0)), this._updateDisplayedPageSizeOptions();
            }
            get pageSizeOptions() {
              return this._pageSizeOptions;
            }
            set pageSizeOptions(e) {
              (this._pageSizeOptions = (e || []).map(i => Zn(i))), this._updateDisplayedPageSizeOptions();
            }
            get hidePageSize() {
              return this._hidePageSize;
            }
            set hidePageSize(e) {
              this._hidePageSize = ve(e);
            }
            get showFirstLastButtons() {
              return this._showFirstLastButtons;
            }
            set showFirstLastButtons(e) {
              this._showFirstLastButtons = ve(e);
            }
            ngOnInit() {
              (this._initialized = !0), this._updateDisplayedPageSizeOptions(), this._markInitialized();
            }
            ngOnDestroy() {
              this._intlChanges.unsubscribe();
            }
            nextPage() {
              if (!this.hasNextPage()) return;
              const e = this.pageIndex;
              (this.pageIndex = this.pageIndex + 1), this._emitPageEvent(e);
            }
            previousPage() {
              if (!this.hasPreviousPage()) return;
              const e = this.pageIndex;
              (this.pageIndex = this.pageIndex - 1), this._emitPageEvent(e);
            }
            firstPage() {
              if (!this.hasPreviousPage()) return;
              const e = this.pageIndex;
              (this.pageIndex = 0), this._emitPageEvent(e);
            }
            lastPage() {
              if (!this.hasNextPage()) return;
              const e = this.pageIndex;
              (this.pageIndex = this.getNumberOfPages() - 1), this._emitPageEvent(e);
            }
            hasPreviousPage() {
              return this.pageIndex >= 1 && 0 != this.pageSize;
            }
            hasNextPage() {
              const e = this.getNumberOfPages() - 1;
              return this.pageIndex < e && 0 != this.pageSize;
            }
            getNumberOfPages() {
              return this.pageSize ? Math.ceil(this.length / this.pageSize) : 0;
            }
            _changePageSize(e) {
              const r = this.pageIndex;
              (this.pageIndex = Math.floor((this.pageIndex * this.pageSize) / e) || 0),
                (this.pageSize = e),
                this._emitPageEvent(r);
            }
            _nextButtonsDisabled() {
              return this.disabled || !this.hasNextPage();
            }
            _previousButtonsDisabled() {
              return this.disabled || !this.hasPreviousPage();
            }
            _updateDisplayedPageSizeOptions() {
              !this._initialized ||
                (this.pageSize || (this._pageSize = 0 != this.pageSizeOptions.length ? this.pageSizeOptions[0] : 50),
                (this._displayedPageSizeOptions = this.pageSizeOptions.slice()),
                -1 === this._displayedPageSizeOptions.indexOf(this.pageSize) &&
                  this._displayedPageSizeOptions.push(this.pageSize),
                this._displayedPageSizeOptions.sort((e, i) => e - i),
                this._changeDetectorRef.markForCheck());
            }
            _emitPageEvent(e) {
              this.page.emit({
                previousPageIndex: e,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                length: this.length,
              });
            }
          }
          return (
            (n.ɵfac = function (e) {
              ya();
            }),
            (n.ɵdir = x({
              type: n,
              inputs: {
                color: 'color',
                pageIndex: 'pageIndex',
                length: 'length',
                pageSize: 'pageSize',
                pageSizeOptions: 'pageSizeOptions',
                hidePageSize: 'hidePageSize',
                showFirstLastButtons: 'showFirstLastButtons',
                selectConfig: 'selectConfig',
              },
              outputs: { page: 'page' },
              features: [G],
            })),
            n
          );
        })(),
        rB = (() => {
          class n extends iB {
            constructor(e, i, r) {
              super(e, i, r), r && null != r.formFieldAppearance && (this._formFieldAppearance = r.formFieldAppearance);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Bl), g(Tn), g(tB, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-paginator']],
              hostAttrs: ['role', 'group', 1, 'mat-paginator'],
              inputs: { disabled: 'disabled' },
              exportAs: ['matPaginator'],
              features: [G],
              decls: 14,
              vars: 14,
              consts: [
                [1, 'mat-paginator-outer-container'],
                [1, 'mat-paginator-container'],
                ['class', 'mat-paginator-page-size', 4, 'ngIf'],
                [1, 'mat-paginator-range-actions'],
                [1, 'mat-paginator-range-label'],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  'class',
                  'mat-paginator-navigation-first',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                  4,
                  'ngIf',
                ],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  1,
                  'mat-paginator-navigation-previous',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                ],
                ['viewBox', '0 0 24 24', 'focusable', 'false', 1, 'mat-paginator-icon'],
                ['d', 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  1,
                  'mat-paginator-navigation-next',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                ],
                ['d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  'class',
                  'mat-paginator-navigation-last',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                  4,
                  'ngIf',
                ],
                [1, 'mat-paginator-page-size'],
                [1, 'mat-paginator-page-size-label'],
                ['class', 'mat-paginator-page-size-select', 3, 'appearance', 'color', 4, 'ngIf'],
                ['class', 'mat-paginator-page-size-value', 4, 'ngIf'],
                [1, 'mat-paginator-page-size-select', 3, 'appearance', 'color'],
                [3, 'value', 'disabled', 'panelClass', 'disableOptionCentering', 'aria-label', 'selectionChange'],
                [3, 'value', 4, 'ngFor', 'ngForOf'],
                [3, 'value'],
                [1, 'mat-paginator-page-size-value'],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  1,
                  'mat-paginator-navigation-first',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                ],
                ['d', 'M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z'],
                [
                  'mat-icon-button',
                  '',
                  'type',
                  'button',
                  1,
                  'mat-paginator-navigation-last',
                  3,
                  'matTooltip',
                  'matTooltipDisabled',
                  'matTooltipPosition',
                  'disabled',
                  'click',
                ],
                ['d', 'M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z'],
              ],
              template: function (e, i) {
                1 & e &&
                  (O(0, 'div', 0)(1, 'div', 1),
                  ue(2, YV, 5, 3, 'div', 2),
                  O(3, 'div', 3)(4, 'div', 4),
                  Je(5),
                  B(),
                  ue(6, ZV, 3, 5, 'button', 5),
                  O(7, 'button', 6),
                  X('click', function () {
                    return i.previousPage();
                  }),
                  lr(),
                  O(8, 'svg', 7),
                  pt(9, 'path', 8),
                  B()(),
                  Hc(),
                  O(10, 'button', 9),
                  X('click', function () {
                    return i.nextPage();
                  }),
                  lr(),
                  O(11, 'svg', 7),
                  pt(12, 'path', 10),
                  B()(),
                  ue(13, QV, 3, 5, 'button', 11),
                  B()()()),
                  2 & e &&
                    (R(2),
                    F('ngIf', !i.hidePageSize),
                    R(3),
                    hi(' ', i._intl.getRangeLabel(i.pageIndex, i.pageSize, i.length), ' '),
                    R(1),
                    F('ngIf', i.showFirstLastButtons),
                    R(1),
                    F('matTooltip', i._intl.previousPageLabel)('matTooltipDisabled', i._previousButtonsDisabled())(
                      'matTooltipPosition',
                      'above'
                    )('disabled', i._previousButtonsDisabled()),
                    Te('aria-label', i._intl.previousPageLabel),
                    R(3),
                    F('matTooltip', i._intl.nextPageLabel)('matTooltipDisabled', i._nextButtonsDisabled())(
                      'matTooltipPosition',
                      'above'
                    )('disabled', i._nextButtonsDisabled()),
                    Te('aria-label', i._intl.nextPageLabel),
                    R(3),
                    F('ngIf', i.showFirstLastButtons));
              },
              dependencies: [il, is, K1, FD, OV, eD, zV],
              styles: [
                '.mat-paginator{display:block}.mat-paginator-outer-container{display:flex}.mat-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-paginator-page-size{margin-right:0;margin-left:8px}.mat-paginator-page-size-label{margin:0 4px}.mat-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.mat-paginator-page-size-select.mat-form-field-appearance-outline{width:64px}.mat-paginator-page-size-select.mat-form-field-appearance-fill{width:64px}.mat-paginator-range-label{margin:0 32px 0 24px}.mat-paginator-range-actions{display:flex;align-items:center}.mat-paginator-icon{display:inline-block;width:28px;fill:currentColor}[dir=rtl] .mat-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-paginator-icon{fill:CanvasText}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        oB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [JV], imports: [qr, Y1, kV, GV, tt] })),
            n
          );
        })();
      const sB = ['*'],
        jD = new E('MatChipRemove'),
        zD = new E('MatChipAvatar'),
        $D = new E('MatChipTrailingIcon');
      class aB {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const lB = UC(xl(sf(aB), 'primary'), -1);
      let Hl = (() => {
          class n extends lB {
            constructor(e, i, r, o, s, a, l, c) {
              super(e),
                (this._ngZone = i),
                (this._changeDetectorRef = s),
                (this._hasFocus = !1),
                (this.chipListSelectable = !0),
                (this._chipListMultiple = !1),
                (this._chipListDisabled = !1),
                (this.role = 'option'),
                (this._selected = !1),
                (this._selectable = !0),
                (this._disabled = !1),
                (this._removable = !0),
                (this._onFocus = new ee()),
                (this._onBlur = new ee()),
                (this.selectionChange = new Y()),
                (this.destroyed = new Y()),
                (this.removed = new Y()),
                this._addHostClassName(),
                (this._chipRippleTarget = a.createElement('div')),
                this._chipRippleTarget.classList.add('mat-chip-ripple'),
                this._elementRef.nativeElement.appendChild(this._chipRippleTarget),
                (this._chipRipple = new YC(this, i, this._chipRippleTarget, r)),
                this._chipRipple.setupTriggerEvents(e),
                (this.rippleConfig = o || {}),
                (this._animationsDisabled = 'NoopAnimations' === l),
                (this.tabIndex = (null != c && parseInt(c)) || -1);
            }
            get rippleDisabled() {
              return this.disabled || this.disableRipple || this._animationsDisabled || !!this.rippleConfig.disabled;
            }
            get selected() {
              return this._selected;
            }
            set selected(e) {
              const i = ve(e);
              i !== this._selected && ((this._selected = i), this._dispatchSelectionChange());
            }
            get value() {
              return void 0 !== this._value ? this._value : this._elementRef.nativeElement.textContent;
            }
            set value(e) {
              this._value = e;
            }
            get selectable() {
              return this._selectable && this.chipListSelectable;
            }
            set selectable(e) {
              this._selectable = ve(e);
            }
            get disabled() {
              return this._chipListDisabled || this._disabled;
            }
            set disabled(e) {
              this._disabled = ve(e);
            }
            get removable() {
              return this._removable;
            }
            set removable(e) {
              this._removable = ve(e);
            }
            get ariaSelected() {
              return this.selectable && (this._chipListMultiple || this.selected) ? this.selected.toString() : null;
            }
            _addHostClassName() {
              const e = 'mat-basic-chip',
                i = this._elementRef.nativeElement;
              i.hasAttribute(e) || i.tagName.toLowerCase() === e
                ? i.classList.add(e)
                : i.classList.add('mat-standard-chip');
            }
            ngOnDestroy() {
              this.destroyed.emit({ chip: this }), this._chipRipple._removeTriggerEvents();
            }
            select() {
              this._selected ||
                ((this._selected = !0), this._dispatchSelectionChange(), this._changeDetectorRef.markForCheck());
            }
            deselect() {
              this._selected &&
                ((this._selected = !1), this._dispatchSelectionChange(), this._changeDetectorRef.markForCheck());
            }
            selectViaInteraction() {
              this._selected ||
                ((this._selected = !0), this._dispatchSelectionChange(!0), this._changeDetectorRef.markForCheck());
            }
            toggleSelected(e = !1) {
              return (
                (this._selected = !this.selected),
                this._dispatchSelectionChange(e),
                this._changeDetectorRef.markForCheck(),
                this.selected
              );
            }
            focus() {
              this._hasFocus || (this._elementRef.nativeElement.focus(), this._onFocus.next({ chip: this })),
                (this._hasFocus = !0);
            }
            remove() {
              this.removable && this.removed.emit({ chip: this });
            }
            _handleClick(e) {
              this.disabled && e.preventDefault();
            }
            _handleKeydown(e) {
              if (!this.disabled)
                switch (e.keyCode) {
                  case 46:
                  case 8:
                    this.remove(), e.preventDefault();
                    break;
                  case 32:
                    this.selectable && this.toggleSelected(!0), e.preventDefault();
                }
            }
            _blur() {
              this._ngZone.onStable.pipe(Qn(1)).subscribe(() => {
                this._ngZone.run(() => {
                  (this._hasFocus = !1), this._onBlur.next({ chip: this });
                });
              });
            }
            _dispatchSelectionChange(e = !1) {
              this.selectionChange.emit({ source: this, isUserInput: e, selected: this._selected });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(ne), g(Et), g(ZC, 8), g(Tn), g(Z), g(Mn, 8), hr('tabindex'));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['mat-basic-chip'], ['', 'mat-basic-chip', ''], ['mat-chip'], ['', 'mat-chip', '']],
              contentQueries: function (e, i, r) {
                if ((1 & e && (et(r, zD, 5), et(r, $D, 5), et(r, jD, 5)), 2 & e)) {
                  let o;
                  Ee((o = Se())) && (i.avatar = o.first),
                    Ee((o = Se())) && (i.trailingIcon = o.first),
                    Ee((o = Se())) && (i.removeIcon = o.first);
                }
              },
              hostAttrs: [1, 'mat-chip', 'mat-focus-indicator'],
              hostVars: 15,
              hostBindings: function (e, i) {
                1 & e &&
                  X('click', function (o) {
                    return i._handleClick(o);
                  })('keydown', function (o) {
                    return i._handleKeydown(o);
                  })('focus', function () {
                    return i.focus();
                  })('blur', function () {
                    return i._blur();
                  }),
                  2 & e &&
                    (Te('tabindex', i.disabled ? null : i.tabIndex)('role', i.role)('disabled', i.disabled || null)(
                      'aria-disabled',
                      i.disabled.toString()
                    )('aria-selected', i.ariaSelected),
                    Xe('mat-chip-selected', i.selected)('mat-chip-with-avatar', i.avatar)(
                      'mat-chip-with-trailing-icon',
                      i.trailingIcon || i.removeIcon
                    )('mat-chip-disabled', i.disabled)('_mat-animation-noopable', i._animationsDisabled));
              },
              inputs: {
                color: 'color',
                disableRipple: 'disableRipple',
                tabIndex: 'tabIndex',
                role: 'role',
                selected: 'selected',
                value: 'value',
                selectable: 'selectable',
                disabled: 'disabled',
                removable: 'removable',
              },
              outputs: { selectionChange: 'selectionChange', destroyed: 'destroyed', removed: 'removed' },
              exportAs: ['matChip'],
              features: [G],
            })),
            n
          );
        })(),
        UD = (() => {
          class n {
            constructor(e, i) {
              (this._parentChip = e),
                'BUTTON' === i.nativeElement.nodeName && i.nativeElement.setAttribute('type', 'button');
            }
            _handleClick(e) {
              const i = this._parentChip;
              i.removable && !i.disabled && i.remove(), e.stopPropagation(), e.preventDefault();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Hl), g(ye));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['', 'matChipRemove', '']],
              hostAttrs: [1, 'mat-chip-remove', 'mat-chip-trailing-icon'],
              hostBindings: function (e, i) {
                1 & e &&
                  X('click', function (o) {
                    return i._handleClick(o);
                  });
              },
              features: [fe([{ provide: jD, useExisting: n }])],
            })),
            n
          );
        })();
      const GD = new E('mat-chips-default-options'),
        dB = GC(
          class {
            constructor(n, t, e, i) {
              (this._defaultErrorStateMatcher = n),
                (this._parentForm = t),
                (this._parentFormGroup = e),
                (this.ngControl = i),
                (this.stateChanges = new ee());
            }
          }
        );
      let hB = 0;
      class fB {
        constructor(t, e) {
          (this.source = t), (this.value = e);
        }
      }
      let WD = (() => {
          class n extends dB {
            constructor(e, i, r, o, s, a, l) {
              super(a, o, s, l),
                (this._elementRef = e),
                (this._changeDetectorRef = i),
                (this._dir = r),
                (this.controlType = 'mat-chip-list'),
                (this._lastDestroyedChipIndex = null),
                (this._destroyed = new ee()),
                (this._uid = 'mat-chip-list-' + hB++),
                (this._tabIndex = 0),
                (this._userTabIndex = null),
                (this._onTouched = () => {}),
                (this._onChange = () => {}),
                (this._multiple = !1),
                (this._compareWith = (c, u) => c === u),
                (this._disabled = !1),
                (this.ariaOrientation = 'horizontal'),
                (this._selectable = !0),
                (this.change = new Y()),
                (this.valueChange = new Y()),
                this.ngControl && (this.ngControl.valueAccessor = this);
            }
            get selected() {
              return this.multiple ? this._selectionModel?.selected || [] : this._selectionModel?.selected[0];
            }
            get role() {
              return this._explicitRole ? this._explicitRole : this.empty ? null : 'listbox';
            }
            set role(e) {
              this._explicitRole = e;
            }
            get multiple() {
              return this._multiple;
            }
            set multiple(e) {
              (this._multiple = ve(e)), this._syncChipsState();
            }
            get compareWith() {
              return this._compareWith;
            }
            set compareWith(e) {
              (this._compareWith = e), this._selectionModel && this._initializeSelection();
            }
            get value() {
              return this._value;
            }
            set value(e) {
              this.writeValue(e), (this._value = e);
            }
            get id() {
              return this._chipInput ? this._chipInput.id : this._uid;
            }
            get required() {
              return this._required ?? this.ngControl?.control?.hasValidator(Xb.required) ?? !1;
            }
            set required(e) {
              (this._required = ve(e)), this.stateChanges.next();
            }
            get placeholder() {
              return this._chipInput ? this._chipInput.placeholder : this._placeholder;
            }
            set placeholder(e) {
              (this._placeholder = e), this.stateChanges.next();
            }
            get focused() {
              return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
            }
            get empty() {
              return (!this._chipInput || this._chipInput.empty) && (!this.chips || 0 === this.chips.length);
            }
            get shouldLabelFloat() {
              return !this.empty || this.focused;
            }
            get disabled() {
              return this.ngControl ? !!this.ngControl.disabled : this._disabled;
            }
            set disabled(e) {
              (this._disabled = ve(e)), this._syncChipsState();
            }
            get selectable() {
              return this._selectable;
            }
            set selectable(e) {
              (this._selectable = ve(e)), this._syncChipsState();
            }
            set tabIndex(e) {
              (this._userTabIndex = e), (this._tabIndex = e);
            }
            get chipSelectionChanges() {
              return mn(...this.chips.map(e => e.selectionChange));
            }
            get chipFocusChanges() {
              return mn(...this.chips.map(e => e._onFocus));
            }
            get chipBlurChanges() {
              return mn(...this.chips.map(e => e._onBlur));
            }
            get chipRemoveChanges() {
              return mn(...this.chips.map(e => e.destroyed));
            }
            ngAfterContentInit() {
              (this._keyManager = new l1(this.chips)
                .withWrap()
                .withVerticalOrientation()
                .withHomeAndEnd()
                .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr')),
                this._dir &&
                  this._dir.change
                    .pipe(Me(this._destroyed))
                    .subscribe(e => this._keyManager.withHorizontalOrientation(e)),
                this._keyManager.tabOut.pipe(Me(this._destroyed)).subscribe(() => {
                  this._allowFocusEscape();
                }),
                this.chips.changes.pipe(Wi(null), Me(this._destroyed)).subscribe(() => {
                  (this.disabled || !this.selectable) &&
                    Promise.resolve().then(() => {
                      this._syncChipsState();
                    }),
                    this._resetChips(),
                    this._initializeSelection(),
                    this._updateTabIndex(),
                    this._updateFocusForDestroyedChips(),
                    this.stateChanges.next();
                });
            }
            ngOnInit() {
              (this._selectionModel = new OD(this.multiple, void 0, !1)), this.stateChanges.next();
            }
            ngDoCheck() {
              this.ngControl &&
                (this.updateErrorState(),
                this.ngControl.disabled !== this._disabled && (this.disabled = !!this.ngControl.disabled));
            }
            ngOnDestroy() {
              this._destroyed.next(),
                this._destroyed.complete(),
                this.stateChanges.complete(),
                this._dropSubscriptions();
            }
            registerInput(e) {
              (this._chipInput = e), this._elementRef.nativeElement.setAttribute('data-mat-chip-input', e.id);
            }
            setDescribedByIds(e) {
              e.length
                ? this._elementRef.nativeElement.setAttribute('aria-describedby', e.join(' '))
                : this._elementRef.nativeElement.removeAttribute('aria-describedby');
            }
            writeValue(e) {
              this.chips && this._setSelectionByValue(e, !1);
            }
            registerOnChange(e) {
              this._onChange = e;
            }
            registerOnTouched(e) {
              this._onTouched = e;
            }
            setDisabledState(e) {
              (this.disabled = e), this.stateChanges.next();
            }
            onContainerClick(e) {
              this._originatesFromChip(e) || this.focus();
            }
            focus(e) {
              this.disabled ||
                (this._chipInput && this._chipInput.focused) ||
                (this.chips.length > 0
                  ? (this._keyManager.setFirstItemActive(), this.stateChanges.next())
                  : (this._focusInput(e), this.stateChanges.next()));
            }
            _focusInput(e) {
              this._chipInput && this._chipInput.focus(e);
            }
            _keydown(e) {
              const i = e.target;
              i && i.classList.contains('mat-chip') && (this._keyManager.onKeydown(e), this.stateChanges.next());
            }
            _updateTabIndex() {
              this._tabIndex = this._userTabIndex || (0 === this.chips.length ? -1 : 0);
            }
            _updateFocusForDestroyedChips() {
              if (null != this._lastDestroyedChipIndex)
                if (this.chips.length) {
                  const e = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
                  this._keyManager.setActiveItem(e);
                } else this.focus();
              this._lastDestroyedChipIndex = null;
            }
            _isValidIndex(e) {
              return e >= 0 && e < this.chips.length;
            }
            _setSelectionByValue(e, i = !0) {
              if ((this._clearSelection(), this.chips.forEach(r => r.deselect()), Array.isArray(e)))
                e.forEach(r => this._selectValue(r, i)), this._sortValues();
              else {
                const r = this._selectValue(e, i);
                r && i && this._keyManager.setActiveItem(r);
              }
            }
            _selectValue(e, i = !0) {
              const r = this.chips.find(o => null != o.value && this._compareWith(o.value, e));
              return r && (i ? r.selectViaInteraction() : r.select(), this._selectionModel.select(r)), r;
            }
            _initializeSelection() {
              Promise.resolve().then(() => {
                (this.ngControl || this._value) &&
                  (this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value, !1),
                  this.stateChanges.next());
              });
            }
            _clearSelection(e) {
              this._selectionModel.clear(),
                this.chips.forEach(i => {
                  i !== e && i.deselect();
                }),
                this.stateChanges.next();
            }
            _sortValues() {
              this._multiple &&
                (this._selectionModel.clear(),
                this.chips.forEach(e => {
                  e.selected && this._selectionModel.select(e);
                }),
                this.stateChanges.next());
            }
            _propagateChanges(e) {
              let i = null;
              (i = Array.isArray(this.selected)
                ? this.selected.map(r => r.value)
                : this.selected
                ? this.selected.value
                : e),
                (this._value = i),
                this.change.emit(new fB(this, i)),
                this.valueChange.emit(i),
                this._onChange(i),
                this._changeDetectorRef.markForCheck();
            }
            _blur() {
              this._hasFocusedChip() || this._keyManager.setActiveItem(-1),
                this.disabled ||
                  (this._chipInput
                    ? setTimeout(() => {
                        this.focused || this._markAsTouched();
                      })
                    : this._markAsTouched());
            }
            _markAsTouched() {
              this._onTouched(), this._changeDetectorRef.markForCheck(), this.stateChanges.next();
            }
            _allowFocusEscape() {
              -1 !== this._tabIndex &&
                ((this._tabIndex = -1),
                setTimeout(() => {
                  (this._tabIndex = this._userTabIndex || 0), this._changeDetectorRef.markForCheck();
                }));
            }
            _resetChips() {
              this._dropSubscriptions(),
                this._listenToChipsFocus(),
                this._listenToChipsSelection(),
                this._listenToChipsRemoved();
            }
            _dropSubscriptions() {
              this._chipFocusSubscription &&
                (this._chipFocusSubscription.unsubscribe(), (this._chipFocusSubscription = null)),
                this._chipBlurSubscription &&
                  (this._chipBlurSubscription.unsubscribe(), (this._chipBlurSubscription = null)),
                this._chipSelectionSubscription &&
                  (this._chipSelectionSubscription.unsubscribe(), (this._chipSelectionSubscription = null)),
                this._chipRemoveSubscription &&
                  (this._chipRemoveSubscription.unsubscribe(), (this._chipRemoveSubscription = null));
            }
            _listenToChipsSelection() {
              this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(e => {
                e.source.selected ? this._selectionModel.select(e.source) : this._selectionModel.deselect(e.source),
                  this.multiple ||
                    this.chips.forEach(i => {
                      !this._selectionModel.isSelected(i) && i.selected && i.deselect();
                    }),
                  e.isUserInput && this._propagateChanges();
              });
            }
            _listenToChipsFocus() {
              (this._chipFocusSubscription = this.chipFocusChanges.subscribe(e => {
                let i = this.chips.toArray().indexOf(e.chip);
                this._isValidIndex(i) && this._keyManager.updateActiveItem(i), this.stateChanges.next();
              })),
                (this._chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
                  this._blur(), this.stateChanges.next();
                }));
            }
            _listenToChipsRemoved() {
              this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(e => {
                const i = e.chip,
                  r = this.chips.toArray().indexOf(e.chip);
                this._isValidIndex(r) && i._hasFocus && (this._lastDestroyedChipIndex = r);
              });
            }
            _originatesFromChip(e) {
              let i = e.target;
              for (; i && i !== this._elementRef.nativeElement; ) {
                if (i.classList.contains('mat-chip')) return !0;
                i = i.parentElement;
              }
              return !1;
            }
            _hasFocusedChip() {
              return this.chips && this.chips.some(e => e._hasFocus);
            }
            _syncChipsState() {
              this.chips &&
                this.chips.forEach(e => {
                  (e._chipListDisabled = this._disabled),
                    (e._chipListMultiple = this.multiple),
                    (e.chipListSelectable = this._selectable);
                });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(Tn), g(Jr, 8), g(hs, 8), g(fs, 8), g(Fl), g(Fn, 10));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-chip-list']],
              contentQueries: function (e, i, r) {
                if ((1 & e && et(r, Hl, 5), 2 & e)) {
                  let o;
                  Ee((o = Se())) && (i.chips = o);
                }
              },
              hostAttrs: [1, 'mat-chip-list'],
              hostVars: 14,
              hostBindings: function (e, i) {
                1 & e &&
                  X('focus', function () {
                    return i.focus();
                  })('blur', function () {
                    return i._blur();
                  })('keydown', function (o) {
                    return i._keydown(o);
                  }),
                  2 & e &&
                    ($o('id', i._uid),
                    Te('tabindex', i.disabled ? null : i._tabIndex)('aria-required', i.role ? i.required : null)(
                      'aria-disabled',
                      i.disabled.toString()
                    )('aria-invalid', i.errorState)('aria-multiselectable', i.multiple)('role', i.role)(
                      'aria-orientation',
                      i.ariaOrientation
                    ),
                    Xe('mat-chip-list-disabled', i.disabled)('mat-chip-list-invalid', i.errorState)(
                      'mat-chip-list-required',
                      i.required
                    ));
              },
              inputs: {
                role: 'role',
                userAriaDescribedBy: ['aria-describedby', 'userAriaDescribedBy'],
                errorStateMatcher: 'errorStateMatcher',
                multiple: 'multiple',
                compareWith: 'compareWith',
                value: 'value',
                required: 'required',
                placeholder: 'placeholder',
                disabled: 'disabled',
                ariaOrientation: ['aria-orientation', 'ariaOrientation'],
                selectable: 'selectable',
                tabIndex: 'tabIndex',
              },
              outputs: { change: 'change', valueChange: 'valueChange' },
              exportAs: ['matChipList'],
              features: [fe([{ provide: Ll, useExisting: n }]), G],
              ngContentSelectors: sB,
              decls: 2,
              vars: 0,
              consts: [[1, 'mat-chip-list-wrapper']],
              template: function (e, i) {
                1 & e && (Li(), O(0, 'div', 0), mt(1), B());
              },
              styles: [
                '.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-chip::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}.mat-standard-chip._mat-animation-noopable{transition:none !important;animation:none !important}.mat-standard-chip .mat-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-standard-chip .mat-chip-remove.mat-icon,.mat-standard-chip .mat-chip-remove .mat-icon{width:18px;height:18px;font-size:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip.mat-chip-selected{outline-width:3px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden;transform:translateZ(0)}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        pB = 0,
        qD = (() => {
          class n {
            constructor(e, i) {
              (this._elementRef = e),
                (this._defaultOptions = i),
                (this.focused = !1),
                (this._addOnBlur = !1),
                (this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes),
                (this.chipEnd = new Y()),
                (this.placeholder = ''),
                (this.id = 'mat-chip-list-input-' + pB++),
                (this._disabled = !1),
                (this.inputElement = this._elementRef.nativeElement);
            }
            set chipList(e) {
              e && ((this._chipList = e), this._chipList.registerInput(this));
            }
            get addOnBlur() {
              return this._addOnBlur;
            }
            set addOnBlur(e) {
              this._addOnBlur = ve(e);
            }
            get disabled() {
              return this._disabled || (this._chipList && this._chipList.disabled);
            }
            set disabled(e) {
              this._disabled = ve(e);
            }
            get empty() {
              return !this.inputElement.value;
            }
            ngOnChanges() {
              this._chipList.stateChanges.next();
            }
            ngOnDestroy() {
              this.chipEnd.complete();
            }
            ngAfterContentInit() {
              this._focusLastChipOnBackspace = this.empty;
            }
            _keydown(e) {
              if (e) {
                if (
                  (9 === e.keyCode && !vi(e, 'shiftKey') && this._chipList._allowFocusEscape(),
                  8 === e.keyCode && this._focusLastChipOnBackspace)
                )
                  return this._chipList._keyManager.setLastItemActive(), void e.preventDefault();
                this._focusLastChipOnBackspace = !1;
              }
              this._emitChipEnd(e);
            }
            _keyup(e) {
              !this._focusLastChipOnBackspace &&
                8 === e.keyCode &&
                this.empty &&
                ((this._focusLastChipOnBackspace = !0), e.preventDefault());
            }
            _blur() {
              this.addOnBlur && this._emitChipEnd(),
                (this.focused = !1),
                this._chipList.focused || this._chipList._blur(),
                this._chipList.stateChanges.next();
            }
            _focus() {
              (this.focused = !0), (this._focusLastChipOnBackspace = this.empty), this._chipList.stateChanges.next();
            }
            _emitChipEnd(e) {
              !this.inputElement.value && !!e && this._chipList._keydown(e),
                (!e || this._isSeparatorKey(e)) &&
                  (this.chipEnd.emit({ input: this.inputElement, value: this.inputElement.value, chipInput: this }),
                  e?.preventDefault());
            }
            _onInput() {
              this._chipList.stateChanges.next();
            }
            focus(e) {
              this.inputElement.focus(e);
            }
            clear() {
              (this.inputElement.value = ''), (this._focusLastChipOnBackspace = !0);
            }
            _isSeparatorKey(e) {
              return !vi(e) && new Set(this.separatorKeyCodes).has(e.keyCode);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(GD));
            }),
            (n.ɵdir = x({
              type: n,
              selectors: [['input', 'matChipInputFor', '']],
              hostAttrs: [1, 'mat-chip-input', 'mat-input-element'],
              hostVars: 5,
              hostBindings: function (e, i) {
                1 & e &&
                  X('keydown', function (o) {
                    return i._keydown(o);
                  })('keyup', function (o) {
                    return i._keyup(o);
                  })('blur', function () {
                    return i._blur();
                  })('focus', function () {
                    return i._focus();
                  })('input', function () {
                    return i._onInput();
                  }),
                  2 & e &&
                    ($o('id', i.id),
                    Te('disabled', i.disabled || null)('placeholder', i.placeholder || null)(
                      'aria-invalid',
                      i._chipList && i._chipList.ngControl ? i._chipList.ngControl.invalid : null
                    )('aria-required', (i._chipList && i._chipList.required) || null));
              },
              inputs: {
                chipList: ['matChipInputFor', 'chipList'],
                addOnBlur: ['matChipInputAddOnBlur', 'addOnBlur'],
                separatorKeyCodes: ['matChipInputSeparatorKeyCodes', 'separatorKeyCodes'],
                placeholder: 'placeholder',
                id: 'id',
                disabled: 'disabled',
              },
              outputs: { chipEnd: 'matChipInputTokenEnd' },
              exportAs: ['matChipInput', 'matChipInputFor'],
              features: [Ut],
            })),
            n
          );
        })(),
        mB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [Fl, { provide: GD, useValue: { separatorKeyCodes: [13] } }], imports: [tt] })),
            n
          );
        })();
      function KD(n) {
        return qe((t, e) => {
          let o,
            i = null,
            r = !1;
          (i = t.subscribe(
            Le(e, void 0, void 0, s => {
              (o = vt(n(s, KD(n)(t)))), i ? (i.unsubscribe(), (i = null), o.subscribe(e)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), o.subscribe(e));
        });
      }
      const yB = ['*'];
      let jl;
      function Ss(n) {
        return (
          (function vB() {
            if (void 0 === jl && ((jl = null), typeof window < 'u')) {
              const n = window;
              void 0 !== n.trustedTypes &&
                (jl = n.trustedTypes.createPolicy('angular#components', { createHTML: t => t }));
            }
            return jl;
          })()?.createHTML(n) || n
        );
      }
      function YD(n) {
        return Error(`Unable to find icon with the name "${n}"`);
      }
      function ZD(n) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`
        );
      }
      function QD(n) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`
        );
      }
      class Ki {
        constructor(t, e, i) {
          (this.url = t), (this.svgText = e), (this.options = i);
        }
      }
      let zl = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._httpClient = e),
              (this._sanitizer = i),
              (this._errorHandler = o),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = ['material-icons', 'mat-ligature-font']),
              (this._document = r);
          }
          addSvgIcon(e, i, r) {
            return this.addSvgIconInNamespace('', e, i, r);
          }
          addSvgIconLiteral(e, i, r) {
            return this.addSvgIconLiteralInNamespace('', e, i, r);
          }
          addSvgIconInNamespace(e, i, r, o) {
            return this._addSvgIconConfig(e, i, new Ki(r, null, o));
          }
          addSvgIconResolver(e) {
            return this._resolvers.push(e), this;
          }
          addSvgIconLiteralInNamespace(e, i, r, o) {
            const s = this._sanitizer.sanitize(ce.HTML, r);
            if (!s) throw QD(r);
            const a = Ss(s);
            return this._addSvgIconConfig(e, i, new Ki('', a, o));
          }
          addSvgIconSet(e, i) {
            return this.addSvgIconSetInNamespace('', e, i);
          }
          addSvgIconSetLiteral(e, i) {
            return this.addSvgIconSetLiteralInNamespace('', e, i);
          }
          addSvgIconSetInNamespace(e, i, r) {
            return this._addSvgIconSetConfig(e, new Ki(i, null, r));
          }
          addSvgIconSetLiteralInNamespace(e, i, r) {
            const o = this._sanitizer.sanitize(ce.HTML, i);
            if (!o) throw QD(i);
            const s = Ss(o);
            return this._addSvgIconSetConfig(e, new Ki('', s, r));
          }
          registerFontClassAlias(e, i = e) {
            return this._fontCssClassesByAlias.set(e, i), this;
          }
          classNameForFontAlias(e) {
            return this._fontCssClassesByAlias.get(e) || e;
          }
          setDefaultFontSetClass(...e) {
            return (this._defaultFontSetClass = e), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(e) {
            const i = this._sanitizer.sanitize(ce.RESOURCE_URL, e);
            if (!i) throw ZD(e);
            const r = this._cachedIconsByUrl.get(i);
            return r
              ? _i($l(r))
              : this._loadSvgIconFromConfig(new Ki(e, null)).pipe(
                  El(o => this._cachedIconsByUrl.set(i, o)),
                  Ze(o => $l(o))
                );
          }
          getNamedSvgIcon(e, i = '') {
            const r = XD(i, e);
            let o = this._svgIconConfigs.get(r);
            if (o) return this._getSvgFromConfig(o);
            if (((o = this._getIconConfigFromResolvers(i, e)), o))
              return this._svgIconConfigs.set(r, o), this._getSvgFromConfig(o);
            const s = this._iconSetConfigs.get(i);
            return s
              ? this._getSvgFromIconSetConfigs(e, s)
              : (function gB(n, t) {
                  const e = ie(n) ? n : () => n,
                    i = r => r.error(e());
                  return new be(t ? r => t.schedule(i, 0, r) : i);
                })(YD(r));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(e) {
            return e.svgText
              ? _i($l(this._svgElementFromConfig(e)))
              : this._loadSvgIconFromConfig(e).pipe(Ze(i => $l(i)));
          }
          _getSvgFromIconSetConfigs(e, i) {
            const r = this._extractIconWithNameFromAnySet(e, i);
            return r
              ? _i(r)
              : Kb(
                  i
                    .filter(s => !s.svgText)
                    .map(s =>
                      this._loadSvgIconSetFromConfig(s).pipe(
                        KD(a => {
                          const c = `Loading icon set URL: ${this._sanitizer.sanitize(
                            ce.RESOURCE_URL,
                            s.url
                          )} failed: ${a.message}`;
                          return this._errorHandler.handleError(new Error(c)), _i(null);
                        })
                      )
                    )
                ).pipe(
                  Ze(() => {
                    const s = this._extractIconWithNameFromAnySet(e, i);
                    if (!s) throw YD(e);
                    return s;
                  })
                );
          }
          _extractIconWithNameFromAnySet(e, i) {
            for (let r = i.length - 1; r >= 0; r--) {
              const o = i[r];
              if (o.svgText && o.svgText.toString().indexOf(e) > -1) {
                const s = this._svgElementFromConfig(o),
                  a = this._extractSvgIconFromSet(s, e, o.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(e) {
            return this._fetchIcon(e).pipe(
              El(i => (e.svgText = i)),
              Ze(() => this._svgElementFromConfig(e))
            );
          }
          _loadSvgIconSetFromConfig(e) {
            return e.svgText ? _i(null) : this._fetchIcon(e).pipe(El(i => (e.svgText = i)));
          }
          _extractSvgIconFromSet(e, i, r) {
            const o = e.querySelector(`[id="${i}"]`);
            if (!o) return null;
            const s = o.cloneNode(!0);
            if ((s.removeAttribute('id'), 'svg' === s.nodeName.toLowerCase())) return this._setSvgAttributes(s, r);
            if ('symbol' === s.nodeName.toLowerCase()) return this._setSvgAttributes(this._toSvgElement(s), r);
            const a = this._svgElementFromString(Ss('<svg></svg>'));
            return a.appendChild(s), this._setSvgAttributes(a, r);
          }
          _svgElementFromString(e) {
            const i = this._document.createElement('DIV');
            i.innerHTML = e;
            const r = i.querySelector('svg');
            if (!r) throw Error('<svg> tag not found');
            return r;
          }
          _toSvgElement(e) {
            const i = this._svgElementFromString(Ss('<svg></svg>')),
              r = e.attributes;
            for (let o = 0; o < r.length; o++) {
              const { name: s, value: a } = r[o];
              'id' !== s && i.setAttribute(s, a);
            }
            for (let o = 0; o < e.childNodes.length; o++)
              e.childNodes[o].nodeType === this._document.ELEMENT_NODE && i.appendChild(e.childNodes[o].cloneNode(!0));
            return i;
          }
          _setSvgAttributes(e, i) {
            return (
              e.setAttribute('fit', ''),
              e.setAttribute('height', '100%'),
              e.setAttribute('width', '100%'),
              e.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
              e.setAttribute('focusable', 'false'),
              i && i.viewBox && e.setAttribute('viewBox', i.viewBox),
              e
            );
          }
          _fetchIcon(e) {
            const { url: i, options: r } = e,
              o = r?.withCredentials ?? !1;
            if (!this._httpClient)
              throw (function bB() {
                return Error(
                  'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
                );
              })();
            if (null == i) throw Error(`Cannot fetch icon from URL "${i}".`);
            const s = this._sanitizer.sanitize(ce.RESOURCE_URL, i);
            if (!s) throw ZD(i);
            const a = this._inProgressUrlFetches.get(s);
            if (a) return a;
            const l = this._httpClient.get(s, { responseType: 'text', withCredentials: o }).pipe(
              Ze(c => Ss(c)),
              (function _B(n) {
                return qe((t, e) => {
                  try {
                    t.subscribe(e);
                  } finally {
                    e.add(n);
                  }
                });
              })(() => this._inProgressUrlFetches.delete(s)),
              fp()
            );
            return this._inProgressUrlFetches.set(s, l), l;
          }
          _addSvgIconConfig(e, i, r) {
            return this._svgIconConfigs.set(XD(e, i), r), this;
          }
          _addSvgIconSetConfig(e, i) {
            const r = this._iconSetConfigs.get(e);
            return r ? r.push(i) : this._iconSetConfigs.set(e, [i]), this;
          }
          _svgElementFromConfig(e) {
            if (!e.svgElement) {
              const i = this._svgElementFromString(e.svgText);
              this._setSvgAttributes(i, e.options), (e.svgElement = i);
            }
            return e.svgElement;
          }
          _getIconConfigFromResolvers(e, i) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const o = this._resolvers[r](i, e);
              if (o) return CB(o) ? new Ki(o.url, null, o.options) : new Ki(o, null);
            }
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(wl, 8), b(_h), b(Z, 8), b(jn));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        );
      })();
      function $l(n) {
        return n.cloneNode(!0);
      }
      function XD(n, t) {
        return n + ':' + t;
      }
      function CB(n) {
        return !(!n.url || !n.options);
      }
      const DB = xl(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        ),
        EB = new E('MAT_ICON_DEFAULT_OPTIONS'),
        SB = new E('mat-icon-location', {
          providedIn: 'root',
          factory: function MB() {
            const n = oi(Z),
              t = n ? n.location : null;
            return { getPathname: () => (t ? t.pathname + t.search : '') };
          },
        }),
        JD = [
          'clip-path',
          'color-profile',
          'src',
          'cursor',
          'fill',
          'filter',
          'marker',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'stroke',
        ],
        IB = JD.map(n => `[${n}]`).join(', '),
        TB = /^url\(['"]?#(.*?)['"]?\)$/;
      let AB = (() => {
          class n extends DB {
            constructor(e, i, r, o, s, a) {
              super(e),
                (this._iconRegistry = i),
                (this._location = o),
                (this._errorHandler = s),
                (this._inline = !1),
                (this._previousFontSetClass = []),
                (this._currentIconFetch = Ne.EMPTY),
                a && (a.color && (this.color = this.defaultColor = a.color), a.fontSet && (this.fontSet = a.fontSet)),
                r || e.nativeElement.setAttribute('aria-hidden', 'true');
            }
            get inline() {
              return this._inline;
            }
            set inline(e) {
              this._inline = ve(e);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(e) {
              e !== this._svgIcon &&
                (e ? this._updateSvgIcon(e) : this._svgIcon && this._clearSvgElement(), (this._svgIcon = e));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontSet && ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontIcon && ((this._fontIcon = i), this._updateFontIconClasses());
            }
            _splitIconName(e) {
              if (!e) return ['', ''];
              const i = e.split(':');
              switch (i.length) {
                case 1:
                  return ['', i[0]];
                case 2:
                  return i;
                default:
                  throw Error(`Invalid icon name: "${e}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const e = this._elementsWithExternalReferences;
              if (e && e.size) {
                const i = this._location.getPathname();
                i !== this._previousPath && ((this._previousPath = i), this._prependPathToReferences(i));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(e) {
              this._clearSvgElement();
              const i = this._location.getPathname();
              (this._previousPath = i),
                this._cacheChildrenWithExternalReferences(e),
                this._prependPathToReferences(i),
                this._elementRef.nativeElement.appendChild(e);
            }
            _clearSvgElement() {
              const e = this._elementRef.nativeElement;
              let i = e.childNodes.length;
              for (this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear(); i--; ) {
                const r = e.childNodes[i];
                (1 !== r.nodeType || 'svg' === r.nodeName.toLowerCase()) && r.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const e = this._elementRef.nativeElement,
                i = (
                  this.fontSet
                    ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/)
                    : this._iconRegistry.getDefaultFontSetClass()
                ).filter(r => r.length > 0);
              this._previousFontSetClass.forEach(r => e.classList.remove(r)),
                i.forEach(r => e.classList.add(r)),
                (this._previousFontSetClass = i),
                this.fontIcon !== this._previousFontIconClass &&
                  !i.includes('mat-ligature-font') &&
                  (this._previousFontIconClass && e.classList.remove(this._previousFontIconClass),
                  this.fontIcon && e.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(e) {
              return 'string' == typeof e ? e.trim().split(' ')[0] : e;
            }
            _prependPathToReferences(e) {
              const i = this._elementsWithExternalReferences;
              i &&
                i.forEach((r, o) => {
                  r.forEach(s => {
                    o.setAttribute(s.name, `url('${e}#${s.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(e) {
              const i = e.querySelectorAll(IB),
                r = (this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map());
              for (let o = 0; o < i.length; o++)
                JD.forEach(s => {
                  const a = i[o],
                    l = a.getAttribute(s),
                    c = l ? l.match(TB) : null;
                  if (c) {
                    let u = r.get(a);
                    u || ((u = []), r.set(a, u)), u.push({ name: s, value: c[1] });
                  }
                });
            }
            _updateSvgIcon(e) {
              if (((this._svgNamespace = null), (this._svgName = null), this._currentIconFetch.unsubscribe(), e)) {
                const [i, r] = this._splitIconName(e);
                i && (this._svgNamespace = i),
                  r && (this._svgName = r),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(r, i)
                    .pipe(Qn(1))
                    .subscribe(
                      o => this._setSvgElement(o),
                      o => {
                        this._errorHandler.handleError(new Error(`Error retrieving icon ${i}:${r}! ${o.message}`));
                      }
                    ));
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ye), g(zl), hr('aria-hidden'), g(SB), g(jn), g(EB, 8));
            }),
            (n.ɵcmp = Tt({
              type: n,
              selectors: [['mat-icon']],
              hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
              hostVars: 7,
              hostBindings: function (e, i) {
                2 & e &&
                  (Te('data-mat-icon-type', i._usingFontIcon() ? 'font' : 'svg')(
                    'data-mat-icon-name',
                    i._svgName || i.fontIcon
                  )('data-mat-icon-namespace', i._svgNamespace || i.fontSet),
                  Xe('mat-icon-inline', i.inline)(
                    'mat-icon-no-color',
                    'primary' !== i.color && 'accent' !== i.color && 'warn' !== i.color
                  ));
              },
              inputs: {
                color: 'color',
                inline: 'inline',
                svgIcon: 'svgIcon',
                fontSet: 'fontSet',
                fontIcon: 'fontIcon',
              },
              exportAs: ['matIcon'],
              features: [G],
              ngContentSelectors: yB,
              decls: 1,
              vars: 0,
              template: function (e, i) {
                1 & e && (Li(), mt(0));
              },
              styles: [
                '.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        xB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ imports: [tt, tt] })),
            n
          );
        })();
      function FB(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'mat-chip', 5),
            X('removed', function () {
              const o = gn(e).$implicit;
              return _n(he().remove(o));
            }),
            Je(1),
            O(2, 'button', 6)(3, 'mat-icon'),
            Je(4, 'cancel'),
            B()()();
        }
        if (2 & n) {
          const e = t.$implicit;
          R(1), hi(' ', e.searchTerm, ' ');
        }
      }
      let OB = (() => {
        class n {
          constructor() {
            (this.addOnBlur = !0),
              (this.separatorKeysCodes = [13, 188]),
              (this.searchTermTegs = []),
              (this.searchTermUpdate = new Y());
          }
          add(e) {
            const i = (e.value || '').trim();
            i && this.searchTermTegs.push({ searchTerm: i }), e.chipInput.clear(), this.updateSearchTerm();
          }
          remove(e) {
            const i = this.searchTermTegs.indexOf(e);
            i >= 0 && this.searchTermTegs.splice(i, 1), this.updateSearchTerm();
          }
          updateSearchTerm() {
            console.log('event', this.searchTermTegs);
            const e = this.searchTermTegs.map(i => i.searchTerm).join(', ');
            this.searchTermUpdate.emit(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵcmp = Tt({
            type: n,
            selectors: [['app-multi-tag-search']],
            outputs: { searchTermUpdate: 'searchTermUpdate' },
            decls: 7,
            vars: 4,
            consts: [
              ['appearance', 'fill', 1, 'example-chip-list'],
              ['aria-label', 'Search selection', 3, 'valueChange'],
              ['chipList', ''],
              [3, 'removed', 4, 'ngFor', 'ngForOf'],
              [
                'placeholder',
                'New search tag...',
                3,
                'matChipInputFor',
                'matChipInputSeparatorKeyCodes',
                'matChipInputAddOnBlur',
                'matChipInputTokenEnd',
              ],
              [3, 'removed'],
              ['matChipRemove', ''],
            ],
            template: function (e, i) {
              if (
                (1 & e &&
                  (O(0, 'mat-form-field', 0)(1, 'mat-label'),
                  Je(2, 'Search Giphy'),
                  B(),
                  O(3, 'mat-chip-list', 1, 2),
                  X('valueChange', function () {
                    return i.updateSearchTerm();
                  }),
                  ue(5, FB, 5, 1, 'mat-chip', 3),
                  O(6, 'input', 4),
                  X('matChipInputTokenEnd', function (o) {
                    return i.add(o);
                  }),
                  B()()()),
                2 & e)
              ) {
                const r = ld(4);
                R(5),
                  F('ngForOf', i.searchTermTegs),
                  R(1),
                  F('matChipInputFor', r)('matChipInputSeparatorKeyCodes', i.separatorKeysCodes)(
                    'matChipInputAddOnBlur',
                    i.addOnBlur
                  );
              }
            },
            dependencies: [il, WD, Hl, qD, UD, FD, pf, AB],
            styles: ['.example-chip-list[_ngcontent-%COMP%]{width:100%}'],
          })),
          n
        );
      })();
      const kB = function () {
        return [9, 18, 27, 90];
      };
      function RB(n, t) {
        if (1 & n) {
          const e = Gn();
          O(0, 'mat-paginator', 6),
            X('page', function (r) {
              return gn(e), _n(he(2).updatePageOptions(r));
            }),
            B();
        }
        if (2 & n) {
          const e = he(2);
          F('length', e.giphyService.totalCount)('pageSize', e.giphyService.pageSize)(
            'pageSizeOptions',
            (function Gy(n, t, e) {
              const i = dt() + n,
                r = w();
              return r[i] === $
                ? Cn(r, i, e ? t.call(e) : t())
                : (function jo(n, t) {
                    return n[t];
                  })(r, i);
            })(3, kB)
          );
        }
      }
      function PB(n, t) {
        if ((1 & n && (ci(0), ue(1, RB, 1, 4, 'mat-paginator', 5), ui()), 2 & n)) {
          const e = he();
          R(1), F('ngIf', e.giphyService.totalCount);
        }
      }
      function NB(n, t) {
        1 & n && (ci(0), O(1, 'h1'), Je(2, 'Type Search Tag and Press Enter'), B(), ui());
      }
      function LB(n, t) {
        1 & n && (ci(0), O(1, 'h1'), Je(2, 'No Result Found For This Serach Tags'), B(), ui());
      }
      function VB(n, t) {
        if ((1 & n && (O(0, 'div', 7), pt(1, 'img', 8), B()), 2 & n)) {
          const e = t.$implicit;
          R(1), F('src', e.images.fixed_width.url, su)('alt', e.title);
        }
      }
      let BB = (() => {
        class n {
          constructor(e) {
            (this.giphyService = e), (this.previousSearchTerm = '');
          }
          search(e) {
            this.previousSearchTerm !== e && ((this.previousSearchTerm = e), this.giphyService.search(e));
          }
          updatePageOptions(e) {
            this.giphyService.setPageSize(e.pageSize),
              e.pageIndex !== e.previousPageIndex && this.giphyService.changePage(e.pageIndex);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(IN));
          }),
          (n.ɵcmp = Tt({
            type: n,
            selectors: [['app-root']],
            decls: 8,
            vars: 6,
            consts: [
              [1, 'w-full'],
              [3, 'searchTermUpdate'],
              [4, 'ngIf'],
              [1, 'result-panel'],
              [
                'class',
                'flex justify-center flex-col w-full h-full shadow rounded overflow-hidden bg-gray-200 aspect-square',
                4,
                'ngFor',
                'ngForOf',
              ],
              ['aria-label', 'Select page', 3, 'length', 'pageSize', 'pageSizeOptions', 'page', 4, 'ngIf'],
              ['aria-label', 'Select page', 3, 'length', 'pageSize', 'pageSizeOptions', 'page'],
              [
                1,
                'flex',
                'justify-center',
                'flex-col',
                'w-full',
                'h-full',
                'shadow',
                'rounded',
                'overflow-hidden',
                'bg-gray-200',
                'aspect-square',
              ],
              [3, 'src', 'alt'],
            ],
            template: function (e, i) {
              1 & e &&
                (O(0, 'div', 0)(1, 'app-multi-tag-search', 1),
                X('searchTermUpdate', function (o) {
                  return i.search(o);
                }),
                B()(),
                ue(2, PB, 2, 1, 'ng-container', 2),
                ue(3, NB, 3, 0, 'ng-container', 2),
                ue(4, LB, 3, 0, 'ng-container', 2),
                O(5, 'div', 3),
                ue(6, VB, 2, 2, 'div', 4),
                bd(7, 'async'),
                B()),
                2 & e &&
                  (R(2),
                  F('ngIf', !!i.giphyService.totalCount),
                  R(1),
                  F('ngIf', !i.giphyService.totalCount && !i.giphyService.currentSearchTerm.length),
                  R(1),
                  F('ngIf', !i.giphyService.totalCount && !!i.giphyService.currentSearchTerm.length),
                  R(2),
                  F('ngForOf', wd(7, 4, i.giphyService.searchResults$)));
            },
            dependencies: [il, is, rB, OB, sh],
            styles: [
              '[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center}.result-panel[_ngcontent-%COMP%]{width:800px;margin-top:16px;align-self:center;display:inline-grid;grid-template-columns:auto auto auto;align-items:center;grid-gap:10px;margin-bottom:20px}[_nghost-%COMP%]     .mat-paginator-outer-container{background-color:#dadada}',
            ],
          })),
          n
        );
      })();
      function eE(n) {
        return new C(3e3, !1);
      }
      function w2() {
        return typeof window < 'u' && typeof window.document < 'u';
      }
      function gf() {
        return typeof process < 'u' && '[object process]' === {}.toString.call(process);
      }
      function bi(n) {
        switch (n.length) {
          case 0:
            return new Ds();
          case 1:
            return n[0];
          default:
            return new ID(n);
        }
      }
      function tE(n, t, e, i, r = new Map(), o = new Map()) {
        const s = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach(u => {
            const d = u.get('offset'),
              h = d == l,
              f = (h && c) || new Map();
            u.forEach((p, m) => {
              let _ = m,
                y = p;
              if ('offset' !== m)
                switch (((_ = t.normalizePropertyName(_, s)), y)) {
                  case '!':
                    y = r.get(m);
                    break;
                  case Xn:
                    y = o.get(m);
                    break;
                  default:
                    y = t.normalizeStyleValue(m, _, y, s);
                }
              f.set(_, y);
            }),
              h || a.push(f),
              (c = f),
              (l = d);
          }),
          s.length)
        )
          throw (function c2(n) {
            return new C(3502, !1);
          })();
        return a;
      }
      function _f(n, t, e, i) {
        switch (t) {
          case 'start':
            n.onStart(() => i(e && yf(e, 'start', n)));
            break;
          case 'done':
            n.onDone(() => i(e && yf(e, 'done', n)));
            break;
          case 'destroy':
            n.onDestroy(() => i(e && yf(e, 'destroy', n)));
        }
      }
      function yf(n, t, e) {
        const o = vf(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            t || n.phaseName,
            e.totalTime ?? n.totalTime,
            !!e.disabled
          ),
          s = n._data;
        return null != s && (o._data = s), o;
      }
      function vf(n, t, e, i, r = '', o = 0, s) {
        return { element: n, triggerName: t, fromState: e, toState: i, phaseName: r, totalTime: o, disabled: !!s };
      }
      function Nt(n, t, e) {
        let i = n.get(t);
        return i || n.set(t, (i = e)), i;
      }
      function nE(n) {
        const t = n.indexOf(':');
        return [n.substring(1, t), n.slice(t + 1)];
      }
      let bf = (n, t) => !1,
        iE = (n, t, e) => [],
        rE = null;
      function wf(n) {
        const t = n.parentNode || n.host;
        return t === rE ? null : t;
      }
      (gf() || typeof Element < 'u') &&
        (w2()
          ? ((rE = (() => document.documentElement)()),
            (bf = (n, t) => {
              for (; t; ) {
                if (t === n) return !0;
                t = wf(t);
              }
              return !1;
            }))
          : (bf = (n, t) => n.contains(t)),
        (iE = (n, t, e) => {
          if (e) return Array.from(n.querySelectorAll(t));
          const i = n.querySelector(t);
          return i ? [i] : [];
        }));
      let Yi = null,
        oE = !1;
      const sE = bf,
        aE = iE;
      let lE = (() => {
          class n {
            validateStyleProperty(e) {
              return (function D2(n) {
                Yi ||
                  ((Yi =
                    (function E2() {
                      return typeof document < 'u' ? document.body : null;
                    })() || {}),
                  (oE = !!Yi.style && 'WebkitAppearance' in Yi.style));
                let t = !0;
                return (
                  Yi.style &&
                    !(function C2(n) {
                      return 'ebkit' == n.substring(1, 6);
                    })(n) &&
                    ((t = n in Yi.style),
                    !t && oE && (t = 'Webkit' + n.charAt(0).toUpperCase() + n.slice(1) in Yi.style)),
                  t
                );
              })(e);
            }
            matchesElement(e, i) {
              return !1;
            }
            containsElement(e, i) {
              return sE(e, i);
            }
            getParentElement(e) {
              return wf(e);
            }
            query(e, i, r) {
              return aE(e, i, r);
            }
            computeStyle(e, i, r) {
              return r || '';
            }
            animate(e, i, r, o, s, a = [], l) {
              return new Ds(r, o);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = T({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Cf = (() => {
          class n {}
          return (n.NOOP = new lE()), n;
        })();
      const Df = 'ng-enter',
        Ul = 'ng-leave',
        Gl = 'ng-trigger',
        Wl = '.ng-trigger',
        uE = 'ng-animating',
        Ef = '.ng-animating';
      function Jn(n) {
        if ('number' == typeof n) return n;
        const t = n.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : Sf(parseFloat(t[1]), t[2]);
      }
      function Sf(n, t) {
        return 's' === t ? 1e3 * n : n;
      }
      function ql(n, t, e) {
        return n.hasOwnProperty('duration')
          ? n
          : (function I2(n, t, e) {
              let r,
                o = 0,
                s = '';
              if ('string' == typeof n) {
                const a = n.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                if (null === a) return t.push(eE()), { duration: 0, delay: 0, easing: '' };
                r = Sf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = Sf(parseFloat(l), a[4]));
                const c = a[5];
                c && (s = c);
              } else r = n;
              if (!e) {
                let a = !1,
                  l = t.length;
                r < 0 &&
                  (t.push(
                    (function HB() {
                      return new C(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (t.push(
                      (function jB() {
                        return new C(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, eE());
              }
              return { duration: r, delay: o, easing: s };
            })(n, t, e);
      }
      function Ms(n, t = {}) {
        return (
          Object.keys(n).forEach(e => {
            t[e] = n[e];
          }),
          t
        );
      }
      function dE(n) {
        const t = new Map();
        return (
          Object.keys(n).forEach(e => {
            t.set(e, n[e]);
          }),
          t
        );
      }
      function wi(n, t = new Map(), e) {
        if (e) for (let [i, r] of e) t.set(i, r);
        for (let [i, r] of n) t.set(i, r);
        return t;
      }
      function fE(n, t, e) {
        return e ? t + ':' + e + ';' : '';
      }
      function pE(n) {
        let t = '';
        for (let e = 0; e < n.style.length; e++) {
          const i = n.style.item(e);
          t += fE(0, i, n.style.getPropertyValue(i));
        }
        for (const e in n.style) n.style.hasOwnProperty(e) && !e.startsWith('_') && (t += fE(0, F2(e), n.style[e]));
        n.setAttribute('style', t);
      }
      function On(n, t, e) {
        n.style &&
          (t.forEach((i, r) => {
            const o = If(r);
            e && !e.has(r) && e.set(r, n.style[o]), (n.style[o] = i);
          }),
          gf() && pE(n));
      }
      function Zi(n, t) {
        n.style &&
          (t.forEach((e, i) => {
            const r = If(i);
            n.style[r] = '';
          }),
          gf() && pE(n));
      }
      function Is(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : SD(n)) : n;
      }
      const Mf = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function mE(n) {
        let t = [];
        if ('string' == typeof n) {
          let e;
          for (; (e = Mf.exec(n)); ) t.push(e[1]);
          Mf.lastIndex = 0;
        }
        return t;
      }
      function Ts(n, t, e) {
        const i = n.toString(),
          r = i.replace(Mf, (o, s) => {
            let a = t[s];
            return (
              null == a &&
                (e.push(
                  (function $B(n) {
                    return new C(3003, !1);
                  })()
                ),
                (a = '')),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function Kl(n) {
        const t = [];
        let e = n.next();
        for (; !e.done; ) t.push(e.value), (e = n.next());
        return t;
      }
      const x2 = /-+([a-z0-9])/g;
      function If(n) {
        return n.replace(x2, (...t) => t[1].toUpperCase());
      }
      function F2(n) {
        return n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
      function Lt(n, t, e) {
        switch (t.type) {
          case 7:
            return n.visitTrigger(t, e);
          case 0:
            return n.visitState(t, e);
          case 1:
            return n.visitTransition(t, e);
          case 2:
            return n.visitSequence(t, e);
          case 3:
            return n.visitGroup(t, e);
          case 4:
            return n.visitAnimate(t, e);
          case 5:
            return n.visitKeyframes(t, e);
          case 6:
            return n.visitStyle(t, e);
          case 8:
            return n.visitReference(t, e);
          case 9:
            return n.visitAnimateChild(t, e);
          case 10:
            return n.visitAnimateRef(t, e);
          case 11:
            return n.visitQuery(t, e);
          case 12:
            return n.visitStagger(t, e);
          default:
            throw (function UB(n) {
              return new C(3004, !1);
            })();
        }
      }
      function gE(n, t) {
        return window.getComputedStyle(n)[t];
      }
      function L2(n, t) {
        const e = [];
        return (
          'string' == typeof n
            ? n.split(/\s*,\s*/).forEach(i =>
                (function V2(n, t, e) {
                  if (':' == n[0]) {
                    const l = (function B2(n, t) {
                      switch (n) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (e, i) => parseFloat(i) > parseFloat(e);
                        case ':decrement':
                          return (e, i) => parseFloat(i) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              (function o2(n) {
                                return new C(3016, !1);
                              })()
                            ),
                            '* => *'
                          );
                      }
                    })(n, e);
                    if ('function' == typeof l) return void t.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      e.push(
                        (function r2(n) {
                          return new C(3015, !1);
                        })()
                      ),
                      t
                    );
                  const r = i[1],
                    o = i[2],
                    s = i[3];
                  t.push(_E(r, s));
                  '<' == o[0] && !('*' == r && '*' == s) && t.push(_E(s, r));
                })(i, e, t)
              )
            : e.push(n),
          e
        );
      }
      const Xl = new Set(['true', '1']),
        Jl = new Set(['false', '0']);
      function _E(n, t) {
        const e = Xl.has(n) || Jl.has(n),
          i = Xl.has(t) || Jl.has(t);
        return (r, o) => {
          let s = '*' == n || n == r,
            a = '*' == t || t == o;
          return (
            !s && e && 'boolean' == typeof r && (s = r ? Xl.has(n) : Jl.has(n)),
            !a && i && 'boolean' == typeof o && (a = o ? Xl.has(t) : Jl.has(t)),
            s && a
          );
        };
      }
      const H2 = new RegExp('s*:selfs*,?', 'g');
      function Tf(n, t, e, i) {
        return new j2(n).build(t, e, i);
      }
      class j2 {
        constructor(t) {
          this._driver = t;
        }
        build(t, e, i) {
          const r = new U2(e);
          return this._resetContextStyleTimingState(r), Lt(this, Is(t), r);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ''),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set('', new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let i = (e.queryCount = 0),
            r = (e.depCount = 0);
          const o = [],
            s = [];
          return (
            '@' == t.name.charAt(0) &&
              e.errors.push(
                (function WB() {
                  return new C(3006, !1);
                })()
              ),
            t.definitions.forEach(a => {
              if ((this._resetContextStyleTimingState(e), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(u => {
                    (l.name = u), o.push(this.visitState(l, e));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, e);
                (i += l.queryCount), (r += l.depCount), s.push(l);
              } else
                e.errors.push(
                  (function qB() {
                    return new C(3007, !1);
                  })()
                );
            }),
            { type: 7, name: t.name, states: o, transitions: s, queryCount: i, depCount: r, options: null }
          );
        }
        visitState(t, e) {
          const i = this.visitStyle(t.styles, e),
            r = (t.options && t.options.params) || null;
          if (i.containsDynamicStyles) {
            const o = new Set(),
              s = r || {};
            i.styles.forEach(a => {
              a instanceof Map &&
                a.forEach(l => {
                  mE(l).forEach(c => {
                    s.hasOwnProperty(c) || o.add(c);
                  });
                });
            }),
              o.size &&
                (Kl(o.values()),
                e.errors.push(
                  (function KB(n, t) {
                    return new C(3008, !1);
                  })()
                ));
          }
          return { type: 0, name: t.name, style: i, options: r ? { params: r } : null };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const i = Lt(this, Is(t.animation), e);
          return {
            type: 1,
            matchers: L2(t.expr, e.errors),
            animation: i,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: Qi(t.options),
          };
        }
        visitSequence(t, e) {
          return { type: 2, steps: t.steps.map(i => Lt(this, i, e)), options: Qi(t.options) };
        }
        visitGroup(t, e) {
          const i = e.currentTime;
          let r = 0;
          const o = t.steps.map(s => {
            e.currentTime = i;
            const a = Lt(this, s, e);
            return (r = Math.max(r, e.currentTime)), a;
          });
          return (e.currentTime = r), { type: 3, steps: o, options: Qi(t.options) };
        }
        visitAnimate(t, e) {
          const i = (function W2(n, t) {
            if (n.hasOwnProperty('duration')) return n;
            if ('number' == typeof n) return Af(ql(n, t).duration, 0, '');
            const e = n;
            if (e.split(/\s+/).some(o => '{' == o.charAt(0) && '{' == o.charAt(1))) {
              const o = Af(0, 0, '');
              return (o.dynamic = !0), (o.strValue = e), o;
            }
            const r = ql(e, t);
            return Af(r.duration, r.delay, r.easing);
          })(t.timings, e.errors);
          e.currentAnimateTimings = i;
          let r,
            o = t.styles ? t.styles : St({});
          if (5 == o.type) r = this.visitKeyframes(o, e);
          else {
            let s = t.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (s = St(c));
            }
            e.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, e);
            (l.isEmptyStep = a), (r = l);
          }
          return (e.currentAnimateTimings = null), { type: 4, timings: i, style: r, options: null };
        }
        visitStyle(t, e) {
          const i = this._makeStyleAst(t, e);
          return this._validateStyleAst(i, e), i;
        }
        _makeStyleAst(t, e) {
          const i = [],
            r = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of r)
            'string' == typeof a ? (a === Xn ? i.push(a) : e.errors.push(new C(3002, !1))) : i.push(dE(a));
          let o = !1,
            s = null;
          return (
            i.forEach(a => {
              if (a instanceof Map && (a.has('easing') && ((s = a.get('easing')), a.delete('easing')), !o))
                for (let l of a.values())
                  if (l.toString().indexOf('{{') >= 0) {
                    o = !0;
                    break;
                  }
            }),
            { type: 6, styles: i, easing: s, offset: t.offset, containsDynamicStyles: o, options: null }
          );
        }
        _validateStyleAst(t, e) {
          const i = e.currentAnimateTimings;
          let r = e.currentTime,
            o = e.currentTime;
          i && o > 0 && (o -= i.duration + i.delay),
            t.styles.forEach(s => {
              'string' != typeof s &&
                s.forEach((a, l) => {
                  const c = e.collectedStyles.get(e.currentQuerySelector),
                    u = c.get(l);
                  let d = !0;
                  u &&
                    (o != r &&
                      o >= u.startTime &&
                      r <= u.endTime &&
                      (e.errors.push(
                        (function ZB(n, t, e, i, r) {
                          return new C(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = u.startTime)),
                    d && c.set(l, { startTime: o, endTime: r }),
                    e.options &&
                      (function A2(n, t, e) {
                        const i = t.params || {},
                          r = mE(n);
                        r.length &&
                          r.forEach(o => {
                            i.hasOwnProperty(o) ||
                              e.push(
                                (function zB(n) {
                                  return new C(3001, !1);
                                })()
                              );
                          });
                      })(a, e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const i = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                (function QB() {
                  return new C(3011, !1);
                })()
              ),
              i
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = t.steps.map(y => {
            const D = this._makeStyleAst(y, e);
            let v =
                null != D.offset
                  ? D.offset
                  : (function G2(n) {
                      if ('string' == typeof n) return null;
                      let t = null;
                      if (Array.isArray(n))
                        n.forEach(e => {
                          if (e instanceof Map && e.has('offset')) {
                            const i = e;
                            (t = parseFloat(i.get('offset'))), i.delete('offset');
                          }
                        });
                      else if (n instanceof Map && n.has('offset')) {
                        const e = n;
                        (t = parseFloat(e.get('offset'))), e.delete('offset');
                      }
                      return t;
                    })(D.styles),
              S = 0;
            return (
              null != v && (o++, (S = D.offset = v)), (l = l || S < 0 || S > 1), (a = a || S < c), (c = S), s.push(S), D
            );
          });
          l &&
            e.errors.push(
              (function XB() {
                return new C(3012, !1);
              })()
            ),
            a &&
              e.errors.push(
                (function JB() {
                  return new C(3200, !1);
                })()
              );
          const d = t.steps.length;
          let h = 0;
          o > 0 && o < d
            ? e.errors.push(
                (function e2() {
                  return new C(3202, !1);
                })()
              )
            : 0 == o && (h = 1 / (d - 1));
          const f = d - 1,
            p = e.currentTime,
            m = e.currentAnimateTimings,
            _ = m.duration;
          return (
            u.forEach((y, D) => {
              const v = h > 0 ? (D == f ? 1 : h * D) : s[D],
                S = v * _;
              (e.currentTime = p + m.delay + S),
                (m.duration = S),
                this._validateStyleAst(y, e),
                (y.offset = v),
                i.styles.push(y);
            }),
            i
          );
        }
        visitReference(t, e) {
          return { type: 8, animation: Lt(this, Is(t.animation), e), options: Qi(t.options) };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: Qi(t.options) };
        }
        visitAnimateRef(t, e) {
          return { type: 10, animation: this.visitReference(t.animation, e), options: Qi(t.options) };
        }
        visitQuery(t, e) {
          const i = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [o, s] = (function z2(n) {
            const t = !!n.split(/\s*,\s*/).find(e => ':self' == e);
            return (
              t && (n = n.replace(H2, '')),
              (n = n
                .replace(/@\*/g, Wl)
                .replace(/@\w+/g, e => Wl + '-' + e.slice(1))
                .replace(/:animating/g, Ef)),
              [n, t]
            );
          })(t.selector);
          (e.currentQuerySelector = i.length ? i + ' ' + o : o),
            Nt(e.collectedStyles, e.currentQuerySelector, new Map());
          const a = Lt(this, Is(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = i),
            {
              type: 11,
              selector: o,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: s,
              animation: a,
              originalSelector: t.selector,
              options: Qi(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push(
              (function t2() {
                return new C(3013, !1);
              })()
            );
          const i = 'full' === t.timings ? { duration: 0, delay: 0, easing: 'full' } : ql(t.timings, e.errors, !0);
          return { type: 12, animation: Lt(this, Is(t.animation), e), timings: i, options: null };
        }
      }
      class U2 {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Qi(n) {
        return (
          n
            ? (n = Ms(n)).params &&
              (n.params = (function $2(n) {
                return n ? Ms(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function Af(n, t, e) {
        return { duration: n, delay: t, easing: e };
      }
      function xf(n, t, e, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: t,
          preStyleProps: e,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a,
        };
      }
      class ec {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, e) {
          let i = this._map.get(t);
          i || this._map.set(t, (i = [])), i.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const Y2 = new RegExp(':enter', 'g'),
        Q2 = new RegExp(':leave', 'g');
      function Ff(n, t, e, i, r, o = new Map(), s = new Map(), a, l, c = []) {
        return new X2().buildKeyframes(n, t, e, i, r, o, s, a, l, c);
      }
      class X2 {
        buildKeyframes(t, e, i, r, o, s, a, l, c, u = []) {
          c = c || new ec();
          const d = new Of(t, e, c, r, o, u, []);
          d.options = l;
          const h = l.delay ? Jn(l.delay) : 0;
          d.currentTimeline.delayNextStep(h), d.currentTimeline.setStyles([s], null, d.errors, l), Lt(this, i, d);
          const f = d.timelines.filter(p => p.containsAnimation());
          if (f.length && a.size) {
            let p;
            for (let m = f.length - 1; m >= 0; m--) {
              const _ = f[m];
              if (_.element === e) {
                p = _;
                break;
              }
            }
            p && !p.allowOnlyTimelineStyles() && p.setStyles([a], null, d.errors, l);
          }
          return f.length ? f.map(p => p.buildKeyframes()) : [xf(e, [], [], [], 0, h, '', !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const i = e.subInstructions.get(e.element);
          if (i) {
            const r = e.createSubContext(t.options),
              o = e.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && e.transformIntoNewTimeline(s);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const i = e.createSubContext(t.options);
          i.transformIntoNewTimeline(),
            this._applyAnimationRefDelays([t.options, t.animation.options], e, i),
            this.visitReference(t.animation, i),
            e.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _applyAnimationRefDelays(t, e, i) {
          for (const r of t) {
            const o = r?.delay;
            if (o) {
              const s = 'number' == typeof o ? o : Jn(Ts(o, r?.params ?? {}, e.errors));
              i.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(t, e, i) {
          let o = e.currentTimeline.currentTime;
          const s = null != i.duration ? Jn(i.duration) : null,
            a = null != i.delay ? Jn(i.delay) : null;
          return (
            0 !== s &&
              t.forEach(l => {
                const c = e.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, c.duration + c.delay);
              }),
            o
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0), Lt(this, t.animation, e), (e.previousNode = t);
        }
        visitSequence(t, e) {
          const i = e.subContextCount;
          let r = e;
          const o = t.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((r = e.createSubContext(o)), r.transformIntoNewTimeline(), null != o.delay)
          ) {
            6 == r.previousNode.type && (r.currentTimeline.snapshotCurrentStyles(), (r.previousNode = tc));
            const s = Jn(o.delay);
            r.delayNextStep(s);
          }
          t.steps.length &&
            (t.steps.forEach(s => Lt(this, s, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const i = [];
          let r = e.currentTimeline.currentTime;
          const o = t.options && t.options.delay ? Jn(t.options.delay) : 0;
          t.steps.forEach(s => {
            const a = e.createSubContext(t.options);
            o && a.delayNextStep(o),
              Lt(this, s, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach(s => e.currentTimeline.mergeTimelineCollectedStyles(s)),
            e.transformIntoNewTimeline(r),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const i = t.strValue;
            return ql(e.params ? Ts(i, e.params, e.errors) : i, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const i = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            r = e.currentTimeline;
          i.delay && (e.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = t.style;
          5 == o.type
            ? this.visitKeyframes(o, e)
            : (e.incrementTime(i.duration), this.visitStyle(o, e), r.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const i = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && i.hasCurrentStyleProperties() && i.forwardFrame();
          const o = (r && r.easing) || t.easing;
          t.isEmptyStep ? i.applyEmptyStep(o) : i.setStyles(t.styles, o, e.errors, e.options), (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const i = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            o = i.duration,
            a = e.createSubContext().currentTimeline;
          (a.easing = i.easing),
            t.styles.forEach(l => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, e.errors, e.options),
                a.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(a),
            e.transformIntoNewTimeline(r + o),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const i = e.currentTimeline.currentTime,
            r = t.options || {},
            o = r.delay ? Jn(r.delay) : 0;
          o &&
            (6 === e.previousNode.type || (0 == i && e.currentTimeline.hasCurrentStyleProperties())) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = tc));
          let s = i;
          const a = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!r.optional, e.errors);
          e.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            e.currentQueryIndex = u;
            const d = e.createSubContext(t.options, c);
            o && d.delayNextStep(o),
              c === e.element && (l = d.currentTimeline),
              Lt(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(s),
            l && (e.currentTimeline.mergeTimelineCollectedStyles(l), e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const i = e.parentContext,
            r = e.currentTimeline,
            o = t.timings,
            s = Math.abs(o.duration),
            a = s * (e.currentQueryTotal - 1);
          let l = s * e.currentQueryIndex;
          switch (o.duration < 0 ? 'reverse' : o.easing) {
            case 'reverse':
              l = a - l;
              break;
            case 'full':
              l = i.currentStaggerTime;
          }
          const u = e.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          Lt(this, t.animation, e),
            (e.previousNode = t),
            (i.currentStaggerTime = r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const tc = {};
      class Of {
        constructor(t, e, i, r, o, s, a, l) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = tc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new nc(this._driver, e, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const i = t;
          let r = this.options;
          null != i.duration && (r.duration = Jn(i.duration)), null != i.delay && (r.delay = Jn(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach(a => {
                (!e || !s.hasOwnProperty(a)) && (s[a] = Ts(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const i = (t.params = {});
              Object.keys(e).forEach(r => {
                i[r] = e[r];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, i) {
          const r = e || this.element,
            o = new Of(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(t),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = tc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, i) {
          const r = {
              duration: e ?? t.duration,
              delay: this.currentTimeline.currentTime + (i ?? 0) + t.delay,
              easing: '',
            },
            o = new J2(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              r,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(o), r;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, i, r, o, s) {
          let a = [];
          if ((r && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(Y2, '.' + this._enterClassName)).replace(Q2, '.' + this._leaveClassName);
            let c = this._driver.query(this.element, t, 1 != i);
            0 !== i && (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)), a.push(...c);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function n2(n) {
                  return new C(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class nc {
        constructor(t, e, i, r) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new nc(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
          );
        }
        _loadKeyframe() {
          this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()), this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(), (this.duration = t), this._loadKeyframe();
        }
        _updateStyle(t, e) {
          this._localTimelineStyles.set(t, e),
            this._globalTimelineStyles.set(t, e),
            this._styleSummary.set(t, { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set('easing', t);
          for (let [e, i] of this._globalTimelineStyles)
            this._backFill.set(e, i || Xn), this._currentKeyframe.set(e, Xn);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, e, i, r) {
          e && this._previousKeyframe.set('easing', e);
          const o = (r && r.params) || {},
            s = (function eH(n, t) {
              const e = new Map();
              let i;
              return (
                n.forEach(r => {
                  if ('*' === r) {
                    i = i || t.keys();
                    for (let o of i) e.set(o, Xn);
                  } else wi(r, e);
                }),
                e
              );
            })(t, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const c = Ts(l, o, i);
            this._pendingStyles.set(a, c),
              this._localTimelineStyles.has(a) || this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Xn),
              this._updateStyle(a, c);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, e) => {
              this._currentKeyframe.set(e, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, e) => {
              this._currentKeyframe.has(e) || this._currentKeyframe.set(e, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, e] of this._localTimelineStyles) this._pendingStyles.set(t, e), this._updateStyle(t, e);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((e, i) => {
            const r = this._styleSummary.get(i);
            (!r || e.time > r.time) && this._updateStyle(i, e.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = wi(a, new Map(), this._backFill);
            c.forEach((u, d) => {
              '!' === u ? t.add(d) : u === Xn && e.add(d);
            }),
              i || c.set('offset', l / this.duration),
              r.push(c);
          });
          const o = t.size ? Kl(t.values()) : [],
            s = e.size ? Kl(e.values()) : [];
          if (i) {
            const a = r[0],
              l = new Map(a);
            a.set('offset', 0), l.set('offset', 1), (r = [a, l]);
          }
          return xf(this.element, r, o, s, this.duration, this.startTime, this.easing, !1);
        }
      }
      class J2 extends nc {
        constructor(t, e, i, r, o, s, a = !1) {
          super(t, e, s.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = { duration: s.duration, delay: s.delay, easing: s.easing });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const o = [],
              s = i + e,
              a = e / s,
              l = wi(t[0]);
            l.set('offset', 0), o.push(l);
            const c = wi(t[0]);
            c.set('offset', bE(a)), o.push(c);
            const u = t.length - 1;
            for (let d = 1; d <= u; d++) {
              let h = wi(t[d]);
              const f = h.get('offset');
              h.set('offset', bE((e + f * i) / s)), o.push(h);
            }
            (i = s), (e = 0), (r = ''), (t = o);
          }
          return xf(this.element, t, this.preStyleProps, this.postStyleProps, i, e, r, !0);
        }
      }
      function bE(n, t = 3) {
        const e = Math.pow(10, t - 1);
        return Math.round(n * e) / e;
      }
      class kf {}
      const tH = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
      ]);
      class nH extends kf {
        normalizePropertyName(t, e) {
          return If(t);
        }
        normalizeStyleValue(t, e, i, r) {
          let o = '';
          const s = i.toString().trim();
          if (tH.has(e) && 0 !== i && '0' !== i)
            if ('number' == typeof i) o = 'px';
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(
                  (function GB(n, t) {
                    return new C(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function wE(n, t, e, i, r, o, s, a, l, c, u, d, h) {
        return {
          type: 0,
          element: n,
          triggerName: t,
          isRemovalTransition: r,
          fromState: e,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: d,
          errors: h,
        };
      }
      const Rf = {};
      class CE {
        constructor(t, e, i) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = i);
        }
        match(t, e, i, r) {
          return (function iH(n, t, e, i, r) {
            return n.some(o => o(t, e, i, r));
          })(this.ast.matchers, t, e, i, r);
        }
        buildStyles(t, e, i) {
          let r = this._stateStyles.get('*');
          return void 0 !== t && (r = this._stateStyles.get(t?.toString()) || r), r ? r.buildStyles(e, i) : new Map();
        }
        build(t, e, i, r, o, s, a, l, c, u) {
          const d = [],
            h = (this.ast.options && this.ast.options.params) || Rf,
            p = this.buildStyles(i, (a && a.params) || Rf, d),
            m = (l && l.params) || Rf,
            _ = this.buildStyles(r, m, d),
            y = new Set(),
            D = new Map(),
            v = new Map(),
            S = 'void' === r,
            q = { params: rH(m, h), delay: this.ast.options?.delay },
            J = u ? [] : Ff(t, e, this.ast.animation, o, s, p, _, q, c, d);
          let xe = 0;
          if (
            (J.forEach(Bt => {
              xe = Math.max(Bt.duration + Bt.delay, xe);
            }),
            d.length)
          )
            return wE(e, this._triggerName, i, r, S, p, _, [], [], D, v, xe, d);
          J.forEach(Bt => {
            const Ht = Bt.element,
              oo = Nt(D, Ht, new Set());
            Bt.preStyleProps.forEach(pn => oo.add(pn));
            const ei = Nt(v, Ht, new Set());
            Bt.postStyleProps.forEach(pn => ei.add(pn)), Ht !== e && y.add(Ht);
          });
          const Vt = Kl(y.values());
          return wE(e, this._triggerName, i, r, S, p, _, J, Vt, D, v, xe);
        }
      }
      function rH(n, t) {
        const e = Ms(t);
        for (const i in n) n.hasOwnProperty(i) && null != n[i] && (e[i] = n[i]);
        return e;
      }
      class oH {
        constructor(t, e, i) {
          (this.styles = t), (this.defaultParams = e), (this.normalizer = i);
        }
        buildStyles(t, e) {
          const i = new Map(),
            r = Ms(this.defaultParams);
          return (
            Object.keys(t).forEach(o => {
              const s = t[o];
              null !== s && (r[o] = s);
            }),
            this.styles.styles.forEach(o => {
              'string' != typeof o &&
                o.forEach((s, a) => {
                  s && (s = Ts(s, r, e));
                  const l = this.normalizer.normalizePropertyName(a, e);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, e)), i.set(l, s);
                });
            }),
            i
          );
        }
      }
      class aH {
        constructor(t, e, i) {
          (this.name = t),
            (this.ast = e),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = new Map()),
            e.states.forEach(r => {
              this.states.set(r.name, new oH(r.style, (r.options && r.options.params) || {}, i));
            }),
            DE(this.states, 'true', '1'),
            DE(this.states, 'false', '0'),
            e.transitions.forEach(r => {
              this.transitionFactories.push(new CE(t, r, this.states));
            }),
            (this.fallbackTransition = (function lH(n, t, e) {
              return new CE(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, i, r) {
          return this.transitionFactories.find(s => s.match(t, e, i, r)) || null;
        }
        matchStyles(t, e, i) {
          return this.fallbackTransition.buildStyles(t, e, i);
        }
      }
      function DE(n, t, e) {
        n.has(t) ? n.has(e) || n.set(e, n.get(t)) : n.has(e) && n.set(t, n.get(e));
      }
      const cH = new ec();
      class uH {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, e) {
          const i = [],
            o = Tf(this._driver, e, i, []);
          if (i.length)
            throw (function u2(n) {
              return new C(3503, !1);
            })();
          this._animations.set(t, o);
        }
        _buildPlayer(t, e, i) {
          const r = t.element,
            o = tE(0, this._normalizer, 0, t.keyframes, e, i);
          return this._driver.animate(r, o, t.duration, t.delay, t.easing, [], !0);
        }
        create(t, e, i = {}) {
          const r = [],
            o = this._animations.get(t);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = Ff(this._driver, e, o, Df, Ul, new Map(), new Map(), i, cH, r)),
                s.forEach(u => {
                  const d = Nt(a, u.element, new Map());
                  u.postStyleProps.forEach(h => d.set(h, null));
                }))
              : (r.push(
                  (function d2() {
                    return new C(3300, !1);
                  })()
                ),
                (s = [])),
            r.length)
          )
            throw (function h2(n) {
              return new C(3504, !1);
            })();
          a.forEach((u, d) => {
            u.forEach((h, f) => {
              u.set(f, this._driver.computeStyle(d, f, Xn));
            });
          });
          const c = bi(
            s.map(u => {
              const d = a.get(u.element);
              return this._buildPlayer(u, new Map(), d);
            })
          );
          return this._playersById.set(t, c), c.onDestroy(() => this.destroy(t)), this.players.push(c), c;
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), this._playersById.delete(t);
          const i = this.players.indexOf(e);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(t) {
          const e = this._playersById.get(t);
          if (!e)
            throw (function f2(n) {
              return new C(3301, !1);
            })();
          return e;
        }
        listen(t, e, i, r) {
          const o = vf(e, '', '', '');
          return _f(this._getPlayer(t), i, o, r), () => {};
        }
        command(t, e, i, r) {
          if ('register' == i) return void this.register(t, r[0]);
          if ('create' == i) return void this.create(t, e, r[0] || {});
          const o = this._getPlayer(t);
          switch (i) {
            case 'play':
              o.play();
              break;
            case 'pause':
              o.pause();
              break;
            case 'reset':
              o.reset();
              break;
            case 'restart':
              o.restart();
              break;
            case 'finish':
              o.finish();
              break;
            case 'init':
              o.init();
              break;
            case 'setPosition':
              o.setPosition(parseFloat(r[0]));
              break;
            case 'destroy':
              this.destroy(t);
          }
        }
      }
      const EE = 'ng-animate-queued',
        Pf = 'ng-animate-disabled',
        mH = [],
        SE = { namespaceId: '', setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1 },
        gH = { namespaceId: '', setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0 },
        Xt = '__ng_removed';
      class Nf {
        constructor(t, e = '') {
          this.namespaceId = e;
          const i = t && t.hasOwnProperty('value');
          if (
            ((this.value = (function bH(n) {
              return n ?? null;
            })(i ? t.value : t)),
            i)
          ) {
            const o = Ms(t);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const i = this.options.params;
            Object.keys(e).forEach(r => {
              null == i[r] && (i[r] = e[r]);
            });
          }
        }
      }
      const As = 'void',
        Lf = new Nf(As);
      class _H {
        constructor(t, e, i) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = i),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + t),
            Jt(e, this._hostClassName);
        }
        listen(t, e, i, r) {
          if (!this._triggers.has(e))
            throw (function p2(n, t) {
              return new C(3302, !1);
            })();
          if (null == i || 0 == i.length)
            throw (function m2(n) {
              return new C(3303, !1);
            })();
          if (
            !(function wH(n) {
              return 'start' == n || 'done' == n;
            })(i)
          )
            throw (function g2(n, t) {
              return new C(3400, !1);
            })();
          const o = Nt(this._elementListeners, t, []),
            s = { name: e, phase: i, callback: r };
          o.push(s);
          const a = Nt(this._engine.statesByElement, t, new Map());
          return (
            a.has(e) || (Jt(t, Gl), Jt(t, Gl + '-' + e), a.set(e, Lf)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(e) || a.delete(e);
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers.has(t) && (this._triggers.set(t, e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers.get(t);
          if (!e)
            throw (function _2(n) {
              return new C(3401, !1);
            })();
          return e;
        }
        trigger(t, e, i, r = !0) {
          const o = this._getTrigger(e),
            s = new Vf(this.id, e, t);
          let a = this._engine.statesByElement.get(t);
          a || (Jt(t, Gl), Jt(t, Gl + '-' + e), this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(e);
          const c = new Nf(i, this.id);
          if (
            (!(i && i.hasOwnProperty('value')) && l && c.absorbOptions(l.options),
            a.set(e, c),
            l || (l = Lf),
            c.value !== As && l.value === c.value)
          ) {
            if (
              !(function EH(n, t) {
                const e = Object.keys(n),
                  i = Object.keys(t);
                if (e.length != i.length) return !1;
                for (let r = 0; r < e.length; r++) {
                  const o = e[r];
                  if (!t.hasOwnProperty(o) || n[o] !== t[o]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const m = [],
                _ = o.matchStyles(l.value, l.params, m),
                y = o.matchStyles(c.value, c.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    Zi(t, _), On(t, y);
                  });
            }
            return;
          }
          const h = Nt(this._engine.playersByElement, t, []);
          h.forEach(m => {
            m.namespaceId == this.id && m.triggerName == e && m.queued && m.destroy();
          });
          let f = o.matchTransition(l.value, c.value, t, c.params),
            p = !1;
          if (!f) {
            if (!r) return;
            (f = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: f,
              fromState: l,
              toState: c,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (Jt(t, EE),
              s.onStart(() => {
                ro(t, EE);
              })),
            s.onDone(() => {
              let m = this.players.indexOf(s);
              m >= 0 && this.players.splice(m, 1);
              const _ = this._engine.playersByElement.get(t);
              if (_) {
                let y = _.indexOf(s);
                y >= 0 && _.splice(y, 1);
              }
            }),
            this.players.push(s),
            h.push(s),
            s
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach(e => e.delete(t)),
            this._elementListeners.forEach((e, i) => {
              this._elementListeners.set(
                i,
                e.filter(r => r.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e && (e.forEach(i => i.destroy()), this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const i = this._engine.driver.query(t, Wl, !0);
          i.forEach(r => {
            if (r[Xt]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size ? o.forEach(s => s.triggerLeaveAnimation(r, e, !1, !0)) : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() => i.forEach(r => this.clearElementCache(r)));
        }
        triggerLeaveAnimation(t, e, i, r) {
          const o = this._engine.statesByElement.get(t),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, c) => {
                if ((s.set(c, l.value), this._triggers.has(c))) {
                  const u = this.trigger(t, c, As, r);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e, s),
                i && bi(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            i = this._engine.statesByElement.get(t);
          if (e && i) {
            const r = new Set();
            e.forEach(o => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                c = i.get(s) || Lf,
                u = new Nf(As),
                d = new Vf(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: l,
                  fromState: c,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const i = this._engine;
          if ((t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0)))
            return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(t) : [];
            if (o && o.length) r = !0;
            else {
              let s = t;
              for (; (s = s.parentNode); )
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), r)) i.markElementAsRemoved(this.id, t, !1, e);
          else {
            const o = t[Xt];
            (!o || o === SE) &&
              (i.afterFlush(() => this.clearElementCache(t)), i.destroyInnerAnimations(t), i._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          Jt(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach(i => {
              const r = i.player;
              if (r.destroyed) return;
              const o = i.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach(a => {
                  if (a.name == i.triggerName) {
                    const l = vf(o, i.triggerName, i.fromState.value, i.toState.value);
                    (l._data = t), _f(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : e.push(i);
            }),
            (this._queue = []),
            e.sort((i, r) => {
              const o = i.transition.ast.depCount,
                s = r.transition.ast.depCount;
              return 0 == o || 0 == s ? o - s : this._engine.driver.containsElement(i.element, r.element) ? 1 : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach(e => e.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return this._elementListeners.has(t) && (e = !0), (e = !!this._queue.find(i => i.element === t) || e), e;
        }
      }
      class yH {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, o) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach(e => {
              e.players.forEach(i => {
                i.queued && t.push(i);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const i = new _H(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(i, e)
              : (this.newHostElements.set(e, i), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = i)
          );
        }
        _balanceNamespaceList(t, e) {
          const i = this._namespaceList,
            r = this.namespacesByHostElement;
          if (i.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(e);
            for (; a; ) {
              const l = r.get(a);
              if (l) {
                const c = i.indexOf(l);
                i.splice(c + 1, 0, t), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || i.unshift(t);
          } else i.push(t);
          return r.set(e, t), t;
        }
        register(t, e) {
          let i = this._namespaceLookup[t];
          return i || (i = this.createNamespace(t, e)), i;
        }
        registerTrigger(t, e, i) {
          let r = this._namespaceLookup[t];
          r && r.register(e, i) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const i = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement), delete this._namespaceLookup[t];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            i = this.statesByElement.get(t);
          if (i)
            for (let r of i.values())
              if (r.namespaceId) {
                const o = this._fetchNamespace(r.namespaceId);
                o && e.add(o);
              }
          return e;
        }
        trigger(t, e, i, r) {
          if (ic(e)) {
            const o = this._fetchNamespace(t);
            if (o) return o.trigger(e, i, r), !0;
          }
          return !1;
        }
        insertNode(t, e, i, r) {
          if (!ic(e)) return;
          const o = e[Xt];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(e);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, i);
          }
          r && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), Jt(t, Pf))
            : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), ro(t, Pf));
        }
        removeNode(t, e, i, r) {
          if (ic(e)) {
            const o = t ? this._fetchNamespace(t) : null;
            if ((o ? o.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r), i)) {
              const s = this.namespacesByHostElement.get(e);
              s && s.id !== t && s.removeNode(e, r);
            }
          } else this._onRemovalComplete(e, r);
        }
        markElementAsRemoved(t, e, i, r, o) {
          this.collectedLeaveElements.push(e),
            (e[Xt] = {
              namespaceId: t,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(t, e, i, r, o) {
          return ic(e) ? this._fetchNamespace(t).listen(e, i, r, o) : () => {};
        }
        _buildInstruction(t, e, i, r, o) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            i,
            r,
            t.fromState.options,
            t.toState.options,
            e,
            o
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, Wl, !0);
          e.forEach(i => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, Ef, !0)), e.forEach(i => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach(i => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach(i => i.finish());
        }
        whenRenderingDone() {
          return new Promise(t => {
            if (this.players.length) return bi(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t[Xt];
          if (e && e.setForRemoval) {
            if (((t[Xt] = SE), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const i = this._fetchNamespace(e.namespaceId);
              i && i.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          t.classList?.contains(Pf) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, '.ng-animate-disabled', !0).forEach(i => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) => this._balanceNamespaceList(i, r)), this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              Jt(this.collectedEnterElements[i], 'ng-star-inserted');
          if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            const i = [];
            try {
              e = this._flushAnimations(i, t);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(i => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? bi(e).onDone(() => {
                    i.forEach(r => r());
                  })
                : i.forEach(r => r());
          }
        }
        reportError(t) {
          throw (function y2(n) {
            return new C(3402, !1);
          })();
        }
        _flushAnimations(t, e) {
          const i = new ec(),
            r = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            u = new Set();
          this.disabledNodes.forEach(A => {
            u.add(A);
            const k = this.driver.query(A, '.ng-animate-queued', !0);
            for (let L = 0; L < k.length; L++) u.add(k[L]);
          });
          const d = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            f = TE(h, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          f.forEach((A, k) => {
            const L = Df + m++;
            p.set(k, L), A.forEach(re => Jt(re, L));
          });
          const _ = [],
            y = new Set(),
            D = new Set();
          for (let A = 0; A < this.collectedLeaveElements.length; A++) {
            const k = this.collectedLeaveElements[A],
              L = k[Xt];
            L &&
              L.setForRemoval &&
              (_.push(k),
              y.add(k),
              L.hasAnimation ? this.driver.query(k, '.ng-star-inserted', !0).forEach(re => y.add(re)) : D.add(k));
          }
          const v = new Map(),
            S = TE(h, Array.from(y));
          S.forEach((A, k) => {
            const L = Ul + m++;
            v.set(k, L), A.forEach(re => Jt(re, L));
          }),
            t.push(() => {
              f.forEach((A, k) => {
                const L = p.get(k);
                A.forEach(re => ro(re, L));
              }),
                S.forEach((A, k) => {
                  const L = v.get(k);
                  A.forEach(re => ro(re, L));
                }),
                _.forEach(A => {
                  this.processLeaveNode(A);
                });
            });
          const q = [],
            J = [];
          for (let A = this._namespaceList.length - 1; A >= 0; A--)
            this._namespaceList[A].drainQueuedTransitions(e).forEach(L => {
              const re = L.player,
                Ye = L.element;
              if ((q.push(re), this.collectedEnterElements.length)) {
                const lt = Ye[Xt];
                if (lt && lt.setForMove) {
                  if (lt.previousTriggersValues && lt.previousTriggersValues.has(L.triggerName)) {
                    const Xi = lt.previousTriggersValues.get(L.triggerName),
                      en = this.statesByElement.get(L.element);
                    if (en && en.has(L.triggerName)) {
                      const sc = en.get(L.triggerName);
                      (sc.value = Xi), en.set(L.triggerName, sc);
                    }
                  }
                  return void re.destroy();
                }
              }
              const kn = !d || !this.driver.containsElement(d, Ye),
                jt = v.get(Ye),
                Ci = p.get(Ye),
                Fe = this._buildInstruction(L, i, Ci, jt, kn);
              if (Fe.errors && Fe.errors.length) return void J.push(Fe);
              if (kn)
                return (
                  re.onStart(() => Zi(Ye, Fe.fromStyles)), re.onDestroy(() => On(Ye, Fe.toStyles)), void r.push(re)
                );
              if (L.isFallbackTransition)
                return (
                  re.onStart(() => Zi(Ye, Fe.fromStyles)), re.onDestroy(() => On(Ye, Fe.toStyles)), void r.push(re)
                );
              const VE = [];
              Fe.timelines.forEach(lt => {
                (lt.stretchStartingKeyframe = !0), this.disabledNodes.has(lt.element) || VE.push(lt);
              }),
                (Fe.timelines = VE),
                i.append(Ye, Fe.timelines),
                s.push({ instruction: Fe, player: re, element: Ye }),
                Fe.queriedElements.forEach(lt => Nt(a, lt, []).push(re)),
                Fe.preStyleProps.forEach((lt, Xi) => {
                  if (lt.size) {
                    let en = l.get(Xi);
                    en || l.set(Xi, (en = new Set())), lt.forEach((sc, jf) => en.add(jf));
                  }
                }),
                Fe.postStyleProps.forEach((lt, Xi) => {
                  let en = c.get(Xi);
                  en || c.set(Xi, (en = new Set())), lt.forEach((sc, jf) => en.add(jf));
                });
            });
          if (J.length) {
            const A = [];
            J.forEach(k => {
              A.push(
                (function v2(n, t) {
                  return new C(3505, !1);
                })()
              );
            }),
              q.forEach(k => k.destroy()),
              this.reportError(A);
          }
          const xe = new Map(),
            Vt = new Map();
          s.forEach(A => {
            const k = A.element;
            i.has(k) && (Vt.set(k, k), this._beforeAnimationBuild(A.player.namespaceId, A.instruction, xe));
          }),
            r.forEach(A => {
              const k = A.element;
              this._getPreviousPlayers(k, !1, A.namespaceId, A.triggerName, null).forEach(re => {
                Nt(xe, k, []).push(re), re.destroy();
              });
            });
          const Bt = _.filter(A => xE(A, l, c)),
            Ht = new Map();
          IE(Ht, this.driver, D, c, Xn).forEach(A => {
            xE(A, l, c) && Bt.push(A);
          });
          const ei = new Map();
          f.forEach((A, k) => {
            IE(ei, this.driver, new Set(A), l, '!');
          }),
            Bt.forEach(A => {
              const k = Ht.get(A),
                L = ei.get(A);
              Ht.set(A, new Map([...Array.from(k?.entries() ?? []), ...Array.from(L?.entries() ?? [])]));
            });
          const pn = [],
            so = [],
            ao = {};
          s.forEach(A => {
            const { element: k, player: L, instruction: re } = A;
            if (i.has(k)) {
              if (u.has(k))
                return (
                  L.onDestroy(() => On(k, re.toStyles)),
                  (L.disabled = !0),
                  L.overrideTotalTime(re.totalTime),
                  void r.push(L)
                );
              let Ye = ao;
              if (Vt.size > 1) {
                let jt = k;
                const Ci = [];
                for (; (jt = jt.parentNode); ) {
                  const Fe = Vt.get(jt);
                  if (Fe) {
                    Ye = Fe;
                    break;
                  }
                  Ci.push(jt);
                }
                Ci.forEach(Fe => Vt.set(Fe, Ye));
              }
              const kn = this._buildAnimation(L.namespaceId, re, xe, o, ei, Ht);
              if ((L.setRealPlayer(kn), Ye === ao)) pn.push(L);
              else {
                const jt = this.playersByElement.get(Ye);
                jt && jt.length && (L.parentPlayer = bi(jt)), r.push(L);
              }
            } else Zi(k, re.fromStyles), L.onDestroy(() => On(k, re.toStyles)), so.push(L), u.has(k) && r.push(L);
          }),
            so.forEach(A => {
              const k = o.get(A.element);
              if (k && k.length) {
                const L = bi(k);
                A.setRealPlayer(L);
              }
            }),
            r.forEach(A => {
              A.parentPlayer ? A.syncPlayerEvents(A.parentPlayer) : A.destroy();
            });
          for (let A = 0; A < _.length; A++) {
            const k = _[A],
              L = k[Xt];
            if ((ro(k, Ul), L && L.hasAnimation)) continue;
            let re = [];
            if (a.size) {
              let kn = a.get(k);
              kn && kn.length && re.push(...kn);
              let jt = this.driver.query(k, Ef, !0);
              for (let Ci = 0; Ci < jt.length; Ci++) {
                let Fe = a.get(jt[Ci]);
                Fe && Fe.length && re.push(...Fe);
              }
            }
            const Ye = re.filter(kn => !kn.destroyed);
            Ye.length ? CH(this, k, Ye) : this.processLeaveNode(k);
          }
          return (
            (_.length = 0),
            pn.forEach(A => {
              this.players.push(A),
                A.onDone(() => {
                  A.destroy();
                  const k = this.players.indexOf(A);
                  this.players.splice(k, 1);
                }),
                A.play();
            }),
            pn
          );
        }
        elementContainsData(t, e) {
          let i = !1;
          const r = e[Xt];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(e) && (i = !0),
            this.playersByQueriedElement.has(e) && (i = !0),
            this.statesByElement.has(e) && (i = !0),
            this._fetchNamespace(t).elementContainsData(e) || i
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, i, r, o) {
          let s = [];
          if (e) {
            const a = this.playersByQueriedElement.get(t);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !o || o == As;
              a.forEach(c => {
                c.queued || (!l && c.triggerName != r) || s.push(c);
              });
            }
          }
          return (i || r) && (s = s.filter(a => !((i && i != a.namespaceId) || (r && r != a.triggerName)))), s;
        }
        _beforeAnimationBuild(t, e, i) {
          const o = e.element,
            s = e.isRemovalTransition ? void 0 : t,
            a = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const l of e.timelines) {
            const c = l.element,
              u = c !== o,
              d = Nt(i, c, []);
            this._getPreviousPlayers(c, u, s, a, e.toState).forEach(f => {
              const p = f.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), f.destroy(), d.push(f);
            });
          }
          Zi(o, e.fromStyles);
        }
        _buildAnimation(t, e, i, r, o, s) {
          const a = e.triggerName,
            l = e.element,
            c = [],
            u = new Set(),
            d = new Set(),
            h = e.timelines.map(p => {
              const m = p.element;
              u.add(m);
              const _ = m[Xt];
              if (_ && _.removedBeforeQueried) return new Ds(p.duration, p.delay);
              const y = m !== l,
                D = (function DH(n) {
                  const t = [];
                  return AE(n, t), t;
                })((i.get(m) || mH).map(xe => xe.getRealPlayer())).filter(xe => !!xe.element && xe.element === m),
                v = o.get(m),
                S = s.get(m),
                q = tE(0, this._normalizer, 0, p.keyframes, v, S),
                J = this._buildPlayer(p, q, D);
              if ((p.subTimeline && r && d.add(m), y)) {
                const xe = new Vf(t, a, m);
                xe.setRealPlayer(J), c.push(xe);
              }
              return J;
            });
          c.forEach(p => {
            Nt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function vH(n, t, e) {
                  let i = n.get(t);
                  if (i) {
                    if (i.length) {
                      const r = i.indexOf(e);
                      i.splice(r, 1);
                    }
                    0 == i.length && n.delete(t);
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach(p => Jt(p, uE));
          const f = bi(h);
          return (
            f.onDestroy(() => {
              u.forEach(p => ro(p, uE)), On(l, e.toStyles);
            }),
            d.forEach(p => {
              Nt(r, p, []).push(f);
            }),
            f
          );
        }
        _buildPlayer(t, e, i) {
          return e.length > 0
            ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, i)
            : new Ds(t.duration, t.delay);
        }
      }
      class Vf {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = i),
            (this._player = new Ds()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((e, i) => {
              e.forEach(r => _f(t, i, void 0, r));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback('start')),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Nt(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent('done', t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent('start', t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent('destroy', t), this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function ic(n) {
        return n && 1 === n.nodeType;
      }
      function ME(n, t) {
        const e = n.style.display;
        return (n.style.display = t ?? 'none'), e;
      }
      function IE(n, t, e, i, r) {
        const o = [];
        e.forEach(l => o.push(ME(l)));
        const s = [];
        i.forEach((l, c) => {
          const u = new Map();
          l.forEach(d => {
            const h = t.computeStyle(c, d, r);
            u.set(d, h), (!h || 0 == h.length) && ((c[Xt] = gH), s.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return e.forEach(l => ME(l, o[a++])), s;
      }
      function TE(n, t) {
        const e = new Map();
        if ((n.forEach(a => e.set(a, [])), 0 == t.length)) return e;
        const r = new Set(t),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = e.has(c) ? c : r.has(c) ? 1 : s(c)), o.set(a, l), l;
        }
        return (
          t.forEach(a => {
            const l = s(a);
            1 !== l && e.get(l).push(a);
          }),
          e
        );
      }
      function Jt(n, t) {
        n.classList?.add(t);
      }
      function ro(n, t) {
        n.classList?.remove(t);
      }
      function CH(n, t, e) {
        bi(e).onDone(() => n.processLeaveNode(t));
      }
      function AE(n, t) {
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          i instanceof ID ? AE(i.players, t) : t.push(i);
        }
      }
      function xE(n, t, e) {
        const i = e.get(n);
        if (!i) return !1;
        let r = t.get(n);
        return r ? i.forEach(o => r.add(o)) : t.set(n, i), e.delete(n), !0;
      }
      class rc {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new yH(t, e, i)),
            (this._timelineEngine = new uH(t, e, i)),
            (this._transitionEngine.onRemovalComplete = (r, o) => this.onRemovalComplete(r, o));
        }
        registerTrigger(t, e, i, r, o) {
          const s = t + '-' + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              u = Tf(this._driver, o, l, []);
            if (l.length)
              throw (function l2(n, t) {
                return new C(3404, !1);
              })();
            (a = (function sH(n, t, e) {
              return new aH(n, t, e);
            })(r, u, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(e, r, a);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, i, r) {
          this._transitionEngine.insertNode(t, e, i, r);
        }
        onRemove(t, e, i, r) {
          this._transitionEngine.removeNode(t, e, r || !1, i);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, i, r) {
          if ('@' == i.charAt(0)) {
            const [o, s] = nE(i);
            this._timelineEngine.command(o, e, s, r);
          } else this._transitionEngine.trigger(t, e, i, r);
        }
        listen(t, e, i, r, o) {
          if ('@' == i.charAt(0)) {
            const [s, a] = nE(i);
            return this._timelineEngine.listen(s, e, a, o);
          }
          return this._transitionEngine.listen(t, e, i, r, o);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(this._timelineEngine.players);
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let MH = (() => {
        class n {
          constructor(e, i, r) {
            (this._element = e), (this._startStyles = i), (this._endStyles = r), (this._state = 0);
            let o = n.initialStylesByElement.get(e);
            o || n.initialStylesByElement.set(e, (o = new Map())), (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles && On(this._element, this._startStyles, this._initialStyles), (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (On(this._element, this._initialStyles),
                this._endStyles && (On(this._element, this._endStyles), (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles && (Zi(this._element, this._startStyles), (this._endStyles = null)),
                this._endStyles && (Zi(this._element, this._endStyles), (this._endStyles = null)),
                On(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function Bf(n) {
        let t = null;
        return (
          n.forEach((e, i) => {
            (function IH(n) {
              return 'display' === n || 'position' === n;
            })(i) && ((t = t || new Map()), t.set(i, e));
          }),
          t
        );
      }
      class FE {
        constructor(t, e, i, r) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished || ((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(this.element, t, this.options)),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener('finish', () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const e = [];
          return (
            t.forEach(i => {
              e.push(Object.fromEntries(i));
            }),
            e
          );
        }
        _triggerWebAnimation(t, e, i) {
          return t.animate(this._convertKeyframesToObject(e), i);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(t => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(), (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((i, r) => {
              'offset' !== r && t.set(r, this._finished ? i : gE(this.element, r));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = 'start' === t ? this._onStartFns : this._onDoneFns;
          e.forEach(i => i()), (e.length = 0);
        }
      }
      class TH {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return sE(t, e);
        }
        getParentElement(t) {
          return wf(t);
        }
        query(t, e, i) {
          return aE(t, e, i);
        }
        computeStyle(t, e, i) {
          return window.getComputedStyle(t)[e];
        }
        animate(t, e, i, r, o, s = []) {
          const l = { duration: i, delay: r, fill: 0 == r ? 'both' : 'forwards' };
          o && (l.easing = o);
          const c = new Map(),
            u = s.filter(f => f instanceof FE);
          (function O2(n, t) {
            return 0 === n || 0 === t;
          })(i, r) &&
            u.forEach(f => {
              f.currentSnapshot.forEach((p, m) => c.set(m, p));
            });
          let d = (function T2(n) {
            return n.length ? (n[0] instanceof Map ? n : n.map(t => dE(t))) : [];
          })(e).map(f => wi(f));
          d = (function k2(n, t, e) {
            if (e.size && t.length) {
              let i = t[0],
                r = [];
              if (
                (e.forEach((o, s) => {
                  i.has(s) || r.push(s), i.set(s, o);
                }),
                r.length)
              )
                for (let o = 1; o < t.length; o++) {
                  let s = t[o];
                  r.forEach(a => s.set(a, gE(n, a)));
                }
            }
            return t;
          })(t, d, c);
          const h = (function SH(n, t) {
            let e = null,
              i = null;
            return (
              Array.isArray(t) && t.length
                ? ((e = Bf(t[0])), t.length > 1 && (i = Bf(t[t.length - 1])))
                : t instanceof Map && (e = Bf(t)),
              e || i ? new MH(n, e, i) : null
            );
          })(t, d);
          return new FE(t, d, l, h);
        }
      }
      let AH = (() => {
        class n extends ED {
          constructor(e, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(i.body, {
                id: '0',
                encapsulation: nn.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(e) ? SD(e) : e;
            return OE(this._renderer, null, i, 'register', [r]), new xH(i, this._renderer);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Ro), b(Z));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class xH extends class VL {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new FH(this._id, t, e || {}, this._renderer);
        }
      }
      class FH {
        constructor(t, e, i, r) {
          (this.id = t),
            (this.element = e),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', i);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return OE(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen('done', t);
        }
        onStart(t) {
          this._listen('start', t);
        }
        onDestroy(t) {
          this._listen('destroy', t);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset'), (this._started = !1);
        }
        setPosition(t) {
          this._command('setPosition', t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function OE(n, t, e, i, r) {
        return n.setProperty(t, `@@${e}:${i}`, r);
      }
      const kE = '@.disabled';
      let OH = (() => {
        class n {
          constructor(e, i, r) {
            (this.delegate = e),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(e, i) {
            const o = this.delegate.createRenderer(e, i);
            if (!(e && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(o);
              return u || ((u = new RE('', o, this.engine)), this._rendererCache.set(o, u)), u;
            }
            const s = i.id,
              a = i.id + '-' + this._currentId;
            this._currentId++, this.engine.register(a, e);
            const l = u => {
              Array.isArray(u) ? u.forEach(l) : this.engine.registerTrigger(s, a, e, u.name, u);
            };
            return i.data.animation.forEach(l), new kH(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, i, r) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(o => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(b(Ro), b(rc), b(ne));
          }),
          (n.ɵprov = T({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class RE {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = i),
            (this.destroyNode = this.delegate.destroyNode ? r => e.destroyNode(r) : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, i, r = !0) {
          this.delegate.insertBefore(t, e, i), this.engine.onInsert(this.namespaceId, e, t, r);
        }
        removeChild(t, e, i) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, i);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, i, r) {
          this.delegate.setAttribute(t, e, i, r);
        }
        removeAttribute(t, e, i) {
          this.delegate.removeAttribute(t, e, i);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, i, r) {
          this.delegate.setStyle(t, e, i, r);
        }
        removeStyle(t, e, i) {
          this.delegate.removeStyle(t, e, i);
        }
        setProperty(t, e, i) {
          '@' == e.charAt(0) && e == kE ? this.disableAnimations(t, !!i) : this.delegate.setProperty(t, e, i);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, i) {
          return this.delegate.listen(t, e, i);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class kH extends RE {
        constructor(t, e, i, r) {
          super(e, i, r), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, i) {
          '@' == e.charAt(0)
            ? '.' == e.charAt(1) && e == kE
              ? this.disableAnimations(t, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, t, e.slice(1), i)
            : this.delegate.setProperty(t, e, i);
        }
        listen(t, e, i) {
          if ('@' == e.charAt(0)) {
            const r = (function RH(n) {
              switch (n) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return n;
              }
            })(t);
            let o = e.slice(1),
              s = '';
            return (
              '@' != o.charAt(0) &&
                ([o, s] = (function PH(n) {
                  const t = n.indexOf('.');
                  return [n.substring(0, t), n.slice(t + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, r, o, s, a => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(t, e, i);
        }
      }
      const PE = [
          { provide: ED, useClass: AH },
          {
            provide: kf,
            useFactory: function LH() {
              return new nH();
            },
          },
          {
            provide: rc,
            useClass: (() => {
              class n extends rc {
                constructor(e, i, r, o) {
                  super(e.body, i, r);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (n.ɵfac = function (e) {
                  return new (e || n)(b(Z), b(Cf), b(kf), b(Jo));
                }),
                (n.ɵprov = T({ token: n, factory: n.ɵfac })),
                n
              );
            })(),
          },
          {
            provide: Ro,
            useFactory: function VH(n, t, e) {
              return new OH(n, t, e);
            },
            deps: [cl, rc, ne],
          },
        ],
        Hf = [{ provide: Cf, useFactory: () => new TH() }, { provide: Mn, useValue: 'BrowserAnimations' }, ...PE],
        NE = [{ provide: Cf, useClass: lE }, { provide: Mn, useValue: 'NoopAnimations' }, ...PE];
      let BH = (() => {
          class n {
            static withConfig(e) {
              return { ngModule: n, providers: e.disableAnimations ? NE : Hf };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: Hf, imports: [zb] })),
            n
          );
        })(),
        LE = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({})),
            n
          );
        })(),
        HH = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n })),
            (n.ɵinj = oe({ providers: [Fl], imports: [LE, mf, tt, LE, mf] })),
            n
          );
        })(),
        jH = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = le({ type: n, bootstrap: [BB] })),
            (n.ɵinj = oe({ imports: [zb, BH, cN, SN, mB, HH, xB, oB] })),
            n
          );
        })();
      (function DO() {
        jv = !1;
      })(),
        qR()
          .bootstrapModule(jH)
          .catch(n => console.error(n));
    },
  },
  ie => {
    ie((ie.s = 859));
  },
]);
