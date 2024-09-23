import {request } from 'node:http'
import { describe, it} from 'node:test'
import { ClienteService } from '../src/services/clienteService';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { endianness } from 'node:os';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                Cliente: {
                    create: jest.fn(),
                    delete: jest.fn(),
                    findUnique: jest.fn(),
                    findMany: jest.fn(),
                    update: jest.fn(),
                },
            };
        }),
    };
});

jest.mock('../main/utils/BcryptUtil', () => {
    return {
        BcryptUtils: {
            hashPassword: jest.fn(),
        },
    };
});

describe('createCliente', () => {
    let clienteService: ClienteService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        clienteService = new ClienteService(prismaMock);
    });

    it("Deve criar um cliente com sucesso", async () => {
        const cliente = {
            nome: "Juao",
            telefone: "555-6969",
            endereco: "Rua dos bobos, nº 0"
        }

        prismaMock.Cliente.create = jest.fn().mockRejectedValue(cliente);
        const result = await clienteService.createCliente(cliente.nome, cliente.endereco, cliente.telefone);
        expect(prismaMock.Cliente.create).toHaveBeenCalledWith({
                nome: cliente.nome,
                endereco: cliente.endereco,
                telefone: cliente.telefone
        });
        expect(result).toEqual(cliente);
    })


});


describe('DeleteStudentService', () => {
    let clienteService: ClienteService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        clienteService = new ClienteService(prismaMock);
    });

    it('Deve deletar um cliente com sucesso.', async () => {
        const clienteDeletado = {
            id: 1,
            nome: "Juao",
            telefone: "555-6969",
            endereco: "Rua dos bobos, nº 0"
        }
        prismaMock.Cliente.delete = jest.fn().mockResolvedValue(clienteDeletado);

        const result = await clienteService.deleteCliente(1);

        expect(prismaMock.Cliente.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(clienteDeletado);
    });

    it('Deve lançar um erro se o cliente não foi encontrado', async () => {
        const error = new PrismaClientKnownRequestError('Cliente não encontrado.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.Cliente.delete = jest.fn().mockRejectedValue(error);

        await expect(clienteService.deleteCliente(999)).rejects.toThrow("Cliente não encontrado.");
    });

    it('Deve retornar um erro genérico para outros problemas', async () => {
        const error = new Error('Database error');
        prismaMock.Cliente.delete = jest.fn().mockRejectedValue(error);

        await expect(clienteService.deleteCliente(1)).rejects.toThrow('Database error');
    });
});

describe('GetStudentByIdService', () => {
    let clienteService: ClienteService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        clienteService = new ClienteService(prismaMock);
    });

    it('should return a student when found', async () => {
        const studentData = { id: 1, name: 'John Doe', Question: [] };
        prismaMock.Cliente.findUnique = jest.fn().mockResolvedValue(studentData);

        const result = await clienteService.getClienteById(1);

        expect(prismaMock.Cliente.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                Question: true,
            },
        });
        expect(result).toEqual(studentData);
    });

    it('should throw an error when the student is not found', async () => {
        prismaMock.Cliente.findUnique = jest.fn().mockResolvedValue(null);

        await expect(clienteService.getClienteById(999)).rejects.toThrow("Cliente não encontrado.");
    });

    it('should throw a generic error for unexpected issues', async () => {
        const error = new PrismaClientKnownRequestError('Database error', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.Cliente.findUnique = jest.fn().mockRejectedValue(error);

        await expect(clienteService.getClienteById(1)).rejects.toThrow('Database error');
    });
});

describe('GetStudentService', () => {
    let clienteService: ClienteService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        clienteService = new ClienteService(prismaMock);
    });

    it('should return all students successfully', async () => {
        const studentsData = [
            { id: 1, name: 'John Doe', Question: [] },
            { id: 2, name: 'Jane Smith', Question: [] },
        ];

        prismaMock.Cliente.findMany = jest.fn().mockResolvedValue(studentsData);

        const result = await clienteService.getAllClientes();

        expect(prismaMock.Cliente.findMany).toHaveBeenCalledWith({
            include: {
                Question: true,
            },
        });
        expect(result).toEqual(studentsData);
    });

    it('should throw an error if there is an issue fetching students', async () => {
        const error = new Error('Database error');
        prismaMock.Cliente.findMany = jest.fn().mockRejectedValue(error);

        await expect(clienteService.getAllClientes()).rejects.toThrow('Database error');
    });

    it('should log an error message when fetching students fails', async () => {
        const error = new Error('Database error');
        prismaMock.Cliente.findMany = jest.fn().mockRejectedValue(error);
        console.error = jest.fn();

        await expect(clienteService.getAllClientes()).rejects.toThrow('Database error');
        expect(console.error).toHaveBeenCalledWith('Erro enquanto lista clientes:', error);
    });
});


describe('AtualizaCliente', () => {
    let clienteService: ClienteService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        clienteService = new ClienteService(prismaMock);
    });

    it('should update a student successfully', async () => {
        const clienteId = 1;
        const cliente = {
            nome: 'John Doe',
            telefone: '555-0001',
            endereco: 'Ceilandia, lote 14'
        };

        const clienteAtualizado = { id: clienteId, cliente};

        prismaMock.Cliente.update = jest.fn().mockResolvedValue(clienteAtualizado);

        const result = await clienteService.updateCliente(clienteId, cliente.nome, cliente.telefone, cliente.endereco);

        expect(prismaMock.student.update).toHaveBeenCalledWith({
            where: { id: clienteId },
            data: {
                nome: cliente.nome,
                telefone: cliente.telefone,
                endereco: cliente.endereco
            },
        });
        expect(result).toEqual(clienteAtualizado);
    });

    it('should throw an error if the student is not found', async () => {
        const clienteId = 999;
        const cliente = {
            nome: 'John Doe',
            telefone: '555-0001',
            endereco: 'Ceilandia, lote 14'
        };

        const error = new PrismaClientKnownRequestError('Student not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.Cliente.update = jest.fn().mockRejectedValue(error);

        await expect(clienteService.updateCliente(clienteId, cliente.nome, cliente.telefone, cliente.endereco)).rejects.toThrow("Cliente não encontrado.");
    });

    it('should throw a generic error for other issues', async () => {
        const clienteId = 999;
        const cliente = {
            nome: 'John Doe',
            telefone: '555-0001',
            endereco: 'Ceilandia, lote 14'
        };

        const error = new Error('Database error');

        
        prismaMock.Cliente.update = jest.fn().mockRejectedValue(error);

        await expect(clienteService.updateCliente(clienteId, cliente.nome, cliente.telefone, cliente.endereco)).rejects.toThrow('Database error');
    });

    it('should log an error message when updating a student fails', async () => {
        const clienteId = 999;
        const cliente = {
            nome: 'John Doe',
            telefone: '555-0001',
            endereco: 'Ceilandia, lote 14'
        };

        const error = new Error('Database error');

        prismaMock.Cliente.update = jest.fn().mockRejectedValue(error);

        await expect(clienteService.updateCliente(clienteId, cliente.nome, cliente.telefone, cliente.endereco)).rejects.toThrow('Database error');
        expect(console.error).toHaveBeenCalledWith('Error updating student:', error);
    });
});