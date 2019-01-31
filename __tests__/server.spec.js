const request = require('supertest');
const server = require('../server')
describe('Test the root path', () => {
    test('GET request and respond with Status 200', (done) => {
        request(server)
        .get('/friends')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('GET request and respond with JSON', (done) => {
        request(server)
        .get('/friends')
        .then((response) => {
            expect(response.type).toMatch(/json/i)
            done();
        });
    });
    test('Add entry and Status 201', (done) => {

        const body =     {
            "id": 7,
            "name": "Dan",
            "age": 27,
            "email": "dan@lambdaschool.com"
        };
        request(server)
        
        .post('/friends')
        .send(body)
        .then((response) => {
            expect(response.statusCode).toBe(201);
            expect(response.type).toMatch(/json/i)
            done();
        });
    });
    test('Submit empty body and return status 500', (done) => {
        request(server)
        .post('/friends',{})
        .then((response) => {
            expect(response.statusCode).toBe(500);
            done();
        });
    });
    test('Delete entry and return Status 200', (done) => {
        request(server)
        .delete('/friends/1')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toMatch(/json/i)
            expect(response.body[0].id).not.toEqual(1)
            done();
        });
    });
    test('Return status 404 because the entry does not exist', (done) => {
        request(server)
        .delete('/friends/1000')
        .then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});