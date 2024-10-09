import Joi from 'joi';

export class ServicoValidation{
    private static schema = Joi.object({
        nome: Joi.string().required().messages({
            'string.base': 'O nome do cliente precisa ser uma string',
            'string.empty': 'O nome do cliente não pode ser vazio',
            'any.required': 'O nome do cliente é necessário',
        }),
        valor: Joi.number().required().messages({
            'number.base': 'O valor do servico precisa ser um numero valido',
            'number.min(0)': 'O valor do servico não pode menor que 0',
            'any.required': 'O valor do servico é necessário',
        }),
        descricao: Joi.string().required().messages({
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
