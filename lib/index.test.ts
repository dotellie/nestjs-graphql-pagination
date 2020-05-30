import {
  ConnectionFilterArgsType,
  ConnectionOrderingInputType,
  ConnectionEdgeObjectType,
  ConnectionObjectType,
} from "./index";

describe("ConnectionFilterArgsType", () => {
  test("returns a filter constructor", () => {
    @ConnectionFilterArgsType()
    class Filter {}

    expect(new Filter()).toBeInstanceOf(Filter);
  });
});

describe("ConnectionOrderingInputType", () => {
  test("returns an order constructor", () => {
    @ConnectionOrderingInputType()
    class Order {}

    expect(new Order()).toBeInstanceOf(Order);
  });
});

describe("ConnectionEdgeObjectType", () => {
  test("returns a constructor", () => {
    @ConnectionEdgeObjectType(String)
    class Edge {}

    expect(new Edge()).toBeInstanceOf(Edge);
  });
});

describe("ConnectionObjectType", () => {
  test("returns a connection constructor", () => {
    @ConnectionObjectType(String)
    class Connection {}

    expect(new Connection()).toBeInstanceOf(Connection);
  });
});
