# OBI.TEC: Design Spec (v1)

Documento de especificação visual da marca própria **OBI.TEC** (empresa da Nelly, distinta da Traevo: não usar paleta navy/âmbar da Traevo aqui). Este documento define tokens e valores exatos para implementação posterior em `tailwind.config.ts` e `src/app/globals.css`. Nenhum arquivo de código foi alterado nesta etapa.

---

## 1. Princípios de design

1. **Minimalismo funcional**: a interface é preto/branco/cinza por padrão; cor só aparece para comunicar estado ou hierarquia (ativo, foco, link, ação primária). Nada de decoração gratuita.
2. **Azul como acento, não como tema**: o azul é o único acréscimo de cor da marca, usado com moderação (bordas ativas, ícones em hover, foco de inputs, badges de destaque). Se o azul desaparecesse, a interface ainda deveria funcionar visualmente.
3. **Confiança e clareza acima de tudo**: contraste alto entre texto e fundo, espaçamento generoso, tipografia neutra (Inter). A OBI.TEC é uma base de conhecimento de processos: a UI precisa parecer séria e organizada, não "produto de startup colorido".
4. **Redondo, mas comedido**: cantos arredondados em todos os elementos interativos (cards, botões, inputs, nav), mas sem exagerar a ponto de parecer lúdico. Raio consistente por camada (controles pequenos vs. cards vs. pílulas).

---

## 2. Paleta de cores

### 2.1 Tokens base (shadcn / `globals.css`)

Estes tokens já existem e devem ser **mantidos como estão**: já atendem "preto e branco":

| Token | Valor HSL atual | Hex equivalente | Uso | Ação |
|---|---|---|---|---|
| `--background` | `0 0% 100%` | `#FFFFFF` | fundo da página | manter |
| `--foreground` | `222.2 84% 4.9%` | `#020817` | texto principal | manter |
| `--card` | `0 0% 100%` | `#FFFFFF` | fundo de card | manter |
| `--card-foreground` | `222.2 84% 4.9%` | `#020817` | texto em card | manter |
| `--border` | `214.3 31.8% 91.4%` | `#E2E8F0` | borda de card/input (slate-200) | manter |
| `--muted` | `210 40% 96.1%` | `#F1F5F9` | fundo neutro leve (slate-100) | manter |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#64748B`~ | texto secundário | manter |

Justificativa: `background`/`foreground`/`card`/`border`/`muted` já são neutros (`baseColor: "slate"` do shadcn): é exatamente a base "preto e branco" que o usuário pediu. Não há necessidade de mudar nenhum desses.

### 2.2 Escala `obi`: de indigo/violeta para azul neutro/frio

**Decisão: manter o nome `obi`, trocar apenas os valores hex.**

Motivo: a escala `obi-50` … `obi-950` já é referenciada por nome em ~10 arquivos (`Sidebar.tsx`, `ContentCard.tsx`, `badge.tsx`, `button.tsx`, `select.tsx`, `input.tsx`, `textarea.tsx`, `globals.css`, `app/[section]/[slug]/page.tsx`). Renomear a escala exigiria editar classes Tailwind em todos esses arquivos. Trocar só os valores hex em `tailwind.config.ts` é um find-and-replace de um bloco só, sem tocar em componente nenhum: a troca de marca fica isolada em um lugar.

O problema do valor atual não é o nome, é o **hue**: `#6366F1` (obi-500 atual) tem hue ≈ 239°: isso é indigo/violeta (puxa pra roxo). Para "azul neutro/frio" o hue precisa ficar na faixa 210°–222° (azul puro, sem componente violeta). A escala abaixo é baseada nesse hue mais frio:

| Stop | Hex atual (indigo/violeta) | Hex novo (azul neutro) | Uso típico no código |
|---|---|---|---|
| `obi-50` | `#EEF2FF` | `#EFF6FF` | fundo hover leve (`hover:bg-obi-50`), fundo de bloco "Objetivo" |
| `obi-100` | `#E0E7FF` | `#DBEAFE` | fundo de badge default |
| `obi-200` | `#C7D2FE` | `#BFDBFE` | N/A |
| `obi-300` | `#A5B4FC` | `#93C5FD` | borda de card em hover (`hover:border-obi-300`) |
| `obi-400` | `#818CF8` | `#60A5FA` | ícones em estado ativo/hover |
| `obi-500` | `#6366F1` | `#3B82F6` | cor de marca base: logo, `--primary`, `--ring`, borda ativa da sidebar |
| `obi-600` | `#4F46E5` | `#2563EB` | botão primário (`bg-obi-600` no `button.tsx`) |
| `obi-700` | `#4338CA` | `#1D4ED8` | texto de badge, título em hover (`group-hover:text-obi-700`) |
| `obi-800` | `#3730A3` | `#1E40AF` | N/A |
| `obi-900` | `#312E81` | `#1E3A8A` | texto de item de select em foco (`focus:text-obi-900`) |
| `obi-950` | `#1E1B4B` | `#172554` | N/A |

