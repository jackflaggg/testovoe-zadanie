import { body, ValidationChain } from "express-validator";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

class Validator {
    static password(): ValidationChain {
        return body('password')
            .isString()
            .withMessage('это не строка')
            .trim()
            .notEmpty()
            .withMessage('пустота')
            .isLength({ min: 6, max: 20 })
            .withMessage('длина больше 20 символов или меньше 6 символов');
    }

    static login(): ValidationChain {
        return body('login')
            .isString()
            .withMessage('это не строка')
            .trim()
            .notEmpty()
            .withMessage('пустота')
            .isLength({ min: 3, max: 10 })
            .withMessage('длина больше 10 символов или меньше 3 символов');
    }

    static email(): ValidationChain {
        return body('email')
            .isString()
            .withMessage('это не строка')
            .trim()
            .notEmpty()
            .withMessage('пустота')
            .matches(emailRegex)
            .withMessage('email не прошел валидацию: example@example.com');
    }

    static loginOrEmail(): ValidationChain {
        return body('loginOrEmail')
            .optional({ nullable: true })
            .custom((value, { req }) => {
                if (!value) {
                    throw new Error('[loginOrEmail] должны быть указаны!')
                }

                if (emailRegex.test(value)) {
                    // Ввод email, применяем проверки для email
                    return body('loginOrEmail')
                        .isString()
                        .withMessage('это не строка')
                        .trim()
                        .notEmpty()
                        .withMessage('пустота')
                        .matches(emailRegex)
                        .withMessage('email не прошел валидацию: example@example.com')
                        .run(req);
                } else {
                    // Ввод логина, применяем проверки для логина
                    return body('loginOrEmail')
                        .isString()
                        .withMessage('это не строка')
                        .trim()
                        .notEmpty()
                        .withMessage('пустота')
                        .isLength({ min: 3, max: 10 })
                        .withMessage('длина больше 10 символов или меньше 3 символов')
                        .matches(/^[a-zA-Z0-9_-]*$/)
                        .withMessage('логин не прошел валидацию')
                        .run(req);
                }
            })
    }
}
