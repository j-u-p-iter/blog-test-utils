import faker from "faker";

interface User {
  name: string;
  email: string;
  website: string;
  location: string;
  password: string;
  role?: string;
}

interface Post {
  title: string;
  description: string;
  body: string;
  author?: any;
}

interface CreatePostOptions {
  withAuthor?: boolean;
  additionalData?: { [key: string]: any };
}

export const createBlogTestUtils = mongoose => {
  const createUser = (additionalData: Partial<User> = {}): User => {
    return {
      name: faker.name.firstName(),
      email: faker.internet.email().toLowerCase(),
      website: faker.internet.url(),
      location: faker.address.city(),
      password: faker.internet.password(5),
      ...additionalData
    };
  };

  const createAdmin = (): User => createUser({ role: "admin" });

  const createPost = ({
    withAuthor = false,
    additionalData = {}
  }: CreatePostOptions = {}): Post => {
    const post: Post = {
      title: faker.lorem.words(5),
      description: faker.lorem.sentences(5),
      body: faker.lorem.sentences(20),
      ...additionalData
    };

    if (withAuthor) {
      post.author = mongoose.Types.ObjectId();
    }

    return post;
  };

  const createPosts = (
    count: number,
    options: CreatePostOptions = {}
  ): Post[] => createData("post", count, options);

  const createData = (type, count, options = {}) => {
    const mapTypeToFactoryFn = {
      post: createPost,
      user: createUser
    };

    const resultData = [];
    let counter = count;

    while (counter) {
      resultData.push(mapTypeToFactoryFn[type](options));
      counter -= 1;
    }

    return resultData;
  };

  return {
    createUser,
    createAdmin,
    createPost,
    createPosts,
    createData
  };
};
