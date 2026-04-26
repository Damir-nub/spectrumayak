// Полная версия генератора протоколов с всеми функциями
// Замените protocol-generator.js этим файлом для полной функциональности

const ProtocolGenerator = {
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

    const protocol = {
      childInfo: this._formatChildInfo(childInfo),
      dailySchedule: this._generateDailySchedule(assessmentData),
      behaviourPlan: this._generateBehaviourPlan(
        fastResults,
        qabfResults,
        masResults,
      ),
      sensoryDiet: this._generateSensoryDiet(sensoryProfile, masResults),
      developmentalPlan: this._generateDevelopmentalPlan(
        mchatrResults,
        scqResults,
        developmentalMilestones,
      ),
      executiveFunctionPlan: this._generateExecutiveFunctionPlan(briefResults),
      adhdManagement: this._generateADHDManagement(connersResults),
      emergencyProtocols: this._generateEmergencyProtocols(assessmentData),
      progressTracking: this._generateProgressTracking(assessmentData),
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

    // Если проблемы со сном
    if (issues.sleepIssues) {
      adapted.sleep.preSleepRoutine = [
        "За 1 час: выключить яркий свет",
        "За 45 мин: тёплая ванна (36-37°C)",
        "За 30 мин: массаж, лёгкие поглаживания",
        "За 15 мин: тихая музыка или бел шум",
        "Песенка/колыбельная (одна и та же)",
        "Сон",
      ];
    }

    // Если сенсорные проблемы
    if (issues.sensoryIssues.length > 0) {
      adapted.sensoryBreaks = [
        "Каждые 2 часа - 10 мин сенсорный перерыв",
        "Если гиперчувствительность: тихое место, минимум стимулов",
        "Если гипочувствительность: активная деятельность, прыжки, качели",
      ];
    }

    // Если проблемы с вниманием
    if (issues.attentionIssues) {
      adapted.activityStructure = [
        "Каждое занятие 15-20 минут",
        "Перерывы 5-10 минут между занятиями",
        "Использовать таймер (визуальный)",
        "Чередовать активные и спокойные деятельности",
      ];
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
  _generateSensoryDiet(sensoryProfile, masResults) {
    if (!sensoryProfile) {
      return {
        note: "Сенсорный профиль не заполнен. Рекомендуется пройти сенсорную оценку.",
      };
    }

    const issues = sensoryProfile.issues || [];
    const hyperSensitive = sensoryProfile.hyperSensitive || [];
    const hypoSensitive = sensoryProfile.hypoSensitive || [];

    return {
      morningRoutine: this._getSensoryMorningRoutine(
        hyperSensitive,
        hypoSensitive,
      ),
      throughoutDay: this._getSensoryThroughoutDay(
        issues,
        hyperSensitive,
        hypoSensitive,
      ),
      eveningRoutine: this._getSensoryEveningRoutine(
        hyperSensitive,
        hypoSensitive,
      ),
      specificActivities: this._getSpecificSensoryActivities(
        hyperSensitive,
        hypoSensitive,
      ),
      equipment: this._getSensoryEquipment(hyperSensitive, hypoSensitive),
    };
  },

  // Утренняя сенсорная рутина
  _getSensoryMorningRoutine(hyper, hypo) {
    const routine = [];

    // Проприоцептивная (глубокое давление) для всех
    routine.push({
      time: "7:00-7:15",
      activity: "Утренняя растяжка и массаж",
      description: "Поглаживания спины, ручек, ножек. Лёгкие растяжения.",
    });

    // Вестибулярная
    if (hypo.includes("vestibular") || !hyper.includes("vestibular")) {
      routine.push({
        time: "7:15-7:20",
        activity: "Вестибулярные упражнения",
        description: "Качели на фитболе, лёгкие покачивания, наклоны.",
      });
    }

    // Тактильная
    routine.push({
      time: "7:20-7:30",
      activity: "Гигиенические процедуры",
      description: hyper.includes("tactile")
        ? "Используйте мягкую губку, тёплую воду. Предупреждайте перед касаниями."
        : "Массаж щёткой, разные текстуры полотенец.",
    });

    return routine;
  },

  // Сенсорные активности в течение дня
  _getSensoryThroughoutDay(issues, hyper, hypo) {
    return {
      every2Hours: [
        "10 минут сенсорного перерыва",
        hyper.includes("auditory")
          ? "Тихое место, минимум шума"
          : "Музыка, звуки природы",
        hyper.includes("visual")
          ? "Затемнить, убрать яркие игрушки"
          : "Яркие цвета, световые игрушки",
        "Проприоцептивная активность: отжимания от стены, подтягивания",
      ],
      heavyWork: [
        "Перенос игрушек/книг",
        "Открывание/закрывание дверей",
        "Лёгкие домашние дела: подмести, протереть стол",
      ],
      oralMotor: [
        "Твёрдая пища: морковь, яблоко",
        "Сосание через трубочку",
        "Жевательная резинка (если возраст позволяет)",
      ],
    };
  },

  // Вечерняя сенсорная рутина
  _getSensoryEveningRoutine(hyper, hypo) {
    return [
      {
        time: "19:00-19:15",
        activity: "Тёплая ванна",
        description: "36-37°C. Пену, игрушки. Не плескаться активно.",
      },
      {
        time: "19:15-19:25",
        activity: "Массаж",
        description: "Спокойный массаж с лёгким давлением. Спина, плечи, руки.",
      },
      {
        time: "19:25-19:30",
        activity: "Кальцинирование / спокойная деятельность",
        description: "Тихая музыка, бел шум. Минимум визуальных стимулов.",
      },
    ];
  },

  // Специфические сенсорные активности
  _getSpecificSensoryActivities(hyper, hypo) {
    const activities = {};

    if (hyper.includes("vestibular")) {
      activities.vestibular = [
        "Лёгкие покачивания",
        "Медленные качели",
        "Избегать быстрой смены положения",
        "Предупреждать перед изменением положения",
      ];
    } else if (hypo.includes("vestibular")) {
      activities.vestibular = [
        "Активные качели",
        "Кувырки, вращение",
        "Прыжки на фитболе",
        "Балансировочные упражнения",
      ];
    }

    if (hyper.includes("tactile")) {
      activities.tactile = [
        "Предупреждать перед касанием",
        "Использовать мягкую одежду без швов",
        "Гладкие ткани в одежде и постельном белье",
        "Постепенное знакомство с новыми текстурами",
      ];
    } else if (hypo.includes("tactile")) {
      activities.tactile = [
        "Массаж щёткой",
        "Разные текстуры: песок, вода, крупы",
        "Тактильные игры: лего, пластилин",
        "Обнимания, глубокое давление",
      ];
    }

    if (hyper.includes("auditory")) {
      activities.auditory = [
        "Тихая среда",
        "Шумоподавляющие наушники в шумных местах",
        "Предупреждать перед громкими звуками",
        "Бел шум для маскировки неожиданных звуков",
      ];
    } else if (hypo.includes("auditory")) {
      activities.auditory = [
        "Музыкальные игрушки",
        "Звуковые игры",
        "Различные типы звуков",
        "Пение, музыкальные занятия",
      ];
    }

    return activities;
  },

  // Сенсорное оборудование
  _getSensoryEquipment(hyper, hypo) {
    const equipment = [];

    // Для всех
    equipment.push(
      "Фитбол (большой мяч для упражнений)",
      "Утяжелённое одеяло (10% веса ребёнка)",
      "Сенсорные игрушки (разные текстуры)",
    );

    if (hyper.includes("tactile") || hypo.includes("tactile")) {
      equipment.push("Массажная щётка (soft)");
      equipment.push("Тактильные панели, коврики");
    }

    if (hyper.includes("vestibular") || hypo.includes("vestibular")) {
      equipment.push("Качели, гамак");
      equipment.push("Балансировочная доска");
    }

    if (hyper.includes("auditory")) {
      equipment.push("Шумоподавляющие наушники");
      equipment.push("Бел шум машина");
    }

    if (hyper.includes("visual")) {
      equipment.push("Солнцезащитные очки");
      equipment.push("Затемняющие шторы");
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
};

// Экспорт для использования в HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProtocolGenerator;
}
