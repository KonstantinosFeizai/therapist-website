import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // --- ΤΙΤΛΟΙ ---
    defineField({
      name: 'title_el',
      title: 'Title (Greek)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // --- SLUG (Το κρατάμε ένα, συνήθως βασισμένο στα αγγλικά ή τα ελληνικά) ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_el',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    // --- EXCERPT (Περίληψη για SEO και social media) ---
    defineField({
      name: 'excerpt_el',
      title: 'Excerpt (Greek)',
      type: 'text',
      description: 'Μια μικρή περίληψη 150 χαρακτήρων για τη Google και τα social media.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'excerpt_en',
      title: 'Excerpt (English)',
      type: 'text',
      description: 'A short summary of 150 characters for search engines and social media.',
      validation: (Rule) => Rule.max(200),
    }),
    // --- ΚΕΙΜΕΝΟ (BODY) ---
    defineField({
      name: 'body_el',
      title: 'Body (Greek)',
      type: 'blockContent',
    }),
    defineField({
      name: 'body_en',
      title: 'Body (English)',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title_el', // Εμφανίζει τον ελληνικό τίτλο στο Sanity Studio
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
