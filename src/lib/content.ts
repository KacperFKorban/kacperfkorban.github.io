export type Post = {
  title: string;
  date: string;
  author: string;
  tags: string[];
  href: string;
  summary: string;
};

export const posts: Post[] = [
  {
    title: 'Data Modeling in Scala 3, but I only use types',
    date: '2022-06-06',
    author: 'Kacper F. Korban',
    tags: ['scala', 'scala 3'],
    href: '/writing/types-only-data-modeling/',
    summary: 'An experiment in representing data entirely through types.'
  },
  {
    title: 'Achieving Indisputable Job Security Using Novel Scala 3 Features: A Case Study',
    date: '2022-02-14',
    author: 'Kacper F. Korban',
    tags: ['scala', 'scala 3'],
    href: '/writing/job-security-scala-3/',
    summary: 'A satirical tour of impressively unreadable Scala 3.'
  },
  {
    title: 'TASTY way of (re)writing macros in Scala 3',
    date: '2021-04-29',
    author: 'Kacper F. Korban',
    tags: ['scala', 'scala 3'],
    href: '/writing/tasty-macros/',
    summary: 'A practical walk through Scala 3 reflection and macros.'
  },
  {
    title: 'How to write Hoogle for Kotlin in Scala (and Scala.js)',
    date: '2021-01-14',
    author: 'Kacper F. Korban and Andrzej Ratajczak',
    tags: ['scala', 'scalajs', 'hoogle', 'kotlin'],
    href: '/writing/hoogle-for-kotlin/',
    summary: 'Finding library functions by the types they accept and return.'
  }
];
