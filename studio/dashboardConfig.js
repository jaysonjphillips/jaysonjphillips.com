export default {
    widgets: [
      { name: 'structure-menu' },
      {
        name: 'project-info',
        options: {
          __experimental_before: [
            {
              name: 'netlify',
              layout: {
                width: 'small',
                height: 'small'
              },
              options: {
                description:
                  'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
                sites: [
                  {
                    buildHookId: '5e1f8e1defaad9ff760e2cab',
                    title: 'Sanity Studio',
                    name: 'jjp-gatsby-studio',
                    apiId: 'af2034c2-4e4d-4b40-868b-9630360ed086'
                  },
                  {
                    buildHookId: '5e1f8e1d4d0c0ca3459edba2',
                    title: 'Blog Website',
                    name: 'jjp-gatsby',
                    apiId: 'c86cf03f-734c-446b-86b2-2eb020f857b8'
                  }
                ]
              }
            }
          ],
          data: [
            {
              title: 'Repo',
              value: 'https://github.com/jaysonjphillips/jaysonjphillips.com',
              category: 'Code'
            },
            { title: 'Frontend', value: 'https://jaysonjphillips.com', category: 'apps' },
            { title: 'Studio', value: 'https://studio.jaysonjphillips.com', category: 'apps' }
  
          ]
        }
      },
      { name: 'project-users', layout: { height: 'auto' } },
      {
        name: 'document-list',
        options: { title: 'Recent blog posts', order: 'publishedAt desc', types: ['post'] },
        layout: { width: 'medium' }
      },
      {
        name: 'document-list',
        options: { title: 'Recent Drafts', order: ' desc', types: ['post'] },
        layout: { height: 'small', width: 'medium' }
      }
    ]
  }
  