Verificação de hue: `#3B82F6` (obi-500 novo) = HSL `217.2° 91.2% 59.8%`: azul puro. `#6366F1` (obi-500 antigo) = HSL `238.7° 83.5% 66.7%`: a 21° de diferença é exatamente o que separa "azul" de "azul-violeta" na roda de cores. Toda a escala nova mantém hue entre 213° e 226°, sem exceção: nenhum stop cai na faixa violeta (>230°).

### 2.3 Tokens de sidebar

| Token | Valor atual | Valor novo | Observação |
|---|---|---|---|
| `--sidebar-bg` | `#0A0A0F` | `#0A0A0F` (**mantém**) | já é quase-preto neutro, atende "preto e branco" |
| `--sidebar-text` | `#94A3B8` | `#94A3B8` (**mantém**) | slate-400, neutro |
| `--sidebar-text-active` | `#F1F5F9` | `#F1F5F9` (**mantém**) | slate-100, neutro |
| `--sidebar-hover` | `rgba(255,255,255,0.055)` | `rgba(255,255,255,0.055)` (**mantém**) | hover neutro (branco translúcido): correto deixar sem azul aqui; o azul deve aparecer só no item *ativo*, não no hover, para não competir com o toque de cor do estado selecionado |
| `--sidebar-active-bg` | `rgba(99,102,241,0.18)` | `rgba(59,130,246,0.18)` | mesmo alpha (0.18), RGB do novo `obi-500` |
| `--sidebar-active-border` | `#6366F1` | `#3B82F6` | = novo `obi-500` |
| `--sidebar-section` | `rgba(255,255,255,0.2)` | (**mantém**) | neutro |
| `--sidebar-separator` | `rgba(255,255,255,0.07)` | (**mantém**) | neutro |

O par ativo continua sendo o único lugar onde o azul aparece na sidebar: reforça o princípio 2 (acento, não tema).

### 2.4 `--primary` / `--ring` (shadcn)

| Token | Valor atual | Valor novo |
|---|---|---|
| `--primary` | `239 84% 67%` (= obi-500 antigo) | `217.2 91.2% 59.8%` (= obi-500 novo, `#3B82F6`) |
| `--ring` | `239 84% 67%` | `217.2 91.2% 59.8%` |

---

## 3. Tipografia

Fonte: **Inter**, já conectada via `next/font/google` em `layout.tsx` com a variável `--font-inter` e mapeada em `tailwind.config.ts` (`fontFamily.sans`). Nenhuma mudança necessária aqui: só confirmação.

Escala de tamanhos, nomeada a partir dos valores já em uso no código (`text-[10px]` até `text-base`/16px):

| Nome | px | rem | Onde já aparece hoje | Uso recomendado |
|---|---|---|---|---|
| `micro` | 10px | `0.625rem` | texto de badge (`badge.tsx`), label de seção da sidebar, rodapé da sidebar, label "Objetivo" em `ContentCard` | overlines em caixa alta, metadados de menor prioridade |
| `label` | 11px | `0.6875rem` | monograma "OB" no logo da sidebar | textos muito compactos, marcas/monogramas |
| `caption` | 12px | `0.75rem` | descrição de card, tags, texto do link "Novo documento", meta de card (data/dono) | texto secundário, descrições, metadados |
| `body` | 13px | `0.8125rem` | item de navegação da sidebar (`text-[13px]`), linha de card em modo lista | texto de interface padrão (nav, listas densas, linha de card) |
| `title` | 14px | `0.875rem` (`text-sm`) | título de card (`CardTitle`), texto de select/input | títulos de card, texto de UI enfatizado |
| `heading` | 16px | `1rem` (`text-base`) | reservado para títulos de página/seção | H1/H2 de página, cabeçalhos de destaque |

Recomendação de implementação: formalizar em `tailwind.config.ts` via `theme.extend.fontSize`:

```ts
fontSize: {
  micro: ['0.625rem', { lineHeight: '1rem' }],
  label: ['0.6875rem', { lineHeight: '1rem' }],
  caption: ['0.75rem', { lineHeight: '1.125rem' }],
  body: ['0.8125rem', { lineHeight: '1.25rem' }],
  title: ['0.875rem', { lineHeight: '1.25rem' }],
  heading: ['1rem', { lineHeight: '1.5rem' }],
}
```

Isso não obriga a reescrever `text-[10px]` etc. imediatamente: pode ser adotado gradualmente, mas evita que apareça um sétimo tamanho arbitrário no futuro.

---

## 4. Bordas e raio

