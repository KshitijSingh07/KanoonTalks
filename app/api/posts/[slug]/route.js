import { connectToDatabase } from "../../../lib/mongodb";
import Post from "../../../model/post";

// GET: Get a post by slug
export async function GET(req, context) {
  await connectToDatabase();
  const { slug } = context.params;

  const post = await Post.findOne({ slug });
  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}

// PATCH: Update a post's status by slug
export async function PATCH(req, contextPromise) {
  try {
    const context = await contextPromise; // await the context first
    const { slug } = context.params;
    const updateData = await req.json();

    console.log("PATCH called with slug:", slug);

    if (
      updateData.status &&
      !["approved", "rejected", "pending"].includes(updateData.status)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid status value" }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    const post = await Post.findOneAndUpdate(
      { slug },
      updateData,
      { new: true }
    );

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Post updated successfully", data: post }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


// DELETE: Delete a post by slug
export async function DELETE(req, context) {
  try {
    await connectToDatabase();
    const { slug } = context.params;

    console.log("DELETE called with slug:", slug);

    const deleted = await Post.findOneAndDelete({ slug });
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Post deleted" }), { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
