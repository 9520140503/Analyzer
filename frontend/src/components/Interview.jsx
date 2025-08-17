import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/github-dark.css';
import rehypeRaw from "rehype-raw";

function Interview({
    interviewInfo={}}
) {
  return (
    <div className='h-full'>
        {interviewInfo.response ? 
        <article className="prose prose-invert max-w-none">
            <Markdown 
                rehypePlugins={[rehypeHighlight]}>
                {interviewInfo.response}
            </Markdown>
        </article>
        :
        <div className='flex items-center justify-center w-full h-full'>
            <p className="text-gray-400">Your interview insights will appear here...</p>
        </div>
        }
    </div>
  )
}

export default Interview