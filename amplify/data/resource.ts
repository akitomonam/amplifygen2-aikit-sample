import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { getWeather } from '../functions/getWeather/resource';
import { getHaiku } from '../functions/getHaiku/resource';

const schema = a.schema({
  Member: a
    .model({
      name: a.string(),
      hobby: a.string().array(),
      age: a.integer(),
      birthday: a.date(),
    })
    .authorization((allow) => allow.owner()),

  getWeather: a
    .query()
    .arguments({ city: a.string() })
    .returns(
      a.customType({
        value: a.integer(),
        unit: a.string(),
        temperature: a.integer(),
        humidity: a.integer(),
        pressure: a.integer(),
        windSpeed: a.integer(),
        description: a.string(),
      })
    )
    .handler(a.handler.function(getWeather))
    .authorization((allow) => allow.authenticated()),

  getHaiku: a
    .query()
    .arguments({})
    .returns(a.string())
    .handler(a.handler.function(getHaiku))
    .authorization((allow) => allow.authenticated()),

  chat: a
    .conversation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: 'あなたは有能なアシスタントです。',
      tools: [
        a.ai.dataTool({
          name: 'MemberQuery',
          description: 'メンバーの情報を検索して取得します。',
          model: a.ref('Member'),
          modelOperation: 'list',
        }),
        a.ai.dataTool({
          name: 'getWeather',
          description: '天気を取得します。',
          query: a.ref('getWeather'),
        }),
      ],
    })
    .authorization((allow) => allow.owner()),

  generateAwsLtTitle: a
    .generation({
      aiModel: a.ai.model('Claude 3.5 Sonnet'),
      systemPrompt:
        'あなたはAWSの勉強会のタイトルを考える専門家です。日本語でAWSの勉強会のタイトルを考えてください。',
      inferenceConfiguration: {
        temperature: 0.9,
        topP: 0.9,
      },
    })
    .arguments({
      topicContent: a.string(),
    })
    .returns(
      a.customType({
        title: a.string(),
        subtitle: a.string(),
        keywords: a.string().array(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
