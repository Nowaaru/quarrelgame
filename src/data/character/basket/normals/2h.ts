// 

import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket2h"
})
export class CrouchingHeavy extends Skill.Skill
{
    Name: string = "Crouching Heavy";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(11)
            .SetActive(11)
            .SetRecovery(24)
            .SetBlockAdvantage(18)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("2H")
                    .SetAnimationId("rbxassetid://89878022379747")
                    .Construct(),
            ).Construct();
    //c-s 135878707231496
    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default CrouchingHeavy;
