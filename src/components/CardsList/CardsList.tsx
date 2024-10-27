import { v4 as uuidv4 } from 'uuid'

import { ArticleType } from '../../types/type'
import './cards-list/cards-list.sass'
import Card from '../Card/Card'

const CardsList: React.FC = () => {
  const data: ArticleType[] = [
    {
      slug: 'kak-menya-eshe-ne-otchislili-njqp69',
      title: 'Как меня еще не отчислили?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. ',
      body: 'Раз я тут, значит уже не отчислят, но как это блин сделать до конца???',
      createdAt: '2024-10-26T14:39:04.650Z',
      updatedAt: '2024-10-26T20:44:54.081Z',
      tagList: ['Ката', 'help me', 'дайте денях я тупой'],
      favorited: false,
      favoritesCount: 1,
      author: {
        username: 'useuserusename',
        image:
          'https://avatars.dzeninfra.ru/get-zen_doc/3703431/pub_5ef8f508d247603cea2e0bf7_5ef8f5a9322e1a13de505a67/scale_1200',
        following: false,
      },
    },
    {
      slug: '123-i0p6oi',
      title: '123',
      description: '123',
      body: '123',
      createdAt: '2024-10-26T13:05:09.307Z',
      updatedAt: '2024-10-26T22:34:27.135Z',
      tagList: [''],
      favorited: false,
      favoritesCount: 2,
      author: {
        username: 'antitrue',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    },
    {
      slug: 'test-1-test-1-test-1-test-1-test-1-test-1-test-1-test-1-n7jmkp',
      title: 'TEST',
      description: 'test',
      body: '# Заголовок h1\n## Заголовок h2\n\nАбзац Markdown. Пример:\n\nLorem ipsum dolor sit amet... Абзацы создаются при помощи пустой строки.\n\nДля переноса строки делаем два пробела ` ` ` ` в конце (предыдущей) строки\nПеренос строки\n\nПолучается? Отлично! :+1:\n\nТекст с жирным начертанием (**strong**) и курсив (*italic*) в Markdown:\n\n_1 символ_ `_` или `*` для наклонного текста\n__2 символа__  `__` или `**` для жирного текста\n***3 символа*** `___` или `***` для наклонного и жирного одновременно.\n\nПеречеркнутый текст. 2 тильды `~` до и после текста - текст как перечеркнутый - ~~Зачеркнуто~~\n\nГоризонтальная черта. `hr` - 3 звездочки или 3 дефиса\n\n***\n\n♦ Маркированный список. Для разметки неупорядоченных списков `*`, `-`, `+`:\n\n* текст\n* текст\n* текст\n\nВложенные пункты. 4 пробела перед маркером:\n\n* элемент маркированного списка\n* элемент маркированного списка\n    * вложенный текст\n    * вложенный текст\n\nНумерованный список. Главное, чтобы перед элементом списка стояла цифра с точкой.\n\n1. элемент нумерованного списка\n2. элемент нумерованного списка\n    1. вложенный\n    2. вложенный\n\nМожно сделать так:\n\n0. текст\n0. текст\n0. текст\n\nСписок с абзацами:\n\n* Текст\n* Текст\n* Текст\n\n    Текст (4 пробела или `Tab`).\n\n---\n\n##### ♦ Ссылки Markdown\n\nЗдесь - [ссылка с title](https://example.com/ "Привет!").\n\nЗдесь - [ссылка без title](https://example.com/).\n\nСсылки с разметкой как у сносок.\n\nЗдесь - [ссылка][1] продолжение текста [ссылка][2] продолжение текста [ссылка][id]. [Просто ссылка][] без указания id.\n\n[1]: https://example.com/ "Пример Title"\n[2]: https://example.com/page\n[id]: https://example.com/links (Пример Title)\n[Просто ссылка]: https://example.com/short\n\nСсылки-сноски можно располагать в любом месте документа.\n\n---\n\n##### Цитаты в Markdown - cимвол `>`.\n\n> Lorem ipsum dolor sit amet.\n> Lorem ipsum dolor sit amet.\n>\n> Lorem ipsum dolor sit amet.\n\nВ цитаты можно помещать всё что угодно, в том числе вложенные цитаты:\n\n> ### Заголовок.\n>\n> 1. список\n> 2. список\n>\n> > Вложенная цитата.\n>\n> Исходный код (4 пробела в начале строки):\n>\n>     $source = file_get_contents(\'example.php\');\n\n##### Исходный код в Markdown\n\nВ GFM - поставить 3 апострофа (где `Ё`) до и после кода. Можно указать язык исходного кода.\n\n```html\n<div class="my-header">\n    <h1>Матрёшка</h1>\n    <p>Lorem ipsum dolor sit amet.</p>\n</div>\n```\n\n```javascript\n    $(function() { ... });\n```\n\nДля вставки кода внутри предложений - надо обрамить в апострофы (где `Ё`).\n\nПример: `<div class="my-markdown">`.\n\nЕсли внутри кода есть апостроф, то код надо обрамить двойными апострофами: ``Бла-бла (`) тут.``\n\n##### Картинки в Markdown\n\nКартинка без alt текста\n\n![](//placehold.co/200x100)\n\nКартинка с alt и title:\n\n![Alt text](//placehold.co/200x100 "Здесь title")\n\nКартинка-ссылка:\nПодсказка: синтаксис как у ссылок, только перед открывающей квадратной скобкой ставится восклицательный знак.\n\n[![Alt text](//placehold.co/200x100)](https://example.com/)\n\nКартинки-сноски:\n\n![Картинка][image1]\n![Картинка][image2]\n![Картинка][image3]\n\n[image1]: //placehold.co/200x100\n[image2]: //placehold.co/150x100\n[image3]: //placehold.co/100x100\n\n---\n\n##### Использование HTML внутри Markdown\n\nMожно смешивать Markdown и HTML. Если на какие-то элементы нужно поставить классы или атрибуты, используем HTML:\n\n> Выделим слова без помощи * и _ . Например, это <em class="my-italic">курсив</em> и это тоже <i>курсив</i>. А вот так уже <b>strong</b>, и так тоже <strong>strong</strong>.\n\nМожно и наоборот, внутри HTML-тегов использовать Markdown.\n\n<div class="my-markdown">\n\n###### Markdown внутри HTML. Пример:\n\nВыделять слова можно при помощи `*` и `_` . Например, это _курсив_ и это тоже *italic*. А вот так уже __strong__, и так тоже **strong**.\n\n</div>\n\n---\n\n##### Таблицы\n\nВ чистом Маркдауне нет синтаксиса для таблиц, а в GFM есть. Рисуем:\n\nFirst Header  | Second Header\n------------- | -------------\nContent Cell  | Content Cell\nContent Cell  | Content Cell\n\nМожно по бокам линии нарисовать:\n\n| First Header  | Second Header |\n| ------------- | ------------- |\n| Content Cell  | Content Cell  |\n| Content Cell  | Content Cell  |\n\nМожно управлять выравниванием столбцов при помощи двоеточия:\n\n| Left-Aligned  | Center Aligned  | Right Aligned |\n|:------------- |:---------------:| -------------:|\n| col 3 is      | какой-то текст  |   **my text** |\n| col 2 is      | центр           |           $123|\n| Content Cell  | бука            |         ~~$7~~|\n\nВнутри таблиц можно использовать ссылки, наклонный, жирный или зачеркнутый текст.\n\n---\n\n♦ Для всего остального есть обычный HTML.\n\n---\n\n###### Links:\n\n * <small>[markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing</small>\n * <small>[CodeMirror](https://codemirror.net/) for the awesome syntax-highlighted editor</small>\n * <small>[Live (Github-flavored)](https://github.com/jbt/markdown-editor) Markdown Editor</small>\n * <small>[highlight.js](https://softwaremaniacs.org/soft/highlight/en/) for syntax highlighting in output code blocks</small>\n * <small>[js-deflate](https://github.com/dankogai/js-deflate) for gzipping of data to make it fit in URLs</small>\n',
      createdAt: '2024-10-26T10:41:01.716Z',
      updatedAt: '2024-10-27T01:30:18.623Z',
      tagList: [],
      favorited: false,
      favoritesCount: 1,
      author: {
        username: 'lapshichkaa',
        image: 'https://i.pinimg.com/474x/41/e6/26/41e626e7d06b860d557e57016030e497.jpg',
        following: false,
      },
    },
  ]
  return (
    <div className="cards-list">
      {data.map((card) => (
        <Card data={card} key={uuidv4()} />
      ))}
    </div>
  )
}

export default CardsList
