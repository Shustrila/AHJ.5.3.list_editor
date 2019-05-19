import Form from '../src/js/Form';

describe('TESTS: class Form method convertFieldsPrice', () => {
    test('1. check number 9023432', () => {
        const func = Form.convertFieldsPrice('9023432');
        const expected = '9 023 432';

        expect(func).toBe(expected);
    });

    test('2. param not string', () => {
        const func = Form.convertFieldsPrice(24323423);
        const expected = '24 323 423';

        expect(func).toBe(expected);
    });

    test('3. letter string', () => {
        const func = () => Form.convertFieldsPrice('g34g435gh4353');
        const expected = 'the parameter "str" contains letters';

        expect(func).toThrow(expected);
    });
});
