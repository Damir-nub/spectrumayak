// Полная версия генератора протоколов с интеграцией сценариев
// Версия 2.0 - с ситуационными протоколами

const FullProtocolGenerator = {
  // Главная функция - генерация полного протокола
  generateFullProtocol(assessmentData) {
    const {
      childInfo,
      mchatrResults,
      fastResults,
      qabfResults,
      masResults,
      scqResults,
      sensoryProfile,
      developmentalMilestones,
      briefResults,
      connersResults,
    } = assessmentData;

    // Определяем возрастную группу
    const ageMonths = parseInt(assessmentData.childInfo.ageMonths) || 0;
    const ageGroup = this._getAgeGroup(ageMonths);

    // Анализируем результаты и определяем проблемы
    const problems = this._identifyProblems(assessmentData);

    const protocol = {
      childInfo: this._formatChildInfo(childInfo),
      dailySchedule: this._generateDailySchedule(assessmentData),
      behaviourPlan: this._generateBehaviourPlan(
        fastResults,
        qabfResults,
        masResults,
      ),
      sensoryDiet: this._generateSensoryDiet(
        sensoryProfile,
        masResults,
        childInfo,
      ),
      developmentalPlan: this._generateDevelopmentalPlan(
        mchatrResults,
        scqResults,
        developmentalMilestones,
      ),
      executiveFunctionPlan: this._generateExecutiveFunctionPlan(briefResults),
      adhdManagement: this._generateADHDManagement(connersResults),
      // НОВОЕ: Ситуационные протоколы
      situationProtocols: this._generateSituationProtocols(problems, ageGroup),
      emergencyProtocols: this._generateEmergencyProtocols(assessmentData),
      progressTracking: this._generateProgressTracking(assessmentData),
      // НОВОЕ: Выявленные проблемы
      problems: problems,
    };

    return protocol;
  },

  // Информация о ребёнке
  _formatChildInfo(childInfo) {
    const ageMonths = parseInt(childInfo.ageMonths) || 0;
    const years = Math.floor(ageMonths / 12);
    const months = ageMonths % 12;

    return {
      name: childInfo.name || "Не указано",
      age: {
        text: childInfo.ageText || "Не указан",
        months: ageMonths,
        years: years,
        monthsOnly: months,
      },
      gender: childInfo.gender || "Не указан",
      diagnosis: childInfo.diagnosis || "Нет",
      assessmentDate: childInfo.date || new Date().toLocaleDateString("ru-RU"),
      notes: childInfo.notes || "",
    };
  },

  // Генерация индивидуального режима дня
  _generateDailySchedule(data) {
    const ageMonths = data.childInfo.ageMonths || 0;
    const fastFunction = data.fastResults?.dominantFunction || "unknown";
    const sensoryIssues = data.sensoryProfile?.issues || [];
    const sleepIssues = data.connersResults?.sleep || false;
    const attentionIssues = data.briefResults?.attention || false;

    // Базовый режим по возрасту
    const baseSchedule = this._getBaseScheduleByAge(ageMonths);

    // Адаптация под проблемные области
    const adaptedSchedule = this._adaptSchedule(baseSchedule, {
      fastFunction,
      sensoryIssues,
      sleepIssues,
      attentionIssues,
    });

    return adaptedSchedule;
  },

  // Базовый режим по возрасту
  _getBaseScheduleByAge(ageMonths) {
    if (ageMonths < 12) {
      // 0-12 месяцев
      return {
        sleep: {
          night: "19:00 - 6:00 (11 часов)",
          naps: ["9:00-10:00", "13:00-14:00", "16:30-17:00"],
        },
        feeding: {
          frequency: "Каждые 3 часа (6-7 раз в день)",
          times: ["7:00", "10:00", "13:00", "16:00", "19:00", "22:00"],
        },
        activities: {
          morning: [
            "7:00 - Подъём, кормление",
            "8:00 - 9:00 - Бодрствование: гимнастика, массаж",
            "9:00 - 10:00 - Сон",
            "10:00 - Кормление",
            "10:30 - 12:00 - Бодрствование: развивающие игры",
          ],
          afternoon: [
            "12:00 - Кормление",
            "13:00 - 14:00 - Сон",
            "14:00 - Кормление",
            "14:30 - 16:00 - Бодрствование: сенсорное развитие",
            "16:30 - 17:00 - Сон",
          ],
          evening: [
            "17:00 - Кормление",
            "17:30 - 18:30 - Бодрствование: тихие игры",
            "19:00 - Купание, подготовка ко сну",
            "19:30 - Кормление",
            "20:00 - Сон",
          ],
        },
      };
    } else if (ageMonths < 36) {
      // 1-3 года
      return {
        sleep: {
          night: "20:00 - 7:00 (11 часов)",
          naps: ["13:00-15:00"],
        },
        feeding: {
          frequency: "4 раза в день + перекус",
          times: ["8:00", "12:00", "16:00", "19:00"],
        },
        activities: {
          morning: [
            "7:00 - 8:00 - Подъём, завтрак",
            "8:00 - 9:00 - Утренняя рутина: гигиена, одевание",
            "9:00 - 10:00 - Занятия: развитие речи, моторики",
            "10:00 - 11:00 - Активные игры, прогулка",
            "11:00 - 12:00 - Творческие занятия, игры",
          ],
          afternoon: [
            "12:00 - Обед",
            "12:30 - 13:00 - Тихие игры, подготовка ко сну",
            "13:00 - 15:00 - Дневной сон",
            "15:00 - 15:30 - Полдник",
            "15:30 - 17:00 - Игры, прогулка",
          ],
          evening: [
            "17:00 - 18:00 - Свободные игры",
            "18:00 - Ужин",
            "18:30 - 19:00 - Спокойные игры",
            "19:00 - 19:30 - Вечерняя рутина: купание",
            "19:30 - 20:00 - Чтение, сказка",
            "20:00 - Сон",
          ],
        },
      };
    } else {
      // 3-7 лет
      return {
        sleep: {
          night: "21:00 - 7:00 (10 часов)",
          naps: ageMonths < 60 ? ["14:00-15:00"] : [],
        },
        feeding: {
          frequency: "4 раза в день + перекус",
          times: ["8:00", "13:00", "16:30", "19:00"],
        },
        activities: {
          morning: [
            "7:00 - 8:00 - Подъём, завтрак",
            "8:00 - 9:00 - Утренняя рутина",
            "9:00 - 10:00 - Занятия: чтение, письмо, математика",
            "10:00 - 11:00 - Физические упражнения, активность",
            "11:00 - 12:00 - Творческие занятия",
          ],
          afternoon: [
            "12:00 - 13:00 - Обед",
            "13:00 - 14:00 - Тихий час: чтение, отдых",
            ageMonths < 60
              ? "14:00 - 15:00 - Дневной сон"
              : "14:00 - 15:00 - Тихие игры",
            "15:00 - 16:00 - Игры, прогулка",
            "16:00 - 17:00 - Свободное время",
          ],
          evening: [
            "17:00 - 18:00 - Игры, хобби",
            "18:00 - Ужин",
            "18:30 - 19:30 - Семейное время",
            "19:30 - 20:00 - Вечерняя рутина",
            "20:00 - 20:30 - Чтение",
            "20:30 - Сон",
          ],
        },
      };
    }
  },

  // Адаптация режима под проблемные области
  _adaptSchedule(baseSchedule, issues) {
    const adapted = JSON.parse(JSON.stringify(baseSchedule)); // Deep copy

    // Если проблемы со сном - АДАПТИРУЕМ САМ РЕЖИМ
    if (issues.sleepIssues) {
      adapted.sleep.preSleepRoutine = [
        "🌙 За 1 час: выключить яркий свет, приглушить звуки",
        "🛁 За 45 мин: тёплая ванна (36-37°C) с успокаивающими средствами (лаванда, ромашка)",
        "💆 За 30 мин: массаж, лёгкие поглаживания, утяжелённое одеяло",
        "🎵 За 15 мин: тихая музыка или белый шум",
        "📖 Песенка/колыбельная (одна и та же каждый вечер)",
        "😴 Сон",
      ];

      // Ранний уклад (на 1 час раньше)
      if (adapted.sleep.night && adapted.sleep.night.includes("-")) {
        const [start, end] = adapted.sleep.night.split(" - ");
        const [startHour, startMin] = start.split(":").map(Number);
        const newStartHour = startHour - 1;
        adapted.sleep.night = `${newStartHour}:${startMin.toString().padStart(2, "0")} - ${end}`;
        adapted.sleep.note = "⚠️ Ранний уклад на 1 час из-за проблем со сном";
      }
    }

    // Если сенсорные проблемы - АДАПТИРУЕМ АКТИВНОСТИ
    if (issues.sensoryIssues && issues.sensoryIssues.length > 0) {
      adapted.sensoryBreaks = [
        "🧘 Каждые 2 часа - 10 мин сенсорный перерыв",
        "🔇 Если гиперчувствительность: тихое место, минимум стимулов, наушники",
        "🏃 Если гипочувствительность: активная деятельность, прыжки, качели, утяжелённые предметы",
      ];

      // Добавляем сенсорные перерывы в утренние активности
      if (adapted.activities && adapted.activities.morning) {
        adapted.activities.morningNotes = [
          "⚠️ Распорядок адаптирован под сенсорные проблемы:",
          `• Проблемы: ${issues.sensoryIssues.join(", ")}`,
          "• Включены регулярные сенсорные перерывы",
          "• Используются calming strategies при перегрузке",
        ];
      }
    }

    // Если проблемы с вниманием - АДАПТИРУЕМ ДЛИТЕЛЬНОСТЬ ЗАНЯТИЙ
    if (issues.attentionIssues) {
      adapted.activityStructure = [
        "⏱️ Каждое занятие 15-20 минут (максимум!)",
        "☕ Перерывы 5-10 минут между занятиями",
        "⏰ Использовать визуальный таймер",
        "🔄 Чередовать активные и спокойные деятельности",
      ];

      // Корректируем активности с учётом коротких занятий
      if (adapted.activities && adapted.activities.morning) {
        adapted.activities.morningNotes = adapted.activities.morningNotes || [];
        adapted.activities.morningNotes.push(
          "⚠️ Занятия укорочены до 15-20 минут из-за проблем с вниманием",
        );
      }
    }

    return adapted;
  },

  // Генерация Behaviour Intervention Plan
  _generateBehaviourPlan(fastResults, qabfResults, masResults) {
    // Извлекаем функцию поведения из результатов FAST
    let fastFunction = "unknown";
    if (fastResults && fastResults.score) {
      const score = fastResults.score.toLowerCase();
      if (score.includes("внимание") || score.includes("attention"))
        fastFunction = "attention";
      else if (score.includes("избегание") || score.includes("escape"))
        fastFunction = "escape";
      else if (
        score.includes("предмет") ||
        score.includes("еда") ||
        score.includes("tangible")
      )
        fastFunction = "tangible";
      else if (score.includes("сенсорная") || score.includes("sensory"))
        fastFunction = "sensory";
    }

    // Извлекаем функцию поведения из результатов QABF
    let qabfFunction = "unknown";
    if (qabfResults && qabfResults.score) {
      const score = qabfResults.score.toLowerCase();
      if (score.includes("внимание") || score.includes("attention"))
        qabfFunction = "attention";
      else if (score.includes("избегание") || score.includes("escape"))
        qabfFunction = "escape";
      else if (
        score.includes("предмет") ||
        score.includes("еда") ||
        score.includes("tangible")
      )
        qabfFunction = "tangible";
      else if (score.includes("сенсорная") || score.includes("sensory"))
        qabfFunction = "sensory";
    }

    // Извлекаем мотивацию из результатов MAS
    let masMotivation = "unknown";
    if (masResults && masResults.score) {
      const score = masResults.score.toLowerCase();
      if (score.includes("сенсорная") || score.includes("sensory"))
        masMotivation = "sensory";
    }

    // Объединяем данные из всех методик
    const behaviourFunction = this._determineBehaviourFunction(
      fastFunction,
      qabfFunction,
      masMotivation,
    );

    return {
      primaryFunction: behaviourFunction,
      description: this._getBehaviourDescription(behaviourFunction),
      strategies: this._getBehaviourStrategies(behaviourFunction),
      antecedentStrategies: this._getAntecedentStrategies(behaviourFunction),
      consequenceStrategies: this._getConsequenceStrategies(behaviourFunction),
      replacementBehaviors: this._getReplacementBehaviors(behaviourFunction),
      emergencyPlan: this._getEmergencyPlan(behaviourFunction),
    };
  },

  // Определение функции поведения
  _determineBehaviourFunction(fast, qabf, mas) {
    // Приоритет: QABF > FAST > MAS
    if (qabf !== "unknown") return qabf;
    if (fast !== "unknown") return fast;
    if (mas !== "unknown") return mas;
    return "attention"; // Default
  },

  // Описание функции поведения
  _getBehaviourDescription(functionName) {
    const descriptions = {
      attention:
        "Ребёнок использует проблемное поведение для получения внимания окружающих. Когда никто не смотрит или занят, поведение усиливается.",
      escape:
        "Ребёнок использует поведение для избегания непривлекательных задач или ситуаций. Поведение усиливается при требованиях и инструкциях.",
      tangible:
        "Ребёнок использует поведение для получения желаемых предметов, еды или деятельности. Поведение прекращается после получения желаемого.",
      sensory:
        "Ребёнок использует поведение для получения сенсорной стимуляции или саморегуляции. Поведение продолжается независимо от внешних факторов.",
      unknown:
        "Функцию поведения трудно определить. Требуется дополнительный ABC анализ.",
    };

    return descriptions[functionName] || descriptions.unknown;
  },

  // Стратегии управления поведением
  _getBehaviourStrategies(functionName) {
    const strategies = {
      attention: [
        "Планированное внимание: давайте внимание ДО проблемного поведения (каждые 5-10 минут)",
        "Качественное внимание: 3-5 минут полного внимания каждый час",
        "Игнорирование проблемного поведения (если безопасно): не смотрите, не говорите, не реагируйте",
        "Похвала желаемого поведения: 'Молодец, что играешь спокойно'",
        "Научите просить: 'Посмотри на меня', 'Поиграй со мной'",
      ],
      escape: [
        "Разбивайте задания на мелкие шаги (не 'оденься', а 'возьми носки')",
        "Визуальная поддержка: картинки для последовательности действий",
        "Предварительное предупреждение: таймер 2/1/0 минут до начала",
        "Предлагайте выбор: 'хочешь красную или синюю футболку?'",
        "Хвалите за начало и выполнение: 'Молодец, что начал!'",
        "Reinforce завершение: награда после выполнения",
      ],
      tangible: [
        "PECS или система карточек для запросов",
        "Научите mands (просьбам) используя любимые предметы",
        "Не давайте желаемое во время проблемного поведения",
        "Reinforce спокойный запрос: немедленная награда",
        "Расписание доступа к предпочитаемым предметам",
        "Предлагайте альтернативы: 'хочешь яблоко или грушу?'",
      ],
      sensory: [
        "Сенсорная диета: запланированная сенсорная активность каждые 2 часа",
        "Тяжёлое одеяло, утяжелённый жилет, объятия (глубокое давление)",
        "Лиофические упражнения: подтягивания, отжимания",
        "Тихий уголок с минимумом стимулов",
        "Альтернативная самостимуляция: прыжки на фитболе, жевательная резинка",
        "Предсказуемая сенсорная активность для саморегуляции",
      ],
      unknown: [
        "Проведите ABC анализ (Antecedent-Behavior-Consequence)",
        "Записывайте когда возникает поведение",
        "Записывайте что происходит до и после",
        "Обратитесь к ABA-терапевту для детального анализа",
      ],
    };

    return strategies[functionName] || strategies.unknown;
  },

  // Стратегии предупреждения (Antecedent)
  _getAntecedentStrategies(functionName) {
    const strategies = {
      attention: [
        "Планированное внимание до начала поведения",
        "Визуальное расписание 'когда я занят'",
        "Таймер: 'я занят ещё 5 минут'",
        "Дать задание: 'нарисуй пока я готовлю'",
        "Альтернативная деятельность: специальные игры для самостоятельной игры",
      ],
      escape: [
        "Предварительное предупреждение о смене деятельности",
        "Визуальный таймер (песочные часы, визуальный таймер)",
        "Визуальное расписание дня",
        "Разбейте сложные задачи на простые шаги",
        "Предлагайте выбор где возможно",
        "First-then boards: 'сначала уборка, потом игра'",
      ],
      tangible: [
        "Визуальное расписание доступа к предпочитаемым предметам",
        "Таймер: 'через 5 минут будет мультик'",
        "Доступ к предметам по расписанию",
        "Предлагайте выбор: 'хочешь красную или синюю?'",
        "Научите спрашивать используя карточки/слова",
      ],
      sensory: [
        "Сенсорная диета по расписанию",
        "Предотвращение сенсорной перегрузки (перерывы в тихом месте)",
        "Подготовка к громким звукам, яркому свету",
        "Утяжелённая одежда/одеяло",
        "Альтернативные сенсорные активности",
      ],
      unknown: [
        "Наблюдение и запись триггеров",
        "Идентификация паттернов поведения",
        "ABC анализ в течение 1 недели",
      ],
    };

    return strategies[functionName] || strategies.unknown;
  },

  // Стратегии последствий (Consequence)
  _getConsequenceStrategies(functionName) {
    return {
      attention: [
        "Игнорируйте проблемное поведение (если безопасно)",
        "Не смотрите, не говорите, не реагируйте",
        "Как только успокоился - похвалите",
        "Увеличьте внимание за желаемое поведение",
        "Консистенция: все члены семьи следуют плану",
      ],
      escape: [
        "Не прекращайте требование после проблемного поведения",
        "Спокойно persisted с требованием",
        "Предложите помощь: 'покажу как начать'",
        "Reinforce начало и выполнение",
        "Минимизируйте словесные инструкции во время поведения",
      ],
      tangible: [
        "НЕ давайте желаемое во время проблемного поведения",
        "Ждите спокойствия перед тем как дать желаемое",
        "Reinforce альтернативные способы запроса",
        "Следуйте расписанию доступа",
        "Предлагайте альтернативы",
      ],
      sensory: [
        "Позволяйте сенсорную активность в подходящее время",
        "Предлагайте альтернативные сенсорные активности",
        "Используйте сенсорную диету профилактически",
        "Не наказывайте за сенсорные потребности",
      ],
      unknown: [
        "Анализируйте что уменьшает поведение",
        "Анализируйте что усиливает поведение",
        "Документируйте все реакции",
      ],
    };
  },

  // Замещающие поведения
  _getReplacementBehaviors(functionName) {
    return {
      attention: [
        "Трогать руку взрослого вместо криков",
        "Говорить 'посмотри на меня'",
        "Приносить игрушку показать",
        "Тапать плечо",
      ],
      escape: [
        "Показывать карточку 'стоп' или 'перерыв'",
        "Говорить 'мне нужно перерыв'",
        "Просить помощь",
        "Использовать таймер для перерыва",
      ],
      tangible: [
        "Использовать PECS карточки для запроса",
        "Говорить 'хочу [предмет]'",
        "Показывать на желаемый предмет",
        "Ждать спокойно",
      ],
      sensory: [
        "Просить сенсорную активность: 'хочу прыгать'",
        "Использовать тихий уголок когда перегружен",
        "Использовать сенсорную игрушку",
        "Просить глубокое давление: 'обними меня'",
      ],
    };
  },

  // Экстренный план
  _getEmergencyPlan(functionName) {
    return {
      crisisProtocol: [
        "Шаг 1: Обеспечить безопасность (убрать опасные предметы)",
        "Шаг 2: Если агрессия - защитите себя и ребёнка",
        "Шаг 3: Не кричать, не спорить",
        "Шаг 4: Переместить в безопасное место",
        "Шаг 5: Дать сенсорную регуляцию (тяжёлое одеяло, покачивание)",
        "Шаг 6: Ждать спокойствия (может занять 20-30 минут)",
        "Шаг 7: После - не ругать, не читать нотаций",
        "Шаг 8: Проанализировать триггер и предотвратить в будущем",
      ],
      contactProfessional:
        "Если поведение опасно (самоповреждение, агрессия) - обратитесь к ABA-терапевту или детскому психиатру",
    };
  },

  // Генерация сенсорной диеты
  _generateSensoryDiet(sensoryProfile, masResults, childInfo) {
    if (!sensoryProfile) {
      return {
        note: "Сенсорный профиль не заполнен. Рекомендуется пройти сенсорную оценку.",
      };
    }

    const issues = sensoryProfile.issues || [];
    const hyperSensitive = sensoryProfile.hyperSensitive || [];
    const hypoSensitive = sensoryProfile.hypoSensitive || [];
    const seeking = sensoryProfile.seeking || [];

    // Определяем возраст для адаптации (берём из childInfo или используем дефолт)
    const ageMonths = parseInt(childInfo?.ageMonths) || 36;

    return {
      morningRoutine: this._getSensoryMorningRoutine(
        hyperSensitive,
        hypoSensitive,
        seeking,
        ageMonths,
      ),
      throughoutDay: this._getSensoryThroughoutDay(
        issues,
        hyperSensitive,
        hypoSensitive,
        seeking,
      ),
      eveningRoutine: this._getSensoryEveningRoutine(
        hyperSensitive,
        hypoSensitive,
        seeking,
      ),
      specificActivities: this._getSpecificSensoryActivities(
        hyperSensitive,
        hypoSensitive,
        seeking,
      ),
      equipment: this._getSensoryEquipment(
        hyperSensitive,
        hypoSensitive,
        seeking,
        ageMonths,
      ),
      // Добавляем краткое описание сенсорного профиля
      profileSummary: this._getSensoryProfileSummary(
        hyperSensitive,
        hypoSensitive,
        seeking,
      ),
    };
  },

  // Краткое описание сенсорного профиля
  _getSensoryProfileSummary(hyper, hypo, seeking) {
    const summary = [];

    if (hyper.length > 0) {
      const modalityNames = {
        auditory: "звуков",
        visual: "света",
        tactile: "тактильных ощущений",
        oral: "вкуса",
        vestibular: "движения",
        proprioceptive: "давления",
        olfactory: "запахов",
      };
      const hyperModality = hyper.map((m) => modalityNames[m] || m).join(", ");
      summary.push(`Гиперчувствительность к: ${hyperModality}`);
    }

    if (hypo.length > 0) {
      const modalityNames = {
        auditory: "звукам",
        visual: "зрительным стимулам",
        tactile: "тактильным стимулам",
        oral: "оральным стимулам",
        vestibular: "движению",
        proprioceptive: "проприоцепции",
        olfactory: "запахам",
      };
      const hypoModality = hypo.map((m) => modalityNames[m] || m).join(", ");
      summary.push(`Гипочувствительность к: ${hypoModality}`);
    }

    if (seeking.length > 0) {
      const modalityNames = {
        auditory: "звуковыми",
        visual: "визуальными",
        tactile: "тактильными",
        oral: "оральными",
        vestibular: "движением",
        proprioceptive: "проприоцептивными",
        olfactory: "запахами",
      };
      const seekingModality = seeking
        .map((m) => modalityNames[m] || m)
        .join(", ");
      summary.push(`Активный поиск: ${seekingModality}`);
    }

    return summary;
  },

  // Утренняя сенсорная рутина
  _getSensoryMorningRoutine(hyper, hypo, seeking, ageMonths) {
    const routine = [];

    // 1. Проприоцептивная (глубокое давление) для всех - адаптировано под возраст
    const proprioActivity =
      ageMonths < 36
        ? "Массаж и поглаживания"
        : seeking.includes("proprioceptive")
          ? "Активная растяжка и глубокое давление"
          : "Утренняя растяжка и массаж";

    const proprioDesc =
      ageMonths < 36
        ? "Поглаживания спины, ручек, ножек. Лёгкие сдавливания."
        : seeking.includes("proprioceptive")
          ? "Интенсивные растяжки, отжимания от стены, глубокое давление через полотенце."
          : "Поглаживания спины, ручек, ножек. Лёгкие растяжения.";

    routine.push({
      time: "7:00-7:15",
      activity: proprioActivity,
      description: proprioDesc,
    });

    // 2. Вестибулярная - адаптировано под профиль
    if (hyper.includes("vestibular")) {
      // Гиперчувствительность - мягкие упражнения
      routine.push({
        time: "7:15-7:20",
        activity: "Мягкие вестибулярные упражнения",
        description:
          "Медленные покачивания на фитболе. Не вращать! Предупреждать перед движением.",
      });
    } else if (hypo.includes("vestibular") || seeking.includes("vestibular")) {
      // Гипочувствительность или поиск - интенсивные упражнения
      routine.push({
        time: "7:15-7:25",
        activity: "Активные вестибулярные упражнения",
        description:
          ageMonths < 36
            ? "Качели, наклоны, лёгкие вращения."
            : "Кувырки, вращение на фитболе, балансировка, прыжки.",
      });
    }

    // 3. Тактильная - адаптировано под профиль
    const tactileDesc = hyper.includes("tactile")
      ? "Мягкая губка, тёплая вода. Предупреждайте перед каждым касанием. Постепенное знакомство с текстурами."
      : hypo.includes("tactile") || seeking.includes("tactile")
        ? "Массаж щёткой, контрастный душ, разные текстуры полотенец."
        : "Массаж щёткой, разные текстуры полотенец.";

    routine.push({
      time: ageMonths < 36 ? "7:25-7:35" : "7:25-7:40",
      activity: "Гигиенические процедуры",
      description: tactileDesc,
    });

    // 4. Оральная стимуляция (если есть проблемы)
    if (hyper.includes("oral") || seeking.includes("oral")) {
      routine.push({
        time: ageMonths < 36 ? "7:35-7:40" : "7:40-7:45",
        activity: "Оральная моторика",
        description: hyper.includes("oral")
          ? "Предлагайте едуroom temperature. Не принуждайте к новым текстурам."
          : "Твёрдая пища для жевания (морковь, яблоко), сосание через трубочку.",
      });
    }

    // 5. Аудиальная/визуальная подготовка (если гиперчувствительность)
    if (hyper.includes("auditory") || hyper.includes("visual")) {
      routine.push({
        time: ageMonths < 36 ? "7:40-7:45" : "7:45-7:50",
        activity: "Подготовка к дню",
        description:
          hyper.includes("auditory") && hyper.includes("visual")
            ? "Тихая музыка, затемнённый свет. Постепенное увеличение яркости и громкости."
            : hyper.includes("auditory")
              ? "Тихая музыка или белый шум. Избегайте резких звуков."
              : "Яркий свет, но без мигания. Предупреждайте о смене освещения.",
      });
    }

    return routine;
  },

  // Сенсорные активности в течение дня
  _getSensoryThroughoutDay(issues, hyper, hypo, seeking) {
    const every2Hours = ["10 минут сенсорного перерыва"];

    // Аудиальная адаптация
    if (hyper.includes("auditory")) {
      every2Hours.push("Тихое место, минимум шума");
      every2Hours.push("Шумоподавляющие наушники в шумных местах");
    } else if (seeking.includes("auditory")) {
      every2Hours.push("Музыкальные паузы, звуки природы");
      every2Hours.push("Звуковые игры: хлопки, инструменты");
    } else {
      every2Hours.push("Спокойная музыка или звуки природы");
    }

    // Визуальная адаптация
    if (hyper.includes("visual")) {
      every2Hours.push("Затемнить комнату, убрать яркие игрушки");
      every2Hours.push("Минимум визуальных стимулов");
    } else if (seeking.includes("visual")) {
      every2Hours.push("Световые игрушки, яркие цвета");
      every2Hours.push("Визуальные стимулы для фокусировки");
    }

    // Проприоцептивная активность (для всех, но адаптировано)
    if (seeking.includes("proprioceptive") || hypo.includes("proprioceptive")) {
      every2Hours.push(
        "Интенсивная проприоцептивная активность: отжимания от стены, подтягивания, перенос тяжестей",
      );
    } else {
      every2Hours.push(
        "Лёгкая проприоцептивная активность: отжимания от стены, растяжки",
      );
    }

    // Вестибулярная адаптация
    if (hyper.includes("vestibular")) {
      every2Hours.push("Минимум движений, спокойные игры");
    } else if (seeking.includes("vestibular") || hypo.includes("vestibular")) {
      every2Hours.push("Вестибулярные перерывы: качели, вращение, прыжки");
    }

    const heavyWork = [
      "Перенос игрушек/книг",
      "Открывание/закрывание дверей",
      "Лёгкие домашние дела: подмести, протереть стол",
    ];

    // Добавляем интенсивную работу если нужно
    if (seeking.includes("proprioceptive")) {
      heavyWork.push("Перенос тяжестей (книги, продукты)");
      heavyWork.push("Отжимания, приседания");
    }

    const oralMotor = [];
    if (hyper.includes("oral")) {
      oralMotor.push("Мягкая пищаroom temperature");
      oralMotor.push("Избегать грубых текстур");
    } else if (seeking.includes("oral") || hypo.includes("oral")) {
      oralMotor.push("Твёрдая пища: морковь, яблоко");
      oralMotor.push("Сосание через трубочку");
      oralMotor.push("Жевательная резинка (если возраст позволяет)");
    }

    return {
      every2Hours,
      heavyWork,
      oralMotor:
        oralMotor.length > 0 ? oralMotor : ["Твёрдая пища для жевания"],
    };
  },

  // Вечерняя сенсорная рутина
  _getSensoryEveningRoutine(hyper, hypo, seeking) {
    const routine = [];

    // 1. Тёплая ванна - адаптирована под сенсорный профиль
    let bathDesc = "36-37°C.";

    if (hyper.includes("tactile")) {
      bathDesc +=
        " Мягкая губка, плавные движения. Постепенное привыкание к воде.";
    } else if (seeking.includes("tactile")) {
      bathDesc += " Разные текстуры: губка, мочалка, пенка. Массаж в воде.";
    } else {
      bathDesc += " Пену, игрушки. Не плескаться активно.";
    }

    if (hyper.includes("vestibular")) {
      bathDesc += " Поддерживайте голову, избегайте резких движений.";
    }

    routine.push({
      time: "19:00-19:15",
      activity: "Тёплая ванна",
      description: bathDesc,
    });

    // 2. Массаж - адаптирован под профиль
    let massageDesc = "";

    if (hyper.includes("tactile")) {
      massageDesc =
        "Очень лёгкий массаж, поглаживания. Предупреждайте перед касанием. Постепенно увеличивайте давление.";
    } else if (
      seeking.includes("proprioceptive") ||
      hypo.includes("proprioceptive")
    ) {
      massageDesc =
        "Интенсивный массаж с глубоким давлением. Растирание, сдавливание мышц. Утяжелённое одеяло.";
    } else {
      massageDesc = "Спокойный массаж с лёгким давлением. Спина, плечи, руки.";
    }

    routine.push({
      time: "19:15-19:25",
      activity: "Массаж",
      description: massageDesc,
    });

    // 3. Кальцинирование - адаптировано под профиль
    let calmingDesc = "";

    if (hyper.includes("auditory")) {
      calmingDesc =
        "Бел шум, тихая музыка. Минимум звуков. Шумоподавляющие наушники если нужно.";
    } else if (seeking.includes("auditory")) {
      calmingDesc = "Музыка, звуки природы. Пение колыбельной.";
    } else {
      calmingDesc = "Тихая музыка или белый шум.";
    }

    if (hyper.includes("visual")) {
      calmingDesc +=
        " Затемнённая комната, минимум визуальных стимулов. Ночной свет.";
    } else if (seeking.includes("visual")) {
      calmingDesc += " Мягкий свет, световые проекции.";
    } else {
      calmingDesc += " Минимум визуальных стимулов.";
    }

    if (seeking.includes("vestibular") || hypo.includes("vestibular")) {
      calmingDesc += " Лёгкие покачивания на фитболе или в гамаке.";
    }

    routine.push({
      time: "19:25-19:30",
      activity: "Успокоительная деятельность",
      description: calmingDesc,
    });

    return routine;
  },

  // Специфические сенсорные активности
  _getSpecificSensoryActivities(hyper, hypo, seeking) {
    const activities = {};

    // Вестибулярная
    if (hyper.includes("vestibular")) {
      activities.vestibular = [
        "Лёгкие покачивания (медленно)",
        "Медленные качели без вращения",
        "Избегать быстрой смены положения",
        "Обязательно предупреждать перед изменением положения",
        "Не подбрасывать, не вращать",
      ];
    } else if (seeking.includes("vestibular") || hypo.includes("vestibular")) {
      activities.vestibular = [
        "Активные качели с вращением",
        "Кувырки, вращение на фитболе",
        "Прыжки на батуте/фитболе",
        "Балансировочные упражнения (доска, бревно)",
        "Лазание, альпинистская стенка",
      ];
    } else {
      activities.vestibular = [
        "Лёгкие покачивания",
        "Качели (умеренно)",
        "Наклоны, повороты",
      ];
    }

    // Тактильная
    if (hyper.includes("tactile")) {
      activities.tactile = [
        "Всегда предупреждать перед касанием",
        "Использовать мягкую одежду без швов и этикеток",
        "Гладкие ткани в одежде и постельном белье (хлопок, сатин)",
        "Постепенное знакомство с новыми текстурами (по 1-2 минуты)",
        "Не принуждать к грязным играм, предлагать альтернативы",
      ];
    } else if (seeking.includes("tactile") || hypo.includes("tactile")) {
      activities.tactile = [
        "Массаж щёткой (Wilbarger protocol если обучен)",
        "Тактильные игры: песок, вода, крупы, глина",
        "Лего, конструкторы, пластилин",
        "Обнимания, глубокое давление (roll в одеяле)",
        "Тактильные панели, коврики с разными текстурами",
      ];
    } else {
      activities.tactile = [
        "Разнообразные текстуры в играх",
        "Массаж поглаживанием",
      ];
    }

    // Аудиальная
    if (hyper.includes("auditory")) {
      activities.auditory = [
        "Тихая среда дома, минимум бытового шума",
        "Шумоподавляющие наушники в шумных местах (магазины, транспорт)",
        "Всегда предупреждать перед громкими звуками",
        "Бел шум для маскировки неожиданных звуков",
        "Избегать мест с громкой музыкой, криками",
      ];
    } else if (seeking.includes("auditory") || hypo.includes("auditory")) {
      activities.auditory = [
        "Музыкальные игрушки и инструменты",
        "Звуковые игры: хлопки, топот, голосовые",
        "Различные типы звуков для стимуляции",
        "Пение, музыкальные занятия",
        "Звуковые книги, аудиосказки",
      ];
    } else {
      activities.auditory = ["Спокойная музыка", "Звуки природы"];
    }

    // Визуальная
    if (hyper.includes("visual")) {
      activities.visual = [
        "Минимум ярких визуальных стимулов",
        "Приглушённый свет, солнцезащитные очки на улице",
        "Организованные пространства без визуального хаоса",
        "Предупреждать о смене освещения",
        "Затемняющие шторы в спальне",
      ];
    } else if (seeking.includes("visual")) {
      activities.visual = [
        "Яркие игрушки, световые панели",
        "Визуальные расписания с картинками",
        "Цветовое кодирование",
        "Световые проекты, визуальные стимуляции",
      ];
    }

    // Оральная
    if (hyper.includes("oral")) {
      activities.oral = [
        "Постепенное знакомство с новыми текстурами еды",
        "Едаroom temperature, не горячая/холодная",
        "Отдельные компоненты на тарелке (не смешивать)",
        "Не принуждать к еде, уважать отказ",
      ];
    } else if (seeking.includes("oral")) {
      activities.oral = [
        "Твёрдая пища для жевания (морковь, яблоко, сухарики)",
        "Сосание через трубочку",
        "Жевательная резинка (если возраст позволяет)",
        "Вибрационные игрушки для рта",
      ];
    }

    // Проприоцептивная
    if (seeking.includes("proprioceptive") || hypo.includes("proprioceptive")) {
      activities.proprioceptive = [
        "Интенсивное глубокое давление (roll в одеяле, сэндвич)",
        "Отжимания (от стены, от пола)",
        "Перенос тяжестей (книги, пакеты)",
        "Утяжелённый жилет/одеяло (10-15% веса)",
        "Прыжки, бег, лазание",
      ];
    } else if (hyper.includes("proprioceptive")) {
      activities.proprioceptive = [
        "Лёгкое глубокое давление",
        "Утяжелённое одеяло (5-10% веса)",
        "Обнимания по запросу",
        "Спокойные растяжки",
      ];
    } else {
      activities.proprioceptive = ["Обнимания", "Лёгкое давление"];
    }

    return activities;
  },

  // Сенсорное оборудование
  _getSensoryEquipment(hyper, hypo, seeking, ageMonths = 36) {
    const equipment = [];

    // Базовое оборудование для всех
    equipment.push("Фитбол (большой мяч для упражнений)");

    // Утяжелённое одеяло - вес зависит от профиля
    if (seeking.includes("proprioceptive") || hypo.includes("proprioceptive")) {
      equipment.push("Утяжелённое одеяло (10-15% веса ребёнка)");
      equipment.push("Утяжелённый жилет (если позволяет возраст)");
    } else if (hyper.includes("proprioceptive")) {
      equipment.push("Лёгкое утяжелённое одеяло (5-10% веса ребёнка)");
    } else {
      equipment.push("Утяжелённое одеяло (10% веса ребёнка)");
    }

    // Тактильное оборудование
    if (hyper.includes("tactile")) {
      equipment.push("Мягкая одежда без швов (бельё, футболки)");
      equipment.push("Натуральные ткани (хлопок, бамбук)");
    } else if (seeking.includes("tactile") || hypo.includes("tactile")) {
      equipment.push("Массажная щётка (soft)");
      equipment.push("Тактильные панели, коврики");
      equipment.push("Сенсорные коробки (песок, крупы, вода)");
      equipment.push("Игрушки с разными текстурами");
    } else {
      equipment.push("Сенсорные игрушки (разные текстуры)");
    }

    // Вестибулярное оборудование
    if (hyper.includes("vestibular")) {
      equipment.push("Стационарные качели (без вращения)");
      equipment.push("Гамак для спокойных покачиваний");
    } else if (seeking.includes("vestibular") || hypo.includes("vestibular")) {
      equipment.push("Качели (с возможностью вращения)");
      equipment.push("Батут (малый/средний)");
      equipment.push("Балансировочная доска");
      equipment.push("Спиннер/вращающийся диск");
    } else {
      equipment.push("Качели, гамак");
    }

    // Аудиальное оборудование
    if (hyper.includes("auditory")) {
      equipment.push("Шумоподавляющие наушники");
      equipment.push("Бел шум машина");
      equipment.push("Беруши (для экстренных случаев)");
    } else if (seeking.includes("auditory")) {
      equipment.push("Музыкальные инструменты (ксилофон, барабан)");
      equipment.push("Звуковые игрушки");
      equipment.push("Колокольчики, погремушки");
    }

    // Визуальное оборудование
    if (hyper.includes("visual")) {
      equipment.push("Солнцезащитные очки");
      equipment.push("Затемняющие шторы");
      equipment.push("Ночной свет с регулятором яркости");
    } else if (seeking.includes("visual")) {
      equipment.push("Световые панели/проекторы");
      equipment.push("Яркие визуальные стимулы");
      equipment.push("Визуальный таймер");
    }

    // Оральное оборудование
    if (seeking.includes("oral")) {
      equipment.push("Трубочки для питья (разные диаметры)");
      equipment.push("Жевательные игрушки (chewelry)");
      if (ageMonths >= 36) {
        equipment.push("Жевательная резинка (без сахара)");
      }
    }

    // Проприоцептивное оборудование
    if (seeking.includes("proprioceptive") || hypo.includes("proprioceptive")) {
      equipment.push("Эспандеры, резинки для упражнений");
      equipment.push("Гири/утяжелители (1-2 кг)");
      equipment.push("Сэндвич-одеяло (для roll)");
    }

    // Оборудование для спокойной зоны
    if (hyper.includes("auditory") || hyper.includes("visual")) {
      equipment.push("Палатка/шатёр для уединения");
      equipment.push("Специальный 'тихий уголок' с минимумом стимулов");
    }

    return equipment;
  },

  // Генерация плана развития на основе M-CHAT-R и оценок развития
  _generateDevelopmentalPlan(mchatr, scq, milestones) {
    const plan = {
      prioritySkills: [],
      dailyExercises: [],
      weeklyGoals: [],
      monthlyTargets: [],
    };

    // Анализируем M-CHAT-R результаты
    if (mchatr && mchatr.description) {
      const criticalSkills = this._extractCriticalSkills(mchatr);
      plan.prioritySkills.push(...criticalSkills);
    }

    // Анализируем оценку развития
    if (milestones && milestones.answers) {
      const missingSkills = this._extractMissingSkills(milestones);
      plan.prioritySkills.push(...missingSkills);
    }

    // Генерируем ежедневные упражнения
    plan.dailyExercises = this._generateDailyExercises(plan.prioritySkills);

    // Генерируем еженедельные цели
    plan.weeklyGoals = this._generateWeeklyGoals(plan.prioritySkills);

    // Генерируем ежемесячныеTargets
    plan.monthlyTargets = this._generateMonthlyTargets(plan.prioritySkills);

    return plan;
  },

  // Извлечение критических навыков из M-CHAT-R
  _extractCriticalSkills(mchatrResults) {
    const skills = [];

    if (
      mchatrResults.riskClass === "risk-high" ||
      mchatrResults.riskClass === "risk-medium"
    ) {
      // Если риск РАС, добавляем ключевые навыки для работы
      skills.push({
        domain: "social",
        skill: "Реакция на имя",
        description: "Ребёнок не реагирует на имя или реагирует редко",
        exercises: [
          "Подойти близко (30-50 см), позвать имя громко и четко",
          "Если не реагирует - дотронуться до плеча, повторить имя",
          "Когда обернулся - похвалить: 'Молодец, что услышал!'",
          "Повторить 5-10 раз в день в разных ситуациях",
          "Через 7 дней - увеличивать расстояние до 2 метров",
        ],
        frequency: "5-10 раз в день",
        duration: "2-3 недели",
      });

      skills.push({
        domain: "communication",
        skill: "Зрительный контакт",
        description: "Редкий или кратковременный зрительный контакт",
        exercises: [
          "Расположиться на уровне глаз ребёнка",
          "Показать любимую игрушку, медленно поднести к лицу",
          "Когда смотрит - удерживать контакт 1-2 секунды",
          "Похвалить: 'Отлично! Ты смотришь на меня!'",
          "Постепенно увеличивать длительность до 3-5 секунд",
          "Использовать игры с 'прятками' (закрыть лицо руками, потом открыть)",
        ],
        frequency: "5-7 раз в день",
        duration: "4-6 недель",
      });

      skills.push({
        domain: "communication",
        skill: "Указательный жест",
        description:
          "Не указывает на желаемые объекты или для совместного внимания",
        exercises: [
          "Моделировать указательный жест: указывать на интересные объект",
          "Использовать hand-over-hand: взять руку ребёнка, помочь указать",
          "Когда указывает - давать желаемое немедленно",
          "Указывать на самолеты, собак, интересные вещи на улице",
          "Игры 'где игрушка?': указывать на спрятанную игрушку",
        ],
        frequency: "7-10 раз в день",
        duration: "6-8 недель",
      });

      skills.push({
        domain: "social",
        skill: "Имитация действий",
        description: "Не повторяет действия взрослого",
        exercises: [
          "Начинать с простых действий: хлопок, 'пока-пока'",
          "Делать действие непосредственно перед ребенком",
          "Использовать hand-over-hand для помощи",
          "Когда повторяет - бурно хвалить",
          "Постепенно добавлять более сложные действия",
          "Игры 'делай как я': очередность действий",
        ],
        frequency: "3-5 раз в день",
        duration: "4-6 недель",
      });
    }

    return skills;
  },

  // Извлечение пропущенных навыков из оценок развития
  _extractMissingSkills(milestonesResults) {
    const skills = [];

    // TODO: Добавить логику анализа оценок развития
    // Это потребует детального разбора каждого навыка по возрастам

    return skills;
  },

  // Генерация ежедневных упражнений
  _generateDailyExercises(prioritySkills) {
    const exercises = [];

    prioritySkills.forEach((skill) => {
      exercises.push({
        skill: skill.skill,
        exercises: skill.exercises,
        frequency: skill.frequency,
        bestTime: this._determineBestTime(skill.domain),
      });
    });

    return exercises;
  },

  // Определение лучшего времени для занятий
  _determineBestTime(domain) {
    const timeMap = {
      social: ["Утро после завтрака", "Вечер после тихого времени"],
      communication: ["Утро", "После дневного сна"],
      motor: ["Утро", "Днем на прогулке"],
      cognitive: ["Утро", "После полдника"],
    };

    return timeMap[domain] || ["В течение дня"];
  },

  // Генерация еженедельных целей
  _generateWeeklyGoals(prioritySkills) {
    const goals = [];

    prioritySkills.forEach((skill, index) => {
      goals.push({
        week: index + 1,
        skill: skill.skill,
        target: `Начать работу над навыком "${skill.skill}"`,
        activities: skill.exercises.slice(0, 3), // Первые 3 упражнения
        successCriteria: `Ребёнок выполняет упражнение с минимальной помощью`,
      });
    });

    return goals;
  },

  // Генерация ежемесячных целей
  _generateMonthlyTargets(prioritySkills) {
    return [
      {
        month: 1,
        focus: "Установление контакта и базовых навыков",
        skills: prioritySkills.slice(0, 3).map((s) => s.skill),
        targets: [
          "Ребёнок реагирует на имя в 80% случаев",
          "Зрительный контакт 1-2 секунды в 50% случаев",
          "Повторяет 2-3 простых действия с помощью",
        ],
      },
      {
        month: 2,
        focus: "Развитие коммуникации и социального взаимодействия",
        skills: prioritySkills.slice(2, 5).map((s) => s.skill),
        targets: [
          "Указывает на желаемые объекты",
          "Привлекает внимание к интересующим объектам",
          "Имитирует 3-4 действия самостоятельно",
        ],
      },
    ];
  },

  // Генерация плана для BRIEF-2 (исполнительные функции)
  _generateExecutiveFunctionPlan(brief) {
    if (!brief) {
      return {
        note: "BRIEF-2 не пройден",
      };
    }

    const plan = {
      areas: [],
      strategies: [],
      accommodations: [],
      dailyStructure: [],
    };

    // Базовые стратегии для исполнительных функций
    plan.strategies = [
      "Визуальное расписание дня (картинки или фотографии)",
      "Таймер для каждой деятельности (визуальный таймер)",
      "Чек-листы для утренней и вечерней рутины",
      "Разбивка сложных задач на простые шаги",
      "Напоминания за 5/2/1 минуты до смены деятельности",
      "Визуальные правила для повторяющихся ситуаций",
    ];

    plan.accommodations = [
      "Минимум отвлекающих факторов во время занятий",
      "Тихое место для выполнения заданий",
      "Дополнительное время на выполнение инструкций",
      "Повторение инструкций (попросить повторить)",
      "Использование таймера для саморегуляции",
    ];

    plan.dailyStructure = [
      "Постоянное время пробуждения и отхода ко сну",
      "Регулярное питание в одно время",
      "Четкое расписание занятий и перерывов",
      "Визуальное расписание на видном месте",
      "Подготовка к изменениям заранее",
    ];

    return plan;
  },

  // Генерация плана управления СДВГ (Conners-3)
  _generateADHDManagement(conners) {
    if (!conners) {
      return {
        note: "Conners-3 не пройден",
      };
    }

    const plan = {
      inattention: [],
      hyperactivity: [],
      impulsivity: [],
      schoolStrategies: [],
      homeStrategies: [],
      medicationConsiderations: [],
    };

    // Стратегии для невнимательности
    plan.inattention = [
      "Сократить инструкции до 1-2 шагов",
      "Установить зрительный контакт перед инструкцией",
      "Попросить повторить инструкцию",
      "Использовать визуальные подсказки",
      "Минимум отвлекающих факторов",
      "Частые перерывы (каждые 10-15 минут)",
    ];

    // Стратегии для гиперактивности
    plan.hyperactivity = [
      "Запланированная физическая активность каждый день",
      "Сенсорная диета с проприоцептивическими упражнениями",
      "Перерывы для движения (jumping jacks, приседания)",
      "Фиджет-игрушки во время спокойных занятий",
      "Альтернативная позиция сидения (fitness ball, standing desk)",
    ];

    // Стратегии для импульсивности
    plan.impulsivity = [
      "Научить правилу 'сначала подумай, потом сделай'",
      "Использовать систему 'подними руку, прежде чем говорить'",
      "Игры на ожидание и очередность",
      "Похвала за импульсивный контроль",
      "Таймер для ожидания (visual timer)",
    ];

    // Школьные стратегии
    plan.schoolStrategies = [
      "Посадить перед классом, подальше от окон/двери",
      "Короткие четкие инструкции",
      "Визуальное расписание дня",
      "Дополнительное время на тестах",
      "Перерывы для движения",
      "Партнерская система с соседом",
    ];

    // Домашние стратегии
    plan.homeStrategies = [
      "Постоянный режим дня",
      "Визуальное расписание дома",
      "Место для homework без отвлечений",
      "Таймер для выполнения домашнего задания",
      "Похвала за усилия, не только за результаты",
      "Четкие правила и последовательность",
    ];

    // Медицинские соображения
    plan.medicationConsiderations = [
      "Обсудить с педиатром или детским психиатром",
      "Медикаментозное лечение может быть рассмотрено если симптомы значительно мешают",
      "Комбинация медикаментов и behavioral interventions наиболее эффективна",
      "Регулярный мониторинг эффективности и побочных эффектов",
    ];

    return plan;
  },

  // Генерация экстренных протоколов
  _generateEmergencyProtocols(data) {
    const protocols = {
      screaming: this._getScreamingProtocol(),
      aggression: this._getAggressionProtocol(),
      selfInjury: this._getSelfInjuryProtocol(),
      meltdown: this._getMeltdownProtocol(),
      elopement: this._getElopementProtocol(),
    };

    return protocols;
  },

  // Протокол для криков
  _getScreamingProtocol() {
    return {
      title: "КРИКИ И ПЛАЧ",
      immediate: [
        "Шаг 1: Проверить физиологию - подгузник, вода, температура",
        "Шаг 2: Опуститься на уровень глаз, спокойно сказать: 'Я вижу, ты расстроен'",
        "Шаг 3: Предложить выбор: 'Хочешь обнять или посидеть спокойно?'",
        "Шаг 4: Если не успокаивается через 5 минут - дать сенсорную игрушку",
      ],
      prolonged: [
        "Если кричит больше 15 минут:",
        "- Вынести в другую комнату",
        "- Включить спокойную музыку",
        "- Посадить на качели или фитбол",
        "- Дать попить воды",
      ],
      after: [
        "После успокоения:",
        "- Обнять",
        "- Спросить (если говорит): 'Что тебя расстроило?'",
        "- Похвалить: 'Молодец, что успокоился'",
      ],
    };
  },

  // Протокол для агрессии
  _getAggressionProtocol() {
    return {
      title: "АГРЕССИЯ (удары, укусы, царапание)",
      immediate: [
        "ПРОВОРИТЕЛЬНО: Защита себя и ребёнка",
        "Шаг 1: Перехватить удары, не причиняя боль",
        "Шаг 2: Блокировать удары, не кричать, не пугать",
        "Шаг 3: Говорить спокойно: 'Нельзя биться'",
        "Шаг 4: Увеличить дистанцию, отойти если безопасно",
      ],
      during: [
        "Во время агрессии:",
        "- НЕ кричать, НЕ спорить",
        "- НЕ читать нотаций",
        "- Минимум речи и внимания",
        "- Защита и безопасность - приоритет",
      ],
      after: [
        "После прекращения агрессии:",
        "- НЕ ругать, НЕ наказывать",
        "- Коротко объяснить: 'Биться больно и опасно'",
        "- Проанализировать триггер (что вызвало?)",
        "- Разработать план предотвращения",
      ],
      prevention: [
        "Профилактика:",
        "- Идентифицировать триггеры (голод, усталость, шум?)",
        "- Избегать известных триггеров",
        "- Давать альтернативы для выражения эмоций",
        "- Учить просить: 'Я хочу', 'Мне нужно'",
      ],
    };
  },

  // Протокол для самоущерба
  _getSelfInjuryProtocol() {
    return {
      title: "САМОУЩЕРБ (удары головой, кусание себя)",
      critical:
        "КРИТИЧЕСКИ: Требуется консультация с специалистом (ABA-терапевт, психиатр)",
      immediate: [
        "Шаг 1: Немедленно предотвратить (блокировать, но не крепко держать)",
        "Шаг 2: Дать сенсорную альтернативу: массаж, глубокое давление",
        "Шаг 3: Использовать утяжелённое одеяло или жилет",
        "Шаг 4: Покачать на фитболе или в качелях",
      ],
      protection: [
        "Защита:",
        "- Шлем или подушки если бьётся головой",
        "- Короткие ногти если царапается",
        "- Мягкие поверхности для падений",
      ],
      medical: [
        "Медицинское вмешательство:",
        "- Консультация с детским психиатром",
        "- Рассмотреть медикаментозное лечение",
        "- ABA терапия для анализа функции поведения",
        "- Behavior Intervention Plan от специалиста",
      ],
    };
  },

  // Протокол для мелтдаунов
  _getMeltdownProtocol() {
    return {
      title: "МЕЛТДАУН (полная потеря контроля)",
      description:
        "Мелтдаун - не истерика, это перегрузка нервной системы. Ребёнок не контролирует себя.",
      early: [
        "Ранние признаки (прервать если заметите):",
        "- Усиление стереотипий",
        "- Покрытие ушами, closing eyes",
        "- Учащение движения, возбуждение",
        "- Изменение цвета лица",
      ],
      during: [
        "Во время мелтдауна:",
        "- Говорить МАЛО, МЯГКО, НЕГРОМКО",
        "- НЕ читать нотаций, НЕ уговаривать",
        "- Создать calm environment (минимум стимулов)",
        "- Дать сенсорную регуляцию (одеяло, качели)",
        "- ЖДАТЬ (может занять 20-60 минут)",
      ],
      after: [
        "После мелтдауна (когда calm):",
        "- НЕ ругать, НЕ спрашивать 'почему?'",
        "- Дать попить, перекусить",
        "- Отдых, тихая деятельность",
        "- Проанализировать триггер для предотвращения",
      ],
    };
  },

  // Протокол для побегов
  _getElopementProtocol() {
    return {
      title: "ПОБЕГИ (убегает от родителей, в опасные места)",
      critical: "КРИТИЧЕСКИ: Вопрос безопасности жизни!",
      immediate: [
        "Шаг 1: Немедленно пресечь (бежать за ребёнком)",
        "Шаг 2: Вернуть в безопасное место",
        "Шаг 3: НЕ ругать, НЕ наказывать (ребёнок не понимает опасность)",
        "Шаг 4: Удерживать рядом если риск побега",
      ],
      prevention: [
        "Профилактика:",
        "- Замки на дверях, окна",
        "- GPS tracker или браслет",
        "- Яркая одежда для легкой идентификации",
        "- Оповестить соседей, школу о побегах",
        "- Научить правилу: 'Оставаться рядом'",
      ],
      teaching: [
        "Обучение:",
        "- Игры на остановку по команде 'стоп'",
        "- Похвала за возвращение по команде",
        "- Visual boundaries (красная линия = не переходить)",
        "- Постепенное увеличение расстояния в безопасных местах",
      ],
    };
  },

  // Генерация системы отслеживания прогресса
  _generateProgressTracking(data) {
    return {
      daily: {
        behaviors: [
          "Частота проблемного поведения",
          "Триггеры поведения",
          "Эффективность стратегий",
          "Настроение ребёнка",
        ],
        skills: [
          "Новые навыки, освоенные сегодня",
          "Упражнения, выполненные",
          "Реакция на вмешательства",
        ],
        format: "Дневник наблюдений (можно в приложении или бумажный)",
      },
      weekly: {
        review: [
          "Анализ трендов поведения",
          "Эффективность Behaviour Intervention Plan",
          "Прогресс в навыках",
          "Необходимость корректировки плана",
        ],
        summary: "Недельное резюме для специалиста (если есть)",
      },
      monthly: {
        assessment: [
          "Повторная оценка ключевых навыков",
          "Сравнение с началом месяца",
          "Корректировка целей",
          "Обновление Behaviour Intervention Plan",
        ],
        report: "Месячный отчет о прогрессе",
      },
    };
  },

  // ОПРЕДЕЛЕНИЕ ВОЗРАСТНОЙ ГРУППЫ
  _getAgeGroup(ageMonths) {
    if (ageMonths < 24) return "1_2_years";
    if (ageMonths < 48) return "2_3_years";
    return "3_4_years";
  },

  // АНАЛИЗ ПРОБЛЕМ НА ОСНОВЕ ВСЕХ МЕТОДИК
  _identifyProblems(data) {
    const problems = [];

    // Анализ M-CHAT-R
    const mchatrProblems = this._analyzeMCHATR(data.mchatrResults);
    problems.push(...mchatrProblems);

    // Анализ FAST
    const fastProblems = this._analyzeFAST(data.fastResults);
    problems.push(...fastProblems);

    // Анализ сенсорного профиля
    const sensoryProblems = this._analyzeSensory(data.sensoryProfile);
    problems.push(...sensoryProblems);

    // Анализ СДВГ (Conners-3)
    const adhdProblems = this._analyzeADHD(data.connersResults);
    problems.push(...adhdProblems);

    // Анализ развития
    const developmentalProblems = this._analyzeDevelopment(
      data.developmentalMilestones,
    );
    problems.push(...developmentalProblems);

    return problems;
  },

  // Анализ M-CHAT-R
  _analyzeMCHATR(results) {
    const problems = [];

    if (!results) return problems;

    const riskLevel = results.riskClass || "";

    if (riskLevel === "risk-high" || riskLevel === "risk-medium") {
      // Проверяем критические вопросы
      if (results.criticalItems && results.criticalItems.failed) {
        results.criticalItems.failed.forEach((itemNum) => {
          if (itemNum === 2) {
            problems.push({
              area: "social",
              severity: "critical",
              issue: "Не реагирует на имя",
              scenario: "not_responding_name",
            });
          }
          if (itemNum === 7) {
            problems.push({
              area: "communication",
              severity: "critical",
              issue: "Нет указательного жеста",
              scenario: null,
            });
          }
        });
      }

      // Общие проблемы РАС
      problems.push({
        area: "social",
        severity: riskLevel === "risk-high" ? "critical" : "high",
        issue: "Трудности социального взаимодействия",
        scenario: "not_playing_peers",
      });

      problems.push({
        area: "communication",
        severity: riskLevel === "risk-high" ? "critical" : "high",
        issue: "Задержка речевого развития",
        scenario: "not_speaking",
      });
    }

    return problems;
  },

  // Анализ FAST (функция поведения)
  _analyzeFAST(results) {
    const problems = [];

    if (!results) return problems;

    const score = results.score ? results.score.toLowerCase() : "";

    if (score.includes("внимание") || score.includes("attention")) {
      problems.push({
        area: "behaviour",
        severity: "high",
        issue: "Проблемное поведение для получения внимания",
        scenario: "screaming",
      });
    }

    if (score.includes("избегание") || score.includes("escape")) {
      problems.push({
        area: "behaviour",
        severity: "high",
        issue: "Проблемное поведение для избегания требований",
        scenario: "not_letting_dress",
      });
    }

    if (score.includes("предмет") || score.includes("tangible")) {
      problems.push({
        area: "behaviour",
        severity: "medium",
        issue: "Проблемное поведение для получения предметов",
        scenario: "screaming_public",
      });
    }

    if (score.includes("сенсорная") || score.includes("sensory")) {
      problems.push({
        area: "sensory",
        severity: "medium",
        issue: "Сенсорная самостимуляция",
        scenario: "stereotypy_rocking",
      });
    }

    return problems;
  },

  // Анализ сенсорного профиля
  _analyzeSensory(profile) {
    const problems = [];

    if (!profile) return problems;

    const hyper = profile.hyperSensitive || [];
    const hypo = profile.hypoSensitive || [];

    if (hyper.length > 0 || hypo.length > 0) {
      problems.push({
        area: "sensory",
        severity: "medium",
        issue: "Сенсорные нарушения",
        scenario: null,
        details: {
          hyperSensitive: hyper,
          hypoSensitive: hypo,
        },
      });
    }

    // Конкретные проблемы
    if (hyper.includes("tactile") || hypo.includes("tactile")) {
      problems.push({
        area: "sensory",
        severity: "medium",
        issue: "Тактильная чувствительность",
        scenario: "afraid_water",
      });
    }

    if (hyper.includes("auditory")) {
      problems.push({
        area: "sensory",
        severity: "medium",
        issue: "Звуковая чувствительность",
        scenario: "screaming_public",
      });
    }

    if (hyper.includes("vestibular") || hypo.includes("vestibular")) {
      problems.push({
        area: "sensory",
        severity: "low",
        issue: "Вестибулярные нарушения",
        scenario: "stereotypy_rocking",
      });
    }

    return problems;
  },

  // Анализ СДВГ (Conners-3)
  _analyzeADHD(results) {
    const problems = [];

    if (!results) return problems;

    if (results.inattention) {
      problems.push({
        area: "attention",
        severity: "medium",
        issue: "Невнимательность",
        scenario: null,
      });
    }

    if (results.hyperactivity) {
      problems.push({
        area: "behaviour",
        severity: "medium",
        issue: "Гиперактивность",
        scenario: "stereotypy_rocking",
      });
    }

    if (results.sleep) {
      problems.push({
        area: "sleep",
        severity: "medium",
        issue: "Проблемы со сном",
        scenario: "screaming_night",
      });
    }

    return problems;
  },

  // Анализ развития
  _analyzeDevelopment(milestones) {
    const problems = [];

    if (!milestones) return problems;

    // Проверяем пропущенные навыки
    if (milestones.missing && milestones.missing.length > 0) {
      const missingCount = milestones.missing.length;

      if (missingCount >= 3) {
        problems.push({
          area: "development",
          severity: "high",
          issue: "Задержка развития",
          scenario: "not_playing_peers",
        });
      } else if (missingCount >= 1) {
        problems.push({
          area: "development",
          severity: "medium",
          issue: "Незначительная задержка развития",
          scenario: null,
        });
      }
    }

    return problems;
  },

  // ГЕНЕРАЦИЯ СИТУАЦИОННЫХ ПРОТОКОЛОВ
  _generateSituationProtocols(problems, ageGroup) {
    const protocols = [];
    const scenariosToAdd = new Set();

    // Находим сценарии на основе проблем
    problems.forEach((problem) => {
      if (problem.scenario) {
        scenariosToAdd.add(problem.scenario);
      }

      // Добавляем сценарии на основе области проблемы
      if (problem.area === "social" && problem.severity === "critical") {
        scenariosToAdd.add("not_responding_name");
        scenariosToAdd.add("not_playing_peers");
      }

      if (problem.area === "communication" && problem.severity === "critical") {
        scenariosToAdd.add("not_speaking");
      }

      if (problem.area === "behaviour" && problem.severity === "critical") {
        scenariosToAdd.add("screaming");
        scenariosToAdd.add("aggression_others");
        scenariosToAdd.add("head_banging");
      }

      if (problem.area === "sensory") {
        scenariosToAdd.add("stereotypy_rocking");
        if (
          problem.details &&
          problem.details.hyperSensitive.includes("tactile")
        ) {
          scenariosToAdd.add("afraid_water");
        }
      }

      if (problem.area === "sleep") {
        scenariosToAdd.add("not_sleeping");
        scenariosToAdd.add("screaming_night");
      }
    });

    // Всегда добавляем базовые сценарии для РАС
    if (problems.some((p) => p.severity === "critical")) {
      scenariosToAdd.add("screaming");
      scenariosToAdd.add("not_eating");
      scenariosToAdd.add("poor_adaptation");
    }

    // Генерируем протоколы для выбранных сценариев
    scenariosToAdd.forEach((scenarioKey) => {
      const scenario = this._getScenarioByKey(scenarioKey);
      if (scenario) {
        const adaptedScenario = this._adaptScenarioForAge(scenario, ageGroup);
        protocols.push({
          key: scenarioKey,
          title: adaptedScenario.title,
          priority: adaptedScenario.priority,
          steps: this._extractStepsForAge(adaptedScenario, ageGroup),
          whatToSay: this._extractWhatToSay(adaptedScenario),
          whatNotToDo: this._extractWhatNotToDo(adaptedScenario),
          specialNotes: adaptedScenario.specialNotes || null,
        });
      }
    });

    // Сортируем по приоритету
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    protocols.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );

    return protocols;
  },

  // Получить сценарий по ключу
  _getScenarioByKey(key) {
    if (typeof ScenariosDatabase !== "undefined") {
      return ScenariosDatabase[key] || null;
    }
    return null;
  },

  // Адаптировать сценарий под возраст
  _adaptScenarioForAge(scenario, ageGroup) {
    const adapted = { ...scenario };

    if (ageGroup === "1_2_years") {
      adapted.steps = scenario.steps_1_2_years || [];
    } else if (ageGroup === "2_3_years") {
      adapted.steps = scenario.steps_2_3_years || [];
    } else if (ageGroup === "3_4_years") {
      adapted.steps = scenario.steps_3_4_years || [];
    }

    return adapted;
  },

  // Извлечь шаги для возраста
  _extractStepsForAge(scenario, ageGroup) {
    if (ageGroup === "1_2_years") {
      return scenario.steps_1_2_years || [];
    } else if (ageGroup === "2_3_years") {
      return scenario.steps_2_3_years || [];
    } else if (ageGroup === "3_4_years") {
      return scenario.steps_3_4_years || [];
    }
    return scenario.steps || [];
  },

  // Извлечь "что говорить"
  _extractWhatToSay(scenario) {
    const phrases = [];

    if (scenario.immediate) {
      phrases.push(...scenario.immediate.filter((item) => item.includes('"')));
    }

    return phrases;
  },

  // Извлечь "чего не делать"
  _extractWhatNotToDo(scenario) {
    const notToDo = [];

    if (scenario.not_calm) {
      notToDo.push(...scenario.not_calm);
    }

    if (scenario.important) {
      notToDo.push(
        ...scenario.important.filter(
          (item) => item.startsWith("НЕ") || item.startsWith("Не"),
        ),
      );
    }

    return notToDo;
  },
};

// Экспорт для использования в HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = FullProtocolGenerator;
}
