import Joi from 'joi';

//id, servicoId, faturaId, clienteId, funcionarioId, petId
export class ServicoRealizadoValidation{
    private static schema = Joi.object({
        servicoId: Joi.number().required().messages({
            'number.integer': 'O nome do cliente precisa ser um numero integer',
            'number.min(0)': 'O nome do cliente não pode ser menor do que 0',
            'any.required': 'O nome do cliente é necessário',
        }),
        faturaId: Joi.number().required().messages({
            'number.integer': 'O nome do cliente precisa ser um numero integer',
            'number.min(0)': 'O nome do cliente não pode ser menor do que 0',
            'any.required': 'O nome do cliente é necessário',
        }),
        clienteId: Joi.number().required().messages({
            'number.integer': 'O nome do cliente precisa ser um numero integer',
            'number.min(0)': 'O nome do cliente não pode ser menor do que 0',
            'any.required': 'O nome do cliente é necessário',
        }),
        funcionarioId: Joi.number().required().messages({
            'number.integer': 'O nome do cliente precisa ser um numero integer',
            'number.min(0)': 'O nome do cliente não pode ser menor do que 0',
            'any.required': 'O nome do cliente é necessário',
        }),
        petId: Joi.number().required().messages({
            'number.integer': 'O nome do cliente precisa ser um numero integer',
            'number.min(0)': 'O nome do cliente não pode ser menor do que 0',
            'any.required': 'O nome do cliente é necessário',
        }),
    })

    public static validate(data: any){
        const{error} = this.schema.validate(data, {abortEarly: false});
        if(error){
            return error.details.map(detail => detail.message)
        }

        return null;
    }
}