`--radius` atual: `0.625rem` (10px). **Recomendação: manter.** 10px de raio de base já é claramente "bordas redondas" (o padrão shadcn é 8px/`0.5rem`); subir mais (ex.: 16px) começaria a conflitar com o princípio de "confiança e clareza": passaria de arredondado-sério para arredondado-lúdico.

O que falta é **formalizar a escala**, porque hoje o raio de card (`rounded-xl` = 12px, fixo do Tailwind) não deriva de `--radius` (que só alimenta `lg`/`md`/`sm`). Proposta de escala completa:

| Nome | rem | px | Deriva de | Uso |
|---|---|---|---|---|
| `sm` | `calc(0.625rem - 4px)` | 6px | `--radius` | chips pequenos, ícones em caixa |
| `md` | `calc(0.625rem - 2px)` | 8px | `--radius` | inputs, botões secundários |
| `lg` | `0.625rem` | 10px | `--radius` | controles padrão: item de nav, `SelectTrigger`, botão primário |
| `xl` | `0.75rem` | 12px | fixo Tailwind (`rounded-xl`) | cards, `SelectContent`, dropdowns/menus |
| `full` | `9999px` | N/A | fixo Tailwind (`rounded-full`) | badges, pílulas, avatar/monograma |

Esse é exatamente o padrão já em uso em `ContentCard.tsx`, `Sidebar.tsx`, `select.tsx` e `badge.tsx`: a tabela só documenta a intenção para não virar inconsistência acidental (ex.: alguém usar `rounded-md` num card por engano).

---

## 5. Sidebar

- **Fundo**: `--sidebar-bg: #0A0A0F` (quase-preto): mantém.
- **Hover** (item não ativo): `background: var(--sidebar-hover)` = `rgba(255,255,255,0.055)`: branco translúcido a 5,5%, **sem azul**. Já implementado em `Sidebar.tsx` via `hover:bg-white/[0.055]`. Confirmado, manter: é o "hover com background nos itens do sidebar" pedido pelo usuário.
- **Ativo**: `background: var(--sidebar-active-bg)` = `rgba(59,130,246,0.18)` (novo azul, 18% de opacidade) + barra esquerda de 2px (`w-0.5`) com `background: var(--sidebar-active-border)` = `#3B82F6`. Ícone e texto do item ativo usam `obi-400` novo (`#60A5FA`) e texto claro (`#F1F5F9`).
- Todas as outras cores da sidebar (texto padrão `#94A3B8`, separadores, seção) continuam neutras: o azul só entra no estado ativo, reforçando "leves toques de azul".
- Desde a implementação, as seções da sidebar (Projeto, CRM, Documentação) funcionam como gavetas colapsáveis: o cabeçalho de cada seção é clicável e alterna a visibilidade dos itens, com um `ChevronDown` que rotaciona para indicar o estado. Todas as seções iniciam abertas.

---

## 6. Cards

O padrão de `ContentCard.tsx` já atende "cards em vez de tabelas": modo grid usa `Card`/`CardHeader`/`CardContent` (shadcn) e modo lista usa uma linha em formato de card (`rounded-xl border ... shadow-sm`), nunca uma `<table>`. **Nenhuma mudança estrutural necessária aqui.**

Especificação atual (para referência/consistência futura):

| Propriedade | Valor | Fonte |
|---|---|---|
| Raio | `rounded-xl` (12px) | `card.tsx`, linha de lista em `ContentCard.tsx` |
| Borda | `border border-slate-200` (`#E2E8F0`) | `card.tsx` |
| Sombra padrão | `shadow-sm` | `card.tsx` |
| Sombra em hover | `hover:shadow-md` | `ContentCard.tsx` |
| Borda em hover | `hover:border-obi-300` → novo `#93C5FD` | `ContentCard.tsx` |
| Padding interno | `p-5` (20px) header/content | `card.tsx` |
| Espaçamento entre elementos internos | `space-y-1.5` (6px) no header | `card.tsx` |
| Transição | `transition-all duration-150` | `ContentCard.tsx` |
| Ícone/box de destaque | `h-9 w-9 rounded-lg bg-slate-100`, vira `bg-obi-50` (novo `#EFF6FF`) em hover | `ContentCard.tsx` |

Única troca de valor necessária aqui é a cascata da paleta (`obi-300`, `obi-50`, `obi-400`, `obi-700` → valores novos da seção 2.2); a estrutura/espaçamento/sombra do card já está correta e não precisa mudar.

---

## 7. Seletor de modo de visualização (grid/lista)

**Flag explícito**: o usuário pediu um **select (dropdown)**, não um par de botões. O `ViewToggle.tsx` atual é dois `<button>` lado a lado (`Grid` / `Lista`) dentro de uma pílula: isso é um toggle de botões, não um select, e **não atende ao pedido**.

### Recomendação

