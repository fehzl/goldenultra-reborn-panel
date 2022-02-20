import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiChevronRight } from 'react-icons/bi';

const AuthenticationSchema = yup.object().shape({
  email: yup.string().email(`e-mail inválido`).required(`obrigatório`),
  password: yup.string().required(`obrigatório`),
});

type AuthenticationFormDTO = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthenticationFormDTO>({
    resolver: yupResolver(AuthenticationSchema),
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    const result: any = await signIn(`credentials`, {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: `/painel`,
    });

    if (result.url) {
      router.push(`/painel`);
    } else {
      setError(`email`, {
        type: `manual`,
        message: `usuário e/ou senha inválidos`,
      });
    }
  };

  return (
    <div className="flex bg-gray-50 flex-col items-center h-screen justify-center">
      <div>
        <div className="left">
          <h1 className="text-3xl text-gray-800 font-bold tracking-tighter">
            goldenultra<span className="text-green-500 text-4xl">.</span>
          </h1>
          <h2 className="text-md py-8 text-green-700">acesso</h2>
        </div>
        <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-700">
              e-mail
            </label>
            <input
              className="bg-gray-200 text-gray-800 my-2 px-3 py-1 text-sm rounded-lg h-8"
              {...register(`email`)}
              type="text"
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-700">
              senha
            </label>
            <input
              className="bg-gray-200 text-gray-800 my-2 px-3 py-1 text-sm rounded-lg h-8"
              {...register(`password`)}
              type="password"
            />
            {errors.password && (
              <div className="text-red-500 text-xs">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="w-full text-center">
            <button className="inline-flex items-center justify-center w-8 h-8 mr-2 text-gray-700 transition-colors duration-150 bg-green-500 rounded-full focus:shadow-outline hover:bg-green-600">
              <BiChevronRight className="text-2xl text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    context.res.writeHead(302, {
      Location: `/painel`,
    });
    context.res.end();
  }

  return {
    props: {
      session,
    },
  };
};
