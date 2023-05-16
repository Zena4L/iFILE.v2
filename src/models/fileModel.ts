import { Schema,model, Query , Document } from "mongoose";
import slugify from "slugify";

export interface IFile extends Document{
    title:string;
    description:string;
    fileType:string;
    fileUrl:string;
    path:string;
    emailCount:number;
    downloadCount:number;
    slug:string;
}

const fileSchema = new Schema<IFile>({
    title: {
      type: String,
      required: [true, 'A file requires a name'],
    },
    description: {
      type: String,
      required: [true, 'A file requires a description'],
    },
    fileType: {
      type: String,
      enum: ['PDF', 'AUDIO', 'IMAGE', 'VIDEO'],
      required: [true, 'file requires a fileTypes'],
    },  
    fileUrl: {
      type: String,
      required: [true, 'file requires a fileUrl'],
    },
    path: {
      type: String,
      required: [true, 'A file requires a path'],
    },
    emailCount: {
      type: Number,
      default: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    slug: String,
  })

  fileSchema.pre<IFile>('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });
  fileSchema.pre<Query<IFile,IFile>>(/^find/, function (next) {
    this.select('-__v');
    next();
  });
  export const File = model<IFile>('File',fileSchema);
  