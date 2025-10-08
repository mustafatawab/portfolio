import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

async function getBlogs() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFULL_SPACE_ID}/entries?access_token=${process.env.CONTENTFULL_API_KEY}&content_type=portfolio`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    return error;
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const blogs = await getBlogs();
  const fileteredBlogs = blogs.items.find(
    (item: any) => item.fields.slug == params.slug
  );

  return (
      <div className="text-center flex flex-col justify-center items-center gap-10 ">
       

        <div>
          {blogs.includes.Asset.map((img: any, i: number) => {
            return (
              <div key={img.sys.id}>
                {fileteredBlogs.fields.image.sys.id == img.sys.id ? (
                  <Image
                    src={"https:" + img.fields.file.url}
                    className=""
                    alt=""
                    width={800}
                    height={500}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
         <h1 className="text-center text-4xl font-bold text-blue-600">
          {fileteredBlogs.fields.title}
        </h1>
        {/* <p className='lg:px-40'>{fileteredBlogs.fields.shortDescription}</p> */}
        <div className="text-xl text-justify leading-relaxed  lg:w-2/3 mx-auto rich">
          {documentToReactComponents(fileteredBlogs.fields.body)}
          {/* <RichTextRenderer document={fileteredBlogs.fields.description}/> */}
        </div>
      </div>
  );
};

export default Page;