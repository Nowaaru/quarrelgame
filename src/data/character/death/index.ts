import { EntityState, Input, Hitbox, Character, Skill, Animation, Motion } from "@rbxts/quarrelgame-framework";
import { FarSlash, ForwardKick, LowHeavy } from "./normals";

const Death = new Character.CharacterBuilder3D()
    .SetName("DEATH")
    .SetDescription("gotsuteki")
    .SetSubheader("JUST KICK THE DOLPHIN")
    .SetHeader("GOTSUTEKI")
    .SetModel(Character.GetCharacterModel<CharacterModels>().death, Character.CharacterRigType.Raw)
    .SetEasiness(5)
    .SetAttack([Motion.Neutral, Input.Slash], FarSlash)
    .SetAttack([Motion.Neutral, Input.Kick], ForwardKick)
    .SetAttack([Motion.Down, Input.Heavy], LowHeavy)
    .SetAnimation(
        EntityState.Idle,
        new Animation.AnimationBuilder()
            .SetName("Idle")
            .SetAnimationId("rbxassetid://14487999316")
            .SetPriority(Enum.AnimationPriority.Idle)
            .SetLooped(true)
            .Construct(),
    )
    .SetAnimation(
        EntityState.Walk,
        new Animation.AnimationBuilder()
            .SetName("Walk")
            .SetAnimationId("rbxassetid://14488005454")
            .SetPriority(Enum.AnimationPriority.Movement)
            .SetLooped(true)
            .Construct(),
    )
    .SetAnimation(
        EntityState.Crouch,
        new Animation.AnimationBuilder()
            .SetName("Crouch")
            .SetAnimationId("rbxassetid://14288051389")
            .SetPriority(Enum.AnimationPriority.Movement)
            .SetLooped(true)
            .Construct(),
    )
    .AddSkill(
        new Skill.SkillBuilder()
            .SetName("Test Skill")
            .SetDescription("A test skill.")
            .SetFrameData(
                new Skill.FrameDataBuilder()
                    .SetAnimation(
                        new Animation.AnimationBuilder()
                            .SetName("Test Skill")
                            .SetAnimationId("rbxassetid://14280676559")
                            .SetPriority(Enum.AnimationPriority.Action)
                            .Construct(),
                    )
                    .SetStartup(4)
                    .SetActive(6)
                    .SetRecovery(-4)
                    .SetHitbox(
                        new Hitbox.HitboxBuilder()
                            .SetOffset()
                            .SetSize(new Vector3(7, 7, 7))
                            .Construct(),
                    ),
            )
            .SetMotionInput([Motion.Down, Motion.DownForward, Motion.Forward, Input.Slash]) // 236S
            .SetGaugeRequired(25)
            .SetGroundedType(Skill.SkillGroundedType.Ground)
            .SetReversal(false)
            .Construct(),
    )
    .Construct();

export = Death;
