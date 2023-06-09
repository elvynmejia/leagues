from os import environ
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from langchain.llms import OpenAI
from langchain import PromptTemplate
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

llm = OpenAI(
    temperature=0,
    openai_api_key=environ.get('OPEN_AI_API_KEY')
)

class Question(BaseModel):
    question: str
    context: dict

@app.get("/")
def health():
    return "OK"

@app.post("/questions", status_code=201)
def create_answer(question: Question):
    template = """Answer the question based on the context below. 
If the question cannot be answered using the information provided answer with "I don't know".
Answer using the given question to contextualize the answer

Context: {context}

Question: {question}

Answer: """

    prompt_template = PromptTemplate(
        input_variables=["question", "context"],
        template=template
    )

    answer = llm(
        prompt_template.format(
            question=question.question,
            context=question.context
        )
    )

    return JSONResponse(content={ 'question': question.question, 'answer': answer })