export function validateEmail(text) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(text);
}

//rules
const availableRules = {
    required(value) {
        return value ? '' : 'Pole wymagane';
    },
    min(value, rule) {
        return value.length >= rule.length ? '' : `Minimum znaków: ${rule.length}`;
    }
};

//validation
export function validate(rules = [], value) {

    for(let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (rule instanceof Object) {
            const errorMessage = availableRules[rule.rule](value, rule);
            if (errorMessage) {
                return errorMessage;
            }
        } else {
            const errorMessage = availableRules[rule](value);
            if (errorMessage) {
                return errorMessage;
            }
        }
    };

    return '';
}