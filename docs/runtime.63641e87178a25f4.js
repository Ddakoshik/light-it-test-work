(() => {
  'use strict';
  var e,
    v = {},
    i = {};
  function t(e) {
    var a = i[e];
    if (void 0 !== a) return a.exports;
    var r = (i[e] = { exports: {} });
    return v[e](r, r.exports, t), r.exports;
  }
  (t.m = v),
    (e = []),
    (t.O = (a, r, u, f) => {
      if (!r) {
        var s = 1 / 0;
        for (n = 0; n < e.length; n++) {
          for (var [r, u, f] = e[n], _ = !0, l = 0; l < r.length; l++)
            (!1 & f || s >= f) && Object.keys(t.O).every(d => t.O[d](r[l]))
              ? r.splice(l--, 1)
              : ((_ = !1), f < s && (s = f));
          if (_) {
            e.splice(n--, 1);
            var o = u();
            void 0 !== o && (a = o);
          }
        }
        return a;
      }
      f = f || 0;
      for (var n = e.length; n > 0 && e[n - 1][2] > f; n--) e[n] = e[n - 1];
      e[n] = [r, u, f];
    }),
    (t.n = e => {
      var a = e && e.__esModule ? () => e.default : () => e;
      return t.d(a, { a }), a;
    }),
    (t.d = (e, a) => {
      for (var r in a) t.o(a, r) && !t.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: a[r] });
    }),
    (t.o = (e, a) => Object.prototype.hasOwnProperty.call(e, a)),
    (() => {
      var e = { 666: 0 };
      t.O.j = u => 0 === e[u];
      var a = (u, f) => {
          var l,
            o,
            [n, s, _] = f,
            c = 0;
          if (n.some(b => 0 !== e[b])) {
            for (l in s) t.o(s, l) && (t.m[l] = s[l]);
            if (_) var h = _(t);
          }
          for (u && u(f); c < n.length; c++) t.o(e, (o = n[c])) && e[o] && e[o][0](), (e[o] = 0);
          return t.O(h);
        },
        r = (self.webpackChunklight_it_test_work = self.webpackChunklight_it_test_work || []);
      r.forEach(a.bind(null, 0)), (r.push = a.bind(null, r.push.bind(r)));
    })();
})();
