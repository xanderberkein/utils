'use strict';

/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import * as assert                  from 'node:assert/strict';
import CONSTANTS                    from '../../constants';
import deepSet                      from '../../../lib/deep/set';

describe('Deep - set', () => {
    let subject;
    beforeEach(() => {
        subject = {
            a: 1,
            b: 2,
            c: 3,
            d: [
                0,
                1,
                2,
                3,
                {
                    e: 'Hello',
                    f: ['a', 'b', 'c'],
                },
            ],
        };
    });

    it('Correctly sets a value on an existing key', () => {
        deepSet(subject, 'c', 4);
        deepSet(subject, 'd.0', 100);
        deepSet(subject, 'd.4.e', 'world');
        deepSet(subject, 'd.4.f.0', 'Y');

        assert.equal(subject.c, 4);
        assert.equal(subject.d[0], 100);
        assert.equal(subject.d[4].e, 'world');
        assert.equal(subject.d[4].f[0], 'Y');
    });

    it('Correctly set a value on an inexisting key', () => {
        deepSet(subject, 'f', 42);
        deepSet(subject, 'e.a.b.c.d.e.f.g.h', 'valkyrie rules');
        deepSet(subject, 'e.b', [0, 1, 2]);
        deepSet(subject, 'q.0', 'valkyrie is cool');
        deepSet(subject, 'q.1', 'valkyrie is fun');

        assert.equal(subject.f, 42);
        assert.equal(subject.e.a.b.c.d.e.f.g.h, 'valkyrie rules');
        assert.deepEqual(subject.e.b, [0, 1, 2]);
        assert.deepEqual(subject.q, {0: 'valkyrie is cool', 1: 'valkyrie is fun'});
    });

    it('Correctly defines a value on an existing key', () => {
        deepSet(subject, 'a', {get: () => 5}, true);

        assert.equal(subject.a, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'a').get, 'function');
    });

    it('Correctly defines a value on an inexisting key', () => {
        deepSet(subject, 'g', {get: () => 5}, true);

        assert.equal(subject.g, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'g').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'g').get, 'function');
    });

    it('Should allow building up a complex object and prevent override glitches', () => {
        const obj = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d', 'hello');
        deepSet(obj, 'a.d.2', 'foo');
        assert.deepEqual(obj, {
            a: {
                b: {
                    c: 10,
                },
                d: 'hello',
            },
        });
    });

    it('Should allow building up a complex object', () => {
        const obj = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d.2', 'foo');
        deepSet(obj, 'a.d.3', 'hello');
        assert.deepEqual(obj, {
            a: {
                b: {
                    c: 10,
                },
                d: {
                    2: 'foo',
                    3: 'hello',
                },
            },
        });
    });

    it('Should allow building up a complex object inside of an array', () => {
        const obj = {a: []};
        deepSet(obj, 'a.0.name', 'Peter');
        deepSet(obj, 'a.0.role', 'Admin');
        deepSet(obj, 'a.1.name', 'Jake');
        deepSet(obj, 'a.1.role', 'Owner');
        assert.deepEqual(obj, {
            a: [
                {name: 'Peter', role: 'Admin'},
                {name: 'Jake', role: 'Owner'},
            ],
        });
    });

    it('Correctly sets a value on a deeply nested multi-array structure setup', () => {
        const matrix = [
            [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
                ['g', 'h', 'i'],
            ], [
                [0, 1],
                [2, 3],
                [4, 5],
                [6, 7],
            ],
        ];
        const object_matrix = {
            a: [
                [
                    {c: [
                        {d: 'hello'},
                    ]},
                ],
            ],
        };
        deepSet(matrix, '0.0.3', 'foo');
        deepSet(matrix, '0.1.1', 'bar');
        deepSet(matrix, '0.2.2', 'cool');
        deepSet(matrix, '1.1.5', 999);
        deepSet(object_matrix, 'a[0][0].c[0].e', 'world');
        assert.deepEqual(matrix, [
            [
                ['a', 'b', 'c', 'foo'],
                ['d', 'bar', 'f'],
                ['g', 'h', 'cool'],
            ], [
                [0, 1],
                [2, 3, , , , 999], // eslint-disable-line no-sparse-arrays
                [4, 5],
                [6, 7],
            ],
        ]);
        assert.deepEqual(object_matrix, {
            a: [
                [{c: [
                    {d: 'hello', e: 'world'},
                ]}],
            ],
        });
    });

    it('Should throw when not passed an object or array', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                () => deepSet(el, '2', 5),
                new TypeError('Deepset is only supported for objects')
            );
        }
    });

    it('Should throw when not passed a string/array key', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                /* @ts-ignore */
                () => deepSet({a: '2'}, el, 5),
                new TypeError('No path was given')
            );
        }
    });

    it('Should throw when passed an empty string path', () => {
        const obj = {a: 'bi'};
        assert.throws(
            () => deepSet(obj, '', 1),
            new TypeError('No path was given')
        );
        assert.deepEqual(obj, {a: 'bi'});
    });

    describe('malicious: __proto__', () => {
        it('Should throw when passed as single value', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, '__proto__', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at start', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, '__proto__.hacked', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed as part of', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.__proto__.yup', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at end', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.__proto__', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });
    });

    describe('malicious: prototype', () => {
        it('Should throw when passed as single value', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'prototype', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at start', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'prototype.hacked', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed as part of', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.prototype.yup', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at end', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.prototype', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });
    });

    describe('malicious: constructor', () => {
        it('Should throw when passed as single value', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'constructor', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at start', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'constructor.hacked', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed as part of', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.constructor.yup', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });

        it('Should throw when passed at end', () => {
            const obj = {a: 'bi'};
            assert.throws(
                () => deepSet(obj, 'hacked.constructor', 1),
                new TypeError('Malicious path provided')
            );
            assert.deepEqual(obj, {a: 'bi'});
        });
    });
});
