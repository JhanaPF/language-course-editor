const http = require("http")
const app = require("./testingServer")
const request = require("supertest")
const port = "3123"
const apiUrl = 'http://localhost:' + port
const mongoose = require("mongoose")

const chai = require('chai')
const fail = require("assert").fail
const expect = chai.expect
chai.use(require('chai-json-schema'))
const { randomString } = require("../utils/stringUtils")


describe("lesson routes", function () {
	let server
	let lessons
	let lessonAdded


	before(async function () {

		await mongoose.connect(process.env.DATABASE + "/dictionaries-test", { useNewUrlParser: true, useUnifiedTopology: true, })
			.then(() => console.log("Connected to Mongo !"))
			.catch(() => {
				console.log("Failed to connect to Mongo database")
				process.exit(1)
			})

		app.set("port", port)

		server = http.createServer(app)
		server.on("error", (err) => serverUtil.errorHandler(err, port))
		server.on("listening", () => {
			const address = server.address()
			const bind = typeof address === "string" ? "pipe " + address : "port " + port
			console.log("Listening on " + bind)
		})

		await server.listen(port)
	})

	it("Get lessons", (done) => {
		request(apiUrl)
			.get("/lessons")
			.expect(200)
			.end(function (err, res) {
				if (err) {
					throw err
				}
					
				const lessonSchema = {
					_id: String,

					//language: String,
					//pivot_language: String,
					//raw_name: String,
					//dictionary: Boolean,
					//file_name: String,
					//released: Boolean,

					createdAt: String,
					__v: Number,
				}

				lessons = res.body.lessons
				res.body.lessons.should.be.a('array')
				res.body.lessons.forEach(c => {
					expect(c).to.be.jsonSchema(lessonSchema)
				})
				done()
			})
	})

	it("Add a lesson", (done) => {
		request(apiUrl)
			.put("/lessons")
			.field('language', 'test language')
			.field('pivot_language', 'test pivot language')
			.field('raw_name', 'test raw name ' + randomString(8))
			.attach('file', '')
			.expect(200)
			.end(function (err, res) {
				if (err) throw err
				else {
					lessonAdded = res.body.lesson
					done()
				}
			})
	})
	
	it("Update a lesson", (done) => {
		if(!lessonAdded) return fail()

		const obj = {
			_id: lessonAdded._id,
			lesson: {
				language: "language modified",
				pivot_language: "pivot language modified"
			},
		}

		request(apiUrl)
			.post("/lessons")
			.send(obj)
			.expect(201)
			.end(function (err, res) {
				if (err) throw err
				else done()
			})
	})

	it("Delete a lesson", (done) => {
		if(!lessonAdded) return fail()

		request(apiUrl)
			.del("/lessons")
			.send({_id: lessonAdded._id})
			.expect(204)
			.end(function (err, res) {
				if (err) throw err
				else done()
			})
	})

	after(function () {
		mongoose.connection.close()
		server.close(() => console.log('Express app stopped'))
		process.exit()
	})

})
