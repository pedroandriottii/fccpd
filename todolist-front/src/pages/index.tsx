import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import Chekmark from "@/assets/checkmark.svg";
import Notes from "@/assets/notes.svg";
import Organization from "@/assets/organization.svg";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">TODOLIST</h1>
                </div>
            </header>
            <div className="w-full flex items-center justify-center mt-24">
                <div className="w-3/5 flex items-center justify-center flex-col gap-6">
                    <h1 className="2xl:text-7xl text-5xl font-bold text-center">Bem-vindo ao To do List!</h1>
                    <p className="2xl:text-2xl xl:text-4xl font-medium text-center">Seu site favorito de gerenciamento de produtividade!</p>
                    <div className="flex gap-3 items-center justify-center">
                        <Button onClick={() => navigate('/login')} size="lg">Entrar</Button>
                        <Button onClick={() => navigate('/register')} size="lg">Registrar</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center mt-16">
                <div className="w-4/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3">
                    <div className="w-full md:w-[30%] h-96 rounded-lg border border-black shadow-xl p-6 flex flex-col gap-4 text-base md:text-lg lg:text-xl xl:text-2xl">
                        <img src={Chekmark} alt="todo" className="w-16 h-16" />
                        <h1 className="text-lg md:text-xl lg:text-2xl">Acompanhe suas tarefas!</h1>
                        <p className="text-sm md:text-base lg:text-lg">O To do List ajuda você a acompanhar todas as suas tarefas diárias, informando o que já foi feito e o que ainda precisa ser completado de forma fácil e minimalista.</p>
                    </div>
                    <div className="w-full md:w-[30%] h-96 rounded-lg border border-black shadow-xl p-6 flex flex-col gap-4 text-base md:text-lg lg:text-xl xl:text-2xl">
                        <img src={Notes} alt="todo" className="w-16 h-16" />
                        <h1 className="text-lg md:text-xl lg:text-2xl">Organize sua rotina!</h1>
                        <p className="text-sm md:text-base lg:text-lg">Descubra de forma sistemática como aumentar sua produtividade com as funcionalidades integradas no site! Um dia mais produtivo está a poucos cliques de distância!</p>
                    </div>
                    <div className="w-full md:w-[30%] h-96 rounded-lg border border-black shadow-xl p-6 flex flex-col gap-4 text-base md:text-lg lg:text-xl xl:text-2xl">
                        <img src={Organization} alt="todo" className="w-16 h-16" />
                        <h1 className="text-lg md:text-xl lg:text-2xl">Categorize suas tarefas!</h1>
                        <p className="text-sm md:text-base lg:text-lg">Crie novos tipos de tarefas para seu dia a dia e gerencie-as em sua rotina de forma mais fácil do que nunca com o software inovador do To do List!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
