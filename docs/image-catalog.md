# Image catalog

## The system of storing images

Standardize file naming, folder structure and metadata.

File name: alphabetical order

Folder structure:

- Root folder: {category name}
- Sub folder: {creator name}, {collection name}

Example:

- Top folder: art books
- Sub folder: art books/studio ghibli, the art of spirited away
- Sub folder content: art books/studio ghibli, the art of spirited away/page-001.png, page-002.png, page-003.png, etc

If an image is a camera original file (DNG), there are additional important metadata we can extract from it. Separate originals and derivatives by folders.

## Metadata

Metadata is information about your images ranges from mundane info like date, camera & location to the sublime such as specific subject matter, usage rights and more.

- Tags: refers to specific property of an image file. Tags are keywords providing the ability to filter a large collection of images.
- Fields: provides information about the tag. For example, if a tag belongs to IPTC City field, it means the location of the photo. If it's in IPTC Author City field, it refers to the address of the photographer.
- Namespace: describes the field and tags which are acceptable to put there
- Schema: examples, EXIF schema is a set of rules that camera makers follow to tag images with information. IPTC schema was orignally desinged for newspaper. PIEware uses another schema to describe adjustments made to the images like Adobe Camera Raw schema.

In scope of this application, we will try to support a set of schemas. Depend on files and user's input, we will have:

- automatic metadata: such as EXIF from camera
- bulk metadata: from folder structure
- custom metadata: via user input form

## Catalog strategy

