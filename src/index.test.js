const rewire = require("rewire")
const index = rewire("./index")
const loadEvents = index.__get__("loadEvents")
const loadHome = index.__get__("loadHome")
const launchCopyIfEnterPressed = index.__get__("launchCopyIfEnterPressed")
const launchCopy = index.__get__("launchCopy")
// @ponicode
describe("loadEvents", () => {
    test("0", () => {
        let callFunction = () => {
            loadEvents()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("loadHome", () => {
    test("0", () => {
        let callFunction = () => {
            loadHome()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("launchCopyIfEnterPressed", () => {
    test("0", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed({ which: "Michael", keyCode: "IR" }, "Janet Homenick")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed({ which: "Jean-Philippe", keyCode: "FM" }, "Janet Homenick")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed({ which: "Michael", keyCode: "IR" }, "Ronald Keeling")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed({ which: "Anas", keyCode: "VN" }, "Gail Hoppe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed({ which: "Pierre Edouard", keyCode: "PG" }, "Janet Homenick")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            launchCopyIfEnterPressed(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("launchCopy", () => {
    test("0", () => {
        let callFunction = () => {
            launchCopy({ innerText: { trim: () => "foo bar" }, classList: { add: () => false, remove: () => "Ronald Keeling" }, blur: () => "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            launchCopy({ innerText: { trim: () => "Foo bar" }, classList: { add: () => true, remove: () => "Becky Bednar" }, blur: () => "Edmond" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            launchCopy({ innerText: { trim: () => "foo bar" }, classList: { add: () => true, remove: () => "Maurice Purdy" }, blur: () => "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            launchCopy({ innerText: { trim: () => "Foo bar" }, classList: { add: () => false, remove: () => "Ronald Keeling" }, blur: () => "Edmond" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            launchCopy({ innerText: { trim: () => "This is a Text" }, classList: { add: () => true, remove: () => "Janet Homenick" }, blur: () => "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            launchCopy(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
