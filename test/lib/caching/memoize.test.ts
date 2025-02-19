'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import {getTime}        from '../../constants';
import memoize          from '../../../lib/caching/memoize';
import fnv1A            from '../../../lib/hash/fnv1A';

describe('Caching - memoize', () => {
    it('Should cache and allow for large amount of calculations to be passed (benchmark 1000000 < .1s)', () => {
        function fn (a) {
            return fnv1A(`${a}`);
        }

        const memoized_fn = memoize(fn);
        const cases = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        let runtime = getTime();
        for (let i = 0; i < 1000000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
        }
        runtime = getTime() - runtime;

        assert.ok(runtime < 100);
    });

    it('Should allow passing a resolver for caching', () => {
        function fn (a) {
            return fnv1A(`${a}`);
        }

        const cases = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        const memoized_fn = memoize(fn, el => cases.indexOf(el));

        for (let i = 0; i < 1000000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
        }

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(0));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(0), fnv1A(cases[0]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(1));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(1), fnv1A(cases[1]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(2));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(2), fnv1A(cases[2]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(3));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(3), fnv1A(cases[3]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(4));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(4), fnv1A(cases[4]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(5));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(5), fnv1A(cases[5]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(6));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(6), fnv1A(cases[6]));
    });
});
