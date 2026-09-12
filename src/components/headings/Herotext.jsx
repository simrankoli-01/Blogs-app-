import { Link } from "react-router-dom";
import heroImage from "../../assets/blog.webp";

const Herotext = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-black text-[#f4efef]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-2 md:grid-cols-2 md:px-10 lg:px-16">
        
        <div className="order-2 md:order-1">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
            Welcome to Blog's
          </p>

          <h1 className="max-w-2xl font-serif text-6xl leading-[0.85] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
            Every story
            <br />
            <span className="italic">matters.</span>
          </h1>

          <p className="mt-8 max-w-md text-sm leading-6 text-black/60 md:text-base">
            A quiet place for ideas, experiences and stories.
            Write something meaningful and share it with the world.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/signup"
              className="rounded-full bg-white px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-black transition hover:bg-white/80"
            >
              Start writing
            </Link>

            <Link
              to="/all-posts"
              className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4"
            >
              Explore stories
            </Link>
          </div>
        </div>

        <div className="order-1 flex h-[50vh] items-center justify-center md:order-2 md:h-[75vh]">
          <div className="h-full w-full rounded-2xl max-w-xl overflow-hidden bg-[#ddd7cc]">
            <img
              src={heroImage}
              alt="Person writing"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Herotext;