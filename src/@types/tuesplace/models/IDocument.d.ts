export type IDocument<T> = Document<unknown, any, T> &
  T & { _id: Types.ObjectId; _doc: object };
