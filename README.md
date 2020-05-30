# Nestjs GraphQL Pagination [![GitHub license](https://img.shields.io/github/license/dotellie/nestjs-graphql-pagination?style=flat)](https://github.com/dotellie/nestjs-graphql-pagination/blob/master/LICENSE) [![Tests](https://github.com/dotellie/nestjs-graphql-pagination/workflows/CI/badge.svg)](https://github.com/dotellie/nestjs-graphql-pagination/actions) [![codecov](https://codecov.io/gh/dotellie/nestjs-graphql-pagination/branch/master/graph/badge.svg)](https://codecov.io/gh/dotellie/nestjs-graphql-pagination) [![npm](https://img.shields.io/npm/v/nestjs-graphql-pagination)](https://www.npmjs.com/package/nestjs-graphql-pagination)

A simple utility to add relay compatible pagination types to any Nestjs GraphQL project. This
project only generates the GraphQL types however, so you still need some other way to generate the
data from your data source.

## Usage Example

This library can help you generate 4 different objects. It also provides you with a `PageInfo`
object and a `Direction` enum when you import the library. Some of the classes in this example with
decorators from this library have custom fields added to show that it's possible. You don't need to
add them however if your requirements don't need it and in that case, you just create an empty class
with the decorator on it.

These examples are untested but should work as a reference for getting this library up and running
in your application.

```typescript
@ObjectType
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  gender!: string;

  @Field(() => Int)
  authority!: number;
}

enum UserSort {
  Gender = "GENDER",
  Authority = "AUTHORITY",
}
registerEnumType(UserSort, { name: "UserSort" });

@ConnectionFilterArgsType()
export class UserFilter {
  @Field(() => String, { nullable: true })
  type!: string;
}

// Generates the following:
// UserFilter {
//   first: number;
//   after: string;
//   last: number;
//   before: string;
//   type: string;
// }

@ConnectionOrderingInputType()
export class UserOrderBy {
  @Field(() => UserOrderBy, { defaultValue: UserSort.Gender })
  sort!: UserSort;
}

// Generates the following:
// UserOrderBy {
//   direction: Direction;
//   sort: UserSort;
// }

@ConnectionEdgeObjectType(User)
export class UserEdge {}

// Generates the following:
// UserEdge {
//   cursor: string;
//   node: User;
// }

@ConnectionObjectType(UserEdge)
export class UserConnection {
  @Field(() => Int)
  totalUsers!: number;
}

// Generates the following:
// UserConnection {
//   pageInfo: PageInfo;
//   edges: UserEdge[];
//   totalUsers: number;
// }
```

```typescript
@Resolver(() => User)
export class UserResolver {
  @Query(() => UserConnection)
  listUsers(
    @Args() filter: UserFilter,
    @Args({ name: "orderBy", nullable: true }) orderBy?: UserOrderBy,
  ): UserConnection {
    // ... return a UserConnection object
  }
}
```
