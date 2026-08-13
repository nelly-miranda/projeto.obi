export interface TrainingModule {
  id: string
  number: string
  title: string
  body: string
  selfCheck: string[]
}

export interface TrainingFaqItem {
  question: string
  answer: string
}

export interface TrainingTrack {
  title: string
  intro: string
  prerequisites: string[]
  modules: TrainingModule[]
  faq: TrainingFaqItem[]
}
