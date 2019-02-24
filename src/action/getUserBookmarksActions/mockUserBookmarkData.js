const mockUserBookmarkData = {
  errorResponse: {
    message: 'Not Found'
  },
  returnedArticle: {
    bookmarks: [
      {
        userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
        articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
        createdAt: '2019-03-03T03:28:49.424Z',
        updatedAt: '2019-03-03T03:28:49.424Z',
        Article: {
          slug: 'my-first-jump-7wV8Wlvm',
          title: 'My First Jump',
          content:
            "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
        }
      },

      {
        userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
        articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
        createdAt: '2019-03-03T03:28:49.424Z',
        updatedAt: '2019-03-03T03:28:49.424Z',
        Article: {
          slug: 'my-second-jump-7wV8Wlvm',
          title: 'My second Jump',
          content:
            "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
        }
      }
    ],
    isLoading: false,
    response: {}
  },
  slug: '/thisArticle',
  payloadResponse: {
    data: {
      payload: {
        bookmarks: [
          {
            userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
            articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
            createdAt: '2019-03-03T03:28:49.424Z',
            updatedAt: '2019-03-03T03:28:49.424Z',
            Article: {
              slug: 'my-first-jump-7wV8Wlvm',
              title: 'My First Jump',
              content:
                "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
            }
          },

          {
            userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
            articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
            createdAt: '2019-03-03T03:28:49.424Z',
            updatedAt: '2019-03-03T03:28:49.424Z',
            Article: {
              slug: 'my-second-jump-7wV8Wlvm',
              title: 'My second Jump',
              content:
                "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
            }
          }
        ],
        isLoading: false,
        response: {}
      }
    }
  }
};

export default mockUserBookmarkData;
