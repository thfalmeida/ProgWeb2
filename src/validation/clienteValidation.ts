import Joi from 'joi';

export class ClienteValidation{
    private static schema = Joi.object({
        nome: Joi.string().required().messages({
            'string.base': 'O nome do cliente precisa ser uma string',
            'string.empty': 'O nome do cliente não pode ser vazio',
            'any.required': 'O nome do cliente é necessário',
        }),
        endereco: Joi.string().required().messages({
            'string.base': 'O endereco do cliente precisa ser uma string',
            'string.empty': 'O endereco do cliente não pode ser vazio',
            'any.required': 'O endereco do cliente é necessário',
        }),
        telefone: Joi.string().required().messages({
            'string.base': 'O telefone do cliente precisa ser uma string',
            'string.empty': 'O telefone do cliente não pode ser vazio',
            'any.required': 'O telefone do cliente é necessário',
        })
    })

    public static validate(data: any){
        const{error} = this.schema.validate(data, {abortEarly: false});
        if(error){
            return error.details.map(detail => detail.message)
        }

        return null;
    }
}
