export default {
    widgets: [
      { name: 'structure-menu' },
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
  