import { ArrowLeft, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Game } from '../types';
import { GameArt, GameCard, isPlayable } from '../components/GameCard';
import { Ad } from '../components/Layout';

export default function Details() {
  const { slug } = useParams();
  const [game, setGame] = useState<Game>();
  const [related, setRelated] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setGame(undefined); setRelated([]); setError('');
    api.game(slug).then(g => {
      setGame(g); document.title = `${g.title} | PlayVerse`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
      meta.setAttribute('content', g.description);
      return api.games(`?category=${g.category_slug}`);
    }).then(games => games && setRelated(games.filter(item => item.slug !== slug).slice(0, 3))).catch(e => setError(e.message));
  }, [slug]);

  if (error) return <main className="page text-center"><p className="eyebrow">Unavailable</p><h1 className="page-title">Game not found</h1><p className="mt-3 text-slate-400">{error}</p><Link to="/games" className="button-primary mt-6">Browse games</Link></main>;
  if (!game) return <main className="page text-slate-400">Loading game...</main>;
  const playable = isPlayable(game);
  return <main className="page"><Link to="/games" className="mb-6 inline-flex items-center gap-2 text-sm text-cyan"><ArrowLeft size={16}/> All games</Link><div className="grid gap-8 lg:grid-cols-2"><div className="overflow-hidden rounded-3xl border border-white/10"><GameArt game={game} large/></div><div className="flex flex-col justify-center"><p className="eyebrow">{game.category}</p><h1 className="page-title">{game.title}</h1><p className="mt-4 text-lg leading-8 text-slate-300">{game.description}</p>{playable ? <Link className="button-primary mt-8 w-fit" to={`/play/${game.slug}`}><Play size={18} fill="currentColor"/> Play now</Link> : <div className="mt-8 w-fit rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-bold text-cyan">Game preview — playable version coming soon</div>}<div className="mt-8 rounded-2xl bg-panel p-5"><h2 className="font-bold">{playable ? 'How to play' : 'Availability'}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{playable ? 'Open the game and use the on-screen controls or keyboard instructions. Each PlayVerse original is designed for quick, accessible sessions.' : 'This catalog item is not advertised as playable. Add a verified, legally embeddable game source before publishing it as a playable game.'}</p></div></div></div><Ad placement="Game details"/><section><h2 className="text-2xl font-black">More in {game.category}</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map(item => <GameCard game={item} key={item.id}/>)}</div></section></main>;
}
