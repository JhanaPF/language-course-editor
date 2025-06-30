const http = require("http")
const app = require("./testingServer")
const request = require("supertest")
const port = "3123"
const apiUrl = 'http://localhost:' + port
const mongoose = require("mongoose")

const chai = require('chai')
const fail = require("assert").fail
const expect = chai.expect
const should = chai.should()
chai.use(require('chai-json-schema'))
const { randomString } = require("../utils/stringUtils")
const courseSchema = require("../schemas/schemas").course
console.log(courseSchema.schema)
return

describe("question routes", function () {
	let server
	let questions
	let questionAdded


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

	it("Get questions", (done) => {
		request(apiUrl)
			.get("/questions")
			.expect(200)
			.end(function (err, res) {
				if (err) {
					throw err
				}
				const courseSchema = {
					_id: String,
					language: String,
					pivot_language: String,
					raw_name: String,
					dictionary: Boolean,
					file_name: String,
					released: Boolean,
					createdAt: String,
					__v: Number,
				}

				questions = res.body.questions
				res.body.questions.should.be.a('array')
				res.body.questions.forEach(c => {
					expect(c).to.be.jsonSchema(courseSchema)
				})
				done()
			})
	})

	it("Add a question", (done) => {
		request(apiUrl)
			.put("/questions")
			.field('language', 'test language')
			.field('pivot_language', 'test pivot language')
			.field('raw_name', 'test raw name ' + randomString(8))
			.attach('file', '')
			.expect(200)
			.end(function (err, res) {
				if (err) throw err
				else {
					questionAdded = res.body.question
					done()
				}
			})
	})
	
	it("Update a question", (done) => {
		if(!questionAdded) return fail()

		const obj = {
			_id: questionAdded._id,
			question: {
				language: "language modified",
				pivot_language: "pivot language modified"
			},
		}

		request(apiUrl)
			.post("/questions")
			.send(obj)
			.expect(201)
			.end(function (err, res) {
				if (err) throw err
				else done()
			})
	})

	it("Delete a question", (done) => {
		if(!questionAdded) return fail()

		request(apiUrl)
			.del("/questions")
			.send({_id: questionAdded._id})
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
