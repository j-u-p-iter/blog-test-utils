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

export const createUser = (additionalData: Partial<User> = {}): User => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email().toLowerCase(),
    website: faker.internet.url(),
    location: faker.address.city(),
    password: faker.internet.password(5),
    ...additionalData
  };
};

export const createAdmin = (): User => createUser({ role: "admin" });

export const createPost = ({
  additionalData = {}
}: CreatePostOptions = {}): Post => {
  const post: Post = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentences(5),
    body: faker.lorem.sentences(20),
    ...additionalData
  };

  return post;
};

export const createPosts = (
  count: number,
  options: CreatePostOptions = {}
): Post[] => createData("post", count, options);

export const createData = (type, count, options = {}) => {
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
