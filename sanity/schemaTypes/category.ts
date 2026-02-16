import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
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
    defineField({
      name: 'description_el',
      title: 'Description (Greek)',
      type: 'text',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title_el',
    },
  },
})
