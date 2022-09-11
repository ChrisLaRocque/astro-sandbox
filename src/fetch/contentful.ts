import contentful from "contentful";
import remark from "../transform/remark";

// Initialize client w/env variables
const client = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_TOKEN,
});

// export function allEntries() {
//   client
//     .getEntries()
//     .then((entries) => console.log(entries))
//     .catch((err) => console.log(err));
// }

// export function postByID(id: string) {
//   return client.getEntry(id).then((response) => response);
// }
export function entriesByType(type: string) {
  return client
    .getEntries({
      content_type: type,
      "fields.slug[exists]": true,
      "fields.mainImage[exists]": true,
      // "sys.updatedAt[gte]": "2022-07-01T00:00:00Z",
    })
    .then((response) =>
      response.items.map((item) => {
        if (item.fields.body) {
          item.fields.body = remark(item.fields.body);
        }
        return item;
      })
    );
}
export function contentTypes() {}
