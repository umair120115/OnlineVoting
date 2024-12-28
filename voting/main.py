from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain_groq import ChatGroq
from getpass import getpass
import os
from IPython.display import display



loader=WebBaseLoader(["https://en.wikipedia.org/wiki/Democracy",
                      "https://en.wikipedia.org/wiki/Voting"])
documents=loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
all_splits = text_splitter.split_documents(documents)

vectorstore = FAISS.from_documents(
    all_splits, HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
)
# Set up the language model
GROQ_API_TOKEN = getpass()

os.environ["GROQ_API_KEY"] = GROQ_API_TOKEN
llm = ChatGroq(temperature=0, model_name="llama3-8b-8192")

# Create the Conversational Retrieval Chain
chain = ConversationalRetrievalChain.from_llm(
    llm, vectorstore.as_retriever(), return_source_documents=True
)
def md(t):
    display(t)

# no chat history passed

def chat(question,chathistory=[]):
    result = chain({"question": question, "chat_history": chathistory})
    return result
# result = chain({"question": "What’s new with Llama 3?", "chat_history": []})
# md(result['answer'])
# query = "What two sizes?"
# chat_history = [(query, result["answer"])]
# result = chain({"question": query, "chat_history": chat_history})


# md(result['answer'])
