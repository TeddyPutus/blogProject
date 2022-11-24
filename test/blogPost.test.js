const app = require("../server/app.js");
const seed = require("../server/db/seed.js");
const request = require("supertest");
const db = require('../server/db/db.js');

beforeAll(async () => {
    await seed(); //seed the database before testing - REMEMBER TO COMMENT SEED OUT IN APP.JS FILE
})

describe("Testing blogPost get all posts route", () => {
    it("Returns 200 status", async () => {
        const { statusCode } = await request(app).get("/blogPosts");
        expect(statusCode).toBe(200);
    })
    it("Returns JSON data", async () => {
        const { headers } = await request(app).get("/blogPosts");
        expect(headers["content-type"]).toMatch("application/json");
    })
    it("Returns array of Blog Posts", async () => {
        const { body } = await request(app).get("/blogPosts");
        
        expect(Array.isArray(body)).toBe(true);
        expect(
          body.every(({ title, content, author }) => title && content && author)
        );
    })
})

describe("Testing blogPost get one posts route", () => {
    it("Returns 200 status", async () => {
        const { statusCode } = await request(app).get("/blogPosts/1");
        expect(statusCode).toBe(200);
    })
    it("Returns JSON data", async () => {
        const { headers } = await request(app).get("/blogPosts/1");
        expect(headers["content-type"]).toMatch("application/json");
    })
    it("Returns correct blog post", async () => {
        const { body } = await request(app).get("/blogPosts/1");
        
        expect(body.id).toBe(1);
        expect(body.author).toBe("LysI");
    })
    it("Returns 404 status when post doesn't exist", async () => {
        const { statusCode } = await request(app).get("/blogPosts/6000");
        expect(statusCode).toBe(404);
    })
})

describe("Testing blogPost update route", () => {
    it("Returns 200 status and updated post", async () => {
        const { statusCode, body } = await request(app).put("/blogPosts/1").send({
            author : "New author", title: "Updated!", content: "This is different now", 
            category: "New"});
        expect(statusCode).toBe(200);
        expect(body.author).toBe("New author");
    })
    it("Has updated the DB", async () => {
        const { body } = await request(app).get("/blogPosts/1");
        
        expect(body.id).toBe(1);
        expect(body.author).toBe("New author");
    })
    it("Returns 404 status if post not found", async () => {
        const { statusCode, body } = await request(app).put("/blogPosts/6000").send({
            author : "New author", title: "Updated!", content: "This is different now", 
            category: "New"});
        expect(statusCode).toBe(404);
    })
})

describe("Testing blogPost create route", () => {
    it("Returns 200 status and created post", async () => {
        const { statusCode, body } = await request(app).post("/blogPosts").send({
            author : "Newest author", title: "created!", content: "This is new", 
            category: "Newer"});
        expect(statusCode).toBe(200);
        expect(body.author).toBe("Newest author");
    })
    it("Has updated the DB", async () => {
        const { body } = await request(app).get("/blogPosts/3");
        
        expect(body.id).toBe(3);
        expect(body.author).toBe("Newest author");
    })
    it("Returns 404 status if post not found", async () => {
        const { statusCode, body } = await request(app).put("/blogPosts/6000").send({
            author : "New author", title: "Updated!", content: "This is different now", 
            category: "New"});
        expect(statusCode).toBe(404);
    })
})


describe("Testing blogPost delete one post route", () => {
    it("Returns 200 status and the value 1", async () => {
        const { statusCode, body } = await request(app).delete("/blogPosts/3");
        expect(statusCode).toBe(200);
        expect(body).toBe(1);
    })
    it("Post is deleted in DB", async () => {
        const { statusCode } = await request(app).get("/blogPosts/3");
        expect(statusCode).toBe(404); //we expect the get route to fail because the ID nop longer exists
    })
    it("Returns 404 status and the value 0 when post doesn't exist", async () => {
        const { statusCode, body } = await request(app).get("/blogPosts/6000");
        expect(statusCode).toBe(404);
        expect(body).toEqual({});
    })
})

describe("Routes return 500 status when the DB is down", () => {
    beforeAll(async () => {
        await db.close();
        //This closes the database connection, so we can simulate
        //The server going down
    })

    it("Get all posts", async () => {
        const { statusCode } = await request(app).get("/blogPosts");
        expect(statusCode).toBe(500);
    })
    it("Get one post", async () => {
        const { statusCode } = await request(app).get("/blogPosts/1");
        expect(statusCode).toBe(500);
    })
    it("Update post", async () => {
        const { statusCode } = await request(app).put("/blogPosts/1").send({
            author : "New author", title: "Updated!", content: "This is different now", 
            category: "New"});
        expect(statusCode).toBe(500);
    })
    it("Create one post", async () => {
        const { statusCode } = await request(app).post("/blogPosts").send({
            author : "Newest author", title: "created!", content: "This is new", 
            category: "Newer"});
        expect(statusCode).toBe(500);
    })
    it("Delete one post", async () => {
        const { statusCode } = await request(app).delete("/blogPosts/1");
        expect(statusCode).toBe(500);
    })
});