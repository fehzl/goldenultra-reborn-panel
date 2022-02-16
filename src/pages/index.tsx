import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();

  const [error, setError] = useState<string>(``);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result: any = await signIn(`credentials`, {
      email: `Felipe`,
      password: `password`,
      redirect: false,
      callbackUrl: `/painel`,
    });

    if (result.status === 200) {
      router.push(`/painel`);
    }

    setError(`usuário ou senha inválidos`);
  };

  return (
    <div className="flex flex-col">
      <div>goldenultra.</div>
      <h1>acesso</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && <div className="text-red-500">{error}</div>}
        <input name="username" id="username" type="text" />
        <input name="password" id="password" type="password" />
        <button>acessar</button>
      </form>
    </div>
  );
}