Substituir o conteúdo de `ViewToggle.tsx` por um `<Select>` do shadcn (`src/components/ui/select.tsx`, já instalado e já usa a paleta `obi` para foco/hover: ver linhas 19, 111, 118 do arquivo). A interface pública do componente (`value: ViewMode`, `onChange: (mode: ViewMode) => void`) pode ser mantida: só a implementação interna muda de par-de-botões para `Select`.

Comportamento esperado:

1. `SelectTrigger` mostra o rótulo do modo atual: **"Grade"** (grid) ou **"Lista"** (list): usar "Grade" em vez de "Grid" para manter o texto em português, consistente com o resto da UI (`ContentCard` já usa "Rascunho", "Ativo", etc. em português).
2. Ao abrir, `SelectContent` lista as duas opções via `SelectItem`: `"grid"` → "Grade", `"list"` → "Lista". Cada item pode exibir o ícone correspondente (`LayoutGrid`, `List` do `lucide-react`, já importados no arquivo atual) ao lado do texto, reaproveitando os ícones existentes.
3. Selecionar uma opção chama `onChange(mode)` e fecha o dropdown: mesma assinatura de callback que já existe hoje, então o componente pai (que passa `value`/`onChange`) não precisa mudar.
4. Estilo herda o `SelectTrigger` padrão (`rounded-lg`, `border-slate-200`, `focus:ring-obi-500` → novo azul): sem CSS adicional, é o componente shadcn já existente.
5. Largura do trigger: fixa e pequena (ex. `w-[130px]`), já que só existem duas opções curtas: evita que o dropdown pareça um filtro genérico de formulário.

Justificativa de UX: um select comunica "modo de exibição, escolha uma opção" de forma mais neutra/discreta que dois botões grandes competindo visualmente: alinhado ao princípio de minimalismo (seção 1).

---

## 8. Tabela de migração (de-para direto)

Todas as trocas abaixo são substituições de **valor**, não de nome de variável/classe: nenhum arquivo `.tsx` precisa trocar o nome de uma classe Tailwind (`obi-500` continua `obi-500` em todo lugar); só `tailwind.config.ts` e `globals.css` mudam.

### `tailwind.config.ts`: escala `obi`

| Stop | Antigo | Novo |
|---|---|---|
| `obi.50` | `#EEF2FF` | `#EFF6FF` |
| `obi.100` | `#E0E7FF` | `#DBEAFE` |
| `obi.200` | `#C7D2FE` | `#BFDBFE` |
| `obi.300` | `#A5B4FC` | `#93C5FD` |
| `obi.400` | `#818CF8` | `#60A5FA` |
| `obi.500` | `#6366F1` | `#3B82F6` |
| `obi.600` | `#4F46E5` | `#2563EB` |
| `obi.700` | `#4338CA` | `#1D4ED8` |
| `obi.800` | `#3730A3` | `#1E40AF` |
| `obi.900` | `#312E81` | `#1E3A8A` |
| `obi.950` | `#1E1B4B` | `#172554` |

### `globals.css`: variáveis `:root`

| Variável | Antigo | Novo |
|---|---|---|
| `--primary` | `239 84% 67%` | `217.2 91.2% 59.8%` |
| `--ring` | `239 84% 67%` | `217.2 91.2% 59.8%` |
| `--sidebar-active-bg` | `rgba(99,102,241,0.18)` | `rgba(59,130,246,0.18)` |
| `--sidebar-active-border` | `#6366F1` | `#3B82F6` |
| `--background`, `--foreground`, `--card`, `--card-foreground`, `--border`, `--muted`, `--muted-foreground`, `--secondary`, `--accent`, `--sidebar-bg`, `--sidebar-text`, `--sidebar-text-active`, `--sidebar-hover`, `--sidebar-section`, `--sidebar-separator` | N/A | **sem mudança** (já neutros) |

### Componentes: apenas revisão estrutural (não paleta)

| Arquivo | Mudança |
|---|---|
| `src/components/content/ViewToggle.tsx` | Reescrever de par de `<button>` para `<Select>` do shadcn (seção 7): única mudança estrutural deste documento; todo o resto da lista é apenas troca de valor de cor. |

Depois de aplicar a tabela acima em `tailwind.config.ts` e `globals.css`, todo o resto do app (badges, cards, sidebar, inputs, botões) herda o novo azul automaticamente, porque tudo referencia `obi-*`/`--primary`/`--ring` por nome, não por valor hardcoded.

---

*Documento gerado em 2026-08-06 a partir do estado real de `tailwind.config.ts`, `globals.css`, `components.json`, `Sidebar.tsx`, `ContentCard.tsx` e `ViewToggle.tsx`. Nenhum arquivo de código foi modificado nesta versão do documento; a nota sobre a sidebar em gaveta (seção 5) foi acrescentada após a implementação real do componente.*
